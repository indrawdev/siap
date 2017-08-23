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

	var grupNegaraKendaraan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_negara'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'negara_kendaraan',
				});
			}
		}
	});

	var grupJenisKendaraan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_jenis_kendaraan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jenis_kendaraan',
				});
			}
		}
	});

	var grupMerkKendaraan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_model'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'merek_kendaraan',
				});
			}
		}
	});


	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupNegaraKendaraan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupNegaraKendaraan,
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
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNegaraKendaraan').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtKodeNegara').setValue(record.get('fs_nilai1_referensi'));
				
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridJenisKendaraan = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupJenisKendaraan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJenisKendaraan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariJenisKendaraan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboJenisKendaraan').setValue(record.get('fs_nama_referensi'));
				
				winCariJenisKendaraan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridMerkKendaraan = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: true,
		store: grupMerkKendaraan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupMerkKendaraan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariMerkKendaraan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboMerkKendaraan').setValue(record.get('fs_nama_referensi'));
				
				
				winCariMerkKendaraan.hide();
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
				grupNegaraKendaraan.load();
				vMask.show();
			}
		}
	});

	var winCariJenisKendaraan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridJenisKendaraan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupJenisKendaraan.load();
				vMask.show();
			}
		}
	});

	var winCariMerkKendaraan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridMerkKendaraan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupMerkKendaraan.load();
				vMask.show();
			}
		}
	});

	var cboNegaraKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35%',
		fieldLabel: 'Negara Kendaraan',
		editable: true,
		id: 'cboNegaraKendaraan',
		//maxLength: 5,
		name: 'cboNegaraKendaraan',
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


	var cboJenisKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35%',
		fieldLabel: 'Jenis Kendaraan',
		editable: true,
		id: 'cboJenisKendaraan',
		//maxLength: 5,
		name: 'cboJenisKendaraan',
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
					winCariJenisKendaraan.show();
					winCariJenisKendaraan.center();
				}
			}
		}
	};

	var cboMerkKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35%',
		fieldLabel: 'Merek Kendaraan',
		editable: true,
		id: 'cboMerkKendaraan',
		//maxLength: 5,
		name: 'cboMerkKendaraan',
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
					winCariMerkKendaraan.show();
					winCariMerkKendaraan.center();
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

	var txtKodeNegara= {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		hidden:true,
		fieldLabel: 'Kode Negara',
		id: 'txtKodeNegara',
		maxLength: 50,
		name: 'txtKodeNegara',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		xtype: 'textfield'
	};


	var txtKodeMerek = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		fieldLabel: 'Kode Merek',
		id: 'txtKodeMerek',
		maxLength: 50,
		name: 'txtKodeMerek',
		xtype: 'textfield'
	};

	var txtSilinderKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Silinder Kendaraan',
		id: 'txtSilinderKendaraan',
		maxLength: 4,
		maskRe: /[1234567890]/,
		enforceMaxLength: true,
		name: 'txtSilinderKendaraan',
		xtype: 'textfield'
	};

	var txtKodeModelKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Kode Model Kendaraan',
		id: 'txtKodeModelKendaraan',
		maxLength: 15,
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP1234567890/|\.,-]/,
		enforceMaxLength: true,
		name: 'txtKodeModelKendaraan',
		xtype: 'textfield'
	};

	var txtKodeLama =  {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Kode Lama',
		id: 'txtKodeLama',
		maxLength: 6,
		enforceMaxLength: true,
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP1234567890/|\.,-]/,
		name: 'txtKodeLama',
		xtype: 'textfield'
	};

	var txtNamaModelKendaraan =  {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Model Kendaraan',
		id: 'txtNamaModelKendaraan',
		maxLength:50,
		enforceMaxLength: true,
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP1234567890/|\.,-]/,
		name: 'txtNamaModelKendaraan',
		xtype: 'textfield'
	};

	var txtNamaMerek = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		fieldLabel: 'Nama Merek',
		id: 'txtNamaMerek',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP/|\ .]/,
		name: 'txtNamaMerek',
		xtype: 'textfield'
	};


	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_kendaraan', type: 'string'},
			{name: 'fs_kode_kendaraan_lama', type: 'string'},
			{name: 'fs_model_kendaraan', type: 'string'},
			{name: 'fs_jenis_kendaraan', type: 'string'},
			{name: 'fs_merek_kendaraan', type: 'string'},
			{name: 'fs_silinder_kendaraan', type: 'string'}
		]
	});

	var grupGridDetil = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil',
		//pageSize: 999999999,
		bufferedRenderer: false,
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
			url: 'masterkendaraan/listMasterKendaraan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	 function change(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function pctChange(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '%</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }        
    

	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 650,
		sortableColumns: true,
		store: grupGridDetil,
		columnLines: true,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil
		}),
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_kendaraan',
			menuDisabled: true, 
			text: 'Kode Kendaraan',
			width: 100
		},{
			dataIndex: 'fs_kode_kendaraan_lama',
			menuDisabled: true, 
			renderer : 'usMoney', 
			text: 'Kode Kendaraan Lama',
			width: 150
		},{
			dataIndex: 'fs_model_kendaraan',
			menuDisabled: true, 
			text: 'Model Kendaraan',
			width: 120
		},{
			dataIndex: 'fs_jenis_kendaraan',
			menuDisabled: true, 
			text: 'Jenis Kendaraan',
			width: 120
		},{
			dataIndex: 'fs_merek_kendaraan',
			menuDisabled: true, 
			text: 'Merek Kendaraan',
			width: 100
		},
		{
			dataIndex: 'fs_silinder_kendaraan',
			menuDisabled: true, 
			text: 'Silinder Kendaraan',
			width: 100
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Kendaranan / Model kendaraan /  Jenis kendaraan /  Merk kendaraan',
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
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	function fnCekSimpan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masterkendaraan/CekSimpanKendaraan',
				params: {
					'fs_kode_baru': Ext.getCmp('txtKodeModelKendaraan').getValue(),
					'fs_kode_lama': Ext.getCmp('txtKodeLama').getValue()
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

	function fnCekSimpan1() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masterkendaraan/CekSimpan',
				params: {
					'fs_nama_referensi': Ext.getCmp('txtNamaMerek').getValue()
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
							fnSimpan1();
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
										fnSimpan1();
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
			url: 'masterkendaraan/Simpan',
			params: {
				'fs_kode_kendaraan': Ext.getCmp('txtKodeModelKendaraan').getValue(),
				'fs_kode_kendaraan_lama': Ext.getCmp('txtKodeLama').getValue(),
				'fs_model_kendaraan': Ext.getCmp('txtNamaModelKendaraan').getValue(),
				'fs_jenis_kendaraan': Ext.getCmp('cboJenisKendaraan').getValue(),
				'fs_merek_kendaraan': Ext.getCmp('cboMerkKendaraan').getValue(),
				'fs_silinder_kendaraan': Ext.getCmp('txtSilinderKendaraan').getValue(),
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

	function fnSimpan1() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masterkendaraan/Simpan',
			params: {
				'fs_kode_referensi': 'merek_kendaraan',
				'fs_nilai1_referensi': Ext.getCmp('txtNamaMerek').getValue(),
				'fs_nilai2_referensi': Ext.getCmp('txtKodeNegara').getValue(),
				'fs_nama_referensi': Ext.getCmp('txtNamaMerek').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'siap'
				});
				fnReset1();
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Simpan Gagal, Koneksi Gagal',
					title: 'siap'
				});
				fnMaskHide();
			}
		});
	}

	function fnReset() {
		Ext.getCmp('txtKodeModelKendaraan').setValue('');
		Ext.getCmp('txtKodeLama').setValue('');
		Ext.getCmp('txtNamaModelKendaraan').setValue('');
		Ext.getCmp('cboJenisKendaraan').setValue('');
		Ext.getCmp('cboMerkKendaraan').setValue('');
		Ext.getCmp('txtSilinderKendaraan').setValue('');

		grupGridDetil.load();
	}

	function fnReset1() {
		Ext.getCmp('cboNegaraKendaraan').setValue('');
		Ext.getCmp('txtKodeNegara').setValue('');
		Ext.getCmp('txtNamaMerek').setValue('');

		grupGridDetil.load();
	}

	var frmSetupVariabelTipe = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master cabang',
		width: 770,
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
				title: 'Setup Merek',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [

						cboNegaraKendaraan,
						txtKodeNegara,
						txtNamaMerek
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Simpan',
					handler: fnCekSimpan1
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset1
				}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Model Kendaraan',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [
					txtKodeModelKendaraan,
					txtKodeLama,
					txtNamaModelKendaraan,
					cboJenisKendaraan,
					cboMerkKendaraan,
					txtSilinderKendaraan
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
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Kendaraan',
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