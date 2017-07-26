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

	var grupKotaDealer= Ext.create('Ext.data.Store', {
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
		store: grupKotaDealer,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaDealer,
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
				Ext.getCmp('cboKotaDealer').setValue(record.get('fs_nama_kota'));
				
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
				grupKotaDealer.load();
				vMask.show();
			}
		}
	});

	var cboKotaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		fieldLabel: 'Kota Dealer',
		editable: true,
		id: 'cboKotaDealer',
		//maxLength: 5,
		name: 'cboKotaDealer',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
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

	var txtKodeDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '20%',
		fieldLabel: 'Kode Dealer',
		id: 'txtKodeDealer',
		maxLength : 2,
 		enforceMaxLength : true,
		name: 'txtKodeDealer',
		xtype: 'textfield'
	};

	var txtKodeDealer2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '20%',
		fieldLabel: 'Kode Dealer 2',
		id: 'txtKodeDealer2',
		maxLength: 50,
		name: 'txtKodeDealer2',
		xtype: 'textfield'
	};

	var txtNomorDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '20%',
		maxLength : 2,
 		enforceMaxLength : true,
		fieldLabel: 'Nomor Dealer',
		id: 'txtNomorDealer',
		name: 'txtNomorDealer',
		xtype: 'textfield'
	};

	var txtCabangDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '20%',
 		value:21,
 		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Cabang Dealer',
		id: 'txtCabangDealer',
		maxLength: 50,
		name: 'txtCabangDealer',
		xtype: 'textfield'
	};


	var txtNamaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Dealer',
		id: 'txtNamaDealer',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtNamaDealer',
		xtype: 'textfield'
	};

	var txtAlamatDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Alamat Dealer',
		id: 'txtAlamatDealer',
		maxLength: 50,
		name: 'txtAlamatDealer',
		xtype: 'textarea'
	};

	var txtTelfonDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Telfon Dealer',
		id: 'txtTelfonDealer',
		maxLength : 15,
 		enforceMaxLength : true,
		name: 'txtTelfonDealer',
		xtype: 'textfield'
	};

	var txtHpDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Handphone Dealer',
		id: 'txtHpDealer',
		maxLength : 15,
 		enforceMaxLength : true,
		name: 'txtHpDealer',
		xtype: 'textfield'
	};

	var txtNamaPemilik = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Pemilik',
		id: 'txtNamaPemilik',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtNamaDealer',
		name: 'txtNamaPemilik',
		xtype: 'textfield'
	};

	var txtKtpPemilik = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'KTP Pemilik',
		id: 'txtKtpPemilik',
		maxLength: 50,
		enforceMaxLength: true,
		name: 'txtKtpPemilik',
		xtype: 'textfield'
	};

	var txtNamaBankPencairan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Bank Pencairan',
		id: 'txtNamaBankPencairan',
		maxLength: 30,
		enforceMaxLength: true,
		name: 'txtNamaBankPencairan',
		xtype: 'textfield'
	};

	var txtNomorRekPencairan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Rekening Pencairan',
		id: 'txtNomorRekPencairan',
		maxLength: 30,
		enforceMaxLength: true,
		name: 'txtNomorRekPencairan',
		xtype: 'textfield'
	};

	var txtAtasNamaBankPencairan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Atas Nama Bank Pencairan',
		id: 'txtAtasNamaBankPencairan',
		maxLength: 30,
		enforceMaxLength: true,
		name: 'txtAtasNamaBankPencairan',
		xtype: 'textfield'
	};


	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_dealer1', type: 'string'},
			{name: 'fs_kode_dealer2', type: 'string'},
			{name: 'fs_nama_dealer', type: 'string'},
			{name: 'fs_alamat_dealer', type: 'string'},
			{name: 'fs_kota_dealer', type: 'string'},
			{name: 'fs_telepon_dealer', type: 'string'},
			{name: 'fs_handphone_dealer', type: 'string'},
			{name: 'fs_nama_pemilik', type: 'string'},
			{name: 'fs_ktp_pemilik', type: 'string'}
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
			url: 'masterdealer/listMasterDealer'
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
			dataIndex: 'fs_kode_dealer1',
			menuDisabled: true, 
			text: 'Kode Dealer 1',
			width: 100
		},{
			dataIndex: 'fs_kode_dealer2',
			menuDisabled: true, 
			text: 'Kode Dealer 2',
			width: 100
		},{
			dataIndex: 'fs_nama_dealer',
			menuDisabled: true, 
			text: 'Nama Dealer',
			width: 150
		},{
			dataIndex: 'fs_alamat_dealer',
			menuDisabled: true, 
			text: 'Alamat Dealer',
			width: 120
		},{
			dataIndex: 'fs_kota_dealer',
			menuDisabled: true, 
			text: 'Kota Dealer',
			width: 120
		},{
			dataIndex: 'fs_telepon_dealer',
			menuDisabled: true, 
			text: 'Telp Dealer',
			width: 100
		},
		{
			dataIndex: 'fs_handphone_dealer',
			menuDisabled: true, 
			text: 'Handphone Dealer',
			width: 100
		},
		{
			dataIndex: 'fs_nama_pemilik',
			menuDisabled: true, 
			text: 'Nama Pemilik',
			width: 100
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Dealer  / Nama Dealer /  Nama Pemilik',
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
				url: 'masterdealer/CekSimpan',
				params: {
					'fs_kode_dealer1': Ext.getCmp('txtKodeDealer').getValue(),
					'fs_kode_dealer2': Ext.getCmp('txtNomorDealer').getValue()
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
			url: 'masterdealer/Simpan',
			params: {
				'fs_kota_dealer': Ext.getCmp('cboKotaDealer').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKodeDealer').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtNomorDealer').getValue(),
				'fs_cabang_dealer': Ext.getCmp('txtCabangDealer').getValue(),
				'fs_nama_dealer': Ext.getCmp('txtNamaDealer').getValue(),
				'fs_alamat_dealer': Ext.getCmp('txtAlamatDealer').getValue(),
				'fs_telepon_dealer': Ext.getCmp('txtTelfonDealer').getValue(),
				'fs_handphone_dealer': Ext.getCmp('txtHpDealer').getValue(),
				'fs_nama_pemilik': Ext.getCmp('txtNamaPemilik').getValue(),
				'fs_ktp_pemilik': Ext.getCmp('txtKtpPemilik').getValue(),
				'fs_nama_bank_pencairan': Ext.getCmp('txtNamaBankPencairan').getValue(),
				'fs_rekening_bank_pencairan': Ext.getCmp('txtNomorRekPencairan').getValue(),
				'fs_atasnama_bank_pencairan': Ext.getCmp('txtAtasNamaBankPencairan').getValue(),
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
		Ext.getCmp('cboKotaDealer').setValue('');
		Ext.getCmp('txtCabangDealer').setValue('1');
		Ext.getCmp('txtKodeDealer').setValue('');
		Ext.getCmp('txtKodeDealer2').setValue('');
		Ext.getCmp('txtNamaDealer').setValue('');
		Ext.getCmp('txtAlamatDealer').setValue('');
		Ext.getCmp('txtTelfonDealer').setValue('');
		Ext.getCmp('txtHpDealer').setValue('');
		Ext.getCmp('txtNamaPemilik').setValue('');
		Ext.getCmp('txtKtpPemilik').setValue('');
		Ext.getCmp('txtNamaBankPencairan').setValue('');
		Ext.getCmp('txtNomorRekPencairan').setValue('');
		Ext.getCmp('txtAtasNamaBankPencairan').setValue('');

		grupGridDetil.load();
	}

	var frmSetupVariabelTipe = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Dealer',
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
						labelWidth: 115,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [
						cboKotaDealer,
						txtKodeDealer,
						txtNomorDealer,
						txtCabangDealer,
						txtNamaDealer,
						txtAlamatDealer,
						txtTelfonDealer,
						txtHpDealer,
						txtNamaPemilik,
						txtKtpPemilik,
						txtNamaBankPencairan,
						txtNomorRekPencairan,
						txtAtasNamaBankPencairan
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
				title: 'Daftar Dealer',
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