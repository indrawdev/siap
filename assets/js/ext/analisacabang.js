Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager',
	'Ext.ux.window.Notification'
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


	/* START CRONJOB SERVICE */
	var updateCronJob = function () {
		Ext.Ajax.request({
			method: 'POST',
			url: 'notification/getfinalnotif',
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				if (xtext.sukses === true) {
					var xtotal = xtext.data.length;

					if (xtotal > 0) {
						var xhtml = '';

						for (var i = 0; i < xtext.data.length; i++) {
							xhtml += "Nomor PJJ : <b>" + xtext.data[i].fs_pjj + "</b> | Nama Konsumen : <b>" + xtext.data[i].fs_nama_konsumen + "</b> <font color='red'><i>*belum diputuskan</i></font><br/>";
						}

						Ext.create('widget.uxNotification', {
							title: 'Notifikasi Analisa Keputusan Kredit',
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
	/* START CRONJOB SERVICE */

	Ext.define('DataGridRetail', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'},
			{name: 'fs_alamat_konsumen', type: 'string'},
			{name: 'fs_kelurahan_konsumen', type: 'string'},
			{name: 'fs_kecamatan_konsumen', type: 'string'},
			{name: 'fs_kota_konsumen', type: 'string'},
			{name: 'fs_kodepos_konsumen', type: 'string'},
			{name: 'fs_telepon_konsumen', type: 'string'},
			{name: 'fs_handphone_konsumen', type: 'string'}
		]
	});

	var grupRetail = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridRetail',
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
			url: 'analisa/gridretail'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue(),
					'fs_flag_survey': '1'
				});
			}
		}
	});

	var gridRetail = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 180,
		sortableColumns: false,
		store: grupRetail,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Apk',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. PJJ',
			dataIndex: 'fs_pjj',
			menuDisabled: true,
			locked: true,
			width: 140
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'KTP Konsumen',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true, 
			width: 100
		},{
			text: 'Alamat Konsumen',
			dataIndex: 'fs_alamat_konsumen',
			menuDisabled: true,
			width: 250
		},{
			text: 'Kelurahan',
			dataIndex: 'fs_kelurahan_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kecamatan',
			dataIndex: 'fs_kecamatan_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kota',
			dataIndex: 'fs_kota_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kode Pos',
			dataIndex: 'fs_kodepos_konsumen',
			menuDisabled: true,
			width: 70
		},{
			text: 'Telepon',
			dataIndex: 'fs_telepon_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Handphone',
			dataIndex: 'fs_handphone_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Status APK',
			dataIndex: 'fs_status_konsumen',
			menuDisabled: true,
			width: 80
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'APK Grade',
			dataIndex: 'fs_grade',
			menuDisabled: true,
			hidden: true,
		},{
			text: 'APK Score',
			dataIndex: 'fs_score',
			menuDisabled: true,
			hidden: true,
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
					grupRetail.load();
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
			store: grupRetail
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKdCab').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApk').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtPJJ').setValue(record.get('fs_pjj'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_konsumen'));
				Ext.getCmp('txtJnsPembiayaan').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboInternalChecking').setValue(record.get('fs_status_blacklist'));
				Ext.getCmp('cboRejectChecking').setValue(record.get('fs_status_reject'));
				Ext.getCmp('cboFamilyChecking').setValue(record.get('fs_status_family'));
				Ext.getCmp('cboPJJGrade').setValue(record.get('fs_grade'));
				Ext.getCmp('cboPJJScore').setValue(record.get('fs_score'));

				// clear field
				Ext.getCmp('txtNoBatch').setValue('');
				Ext.getCmp('cboKeputusan').setValue('');
				Ext.getCmp('txtCatAnalisa').setValue('');
				
				Ext.getCmp('btnParsial').setDisabled(true);

				// change tab
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipAnalisa
			},
			markDirty: false,
			stripeRows: true
		}
	});

	Ext.define('DataGridFleet', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_no_batch', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'},
			{name: 'fs_alamat_konsumen', type: 'string'},
			{name: 'fs_kelurahan_konsumen', type: 'string'},
			{name: 'fs_kecamatan_konsumen', type: 'string'},
			{name: 'fs_kota_konsumen', type: 'string'},
			{name: 'fs_kodepos_konsumen', type: 'string'},
			{name: 'fs_telepon_konsumen', type: 'string'},
			{name: 'fs_handphone_konsumen', type: 'string'}
		]
	});

	var grupFleet = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridFleet',
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
			url: 'analisa/gridfleet'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue(),
					'fs_flag_survey': '1'
				});
			}
		}
	});

	var gridFleet =  Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 180,
		sortableColumns: false,
		store: grupFleet,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Apk',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. Batch',
			dataIndex: 'fn_no_batch',
			menuDisabled: true,
			locked: true,
			width: 140
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'KTP Konsumen',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true, 
			width: 100
		},{
			text: 'Alamat Konsumen',
			dataIndex: 'fs_alamat_konsumen',
			menuDisabled: true,
			width: 250
		},{
			text: 'Kelurahan',
			dataIndex: 'fs_kelurahan_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kecamatan',
			dataIndex: 'fs_kecamatan_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kota',
			dataIndex: 'fs_kota_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kode Pos',
			dataIndex: 'fs_kodepos_konsumen',
			menuDisabled: true,
			width: 70
		},{
			text: 'Telepon',
			dataIndex: 'fs_telepon_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Handphone',
			dataIndex: 'fs_handphone_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Status APK',
			dataIndex: 'fs_status_konsumen',
			menuDisabled: true,
			width: 80
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'APK Grade',
			dataIndex: 'fs_grade',
			menuDisabled: true,
			hidden: true,
		},{
			text: 'APK Score',
			dataIndex: 'fs_score',
			menuDisabled: true,
			hidden: true,
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'No. Batch / Nama Konsumen',
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
					grupFleet.load();
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
			store: grupFleet
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKdCab').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoBatch').setValue(record.get('fn_no_batch'));
				Ext.getCmp('txtNoApk').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtPJJ').setValue(record.get('fs_pjj'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_konsumen'));
				Ext.getCmp('txtJnsPembiayaan').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboInternalChecking').setValue(record.get('fs_status_blacklist'));
				Ext.getCmp('cboRejectChecking').setValue(record.get('fs_status_reject'));
				Ext.getCmp('cboFamilyChecking').setValue(record.get('fs_status_family'));
				Ext.getCmp('cboPJJGrade').setValue(record.get('fs_grade'));
				Ext.getCmp('cboPJJScore').setValue(record.get('fs_score'));

				// clear field
				Ext.getCmp('cboKeputusan').setValue('');
				Ext.getCmp('txtCatAnalisa').setValue('');

				Ext.getCmp('btnParsial').setDisabled(false);

				// change tab
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipAnalisa
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var txtKdCab = {
		id: 'txtKdCab',
		name: 'txtKdCab',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoApk = {
		id: 'txtNoApk',
		name: 'txtNoApk',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoBatch = {
		id: 'txtNoBatch',
		name: 'txtNoBatch',
		xtype: 'textfield',
		hidden: true
	};

	var txtPJJ = {
		id: 'txtPJJ',
		name: 'txtPJJ',
		xtype: 'textfield',
		hidden: true
	};

	var txtJnsPembiayaan = {
		id: 'txtJnsPembiayaan',
		name: 'txtJnsPembiayaan',
		xtype: 'textfield',
		hidden: true
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Konsumen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var cboInternalChecking = {
		anchor: '100%',
		fieldLabel: 'Internal Checking',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboInternalChecking',
		name: 'cboInternalChecking',
		xtype: 'textfield'
	};

	var cboRejectChecking = {
		anchor: '100%',
		fieldLabel: 'Reject Checking',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboRejectChecking',
		name: 'cboRejectChecking',
		xtype: 'textfield'
	};

	var cboFamilyChecking = {
		anchor: '100%',
		fieldLabel: 'Family Checking',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboFamilyChecking',
		name: 'cboFamilyChecking',
		xtype: 'textfield'
	};

	var cboPJJGrade = {
		anchor: '60%',
		fieldLabel: 'APK Grade',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboPJJGrade',
		name: 'cboPJJGrade',
		xtype: 'textfield'
	};

	var cboPJJScore = {
		anchor: '60%',
		fieldLabel: 'APK Score',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboPJJScore',
		name: 'cboPJJScore',
		xtype: 'textfield'
	};

	var grupKeputusan = Ext.create('Ext.data.Store', {
		autoLoad: false,
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
			url: 'analisa/cb_keputusan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'keputusan_kredit'
				});
			}
		}
	});

	var cboKeputusan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Keputusan Kredit',
		id: 'cboKeputusan',
		name: 'cboKeputusan',
		store: grupKeputusan,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCatAnalisa = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 80,
		fieldLabel: 'Catatan Analisa Kredit',
		id: 'txtCatAnalisa',
		name: 'txtCatAnalisa',
		xtype: 'textareafield',
	};

	var grupPreData = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang',
			'fs_kode_dokumen','fs_dokumen_upload',
			'fd_tanggal_buat', 'fs_iduser_buat'
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
			url: 'analisa/predatapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
					'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
					'fn_no_batch': Ext.getCmp('txtNoBatch').getValue()
				});
			}
		}
	});

	var gridPreData = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPreData,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 100},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 250},
			{text: "File", dataIndex: 'fs_dokumen_upload', menuDisabled: true, hidden: true},
			{text: "Tanggal", dataIndex: 'fd_tanggal_buat', menuDisabled: true, width: 100},
			{text: "User", dataIndex: 'fs_iduser_buat', menuDisabled: true, width: 50}
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPreData,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winPreData.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
			{
				var dokumen_name = record.get('fs_nama_dokumen');
				var dokumen_url = 'uploads/' + record.get('fs_dokumen_upload');

				var viewImage =  Ext.create('Ext.Panel', {
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
							'<div style="overflow: auto; width:888; height:465; text-align:center;">',
					        '<img src="' + dokumen_url + '" height:"100%" width:"100%"/>',
					        '</div>'
					    	],
					})
				});

				var winImage = Ext.create('Ext.window.Window', {
					title: dokumen_name,
					border: false,
					frame: false,
					autoScroll: false,
					width: 900,
					height: 500,
					collapsible: false,
					resizable: true,
					layout: 'fit',
					items: [
						viewImage
					]
				});

				winImage.show();
			}
		},
		viewConfig: {
			enableTextSelection: true
		}
	});

	var winPreData = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Preview Data Pendukung',
		items: [
			gridPreData
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPreData.load();
				vMask.show();
			}
		}
	});

	var grupInternal = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_no_apk', 'fs_pjj', 'fs_ktp_konsumen', 'fs_nama_konsumen',
			'fs_npwp_konsumen', 'fs_siup_perusahaan', 'fd_tgl_apk',
			'fs_status_blacklist'
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
			url: 'analisa/checkinternal'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
					'fn_no_apk': Ext.getCmp('txtNoApk').getValue()
				});
			}
		}
	});

	var gridInternal = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 300,
		width: 550,
		sortableColumns: false,
		store: grupInternal,
		columns: [{
			xtype: 'rownumberer',
			width: 30
		},{
			text: 'No. PJJ',
			dataIndex: 'fs_pjj',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			width: 240
		},{
			text: 'Status',
			dataIndex: 'fs_status_blacklist',
			menuDisabled: true,
			width: 200
		},{
			text: 'Nomor KTP',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			width: 100
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var winInternal = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Detail Internal Checking',
		items: [
			gridInternal
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupInternal.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				vMask.hide();
				winInternal.hide();
			}
		}]
	});

	var grupReject = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_no_apk', 'fs_pjj', 'fs_ktp_konsumen', 'fs_nama_konsumen',
			'fs_npwp_konsumen', 'fs_siup_perusahaan', 'fd_tgl_apk',
			'fs_status_reject'
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
			url: 'analisa/checkreject'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
					'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('txtJnsPembiayaan').getValue()
				});
			}
		}
	});

	var gridReject = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 300,
		width: 550,
		sortableColumns: false,
		store: grupReject,
		columns: [{
			xtype: 'rownumberer',
			width: 30
		},{
			text: 'No. PJJ',
			dataIndex: 'fs_pjj',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			width: 240
		},{
			text: 'Status',
			dataIndex: 'fs_status_reject',
			menuDisabled: true,
			width: 200
		},{
			text: 'Nomor KTP',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			width: 100
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var winReject = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Detail Reject Checking',
		items: [
			gridReject
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupReject.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				vMask.hide();
				winReject.hide();
			}
		}]
	});

	var grupFamily = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_ktp_konsumen','fs_nama_konsumen','fs_tempat_lahir_konsumen',
			'fd_tanggal_lahir_konsumen', 'fs_nama_ibu_kandung', 
			'fs_npwp_konsumen','fs_siup_perusahaan'
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
			url: 'analisa/checkfamily'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
					'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('txtJnsPembiayaan').getValue()
				});
			}
		}
	});

	var gridFamily = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 300,
		width: 550,
		sortableColumns: false,
		store: grupFamily,
		columns: [{
			xtype: 'rownumberer',
			width: 30
		},{
			text: 'No. PJJ',
			dataIndex: 'fs_pjj',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			width: 240
		},{
			text: 'Status',
			dataIndex: 'fs_status_family',
			menuDisabled: true,
			width: 200
		},{
			text: 'Nomor KTP',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			width: 100
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var winFamily = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Detail Family Checking',
		items: [
			gridFamily
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupFamily.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				vMask.hide();
				winFamily.hide();
			}
		}]
	});

	function fnGetApk()
	{
		var xnoapk = '';
		var xcek = '';
		var store = gridParsial.getStore();
		store.each(function(record, idx) {
			xcek = record.get('fb_cek');
			if (xcek == true) {
				xnoapk = xnoapk +'|'+ record.get('fn_no_apk');
			}	
		});
		return xnoapk;
	}

	var grupParsial = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fb_cek','fs_nama_konsumen',
			'fs_no','fs_nama_dokumen',
			'fd_tgl_apk', 'fs_alamat_konsumen',
			'fs_kelurahan_konsumen', 'fs_kecamatan_konsumen',
			'fs_kota_konsumen', 'fs_kodepos_konsumen'
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
			url: 'analisa/detailgrid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
					'fn_no_batch': Ext.getCmp('txtNoBatch').getValue()
				});
			}
		}
	});

	var gridParsial = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 300,
		width: 550,
		sortableColumns: false,
		store: grupParsial,
		columns: [{
			xtype: 'rownumberer',
			width: 30
		},{
			text: 'No. APK',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		},{
			align: 'center',
			text: 'Add',
			id: 'add',
			dataIndex: 'fb_cek',
			menuDisabled: true,
			locked: true,
			stopSelection: false,
			xtype: 'checkcolumn',
			width: 35
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'Nomor KTP',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			width: 100
		},{
			text: 'Alamat Konsumen',
			dataIndex: 'fs_alamat_konsumen',
			menuDisabled: true,
			width: 250
		},{
			text: 'Kelurahan',
			dataIndex: 'fs_kelurahan_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kecamatan',
			dataIndex: 'fs_kecamatan_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kota',
			dataIndex: 'fs_kota_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kode Pos',
			dataIndex: 'fs_kodepos_konsumen',
			menuDisabled: true,
			width: 70
		},{
			text: 'Telepon',
			dataIndex: 'fs_telepon_konsumen',
			menuDisabled: true,
			width: 100
		},{
			text: 'Handphone',
			dataIndex: 'fs_handphone_konsumen',
			menuDisabled: true,
			width: 100
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var winParsial = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Disetujui Parsial',
		items: [
			gridParsial
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupParsial.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				vMask.hide();
				winParsial.hide();
			}
		}]
	});

	function fnPreviewData()
	{
		winPreData.show();
		winPreData.center();
	}

	function fnShowParsial()
	{
		winParsial.show();
		winParsial.center();
	}

	function fnCheckingInternal()
	{
		winInternal.show();
		winInternal.center();
	}

	function fnCheckingReject()
	{
		winReject.show();
		winReject.center();
	}

	function fnCheckingFamily()
	{
		winFamily.show();
		winFamily.center();
	}

	// button preview pemeriksa
	var btnPrevP = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnPrevP',
		name: 'btnPrevP',
		text: 'Preview Pemeriksaan APK',
		xtype: 'button',
		height: 28,
		handler: fnCekPrint
	};

	// button preview data pendukung
	var btnPrevD = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnPrevD',
		name: 'btnPrevD',
		text: 'Preview Data Pendukung',
		xtype: 'button',
		height: 28,
		handler: fnPreviewData
	};

	// button show disetujui parsial
	var btnParsial = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnParsial',
		name: 'btnParsial',
		text: 'Disetujui Parsial',
		xtype: 'button',
		height: 28,
		handler: fnShowParsial
	};

	var btnInternal = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnInternal',
		name: 'btnInternal',
		text: 'Internal Checking',
		xtype: 'button',
		height: 26,
		handler: fnCheckingInternal
	};

	var btnReject = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnReject',
		name: 'btnReject',
		text: 'Reject Checking',
		xtype: 'button',
		height: 26,
		handler: fnCheckingReject
	};

	var btnFamily = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnFamily',
		name: 'btnFamily',
		text: 'Family Checking',
		xtype: 'button',
		height: 26,
		handler: fnCheckingFamily
	};


	/* TAB BATAL KEPUTUSAN */
	var grupBatalRetail = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fn_no_apk','fs_pjj','fs_nama_konsumen',
			'fs_score','fs_grade','fs_internal_checking',
			'fs_reject_checking','fs_family_checking','fs_jenis_pembiayaan'
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
			url: 'analisa/gridretailbatal'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var grupBatalFleet = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fn_no_apk','fs_pjj','fn_no_batch',
			'fs_nama_konsumen','fs_score','fs_grade','fs_internal_checking',
			'fs_reject_checking','fs_family_checking','fs_jenis_pembiayaan'
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
			url: 'analisa/gridfleetbatal'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var winGridRetail = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 225,
		width: 750,
		sortableColumns: false,
		store: grupBatalRetail,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Cabang", dataIndex: 'fs_kode_cabang', hidden: true, menuDisabled: true},
			{text: "No. APK", dataIndex: 'fn_no_apk', hidden: true, menuDisabled: true},
			{text: "Jenis Pembiayaan", dataIndex: 'fs_jenis_pembiayaan', hidden: true, menuDisabled: true},
			{text: "No. PJJ", dataIndex: 'fs_pjj', locked: true, menuDisabled: true, width: 120},
			{text: "Nama Konsumen", dataIndex: 'fs_nama_konsumen', locked: true, menuDisabled: true, width: 250},
			{text: "Score", dataIndex: 'fs_score', menuDisabled: true, width: 50},
			{text: "Grade", dataIndex: 'fs_grade', menuDisabled: true, width: 50},
			{text: "Internal Checking", dataIndex: 'fs_internal_checking', menuDisabled: true, width: 130},
			{text: "Reject Checking", dataIndex: 'fs_reject_checking', menuDisabled: true, width: 130},
			{text: "Family Checking", dataIndex: 'fs_family_checking', menuDisabled: true, width: 130}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
				id: 'txtCari3',
				name: 'txtCari3',
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
					grupBatalRetail.load();
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
			store: grupBatalRetail
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('txtKdCab2').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApk2').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtJnsPembiayaan2').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboPJJ').setValue(record.get('fs_pjj'));
				Ext.getCmp('txtNama2').setValue(record.get('fs_nama_konsumen'));

				// clear field
				Ext.getCmp('txtNoBatch2').setValue('');

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

	var winGridFleet = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 225,
		width: 750,
		sortableColumns: false,
		store: grupBatalFleet,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Cabang", dataIndex: 'fs_kode_cabang', hidden: true, menuDisabled: true},
			{text: "No. APK", dataIndex: 'fn_no_apk', hidden: true, menuDisabled: true},
			{text: "Jenis Pembiayaan", dataIndex: 'fs_jenis_pembiayaan', hidden: true, menuDisabled: true},
			{text: "No. Batch", dataIndex: 'fn_no_batch', locked: true, menuDisabled: true, width: 120},
			{text: "Nama Konsumen", dataIndex: 'fs_nama_konsumen', locked: true, menuDisabled: true, width: 250},
			{text: "Score", dataIndex: 'fs_score', menuDisabled: true, width: 50},
			{text: "Grade", dataIndex: 'fs_grade', menuDisabled: true, width: 50},
			{text: "Internal Checking", dataIndex: 'fs_internal_checking', menuDisabled: true, width: 130},
			{text: "Reject Checking", dataIndex: 'fs_reject_checking', menuDisabled: true, width: 130},
			{text: "Family Checking", dataIndex: 'fs_family_checking', menuDisabled: true, width: 130}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
				id: 'txtCari4',
				name: 'txtCari4',
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
					grupBatalFleet.load();
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
			store: grupBatalFleet
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('txtKdCab2').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApk2').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtNoBatch2').setValue(record.get('fn_no_batch'));
				Ext.getCmp('txtJnsPembiayaan2').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboPJJ').setValue(record.get('fn_no_batch'));
				Ext.getCmp('txtNama2').setValue(record.get('fs_nama_konsumen'));

				// clear field

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
		frame: true,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'No. PJJ',
		items: [{
			anchor: '100%',
			layout: 'vbox',
			xtype: 'container',
			items: [{
				flex: 2,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					style: 'padding: 5px;',
					title: 'Retail',
					xtype: 'fieldset',
					items: [
						winGridRetail
					]
				}]
			},{
				flex: 2,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					style: 'padding: 5px;',
					title: 'Fleet',
					xtype: 'fieldset',
					items: [
						winGridFleet
					]
				}]
			}]
		}],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupBatalRetail.load();
				grupBatalFleet.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				vMask.hide();
				winCari.hide();
			}
		}]
	});

	var grupPreData2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang',
			'fs_kode_dokumen','fs_dokumen_upload',
			'fd_tanggal_buat', 'fs_iduser_buat'
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
			url: 'analisa/predatapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCab2').getValue(),
					'fn_no_apk': Ext.getCmp('txtNoApk2').getValue(),
					'fn_no_batch': Ext.getCmp('txtNoBatch2').getValue()
				});
			}
		}
	});

	var gridPreData2 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPreData2,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 100},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 250},
			{text: "File", dataIndex: 'fs_dokumen_upload', menuDisabled: true, hidden: true},
			{text: "Tanggal", dataIndex: 'fd_tanggal_buat', menuDisabled: true, width: 100},
			{text: "User", dataIndex: 'fs_iduser_buat', menuDisabled: true, width: 50}
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPreData2,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winPreData2.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
			{
				var dokumen_name = record.get('fs_nama_dokumen');
				var dokumen_url = 'uploads/' + record.get('fs_dokumen_upload');

				var viewImage =  Ext.create('Ext.Panel', {
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
							'<div style="overflow: auto; width:888; height:465; text-align:center;">',
					        '<img src="' + dokumen_url + '" height:"100%" width:"100%"/>',
					        '</div>'
					    	],
					})
				});

				var winImage = Ext.create('Ext.window.Window', {
					title: dokumen_name,
					border: false,
					frame: false,
					autoScroll: false,
					width: 900,
					height: 500,
					collapsible: false,
					resizable: true,
					layout: 'fit',
					items: [
						viewImage
					]
				});

				winImage.show();
			}
		},
		viewConfig: {
			enableTextSelection: true
		}
	});

	var winPreData2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Preview Data Pendukung',
		items: [
			gridPreData2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPreData2.load();
				vMask.show();
			}
		}
	});

	function fnPreviewData2()
	{
		winPreData2.show();
		winPreData2.center();
	}

	var cboPJJ = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. PJJ / No. Batch',
		id: 'cboPJJ',
		name: 'cboPJJ',
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

	var txtNama2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Konsumen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama2',
		name: 'txtNama2',
		xtype: 'textfield'
	};

	// button preview pemeriksa 2
	var btnPrevP2 = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnPrevP2',
		name: 'btnPrevP2',
		text: 'Preview Pemeriksaan APK',
		xtype: 'button',
		height: 28,
		handler: fnCekPrint2
	};

	// button preview data pendukung 2
	var btnPrevD2 = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnPrevD2',
		name: 'btnPrevD2',
		text: 'Preview Data Pendukung',
		xtype: 'button',
		height: 28,
		handler: fnPreviewData2
	};

	var grupBatal = Ext.create('Ext.data.Store', {
		autoLoad: false,
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
			url: 'analisa/cb_batal'
		}
	});

	var cboBatal = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Batal Keputusan',
		id: 'cboBatal',
		name: 'cboBatal',
		store: grupBatal,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCatAlasan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 80,
		fieldLabel: 'Alasan Batal',
		emptyText: 'Alasan Batal Keputusan (semua aktifitas Batal Keputusan terdapat tembusan email)',
		id: 'txtCatAlasan',
		name: 'txtCatAlasan',
		xtype: 'textareafield',
	};

	var txtKdCab2 = {
		id: 'txtKdCab2',
		name: 'txtKdCab2',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoApk2 = {
		id: 'txtNoApk2',
		name: 'txtNoApk2',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoBatch2 = {
		id: 'txtNoBatch2',
		name: 'txtNoBatch2',
		xtype: 'textfield',
		hidden: true
	};

	var txtPJJ2 = {
		id: 'txtPJJ2',
		name: 'txtPJJ2',
		xtype: 'textfield',
		hidden: true
	};

	var txtJnsPembiayaan2 = {
		id: 'txtJnsPembiayaan2',
		name: 'txtJnsPembiayaan2',
		xtype: 'textfield',
		hidden: true
	};

	function fnCekPrint()
	{
		Ext.MessageBox.show({
			buttons: Ext.MessageBox.YESNO,
			closable: false,
			icon: Ext.Msg.QUESTION,
			msg: 'Apakah anda yakin akan mencetak?',
			title: 'SIAP',
			fn: function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.on('beforerequest', fnMaskShow);
					Ext.Ajax.on('requestcomplete', fnMaskHide);
					Ext.Ajax.on('requestexception', fnMaskHide);

					Ext.Ajax.request({
						method: 'POST',
						url: 'analisa/cekprint',
						params: {
							'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
							'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
							'fs_jenis_pembiayaan': Ext.getCmp('txtJnsPembiayaan').getValue()
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
								if (xtext.sukses === true && xtext.hasil == 'lanjut') {
									fnPrint();
								}
								else if (xtext.sukses === true && xtext.hasil == 'habis') {
									Ext.MessageBox.show({
										buttons: Ext.MessageBox.OK,
										closable: false,
										icon: Ext.MessageBox.INFO,
										msg: 'Batas Cetak Kontrak Habis!!',
										title: 'SIAP'
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
								msg: 'Printing Failed, Connection Failed!!',
								title: 'SIAP'
							});
						}
					});
				}
			}
		});
	}

	function fnPrint()
	{
		var kdcab = Ext.getCmp('txtKdCab').getValue();
		var noapk = Ext.getCmp('txtNoApk').getValue();
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'analisa/print',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
				'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
				'fs_jenis_pembiayaan': Ext.getCmp('txtJnsPembiayaan').getValue()
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

				var url = xtext.url;
				var title = xtext.title;
				if (xtext.sukses === true) {
					var popUp = Ext.create('Ext.window.Window', {
						closable: false,
	                    height: 450,
	                    modal: true, 
	                    width: 950,
	                    layout:'anchor',
	                    title: title,
	                    buttons: [{
							text: 'Close',
							handler: function() {
								vMask.hide();
								popUp.hide();
							}
						}]
                	});

                	popUp.add({html: '<iframe height="450" width="942" src="'+ url + kdcab + '/' + noapk +'"></iframe>'});
                	popUp.show();

				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Printing Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	function fnCekPrint2()
	{
		Ext.MessageBox.show({
			buttons: Ext.MessageBox.YESNO,
			closable: false,
			icon: Ext.Msg.QUESTION,
			msg: 'Apakah anda yakin akan mencetak?',
			title: 'SIAP',
			fn: function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.on('beforerequest', fnMaskShow);
					Ext.Ajax.on('requestcomplete', fnMaskHide);
					Ext.Ajax.on('requestexception', fnMaskHide);

					Ext.Ajax.request({
						method: 'POST',
						url: 'analisa/cekprint',
						params: {
							'fs_kode_cabang': Ext.getCmp('txtKdCab2').getValue(),
							'fn_no_apk': Ext.getCmp('txtNoApk2').getValue(),
							'fs_jenis_pembiayaan': Ext.getCmp('txtJnsPembiayaan2').getValue()
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
								if (xtext.sukses === true && xtext.hasil == 'lanjut') {
									fnPrint2();
								}
								else if (xtext.sukses === true && xtext.hasil == 'habis') {
									Ext.MessageBox.show({
										buttons: Ext.MessageBox.OK,
										closable: false,
										icon: Ext.MessageBox.INFO,
										msg: 'Batas Cetak Kontrak Habis!!',
										title: 'SIAP'
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
								msg: 'Printing Failed, Connection Failed!!',
								title: 'SIAP'
							});
						}
					});
				}
			}
		});
	}

	function fnPrint2()
	{
		var kdcab = Ext.getCmp('txtKdCab2').getValue();
		var noapk = Ext.getCmp('txtNoApk2').getValue();
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'analisa/print',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKdCab2').getValue(),
				'fn_no_apk': Ext.getCmp('txtNoApk2').getValue(),
				'fs_jenis_pembiayaan': Ext.getCmp('txtJnsPembiayaan2').getValue()
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

				var url = xtext.url;
				var title = xtext.title;
				if (xtext.sukses === true) {
					var popUp = Ext.create('Ext.window.Window', {
						closable: false,
	                    height: 450,
	                    modal: true, 
	                    width: 950,
	                    layout:'anchor',
	                    title: title,
	                    buttons: [{
							text: 'Close',
							handler: function() {
								vMask.hide();
								popUp.hide();
							}
						}]
                	});

                	popUp.add({html: '<iframe height="450" width="942" src="'+ url + kdcab + '/' + noapk +'"></iframe>'});
                	popUp.show();

				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Printing Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	function fnCekSave()
	{
		if (this.up('form').getForm().isValid()) {

			var xnoapk = Ext.getCmp('txtNoApk').getValue();
			var xnobatch = Ext.getCmp('txtNoBatch').getValue();
			var xkeputusan = Ext.getCmp('cboKeputusan').getValue();

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'analisa/ceksave',
				params: {
					'fn_no_apk': xnoapk,
					'fn_no_batch': xnobatch,
					'fs_keputusan_kredit': xkeputusan
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
						if (xtext.sukses === true && xtext.hasil == 'lanjut') {
							fnSave();
						}
						else {
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

	function fnSave()
	{
		var xnoapk = '';
		var xcek = '';
		var store = gridParsial.getStore();
		store.each(function(record, idx) {
			xcek = record.get('fb_cek');
			if (xcek == true) {
				xnoapk = xnoapk +'|'+ record.get('fn_no_apk');
			}	
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		Ext.Ajax.request({
			method: 'POST',
			url: 'analisa/save',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKdCab').getValue(),
				'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
				'fn_no_batch': Ext.getCmp('txtNoBatch').getValue(),
				'arr_no_apk': xnoapk,
				'fs_keputusan_kredit': Ext.getCmp('cboKeputusan').getValue(),
				'fs_catatan_analisa': Ext.getCmp('txtCatAnalisa').getValue(),
				'fs_pjj': Ext.getCmp('txtPJJ').getValue(),
				'fs_status_blacklist': Ext.getCmp('cboInternalChecking').getValue(),
				'fs_status_reject': Ext.getCmp('cboRejectChecking').getValue(),
				'fs_status_family': Ext.getCmp('cboFamilyChecking').getValue(),
				'fs_grade': Ext.getCmp('cboPJJGrade').getValue(),
				'fs_score': Ext.getCmp('cboPJJScore').getValue(),
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
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab1');
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

	function fnReset(){
		Ext.getCmp('txtKdCab').setValue('');
		Ext.getCmp('txtNoApk').setValue('');
		Ext.getCmp('txtNoBatch').setValue('');
		Ext.getCmp('txtJnsPembiayaan').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('cboInternalChecking').setValue('');
		Ext.getCmp('cboRejectChecking').setValue('');
		Ext.getCmp('cboFamilyChecking').setValue('');
		Ext.getCmp('cboPJJGrade').setValue('');
		Ext.getCmp('cboPJJScore').setValue('');
		Ext.getCmp('cboKeputusan').setValue('');
		Ext.getCmp('txtCatAnalisa').setValue('');
		Ext.getCmp('btnSave').setDisabled(false);
		grupRetail.load();
		grupFleet.load();
	}

	/* FUNCTION BATAL GROUP */
	function fnCekSave2()
	{
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			Ext.Ajax.request({
				method: 'POST',
				url: 'analisa/ceksavebatal',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoApk2').getValue(),
					'fn_no_batch': Ext.getCmp('txtNoBatch2').getValue(),
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
						if (xtext.sukses === true && xtext.hasil == 'lanjut') {
							fnSave2();
						}
						else {
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

	function fnSave2()
	{
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		Ext.Ajax.request({
			method: 'POST',
			url: 'analisa/savebatal',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKdCab2').getValue(),
				'fn_no_apk': Ext.getCmp('txtNoApk2').getValue(),
				'fn_no_batch': Ext.getCmp('txtNoBatch2').getValue(),
				'fs_catatan_batal_keputusan': Ext.getCmp('txtCatAlasan').getValue()
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
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab1');
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

	function fnReset2()
	{
		Ext.getCmp('txtKdCab2').setValue('');
		Ext.getCmp('txtNoApk2').setValue('');
		Ext.getCmp('txtNoBatch2').setValue('');
		Ext.getCmp('txtJnsPembiayaan2').setValue('');
		Ext.getCmp('cboPJJ').setValue('');
		Ext.getCmp('txtNama2').setValue('');
		Ext.getCmp('cboBatal').setValue('');
		Ext.getCmp('txtCatAlasan').setValue('');
		Ext.getCmp('btnSave1').setDisabled(false);
		grupRetail.load();
		grupFleet.load();
	}

	var frmAnalisa = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Analisa dan Keputusan Kredit',
		width: 930,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Kebutuhan Analisa Kredit',
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
					title: 'Retail',
					xtype: 'fieldset',
					items: [
						gridRetail
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Fleet ',
					xtype: 'fieldset',
					items: [
						gridFleet
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Analisa Kredit',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					title: 'Analisa Kredit',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtKdCab,
									txtNoApk,
									txtNoBatch,
									txtPJJ,
									txtJnsPembiayaan,
									txtNama
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnPrevP
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnPrevD
								]
							}]
						}]
					}]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'Checking',
					xtype: 'fieldset',
					items: [{
						anchor: '80%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 4,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									cboInternalChecking,
									cboRejectChecking,
									cboFamilyChecking,
									cboPJJGrade,
									cboPJJScore
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnInternal,
									btnReject,
									btnFamily
								]
							}]
						}]
					}]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					title: 'Keputusan Kredit',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									cboKeputusan
								]
							}]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnParsial
								]
							}]
						}]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtCatAnalisa
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSave',
					name: 'btnSave',
					text: 'Save',
					handler: fnCekSave
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Batal Keputusan',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Batal Keputusan',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									cboPJJ,
									txtNama2,
									txtKdCab2,
									txtNoApk2,
									txtNoBatch2,
									txtJnsPembiayaan2
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnPrevP2
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									btnPrevD2
								]
							}]
						}]
					}]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					title: 'Keputusan Kredit',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									cboBatal,
									txtCatAlasan
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSave1',
					name: 'btnSave1',
					text: 'Save',
					handler: fnCekSave2
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset2
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmAnalisa
	});

	function fnMaskShow() {
		frmAnalisa.mask('Please wait...');
	}

	function fnMaskHide() {
		frmAnalisa.unmask();
	}

	frmAnalisa.render(Ext.getBody());
	Ext.get('loading').destroy();

});