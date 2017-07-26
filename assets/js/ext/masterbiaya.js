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

	Ext.define('DataGridAdmin', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_jenis_piutang', type: 'string'},
			{name: 'fs_pola_transaksi', type: 'string'},
			{name: 'fd_lama_angsuran', type: 'string'},
			{name: 'fs_biaya_admin', type: 'string'}
		]
	});

	var grupBiayaAdmin = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridAdmin',
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
			url: 'masterbiaya/gridadmin'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('cboCabang1').getValue(),
					'fs_jenis_piutang': Ext.getCmp('cboJenisPi1').getValue(),
					'fs_pola_transaksi': Ext.getCmp('cboPola1').getValue(),
					'fd_lama_angsuran': Ext.getCmp('cboTenor1').getValue()
				});
			}
		}
	});

	var gridBiayaAdmin = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupBiayaAdmin,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Piutang',
			dataIndex: 'fs_jenis_piutang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Pola Transaksi',
			dataIndex: 'fs_pola_transaksi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Tenor',
			dataIndex: 'fd_lama_angsuran',
			menuDisabled: true,
			width: 80
		},{
			text: 'Biaya Admin',
			dataIndex: 'fs_biaya_admin',
			menuDisabled: true,
			width: 150
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBiayaAdmin
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang1').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('cboJenisPi1').setValue(record.get('fs_jenis_piutang'));
				Ext.getCmp('cboPola1').setValue(record.get('fs_pola_transaksi'));
				Ext.getCmp('cboTenor1').setValue(record.get('fd_lama_angsuran'));
				Ext.getCmp('txtBiayaAdm1').setValue(record.get('fs_biaya_admin'));
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	Ext.define('DataGridFidusia', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_jenis_piutang', type: 'string'},
			{name: 'fs_pola_transaksi', type: 'string'},
			{name: 'fs_min_otr', type: 'string'},
			{name: 'fs_max_otr', type: 'string'},
			{name: 'fs_biaya_fidusia', type: 'string'}
		]
	});

	var grupBiayaFidusia = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridFidusia',
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
			url: 'masterbiaya/gridfidusia'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('cboCabang2').getValue(),
					'fs_jenis_piutang': Ext.getCmp('cboJenisPi2').getValue(),
					'fs_pola_transaksi': Ext.getCmp('cboPola2').getValue()
				});
			}
		}
	});

	var gridBiayaFidusia = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupBiayaFidusia,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Piutang',
			dataIndex: 'fs_jenis_piutang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Pola Transaksi',
			dataIndex: 'fs_pola_transaksi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Min OTR',
			dataIndex: 'fs_min_otr',
			menuDisabled: true,
			width: 100
		},{
			text: 'Max OTR',
			dataIndex: 'fs_max_otr',
			menuDisabled: true,
			width: 100			
		},{
			text: 'Biaya Fidusia',
			dataIndex: 'fs_biaya_fidusia',
			menuDisabled: true,
			width: 90
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBiayaFidusia
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang2').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('cboJenisPi2').setValue(record.get('fs_jenis_piutang'));
				Ext.getCmp('cboPola2').setValue(record.get('fs_pola_transaksi'));
				Ext.getCmp('txtMinOTR2').setValue(record.get('fs_min_otr'));
				Ext.getCmp('txtMaxOTR2').setValue(record.get('fs_max_otr'));
				Ext.getCmp('txtBiayaFid2').setValue(record.get('fs_biaya_fidusia'));
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	Ext.define('DataGridAsuransi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_asuransi', type: 'string'},
			{name: 'fs_wilayah_asuransi', type: 'string'},
			{name: 'fs_jenis_kendaraan', type: 'string'},
			{name: 'fs_komersial', type: 'string'},
			{name: 'fs_min_otr', type: 'string'},
			{name: 'fs_max_otr', type: 'string'},
			{name: 'fs_persentase_premi', type: 'string'}
		]
	});

	var grupBiayaAsuransi = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridAsuransi',
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
			url: 'masterbiaya/gridasuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_asuransi': Ext.getCmp('cboJenisAs3').getValue(),
					'fs_wilayah_asuransi': Ext.getCmp('cboWilayahAs3').getValue(),
					'fs_jenis_kendaraan': Ext.getCmp('cboJenisKend3').getValue(),
					'fs_komersial': Ext.getCmp('cboKomersil3').getValue()
				});
			}
		}
	});

	var gridBiayaAsuransi = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupBiayaAsuransi,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Asuransi',
			dataIndex: 'fs_kode_asuransi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Wilayah Asuransi',
			dataIndex: 'fs_wilayah_asuransi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Kendaraan',
			dataIndex: 'fs_jenis_kendaraan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Komersial',
			dataIndex: 'fs_komersial',
			menuDisabled: true,
			width: 80
		},{
			text: 'Min OTR',
			dataIndex: 'fs_min_otr',
			menuDisabled: true,
			width: 120
		},{
			text: 'Max OTR',
			dataIndex: 'fs_max_otr',
			menuDisabled: true,
			width: 120			
		},{
			text: 'Persen Premi',
			dataIndex: 'fs_persentase_premi',
			menuDisabled: true,
			width: 100
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBiayaAsuransi
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboJenisAs3').setValue(record.get('fs_kode_asuransi'));
				Ext.getCmp('cboWilayahAs3').setValue(record.get('fs_wilayah_asuransi'));
				Ext.getCmp('cboJenisKend3').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('cboKomersil3').setValue(record.get('fs_komersial'));
				Ext.getCmp('txtMinOTR3').setValue(record.get('fs_min_otr'));
				Ext.getCmp('txtMaxOTR3').setValue(record.get('fs_max_otr'));
				Ext.getCmp('txtPersenPremi3').setValue(record.get('fs_persentase_premi'));
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	Ext.define('DataGridPerluasan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_asuransi', type: 'string'},
			{name: 'fs_wilayah_asuransi', type: 'string'},
			{name: 'fs_perluasan', type: 'string'},
			{name: 'fs_rate_kontribusi', type: 'string'}
		]
	});

	var grupBiayaPerluasan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPerluasan',
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
			url: 'masterbiaya/gridperluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_asuransi': Ext.getCmp('cboJenisAs4').getValue(),
					'fs_wilayah_asuransi': Ext.getCmp('cboWilayahAs4').getValue(),
					'fs_perluasan': Ext.getCmp('cboJenisPer4').getValue()
				});
			}
		}
	});

	var gridBiayaPerluasan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupBiayaPerluasan,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Asuransi',
			dataIndex: 'fs_kode_asuransi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Wilayah Asuransi',
			dataIndex: 'fs_wilayah_asuransi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Perluasan',
			dataIndex: 'fs_perluasan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Rate',
			dataIndex: 'fs_rate_kontribusi',
			menuDisabled: true,
			width: 100
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBiayaPerluasan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboJenisAs4').setValue(record.get('fs_kode_asuransi'));
				Ext.getCmp('cboWilayahAs4').setValue(record.get('fs_wilayah_asuransi'));
				Ext.getCmp('cboJenisPer4').setValue(record.get('fs_perluasan'));
				Ext.getCmp('txtRate4').setValue(record.get('fs_rate_kontribusi'));
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	Ext.define('DataGridTJH', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_jenis_kendaraan', type: 'string'},
			{name: 'fs_min_otr', type: 'string'},
			{name: 'fs_max_otr', type: 'string'},
			{name: 'fs_rate_tjh', type: 'string'}
		]
	});

	var grupBiayaTJH = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridTJH',
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
			url: 'masterbiaya/gridtjh'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_jenis_kendaraan': Ext.getCmp('cboJenisKend5').getValue()
				});
			}
		}
	});

	var gridBiayaTJH = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupBiayaTJH,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Jenis Kendaraan',
			dataIndex: 'fs_jenis_kendaraan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Min OTR',
			dataIndex: 'fs_min_otr',
			menuDisabled: true,
			width: 120
		},{
			text: 'Max OTR',
			dataIndex: 'fs_max_otr',
			menuDisabled: true,
			width: 120		
		},{
			text: 'Rate',
			dataIndex: 'fs_rate_tjh',
			menuDisabled: true,
			width: 100	
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBiayaTJH
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboJenisKend5').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('txtMinOTR5').setValue(record.get('fs_min_otr'));
				Ext.getCmp('txtMaxOTR5').setValue(record.get('fs_max_otr'));
				Ext.getCmp('txtRate5').setValue(record.get('fs_rate_tjh'));
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});


	var grupCabang = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fs_nama_cabang',
			'fs_alamat_cabang','fs_kota_cabang'
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
			url: 'masterbiaya/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupJenisPi = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'jenis_piutang'
				});
			}
		}
	});

	var grupPola = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'pola_transaksi'
				});
			}
		}
	});

	var grupJenisAs = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'jenis_asuransi'
				});
			}
		}
	});

	var grupWilayahAs = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'wilayah_asuransi'
				});
			}
		}
	});

	var grupJenisKend = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'jenis_kendaraan'
				});
			}
		}
	});

	var grupTenor = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_tenor'
		}
	});

	var grupKomersil = Ext.create('Ext.data.Store', {
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
			url: 'masterbiaya/cb_komersil'
		}
	});

	var grupJenisPer = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx','fs_nm_strx', 'fs_xx_strx'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'masterbiaya/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'perluasan_asuransi'
				});
			}
		}
	});

	/* BIAYA ADMIN */
	var winGrid1 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 80},
			{text: 'Nama Cabang', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 200},
			{text: 'Alamat Cabang', dataIndex: 'fs_alamat_cabang', menuDisabled: true, width: 400},
			{text: 'Kota Cabang', dataIndex: 'fs_kota_cabang', menuDisabled: true, width: 100}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Cabang',
				id: 'txtCari1',
				name: 'txtCari1',
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
					grupCabang.load();
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang1').setValue(record.get('fs_kode_cabang'));
				grupCabang.load();
				winCari1.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari1 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid1
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var cboCabang1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		editable: false,
		id: 'cboCabang1',
		name: 'cboCabang1',
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
					winCari1.show();
					winCari1.center();
				}
			}
		}
	};

	var cboJenisPi1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Piutang',
		id: 'cboJenisPi1',
		name: 'cboJenisPi1',
		store: grupJenisPi,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboPola1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Pola Transaksi',
		id: 'cboPola1',
		name: 'cboPola1',
		store: grupPola,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboTenor1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Tenor',
		id: 'cboTenor1',
		name: 'cboTenor1',
		store: grupTenor,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtBiayaAdm1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Biaya Admin',
		id: 'txtBiayaAdm1',
		name: 'txtBiayaAdm1',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var btnSearch1 = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch1',
		name: 'btnSearch1',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupBiayaAdmin.load();
		}
	};

	var btnSave1 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave1',
		name: 'btnSave1',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave1
	};

	var btnReset1 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset1',
		name: 'btnReset1',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset1
	};

	/* BIAYA FIDUSIA */
	var winGrid2 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 80},
			{text: 'Nama Cabang', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 200},
			{text: 'Alamat Cabang', dataIndex: 'fs_alamat_cabang', menuDisabled: true, width: 400},
			{text: 'Kota Cabang', dataIndex: 'fs_kota_cabang', menuDisabled: true, width: 100}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Cabang',
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
					grupCabang.load();
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang,
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
				Ext.getCmp('cboCabang2').setValue(record.get('fs_kode_cabang'));
				grupCabang.load();
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
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var cboCabang2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		editable: false,
		id: 'cboCabang2',
		name: 'cboCabang2',
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

	var cboJenisPi2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Piutang',
		id: 'cboJenisPi2',
		name: 'cboJenisPi2',
		store: grupJenisPi,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboPola2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Pola Transaksi',
		id: 'cboPola2',
		name: 'cboPola2',
		store: grupPola,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtMinOTR2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Min OTR',
		id: 'txtMinOTR2',
		name: 'txtMinOTR2',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtMaxOTR2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Maks OTR',
		id: 'txtMaxOTR2',
		name: 'txtMaxOTR2',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtBiayaFid2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Biaya Fidusia',
		id: 'txtBiayaFid2',
		name: 'txtBiayaFid2',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var btnSearch2 = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch2',
		name: 'btnSearch2',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupBiayaFidusia.load();
		}
	};

	var btnSave2 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave2',
		name: 'btnSave2',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave2
	};

	var btnReset2 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset2',
		name: 'btnReset2',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset2
	};


	/* BIAYA ASURANSI */
	var cboJenisAs3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Asuransi',
		id: 'cboJenisAs3',
		name: 'cboJenisAs3',
		store: grupJenisAs,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboWilayahAs3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Wilayah Asuransi',
		id: 'cboWilayahAs3',
		name: 'cboWilayahAs3',
		store: grupWilayahAs,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboJenisKend3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Kendaraan',
		id: 'cboJenisKend3',
		name: 'cboJenisKend3',
		store: grupJenisKend,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboKomersil3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Komersial',
		id: 'cboKomersil3',
		name: 'cboKomersil3',
		store: grupKomersil,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtMinOTR3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Min OTR',
		id: 'txtMinOTR3',
		name: 'txtMinOTR3',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtMaxOTR3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Maks OTR',
		id: 'txtMaxOTR3',
		name: 'txtMaxOTR3',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtPersenPremi3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Persen Premi',
		id: 'txtPersenPremi3',
		name: 'txtPersenPremi3',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var btnSearch3 = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch3',
		name: 'btnSearch3',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupBiayaAsuransi.load();
		}
	};

	var btnSave3 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave3',
		name: 'btnSave3',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave3
	};

	var btnReset3 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset3',
		name: 'btnReset3',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset3
	};

	/* BIAYA PERLUASAN */
	var cboJenisAs4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Asuransi',
		id: 'cboJenisAs4',
		name: 'cboJenisAs4',
		store: grupJenisAs,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboWilayahAs4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Wilayah Asuransi',
		id: 'cboWilayahAs4',
		name: 'cboWilayahAs4',
		store: grupWilayahAs,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboJenisPer4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_xx_strx',
		editable: false,
		fieldLabel: 'Jenis Perluasan',
		id: 'cboJenisPer4',
		name: 'cboJenisPer4',
		store: grupJenisPer,
		valueField: 'fs_xx_strx',
		xtype: 'combobox',
	};

	var txtRate4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Rate Kontribusi',
		id: 'txtRate4',
		name: 'txtRate4',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 7,
		enforceMaxLength: true
	};

	var btnSearch4 = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch4',
		name: 'btnSearch4',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupBiayaPerluasan.load();
		}
	};

	var btnSave4 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave4',
		name: 'btnSave4',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave4
	};

	var btnReset4 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset4',
		name: 'btnReset4',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset4
	};


	/* BIAYA TJH */
	var cboJenisKend5 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Kendaraan',
		id: 'cboJenisKend5',
		name: 'cboJenisKend5',
		store: grupJenisKend,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtMinOTR5 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Min OTR',
		id: 'txtMinOTR5',
		name: 'txtMinOTR5',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtMaxOTR5 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Maks OTR',
		id: 'txtMaxOTR5',
		name: 'txtMaxOTR5',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtRate5 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Rate TJH',
		id: 'txtRate5',
		name: 'txtRate5',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 7,
		enforceMaxLength: true,
		hideTrigger: true,
		keyNavEnabled: false,
		mouseWheelEnabled: false
	};

	var btnSearch5 = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch5',
		name: 'btnSearch5',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupBiayaTJH.load();
		}
	};

	var btnSave5 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave5',
		name: 'btnSave5',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave5
	};

	var btnReset5 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset5',
		name: 'btnReset5',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset5
	};

	function fnReset1() {
		Ext.getCmp('cboCabang1').setValue('');
		Ext.getCmp('cboJenisPi1').setValue('');
		Ext.getCmp('cboPola1').setValue('');
		Ext.getCmp('cboTenor1').setValue('');
		Ext.getCmp('txtBiayaAdm1').setValue('');
		grupBiayaAdmin.load();
	}

	function fnCekSave1() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterbiaya/ceksaveadmin',
				params: {
					'fs_kode_cabang': Ext.getCmp('cboCabang1').getValue(),
					'fs_jenis_piutang': Ext.getCmp('cboJenisPi1').getValue(),
					'fs_pola_transaksi': Ext.getCmp('cboPola1').getValue(),
					'fd_lama_angsuran': Ext.getCmp('cboTenor1').getValue()
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
						if (xtext.sukses === true) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'SIAP',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave1();
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

	function fnSave1() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterbiaya/saveadmin',
			params: {
				'fs_kode_cabang': Ext.getCmp('cboCabang1').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPi1').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola1').getValue(),
				'fd_lama_angsuran': Ext.getCmp('cboTenor1').getValue(),
				'fs_biaya_admin': Ext.getCmp('txtBiayaAdm1').getValue()
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
					fnReset1();
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

	function fnReset2() {
		Ext.getCmp('cboCabang2').setValue('');
		Ext.getCmp('cboJenisPi2').setValue('');
		Ext.getCmp('cboPola2').setValue('');
		Ext.getCmp('txtMinOTR2').setValue('');
		Ext.getCmp('txtMaxOTR2').setValue('');
		Ext.getCmp('txtBiayaFid2').setValue('');
		grupBiayaFidusia.load();
	}

	function fnCekSave2() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterbiaya/ceksavefidusia',
				params: {
					'fs_kode_cabang': Ext.getCmp('cboCabang2').getValue(),
					'fs_jenis_piutang': Ext.getCmp('cboJenisPi2').getValue(),
					'fs_pola_transaksi': Ext.getCmp('cboPola2').getValue(),
					'fs_min_otr': Ext.getCmp('txtMinOTR2').getValue(),
					'fs_max_otr': Ext.getCmp('txtMaxOTR2').getValue()
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
						if (xtext.sukses === true) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'SIAP',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave2();
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

	function fnSave2() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterbiaya/savefidusia',
			params: {
				'fs_kode_cabang': Ext.getCmp('cboCabang2').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPi2').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola2').getValue(),
				'fs_min_otr': Ext.getCmp('txtMinOTR2').getValue(),
				'fs_max_otr': Ext.getCmp('txtMaxOTR2').getValue(),
				'fs_biaya_fidusia': Ext.getCmp('txtBiayaFid2').getValue()
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
					fnReset2();
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

	function fnReset3() {
		Ext.getCmp('cboJenisAs3').setValue('');
		Ext.getCmp('cboWilayahAs3').setValue('');
		Ext.getCmp('cboJenisKend3').setValue('');
		Ext.getCmp('cboKomersil3').setValue('');
		Ext.getCmp('txtMinOTR3').setValue('');
		Ext.getCmp('txtMaxOTR3').setValue('');
		Ext.getCmp('txtPersenPremi3').setValue('');
		grupBiayaAsuransi.load();
	}

	function fnCekSave3() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterbiaya/ceksaveasuransi',
				params: {
					'fs_kode_asuransi': Ext.getCmp('cboJenisAs3').getValue(),
					'fs_wilayah_asuransi': Ext.getCmp('cboWilayahAs3').getValue(),
					'fs_jenis_kendaraan': Ext.getCmp('cboJenisKend3').getValue(),
					'fs_komersial': Ext.getCmp('cboKomersil3').getValue(),
					'fs_min_otr': Ext.getCmp('txtMinOTR3').getValue(),
					'fs_max_otr': Ext.getCmp('txtMaxOTR3').getValue()
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
						if (xtext.sukses === true) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'SIAP',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave3();
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

	function fnSave3() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterbiaya/saveasuransi',
			params: {
				'fs_kode_asuransi': Ext.getCmp('cboJenisAs3').getValue(),
				'fs_wilayah_asuransi': Ext.getCmp('cboWilayahAs3').getValue(),
				'fs_jenis_kendaraan': Ext.getCmp('cboJenisKend3').getValue(),
				'fs_komersial': Ext.getCmp('cboKomersil3').getValue(),
				'fs_min_otr': Ext.getCmp('txtMinOTR3').getValue(),
				'fs_max_otr': Ext.getCmp('txtMaxOTR3').getValue(),
				'fs_persentase_premi': Ext.getCmp('txtPersenPremi3').getValue()
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
					fnReset3();
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

	function fnReset4() {
		Ext.getCmp('cboJenisAs4').setValue('');
		Ext.getCmp('cboWilayahAs4').setValue('');
		Ext.getCmp('cboJenisPer4').setValue('');
		Ext.getCmp('txtRate4').setValue('');
		grupBiayaPerluasan.load();
	}

	function fnCekSave4() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterbiaya/ceksaveperluasan',
				params: {
					'fs_kode_asuransi': Ext.getCmp('cboJenisAs4').getValue(),
					'fs_wilayah_asuransi': Ext.getCmp('cboWilayahAs4').getValue(),
					'fs_perluasan': Ext.getCmp('cboJenisPer4').getValue()
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
						if (xtext.sukses === true) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'SIAP',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave4();
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

	function fnSave4() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterbiaya/saveperluasan',
			params: {
				'fs_kode_asuransi': Ext.getCmp('cboJenisAs4').getValue(),
				'fs_wilayah_asuransi': Ext.getCmp('cboWilayahAs4').getValue(),
				'fs_perluasan': Ext.getCmp('cboJenisPer4').getValue(),
				'fs_rate_kontribusi': Ext.getCmp('txtRate4').getValue()
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
					fnReset4();
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

	function fnReset5() {
		Ext.getCmp('cboJenisKend5').setValue('');
		Ext.getCmp('txtMinOTR5').setValue('');
		Ext.getCmp('txtMaxOTR5').setValue('');
		Ext.getCmp('txtRate5').setValue('');
		grupBiayaTJH.load();
	}

	function fnCekSave5() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterbiaya/ceksavetjh',
				params: {
					'fs_jenis_kendaraan': Ext.getCmp('cboJenisKend5').getValue(),
					'fs_min_otr': Ext.getCmp('txtMinOTR5').getValue(),
					'fs_max_otr': Ext.getCmp('txtMaxOTR5').getValue()
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
						if (xtext.sukses === true) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'SIAP',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave5();
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

	function fnSave5() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterbiaya/savetjh',
			params: {
				'fs_jenis_kendaraan': Ext.getCmp('cboJenisKend5').getValue(),
				'fs_min_otr': Ext.getCmp('txtMinOTR5').getValue(),
				'fs_max_otr': Ext.getCmp('txtMaxOTR5').getValue(),
				'fs_rate_tjh': Ext.getCmp('txtRate5').getValue()
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
					fnReset5();
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

	var frmMasterBiaya = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Biaya',
		width: 930,
		items: [{
			bodyStyle: 'background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Biaya Admin',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Biaya Admin',
								xtype: 'fieldset',
								items: [
									cboCabang1,
									cboJenisPi1,
									cboPola1,
									cboTenor1,
									btnSearch1
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtBiayaAdm1
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnSave1
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset1
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Biaya Admin',
								xtype: 'fieldset',
								items: [
									gridBiayaAdmin
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Biaya Fidusia',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Biaya Fidusia',
								xtype: 'fieldset',
								items: [
									cboCabang2,
									cboJenisPi2,
									cboPola2,
									btnSearch2
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtMinOTR2,
									txtMaxOTR2,
									txtBiayaFid2
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnSave2
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset2
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Master Fidusia',
								xtype: 'fieldset',
								items: [
									gridBiayaFidusia
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Biaya Asuransi',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Biaya Asuransi',
								xtype: 'fieldset',
								items: [
									cboJenisAs3,
									cboWilayahAs3,
									cboJenisKend3,
									cboKomersil3,
									btnSearch3
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtMinOTR3,
									txtMaxOTR3,
									txtPersenPremi3
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnSave3
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset3
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Biaya Asuransi',
								xtype: 'fieldset',
								items: [
									gridBiayaAsuransi
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab4',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Biaya Perluasan',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Biaya Perluasan',
								xtype: 'fieldset',
								items: [
									cboJenisAs4,
									cboWilayahAs4,
									cboJenisPer4,
									btnSearch4
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtRate4
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnSave4
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset4
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Data Biaya Perluasan',
								xtype: 'fieldset',
								items: [
									gridBiayaPerluasan
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab5',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Biaya TJH',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Biaya TJH',
								xtype: 'fieldset',
								items: [
									cboJenisKend5,
									btnSearch5
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtMinOTR5,
									txtMaxOTR5,
									txtRate5
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnSave5
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset5
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Biaya TJH',
								xtype: 'fieldset',
								items: [
									gridBiayaTJH
								]
							}]
						}]
					}]
				}]
			}]

		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterBiaya
	});

	function fnMaskShow() {
		frmMasterBiaya.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterBiaya.unmask();
	}

	frmMasterBiaya.render(Ext.getBody());
	Ext.get('loading').destroy();

});