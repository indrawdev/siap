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

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var xDept = '';
	var xCount = '';
	var xTrx = '';
	var xsTrx = '';
	var xRefno = '';

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on record to choose',
			target: view.el,
			trackMouse: true
		});
	}

	var cellEditingProd = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});



	function gridTooltipProd(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on the Qty to edit',
			target: view.el,
			trackMouse: true
		});
	}

	function buatForm() {
		Ext.define('DataGrid', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'fs_no_apk', type: 'string'},
				{name: 'fs_no_pjj', type: 'string'},
				{name: 'fs_tgl_apk', type: 'string'}
			]
		});


		var grupGrid = Ext.create('Ext.data.Store', {
			autoLoad: true,
			model: 'DataGrid',
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
				url: 'apknew/grid_apk'
			},
			listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
		});

		var txtNoAPK2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Email Cabang',
		id: 'txtNoAPK2',
		maxLength: 30,
		hidden:true,
		name: 'txtNoAPK',
		xtype: 'textfield'
		};

		var txtKodeCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Email Cabang',
		id: 'txtKodeCabang',
		maxLength: 30,
		hidden:true,
		name: 'txtKodeCabang',
		xtype: 'textfield'
		};

		var winCariAPK = Ext.create('Ext.window.Window', {
			border: false,
			closable: false,
			draggable: true,
			frame: false,
			layout: 'fit',
			plain: true,
			resizable: false,
			title: 'Searching...',
			items: [
				gridHeader
			],
			listeners: {
				beforehide: function() {
					vMask.hide();
				},
				beforeshow: function() {
					grupGrid.load();
					vMask.show();
				}
			}
		});

		var gridHeader = Ext.create('Ext.grid.Panel', {
			height: 417,
			autoDestroy: true,
			sortableColumns: false,
			store: grupGrid,
			columns: [{
				xtype: 'rownumberer',
				width: 65,text: "No"
			},
			{
				dataIndex: 'fs_nama_konsumen',
				text: "Nama Konsumen",
				width: 150
			},
			{
				dataIndex: 'fs_tgl_apk',
				text: "Tgl Apk",
				width: 150
			},{
				dataIndex: 'fs_no_apk',
				menuDisabled: true,
				text: "No APK"
			},
			{
				dataIndex: 'fs_no_pjj',
				menuDisabled: true,
				text: "No PJJ",
				width: 250
			}],
			tbar: [{
					flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '98%',
						emptyText: 'No APK / No PJJ',
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
							grupGrid.load();
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
				store: grupGrid,
				items:[
					'-', {
					text: 'Keluar',
					handler: function() {
						Ext.getCmp('txtCari1').setValue('');
						winCariAPK.hide();
					}
				}]
			}),
			listeners: {
				itemclick: function(dv, record, item, index, e) {
				Ext.getCmp('txtNoAPK2').setValue(record.get('fs_no_apk'));

				
				},
				itemdblclick: function(grid, record)
				{	

					//vMask.show();
					fnDuplikasi(); 	
					
					                                     
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

		Ext.define('DataGrid2', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'fs_kd_acc', type: 'string'},
				{name: 'fs_nm_acc', type: 'string'},
				{name: 'fs_note', type: 'string'},
				{name: 'fn_debet', type: 'float'},
				{name: 'fn_credit', type: 'float'}
			]
		});

	
/*
		var gridDetail = Ext.create('Ext.grid.Panel', {
			height: 140,
			sortableColumns: false,
			store: grupGrid2,
			columns: [{
				xtype: 'rownumberer',
				width: 25,
			},{
				dataIndex: 'fs_kd_acc',
				menuDisabled: true,
				text: "Acc No",
				width: 100
			},{
				dataIndex: 'fs_nm_acc',
				menuDisabled: true,
				text: "Acc Name",
				width: 225
			},{
				dataIndex: 'fs_note',
				menuDisabled: true,
				text: "Note",
				width: 330
			},{
				align: 'right',
				dataIndex: 'fn_debet',
				format: '0,000.00',
				menuDisabled: true,
				text: "Debit",
				width: 120,
				xtype: 'numbercolumn'
			},{
				align: 'right',
				dataIndex: 'fn_credit',
				format: '0,000.00',
				menuDisabled: true,
				text: "Credit",
				width: 120,
				xtype: 'numbercolumn'
			}],
			viewConfig: {
				getRowClass: function() {
					return 'rowwrap';
				},
				markDirty: false,
				stripeRows: true
			}
		});*/

		function fnShow() {
						Ext.Msg.show({
				title: 'Pemasukan Data APK',
				msg: 'Pilih Pemasukan Data Baru<br/><br/>' +
					'<input type="radio" id="mb-option-ovr" name="mb-options" value="ovr" />' +
					'<label for="mb-option-ovr">' +
					'<b>Konsumen</b>' +
					'</label><br/><br/>' +
					'<input type="radio" id="mb-option-add" name="mb-options" value="add" />' +
					'<label for="mb-option-add">' +
					'<b>Badan Usaha</b>' +
					'</label>',
				buttons: Ext.Msg.OKCANCEL,
				fn: function(btn) {
					if (btn == 'ok') {
						var body = Ext.Msg.body;
						var ovr = body.select('input[id=mb-option-ovr]').elements;
						var add = body.select('input[id=mb-option-add]').elements;
						if (ovr.length > 0 && ovr[0].checked) {
							//override action/s here
							window.location.href = 'konsumen';
						}
						else if (add.length > 0 && add[0].checked) {
							//additional action/s here
							window.location.href = 'badan_usaha';
						}
						else {
							//fallback code here
							return;
						}
					}
				}
			});
		}

		function fnExportToExcel() {
			fnPB();
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				timeout: 180000,
				url: 'accgl/excel_header',
				params: {
					'fs_kd_dept': Ext.getCmp('txtDept').getValue(),
					'fs_count': Ext.getCmp('txtCount').getValue(),
					'fs_kd_acnoa': Ext.getCmp('cboAcnoA').getValue(),
					'fs_kd_acnob': Ext.getCmp('cboAcnoB').getValue(),
					'fs_nm_acnoa': Ext.getCmp('txtAcnoA').getValue(),
					'fs_nm_acnob': Ext.getCmp('txtAcnoB').getValue(),
					'fd_tgla': Ext.Date.format(Ext.getCmp('txtDateA').getValue(), 'Ymd'),
					'fd_tglb': Ext.Date.format(Ext.getCmp('txtDateB').getValue(), 'Ymd')
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					
					vMask.show();
					if (xtext.sukses === true) {
						var xfile = xtext.nmfile.trim();
						
						var winxls = Ext.create('Ext.window.Window', {
							closable: false,
							draggable: false,
							height: 100,
							title: 'Download Excel Files',
							width: 180,
							defaults: {
								margin: 5
							},
							items: [{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '95%',
										href: xfile,
										hrefTarget: '_blank',
										iconCls: 'icon-save',
										text: 'Download',
										xtype: 'button'
									}]
								},{
									flex: 0.8,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '100%',
										iconCls: 'icon-exit',
										text: 'Exit',
										xtype: 'button',
										handler: function() {
											vMask.hide();
											winxls.hide();
										}
									}]
								}]
							}]
						}).show();
					}
					else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'IDS'
						});
						vMask.hide();
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Export Failed, Connection Failed!!',
						title: 'IDS'
					});
					fnMaskHide();
				}
			});
		}

		function fnExportToExcel2() {
			fnPB();
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				timeout: 180000,
				url: 'accgl/excel_detail',
				params: {
					'fs_kd_dept': xDept,
					'fs_count': xCount,
					'fs_kd_trx': xTrx,
					'fs_kd_strx': xsTrx,
					'fs_refno': xRefno
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					
					vMask.show();
					if (xtext.sukses === true) {
						var xfile = xtext.nmfile.trim();
						
						var winxls = Ext.create('Ext.window.Window', {
							closable: false,
							draggable: false,
							height: 100,
							title: 'Download Excel Files',
							width: 180,
							defaults: {
								margin: 5
							},
							items: [{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '95%',
										href: xfile,
										hrefTarget: '_blank',
										iconCls: 'icon-save',
										text: 'Download',
										xtype: 'button'
									}]
								},{
									flex: 0.8,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '100%',
										iconCls: 'icon-exit',
										text: 'Exit',
										xtype: 'button',
										handler: function() {
											vMask.hide();
											winxls.hide();
										}
									}]
								}]
							}]
						}).show();
					}
					else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'IDS'
						});
						vMask.hide();
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Export Failed, Connection Failed!!',
						title: 'IDS'
					});
					fnMaskHide();
				}
			});
		}

		function fnReset() {
			Ext.getCmp('cboDept').setValue('');
			Ext.getCmp('txtDept').setValue('');
			Ext.getCmp('txtCount').setValue('');
			Ext.getCmp('cboAcnoA').setValue(),
			Ext.getCmp('cboAcnoB').setValue();
			Ext.getCmp('txtAcnoA').setValue();
			Ext.getCmp('txtAcnoB').setValue();
			Ext.getCmp('txtDateA').setValue(new Date());
			Ext.getCmp('txtDateB').setValue(new Date());
			
			//grupGrid.removeAll();
			grupGrid2.removeAll();
			pbar.hide();
		}

		var pbar = Ext.create('Ext.ProgressBar', {
			id: 'pbar',
			width: 600
		}).hide();

		function fnPB() {
			pbar.wait({
				duration: 60000,
				increment: 600,
				interval: 100,
				scope: this,
				fn: function() {
					pbar.hide();
					pbar.reset(true);
				}
			}).show();
		}
		

		var frmAccGL = Ext.create('Ext.form.Panel', {
			border: false,
			frame: true,
			region: 'center',
			title: 'Aplikasi Pembiayaan Konsumen (APK)',
			width: 950,
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 80,
				msgTarget: 'side'
			},
			items: [{
				xtype: 'fieldset',
				style: 'padding: 5px;',
				items: [
				
			txtNoAPK2,	
			txtKodeCabang,
				{
					anchor: '100%',
					layout: 'hbox',
					xtype: 'container',
					items: [{
						flex: 0.7,
						layout: 'anchor',
						xtype: 'container',
						items: [{	
							anchor: '95%',
							scale: 'medium',
							text: 'Tambah',
							width: 70,
							xtype: 'button',
							handler: fnShow
						}]
					},
					{
						flex: 0.7,
						layout: 'anchor',
						xtype: 'container',
						items: [{
							anchor: '95%',
							scale: 'medium',
							text: 'Koreksi',
							width: 70,
							xtype: 'button',
							handler: fnDuplikasi
						}]
					},
					{
						flex: 0.7,
						layout: 'anchor',
						xtype: 'container',
						items: [{
							anchor: '95%',
							scale: 'medium',
							text: 'Duplikasi',
							width: 70,
							xtype: 'button',
							handler: winKoreksi
						}]
					},{
						flex: 0.7,
						layout: 'anchor',
						xtype: 'container',
						id:'idHapus',
						name:'idHapus',
						disabled:true,
						items: [{
							anchor: '95%',
							scale: 'medium',
							text: 'Hapus',
							width: 70,
							xtype: 'button',
							handler: fnExportToExcel2
						}]
					}]
				}]
			},
			gridHeader

			]
		});

		function winKoreksi() {

			Ext.Ajax.request({
				method: 'POST',
				url: 'apknew/ceknoapk',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPK2').getValue()
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
							//fnSaveTrans();
							fnMaskHide();
							vMask.hide();
							var apk =  Ext.getCmp('txtNoAPK2').getValue();
							var no_pjj =  Ext.getCmp('txtNoPjj').getValue();
							fnDuplikat();
							//window.location ="index?PostData1=" + apk;

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
										//fnSaveTrans();
										fnMaskHide();
										var apk =  Ext.getCmp('txtNoAPK2').getValue();
										fnDuplikat();
										//window.location ="index?PostData1=" + apk;


										//vMask.hide();

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
						title: 'IDS'
					});
					fnMaskHide();
					vMask.hide();
				}
			});
		}

		function fnDuplikat() {

			Ext.Ajax.request({
				method: 'POST',
				url: 'apknew/duplikat',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPK2').getValue(),
					'fn_nomor_perjanjian': Ext.getCmp('txtNoPjj').getValue()
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
							//fnSaveTrans();
							fnMaskHide();
							vMask.hide();
							grupGrid.load();
							//var apk =  Ext.getCmp('txtNoAPK').getValue();
							//fnDuplikat();
							//window.location ="index?PostData1=" + apk;

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
										//fnSaveTrans();
										fnMaskHide();
										grupGrid.load();
										//var apk =  Ext.getCmp('txtNoAPK').getValue();
										//fnDuplikat();
										//window.location ="index?PostData1=" + apk;


										//vMask.hide();

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
						title: 'IDS'
					});
					fnMaskHide();
					vMask.hide();
				}
			});
		}

//------------------------------------------- FORM APK KONSUMEN ----------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------	
	Ext.define('DataGridProd', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_transaksi', type: 'string'},
			{name: 'fs_nama_transaksi', type: 'string'},
			{name: 'fs_nilai_transaksi', type: 'string'},
			{name: 'fs_konsumen', type: 'string'},
			{name: 'fs_dealer', type: 'string'}
		]
	});

	Ext.define('DataGridPerluasan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_referensi', type: 'string'},
			{name: 'fs_nilai1_referensi', type: 'string'}
		]
	});

	var grupTambahCair = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx8','fs_nm_strx8'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_cair'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTambahCair2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx8','fs_nm_strx8'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_cair'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});


	var grupTermasukDP = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx7','fs_nm_strx7'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_dp'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTermasukDP2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx7','fs_nm_strx7'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_dp'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});


	var grupKodeTrans = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_transaksi','fs_nama_transaksi'
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
			url: 'konsumen/grid_trans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari19').getValue(),
				});
			}
		}
	});

	var grupKodeTransB = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_transaksi','fs_nama_transaksi'
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
			url: 'konsumen/grid_trans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari19B').getValue(),
				});
			}
		}
	});


	var grupKodeTrans2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridProd',
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
			url: 'koreksi/grid_trans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fn_no_apk': Ext.getCmp('txtNoApk').getValue()
				});
			},
			load: function() {
				var xtotal = grupKodeTrans2.getCount();
				
				if (xtotal > 0) {
					var store = gridKode.getStore();
					var xqty = 0;
					
					gridKode.getSelectionModel().select(0);
				}
			}
		}
	});

	var grupKodeTrans2B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridProd',
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
			url: 'koreksi/grid_trans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fn_no_apk': Ext.getCmp('txtNoApkB').getValue()
				});
			},
			load: function() {
				var xtotal = grupKodeTrans2B.getCount();
				
				if (xtotal > 0) {
					var store = gridKode2.getStore();
					var xqty = 0;
					
					gridKode2.getSelectionModel().select(0);
				}
			}
		}
	});


	var txtNoNpwp = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'No NPWP',
		id: 'txtNoNpwp',
		name: 'txtNoNpwp',
		minValue: 0,
		maxLength:22,
		enforceMaxLength:true, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		/*listeners: {
        change: function (field, newValue) {
        	//newValue = newValue.replace(/\./g, '');
            var e = Ext.getCmp('txtNoNpwp').getValue();
            var m = Ext.getCmp('txtTes').getValue();
            var n = Ext.getCmp('txtTes2').getValue();
            var o = Ext.getCmp('txtTes3').getValue();
            var p = Ext.getCmp('txtTes4').getValue();
            var q = Ext.getCmp('txtTes5').getValue();
            var r = Ext.getCmp('txtTes6').getValue();

            if(e==''){

            	 Ext.getCmp('txtTes').setValue('');
                 Ext.getCmp('txtTes2').setValue('');
                 Ext.getCmp('txtTes3').setValue('');
                 Ext.getCmp('txtTes4').setValue('');
                 Ext.getCmp('txtTes5').setValue('');
                 Ext.getCmp('txtTes6').setValue('');
            }
            var b = e.substring(0,2);
            var a = b.length;
            var c = e.substring(3,6);
            var d = c.length;

            var f = e.substring(7,10);
            var g = f.length;

            var ff = e.substring(11,12);
            var gf = ff.length;

            var fff = e.substring(13,16);
            var gff = fff.length;

            var ffff = e.substring(17,20);
            var gfff = ffff.length;

            if(a==2 && m!='done'){
            newValue = e.replace(/.{2}/g, function (substr) {

            Ext.getCmp('txtTes').setValue('done');
            return substr + '.';
            }),

            field.setRawValue(newValue);
            } 

            if(d==3 && n!='dones') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes2').setValue('dones');
            	field.setRawValue(newValue);
            }

            if(g==3 && o!='doness') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes3').setValue('doness');
            	field.setRawValue(newValue);
            }
            
             if(gf==1 && p!='donesss') {
            	newValue = newValue + '-';
            	Ext.getCmp('txtTes4').setValue('donesss');
            	field.setRawValue(newValue);
            }

             if(gff==1 && p!='donessss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes5').setValue('donessss');
            	field.setRawValue(newValue);
            }

             if(gfff==1 && p!='donesssss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes6').setValue('donesssss');
            	field.setRawValue(newValue);
            }
        }
  		 },*/
	};

	var grupTrxDimuka = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx5','fs_nm_strx5'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_dimuka'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}	
	});

	var grupTrxDimukaB = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx5','fs_nm_strx5'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_dimuka'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}	
	});

	var grupTrx29B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_status','fs_nm_status'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'badan_usaha/cb_status_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx30B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_bentuk','fs_nm_bentuk'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'badan_usaha/cb_bentuk_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx31B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_status_tempat','fs_nm_status_tempat'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'badan_usaha/cb_status_tempat_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx32B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_skala','fs_nm_skala'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'badan_usaha/cb_skala_perusahaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});
	
	var grupTrxjenkel = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx2','fs_nm_strx2'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_kredit'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrxjenkelB = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx2','fs_nm_strx2'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_kredit'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx24 = Ext.create('Ext.data.Store', {
			autoLoad: true,
			fields: [
				'fs_kode_jenis','fs_nm_jenis'
			],
			proxy: {
				actionMethods: {
					read: 'POST'
				},
				reader: {
					type: 'json'
				},
				type: 'ajax',
				url: 'apknew/cb_jenis'
			},
			listeners: {
				beforeload: function(store) {
					Ext.apply(store.getProxy().extraParams, {
					});
				}
			}
		});

	var grupTrx24B = Ext.create('Ext.data.Store', {
			autoLoad: true,
			fields: [
				'fs_kode_jenis','fs_nm_jenis'
			],
			proxy: {
				actionMethods: {
					read: 'POST'
				},
				reader: {
					type: 'json'
				},
				type: 'ajax',
				url: 'badan_usaha/cb_jenis'
			},
			listeners: {
				beforeload: function(store) {
					Ext.apply(store.getProxy().extraParams, {
					});
				}
			}
		});

	var grupTrx28 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_fleet','fs_nm_fleet'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apknew/cb_fleet'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx28B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_fleet','fs_nm_fleet'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apknew/cb_fleet'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupPolaTransaksi= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nilai1_referensi','fs_nama_referensi','fs_nilai2s_referensi'
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
			url: 'apknew/ambil_pola'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari3').getValue(),
					'fs_kode_referensi': 'pola_transaksi'
				});
			}
		}
	});	

	var grupPolaTransaksiB= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nilai1_referensi','fs_nama_referensi','fs_nilai2s_referensi'
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
			url: 'apknew/ambil_pola'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari3B').getValue(),
					'fs_kode_referensi': 'pola_transaksi'
				});
			}
		}
	});	

	var grupKodePos2= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari9').getValue()
				});
			}
		}
	});

	var grupKodePos4B= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2B').getValue()
				});
			}
		}
	});

	var grupKodePos2B= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari9B').getValue()
				});
			}
		}
	});


	var grupTrx13 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx4','fs_nm_strx4'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_samakontrak'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx13B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx4','fs_nm_strx4'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_samakontrak'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});


	var grupTrx20 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_pencairan','fs_nm_pencairan'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_pencarianke'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx20B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_pencairan','fs_nm_pencairan'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_pencarianke'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});


	var grupTrx21 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_uangmuka','fs_uangmuka2'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_uangmuka'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});


	var grupTrx21B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_uangmuka','fs_uangmuka2'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_uangmuka'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx22 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_deposit','fs_deposit2'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_deposit'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx22B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_deposit','fs_deposit2'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_deposit'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupPiutang = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_piutang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari5').getValue(),
					'fs_kode_referensi': 'jenis_piutang',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': ''
				});
			}
		}
	});

	var grupPiutangB = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_piutang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari5B').getValue(),
					'fs_kode_referensi': 'jenis_piutang',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': ''
				});
			}
		}
	});

	var txtNoApk = {
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign: 'left', 
		labelWidth:130,
		fieldLabel: 'No APK',
		readOnly:true,
		id: 'txtNoApk',
		name: 'txtNoApk',
		xtype: 'textfield'
	};

	var txtNoApkB = {
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign: 'left', 
		labelWidth:130,
		fieldLabel: 'No APK',
		readOnly:true,
		id: 'txtNoApkB',
		name: 'txtNoApkB',
		xtype: 'textfield'
	};

	var txtRefnodt = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		fieldLabel: 'Tgl Apk',
		format: 'd-m-Y',
		submitFormat:'Y-m-d',
		id: 'txtRefnodt',
		minValue: Ext.Date.getFirstDateOfMonth(new Date()),
		name: 'txtRefnodt',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtRefnodtB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		fieldLabel: 'Tgl Apk',
		format: 'd-m-Y',
		submitFormat:'Y-m-d',
		id: 'txtRefnodtB',
		minValue: Ext.Date.getFirstDateOfMonth(new Date()),
		name: 'txtRefnodtB',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtAlamatSurat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Enter an Address',
		fieldLabel: 'Alamat Surat',
		id: 'txtAlamatSurat',
		name: 'txtAlamatSurat',
		xtype: 'textfield'
	};

	var txtAlamatKorespondensiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Enter an Address',
		fieldLabel: 'Alamat Korespondensi',
		id: 'txtAlamatKorespondensiB',
		name: 'txtAlamatKorespondensiB',
		xtype: 'textfield'
	};

	var txtAlamatSuratB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Enter an Address',
		fieldLabel: 'Alamat Surat',
		id: 'txtAlamatSuratB',
		name: 'txtAlamatSuratB',
		xtype: 'textfield'
	};

	var txtTanggalAngs1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		submitFormat:'Y-m-d',
		editable: true,
		fieldLabel: 'Tgl. Angsuran I',
		format: 'd-m-Y',
		id: 'txtTanggalAngs1',
		minValue: Ext.Date.getFirstDateOfMonth(new Date()),
		name: 'txtTanggalAngs1',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtTanggalAngs1B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		submitFormat:'Y-m-d',
		editable: true,
		fieldLabel: 'Tgl. Angsuran I',
		format: 'd-m-Y',
		id: 'txtTanggalAngs1B',
		minValue: Ext.Date.getFirstDateOfMonth(new Date()),
		name: 'txtTanggalAngs1B',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtTglCair = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		submitFormat:'Y-m-d',
		labelAlign:'left',
		labelWidth:130,
		editable: true,
		fieldLabel: 'Tgl. Cair',
		format: 'd-m-Y',
		id: 'txtTglCair',
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtTglCair',
		value: new Date(),
		xtype: 'datefield'
	};	

	var txtTglCairB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		submitFormat:'Y-m-d',
		labelAlign:'left',
		labelWidth:130,
		editable: true,
		fieldLabel: 'Tgl. Cair',
		format: 'd-m-Y',
		id: 'txtTglCairB',
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtTglCairB',
		value: new Date(),
		xtype: 'datefield'
	};


	var txtRekeningCair = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		fieldLabel: 'A/N Rekening Cair',
		id: 'txtRekeningCair',
		name: 'txtRekeningCair',
		xtype: 'textfield'
	};

	var txtRekeningCairB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		fieldLabel: 'A/N Rekening Cair',
		id: 'txtRekeningCairB',
		name: 'txtRekeningCairB',
		xtype: 'textfield'
	};

	var txtNamaBank = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		fieldLabel: 'Nama Bank',
		id: 'txtNamaBank',
		name: 'txtNamaBank',
		xtype: 'textfield'
	};

	var txtNamaBankB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		fieldLabel: 'Nama Bank',
		id: 'txtNamaBankB',
		name: 'txtNamaBankB',
		xtype: 'textfield'
	};

	var txtNilaiCair = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
     	anchor: '80%',
     	emptyText: ' ',
     	fieldLabel:'NILAI CAIR : Rp.  ',
     	labelStyle:'font-weight:bold;margin-left:50px;font-size:20px',
     	fieldStyle: 'font-size:23px;color:#FF0000',
     	id: 'txtNilaiCair',	
		name: 'txtNilaiCair',
		value: 0,
   		padding: 0,
   		labelWidth:280,
   		labelCls: 'biggertext',
   		xtype: 'displayfield',
	};

	var txtNilaiCairB = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
     	anchor: '80%',
     	emptyText: ' ',
     	fieldLabel:'NILAI CAIR : Rp.  ',
     	labelStyle:'font-weight:bold;margin-left:50px;font-size:20px',
     	fieldStyle: 'font-size:23px;color:#FF0000',
     	id: 'txtNilaiCairB',	
		name: 'txtNilaiCairB',
		value: 0,
   		padding: 0,
   		labelWidth:280,
   		labelCls: 'biggertext',
   		xtype: 'displayfield',
	};

	var txtNilaiCair3 = {
		afterLabelTextTpl: required,
		anchor: '100%',
		emptyText: 'Masukkan Pendapatan',
		fieldLabel: 'Jml Kend Yg Dimiliki',
		id: 'txtNilaiCair3',
		name: 'txtNilaiCair3',
		hidden: true,
		xtype: 'textfield'
	};

	var txtNilaiCair3B = {
		afterLabelTextTpl: required,
		anchor: '100%',
		emptyText: 'Masukkan Pendapatan',
		fieldLabel: 'Jml Kend Yg Dimiliki',
		id: 'txtNilaiCair3B',
		name: 'txtNilaiCair3B',
		hidden: true,
		xtype: 'textfield'
	};

	
	var txtNoRekCair = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		fieldLabel: 'No. Rekening Cair',
		id: 'txtNoRekCair',
		name: 'txtNoRekCair',
		xtype: 'textfield'
	};

	var txtNoRekCairB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		fieldLabel: 'No. Rekening Cair',
		id: 'txtNoRekCairB',
		name: 'txtNoRekCairB',
		xtype: 'textfield'
	};

	var cboPencairanKe = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		emptyText: 'Select Pencairan',
		fieldLabel: 'Pencairan Ke',
		id: 'cboPencairanKe',
		name: 'cboPencairanKe',
		valueField: 'fs_kd_pencairan',
		displayField: 'fs_nm_pencairan',
		store: grupTrx20,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboPencairanKeB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		emptyText: 'Select Pencairan',
		fieldLabel: 'Pencairan Ke',
		id: 'cboPencairanKeB',
		name: 'cboPencairanKeB',
		valueField: 'fs_kd_pencairan',
		displayField: 'fs_nm_pencairan',
		store: grupTrx20B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboUangMuka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		fieldLabel: 'Uang Muka Bayar Ke',
		id: 'cboUangMuka',
		name: 'cboUangMuka',
		store: grupTrx21,
		displayField: 'fs_uangmuka2',
		valueField: 'fs_uangmuka',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboUangMukaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		fieldLabel: 'Uang Muka Bayar Ke',
		id: 'cboUangMukaB',
		name: 'cboUangMukaB',
		store: grupTrx21B,
		displayField: 'fs_uangmuka2',
		valueField: 'fs_uangmuka',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};


	var cboDeposit = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		editable: false,
		emptyText: 'Select',
		fieldLabel: 'Deposit Potong Pencairan',
		id: 'cboDeposit',
		name: 'cboDeposit',
		displayField: 'fs_deposit2',
		valueField: 'fs_deposit',
		store: grupTrx22,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboDepositB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		editable: false,
		emptyText: 'Select',
		fieldLabel: 'Deposit Potong Pencairan',
		id: 'cboDepositB',
		name: 'cboDepositB',
		displayField: 'fs_deposit2',
		valueField: 'fs_deposit',
		store: grupTrx22B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};


	var txtTanggalAngsBln = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35%',
		submitFormat:'Y-m-d',
		minValue:0,
		value:1,
		id:'txtTanggalAngsBln' ,
		name:'txtTanggalAngsBln',
		enforceMaxLength:true,
		maxLength:2,
		editable: true,
		labelAlign:'right',
		labelWidth:160,
		fieldLabel: 'Tgl Jatuh Tempo/Bulan',
		xtype: 'numberfield'
	};

	var txtTanggalAngsBlnB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35%',
		submitFormat:'Y-m-d',
		minValue:0,
		value:1,
		id:'txtTanggalAngsBlnB' ,
		name:'txtTanggalAngsBlnB',
		enforceMaxLength:true,
		maxLength:2,
		editable: true,
		labelAlign:'right',
		labelWidth:160,
		fieldLabel: 'Tgl Jatuh Tempo/Bulan',
		xtype: 'numberfield'
	};


	var grupUsahaPekerjaan = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_usaha_kerja'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'kode_pekerjaan',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': '',
					'fs_cari': Ext.getCmp('txtCari7').getValue()
				});
			}
		}
	});

	var grupDealer = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_dealer','fs_nama_pemilik','fs_kode_dealer1','fs_kode_dealer2','fs_alamat_dealer','fs_telepon_dealer' ,'fn_cabang_dealer' ,'fs_kota_dealer' , 'fs_rekening_bank_pencairan',
			'fs_nama_bank_pencairan' , 'fs_atasnama_bank_pencairan','fn_persen_refund_bunga'
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
			url: 'apknew/ambil_dealer'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari13').getValue()
				});
			}
		}
	});

	var grupDealerB = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_dealer','fs_nama_pemilik','fs_kode_dealer1','fs_kode_dealer2','fs_alamat_dealer','fs_telepon_dealer' ,'fn_cabang_dealer' ,'fs_kota_dealer' , 'fs_rekening_bank_pencairan',
			'fs_nama_bank_pencairan' , 'fs_atasnama_bank_pencairan','fn_persen_refund_bunga'
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
			url: 'apknew/ambil_dealer'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari13B').getValue()
				});
			}
		}
	});

	var grupPendidikan = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_pendidikan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pendidikan',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': '',
					'fs_cari': Ext.getCmp('txtCari8').getValue()
				});
			}
		}
	});

	var grupPerusahaanAsuransi = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_perusahaan_asuransi','fs_alamat_perusahaan_asuransi','fs_kota_perusahaan_asuransi' , 'fs_perwakilan_perusahaan_asuransi' ,
			'fs_email_perwakilan_perusahaan_asuransi' , 'fs_telfon_perusahaan_asuransi', 'fs_kode_asuransi2','fs_tjh' , 'fs_kode_asuransi1'
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
			url: 'apknew/ambil_perusahaan_asuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari18').getValue()
				});
			}
		}
	});

	var grupPerusahaanAsuransiB = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_perusahaan_asuransi','fs_alamat_perusahaan_asuransi','fs_kota_perusahaan_asuransi' , 'fs_perwakilan_perusahaan_asuransi' ,
			'fs_email_perwakilan_perusahaan_asuransi' , 'fs_telfon_perusahaan_asuransi', 'fs_kode_asuransi2','fs_tjh' , 'fs_kode_asuransi1'
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
			url: 'apknew/ambil_perusahaan_asuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari18B').getValue()
				});
			}
		}
	});

	var grupJenisAsuransi = Ext.create('Ext.data.Store', {
			fields: [
				'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
				url: 'apknew/ambil_jenis_asuransi'
			},
			listeners: {
				beforeload: function(store) {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kode_referensi': 'jenis_asuransi',
						'fs_nama_referensi': '',
						'fs_nilai1_referensi': '',
						'fs_nilai2_referensi': '',
						'fs_cari': Ext.getCmp('txtCari12').getValue()
					});
				}
			}
		});

	var grupJenisAsuransiB = Ext.create('Ext.data.Store', {
			fields: [
				'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
				url: 'apknew/ambil_jenis_asuransi'
			},
			listeners: {
				beforeload: function(store) {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kode_referensi': 'jenis_asuransi',
						'fs_nama_referensi': '',
						'fs_nilai1_referensi': '',
						'fs_nilai2_referensi': '',
						'fs_cari': Ext.getCmp('txtCari12B').getValue()
					});
				}
			}
		});


	Ext.define('DataGridAsuransi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_tahun_ke', type: 'string'},
			{name: 'fs_jenis_asuransi', type: 'string'}
		]
	});

	Ext.define('DataGridAsuransiB', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_tahun_ke', type: 'string'},
			{name: 'fs_jenis_asuransi', type: 'string'}
		]
	});

	var grupTahunke = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx9','fs_nm_strx9'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_tahun_ke'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_tenor': Ext.getCmp('txtTenorMIX').getValue()
				});
			}
		}
	});

	var grupTahunkeB = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx9','fs_nm_strx9'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_tahun_ke'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_tenor': Ext.getCmp('txtTenorMIXB').getValue()
				});
			}
		}
	});

	var grupJenisAsuransiMIX = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx11','fs_nm_strx11'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_asuransi_mix'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupJenisAsuransiMIXB = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx11','fs_nm_strx11'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_asuransi_mix'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupAgama = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_agama'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'agama',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': ''
				});
			}
		}
	});

	var grupTrx12 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx3','fs_nm_strx3'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_komersil'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx12B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx3','fs_nm_strx3'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_komersil'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx14 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['fs_nama_referensi','fs_nilai1_referensi'],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_polaangs'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx14B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['fs_nama_referensi','fs_nilai1_referensi'],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_polaangs'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});


	var grupTrx15 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_carabayar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx15B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_carabayar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupTrx16 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_angs_dealer','fs_angs_dealer'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_dibayar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx16B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_angs_dealer','fs_angs_dealer'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_dibayar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});


	var grupTrx18 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx6','fs_nm_strx6'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_potongpencairan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});


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
			url: 'koreksi/apkpendukungkonsumen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('cboJenis').getValue()
				});
			}
		}
	});

	var grupApkPendukung2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_no_apk2','fs_kode_cabang',
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
			url: 'koreksi/apkpendukungbadanusaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_apk2': Ext.getCmp('txtNoApkB').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('cboJenisB').getValue()
				});
			}
		}
	});

	var grupTrx18B = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx6','fs_nm_strx6'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/cb_potongpencairan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});


	var grupLembagaKeuangan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_lembaga_keuangan','fs_split','fs_kode_lembaga_keuangan1,', 'fs_kode_lembaga_keuangan2,'
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
			url: 'apknew/ambil_lembaga'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupLembagaKeuanganB= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_lembaga_keuangan','fs_split','fs_kode_lembaga_keuangan1,', 'fs_kode_lembaga_keuangan2,'
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
			url: 'apknew/ambil_lembaga'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1B').getValue()
				});
			}
		}
	});

	var grupTrx2 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_jenkel'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupModelKendaraan = Ext.create('Ext.data.Store', {
		fields: [
			'fs_merek_kendaraan','fs_model_kendaraan','fs_jenis_kendaraan','fs_silinder_kendaraan','fs_kode_kendaraan'
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
			url: 'apknew/ambil_model'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari10').getValue()
				});
			}
		}
	});

	var grupModelKendaraanB = Ext.create('Ext.data.Store', {
		fields: [
			'fs_merek_kendaraan','fs_model_kendaraan','fs_jenis_kendaraan','fs_silinder_kendaraan','fs_kode_kendaraan'
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
			url: 'apknew/ambil_model'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari10B').getValue()
				});
			}
		}
	});

	var grupKodePos3= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari15').getValue()
				});
			}
		}
	});

	var grupKategoriUsaha = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_sektor_ekonomi','fs_kode_sektor_ekonomi'
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
			url: 'apknew/ambil_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari6').getValue()
				});
			}
		}
	});

	var grupKategoriUsahaB = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_sektor_ekonomi','fs_kode_sektor_ekonomi'
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
			url: 'apknew/ambil_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari6B').getValue()
				});
			}
		}
	});

	var grupSkalaPerusahaan = Ext.create('Ext.data.Store', {
			fields: [
				'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
				url: 'apknew/ambil_skala_perusahaan'
			},
			listeners: {
				beforeload: function(store) {
					Ext.apply(store.getProxy().extraParams, {
						'fs_kode_referensi': 'skala_perusahaan',
						'fs_nama_referensi': '',
						'fs_nilai1_referensi': '',
						'fs_nilai2_referensi': '',
						'fs_cari': Ext.getCmp('txtCari17').getValue()
					});
				}
			}
		});

	var grupStatusRumah = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_status_rumah'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_rumah',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': ''
				});
			}
		}
	});

	var grupUsahaPekerjaan2 = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_sektor_ekonomi','fs_kode_sektor_ekonomi'
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
			url: 'apknew/ambil_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari14').getValue()
				});
			}
		}
	});

	var grupUsahaPekerjaan3 = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_sektor_ekonomi','fs_kode_sektor_ekonomi'
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
			url: 'apknew/ambil_usaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari16').getValue()
				});
			}
		}
	});

	var grupPaket= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_paket','fs_kode_paket'
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
			url: 'apknew/ambil_paket'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari4').getValue()
				});
			}
		}
	});

	var grupPaketB= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_paket','fs_kode_paket'
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
			url: 'apknew/ambil_paket'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari4B').getValue()
				});
			}
		}
	});


	var grupStatusKonsumen = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'apknew/ambil_status_konsumen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_konsumen',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': ''
				});
			}
		}
	});
		
	var grupAsuransiMix = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridAsuransi',
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
			url: 'koreksi/grid_asuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fn_no_apk': Ext.getCmp('txtNoApk').getValue()
				});
			},
			load: function() {
				var xtotal = grupAsuransiMix.getCount();
				
				if (xtotal > 0) {
					var store = gridAsuransi.getStore();
					var xqty = 0;
					
					gridAsuransi.getSelectionModel().select(0);
				}
			}
		}
	});

	var grupAsuransiMixB = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridAsuransiB',
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
			url: 'koreksi/grid_asuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fn_no_apk': Ext.getCmp('txtNoApkB').getValue()
				});
			},
			load: function() {
				var xtotal = grupAsuransiMixB.getCount();
				
				if (xtotal > 0) {
					var store = gridAsuransiB.getStore();
					var xqty = 0;
					
					gridAsuransiB.getSelectionModel().select(0);
				}
			}
		}
	});

	var winGridLembagaKeuangan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLembagaKeuangan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupLembagaKeuangan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari1').setValue('');	
					winCariLemabagaKeuangan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Nama', dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, width: 120},
			{text: 'Kode Lembaga Keuangan 1', dataIndex: 'fs_kode_lembaga_keuangan1', menuDisabled: true, hidden:true, width: 120},
			{text: 'Kode Lembaga Keuangan 2', dataIndex: 'fs_kode_lembaga_keuangan1', menuDisabled: true, hidden:true, width: 120},
			{text: 'Split', dataIndex: 'fs_split', menuDisabled: true, width: 120, hidden:true}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang',
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
					grupLembagaKeuangan.load();
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
				Ext.getCmp('cboLembagaPembiayaan').setValue(record.get('fs_split'));
				Ext.getCmp('txtLembagaKeuangan1').setValue(record.get('fs_kode_lembaga_keuangan1'));
				Ext.getCmp('txtLembagaKeuangan2').setValue(record.get('fs_kode_lembaga_keuangan2'));

				Ext.getCmp('txtCari1').setValue('');	
				
				winCariLemabagaKeuangan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridLembagaKeuanganB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLembagaKeuanganB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupLembagaKeuanganB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari1B').setValue('');	
					winCariLemabagaKeuanganB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Nama', dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, width: 120},
			{text: 'Kode Lembaga Keuangan 1', dataIndex: 'fs_kode_lembaga_keuangan1', menuDisabled: true, hidden:true, width: 120},
			{text: 'Kode Lembaga Keuangan 2', dataIndex: 'fs_kode_lembaga_keuangan1', menuDisabled: true, hidden:true, width: 120},
			{text: 'Split', dataIndex: 'fs_split', menuDisabled: true, width: 120, hidden:true}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang',
				id: 'txtCari1B',
				name: 'txtCari1B',
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
					grupLembagaKeuanganB.load();
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
				Ext.getCmp('cboLembagaPembiayaanB').setValue(record.get('fs_split'));
				Ext.getCmp('txtLembagaKeuangan1B').setValue(record.get('fs_kode_lembaga_keuangan1'));
				Ext.getCmp('txtLembagaKeuangan2B').setValue(record.get('fs_kode_lembaga_keuangan2'));

				Ext.getCmp('txtCari1B').setValue('');	
				
				winCariLemabagaKeuanganB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariLemabagaKeuangan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,

		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridLembagaKeuangan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupLembagaKeuangan.load();
				vMask.show();
			}
		}
	});	

	var winCariLemabagaKeuanganB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,

		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridLembagaKeuanganB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupLembagaKeuanganB.load();
				vMask.show();
			}
		}
	});		

	var txtLembagaKeuangan2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		hidden:true,
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Nilai Kontrak',
		id: 'txtLembagaKeuangan2',
		name: 'txtLembagaKeuangan2',
        xtype: 'textfield',
	};

	var txtLembagaKeuangan1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		hidden:true,
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Nilai Kontrak',
		id: 'txtLembagaKeuangan1',
		name: 'txtLembagaKeuangan1',
        xtype: 'textfield',
	};

	var txtLembagaKeuangan2B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		hidden:true,
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Nilai Kontrak',
		id: 'txtLembagaKeuangan2B',
		name: 'txtLembagaKeuangan2B',
        xtype: 'textfield',
	};

	var txtLembagaKeuangan1B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		hidden:true,
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Nilai Kontrak',
		id: 'txtLembagaKeuangan1B',
		name: 'txtLembagaKeuangan1B',
        xtype: 'textfield',
	};

	var txtJenisPiu = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Jenis Piutang",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJenisPiu',
		name: 'txtJenisPiu',
		readOnly: true,
		hidden:true,
		xtype: 'textfield'
	};

	var txtJenisPiuB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Jenis Piutang",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJenisPiuB',
		name: 'txtJenisPiuB',
		readOnly: true,
		hidden:true,
		xtype: 'textfield'
	};

	var txtKodePaket = {
		allowBlank: false,
		fieldLabel: 'Kota',
		anchor: '100%',
		hidden:true,
		emptyText: 'Masukkan Kota',
		id: 'txtKodePaket',
		name: 'txtKodePaket',
		xtype: 'textfield'
	};

	var txtKodePaketB = {
		allowBlank: false,
		fieldLabel: 'Kota',
		anchor: '100%',
		hidden:true,
		emptyText: 'Masukkan Kota',
		id: 'txtKodePaketB',
		name: 'txtKodePaketB',
		xtype: 'textfield'
	};


	var winGridPiutang = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPiutang,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPiutang,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari5').setValue('');
					winCariPiutang.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Referensi / Nilai Ref 1 / Nilai Ref 2',
				id: 'txtCari5',
				name: 'txtCari5',
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
					grupPiutang.load();
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
				Ext.getCmp('cboJenisPiu').setValue(record.get('fs_nilai1_referensi'));
				Ext.getCmp('txtJenisPiu').setValue(record.get('fs_nama_referensi'));
				
				winCariPiutang.hide();
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

	var winGridPiutangB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPiutangB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPiutangB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari5B').setValue('');
					winCariPiutangB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Referensi / Nilai Ref 1 / Nilai Ref 2',
				id: 'txtCari5B',
				name: 'txtCari5B',
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
					grupPiutangB.load();
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
				Ext.getCmp('cboJenisPiuB').setValue(record.get('fs_nilai1_referensi'));
				Ext.getCmp('txtJenisPiuB').setValue(record.get('fs_nama_referensi'));
				
				winCariPiutangB.hide();
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

	

	var winCariPiutang = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPiutang
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPiutang.load();
				vMask.show();
			}
		}
	});

	var winCariPiutangB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPiutangB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPiutangB.load();
				vMask.show();
			}
		}
	});

	var cboJenisPiu = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Jenis Piutang",
		fieldLabel: 'Jenis Piutang',
		id: 'cboJenisPiu',
		name: 'cboJenisPiu',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtJenisPiu').setValue('');
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
					winCariPiutang.show();
					winCariPiutang.center();
				}
			}
		}
	};

	var cboJenisPiuB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Jenis Piutang",
		fieldLabel: 'Jenis Piutang',
		id: 'cboJenisPiuB',
		name: 'cboJenisPiuB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtJenisPiuB').setValue('');
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
					winCariPiutangB.show();
					winCariPiutangB.center();
				}
			}
		}
	};

	var cboJenis = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		displayField: 'fs_nm_jenis',
		valueField: 'fs_kode_jenis',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Select Jenis',
		fieldLabel: 'Jenis',
		id: 'cboJenis',
		name: 'cboJenis',
		store: grupTrx24,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboJenisB = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		displayField: 'fs_nm_jenis',
		valueField: 'fs_kode_jenis',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Select Jenis',
		fieldLabel: 'Jenis',
		id: 'cboJenisB',
		name: 'cboJenisB',
		store: grupTrx24B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboLembagaPembiayaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign: 'left', 
		emptyText: "Select Lembaga",
		fieldLabel: 'Lembaga Pembiayaan',
		id: 'cboLembagaPembiayaan',
		name: 'cboLembagaPembiayaan',
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
						Ext.getCmp('txtCari1').setValue('');	
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariLemabagaKeuangan.show();
					winCariLemabagaKeuangan.center();
				}
			}
		}
	};

	var cboLembagaPembiayaanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign: 'left', 
		emptyText: "Select Lembaga",
		fieldLabel: 'Lembaga Pembiayaan',
		id: 'cboLembagaPembiayaanB',
		name: 'cboLembagaPembiayaanB',
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
						Ext.getCmp('txtCari1B').setValue('');	
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariLemabagaKeuanganB.show();
					winCariLemabagaKeuanganB.center();
				}
			}
		}
	};

	var winGridPaket = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPaket,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPaket,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari4').setValue('');
					winCariPaket.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Kode Paket', dataIndex: 'fs_kode_paket', menuDisabled: true, width: 120},
			{text: 'Nama Paket', dataIndex: 'fs_nama_paket', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Paket / Nama Paket / Kode Cabang',
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
					grupPaket.load();
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
				Ext.getCmp('cboPaket').setValue(record.get('fs_nama_paket'));
				Ext.getCmp('txtKodePaket').setValue(record.get('fs_kode_paket'));
				
				winCariPaket.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridPaketB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPaketB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPaketB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari4B').setValue('');
					winCariPaketB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Kode Paket', dataIndex: 'fs_kode_paket', menuDisabled: true, width: 120},
			{text: 'Nama Paket', dataIndex: 'fs_nama_paket', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Paket / Nama Paket / Kode Cabang',
				id: 'txtCari4B',
				name: 'txtCari4B',
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
					grupPaketB.load();
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
				Ext.getCmp('cboPaketB').setValue(record.get('fs_nama_paket'));
				Ext.getCmp('txtKodePaketB').setValue(record.get('fs_kode_paket'));
				
				winCariPaketB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariPaket = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPaket
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPaket.load();
				vMask.show();
			}
		}
	});

	var txtKodeCabangPerluasanDelete = {
		afterLabelTextTpl: required,
		anchor: '40%',
		labelAlign:'top',
		fieldLabel: 'Ke',
		id: 'txtKodeCabangPerluasanDelete',
		name: 'txtKodeCabangPerluasanDelete',
		value: 0,      
		hidden:true,
		xtype: 'textfield'
	};

	var txtKodeCabangPerluasanDelete2 = {
		afterLabelTextTpl: required,
		anchor: '40%',
		labelAlign:'top',
		fieldLabel: 'Ke',
		id: 'txtKodeCabangPerluasanDelete2',
		name: 'txtKodeCabangPerluasanDelete2',
		value: 0,      
		hidden:true,
		xtype: 'textfield'
	};

	var txtNoApkPerluasanDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtNoApkPerluasanDelete',
		name: 'txtNoApkPerluasanDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	var txtNoApkPerluasanDelete2 = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtNoApkPerluasanDelete2',
		name: 'txtNoApkPerluasanDelete2',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	var txtTahunPerluasanDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtTahunPerluasanDelete',
		name: 'txtTahunPerluasanDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};


	var txtTahunPerluasanDelete2 = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtTahunPerluasanDelete2',
		name: 'txtTahunPerluasanDelete2',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	var txtPerluasanDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtPerluasanDelete',
		name: 'txtPerluasanDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	var txtPerluasanDelete2 = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtPerluasanDelete2',
		name: 'txtPerluasanDelete2',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};


	var winCariPaketB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPaketB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPaketB.load();
				vMask.show();
			}
		}
	});

	var cboPaket = {
		anchor: '80%',
		emptyText: "Jenis Paket",
		fieldLabel: 'Jenis Paket',
		labelAlign:'right',
		id: 'cboPaket',
		name: 'cboPaket',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtKodePaket').setValue('');
				Ext.getCmp('txtCari4').setValue('');	
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
					winCariPaket.show();
					winCariPaket.center();
				}
			}
		}
	};

	var cboPaketB = {
		anchor: '80%',
		emptyText: "Jenis Paket",
		fieldLabel: 'Jenis Paket',
		labelAlign:'right',
		id: 'cboPaketB',
		name: 'cboPaketB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtKodePaketB').setValue('');
				Ext.getCmp('txtCari4B').setValue('');	
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
					winCariPaketB.show();
					winCariPaketB.center();
				}
			}
		}
	};

	var winGridPolaTransaksi = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPolaTransaksi,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPolaTransaksi,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari3').setValue('');
					winCariPolaTransaksi.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nilai', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 240, hidden:true},
			{text: 'Nama Transaksi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 120},

			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nilai / Nama Transaksi',
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
					grupPolaTransaksi.load();
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
				Ext.getCmp('cboPola').setValue(record.get('fs_nilai1_referensi'));
				

				var kondisi = record.get('fs_nilai2_referensi');
				var n = record.get('fs_nilai2_referensi').length;
				if(n==2){

				var kondisifix = kondisi.substring(1, 2);

					if(kondisifix=='U'){

					

						var combo1 = Ext.ComponentQuery.query('#txtNomorBpkb')[0];
						var combo2 = Ext.ComponentQuery.query('#cboNopol')[0];
						var combo3 = Ext.ComponentQuery.query('#txtNoPol2')[0];
						var combo4 = Ext.ComponentQuery.query('#txtNoPol3')[0];

					

						 	combo1.setDisabled(false);
						 	combo2.setDisabled(false);
						 	combo3.setDisabled(false);
						 	combo4.setDisabled(false);
					
					
				}

				
				} else {

						var combo1 = Ext.ComponentQuery.query('#txtNomorBpkb')[0];
						var combo2 = Ext.ComponentQuery.query('#cboNopol')[0];
						var combo3 = Ext.ComponentQuery.query('#txtNoPol2')[0];
						var combo4 = Ext.ComponentQuery.query('#txtNoPol3')[0];

						Ext.getCmp('txtNomorBpkb').setValue('');
						Ext.getCmp('cboNopol').setValue('');
						Ext.getCmp('txtNoPol2').setValue('');
						Ext.getCmp('txtNoPol3').setValue('');
						Ext.getCmp('txtWilayahAsuransi').setValue('');
					

						 	combo1.setDisabled(true);
						 	combo2.setDisabled(true);
						 	combo3.setDisabled(true);
						 	combo4.setDisabled(true);



				}

				winCariPolaTransaksi.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridPolaTransaksiB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPolaTransaksiB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPolaTransaksiB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari3B').setValue('');
					winCariPolaTransaksiB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nilai', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 240, hidden:true},
			{text: 'Nama Transaksi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 120},

			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nilai / Nama Transaksi',
				id: 'txtCari3B',
				name: 'txtCari3B',
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
					grupPolaTransaksiB.load();
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
				Ext.getCmp('cboPolaB').setValue(record.get('fs_nilai1_referensi'));
				

				var kondisi = record.get('fs_nilai2_referensi');
				var n = record.get('fs_nilai2_referensi').length;
				if(n==2){

				var kondisifix = kondisi.substring(1, 2);

					if(kondisifix=='U'){

					

						var combo1 = Ext.ComponentQuery.query('#txtNomorBpkbB')[0];
						var combo2 = Ext.ComponentQuery.query('#cboNopolB')[0];
						var combo3 = Ext.ComponentQuery.query('#txtNoPol2B')[0];
						var combo4 = Ext.ComponentQuery.query('#txtNoPol3B')[0];

					

						 	combo1.setDisabled(false);
						 	combo2.setDisabled(false);
						 	combo3.setDisabled(false);
						 	combo4.setDisabled(false);
					
					
				}

				
				} else {

						var combo1 = Ext.ComponentQuery.query('#txtNomorBpkbB')[0];
						var combo2 = Ext.ComponentQuery.query('#cboNopolB')[0];
						var combo3 = Ext.ComponentQuery.query('#txtNoPol2B')[0];
						var combo4 = Ext.ComponentQuery.query('#txtNoPol3B')[0];

					

						Ext.getCmp('txtNomorBpkbB').setValue('');
						Ext.getCmp('cboNopolB').setValue('');
						Ext.getCmp('txtNoPol2B').setValue('');
						Ext.getCmp('txtNoPol3B').setValue('');
						Ext.getCmp('txtWilayahAsuransiB').setValue('');

						 	combo1.setDisabled(true);
						 	combo2.setDisabled(true);
						 	combo3.setDisabled(true);
						 	combo4.setDisabled(true);



				}

				winCariPolaTransaksiB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	
	var txtKabupatenKotaIstri = {
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKotaIstri',
		name: 'txtKabupatenKotaIstri',
		xtype: 'textfield'
	};

	var txtKabupatenKotaPenjamin = {
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKotaPenjamin',
		name: 'txtKabupatenKotaPenjamin',
		xtype: 'textfield'
	};

	var winCariPolaTransaksi = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPolaTransaksi
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPolaTransaksi.load();
				vMask.show();
			}
		}
	});

	var winCariPolaTransaksiB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPolaTransaksiB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPolaTransaksiB.load();
				vMask.show();
			}
		}
	});

	var txtKodePendidikan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		hidden:true,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		id: 'txtKodePendidikan',
		name: 'txtKodePendidikan',
		xtype: 'textfield'
	};

	var txtIbuKandung = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Nama Gadis Ibu kandung',
		fieldLabel: 'Nama Ibu Kandung',
		id: 'txtIbuKandung',
		name: 'txtIbuKandung',
		xtype: 'textfield'
	};

	var txtKodeAgama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		hidden:true,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		id: 'txtKodeAgama',
		name: 'txtKodeAgama',
		xtype: 'textfield'
	};


	var txtUserPlaceBirth = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Tempat Lahir',
		fieldLabel: 'Tempat Lahir',
		id: 'txtUserPlaceBirth',
		name: 'txtUserPlaceBirth',
		xtype: 'textfield'
	};

	var txtUserDatebirth = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		submitFormat:'Y-m-d',
		labelAlign:'right',
		fieldLabel: 'Tanggal Lahir',
		editable: true,
		format: 'd-m-Y',
		id: 'txtUserDatebirth',
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtUserDatebirth',
		value: new Date(),
		xtype: 'datefield'
	};

	var winGridPendidikan= Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPendidikan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPendidikan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari8').setValue('');
					winCariPendidikan.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Pendidikan',
				id: 'txtCari8',
				name: 'txtCari8',
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
					grupPendidikan.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Pendidikan', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Kode', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 240 , hidden:true}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboPendidikan').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtKodePendidikan').setValue(record.get('fs_nama_referensi'));
				
				winCariPendidikan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariPendidikan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPendidikan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPendidikan.load();
				vMask.show();
			}
		}
	});

	var cboPendidikan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Pilih Pendidikan",
		fieldLabel: 'Pendidikan',
		id: 'cboPendidikan',
		name: 'cboPendidikan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari8').setValue('');
				Ext.getCmp('txtKodePendidikan').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodePendidikan').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariPendidikan.show();
					winCariPendidikan.center();
				}
			}
		}
	};

	var cboFleet = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		displayField: 'fs_nm_fleet',
		valueField: 'fs_kode_fleet',
		fieldLabel: 'Fleet',
		id: 'cboFleet',
		name: 'cboFleet',
		store: grupTrx28,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboFleetB = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		displayField: 'fs_nm_fleet',
		valueField: 'fs_kode_fleet',
		fieldLabel: 'Fleet',
		id: 'cboFleetB',
		name: 'cboFleetB',
		store: grupTrx28B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var txtKe = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtKe',
		name: 'txtKe',
		value: 0,
		minValue:0,      
		labelWidth:130,
		xtype: 'numberfield',
		value: 0,
		maxLength : 2,
 		enforceMaxLength : true
	};

	var txtKeB = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtKeB',
		name: 'txtKeB',
		value: 0,
		minValue:0,      
		labelWidth:130,
		xtype: 'numberfield',
		value: 0,
		maxLength : 2,
 		enforceMaxLength : true
	};

	var cboPola = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Pola Transaksi',
		id: 'cboPola',
		name: 'cboPola',
		xtype: 'textfield',
		 listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);

												      //LuxTax();

												     //angsdimuka();

												   
												     //pokokpembiayaan();

												     //bunga();

												      //PremiGross();

												     // Perluasan();

												      //BiayaTJH();

												   	//PremiNett();

												     //uangmuka();


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
					winCariPolaTransaksi.show();
					winCariPolaTransaksi.center();
				}
			}
		}
	};

	var cboPolaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Pola Transaksi',
		id: 'cboPolaB',
		name: 'cboPolaB',
		xtype: 'textfield',
		 listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);

												      //LuxTax();

												     //angsdimuka();

												   
												     //pokokpembiayaan();

												     //bunga();

												      //PremiGross();

												     // Perluasan();

												      //BiayaTJH();

												   	//PremiNett();

												     //uangmuka();


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
					winCariPolaTransaksiB.show();
					winCariPolaTransaksiB.center();
				}
			}
		}
	};

	var txtNoPjj = {
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		anchor: '40%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'No. PJJ',
		id: 'txtNoPjj',
		name: 'txtNoPjj',
        xtype: 'textfield'
	};

	var txtNoPjjB = {
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		anchor: '40%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'No. PJJ',
		id: 'txtNoPjjB',
		name: 'txtNoPjjB',
        xtype: 'textfield'
	};

	var txtNamaBadanUsahaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign:'left',
		style:'margin-top:15px',
		labelWidth:130,
		fieldLabel: 'Nama Badan Usaha',
		id: 'txtNamaBadanUsahaB',
		name: 'txtNamaBadanUsahaB',
		xtype: 'textfield'
	};

	var txtAlamatBadanUsahaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Alamat',
		id: 'txtAlamatBadanUsahaB',
		name: 'txtAlamatBadanUsahaB',
		xtype: 'textfield',
		listeners: {
	    'change': function(field,newValue){
	      //alert(newValue);
	     //Ext.getCmp('txtAlamatIstri').setValue(newValue);
	   		 }
		 }
	};

	var txtNamaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign:'left',
		style:'margin-top:15px',
		labelWidth:130,
		fieldLabel: 'Nama Konsumen',
		id: 'txtNamaKonsumen',
		name: 'txtNamaKonsumen',
		xtype: 'textfield'
	};

	var txtPropinsi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtPropinsi',
		name: 'txtPropinsi',
		fieldLabel: 'Propinsi',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtPropinsiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtPropinsiB',
		name: 'txtPropinsiB',
		fieldLabel: 'Propinsi',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtKelurahan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Kelurahan',
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKelurahan',
		name: 'txtKelurahan',
		xtype: 'textfield'
	};

	var txtKelurahanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Kelurahan',
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKelurahanB',
		name: 'txtKelurahanB',
		xtype: 'textfield'
	};


	var txtKodeDati = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Kode dati',
		hidden:true,
		id: 'txtKodeDati',
		name: 'txtKodeDati',
		xtype: 'textfield'
	};

	var txtKodeDatiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Kode dati',
		hidden:true,
		id: 'txtKodeDatiB',
		name: 'txtKodeDatiB',
		xtype: 'textfield'
	};

	var txtKabupatenKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKota',
		name: 'txtKabupatenKota',
		xtype: 'textfield'
	};

	var txtKabupatenKotaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKotaB',
		name: 'txtKabupatenKotaB',
		xtype: 'textfield'
	};


	var cboJenKel = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_strx',
		editable: false,
		emptyText: 'Select Jenis Kelamin',
		fieldLabel: 'Jenis Kelamin',
		id: 'cboJenKel',
		name: 'cboJenKel',
		store: grupTrx2,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var txtNoKtp = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'masukkan no ktp',
		fieldLabel: 'No KTP',
		id: 'txtNoKtp',
		name: 'txtNoKtp	',
		maxLength : 16,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtNoKtpB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'masukkan no ktp',
		fieldLabel: 'No KTP',
		id: 'txtNoKtpB',
		name: 'txtNoKtpB	',
		maxLength : 16,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtNoNpwpPenanggungJwbB = {
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		maxLength:22,
		enforceMaxLength:true, 
		fieldLabel: 'No NPWP',
		id: 'txtNoNpwpPenanggungJwbB',
		name: 'txtNoNpwpPenanggungJwbB',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		/*listeners: {
        change: function (field, newValue) {
        	//newValue = newValue.replace(/\./g, '');
            var e = Ext.getCmp('txtNoNpwpPenanggungJwbB').getValue();
            var m = Ext.getCmp('txtTess').getValue();
            var n = Ext.getCmp('txtTes22').getValue();
            var o = Ext.getCmp('txtTes33').getValue();
            var p = Ext.getCmp('txtTes44').getValue();
            var q = Ext.getCmp('txtTes55').getValue();
            var r = Ext.getCmp('txtTes66').getValue();

            if(e==''){

            	 Ext.getCmp('txtTess').setValue('');
                 Ext.getCmp('txtTes22').setValue('');
                 Ext.getCmp('txtTes33').setValue('');
                 Ext.getCmp('txtTes44').setValue('');
                 Ext.getCmp('txtTes55').setValue('');
                 Ext.getCmp('txtTes66').setValue('');
            }
            var b = e.substring(0,2);
            var a = b.length;
            var c = e.substring(3,6);
            var d = c.length;

            var f = e.substring(7,10);
            var g = f.length;

            var ff = e.substring(11,12);
            var gf = ff.length;

            var fff = e.substring(13,16);
            var gff = fff.length;

            var ffff = e.substring(17,20);
            var gfff = ffff.length;

            if(a==2 && m!='done'){
            newValue = e.replace(/.{2}/g, function (substr) {

            Ext.getCmp('txtTess').setValue('done');
            return substr + '.';
            }),

            field.setRawValue(newValue);
            } 

            if(d==3 && n!='dones') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes22').setValue('dones');
            	field.setRawValue(newValue);
            }

            if(g==3 && o!='doness') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes33').setValue('doness');
            	field.setRawValue(newValue);
            }
            
             if(gf==1 && p!='donesss') {
            	newValue = newValue + '-';
            	Ext.getCmp('txtTes44').setValue('donesss');
            	field.setRawValue(newValue);
            }

             if(gff==1 && p!='donessss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes55').setValue('donessss');
            	field.setRawValue(newValue);
            }

             if(gfff==1 && p!='donesssss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes66').setValue('donesssss');
            	field.setRawValue(newValue);
            }
            
            
            
        	}
  		 }*/
	};


	var txtAlamatPenanggungJawabB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Enter an Address',
		fieldLabel: 'Alamat Penanggung Jawab',
		id: 'txtAlamatPenanggungJawabB',
		name: 'txtAlamatPenanggungJawabB',
		xtype: 'textfield'
	};

	var txtSd = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		editable: true,
		fieldLabel: 's/d',
		submitFormat:'Y-m-d',
		format: 'd-m-Y',
		id: 'txtSd',
		minValue:new Date(),
		name: 'txtSd',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtKecamatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kecamatan',
		id: 'txtKecamatan',
		name: 'txtKecamatan',
		xtype: 'textfield'
	};

	var txtKecamatanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kecamatan',
		id: 'txtKecamatanB',
		name: 'txtKecamatanB',
		xtype: 'textfield'
	};


	var txtWilayahAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtWilayahAsuransi',
		name: 'txtWilayahAsuransi',
		xtype: 'textfield'
	};
	
	var txtWilayahAsuransiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtWilayahAsuransiB',
		name: 'txtWilayahAsuransiB',
		xtype: 'textfield'
	};
	


	var txtTelepon = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan no telepon',
		fieldLabel: 'Telepon',
		id: 'txtTelepon',
		name: 'txtTelepon',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtTeleponB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan no telepon',
		fieldLabel: 'Telepon',
		id: 'txtTeleponB',
		name: 'txtTeleponB',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtTes = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes',
		name: 'txtTes',
		xtype: 'textfield',
		hidden:true
	};

	var txtTess = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTess',
		name: 'txtTess',
		xtype: 'textfield',
		hidden:true
	};

	var txtTesss = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTesss',
		name: 'txtTesss',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes2',
		name: 'txtTes2',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes22 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes22',
		name: 'txtTes22',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes222 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes222',
		name: 'txtTes222',
		xtype: 'textfield',
		hidden:true
	};


	var txtTes3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes3',
		name: 'txtTes3',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes33 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes33',
		name: 'txtTes33',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes333 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes333',
		name: 'txtTes333',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes4',
		name: 'txtTes4',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes44 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes44',
		name: 'txtTes44',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes444 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes444',
		name: 'txtTes444',
		xtype: 'textfield',
		hidden:true
	};


	var txtTes5 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes5',
		name: 'txtTes5',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes55 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes55',
		name: 'txtTes55',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes555 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes555',
		name: 'txtTes555',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes6 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes6',
		name: 'txtTes6',
		xtype: 'textfield',
		hidden:true,
	};

	var txtTes66 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes66',
		name: 'txtTes66',
		xtype: 'textfield',
		hidden:true,
	};

	var txtTes666 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes666',
		name: 'txtTes666',
		xtype: 'textfield',
		hidden:true,
	};


	var txtNoNpwpB = {
		anchor: '80%',
		labelAlign:'right',
		fieldLabel: 'No NPWP',
		id: 'txtNoNpwpB',
		name: 'txtNoNpwpB',
		minValue: 0,
		maxLength:22,
		enforceMaxLength:true, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		/*listeners: {
        change: function (field, newValue) {
        	//newValue = newValue.replace(/\./g, '');
            var e = Ext.getCmp('txtNoNpwpB').getValue();
           // var x = e.replace(/\D/g,'');
            var m = Ext.getCmp('txtTes').getValue();
            var n = Ext.getCmp('txtTes2').getValue();
            var o = Ext.getCmp('txtTes3').getValue();
            var p = Ext.getCmp('txtTes4').getValue();
            var q = Ext.getCmp('txtTes5').getValue();
            var r = Ext.getCmp('txtTes6').getValue();

            if(e==''){

            	 Ext.getCmp('txtTes').setValue('');
                 Ext.getCmp('txtTes2').setValue('');
                 Ext.getCmp('txtTes3').setValue('');
                 Ext.getCmp('txtTes4').setValue('');
                 Ext.getCmp('txtTes5').setValue('');
                 Ext.getCmp('txtTes6').setValue('');
            }
            var b = e.substring(0,2);
            var a = b.length;
            var c = e.substring(3,6);
            var d = c.length;

            var f = e.substring(7,10);
            var g = f.length;

            var ff = e.substring(11,12);
            var gf = ff.length;

            var fff = e.substring(13,16);
            var gff = fff.length;

            var ffff = e.substring(17,20);
            var gfff = ffff.length;

            if(a==2 && m!='done'){
            newValue = e.replace(/.{2}/g, function (substr) {

            Ext.getCmp('txtTes').setValue('done');
            return substr + '.';
            }),

            field.setRawValue(newValue);
            } 

            if(d==3 && n!='dones') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes2').setValue('dones');
            	field.setRawValue(newValue);
            }

            if(g==3 && o!='doness') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes3').setValue('doness');
            	field.setRawValue(newValue);
            }
            
             if(gf==1 && p!='donesss') {
            	newValue = newValue + '-';
            	Ext.getCmp('txtTes4').setValue('donesss');
            	field.setRawValue(newValue);
            }

             if(gff==1 && p!='donessss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes5').setValue('donessss');
            	field.setRawValue(newValue);
            }

             if(gfff==1 && p!='donesssss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes6').setValue('donesssss');
            	field.setRawValue(newValue);
            }
        }
  		 },*/
	};

	var txtKartuKeluarga = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		fieldLabel: 'No Kartu Keluarga',
		id: 'txtKartuKeluarga',
		name: 'txtKartuKeluarga',
		maxLength : 25,
 		enforceMaxLength : true,
		xtype: 'textfield',
		hideTrigger: true
	};

	var txtKotaPenanggungJawabB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Kota',
		id: 'txtKotaPenanggungJawabB',
		name: 'txtKotaPenanggungJawabB',
		xtype: 'textfield'
	};

	var txtTeleponPenanggungJawabB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan no telepon',
		fieldLabel: 'Telepon',
		id: 'txtTeleponPenanggungJawabB',
		name: 'txtTeleponPenanggungJawabB',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtHpPenanggungJawabB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		emptyText: 'Masukkan no handphone',
		fieldLabel: 'Handphone',
		id: 'txtHpPenanggungJawabB',
		name: 'txtHpPenanggungJawabB',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtJabatanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '39.5%',
		labelWidth:130,
		fieldLabel: 'Jabatan',
		id: 'txtJabatanB',
		name: 'txtJabatanB',
		xtype: 'textfield'
	};

	var txtKabupatenKotaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKotaKonsumen',
		name: 'txtKabupatenKotaKonsumen',
		xtype: 'textfield'
	};

	var txtKabupatenKotaKonsumenB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKotaKonsumenB',
		name: 'txtKabupatenKotaKonsumenB',
		xtype: 'textfield'
	};

	var txtHp = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan no handphone',
		fieldLabel: 'HP',
		id: 'txtHp',
		name: 'txtHp',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtEmail = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Email',
		id: 'txtEmail',
		maxLength: 30,
		vtype: 'email',
		name: 'txtEmail',
		xtype: 'textfield'
	};

	var txtEmailB = {
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Email',
		id: 'txtEmailB',
		maxLength: 30,
		vtype: 'email',
		name: 'txtEmailB',
		xtype: 'textfield'
	};

	var txtNoSIUPB = {
		anchor: '80%',
		labelAlign:'right',
		fieldLabel: 'No SIUP',
		id: 'txtNoSIUPB',
		name: 'txtNoSIUPB',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield'
	};

	var txtGroupUsahaB = {
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Group Usaha',
		id: 'txtGroupUsahaB',
		name: 'txtGroupUsahaB',
		xtype: 'textfield'
	};

	var txtNoTDPB = {
		anchor: '80%',
		labelAlign:'right',
		fieldLabel: 'No TDP',
		id: 'txtNoTDPB',
		name: 'txtNoTDPB',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield'
	};

	var txtTeleponBadanUsahaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Telepon',
		fieldLabel: 'No Telepon',
		id: 'txtTeleponBadanUsahaB',
		name: 'txtTeleponBadanUsahaB',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtKeteranganUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Masukkan Keterangan usaha',
		fieldLabel: 'Ket. Usaha/Pekerjaan',
		id: 'txtKeteranganUsaha',
		name: 'txtKeteranganUsaha',
		xtype: 'textfield'
	};

	var txtKeteranganUsahaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Masukkan Keterangan usaha',
		fieldLabel: 'Ket. Usaha/Pekerjaan',
		id: 'txtKeteranganUsahaB',
		name: 'txtKeteranganUsahaB',
		xtype: 'textfield'
	};

	var txtStatusRumah = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtStatusRumah',
		name: 'txtStatusRumah',
		xtype: 'textfield'
	};

	var txtKodeStatusKawin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtKodeStatusKawin',
		name: 'txtKodeStatusKawin',
		xtype: 'textfield'
	};


	var txtTinggalSejak = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Tinggal Sejak',
		id: 'txtTinggalSejak',
		name: 'txtTinggalSejak',
		emptyText: '31',
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'textfield',
		maskRe:/\d/,
		maxLength : 2,
 		enforceMaxLength : true
	};

	var checktjh = {
		boxLabel: 'Tjh (Ya/tidak)',
		style:'margin-left:34px',
		checked: false,
		id: 'checktjh',
		name: 'checktjh',
		xtype: 'checkboxfield',
		listeners : {
		change : {
		    fn : function(checkbox, checked){
		    	
		    	if(checked==true){
		    		 BiayaTJH();
		    	}

		    	else {
		    		//var tjh =  Ext.getCmp('txtTjh').getValue();
		    		var tjh = 0;
		    		Ext.getCmp('txtBiayaTjH').setValue(tjh);
		    	}
		      //your logic
		    }
		  }
		}
	};

	var checktjh2 = {
		boxLabel: 'Tjh (Ya/tidak)',
		style:'margin-left:34px',
		checked: false,
		id: 'checktjh2',
		name: 'checktjh2',
		xtype: 'checkboxfield',
		listeners : {
		change : {
		    fn : function(checkbox, checked){
		    	
		    	if(checked==true){
		    		 BiayaTJH();
		    	}

		    	else {
		    		//var tjh =  Ext.getCmp('txtTjh').getValue();
		    		var tjh = 0;
		    		Ext.getCmp('txtBiayaTjHB').setValue(tjh);
		    	}
		      //your logic
		    }
		  }
		}
	};

	var cekAktif = {
		boxLabel: 'Edit',
		checked: true,
		id: 'cekAktif',
		name: 'cekAktif',
		xtype: 'checkboxfield'
	};


	var txtDealer = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
		html: '<h3 style="margin-right:200px;"><font style="color:red">DEALER</font></h3>',
		htmlAlign:'right',
		height: 17,
		width:62,
   		padding: 0,
	};

	var txtKonsumen = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
		html: '<h3><font style="color:green">KONSUMEN</font></h3>',
		height: 17,
		width:85,
   		padding: 0,
	};

	var txtUangMukaDealerlabel = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '106%',
		allowDecimals: true,
		labelWidth:68,
		labelAlign:'left',
		fieldLabel: 'Uang Muka',
		id: 'txtUangMukaDealerlabel',
		name: 'txtUangMukaDealerlabel',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtUangMukaDealerlabelB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '106%',
		allowDecimals: true,
		labelWidth:68,
		labelAlign:'left',
		fieldLabel: 'Uang Muka',
		id: 'txtUangMukaDealerlabelB',
		name: 'txtUangMukaDealerlabelB',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};


	var txtUangMukaDealer2 = {
		anchor: '140%',
		allowDecimals: true,
		fieldLabel: ' ',
		labelWidth:0,
		id: 'txtUangMukaDealer2',
		name: 'txtUangMukaDealer2',
		//style:'margin-left:-100px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtUangMukaDealer2B = {
		anchor: '140%',
		allowDecimals: true,
		fieldLabel: ' ',
		labelWidth:0,
		id: 'txtUangMukaDealer2B',
		name: 'txtUangMukaDealer2B',
		//style:'margin-left:-100px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};


	var txtBungaFlat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		allowDecimals: true,
		labelWidth:140,
		labelAlign:'left',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		fieldLabel: 'Bunga (%Flat /Efektif)',
		id: 'txtBungaFlat',
		name: 'txtBungaFlat',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlatB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		allowDecimals: true,
		labelWidth:140,
		labelAlign:'left',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		fieldLabel: 'Bunga (%Flat /Efektif)',
		id: 'txtBungaFlatB',
		name: 'txtBungaFlatB',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlat4 = {
		anchor: '100%',
		allowDecimals: true,
		labelWidth:0,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtBungaFlat4',
		name: 'txtBungaFlat4',
		style:'margin-left:0px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlat4B = {
		anchor: '100%',
		allowDecimals: true,
		labelWidth:0,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtBungaFlat4B',
		name: 'txtBungaFlat4B',
		style:'margin-left:0px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlat3 = {
		anchor: '100%',
		allowDecimals: true,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		labelWidth:0,
		id: 'txtBungaFlat3',
		name: 'txtBungaFlat3',
		style:'margin-left:-95px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlat3B = {
		anchor: '100%',
		allowDecimals: true,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		labelWidth:0,
		id: 'txtBungaFlat3B',
		name: 'txtBungaFlat3B',
		style:'margin-left:-95px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};



	var txtBungaFlatDealer = {
		anchor: '46%',
		allowDecimals: true,
		fieldLabel: ' ',
		id: 'txtBungaFlatDealer',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		name: 'txtBungaFlatDealer',
		style:'margin-left:0px',
		xtype: 'numberfield',
		labelWidth:0,
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlatDealerB = {
		anchor: '46%',
		allowDecimals: true,
		fieldLabel: ' ',
		id: 'txtBungaFlatDealerB',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		name: 'txtBungaFlatDealerB',
		style:'margin-left:0px',
		xtype: 'numberfield',
		labelWidth:0,
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		allowDecimals: true,
		labelWidth:140,
		labelAlign:'left',
		fieldLabel: 'Tenor (bln/kali)',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		id: 'txtTenor2',
		name: 'txtTenor2',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor2B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		allowDecimals: true,
		labelWidth:140,
		labelAlign:'left',
		fieldLabel: 'Tenor (bln/kali)',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		id: 'txtTenor2B',
		name: 'txtTenor2B',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor3 = {
		anchor: '46%',
		allowDecimals: true,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtTenor3',
		name: 'txtTenor3',
		style:'margin-left:-100px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor3B = {
		anchor: '46%',
		allowDecimals: true,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtTenor3B',
		name: 'txtTenor3B',
		style:'margin-left:-100px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};



	var txtTenor4 = {
		anchor: '46%',
		allowDecimals: true,
		fieldLabel: ' ',
		id: 'txtTenor4',
		name: 'txtTenor4',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		style:'margin-left:-195px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor4B = {
		anchor: '46%',
		allowDecimals: true,
		fieldLabel: ' ',
		id: 'txtTenor4B',
		name: 'txtTenor4B',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		style:'margin-left:-195px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor5 = {
		anchor: '100%',
		allowDecimals: true,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtTenor5',
		name: 'txtTenor5',
		style:'margin-left:-105px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtTenor5B = {
		anchor: '100%',
		allowDecimals: true,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtTenor5B',
		name: 'txtTenor5B',
		style:'margin-left:-105px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};


	var txtTinggalSejakTahun = {
		afterLabelTextTpl: required,
		anchor: '5%',
		labelAlign:'left',
		style:'margin-left:-40px',
		labelWidth:0,
		fieldLabel: '/',
		emptyText: '2017',
		id: 'txtTinggalSejakTahun',
		name: 'txtTinggalSejakTahun',
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'textfield',
		maskRe:/\d/,
		maxLength : 4,
 		enforceMaxLength : true
	};

	var txtNamaIstri = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Nama Istri',
		fieldLabel: 'Nama',
		id: 'txtNamaIstri',
		name: 'txtNamaIstri',
		xtype: 'textfield'
	};

	var txtNamaPenjamin = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Nama Penjamin',
		fieldLabel: 'Nama',
		id: 'txtNamaPenjamin',
		name: 'txtNamaPenjamin',
		xtype: 'textfield'
	};

	var txtAlamatIstri = {
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		rows: '1',
		fieldLabel: 'Alamat',
		id: 'txtAlamatIstri',
		name: 'txtAlamatIstri',
		xtype: 'textfield'	
	};	

	var txtAlamatPenjamin = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Alamat',
		fieldLabel: 'Alamat',
		id: 'txtAlamatPenjamin',
		name: 'txtAlamatPenjamin',
		xtype: 'textfield'
	};

	var txtNamaPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Masukkan Nama Perusahaan',
		fieldLabel: 'Nama Perusahaan',
		id: 'txtNamaPerusahaan',
		name: 'txtNamaPerusahaan',
		xtype: 'textfield'
	};

	var txtAlamatPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Masukkan Alamat Perusahaan',
		fieldLabel: 'Alamat Perusahaan',
		id: 'txtAlamatPerusahaan',
		name: 'txtAlamatPerusahaan',
		xtype: 'textfield'
	};	

	var txtUsahaPekerjaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Jenis Piutang",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtUsahaPekerjaan',
		name: 'txtUsahaPekerjaan',
		hidden:true,
		xtype: 'textfield'
	};

	var txtKerjaSejak = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Kerja Sejak',
		id: 'txtKerjaSejak',
		name: 'txtKerjaSejak',
		emptyText: '31',
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'textfield',
		maskRe:/\d/,
		maxLength : 2,
 		enforceMaxLength : true
	};

	var txtKerjaSejakTahun = {
		afterLabelTextTpl: required,
		anchor: '5%',
		labelAlign:'left',
		style:'margin-left:-40px',
		labelWidth:0,
		fieldLabel: '/',
		emptyText: '2017',
		id: 'txtKerjaSejakTahun',
		name: 'txtKerjaSejakTahun',
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'textfield',
		maskRe:/\d/,
		maxLength : 4,
 		enforceMaxLength : true
	};

	var txtTlpperiodsusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '195%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Telepon',
		fieldLabel: 'No Telepon',
		id: 'txtTlpperiodsusahaan',
		name: 'txtTlpperiodsusahaan',
		maxLength : 15,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtAlamatKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Alamat Konsumen',
		id: 'txtAlamatKonsumen',
		name: 'txtAlamatKonsumen',
		xtype: 'textfield',
		listeners: {
	    'change': function(field,newValue){
	      //alert(newValue);
	     //Ext.getCmp('txtAlamatIstri').setValue(newValue);
	   		 }
		 }
	};

	var txtKodeKategoriUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtKodeKategoriUsaha',
		name: 'txtKodeKategoriUsaha',
		xtype: 'textfield'
	};

	var txtKodeKategoriUsahaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtKodeKategoriUsahaB',
		name: 'txtKodeKategoriUsahaB',
		xtype: 'textfield'
	};

	var txtJumlahKaryawanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		emptyText: '200',
		fieldLabel: 'Jumlah Karyawan',
		id: 'txtJumlahKaryawanB',
		name: 'txtJumlahKaryawanB',
		maxLength : 10,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtNamaPenanggungJawabB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Enter an Name',
		fieldLabel: 'Penanggung Jawab',
		id: 'txtNamaPenanggungJawabB',
		name: 'txtNamaPenanggungJawabB',
		xtype: 'textfield'
	};


	var txtTeleponIstri = {
		anchor: '130%',
		labelAlign:'right',
		fieldLabel: 'Telepon',
		id: 'txtTeleponIstri',
		name: 'txtTeleponIstri',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 18,
 		enforceMaxLength : true
	};

	var txtTeleponPenjamin = {
		anchor: '130%',
		labelAlign:'right',
		fieldLabel: 'Telepon',
		id: 'txtTeleponPenjamin',
		name: 'txtTeleponPenjamin',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 18,
 		enforceMaxLength : true
	};

	var txtKodeuUsahaKerjaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		hidden:true,
		id: 'txtKodeuUsahaKerjaan',
		name: 'txtKodeuUsahaKerjaan',
		xtype: 'textfield'
	};


	var txtKodeUsahaPenjamin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		hidden:true,
		id: 'txtKodeUsahaPenjamin',
		name: 'txtKodeUsahaPenjamin',
		xtype: 'textfield'
	};

	var txtAlamatUsahaSuamiIstri = {
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: 'Masukkan Alamat Usaha',
		fieldLabel: 'Alamat Usaha',
		id: 'txtAlamatUsahaSuamiIstri',
		name: 'txtAlamatUsahaSuamiIstri',
		xtype: 'textfield'
	};

	var txtAlamatUsahaPenjamin = {
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: 'Masukkan Alamat Usaha',
		fieldLabel: 'Alamat Usaha',
		id: 'txtAlamatUsahaPenjamin',
		name: 'txtAlamatUsahaPenjamin',
		xtype: 'textfield'
	};

	var txtTeleponUsaha = {
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan no telepon',
		fieldLabel: 'Telepon Usaha',
		id: 'txtTeleponUsaha',
		name: 'txtTeleponUsaha',
		enforceMaxLength:true,
		maxLength:15,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield'
	};

	var txtTeleponUsahaPenjamin = {
		anchor: '150%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: 'Masukkan no telepon',
		fieldLabel: 'Telepon Usaha',
		id: 'txtTeleponUsahaPenjamin',
		name: 'txtTeleponUsahaPenjamin',
		enforceMaxLength:true,
		maxLength:15,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield'
	};


	var txtStatusPenjamin = {
		allowBlank: false,
		anchor: '70%',
		labelAlign:'right',
		labelWidth:130,
		enforceMaxLength:true,
		maxLength:20,
		emptyText: 'Masukkan Status',
		fieldLabel: 'Status Penjamin',
		id: 'txtStatusPenjamin',
		name: 'txtStatusPenjamin',
		xtype: 'textfield'
	};

	var txtKeteranganUsahaIstri = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Keterangan usaha',
		fieldLabel: 'Keterangan Usaha',
		id: 'txtKeteranganUsahaIstri',
		name: 'txtKeteranganUsahaIstri',
		xtype: 'textfield'
	};

	var txtKeteranganUsahaPenjamin = {
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: 'Masukkan Keterangan usaha',
		fieldLabel: 'Ket. Usaha',
		id: 'txtKeteranganUsahaPenjamin',
		name: 'txtKeteranganUsahaPenjamin',
		xtype: 'textfield'
	};

	var winGridKodePos3 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos3,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos3,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari15').setValue('');
					winCariKodePos1.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari15',
				name: 'txtCari15',
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
					grupKodePos3.load();
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
				Ext.getCmp('cboKodePosPenjamin').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKabupatenKotaPenjamin').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos3.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodePos3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos3.load();
				vMask.show();
			}
		}
	});

	var cboKodePosPenjamin = {
		anchor: '120%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePosPenjamin',
		name: 'cboKodePosPenjamin',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari15').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKabupatenKotaPenjamin').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos3.show();
					winCariKodePos3.center();
				}
			}
		}
	};

	var winGridUsahaKerja2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupUsahaPekerjaan2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupUsahaPekerjaan2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari14').setValue('');
					winCariUsahaPekerjaan2.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Kategori',
				id: 'txtCari14',
				name: 'txtCari14',
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
					grupUsahaPekerjaan2.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Kategori', dataIndex: 'fs_nama_sektor_ekonomi', menuDisabled: true, width: 240},
			{text: 'Kode Kategori', dataIndex: 'fs_kode_sektor_ekonomi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboUsahaKerjaan').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKodeuUsahaKerjaan').setValue(record.get('fs_kode_sektor_ekonomi'));
				
				winCariUsahaPekerjaan2.hide();
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

	var winCariUsahaPekerjaan2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridUsahaKerja2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupUsahaPekerjaan2.load();
				vMask.show();
			}
		}
	});


	var cboStatusUsahaB = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		displayField: 'fs_nm_status',
		valueField: 'fs_kode_status',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Select Status Usaha',
		fieldLabel: 'Status Usaha',
		id: 'cboStatusUsahaB',
		name: 'cboStatusUsahaB',
		store: grupTrx29B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboBentukUsahaB = {
		afterLabelTextTpl: required,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_bentuk',
		valueField: 'fs_kode_bentuk',
		fieldStyle: 'text-transform: uppercase;',
		fieldLabel: 'Bentuk',
		id: 'cboBentukUsahaB',
		name: 'cboBentukUsahaB',
		store: grupTrx30B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboStatusTempatUsahaB = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		displayField: 'fs_nm_status_tempat',
		valueField: 'fs_kode_status_tempat',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Select Status Tempat Usaha',
		fieldLabel: 'Status Tempat Usaha',
		id: 'cboStatusTempatUsahaB',
		name: 'cboStatusTempatUsahaB',
		store: grupTrx31B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};


	var cboSkalaPerusahaan2B = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		displayField: 'fs_nm_skala',
		valueField: 'fs_kode_skala',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Select Skala Perusahaan',
		fieldLabel: 'Skala Perusahaan',
		id: 'cboSkalaPerusahaan2B',
		name: 'cboSkalaPerusahaan2B',
		store: grupTrx32B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var txtBeroperasiSejakB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: '1998',
		fieldLabel: 'Beroperasi Sejak',
		id: 'txtBeroperasiSejakB',
		name: 'txtBeroperasiSejakB',
		maxLength : 4,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};


	var cboUsahaKerjaan = {
		anchor: '45%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: "Select Usaha/Pekerjaan",
		fieldLabel: 'Usaha/Pekerjaan',
		id: 'cboUsahaKerjaan',
		name: 'cboUsahaKerjaan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari14').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeuUsahaKerjaan').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariUsahaPekerjaan2.show();
					winCariUsahaPekerjaan2.center();
				}
			}
		}
	};

	var cboKodePosIstri = {
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '150%',
		labelAlign:'left',
		labelWidth:130,
		readOnly:true,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePosIstri',
		name: 'cboKodePosIstri',
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
					//winCariKategoriUsaha.show();
					//winCariKategoriUsaha.center();
				}
			}
		}
	};

	var winGridAgama= Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupAgama,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupAgama,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariAgama.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboAgama').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtKodeAgama').setValue(record.get('fs_nilai1_referensi'));
				
				winCariAgama.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariAgama = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridAgama
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupAgama.load();
				vMask.show();
			}
		}
	});

	var cboAgama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		emptyText: "Pilih Agama",
		fieldLabel: 'Agama',
		id: 'cboAgama',
		name: 'cboAgama',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtKodeAgama').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeAgama').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariAgama.show();
					winCariAgama.center();
				}
			}
		}
	};

	var winGridKodePos2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari9').setValue('');
					winCariKodePos2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari9',
				name: 'txtCari9',
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
					grupKodePos2.load();
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
				Ext.getCmp('cboKodePos2').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKabupatenKotaKonsumen').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKodePos2B = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos2B,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari9B').setValue('');
					winCariKodePos2B.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari9B',
				name: 'txtCari9B',
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
					grupKodePos2B.load();
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
				Ext.getCmp('cboKodePos2B').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKabupatenKotaKonsumenB').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos2B.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodePos2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos2.load();
				vMask.show();
			}
		}
	});

	var winCariKodePos2B = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos2B
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos2B.load();
				vMask.show();
			}
		}
	});

	var cboKodePos2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePos2',
		name: 'cboKodePos2',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari9').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKabupatenKotaKonsumen').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos2.show();
					winCariKodePos2.center();
				}
			}
		}
	};

	var winGridKodePos4B = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos4B,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos4B,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari20B').setValue('');
					winCariKodePos2B.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari20B',
				name: 'txtCari20B',
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
					grupKodePos4B.load();
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
				Ext.getCmp('cboKodePos3B').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPenanggungJawabB').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos4B.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodePos4B = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos4B
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos4B.load();
				vMask.show();
			}
		}
	});

	var cboKodePos3B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePos3B',
		name: 'cboKodePos3B',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari20B').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKotaPenanggungJawabB').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos4B.show();
					winCariKodePos4B.center();
				}
			}
		}
	};

	var cboKodePos2B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePos2B',
		name: 'cboKodePos2B',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari9B').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKabupatenKotaKonsumenB').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos2B.show();
					winCariKodePos2B.center();
				}
			}
		}
	};

	var cboFirstTime = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_strx2',
		editable: false,
		fieldLabel: 'Pertama Kali Kredit',
		id: 'cboFirstTime',
		name: 'cboFirstTime',
		store: grupTrxjenkel,
		valueField: 'fs_kd_strx2',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboFirstTimeB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_strx2',
		editable: false,
		fieldLabel: 'Repeat Order',
		id: 'cboFirstTimeB',
		name: 'cboFirstTimeB',
		store: grupTrxjenkelB,
		valueField: 'fs_kd_strx2',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var winGridUsahaKerja = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupUsahaPekerjaan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupUsahaPekerjaan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari7').setValue('');
					winCariUsahaPekerjaan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Pekerjaan',
				id: 'txtCari7',
				name: 'txtCari7',
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
					grupUsahaPekerjaan.load();
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
				Ext.getCmp('cboUsahaPekerjaan').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtUsahaPekerjaan').setValue(record.get('fs_nilai1_referensi'));
				
				winCariUsahaPekerjaan.hide();
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

	var winCariUsahaPekerjaan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridUsahaKerja
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupUsahaPekerjaan.load();
				vMask.show();
			}
		}
	});


	var cboUsahaPekerjaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Usaha/Pekerjaan",
		fieldLabel: 'Usaha/Pekerjaan',
		id: 'cboUsahaPekerjaan',
		name: 'cboUsahaPekerjaan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari7').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtUsahaPekerjaan').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariUsahaPekerjaan.show();
					winCariUsahaPekerjaan.center();
				}
			}
		}
	};


	var winGridSkalaPerusahaan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 550,
		sortableColumns: false,
		store: grupSkalaPerusahaan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupSkalaPerusahaan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari17').setValue('');
					winCariSkalaPerusahaan.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Referensi',
				id: 'txtCari17',
				name: 'txtCari17',
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
					grupSkalaPerusahaan.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Ref', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboSkalaPerusahaan').setValue(record.get('fs_nama_referensi'));
				
				winCariSkalaPerusahaan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariSkalaPerusahaan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridSkalaPerusahaan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupSkalaPerusahaan.load();
				vMask.show();
			}
		}
	});

	var cboSkalaPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Skala Perusahaan',
		id: 'cboSkalaPerusahaan',
		name: 'cboSkalaPerusahaan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
					Ext.getCmp('txtCari17').setValue('');	
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
					winCariSkalaPerusahaan.show();
					winCariSkalaPerusahaan.center();
				}
			}
		}
	};

	var winGridStatusKonsumen = Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupStatusKonsumen,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupStatusKonsumen,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariStatusKonsumen.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboStatusKawin').setValue(record.get('fs_nama_referensi'));

				var kondisi = record.get('fs_nilai1_referensi');

				var combo1 = Ext.ComponentQuery.query('#SuamiIstri')[0];
				var combo2 = Ext.ComponentQuery.query('#Penjamin')[0];

				if(kondisi=='C') {

				 	combo1.setDisabled(true);
				 	combo2.setDisabled(false);

				}

				if(kondisi=='K') {

				 	combo1.setDisabled(false);
				 	combo2.setDisabled(false);

				}


				if(kondisi=='T') {

				 	combo1.setDisabled(true);
				 	combo2.setDisabled(false);

				}
				
				
				winCariStatusKonsumen.hide();
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

	var winCariStatusKonsumen = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridStatusKonsumen
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupStatusKonsumen.load();
				vMask.show();
			}
		}
	});

	var grupKotaBPKBB= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari11B').getValue()
				});
			}
		}
	});

	var grupKotaBPKB= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari11').getValue()
				});
			}
		}
	});

	var winGridKotaBPKB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupKotaBPKB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaBPKB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari11').setValue('');
					winCariKotaBPKB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari11',
				name: 'txtCari11',
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
					grupKotaBPKB.load();
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
				Ext.getCmp('cboKotaBPKB').setValue(record.get('fs_nama_dati'));
				
				winCariKotaBPKB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKotaBPKBB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupKotaBPKBB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaBPKBB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari11B').setValue('');
					winCariKotaBPKBB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari11B',
				name: 'txtCari11B',
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
					grupKotaBPKBB.load();
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
				Ext.getCmp('cboKotaBPKBB').setValue(record.get('fs_nama_dati'));
				
				winCariKotaBPKBB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});


	var winCariKotaBPKB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKotaBPKB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKotaBPKB.load();
				vMask.show();
			}
		}
	});

	var winCariKotaBPKBB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKotaBPKBB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKotaBPKBB.load();
				vMask.show();
			}
		}
	});


	var cboKotaBPKB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: "Select Kota",
		fieldLabel: 'Kota BPKB',
		id: 'cboKotaBPKB',
		name: 'cboKotaBPKB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari11').setValue('');
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
					winCariKotaBPKB.show();
					winCariKotaBPKB.center();
				}
			}
		}
	};
		
	var cboKotaBPKBB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: "Select Kota",
		fieldLabel: 'Kota BPKB',
		id: 'cboKotaBPKBB',
		name: 'cboKotaBPKBB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari11B').setValue('');
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
					winCariKotaBPKBB.show();
					winCariKotaBPKBB.center();
				}
			}
		}
	};
	

	var cboStatusKawin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Pilih Status",
		fieldLabel: 'Status',
		id: 'cboStatusKawin',
		name: 'cboStatusKawin',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {

				var kondisi = Ext.getCmp('txtKodeStatusKawin').getValue();

				var combo1 = Ext.ComponentQuery.query('#SuamiIstri')[0];
				var combo2 = Ext.ComponentQuery.query('#Penjamin')[0];

				if(kondisi=='C') {

				 	combo1.setDisabled(true);
				 	combo2.setDisabled(false);

				}

				if(kondisi=='K') {

				 	combo1.setDisabled(false);
				 	combo2.setDisabled(false);

				}


				if(kondisi=='T') {

				 	combo1.setDisabled(true);
				 	combo2.setDisabled(false);

				}
				
				
				winCariStatusKonsumen.hide();
			},
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
					winCariStatusKonsumen.show();
					winCariStatusKonsumen.center();
				}
			}
		}
	};

	var winGridStatusRumah = Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupStatusRumah,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupStatusRumah,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariStatusRumah.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Referensi', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi 1', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120},
			{text: 'Nilai Referensi 2', dataIndex: 'fs_nilai2_referensi', menuDisabled: true, width: 140},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboStatusRumah').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtStatusRumah').setValue(record.get('fs_nilai1_referensi'));
				
				winCariStatusRumah.hide();
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


	var winCariStatusRumah = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridStatusRumah
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupStatusRumah.load();
				vMask.show();
			}
		}
	});

	var cboStatusRumah= {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '195%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Pilih Status Rumah",
		fieldLabel: 'Status Rumah',
		id: 'cboStatusRumah',
		name: 'cboStatusRumah',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtStatusRumah').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtStatusRumah').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariStatusRumah.show();
					winCariStatusRumah.center();
				}
			}
		}
	};

	var grupKodePos1= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi','fs_kode_dati'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});


	var grupKodePos1B= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi','fs_kode_dati'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2B').getValue()
				});
			}
		}
	});

	var winGridKodePos1 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos1,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos1,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari2').setValue('');
					winCariKodePos1.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Kode Dati', dataIndex: 'fs_kode_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
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
					grupKodePos1.load();
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
				Ext.getCmp('cboKodePos').setValue(record.get('fs_kodepos'));
				Ext.getCmp('cboKodePosIstri').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKelurahan').setValue(record.get('fs_kelurahan'));
				Ext.getCmp('txtKodeDati').setValue(record.get('fs_kode_dati'));
				Ext.getCmp('txtKecamatan').setValue(record.get('fs_kecamatan'));
				Ext.getCmp('txtPropinsi').setValue(record.get('fs_propinsi'));
				Ext.getCmp('txtKabupatenKota').setValue(record.get('fs_nama_dati'));
				Ext.getCmp('txtKabupatenKotaIstri').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos1.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKodePos1B = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos1B,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos1B,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari2B').setValue('');
					winCariKodePos1B.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Kode Dati', dataIndex: 'fs_kode_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari2B',
				name: 'txtCari2B',
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
					grupKodePos1B.load();
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
				Ext.getCmp('cboKodePosB').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKelurahanB').setValue(record.get('fs_kelurahan'));
				Ext.getCmp('txtKodeDatiB').setValue(record.get('fs_kode_dati'));
				Ext.getCmp('txtKecamatanB').setValue(record.get('fs_kecamatan'));
				Ext.getCmp('txtPropinsiB').setValue(record.get('fs_propinsi'));
				Ext.getCmp('txtKabupatenKotaB').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos1B.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodePos1 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos1
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos1.load();
				vMask.show();
			}
		}
	});	

	var winCariKodePos1B = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos1B
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos1B.load();
				vMask.show();
			}
		}
	});



	var winGridKategoriUsaha = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 550,
		sortableColumns: false,
		store: grupKategoriUsaha,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKategoriUsaha,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari6').setValue('');
					winCariKategoriUsaha.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Kategori',
				id: 'txtCari6',
				name: 'txtCari6',
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
					grupKategoriUsaha.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Kategori', dataIndex: 'fs_nama_sektor_ekonomi', menuDisabled: true, width: 240},
			{text: 'Kode Kategori', dataIndex: 'fs_kode_sektor_ekonomi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKategoriUsaha').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKodeKategoriUsaha').setValue(record.get('fs_kode_sektor_ekonomi'));
				
				winCariKategoriUsaha.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKategoriUsahaB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 550,
		sortableColumns: false,
		store: grupKategoriUsahaB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKategoriUsahaB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari6B').setValue('');
					winCariKategoriUsahaB.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Kategori',
				id: 'txtCari6B',
				name: 'txtCari6B',
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
					grupKategoriUsahaB.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Kategori', dataIndex: 'fs_nama_sektor_ekonomi', menuDisabled: true, width: 240},
			{text: 'Kode Kategori', dataIndex: 'fs_kode_sektor_ekonomi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKategoriUsahaB').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKodeKategoriUsahaB').setValue(record.get('fs_kode_sektor_ekonomi'));
				
				winCariKategoriUsahaB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKategoriUsaha = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKategoriUsaha
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKategoriUsaha.load();
				vMask.show();
			}
		}
	});

	var winCariKategoriUsahaB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKategoriUsahaB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKategoriUsahaB.load();
				vMask.show();
			}
		}
	});

	var cboKategoriUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Kategori Usaha",
		fieldLabel: 'Kategori Usaha',
		id: 'cboKategoriUsaha',
		name: 'cboKategoriUsaha',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
					Ext.getCmp('txtCari6').setValue('');
					Ext.getCmp('txtKodeKategoriUsaha').setValue('');	
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeKategoriUsaha').setValue('');	

				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKategoriUsaha.show();
					winCariKategoriUsaha.center();
				}
			}
		}
	};

	var cboKategoriUsahaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Kategori Usaha",
		fieldLabel: 'Kategori Usaha',
		id: 'cboKategoriUsahaB',
		name: 'cboKategoriUsahaB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
					Ext.getCmp('txtCari6B').setValue('');	
					Ext.getCmp('txtKodeKategoriUsahaB').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeKategoriUsahaB').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKategoriUsahaB.show();
					winCariKategoriUsahaB.center();
				}
			}
		}
	};
	var cboKodePosB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePosB',
		name: 'cboKodePosB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari2B').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKelurahanB').setValue('');	
					Ext.getCmp('txtKecamatanB').setValue('');	
					Ext.getCmp('txtPropinsiB').setValue('');	
					Ext.getCmp('txtKabupatenKotaB').setValue('');	
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos1B.show();
					winCariKodePos1B.center();
				}
			}
		}
	};

	var cboKodePos = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePos',
		name: 'cboKodePos',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari2').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKabupatenKota').setValue('');
					Ext.getCmp('txtKabupatenKotaIstri').setValue('');
					Ext.getCmp('cboKodePosIstri').setValue('');
					Ext.getCmp('txtKelurahan').setValue('');	
					Ext.getCmp('txtKecamatan').setValue('');	
					Ext.getCmp('txtPropinsi').setValue('');	
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos1.show();
					winCariKodePos1.center();
				}
			}
		}
	};	

	var txtModelKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Model Kendaraan',
		anchor: '100%',
		hidden:true,
		emptyText: 'Masukkan Model',
		id: 'txtModelKendaraan',
		name: 'txtModelKendaraan',
		xtype: 'textfield'
	};

	var txtJenisKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		readOnly:true,
		id: 'txtJenisKendaraan',
		name: 'txtJenisKendaraan',
		xtype: 'textfield'
	};

	var txtSilinder = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Silinder',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly:true,
		id: 'txtSilinder',
		name: 'txtSilinder',
		xtype: 'textfield'
	};

	var txtTdkAng = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Tdk Ang.',
		anchor: '80%',
		labelWidth:130,
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign:'right',
		id: 'txtTdkAng',
		value:0,
		name: 'txtTdkAng',
		xtype: 'textfield'
	};

	var txtTdkAngB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Tdk Ang.',
		anchor: '80%',
		labelWidth:130,
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign:'right',
		id: 'txtTdkAngB',
		value:0,
		name: 'txtTdkAngB',
		xtype: 'textfield'
	};

	var txtTenorB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Tenor',
		id: 'txtTenorB',
		name: 'txtTenorB',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        enforceMaxLength:true,
        maxLength:2,
        mouseWheelEnabled: false,
         listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);
												  
												      
												    //LuxTax();

												    Ext.getCmp('txtTenor2B').setValue(newValue);

													Ext.getCmp('txtTenor3B').setValue(newValue);	

													Ext.getCmp('txtTenor4B').setValue(newValue);	

													Ext.getCmp('txtTenor5B').setValue(newValue);	

													//PremiGross();

													//Perluasan();

													//BiayaTJH();


													//PremiNett();




												   		 }
													 }
	};

	var txtTenor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Tenor',
		id: 'txtTenor',
		name: 'txtTenor',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        enforceMaxLength:true,
        maxLength:2,
        mouseWheelEnabled: false,
         listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);
												  
												      
												    //LuxTax();

												    Ext.getCmp('txtTenor2').setValue(newValue);

													Ext.getCmp('txtTenor3').setValue(newValue);	

													Ext.getCmp('txtTenor4').setValue(newValue);	

													Ext.getCmp('txtTenor5').setValue(newValue);	

													//PremiGross();

													//Perluasan();

													//BiayaTJH();


													//PremiNett();




												   		 }
													 }
	};

	var txtDimukaKali = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldLabel: 'Kali',
		disabled:true,
		id: 'txtDimukaKali',
		name: 'txtDimukaKali',
		value: 1,
		readOnly:true,
		xtype: 'textfield',
		listeners: {
												    'change': function(field,newValue){
												    //angsdimuka();

												     //pokokpembiayaan();

												     //bunga();

												      //PremiGross();

												      //Perluasan();

												     // BiayaTJH();

												   // PremiNett();

												    // uangmuka();
												   		 }
													 }
	};

	var txtDimukaKaliB = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldLabel: 'Kali',
		disabled:true,
		id: 'txtDimukaKaliB',
		name: 'txtDimukaKaliB',
		value: 1,
		readOnly:true,
		xtype: 'textfield',
		listeners: {
												    'change': function(field,newValue){
												    //angsdimuka();

												     //pokokpembiayaan();

												     //bunga();

												      //PremiGross();

												      //Perluasan();

												     // BiayaTJH();

												   // PremiNett();

												    // uangmuka();
												   		 }
													 }
	};

	var txtWarna = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Warna',
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		emptyText: 'Masukkan warna',
		id: 'txtWarna',
		name: 'txtWarna',
		xtype: 'textfield'
	};

	var txtNamaBpkb = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Nama di BPKB',
		anchor: '100%',
		readOnly:true,
		labelAlign:'left',
		labelWidth:130,
		id: 'txtNamaBpkb',
		name: 'txtNamaBpkb',
		xtype: 'textfield'
	};

	var txtNamaBpkbB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Nama di BPKB',
		anchor: '100%',
		readOnly:true,
		labelAlign:'left',
		labelWidth:130,
		id: 'txtNamaBpkbB',
		name: 'txtNamaBpkbB',
		xtype: 'textfield'
	};

	var txtAlamatbpkb = {
		afterLabelTextTpl: required,
		allowBlank: false,
		readOnly:true,
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Alamat di BPKB',
		id: 'txtAlamatbpkb',
		name: 'txtAlamatbpkb',
		xtype: 'textfield'
	};

	var txtAlamatbpkbB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		readOnly:true,
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Alamat di BPKB',
		id: 'txtAlamatbpkbB',
		name: 'txtAlamatbpkbB',
		xtype: 'textfield'
	};


	var txtNorangka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'No rangka',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		maxLength : 25,
 		enforceMaxLength : true,
		emptyText: 'Masukkan No rangka',
		id: 'txtNorangka',
		name: 'txtNorangka',
		xtype: 'textfield'
	};

	var txtNomesin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'No mesin',
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		maxLength : 25,
 		enforceMaxLength : true,
		emptyText: 'Masukkan No mesin',
		id: 'txtNomesin',
		name: 'txtNomesin',
		xtype: 'textfield'
	};

	var txtNomorBpkb = {
		fieldLabel: 'Nomor BPKB',
		anchor: '230%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan No BPKB',
		id: 'txtNomorBpkb',
		enforceMaxLength:true,
		maxLength:15,
		//disabled:true,
		name: 'txtNomorBpkb',
		xtype: 'textfield'
	};	


	var txtNomorBpkbB = {
		fieldLabel: 'Nomor BPKB',
		anchor: '230%',
		labelAlign:'left',
		labelWidth:130,
		//disabled:true,
		emptyText: 'Masukkan No BPKB',
		id: 'txtNomorBpkbB',
		enforceMaxLength:true,
		maxLength:15,
		name: 'txtNomorBpkbB',
		xtype: 'textfield'
	};	

	var grupNopol = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_plat','fs_wilayah','fs_kode_wilayah'
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
			url: 'apknew/ambil_plat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari80').getValue()
				});
			}
		}
	});

	var grupNopolB = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_plat','fs_wilayah','fs_kode_wilayah'
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
			url: 'apknew/ambil_plat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari80B').getValue()
				});
			}
		}
	});

	var winGridNoPol= Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupNopol,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupNopol,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari80').setValue('');
					winCariNoPol.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Wilayah',
				id: 'txtCari80',
				name: 'txtCari80',
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
					grupNopol.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Plat', dataIndex: 'fs_kode_plat', menuDisabled: true, width: 240},
			{text: 'Wilayah', dataIndex: 'fs_wilayah', menuDisabled: true, width: 240},
			{text: 'Kode Wilayah Asuransi', dataIndex: 'fs_kode_wilayah', menuDisabled: true, width: 240}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNopol').setValue(record.get('fs_kode_plat'));
				Ext.getCmp('txtWilayahAsuransi').setValue(record.get('fs_kode_wilayah'));
				
				winCariNoPol.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridNoPolB= Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupNopolB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupNopolB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari80B').setValue('');
					winCariNoPolB.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Wilayah',
				id: 'txtCari80B',
				name: 'txtCari80B',
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
					grupNopolB.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Plat', dataIndex: 'fs_kode_plat', menuDisabled: true, width: 240},
			{text: 'Wilayah', dataIndex: 'fs_wilayah', menuDisabled: true, width: 240},
			{text: 'Kode Wilayah Asuransi', dataIndex: 'fs_kode_wilayah', menuDisabled: true, width: 240}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNopolB').setValue(record.get('fs_kode_plat'));
				Ext.getCmp('txtWilayahAsuransiB').setValue(record.get('fs_kode_wilayah'));
				
				winCariNoPolB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});
	

	var winCariNoPol = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridNoPol
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupNopol.load();
				vMask.show();
			}
		}
	});

	var winCariNoPolB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridNoPolB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupNopolB.load();
				vMask.show();
			}
		}
	});
	

	var cboNopol = {
		editable:false,
		fieldLabel: 'Nomor Polisi',
		anchor: '100%',
		style:'margin-left:120px',
		labelAlign:'right',
		fieldStyle: 'text-transform:uppercase;text-align:center',
		labelWidth:130,
		enforceMaxLength:true,
		maxLength:2,
		id: 'cboNopol',
		name: 'cboNopol',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari80').setValue('');
				Ext.getCmp('txtWilayahAsuransi').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtWilayahAsuransi').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariNoPol.show();
					winCariNoPol.center();
				}
			}
		}
	};

	var cboNopolB = {
		editable:false,
		fieldLabel: 'Nomor Polisi',
		anchor: '100%',
		style:'margin-left:120px',
		labelAlign:'right',
		fieldStyle: 'text-transform:uppercase;text-align:center',
		labelWidth:130,
		enforceMaxLength:true,
		maxLength:2,
		id: 'cboNopolB',
		name: 'cboNopolB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari80B').setValue('');
				Ext.getCmp('txtWilayahAsuransiB').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtWilayahAsuransiB').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariNoPolB.show();
					winCariNoPolB.center();
				}
			}
		}
	};


	var txtNoPol2 = {
		anchor: '10%',
		enforceMaxLength:true,
		maxLength:4,
		style:'margin-left:-45px',
		id: 'txtNoPol2',
		fieldStyle: 'text-align:center',
		name: 'txtNoPol2',
		hideTrigger:true,
		xtype: 'numberfield'
	};

	var txtNoPol3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '-90%',
		//disabled:true,
		enforceMaxLength:true,
		maxLength:3,
		style:'margin-left:-200px',
		fieldStyle: 'text-transform:uppercase;text-align:center',
		id: 'txtNoPol3',
		name: 'txtNoPol3',
		xtype: 'textfield',
		maskRe: /[a-z,A-Z]/
	};	

	var txtNoPol2B = {
		anchor: '10%',
		//disabled:true,
		enforceMaxLength:true,
		maxLength:4,
		style:'margin-left:-45px',
		id: 'txtNoPol2B',
		fieldStyle: 'text-align:center',
		name: 'txtNoPol2B',
		hideTrigger:true,
		xtype: 'numberfield'
	};

	var txtNoPol3B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '-90%',
		enforceMaxLength:true,
		maxLength:3,
		//disabled:true,
		style:'margin-left:-200px',
		fieldStyle: 'text-transform:uppercase;text-align:center',
		id: 'txtNoPol3B',
		name: 'txtNoPol3B',
		xtype: 'textfield',
		maskRe: /[a-z,A-Z]/
	};	

	var txtNilaiAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Name',
		hidden:true,
		id: 'txtNilaiAsuransi',
		name: 'txtNilaiAsuransi',
		xtype: 'textfield'
	};

	var txtNilaiAsuransiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Name',
		hidden:true,
		id: 'txtNilaiAsuransiB',
		name: 'txtNilaiAsuransiB',
		xtype: 'textfield'
	};

	var txtTahun = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Tahun',
		id: 'txtTahun',
		name: 'txtTahun',
		value: 0,
		xtype: 'numberfield',
		maxLength : 4,
 		enforceMaxLength : true,
		minValue: 0, 
		listeners: {
			change: function(field, newValue) {

				//PremiNett();

				//PremiGross();
			}
		},
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtModelKendaraanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Model Kendaraan',
		anchor: '100%',
		hidden:true,
		emptyText: 'Masukkan Model',
		id: 'txtModelKendaraanB',
		name: 'txtModelKendaraanB',
		xtype: 'textfield'
	};

	
	var txtJenisKendaraanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		readOnly:true,
		id: 'txtJenisKendaraanB',
		name: 'txtJenisKendaraanB',
		xtype: 'textfield'
	};
	
	var txtTahunB = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Tahun',
		id: 'txtTahunB',
		name: 'txtTahunB',
		value: 0,
		xtype: 'numberfield',
		maxLength : 4,
 		enforceMaxLength : true,
		minValue: 0, 
		listeners: {
			change: function(field, newValue) {

				///PremiNett();

				///PremiGross();

				//BiayaTJH();

				///Perluasan();
			}
		},
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtWarnaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Warna',
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		emptyText: 'Masukkan warna',
		id: 'txtWarnaB',
		name: 'txtWarnaB',
		xtype: 'textfield'
	};



	var txtNorangkaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'No rangka',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		maxLength : 25,
 		enforceMaxLength : true,
		emptyText: 'Masukkan No rangka',
		id: 'txtNorangkaB',
		name: 'txtNorangkaB',
		xtype: 'textfield'
	};

	var txtNomesinB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'No mesin',
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		maxLength : 25,
 		enforceMaxLength : true,
		emptyText: 'Masukkan No mesin',
		id: 'txtNomesinB',
		name: 'txtNomesinB',
		xtype: 'textfield'
	};


	var txtSilinderB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Silinder',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly:true,
		id: 'txtSilinderB',
		name: 'txtSilinderB',
		xtype: 'textfield'
	};

	var winGridModelKendaraan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 850,
		sortableColumns: false,
		store: grupModelKendaraan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupModelKendaraan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari10').setValue('');
					winCariModelKendaraan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Merek Kendaraan', dataIndex: 'fs_merek_kendaraan', menuDisabled: true, width: 240},
			{text: 'Model Kendaraan', dataIndex: 'fs_model_kendaraan', menuDisabled: true, width: 120},
			{text: 'Jenis Kendaraan', dataIndex: 'fs_jenis_kendaraan', menuDisabled: true, width: 140},
			{text: 'Silinder', dataIndex: 'fs_silinder_kendaraan', menuDisabled: true, width: 140},
			{text: 'Kode Kendaraan', dataIndex: 'fs_kode_kendaraan', menuDisabled: true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Merek Kendaraan / Model Kendaraan / Jenis Kendaraan / Kode Kendaraan',
				id: 'txtCari10',
				name: 'txtCari10',
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
					grupModelKendaraan.load();
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
				Ext.getCmp('cboModelKendaraan').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtModelKendaraan').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtJenisKendaraan').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('txtSilinder').setValue(record.get('fs_silinder_kendaraan'));
				
				winCariModelKendaraan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridModelKendaraanB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 850,
		sortableColumns: false,
		store: grupModelKendaraanB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupModelKendaraanB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari10B').setValue('');
					winCariModelKendaraanB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Merek Kendaraan', dataIndex: 'fs_merek_kendaraan', menuDisabled: true, width: 240},
			{text: 'Model Kendaraan', dataIndex: 'fs_model_kendaraan', menuDisabled: true, width: 120},
			{text: 'Jenis Kendaraan', dataIndex: 'fs_jenis_kendaraan', menuDisabled: true, width: 140},
			{text: 'Silinder', dataIndex: 'fs_silinder_kendaraan', menuDisabled: true, width: 140},
			{text: 'Kode Kendaraan', dataIndex: 'fs_kode_kendaraan', menuDisabled: true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Merek Kendaraan / Model Kendaraan / Jenis Kendaraan / Kode Kendaraan',
				id: 'txtCari10B',
				name: 'txtCari10B',
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
					grupModelKendaraanB.load();
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
				Ext.getCmp('cboModelKendaraanB').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtModelKendaraanB').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtJenisKendaraanB').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('txtSilinderB').setValue(record.get('fs_silinder_kendaraan'));
				
				winCariModelKendaraanB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariModelKendaraan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridModelKendaraan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupModelKendaraan.load();
				vMask.show();
			}
		}
	});

	var winCariModelKendaraanB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridModelKendaraanB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupModelKendaraanB.load();
				vMask.show();
			}
		}
	});

	var cboModelKendaraanB = {
		style:'margin-top:10px',
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Model Kendaraan",
		fieldLabel: 'Model Kendaraan',
		id: 'cboModelKendaraanB',
		name: 'cboModelKendaraanB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari10B').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtJenisKendaraanB').setValue('');
					Ext.getCmp('txtSilinderB').setValue('');
					Ext.getCmp('txtModelKendaraanB').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariModelKendaraanB.show();
					winCariModelKendaraanB.center();
				}
			}
		}
	};

	var cboModelKendaraan = {
		style:'margin-top:10px',
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Model Kendaraan",
		fieldLabel: 'Model Kendaraan',
		id: 'cboModelKendaraan',
		name: 'cboModelKendaraan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari10').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtJenisKendaraan').setValue('');
					Ext.getCmp('txtSilinder').setValue('');
					Ext.getCmp('txtModelKendaraan').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariModelKendaraan.show();
					winCariModelKendaraan.center();
				}
			}
		}
	};



	var gridAsuransi = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 270,
		sortable : true,
		store: grupAsuransiMix,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},
		{
			dataIndex: 'fs_tenor',
			text: 'Tenor',
			flex: 0.5,
			hidden:true,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_tahun_ke',
			text: 'Tahun Ke',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_jenis_asuransi',
			text: 'Jenis Asuransi',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridAsuransi.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
					afterLabelTextTpl: required,
					allowBlank: false,
					anchor: '90%',
					labelAlign:'top',
					labelSeparator: '',
					fieldLabel: 'Tenor',
					id: 'txtTenorMIX',
					name: 'txtTenorMIX',
					value: 0,
			        xtype: 'numberfield',
			        minValue: 0, 
			        hideTrigger: true,
			        keyNavEnabled: false,
			        enforceMaxLength:true,
			        maxLength:2,
			        mouseWheelEnabled: false,
			         listeners: {
			         	'change': function(field,newValue){

			         		  var combo = Ext.getCmp('cboTahunKe');
			         		 // Ext.getCmp('txtTenor').setValue(newValue);
			         		 //// Ext.getCmp('txtTenor2').setValue(newValue);
			         		  //Ext.getCmp('txtTenor3').setValue(newValue);
			         		  //Ext.getCmp('txtTenor4').setValue(newValue);
			         		  //Ext.getCmp('txtTenor5').setValue(newValue);
			         		 // Ext.getCmp('txtTenor6').setValue(newValue);
						         //I'm not sure what params you will need to reload the comboBox from your
						         // service but hopfully this will give the jist of things. . .

						         combo.store.reload(
						                  {   
						                     params: 
						                         {'fs_tenor' : newValue}
						                    });

									 }
																 
					}
				}
			]
		},
		{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '80%',
		labelAlign:'top',
		valueField: 'fs_kd_strx9',
		displayField: 'fs_nm_strx9',
		fieldLabel: 'Tahun Ke',
		id: 'cboTahunKe',
		name: 'cboTahunKe',
		store: grupTahunke,
		xtype: 'combobox',
		editable:false,
		value:' '
			}
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '50%',
		labelAlign:'top',
		valueField: 'fs_kd_strx11',
		displayField: 'fs_nm_strx11',
		fieldLabel: 'Jenis Asuransi',
		editable:false,
		id: 'cboJenisAsuransiMix',
		name: 'cboJenisAsuransiMix',
		store: grupJenisAsuransiMIX,
		xtype: 'combobox',
		value:' '
			}
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupAsuransiMix.getCount();
									var xprod = Ext.getCmp('cboTahunKe').getValue();
									var xdata = Ext.create('DataGridAsuransi', {
										fs_tahun_ke: Ext.getCmp('cboTahunKe').getValue(),
										fs_tenor: Ext.getCmp('txtTenorMIX').getValue(),
										fs_jenis_asuransi: Ext.getCmp('cboJenisAsuransiMix').getValue()
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridAsuransi.getStore();
									var xlanjut = true;


									store.each(function(record, idx) {
										var xtext = record.get('fs_tahun_ke').trim();
										
										if (xtext == xprod) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tahun ke already exists, add cancel!!',
												title: 'IDS'
											});
											xlanjut = false;
										}
										
									});
									if (xlanjut === false) {
										return;
									}

									var xwh = Ext.getCmp('cboJenisAsuransiMix').getValue();
									if (xwh.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Jenis Asuransi masih kosong!',
											title: 'SIAP'
										});
										return;
									}
									/*

									var xwz = Ext.getCmp('cboTambahCair').getValue();
									if (xwz.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tambah Cair masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwa = Ext.getCmp('cboKodeTrans').getValue();
									if (xwa.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Kode Transaksi masih kosong!',
											title: 'SIAP'
										});
										return;
									}
									*/

									
									if (xlanjut === false) {
										return;
									}
									
									grupAsuransiMix.insert(xtotal, xdata);
									Ext.getCmp('cboJenisAsuransiMix').setValue('');
									Ext.getCmp('cboTahunKe').setValue('');
																			
									xtotal = grupAsuransiMix.getCount() - 1;
									gridAsuransi.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridAsuransi.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupAsuransiMix.remove(sm.getSelection());
					gridAsuransi.getView().refresh();
					if (grupAsuransiMix.getCount() > 0) {
						sm.select(0);
					}
					
					var xprod = Ext.getCmp('cboTahunKe').getValue();
					var xQty = 0;
					store = gridAsuransi.getStore();
					store.each(function(record, idx) {
						
					});
					gridAsuransi.getView().refresh();
					
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var gridAsuransiB = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 270,
		sortable : true,
		store: grupAsuransiMixB,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},
		{
			dataIndex: 'fs_tenor',
			text: 'Tenor',
			flex: 0.5,
			hidden:true,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_tahun_ke',
			text: 'Tahun Ke',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_jenis_asuransi',
			text: 'Jenis Asuransi',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridAsuransiB.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
					afterLabelTextTpl: required,
					allowBlank: false,
					anchor: '90%',
					labelAlign:'top',
					labelSeparator: '',
					fieldLabel: 'Tenor',
					id: 'txtTenorMIXB',
					name: 'txtTenorMIXB',
					value: 0,
			        xtype: 'numberfield',
			        minValue: 0, 
			        hideTrigger: true,
			        keyNavEnabled: false,
			        enforceMaxLength:true,
			        maxLength:2,
			        mouseWheelEnabled: false,
			         listeners: {
			         	'change': function(field,newValue){

			         		  var combo = Ext.getCmp('cboTahunKeB');
			         		 // Ext.getCmp('txtTenor').setValue(newValue);
			         		 //// Ext.getCmp('txtTenor2').setValue(newValue);
			         		  //Ext.getCmp('txtTenor3').setValue(newValue);
			         		  //Ext.getCmp('txtTenor4').setValue(newValue);
			         		  //Ext.getCmp('txtTenor5').setValue(newValue);
			         		 // Ext.getCmp('txtTenor6').setValue(newValue);
						         //I'm not sure what params you will need to reload the comboBox from your
						         // service but hopfully this will give the jist of things. . .

						         combo.store.reload(
						                  {   
						                     params: 
						                         {'fs_tenor' : newValue}
						                    });

									 }
																 
					}
				}
			]
		},
		{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '80%',
		labelAlign:'top',
		valueField: 'fs_kd_strx9',
		displayField: 'fs_nm_strx9',
		fieldLabel: 'Tahun Ke',
		id: 'cboTahunKeB',
		name: 'cboTahunKeB',
		store: grupTahunkeB,
		xtype: 'combobox',
		editable:false,
		value:' '
			}
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '50%',
		labelAlign:'top',
		valueField: 'fs_kd_strx11',
		displayField: 'fs_nm_strx11',
		fieldLabel: 'Jenis Asuransi',
		editable:false,
		id: 'cboJenisAsuransiMixB',
		name: 'cboJenisAsuransiMixB',
		store: grupJenisAsuransiMIXB,
		xtype: 'combobox',
		value:' '
			}
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupAsuransiMixB.getCount();
									var xprod = Ext.getCmp('cboTahunKeB').getValue();
									var xdata = Ext.create('DataGridAsuransiB', {
										fs_tahun_ke: Ext.getCmp('cboTahunKeB').getValue(),
										fs_tenor: Ext.getCmp('txtTenorMIXB').getValue(),
										fs_jenis_asuransi: Ext.getCmp('cboJenisAsuransiMixB').getValue()
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridAsuransiB.getStore();
									var xlanjut = true;


									store.each(function(record, idx) {
										var xtext = record.get('fs_tahun_ke').trim();
										
										if (xtext == xprod) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tahun ke already exists, add cancel!!',
												title: 'IDS'
											});
											xlanjut = false;
										}
										
									});
									if (xlanjut === false) {
										return;
									}

									var xwh = Ext.getCmp('cboJenisAsuransiMixB').getValue();
									if (xwh.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Jenis Asuransi masih kosong!',
											title: 'SIAP'
										});
										return;
									}
									/*

									var xwz = Ext.getCmp('cboTambahCair').getValue();
									if (xwz.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tambah Cair masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwa = Ext.getCmp('cboKodeTrans').getValue();
									if (xwa.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Kode Transaksi masih kosong!',
											title: 'SIAP'
										});
										return;
									}
									*/

									
									if (xlanjut === false) {
										return;
									}
									
									grupAsuransiMixB.insert(xtotal, xdata);
									Ext.getCmp('cboJenisAsuransiMixB').setValue('');
									Ext.getCmp('cboTahunKeB').setValue('');
																			
									xtotal = grupAsuransiMixB.getCount() - 1;
									gridAsuransiB.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridAsuransiB.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupAsuransiMixB.remove(sm.getSelection());
					gridAsuransiB.getView().refresh();
					if (grupAsuransiMixB.getCount() > 0) {
						sm.select(0);
					}
					
					var xprod = Ext.getCmp('cboTahunKeB').getValue();
					var xQty = 0;
					store = gridAsuransiB.getStore();
					store.each(function(record, idx) {
						
					});
					gridAsuransiB.getView().refresh();
					
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var winAsuransi = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		// height: 450,
		layout: 'fit',
		resizable: false,
		title: 'Asuransi MIX',
		width: 600,
		items: [
			gridAsuransi
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupAsuransiMix.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'Save',
			handler: function() {
				
				//fnCekSaveMix();

				var xtotal = grupAsuransiMix.getCount();

				var xprod = Ext.getCmp('txtTenorMIX').getValue();

				if (xprod>0 && xprod <=12){
					var tenor = 1;
				}

				if (xprod>12 && xprod <=24){
					var tenor = 2;
				}

				if (xprod>24 && xprod <=36){
					var tenor = 3;
				}

				if (xprod>36 && xprod <=48){
					var tenor = 4;
				}

				if (xprod>48){
					var tenor = 4;
				}
				
				var xlanjut = true;

				if (xtotal < tenor) {
					Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tahun Belum lengkap!!',
												title: 'SIAP'
											});
											xlanjut = false;
				}
				if (xlanjut === false) {
										return;
				}

				//fnCekSaveMix();

				if(xlanjut === true){

					saveMix();
					vMask.hide();
						winAsuransi.hide();
				}

			}
			},
			{
					text: 'Cancel',
					handler: function() {
						vMask.hide();
						winAsuransi.hide();
					}
				}

			]
	});

	var winAsuransiB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		// height: 450,
		layout: 'fit',
		resizable: false,
		title: 'Asuransi MIX',
		width: 600,
		items: [
			gridAsuransiB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupAsuransiMixB.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'Save',
			handler: function() {
				
				//fnCekSaveMix();

				var xtotal = grupAsuransiMix.getCount();

				var xprod = Ext.getCmp('txtTenorMIXB').getValue();

				if (xprod>0 && xprod <=12){
					var tenor = 1;
				}

				if (xprod>12 && xprod <=24){
					var tenor = 2;
				}

				if (xprod>24 && xprod <=36){
					var tenor = 3;
				}

				if (xprod>36 && xprod <=48){
					var tenor = 4;
				}

				if (xprod>48){
					var tenor = 4;
				}
				
				var xlanjut = true;

				if (xtotal < tenor) {
					Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tahun Belum lengkap!!',
												title: 'SIAP'
											});
											xlanjut = false;
				}
				if (xlanjut === false) {
										return;
				}

				//fnCekSaveMix();

				if(xlanjut === true){

					///saveMixB();
					vMask.hide();
						winAsuransiB.hide();
				}

			}
			},
			{
					text: 'Cancel',
					handler: function() {
						vMask.hide();
						winAsuransiB.hide();
					}
				}

			]
	});

	var txtTotalTrans = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Total Trans',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtTotalTrans',
				name: 'txtTotalTrans',
				xtype: 'textfield',
				 listeners: {
												    'change': function(field,newValue){

												    //pokokpembiayaan();

												    //bunga();

												    //PremiGross();

												   // PremiNett();

												   // selisihDp();

												      

												   		 }
													 }
	};

	var txtTotalTransB = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Total Trans',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtTotalTransB',
				name: 'txtTotalTransB',
				xtype: 'textfield',
				 listeners: {
												    'change': function(field,newValue){

												    //pokokpembiayaan();

												    //bunga();

												    //PremiGross();

												   // PremiNett();

												   // selisihDp();

												      

												   		 }
													 }
	};

	var txtSelisihDp = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
		html: '<h4><font style="color:black">Selisih Total DP :</font> <font style="color:red">Rp.<input type="hidden" id="total_trx" name="total_trx" readonly></font></h4>',
		htmlAlign:'right',
		height: 20,
		width:135,
   		padding: 0,
	};

	var txtSelisihDpB = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
		html: '<h4><font style="color:black">Selisih Total DP :</font> <font style="color:red">Rp.<input type="hidden" id="total_trxB" name="total_trxB" readonly></font></h4>',
		htmlAlign:'right',
		height: 20,
		width:135,
   		padding: 0,
	};

	var cboAngsuranDibayarDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		fieldLabel: 'Angs Dibayar Dealer',
		displayField: 'fs_angs_dealer',
		id: 'cboAngsuranDibayarDealer',
		name: 'cboAngsuranDibayarDealer',
		store: grupTrx16,
		valueField: 'fs_kd_angs_dealer',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};

	var cboAngsuranDibayarDealerB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		fieldLabel: 'Angs Dibayar Dealer',
		displayField: 'fs_angs_dealer',
		id: 'cboAngsuranDibayarDealerB',
		name: 'cboAngsuranDibayarDealerB',
		store: grupTrx16B,
		valueField: 'fs_kd_angs_dealer',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};

	var txtTotalTrans2B = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Total Trans',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtTotalTrans2B',
				name: 'txtTotalTrans2B',
				xtype: 'textfield',
				listeners: {
												    'change': function(field,newValue){

												   // pokokpembiayaan();

												   // bunga();

												    //PremiGross();

												    //PremiNett();

												    //selisihDp();

												    //NilaiCair();

												      

												   		 }
													 }
	};

	var txtTotalTrans2 = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Total Trans',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtTotalTrans2',
				name: 'txtTotalTrans2',
				xtype: 'textfield',
				listeners: {
												    'change': function(field,newValue){

												   // pokokpembiayaan();

												   // bunga();

												    //PremiGross();

												    //PremiNett();

												    //selisihDp();

												    //NilaiCair();

												      

												   		 }
													 }
	};

	var winGridJenisAsuransi = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 550,
		sortableColumns: false,
		store: grupJenisAsuransi,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJenisAsuransi,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari12').setValue('');
					winCariJenisAsuransi.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Jenis Asuransi',
				id: 'txtCari12',
				name: 'txtCari12',
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
					grupJenisAsuransi.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Jenis', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboAsuransi').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtNilaiAsuransi').setValue(record.get('fs_nilai1_referensi'));

				if(record.get('fs_nama_referensi') == 'MIX'){

					vMask.show();
					winAsuransi.show();
					winAsuransi.center();

				}
				
				winCariJenisAsuransi.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridJenisAsuransiB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 550,
		sortableColumns: false,
		store: grupJenisAsuransiB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJenisAsuransiB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari12B').setValue('');
					winCariJenisAsuransiB.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Jenis Asuransi',
				id: 'txtCari12B',
				name: 'txtCari12B',
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
					grupJenisAsuransiB.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Jenis', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Nilai Referensi', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboAsuransiB').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtNilaiAsuransiB').setValue(record.get('fs_nilai1_referensi'));

				if(record.get('fs_nama_referensi') == 'MIX'){

					vMask.show();
					winAsuransiB.show();
					winAsuransiB.center();

				}
				
				winCariJenisAsuransiB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariJenisAsuransi = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridJenisAsuransi
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupJenisAsuransi.load();
				vMask.show();
			}
		}
	});

	var winCariJenisAsuransiB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridJenisAsuransiB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupJenisAsuransiB.load();
				vMask.show();
			}
		}
	});


	var cboAsuransiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '323%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Jenis Asuransi",
		fieldLabel: 'Jenis Asuransi',
		id: 'cboAsuransiB',
		name: 'cboAsuransiB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
					Ext.getCmp('txtCari12B').setValue('');	
					Ext.getCmp('txtNilaiAsuransiB').setValue('');

					//PremiNett();

					//PremiGross();	

					//Perluasan();

					//BiayaTJH();
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');

					//grupAsuransiMix.removeAll();
					//gridAsuransi.getView().refresh();
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariJenisAsuransiB.show();
					winCariJenisAsuransiB.center();
				}
			}
		}
	};

	var cboAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '323%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Jenis Asuransi",
		fieldLabel: 'Jenis Asuransi',
		id: 'cboAsuransi',
		name: 'cboAsuransi',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
					Ext.getCmp('txtCari12').setValue('');	
					Ext.getCmp('txtNilaiAsuransi').setValue('');

					//PremiNett();

					//PremiGross();	

					//Perluasan();

					//BiayaTJH();
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');

					//grupAsuransiMix.removeAll();
					//gridAsuransi.getView().refresh();
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariJenisAsuransi.show();
					winCariJenisAsuransi.center();
				}
			}
		}
	};

	var txtKodeAsuransi1 = {
		anchor: '100%',
		id: 'txtKodeAsuransi1',
		name: 'txtKodeAsuransi1',
		hidden: true,
		xtype: 'textfield'
	};

	var txtKodeAsuransi2 = {
		anchor: '100%',
		id: 'txtKodeAsuransi2',
		name: 'txtKodeAsuransi2',
		hidden: true,
		xtype: 'textfield'
	};	

	var txtKodeAsuransi1B = {
		anchor: '100%',
		id: 'txtKodeAsuransi1B',
		name: 'txtKodeAsuransi1B',
		hidden: true,
		xtype: 'textfield'
	};

	var txtKodeAsuransi2B = {
		anchor: '100%',
		id: 'txtKodeAsuransi2B',
		name: 'txtKodeAsuransi2B',
		hidden: true,
		xtype: 'textfield'
	};	

	var txtKodeDealer1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kode Dealer',
		anchor: '80%',
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign:'left',
		labelWidth:130,
		id: 'txtKodeDealer1',
		name: 'txtKodeDealer1',
		xtype: 'textfield'
	};

	var txtKodeDealer1B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kode Dealer',
		anchor: '80%',
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign:'left',
		labelWidth:130,
		id: 'txtKodeDealer1B',
		name: 'txtKodeDealer1B',
		xtype: 'textfield'
	};

	var txtSales = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Sales',
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		emptyText: 'Masukkan Sales',
		id: 'txtSales',
		name: 'txtSales',
		xtype: 'textfield'
	};

	var txtSalesB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Sales',
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		emptyText: 'Masukkan Sales',
		id: 'txtSalesB',
		name: 'txtSalesB',
		xtype: 'textfield'
	};


	var txtKodeDealer2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '-40%',
		style:'margin-left:-130px',
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKodeDealer2',
		name: 'txtKodeDealer2',
		xtype: 'textfield'
	};

	var txtKodeDealer2B = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '-40%',
		style:'margin-left:-130px',
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKodeDealer2B',
		name: 'txtKodeDealer2B',
		xtype: 'textfield'
	};

	var txtRefundDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		hidden:true,
		id: 'txtRefundDealer',
		name: 'txtRefundDealer',
		xtype: 'textfield'
	};

	var txtRefundDealerB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		hidden:true,
		id: 'txtRefundDealerB',
		name: 'txtRefundDealerB',
		xtype: 'textfield'
	};


	var txtCabangDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Cabang Dealer',
		anchor: '1%',
		style:'margin-left:-194px',
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign:'right',
		labelWidth:130,
		id: 'txtCabangDealer',
		name: 'txtCabangDealer',
		xtype: 'textfield'
	};

	var txtCabangDealerB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Cabang Dealer',
		anchor: '1%',
		style:'margin-left:-194px',
		readOnly:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign:'right',
		labelWidth:130,
		id: 'txtCabangDealerB',
		name: 'txtCabangDealerB',
		xtype: 'textfield'
	};


	var cboKomersil = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_strx3',
		editable: false,
		emptyText: 'Select Komersil',
		fieldLabel: 'Komersil',
		id: 'cboKomersil',
		name: 'cboKomersil',
		store: grupTrx12,
		valueField: 'fs_kd_strx3',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboKomersilB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_strx3',
		editable: false,
		emptyText: 'Select Komersil',
		fieldLabel: 'Komersil',
		id: 'cboKomersilB',
		name: 'cboKomersilB',
		store: grupTrx12B,
		valueField: 'fs_kd_strx3',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboSamaKontrak = {
		anchor: '30%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		valueField: 'fs_kd_strx4',
		displayField: 'fs_nm_strx4',
		fieldLabel: 'Nama sesuai Kontrak',
		id: 'cboSamaKontrak',
		name: 'cboSamaKontrak',
		store: grupTrx13,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
				if(value=='0'){
					var namakonsumen =  Ext.getCmp('txtNamaKonsumen').getValue();
					var alamatkonsumen =  Ext.getCmp('txtAlamatKonsumen').getValue();
					Ext.getCmp('txtNamaBpkb').setValue(namakonsumen);
					Ext.getCmp('txtAlamatbpkb').setValue(alamatkonsumen);	

					Ext.getCmp('txtNamaBpkb').setReadOnly(true);			
					Ext.getCmp('txtAlamatbpkb').setReadOnly(true);				
				}

				if(value=='1'){
					Ext.getCmp('txtNamaBpkb').setValue('');
					Ext.getCmp('txtAlamatbpkb').setValue('');	

					Ext.getCmp('txtNamaBpkb').setReadOnly(false);			
					Ext.getCmp('txtAlamatbpkb').setReadOnly(false);			
				}
			}
		}
	};

	var cboSamaKontrakB = {
		anchor: '30%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		valueField: 'fs_kd_strx4',
		displayField: 'fs_nm_strx4',
		fieldLabel: 'Nama sesuai Kontrak',
		id: 'cboSamaKontrakB',
		name: 'cboSamaKontrakB',
		store: grupTrx13B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
				if(value=='0'){
					var namakonsumen =  Ext.getCmp('txtNamaBadanUsahaB').getValue();
					var alamatkonsumen =  Ext.getCmp('txtAlamatBadanUsahaB').getValue();
					Ext.getCmp('txtNamaBpkbB').setValue(namakonsumen);
					Ext.getCmp('txtAlamatbpkbB').setValue(alamatkonsumen);	

					Ext.getCmp('txtNamaBpkbB').setReadOnly(true);			
					Ext.getCmp('txtAlamatbpkbB').setReadOnly(true);				
				}

				if(value=='1'){
					Ext.getCmp('txtNamaBpkbB').setValue('');
					Ext.getCmp('txtAlamatbpkbB').setValue('');	

					Ext.getCmp('txtNamaBpkbB').setReadOnly(false);			
					Ext.getCmp('txtAlamatbpkbB').setReadOnly(false);			
				}
			}
		}
	};

	var grupPerluasan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPerluasan',
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
			url: 'koreksi/grid_perluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fn_no_apk': Ext.getCmp('txtNoApk').getValue()
				});
			},
			load: function() {
				var xtotal = grupPerluasan.getCount();
				
				if (xtotal > 0) {
					var store = gridPerluasan.getStore();
					var xqty = 0;
					
					gridPerluasan.getSelectionModel().select(0);
				}
			}
		}
	});

	var grupPerluasanB = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPerluasan',
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
			url: 'koreksi/grid_perluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fn_no_apk': Ext.getCmp('txtNoApkB').getValue()
				});
			},
			load: function() {
				var xtotal = grupPerluasanB.getCount();
				
				if (xtotal > 0) {
					var store = gridPerluasan2.getStore();
					var xqty = 0;
					
					gridPerluasan2.getSelectionModel().select(0);
				}
			}
		}
	});

	var grupPerluasan2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'konsumen/ambil_perluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari99').getValue(),
				});
			}
		}
	});

	var grupPerluasan3 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'konsumen/ambil_perluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari99B').getValue(),
				});
			}
		}
	});

	var winGridPerluasan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPerluasan2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerluasan2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari99').setValue('');	
					winCariPerluasan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Jenis Perluasan', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Kode Perluasan', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama',
				id: 'txtCari99',
				name: 'txtCari99',
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
					grupPerluasan2.load();
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
				Ext.getCmp('cboPerluasan').setValue(record.get('fs_nama_referensi'));
				
				winCariPerluasan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridPerluasan2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPerluasan3,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerluasan3,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari99B').setValue('');	
					winCariPerluasan2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Jenis Perluasan', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 240},
			{text: 'Kode Perluasan', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama',
				id: 'txtCari99B',
				name: 'txtCari99B',
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
					grupPerluasan3.load();
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
				Ext.getCmp('cboPerluasan2').setValue(record.get('fs_nama_referensi'));
				
				winCariPerluasan2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});


	var winCariPerluasan2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPerluasan2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerluasan3.load();
				vMask.show();
			}
		}
	});

	var winCariPerluasan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPerluasan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerluasan2.load();
				vMask.show();
			}
		}
	});

	
	var txtTenorPerluasan2= {
		anchor: '40%',
				fieldLabel: 'Tenor',
				labelAlign: 'top',
				labelSeparator: '',
				id: 'txtTenorPerluasan2',
				name: 'txtTenorPerluasan2',
				xtype: 'numberfield',
				hideTrigger: true,
		        keyNavEnabled: false,
		        mouseWheelEnabled: false,
				maskRe:/\d/,
				maxLength : 1,
				minValue:1,
		 		maxValue:5,
				enforceMaxLength : true
		 	}


	var txtTenorPerluasan = {
		anchor: '40%',
				fieldLabel: 'Tenor',
				labelAlign: 'top',
				labelSeparator: '',
				id: 'txtTenorPerluasan',
				name: 'txtTenorPerluasan',
				xtype: 'numberfield',
				hideTrigger: true,
		        keyNavEnabled: false,
		        mouseWheelEnabled: false,
				maskRe:/\d/,
				maxLength : 1,
				minValue:1,
		 		maxValue:5,
				enforceMaxLength : true
		 	}

	var cboPerluasan = {
				editable:false,
				anchor: '95%',
				emptyText: 'Select Jenis',
				fieldLabel: 'Jenis Perluasan',
				id: 'cboPerluasan',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboPerluasan',
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
					winCariPerluasan.show();
					winCariPerluasan.center();
				}
			}
		}
	};

	var cboPerluasan2 = {
				editable:false,
				anchor: '95%',
				emptyText: 'Select Jenis',
				fieldLabel: 'Jenis Perluasan',
				id: 'cboPerluasan2',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboPerluasan2',
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
					winCariPerluasan2.show();
					winCariPerluasan2.center();
				}
			}
		}
	};

	

	var gridPerluasan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 470,
		sortableColumns: false,
		store: grupPerluasan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_jenis_perluasan',
			text: 'Jenis Perluasan',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_tenor_perluasan',
			text: 'Tenor',
			flex: 1.25,
			menuDisabled: true
		}],
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboPerluasan,
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
			txtTenorPerluasan,
			]
		},
		{

			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
																	
			txtKodeCabangPerluasanDelete,
																	txtNoApkPerluasanDelete,
																	txtTahunPerluasanDelete,
																	txtPerluasanDelete
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupPerluasan.getCount();
									var xprod = Ext.getCmp('cboPerluasan').getValue();
									var xtenor = Ext.getCmp('txtTenorPerluasan').getValue();

									var tenor = Ext.getCmp('txtTenor').getValue();

									if(tenor <= 12 ){

										var tenorfix = 1;
									}

									if(tenor > 12 && tenor <= 24 ){

										var tenorfix = 2;
									}

									if(tenor > 24 && tenor <= 36 ){

										var tenorfix = 3;
									}

									if(tenor > 36 && tenor <= 48 ){

										var tenorfix = 4;
									}

									if(tenor > 48){

										var tenorfix = 4;
									}


									var xdata = Ext.create('DataGridPerluasan', {
										fs_jenis_perluasan: Ext.getCmp('cboPerluasan').getValue(),
										fs_tenor_perluasan: Ext.getCmp('txtTenorPerluasan').getValue()
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridPerluasan.getStore();
									var xlanjut = true;

									var xwh = Ext.getCmp('cboPerluasan').getValue();
									if (xwh.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Jenis Perluasan masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwz = Ext.getCmp('txtTenorPerluasan').getValue();
									if (xwz == '' || xwz == 0) {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tenor Perluasan masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwa = Ext.getCmp('txtTenorPerluasan').getValue();
									if (xwa > tenorfix ) {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tenor Premi tidak boleh melebihi tenor pinjaman!',
											title: 'SIAP'
										});
										return;
									}

									store.each(function(record, idx) {
										var xtext2 = record.get('fs_tenor_perluasan');
										
										if (xtext2 == xtenor) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tenor Perluasan already exists, add Perluasan cancel!!',
												title: 'IDS'
											});
											xlanjut = false;
										}
										
									});
									if (xlanjut === false) {
										return;
									}
									
									grupPerluasan.insert(xtotal, xdata);
									Ext.getCmp('cboPerluasan').setValue('');
									Ext.getCmp('txtTenorPerluasan').setValue('');
									
									xtotal = grupPerluasan.getCount() - 1;
									gridPerluasan.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData2',
				text: 'Delete',
				handler: function() {
					fnDeletePerluasan();
				},
				disabled: true
			}]
		}],
			listeners:{
			itemclick: function(dv, record, item, index, e) {
				//alert(record.get('fs_kode_cabang_perluasan'));
				Ext.getCmp('txtKodeCabangPerluasanDelete').setValue(record.get('fs_kode_cabang_perluasan'));
				Ext.getCmp('txtNoApkPerluasanDelete').setValue(record.get('fs_no_apk_perluasan'));
				Ext.getCmp('txtTahunPerluasanDelete').setValue(record.get('fs_tenor_perluasan'));
				Ext.getCmp('txtPerluasanDelete').setValue(record.get('fs_jenis_perluasan'));


				
				},
				selectionchange: function(view, records) {
				gridPerluasan.down('#removeData2').setDisabled(!records.length);
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

	var gridPerluasan2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 470,
		sortableColumns: false,
		store: grupPerluasanB,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_jenis_perluasan',
			text: 'Jenis Perluasan',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_tenor_perluasan',
			text: 'Tenor',
			flex: 1.25,
			menuDisabled: true
		}],
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboPerluasan2,
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
			txtTenorPerluasan2,
			]
		},
		{

			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
																	
			txtKodeCabangPerluasanDelete2,
																	txtNoApkPerluasanDelete2,
																	txtTahunPerluasanDelete2,
																	txtPerluasanDelete2
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupPerluasan.getCount();
									var xprod = Ext.getCmp('cboPerluasan2').getValue();
									var xtenor = Ext.getCmp('txtTenorPerluasan2').getValue();

									var tenor = Ext.getCmp('txtTenorB').getValue();

									if(tenor <= 12 ){

										var tenorfix = 1;
									}

									if(tenor > 12 && tenor <= 24 ){

										var tenorfix = 2;
									}

									if(tenor > 24 && tenor <= 36 ){

										var tenorfix = 3;
									}

									if(tenor > 36 && tenor <= 48 ){

										var tenorfix = 4;
									}

									if(tenor > 48){

										var tenorfix = 4;
									}


									var xdata = Ext.create('DataGridPerluasan', {
										fs_jenis_perluasan: Ext.getCmp('cboPerluasan2').getValue(),
										fs_tenor_perluasan: Ext.getCmp('txtTenorPerluasan2').getValue()
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridPerluasan2.getStore();
									var xlanjut = true;

									var xwh = Ext.getCmp('cboPerluasan2').getValue();
									if (xwh.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Jenis Perluasan masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwz = Ext.getCmp('txtTenorPerluasan2').getValue();
									if (xwz == '' || xwz == 0) {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tenor Perluasan masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwa = Ext.getCmp('txtTenorPerluasan2').getValue();
									if (xwa > tenorfix ) {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tenor Premi tidak boleh melebihi tenor pinjaman!',
											title: 'SIAP'
										});
										return;
									}

									store.each(function(record, idx) {
										var xtext2 = record.get('fs_tenor_perluasan');
										
										if (xtext2 == xtenor) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tenor Perluasan already exists, add Perluasan cancel!!',
												title: 'IDS'
											});
											xlanjut = false;
										}
										
									});
									if (xlanjut === false) {
										return;
									}
									
									grupPerluasanB.insert(xtotal, xdata);
									Ext.getCmp('cboPerluasan2').setValue('');
									Ext.getCmp('txtTenorPerluasan2').setValue('');
									
									xtotal = grupPerluasanB.getCount() - 1;
									gridPerluasan2.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData2',
				text: 'Delete',
				handler: function() {
					fnDeletePerluasan2();
				},
				disabled: true
			}]
		}],
			listeners:{
			itemclick: function(dv, record, item, index, e) {
				//alert(record.get('fs_kode_cabang_perluasan'));
				Ext.getCmp('txtKodeCabangPerluasanDelete2').setValue(record.get('fs_kode_cabang_perluasan'));
				Ext.getCmp('txtNoApkPerluasanDelete2').setValue(record.get('fs_no_apk_perluasan'));
				Ext.getCmp('txtTahunPerluasanDelete2').setValue(record.get('fs_tenor_perluasan'));
				Ext.getCmp('txtPerluasanDelete2').setValue(record.get('fs_jenis_perluasan'));


				
				},
				selectionchange: function(view, records) {
				gridPerluasan2.down('#removeData2').setDisabled(!records.length);
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

	var winPerluasan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		// height: 450,
		layout: 'fit',
		resizable: false,
		title: 'Detail Perluasan',
		width: 600,
		items: [
			gridPerluasan
		],
		listeners: {
			beforehide: function() {
				vMask2.hide();
			},
			beforeshow: function() {
				grupPerluasan.load();
				vMask2.show();
			}
		},
		buttons: [{
			text: 'SAVE',
			handler: function() {

				var xtotal = grupPerluasan.getCount();

				var xprod = Ext.getCmp('txtTenor').getValue();

				if (xprod>0 && xprod <=12){
					var tenor = 1;
				}

				if (xprod>12 && xprod <=24){
					var tenor = 2;
				}

				if (xprod>24 && xprod <=36){
					var tenor = 3;
				}

				if (xprod>36 && xprod <=48){
					var tenor = 4;
				}

				if (xprod>48){
					var tenor = 4;
				}
				
				var xlanjut = true;

				
				if (xlanjut === false) {
					return;
				}

				if(xlanjut === true){
						vMask.hide();
						winPerluasan.hide();

						savePerluasan();
				}
				//fnCekSavePerluasan();
			}
		},
		{
					text: 'Cancel',
					handler: function() {
						
						winPerluasan.hide();
						vMask.hide();
					}
		}]
	});

	var winPerluasan2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		// height: 450,
		layout: 'fit',
		resizable: false,
		title: 'Detail Perluasan',
		width: 600,
		items: [
			gridPerluasan2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerluasanB.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'SAVE',
			handler: function() {

				var xtotal = grupPerluasanB.getCount();

				var xprod = Ext.getCmp('txtTenorB').getValue();

				if (xprod>0 && xprod <=12){
					var tenor = 1;
				}

				if (xprod>12 && xprod <=24){
					var tenor = 2;
				}

				if (xprod>24 && xprod <=36){
					var tenor = 3;
				}

				if (xprod>36 && xprod <=48){
					var tenor = 4;
				}

				if (xprod>48){
					var tenor = 4;
				}
				
				var xlanjut = true;

				
				if (xlanjut === false) {
					return;
				}

				if(xlanjut === true){
						vMask.hide();
						winPerluasan2.hide();

						savePerluasan2();
				}
				//fnCekSavePerluasan();
			}
		},
		{
					text: 'Cancel',
					handler: function() {
						
						winPerluasan2.hide();
						vMask.hide();
					}
		}]
	});

	var winGridPerusahaanAsuransi = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 850,
		sortableColumns: false,
		store: grupPerusahaanAsuransi,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerusahaanAsuransi,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari18').setValue('');
					winCariPerusahaanAsuransi.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Perusahaan Asuransi', dataIndex: 'fs_nama_perusahaan_asuransi', menuDisabled: true, width: 240},
			{text: 'Kode Perusahaan Asuransi', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, width: 120},
			{text: 'Kota', dataIndex: 'fs_kota_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Kode Asuransi 1', dataIndex: 'fs_kode_asuransi1', menuDisabled: true, hidden:true, hoddenwidth: 140},
			{text: 'Kode Asuransi 2', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, hidden:true, width: 140},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Perwakilan Perusahaan', dataIndex: 'fs_perwakilan_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Email', dataIndex: 'fs_email_perwakilan_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Tlp', dataIndex: 'fs_telfon_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'TJH', dataIndex: 'fs_tjh', menuDisabled: true, width: 140 , hidden:true},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Perusahaan / Kode Pos / Kota / Perwakilan',
				id: 'txtCari18',
				name: 'txtCari18',
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
					grupPerusahaanAsuransi.load();
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
				Ext.getCmp('cboPerusahaanAsuransi').setValue(record.get('fs_nama_perusahaan_asuransi'));
				Ext.getCmp('txtKodeAsuransi1').setValue(record.get('fs_kode_asuransi1'));
				Ext.getCmp('txtKodeAsuransi2').setValue(record.get('fs_kode_asuransi2'));
				
				winCariPerusahaanAsuransi.hide();
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

	var winGridPerusahaanAsuransiB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 850,
		sortableColumns: false,
		store: grupPerusahaanAsuransiB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerusahaanAsuransiB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari18B').setValue('');
					winCariPerusahaanAsuransiB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Perusahaan Asuransi', dataIndex: 'fs_nama_perusahaan_asuransi', menuDisabled: true, width: 240},
			{text: 'Kode Perusahaan Asuransi', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, width: 120},
			{text: 'Kota', dataIndex: 'fs_kota_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Kode Asuransi 1', dataIndex: 'fs_kode_asuransi1', menuDisabled: true, hidden:true, hoddenwidth: 140},
			{text: 'Kode Asuransi 2', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, hidden:true, width: 140},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Perwakilan Perusahaan', dataIndex: 'fs_perwakilan_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Email', dataIndex: 'fs_email_perwakilan_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'Tlp', dataIndex: 'fs_telfon_perusahaan_asuransi', menuDisabled: true, width: 140},
			{text: 'TJH', dataIndex: 'fs_tjh', menuDisabled: true, width: 140 , hidden:true},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Perusahaan / Kode Pos / Kota / Perwakilan',
				id: 'txtCari18B',
				name: 'txtCari18B',
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
					grupPerusahaanAsuransiB.load();
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
				Ext.getCmp('cboPerusahaanAsuransiB').setValue(record.get('fs_nama_perusahaan_asuransi'));
				Ext.getCmp('txtKodeAsuransi1B').setValue(record.get('fs_kode_asuransi1'));
				Ext.getCmp('txtKodeAsuransi2B').setValue(record.get('fs_kode_asuransi2'));
				
				winCariPerusahaanAsuransiB.hide();
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

	var winCariPerusahaanAsuransi = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPerusahaanAsuransi
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerusahaanAsuransi.load();
				vMask.show();
			}
		}
	});

	var winCariPerusahaanAsuransiB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridPerusahaanAsuransiB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerusahaanAsuransiB.load();
				vMask.show();
			}
		}
	});

	var cboPerusahaanAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Perusahaan Asuransi',
		id: 'cboPerusahaanAsuransi',
		name: 'cboPerusahaanAsuransi',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari18').setValue('');

				//PremiNett();

				//PremiGross();

				//Perluasan();

				//BiayaTJH();
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeAsuransi1').setValue('');
					Ext.getCmp('txtKodeAsuransi2').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariPerusahaanAsuransi.show();
					winCariPerusahaanAsuransi.center();
				}
			}
		}
	};

	var cboPerusahaanAsuransiB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Perusahaan Asuransi',
		id: 'cboPerusahaanAsuransiB',
		name: 'cboPerusahaanAsuransiB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari18B').setValue('');

				//PremiNett();

				//PremiGross();

				//Perluasan();

				//BiayaTJH();
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeAsuransi1B').setValue('');
					Ext.getCmp('txtKodeAsuransi2B').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariPerusahaanAsuransiB.show();
					winCariPerusahaanAsuransiB.center();
				}
			}
		}
	};

	var winGridDealer = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 850,
		sortableColumns: false,
		store: grupDealer,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDealer,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari13').setValue('');
					winCariDealer.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Dealer', dataIndex: 'fs_nama_dealer', menuDisabled: true, width: 240},
			{text: 'Kode Dealer 1', dataIndex: 'fs_kode_dealer1', menuDisabled: true, width: 120},
			{text: 'Kode Dealer 2', dataIndex: 'fs_kode_dealer2', menuDisabled: true, width: 140},
			{text: 'Nama Pemilik', dataIndex: 'fs_nama_pemilik', menuDisabled: true, width: 140},
			{text: 'Kota Dealer', dataIndex: 'fs_kota_dealer', menuDisabled: true, width: 140},
			{text: 'Alamat Dealer', dataIndex: 'fs_alamat_dealer', menuDisabled: true, width: 140},
			{text: 'Tlp Dealer', dataIndex: 'fs_telepon_dealer', menuDisabled: true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fn_cabang_dealer', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_nama_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_atasnama_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_rekening_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fn_persen_refund_bunga', menuDisabled: true, hidden:true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dealer / Nama Pemilik/ Kode Dealer 1 / Kode Dealer 2',
				id: 'txtCari13',
				name: 'txtCari13',
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
					grupDealer.load();
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
				Ext.getCmp('cboDealer').setValue(record.get('fs_nama_dealer'));
				Ext.getCmp('txtRefundDealer').setValue(record.get('fn_persen_refund_bunga'));
				Ext.getCmp('txtKodeDealer1').setValue(record.get('fs_kode_dealer1'));
				Ext.getCmp('txtKodeDealer2').setValue(record.get('fs_kode_dealer2'));
				Ext.getCmp('txtCabangDealer').setValue(record.get('fn_cabang_dealer'));
				Ext.getCmp('txtNamaBank').setValue(record.get('fs_nama_bank_pencairan'));
				Ext.getCmp('txtRekeningCair').setValue(record.get('fs_atasnama_bank_pencairan'));
				Ext.getCmp('txtNoRekCair').setValue(record.get('fs_rekening_bank_pencairan'));
				
				winCariDealer.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridDealerB = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 850,
		sortableColumns: false,
		store: grupDealerB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDealerB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari13B').setValue('');
					winCariDealerB.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Dealer', dataIndex: 'fs_nama_dealer', menuDisabled: true, width: 240},
			{text: 'Kode Dealer 1', dataIndex: 'fs_kode_dealer1', menuDisabled: true, width: 120},
			{text: 'Kode Dealer 2', dataIndex: 'fs_kode_dealer2', menuDisabled: true, width: 140},
			{text: 'Nama Pemilik', dataIndex: 'fs_nama_pemilik', menuDisabled: true, width: 140},
			{text: 'Kota Dealer', dataIndex: 'fs_kota_dealer', menuDisabled: true, width: 140},
			{text: 'Alamat Dealer', dataIndex: 'fs_alamat_dealer', menuDisabled: true, width: 140},
			{text: 'Tlp Dealer', dataIndex: 'fs_telepon_dealer', menuDisabled: true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fn_cabang_dealer', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_nama_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_atasnama_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_rekening_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fn_persen_refund_bunga', menuDisabled: true, hidden:true, width: 140},
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dealer / Nama Pemilik/ Kode Dealer 1 / Kode Dealer 2',
				id: 'txtCari13B',
				name: 'txtCari13B',
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
					grupDealerB.load();
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
				Ext.getCmp('cboDealerB').setValue(record.get('fs_nama_dealer'));
				Ext.getCmp('txtRefundDealerB').setValue(record.get('fn_persen_refund_bunga'));
				Ext.getCmp('txtKodeDealer1B').setValue(record.get('fs_kode_dealer1'));
				Ext.getCmp('txtKodeDealer2B').setValue(record.get('fs_kode_dealer2'));
				Ext.getCmp('txtCabangDealerB').setValue(record.get('fn_cabang_dealer'));
				Ext.getCmp('txtNamaBankB').setValue(record.get('fs_nama_bank_pencairan'));
				Ext.getCmp('txtRekeningCairB').setValue(record.get('fs_atasnama_bank_pencairan'));
				Ext.getCmp('txtNoRekCairB').setValue(record.get('fs_rekening_bank_pencairan'));
				
				winCariDealerB.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariDealer = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridDealer
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDealer.load();
				vMask.show();
			}
		}
	});

	var winCariDealerB = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridDealerB
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDealerB.load();
				vMask.show();
			}
		}
	});


	var cboDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Dealer",
		fieldLabel: 'Dealer',
		id: 'cboDealer',
		name: 'cboDealer',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari13').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKodeDealer1').setValue('');
					Ext.getCmp('txtKodeDealer2').setValue('');
					Ext.getCmp('txtCabangDealer').setValue('');
					Ext.getCmp('txtNamaBank').setValue('');
					Ext.getCmp('txtRekeningCair').setValue('');
					Ext.getCmp('txtNoRekCair').setValue('');
					Ext.getCmp('txtRefundDealer').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariDealer.show();
					winCariDealer.center();
				}
			}
		}
	};

	var cboDealerB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: "Select Dealer",
		fieldLabel: 'Dealer',
		id: 'cboDealerB',
		name: 'cboDealerB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari13B').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKodeDealer1B').setValue('');
					Ext.getCmp('txtKodeDealer2B').setValue('');
					Ext.getCmp('txtCabangDealerB').setValue('');
					Ext.getCmp('txtNamaBankB').setValue('');
					Ext.getCmp('txtRekeningCairB').setValue('');
					Ext.getCmp('txtNoRekCairB').setValue('');
					Ext.getCmp('txtRefundDealerB').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariDealerB.show();
					winCariDealerB.center();
				}
			}
		}
	};

	var cboPolaAngs = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		displayField: 'fs_nama_referensi',
		valueField: 'fs_nilai1_referensi',
		emptyText: 'Select Pola',
		fieldLabel: 'Pola Angsuran',
		id: 'cboPolaAngs',
		name: 'cboPolaAngs',
		store: grupTrx14,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboPolaAngsB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		displayField: 'fs_nama_referensi',
		valueField: 'fs_nilai1_referensi',
		emptyText: 'Select Pola',
		fieldLabel: 'Pola Angsuran',
		id: 'cboPolaAngsB',
		name: 'cboPolaAngsB',
		store: grupTrx14B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboCaraBayar = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'right',
		editable: false,
		emptyText: 'Select Cara bayar',
		displayField: 'fs_nama_referensi',
		valueField: 'fs_nilai1_referensi',
		fieldLabel: 'Cara Bayar',
		id: 'cboCaraBayar',
		name: 'cboCaraBayar',
		store: grupTrx15,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboCaraBayarB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'right',
		editable: false,
		emptyText: 'Select Cara bayar',
		displayField: 'fs_nama_referensi',
		valueField: 'fs_nilai1_referensi',
		fieldLabel: 'Cara Bayar',
		id: 'cboCaraBayarB',
		name: 'cboCaraBayarB',
		store: grupTrx15B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};


	var cboDimuka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		valueField: 'fs_kd_strx5',
		displayField: 'fs_nm_strx5',
		fieldLabel: 'Dimuka',
		id: 'cboDimuka',
		name: 'cboDimuka',
		store: grupTrxDimuka,
		xtype: 'combobox',
		value:'TIDAK',
		listeners: {
			change: function(combo, value) {
				

				   var combo3 = Ext.ComponentQuery.query('#txtAngsuranDimuka')[0];

				if(value=='Y'){

					Ext.getCmp('txtAngsuranDimuka').setValue('0');

					//Ext.getCmp('txtDimukaKali').setValue('1');


					combo3.setDisabled(false);

					//Ext.getCmp('txtDimukaKali').setReadOnly(true);	



				}

				if(value=='T'){
							
					Ext.getCmp('txtAngsuranDimuka').setValue('0');

					//Ext.getCmp('txtDimukaKali').setValue('1');


					//Ext.getCmp('txtDimukaKali').setReadOnly(false);	
					combo3.setDisabled(true);


					angsdimuka();

				}

				var combo1 = Ext.ComponentQuery.query('#txtDimukaKali')[0];

				if(value=='Y') {

				 	Ext.getCmp('txtDimukaKali').setValue('1');

				    combo1.setDisabled(false);

				    }

				 if (value=='T') {

				 	Ext.getCmp('txtDimukaKali').setValue('0');
					combo1.setDisabled(true);

				   }




				var combo2 = Ext.ComponentQuery.query('#cboPotongPencairan')[0];

				 if(value=='Y') {

				 	Ext.getCmp('cboPotongPencairan').setValue('YA');

				    combo2.setDisabled(false);

				    }

				 if (value=='T') {

				 	Ext.getCmp('cboPotongPencairan').setValue('YA');
					combo2.setDisabled(true);

				   }
			}
		}
	};

	var cboDimukaB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		valueField: 'fs_kd_strx5',
		displayField: 'fs_nm_strx5',
		fieldLabel: 'Dimuka',
		id: 'cboDimukaB',
		name: 'cboDimukaB',
		store: grupTrxDimukaB,
		xtype: 'combobox',
		value:'TIDAK',
		listeners: {
			change: function(combo, value) {
				

				   var combo3 = Ext.ComponentQuery.query('#txtAngsuranDimukaB')[0];

				if(value=='Y'){

					Ext.getCmp('txtAngsuranDimukaB').setValue('0');

					//Ext.getCmp('txtDimukaKali').setValue('1');


					combo3.setDisabled(false);

					//Ext.getCmp('txtDimukaKali').setReadOnly(true);	



				}

				if(value=='T'){
							
					Ext.getCmp('txtAngsuranDimukaB').setValue('0');

					//Ext.getCmp('txtDimukaKali').setValue('1');


					//Ext.getCmp('txtDimukaKali').setReadOnly(false);	
					combo3.setDisabled(true);


					///angsdimuka();

				}

				var combo1 = Ext.ComponentQuery.query('#txtDimukaKaliB')[0];

				if(value=='Y') {

				 	Ext.getCmp('txtDimukaKaliB').setValue('1');

				    combo1.setDisabled(false);

				    }

				 if (value=='T') {

				 	Ext.getCmp('txtDimukaKaliB').setValue('0');
					combo1.setDisabled(true);

				   }




				var combo2 = Ext.ComponentQuery.query('#cboPotongPencairanB')[0];

				 if(value=='Y') {

				 	Ext.getCmp('cboPotongPencairanB').setValue('YA');

				    combo2.setDisabled(false);

				    }

				 if (value=='T') {

				 	Ext.getCmp('cboPotongPencairanB').setValue('YA');
					combo2.setDisabled(true);

				   }
			}
		}
	};	

	var winGridUsahaKerja3 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupUsahaPekerjaan3,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupUsahaPekerjaan3,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari16').setValue('');
					winCariUsahaPekerjaan3.hide();
				}
			}]
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Kategori',
				id: 'txtCari16',
				name: 'txtCari16',
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
					grupUsahaPekerjaan3.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama Kategori', dataIndex: 'fs_nama_sektor_ekonomi', menuDisabled: true, width: 240},
			{text: 'Kode Kategori', dataIndex: 'fs_kode_sektor_ekonomi', menuDisabled: true, width: 120}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboUsahaKerjaanPenjamin').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKodeUsahaPenjamin').setValue(record.get('fs_kode_sektor_ekonomi'));
				
				winCariUsahaPekerjaan3.hide();
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

	var winCariUsahaPekerjaan3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridUsahaKerja3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupUsahaPekerjaan3.load();
				vMask.show();
			}
		}
	});

	var cboUsahaKerjaanPenjamin = {
		anchor: '45%',
		labelWidth:130,
		labelAlign:'left',
		emptyText: "Select Usaha/Pekerjaan",
		fieldLabel: 'Usaha/Pekerjaan',
		id: 'cboUsahaKerjaanPenjamin',
		name: 'cboUsahaKerjaanPenjamin',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari16').setValue('');
				Ext.getCmp('txtKodeUsahaPenjamin').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKodeUsahaPenjamin').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariUsahaPekerjaan3.show();
					winCariUsahaPekerjaan3.center();
				}
			}
		}
	};

	var cboPotongPencairan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		editable: false,
		disabled:true,
		value:'YA',
		displayField: 'fs_nm_strx6',
		valueField: 'fs_kd_strx6',
		fieldLabel: 'Potong Pencairan',
		id: 'cboPotongPencairan',
		name: 'cboPotongPencairan',
		store: grupTrx18,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};

	var cboPotongPencairanB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		editable: false,
		disabled:true,
		value:'YA',
		displayField: 'fs_nm_strx6',
		valueField: 'fs_kd_strx6',
		fieldLabel: 'Potong Pencairan',
		id: 'cboPotongPencairanB',
		name: 'cboPotongPencairanB',
		store: grupTrx18B,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};	

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
											url : 'koreksi/remove/',
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
					id: 'txtNoApkP',
					name: 'txtNoApkP',
					xtype: 'textfield',
					hidden: true
				},{
					id: 'txtNoBatch',
					name: 'txtNoBatch',
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
			                        url: 'koreksi/uploadfile',
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

	var winData2 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 650,
		sortableColumns: false,
		store: grupApkPendukung2,
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
											url : 'koreksi/remove/',
											params : {
												'fs_dokumen_upload' : str
											}
										});
										grupApkPendukung2.load();  
							        }
							        if (btn == "no"){
							        	grupApkPendukung2.load(); 
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
					id: 'cboKodeDoc2',
					name: 'cboKodeDoc2',
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
								winCari23.show();
								winCari23.center();
							}
						}
					}
				},{
					id: 'txtNoApkPB',
					name: 'txtNoApkPB',
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
					id: 'fileDoc2',
					name: 'fileDoc2',
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
			                        url: 'koreksi/uploadfile2',
			                        waitMsg: 'Uploading your file...',
			                        success: function (form, action) {
			                        	var result = action.result; 
			                        	var data = result.data;
			                        	var name = data.name;
			                        	var message = Ext.String.format('<b>Message:</b> {0}<br>' +'<b>FileName:</b> {1}', result.msg, name);
                            			Ext.Msg.alert('Success', message);
                            			grupApkPendukung2.load();
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
			store: grupApkPendukung2,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winPopup2.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
			{
				var dokumen_name2 = record.get('fs_nama_dokumen');
				var dokumen_url2 = 'uploads/' + record.get('fs_dokumen_upload');

				var viewImage2 =  Ext.create('Ext.Panel', {
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
							'<div style="overflow: auto; width:888; height:465; text-align:center;">',
					        '<img src="' + dokumen_url2 + '" height:"100%" width:"100%"/>',
					        '</div>'
					    	],
					})
				});

				var winImage2 = Ext.create('Ext.window.Window', {
					title: dokumen_name2,
					border: false,
					frame: false,
					autoScroll: false,
					width: 900,
					height: 500,
					collapsible: false,
					resizable: true,
					layout: 'fit',
					items: [
						viewImage2
					]
				});
				
				winImage2.show();
			}
		},
		viewConfig: {
			enableTextSelection: true
		}
	});	

	var grupDataPendukung = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_dokumen','fs_jenis_pembiayaan',
			'fs_no','fs_nama_dokumen',
			'fs_jenis_dokumen', 'fs_wajib'
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
			url: 'koreksi/datapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari40').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('cboJenis').getValue()
				});
			}
		}
	});

	var grupDataPendukung2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_dokumen','fs_jenis_pembiayaan',
			'fs_no','fs_nama_dokumen',
			'fs_jenis_dokumen', 'fs_wajib'
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
			url: 'koreksi/datapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari41').getValue(),
					'fs_jenis_pembiayaan': Ext.getCmp('cboJenisB').getValue()
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
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 380},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dokumen',
				id: 'txtCari40',
				name: 'txtCari40',
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

	var winGrid23 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDataPendukung2,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, width: 100},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, width: 380},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dokumen',
				id: 'txtCari41',
				name: 'txtCari41',
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
					grupDataPendukung2.load();
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
			store: grupDataPendukung2,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari23.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKodeDoc2').setValue(record.get('fs_kode_dokumen'));

				grupDataPendukung2.load();
				winCari23.hide();
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

	var winCari23 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid23
		],
		listeners: {
			beforehide: function() {
				vMask3.hide();
			},
			beforeshow: function() {
				grupDataPendukung2.load();
				vMask3.show();
			}
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
				vMask2.hide();
			},
			beforeshow: function() {
				grupApkPendukung.load();
				vMask2.show();
			}
		}
	});

	var winPopup2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Tambah Data Pendukung',
		items: [
			winData2
		],
		listeners: {
			beforehide: function() {
				vMask3.hide();
			},
			beforeshow: function() {
				grupApkPendukung2.load();
				vMask3.show();
			}
		}
	});

	function fnPopup() {
		winPopup.show();
		winPopup.center();
	}

	function fnPopup2() {
		winPopup2.show();
		winPopup2.center();
	}

	var frmApkKonsumen = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		autoScroll: true,
		region: 'center',
		title: 'Koreksi APK - Konsumen',
		width: 1050,
		fieldDefaults: {
			labelSeparator: '',
		},
		items: [
		{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Utama',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [

									{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoApk
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtRefnodt
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboLembagaPembiayaan,
												txtLembagaKeuangan2,
												txtLembagaKeuangan1
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboJenis
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboJenisPiu,
												txtJenisPiu
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPaket,
												txtKodePaket
											]
										}]
									}]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPola
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboFleet
											]
										}]
									},
									txtNoPjj,
									txtNamaKonsumen,
									txtAlamatKonsumen,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePos
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtPropinsi
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKelurahan,
												txtKodeDati
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKecamatan
											]
										}]
									},
									txtKabupatenKota,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoKtp
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtSd
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTelepon
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKartuKeluarga
											]
										}]
									},
											txtHp,
											txtEmail,
											txtNoNpwp,
											{
											bodyCls: 'x-panel-body-default-framed',
											buttons: [
											{
											text: 'Data Pendukung',
											handler: fnPopup
										},{

											flex: 0.9,
											layout: 'anchor',
											xtype: 'container',
											items: []
										
										},{
											iconCls: 'icon-save',
											text: 'Update',
											handler: fnCekSave
										}]}
										]
									}]

								}]
							}]
						}]
					}]
				}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Konsumen',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtNamaPerusahaan,
											txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTlpperiodsusahaan
											]
										},{
											flex: 0.95,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKerjaSejak
											]
										},{
											flex: 0,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKerjaSejakTahun
											]
										}]
									}
										]
									},]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKategoriUsaha,
												txtKodeKategoriUsaha
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Pendapatan',
												fieldLabel: 'Pendapatan ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPendapatan',
												anchor: '80%',
												labelAlign:'right',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPendapatan',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										}]
									},

											cboUsahaPekerjaan,
											txtUsahaPekerjaan,
											txtKeteranganUsaha,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboJenKel
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboAgama,
												txtKodeAgama,
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtUserPlaceBirth
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtUserDatebirth
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPendidikan,
												txtKodePendidikan

											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Biaya per Bulan',
												fieldLabel: 'Biaya/Bulan',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtBiayaBulan',
												anchor: '80%',
												labelAlign:'right',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaBulan',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})											
										]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtIbuKandung
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboSkalaPerusahaan
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeStatusKawin,
												cboStatusKawin
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												 {
													afterLabelTextTpl: required,
													anchor: '30%',
													labelWidth:130,
													labelAlign:'right',
													emptyText: 'Masukkan Tanggungan',
													fieldLabel: 'Tanggungan',
													id: 'txtTanggungan',
													name: 'txtTanggungan',
													value: 0,
													xtype: 'numberfield',
													maxLength : 2,
											 		enforceMaxLength : true,
													minValue: 0,
												}	
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboStatusRumah,
												txtStatusRumah
											]
										},{
											flex: 0.95,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTinggalSejak
											]
										},{
											flex: 0,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTinggalSejakTahun
											]
										}]
									},
									txtAlamatSurat,	
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePos2
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKabupatenKotaKonsumen
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboFirstTime
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKe
											]
										}]
									},	
										]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Kendaraan',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
											xtype:'button',
     										text:'Pilih dari Pricelist',
     										style : "padding:0px;",
     										anchor: '30%'
											}
										]
									}]
								},
								cboModelKendaraan,
								txtModelKendaraan,
								{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtJenisKendaraan
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtSilinder
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTahun
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtWarna
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNorangka
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomesin
											]
										}]
									},
									cboKomersil,
									cboSamaKontrak,
									txtNamaBpkb,
									txtAlamatbpkb,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomorBpkb
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboNopol,
												txtWilayahAsuransi
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex:1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoPol2
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex:1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoPol3
											]
										}]
									},

									/*{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomorBpkb
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											width:2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoPol
											]
										},
										/*{
											width:70,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtNoPol2
											]
										},
										{
											width:70,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtNoPol3
											]
										}
										]
									},
									*/
									cboKotaBPKB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboAsuransi,
												txtNilaiAsuransi
											]
										},{
											flex: 2.2,
											layout: 'anchor',
											xtype: 'container',
											items: [
											
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPerusahaanAsuransi,
												txtKodeAsuransi1,
												txtKodeAsuransi2,
												//txtTjh,
												//txtTjh2
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboDealer,
												txtRefundDealer
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtSales
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeDealer1
											]
										},
										{
											flex: 0.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeDealer2
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtCabangDealer
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Struktur Kredit',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											//txtNamaPerusahaan,
											//txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPolaAngs
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboCaraBayar
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTdkAng
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboDimuka
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtDimukaKali
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPotongPencairan
											]
										}]
									}
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
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Harga OTR',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtHargaOTR',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtHargaOTR',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											    listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);

												     /// LuxTax();

												     Ext.getCmp('txtHargaOTRdealer').setValue(newValue);
												     Ext.getCmp('txtHargaOTRkonsumen').setValue(newValue);

												    /// angsdimuka();

												   
												   ///  pokokpembiayaan();

												   ///  bunga();

												     /// PremiGross();

												     /// Perluasan();

												    ///  BiayaTJH();

												    ///PremiNett();

												    /// uangmuka();


												   		 }
													 }
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												{
											xtype:'button',
     										text:'Tambah Perluasan Asuransi',
     										style : "padding:2px;margin-left:30px",
     										anchor: '100%',
     										handler: fnTambahPerluasan
											},
											checktjh
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Total DP',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtTotalDp',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtTotalDp',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												listeners: {
												    'change': function(field,newValue){

												   /// angsdimuka();

												    /// pokokpembiayaan();

												     ///bunga();

												      ///PremiGross();

												     /// Perluasan();

												     /// BiayaTJH();

												   /// PremiNett();




												   ///uangmuka();


												   		 }
													 }
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Angsuran',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuran',
												anchor: '130%',
												labelAlign:'right',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuran',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											    listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);
												    Ext.getCmp('txtAngsuranBulanDealer').setValue(newValue);
												    Ext.getCmp('txtAngsuranBulanKonsumen').setValue(newValue);

												  ///  angsdimuka();

												   
												    /// pokokpembiayaan();

												    /// bunga();

												    ///  PremiGross();

												      ///Perluasan();

												     /// BiayaTJH();

												   /// PremiNett();

												    ///bungaFlat();

												  
												     //uangmuka();


												   		 }
													 }
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//cboPotongPencairan
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				},
				{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [
				{
				flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [
					{
					title: 'Aplikasi Total DP',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Biaya Administrasi',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtBiayaAdm',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaAdm',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Asuransi',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPremiGros',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiGros',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Perluasan',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPerluasan',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPerluasan',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Biaya TJH',
												readOnly:true,
												hideTrigger: true,
												id: 'txtBiayaTjH',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaTjH',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Ass Gross',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPremiGrosFix',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiGrosFix',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Angsuran Dimuka',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranDimuka',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranDimuka',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												disabled:true,
												listeners: {
												    'change': function(field,newValue){

												 var dp = Ext.getCmp('txtTotalDp').getValue();
												var admin = Ext.getCmp('txtBiayaAdm').getValue();
												var premi = Ext.getCmp('txtPremiGros').getValue();
												 var total = dp - admin - premi;
												 //alert(newValue);
												 

												if (total > 0) {
												var xtotal = total - newValue;

										    	Ext.getCmp('txtUangMuka').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);
												}
												else {
													var xtotal = total - newValue;
													xtotals =  xtotal *(-1);		
												Ext.getCmp('txtUangMuka').setValue(xtotals);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);
												}
												   		 }
													 }
											}),
											{
											xtype:'button',
     										text:'Tambah Kode Transaksi',
     										style : "padding:2px;margin-top:10px",
     										anchor: '100%',
     										handler: fnKodeTrans
											},
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Uang Muka',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMuka',
												anchor: '130%',
												labelAlign:'left',
												style:'margin-top:10px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMuka',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												 listeners: {
												    'change': function(field,newValue){

												    ///pokokpembiayaan();

												    ///bunga();

												    ///PremiGross();

												    ///Perluasan();

												    ///BiayaTJH();

												  	 ///PremiNett();

												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenp').setValue(total);
													Ext.getCmp('txtUangMukaDealerp').setValue(total);


												    //selisihDp();

												      

												   		 }
													 }
												
											}),
											{
											    xtype: 'box',
											    autoEl: {tag: 'hr',style:"size:30"}
											},
											txtTotalTrans,
											txtTotalTrans2,
											txtSelisihDpB,
											Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												hideTrigger: true,
												id: 'txtTotalSelisihDP',
												anchor: '100%',
												labelAlign:'left',
												style:'margin-top:-20px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtTotalSelisihDP',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												
											}),

											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												readOnly:true,
												decimalSeparator: '.',
												fieldLabel: 'Premi Ass Net',
												fieldStyle: 'background-color: #eee; background-image: none;text-align: left;',
												hideTrigger: true,
												id: 'txtPremiNet',
												anchor: '100%',
												labelAlign:'left',
												style:'margin-top:10px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiNet',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												
											}),
											cboAngsuranDibayarDealer
											
											]
									}]
								}]
							}]
						}]
					}]
				}]
				},{
											flex: 0.1,
											layout: 'anchor',
											xtype: 'container',
											items: [
											
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 0,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtDealer
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKonsumen
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 0,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtDealer
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//cekAktif
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
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Harga OTR',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtHargaOTRdealer',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtHargaOTRdealer',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtHargaOTRkonsumen',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px;margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtHargaOTRkonsumen',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									},
									{
										layout: 'hbox',
										xtype: 'container',
										align: 'stretch',
										items: [
										{
											width:100,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtUangMukaDealerlabel
											]
										},
										{
											width:2,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											width:27,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtUangMukaDealer2
											]
										},
										{
											width:100,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMukaDealerp',
												anchor: '220%',
												labelWidth:0,
												style:'margin-left:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMukaDealerp',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											width:164,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMukaKonsumenp',
												anchor: '220%',
												labelWidth:0,
												style:'margin-left:140px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMukaKonsumenp',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
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
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Asuransi',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAsuransiDealer',
												anchor: '190%',
												labelWidth:140,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAsuransiDealer',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAsuransiKonsumen',
												anchor: '190%',
												style:'margin-left:-10px',
												labelWidth:140,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAsuransiKonsumen',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									}
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
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Pokok Pembiayaan',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPokokPembiayaanDealer',
												anchor: '190%',
												labelWidth:140,
												labelAlign:'right',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPokokPembiayaanDealer',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPokokPembiayaanKonsumen',
												anchor: '190%',
												labelWidth:140,
												labelAlign:'left',
												style:'margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPokokPembiayaanKonsumen',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									},
									{
										layout: 'hbox',
										xtype: 'container',
										align: 'stretch',
										items: [
										{
											width:240,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlat
											]
										},
										{
											width:230,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlatDealer
											]
										},
										{
											width:5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlat3
											]
										},{
											width:105,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlat4
											]
										}]
									},
									{
										layout: 'hbox',
										xtype: 'container',
										align: 'stretch',
										items: [
										{
											width:240,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor2
											]
										},
										{
											width:230,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor3

												//txtUangMukaDealer2
											]
										},
										{
											width:10,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor4

												//txtBungaFlat3
											]
										},{
											width:101,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor5

												//txtBungaFlat4
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											width: 345,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Bunga',
												fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
												readOnly:true,
												hideTrigger: true,
												id: 'txtBungaDealer',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:140,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBungaDealer',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											width: 237,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												hideTrigger: true,
												id: 'txtBungaKonsumen',
												anchor: '100%',
												style:'margin-left:30px;',
												labelAlign:'left',
												labelWidth:0,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBungaKonsumen',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Angsuran / Bulan',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranBulanDealer',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranBulanDealer',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranBulanKonsumen',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px;margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranBulanKonsumen',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
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
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Piutang Pembiayaan',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPiutangDealer',
												anchor: '190%',
												labelAlign:'right',
												labelWidth:140,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPiutangDealer',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												listeners: {
												    'change': function(field,newValue){

												   /// pokokpembiayaan();

												   /// bunga();

												    /// PremiGross();

												    /// Perluasan();

												     ///BiayaTJH();

												    ///PremiNett();

												   		 }
													 }
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPiutangKonsumen',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPiutangKonsumen',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				}
											]
										}]
									}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Tambahan',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: 'Data Suami/Istri',
					style: 'padding: 5px;',
					xtype: 'fieldset',
					id:'SuamiIstri',
					name:'SuamiIstri',
					disabled:true,
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
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
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtNamaIstri,
											txtAlamatIstri
										]
									},]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [

										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePosIstri
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponIstri
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKabupatenKotaIstri
											]
										}]
									},
									cboUsahaKerjaan,
									txtKodeuUsahaKerjaan,
									txtKeteranganUsahaIstri,
									txtAlamatUsahaSuamiIstri,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponUsaha
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Pendapatan',
												fieldLabel: 'Pendapatan ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPendapatanSuamiIstri',
												anchor: '80%',
												labelAlign:'right',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPendapatanSuamiIstri',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				},{
					title: 'Data Penjamin',
					style: 'padding: 5px;',
					xtype: 'fieldset',
					id:'Penjamin',
					name:'Penjamin',
					disabled:true,
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
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
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtNamaPenjamin,
											txtAlamatPenjamin
											
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
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePosPenjamin
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponPenjamin
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKabupatenKotaPenjamin
											]
										}]
									},
									cboUsahaKerjaanPenjamin,
									txtKodeUsahaPenjamin,
									txtKeteranganUsahaPenjamin,
									txtAlamatUsahaPenjamin,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponUsahaPenjamin
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Pendapatan',
												fieldLabel: 'Pendapatan ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPendapatanPenjamin',
												anchor: '150%',
												labelAlign:'right',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPendapatanPenjamin',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtStatusPenjamin
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				}
				]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pencairan',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: 'Data Angsuran',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											//txtNamaPerusahaan,
											//txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTanggalAngs1
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTanggalAngsBln
											]
										}]
									}
										]
									}]
								}]
							}]
						}]
					}]
				},{
					title: 'Data Pencairan',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											//txtNamaPerusahaan,
											//txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTglCair
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtRekeningCair
											]
										}]
									}
										]
									},]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPencairanKe
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												 txtNamaBank
											]
										}]
									},

											//cboUsahaPekerjaan,
									
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												 cboUangMuka
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												  txtNoRekCair
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										style:'margin-top:20px;',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboDeposit
											]
										},{
											flex: 0.8,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNilaiCair,
												txtNilaiCair3
											]
										}]
									}
									]
									}]
								}]
							}]
						}]
					}]
				}
				]
			}]
			}

			]
		}]
		
	});
	
	var vMask2 = new Ext.LoadMask({
			msg: 'Please wait...',
			target: frmApkKonsumen
		});
		
		function fnMaskShow2() {
			frmApkKonsumen.mask('Please wait...');
		}

		function fnMaskHide2() {
			frmApkKonsumen.unmask();
		}

		
		

Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_nama_pengurus', type: 'string'},
			{name: 'fs_alamat_pengurus', type: 'string'},
			{name: 'fs_kodepos_pengurus', type: 'string'},
			{name: 'fs_kota_pengurus', type: 'string'},
			{name: 'fs_ktp_pengurus', type: 'string'},
			{name: 'fs_npwp_pengurus', type: 'string'},
			{name: 'fs_persen_saham', type: 'string'},
			{name: 'fs_aktif', type: 'bool'}
		]
	});

var grupKodeJabatan = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_referensi','fs_nilai1_referensi','fs_nilai2_referensi'
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
			url: 'badan_usaha/ambil_jabatan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jabatan_pengurus',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': '',
					'fs_cari': Ext.getCmp('txtCari21').getValue()
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
			url: 'badan_usaha/listMasterPengurus'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': ''
				});
			}
		}
	});	

	 grupKodePos5= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kodepos','fs_kelurahan','fs_kecamatan','fs_nama_dati','fs_propinsi'
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
			url: 'apknew/ambil_kode_pos1'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari22').getValue()
				});
			}
		}
	});

	var txtKodeCabangPengurusDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtKodeCabangPengurusDelete',
		name: 'txtKodeCabangPengurusDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	

	var txtNoApkTransK = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtNoApkTransK',
		name: 'txtNoApkTransK',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};




	var txtKodeCabangTransK = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtKodeCabangTransK',
		name: 'txtKodeCabangTransK',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	var txtKodeTransK = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtKodeTransK',
		name: 'txtKodeTransK',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};


	var txtNoApkPengurusDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtNoApkPengurusDelete',
		name: 'txtNoApkPengurusDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};	

	var txtKodeJabatanPengurusDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtKodeJabatanPengurusDelete',
		name: 'txtKodeJabatanPengurusDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

	var txtNamaPengurusDelete = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelAlign:'right',
		fieldLabel: 'Ke',
		id: 'txtNamaPengurusDelete',
		name: 'txtNamaPengurusDelete',
		value: 0,      
		labelWidth:130,
		hidden:true,
		xtype: 'textfield'
	};

var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor:'100%',
		autoDestroy: true,
		height: 350,
		layout:'fit',
		sortableColumns: false,
		store: grupGridDetil,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari23').setValue('');
				}
			}]
		}),
		layout: {
            align: 'stretch'
        },
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode Cabang',
			width: 100
		},{
			dataIndex: 'fn_no_apk',
			menuDisabled: true, 
			text: 'No APK',
			width: 150
		},
		{
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true, 
			text: 'Kode Jabatan',
			width: 120
		},
		{
			dataIndex: 'fs_nama_pengurus',
			menuDisabled: true, 
			text: 'Nama Pengurus',
			width: 120
		},
		{
			dataIndex: 'fs_alamat_pengurus',
			menuDisabled: true, 
			text: 'Alamat Pengurus',
			width: 120
		},
		{
			dataIndex: 'fs_kodepos_pengurus',
			menuDisabled: true, 
			text: 'Kode Pos Pengurus',
			width: 120
		},
		{
			dataIndex: 'fs_kota_pengurus',
			menuDisabled: true, 
			text: 'Kota Pengurus',
			width: 120
		},
		{
			dataIndex: 'fs_ktp_pengurus',
			menuDisabled: true, 
			text: 'Ktp Pengurus',
			width: 120
		},
		{
			dataIndex: 'fs_npwp_pengurus',
			menuDisabled: true, 
			text: 'NPWP Pengurus',
			width: 120
		},
		{
			dataIndex: 'fs_persen_saham',
			menuDisabled: true, 
			text: 'Saham',
			width: 120
		},
		{
			align: 'center',
			dataIndex: 'fs_aktif',
			menuDisabled: true, 
			stopSelection: false,
			text: 'Aktif',
			width: 55,
			xtype: 'checkcolumn',
			listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
		}],
		listeners:{
			itemclick: function(dv, record, item, index, e) {
				//alert(record.get('fs_kode_cabang'));
				Ext.getCmp('txtKodeCabangPengurusDelete').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApkPengurusDelete').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtKodeJabatanPengurusDelete').setValue(record.get('fs_kode_jabatan'));
				Ext.getCmp('txtNamaPengurusDelete').setValue(record.get('fs_nama_pengurus'));


				
				},
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});
	
	var winGridKodeJabatan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKodeJabatan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeJabatan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari21').setValue('');	
					winCariKodeJabatan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Jabatan', dataIndex: 'fs_nilai1_referensi', menuDisabled: true, width: 240},
			{text: 'Nama', dataIndex: 'fs_nama_referensi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Jabatan / Nama',
				id: 'txtCari21',
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
					grupKodeJabatan.load();
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
				Ext.getCmp('cboKodeJabatan').setValue(record.get('fs_nilai1_referensi'));
				
				winCariKodeJabatan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodeJabatan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeJabatan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeJabatan.load();
				vMask.show();
			}
		}
	});

	var txtNamaPengurus = {
		width: '100%',
		labelWidth:130,
		fieldLabel: 'Nama',
		id: 'txtNamaPengurus',
		name: 'txtNamaPengurus',
		xtype: 'textfield'
	};

	var txtAlamatPengurus = {
		width: '100%',
		labelWidth:130,
		fieldLabel: 'Alamat',
		id: 'txtAlamatPengurus',
		name: 'txtAlamatPengurus',
		xtype: 'textareafield'
	};

	

	var txtKotaPengurus = {
		width: '100%',
		readOnly: true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelWidth:130,
		fieldLabel: 'Kota',
		id: 'txtKotaPengurus',
		name: 'txtKotaPengurus',
		xtype: 'textfield'
	};

	var txtNoKTPPengurus = {
		width: '100%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'masukkan no ktp',
		fieldLabel: 'No KTP',
		id: 'txtNoKTPPengurus',
		name: 'txtNoKTPPengurus	',
		maxLength : 16,
 		enforceMaxLength : true,
		xtype: 'numberfield',
		hideTrigger: true
	};

	var txtNoNpwpPengurus = {
		width: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'No NPWP',
		id: 'txtNoNpwpPengurus',
		name: 'txtNoNpwpPengurus',
		minValue: 0, 
		maxLength:22,
		enforceMaxLength:true,
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		listeners: {
        change: function (field, newValue) {
        	//newValue = newValue.replace(/\./g, '');
            var e = Ext.getCmp('txtNoNpwpPengurus').getValue();
            var m = Ext.getCmp('txtTesss').getValue();
            var n = Ext.getCmp('txtTes222').getValue();
            var o = Ext.getCmp('txtTes333').getValue();
            var p = Ext.getCmp('txtTes444').getValue();
            var q = Ext.getCmp('txtTes555').getValue();
            var r = Ext.getCmp('txtTes666').getValue();

            if(e==''){

            	 Ext.getCmp('txtTesss').setValue('');
                 Ext.getCmp('txtTes222').setValue('');
                 Ext.getCmp('txtTes333').setValue('');
                 Ext.getCmp('txtTes444').setValue('');
                 Ext.getCmp('txtTes555').setValue('');
                 Ext.getCmp('txtTes666').setValue('');
            }
            var b = e.substring(0,2);
            var a = b.length;
            var c = e.substring(3,6);
            var d = c.length;

            var f = e.substring(7,10);
            var g = f.length;

            var ff = e.substring(11,12);
            var gf = ff.length;

            var fff = e.substring(13,16);
            var gff = fff.length;

            var ffff = e.substring(17,20);
            var gfff = ffff.length;

            if(a==2 && m!='done'){
            newValue = e.replace(/.{2}/g, function (substr) {

            Ext.getCmp('txtTesss').setValue('done');
            return substr + '.';
            }),

            field.setRawValue(newValue);
            } 

            if(d==3 && n!='dones') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes222').setValue('dones');
            	field.setRawValue(newValue);
            }

            if(g==3 && o!='doness') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes333').setValue('doness');
            	field.setRawValue(newValue);
            }
            
             if(gf==1 && p!='donesss') {
            	newValue = newValue + '-';
            	Ext.getCmp('txtTes444').setValue('donesss');
            	field.setRawValue(newValue);
            }

             if(gff==1 && p!='donessss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes555').setValue('donessss');
            	field.setRawValue(newValue);
            }

             if(gfff==1 && p!='donesssss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes666').setValue('donesssss');
            	field.setRawValue(newValue);
            }
            
            
            
        	}
  		 }
	};

	var grupTrx35 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_aktif','fs_nm_aktif'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apknew/cb_fleet'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var cboAktifPengurus = {
		anchor: '30%',
		labelAlign:'left',
		labelWidth:130,
		displayField: 'fs_nm_aktif',
		valueField: 'fs_kode_aktif',
		fieldLabel: 'Aktif',
		id: 'cboAktifPengurus',
		name: 'cboAktifPengurus',
		store: grupTrx35,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboKodeJabatan = {
		width: '100%',
		labelWidth:130,
		labelAlign: 'left', 
		emptyText: "Select Jabatan",
		fieldLabel: 'Kode Jabatan',
		id: 'cboKodeJabatan',
		name: 'cboKodeJabatan',
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
						Ext.getCmp('txtCari21').setValue('');	
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodeJabatan.show();
					winCariKodeJabatan.center();
				}
			}
		}
	};

	var winGridKodePos5 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 600,
		width: 750,
		sortableColumns: false,
		store: grupKodePos5,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos5,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari22').setValue('');
					winCariKodePos5.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos', menuDisabled: true, width: 240},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan', menuDisabled: true, width: 120},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan', menuDisabled: true, width: 120},
			{text: 'Dati', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			{text: 'Propinsi', dataIndex: 'fs_propinsi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Dati / Propinsi',
				id: 'txtCari22',
				name: 'txtCari22',
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
					grupKodePos5.load();
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
				Ext.getCmp('cboKodePos5').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPengurus').setValue(record.get('fs_nama_dati'));
				
				winCariKodePos5.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodePos5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodePos5
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos5.load();
				vMask.show();
			}
		}
	});

	var cboKodePos5 = {
		width: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Kode Pos',
		id: 'cboKodePos5',
		name: 'cboKodePos5',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari22').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtKotaPengurus').setValue('');
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodePos5.show();
					winCariKodePos5.center();
				}
			}
		}
	};

	var frmApkBadanUsaha = Ext.create('Ext.form.Panel', {
		autoScroll: true,
		border: false,
		frame: true,
		region: 'center',
		xtype:'form2',
		title: 'KOREKSI APK - Badan Usaha',
		width: 1050,
		fieldDefaults: {
			labelSeparator: '',
		},
		items: [
		{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Utama',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [

									{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoApkB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtRefnodtB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboLembagaPembiayaanB,
												txtLembagaKeuangan2B,
												txtLembagaKeuangan1B
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboJenisB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboJenisPiuB,
												txtJenisPiuB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPaketB,
												txtKodePaketB
											]
										}]
									}]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPolaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboFleetB
											]
										}]
									},
									txtNoPjjB,
									txtNamaBadanUsahaB,
									txtAlamatBadanUsahaB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePosB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtPropinsiB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKelurahanB,
												txtKodeDatiB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKecamatanB
											]
										}]
									},
									txtKabupatenKotaB,
									{ 
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTes,
												txtTes2,
												txtTes3,
												txtTes4,
												txtTes5,
												txtTes6,
												txtNoNpwpB
											]
										}]
									},
									{ 
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtEmailB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoSIUPB
											]
										}]
									},
									{ 
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtGroupUsahaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoTDPB
											]
										}]
									},
									{
											bodyCls: 'x-panel-body-default-framed',
											buttons: [
										{
											text: 'Data Pendukung',
											handler: fnPopup2
										},{

											flex: 0.9,
											layout: 'anchor',
											xtype: 'container',
											items: []
										
										},{
											iconCls: 'icon-save',
											text: 'Update',
											handler: fnCekSave2
										}]}
										]
									}]

								}]
							}]
						}]
					}]
				}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Badan Usaha',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [
								{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponBadanUsahaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboStatusUsahaB
											]
										}]
									}
										]
									},]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboBentukUsahaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboStatusTempatUsahaB
											]
										}]
									}
										]
									}]
								},
								{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBeroperasiSejakB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboSkalaPerusahaan2B
											]
										}]
									}
										]
									},]
								}
								,{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKategoriUsahaB,
												txtKodeKategoriUsahaB

											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtJumlahKaryawanB
											]
										}]
									},
											txtKeteranganUsahaB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Omset',
												fieldLabel: 'Omset / Bulan ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtOmsetB',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtOmsetB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Biaya',
												fieldLabel: 'Biaya / Bulan ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtBiayaB',
												anchor: '80%',
												labelAlign:'right',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Mutasi Debet',
												fieldLabel: 'Mutasi Debet ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtMutasiDebetB',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtMutasiDebetB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												emptyText: 'Masukkan Mutasi Kredit',
												fieldLabel: 'Mutasi Kredit ',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtMutasiKreditB',
												anchor: '80%',
												labelAlign:'right',
												labelWidth:130,
												maxLength : 18,
 												enforceMaxLength : true,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtMutasiKreditB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										}]
									},
									txtAlamatKorespondensiB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePos2B
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKabupatenKotaKonsumenB
											]
										}]
									},
									txtNamaPenanggungJawabB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoKtpB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTess,
												txtTes22,
												txtTes33,
												txtTes44,
												txtTes55,
												txtTes66,
												txtNoNpwpPenanggungJwbB
											]
										}]
									},
									txtAlamatPenanggungJawabB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboKodePos3B
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKotaPenanggungJawabB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTeleponPenanggungJawabB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtHpPenanggungJawabB
											]
										}]
									},
									txtJabatanB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboFirstTimeB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKeB
											]
										}]
									},	
										]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Kendaraan',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
											xtype:'button',
     										text:'Pilih dari Pricelist',
     										style : "padding:0px;",
     										anchor: '30%'
											}
										]
									}]
								},
								cboModelKendaraanB,
								txtModelKendaraanB,
								{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtJenisKendaraanB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtSilinderB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTahunB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtWarnaB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNorangkaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomesinB
											]
										}]
									},
									cboKomersilB,
									cboSamaKontrakB,
									txtNamaBpkbB,
									txtAlamatbpkbB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomorBpkbB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboNopolB,
												txtWilayahAsuransiB
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex:1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoPol2B
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex:1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoPol3B
											]
										}]
									},

									/*{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomorBpkb
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											width:2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoPol
											]
										},
										/*{
											width:70,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtNoPol2
											]
										},
										{
											width:70,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtNoPol3
											]
										}
										]
									},
									*/
									//cboKotaBPKB,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboAsuransiB,
												txtNilaiAsuransiB
											]
										},{
											flex: 2.2,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPerusahaanAsuransiB,
												txtKodeAsuransi1B,
												txtKodeAsuransi2B,
												//txtTjh,
												//txtTjh2
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboDealerB,
												txtRefundDealerB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtSalesB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeDealer1B
											]
										},
										{
											flex: 0.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},
										{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeDealer2B
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtCabangDealerB
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Struktur Kredit',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											//txtNamaPerusahaan,
											//txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPolaAngsB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboCaraBayarB
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTdkAngB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboDimukaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtDimukaKaliB
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPotongPencairanB
											]
										}]
									}
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
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Harga OTR',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtHargaOTRB',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtHargaOTRB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											    listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);

												     /// LuxTax();

												     Ext.getCmp('txtHargaOTRdealerB').setValue(newValue);
												     Ext.getCmp('txtHargaOTRkonsumenB').setValue(newValue);

												    /// angsdimuka();

												   
												   ///  pokokpembiayaan();

												   ///  bunga();

												     /// PremiGross();

												     /// Perluasan();

												    ///  BiayaTJH();

												    ///PremiNett();

												    /// uangmuka();


												   		 }
													 }
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenorB
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												{
											xtype:'button',
     										text:'Tambah Perluasan Asuransi',
     										style : "padding:2px;margin-left:30px",
     										anchor: '100%',
     										handler: fnTambahPerluasan2
											},
											checktjh2
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Total DP',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtTotalDpB',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtTotalDpB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												listeners: {
												    'change': function(field,newValue){

												   /// angsdimuka();

												    /// pokokpembiayaan();

												     ///bunga();

												      ///PremiGross();

												     /// Perluasan();

												     /// BiayaTJH();

												   /// PremiNett();




												   ///uangmuka();


												   		 }
													 }
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Angsuran',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranB',
												anchor: '130%',
												labelAlign:'right',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											    listeners: {
												    'change': function(field,newValue){
												      //alert(newValue);
												    Ext.getCmp('txtAngsuranBulanDealerB').setValue(newValue);
												    Ext.getCmp('txtAngsuranBulanKonsumenB').setValue(newValue);

												  ///  angsdimuka();

												   
												    /// pokokpembiayaan();

												    /// bunga();

												    ///  PremiGross();

												      ///Perluasan();

												     /// BiayaTJH();

												   /// PremiNett();

												    ///bungaFlat();

												  
												     //uangmuka();


												   		 }
													 }
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//cboPotongPencairan
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				},
				{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [
				{
				flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [
					{
					title: 'Aplikasi Total DP',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Biaya Administrasi',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtBiayaAdmB',
												anchor: '130%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaAdmB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Asuransi',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPremiGrosB',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiGrosB	',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Perluasan',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPerluasanB',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPerluasanB	',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Biaya TJH',
												readOnly:true,
												hideTrigger: true,
												id: 'txtBiayaTjHB',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaTjHB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Ass Gross',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPremiGrosFixB',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiGrosFixB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Angsuran Dimuka',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranDimukaB',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranDimukaB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												disabled:true,
												listeners: {
												    'change': function(field,newValue){

												 var dp = Ext.getCmp('txtTotalDpB').getValue();
												var admin = Ext.getCmp('txtBiayaAdmB').getValue();
												var premi = Ext.getCmp('txtPremiGrosB').getValue();
												 var total = dp - admin - premi;
												 //alert(newValue);
												 

												if (total > 0) {
												var xtotal = total - newValue;

										    	Ext.getCmp('txtUangMukaB').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerpB').setValue(xtotal);
												Ext.getCmp('txtUangMukaKonsumenpB').setValue(xtotal);
												}
												else {
													var xtotal = total - newValue;
													xtotals =  xtotal *(-1);		
												Ext.getCmp('txtUangMukaB').setValue(xtotals);
												Ext.getCmp('txtUangMukaDealerpB').setValue(xtotals);
												Ext.getCmp('txtUangMukaKonsumenpB').setValue(xtotals);
												}
												   		 }
													 }
											}),
											{
											xtype:'button',
     										text:'Tambah Kode Transaksi',
     										style : "padding:2px;margin-top:10px",
     										anchor: '100%',
     										handler: fnKodeTrans2
											},
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Uang Muka',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMukaB',
												anchor: '130%',
												labelAlign:'left',
												style:'margin-top:10px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMukaB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												 listeners: {
												    'change': function(field,newValue){

												    ///pokokpembiayaan();

												    ///bunga();

												    ///PremiGross();

												    ///Perluasan();

												    ///BiayaTJH();

												  	 ///PremiNett();

												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenpB').setValue(total);
													Ext.getCmp('txtUangMukaDealerpB').setValue(total);


												    //selisihDp();

												      

												   		 }
													 }
												
											}),
											{
											    xtype: 'box',
											    autoEl: {tag: 'hr',style:"size:30"}
											},
											txtTotalTransB,
											txtTotalTrans2B,
											txtSelisihDpB,
											Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												hideTrigger: true,
												id: 'txtTotalSelisihDPB',
												anchor: '100%',
												labelAlign:'left',
												style:'margin-top:-20px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtTotalSelisihDPB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												
											}),

											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												readOnly:true,
												decimalSeparator: '.',
												fieldLabel: 'Premi Ass Net',
												fieldStyle: 'background-color: #eee; background-image: none;text-align: left;',
												hideTrigger: true,
												id: 'txtPremiNetB',
												anchor: '100%',
												labelAlign:'left',
												style:'margin-top:10px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiNetB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												
											}),
											cboAngsuranDibayarDealerB
											
											]
									}]
								}]
							}]
						}]
					}]
				}]
				},{
											flex: 0.1,
											layout: 'anchor',
											xtype: 'container',
											items: [
											
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												{
					title: ' ',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 0,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtDealer
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKonsumen
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												
											]
										},{
											flex: 0,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtDealer
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//cekAktif
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
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Harga OTR',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtHargaOTRdealerB',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtHargaOTRdealerB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtHargaOTRkonsumenB',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px;margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtHargaOTRkonsumenB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									},
									{
										layout: 'hbox',
										xtype: 'container',
										align: 'stretch',
										items: [
										{
											width:100,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtUangMukaDealerlabelB
											]
										},
										{
											width:2,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},
										{
											width:27,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtUangMukaDealer2B
											]
										},
										{
											width:100,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMukaDealerpB',
												anchor: '220%',
												labelWidth:0,
												style:'margin-left:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMukaDealerpB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											width:164,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMukaKonsumenpB',
												anchor: '220%',
												labelWidth:0,
												style:'margin-left:140px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMukaKonsumenpB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
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
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Asuransi',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAsuransiDealerB',
												anchor: '190%',
												labelWidth:140,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAsuransiDealerB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAsuransiKonsumenB',
												anchor: '190%',
												style:'margin-left:-10px',
												labelWidth:140,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAsuransiKonsumenB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									}
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
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Pokok Pembiayaan',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPokokPembiayaanDealerB',
												anchor: '190%',
												labelWidth:140,
												labelAlign:'right',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPokokPembiayaanDealerB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPokokPembiayaanKonsumenB',
												anchor: '190%',
												labelWidth:140,
												labelAlign:'left',
												style:'margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPokokPembiayaanKonsumenB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									},
									{
										layout: 'hbox',
										xtype: 'container',
										align: 'stretch',
										items: [
										{
											width:240,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlatB
											]
										},
										{
											width:230,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlatDealerB
											]
										},
										{
											width:5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlat3B
											]
										},{
											width:105,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtBungaFlat4B
											]
										}]
									},
									{
										layout: 'hbox',
										xtype: 'container',
										align: 'stretch',
										items: [
										{
											width:240,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor2B
											]
										},
										{
											width:230,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor3B

												//txtUangMukaDealer2
											]
										},
										{
											width:10,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor4B

												//txtBungaFlat3
											]
										},{
											width:101,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTenor5B

												//txtBungaFlat4
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											width: 345,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Bunga',
												fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
												readOnly:true,
												hideTrigger: true,
												id: 'txtBungaDealerB',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:140,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBungaDealerB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											width: 237,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												hideTrigger: true,
												id: 'txtBungaKonsumenB',
												anchor: '100%',
												style:'margin-left:30px;',
												labelAlign:'left',
												labelWidth:0,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBungaKonsumenB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Angsuran / Bulan',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranBulanDealerB',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranBulanDealerB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtAngsuranBulanKonsumenB',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-top:10px;margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtAngsuranBulanKonsumenB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
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
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Piutang Pembiayaan',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPiutangDealerB',
												anchor: '190%',
												labelAlign:'right',
												labelWidth:140,
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPiutangDealerB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												listeners: {
												    'change': function(field,newValue){

												   /// pokokpembiayaan();

												   /// bunga();

												    /// PremiGross();

												    /// Perluasan();

												     ///BiayaTJH();

												    ///PremiNett();

												   		 }
													 }
											})
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: ' ',
												readOnly:true,
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtPiutangKonsumenB',
												anchor: '190%',
												labelAlign:'left',
												labelWidth:140,
												style:'margin-left:-10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPiutangKonsumenB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											})
											]
										},
										{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												//txtTdkAng
											]
										}]
									}]
									}]
								}]
							}]
						}]
					}]
				}
											]
										}]
									}]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pengurus',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [
				txtKodeCabangPengurusDelete,
																	txtNoApkPengurusDelete,
																	txtKodeJabatanPengurusDelete,
																	txtNamaPengurusDelete,
				{
											bodyCls: 'x-panel-body-default-framed',
											buttons: [{

											flex: 0.9,
											layout: 'anchor',
											xtype: 'container',
											items: []
										
										},{
											iconCls: 'icon-save',
											text: 'Tambah',
											handler: fnSavePengurus
										}
										,{
											iconCls: 'icon-delete',
											text: 'Delete',
											handler: function() {
													fnDelete();
													
													
												}
										}]},
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												{
													title: ' ',
													style: 'padding: 40px;',
													xtype: 'fieldset',
													items: [{
														xtype: 'container',
														items: [{
															layout: 'anchor',
															xtype: 'container',
															items: [{
																layout: 'anchor',
																xtype: 'container',
																items: [{
																	xtype: 'container',
																	items: [
																	cboKodeJabatan,
																	txtNamaPengurus,
																	txtAlamatPengurus,
																	cboKodePos5,
																	txtKotaPengurus,
																	txtNoKTPPengurus,
																	txtTesss,
																	txtTes222,
																	txtTes333,
																	txtTes444,
																	txtTes555,
																	txtTes666,
																	txtNoNpwpPengurus,
																	Ext.create('Ext.ux.form.NumericField', {
																	alwaysDisplayDecimals: true,
																	currencySymbol: null,
																	decimalPrecision: 2,
																	decimalSeparator: '.',
																	emptyText: 'Masukan Saham',
																	fieldLabel: 'Saham(persentase %) ',
																	fieldStyle: 'text-align: left;',
																	hideTrigger: true,
																	id: 'txtSaham',
																	width: '100%',
																	labelAlign:'left',
																	labelWidth:130,
																	maxLength : 6,
					 												enforceMaxLength : true,
																	keyNavEnabled: false,
																	mouseWheelEnabled: false,
																	name: 'txtSaham',
																	thousandSeparator: ',',
																	useThousandSeparator: true,
																	value: 0
																}),
																	cboAktifPengurus

																	]
																}]
															}]
														}]
													}]
												}
											]
										},{
											flex: 0.1,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												{
													title: ' ',
													style: 'padding: 5px;',
													xtype: 'fieldset',
													items: [{
														anchor: '100%',
														xtype: 'container',
														items: [{
															flex: 1,
															layout: 'anchor',
															xtype: 'container',
															items: [{
																flex: 1,
																layout: 'anchor',
																xtype: 'container',
																items: [{
																	anchor: '100%',
																	xtype: 'container',
																	items: [
																	gridDetil
																	]
																}]
															}]
														}]
													}]
												}
											]
										}]
									},
						]
			}]
			},
			{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pencairan',
				items: [{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				items: [{
					title: 'Data Angsuran',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											//txtNamaPerusahaan,
											//txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTanggalAngs1B
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTanggalAngsBlnB
											]
										}]
									}
										]
									}]
								}]
							}]
						}]
					}]
				},{
					title: 'Data Pencairan',
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
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											//txtNamaPerusahaan,
											//txtAlamatPerusahaan,
											{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtTglCairB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtRekeningCairB
											]
										}]
									}
										]
									},]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
										{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboPencairanKeB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												 txtNamaBankB
											]
										}]
									},

											//cboUsahaPekerjaan,
									
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												 cboUangMukaB
											]
										},{
											flex: 0.3,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												  txtNoRekCairB
											]
										}]
									},
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										style:'margin-top:20px;',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboDepositB
											]
										},{
											flex: 0.8,
											layout: 'anchor',
											xtype: 'container',
											items: [
											]
										},{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNilaiCairB,
												txtNilaiCair3B
											]
										}]
									}
									]
									}]
								}]
							}]
						}]
					}]
				}
				]
			}]
			}
			]
		}]
		
	});
	
	var vMask3 = new Ext.LoadMask({
			msg: 'Please wait...',
			target: frmApkBadanUsaha
		});
		
		function fnMaskShow3() {
			frmApkBadanUsaha.mask('Please wait...');
		}

		function fnMaskHide3() {
			frmApkBadanUsaha.unmask();
		}

	var winDuplikasiKonsumen = Ext.create('Ext.window.Window', {
		border: false,
		autoScroll: true,
		closable: false,
		draggable: false,
		frame: false,
		height: 610,
		layout: 'fit',
		resizable: false,
		title: 'KOREKSI APK',
		width: 1090,
		items: [
			frmApkKonsumen
		],
		buttons: [
		{
					text: 'Close',
					handler: function() {
						
						winDuplikasiKonsumen.hide();
						vMask.hide();
					}
				}]
	});

	var winDuplikasiBadanUsaha = Ext.create('Ext.window.Window', {
		border: false,
		autoScroll: true,
		closable: false,
		draggable: false,
		frame: false,
		height: 610,
		layout: 'fit',
		resizable: false,
		title: 'KOREKSI APK',
		width: 1090,
		items: [
			frmApkBadanUsaha
		],
		buttons: [
		{
					text: 'Close',
					handler: function() {
						
						winDuplikasiBadanUsaha.hide();
						vMask.hide();
					}
				}]
	});

function fnSavePengurus() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'badan_usaha/savepengurus',
			params: {
				'fs_kode_jabatan': Ext.getCmp('cboKodeJabatan').getValue(),
				'fs_nama_pengurus': Ext.getCmp('txtNamaPengurus').getValue(),
				'fs_alamat_pengurus': Ext.getCmp('txtAlamatPengurus').getValue(),
				'fs_kodepos_pengurus': Ext.getCmp('cboKodePos5').getValue(),
				'fs_kota_pengurus': Ext.getCmp('txtKotaPengurus').getValue(),
				'fs_ktp_pengurus': Ext.getCmp('txtNoKTPPengurus').getValue(),
				'fs_npwp_pengurus': Ext.getCmp('txtNoNpwpPengurus').getValue(),
				'fs_persen_saham': Ext.getCmp('txtSaham').getValue(),
				'fs_aktif': Ext.getCmp('cboAktifPengurus').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'IDS'
				});
				if (xtext.sukses === true) {
					fnResetPengurus();
					grupGridDetil.load();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'IDS'
				});
				fnMaskHide();
			}
		});
	}

	function fnDelete(){

			var	kode_cabang = Ext.getCmp('txtKodeCabangPengurusDelete').getValue();
			var apk_pengurus =	Ext.getCmp('txtNoApkPengurusDelete').getValue();
			var kode_kabatan =	Ext.getCmp('txtKodeJabatanPengurusDelete').getValue();
			var nama =	Ext.getCmp('txtNamaPengurusDelete').getValue();


										Ext.Ajax.request({
													method: 'POST',
													url: 'badan_usaha/delete_pengurus',
													params: {
														'kode_cabang': kode_cabang,
														'apk_pengurus': apk_pengurus,
														'kode_jabatan': kode_kabatan,
														'nama': nama
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

														gridDetil.getStore().load();
														//grupGridDetil.getView().refresh();
													


														
													},
													failure: function(response) {
														var xtext = Ext.decode(response.responseText);
														Ext.MessageBox.show({
															buttons: Ext.MessageBox.OK,
															closable: false,
															icon: Ext.MessageBox.INFO,
															msg: 'Kalkulasi Failed',
															title: 'SIAP'
														});
														//fnMaskHide();
													}
												});
	}

	function fnDeleteTransK(){

			var	kode_cabang = Ext.getCmp('txtKodeCabangPengurusDelete').getValue();
			var apk_pengurus =	Ext.getCmp('txtNoApkPengurusDelete').getValue();
			var kode_kabatan =	Ext.getCmp('txtKodeJabatanPengurusDelete').getValue();
			var nama =	Ext.getCmp('txtNamaPengurusDelete').getValue();


										Ext.Ajax.request({
													method: 'POST',
													url: 'badan_usaha/delete_pengurus',
													params: {
														'kode_cabang': kode_cabang,
														'apk_pengurus': apk_pengurus,
														'kode_jabatan': kode_kabatan,
														'nama': nama
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

														gridDetil.getStore().load();
														//grupGridDetil.getView().refresh();
													


														
													},
													failure: function(response) {
														var xtext = Ext.decode(response.responseText);
														Ext.MessageBox.show({
															buttons: Ext.MessageBox.OK,
															closable: false,
															icon: Ext.MessageBox.INFO,
															msg: 'Kalkulasi Failed',
															title: 'SIAP'
														});
														//fnMaskHide();
													}
												});
	}

	function fnDeletePerluasan(){

			var	kode_cabang = Ext.getCmp('txtKodeCabangPerluasanDelete').getValue();
			var apk_perluasan =	Ext.getCmp('txtNoApkPerluasanDelete').getValue();
			var tahun =	Ext.getCmp('txtTahunPerluasanDelete').getValue();
			var nama =	Ext.getCmp('txtPerluasanDelete').getValue();


										Ext.Ajax.request({
													method: 'POST',
													url: 'koreksi/delete_perluasan',
													params: {
														'kode_cabang': kode_cabang,
														'apk_perluasan': apk_perluasan,
														'tahun': tahun,
														'nama': nama
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

														gridPerluasan.getStore().load();
														//grupGridDetil.getView().refresh();
													


														
													},
													failure: function(response) {
														var xtext = Ext.decode(response.responseText);
														Ext.MessageBox.show({
															buttons: Ext.MessageBox.OK,
															closable: false,
															icon: Ext.MessageBox.INFO,
															msg: 'Kalkulasi Failed',
															title: 'SIAP'
														});
														//fnMaskHide();
													}
												});
	}

	function fnDeletePerluasan2(){

			var	kode_cabang = Ext.getCmp('txtKodeCabangPerluasanDelete2').getValue();
			var apk_perluasan =	Ext.getCmp('txtNoApkPerluasanDelete2').getValue();
			var tahun =	Ext.getCmp('txtTahunPerluasanDelete2').getValue();
			var nama =	Ext.getCmp('txtPerluasanDelete2').getValue();


										Ext.Ajax.request({
													method: 'POST',
													url: 'koreksi/delete_perluasan',
													params: {
														'kode_cabang': kode_cabang,
														'apk_perluasan': apk_perluasan,
														'tahun': tahun,
														'nama': nama
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

														gridPerluasan2.getStore().load();
														//grupGridDetil.getView().refresh();
													


														
													},
													failure: function(response) {
														var xtext = Ext.decode(response.responseText);
														Ext.MessageBox.show({
															buttons: Ext.MessageBox.OK,
															closable: false,
															icon: Ext.MessageBox.INFO,
															msg: 'Kalkulasi Failed',
															title: 'SIAP'
														});
														//fnMaskHide();
													}
												});
	}


	function fnResetPengurus() {
		Ext.getCmp('cboKodeJabatan').setValue('');
		Ext.getCmp('txtNamaPengurus').setValue('');
		Ext.getCmp('txtAlamatPengurus').setValue('');
		Ext.getCmp('cboKodePos5').setValue('');
		Ext.getCmp('txtKotaPengurus').setValue('');
		Ext.getCmp('txtNoKTPPengurus').setValue('');
		Ext.getCmp('txtNoNpwpPengurus').setValue('');
		Ext.getCmp('txtSaham').setValue('');
		Ext.getCmp('cboAktifPengurus').setValue('');
	}

function fnDuplikasi() {
		
		//vMask.show();
		Ext.Ajax.request({
			method: 'POST',
			url: 'koreksi/cekapk',
			params: {
				'no_apk': Ext.getCmp('txtNoAPK2').getValue()
				},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					//	Ext.getCmp('cboGL').setValue(xtext.kdacno);

					if(xtext.hasil=='P' || xtext.hasil=='W'){
						Ext.getCmp('txtNoApk').setValue(xtext.fn_no_apk);
						Ext.getCmp('txtNoApkP').setValue(xtext.fn_no_apk);
						Ext.getCmp('txtNoNpwp').setValue(xtext.fs_npwp_konsumen);
						Ext.getCmp('cboLembagaPembiayaan').setValue(xtext.fs_lembaga_pembiayaan);
						Ext.getCmp('txtLembagaKeuangan2').setValue(xtext.fs_nomor_dealer);
						Ext.getCmp('txtLembagaKeuangan1').setValue(xtext.fs_kode_lokasi);
						Ext.getCmp('cboJenis').setValue(xtext.fs_jenis_pembiayaan);
						Ext.getCmp('cboJenisPiu').setValue(xtext.fs_jenis_piutang);
						Ext.getCmp('txtJenisPiu').setValue(xtext.fs_jenis_piutang);
						Ext.getCmp('cboPaket').setValue(xtext.fs_kode_paket);
						Ext.getCmp('txtKodePaket').setValue(xtext.fs_kode_paket);
						Ext.getCmp('cboPola').setValue(xtext.fs_pola_transaksi);
						Ext.getCmp('cboFleet').setValue(xtext.fs_fleet);
						Ext.getCmp('txtNoPjj').setValue(xtext.fn_nomor_perjanjian);
						Ext.getCmp('txtNamaKonsumen').setValue(xtext.fs_nama_konsumen);
						Ext.getCmp('txtAlamatKonsumen').setValue(xtext.fs_alamat_konsumen);
						Ext.getCmp('cboKodePos').setValue(xtext.fs_kodepos_konsumen);
						Ext.getCmp('txtKelurahan').setValue(xtext.fs_kelurahan_konsumen);
						Ext.getCmp('txtKecamatan').setValue(xtext.fs_kecamatan_konsumen);
						Ext.getCmp('txtPropinsi').setValue(xtext.fs_propinsi_konsumen);
						Ext.getCmp('txtKabupatenKota').setValue(xtext.fs_kota_konsumen);
						Ext.getCmp('txtKodeDati').setValue(xtext.fs_kode_dati_konsumen);
						Ext.getCmp('txtNoKtp').setValue(xtext.fs_ktp_konsumen);
						Ext.getCmp('txtTelepon').setValue(xtext.fs_telepon_konsumen);
						Ext.getCmp('txtHp').setValue(xtext.fs_handphone_konsumen);
						Ext.getCmp('txtEmail').setValue(xtext.fs_email_konsumen);
						Ext.getCmp('txtKartuKeluarga').setValue(xtext.fs_kartu_keluarga);
						Ext.getCmp('txtAlamatSurat').setValue(xtext.fs_alamat_korespondensi);
						Ext.getCmp('txtNamaPerusahaan').setValue(xtext.fs_nama_perusahaan_konsumen);
						Ext.getCmp('txtAlamatPerusahaan').setValue(xtext.fs_alamat_usaha_konsumen);
						Ext.getCmp('txtTlpperiodsusahaan').setValue(xtext.fs_telfon_usaha_konsumen);
						Ext.getCmp('txtKerjaSejak').setValue(xtext.fs_kerja_tgl);
						Ext.getCmp('txtKerjaSejakTahun').setValue(xtext.fs_kerja_tahun);
						Ext.getCmp('cboKategoriUsaha').setValue(xtext.fs_nama_usaha_konsumen);
						Ext.getCmp('txtKodeKategoriUsaha').setValue(xtext.fs_kategori_usaha_konsumen);
						Ext.getCmp('txtPendapatan').setValue(xtext.fn_pendapatan_konsumen);
						Ext.getCmp('txtBiayaBulan').setValue(xtext.fn_biaya_konsumen);
						Ext.getCmp('cboUsahaPekerjaan').setValue(xtext.fs_nama_usaha_pekerjaan_konsumen);
						Ext.getCmp('txtUsahaPekerjaan').setValue(xtext.fs_usaha_pekerjaan_konsumen);
						Ext.getCmp('txtKeteranganUsaha').setValue(xtext.fs_keterangan_usaha_konsumen);
						Ext.getCmp('cboJenKel').setValue(xtext.fs_jenis_kelamin_konsumen);
						Ext.getCmp('cboAgama').setValue(xtext.fs_nama_agama_konsumen);
						Ext.getCmp('txtKodeAgama').setValue(xtext.fs_agama_konsumen);
						Ext.getCmp('txtUserDatebirth').setValue(xtext.fd_tanggal_lahir_konsumen);
						Ext.getCmp('txtUserPlaceBirth').setValue(xtext.fs_tempat_lahir_konsumen);
						Ext.getCmp('cboPendidikan').setValue(xtext.fs_pendidikan_konsumen);
						Ext.getCmp('txtKodePendidikan').setValue(xtext.fs_pendidikan_konsumen);
						Ext.getCmp('txtIbuKandung').setValue(xtext.fs_nama_ibu_kandung);
						Ext.getCmp('cboSkalaPerusahaan').setValue(xtext.fs_skala_perusahaan_konsumen);
						Ext.getCmp('txtKodeStatusKawin').setValue(xtext.fs_kode_status_kawin);
						Ext.getCmp('cboStatusKawin').setValue(xtext.fs_status_konsumen);
						Ext.getCmp('cboStatusRumah').setValue(xtext.fs_nama_status_rumah);
						Ext.getCmp('txtStatusRumah').setValue(xtext.fs_status_rumah);
						Ext.getCmp('txtTinggalSejak').setValue(xtext.fs_tinggal_sejak_tgl);
						Ext.getCmp('txtTinggalSejakTahun').setValue(xtext.fs_tinggal_sejak_tahun);
						Ext.getCmp('cboKodePos2').setValue(xtext.fs_kodepos_korespondensi);
						Ext.getCmp('txtKabupatenKotaKonsumen').setValue(xtext.fs_kota_korespondensi);
						Ext.getCmp('cboFirstTime').setValue(xtext.fs_pertama_kali_kredit);
						Ext.getCmp('txtKe').setValue(xtext.fn_jumlah_kali_kredit);
						Ext.getCmp('cboModelKendaraan').setValue(xtext.fs_kode_kendaraan);
						Ext.getCmp('txtModelKendaraan').setValue(xtext.fs_kode_kendaraan);
						Ext.getCmp('txtJenisKendaraan').setValue(xtext.fs_jenis_kendaraan);
						Ext.getCmp('txtSilinder').setValue(xtext.fs_silinder_kendaraan);
						Ext.getCmp('txtWarna').setValue(xtext.fs_warna_kendaraan);
						Ext.getCmp('txtTahun').setValue(xtext.fn_tahun_kendaraan);
						Ext.getCmp('txtNorangka').setValue(xtext.fs_no_rangka);
						Ext.getCmp('txtNomesin').setValue(xtext.fs_no_mesin);
						Ext.getCmp('txtNomorBpkb').setValue(xtext.fs_nomor_bpkb);
						Ext.getCmp('cboNopol').setValue(xtext.fs_kode_wilayah_no_polisi);
						Ext.getCmp('cboKotaBPKB').setValue(xtext.fs_kota_bpkb);
						Ext.getCmp('txtWilayahAsuransi').setValue(xtext.fs_kode_wilayah_asuransi);
						Ext.getCmp('txtNoPol2').setValue(xtext.fs_no_polisi);
						Ext.getCmp('txtNoPol3').setValue(xtext.fs_kode_akhir_wilayah_no_polisi);
						Ext.getCmp('cboKomersil').setValue(xtext.fs_komersial);
						Ext.getCmp('txtNamaBpkb').setValue(xtext.fs_nama_bpkb);
						Ext.getCmp('txtAlamatbpkb').setValue(xtext.fs_alamat_bpkb);
						Ext.getCmp('cboAsuransi').setValue(xtext.fs_nama_asuransi);
						Ext.getCmp('txtNilaiAsuransi').setValue(xtext.fs_jenis_asuransi);
						Ext.getCmp('txtTenorMIX').setValue(xtext.fn_kali_masa_angsuran_dealer);
						Ext.getCmp('cboPerusahaanAsuransi').setValue(xtext.fs_nama_perusahaan_asuransi);
						Ext.getCmp('txtKodeAsuransi1').setValue(xtext.fs_kode_asuransi1);
						Ext.getCmp('txtKodeAsuransi2').setValue(xtext.fs_kode_asuransi2);
						Ext.getCmp('cboDealer').setValue(xtext.fs_nama_dealer);
						Ext.getCmp('txtRefundDealer').setValue(xtext.fs_refund_dealer);
						Ext.getCmp('txtSales').setValue(xtext.fs_salesman);
						Ext.getCmp('txtKodeDealer2').setValue(xtext.fs_kode_dealer2);
						Ext.getCmp('txtKodeDealer1').setValue(xtext.fs_kode_dealer1);
						Ext.getCmp('txtCabangDealer').setValue(xtext.fn_cabang_dealer);
						Ext.getCmp('cboCaraBayar').setValue(xtext.fs_cara_bayar);
						Ext.getCmp('cboPolaAngs').setValue(xtext.fs_pola_angsuran);
						Ext.getCmp('cboDimuka').setValue(xtext.fs_angsuran_dimuka);
						Ext.getCmp('txtDimukaKali').setValue(xtext.fn_kali_angsuran_dimuka);
						Ext.getCmp('cboPotongPencairan').setValue(xtext.fs_angsuran_dimuka_potong_pencairan);
						Ext.getCmp('txtHargaOTR').setValue(xtext.fn_harga_otr);
						Ext.getCmp('txtHargaOTRkonsumen').setValue(xtext.fn_harga_otr);
						Ext.getCmp('txtHargaOTRdealer').setValue(xtext.fn_harga_otr);
						Ext.getCmp('txtTenor').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor2').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor3').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor4').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor5').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTotalDp').setValue(xtext.fn_dp_bayar);
						Ext.getCmp('txtAngsuran').setValue(xtext.fn_angsuran_dealer);
						Ext.getCmp('txtBiayaAdm').setValue(xtext.fn_biaya_adm);
						Ext.getCmp('txtPremiGros').setValue(xtext.fn_premi_asuransi_gross);
						Ext.getCmp('txtPerluasan').setValue(xtext.fn_premi_asuransi_gross_perluasan);
						Ext.getCmp('txtBiayaTjH').setValue(xtext.fn_biaya_tjh);
						Ext.getCmp('txtPremiGrosFix').setValue(xtext.fn_premi_asuransi_gross);
						Ext.getCmp('txtAngsuranDimuka').setValue(xtext.fn_jumlah_angsuran_dimuka);
						Ext.getCmp('txtUangMuka').setValue(xtext.fn_uang_muka_dealer);
						Ext.getCmp('txtPremiNet').setValue(xtext.fn_premi_asuransi_netto);
						//alert(a);
						Ext.getCmp('txtTotalSelisihDP').setValue(xtext.fn_selisih_dp);
						Ext.getCmp('cboAngsuranDibayarDealer').setValue(xtext.fs_angsuran_dibayar_dealer);
						Ext.getCmp('txtAsuransiKonsumen').setValue(xtext.fn_asuransi_dikredit_konsumen);
						Ext.getCmp('txtAsuransiDealer').setValue(xtext.fn_asuransi_dikredit_dealer);
						Ext.getCmp('txtBungaFlat').setValue(xtext.fn_persen_bunga_flat_dealer);
						Ext.getCmp('txtBungaFlat3').setValue(xtext.fn_persen_bunga_flat_konsumen);
						Ext.getCmp('txtBungaFlatDealer').setValue(xtext.fn_persen_bunga_efektif_dealer);
						Ext.getCmp('txtBungaFlat4').setValue(xtext.fn_persen_bunga_efektif_konsumen);
						Ext.getCmp('txtBungaKonsumen').setValue(xtext.fn_bunga_konsumen);
						Ext.getCmp('txtBungaDealer').setValue(xtext.fn_bunga_dealer);
						Ext.getCmp('txtUangMukaDealerlabel').setValue(xtext.fs_uang_muka_dealer);
						Ext.getCmp('txtUangMukaDealer2').setValue(xtext.fs_uang_muka_dealer);
						Ext.getCmp('txtNamaIstri').setValue(xtext.fs_nama_pasangan);
						Ext.getCmp('txtAlamatIstri').setValue(xtext.fs_alamat_konsumen);
						Ext.getCmp('cboKodePosIstri').setValue(xtext.fs_kodepos_konsumen);
						Ext.getCmp('txtTeleponIstri').setValue(xtext.fs_telepon_konsumen);
						Ext.getCmp('txtKabupatenKotaIstri').setValue(xtext.fs_kota_konsumen);
						Ext.getCmp('cboUsahaKerjaan').setValue(xtext.fs_nama_usaha_pasangan);
						Ext.getCmp('txtKodeuUsahaKerjaan').setValue(xtext.fs_usaha_pasangan);
						Ext.getCmp('txtKeteranganUsahaIstri').setValue(xtext.fs_keterangan_usaha_pasangan);
						Ext.getCmp('txtAlamatUsahaSuamiIstri').setValue(xtext.fs_alamat_usaha_pasangan);
						Ext.getCmp('txtTeleponUsaha').setValue(xtext.fs_telepon_usaha_pasangan);
						Ext.getCmp('txtPendapatanSuamiIstri').setValue(xtext.fn_pendapatan_pasangan);
						Ext.getCmp('txtNamaPenjamin').setValue(xtext.fs_nama_penjamin);
						Ext.getCmp('txtAlamatPenjamin').setValue(xtext.fs_alamat_penjamin);
						Ext.getCmp('cboKodePosPenjamin').setValue(xtext.fs_kodepos_penjamin);
						Ext.getCmp('txtTeleponPenjamin').setValue(xtext.fs_telepon_penjamin);
						Ext.getCmp('txtKabupatenKotaPenjamin').setValue(xtext.fs_kota_penjamin);
						Ext.getCmp('cboUsahaKerjaanPenjamin').setValue(xtext.fs_nama_usaha_penjamin);
						Ext.getCmp('txtKodeUsahaPenjamin').setValue(xtext.fs_usaha_penjamin);
						Ext.getCmp('txtKeteranganUsahaPenjamin').setValue(xtext.fs_keterangan_usaha_penjamin);
						Ext.getCmp('txtAlamatUsahaPenjamin').setValue(xtext.fs_alamat_usaha_penjamin);
						Ext.getCmp('txtTeleponUsahaPenjamin').setValue(xtext.fs_telepon_usaha_penjamin);
						Ext.getCmp('txtPendapatanPenjamin').setValue(xtext.fn_pendapatan_penjamin);
						Ext.getCmp('txtStatusPenjamin').setValue(xtext.fs_status_penjamin);
						Ext.getCmp('txtRekeningCair').setValue(xtext.fs_atasnama_bank_pencairan);
						Ext.getCmp('cboPencairanKe').setValue(xtext.fs_cair_ke);
						Ext.getCmp('txtNamaBank').setValue(xtext.fs_nama_bank_pencairan);
						Ext.getCmp('txtNoRekCair').setValue(xtext.fs_rekening_bank_pencairan);
						Ext.getCmp('cboDeposit').setValue(xtext.fs_deposit_potong_pencairan);
						Ext.getCmp('txtNilaiCair').setValue(xtext.fn_nilai_pencairan);
						Ext.getCmp('txtNilaiCair3').setValue(xtext.fn_nilai_pencairan);






						
						
						//alert(xtext.hasil);
						winDuplikasiKonsumen.show();
						winDuplikasiKonsumen.center();

					}else {
						Ext.getCmp('txtNoApkB').setValue(xtext.fn_no_apk);
						Ext.getCmp('txtNoApkPB').setValue(xtext.fn_no_apk);
						Ext.getCmp('cboLembagaPembiayaanB').setValue(xtext.fs_lembaga_pembiayaan);
						Ext.getCmp('txtLembagaKeuangan2B').setValue(xtext.fs_nomor_dealer);
						Ext.getCmp('txtLembagaKeuangan1B').setValue(xtext.fs_kode_lokasi);
						Ext.getCmp('cboJenisB').setValue(xtext.fs_jenis_pembiayaan);
						Ext.getCmp('cboJenisPiuB').setValue(xtext.fs_jenis_piutang);
						Ext.getCmp('txtJenisPiuB').setValue(xtext.fs_jenis_piutang);
						Ext.getCmp('cboPaketB').setValue(xtext.fs_kode_paket);
						Ext.getCmp('txtKodePaketB').setValue(xtext.fs_kode_paket);
						Ext.getCmp('cboPolaB').setValue(xtext.fs_pola_transaksi);
						Ext.getCmp('cboFleetB').setValue(xtext.fs_fleet);
						Ext.getCmp('txtNoPjjB').setValue(xtext.fn_nomor_perjanjian);
						Ext.getCmp('txtNamaBadanUsahaB').setValue(xtext.fs_nama_konsumen);
						Ext.getCmp('txtAlamatBadanUsahaB').setValue(xtext.fs_alamat_konsumen);
						Ext.getCmp('cboKodePosB').setValue(xtext.fs_kodepos_konsumen);
						Ext.getCmp('txtKelurahanB').setValue(xtext.fs_kelurahan_konsumen);
						Ext.getCmp('txtKecamatanB').setValue(xtext.fs_kecamatan_konsumen);
						Ext.getCmp('txtPropinsiB').setValue(xtext.fs_propinsi_konsumen);
						Ext.getCmp('txtKabupatenKotaB').setValue(xtext.fs_kota_konsumen);
						Ext.getCmp('txtKodeDatiB').setValue(xtext.fs_kode_dati_konsumen);
						Ext.getCmp('txtNoNpwpB').setValue(xtext.fs_npwp_konsumen);
						Ext.getCmp('txtTeleponB').setValue(xtext.fs_telepon_konsumen);
						Ext.getCmp('txtEmailB').setValue(xtext.fs_email_konsumen);
						Ext.getCmp('txtNoSIUPB').setValue(xtext.fs_siup_perusahaan);
						Ext.getCmp('txtGroupUsahaB').setValue(xtext.fs_group_perusahaan);
						Ext.getCmp('txtNoTDPB').setValue(xtext.fs_tdp_perusahaan);
						Ext.getCmp('txtTeleponBadanUsahaB').setValue(xtext.fs_telepon_konsumen);
						Ext.getCmp('cboStatusUsahaB').setValue(xtext.fs_status_perusahaan);
						Ext.getCmp('cboBentukUsahaB').setValue(xtext.fs_bentuk_perusahaan);
						Ext.getCmp('cboStatusTempatUsahaB').setValue(xtext.fs_tempat_perusahaan);
						Ext.getCmp('txtBeroperasiSejakB').setValue(xtext.fs_beroperasi_sejak);
						Ext.getCmp('cboSkalaPerusahaan2B').setValue(xtext.fs_skala_perusahaan_konsumen);
						Ext.getCmp('cboKategoriUsahaB').setValue(xtext.fs_nama_usaha_konsumen);
						Ext.getCmp('txtKodeKategoriUsahaB').setValue(xtext.fs_kategori_usaha_konsumen);
						Ext.getCmp('txtJumlahKaryawanB').setValue(xtext.fn_jumlah_karyawan_perusahaan);
						Ext.getCmp('txtKeteranganUsahaB').setValue(xtext.fs_keterangan_usaha_konsumen);
						Ext.getCmp('txtOmsetB').setValue(xtext.fn_pendapatan_konsumen);
						Ext.getCmp('txtBiayaB').setValue(xtext.fn_biaya_konsumen);
						Ext.getCmp('txtMutasiKreditB').setValue(xtext.fn_mutasi_kredit);
						Ext.getCmp('txtMutasiDebetB').setValue(xtext.fn_mutasi_debet);
						Ext.getCmp('txtAlamatKorespondensiB').setValue(xtext.fs_alamat_korespondensi);
						Ext.getCmp('cboKodePos2B').setValue(xtext.fs_kodepos_korespondensi);
						Ext.getCmp('txtKabupatenKotaKonsumenB').setValue(xtext.fs_kota_korespondensi);
						Ext.getCmp('txtNamaPenanggungJawabB').setValue(xtext.fs_penanggungjawab_perusahaan);
						Ext.getCmp('txtNoKtpB').setValue(xtext.fs_ktp_penanggungjawab_perusahaan);
						Ext.getCmp('txtNoNpwpPenanggungJwbB').setValue(xtext.fs_npwp_penanggungjawab_perusahaan);
						Ext.getCmp('txtAlamatPenanggungJawabB').setValue(xtext.fs_alamat_penanggungjawab_perusahaan);
						Ext.getCmp('cboKodePos3B').setValue(xtext.fs_kodepos_penanggungjawab_perusahaan);
						Ext.getCmp('txtKotaPenanggungJawabB').setValue(xtext.fs_kota_penanggungjawab_perusahaan);
						Ext.getCmp('txtTeleponPenanggungJawabB').setValue(xtext.fs_telepon_penanggungjawab_perusahaan);
						Ext.getCmp('txtHpPenanggungJawabB').setValue(xtext.fs_handphone_penanggungjawab_perusahaan);
						Ext.getCmp('txtJabatanB').setValue(xtext.fs_jabatan_penanggungjawab_perusahaan);
						Ext.getCmp('cboFirstTimeB').setValue(xtext.fs_repeat_order);
						Ext.getCmp('txtKeB').setValue(xtext.fs_repeat_order_ke);
						Ext.getCmp('cboModelKendaraanB').setValue(xtext.fs_kode_kendaraan);
						Ext.getCmp('txtModelKendaraanB').setValue(xtext.fs_kode_kendaraan);
						Ext.getCmp('txtJenisKendaraanB').setValue(xtext.fs_jenis_kendaraan);
						Ext.getCmp('txtSilinderB').setValue(xtext.fs_silinder_kendaraan);
						Ext.getCmp('txtTahunB').setValue(xtext.fn_tahun_kendaraan);
						Ext.getCmp('txtWarnaB').setValue(xtext.fs_warna_kendaraan);
						Ext.getCmp('txtNorangkaB').setValue(xtext.fs_no_rangka);
						Ext.getCmp('txtNomesinB').setValue(xtext.fs_no_mesin);
						Ext.getCmp('cboKomersilB').setValue(xtext.fs_komersial);
						Ext.getCmp('txtNamaBpkbB').setValue(xtext.fs_nama_bpkb);
						Ext.getCmp('txtAlamatbpkbB').setValue(xtext.fs_alamat_bpkb);
						Ext.getCmp('cboAsuransiB').setValue(xtext.fs_nama_asuransi);
						Ext.getCmp('txtNilaiAsuransiB').setValue(xtext.fs_jenis_asuransi);
						Ext.getCmp('txtTenorMIXB').setValue(xtext.fn_kali_masa_angsuran_dealer);
						Ext.getCmp('txtNomorBpkbB').setValue(xtext.fs_nomor_bpkb);
						Ext.getCmp('cboNopolB').setValue(xtext.fs_kode_wilayah_no_polisi);
						Ext.getCmp('cboKotaBPKBB').setValue(xtext.fs_kota_bpkb);
						Ext.getCmp('txtWilayahAsuransiB').setValue(xtext.fs_kode_wilayah_asuransi);
						Ext.getCmp('txtNoPol2B').setValue(xtext.fs_no_polisi);
						Ext.getCmp('txtNoPol3B').setValue(xtext.fs_kode_akhir_wilayah_no_polisi);
						Ext.getCmp('cboPerusahaanAsuransiB').setValue(xtext.fs_nama_perusahaan_asuransi);
						Ext.getCmp('txtKodeAsuransi1B').setValue(xtext.fs_kode_asuransi1);
						Ext.getCmp('txtKodeAsuransi2B').setValue(xtext.fs_kode_asuransi2);
						Ext.getCmp('cboDealerB').setValue(xtext.fs_nama_dealer);
						Ext.getCmp('txtRefundDealerB').setValue(xtext.fs_refund_dealer);
						Ext.getCmp('txtSalesB').setValue(xtext.fs_salesman);
						Ext.getCmp('txtKodeDealer2B').setValue(xtext.fs_kode_dealer2);
						Ext.getCmp('txtKodeDealer1B').setValue(xtext.fs_kode_dealer1);
						Ext.getCmp('txtCabangDealerB').setValue(xtext.fn_cabang_dealer);
						Ext.getCmp('cboCaraBayarB').setValue(xtext.fs_cara_bayar);
						Ext.getCmp('cboPolaAngsB').setValue(xtext.fs_pola_angsuran);
						Ext.getCmp('cboDimukaB').setValue(xtext.fs_angsuran_dimuka);
						Ext.getCmp('txtDimukaKaliB').setValue(xtext.fn_kali_angsuran_dimuka);
						Ext.getCmp('cboPotongPencairanB').setValue(xtext.fs_angsuran_dimuka_potong_pencairan);
						Ext.getCmp('txtHargaOTRB').setValue(xtext.fn_harga_otr);
						Ext.getCmp('txtHargaOTRkonsumenB').setValue(xtext.fn_harga_otr);
						Ext.getCmp('txtHargaOTRdealerB').setValue(xtext.fn_harga_otr);
						Ext.getCmp('txtTenorB').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor2B').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor3B').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor4B').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTenor5B').setValue(xtext.fn_bulan_masa_angsuran_dealer);
						Ext.getCmp('txtTotalDpB').setValue(xtext.fn_dp_bayar);
						Ext.getCmp('txtAngsuranB').setValue(xtext.fn_angsuran_dealer);
						Ext.getCmp('txtBiayaAdmB').setValue(xtext.fn_biaya_adm);
						Ext.getCmp('txtPremiGrosB').setValue(xtext.fn_premi_asuransi_gross);
						Ext.getCmp('txtPerluasanB').setValue(xtext.fn_premi_asuransi_gross_perluasan);
						Ext.getCmp('txtBiayaTjHB').setValue(xtext.fn_biaya_tjh);
						Ext.getCmp('txtPremiGrosFixB').setValue(xtext.fn_premi_asuransi_gross);
						Ext.getCmp('txtAngsuranDimukaB').setValue(xtext.fn_jumlah_angsuran_dimuka);
						Ext.getCmp('txtUangMukaB').setValue(xtext.fn_uang_muka_dealer);
						Ext.getCmp('txtPremiNetB').setValue(xtext.fn_premi_asuransi_netto);
						//alert(a);
						Ext.getCmp('txtTotalSelisihDPB').setValue(xtext.fn_selisih_dp);
						Ext.getCmp('cboAngsuranDibayarDealerB').setValue(xtext.fs_angsuran_dibayar_dealer);
						Ext.getCmp('txtAsuransiKonsumenB').setValue(xtext.fn_asuransi_dikredit_konsumen);
						Ext.getCmp('txtAsuransiDealerB').setValue(xtext.fn_asuransi_dikredit_dealer);
						Ext.getCmp('txtBungaFlatB').setValue(xtext.fn_persen_bunga_flat_dealer);
						Ext.getCmp('txtBungaFlat3B').setValue(xtext.fn_persen_bunga_flat_konsumen);
						Ext.getCmp('txtBungaFlatDealerB').setValue(xtext.fn_persen_bunga_efektif_dealer);
						Ext.getCmp('txtBungaFlat4B').setValue(xtext.fn_persen_bunga_efektif_konsumen);
						Ext.getCmp('txtBungaKonsumenB').setValue(xtext.fn_bunga_konsumen);
						Ext.getCmp('txtBungaDealerB').setValue(xtext.fn_bunga_dealer);
						Ext.getCmp('txtUangMukaDealerlabelB').setValue(xtext.fs_uang_muka_dealer);
						Ext.getCmp('txtUangMukaDealer2B').setValue(xtext.fs_uang_muka_dealer);
						Ext.getCmp('txtRekeningCairB').setValue(xtext.fs_atasnama_bank_pencairan);
						Ext.getCmp('cboPencairanKeB').setValue(xtext.fs_cair_ke);
						Ext.getCmp('txtNamaBankB').setValue(xtext.fs_nama_bank_pencairan);
						Ext.getCmp('txtNoRekCairB').setValue(xtext.fs_rekening_bank_pencairan);
						Ext.getCmp('cboDepositB').setValue(xtext.fs_deposit_potong_pencairan);
						Ext.getCmp('txtNilaiCairB').setValue(xtext.fn_nilai_pencairan);
						Ext.getCmp('txtNilaiCair3B').setValue(xtext.fn_nilai_pencairan);
						
						winDuplikasiBadanUsaha.show();
						winDuplikasiBadanUsaha.center();
					}
					
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Kalkulasi Failed',
					title: 'SIAP'
				});
				//fnMaskHide();
			}
		});

	

	}	

	var winGridKodeTrans = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKodeTrans,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeTrans,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari19').setValue('');	
					winCariKodeTrans.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kode_transaksi', menuDisabled: true, width: 240},
			{text: 'Nama Transaksi', dataIndex: 'fs_nama_transaksi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Transakasi',
				id: 'txtCari19',
				name: 'txtCari19',
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
					grupKodeTrans.load();
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
				Ext.getCmp('cboKodeTrans').setValue(record.get('fs_kode_transaksi'));
				Ext.getCmp('txtNamaTransaksi').setValue(record.get('fs_nama_transaksi'));	
				
				winCariKodeTrans.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKodeTrans2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKodeTransB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeTransB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari19B').setValue('');	
					winCariKodeTrans2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kode_transaksi', menuDisabled: true, width: 240},
			{text: 'Nama Transaksi', dataIndex: 'fs_nama_transaksi', menuDisabled: true, width: 120}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Transakasi',
				id: 'txtCari19B',
				name: 'txtCari19B',
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
					grupKodeTransB.load();
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
				Ext.getCmp('cboKodeTrans2').setValue(record.get('fs_kode_transaksi'));
				Ext.getCmp('txtNamaTransaksiB').setValue(record.get('fs_nama_transaksi'));	
				
				winCariKodeTrans2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});


	var winCariKodeTrans = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeTrans
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeTrans.load();
				vMask.show();
			}
		}
	});

	var winCariKodeTrans2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeTrans2
		],
		listeners: {
			beforehide: function() {
				vMask3.hide();
			},
			beforeshow: function() {
				grupKodeTransB.load();
				vMask3.show();
			}
		}
	});

	var txtNamaTransaksi = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Nama Transaksi',
				labelAlign: 'top',
				labelSeparator: '',
				id: 'txtNamaTransaksi',
				name: 'txtNamaTransaksi',
				xtype: 'textfield'
	};

	var txtNamaTransaksiB = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Nama Transaksi',
				labelAlign: 'top',
				labelSeparator: '',
				id: 'txtNamaTransaksiB',
				name: 'txtNamaTransaksiB',
				xtype: 'textfield'
	};

	var txtNilaiTransaksi2 = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Nama Transaksi',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtNilaiTransaksi2',
				name: 'txtNilaiTransaksi2',
				xtype: 'textfield'
	};

	var txtNilaiTransaksi22 = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Nama Transaksi',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtNilaiTransaksi22',
				name: 'txtNilaiTransaksi22',
				xtype: 'textfield'
	};

	var txtPersentase2 = {
		anchor: '120%',
				style:'margin-left:90px',
				fieldLabel: '%',
				labelAlign: 'top',
				labelSeparator: '',
				id: 'txtPersentase2',
				name: 'txtPersentase2',
				xtype: 'textfield',
				allowDecimals: true,
				value: 100,
				enforceMaxLength:true,
				maxLength:3,
				hideTrigger: true,
		        keyNavEnabled: false,
		        mouseWheelEnabled: false,
		        listeners: {
												    'change': function(field,newValue){

												   
												    	var nilatrans = Ext.getCmp('txtNilaiTransaksiB').getValue();
												    	var nilatrans2 = Ext.getCmp('txtNilaiTransaksi22').getValue();

												    	if(nilatrans2==0){

												    		Ext.getCmp('txtNilaiTransaksi22').setValue(nilatrans);
												    		var nilaix = Ext.getCmp('txtNilaiTransaksi22').getValue();


												    	}
												    	else {

												    		Ext.getCmp('txtNilaiTransaksi22').setValue(nilatrans2);
												    		var nilaix = Ext.getCmp('txtNilaiTransaksi22').getValue();
												    	}

												    	if(newValue==''){

												    	var hasil = nilaix;

												    	Ext.getCmp('txtNilaiTransaksiB').setValue(hasil);
												    	}
												    	else {
												    	//var persen = newValue / 100;

												    	var hasils = nilaix * newValue;
												    	var hasil = hasils / 100;
												    	//alert(hasil);

												    	Ext.getCmp('txtNilaiTransaksiB').setValue(hasil);
												    	}
												    	




												    //pokokpembiayaan();

												   // bunga();

												     //PremiGross();

												    //PremiNett();

												   		 }
													 }
					};

	var txtPersentase = {
		anchor: '120%',
				style:'margin-left:90px',
				fieldLabel: '%',
				labelAlign: 'top',
				labelSeparator: '',
				id: 'txtPersentase',
				name: 'txtPersentase',
				xtype: 'textfield',
				allowDecimals: true,
				value: 100,
				enforceMaxLength:true,
				maxLength:3,
				hideTrigger: true,
		        keyNavEnabled: false,
		        mouseWheelEnabled: false,
		        listeners: {
												    'change': function(field,newValue){

												   
												    	var nilatrans = Ext.getCmp('txtNilaiTransaksi').getValue();
												    	var nilatrans2 = Ext.getCmp('txtNilaiTransaksi2').getValue();

												    	if(nilatrans2==0){

												    		Ext.getCmp('txtNilaiTransaksi2').setValue(nilatrans);
												    		var nilaix = Ext.getCmp('txtNilaiTransaksi2').getValue();


												    	}
												    	else {

												    		Ext.getCmp('txtNilaiTransaksi2').setValue(nilatrans2);
												    		var nilaix = Ext.getCmp('txtNilaiTransaksi2').getValue();
												    	}

												    	if(newValue==''){

												    	var hasil = nilaix;

												    	Ext.getCmp('txtNilaiTransaksi').setValue(hasil);
												    	}
												    	else {
												    	//var persen = newValue / 100;

												    	var hasils = nilaix * newValue;
												    	var hasil = hasils / 100;
												    	//alert(hasil);

												    	Ext.getCmp('txtNilaiTransaksi').setValue(hasil);
												    	}
												    	




												    //pokokpembiayaan();

												   // bunga();

												     //PremiGross();

												    //PremiNett();

												   		 }
													 }
					};

	var cboKodeTrans = {
		anchor: '95%',
				emptyText: 'Select a Kode',
				fieldLabel: 'Kode',
				id: 'cboKodeTrans',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboKodeTrans',
				xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {

				if(newValue=='BFD'){


					Ext.Ajax.request({
						method: 'POST',
						url: 'konsumen/biayafidusia',
						params: {
							'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
							'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
							'fs_otr': Ext.getCmp('txtHargaOTR').getValue()
						},
						success: function(response) {
							var xtext = Ext.decode(response.responseText);
							
							if (xtext.sukses === true) {
								//	Ext.getCmp('cboGL').setValue(xtext.kdacno);
									Ext.getCmp('txtNilaiTransaksi').setValue(xtext.hasil);
									Ext.getCmp('txtNilaiTransaksi2').setValue(xtext.hasil);
								
							}
						},
						failure: function(response) {
							var xtext = Ext.decode(response.responseText);
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.OK,
								closable: false,
								icon: Ext.MessageBox.INFO,
								msg: 'Kalkulasi Failed',
								title: 'SIAP'
							});
							fnMaskHide();
						}
					});

				}


				if(newValue=='TP4'){

					var nilairefund =  Ext.getCmp('txtRefundDealer').getValue();
					var bunga =  Ext.getCmp('txtBungaFlat').getValue();
					var tenor =  Ext.getCmp('txtTenor').getValue();


					var pokokpembiayaan =  Ext.getCmp('txtPokokPembiayaanDealer').getValue();

					if(tenor>0 && tenor <= 12){
						var tenorfix = 1;
					}
					else if(tenor>12 && tenor <= 24){
						var tenorfix = 2;
					}
					else if(tenor>24 && tenor <= 36){
						var tenorfix = 3;
					}
					else if(tenor>36 && tenor <= 48){
						var tenorfix = 4;
					}
					else if(tenor>48){
						var tenorfix = 4;
					}

					var a = nilairefund * tenorfix;
					var b = bunga * tenorfix;
					var d = b.toFixed(2) + 100;

					var e = parseFloat(d).toFixed(2);
					var c =  a/e;

					var hasil = c * pokokpembiayaan;


					Ext.getCmp('txtNilaiTransaksi').setValue(hasil);
					Ext.getCmp('txtNilaiTransaksi2').setValue(hasil);

				}
				Ext.getCmp('txtNamaTransaksi').setValue('');
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
					winCariKodeTrans.show();
					winCariKodeTrans.center();
				}
			}
		}
	};

	var cboKodeTrans2 = {
		anchor: '95%',
				emptyText: 'Select a Kode',
				fieldLabel: 'Kode',
				id: 'cboKodeTrans2',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboKodeTrans2',
				xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {

				if(newValue=='BFD'){


					Ext.Ajax.request({
						method: 'POST',
						url: 'konsumen/biayafidusia',
						params: {
							'fs_jenis_piutang': Ext.getCmp('cboJenisPiuB').getValue(),
							'fs_pola_transaksi': Ext.getCmp('cboPolaB').getValue(),
							'fs_otr': Ext.getCmp('txtHargaOTRB').getValue()
						},
						success: function(response) {
							var xtext = Ext.decode(response.responseText);
							
							if (xtext.sukses === true) {
								//	Ext.getCmp('cboGL').setValue(xtext.kdacno);
									Ext.getCmp('txtNilaiTransaksiB').setValue(xtext.hasil);
									Ext.getCmp('txtNilaiTransaksi22').setValue(xtext.hasil);
								
							}
						},
						failure: function(response) {
							var xtext = Ext.decode(response.responseText);
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.OK,
								closable: false,
								icon: Ext.MessageBox.INFO,
								msg: 'Kalkulasi Failed',
								title: 'SIAP'
							});
							fnMaskHide();
						}
					});

				}


				if(newValue=='TP4'){

					var nilairefund =  Ext.getCmp('txtRefundDealerB').getValue();
					var bunga =  Ext.getCmp('txtBungaFlatB').getValue();
					var tenor =  Ext.getCmp('txtTenorB').getValue();


					var pokokpembiayaan =  Ext.getCmp('txtPokokPembiayaanDealerB').getValue();

					if(tenor>0 && tenor <= 12){
						var tenorfix = 1;
					}
					else if(tenor>12 && tenor <= 24){
						var tenorfix = 2;
					}
					else if(tenor>24 && tenor <= 36){
						var tenorfix = 3;
					}
					else if(tenor>36 && tenor <= 48){
						var tenorfix = 4;
					}
					else if(tenor>48){
						var tenorfix = 4;
					}

					var a = nilairefund * tenorfix;
					var b = bunga * tenorfix;
					var d = b.toFixed(2) + 100;

					var e = parseFloat(d).toFixed(2);
					var c =  a/e;

					var hasil = c * pokokpembiayaan;


					Ext.getCmp('txtNilaiTransaksiB').setValue(hasil);
					Ext.getCmp('txtNilaiTransaksi22').setValue(hasil);

				}
				Ext.getCmp('txtNamaTransaksiB').setValue('');
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
					winCariKodeTrans2.show();
					winCariKodeTrans2.center();
				}
			}
		}
	};


	var gridKode = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 470,
		sortableColumns: false,
		store: grupKodeTrans2,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_kode_transaksi',
			text: 'Kode',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_transaksi',
			text: 'Nama Transaksi',
			flex: 1.25,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_persentase',
			text: 'Persentase',
			flex: 1.25,
			menuDisabled: true
		},
		{
			align: 'right',
			dataIndex: 'fs_nilai_transaksi',
			format: '0,000.00',
			menuDisabled: true,
			text: 'Nilai Transaksi',
			flex: 1.25,
			xtype: 'numbercolumn',
			editor: [
				Ext.create('Ext.ux.form.NumericField', {
					alwaysDisplayDecimals: true,
					currencySymbol: null,
					decimalPrecision: 2,
					decimalSeparator: '.',
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false,
					thousandSeparator: ',',
					useThousandSeparator: true,
					xtype: 'numberfield'
				})
			]
		},
		{
			dataIndex: 'fs_termasuk_dp',
			text: 'Ditagih Konsumen',
			flex: 1.25,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_tambah_cair',
			text: 'Cair Ke Dealer',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			itemclick: function(dv, record, item, index, e) {
				//alert(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApkTransK').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtKodeCabangTransK').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtKodeTransK').setValue(record.get('fs_kode_transaksi'));


				
			},
			selectionchange: function(view, records) {
				gridKode.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboKodeTrans
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtNamaTransaksi
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtPersentase,
				txtNilaiTransaksi2
			]
		},
		{
			flex: 0,
			layout: 'anchor',
			xtype: 'container',
			items: [
				
			]
		},
		{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												labelSeparator: '',
												fieldLabel: 'Nilai Transaksi',
												hideTrigger: true,
												fieldStyle: 'text-align:right',
												id: 'txtNilaiTransaksi',
												anchor: '150%',
												labelAlign:'top',
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtNilaiTransaksi',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											
											})
			]
		},
		{
			flex: 0.7,
			layout: 'anchor',
			xtype: 'container',
			items: [
																	txtNoApkTransK,
																	txtKodeCabangTransK,
																	txtKodeTransK,
				
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '80%',
		labelAlign:'top',
		valueField: 'fs_kd_strx7',
		displayField: 'fs_nm_strx7',
		fieldLabel: 'Termasuk DP',
		id: 'cboTermasukDP',
		name: 'cboTermasukDP',
		store: grupTermasukDP,
		xtype: 'combobox',
		editable:false,
		value:' '
			}
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '80%',
		labelAlign:'top',
		valueField: 'fs_kd_strx8',
		displayField: 'fs_nm_strx8',
		fieldLabel: 'Tambah Cair',
		editable:false,
		id: 'cboTambahCair',
		name: 'cboTambahCair',
		store: grupTambahCair,
		xtype: 'combobox',
		value:' '
			}
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupKodeTrans2.getCount();
									var xprod = Ext.getCmp('cboKodeTrans').getValue();
									var xdata = Ext.create('DataGridProd', {
										fs_kode_transaksi: Ext.getCmp('cboKodeTrans').getValue(),
										fs_nama_transaksi: Ext.getCmp('txtNamaTransaksi').getValue(),
										fs_persentase: Ext.getCmp('txtPersentase').getValue(),
										fs_nilai_transaksi: Ext.getCmp('txtNilaiTransaksi').getValue(),
										fs_termasuk_dp: Ext.getCmp('cboTermasukDP').getValue(),
										fs_tambah_cair: Ext.getCmp('cboTambahCair').getValue(),
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridKode.getStore();
									var xlanjut = true;

									var xwh = Ext.getCmp('cboTermasukDP').getValue();
									if (xwh.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Termasuk DP masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwz = Ext.getCmp('cboTambahCair').getValue();
									if (xwz.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tambah Cair masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwa = Ext.getCmp('cboKodeTrans').getValue();
									if (xwa.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Kode Transaksi masih kosong!',
											title: 'SIAP'
										});
										return;
									}
					

									store.each(function(record, idx) {
										var xtext = record.get('fs_kode_transaksi').trim();
										
										if (xtext == xprod) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Transaction Code already exists, add transaction cancel!!',
												title: 'IDS'
											});
											xlanjut = false;
										}
										
									});
									if (xlanjut === false) {
										return;
									}
									
									grupKodeTrans2.insert(xtotal, xdata);
									Ext.getCmp('cboKodeTrans').setValue('');
									Ext.getCmp('txtNamaTransaksi').setValue('');
									Ext.getCmp('txtPersentase').setValue('100');
									Ext.getCmp('txtNilaiTransaksi').setValue('');
									Ext.getCmp('txtNilaiTransaksi2').setValue('');
									Ext.getCmp('cboTambahCair').setValue('');
									Ext.getCmp('cboTermasukDP').setValue('');
									
									xtotal = grupKodeTrans2.getCount() - 1;
									gridKode.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					fnDeleteTransK();
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});
	
	var gridKode2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 470,
		sortableColumns: false,
		store: grupKodeTrans2B,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_kode_transaksi',
			text: 'Kode',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_transaksi',
			text: 'Nama Transaksi',
			flex: 1.25,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_persentase',
			text: 'Persentase',
			flex: 1.25,
			menuDisabled: true
		},
		{
			align: 'right',
			dataIndex: 'fs_nilai_transaksi',
			format: '0,000.00',
			menuDisabled: true,
			text: 'Nilai Transaksi',
			flex: 1.25,
			xtype: 'numbercolumn',
			editor: [
				Ext.create('Ext.ux.form.NumericField', {
					alwaysDisplayDecimals: true,
					currencySymbol: null,
					decimalPrecision: 2,
					decimalSeparator: '.',
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false,
					thousandSeparator: ',',
					useThousandSeparator: true,
					xtype: 'numberfield'
				})
			]
		},
		{
			dataIndex: 'fs_termasuk_dp',
			text: 'Ditagih Konsumen',
			flex: 1.25,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_tambah_cair',
			text: 'Cair Ke Dealer',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridKode2.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboKodeTrans2
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtNamaTransaksiB
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtPersentase2,
				txtNilaiTransaksi22
			]
		},
		{
			flex: 0,
			layout: 'anchor',
			xtype: 'container',
			items: [
				
			]
		},
		{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												labelSeparator: '',
												fieldLabel: 'Nilai Transaksi',
												hideTrigger: true,
												fieldStyle: 'text-align:right',
												id: 'txtNilaiTransaksiB',
												anchor: '150%',
												labelAlign:'top',
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtNilaiTransaksiB',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
											
											})
			]
		},
		{
			flex: 0.7,
			layout: 'anchor',
			xtype: 'container',
			items: [
				
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '80%',
		labelAlign:'top',
		valueField: 'fs_kd_strx7',
		displayField: 'fs_nm_strx7',
		fieldLabel: 'Termasuk DP',
		id: 'cboTermasukDP2',
		name: 'cboTermasukDP2',
		store: grupTermasukDP2,
		xtype: 'combobox',
		editable:false,
		value:' '
			}
			]
		},
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				{
		anchor: '80%',
		labelAlign:'top',
		valueField: 'fs_kd_strx8',
		displayField: 'fs_nm_strx8',
		fieldLabel: 'Tambah Cair',
		editable:false,
		id: 'cboTambahCair2',
		name: 'cboTambahCair2',
		store: grupTambahCair2,
		xtype: 'combobox',
		value:' '
			}
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupKodeTrans2B.getCount();
									var xprod = Ext.getCmp('cboKodeTrans2').getValue();
									var xdata = Ext.create('DataGridProd', {
										fs_kode_transaksi: Ext.getCmp('cboKodeTrans2').getValue(),
										fs_nama_transaksi: Ext.getCmp('txtNamaTransaksiB').getValue(),
										fs_persentase: Ext.getCmp('txtPersentase2').getValue(),
										fs_nilai_transaksi: Ext.getCmp('txtNilaiTransaksiB').getValue(),
										fs_termasuk_dp: Ext.getCmp('cboTermasukDP2').getValue(),
										fs_tambah_cair: Ext.getCmp('cboTambahCair2').getValue(),
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridKode2.getStore();
									var xlanjut = true;

									var xwh = Ext.getCmp('cboTermasukDP2').getValue();
									if (xwh.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Termasuk DP masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwz = Ext.getCmp('cboTambahCair2').getValue();
									if (xwz.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Tambah Cair masih kosong!',
											title: 'SIAP'
										});
										return;
									}

									var xwa = Ext.getCmp('cboKodeTrans2').getValue();
									if (xwa.trim() === '') {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.Msg.WARNING,
											msg: 'Option Kode Transaksi masih kosong!',
											title: 'SIAP'
										});
										return;
									}
					

									store.each(function(record, idx) {
										var xtext = record.get('fs_kode_transaksi').trim();
										
										if (xtext == xprod) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Transaction Code already exists, add transaction cancel!!',
												title: 'IDS'
											});
											xlanjut = false;
										}
										
									});
									if (xlanjut === false) {
										return;
									}
									
									grupKodeTrans2B.insert(xtotal, xdata);
									Ext.getCmp('cboKodeTrans2').setValue('');
									Ext.getCmp('txtNamaTransaksiB').setValue('');
									Ext.getCmp('txtPersentase2').setValue('100');
									Ext.getCmp('txtNilaiTransaksi22').setValue('');
									Ext.getCmp('cboTambahCair2').setValue('');
									Ext.getCmp('cboTermasukDP2').setValue('');
									
									xtotal = grupKodeTrans2B.getCount() - 1;
									gridKode2.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridKode2.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupKodeTrans2B.remove(sm.getSelection());
					gridKode2.getView().refresh();
					if (grupKodeTrans2B.getCount() > 0) {
						sm.select(0);
					}
					
					var xprod = Ext.getCmp('txtProdAktif').getValue();
					var xQty = 0;
					store = gridKode2.getStore();
					store.each(function(record, idx) {
						if (xprod.trim() == record.get('fs_kode_transaksi').trim()) {
							xQty = xQty + 1;
						}
					});
					gridKode2.getView().refresh();
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});


	var winKode = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		// height: 450,
		layout: 'fit',
		resizable: false,
		title: 'Detail Transaksi',
		width: 900,
		items: [
			gridKode
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeTrans2.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'SAVE',
			handler: function() {

				winKode.hide();
				vMask.hide();
				fnCekSaveTrans();
			}
		},
		{
					text: 'Cancel',
					handler: function() {
						
						winKode.hide();
						vMask.hide();
					}
				}]
	});

	var winKode2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		// height: 450,
		layout: 'fit',
		resizable: false,
		title: 'Detail Transaksi',
		width: 900,
		items: [
			gridKode2
		],
		listeners: {
			beforehide: function() {
				vMask3.hide();
			},
			beforeshow: function() {
				grupKodeTrans2B.load();
				vMask3.show();
			}
		},
		buttons: [{
			text: 'SAVE',
			handler: function() {

				winKode2.hide();
				vMask3.hide();
				fnCekSaveTrans2();
			}
		},
		{
					text: 'Cancel',
					handler: function() {
						
						winKode2.hide();
						vMask3.hide();
					}
				}]
	});


	function fnCekSaveTrans() {
			//grupKodeTrans2.clearFilter();
			var xkodetrans = '';
			var xnamatrans = '';
			var xpersentase = '';
			var xnilaitransaksi = '';
			var xditagihkonsumen = '';
			var xcairdelaer = 0;
			
			var store = gridKode.getStore();
			store.each(function(record, idx) {
				xkodetrans = xkodetrans +'|'+ record.get('fs_kode_transaksi');
				xnamatrans = xnamatrans +'|'+ record.get('fs_nama_transaksi');
				xpersentase = xpersentase +'|'+ record.get('fs_persentase');
				xnilaitransaksi = xnilaitransaksi +'|'+ record.get('fs_nilai_transaksi');
				xditagihkonsumen = xditagihkonsumen +'|'+ record.get('fs_termasuk_dp');
				xcairdelaer = xcairdelaer +'|'+ record.get('fs_tambah_cair');
				
			});
			
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'koreksi/ceksavetrans',
				params: {
					'fs_kode_transaksi': xkodetrans,
					'fs_nama_transaksi': xnamatrans,
					'fs_persentase': xpersentase,
					'fs_nilai_transaksi': xnilaitransaksi,
					'fs_termasuk_dp': xditagihkonsumen,
					'fs_tambah_cair': xcairdelaer
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
							fnSaveTrans();
							fnMaskHide();
							//vMask.hide();

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
										fnSaveTrans();
										fnMaskHide();

										//vMask.hide();

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
						title: 'IDS'
					});
					fnMaskHide();
					vMask.hide();
				}
			});
	}

		function savePerluasan() {
			grupPerluasan.clearFilter();
			var xtahun = '';
			var xjenisperluasan = '';
			var xtenor = '';
			

			var store = gridPerluasan.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tenor_perluasan');
				xjenisperluasan = xjenisperluasan +'|'+ record.get('fs_jenis_perluasan');
				xtenor = xtenor +'|'+ record.get('fs_tenor');
				
			});
			
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'koreksi/saveperluasan',
				params: {
					'fs_tahun_ke': xtahun,
					'fs_tenor': xtenor,
					'fs_jenis_perluasan': xjenisperluasan,
					'fn_no_apk': Ext.getCmp('txtNoApk').getValue()
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

					fnMaskHide();
					//vMask.hide();
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
					vMask.hide();
				}
			});
	}

	function savePerluasan2() {
			grupPerluasanB.clearFilter();
			var xtahun = '';
			var xjenisperluasan = '';
			var xtenor = '';
			

			var store = gridPerluasan2.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tenor_perluasan');
				xjenisperluasan = xjenisperluasan +'|'+ record.get('fs_jenis_perluasan');
				xtenor = xtenor +'|'+ record.get('fs_tenor');
				
			});
			
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'koreksi/saveperluasan',
				params: {
					'fs_tahun_ke': xtahun,
					'fs_tenor': xtenor,
					'fs_jenis_perluasan': xjenisperluasan,
					'fn_no_apk': Ext.getCmp('txtNoApkB').getValue()
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

					fnMaskHide3();
					//vMask.hide();
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
					fnMaskHide3();
					vMask3.hide();
				}
			});
	}

	function fnCekSaveTrans2() {
			//grupKodeTrans2.clearFilter();
			var xkodetrans = '';
			var xnamatrans = '';
			var xpersentase = '';
			var xnilaitransaksi = '';
			var xditagihkonsumen = '';
			var xcairdelaer = 0;
			
			var store = gridKode2.getStore();
			store.each(function(record, idx) {
				xkodetrans = xkodetrans +'|'+ record.get('fs_kode_transaksi');
				xnamatrans = xnamatrans +'|'+ record.get('fs_nama_transaksi');
				xpersentase = xpersentase +'|'+ record.get('fs_persentase');
				xnilaitransaksi = xnilaitransaksi +'|'+ record.get('fs_nilai_transaksi');
				xditagihkonsumen = xditagihkonsumen +'|'+ record.get('fs_termasuk_dp');
				xcairdelaer = xcairdelaer +'|'+ record.get('fs_tambah_cair');
				
			});
			
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'koreksi/ceksavetrans',
				params: {
					'fs_kode_transaksi': xkodetrans,
					'fs_nama_transaksi': xnamatrans,
					'fs_persentase': xpersentase,
					'fs_nilai_transaksi': xnilaitransaksi,
					'fs_termasuk_dp': xditagihkonsumen,
					'fs_tambah_cair': xcairdelaer
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
							fnSaveTrans2();
							fnMaskHide3();
							//vMask.hide();

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
										fnSaveTrans2();
										fnMaskHide3();

										//vMask.hide();

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
						title: 'IDS'
					});
					fnMaskHide3();
					vMask3.hide();
				}
			});
	}

	function fnSaveTrans() {
		var xkodetrans = '';
			var xnamatrans = '';
			var xpersentase = '';
			var xnilaitransaksi = '';
			var xditagihkonsumen = '';
			var xcairdelaer = 0;
			
			var store = gridKode.getStore();
			store.each(function(record, idx) {
				xkodetrans = xkodetrans +'|'+ record.get('fs_kode_transaksi');
				xnamatrans = xnamatrans +'|'+ record.get('fs_nama_transaksi');
				xpersentase = xpersentase +'|'+ record.get('fs_persentase');
				xnilaitransaksi = xnilaitransaksi +'|'+ record.get('fs_nilai_transaksi');
				xditagihkonsumen = xditagihkonsumen +'|'+ record.get('fs_termasuk_dp');
				xcairdelaer = xcairdelaer +'|'+ record.get('fs_tambah_cair');
				
			});
			
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'koreksi/savetrans',
			params: {
					'fs_kode_transaksi': xkodetrans,
					'fs_nama_transaksi': xnamatrans,
					'fs_persentase': xpersentase,
					'fs_nilai_transaksi': xnilaitransaksi,
					'fs_termasuk_dp': xditagihkonsumen,
					'fs_tambah_cair': xcairdelaer,
					'fn_no_apk' : Ext.getCmp('txtNoApk').getValue(),
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

					//alert(xtext.total_trans2);
					Ext.getCmp('txtTotalTrans').setValue(xtext.total_trans);
					Ext.getCmp('txtTotalTrans2').setValue(xtext.total_trans2);

					//fnResetTrans();
					fnMaskHide();
					//vMask.hide();
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
				fnMaskHide3();
				vMask3.hide();
			}
		});
	}

	function fnSaveTrans2() {
		var xkodetrans = '';
			var xnamatrans = '';
			var xpersentase = '';
			var xnilaitransaksi = '';
			var xditagihkonsumen = '';
			var xcairdelaer = 0;
			
			var store = gridKode2.getStore();
			store.each(function(record, idx) {
				xkodetrans = xkodetrans +'|'+ record.get('fs_kode_transaksi');
				xnamatrans = xnamatrans +'|'+ record.get('fs_nama_transaksi');
				xpersentase = xpersentase +'|'+ record.get('fs_persentase');
				xnilaitransaksi = xnilaitransaksi +'|'+ record.get('fs_nilai_transaksi');
				xditagihkonsumen = xditagihkonsumen +'|'+ record.get('fs_termasuk_dp');
				xcairdelaer = xcairdelaer +'|'+ record.get('fs_tambah_cair');
				
			});
			
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'koreksi/savetrans',
			params: {
					'fs_kode_transaksi': xkodetrans,
					'fs_nama_transaksi': xnamatrans,
					'fs_persentase': xpersentase,
					'fs_nilai_transaksi': xnilaitransaksi,
					'fs_termasuk_dp': xditagihkonsumen,
					'fs_tambah_cair': xcairdelaer,
					'fn_no_apk' : Ext.getCmp('txtNoApkB').getValue(),
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

					//alert(xtext.total_trans2);
					Ext.getCmp('txtTotalTrans').setValue(xtext.total_trans);
					Ext.getCmp('txtTotalTrans2').setValue(xtext.total_trans2);

					//fnResetTrans();
					fnMaskHide();
					//vMask.hide();
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
				vMask.hide();
			}
		});
	}

	function fnCekSave2() {
		if (this.up('form2').getForm().isValid()) {

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'badan_usaha/CekSimpan',
				params: {
				'fn_no_batch': '',
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1B').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2B').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiuB').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPolaB').getValue(),
				'fs_nama_badan_usaha': Ext.getCmp('txtNamaBadanUsahaB').getValue()

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

	function fnSimpan2() {
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'badan_usaha/Simpan',
			params: {
				'fd_tgl_apk': Ext.Date.format(Ext.getCmp('txtRefnodtB').getValue(), 'Y-m-d'),
				'fs_jenis_pembiayaan': Ext.getCmp('cboJenisB').getValue(),
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1B').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2B').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiuB').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPolaB').getValue(),
				'fs_kode_paket': Ext.getCmp('txtKodePaketB').getValue(),
				'fs_fleet': Ext.getCmp('cboFleetB').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaBadanUsahaB').getValue(),
				'fs_alamat_konsumen': Ext.getCmp('txtAlamatBadanUsahaB').getValue(),
				'fs_kelurahan_konsumen': Ext.getCmp('txtKelurahanB').getValue(),
				'fs_kecamatan_konsumen': Ext.getCmp('txtKecamatanB').getValue(),
				'fs_kode_dati_konsumen': Ext.getCmp('txtKodeDatiB').getValue(),
				'fs_propinsi_konsumen': Ext.getCmp('txtPropinsiB').getValue(),
				'fs_kota_konsumen': Ext.getCmp('txtKabupatenKotaB').getValue(),
				'fs_kodepos_konsumen': Ext.getCmp('cboKodePosB').getValue(),
				'fs_telepon_konsumen': Ext.getCmp('txtTeleponB').getValue(),
				'fs_group_perusahaan': Ext.getCmp('txtGroupUsahaB').getValue(),
				'fs_email_konsumen': Ext.getCmp('txtEmailB').getValue(),
				'fs_npwp_konsumen': Ext.getCmp('txtNoNpwpB').getValue(),
				'fs_siup_perusahaan': Ext.getCmp('txtNoSIUPB').getValue(),
				'fs_tdp_perusahaan': Ext.getCmp('txtNoTDPB').getValue(),
				'fs_telfon_usaha_konsumen': Ext.getCmp('txtTeleponBadanUsahaB').getValue(),
				'fs_bentuk_perusahaan': Ext.getCmp('cboBentukUsahaB').getValue(),
				'fs_status_perusahaan': Ext.getCmp('cboStatusUsahaB').getValue(),
				'fs_tempat_perusahaan': Ext.getCmp('cboStatusTempatUsahaB').getValue(),
				'fs_beroperasi_sejak': Ext.getCmp('txtBeroperasiSejakB').getValue(),
				'fs_kategori_perusahaan_konsumen': Ext.getCmp('cboSkalaPerusahaan2B').getValue(),
				'fs_kategori_usaha_konsumen': Ext.getCmp('txtKodeKategoriUsahaB').getValue(),
				'fs_keterangan_usaha_konsumen': Ext.getCmp('txtKeteranganUsahaB').getValue(),
				'fn_jumlah_karyawan_perusahaan': Ext.getCmp('txtJumlahKaryawanB').getValue(),
				'fn_pendapatan_konsumen': Ext.getCmp('txtOmsetB').getValue(),
				'fn_biaya_konsumen': Ext.getCmp('txtBiayaB').getValue(),
				'fn_mutasi_debet': Ext.getCmp('txtMutasiDebetB').getValue(),
				'fn_mutasi_kredit': Ext.getCmp('txtMutasiKreditB').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiuB').getValue(),
				'fs_alamat_korespondensi': Ext.getCmp('txtAlamatKorespondensiB').getValue(),
				'fs_kota_korespondensi': Ext.getCmp('txtKabupatenKotaKonsumenB').getValue(),
				'fs_kodepos_korespondensi': Ext.getCmp('cboKodePos2B').getValue(),
				'fs_penanggungjawab_perusahaan': Ext.getCmp('txtNamaPenanggungJawabB').getValue(),
				'fs_ktp_penanggungjawab_perusahaan': Ext.getCmp('txtNoKtpB').getValue(),
				'fs_npwp_penanggungjawab_perusahaan': Ext.getCmp('txtNoNpwpPenanggungJwbB').getValue(),
				'fs_alamat_penanggungjawab_perusahaan': Ext.getCmp('txtAlamatPenanggungJawabB').getValue(),
				'fs_kota_penanggungjawab_perusahaan': Ext.getCmp('txtKotaPenanggungJawabB').getValue(),
				'fs_kodepos_penanggungjawab_perusahaan': Ext.getCmp('cboKodePos3B').getValue(),
				'fs_jabatan_penanggungjawab_perusahaan': Ext.getCmp('txtJabatanB').getValue(),
				'fs_telepon_penanggungjawab_perusahaan': Ext.getCmp('txtTeleponPenanggungJawabB').getValue(),
				'fs_handphone_penanggungjawab_perusahaan': Ext.getCmp('txtHpPenanggungJawabB').getValue(),
				'fs_repeat_order': Ext.getCmp('cboFirstTimeB').getValue(),
				'fs_repeat_order_ke': Ext.getCmp('txtKeB').getValue(),
				'fs_kode_kendaraan': Ext.getCmp('txtModelKendaraanB').getValue(),
				'fs_jenis_kendaraan': Ext.getCmp('txtJenisKendaraanB').getValue(),
				'fs_silinder_kendaraan': Ext.getCmp('txtSilinderB').getValue(),
				'fn_tahun_kendaraan': Ext.getCmp('txtTahunB').getValue(),
				'fs_warna_kendaraan': Ext.getCmp('txtWarnaB').getValue(),
				'fs_no_rangka': Ext.getCmp('txtNorangkaB').getValue(),
				'fs_no_mesin': Ext.getCmp('txtNomesinB').getValue(),
				'fs_komersial': Ext.getCmp('cboKomersilB').getValue(),
				'fs_nama_bpkb': Ext.getCmp('txtNamaBpkbB').getValue(),
				'fs_alamat_bpkb': Ext.getCmp('txtAlamatbpkbB').getValue(),
				'fs_nomor_bpkb': Ext.getCmp('txtNomorBpkbB').getValue(),
				'fs_kode_wilayah_no_polisi': Ext.getCmp('cboNopolB').getValue(),
				'fs_no_polisi': Ext.getCmp('txtNoPol2B').getValue(),
				'fs_kode_akhir_wilayah_no_polisi': Ext.getCmp('txtNoPol3B').getValue(),
				'fs_kota_bpkb': Ext.getCmp('cboKotaBPKBB').getValue(),
				'fs_jenis_asuransi': Ext.getCmp('txtNilaiAsuransiB').getValue(),
				'fs_kode_asuransi1': Ext.getCmp('txtKodeAsuransi1B').getValue(),
				'fs_kode_asuransi2': Ext.getCmp('txtKodeAsuransi2B').getValue(),
				'fs_salesman': Ext.getCmp('txtSalesB').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKodeDealer1B').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtKodeDealer2B').getValue(),
				'fn_cabang_dealer': Ext.getCmp('txtCabangDealerB').getValue(),
				'fs_pola_angsuran': Ext.getCmp('cboPolaAngsB').getValue(),
				'fs_cara_bayar': Ext.getCmp('cboCaraBayarB').getValue(),
				'fs_angsuran_dimuka': Ext.getCmp('cboDimukaB').getValue(),
				'fn_kali_angsuran_dimuka': Ext.getCmp('txtDimukaKaliB').getValue(),
				'fn_jumlah_angsuran_dimuka': Ext.getCmp('txtAngsuranDimukaB').getValue(),
				'fs_angsuran_dimuka_potong_pencairan': Ext.getCmp('cboPotongPencairanB').getValue(),
				'fs_angsuran_dibayar_dealer': Ext.getCmp('cboAngsuranDibayarDealerB').getValue(),
				'fn_dp_bayar': Ext.getCmp('txtTotalDpB').getValue(),
				'fn_biaya_adm': Ext.getCmp('txtBiayaAdmB').getValue(),
				'fn_biaya_tjh': Ext.getCmp('txtBiayaTjHB').getValue(),
				'fn_selisih_dp': Ext.getCmp('txtAsuransiDealerB').getValue(),
				'fn_premi_asuransi_gross_perluasan': Ext.getCmp('txtPerluasanB').getValue(),
				'fn_pokok_pembiayaan_dealer': Ext.getCmp('txtPokokPembiayaanDealerB').getValue(),
				'fn_pokok_pembiayaan_konsumen': Ext.getCmp('txtPokokPembiayaanKonsumenB').getValue(),
				'fn_premi_asuransi_gross': Ext.getCmp('txtPremiGrosB').getValue(),
				'fn_premi_asuransi': Ext.getCmp('txtPremiGrosFixB').getValue(),
				'fn_premi_asuransi_netto': Ext.getCmp('txtPremiNetB').getValue(),
				'fn_harga_otr': Ext.getCmp('txtHargaOTRB').getValue(),
				'fn_uang_muka_dealer': Ext.getCmp('txtUangMukaDealerpB').getValue(),
				'fn_asuransi_dikredit_dealer': Ext.getCmp('txtAsuransiDealerB').getValue(),
				'fn_persen_bunga_flat_dealer': Ext.getCmp('txtBungaFlatB').getValue(),
				'fn_persen_bunga_efektif_dealer': Ext.getCmp('txtBungaFlatDealerB').getValue(),
				'fn_bulan_masa_angsuran_dealer': Ext.getCmp('txtTenorB').getValue(),
				'fn_kali_masa_angsuran_dealer': Ext.getCmp('txtTenorB').getValue(),
				'fn_bunga_dealer': Ext.getCmp('txtBungaDealerB').getValue(),
				'fn_angsuran_dealer': Ext.getCmp('txtAngsuranBulanDealer').getValue(),
				'fn_uang_muka_konsumen': Ext.getCmp('txtUangMukaKonsumenp').getValue(),
				'fn_asuransi_dikredit_konsumen': Ext.getCmp('txtAsuransiKonsumen').getValue(),
				'fn_persen_bunga_flat_konsumen': Ext.getCmp('txtBungaFlat3').getValue(),
				'fn_persen_bunga_efektif_konsumen': Ext.getCmp('txtBungaFlat4').getValue(),
				'fn_bulan_masa_angsuran_konsumen': Ext.getCmp('txtTenor').getValue(),
				'fn_kali_masa_angsuran_konsumen': Ext.getCmp('txtTenor').getValue(),
				'fn_bunga_konsumen': Ext.getCmp('txtBungaKonsumen').getValue(),
				'fn_angsuran_konsumen': Ext.getCmp('txtAngsuranBulanKonsumen').getValue(),
				'fd_tanggal_angsuran_pertama': Ext.Date.format(Ext.getCmp('txtTanggalAngs1').getValue(), 'Y-m-d'),
				'fn_tanggal_jatuhtempo_perbulan': Ext.getCmp('txtTanggalAngsBln').getValue(),
				'fs_cair_ke': Ext.getCmp('cboPencairanKe').getValue(),
				'fs_uang_muka_bayar_di': Ext.getCmp('cboUangMuka').getValue(),
				'fs_deposit_potong_pencairan': Ext.getCmp('cboDeposit').getValue(),
				'fs_atasnama_bank_pencairan': Ext.getCmp('txtRekeningCair').getValue(),
				'fs_nama_bank_pencairan': Ext.getCmp('txtNamaBank').getValue(),
				'fs_rekening_bank_pencairan': Ext.getCmp('txtNoRekCair').getValue(),
				'fn_nilai_pencairan': Ext.getCmp('txtNilaiCair3').getValue(),
				'fs_uangmuka1': Ext.getCmp('txtUangMukaDealerlabel').getValue(),
				'fs_uangmuka2': Ext.getCmp('txtUangMukaDealer2').getValue(),
				'fd_tanggal_buat': Ext.Date.format(new Date(), 'Y-m-d')
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

					//alert(xtext.total_trans2);

					fnReset();
					fnMaskHide();
					//vMask.hide();
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
				vMask.hide();
			}
		});
	}


	function fnCekSave() {

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'koreksi/CekSimpan',
				params: {
				'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
				'fn_no_pjj': Ext.getCmp('txtNoPjj').getValue(),
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaKonsumen').getValue(),
				'fd_tanggal_lahir': Ext.getCmp('txtUserDatebirth').getValue()

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
										fnSimpan();
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

	function fnSimpan() {
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'koreksi/Simpan',
			params: {
				'fd_tgl_apk': Ext.Date.format(Ext.getCmp('txtRefnodt').getValue(), 'Y-m-d'),
				'fs_jenis_pembiayaan': Ext.getCmp('cboJenis').getValue(),
				'fn_no_apk': Ext.getCmp('txtNoApk').getValue(),
				'fn_no_pjj': Ext.getCmp('txtNoPjj').getValue(),
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fs_kode_paket': Ext.getCmp('txtKodePaket').getValue(),
				'fs_fleet': Ext.getCmp('cboFleet').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaKonsumen').getValue(),
				'fs_alamat_konsumen': Ext.getCmp('txtAlamatKonsumen').getValue(),
				'fs_kelurahan_konsumen': Ext.getCmp('txtKelurahan').getValue(),
				'fs_propinsi_konsumen': Ext.getCmp('txtPropinsi').getValue(),
				'fs_kecamatan_konsumen': Ext.getCmp('txtKecamatan').getValue(),
				'fs_kode_dati_konsumen': Ext.getCmp('txtKodeDati').getValue(),
				'fs_kota_konsumen': Ext.getCmp('txtKabupatenKota').getValue(),
				'fs_kodepos_konsumen': Ext.getCmp('cboKodePos').getValue(),
				'fs_ktp_konsumen': Ext.getCmp('txtNoKtp').getValue(),
				'fs_masa_ktp_konsumen': Ext.Date.format(Ext.getCmp('txtSd').getValue(), 'Y-m-d'),
				'fs_kartu_keluarga': Ext.getCmp('txtKartuKeluarga').getValue(),
				'fs_telepon_konsumen': Ext.getCmp('txtTelepon').getValue(),
				'fs_handphone_konsumen': Ext.getCmp('txtHp').getValue(),
				'fs_email_konsumen': Ext.getCmp('txtEmail').getValue(),
				'fs_npwp': Ext.getCmp('txtNoNpwp').getValue(),
				'fs_nama_perusahaan_konsumen': Ext.getCmp('txtNamaPerusahaan').getValue(),
				'fs_alamat_usaha_konsumen': Ext.getCmp('txtAlamatKonsumen').getValue(),
				'fs_telfon_usaha_konsumen': Ext.getCmp('txtTlpperiodsusahaan').getValue(),
				'fs_kerja_sejak_tgl': Ext.getCmp('txtKerjaSejak').getValue(),
				'fs_kerja_sejak_tahun': Ext.getCmp('txtKerjaSejakTahun').getValue(),
				'fs_kategori_usaha_konsumen': Ext.getCmp('txtKodeKategoriUsaha').getValue(),
				'fs_keterangan_usaha_konsumen': Ext.getCmp('txtKeteranganUsaha').getValue(),
				'fs_usaha_pekerjaan_konsumen': Ext.getCmp('txtUsahaPekerjaan').getValue(),
				'fn_pendapatan_konsumen': Ext.getCmp('txtPendapatan').getValue(),
				'fs_jenis_kelamin_konsumen': Ext.getCmp('cboJenKel').getValue(),
				'fs_agama_konsumen': Ext.getCmp('txtKodeAgama').getValue(),
				'fs_tempat_lahir_konsumen': Ext.getCmp('txtUserPlaceBirth').getValue(),
				'fd_tanggal_lahir': Ext.getCmp('txtUserDatebirth').getValue(),
				'fd_tanggal_lahir_konsumen': Ext.Date.format(Ext.getCmp('txtUserDatebirth').getValue(), 'Y-m-d') ,
				'fs_pendidikan_konsumen': Ext.getCmp('txtKodePendidikan').getValue(),
				'fn_biaya_konsumen': Ext.getCmp('txtBiayaBulan').getValue(),
				'fs_nama_ibu_kandung': Ext.getCmp('txtIbuKandung').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_status_konsumen': Ext.getCmp('cboStatusKawin').getValue(),
				'fn_tanggungan_konsumen': Ext.getCmp('txtTanggungan').getValue(),
				'fs_status_rumah': Ext.getCmp('txtStatusRumah').getValue(),
				'fs_tinggal_sejak1': Ext.getCmp('txtTinggalSejak').getValue(),
				'fs_tinggal_sejak2': Ext.getCmp('txtTinggalSejakTahun').getValue(),
				'fs_alamat_korespondensi': Ext.getCmp('txtAlamatSurat').getValue(),
				'fs_kota_korespondensi': Ext.getCmp('txtKabupatenKotaKonsumen').getValue(),
				'fs_kodepos_korespondensi': Ext.getCmp('cboKodePos2').getValue(),
				'fs_pertama_kali_kredit': Ext.getCmp('cboFirstTime').getValue(),
				'fn_jumlah_kali_kredit': Ext.getCmp('txtKe').getValue(),
				'fs_kode_kendaraan': Ext.getCmp('txtModelKendaraan').getValue(),
				'fs_jenis_kendaraan': Ext.getCmp('txtJenisKendaraan').getValue(),
				'fs_silinder_kendaraan': Ext.getCmp('txtSilinder').getValue(),
				'fn_tahun_kendaraan': Ext.getCmp('txtTahun').getValue(),
				'fs_warna_kendaraan': Ext.getCmp('txtWarna').getValue(),
				'fs_no_rangka': Ext.getCmp('txtNorangka').getValue(),
				'fs_no_mesin': Ext.getCmp('txtNomesin').getValue(),
				'fs_komersial': Ext.getCmp('cboKomersil').getValue(),
				'fs_nama_bpkb': Ext.getCmp('txtNamaBpkb').getValue(),
				'fs_alamat_bpkb': Ext.getCmp('txtAlamatbpkb').getValue(),
				'fs_nomor_bpkb': Ext.getCmp('txtNomorBpkb').getValue(),
				'fs_kode_wilayah_no_polisi': Ext.getCmp('cboNopol').getValue(),
				'fs_wilayah_asuransi': Ext.getCmp('txtWilayahAsuransi').getValue(),
				'fs_no_polisi': Ext.getCmp('txtNoPol2').getValue(),
				'fs_kode_akhir_wilayah_no_polisi': Ext.getCmp('txtNoPol3').getValue(),
				'fs_kota_bpkb': Ext.getCmp('cboKotaBPKB').getValue(),
				'fs_jenis_asuransi': Ext.getCmp('txtNilaiAsuransi').getValue(),
				'fs_kode_asuransi1': Ext.getCmp('txtKodeAsuransi1').getValue(),
				'fs_kode_asuransi2': Ext.getCmp('txtKodeAsuransi2').getValue(),
				'fs_salesman': Ext.getCmp('txtSales').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKodeDealer1').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtKodeDealer2').getValue(),
				'fn_cabang_dealer': Ext.getCmp('txtCabangDealer').getValue(),
				'fs_pola_angsuran': Ext.getCmp('cboPolaAngs').getValue(),
				'fs_cara_bayar': Ext.getCmp('cboCaraBayar').getValue(),
				'fs_angsuran_dimuka': Ext.getCmp('cboDimuka').getValue(),
				'fn_kali_angsuran_dimuka': Ext.getCmp('txtDimukaKali').getValue(),
				'fn_jumlah_angsuran_dimuka': Ext.getCmp('txtAngsuranDimuka').getValue(),
				'fs_angsuran_dimuka_potong_pencairan': Ext.getCmp('cboPotongPencairan').getValue(),
				'fs_angsuran_dibayar_dealer': Ext.getCmp('cboAngsuranDibayarDealer').getValue(),
				'fn_dp_bayar': Ext.getCmp('txtTotalDp').getValue(),
				'fn_biaya_adm': Ext.getCmp('txtBiayaAdm').getValue(),
				'fn_biaya_tjh': Ext.getCmp('txtBiayaTjH').getValue(),
				'fn_premi_asuransi_gross_perluasan': Ext.getCmp('txtPerluasan').getValue(),
				'fn_selisih_dp': Ext.getCmp('txtAsuransiDealer').getValue(),
				'fn_pokok_pembiayaan_dealer': Ext.getCmp('txtPokokPembiayaanDealer').getValue(),
				'fn_pokok_pembiayaan_konsumen': Ext.getCmp('txtPokokPembiayaanKonsumen').getValue(),
				'fn_premi_asuransi_gross': Ext.getCmp('txtPremiGros').getValue(),
				'fn_premi_asuransi': Ext.getCmp('txtPremiGrosFix').getValue(),
				'fn_premi_asuransi_netto': Ext.getCmp('txtPremiNet').getValue(),
				'fn_harga_otr': Ext.getCmp('txtHargaOTR').getValue(),
				'fn_uang_muka_dealer': Ext.getCmp('txtUangMukaDealerp').getValue(),
				'fn_asuransi_dikredit_dealer': Ext.getCmp('txtAsuransiDealer').getValue(),
				'fn_persen_bunga_flat_dealer': Ext.getCmp('txtBungaFlat').getValue(),
				'fn_persen_bunga_efektif_dealer': Ext.getCmp('txtBungaFlatDealer').getValue(),
				'fn_bulan_masa_angsuran_dealer': Ext.getCmp('txtTenor').getValue(),
				'fn_kali_masa_angsuran_dealer': Ext.getCmp('txtTenor').getValue(),
				'fn_bunga_dealer': Ext.getCmp('txtBungaDealer').getValue(),
				'fn_angsuran_dealer': Ext.getCmp('txtAngsuranBulanDealer').getValue(),
				'fn_uang_muka_konsumen': Ext.getCmp('txtUangMukaKonsumenp').getValue(),
				'fn_asuransi_dikredit_konsumen': Ext.getCmp('txtAsuransiKonsumen').getValue(),
				'fn_persen_bunga_flat_konsumen': Ext.getCmp('txtBungaFlat3').getValue(),
				'fn_persen_bunga_efektif_konsumen': Ext.getCmp('txtBungaFlat4').getValue(),
				'fn_bulan_masa_angsuran_konsumen': Ext.getCmp('txtTenor').getValue(),
				'fn_kali_masa_angsuran_konsumen': Ext.getCmp('txtTenor').getValue(),
				'fn_bunga_konsumen': Ext.getCmp('txtBungaKonsumen').getValue(),
				'fn_angsuran_konsumen': Ext.getCmp('txtAngsuranBulanKonsumen').getValue(),
				'fs_nama_pasangan': Ext.getCmp('txtNamaIstri').getValue(),
				'fs_handphone_pasangan': Ext.getCmp('txtTeleponIstri').getValue(),
				'fs_usaha_pasangan': Ext.getCmp('txtKodeuUsahaKerjaan').getValue(),
				'fs_keterangan_usaha_pasangan ': Ext.getCmp('txtNoPol2').getValue(),
				'fs_alamat_usaha_pasangan': Ext.getCmp('txtAlamatUsahaSuamiIstri').getValue(),
				'fs_telepon_usaha_pasangan': Ext.getCmp('txtTeleponUsaha').getValue(),
				'fn_pendapatan_pasangan': Ext.getCmp('txtPendapatanSuamiIstri').getValue(),
				'fs_nama_penjamin': Ext.getCmp('txtNamaPenjamin').getValue(),
				'fs_alamat_penjamin': Ext.getCmp('txtAlamatPenjamin').getValue(),
				'fs_kota_penjamin': Ext.getCmp('txtKabupatenKotaPenjamin').getValue(),
				'fs_kodepos_penjamin': Ext.getCmp('cboKodePosPenjamin').getValue(),
				'fs_telepon_penjamin': Ext.getCmp('txtTeleponPenjamin').getValue(),
				'fs_usaha_penjamin': Ext.getCmp('txtKodeUsahaPenjamin').getValue(),
				'fs_keterangan_usaha_penjamin': Ext.getCmp('txtKeteranganUsahaPenjamin').getValue(),
				'fs_alamat_usaha_penjamin': Ext.getCmp('txtAlamatUsahaPenjamin').getValue(),
				'fs_telepon_usaha_penjamin': Ext.getCmp('txtTeleponPenjamin').getValue(),
				'fn_pendapatan_penjamin': Ext.getCmp('txtPendapatanPenjamin').getValue(),
				'fs_status_penjamin': Ext.getCmp('txtStatusPenjamin').getValue(),
				'fd_tanggal_angsuran_pertama': Ext.Date.format(Ext.getCmp('txtTanggalAngs1').getValue(), 'Y-m-d'),
				'fn_tanggal_jatuhtempo_perbulan': Ext.getCmp('txtTanggalAngsBln').getValue(),
				'fs_cair_ke': Ext.getCmp('cboPencairanKe').getValue(),
				'fs_uang_muka_bayar_di': Ext.getCmp('cboUangMuka').getValue(),
				'fs_deposit_potong_pencairan': Ext.getCmp('cboDeposit').getValue(),
				'fs_atasnama_bank_pencairan': Ext.getCmp('txtRekeningCair').getValue(),
				'fs_nama_bank_pencairan': Ext.getCmp('txtNamaBank').getValue(),
				'fs_rekening_bank_pencairan': Ext.getCmp('txtNoRekCair').getValue(),
				'fn_nilai_pencairan': Ext.getCmp('txtNilaiCair3').getValue(),
				'fs_uangmuka1': Ext.getCmp('txtUangMukaDealerlabel').getValue(),
				'fs_uangmuka2': Ext.getCmp('txtUangMukaDealer2').getValue(),
				'fs_skala_perusahaan_konsumen': Ext.getCmp('cboSkalaPerusahaan').getValue(),
				'fd_tanggal_buat': Ext.Date.format(new Date(), 'Y-m-d')
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

					//alert(xtext.total_trans2);

					//fnResetUpdate();
					fnMaskHide();
					//vMask.hide();
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
				vMask.hide();
			}
		});
	}

	function fnTambahPerluasan() {
		
		//vMask.show();
		winPerluasan.show();
		winPerluasan.center();

	}

	function fnTambahPerluasan2() {
		
		//vMask.show();
		winPerluasan2.show();
		winPerluasan2.center();

	}


		function fnKodeTrans() {
		
		//vMask.show();
		winKode.show();
		winKode.center();

		}

		function fnKodeTrans2() {
		
		//vMask.show();
		winKode2.show();
		winKode2.center();

		}



		var vMask = new Ext.LoadMask({
			msg: 'Please wait...',
			target: frmAccGL
		});
		
		function fnMaskShow() {
			frmAccGL.mask('Please wait...');
		}

		function fnMaskHide() {
			frmAccGL.unmask();
		}

		
		frmAccGL.render(Ext.getBody());

		function fnCekSaveKonsumen() {

			Ext.Ajax.on('beforerequest', fnMaskShow2);
			Ext.Ajax.on('requestcomplete', fnMaskHide2);
			Ext.Ajax.on('requestexception', fnMaskHide2);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'konsumen/CekSimpan',
				params: {
				'fn_no_batch': '',
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaKonsumen').getValue(),
				'fd_tanggal_lahir': Ext.getCmp('txtUserDatebirth').getValue()

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
										fnSimpan();
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
	

	Ext.Ajax.request({
		method: 'POST',
		url: 'konsumen/nilaidefa',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			
			if (xtext.sukses === true) {
				var a = xtext.kode_cabang;

				buatForm();
	
				Ext.getCmp('txtKodeCabang').setValue(a);

				var combo2 = Ext.ComponentQuery.query('#idHapus')[0];

				if(a!='00') {

				 	combo2.setDisabled(true);
				}else {
					combo2.setDisabled(false);
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
				title: 'IDS'
			});
		}
	});
	
	Ext.get('loading').destroy();
});
