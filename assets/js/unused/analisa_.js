Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on record to choose',
			target: view.el,
			trackMouse: true
		});
	}

	function gridTooltipApk(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Single click on the customer item in the list to display register',
			target: view.el,
			trackMouse: true
		});
	}

	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_pjj', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fd_tanggal_survey', type: 'string'},
			{name: 'fd_tgl_apk', type: 'string'}
		]
	});

	var grupGridDetil = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'analisa/griddetil'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue(),
					'fs_flag_survey': '1'
				});
			}
		}
	});

	var gridDetil = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		sortableColumns: false,
		height: 450,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'No. APK', 
			dataIndex: 'fn_no_apk', 
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. PJJ', 
			dataIndex: 'fs_pjj', 
			menuDisabled: true,
			width: 140
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			locked: true,
			menuDisabled: true,
			width: 200
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			width: 120
		},{
			text: 'Tanggal Survey',
			dataIndex: 'fd_tanggal_survey',
			menuDisabled: true,
			width: 120
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'No. PJJ / Nama Konsumen',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupGridDetil.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemclick: function(grid, record) {
				Ext.getCmp('txtApk').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtPjj').setValue(record.get('fs_pjj'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_konsumen'));
			}
		},
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipApk
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var txtApk = {
		id: 'txtApk',
		name: 'txtApk',
		xtype: 'textfield',
		hidden: true
	};

	var txtPjj = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. PJJ',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPjj',
		name: 'txtPjj',
		xtype: 'textfield'
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Konsumen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var grupKeputusan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_strx','fs_nm_strx'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'analisa/cb_keputusan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'keputusan_kredit'
				});
			}
		}
	});

	var cboKeputusan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Keputusan Kredit',
		id: 'cboKeputusan',
		name: 'cboKeputusan',
		store: grupKeputusan,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCatAnalisa = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 100,
		fieldLabel: 'Catatan Analisa Kredit',
		id: 'txtCatAnalisa',
		name: 'txtCatAnalisa',
		xtype: 'textareafield',
	};

	var grupPreApk = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [

		],
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'analisa/prepemeriksaapk'
		},
		listeners: {
			beforeload: function(store) {
			}
		}
	});

	var gridPreApk = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 650,
		sortableColumns: false,
		store: grupPreApk,
		columns: []
	});

	var winPreApk = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Preview Pemeriksaan APK',
		items: [
			//gridPreApk
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				vMask.show();
			}
		}
	});

	var grupPreData = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang',
			'fs_kode_dokumen','fs_dokumen_upload',
			'fd_tanggal_buat', 'fs_iduser_buat'
		],
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'analisa/predatapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_apk': Ext.getCmp('txtApk').getValue()
				});
			}
		}
	});

	var gridPreData = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPreData,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 100},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 250},
			{text: "File", dataIndex: 'fs_dokumen_upload', menuDisabled: true, hidden: true},
			{text: "Tanggal", dataIndex: 'fd_tanggal_buat', menuDisabled: true, width: 100},
			{text: "User", dataIndex: 'fs_iduser_buat', menuDisabled: true, width: 50}
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPreData,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winPreData.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
			{
				var dokumen_name = record.get('fs_nama_dokumen');
				var dokumen_url = 'uploads/' + record.get('fs_dokumen_upload');

				var viewImage =  Ext.create('Ext.Panel', {
					frame: true,
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
					        '<img src="' + dokumen_url + '">'
					    	],
					})
				});

				var winImage = Ext.create('Ext.window.Window', {
					title: dokumen_name,
					autoScroll: true,
					overflowY: 'scroll',
					width: 900,
					height: 500,
					collapsible: false,
					resizable: true,
					layout: 'fit',
					items: [
						viewImage
					]
				});

				winImage.show();
			}
		},
		viewConfig: {
			enableTextSelection: true
		}
	});

	var winPreData = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Preview Data Pendukung',
		items: [
			gridPreData
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPreData.load();
				vMask.show();
			}
		}
	});

	function fnPreviewAPK()
	{
		winPreApk.show();
		winPreApk.center();
	}

	function fnPreviewData()
	{
		winPreData.show();
		winPreData.center();
	}

	// button preview pemeriksa
	var btnPrevP = {
		anchor: '100%',
		scale: 'medium',
		text: 'Preview Pemeriksaan APK',
		xtype: 'button',
		height: 50,
		//handler: fnPreviewAPK
	};

	// button preview data pendukung
	var btnPrevD = {
		anchor: '100%',
		scale: 'medium',
		text: 'Preview Data Pendukung',
		xtype: 'button',
		height: 50,
		handler: fnPreviewData
	};

	function fnCekSave()
	{
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'analisa/ceksave',
				params: {
					'fs_keputusan': '1'
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'SIAP'
						});
					}
					else {
						if (xtext.sukses === true && xtext.hasil == 'lanjut') {
							fnSave();
						}
						else {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'SIAP',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave();
									}
								}
							});
						}
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Saving Failed, Connection Failed!!',
						title: 'SIAP'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSave()
	{
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		Ext.Ajax.request({
			method: 'POST',
			url: 'analisa/save',
			params: {
				'fn_no_apk': Ext.getCmp('txtApk').getValue(),
				'fs_keputusan_kredit': Ext.getCmp('cboKeputusan').getValue(),
				'fs_catatan_analisa': Ext.getCmp('txtCatAnalisa').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'SIAP'
				});
				if (xtext.sukses === true) {
					fnReset();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}

		});
	}

	function fnReset(){
		Ext.getCmp('txtApk').setValue('');
		Ext.getCmp('txtPjj').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('cboKeputusan').setValue('');
		Ext.getCmp('txtCatAnalisa').setValue('');
		Ext.getCmp('btnSave').setDisabled(false);
		grupGridDetil.load();
	}

	var frmAnalisa = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Analisa dan Keputusan Kredit',
		width: 930,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Kebutuhan Analisa Kredit',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'Daftar Kebutuhan Analisa Kredit',
					xtype: 'fieldset',
					items: [
						gridDetil
					]
				}]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Analisa Kredit',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'Analisa Kredit',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtApk,
									txtPjj,
									txtNama
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnPrevP
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnPrevD
								]
							}]
						}]
					}]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'Keputusan Kredit',
					xtype: 'fieldset',
					items: [
						cboKeputusan,
						txtCatAnalisa
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSave',
					name: 'btnSave',
					text: 'Save',
					handler: fnCekSave
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset
				}]
			}]
		}],
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmAnalisa
	});

	function fnMaskShow() {
		frmAnalisa.mask('Please wait...');
	}

	function fnMaskHide() {
		frmAnalisa.unmask();
	}

	frmAnalisa.render(Ext.getBody());
	Ext.get('loading').destroy();

});