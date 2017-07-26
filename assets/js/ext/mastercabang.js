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
			html: 'Klik 2x pada record untuk memilih',
			target: view.el,
			trackMouse: true
		});
	}

	var grupKotaCabang= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_kota','fs_nama_kota'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'apknew/ambil_kota'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKotaCabang,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaCabang,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Kota', dataIndex: 'fs_kode_kota', menuDisabled: true, width: 240},
			{text: 'Nama Kota', dataIndex: 'fs_nama_kota', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKotaCabang').setValue(record.get('fs_nama_kota'));
				
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
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
		title: 'Pencarian...',
		items: [
			winGrid
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKotaCabang.load();
				vMask.show();
			}
		}
	});

	var cboKotaCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kota Cabang',
		editable: true,
		id: 'cboKotaCabang',
		//maxLength: 5,
		name: 'cboKotaCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('cekAktif').setValue('1');
			}
		},
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



	var cekAktif = {
		boxLabel: 'Aktif',
		checked: true,
		id: 'cekAktif',
		name: 'cekAktif',
		xtype: 'checkboxfield'
	};

	var txtKodeCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		id: 'txtKodeCabang',
		maxLength : 2,
 		enforceMaxLength : true,
		name: 'txtKodeCabang',
		xtype: 'numberfield',
		hideTrigger: true,
	};

	var txtNamaCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Cabang',
		id: 'txtNamaCabang',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtNamaCabang',
		xtype: 'textfield'
	};

	var txtAlamatCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Alamat Cabang',
		id: 'txtAlamatCabang',
		maxLength: 50,
		name: 'txtAlamatCabang',
		xtype: 'textarea'
	};

	var txtKodePosCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Pos Cabang',
		id: 'txtKodePosCabang',
		maxLength : 5,
 		enforceMaxLength : true,
		name: 'txtKodePosCabang',
		xtype: 'textfield'
	};

	var txtTelfonCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Telfon Cabang',
		id: 'txtTelfonCabang',
		maxLength: 15,
		enforceMaxLength : true,
		name: 'txtTelfonCabang',
		xtype: 'textfield'
	};

	var txtFaxCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Fax Cabang',
		id: 'txtFaxCabang',
		maxLength: 15,
 		enforceMaxLength : true,
		name: 'txtFaxCabang',
		xtype: 'textfield'
	};

	var txtEmailCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Email Cabang',
		id: 'txtEmailCabang',
		maxLength: 30,
		vtype: 'email',
		name: 'txtEmailCabang',
		xtype: 'textfield'
	};

	var txtNamaPimpinanCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Pimpinan Cabang',
		id: 'txtNamaPimpinanCabang',
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtNamaPimpinanCabang',
		xtype: 'textfield'
	};

	var txtJabatanPimpinanCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Jabatan Pimpinan Cabang',
		id: 'txtJabatanPimpinanCabang',
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtJabatanPimpinanCabang',
		xtype: 'textfield'
	};

	var txtKtpPimpinanCabang = {
		anchor: '100%',
		fieldLabel: 'Ktp Pimpinan Cabang',
		id: 'txtKtpPimpinanCabang',
		maxLength: 50,
		name: 'txtKtpPimpinanCabang',
		xtype: 'textfield'
	};

	var txtEmailPimpinanCabang = {
		anchor: '100%',
		fieldLabel: 'Email Pimpinan Cabang',
		id: 'txtEmailPimpinanCabang',
		maxLength: 30,
		vtype: 'email',
		name: 'txtEmailPimpinanCabang',
		xtype: 'textfield'
	};

	var txtNamaBankAngs = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Bank Angsuran',
		id: 'txtNamaBankAngs',
		maxLength: 50,
		name: 'txtNamaBankAngs',
		xtype: 'textfield'
	};

	var txtRekeningAngs = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Rekening Bank Angsuran',
		id: 'txtRekeningAngs',
		maxLength: 50,
		name: 'txtRekeningAngs',
		xtype: 'textfield'
	};	

	var txtAtasNamaBank = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Atas Nama Bank Angsuran',
		id: 'txtAtasNamaBank',
		maxLength: 50,
		name: 'txtAtasNamaBank',
		xtype: 'textfield'
	};	

	var cboParam = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '60%',
		fieldLabel: 'Kode Parameter',
		fieldStyle: 'text-transform: uppercase;',
		id: 'cboParam',
		maxLength: 25,
		name: 'cboParam',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtParam = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Parameter',
		id: 'txtParam',
		maxLength: 50,
		name: 'txtParam',
		xtype: 'textfield'
	};

	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'},
			{name: 'fs_alamat_cabang', type: 'string'},
			{name: 'fs_kota_cabang', type: 'string'},
			{name: 'fs_telfon_cabang', type: 'string'},
			{name: 'fs_fax_cabang', type: 'string'},
			{name: 'fs_email_cabang', type: 'string'},
			{name: 'fb_aktif', type: 'bool'}
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
			url: 'mastercabang/listMasterCabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 650,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode cabang',
			width: 100
		},{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Nama Cabang',
			width: 150
		},{
			dataIndex: 'fs_alamat_cabang',
			menuDisabled: true, 
			text: 'Alamat Cabang',
			width: 120
		},{
			dataIndex: 'fs_kota_cabang',
			menuDisabled: true, 
			text: 'Kota Cabang',
			width: 120
		},{
			dataIndex: 'fs_telfon_cabang',
			menuDisabled: true, 
			text: 'Telp Cabang',
			width: 100
		},
		{
			dataIndex: 'fs_fax_cabang',
			menuDisabled: true, 
			text: 'Fax Cabang',
			width: 100
		},
		{
			dataIndex: 'fs_email_cabang',
			menuDisabled: true, 
			text: 'Email Cabang',
			width: 100
		},{
			align: 'center',
			dataIndex: 'fs_aktif',
			menuDisabled: true, 
			stopSelection: false,
			text: 'Aktif',
			width: 55,
			xtype: 'checkcolumn',
			listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang /  Telp Cabang /  Email Cabang',
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
			markDirty: false
		}
	});

	function fnCekSimpan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'mastercabang/CekSimpan',
				params: {
					'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue()
				},
				success: function(response) {
					var xText = Ext.decode(response.responseText);
					
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xText.hasil,
							title: 'Siap'
						});
					}
					else {
						if (xText.sukses === true && xText.hasil == 'lanjut') {
							fnSimpan();
						}
						else {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSimpan();
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

	function fnSimpan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'mastercabang/Simpan',
			params: {
				'fs_kota_cabang': Ext.getCmp('cboKotaCabang').getValue(),
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_nama_cabang': Ext.getCmp('txtNamaCabang').getValue(),
				'fs_alamat_cabang': Ext.getCmp('txtAlamatCabang').getValue(),
				'fs_kodepos_cabang': Ext.getCmp('txtKodePosCabang').getValue(),
				'fs_telfon_cabang': Ext.getCmp('txtTelfonCabang').getValue(),
				'fs_fax_cabang': Ext.getCmp('txtFaxCabang').getValue(),
				'fs_email_cabang': Ext.getCmp('txtEmailCabang').getValue(),
				'fs_nama_pimpinan': Ext.getCmp('txtNamaPimpinanCabang').getValue(),
				'fs_jabatan_pimpinan': Ext.getCmp('txtJabatanPimpinanCabang').getValue(),
				'fs_ktp_pimpinan': Ext.getCmp('txtKtpPimpinanCabang').getValue(),
				'fs_email_pimpinan': Ext.getCmp('txtEmailPimpinanCabang').getValue(),
				'fs_nama_bank_angsuran': Ext.getCmp('txtNamaBankAngs').getValue(),
				'fs_rekening_bank_angsuran': Ext.getCmp('txtRekeningAngs').getValue(),
				'fs_atasnama_bank_angsuran': Ext.getCmp('txtAtasNamaBank').getValue(),
				'fs_aktif': Ext.getCmp('cekAktif').getValue(),
				'fd_tanggal_dibuat': Ext.Date.format(new Date(), 'Y-m-d')
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'ototicket'
				});
				fnReset();
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Simpan Gagal, Koneksi Gagal',
					title: 'ototicket'
				});
				fnMaskHide();
			}
		});
	}

	function fnReset() {
		Ext.getCmp('cboKotaCabang').setValue('');
		Ext.getCmp('cekAktif').setValue('1');
		Ext.getCmp('txtKodeCabang').setValue('');
		Ext.getCmp('txtNamaCabang').setValue('');
		Ext.getCmp('txtAlamatCabang').setValue('');
		Ext.getCmp('txtKodePosCabang').setValue('');
		Ext.getCmp('txtTelfonCabang').setValue('');
		Ext.getCmp('txtFaxCabang').setValue('');
		Ext.getCmp('txtEmailCabang').setValue('');
		Ext.getCmp('txtNamaPimpinanCabang').setValue('');
		Ext.getCmp('txtJabatanPimpinanCabang').setValue('');
		Ext.getCmp('txtKtpPimpinanCabang').setValue('');
		Ext.getCmp('txtEmailPimpinanCabang').setValue('');
		Ext.getCmp('txtNamaBankAngs').setValue('');
		Ext.getCmp('txtRekeningAngs').setValue('');
		Ext.getCmp('txtAtasNamaBank').setValue('');

		grupGridDetil.load();
	}

	var frmSetupVariabelTipe = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master cabang',
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
				title: 'Setup',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [
								txtKodeCabang
								
							]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cboKotaCabang
							]
						},
						{
							flex: 1.9,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cekAktif
							]
						}]
					},
					
						txtNamaCabang,
						txtAlamatCabang,
						txtKodePosCabang,
						txtTelfonCabang,
						txtFaxCabang,
						txtEmailCabang,
						txtNamaPimpinanCabang,
						txtJabatanPimpinanCabang,
						txtKtpPimpinanCabang,
						txtEmailPimpinanCabang,
						txtNamaBankAngs,
						txtRekeningAngs,
						txtAtasNamaBank
						//txtParam
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Simpan',
					handler: fnCekSimpan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset
				}]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Cabang',
				xtype: 'form',
				items: [
					gridDetil
				]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Silakan Tunggu...',
		target: frmSetupVariabelTipe
	});
	
	function fnMaskShow() {
		frmSetupVariabelTipe.mask('Silakan tunggu...');
	}

	function fnMaskHide() {
		frmSetupVariabelTipe.unmask();
	}
	
	frmSetupVariabelTipe.render(Ext.getBody());
	Ext.get('loading').destroy();
});