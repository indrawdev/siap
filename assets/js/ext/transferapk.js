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

	Ext.define('DataGridTransfer', {
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

	var grupTransfer = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridTransfer',
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
			url: 'transferapk/gridtransfer'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridTransfer = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupTransfer,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			align: 'center',
			text: 'Add',
			id: 'add',
			dataIndex: 'fb_cek',
			menuDisabled: true,
			stopSelection: false,
			xtype: 'checkcolumn',
			width: 35,
			locked: true
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true, 
			width: 100
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
					grupTransfer.load();
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
			store: grupTransfer
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	function fnCekSave()
	{
		if (this.up('form').getForm().isValid()) {
			var xnoapk = 0;

			var store = gridTransfer.getStore();
			store.each(function(record, idx) {
				xcek = record.get('fb_cek');

				if (xcek === true) {
					xnoapk = xnoapk + 1;
				}
			});

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			Ext.Ajax.request({
				method: 'POST',
				url: 'transferapk/ceksave',
				params: {
					'is_noapk': xnoapk,
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
						msg: 'Export Failed, Connection Failed!!',
						title: 'SIAP'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSave()
	{
		var xnoapk = '';
		var cek = '';

		var store = gridTransfer.getStore();
		store.each(function(record, idx) {
			xcek = record.get('fb_cek');
			if (xcek === true) {
				xnoapk = xnoapk +'|'+ record.get('fn_no_apk');
			}
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		Ext.Ajax.request({
			method: 'POST',
			url: 'transferapk/save',
			params: {
				'fn_no_apk': xnoapk
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				if (xtext.sukses === true) {
					
					var winInfo = Ext.create('Ext.window.Window', {
						closable: false,
						draggable: false,
						layout: 'fit',
						title: 'IDS',
						width: 300,
						items: [],
						buttons: [{
							href: xtext.url,
							hrefTarget: '_blank',
							text: 'Download',
							xtype: 'button'
						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winInfo.hide();
							}
						}]
					}).show();

					fnReset();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Transfer Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	function fnReset()
	{
		grupTransfer.load();
	}

	var frmTransferApk = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Transfer Aplikasi Pembiayaan Kredit',
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
			title: 'Transfer Aplikasi Pembiayaan Kredit',
			xtype: 'fieldset',
			items: [
				gridTransfer
			]
		}],
		buttons: [{
			iconCls: 'icon-save',
			id: 'btnSave',
			name: 'btnSave',
			text: 'Export DBF',
			handler: fnCekSave
		},{
			iconCls: 'icon-reset',
			text: 'Reset',
			handler: fnReset
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmTransferApk
	});

	function fnMaskShow() {
		frmTransferApk.mask('Please wait...');
	}

	function fnMaskHide() {
		frmTransferApk.unmask();
	}
	
	frmTransferApk.render(Ext.getBody());
	Ext.get('loading').destroy();

});