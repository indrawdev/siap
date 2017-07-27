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

	var grupApk = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_no_apk','fs_pjj','fs_nama_konsumen',
			'fd_tgl_apk','fs_alamat_konsumen',
			'fs_kelurahan_konsumen', 'fs_kecamatan_konsumen',
			'fs_kota_konsumen', 'fs_kodepos_konsumen',
			'fs_ktp_konsumen','fs_masa_ktp_konsumen',
			'fs_masa_ktp_konsumen','fs_telepon_konsumen',
			'fs_handphone_konsumen'
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
			url: 'kontrak/gridapk'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue(),
					'fs_keputusan_kredit': 'Y'
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupApk,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Cabang", dataIndex: 'fs_kode_cabang', hidden: true, menuDisabled: true},
			{text: "No. APK", dataIndex: 'fn_no_apk', hidden: true, menuDisabled: true},
			{text: "No. PJJ", dataIndex: 'fs_pjj', locked: true, menuDisabled: true, width: 120},
			{text: "Nama Konsumen", dataIndex: 'fs_nama_konsumen', locked: true, menuDisabled: true, width: 250},
			{text: "KTP Konsumen", dataIndex: 'fs_ktp_konsumen', menuDisabled: true, width: 150},
			{text: "Tanggal APK", dataIndex: 'fd_tgl_apk', menuDisabled: true, width: 70},
			{text: "Alamat Konsumen", dataIndex: 'fs_alamat_konsumen', menuDisabled: true, width: 250},
			{text: "Kelurahan", dataIndex: 'fs_kelurahan_konsumen', menuDisabled: true, width: 100},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan_konsumen', menuDisabled: true, width: 100},
			{text: "Kota", dataIndex: 'fs_kota_konsumen', menuDisabled: true, width: 100},
			{text: "Kode Pos", dataIndex: 'fs_kodepos_konsumen', menuDisabled: true, width: 100},
			{text: "Telepon", dataIndex: 'fs_telepon_konsumen', menuDisabled: true, width: 100},
			{text: "Handphone", dataIndex: 'fs_handphone_konsumen', menuDisabled: true, width: 100}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
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
					grupApk.load();
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
			store: grupApk,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('txtKdCab').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApk').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboApk').setValue(record.get('fs_nama_konsumen'));
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupApk.load();
				vMask.show();
			}
		}
	});

	var cboApk = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: 'Enter an Cust',
		fieldLabel: 'Nama Konsumen',
		id: 'cboApk',
		name: 'cboApk',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari.show();
					winCari.center();
				}
			}
		}
	};

	var grupDok = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_dokumen','fs_nama_dokumen',
			'fs_template_dokumen','fn_batas_cetak'
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
			url: 'kontrak/griddok'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDok,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 50, hidden: true},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 450}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dokumen',
				id: 'txtCari2',
				name: 'txtCari2',
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
					grupDok.load();
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
			store: grupDok,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboDok').setValue(record.get('fs_nama_dokumen'));
				Ext.getCmp('txtKdDok').setValue(record.get('fs_kode_dokumen'));
				winCari2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDok.load();
				vMask.show();
			}
		}
	});

	var cboDok = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: 'Enter an Doc',
		fieldLabel: 'Nama Dokumen',
		id: 'cboDok',
		name: 'cboDok',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari2.show();
					winCari2.center();
				}
			}
		}
	};

	var cekKop = {
		boxLabel: 'Kop',
		checked: false,
		id: 'cekKop',
		name: 'cekKop',
		xtype: 'checkboxfield'
	};

	var txtKdCab = {
		id: 'txtKdCab',
		name: 'txtKdCab',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoApk = {
		id: 'txtNoApk',
		name: 'txtNoApk',
		xtype: 'textfield',
		hidden: true
	};

	var txtKdDok = {
		id: 'txtKdDok',
		name: 'txtKdDok',
		xtype: 'textfield',
		hidden: true
	};

	function fnShowPrint()
	{
		winPrint.show();
		winPrint.center();
	}

	function fnCekPrint()
	{
		if (this.up('form').getForm().isValid()) {
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.YESNO,
				closable: false,
				icon: Ext.Msg.QUESTION,
				msg: 'Apakah anda yakin akan mencetak?',
				title: 'SIAP',
				fn: function(btn) {
					if (btn == 'yes') {

						Ext.Ajax.on('beforerequest', fnMaskShow);
						Ext.Ajax.on('requestcomplete', fnMaskHide);
						Ext.Ajax.on('requestexception', fnMaskHide);
						Ext.Ajax.request({
							method: 'POST',
							url: 'kontrak/cekprint',
							params: {
								'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
								'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
								'fs_kode_dokumen': Ext.getCmp('txtKdDok').getValue()
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
										fnPrint();
									}
									else if (xtext.sukses === true && xtext.hasil == 'habis') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.MessageBox.INFO,
											msg: 'Batas Cetak Kontrak Habis!!',
											title: 'SIAP'
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
									msg: 'Printing Failed, Connection Failed!!',
									title: 'SIAP'
								});
							}
						});
					}
				}
			});
		}
	}

	function fnPrint() 
	{
		var kdcab = Ext.getCmp('txtKdCab').getValue();
		var noapk = Ext.getCmp('txtNoApk').getValue();
		var cek = Ext.getCmp('cekKop').getValue();
		var kop = 0;

		if (cek == true) {
			kop = 1;
		}

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'kontrak/print',
			params: {
				'fs_kode_cabang': kdcab,
				'fn_no_apk': noapk,
				'fs_kode_dokumen': Ext.getCmp('txtKdDok').getValue()
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
				
				var url = xtext.url;
				var title = xtext.title;

				if (xtext.sukses === true) {
					var popUp = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						frame: false,
	                    height: 450,
	                    width: 950,
	                    layout:'anchor',
	                    title: title,
	                    buttons: [{
							text: 'OK',
							handler: function() {
								vMask.hide();
								popUp.hide();
							}
						}]
                	});

					popUp.add({html: '<iframe height="450", width="942" src="'+ url + kdcab + '/' + noapk + '/' + kop +'"></iframe>'});
	                popUp.show();
					fnReset();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Printing Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	function fnReset()
	{
		Ext.getCmp('cboApk').setValue('');
		Ext.getCmp('cboDok').setValue('');
		Ext.getCmp('txtKdCab').setValue('');
		Ext.getCmp('txtNoApk').setValue('');
		Ext.getCmp('txtKdDok').setValue('');
		Ext.getCmp('cekKop').setValue('');
		grupApk.load();
		grupDok.load();
	}

	var frmKontrak = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Kontrak & Kelengkapan',
		width: 550,
		fieldDefaults: {
			labelAlign: 'right',
			labelSeparator: '',
			labelWidth: 120,
			msgTarget: 'side'
		},
		items: [{
			style: 'padding: 5px;',
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 8,
					layout: 'anchor',
					xtype: 'container',
					items: [
						cboApk,
						cboDok,
						txtKdCab,
						txtNoApk,
						txtKdDok
					]
				},{
					flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [
						cekKop
					]
				}]
			}]
		}],
		buttons: [{
			text: 'Print',
			handler: fnCekPrint
		},{
			text: 'Reset',
			handler: fnReset
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKontrak
	});

	function fnMaskShow() {
		frmKontrak.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKontrak.unmask();
	}

	frmKontrak.render(Ext.getBody());
	Ext.get('loading').destroy();
});