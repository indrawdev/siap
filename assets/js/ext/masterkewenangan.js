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

	Ext.define('DataGrid', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pola_transaksi', type: 'string'},
			{name: 'fn_maks_plafon', type: 'string'},
			{name: 'fs_maks_score', type: 'string'}
		]
	});

	var grupKewenangan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGrid',
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
			url: 'masterkewenangan/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('cboCabang').getValue(),
					'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
					'fn_maks_plafon': Ext.getCmp('txtPlafon').getValue(),
					'fs_maks_score': Ext.getCmp('txtScore').getValue()
				});
			}
		}
	});

	var gridKewenangan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupKewenangan,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Pola Transaksi',
			dataIndex: 'fs_pola_transaksi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Maks Plafon',
			dataIndex: 'fn_maks_plafon',
			menuDisabled: true,
			width: 100
		},{
			text: 'Maks Score',
			dataIndex: 'fs_maks_score',
			menuDisabled: true,
			width: 80
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKewenangan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('cboPola').setValue(record.get('fs_pola_transaksi'));
				Ext.getCmp('txtPlafon').setValue(record.get('fn_maks_plafon'));
				Ext.getCmp('txtScore').setValue(record.get('fs_maks_score'));
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
			url: 'masterkewenangan/cb_referensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'pola_transaksi'
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
					winCari.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang').setValue(record.get('fs_kode_cabang'));
				grupCabang.load();
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
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		editable: false,
		id: 'cboCabang',
		name: 'cboCabang',
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

	var cboPola = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Pola Transaksi',
		id: 'cboPola',
		name: 'cboPola',
		store: grupPola,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtPlafon = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Maks Plafon',
		id: 'txtPlafon',
		name: 'txtPlafon',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 10,
		enforceMaxLength: true
	};

	var txtScore = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Maks Score',
		id: 'txtScore',
		name: 'txtScore',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 1,
		enforceMaxLength: true
	};

	var btnSearch = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch',
		name: 'btnSearch',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupKewenangan.load();
		}
	};

	var btnSave = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave',
		name: 'btnSave',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave
	};

	var btnReset = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset',
		name: 'btnReset',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset
	};

	function fnReset() {
		Ext.getCmp('cboCabang').setValue('');
		Ext.getCmp('cboPola').setValue('');
		Ext.getCmp('txtPlafon').setValue('');
		Ext.getCmp('txtScore').setValue('');
		grupKewenangan.load();
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masterkewenangan/ceksave',
				params: {
					'fs_kode_cabang': Ext.getCmp('cboCabang').getValue(),
					'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
					'fn_maks_plafon': Ext.getCmp('txtPlafon').getValue()
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

	function fnSave() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterkewenangan/save',
			params: {
				'fs_kode_cabang': Ext.getCmp('cboCabang').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fn_maks_plafon': Ext.getCmp('txtPlafon').getValue(),
				'fs_maks_score': Ext.getCmp('txtScore').getValue()
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

	var frmMasterKewenangan = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Kewenangan',
		width: 930,
		items: [{
			bodyStyle: 'background-color: '.concat(gBasePanel),
			border: false,
			frame: false,
			xtype: 'form',
			items: [{
				fieldDefaults: {
					labelAlign: 'right',
					labelSeparator: '',
					labelWidth: 120,
					msgTarget: 'side'
				},
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
							title: 'Form Kewenangan',
							xtype: 'fieldset',
							items: [
								cboCabang,
								cboPola,
								btnSearch
							]
						},{
							anchor: '98%',
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [
								txtPlafon,
								txtScore
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
									btnSave
								]
							},{
								flex: 2,
								layout: 'anchor',
								xtype: 'container',
								items: [
									btnReset
								]
							}]
						}]
					},{
						flex: 1.5,
						layout: 'anchor',
						xtype: 'container',
						items: [{
							style: 'padding: 5px;',
							title: 'Data Kewenangan',
							xtype: 'fieldset',
							items: [
								gridKewenangan
							]
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterKewenangan
	});

	function fnMaskShow() {
		frmMasterKewenangan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterKewenangan.unmask();
	}

	frmMasterKewenangan.render(Ext.getBody());
	Ext.get('loading').destroy();
});