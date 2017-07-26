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

	var required = '<span style="color:red;font-weight:bold" data-qtip="Bagian ini wajib diisi">*</span>';
	var d = new Date();
	var year = d.getFullYear();

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on record to choose',
			target: view.el,
			trackMouse: true
		});
	}

	Ext.define('DataGridCounter', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_jenis_counter', type: 'string'},
			{name: 'fs_no_jenis_counter', type: 'string'},
			{name: 'fn_counter', type: 'string'}
		]
	});

	var grupCounter = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridCounter',
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
			url: 'mastersetup/gridcounter'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('cboCabang1').getValue(),
					'fs_jenis_counter': Ext.getCmp('cboJenisCo1').getValue(),
					'fs_no_jenis_counter': Ext.getCmp('cboNoJen1').getValue()
				});
			}
		}
	});
	
	var gridCounter = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupCounter,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Counter',
			dataIndex: 'fs_jenis_counter',
			menuDisabled: true,
			width: 100
		},{
			text: 'No. Jenis',
			dataIndex: 'fs_no_jenis_counter',
			menuDisabled: true,
			width: 100
		},{
			text: 'No. Counter',
			dataIndex: 'fn_counter',
			menuDisabled: true,
			width: 100
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCounter
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang1').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('cboJenisCo1').setValue(record.get('fs_jenis_counter'));
				Ext.getCmp('cboNoJen1').setValue(record.get('fs_no_jenis_counter'));
				Ext.getCmp('txtCounter1').setValue(record.get('fn_counter'));
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
			url: 'mastersetup/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupJenisCo = Ext.create('Ext.data.Store', {
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
			url: 'mastersetup/cb_jenisco'
		}
	});

	var grupNoJen = Ext.create('Ext.data.Store', {
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
			url: 'mastersetup/cb_nojen'
		}
	});

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

	var cboJenisCo1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Counter',
		id: 'cboJenisCo1',
		name: 'cboJenisCo1',
		store: grupJenisCo,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboNoJen1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'No. Jenis Counter',
		id: 'cboNoJen1',
		name: 'cboNoJen1',
		store: grupNoJen,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCounter1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Counter',
		id: 'txtCounter1',
		name: 'txtCounter1',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtYear = {
		hidden: true,
		id: 'txtYear',
		name: 'txtYear',
		xtype: 'textfield',
		value: year
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
			grupCounter.load();
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

	var btnUpdate1 = {
		anchor: '95%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnUpdate1',
		name: 'btnUpdate1',
		text: 'Reset No. Counter by Yearly',
		iconCls: 'icon-reset',
		handler: fnCekUpdate1
	};

	function fnReset1() {
		Ext.getCmp('cboCabang1').setValue('');
		Ext.getCmp('cboJenisCo1').setValue('');
		Ext.getCmp('cboNoJen1').setValue('');
		Ext.getCmp('txtCounter1').setValue('');
		grupCounter.load();
	}

	function fnCekSave1() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersetup/ceksavecounter',
				params: {
					'fs_kode_cabang': Ext.getCmp('cboCabang1').getValue(),
					'fs_jenis_counter': Ext.getCmp('cboJenisCo1').getValue(),
					'fs_no_jenis_counter': Ext.getCmp('cboNoJen1').getValue(),
					'fn_counter': Ext.getCmp('txtCounter1').getValue()
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
			url: 'mastersetup/savecounter',
			params: {
				'fs_kode_cabang': Ext.getCmp('cboCabang1').getValue(),
				'fs_jenis_counter': Ext.getCmp('cboJenisCo1').getValue(),
				'fs_no_jenis_counter': Ext.getCmp('cboNoJen1').getValue(),
				'fn_counter': Ext.getCmp('txtCounter1').getValue()
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

	function fnCekUpdate1(){
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersetup/cekresetcounter',
			params: {
				'fn_year': Ext.getCmp('txtYear').getValue()
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
									fnUpdate1();
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
					msg: 'Reset Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}
	
	function fnUpdate1(){
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersetup/resetcounter',
			params: {
				'fn_year': Ext.getCmp('txtYear').getValue()
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
					msg: 'Reset Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	var frmMasterSetup = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Setup',
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
				title: 'Master Counter',
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
								title: 'Form Counter',
								xtype: 'fieldset',
								items: [
									cboCabang1,
									cboJenisCo1,
									cboNoJen1,
									btnSearch1
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtCounter1,
									txtYear
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								style: 'padding: 5px;',
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
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								style: 'padding: 5px;',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 4,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnUpdate1
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Counter',
								xtype: 'fieldset',
								items: [
									gridCounter
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
		target: frmMasterSetup
	});

	function fnMaskShow() {
		frmMasterSetup.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterSetup.unmask();
	}

	frmMasterSetup.render(Ext.getBody());
	Ext.get('loading').destroy();
});