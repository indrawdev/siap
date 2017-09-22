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

	function gridTooltipJam(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record Jam dan Durasi untuk edit',
			target: view.el,
			trackMouse: true
		});
	}

	function gridTooltipTgl(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record Armada untuk edit',
			target: view.el,
			trackMouse: true
		});
	}

	function gridTooltipArmada(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record Kapasitas dan Dermaga untuk edit',
			target: view.el,
			trackMouse: true
		});
	}

	function gridTooltipKapasitas(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record Kapasitas untuk edit',
			target: view.el,
			trackMouse: true
		});
	}

	var vCbo = '0';
	var vPilih = '0';
	var vKdJadwalLama = '';
	
	
	var grupJadwal = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_jadwal','fs_kd_rute','fs_nm_rute',
			'fb_aktif','fs_status'
		],
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
			url: 'fpd/KodeJadwal'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_jadwal': Ext.getCmp('cboJadwal').getValue(),
					'fs_nm_rute': Ext.getCmp('cboJadwal').getValue()
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupJadwal,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJadwal,
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
			{text: 'Kode', dataIndex: 'fs_kd_jadwal', menuDisabled: true, width: 100},
			{text: 'Kode', dataIndex: 'fs_kd_rute', menuDisabled: true, hidden: true},
			{text: 'Rute', dataIndex: 'fs_nm_rute', menuDisabled: true, width: 500},
			{text: 'Aktif', dataIndex: 'fb_aktif', menuDisabled: true, hidden: true},
			{text: 'Aktif', dataIndex: 'fs_status', menuDisabled: true, width: 80}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboJadwal').setValue(record.get('fs_kd_jadwal'));
				Ext.getCmp('cekAktif').setValue(record.get('fb_aktif'));
				Ext.getCmp('cboRute').setValue(record.get('fs_kd_rute'));
				Ext.getCmp('txtRute').setValue(record.get('fs_nm_rute'));
				
				vPilih = '1';
				grupGridJam.load();
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipSearch
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
				grupJadwal.load();
				vMask.show();
			}
		}
	});

	var cboJadwal = {
		anchor: '95%',
		emptyText: 'BARU',
		fieldLabel: 'Kode Jadwal',
		id: 'cboJadwal',
		maxLength: 25,
		name: 'cboJadwal',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('cekAktif').setValue('1');
				Ext.getCmp('cboRute').setValue('');
				Ext.getCmp('txtRute').setValue('');
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
	
	var grupRute = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_rute','fs_nm_asal','fs_nm_tujuan'
		],
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
			url: 'setuprute/KodeRuteAktif'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_rute': Ext.getCmp('cboRute').getValue(),
					'fs_nm_kota': Ext.getCmp('cboRute').getValue()
				});
			}
		}
	});

	var winGrid2 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupRute,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupRute,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kd_rute', menuDisabled: true, width: 100},
			{text: 'Asal', dataIndex: 'fs_nm_asal', menuDisabled: true, width: 290},
			{text: 'Tujuan', dataIndex: 'fs_nm_tujuan', menuDisabled: true, width: 290}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboRute').setValue(record.get('fs_kd_rute'));
				Ext.getCmp('txtRute').setValue(record.get('fs_nm_asal') + ' - ' + record.get('fs_nm_tujuan'));
				
				vPilih = '0';
				grupGridJam.load();
				winCari2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipSearch
			}
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
		title: 'Pencarian...',
		items: [
			winGrid2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupRute.load();
				vMask.show();
			}
		}
	});

	var cboRute = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'Pilih',
		fieldLabel: 'Rute',
		id: 'cboRute',
		maxLength: 25,
		name: 'cboRute',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtRute').setValue('');
				grupGridJam.removeAll();
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
					winCari2.show();
					winCari2.center();
				}
			}
		}
	};
	
	var txtRute = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Rute',
		fieldLabel: '',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtRute',
		name: 'txtRute',
		readOnly: true,
		xtype: 'textfield'
	};

	Ext.define('DataGridJam', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kd_kota', type: 'string'},
			{name: 'fs_nm_kota', type: 'string'},
			{name: 'fs_kd_pelabuhan', type: 'string'},
			{name: 'fs_nm_pelabuhan', type: 'string'},
			{name: 'fs_jam_jadwal', type: 'date', dateFormat: 'H:i'},
			{name: 'fn_jarak', type: 'float'},
			{name: 'fn_durasi', type: 'float'}
		]
	});

	var grupGridJam = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridJam',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'fpd/GridJam'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_pilih': vPilih,
					'fs_kd_rute': Ext.getCmp('cboRute').getValue(),
					'fs_kd_jadwal': Ext.getCmp('cboJadwal').getValue()
				});
			}
		}
	});

	var cellEditingJam = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	var gridJam = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 344,
		sortableColumns: false,
		store: grupGridJam,
		columns: [{
			width: 30,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kd_kota',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_nm_kota',
			menuDisabled: true,
			text: 'Kota / Transit',
			width: 150
		},{
			dataIndex: 'fs_kd_pelabuhan',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_nm_pelabuhan',
			menuDisabled: true,
			text: 'Pelabuhan',
			width: 240
		},{
			dataIndex: 'fs_jam_jadwal',
			menuDisabled: true,
			renderer: Ext.util.Format.dateRenderer('H:i'),
			text: 'Jam',
			width: 80,
			editor: {
				editable: true,
				format: 'H:i',
				increment: 15,
				listConfig: {
					maxHeight: 111,
					minWidth: 70
				},
				minValue: '00:00',
				maxValue: '23:45',
				value: '00:00',
				xtype: 'timefield'
			}
		},{
			align: 'right',
			dataIndex: 'fn_jarak',
			format: '0,000',
			menuDisabled: true,
			text: 'Jarak (Mil)',
			width: 80
		},{
			align: 'right',
			dataIndex: 'fn_durasi',
			format: '0,000.00',
			menuDisabled: true,
			text: 'Durasi (Jam)',
			width: 80,
			xtype: 'numbercolumn',
			editor: {
				allowDecimals: true,
				decimalPrecision: 2,
				decimalSeparator: '.',
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false,
				minValue: 0,
				thousandSeparator: ',',
				xtype: 'numberfield'
			}
		}],
		plugins: [
			cellEditingJam
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipJam
			},
			markDirty: false
		}
	});

	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kd_jadwal', type: 'string'},
			{name: 'fs_nm_rute', type: 'string'},
			{name: 'fb_aktif', type: 'bool'}
		]
	});


	Ext.define('DataGridDetil2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kd_jadwal', type: 'string'},
			{name: 'fs_kd_kota', type: 'string'},
			{name: 'fs_nm_kota', type: 'string'},
			{name: 'fs_jam_jadwal', type: 'date', dateFormat: 'H:i'},
			{name: 'fn_jarak', type: 'float'},
			{name: 'fn_durasi', type: 'float'}
		]
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
			url: 'masterkewenangan/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var grupCabang2 = Ext.create('Ext.data.Store', {
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
			url: 'masterkewenangan/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var grupJadwal2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_jadwal','fs_kd_rute','fs_nm_rute',
			'fs_kd_tipe','fs_nm_tipe'
		],
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
			url: 'fpd/KodeJadwalAktif'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_jadwal': Ext.getCmp('cboJadwal2').getValue(),
					'fs_nm_rute': Ext.getCmp('cboJadwal2').getValue()
				});
			}
		}
	});

	var winGrid3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 650,
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
					winCari3.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtJadwal2').setValue(record.get('fs_nama_cabang'));
				grupCabang.load();
				winCari3.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winGrid6 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 650,
		sortableColumns: false,
		store: grupCabang2,
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
					grupCabang2.load();
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang2,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang2').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtJadwal3').setValue(record.get('fs_nama_cabang'));
				grupCabang2.load();
				winCari6.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid3
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

	var winCari6 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid6
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCabang2.load();
				vMask.show();
			}
		}
	});

	var cboCabang = {
		editable:false,
		anchor: '98%',
		emptyText: 'Pilih',
		fieldLabel: 'Kode Cabang',
		id: 'cboCabang',
		maxLength: 25,
		name: 'cboCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtJadwal2').setValue('');
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
					winCari3.show();
					winCari3.center();
				}
			}
		}
	};


	var cboCabang2 = {
		editable:false,
		anchor: '98%',
		emptyText: 'Pilih',
		fieldLabel: 'Kode Cabang',
		id: 'cboCabang2',
		maxLength: 25,
		name: 'cboCabang2',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtJadwal3').setValue('');
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
					winCari6.show();
					winCari6.center();
				}
			}
		}
	};
	
	var txtJadwal2 = {
		anchor: '100%',
		emptyText: 'Nama Cabang',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJadwal2',
		name: 'txtJadwal2',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtJadwal3 = {
		anchor: '100%',
		emptyText: 'Nama Cabang',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJadwal3',
		name: 'txtJadwal3',
		readOnly: true,
		xtype: 'textfield'
	};
	
	var txtTgl = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		editable: true,
		fieldLabel: 'Periode',
		format: 'd-m-Y',
		id: 'txtTgl',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtTgl',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtTgl3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		editable: true,
		fieldLabel: 'Periode',
		format: 'd-m-Y',
		id: 'txtTgl3',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtTgl3',
		value: new Date(),
		xtype: 'datefield'
	};
	
	var txtTgl2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		editable: true,
		fieldLabel: 's/d',
		format: 'd-m-Y',
		id: 'txtTgl2',
		labelWidth: 35,
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtTgl2',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtTgl4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		editable: true,
		fieldLabel: 's/d',
		format: 'd-m-Y',
		id: 'txtTgl4',
		labelWidth: 35,
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtTgl4',
		value: new Date(),
		xtype: 'datefield'
	};
	
	var cmdTampil = {
		anchor: '70%',
		id: 'cmdTampil',
		name: 'cmdTampil',
		scale: 'small',
		text: 'Tampil',
		xtype: 'button',
		handler: function() {
				grupGridTgl.removeAll();
				grupGridTgl.load();
		}
	};

	var cmdTampil2 = {
		anchor: '70%',
		id: 'cmdTampil2',
		name: 'cmdTampil2',
		scale: 'small',
		text: 'Tampil',
		xtype: 'button',
		handler: function() {
				grupGridTgl2.removeAll();
				grupGridTgl2.load();
		}
	};


	var grupArmada = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_armada','fs_nm_lambung'
		],
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
			url: 'setuparmada/KodeArmadaAktif'
		},
		listeners: {
			beforeload: function(store) {
				if (vCbo == '1') {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kd_armada': Ext.getCmp('cboArmada').getValue(),
						'fs_no_lambung': Ext.getCmp('cboArmada').getValue(),
						'fs_nm_lambung': Ext.getCmp('cboArmada').getValue()
					});
				}
				else {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kd_armada': '',
						'fs_nm_lambung': ''
					});
				}
			}
		}
	});

	var winGrid4 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupArmada,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupArmada,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari4.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kd_armada', menuDisabled: true, width: 100},
			{text: 'Nama Armada', dataIndex: 'fs_nm_lambung', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				if (vCbo == '1') {
					Ext.getCmp('cboArmada').setValue(record.get('fs_nm_lambung'));
					Ext.getCmp('txtArmada').setValue(record.get('fs_kd_armada'));
				}
				else {
					var xRecordGrid = gridArmada.getSelectionModel().getSelection()[0];
					xRecordGrid.set('fs_kd_armada',record.get('fs_kd_armada'));
					xRecordGrid.set('fs_nm_armada',record.get('fs_nm_lambung'));
				}
				
				winCari4.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipSearch
			}
		}
	});
		
	var winCari4 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid4
		],
		listeners: {
			beforehide: function() {
				vMask2.hide();
			},
			beforeshow: function() {
				grupArmada.load();
				vMask2.show();
			}
		}
	});

	var grupDermaga = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_variabel','fs_nm_variabel'
		],
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
			url: 'setupvariabel/KodeVarAktif'
		},
		listeners: {
			beforeload: function(store) {
				if (vCbo == '1') {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kd_tipe': '07',
						'fs_kd_variabel': Ext.getCmp('cboDermaga').getValue(),
						'fs_nm_variabel': Ext.getCmp('cboDermaga').getValue()
					});
				}
				else {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kd_tipe': '07',
						'fs_kd_variabel': '',
						'fs_nm_variabel': ''
					});
				}
			}
		}
	});

	var winGrid5 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDermaga,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDermaga,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari5.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kd_variabel', menuDisabled: true, width: 100},
			{text: 'Nama Dermaga', dataIndex: 'fs_nm_variabel', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				if (vCbo == '1') {
					Ext.getCmp('cboDermaga').setValue(record.get('fs_nm_variabel'));
					Ext.getCmp('txtDermaga').setValue(record.get('fs_kd_variabel'));
				}
				else {
					var xRecordGrid = gridArmada.getSelectionModel().getSelection()[0];
					xRecordGrid.set('fs_kd_dermaga',record.get('fs_kd_variabel'));
					xRecordGrid.set('fs_nm_dermaga',record.get('fs_nm_variabel'));
				}
				
				winCari5.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipSearch
			}
		}
	});
		
	var winCari5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid5
		],
		listeners: {
			beforehide: function() {
				vMask2.hide();
			},
			beforeshow: function() {
				grupDermaga.load();
				vMask2.show();
			}
		}
	});

	Ext.define('DataGridArmada', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fd_tgl_jadwal', type: 'string'},
			{name: 'fn_urut', type: 'float'},
			{name: 'fs_jam_jadwal', type: 'string'},
			{name: 'fs_kd_armada', type: 'string'},
			{name: 'fs_nm_armada', type: 'string'},
			{name: 'fs_kapasitas', type: 'string'},
			{name: 'fs_ket', type: 'string'},
			{name: 'fs_kd_dermaga', type: 'string'},
			{name: 'fs_nm_dermaga', type: 'string'}
		]
	});

	var grupGridArmada = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridArmada',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'fpd/GridArmada'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_jadwal': Ext.getCmp('cboJadwal2').getValue(),
					'fd_tgl': Ext.Date.format(Ext.getCmp('txtTgl').getValue(), 'Y-m-d'),
					'fd_tgl2': Ext.Date.format(Ext.getCmp('txtTgl2').getValue(), 'Y-m-d'),
				});
			},
			load: function() {
				grupGridArmada.sort([ {
						property : 'fd_tgl_jadwal',
						direction: 'ASC'
					},{
						property : 'fn_urut',
						direction: 'ASC'
					}
				]);
			}
		}
	});

	var txtkodelk = {
		anchor: '100%',
		fieldLabel: 'Lama Survey',
		id: 'txtkodelk',
		name: 'txtkodelk',
		xtype: 'textfield',
		hidden:true
	};


	var cellEditingArmada = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	var gridArmada = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 250,
		sortableColumns: false,
		store: grupGridArmada,
		columns: [{
			width: 25,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fd_tgl_jadwal',
			hidden: true,
			menuDisabled: true,
			text: 'Tanggal'
		},{
			dataIndex: 'fn_urut',
			hidden: true,
			menuDisabled: true,
			text: 'Urut'
		},{
			dataIndex: 'fs_jam_jadwal',
			hidden: true,
			menuDisabled: true,
			text: 'Jam'
		},{
			dataIndex: 'fs_kd_armada',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_nm_armada',
			menuDisabled: true,
			text: 'Armada',
			width: 273
		},{
			dataIndex: 'fs_kapasitas',
			menuDisabled: true,
			text: 'Kapasitas',
			width: 70,
			editor: {
				editable: false,
				xtype: 'textfield',
				triggers: {
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							var xRecord = gridArmada.getSelectionModel().getSelection()[0];
							var xKdTglJadwal = xRecord.get('fd_tgl_jadwal');
							var xUrut = xRecord.get('fn_urut');
							var xKdArmada = xRecord.get('fs_kd_armada');
							
							grupGridKapasitas.clearFilter();
							grupGridKapasitas.sort([ {
									property : 'fd_tgl_jadwal',
									direction: 'ASC'
								},{
									property : 'fn_urut',
									direction: 'ASC'
								},{
									property : 'fs_nm_kelas',
									direction: 'ASC'
								}
							]);
							var xTotal = grupGridKapasitas.getCount();
							if (xTotal > 0) {
								grupGridKapasitas.filterBy(function(record) {
									if (record.get('fd_tgl_jadwal').trim() == xKdTglJadwal.trim() &&
										record.get('fn_urut') == xUrut &&
										record.get('fs_kd_armada') == xKdArmada) {
										return true;
									}
									else {
										return false;
									}
								});
								gridKapasitas.getView().refresh();
							}
							winKapasitas.show();
							winKapasitas.center();
						}
					}
				}
			}
		},{
			dataIndex: 'fs_ket',
			menuDisabled: true,
			text: 'Keterangan',
			width: 170
		},{
			dataIndex: 'fs_kd_dermaga',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_nm_dermaga',
			menuDisabled: true,
			text: 'Dermaga',
			width: 233,
			editor: {
				editable: false,
				xtype: 'textfield',
				triggers: {
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							vCbo = '0';
							winCari5.show();
							winCari5.center();
						}
					}
				}
			}
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridArmada.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingArmada
		],
		tbar: [{
			flex: 0.7,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				fieldLabel: 'Tanggal & Jam',
				fieldStyle: 'background-color: #eee; background-image: none;',
				id: 'txtTglTampil',
				labelAlign: 'top',
				labelSeparator: '',
				labelWidth: 50,
				name: 'txtTglTampil',
				readOnly: true,
				xtype: 'textfield'
			},{
				anchor: '95%',
				fieldLabel: '',
				fieldStyle: 'background-color: #eee; background-image: none;',
				hidden: true,
				id: 'txtTglJadwal',
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 50,
				name: 'txtTglJadwal',
				readOnly: true,
				xtype: 'textfield'
			},{
				anchor: '95%',
				editable: false,
				fieldLabel: 'Jam',
				fieldStyle: 'background-color: #eee; background-image: none;',
				hidden: false,
				id: 'txtJam',
				labelAlign: 'top',
				labelSeparator: '',
				labelWidth: 50,
				name: 'txtJam',
				readOnly: true,
				xtype: 'textfield'
			},
				Ext.create('Ext.ux.form.NumericField', {
					alwaysDisplayDecimals: false,
					anchor: '95%',
					currencySymbol: null,
					decimalPrecision: 0,
					decimalSeparator: '.',
					fieldLabel: '',
					fieldStyle: 'background-color: #eee; background-image: none; text-align: right;',
					hidden: true,
					hideTrigger: true,
					id: 'txtNUrut',
					keyNavEnabled: false,
					labelAlign: 'right',
					labelSeparator: '',
					labelWidth: 50,
					minValue: 0,
					mouseWheelEnabled: false,
					name: 'txtNUrut',
					readOnly: true,
					thousandSeparator: ',',
					useThousandSeparator: true,
					value: 0,
					listeners: {
						change: function(value) {
							if (Ext.isEmpty(Ext.getCmp('txtNUrut').getValue())) {
								Ext.getCmp('txtNUrut').setValue(0);
							}
							else {
								return value;
							}
						}
					}
				})
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Pilih Armada',
				fieldLabel: 'Armada',
				id: 'cboArmada',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboArmada',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						Ext.getCmp('txtArmada').setValue('');
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
							vCbo = '1';
							winCari4.show();
							winCari4.center();
						}
					}
				}
			},{
				anchor: '95%',
				emptyText: 'Input Kode Armada',
				hidden: true,
				id: 'txtArmada',
				name: 'txtArmada',
				xtype: 'textfield'
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Pilih Dermaga',
				fieldLabel: 'Dermaga',
				id: 'cboDermaga',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboDermaga',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						Ext.getCmp('txtDermaga').setValue('');
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
							vCbo = '1';
							winCari5.show();
							winCari5.center();
						}
					}
				}
			},{
				anchor: '95%',
				emptyText: 'Input Kode Dermaga',
				hidden: true,
				id: 'txtDermaga',
				name: 'txtDermaga',
				xtype: 'textfield'
			}]
		},{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Tambah',
				handler: function() {
					var xUrut = Ext.getCmp('txtNUrut').getValue();
					var xKdArmada = Ext.getCmp('txtArmada').getValue();
					var xKdDermaga = Ext.getCmp('txtDermaga').getValue();
					
					var xLanjut = true;
					var xText = '';
					var xText2 = '';
					var xStore = gridArmada.getStore();
					xStore.each(function(record) {
						xText = record.get('fs_kd_armada').trim();
						xText2 = record.get('fn_urut');
						
						if (xText == xKdArmada.trim() && xText2 == xUrut) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.OK,
								closable: false,
								icon: Ext.MessageBox.INFO,
								message: 'Armada sudah ada, tambah armada dibatalkan!!',
								title: 'ototicket'
							});
							xLanjut = false;
						}
						
					});
					if (xLanjut === false) {
						return;
					}
					
					if (xKdArmada.trim() === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							message: 'Armada tidak ada dalam daftar!!',
							title: 'ototicket'
						});
						return;
					}
					
					xKdDermaga = Ext.getCmp('txtDermaga').getValue();
					if (xKdDermaga.trim() === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							message: 'Dermaga tidak ada dalam daftar!!',
							title: 'ototicket'
						});
						return;
					}
					
					grupGridKapasitas2.removeAll();
					grupGridKapasitas2.load();
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Hapus',
				handler: function() {
					grupGridKapasitas.clearFilter();
					var xRecord = gridArmada.getSelectionModel().getSelection()[0];
					var xKdTglJadwal = xRecord.get('fd_tgl_jadwal');
					var xUrut = xRecord.get('fn_urut');
					var xKdArmada = xRecord.get('fs_kd_armada');
					
					var xTotal = grupGridKapasitas.getCount();
					if (xTotal > 0) {
						grupGridKapasitas.filterBy(function(record) {
							if (record.get('fd_tgl_jadwal').trim() == xKdTglJadwal.trim() &&
								record.get('fn_urut') == xUrut &&
								record.get('fs_kd_armada') == xKdArmada) {
								return true;
							}
							else {
								return false;
							}
						});
						gridKapasitas.getView().refresh();
					}
					grupGridKapasitas.removeAll();
					
					
					var xSm = gridArmada.getSelectionModel();
					cellEditingArmada.cancelEdit();
					
					grupGridArmada.remove(xSm.getSelection());
					gridArmada.getView().refresh();
					if (grupGridArmada.getCount() > 0) {
						xSm.select(0);
					}
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipArmada
			},
			markDirty: false
		}
	});

	Ext.define('DataGridKapasitas2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kd_armada', type: 'string'},
			{name: 'fs_kd_kelas', type: 'string'},
			{name: 'fs_nm_kelas', type: 'string'},
			{name: 'fn_kapasitas', type: 'float'}
		]
	});

	var grupGridKapasitas2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKapasitas2',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'fpd/GridKapasitas2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_armada': Ext.getCmp('txtArmada').getValue()
				});
			},
			load: function() {
				fnKapasitas();
			}
		}
	});

	var gridKapasitas2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 150,
		hidden: true,
		sortableColumns: false,
		store: grupGridKapasitas2,
		columns: [{
			width: 25,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kd_armada',
			hidden: false,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_kd_kelas',
			hidden: false,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_nm_kelas',
			flex: 1,
			menuDisabled: true,
			text: 'Kelas'
		},{
			align: 'right',
			dataIndex: 'fn_kapasitas',
			flex: 0.8,
			format: '0,000',
			menuDisabled: true,
			text: 'Kapasitas (Orang)',
			xtype: 'numbercolumn'
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winArmada = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		resizable: false,
		title: 'Armada dan Dermaga',
		width: 800,
		items: [
			gridArmada,
		],
		listeners: {
			beforehide: function() {
				fnArmada();
				vMask.hide();
			},
			beforeshow: function() {
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				winArmada.hide();
			}
		}]
	});

	Ext.define('DataGridTgl', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'nomrjb', type: 'string'},
			{name: 'penjualan', type: 'string'},
			{name: 'lancar', type: 'string'},
			{name: 'lunas', type: 'string'},
			{name: 'kodsup', type: 'string'},
			{name: 'nomsup', type: 'string'},
			{name: 'ovdue', type: 'string'},
			{name: 'nama_dealer', type: 'string'},
			{name: 'nampem', type: 'string'},
			{name: 'jenpiu', type: 'string'},
			{name: 'kodelk', type: 'string'}
		]
	});

	Ext.define('DataGridTgl2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'nomrjb', type: 'string'},
			{name: 'penjualan', type: 'string'},
			{name: 'lancar', type: 'string'},
			{name: 'ovdue', type: 'string'},
			{name: 'lunas', type: 'string'},
			{name: 'tglfix', type: 'string'},
			{name: 'tglfix2', type: 'string'},
			{name: 'nama_svy', type: 'string'},
			{name: 'nampem', type: 'string'},
			{name: 'jenpiu', type: 'string'},
			{name: 'kodelk', type: 'string'}
		]
	});

	var grupGridTgl = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridTgl',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json',
			},
			type: 'ajax',
			url: 'fpd/GridTgl'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_cabang': Ext.getCmp('cboCabang').getValue(),
					'fd_tgl': Ext.Date.format(Ext.getCmp('txtTgl').getValue(), 'Y-m-d'),
					'fd_tgl2': Ext.Date.format(Ext.getCmp('txtTgl2').getValue(), 'Y-m-d')
				});
			}
		}
	});

	var grupGridTgl2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridTgl2',
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
			url: 'fpd/GridTgl2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_cabang': Ext.getCmp('cboCabang2').getValue(),
					'fd_tgl': Ext.Date.format(Ext.getCmp('txtTgl3').getValue(), 'Y-m-d'),
					'fd_tgl2': Ext.Date.format(Ext.getCmp('txtTgl4').getValue(), 'Y-m-d')
				});
			}
		}
	});

	var cellEditingTgl = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	var gridTgl = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 439,
		sortableColumns: false,
		store: grupGridTgl,
		columns: [{
			width: 35,
			xtype: 'rownumberer'
		},
		{	
			text: 'Detail',
           align: 'center',
           width: 70,
         renderer:function(data, cell, record, rowIndex, columnIndex, store) {

             // generate unique id for an element
             var id = Ext.id();
             Ext.defer(function() {
                Ext.widget('button', {
                   renderTo: id,
                   text: 'DETAIL',
                   scale: 'small',
                   handler: function(){
                   	var record = gridTgl.getStore().getAt(rowIndex);
                  	var kodsup = record.get('kodsup');
                  	var nomsup = record.get('nomsup');
                  	var tglfix = record.get('tglfix');
                  	var tglfix2 = record.get('tglfix2');
                  	var kode_cabang = record.get('kode_cabang');
					
					//alert("Terminate " + rec.get('firstname'));
                     var popUp = Ext.create('Ext.window.Window', {
													closable: false,
								                    height: 650,
								                    modal: true, 
								                    width: 950,
								                    layout:'anchor',
								                    title: 'REPORT',
								                    buttons: [{
														text: 'Close',
														handler: function() {
															vMask.hide();

															//var win = window;
															//win.document.write('<iframe id="tes" height="450" width="942" src="'+ url + noapk +'"></iframe>');
															
															//win.print();
															//win.close();
															//win.destroy();
															popUp.hide();

															//window.location.href = 'apknew';
														}
													}]
							                	});

							                	popUp.add({html: '<iframe height="650" width="942" src="fpd/previewfpd/'+kodsup+'/'+nomsup+'/'+tglfix+'/'+tglfix2+'/'+kode_cabang+'"></iframe>'});
							                	popUp.show();
                   }
                });
             }, 50);
             return Ext.String.format('<div id="{0}"></div>', id);
          }
       },
       {	
			text: 'Export To Excel',
           align: 'center',
           width: 100,
         renderer:function(data, cell, record, rowIndex, columnIndex, store) {

             // generate unique id for an element
             var id = Ext.id();
             Ext.defer(function() {
                Ext.widget('button', {
                   renderTo: id,
                   text: 'Export To Excel',
                   scale: 'small',
                   handler: function(){
                   	var record = gridTgl.getStore().getAt(rowIndex);
                  	var kodsup = record.get('kodsup');
                  	var nomsup = record.get('nomsup');
                  	var tglfix = record.get('tglfix');
                  	var tglfix2 = record.get('tglfix2');
					
					var winInfo = Ext.create('Ext.window.Window', {
						closable: false,
						draggable: false,
						layout: 'fit',
						title: 'MFAS',
						width: 300,
						items: [],
						buttons: [{
							href: 'fpd/downloadexcelfpd/'+kodsup+'/'+nomsup+'/'+tglfix+'/'+tglfix2,
							hrefTarget: '_blank',
							text: 'Download',
							xtype: 'button',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}

						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}
						}]
					}).show();


					//alert("Terminate " + rec.get('firstname'));
                   
                   }
                });
             }, 50);
             return Ext.String.format('<div id="{0}"></div>', id);
          }
       },{
			dataIndex: 'kodelk',
			menuDisabled: true,
			text: 'Kode Dealer',
			width: 70
		},{
			dataIndex: 'tglfix',
			hidden:true,
			menuDisabled: true,
			text: 'Kode Dealer'
		},
		{
			dataIndex: 'kodsup',
			hidden:true,
			menuDisabled: true,
			text: 'Kode Dealer'
		},
		{
			dataIndex: 'nomsup',
			hidden:true,
			menuDisabled: true,
			text: 'Kode Dealer',

		},
		{
			dataIndex: 'tglfix2',
			hidden:true,
			menuDisabled: true,
			text: 'Kode Dealer'
		},{
			align: 'center',
			dataIndex: 'nama_dealer',
			menuDisabled: true,
			text: 'Nama Dealer',
			width: 195
		},{
			align: 'center',
			dataIndex: 'penjualan',
			menuDisabled: true,
			text: 'Penjualan',
			width: 70
		},
		{
			align: 'center',
			dataIndex: 'lancar',
			menuDisabled: true,
			text: 'Lancar',
			width: 70
		},
		{
			align: 'center',
			dataIndex: 'ovdue',
			menuDisabled: true,
			text: 'Overdue',
			width: 70
		},
		{
			align: 'center',
			dataIndex: 'lunas',
			menuDisabled: true,
			text: 'Lunas',
			width: 70
		}],
       listeners: {
				itemclick: function(dv, record, item, index, e) {
				
					Ext.getCmp('txtkodelk').setValue(record.get('kodelk'));
			}
		},
		plugins: [
			cellEditingTgl
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipTgl
			},
			markDirty: false
		}
	});

	var gridTgl2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 439,
		sortableColumns: false,
		store: grupGridTgl2,
		columns: [{
			width: 35,
			xtype: 'rownumberer'
		},
		{	
			text: 'Detail',
           align: 'center',
           width: 70,
         renderer:function(data, cell, record, rowIndex, columnIndex, store) {

             // generate unique id for an element
             var id = Ext.id();
             Ext.defer(function() {
                Ext.widget('button', {
                   renderTo: id,
                   text: 'DETAIL',
                   scale: 'small',
                   handler: function(){
                   	var record = gridTgl2.getStore().getAt(rowIndex);
                  	var ptgsvy = record.get('nama_svy');
                  	var kodelk = record.get('kodelk');
                  	var tglfix = record.get('tglfix');
                  	var tglfix2 = record.get('tglfix2');
                  	var kode_cabang = record.get('kode_cabang');
					
					//alert("Terminate " + rec.get('firstname'));
                     var popUp = Ext.create('Ext.window.Window', {
													closable: false,
								                    height: 650,
								                    modal: true, 
								                    width: 950,
								                    layout:'anchor',
								                    title: 'REPORT',
								                    buttons: [{
														text: 'Close',
														handler: function() {
															vMask.hide();

															//var win = window;
															//win.document.write('<iframe id="tes" height="450" width="942" src="'+ url + noapk +'"></iframe>');
															
															//win.print();
															//win.close();
															//win.destroy();
															popUp.hide();

															//window.location.href = 'apknew';
														}
													}]
							                	});

							                	popUp.add({html: '<iframe height="650" width="942" src="fpd/previewfpd2/'+ptgsvy+'/'+kodelk+'/'+tglfix+'/'+tglfix2+'/'+kode_cabang+'"></iframe>'});
							                	popUp.show();
                   }
                });
             }, 50);
             return Ext.String.format('<div id="{0}"></div>', id);
          }
       },
       {	
			text: 'Export To Excel',
           align: 'center',
           width: 100,
         renderer:function(data, cell, record, rowIndex, columnIndex, store) {

             // generate unique id for an element
             var id = Ext.id();
             Ext.defer(function() {
                Ext.widget('button', {
                   renderTo: id,
                   text: 'Export To Excel',
                   scale: 'small',
                   handler: function(){
                   	var record = gridTgl2.getStore().getAt(rowIndex);
                  	var ptgsvy = record.get('nama_svy');
                  	var kodelk = record.get('kodelk');
                  	var tglfix = record.get('tglfix');
                  	var tglfix2 = record.get('tglfix2');
					
					var winInfo = Ext.create('Ext.window.Window', {
						closable: false,
						draggable: false,
						layout: 'fit',
						title: 'MFAS',
						width: 300,
						items: [],
						buttons: [{
							href: 'fpd/downloadexcelsvy/'+ptgsvy+'/'+kodelk+'/'+tglfix+'/'+tglfix2,
							hrefTarget: '_blank',
							text: 'Download',
							xtype: 'button',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}

						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}
						}]
					}).show();


					//alert("Terminate " + rec.get('firstname'));
                   
                   }
                });
             }, 50);
             return Ext.String.format('<div id="{0}"></div>', id);
          }
       },{
			dataIndex: 'kodelk',
			menuDisabled: true,
			text: 'Kode Cabang',
			width: 80
		},
		{
			dataIndex: 'tglfix2',
			hidden:true,
			menuDisabled: true,
			text: 'Kode Cabang'
		},
		{
			dataIndex: 'tglfix',
			menuDisabled: true,
			hidden:true,
			text: 'Kode Cabang'
		},{
			align: 'center',
			dataIndex: 'nama_svy',
			menuDisabled: true,
			text: 'Nama Surveyor',
			width: 185
		},{
			align: 'center',
			dataIndex: 'penjualan',
			menuDisabled: true,
			text: 'Penjualan',
			width: 70
		},
		{
			align: 'center',
			dataIndex: 'lancar',
			menuDisabled: true,
			text: 'Lancar',
			width: 70
		},
		{
			align: 'center',
			dataIndex: 'ovdue',
			menuDisabled: true,
			text: 'Overdue',
			width: 70
		},
		{
			align: 'center',
			dataIndex: 'lunas',
			menuDisabled: true,
			text: 'Lunas',
			width: 70
		}],
		plugins: [
			cellEditingTgl
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipTgl
			},
			markDirty: false
		}
	});

	Ext.define('DataGridKapasitas', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fd_tgl_jadwal', type: 'string'},
			{name: 'fn_urut', type: 'float'},
			{name: 'fs_jam_jadwal', type: 'string'},
			{name: 'fs_kd_armada', type: 'string'},
			{name: 'fs_kd_kelas', type: 'string'},
			{name: 'fs_nm_kelas', type: 'string'},
			{name: 'fn_kapasitas', type: 'float'}
		]
	});

	var grupGridKapasitas = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKapasitas',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'fpd/GridKapasitas'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_jadwal': Ext.getCmp('cboJadwal2').getValue(),
					'fd_tgl': Ext.Date.format(Ext.getCmp('txtTgl').getValue(), 'Y-m-d'),
					'fd_tgl2': Ext.Date.format(Ext.getCmp('txtTgl2').getValue(), 'Y-m-d'),
				});
			},
			load: function() {
				grupGridKapasitas.sort([ {
						property : 'fd_tgl_jadwal',
						direction: 'ASC'
					},{
						property : 'fn_urut',
						direction: 'ASC'
					},{
						property : 'fs_nm_kelas',
						direction: 'ASC'
					}
				]);
			}
		}
	});

	var cellEditingKapasitas = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	var gridKapasitas = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 150,
		sortableColumns: false,
		store: grupGridKapasitas,
		columns: [{
			width: 25,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fd_tgl_jadwal',
			hidden: true,
			menuDisabled: true,
			text: 'Tanggal'
		},{
			dataIndex: 'fn_urut',
			hidden: true,
			menuDisabled: true,
			text: 'Urut'
		},{
			dataIndex: 'fs_jam_jadwal',
			hidden: true,
			menuDisabled: true,
			text: 'Jam'
		},{
			dataIndex: 'fs_kd_armada',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_kd_kelas',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			dataIndex: 'fs_nm_kelas',
			flex: 1,
			menuDisabled: true,
			text: 'Kelas'
		},{
			align: 'right',
			dataIndex: 'fn_kapasitas',
			flex: 0.5,
			format: '0,000',
			menuDisabled: true,
			text: 'Kapasitas (Orang)',
			xtype: 'numbercolumn',
			editor: {
				allowDecimals: false,
				decimalPrecision: 0,
				decimalSeparator: '.',
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false,
				minValue: 0,
				thousandSeparator: ',',
				xtype: 'numberfield'
			}
		}],
		plugins: [
			cellEditingKapasitas
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipKapasitas
			},
			markDirty: false
		}
	});

	var winKapasitas = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		resizable: false,
		title: 'Kapasitas',
		width: 350,
		items: [
			gridKapasitas
		],
		listeners: {
			beforehide: function() {
				fnKapasitas2();
				vMask2.hide();
			},
			beforeshow: function() {
				vMask2.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				winKapasitas.hide();
			}
		}]
	});

	function fnCekSimpan() {
	     var tgl1 = Ext.Date.format(Ext.getCmp('txtTgl').getValue(), 'Y-m-d');
	     var tgl2 = Ext.Date.format(Ext.getCmp('txtTgl2').getValue(), 'Y-m-d');
	     var kodecabang = Ext.getCmp('cboCabang').getValue();
	     if(kodecabang==''){
	     	var kodecabang = '0';
	     }
		 var popUp = Ext.create('Ext.window.Window', {
													closable: false,
								                    height: 650,
								                    modal: true, 
								                    width: 950,
								                    layout:'anchor',
								                    title: 'REPORT',
								                    buttons: [{
														text: 'Close',
														handler: function() {
															vMask.hide();

															//var win = window;
															//win.document.write('<iframe id="tes" height="450" width="942" src="'+ url + noapk +'"></iframe>');
															
															//win.print();
															//win.close();
															//win.destroy();
															popUp.hide();

															//window.location.href = 'apknew';
														}
													}]
							                	});

							                	popUp.add({html: '<iframe height="650" width="942" src="fpd/previewfpdawal/'+tgl1+'/'+tgl2+'/'+kodecabang+'"></iframe>'});
							                	popUp.show();
	}

	function fnDownloadExcel() {
	     var tgl1 = Ext.Date.format(Ext.getCmp('txtTgl').getValue(), 'Y-m-d');
	     var tgl2 = Ext.Date.format(Ext.getCmp('txtTgl2').getValue(), 'Y-m-d');
	     var kodecabang = Ext.getCmp('cboCabang').getValue();
	     if(kodecabang==''){
	     	var kodecabang = '0';
	     }

	     var winInfo = Ext.create('Ext.window.Window', {
						closable: false,
						draggable: false,
						layout: 'fit',
						title: 'MFAS',
						width: 300,
						items: [], 
						buttons: [{
							href: 'fpd/downloadfpdawal/'+tgl1+'/'+tgl2+'/'+kodecabang,
							hrefTarget: '_blank',
							text: 'Download',
							xtype: 'button',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}

						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}
						}]
					}).show();

		
	}


	function fnSimpan() {
		var xKdKota = '';
		var xKdPelabuhan = '';
		var xJamJadwal = '';
		var xJarak = '';
		var xDurasi = '';
		var xStore = gridJam.getStore();
		
		xStore.each(function(record) {
			xKdKota = xKdKota +'|'+ record.get('fs_kd_kota');
			xKdPelabuhan = xKdPelabuhan +'|'+ record.get('fs_kd_pelabuhan');
			xJamJadwal = xJamJadwal +'|'+ Ext.Date.format(record.get('fs_jam_jadwal'), 'H:i');
			xJarak = xJarak +'|'+ record.get('fn_jarak');
			xDurasi = xDurasi +'|'+ record.get('fn_durasi');
		});
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'fpd/Simpan',
			params: {
				'fs_kd_jadwal': Ext.getCmp('cboJadwal').getValue(),
				'fb_aktif': Ext.getCmp('cekAktif').getValue(),
				'fs_kd_rute': Ext.getCmp('cboRute').getValue(),
				'fs_kd_kota': xKdKota,
				'fs_kd_pelabuhan': xKdPelabuhan,
				'fs_jam_jadwal': xJamJadwal,
				'fn_jarak': xJarak,
				'fn_durasi': xDurasi,
				'fs_kd_jadwal_lama': vKdJadwalLama,
				'fd_prefix': Ext.Date.format(new Date(), 'ym'),
				'fd_simpan': Ext.Date.format(new Date(), 'Y-m-d H:i:s')
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

	function fnCekSimpan2() {
		 var tgl1 = Ext.Date.format(Ext.getCmp('txtTgl3').getValue(), 'Y-m-d');
	     var tgl2 = Ext.Date.format(Ext.getCmp('txtTgl4').getValue(), 'Y-m-d');
	     var kodecabang = Ext.getCmp('cboCabang2').getValue();
	     if(kodecabang==''){
	     	var kodecabang = '0';
	     }

		 var popUp = Ext.create('Ext.window.Window', {
													closable: false,
								                    height: 650,
								                    modal: true, 
								                    width: 950,
								                    layout:'anchor',
								                    title: 'REPORT',
								                    buttons: [{
														text: 'Close',
														handler: function() {
															vMask.hide();

															//var win = window;
															//win.document.write('<iframe id="tes" height="450" width="942" src="'+ url + noapk +'"></iframe>');
															
															//win.print();
															//win.close();
															//win.destroy();
															popUp.hide();

															//window.location.href = 'apknew';
														}
													}]
							                	});

							                	popUp.add({html: '<iframe height="650" width="942" src="fpd/previewsvyawal/'+tgl1+'/'+tgl2+'/'+kodecabang+'"></iframe>'});
							                	popUp.show();
	}


	function fnDownloadExcelCmo() {
		 var tgl1 = Ext.Date.format(Ext.getCmp('txtTgl3').getValue(), 'Y-m-d');
	     var tgl2 = Ext.Date.format(Ext.getCmp('txtTgl4').getValue(), 'Y-m-d');
	     var kodecabang = Ext.getCmp('cboCabang2').getValue();
	     if(kodecabang==''){
	     	var kodecabang = '0';
	     }


	     var winInfo = Ext.create('Ext.window.Window', {
						closable: false,
						draggable: false,
						layout: 'fit',
						title: 'MFAS',
						width: 300,
						items: [], 
						buttons: [{
							href: 'fpd/downloadfpdawalsvy/'+tgl1+'/'+tgl2+'/'+kodecabang,
							hrefTarget: '_blank',
							text: 'Download',
							xtype: 'button',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}

						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}
						}]
					}).show();

	}

	function fnSimpan2() {
		var xTglJadwal = '';
		var xUrut = '';
		var xJamJadwal = '';
		var xKdArmada = '';
		var xKdDermaga = '';
		var xTglJadwal2 = '';
		var xUrut2 = '';
		var xJamJadwal2 = '';
		var xKdArmada2 = '';
		var xKdKelas = '';
		var xKapasitas = '';
		var xStoreArmada = gridArmada.getStore();
		var xStoreKapasitas = gridKapasitas.getStore();
		
		xStoreArmada.each(function(record) {
			xTglJadwal = xTglJadwal +'|'+ record.get('fd_tgl_jadwal');
			xUrut = xUrut +'|'+ record.get('fn_urut');
			xJamJadwal = xJamJadwal +'|'+ record.get('fs_jam_jadwal');
			xKdArmada = xKdArmada +'|'+ record.get('fs_kd_armada');
			xKdDermaga = xKdDermaga +'|'+ record.get('fs_kd_dermaga');
		});
		
		xStoreKapasitas.each(function(record) {
			xTglJadwal2 = xTglJadwal2 +'|'+ record.get('fd_tgl_jadwal');
			xUrut2 = xUrut2 +'|'+ record.get('fn_urut');
			xJamJadwal2 = xJamJadwal2 +'|'+ record.get('fs_jam_jadwal');
			xKdArmada2 = xKdArmada2 +'|'+ record.get('fs_kd_armada');
			xKdKelas = xKdKelas +'|'+ record.get('fs_kd_kelas');
			xKapasitas = xKapasitas +'|'+ record.get('fn_kapasitas');
		});
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'fpd/Simpan2',
			params: {
				'fs_kd_jadwal': Ext.getCmp('cboJadwal2').getValue(),
				'fd_tgl': Ext.Date.format(Ext.getCmp('txtTgl').getValue(), 'Y-m-d'),
				'fd_tgl2': Ext.Date.format(Ext.getCmp('txtTgl2').getValue(), 'Y-m-d'),
				'fd_tgl_jadwal': xTglJadwal,
				'fn_urut': xUrut,
				'fs_jam_jadwal': xJamJadwal,
				'fs_kd_armada': xKdArmada,
				'fs_kd_dermaga': xKdDermaga,
				'fd_tgl_jadwal2': xTglJadwal2,
				'fn_urut2': xUrut2,
				'fs_jam_jadwal2': xJamJadwal2,
				'fs_kd_armada2': xKdArmada2,
				'fs_kd_kelas': xKdKelas,
				'fn_kapasitas': xKapasitas,
				'fd_prefix': Ext.Date.format(new Date(), 'ym'),
				'fd_simpan': Ext.Date.format(new Date(), 'Y-m-d H:i:s')
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
				fnReset21();
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
		Ext.getCmp('cboJadwal').setValue('');
		Ext.getCmp('cekAktif').setValue('1');
		Ext.getCmp('cboRute').setValue('');
		Ext.getCmp('txtRute').setValue('');
		
		grupGridJam.removeAll();
		grupGridDetil.load();
		grupGridDetil2.load();
		
		vKdJadwalLama = '';
	}

	function fnReset2() {
		Ext.getCmp('cboJadwal2').setValue('');
		Ext.getCmp('txtJadwal2').setValue('');
		Ext.getCmp('txtTgl').setValue(new Date());
		Ext.getCmp('txtTgl2').setValue(new Date());
		
		grupGridTgl.removeAll();
		grupGridArmada.removeAll();
		grupGridKapasitas.removeAll();
		grupGridKapasitas2.removeAll();
	}

	function fnReset21() {
		Ext.getCmp('cboJadwal2').setValue('');
		Ext.getCmp('txtJadwal2').setValue('');
		
		grupGridTgl.removeAll();
		grupGridArmada.removeAll();
		grupGridKapasitas.removeAll();
		grupGridKapasitas2.removeAll();
	}

	var frmfpd = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Report First Payment Default',
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
				title: 'Report Dealer',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 80,
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
								cboCabang
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [
								txtJadwal2
							]
						}]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 1.33,
									layout: 'anchor',
									xtype: 'container',
									items: [
										txtTgl
									]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [
										txtTgl2
									]
								}]
							}]
						},{
							flex: 0.3,
							layout: 'anchor',
							xtype: 'container'
						},{
							flex: 0.8,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cmdTampil
							]
						}]
					}]
				},
					txtkodelk,
					gridTgl
				],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Print',
					handler: fnCekSimpan
				},
				{
					iconCls: 'icon-save',
					text: 'Download Excel',
					handler: fnDownloadExcel
				}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Report Surveyor',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
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
								cboCabang2
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [
								txtJadwal3
							]
						}]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 1.33,
									layout: 'anchor',
									xtype: 'container',
									items: [
										txtTgl3
									]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [
										txtTgl4
									]
								}]
							}]
						},{
							flex: 0.3,
							layout: 'anchor',
							xtype: 'container'
						},{
							flex: 0.8,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cmdTampil2
							]
						}]
					}]
				},
					gridTgl2
				],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Print',
					handler: fnCekSimpan2
				},
				{
					iconCls: 'icon-save',
					text: 'Download Excel',
					handler: fnDownloadExcelCmo
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Silakan Tunggu...',
		target: frmfpd
	});

	function fnMaskShow() {
		frmfpd.mask('Silakan tunggu...');
	}

	function fnMaskHide() {
		frmfpd.unmask();
	}
	
	frmfpd.render(Ext.getBody());
	Ext.get('loading').destroy();
});