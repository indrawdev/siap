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

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on record to choose',
			target: view.el,
			trackMouse: true
		});
	}

	function gridTooltipAnalisa(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Single click on the customer item in the list to display Analisa',
			target: view.el,
			trackMouse: true
		});
	}

	Ext.define('DataGridStatus', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fd_tgl_apk', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_keputusan_kredit', type: 'string'},
			{name: 'fs_catatan_analisa', type: 'string'}
		]
	});

	var grupStatus = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridStatus',
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
			url: 'statusapk/gridstatus'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridStatus = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupStatus,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true, 
			width: 100
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'No. Apk',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			width: 100
		},{
			text: 'No. PJJ',
			dataIndex: 'fs_pjj',
			menuDisabled: true,
			width: 140
		},{
			text: 'Keputusan Kredit',
			dataIndex: 'fs_keputusan_kredit',
			menuDisabled: true,
			width: 180
		},{
			text: 'Catatan Analisa',
			dataIndex: 'fs_catatan_analisa',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
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
					grupStatus.load();
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
			store: grupStatus
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});


	var frmStatusApk = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Status Aplikasi Pembiayaan Kredit',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 100,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Status Aplikasi Pembiayaan Kredit',
			xtype: 'fieldset',
			items: [
				gridStatus
			]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmStatusApk
	});

	function fnMaskShow() {
		frmStatusApk.mask('Please wait...');
	}

	function fnMaskHide() {
		frmStatusApk.unmask();
	}
	
	frmStatusApk.render(Ext.getBody());
	Ext.get('loading').destroy();
});