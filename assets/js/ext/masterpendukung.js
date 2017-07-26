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
			{name: 'fs_kode_dokumen', type: 'string'},
			{name: 'fs_jenis_pembiayaan', type: 'string'},
			{name: 'fs_jenis_dokumen', type: 'string'},
			{name: 'fs_nama_dokumen', type: 'string'},
			{name: 'fs_wajib', type: 'int'}
		]
	});

	var grupDataPendukung = Ext.create('Ext.data.Store', {
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
			url: 'masterpendukung/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_dokumen': Ext.getCmp('txtKodeDok').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('cboBiaya').getValue(),
					'fs_jenis_dokumen': Ext.getCmp('cboDok').getValue(),
					'fs_nama_dokumen': Ext.getCmp('txtNamaDok').getValue(),
					'fs_wajib': Ext.getCmp('cboWajib').getValue()
				});
			}
		}
	});

	var gridDataPendukung = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupDataPendukung,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Dokumen',
			dataIndex: 'fs_kode_dokumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Dokumen',
			dataIndex: 'fs_jenis_dokumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Nama Dokumen',
			dataIndex: 'fs_nama_dokumen',
			menuDisabled: true,
			width: 180
		},{
			text: 'Wajib',
			dataIndex: 'fs_wajib',
			menuDisabled: true,
			width: 80
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDataPendukung
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodeDok').setValue(record.get('fs_kode_dokumen'));
				Ext.getCmp('cboBiaya').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboDok').setValue(record.get('fs_jenis_dokumen'));
				Ext.getCmp('txtNamaDok').setValue(record.get('fs_nama_dokumen'));
				Ext.getCmp('cboWajib').setValue(record.get('fs_wajib'));
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

	var txtKodeDok = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Dokumen',
		id: 'txtKodeDok',
		name: 'txtKodeDok',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 5,
		enforceMaxLength: true
	};

	var grupPembiayaan = Ext.create('Ext.data.Store', {
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
			url: 'masterpendukung/cb_pembiayaan'
		}
	});

	var cboBiaya = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Pembiayaan',
		id: 'cboBiaya',
		name: 'cboBiaya',
		store: grupPembiayaan,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var grupDokumen = Ext.create('Ext.data.Store', {
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
			url: 'masterpendukung/cb_dokumen'
		}
	});

	var cboDok = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Dokumen',
		id: 'cboDok',
		name: 'cboDok',
		store: grupDokumen,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtNamaDok = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Dokumen',
		id: 'txtNamaDok',
		name: 'txtNamaDok',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 100,
		enforceMaxLength: true
	};

	var grupWajib = Ext.create('Ext.data.Store', {
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
			url: 'masterpendukung/cb_wajib'
		}
	});

	var cboWajib = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Wajib',
		id: 'cboWajib',
		name: 'cboWajib',
		store: grupWajib,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
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
			grupDataPendukung.load();
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
		Ext.getCmp('txtKodeDok').setValue('');
		Ext.getCmp('cboBiaya').setValue('');
		Ext.getCmp('cboDok').setValue('');
		Ext.getCmp('txtNamaDok').setValue('');
		Ext.getCmp('cboWajib').setValue('');
		grupDataPendukung.load();
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterpendukung/ceksave',
				params: {
					'fs_kode_dokumen': Ext.getCmp('txtKodeDok').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('cboBiaya').getValue(),
					'fs_jenis_dokumen': Ext.getCmp('cboDok').getValue()
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
			url: 'masterpendukung/save',
			params: {
				'fs_kode_dokumen': Ext.getCmp('txtKodeDok').getValue(),
				'fs_jenis_pembiayaan': Ext.getCmp('cboBiaya').getValue(),
				'fs_jenis_dokumen': Ext.getCmp('cboDok').getValue(),
				'fs_nama_dokumen': Ext.getCmp('txtNamaDok').getValue(),
				'fs_wajib': Ext.getCmp('cboWajib').getValue()
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


	var frmMasterPendukung = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Data Pendukung',
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
							title: 'Form Data Pendukung',
							xtype: 'fieldset',
							items: [
								txtKodeDok,
								cboDok,
								cboBiaya,
								btnSearch
							]
						},{
							anchor: '98%',
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [
								txtNamaDok,
								cboWajib
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
							title: 'Data Pendukung',
							xtype: 'fieldset',
							items: [
								gridDataPendukung
							]
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterPendukung
	});

	function fnMaskShow() {
		frmMasterPendukung.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterPendukung.unmask();
	}

	frmMasterPendukung.render(Ext.getBody());
	Ext.get('loading').destroy();
});