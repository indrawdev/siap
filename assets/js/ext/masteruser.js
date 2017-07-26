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

	var vLevel = '';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Bagian ini wajib diisi">*</span>';

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record untuk memilih',
			target: view.el,
			trackMouse: true
		});
	}

	var grupNik= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nik','fs_nama'
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
			url: 'mastersdm/ambil_nik2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupEditNik= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nik','fs_email','fs_username','fs_password'
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
			url: 'masteruser/ambil_nik2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupNik,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupNik,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		columns: [{
			width: 35,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_nik',
			hidden: true,
			menuDisabled: true,
			text: 'Nik'
		},{
			dataIndex: 'fs_nm_tujuan',
			flex: 2,
			menuDisabled: true,
			text: 'Tujuan',
			editor: {
				editable: false,
				xtype: 'textfield',
				triggers: {
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							vCbo = '0';
							winCari4.show();
							winCari4.center();
						}
					}
				}
			}
		},{
			align: 'right',
			dataIndex: 'fn_tarif',
			flex: 1,
			format: '0,000',
			menuDisabled: true,
			text: 'Tarif',
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
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNIK').setValue(record.get('fs_nik'));
				
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupEditNik,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupEditNik,
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
			{text: 'NIK', dataIndex: 'fs_nik', menuDisabled: true, width: 240},
			{text: 'Nama', dataIndex: 'fs_nama', menuDisabled: true, width: 120},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nik / Nama',
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
					grupEditNik.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNIK2').setValue(record.get('fs_nik'));
				Ext.getCmp('txtNikEdit').setValue(record.get('fs_nik'));
				Ext.getCmp('txtUsernameEdit').setValue(record.get('fs_username'));
				Ext.getCmp('txtPasswordEdit').setValue(record.get('fs_password'));
				Ext.getCmp('txtEmailEdit').setValue(record.get('fs_email'));
				
				winCari2.hide();
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
				grupNik.load();
				vMask.show();
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
				grupEditNik.load();
				vMask.show();
			}
		}
	});

	
	var cboNIK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'NIK',
		editable: true,
		id: 'cboNIK',
		enforceMaxLength: true,
		minLength: '9',
		maxLength: '10', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .0123456789]/,
		//maxLength: 5,
		name: 'cboNIK',
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

	var cboNIK2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		fieldLabel: 'NIK',
		editable: true,
		id: 'cboNIK2',
		enforceMaxLength: true,
		minLength: '9',
		maxLength: '10', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .0123456789]/,
		//maxLength: 5,
		name: 'cboNIK2',
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
					winCari2.show();
					winCari2.center();
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

	var txtKodeCabang2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		hidden:true,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		id: 'txtKodeCabang2',
		maxLength : 2,
 		enforceMaxLength : true,
		name: 'txtKodeCabang2',
		xtype: 'numberfield',
		hideTrigger: true,
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama',
		id: 'txtNama',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '50', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtNama',
		xtype: 'textfield'
	};

	var txtNik = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama',
		id: 'txtNik',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '50', 
		readOnly:true,
		value:'',
		name: 'txtNik',
		xtype: 'textfield'
	};

	var txtNikEdit = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama',
		id: 'txtNikEdit',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '50',
		hidden:true,
		value:'',
		name: 'txtNikEdit',
		xtype: 'textfield'
	};


	var grupAkses = Ext.create('Ext.data.Store', {
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
			url: 'mastersdm/cb_akses'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});



	var cboAkses = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Akses Sistem',
		id: 'cboAkses',
		name: 'cboAkses',
		store: grupAkses,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var grupCabang = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
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
			url: 'mastersdm/ambil_cabang'
		}
	});


	var grupCabang2 = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
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
			url: 'mastersdm/ambil_cabang'
		}
	});

	var grupCabang3 = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
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
			url: 'masteruser/ambil_cabang_cari'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});


	var grupJabatan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kd_akses'
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
			url: 'masteruser/KodeAkses'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_akses': Ext.getCmp('txtKodeJabatan').getValue()
				});
			}
		}
	});

	var grupUser= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nik','fs_kode_cabang','fs_nm_user','fs_username','fs_email'
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
			url: 'masteruser/ambil_user'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue()
				});
			}
		}
	});

	var grupMac= Ext.create('Ext.data.Store', {
		fields: [
			'fs_mac_address','fs_kode_cabang'
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
			url: 'masteruser/ambil_mac'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	

	var winGridJabatan = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupJabatan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJabatan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariJabatan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Jabatan', dataIndex: 'fs_kode_jabatan', menuDisabled: true, width: 240},
			{text: 'Nama Jabatan ', dataIndex: 'fs_nama_jabatan', menuDisabled: true, width: 140}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboJabatan').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtKodeJabatan').setValue(record.get('fs_kode_jabatan'));
				
				vLevel = record.get('fs_kode_jabatan').trim();

				grupGridDetil4.load();

				winCariJabatan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridCabang = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariCabang.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Nama Cabang ', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 140}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKodeCabang').setValue(record.get('fs_kode_cabang'));
				
				winCariCabang.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridMac = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupMac,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupMac,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariMac.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Mac Address', dataIndex: 'fs_mac_address', menuDisabled: true, width: 240},
			{text: 'Kdoe Cabang ', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 140}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboMac').setValue(record.get('fs_mac_address'));
				//Ext.getCmp('txtKodeCabang3').setValue(record.get('fs_kode_cabang'));
				
				winCariMac.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

		var winGridCabang2 = Ext.create('Ext.ux.LiveSearchGridPanel', {
			autoDestroy: true,
			height: 450,
			width: 550,
			sortableColumns: false,
			store: grupCabang2,
			bbar: Ext.create('Ext.PagingToolbar', {
				displayInfo: true,
				pageSize: 25,
				plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
				store: grupCabang2,
				items:[
					'-', {
					text: 'Keluar',
					handler: function() {
						winCariCabang2.hide();
					}
				}]
			}),
			columns: [
				{xtype: 'rownumberer', width: 45},
				{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
				{text: 'Nama Cabang ', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 140}
				
			],
			listeners: {
				itemdblclick: function(grid, record)
				{
					Ext.getCmp('cboCabang2').setValue(record.get('fs_nama_cabang'));
					Ext.getCmp('txtKodeCabang2').setValue(record.get('fs_kode_cabang'));
					//Ext.getCmp('txtKodeCabang2').setValue(record.get('fs_kode_cabang'));
					
					winCariCabang2.hide();
				}
			},
			viewConfig: {
				getRowClass: function() {
					return 'rowwrap';
				}
			}
		});

	var winGridCabang3 = Ext.create('Ext.grid.Panel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang3,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang3,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariCabang3.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Nama Cabang ', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 140}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang',
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
					grupCabang3.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang3').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKodeCabang3').setValue(record.get('fs_kode_cabang'));
				//Ext.getCmp('txtKodeCabang2').setValue(record.get('fs_kode_cabang'));
				
				winCariCabang3.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});
	
	var winGridUser = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupUser,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupUser,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariUser.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nik', dataIndex: 'fs_nik', menuDisabled: true, width: 240},
			{text: 'Kode Cabang ', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 140},
			{text: 'Nama User ', dataIndex: 'fs_nm_user', menuDisabled: true, width: 140},
			{text: 'Username ', dataIndex: 'fs_username', menuDisabled: true, width: 140},
			{text: 'Email ', dataIndex: 'fs_email', menuDisabled: true, width: 140}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				
				winCariUser.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var txtEmail = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Email',
		id: 'txtEmail',
		maxLength: 30,
		vtype: 'email',
		name: 'txtEmail',
		xtype: 'textfield'
	};

	var txtUsername = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Username',
		id: 'txtUsername',
		enforceMaxLength: true,
		fieldStyle: 'text-transform: uppercase;',
		minLength: '0',
		maxLength: '30', 
		name: 'txtUsername',
		xtype: 'textfield'
	};

	var txtKodeCabang3 = {
		anchor: '20%',
		fieldLabel: 'Kode Cabang',
		id: 'txtKodeCabang3',
		enforceMaxLength: true,
		hidden:true,
		minLength: '0',
		maxLength: '2', 
		name: 'txtKodeCabang3',
		xtype: 'textfield'
	};


	var txtKodeCabang4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '20%',
		fieldLabel: 'Kode Cabang',
		id: 'txtKodeCabang4',
		enforceMaxLength: true,
		//hidden:true,
		minLength: '0',
		maxLength: '2', 
		name: 'txtKodeCabang4',
		xtype: 'textfield'
	};


	var txtMacAddress = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		fieldLabel: 'Mac Address',
		id: 'txtMacAddress',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtMacAddress',
		xtype: 'textfield'
	};



	var txtPassword = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Password',
		id: 'txtPassword',
		enforceMaxLength: true,
		fieldStyle: 'text-transform: uppercase;',
		minLength: '0',
		maxLength: '30', 
		inputType: 'password',
		name: 'txtPassword',
		xtype: 'textfield'
	};

	var winCariJabatan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridJabatan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupJabatan.load();
				vMask.show();
			}
		}
	});

	var winCariCabang = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridCabang
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

	var winCariMac = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridMac
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupMac.load();
				vMask.show();
			}
		}
	});

	var winCariCabang2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridCabang2
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


	var winCariCabang3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridCabang3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCabang3.load();
				vMask.show();
			}
		}
	});


	var winCariUser = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridUser
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupUser.load();
				vMask.show();
			}
		}
	});

	Ext.define('DataGridDetil4', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nm_menu', type: 'string'},
			{name: 'fs_kd_induk', type: 'string'},
			{name: 'fs_kd_menu', type: 'string'},
			{name: 'fb_tambah', type: 'bool'}
		]
	});

	var grupGridDetil4 = Ext.create('Ext.data.TreeStore', {
		autoLoad: true,
		model: 'DataGridDetil4',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'masteruser/AmbilNodes'
		},
		rootProperty: {
			expanded: true
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				'fs_level': vLevel	

				});
			}
		}

	});


	var gridDetil4 = Ext.create('Ext.tree.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 344,
		rootVisible: false,
		sortableColumns: false,
		store: grupGridDetil4,
		columns: [{
			dataIndex: 'fs_nm_menu',
			flex: 1.5,
			menuDisabled: true,
			text: 'Menu',
			xtype: 'treecolumn'
		},{
			dataIndex: 'fs_kd_child',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			align: 'center',
			dataIndex: 'fb_tambah',
			flex: 0.25,
			menuDisabled: true,
			stopSelection: false,
			text: 'Add',
			xtype: 'checkcolumn',
			listeners: {
				checkchange: function(grid, rowIndex, checked) {
					var xStore = gridDetil4.getStore();
					var xRecord = xStore.getAt(rowIndex);
					var xTotal = grupGridDetil4.getCount();
					
					var xKode = xRecord.get('fs_kd_menu').trim();
					var xCek = xRecord.get('fb_tambah');
					var xLen = 0;
					xLen = xKode.length;
					var j = 0;
					var xAda = false;
					
					if (xCek === true) {
						
						if (xLen === 0) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
						}
						
						else if (xLen === 4) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
						else if (xLen === 6) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4) || (xLen === 6 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 4) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
						else if (xLen === 8) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4) || (xLen === 6) || (xLen === 8 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 6) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 4) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
						else if (xLen === 10) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4) || (xLen === 6) || (xLen === 8) || (xLen === 10 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 8) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 6) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 4) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
					}
					
					else { //uncek
						
						if (xLen === 0) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_tambah','0');
								}
							}
						}
						
						else if (xLen === 4) {
							// uncek 4
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 6 || xLen === 8) {
									xRecord.set('fb_tambah','0');
								}
							}
							// end of uncek 4
							
							// uncek 2
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 0) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 2
						}
						
						else if (xLen === 6) {
							// uncek 6
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4) || (xLen === 6 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 8) {
									xRecord.set('fb_tambah','0');
								}
							}
							// end of uncek 6
							
							// uncek 4
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 || xLen === 4) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 4) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 6 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 4
							
							// uncek 2
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 0) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 2
						}
						
						else if (xLen === 8) {
							// uncek 8
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4) || (xLen === 6) || (xLen === 8 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 10) {
									xRecord.set('fb_tambah','0');
								}
							}
							// end of uncek 8
							
							// uncek 6
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 || xLen === 4 || xLen === 6) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 6) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 8 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 6
							
							// uncek 4
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 || xLen === 4) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 4) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 6 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 4
							
							// uncek 2
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 0) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 2
						}
						
						else if (xLen === 10) {
							// uncek 10
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if ((xLen === 0) || (xLen === 4) || (xLen === 6) || (xLen === 8) || (xLen === 10 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 12) {
									xRecord.set('fb_tambah','0');
								}
							}
							// end of uncek 10
							
							// uncek 8
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 || xLen === 4 || xLen === 6 || xLen === 8) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 8) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 10 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 8
							
							// uncek 6
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 || xLen === 4 || xLen === 6) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 6) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 8 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 6
							
							// uncek 4
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0 || xLen === 4) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 4) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 6 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 4
							
							// uncek 2
							j = 0;
							xAda = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								
								if (xLen === 0) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xAda = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kd_menu').trim();
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 0) {
									if (xAda === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xAda = true;
									}
								}
							}
							// end of uncek 2
						}
						
					}
				}
			}
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});


	var cboJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		fieldLabel: 'Jabatan',
		editable: true,
		id: 'cboJabatan',
		//maxLength: 5,
		name: 'cboJabatan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKodeJabatan').setValue('');
					Ext.getCmp('cboJabatan').setValue('');
					vLevel = '';
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariJabatan.show();
					winCariJabatan.center();
				}
			}
		}
	};

	var cboCabang2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		fieldLabel: 'Cabang',
		editable: true,
		id: 'cboCabang2',
		//maxLength: 5,
		name: 'cboCabang2',
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
					winCariCabang2.show();
					winCariCabang2.center();
				}
			}
		}
	};

	var cboCabang3 = {
		anchor: '40%',
		fieldLabel: 'Cabang',
		editable: true,
		id: 'cboCabang3',
		//maxLength: 5,
		name: 'cboCabang3',
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
					winCariCabang3.show();
					winCariCabang3.center();
				}
			}
		}
	};

	var cboMac = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		fieldLabel: 'Mac Address',
		editable: true,
		id: 'cboMac',
		//maxLength: 5,
		name: 'cboMac',
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
					winCariMac.show();
					winCariMac.center();
				}
			}
		}
	};



	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Pilih Cabang',
		editable: true,
		id: 'cboCabang',
		name: 'cboCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariCabang.show();
					winCariCabang.center();
				}
			}
		}
	};


	var txtKodeJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeJabatan',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeJabatan',
		xtype: 'textfield'
	};

	var tglBergabung = {
			afterLabelTextTpl: required,
			allowBlank: false,
			anchor: '100%',
			editable: true,
			fieldLabel: 'Tgl Join',
			format: 'Y-m-d',
			id: 'tglBergabung',
			maskRe: /[0-9-]/,
			minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
			name: 'tglBergabung',
			value: new Date(),
			xtype: 'datefield'
		};

	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

	Ext.define('DataGridDetil3', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_aktif', type: 'bool'},
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'}
		]
	});

	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nik', type: 'string'},
			{name: 'fs_nama', type: 'string'},
			{name: 'fd_tanggal_bergabung', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fs_flag_login', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'}
		]
	});

	Ext.define('DataGridDetil2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek2', type: 'bool'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_kode_parent', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'}
		]
	});



	var grupGridDetil3 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil3',
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
			url: 'masteruser/listMasterCabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue(),
					'fs_nik': Ext.getCmp('txtNikk').getValue()
				});
			}
		}
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
			url: 'masteruser/listMasterUser'
		}
	});

	var grupGridDetil2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil2',
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
			url: 'masteruser/ambil_jabatan2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue(),
					'fs_nik': Ext.getCmp('txtNikk').getValue()
				});
			}
		}
	});

	/*var win = Ext.widget('window', {
                 title: 'Contact Us',
                 closeAction: 'hide',
                 width: 400,
                 height: 400,
                 minHeight: 400,
                 layout: 'fit',
                 resizable: true,
                 modal: true,
                 items:[
		            {
		                xtype:'form',
		                title: 'Dossier',
		                width: 600,
		                items:[
		                    {
		                        xtype: 'textfield',
		                        name: 'name',
		                        fieldLabel: 'Output',
		                        value:record.get("fs_kode_cabang"),
		                        allowBlank: false 
		                    }
		                ]
		            }
		        ]

                 //items: form
      });*/

      var gridDetil2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil2,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode Jabatan',
			width: 100
		},{
			dataIndex: 'fs_kode_parent',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode Parent',
			width: 100
		},{
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true, 
			text: 'Jabatan',
			width: 150
		},
		{
            xtype: 'checkcolumn',
            header: ' ',
            dataIndex: 'fb_cek2',
            width: 60,
            listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
    	}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil2
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

      var gridDetil3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil3,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode cabang',
			width: 100
		},{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Cabang',
			width: 150
		},
		{	
			fieldStyle: 'background-color: #eee; background-image: none;', 
            xtype: 'checkcolumn',
            header: ' ',
			readOnly:true,
            menuDisabled: true,
			stopSelection: false,
            dataIndex: 'fs_aktif',
            width: 60,
            listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
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

       var win2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: false,
		frame: false,
		height: 450,
		layout: 'fit',
		minHeight: 450,
		maxHeight: 450,
		minWidth: 590,
		maxWidth: 590,
		title: 'Siap',
		width: 500,
		items: [
			 Ext.create('Ext.form.Panel', {
					border: false,
					frame: true,
					region: 'center',
					autoDestroy:true,
					title: 'Master SDM',
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
							title: 'EDIT USER',
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
								items: [
								{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1.4,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												anchor: '98%',
												style: 'padding: 5px;',
												title: 'SDM',
												height: 535,
												xtype: 'fieldset',
												items: [
														{	anchor: '100%',
															fieldLabel: 'Nik',
															id: 'txtNikEdit',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: '',
															readOnly:true,
															name: 'txtNikEdit',
															xtype: 'textfield'
														},
														{
															anchor: '100%',
															fieldLabel: 'Username',
															id: 'txtUsernameEdit',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: '',
															readOnly:true,
															name: 'txtUsernameEdit',
															xtype: 'textfield'
														},
														{
															anchor: '100%',
															fieldLabel: 'Password',
															id: 'txtPasswordEdit',
															value: '',
															inputType:'password',
															name: 'txtPasswordEdit',
															xtype: 'textfield'
														},
														{
															anchor: '100%',
															fieldLabel: 'Email',
															id: 'txtEmailEdit',
															value: '',
															name: 'txtEmailEdit',
															xtype: 'textfield'
														},
														{
														bodyCls: 'x-panel-body-default-framed',
														buttons: [{
														iconCls: 'icon-save',
														text: 'Edit',
														handler: fnCekSimpan3
													},{
														iconCls: 'icon-reset',
														text: 'Reset',
														handler: fnReset2
													}]}
												]
											}]
										}]
									}
								]
							}]
						}]
					}]
				})
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				vMask.show();
			}
		},
		buttons: [{
			text: 'Cancel',
			handler: function() {
				vMask.hide();
				win2.hide();
			}
		}]
	});

     var win = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: false,
		frame: false,
		height: 450,
		layout: 'fit',
		minHeight: 580,
		maxHeight: 580,
		minWidth: 990,
		maxWidth: 990,
		title: 'Siap',
		width: 500,
		items: [
			 Ext.create('Ext.form.Panel', {
					border: false,
					frame: true,
					region: 'center',
					autoDestroy:true,
					title: 'Master SDM',
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
							title: 'Master SDM',
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
								items: [
								{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1.4,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												anchor: '98%',
												style: 'padding: 5px;',
												title: 'SDM',
												height: 535,
												xtype: 'fieldset',
												items: [
														 {
															afterLabelTextTpl: required,
															allowBlank: false,
															anchor: '100%',
															fieldLabel: 'Nik',
															id: 'txtNikk',
															enforceMaxLength: true,
															minLength: '0',
															maxLength: '50',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: '',
															readOnly:true,
															name: 'txtNikk',
															xtype: 'textfield'
														},
														{
															afterLabelTextTpl: required,
															allowBlank: false,
															anchor: '100%',
															fieldLabel: 'Nama',
															id: 'txtNamaa',
															enforceMaxLength: true,
															minLength: '0',
															maxLength: '50',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: '',
															readOnly:true,
															name: 'txtNamaa',
															xtype: 'textfield'
														},
														{
															afterLabelTextTpl: required,
															allowBlank: false,
															anchor: '100%',
															fieldLabel: 'Tgl Join',
															id: 'txtTglJoin2',
															enforceMaxLength: true,
															minLength: '0',
															maxLength: '50',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: '',
															readOnly:true,
															name: 'txtTglJoin2',
															xtype: 'textfield'
														},
														txtEmail,
														txtUsername,
														txtPassword,
														{
														bodyCls: 'x-panel-body-default-framed',
														buttons: [{
														iconCls: 'icon-save',
														text: 'Registrasi',
														handler: fnCekSimpan
													},{
														iconCls: 'icon-reset',
														text: 'Reset',
														handler: fnReset
													},{

														flex: 0.9,
														layout: 'anchor',
														xtype: 'container',
														items: []
													
													}]}
													]
											}]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												style: 'padding: 5px;',
												title: 'Cabang',
												items: [
													gridDetil3,
												]
											}]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												style: 'padding: 5px;',
												title: 'Jabatan',
												items: [
													gridDetil2,
												]
											}]
										}]
									}
								]
							}]
						}]
					}]
				})
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupGridDetil3.load();
				grupGridDetil2.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'Cancel',
			handler: function() {
				vMask.hide();
				win.hide();
			}
		}]
	});
    
	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '60%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil,
		listeners:{
        itemdblclick: function(grid,record){

        	//alert(record.data.fs_nik);
             Ext.getCmp('txtNikk').setValue(record.data.fs_nik);
             Ext.getCmp('txtNamaa').setValue(record.data.fs_nama);
             Ext.getCmp('txtTglJoin2').setValue(record.data.fd_tanggal_bergabung);

             vMask.show();
			 win.show();
        		/*var f = Ext.create('Ext.form.Panel', {
					border: false,
					frame: true,
					region: 'center',
					autoDestroy:true,
					title: 'Master SDM',
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
							title: 'Master SDM',
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
								items: [
								{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1.4,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												anchor: '98%',
												style: 'padding: 5px;',
												title: 'SDM',
												height: 535,
												xtype: 'fieldset',
												items: [
														 {
															afterLabelTextTpl: required,
															allowBlank: false,
															anchor: '100%',
															fieldLabel: 'Nik',
															id: 'txtNikk',
															enforceMaxLength: true,
															minLength: '0',
															maxLength: '50',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: record.data.fs_nik,
															readOnly:true,
															name: 'txtNikk',
															xtype: 'textfield'
														},
														{
															afterLabelTextTpl: required,
															allowBlank: false,
															anchor: '100%',
															fieldLabel: 'Nama',
															id: 'txtNamaa',
															enforceMaxLength: true,
															minLength: '0',
															maxLength: '50',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: record.data.fs_nama,
															readOnly:true,
															name: 'txtNamaa',
															xtype: 'textfield'
														},
														{
															afterLabelTextTpl: required,
															allowBlank: false,
															anchor: '100%',
															fieldLabel: 'Tgl Join',
															id: 'txtTglJoin',
															enforceMaxLength: true,
															minLength: '0',
															maxLength: '50',
															fieldStyle: 'background-color: #eee; background-image: none;', 
															value: record.data.fd_tanggal_bergabung,
															readOnly:true,
															name: 'txtTglJoin',
															xtype: 'textfield'
														},
														txtEmail,
														txtUsername,
														txtPassword,
														{
														bodyCls: 'x-panel-body-default-framed',
														buttons: [{
														iconCls: 'icon-save',
														text: 'Registrasi',
														//handler: fnCekSimpan
													},{
														iconCls: 'icon-reset',
														text: 'Reset (ok)',
														//handler: fnReset
													},{

														flex: 0.9,
														layout: 'anchor',
														xtype: 'container',
														items: []
													
													},{
														iconCls: 'icon-delete',
														text: 'Unregistrasi',
														//handler: fnReset
													}]}
													]
											}]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												style: 'padding: 5px;',
												title: 'Cabang',
												items: [
													gridDetil3,
												]
											}]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												style: 'padding: 5px;',
												title: 'Jabatan',
												items: [
													gridDetil2,
												]
											}]
										}]
									}
								]
							}]
						},{
							bodyStyle: 'background-color: '.concat(gBasePanel),
							border: false,
							frame: false,
							title: 'Struktur Organisasi Cabang',
							xtype: 'form',
							items: [
								
							]
						}]
					}]
				});
				*/




		   //win.add(f);
		 	

       	 }
    	},
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode cabang',
			width: 100,
			ref : 'fs_kode_cabang'
		},{
			dataIndex: 'fs_nik',
			menuDisabled: true, 
			text: 'NIK',
			width: 150
		},
		{
			dataIndex: 'fs_nama',
			menuDisabled: true, 
			text: 'Nama',
			width: 150
		},
		{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Cabang',
			width: 150
		},
		{
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true, 
			text: 'Jabatan',
			width: 150
		}
		],
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
				url: 'masteruser/CekSimpan',
				params: {
				'fs_nik': Ext.getCmp('txtNikk').getValue()
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
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSimpan2();
									}
								}
							});
						
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

	function fnCekMac() {
		if (this.up('form').getForm().isValid()) {

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/CekMac',
				params: {
				'fs_mac': Ext.getCmp('cboMac').getValue(),
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang3').getValue()
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
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSaveMac();
									}
								}
							});
						
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

	function fnDaftarUser() {
		if (this.up('form').getForm().isValid()) {


			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/CekUser',
				params: {
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue()
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
						winCariUser.show();
						winCariUser.center();
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

	function fnCariNik() {
		if (this.up('form').getForm().isValid()) {


			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/CekNik',
				params: {
				'fs_nik': Ext.getCmp('cboNIK2').getValue()
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
						win2.show();
						win2.center();
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
		var xNamaCabang = '';
		var xNamaJabatan= '';
		var xKdCabang = '';
		var xKdJabatan = '';
		var store = gridDetil.getStore();
		
		store.each(function(record, idx) {
			if (record.get('fb_cek') === true) {
				xKdCabang = xKdCabang +'|'+ record.get('fs_kode_cabang');
				xNamaCabang = xNamaCabang +'|'+ record.get('fs_nama_cabang');
			}
		});


		var store2 = gridDetil2.getStore();
		
		store2.each(function(record, idx) {
			if (record.get('fb_cek2') === true) {
				xKdJabatan = xKdJabatan +'|'+ record.get('fs_kode_jabatan');
				xNamaJabatan = xNamaJabatan +'|'+ record.get('fs_nama_jabatan');
			}
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersdm/Simpan',
			params: {
				'fs_kode_cabang': xKdCabang,
				'fs_kode_jabatan': xKdJabatan,
				'fs_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_nama': Ext.getCmp('txtNama').getValue(),
				'fd_tanggal_bergabung': Ext.getCmp('tglBergabung').getValue(),
				'fs_akses_sistem': Ext.getCmp('cboAkses').getValue(),
				'fs_kode_cabang2': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_kode_jabatan2': Ext.getCmp('txtKodeJabatan').getValue(),
				'fd_tanggal_dibuat': Ext.Date.format(new Date(), 'Y-m-d')
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap'
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


	function fnSimpan2() {
	
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/Simpan2',
			params: {
				'fs_nik': Ext.getCmp('txtNikk').getValue(),
				'fs_nama':  Ext.getCmp('txtNamaa').getValue(),
				'fd_tanggal_buat': Ext.getCmp('txtTglJoin2').getValue(),
				'fs_email': Ext.getCmp('txtEmail').getValue(),
				'fs_username': Ext.getCmp('txtUsername').getValue(),
				'fs_password': Ext.getCmp('txtPassword').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap',
					fn: function(btn) {


				Ext.getCmp('txtEmail').setValue('');
				Ext.getCmp('txtUsername').setValue('');
				Ext.getCmp('txtPassword').setValue('');
				grupGridDetil.load();
						vMask.hide();
						win.hide();
				}
				});
				//fnReset();
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


	function fnSimpan4() {
	
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/Simpan4',
			params: {
				'fs_nik': Ext.getCmp('txtNikEdit').getValue(),
				'fs_email': Ext.getCmp('txtEmailEdit').getValue(),
				'fs_username': Ext.getCmp('txtUsernameEdit').getValue(),
				'fs_password': Ext.getCmp('txtPasswordEdit').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap',
					fn: function(btn) {


				Ext.getCmp('txtNikEdit').setValue('');
				Ext.getCmp('cboNIK2').setValue('');
				Ext.getCmp('txtEmailEdit').setValue('');
				Ext.getCmp('txtPasswordEdit').setValue('');
				Ext.getCmp('txtUsernameEdit').setValue('');
						vMask.hide();
						win2.hide();
				}
				});
				//fnReset();
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

	function fnSaveMac() {
	
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/simpan_mac',
			params: {
				'fs_mac':  Ext.getCmp('cboMac').getValue(),
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang3').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap'
				});
				fnReset3();
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


	function fnReset() {
		Ext.getCmp('txtNikk').setValue('');
		Ext.getCmp('txtNamaa').setValue('');
		Ext.getCmp('txtTglJoin2').setValue('');
		Ext.getCmp('txtEmail').setValue('');
		Ext.getCmp('txtUsername').setValue('');
		Ext.getCmp('txtPassword').setValue('');

		grupGridDetil.load();
		grupGridDetil2.load();
	}

	function fnReset2() {
		Ext.getCmp('txtEmailEdit').setValue('');
		Ext.getCmp('txtPasswordEdit').setValue('');
	}


	function fnReset3() {
		Ext.getCmp('txtKodeCabang3').setValue('');
		Ext.getCmp('cboMac').setValue('');
		Ext.getCmp('cboCabang3').setValue('');
	}	

	function fnreset4() {
		Ext.getCmp('txtKodeCabang3').setValue('');
		Ext.getCmp('cboMac').setValue('');
		Ext.getCmp('cboCabang3').setValue('');
	}	

	function fnCekSimpan2() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/CekSimpan2',
				params: {
					'fs_kd_akses': Ext.getCmp('txtKodeJabatan').getValue()
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
							fnSimpan3();
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
										fnSimpan3();
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

	function fnCekSimpan3() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/CekSimpan3',
				params: {
					'fs_nik': Ext.getCmp('txtNikEdit').getValue()
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
							fnSimpan4();
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
										fnSimpan4();
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

	function fnUnregMac() {
		if (this.up('form').getForm().isValid()) {

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/cekUnreg',
				params: {
				'fs_mac': Ext.getCmp('cboMac').getValue()
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
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnUnreg();
									}
								}
							});
						
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

	function fnUnreg() {
	
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/Unreg',
			params: {
				'fs_mac': Ext.getCmp('cboMac').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap',
					fn: function(btn) {

						fnreset4();
						//Ext.getCmp('cboNIK').setValue('');
						//vMask.hide();
						//win.hide();
									
								}
				});
				//fnReset();
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

	function fnSimpan3() {
		var xKdInduk = '';
		var xKdMenu = '';
		var store = gridDetil4.getStore();
		
		store.each(function(record, idx) {
			if (record.get('fb_tambah') === true) {
				xKdInduk = xKdInduk +'|'+ record.get('fs_kd_induk');
				xKdMenu = xKdMenu +'|'+ record.get('fs_kd_menu');
			}
		});
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/save2',
			params: {
				'fs_level': Ext.getCmp('txtKodeJabatan').getValue(),
				'fs_kd_induk': xKdInduk,
				'fs_kd_menu': xKdMenu
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
				fnReset1();
				
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

	function fnReset1() {
		Ext.getCmp('cboJabatan').setValue('');
		vLevel = '';
		Ext.getCmp('txtKodeJabatan').setValue('');
		//grupGridDetil4.load();
	}


	var frmSetupVariabelTipe = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Akses',
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
				title: 'Master User',
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
					items: [
						{
					        xtype: 'label',
					        forId: 'myFieldId',
					        text: 'Daftar Permintaan Akses',
					        margins: '0 0 0 10'
					    },
					gridDetil,
					]
				},
				cboNIK2,
				{
						bodyCls: 'x-panel-body-default-framed',

						buttonAlign:'left',	
						buttons: [{
						layout: 'anchor',
						iconCls: 'icon-preview',
						text: 'Edit',
						handler: fnCariNik
						}]}
				]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar User',
				xtype: 'form',
				items: [
						
						cboCabang2,
						txtKodeCabang2,
						{
						bodyCls: 'x-panel-body-default-framed',

						buttonAlign:'left',	
						buttons: [{
						layout: 'anchor',
						iconCls: 'icon-preview',
						text: 'Preview',
						handler: fnDaftarUser
						}]}
				]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Level Akses',
				xtype: 'form',
				items: [
					
					cboJabatan,
					txtKodeJabatan,
					gridDetil4,
				],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Simpan',
					handler: fnCekSimpan2
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
				title: 'Registrasi MAC Address',
				xtype: 'form',
				items: [
						cboCabang3,
						txtKodeCabang3,
						cboMac,
						//txtKodeCabang4,
						{
						bodyCls: 'x-panel-body-default-framed',

						buttonAlign:'left',	
						buttons: [{
						layout: 'anchor',
						iconCls: 'icon-save',
						text: 'Save',
						handler: fnCekMac
						},
						{
						layout: 'anchor',
						iconCls: 'icon-delete',
						text: 'Unregistrasi Mac Address',
						handler: fnUnregMac
						}]}
						]
			}
			]
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