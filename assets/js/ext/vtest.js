Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.LiveSearchGridPanel',
	'Ext.ux.ProgressBarPager'
]);

Ext.onReady(function() {
	    Ext.grid.EditorGridPanel({
	  region: 'center',
	  id: 'usersGrid',
	   stripeRows: true,
	   autoExpandColumn: 'username',
	    columns: [
	    {
	            // username
	    },
	    {
	            // email
	    },
	    {
	            // last seen
	    },
	    {
	        //  actions combo, it won't show
	            header   : '',
	            width    : 220,
	            fixed    : true,
	            hideable : false,
	            dataIndex: 'actions',
	            editor   : {xtype:'combo', 
	                        store: new Ext.data.ArrayStore({
	                               fields: ['abbr', 'action'],
	                               data : [                                         
	                                       ['suspend', 'Suspend'],
	                                       ['activate', 'Activate'],
	                                       ['update', 'Update'],
	                                       ['delete', 'Delete']
	                                      ]
	                                }),
	                               displayField:'action',
	                               valueField: 'abbr',
	                               mode: 'local',
	                              typeAhead: false,
	                              triggerAction: 'all',
	                              lazyRender: true,
	                              emptyText: 'Select action'
	                        }
	    }]
	});
	
	function fnMaskShow() {
		winLogin.mask('Please wait...');
	}

	function fnMaskHide() {
		winLogin.unmask();
	}
	
	Ext.get('loading').destroy();
});
