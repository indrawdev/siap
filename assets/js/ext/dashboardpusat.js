Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.ProgressBarPager'
]);

Ext.onReady(function() {

	var btnRefresh = {
		anchor: '100%',
		scale: 'small',
		text: 'Refresh',
		xtype: 'button',
		handler: fnReload
	};

	var grupSetuju = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'dashboard/setuju'
		}
	});
	
	var disetujui = Ext.create({
		   xtype: 'cartesian',
		   width: 360,
		   height: 250,
		   plugins: {
		   		ptype: 'chartitemevents',
		   		moveEvents: true
		   },
		   store: grupSetuju,
		   axes: [{
		       type: 'numeric3d',
		       position: 'left',
		       fields: 'value',
		       majorTickSteps: 2
		   }, {
		       type: 'category3d',
		       position: 'bottom',
		       title: {
		           text: 'APK DISETUJUI',
		           fontSize: 13
		       },
		       fields: 'name'
		   }],
		   series: {
		       type: 'bar3d',
		       subStyle: {
		           fill: ['#54DF14'],
		           stroke: '#53C81C'
		       },
		       xField: 'name',
		       yField: 'value',
			   tooltip: {
	                trackMouse: true,
	                style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
	                }
	            }
		   }
	});

	var grupTolak = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'dashboard/tolak'
		}
	});

	var ditolak = Ext.create({
		   xtype: 'cartesian',
		   width: 360,
		   height: 250,
		   store: grupTolak,
		   axes: [{
		       type: 'numeric3d',
		       position: 'left',
		       fields: 'value',
		       majorTickSteps: 2
		   }, {
		       type: 'category3d',
		       position: 'bottom',
		       title: {
		           text: 'APK DITOLAK',
		           fontSize: 13
		       },
		       fields: 'name'
		   }],
		   series: {
		       type: 'bar3d',
		       subStyle: {
		           fill: ['#EF1515'],
		           stroke: '#E41E1E'
		       },
		       xField: 'name',
		       yField: 'value',
		       tooltip: {
	                trackMouse: true,
	                style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
	                }
	            }
		   }
	});

	var grupProses = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'dashboard/proses'
		}
	});

	var diproses = Ext.create({
		   xtype: 'cartesian',
		   width: 360,
		   height: 250,
		   store: grupProses,
		   axes: [{
		       type: 'numeric3d',
		       position: 'left',
		       fields: 'value',
		       majorTickSteps: 2
		   }, {
		       type: 'category3d',
		       position: 'bottom',
		       title: {
		           text: 'APK DALAM PROSES',
		           fontSize: 13
		       },
		       fields: 'name'
		   }],
		   series: {
		       type: 'bar3d',
		       subStyle: {
		           fill: ['#2255AE'],
		           stroke: '#1B4184'
		       },
		       xField: 'name',
		       yField: 'value',
		       tooltip: {
	                trackMouse: true,
	                style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
	                }
	           }
		   }
	});

	var grupBatal = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'dashboard/batal'
		}
	});

	var dibatal = Ext.create({
		   xtype: 'cartesian',
		   width: 360,
		   height: 250,
		   store: grupBatal,
		   axes: [{
		       type: 'numeric3d',
		       position: 'left',
		       fields: 'value',
		       majorTickSteps: 2
		   }, {
		       type: 'category3d',
		       position: 'bottom',
		       title: {
		           text: 'APK BATAL',
		           fontSize: 13
		       },
		       fields: 'name'
		   }],
		   series: {
		       type: 'bar3d',
		       subStyle: {
		       	   fill: ['#E0E41E'],
		           stroke: '#C3C621'
		       },
		       xField: 'name',
		       yField: 'value',
		       tooltip: {
	                trackMouse: true,
	                style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
	                }
	           }
		   }
	});

	var grupMGrade = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'dashboard/monthgrade'
		}
	});

	var monthgrade = Ext.create({
		xtype: 'polar',
		width: 200,
		height: 200,
		theme: 'green',
		interactions: ['rotate', 'itemhighlight'],
		store: grupMGrade,
	  	series: {
	  		type: 'pie',
	  		highlight: true,
	  		angleField: 'value',
	  		label: {
	  			field: 'name',
	  			display: 'inside',
	  			fontSize: 10
	  		},
	  		tooltip: {
	            trackMouse: true,
	            style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get('value') + ' APK');
	                }
	        },
	  		xField: 'number',
	  		donut: 30
		}
	});

	var grupYGrade = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'dashboard/yeargrade'
		}
	});

	var yeargrade = Ext.create({
		xtype: 'polar',
		width: 200,
		height: 200,
		theme: 'green',
		interactions: ['rotate', 'itemhighlight'],
		store: grupYGrade,
	  	series: {
	  		type: 'pie',
	  		highlight: true,
	  		angleField: 'value',
	  		label: {
	  			field: 'name',
	  			display: 'inside',
	  			fontSize: 10
	  		},
	  		tooltip: {
	            trackMouse: true,
	            style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get('value') + ' APK');
	                }
	        },
	  		donut: 30
		}
	});

	function fnReload() {
		grupSetuju.load();
		grupProses.load();
		grupTolak.load();
		grupBatal.load();
		grupMGrade.load();
		grupYGrade.load();
	}

	var frmChart = Ext.create('Ext.form.Panel', {
		width: 990,
		border: false,
		frame: true,
		region: 'center',
		title: 'Dashboard',
		items: [{
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'APK',
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Disetujui',
						xtype: 'fieldset',
						items: [
							disetujui
						]
					}]
				},{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Ditolak',
						xtype: 'fieldset',
						items: [
							ditolak
						]
					}]
				},{
					flex: 1.2,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Monthly Grade',
						xtype: 'fieldset',
						items: [
							monthgrade
						]
					}]
				}]
			},{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Dalam Proses',
						xtype: 'fieldset',
						items: [
							diproses
						]
					}]
				},{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Batal',
						xtype: 'fieldset',
						items: [
							dibatal
						]
					}]
				},{
					flex: 1.2,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Yearly Grade',
						xtype: 'fieldset',
						items: [
							yeargrade
						]
					},{
						anchor: '99%',
						style: 'padding: 5px;',
						xtype: 'fieldset',
						items: [
							btnRefresh
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmChart
	});

	function fnMaskShow() {
		frmChart.mask('Please wait...');
	}

	function fnMaskHide() {
		frmChart.unmask();
	}

	frmChart.render(Ext.getBody());
	Ext.get('loading').destroy();
});