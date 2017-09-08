Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.LiveSearchGridPanel',
	'Ext.ux.ProgressBarPager'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Bagian ini wajib diisi">*</span>';

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on record to choose',
			target: view.el,
			trackMouse: true
		});
	}

	Ext.define('DataGridSurveyor', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_kode_surveyor', type: 'string'},
			{name: 'fs_kode_surveyor_lama', type: 'string'},
			{name: 'fs_nama_surveyor', type: 'string'},
			{name: 'fs_alamat_surveyor', type: 'string'},
			{name: 'fn_ktp_surveyor', type: 'string'}
		]
	});

	var grupGridSurveyor = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridSurveyor',
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
			url: 'mastersurveyor/list'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridSurveyor = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		sortableColumns: false,
		store: grupGridSurveyor,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_nama_surveyor',
			menuDisabled: true, 
			text: 'Nama Surveyor',
			locked: true,
			width: 250
		},{
			dataIndex: 'fs_kode_surveyor',
			menuDisabled: true, 
			text: 'Kode Surveyor',
			locked: true,
			width: 100
		},{
			xtype:'actioncolumn',
			locked: true,
			width:20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_surveyor');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn){
								if (btn == "yes"){
									Ext.Ajax.request({
										url : 'mastersurveyor/remove/',
										params : {
											'fs_kode_surveyor' : str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'SIAP'
											});
											grupGridSurveyor.load();
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'SIAP'
											});
										}
									});
								}
								if (btn == "no"){
							        grupGridSurveyor.load(); 
							    }
							}
						});
					}
				},
				scope: this
			}]
		},{
			dataIndex: 'fs_kode_surveyor_lama',
			menuDisabled: true, 
			text: 'Inisial Surveyor',
			width: 100
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode Cabang',
			width: 90
		},{
			dataIndex: 'fs_alamat_surveyor',
			menuDisabled: true, 
			text: 'Alamat Surveyor',
			width: 300
		},{
			dataIndex: 'fs_ktp_surveyor',
			menuDisabled: true, 
			text: 'KTP Surveyor',
			width: 200
		},{
			dataIndex: 'fs_handphone_surveyor',
			menuDisabled: true, 
			text: 'Handphone Surveyor',
			width: 200
		},{
			dataIndex: 'fs_aktif',
			menuDisabled: true, 
			text: 'Aktif',
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Surveyor  / Nama Surveyor',
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
					grupGridSurveyor.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridSurveyor
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboAktif').setValue(record.get('fs_aktif'));
				Ext.getCmp('txtKodeSurveyor1').setValue(record.get('fs_kode_surveyor'));
				Ext.getCmp('txtKodeSurveyor2').setValue(record.get('fs_kode_surveyor_lama'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_surveyor'));
				Ext.getCmp('txtAlamat').setValue(record.get('fs_alamat_surveyor'));
				Ext.getCmp('txtNoKTP').setValue(record.get('fs_ktp_surveyor'));
				Ext.getCmp('txtHandphone').setValue(record.get('fs_handphone_surveyor'));

				// change tab
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var grupAktif = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'mastersurveyor/cb_aktif'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var cboAktif = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Aktif',
		id: 'cboAktif',
		name: 'cboAktif',
		store: grupAktif,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtKodeSurveyor1 = {
		anchor: '100%',
		fieldLabel: 'Kode Surveyor',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtKodeSurveyor1',
		name: 'txtKodeSurveyor1',
		xtype: 'textfield'
	};

	var txtKodeSurveyor2 = {
		anchor: '50%',
		fieldLabel: 'Inisial',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeSurveyor2',
		name: 'txtKodeSurveyor2',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 3,
		enforceMaxLength: true
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Surveyor',
		emptyText: 'Minimal 5 Karakter',
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var txtAlamat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Surveyor',
		id: 'txtAlamat',
		name: 'txtAlamat',
		xtype: 'textareafield',
	};

	var txtNoKTP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. KTP',
		id: 'txtNoKTP',
		name: 'txtNoKTP',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 20,
		enforceMaxLength: true
	};

	var txtHandphone = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Handphone',
		id: 'txtHandphone',
		name: 'txtHandphone',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	function fnCekSave(){
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersurveyor/ceksave',
				params: {
					'fs_kode_surveyor': Ext.getCmp('txtKodeSurveyor1').getValue(),
					'fs_nama_surveyor': Ext.getCmp('txtNama').getValue()
				},
				success: function(response) {
					var xText = Ext.decode(response.responseText);
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xText.hasil,
							title: 'SIAP'
						});
					}
					else {
						if (xText.sukses === true && xText.hasil == 'lanjut') {
							fnSave();
						}
						else {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
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
					var xText = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'Siap'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSave() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersurveyor/save',
			params: {
				'fs_aktif': Ext.getCmp('cboAktif').getValue(),
				'fs_kode_surveyor1': Ext.getCmp('txtKodeSurveyor1').getValue(),
				'fs_kode_surveyor2': Ext.getCmp('txtKodeSurveyor2').getValue(),
				'fs_nama_surveyor': Ext.getCmp('txtNama').getValue(),
				'fs_alamat_surveyor': Ext.getCmp('txtAlamat').getValue(),
				'fs_ktp_surveyor': Ext.getCmp('txtNoKTP').getValue(),
				'fs_handphone_surveyor': Ext.getCmp('txtHandphone').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'SIAP'
				});
				fnReset();
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1');
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Simpan Gagal, Koneksi Gagal',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	function fnReset() {
		Ext.getCmp('cboAktif').setValue('');
		Ext.getCmp('txtKodeSurveyor1').setValue('');
		Ext.getCmp('txtKodeSurveyor2').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtAlamat').setValue('');
		Ext.getCmp('txtNoKTP').setValue('');
		Ext.getCmp('txtHandphone').setValue('');
		grupGridSurveyor.load();
	}

	Ext.Ajax.request({
		method: 'POST',
		url: 'mastersurveyor/nilaidefa',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			if (xtext.sukses === true) {
				//Ext.getCmp('txtCabang').setValue(xtext.kode_cabang);
			}
		},
		failure: function(response) {
			var xText = Ext.decode(response.responseText);
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.OK,
				closable: false,
				icon: Ext.MessageBox.INFO,
				message: 'Load default value Failed, Connection Failed!!',
				title: 'IDS'
			});
		}
	});

	var frmMasterSurveyor = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Surveyor',
		width: 930,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Surveyor',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Dealer',
					xtype: 'fieldset',
					items: [
						gridSurveyor
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Surveyor',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					title: 'Setup Surveyor',
					xtype: 'fieldset',
					items: [{
						anchor: '50%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								cboAktif
							]
						}]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtKodeSurveyor1
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtKodeSurveyor2
							]
						}]
					},{
						anchor: '80%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtNama,
								txtAlamat
							]
						}]
					},{
						anchor: '50%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtNoKTP,
								txtHandphone
							]
						}]
					}]
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
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterSurveyor
	});

	function fnMaskShow() {
		frmMasterSurveyor.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterSurveyor.unmask();
	}

	frmMasterSurveyor.render(Ext.getBody());
	Ext.get('loading').destroy();
});