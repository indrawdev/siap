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

	Ext.define('DataGridDealer', {
		extend: 'Ext.data.Model',
		fields: []
	});

	var grupGridDealer = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDealer',
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
			url: 'masterdealer/list'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridDealer = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		sortableColumns: false,
		store: grupGridDealer,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_nama_dealer',
			menuDisabled: true, 
			text: 'Nama Dealer',
			locked: true,
			width: 250
		},{
			dataIndex: 'fs_alamat_dealer',
			menuDisabled: true, 
			text: 'Alamat Dealer',
			width: 350
		},{
			dataIndex: 'fs_kota_dealer',
			menuDisabled: true, 
			text: 'Kota Dealer',
			width: 120
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
			dataIndex: 'fs_telepon_dealer',
			menuDisabled: true, 
			text: 'Telephone Dealer',
			width: 100
		},{
			dataIndex: 'fs_handphone_dealer',
			menuDisabled: true, 
			text: 'Handphone Dealer',
			width: 100
		},{
			dataIndex: 'fs_nama_pemilik',
			menuDisabled: true, 
			text: 'Nama Pemilik',
			width: 150
		},{
			dataIndex: 'fs_npwp_pemilik',
			menuDisabled: true, 
			text: 'NPWP',
			hidden: true
		},{
			dataIndex: 'fs_ktp_pemilik',
			menuDisabled: true, 
			text: 'KTP Pemilik',
			hidden: true
		},{
			dataIndex: 'fs_nama_bank_pencairan',
			menuDisabled: true, 
			text: 'Nama Bank Pencairan',
			hidden: true
		},{
			dataIndex: 'fs_rekening_bank_pencairan',
			menuDisabled: true, 
			text: 'Rekening Bank Pencairan',
			hidden: true
		},{
			dataIndex: 'fs_atasnama_bank_pencairan',
			menuDisabled: true, 
			text: 'A/N Bank Pencairan',
			hidden: true
		},{
			dataIndex: 'fn_persen_refund_bunga',
			menuDisabled: true, 
			text: 'Persen Refund Bunga',
			hidden: true
		},{
			dataIndex: 'fn_persen_refund_asuransi',
			menuDisabled: true, 
			text: 'Persen Refund Asuransi',
			hidden: true
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
					grupGridDealer.load();
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
			store: grupGridDealer
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboAktif').setValue(record.get('fs_aktif'));
				Ext.getCmp('txtCabang').setValue(record.get('fn_cabang_dealer'));
				Ext.getCmp('txtKodeDealer1').setValue(record.get('fs_kode_dealer1'));
				Ext.getCmp('txtKodeDealer2').setValue(record.get('fs_kode_dealer2'));
				Ext.getCmp('txtNamaDealer').setValue(record.get('fs_nama_dealer'));
				Ext.getCmp('txtAlamatCabang').setValue(record.get('fs_alamat_dealer'));
				Ext.getCmp('txtKota').setValue(record.get('fs_kota_dealer'));
				Ext.getCmp('txtTelphone').setValue(record.get('fs_telepon_dealer'));
				Ext.getCmp('txtHandphone').setValue(record.get('fs_handphone_dealer'));
				Ext.getCmp('txtNamaPemilik').setValue(record.get('fs_nama_pemilik'));
				Ext.getCmp('txtNoNPWP').setValue(record.get('fs_npwp_pemilik'));
				Ext.getCmp('txtNoKTP').setValue(record.get('fs_ktp_pemilik'));
				Ext.getCmp('txtNamaBank').setValue(record.get('fs_nama_bank_pencairan'));
				Ext.getCmp('txtNoRek').setValue(record.get('fs_rekening_bank_pencairan'));
				Ext.getCmp('txtNamaRek').setValue(record.get('fs_atasnama_bank_pencairan'));
				Ext.getCmp('txtRefundBunga').setValue(record.get('fn_persen_refund_bunga'));
				Ext.getCmp('txtRefundAss').setValue(record.get('fn_persen_refund_asuransi'));

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
			url: 'masterdealer/cb_aktif'
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

	var txtKodeDealer1 = {
		allowDecimals: false,
		allowNegative: false,
		anchor: '100%',
		fieldLabel: 'Kode Dealer 1',
		id: 'txtKodeDealer1',
		name: 'txtKodeDealer1',
		xtype: 'numberfield',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		maxValue: 99,
		minValue: 1,
		maxLength: 2,
		enforceMaxLength: true
	};

	var txtKodeDealer2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false,
		anchor: '100%',
		fieldLabel: 'Kode Dealer 2',
		id: 'txtKodeDealer2',
		name: 'txtKodeDealer2',
		xtype: 'numberfield',
		maxValue: 99,
		minValue: 1,
		maxLength: 2,
		enforceMaxLength: true
	};

	var txtCabang = {
		anchor: '100%',
		fieldLabel: 'Cabang',
		id: 'txtCabang',
		name: 'txtCabang',
		xtype: 'numberfield',
		value: 1,
		maxValue: 99,
		minValue: 1,
		maxLength: 2,
		enforceMaxLength: true
	};

	var txtNamaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Dealer',
		id: 'txtNamaDealer',
		name: 'txtNamaDealer',
		xtype: 'textfield',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
	};

	var txtAlamatCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Cabang',
		id: 'txtAlamatCabang',
		name: 'txtAlamatCabang',
		xtype: 'textareafield',
	};

	var grupKodePos = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kodepos','fs_propinsi',
			'fs_kecamatan','fs_nama_dati'
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
			url: 'masterdealer/kodepos'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKodePos,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pos", dataIndex: 'fs_kodepos', menuDisabled: true, locked:true, width: 100},
			{text: "Propinsi", dataIndex: 'fs_propinsi', menuDisabled: true, width: 150},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan', menuDisabled: true, width: 150},
			{text: "Kabupaten", dataIndex: 'fs_nama_dati', menuDisabled: true, width: 250},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Propinsi / Kecamatan / Kabupaten',
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
					grupKodePos.load();
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
			store: grupKodePos,
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
				Ext.getCmp('cboKodePos').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nama_dati'));
				grupKodePos.load();
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
				grupKodePos.load();
				vMask.show();
			}
		}
	});

	var cboKodePos = {
		anchor: '100%',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePos',
		name: 'cboKodePos',
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

	var txtKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kota',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtKota',
		name: 'txtKota',
		xtype: 'textfield'
	};

	var txtTelphone = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Telephone',
		id: 'txtTelphone',
		name: 'txtTelphone',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtHandphone = {
		anchor: '100%',
		fieldLabel: 'Handphone',
		id: 'txtHandphone',
		name: 'txtHandphone',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtNamaPemilik = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Pemilik',
		id: 'txtNamaPemilik',
		name: 'txtNamaPemilik',
		xtype: 'textfield',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
	};

	var txtNoNPWP = {
		anchor: '100%',
		fieldLabel: 'No. NPWP',
		id: 'txtNoNPWP',
		name: 'txtNoNPWP',
		xtype: 'textfield'
	};

	var txtNoKTP = {
		anchor: '100%',
		fieldLabel: 'No. KTP',
		id: 'txtNoKTP',
		name: 'txtNoKTP',
		xtype: 'textfield',
		maxLength: 50,
		enforceMaxLength: true
	};

	var txtNamaBank = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Bank Pencarian',
		id: 'txtNamaBank',
		name: 'txtNamaBank',
		xtype: 'textfield',
		maxLength: 30,
		enforceMaxLength: true
	};

	var txtRefundBunga = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Persen Refund Bunga',
		id: 'txtRefundBunga',
		name: 'txtRefundBunga',
		xtype: 'textfield'
	};

	var txtNoRek = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Rekening Pencairan',
		id: 'txtNoRek',
		name: 'txtNoRek',
		xtype: 'textfield',
		maxLength: 30,
		enforceMaxLength: true
	};

	var txtRefundAss = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Persen Refund Ass',
		id: 'txtRefundAss',
		name: 'txtRefundAss',
		xtype: 'textfield'
	};

	var txtNamaRek = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Atas Nama Rekening',
		id: 'txtNamaRek',
		name: 'txtNamaRek',
		xtype: 'textfield',
		maxLength: 30,
		enforceMaxLength: true
	};

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterdealer/ceksave',
				params: {
					'fs_kode_dealer1': Ext.getCmp('txtKodeDealer1').getValue(),
					'fs_kode_dealer2': Ext.getCmp('txtKodeDealer2').getValue(),
					'fn_cabang_dealer': Ext.getCmp('txtCabang').getValue()
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
			url: 'masterdealer/save',
			params: {
				'fs_aktif': Ext.getCmp('cboAktif').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKodeDealer1').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtKodeDealer2').getValue(),
				'fn_cabang_dealer': Ext.getCmp('txtCabang').getValue(),
				'fs_nama_dealer': Ext.getCmp('txtNamaDealer').getValue(),
				'fs_alamat_dealer': Ext.getCmp('txtAlamatCabang').getValue(),
				'fs_kota_dealer': Ext.getCmp('txtKota').getValue(),
				'fs_telepon_dealer': Ext.getCmp('txtTelphone').getValue(),
				'fs_handphone_dealer': Ext.getCmp('txtHandphone').getValue(),
				'fs_nama_pemilik': Ext.getCmp('txtNamaPemilik').getValue(),
				'fs_npwp_pemilik': Ext.getCmp('txtNoNPWP').getValue(),
				'fs_ktp_pemilik': Ext.getCmp('txtNoKTP').getValue(),
				'fs_nama_bank_pencairan': Ext.getCmp('txtNamaBank').getValue(),
				'fn_persen_refund_bunga': Ext.getCmp('txtRefundBunga').getValue(),
				'fs_rekening_bank_pencairan': Ext.getCmp('txtNoRek').getValue(),
				'fn_persen_refund_asuransi': Ext.getCmp('txtRefundAss').getValue(),
				'fs_atasnama_bank_pencairan': Ext.getCmp('txtNamaRek').getValue(),
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
		//Ext.getCmp('txtKodeDealer1').setValue('');
		Ext.getCmp('txtKodeDealer2').setValue('');
		Ext.getCmp('txtNamaDealer').setValue('');
		Ext.getCmp('txtAlamatCabang').setValue('');
		Ext.getCmp('cboKodePos').setValue('');
		Ext.getCmp('txtCabang').setValue('1');
		Ext.getCmp('txtKota').setValue('');
		Ext.getCmp('txtTelphone').setValue('');
		Ext.getCmp('txtHandphone').setValue('');
		Ext.getCmp('txtNamaPemilik').setValue('');
		Ext.getCmp('txtNoNPWP').setValue('');
		Ext.getCmp('txtNoKTP').setValue('');
		Ext.getCmp('txtNamaBank').setValue('');
		Ext.getCmp('txtRefundBunga').setValue('');
		Ext.getCmp('txtNoRek').setValue('');
		Ext.getCmp('txtRefundAss').setValue('');
		Ext.getCmp('txtNamaRek').setValue('');
		grupGridDealer.load();
	}

	Ext.Ajax.request({
		method: 'POST',
		url: 'masterdealer/nilaidefa',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			if (xtext.sukses === true) {
				Ext.getCmp('txtKodeDealer1').setValue(xtext.kode_cabang);
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

	var frmMasterDealer = Ext.create('Ext.form.Panel', {
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
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Dealer',
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
						gridDealer
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Dealer',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					title: 'Setup Dealer',
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
								txtKodeDealer1
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtKodeDealer2
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtCabang
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
								txtNamaDealer,
								txtAlamatCabang
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
								cboKodePos
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtKota
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
								txtTelphone
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtHandphone
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
								txtNamaPemilik
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
								txtNoNPWP
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtNoKTP
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
								txtNamaBank
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtRefundBunga
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
								txtNoRek
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 0 5px;',
							items: [
								txtRefundAss
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
								txtNamaRek
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
		target: frmMasterDealer
	});

	function fnMaskShow() {
		frmMasterDealer.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterDealer.unmask();
	}

	frmMasterDealer.render(Ext.getBody());
	Ext.get('loading').destroy();
});