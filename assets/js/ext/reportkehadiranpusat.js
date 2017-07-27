Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager',
	'Ext.view.View',
]);

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	Ext.define('Ext.form.field.Month', {
        extend: 'Ext.form.field.Date',
        alias: 'widget.monthfield',
        requires: ['Ext.picker.Month'],
        alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
        selectMonth: null,
        createPicker: function () {
		    var me = this,
		        format = Ext.String.format,
		        pickerConfig;

		    pickerConfig = {
		        pickerField: me,
		        ownerCmp: me,
		        renderTo: document.body,
		        floating: true,
		        hidden: true,
		        focusOnShow: true,
		        minDate: me.minValue,
		        maxDate: me.maxValue,
		        disabledDatesRE: me.disabledDatesRE,
		        disabledDatesText: me.disabledDatesText,
		        disabledDays: me.disabledDays,
		        disabledDaysText: me.disabledDaysText,
		        format: me.format,
		        showToday: me.showToday,
		        startDay: me.startDay,
		        minText: format(me.minText, me.formatDate(me.minValue)),
		        maxText: format(me.maxText, me.formatDate(me.maxValue)),
		        listeners: {
		            select: { scope: me, fn: me.onSelect },
		            monthdblclick: { scope: me, fn: me.onOKClick },
		            yeardblclick: { scope: me, fn: me.onOKClick },
		            OkClick: { scope: me, fn: me.onOKClick },
		            CancelClick: { scope: me, fn: me.onCancelClick }
		        },
		        keyNavConfig: {
		            esc: function () {
		                me.collapse();
		            }
		        }
		    };

		    if (Ext.isChrome) {
		        me.originalCollapse = me.collapse;
		        pickerConfig.listeners.boxready = {
		            fn: function () {
		                this.picker.el.on({
		                    mousedown: function () {
		                        this.collapse = Ext.emptyFn;
		                    },
		                    mouseup: function () {
		                        this.collapse = this.originalCollapse;
		                    },
		                    scope: this
		                });
		            },
		            scope: me,
		            single: true
		        }
		    }

		    return Ext.create('Ext.picker.Month', pickerConfig);
		},
        onCancelClick: function() {
            var me = this;
            me.selectMonth = null;
            me.collapse();
        },
        onOKClick: function() {
            var me = this;
            if (me.selectMonth) {
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
            }
            me.collapse();
        },
        onSelect: function(m, d) {
            var me = this;
            me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        }
    });

	Ext.define('DataGridDept', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'},
			{name: 'fs_alamat_cabang', type: 'string'},
			{name: 'fs_kota_cabang', type: 'string'}
		]
	});

	var grupDept = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridDept',
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
			url: 'reportkehadiran/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var winGridDept = Ext.create('Ext.grid.Panel', {
		autoDestroy: true,
		height: 460,
		width: 650,
		sortableColumns: false,
		store: grupDept,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDept,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode Cabang',
			width: 80
		},{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Nama Cabang',
			width: 170
		},{
			dataIndex: 'fs_alamat_cabang',
			menuDisabled: true, 
			text: 'Alamat Cabang',
			width: 220
		},{
			dataIndex: 'fs_kota_cabang',
			menuDisabled: true, 
			text: 'Kota Cabang',
			width: 120
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboDept').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtDept').setValue(record.get('fs_kode_cabang'));
				
				winCari.hide();
			}
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang',
				id: 'txtCari2',
				name: 'txtCari2',
				xtype: 'textfield'
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupDept.load();
				}
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
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
		title: 'Searching...',
		items: [
			winGridDept
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDept.load();
				vMask.show();
			}
		}
	});

	var cboDept = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		displayField: 'fs_nm_code',
		editable: false,
		emptyText: 'Select a Department',
		id: 'cboDept',
		name: 'cboDept',
		valueField: 'fs_code',
		xtype: 'textfield',
		listeners: {
			change: function(combo, value) {
				Ext.getCmp('txtDept').setValue('');
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

	var txtDept = {
		allowBlank: true,
		hidden: true,
		id: 'txtDept',
		name: 'txtDept',
		xtype: 'textfield'
	};

	var blnFilter = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter',
		name: 'blnFilter',
		format: 'F, Y',
		value: new Date()
	};

	Ext.define('DataGridEmploye', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fs_bulan_tahun', type: 'string'},
			{name: 'fn_1', type: 'string'},
			{name: 'fn_2', type: 'string'},
			{name: 'fn_3', type: 'string'},
			{name: 'fn_4', type: 'string'},
			{name: 'fn_5', type: 'string'},
			{name: 'fn_6', type: 'string'},
			{name: 'fn_7', type: 'string'},
			{name: 'fn_8', type: 'string'},
			{name: 'fn_9', type: 'string'},
			{name: 'fn_10', type: 'string'},
			{name: 'fn_11', type: 'string'},
			{name: 'fn_12', type: 'string'},
			{name: 'fn_13', type: 'string'},
			{name: 'fn_14', type: 'string'},
			{name: 'fn_15', type: 'string'},
			{name: 'fn_16', type: 'string'},
			{name: 'fn_17', type: 'string'},
			{name: 'fn_18', type: 'string'},
			{name: 'fn_19', type: 'string'},
			{name: 'fn_20', type: 'string'},
			{name: 'fn_21', type: 'string'},
			{name: 'fn_22', type: 'string'},
			{name: 'fn_23', type: 'string'},
			{name: 'fn_24', type: 'string'},
			{name: 'fn_25', type: 'string'},
			{name: 'fn_26', type: 'string'},
			{name: 'fn_27', type: 'string'},
			{name: 'fn_28', type: 'string'},
			{name: 'fn_29', type: 'string'},
			{name: 'fn_30', type: 'string'},
			{name: 'fn_31', type: 'string'}
		]
	});

	var grupEmploye = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridEmploye',
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
			url: 'reportkehadiran/gridemploye'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtDept').getValue(),
					'fd_mmyy': Ext.getCmp('blnFilter').getValue(),
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridEmploye = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupEmploye,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			locked: true,
			width: 85
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama',
			menuDisabled: true,
			locked: true,
			width: 180
		},{
			text: 'Periode Bulan',
			dataIndex: 'fs_bulan_tahun',
			menuDisabled: true,
			locked: true,
			width: 85
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			hidden: true
		},{
			xtype: 'actioncolumn',
			width: 20,
			locked: true,
			items: [{
				iconCls: 'icon-view',
				tooltip: 'Detail',
				handler: function(grid, rowIndex, colIndex, e) {
					var rec = grid.getStore().getAt(rowIndex);

					var xnama = rec.get('fs_nama');
					var xtanggal = rec.get('fd_tanggal');
					var xperiode = rec.get('fs_bulan_tahun').toUpperCase();

					Ext.define('DataGridDetail', {
						extend: 'Ext.data.Model',
						fields: [
							{name: 'fd_tanggal', type: 'string'},
							{name: 'fd_masuk', type: 'string'},
							{name: 'fd_keluar', type: 'string'},
							{name: 'fn_jam', type: 'string'}
						]
					});

					var grupGrid = Ext.create('Ext.data.Store', {
						autoLoad: false,
						model: 'DataGridDetail',
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
							url: 'reportkehadiran/gridreport'
						},
						listeners: {
							beforeload: function(store) {
								Ext.apply(store.getProxy().extraParams, {
									'fs_nama': xnama,
									'fd_mmyy': xtanggal
								});
							}
						}
					});

					var gridDetail = Ext.create('Ext.grid.Panel', {
						defaultType: 'textfield',
						height: 360,
						sortableColumns: false,
						store: grupGrid,
						columns: [{
							xtype: 'rownumberer',
							width: 30
						},{
							text: 'Tanggal',
							dataIndex: 'fd_tanggal',
							menuDisabled: true,
							locked: true,
							width: 80
						},{
							text: 'Hari',
							dataIndex: 'fs_hari',
							menuDisabled: true,
							locked: true,
							width: 60
						},{
							text: 'Jam Masuk',
							dataIndex: 'fd_masuk',
							menuDisabled: true,
							width: 75
						},{
							text: 'Jam Keluar',
							dataIndex: 'fd_keluar',
							menuDisabled: true,
							width: 75
						},{
							text: 'Total Jam',
							dataIndex: 'fn_jam',
							menuDisabled: true,
							width: 70
						}],
						viewConfig: {
							getRowClass: function() {
								return 'rowwrap';
							},
							markDirty: false,
							stripeRows: true
						}
					});

					var grupMDetail = Ext.create('Ext.data.Store', {
						autoLoad: false,
						fields: ['name', 'value'],
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
							url: 'reportkehadiran/monthdetail'
						},
						listeners: {
							beforeload: function(store) {
								Ext.apply(store.getProxy().extraParams, {
									'fs_nama': xnama,
									'fd_mmyy': xtanggal
								});
							}
						}
					});	

					var monthlyDetail = Ext.create({
						xtype: 'cartesian',
						width: 440,
						height: 360,
						store: grupMDetail,
						axes: [{
							type: 'numeric',
							position: 'left',
							fields: ['value'],
							title: {
								text: 'TOTAL JAM',
								fontSize: 11
							},
							grid: true,
							minimum: 0
						},{
							type: 'category',
							position: 'bottom',
							fields: ['name'],
							title: {
								text: xperiode,
								fontSize: 11
							}
						}],
						series: [{
							type: 'line',
							style: {
								stroke: '#30BDA7',
								lineWidth: 2
							},
							xField: 'name',
							yField: 'value',
							marker: {
								type: 'path',
								path: ['M', - 4, 0, 0, 4, 4, 0, 0, - 4, 'Z'],
								stroke: '#30BDA7',
								lineWidth: 2,
								fill: 'white'
							}
						},{
							type: 'line',
							fill: true,
							style: {
								fill: '#96D4C6',
								fillOpacity: .6,
								stroke: '#0A3F50',
								strokeOpacity: .6,
							},
							xField: 'name',
							yField: 'value',
							marker: {
								type: 'circle',
								radius: 4,
								lineWidth: 2,
								fill: 'white'
							},
							tooltip: {
				                trackMouse: true,
				                style: 'background: #fff',
				                renderer: function(storeItem, item) {
				                    this.setHtml('TANGGAL ' + storeItem.get('name') + ' : ' + storeItem.get(item.series.getYField()) + ' JAM');
				                }
				            }
						}]
					});				

					var winGrid = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						draggable: true,
						frame: false,
						layout: 'fit',
						resizable: false,
						title: xnama,
						width: 890,
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 50,
								msgTarget: 'side'
							},
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 1.8,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '99%',
										style: 'padding: 5px;',
										title: 'Detail',
										xtype: 'fieldset',
										items: [
											gridDetail
										]
									}]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '99%',
										style: 'padding: 5px;',
										title: 'Line',
										xtype: 'fieldset',
										items: [
											monthlyDetail
										]
									}]
								}]
							}]
						}],
						listeners: {
							beforehide: function() {
								vMask.hide();
							},
							beforeshow: function() {
								grupGrid.load();
								grupMDetail.load();
								vMask.show();
							}
						},
						buttons: [{
							text: 'OK',
							handler: function() {
								vMask.hide();
								winGrid.hide();
							}
						}]
					});

					winGrid.show();
					winGrid.center();
				},
				scope: this
			}]
		},{
			text: '1',
			dataIndex: 'fn_1',
			menuDisabled: true,
			labelAlign: 'center',
			width: 25
		},{
			text: '2',
			dataIndex: 'fn_2',
			menuDisabled: true,
			width: 25
		},{
			text: '3',
			dataIndex: 'fn_3',
			menuDisabled: true,
			width: 25
		},{
			text: '4',
			dataIndex: 'fn_4',
			menuDisabled: true,
			width: 25
		},{
			text: '5',
			dataIndex: 'fn_5',
			menuDisabled: true,
			width: 25
		},{
			text: '6',
			dataIndex: 'fn_6',
			menuDisabled: true,
			width: 25
		},{
			text: '7',
			dataIndex: 'fn_7',
			menuDisabled: true,
			width: 25
		},{
			text: '8',
			dataIndex: 'fn_8',
			menuDisabled: true,
			width: 25
		},{
			text: '9',
			dataIndex: 'fn_9',
			menuDisabled: true,
			width: 25
		},{
			text: '10',
			dataIndex: 'fn_10',
			menuDisabled: true,
			width: 25
		},{
			text: '11',
			dataIndex: 'fn_11',
			menuDisabled: true,
			width: 25
		},{
			text: '12',
			dataIndex: 'fn_12',
			menuDisabled: true,
			width: 25
		},{
			text: '13',
			dataIndex: 'fn_13',
			menuDisabled: true,
			width: 25
		},{
			text: '14',
			dataIndex: 'fn_14',
			menuDisabled: true,
			width: 25
		},{
			text: '15',
			dataIndex: 'fn_15',
			menuDisabled: true,
			width: 25
		},{
			text: '16',
			dataIndex: 'fn_16',
			menuDisabled: true,
			width: 25
		},{
			text: '17',
			dataIndex: 'fn_17',
			menuDisabled: true,
			width: 25
		},{
			text: '18',
			dataIndex: 'fn_18',
			menuDisabled: true,
			width: 25
		},{
			text: '19',
			dataIndex: 'fn_19',
			menuDisabled: true,
			width: 25
		},{
			text: '20',
			dataIndex: 'fn_20',
			menuDisabled: true,
			width: 25
		},{
			text: '21',
			dataIndex: 'fn_21',
			menuDisabled: true,
			width: 25
		},{
			text: '22',
			dataIndex: 'fn_22',
			menuDisabled: true,
			width: 25
		},{
			text: '23',
			dataIndex: 'fn_23',
			menuDisabled: true,
			width: 25
		},{
			text: '24',
			dataIndex: 'fn_24',
			menuDisabled: true,
			width: 25
		},{
			text: '25',
			dataIndex: 'fn_25',
			menuDisabled: true,
			width: 25
		},{
			text: '26',
			dataIndex: 'fn_26',
			menuDisabled: true,
			width: 25
		},{
			text: '27',
			dataIndex: 'fn_27',
			menuDisabled: true,
			width: 25
		},{
			text: '28',
			dataIndex: 'fn_28',
			menuDisabled: true,
			width: 25
		},{
			text: '29',
			dataIndex: 'fn_29',
			menuDisabled: true,
			width: 25
		},{
			text: '30',
			dataIndex: 'fn_30',
			menuDisabled: true,
			width: 25
		},{
			text: '31',
			dataIndex: 'fn_31',
			menuDisabled: true,
			width: 25
		}],
		tbar: [{
			flex: 0.7,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboDept,
				txtDept
			]
		},{
			flex: 0.8,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					if (this.up('form').getForm().isValid()) {
						grupEmploye.load();
					}
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupEmploye
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	function fnPreview()
	{
		if (this.up('form').getForm().isValid()) {
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.YESNO,
				closable: false,
				icon: Ext.Msg.QUESTION,
				msg: 'Apakah anda yakin akan mencetak?',
				title: 'HRD',
				fn: function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.on('beforerequest', fnMaskShow);
						Ext.Ajax.on('requestcomplete', fnMaskHide);
						Ext.Ajax.on('requestexception', fnMaskHide);
						
						Ext.Ajax.request({
							method: 'POST',
							url: 'reportkehadiran/checkprintpusat',
							params: {
								'fs_kode_cabang': Ext.getCmp('txtDept').getValue(),
								'fd_mmyy': Ext.getCmp('blnFilter').getValue()
							},
							success: function(response) {
								var xtext = Ext.decode(response.responseText);
								Ext.MessageBox.show({
									buttons: Ext.MessageBox.OK,
									closable: false,
									icon: Ext.MessageBox.INFO,
									msg: xtext.hasil,
									title: 'HRD'
								});
								
								var url = xtext.url;
								var kdcabang = xtext.kdcabang;
								var periode = xtext.periode;

								if (xtext.sukses === true) {
									var popUp = Ext.create('Ext.window.Window', {
											border: false,
											closable: false,
											frame: false,
						                    height: 450,
						                    width: 950,
						                    layout:'anchor',
						                    title: 'HRD',
						                    buttons: [{
												text: 'OK',
												handler: function() {
													vMask.hide();
													popUp.hide();
											}
										}]
					                });

									popUp.add({html: '<iframe height="450", width="942" src="'+ url + kdcabang + '/' + periode + '"></iframe>'});
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
									title: 'HRD'
								});
								fnMaskHide();
							}
						});
					}
				}
			});
		}
	}

	var frmKehadiran = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Report Kehadiran',
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
			title: 'Report Kehadiran',
			xtype: 'fieldset',
			items: [
				gridEmploye
			]
		}],
		buttons: [{
			iconCls: 'icon-print',
			id: 'btnPreview',
			name: 'btnPreview',
			text: 'Preview',
			handler: fnPreview
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKehadiran
	});

	function fnMaskShow() {
		frmKehadiran.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKehadiran.unmask();
	}
	
	frmKehadiran.render(Ext.getBody());
	Ext.get('loading').destroy();
});