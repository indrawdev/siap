Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require('Ext.ux.window.Notification');


Ext.onReady(function() {
	Ext.QuickTips.init();

	/* CRONJOB SERVICE */
	var updateCronJob = function () {
		Ext.Ajax.request({
			method: 'POST',
			url: 'notification/getdocnotif',
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				if (xtext.sukses === true) {
					var xtotal = xtext.data.length;

					if (xtotal > 0) {
						var xhtml = '';

						for (var i = 0; i < xtext.data.length; i++) {
							xhtml += "Nama Konsumen : <b>" + xtext.data[i].fs_nama_konsumen + "</b> Dokumen : <b>" + xtext.data[i].fs_hitung + "</b> <font color='red'><i>*data pendukung (wajib) belum diisi</i></font><br/>";
						}

						Ext.create('widget.uxNotification', {
							title: 'Notifikasi Input Hasil Survey',
							position: 'br',
							manager: 'instructions',
							html: xhtml,
							autoCloseDelay: 7000,
							slideBackDuration: 300,
							slideInAnimation: 'bounceOut',
							slideBackAnimation: 'easeIn'
						}).show();	
					}
				}
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					message: 'Load default value Failed, Connection Failed!!',
					title: 'SIAP'
				});
			}
		});
	};

	var runner = new Ext.util.TaskRunner();

	var task = runner.start({
		run: updateCronJob,
		fireOnStart: false,
		interval: 60000
	});
	
	Ext.define('DataGridDoc', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_pjj', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_hitung', type: 'string'}
		]
	});

	var grupDoc = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDoc',
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
			url: 'notification/griddocnotif'
		}
	});

	var gridDoc = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 225,
		sortableColumns: false,
		store: grupDoc,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_pjj',
			menuDisabled: true, 
			text: 'No. PJJ',
			width: 110
		},{
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true, 
			text: 'Nama Konsumen',
			width: 250
		},{
			dataIndex: 'fs_hitung',
			menuDisabled: true, 
			text: 'Kurang Dokumen Wajib',
			width: 180
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDoc
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var frmNotif = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Notification',
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
					labelWidth: 100,
					msgTarget: 'side'
				},
				anchor: '100%',
				style: 'padding: 5px;',
				title: 'Kurang Data Dokumen Wajib',
				xtype: 'fieldset',
				items: [
					gridDoc
				]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmNotif
	});

	function fnMaskShow() {
		frmNotif.mask('Please wait...');
	}

	function fnMaskHide() {
		frmNotif.unmask();
	}

	frmNotif.render(Ext.getBody());
	Ext.get('loading').destroy();
});