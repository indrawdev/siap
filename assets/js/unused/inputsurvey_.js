Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.LiveSearchGridPanel',
	'Ext.ux.ProgressBarPager',
	'Ext.view.View'
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

	function gridTooltipApk(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Single click on the customer item in the list to display register',
			target: view.el,
			trackMouse: true
		});
	}

	var cellEditingTemp = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	Ext.define('DataGridTemp', {
		extend: 'Ext.data.Model',
		fields: [
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

	var grupGridTemp = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridTemp',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'inputsurvey/gridtemp'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_flag_survey': '0'
				});
			}
		}
	});

	var gridTemp = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 180,
		sortableColumns: false,
		store: grupGridTemp,
		columns: [{
			xtype: 'rownumberer'
		},{
			text: 'No. PJJ', 
			dataIndex: 'fs_pjj', 
			menuDisabled: true,
			width: 140	
		},{
			text: 'Nama Konsumen', 
			dataIndex: 'fs_nama_konsumen',
			locked: true,
			menuDisabled: true, 
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
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridTemp.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingTemp
		],
		tbar: [{
			xtype: 'displayfield'
		},{
			xtype: 'tbfill'
		},{
			xtype: 'buttongroup',
			columns: 2,
			defaults: {
				scale: 'small'
			},
			items: [{
					iconCls: 'icon-add',
					itemId: 'addData',
					text: 'Add Konsumen',
					handler: function() {
						winCari3.show();
						winCari3.center();
					}
				},{
					iconCls: 'icon-delete',
					itemId: 'removeData',
					text: 'Delete',
					handler: function() {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn){
								if (btn == "yes"){
									var sm = gridTemp.getSelectionModel();
									var row = gridTemp.getSelectionModel().getSelection()[0];
									var gtm = grupGridTemp.remove(sm.getSelection()[0]);
									cellEditingTemp.cancelEdit();
									var apkfile = row.get('fn_no_apk');

									if (grupGridTemp.getCount() > 0) {
										sm.select(0);
									}

									Ext.Ajax.request({
										url : 'inputsurvey/removeAll/',
										params : {
											'apk_file' : apkfile
										}
									});		
								}
							}
						});
					},
					disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipApk
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var cellEditingApk = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	Ext.define('DataGridApk', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek', type: 'bool'},
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

	var grupGridApk = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridApk',
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
			url: 'inputsurvey/gridkonsumen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue(),
					'fs_flag_survey': '0'
				});
			}
		}
	});

	var gridApk = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupGridApk,
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
			listeners: {
				checkchange: function(grid, rowIndex, checked) {
					var store = gridApk.getStore();
					var record = store.getAt(rowIndex);
					
					var xcek = record.get('fb_cek');
					var xnoapk = record.get('fn_no_apk').trim();
					var xpjj = record.get('fs_pjj').trim();
					var xktp = record.get('fs_ktp_konsumen').trim();
					var xnamakons = record.get('fs_nama_konsumen').trim();
					var xalamatkons = record.get('fs_alamat_konsumen').trim();
					var xkelukons = record.get('fs_kelurahan_konsumen').trim();
					var xkeckons = record.get('fs_kecamatan_konsumen').trim();
					var xkotakons = record.get('fs_kota_konsumen').trim();
					var xkpos = record.get('fs_kodepos_konsumen').trim();
					var xtelkons = record.get('fs_telepon_konsumen').trim();
					var xhankons = record.get('fs_handphone_konsumen').trim();

					if (xcek === true) {
						store = gridTemp.getStore();
						var xlanjut = true;
						store.each(function(record, idx) {
							var xxnamakons = record.get('fs_nama_konsumen').trim();
							var xxktp = record.get('fs_ktp_konsumen').trim();
							if (xktp == xxktp) {
								Ext.MessageBox.show({
									buttons: Ext.MessageBox.OK,
									closable: false,
									icon: Ext.Msg.WARNING,
									msg: 'Record already exists, add record cancel!!',
									title: 'SIAP'
								});
								xlanjut = false;
							}
						});

						if (xlanjut === false) {
							return;
						}

						var xtotal = grupGridTemp.getCount();

						var xdata = Ext.create('DataGridApk', {
							fn_no_apk: xnoapk.trim(),
							fs_pjj: xpjj.trim(),
							fs_nama_konsumen: xnamakons.trim(),
							fs_alamat_konsumen: xalamatkons.trim(),
							fs_ktp_konsumen: xktp.trim(),
							fs_kelurahan_konsumen: xkelukons.trim(),
							fs_kecamatan_konsumen: xkeckons.trim(),
							fs_kota_konsumen: xkotakons.trim(),
							fs_kodepos_konsumen: xkpos.trim(),
							fs_telepon_konsumen: xtelkons.trim(),
							fs_handphone_konsumen: xhankons.trim()
						});
						grupGridTemp.insert(xtotal, xdata);
						xtotal = grupGridTemp.getCount() - 1;
						if (xtotal >= 0) {
							gridTemp.getSelectionModel().select(xtotal);
						}
					}
					
				}
			}

		},{
			text: 'No. PJJ', 
			dataIndex: 'fs_pjj', 
			menuDisabled: true,
			width: 140	
		},{
			text: 'Nama Konsumen', 
			dataIndex: 'fs_nama_konsumen', 
			menuDisabled: true, 
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
		}],
		plugins: [
			cellEditingApk
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'No. PJJ / Nama Konsumen',
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
					grupGridApk.load();
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
			store: grupGridApk,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipApk
			},
			markDirty: false,
			stripeRows: true
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
		title: 'Searching...',
		items: [
			gridApk
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupGridApk.load();
				vMask.show();
			}
		},
	});
	
	var tglSurvey = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Survey',
		format: 'Y-m-d',
		id: 'tglSurvey',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'tglSurvey',
		value: new Date(),
		xtype: 'datefield'
	};

	var grupSurveyor = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_surveyor','fs_nama_surveyor',
			'fs_alamat_surveyor','fs_ktp_surveyor'
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
			url: 'inputsurvey/gridsurveyor'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_surveyor': Ext.getCmp('cboSurveyor').getValue(),
					'fs_cari': Ext.getCmp('txtCari1').getValue()
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
		store: grupSurveyor,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Surveyor", dataIndex: 'fs_kode_surveyor', menuDisabled: true, width: 100},
			{text: "Nama Surveyor", dataIndex: 'fs_nama_surveyor', menuDisabled: true, width: 350},
			{text: "KTP Surveyor", dataIndex: 'fs_ktp_surveyor', menuDisabled: true, hidden: true},
			{text: "Kode Surveyor Lama", dataIndex: 'fs_kode_surveyor_lama', menuDisabled: true, hidden: true},
			{text: "Kode Cabang", dataIndex: 'fs_kode_cabang', menuDisabled: true, hidden: true},
			{text: "Status", dataIndex: 'fs_aktif', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Surveyor',
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
					grupSurveyor.load();
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
			store: grupSurveyor,
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
				Ext.getCmp('cboSurveyor').setValue(record.get('fs_nama_surveyor'));

				grupSurveyor.load();
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
				grupSurveyor.load();
				vMask.show();
			}
		}
	});
	
	var cboSurveyor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Petugas Survey',
		editable: true,
		id: 'cboSurveyor',
		name: 'cboSurveyor',
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

	var grupApkPendukung = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_no_apk','fs_kode_cabang',
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
			url: 'inputsurvey/apkpendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'no_apk': fnGetApkNo()
				});
			}
		}
	});

	var winData = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 650,
		sortableColumns: false,
		store: grupApkPendukung,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 100},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 260},
			{text: "File", dataIndex: 'fs_dokumen_upload', menuDisabled: true, hidden: true},
			{text: "Tanggal", dataIndex: 'fd_tanggal_buat', menuDisabled: true, width: 100},
			{text: "User", dataIndex: 'fs_iduser_buat', menuDisabled: true, width: 80},
			{
				xtype:'actioncolumn',
			    width:20,
			    items: [{
			        iconCls: 'icon-delete',
			        tooltip: 'Delete',
			        handler: function(grid, rowIndex, colIndex, e) {
			            var str = grid.getStore().getAt(rowIndex).get('fs_dokumen_upload');
			            if (str) {
			            	Ext.MessageBox.show({
			            		title:'Delete file',
			            		msg: 'Would you like to delete?',
			            		buttons: Ext.Msg.YESNO,
			            		icon: Ext.Msg.QUESTION,
			            		fn: function(btn){                    
							        if (btn == "yes"){
						            	Ext.Ajax.request({
											url : 'inputsurvey/remove/',
											params : {
												'fs_dokumen_upload' : str
											}
										});
										grupApkPendukung.load();  
							        }
							        if (btn == "no"){
							        	grupApkPendukung.load(); 
							        }
   								}                
			            	});
			            }
			        },
			        scope: this
			    }]
			}
		],
		tbar: [{
			anchor: '95%',
			layout: 'hbox',
			xtype: 'form',
			enctype : 'multipart/form-data', 
			method: 'POST',
			fileUpload: true,
			items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					width: 120,
					afterLabelTextTpl: required,
					allowBlank: false,
					emptyText: 'Kode Dokumen',
					id: 'cboKodeDoc',
					name: 'cboKodeDoc',
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
				},{
					id: 'txtNoApk',
					name: 'txtNoApk',
					xtype: 'textfield',
					hidden: true
				},{
					id: 'txtNoPjj',
					name: 'txtNoPjj',
					xtype: 'textfield',
					hidden: true
				}]
			},{
				flex: 2,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					width: 390,
					afterLabelTextTpl: required,
					allowBlank: false,
					emptyText: 'Pilih File',
					id: 'fileDoc',
					name: 'fileDoc',
					xtype: 'fileuploadfield',
					buttonCfg: {
		                text: 'Browse',
		                iconCls: 'upload-icon'
		            }
				}]
			},{
				flex: 3,
				layout: 'anchor',
				anchor: '100%',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					xtype: 'buttongroup',
					defaults: {
						scale: 'small'
					},
					items: [{
						iconCls: 'icon-add',
						itemId: 'addData',
						text: 'Add',
						handler: function () {
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                    form.submit({
			                        url: 'inputsurvey/uploadfile',
			                        waitMsg: 'Uploading your file...',
			                        success: function (form, action) {
			                        	var result = action.result; 
			                        	var data = result.data;
			                        	var name = data.name;
			                        	var message = Ext.String.format('<b>Message:</b> {0}<br>' +'<b>FileName:</b> {1}', result.msg, name);
                            			Ext.Msg.alert('Success', message);
                            			grupApkPendukung.load();
                        			},
                        			failure: function (form, action) {
                            			Ext.Msg.alert('Failure', action.result.msg);
                        			}
			                    });
			                }
            			}
					}]
				}]
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupApkPendukung,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winPopup.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
			{
				var dokumen_name = record.get('fs_nama_dokumen');
				var dokumen_url = 'uploads/' + record.get('fs_dokumen_upload');

				var viewImage =  Ext.create('Ext.Panel', {
					frame: true,
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
					        '<img src="' + dokumen_url + '">'
					    	],
					})
				});

				var winImage = Ext.create('Ext.window.Window', {
					title: dokumen_name,
					autoScroll: true,
					overflowY: 'scroll',
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

	var winPopup = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Tambah Data Pendukung',
		items: [
			winData
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				Ext.getCmp('txtNoApk').setValue(fnGetApk());
				Ext.getCmp('txtNoPjj').setValue(fnGetPjj());

				grupApkPendukung.load();
				vMask.show();
			}
		}
	});
	
	var grupDataPendukung = Ext.create('Ext.data.Store', {
		autoLoad: false,
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
			url: 'inputsurvey/datapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari3').getValue()
				});
			}
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDataPendukung,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 100},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 400},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dokumen',
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
					grupDataPendukung.load();
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
			store: grupDataPendukung,
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
				Ext.getCmp('cboKodeDoc').setValue(record.get('fs_kode_dokumen'));

				grupDataPendukung.load();
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
				grupDataPendukung.load();
				vMask.show();
			}
		}
	});
	
	function fnPopup()
	{
		winPopup.show();
		winPopup.center();
	}

	var btnDataPendukung = {
		anchor: '100%',
		scale: 'medium',
		text: 'Data Pendukung',
		xtype: 'button',
		handler: fnPopup
	};

	var txtLama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false,
		anchor: '100%',
		fieldLabel: 'Lama Survey',
		id: 'txtLama',
		name: 'txtLama',
		xtype: 'numberfield',
		maxValue: 99,
		minValue: 0,
		maxLength: 2,
		enforceMaxLength: true
	};

	var txtJumlah = {
		afterLabelTextTpl: required,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false,
		anchor: '100%',
		fieldLabel: 'Jumlah Kendaraan Dimiliki',
		id: 'txtJumlah',
		name: 'txtJumlah',
		xtype: 'numberfield',
		maxValue: 9999,
		minValue: 0,
		maxLength: 4,
		enforceMaxLength: true
	};

	var grupLingkungan = Ext.create('Ext.data.Store', {
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
			url: 'inputsurvey/cb_lingkungan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'kondisi_lingkungan_setempat'
				});
			}
		}
	});

	var cboLingkungan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Lingkungan Setempat',
		id: 'cboLingkungan',
		name: 'cboLingkungan',
		store: grupLingkungan,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var grupGarasi = Ext.create('Ext.data.Store', {
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
			url: 'inputsurvey/cb_garasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var cboGarasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Rumah Memiliki Garasi',
		id: 'cboGarasi',
		name: 'cboGarasi',
		store: grupGarasi,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var grupKantor = Ext.create('Ext.data.Store', {
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
			url: 'inputsurvey/cb_kantor'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': 'kondisi_kantor'
				});
			}
		}
	});

	var cboKantor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Kondisi Kantor',
		id: 'cboKantor',
		name: 'cboKantor',
		store: grupKantor,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCatTinggal = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 185,
		xtype: 'textareafield',
		id: 'txtCatTinggal',
		name: 'txtCatTinggal',
		maxLength: 255,
		enforceMaxLength: true
	};

	var txtCatLingkungan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 185,
		xtype: 'textareafield',
		id: 'txtCatLingkungan',
		name: 'txtCatLingkungan',
		maxLength: 255,
		enforceMaxLength: true
	};

	var txtCatTempat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 185,
		xtype: 'textareafield',
		id: 'txtCatTempat',
		name: 'txtCatTempat',
		maxLength: 255,
		enforceMaxLength: true
	};

	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_alamat_konsumen', type: 'string'},
			{name: 'fd_tanggal_survey', type: 'string'},
			{name: 'fs_petugas_survey', type: 'string'},
			{name: 'fn_lama_survey', type: 'string'},
			{name: 'fs_kondisi_lingkungan', type: 'string'}
		]
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
			url: 'inputsurvey/griddetil'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_flag_survey': '1',
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});
	
	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 500,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [
		{
			width: 45,
			xtype: 'rownumberer'
		},{
			text: 'Nama Konsumen', 
			dataIndex: 'fs_nama_konsumen',
			locked: true, 
			menuDisabled: true, 
			width: 150
		},{
			text: 'Petugas Survey',
			dataIndex: 'fs_petugas_survey',
			menuDisabled: true,
			width: 150
		},{
			text: 'Lama Survey',
			dataIndex: 'fn_lama_survey',
			menuDisabled: true,
			width: 100
		},{
			text: 'Lingkungan',
			dataIndex: 'fs_kondisi_lingkungan',
			menuDisabled: true,
			width: 150
		},{
			text: 'Jumlah Kendaraan',
			dataIndex: 'fn_jumlah_kendaraan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Rumah Bergarasi',
			dataIndex: 'fs_garasi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kondisi Kantor',
			dataIndex: 'fs_kondisi_kantor',
			menuDisabled: true,
			width: 100
		},{
			text: 'Catatan Tempat Tinggal',
			dataIndex: 'fs_catatan_tempat_tinggal',
			menuDisabled: true,
			hidden: true,
			width: 100
		},{
			text: 'Catatan Lingkungan',
			dataIndex: 'fs_catatan_lingkungan',
			hidden: true,
			menuDisabled: true,
			width: 100
		},{
			text: 'Catatan Tempat Usaha',
			dataIndex: 'fs_catatan_tempat_usaha',
			hidden: true,
			menuDisabled: true,
			width: 100
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'No. PJJ / Nama Konsumen',
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
					grupGridDetil.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {

				var xnamakonsumen = record.get('fs_nama_konsumen');

				Ext.define('Survey', {
    				extend: 'Ext.data.Model',
    				fields: ['label', 'hasil']
				});

				var viewDetail = Ext.create('Ext.grid.Panel', {
					anchor: '100%',
					sortableColumns: false,
					store: {
					   	model: 'Survey',
					    data: [
					        {label: 'Nama Konsumen', hasil: record.get('fs_nama_konsumen')},
					        {label: 'Petugas Survey', hasil: record.get('fs_petugas_survey')},
					        {label: 'Lama Survey', hasil: record.get('fn_lama_survey')},
					        {label: 'Lingkungan', hasil: record.get('fs_kondisi_lingkungan')},
					        {label: 'Jumlah Kendaraan', hasil: record.get('fn_jumlah_kendaraan')},
					        {label: 'Rumah Bergarasi', hasil: record.get('fs_garasi')},
					        {label: 'Kondisi Kantor', hasil: record.get('fs_kondisi_kantor')},
					        {label: 'Catatan Tempat Tinggal', hasil: record.get('fs_catatan_tempat_tinggal')},
					        {label: 'Catatan Lingkungan', hasil: record.get('fs_catatan_lingkungan')},
					        {label: 'Catatan Tempat Usaha', hasil: record.get('fs_catatan_tempat_usaha')}
					    ]},
					columns: [{
					    dataIndex: 'label',
					    text: 'Label',
					    locked: true,
					    width: 160
					}, {
					    dataIndex: 'hasil',
					    text: 'Hasil',
					    width: 380,
					    flex: 1
					}],
					viewConfig: {
						getRowClass: function() {
							return 'rowwrap';
						},
						markDirty: false
					}
				});

			    var winDetail = Ext.create('Ext.window.Window', {
			        title: xnamakonsumen,
			        width: 550,
			        height: 400,
			        plain: true,
			        autoScroll: true,
			        collapsible: false,
			        draggable: false,
    				resizable: false,
			        headerPosition: 'top',
			        layout: 'fit',
			        items: [
			        	viewDetail
			        ]
			    });

			    winDetail.show();
			    winDetail.center();
			}
		},
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

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			var xtotal = grupGridTemp.getCount();
			if (xtotal <= 0) {
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Survey List is empty, please fill in advance!!',
					title: 'SIAP'
				});
				return;
			}
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'inputsurvey/ceksave',
				params: {
					'fs_survey': '1'
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

	function fnGetApk()
	{
		var xnoapk = '';
		var store = gridTemp.getStore();
		var count = store.getCount;
			store.each(function(record, idx) {
				xnoapk = xnoapk +'|'+ record.get('fn_no_apk');
			});
		return xnoapk;
	}

	function fnGetPjj()
	{
		var xnopjj = '';
		var store = gridTemp.getStore();
		var count = store.getCount;
			store.each(function(record, idx) {
				xnopjj = xnopjj +'|'+ record.get('fs_pjj');
			});
		return xnopjj;
	}

	function fnGetApkNo()
	{
		var xxnoapk = '';
		var store = gridTemp.getStore();
		var count = store.getCount;
			store.each(function(record, idx) {
				xxnoapk = record.get('fn_no_apk') + ',' + xxnoapk;
			});
		return xxnoapk;
	}
	
	function fnGetFile()
	{
		var xfile = '';
		var store = winData.getStore();
		var count = store.getCount;
		store.each(function(record, idx){
			xfile = xfile +'|'+ record.get('fs_dokumen_upload');
		});
		return xfile;
	}


	function fnSave() {

		var xnopjj = '';
		var xnoapk = '';
		var xnamakons = '';
		var xalamatkons = '';
		var xkelukons = '';
		var xkeckons = '';
		var xkotakons = '';
		var xktp = '';

		var store = gridTemp.getStore();
		store.each(function(record, idx) {
			xnopjj = xnopjj +'|'+ record.get('fs_pjj');
			xnoapk = xnoapk +'|'+ record.get('fn_no_apk');
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'inputsurvey/save',
			params: {
				'fs_pjj': xnopjj,
				'fn_no_apk': xnoapk,
				'fd_tanggal_survey': Ext.getCmp('tglSurvey').getValue(),
				'fs_petugas_survey': Ext.getCmp('cboSurveyor').getValue(),
				'fn_lama_survey': Ext.getCmp('txtLama').getValue(),
				'fs_kondisi_lingkungan': Ext.getCmp('cboLingkungan').getValue(),
				'fn_jumlah_kendaraan': Ext.getCmp('txtJumlah').getValue(),
				'fs_garasi': Ext.getCmp('cboGarasi').getValue(),
				'fs_kondisi_kantor': Ext.getCmp('cboKantor').getValue(),
				'fs_catatan_tempat_tinggal': Ext.getCmp('txtCatTinggal').getValue(),
				'fs_catatan_lingkungan': Ext.getCmp('txtCatLingkungan').getValue(),
				'fs_catatan_tempat_usaha': Ext.getCmp('txtCatTempat').getValue(),
				'fs_flag_survey': '1'
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

	function fnReset() {
		Ext.getCmp('tglSurvey').setValue('');
		Ext.getCmp('cboSurveyor').setValue('');
		Ext.getCmp('txtLama').setValue('');
		Ext.getCmp('cboLingkungan').setValue('');
		Ext.getCmp('txtJumlah').setValue('');
		Ext.getCmp('cboLingkungan').setValue('');
		Ext.getCmp('cboGarasi').setValue('');
		Ext.getCmp('cboKantor').setValue('');
		Ext.getCmp('txtCatTinggal').setValue('');
		Ext.getCmp('txtCatLingkungan').setValue('');
		Ext.getCmp('txtCatTempat').setValue('');
		Ext.getCmp('cboKodeDoc').setValue('');
		Ext.getCmp('txtNoApk').setValue('');
		Ext.getCmp('txtNoPjj').setValue('');
		Ext.getCmp('btnSave').setDisabled(false);
		grupGridTemp.removeAll();
		grupApkPendukung.removeAll();
		gridTemp.getView().refresh();
		winData.getView().refresh();
		grupGridApk.load();
		grupGridDetil.load();
	}

	var frmInputSurvey = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Input Hasil Survey',
		width: 930,
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
				title: 'Input Hasil Survey',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'Daftar Survey Aplikasi Pembiayaan Konsumen',
					xtype: 'fieldset',
					items: [
						gridTemp
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [{
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
								title: 'Data Survey',
								xtype: 'fieldset',
								items: [
									tglSurvey,
									cboSurveyor,
									txtLama,
									cboLingkungan,
									txtJumlah,
									cboGarasi,
									cboKantor,
									btnDataPendukung
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								title: 'Catatan Tempat Tinggal',
								xtype: 'fieldset',
								items: [
									txtCatTinggal
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								title: 'Catatan Kondisi Lingkungan',
								xtype: 'fieldset',
								items: [
									txtCatLingkungan
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							style: 'padding: 5px;',
							items: [{
								style: 'padding: 5px;',
								title: 'Catatan Tempat Kerja / Usaha',
								xtype: 'fieldset',
								items: [
									txtCatTempat
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
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Hasil Survey',
				xtype: 'form',
				items: [
					gridDetil
				]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmInputSurvey
	});

	function fnMaskShow() {
		frmInputSurvey.mask('Please wait...');
	}

	function fnMaskHide() {
		frmInputSurvey.unmask();
	}

	frmInputSurvey.render(Ext.getBody());
	Ext.get('loading').destroy();
});