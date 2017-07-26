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

	function tglDMY(text) {
		var x = '-';
		return text.substr(6,2).concat(x,text.substr(4,2),x,text.substr(0,4));
	}

	var cellEditingProd = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});


	function angsdimuka() {

		var dimuka = Ext.getCmp('cboDimuka').getValue();

		if(dimuka=='Y'){
			var kali = Ext.getCmp('txtDimukaKali').getValue();
		var angsuran = Ext.getCmp('txtAngsuran').getValue();
		
		
		var xtotal = kali * angsuran;
		Ext.getCmp('txtAngsuranDimuka').setValue(xtotal);
		}

		else {

			Ext.getCmp('txtAngsuranDimuka').setValue('0');
		}
			
	}


	function selisihDp() {

		var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
		var totalDP = Ext.getCmp('txtTotalDp').getValue();
		var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
		var premigross = Ext.getCmp('txtPremiGros').getValue();
		var preminet = Ext.getCmp('txtPremiNet').getValue();
		var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
		var uangmuka = Ext.getCmp('txtUangMuka').getValue();
		var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
		var grosfix = Ext.getCmp('txtPremiGrosFix').getValue();

		var hasil = totalDP - biayaadmin - grosfix- dimuka - totaltrans - uangmuka;
		var hasil2 = totalDP - biayaadmin - grosfix - dimuka - totaltrans;
		function format1(n) {
 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		}
		
		var fix = format1(hasil);
		var fix2 = format1(hasil2);

		if(fix>0){
			Ext.getCmp('txtAsuransiDealer').setValue(fix);
			Ext.getCmp('txtUangMuka').setValue(fix2);
			Ext.getCmp('txtUangMuka2').setValue(fix2);
			Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

		 //document.getElementById("total_trx").value=fix;
		}

		else {
			//alert(fixx);
			var fixx2 = hasil * (-1);
			

			var fixed2 = format1(fixx2);
			
			Ext.getCmp('txtUangMuka').setValue(fix2);
			Ext.getCmp('txtUangMuka2').setValue(fix2);
			Ext.getCmp('txtAsuransiDealer').setValue(fixed2);
			Ext.getCmp('txtAsuransiKonsumen').setValue(fixed2);
			var fixed = fix;
		 
			//document.getElementById("total_trx").value=fixed;
		}


			
	}




	function bungaFlat() {


		function RATE(periods, payment, present, future, type) {
		  // Credits: rabugento

		  var guess = (typeof guess === 'undefined') ? 0.01 : guess;

		  // Evaluate periods (TODO: replace with secure expression evaluator)
		  periods = eval(periods);

		  // Set maximum epsilon for end of iteration
		  var epsMax = 1e-10;
		  
		  // Set maximum number of iterations
		  var iterMax = 50;

		  // Implement Newton's method
		  var y, y0, y1, x0, x1 = 0, f = 0, i = 0;
		  var rate = guess;
		  if (Math.abs(rate) < epsMax) {
		     y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
		  } else {
		     f = Math.exp(periods * Math.log(1 + rate));
		     y = present * f + payment * (1 / rate + type) * (f - 1) + future;
		  }
		  y0 = present + payment * periods + future;
		  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
		  i = x0 = 0;
		  x1 = rate;
		  while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
		    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
		    x0 = x1;
		    x1 = rate;
		    if (Math.abs(rate) < epsMax) {
		      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
		    } else {
		      f = Math.exp(periods * Math.log(1 + rate));
		      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
		    }
		    y0 = y1;
		    y1 = y;
		    ++i;
		  }
		  return rate;
		}

		var otr = Ext.getCmp('txtHargaOTRdealer').getValue();
		var tenor = Ext.getCmp('txtTenor').getValue();
		var bungad = Ext.getCmp('txtBungaDealer').getValue();
		var pembiayaan = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
		//var te = Ext.getCmp('txtPokokPembiayaanDealer').getValue();

		var bungaflats = bungad / pembiayaan;

		//alert(bungaflats);
		var bungaflatss = tenor / 12;

		var fixxx = bungaflats / bungaflatss;


		var bungaflat = fixxx * 100;

		var angsuran = Ext.getCmp('txtAngsuran').getValue();
		//var tess = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
		
		var hutang = pembiayaan * (-1);
		
		var xfuture = '0';
		var cbDimuka = Ext.getCmp('cboDimuka').getValue();

		
		if(cbDimuka=='T' || cbDimuka=='TIDAK'){

			var tipe = 0;

		}
		else {
			var tipe = 1;
		}

		var lama = '0';



		


		
		// Copyright (c) 2012 Sutoiku, Inc. (MIT License)

		var hasil =  RATE(tenor,angsuran,hutang,0,tipe);
		var fix = hasil * 12 * 100;
		

		Ext.getCmp('txtBungaFlat').setValue(bungaflat);
		Ext.getCmp('txtBungaFlatDealer').setValue(fix);
		Ext.getCmp('txtBungaFlat3').setValue(bungaflat);

		Ext.getCmp('txtBungaFlat4').setValue(fix);


		var uangmukadealer = Ext.getCmp('txtUangMukaDealerp').getValue();
		var uangmuka1 =  uangmukadealer / otr * 100;


		Ext.getCmp('txtUangMukaDealerlabel').setValue(uangmuka1.toFixed(2));
		Ext.getCmp('txtUangMukaDealer2').setValue(uangmuka1.toFixed(2));

			
	}


	function gridTooltipProd(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on the Qty to edit',
			target: view.el,
			trackMouse: true
		});
	}

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


	var txtPolaa = {
		anchor: '100%',
		id: 'txtPolaa',
		name: 'txtPolaa',
		hidden: true,
		xtype: 'textfield'
	};

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


	function pokokpembiayaan() {
		var otr = Ext.getCmp('txtHargaOTRdealer').getValue();
		var uangmuka = Ext.getCmp('txtUangMukaDealerp').getValue();

		var asuransi = Ext.getCmp('txtAsuransiDealer').getValue();		

		var angs = Ext.getCmp('txtAngsuranBulanDealer').getValue();		

		var tenor = Ext.getCmp('txtTenor2').getValue();		

		var xpiu = angs * tenor;
		var xtotal = otr - uangmuka + asuransi;

		Ext.getCmp('txtPokokPembiayaanDealer').setValue(xtotal);
		Ext.getCmp('txtPokokPembiayaanKonsumen').setValue(xtotal);


		Ext.getCmp('txtPiutangKonsumen').setValue(xpiu);
		Ext.getCmp('txtPiutangDealer').setValue(xpiu);


	}

	function bunga() {

		var piutang = Ext.getCmp('txtPiutangDealer').getValue();		

		var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();	

		var xbunga = piutang - pokok;


		Ext.getCmp('txtBungaDealer').setValue(xbunga);
		Ext.getCmp('txtBungaKonsumen').setValue(xbunga);


	}


	function PremiNett() {

		var assgros = Ext.getCmp('txtPremiGrosFix').getValue();

		if(assgros==0 || assgros==''){
			var xtotal = 0
		}
		else {
			//var xtotal = (assgros - 25000) - (assgros * 0.25) + 25000;
			var gross = assgros - 25000;
			var xtotal = (0.75 * (gross))+25000;
		}		


		var hasil = Math.trunc(xtotal);


		


		Ext.getCmp('txtPremiNet').setValue(hasil);



	}

	function PremiGrossFix() {

	var tjh = Ext.getCmp('txtBiayaTjH').getValue();
													var premi = Ext.getCmp('txtPremiGros').getValue();
													var perluasan = Ext.getCmp('txtPerluasan').getValue();
													 var total = parseInt(tjh) + parseInt(premi) + parseInt(perluasan) + 25000;

													 Ext.getCmp('txtPremiGrosFix').setValue(total);
													  //Ext.getCmp('txtPremiGrosFix2').setValue(total);



	}

	function uangmuka() {
		var dp = Ext.getCmp('txtTotalDp').getValue();
		var admin = Ext.getCmp('txtBiayaAdm').getValue();
		var premi = Ext.getCmp('txtPremiGros').getValue();
		var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
		var grosfix = Ext.getCmp('txtPremiGrosFix').getValue();
		var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
		
		
		var xtotal = dp - admin - grosfix - dimuka - totaltrans;

		if (xtotal > 0) {
    	Ext.getCmp('txtUangMuka').setValue(xtotal);
    	Ext.getCmp('txtUangMuka2').setValue(xtotal);
		Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
		Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);

		//document.getElementById("total_trx").value='0';
		}
		else {
			xtotals =  xtotal *(-1);		
		Ext.getCmp('txtUangMuka').setValue(xtotals);
		Ext.getCmp('txtUangMuka2').setValue(xtotal);
		Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
		Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);

		//document.getElementById("total_trx").value='0';
		}
	
		}

	function LuxTax() {
		var xJenisPiu = Ext.getCmp('cboJenisPiu').getValue();
		var xPola = Ext.getCmp('cboPola').getValue();
		var xTenor = Ext.getCmp('txtTenor').getValue();
		var xTenor = Ext.getCmp('txtHargaOTR').getValue();

		
		Ext.Ajax.request({
			method: 'POST',
			url: 'konsumen/biayaadmin',
			params: {
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fd_lama_angsuran': Ext.getCmp('txtTenor').getValue(),
				'fs_otr': Ext.getCmp('txtHargaOTR').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					//	Ext.getCmp('cboGL').setValue(xtext.kdacno);
						Ext.getCmp('txtBiayaAdm').setValue(xtext.hasil);
					
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Kalkulasi Failed',
					title: 'MFAS'
				});
				//fnMaskHide();
			}
		});

	}

	
	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on record to choose',
			target: view.el,
			trackMouse: true
		});
	}

	function buatForm() {
		function fnDetil() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'alamat/detil',
			params: {
				'fs_kd_tipe': Ext.getCmp('cboTipe').getValue(),
				'fs_code': Ext.getCmp('cboCode').getValue(),
				'fs_count': Ext.getCmp('cboCount').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					var xkdtipe = Ext.getCmp('cboTipe').getValue();
					
					if (xkdtipe == '01') {
						Ext.getCmp('cboGL').setValue(xtext.kdacno);
						Ext.getCmp('txtGL').setValue(xtext.nmacno);
						Ext.getCmp('cekSupp').setValue(xtext.cek);
					}
					else if (xkdtipe == '02') {
						Ext.getCmp('cboTipeCust').setValue(xtext.kdtipe);
						Ext.getCmp('txtTipeCust').setValue(xtext.nmtipe);
						Ext.getCmp('cekCust').setValue(xtext.cek);
					}
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Generate Supplier Detail Failed, Connection Failed!!',
					title: 'IDS'
				});
				fnMaskHide();
			}
		});
	}

	function fnAmbilKode() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'alamat/ambilkode',
			params: {
				'fs_kd_tipe': Ext.getCmp('cboTipe').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					Ext.getCmp('cboCode').setValue(xtext.txtcode);
					Ext.getCmp('cboCount').setValue(xtext.txtcount);
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Generate Code Failed, Connection Failed!!',
					title: 'IDS'
				});
				fnMaskHide();
			}
		});
	}

	var grupTipe = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_tipe','fs_nm_tipe'],
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
			url: 'alamat/kodetipe'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_tipe': Ext.getCmp('cboTipe').getValue(),
					'fs_nm_tipe': Ext.getCmp('cboTipe').getValue()
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupTipe,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupTipe,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Type Code", dataIndex: 'fs_kd_tipe', menuDisabled: true, width: 100},
			{text: "Type Name", dataIndex: 'fs_nm_tipe', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboTipe').setValue(record.get('fs_kd_tipe'));
				Ext.getCmp('txtTipe').setValue(record.get('fs_nm_tipe'));
				
				if (Ext.getCmp('txtTipe').getValue() !== '') {
					fnAmbilKode();
				}
				winCari.hide();
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

	
	var grupModelKendaraan = Ext.create('Ext.data.Store', {
		fields: [
			'fs_merek_kendaraan','fs_model_kendaraan','fs_jenis_kendaraan','fs_silinder_kendaraan','fs_kode_kendaraan_lama'
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
	
	var grupDealer = Ext.create('Ext.data.Store', {
		fields: [
			'fs_nama_dealer','fs_kode_cabang','fs_nama_pemilik','fs_kode_dealer1','fs_kode_dealer2','fs_alamat_dealer','fs_telepon_dealer' ,'fn_cabang_dealer' ,'fs_kota_dealer' , 'fs_rekening_bank_pencairan',
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
					'fs_cari': Ext.getCmp('txtCari13').getValue(),
					'fs_kode_cabang': Ext.getCmp('txtKodeCabangDealer').getValue()
				});
			}
		}
	});
	

	var grupJenisKendaraan = Ext.create('Ext.data.Store', {
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
			url: 'apknew/ambil_jenis_kendaraan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jenis_kendaraan',
					'fs_nama_referensi': '',
					'fs_nilai1_referensi': '',
					'fs_nilai2_referensi': ''
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
	
	
	var grupKabupatens = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_dati','fs_nama_dati'
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
			url: 'apknew/ambil_dati'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var grupKotaa = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_kota','fs_nama_kota'
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
			url: 'apknew/ambil_kotaa'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});
	
	var grupKotaKonsumen= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_kota','fs_nama_kota'
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
			url: 'apknew/ambil_kota'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});
	
	var grupKotaTambahan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_kota','fs_nama_kota'
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
			url: 'apknew/ambil_kota_tambahan'
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

	var grupKodeTrans2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
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
			url: 'konsumen/grid_trans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  //'fs_cari': Ext.getCmp('txtCari19').getValue()
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
			url: 'konsumen/grid_perluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  //'fs_cari': Ext.getCmp('txtCari19').getValue()
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

	Ext.define('DataGridAsuransi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_tahun_ke', type: 'string'},
			{name: 'fs_jenis_asuransi', type: 'string'}
		]
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
			url: 'konsumen/grid_asuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  //'fs_cari': Ext.getCmp('txtCari19').getValue()
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

	var grupPolaTransaksi= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nilai1_referensi','fs_nama_referensi','fs_nilai2_referensi'
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

	var winGridUsahaKerja = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupUsahaPekerjaan,
		bbar: Ext.create('Ext.PagingToolbar', {
			disabled:true,
			pageSize: 500,
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
				Ext.getCmp('txtTjh').setValue(record.get('fs_tjh'));
				Ext.getCmp('txtTjh2').setValue(record.get('fs_tjh'));
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

	var winGridUsahaKerja2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupUsahaPekerjaan2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 99999999,
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
	
	var winGridUsahaKerja3 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupUsahaPekerjaan3,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 500,
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
	
	var winGridModelKendaraan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 750,
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
			{text: 'Merek Kendaraan', dataIndex: 'fs_merek_kendaraan', menuDisabled: true, width: 120},
			{text: 'Model Kendaraan', dataIndex: 'fs_model_kendaraan', menuDisabled: true, width: 190},
			{text: 'Jenis Kendaraan', dataIndex: 'fs_jenis_kendaraan', menuDisabled: true, width: 140},
			{text: 'Silinder', dataIndex: 'fs_silinder_kendaraan', menuDisabled: true, width: 100},
			{text: 'Kode Kendaraan', dataIndex: 'fs_kode_kendaraan_lama', menuDisabled: true, width: 140},
			
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


				var polaTrans = Ext.getCmp('cboPola').getValue();
				var jenispiutangs = Ext.getCmp('cboJenisPiu').getValue();
				var tglapk = Ext.getCmp('txtRefnodt').getValue();
				var jeniss = Ext.getCmp('cboJenis').getValue();

				if (polaTrans.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Pola transaksi masih kosong!',
					title: 'MFAS'
					});


					winCariModelKendaraan.hide();

					return;


				}
				else if (jenispiutangs.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Piutang masih kosong!',
					title: 'MFAS'
					});

				winCariModelKendaraan.hide();
					return;
				}
				else if (tglapk == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Tanggal APK masih kosong!',
					title: 'MFAS'
					});

				winCariModelKendaraan.hide();
					return;
				}
				else if (jeniss == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Konsumen masih kosong!',
					title: 'MFAS'
					});

				winCariModelKendaraan.hide();
					return;
				}
				else 
				{
				Ext.getCmp('cboModelKendaraan').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtKodeKendaraan').setValue(record.get('fs_kode_kendaraan_lama'));
				Ext.getCmp('txtModelKendaraan').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtJenisKendaraan').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('txtSilinder').setValue(record.get('fs_silinder_kendaraan'));


				winCariModelKendaraan.hide();
				}
				
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});
	
	var txtKodeSkalaPerusahaan = {
		anchor: '100%',
		emptyText: "Kabupaten",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKodeSkalaPerusahaan',
		name: 'txtKodeSkalaPerusahaan',
		hidden: true,
		xtype: 'textfield'
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
			{text: 'Cab Dealer', dataIndex: 'fn_cabang_dealer', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_nama_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_atasnama_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_rekening_bank_pencairan', menuDisabled: true, hidden:true, width: 140},
			{text: 'Cab Dealer', dataIndex: 'fs_kode_cabang', menuDisabled: true, hidden:true, width: 140},
			
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
				Ext.getCmp('txtKodeCabangDealer').setValue(record.get('fs_kode_cabang'));
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
	
	var winGridJenisKendaraan = Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupJenisKendaraan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJenisKendaraan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariJenisKendaraan.hide();
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
				Ext.getCmp('cboJenisKendaraan').setValue(record.get('fs_nilai1_referensi'));
				Ext.getCmp('txtJenisKendaraan').setValue(record.get('fs_nama_referensi'));
				
				winCariJenisKendaraan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});
	
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
				Ext.getCmp('txtStatusKawin').setValue(record.get('fs_nilai1_referensi'));

				var kondisi = record.get('fs_nilai1_referensi');

				if(kondisi=='C') {

				 	//combo1.setDisabled(true);
				 	//combo2.setDisabled(false);

				 	Ext.getCmp('txtNamaIstri').setDisabled(true);
				 	Ext.getCmp('txtAlamatIstri').setDisabled(true);
				 	Ext.getCmp('cboKodePosIstri').setDisabled(true);
				 	Ext.getCmp('txtTeleponIstri').setDisabled(true);
				 	Ext.getCmp('txtKabupatenKotaIstri').setDisabled(true);
				 	Ext.getCmp('cboUsahaKerjaan').setDisabled(true);
				 	Ext.getCmp('txtKeteranganUsahaIstri').setDisabled(true);
				 	Ext.getCmp('txtAlamatUsahaSuamiIstri').setDisabled(true);
				 	Ext.getCmp('txtTeleponUsaha').setDisabled(true);
				 	Ext.getCmp('txtPendapatanSuamiIstri').setDisabled(true);

				 	Ext.getCmp('txtNamaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtAlamatPenjamin').setDisabled(false);
				 	Ext.getCmp('cboKodePosPenjamin').setDisabled(false);
				 	Ext.getCmp('txtTeleponPenjamin').setDisabled(false);
				 	Ext.getCmp('txtKabupatenKotaPenjamin').setDisabled(false);
				 	Ext.getCmp('cboUsahaKerjaanPenjamin').setDisabled(false);
				 	Ext.getCmp('txtKeteranganUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtAlamatUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtTeleponUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtPendapatanPenjamin').setDisabled(false);
				 	Ext.getCmp('txtStatusPenjamin').setDisabled(false);

				}

				else if(kondisi=='T') {

					Ext.getCmp('txtNamaIstri').setDisabled(true);
				 	Ext.getCmp('txtAlamatIstri').setDisabled(true);
				 	Ext.getCmp('cboKodePosIstri').setDisabled(true);
				 	Ext.getCmp('txtTeleponIstri').setDisabled(true);
				 	Ext.getCmp('txtKabupatenKotaIstri').setDisabled(true);
				 	Ext.getCmp('cboUsahaKerjaan').setDisabled(true);
				 	Ext.getCmp('txtKeteranganUsahaIstri').setDisabled(true);
				 	Ext.getCmp('txtAlamatUsahaSuamiIstri').setDisabled(true);
				 	Ext.getCmp('txtTeleponUsaha').setDisabled(true);
				 	Ext.getCmp('txtPendapatanSuamiIstri').setDisabled(true);


				 	Ext.getCmp('txtNamaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtAlamatPenjamin').setDisabled(false);
				 	Ext.getCmp('cboKodePosPenjamin').setDisabled(false);
				 	Ext.getCmp('txtTeleponPenjamin').setDisabled(false);
				 	Ext.getCmp('txtKabupatenKotaPenjamin').setDisabled(false);
				 	Ext.getCmp('cboUsahaKerjaanPenjamin').setDisabled(false);
				 	Ext.getCmp('txtKeteranganUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtAlamatUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtTeleponUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtPendapatanPenjamin').setDisabled(false);
				 	Ext.getCmp('txtStatusPenjamin').setDisabled(false);


				}else {

					Ext.getCmp('txtNamaIstri').setDisabled(false);
				 	Ext.getCmp('txtAlamatIstri').setDisabled(false);
				 	Ext.getCmp('cboKodePosIstri').setDisabled(false);
				 	Ext.getCmp('txtTeleponIstri').setDisabled(false);
				 	Ext.getCmp('txtKabupatenKotaIstri').setDisabled(false);
				 	Ext.getCmp('cboUsahaKerjaan').setDisabled(false);
				 	Ext.getCmp('txtKeteranganUsahaIstri').setDisabled(false);
				 	Ext.getCmp('txtAlamatUsahaSuamiIstri').setDisabled(false);
				 	Ext.getCmp('txtTeleponUsaha').setDisabled(false);
				 	Ext.getCmp('txtPendapatanSuamiIstri').setDisabled(false);


				 	Ext.getCmp('txtNamaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtAlamatPenjamin').setDisabled(false);
				 	Ext.getCmp('cboKodePosPenjamin').setDisabled(false);
				 	Ext.getCmp('txtTeleponPenjamin').setDisabled(false);
				 	Ext.getCmp('txtKabupatenKotaPenjamin').setDisabled(false);
				 	Ext.getCmp('cboUsahaKerjaanPenjamin').setDisabled(false);
				 	Ext.getCmp('txtKeteranganUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtAlamatUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtTeleponUsahaPenjamin').setDisabled(false);
				 	Ext.getCmp('txtPendapatanPenjamin').setDisabled(false);
				 	Ext.getCmp('txtStatusPenjamin').setDisabled(false);


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
				Ext.getCmp('txtKodePendidikan').setValue(record.get('fs_nilai1_referensi'));
				
				winCariPendidikan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
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
	
	var winGridKategoriUsaha = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 550,
		width: 430,
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

				//Ext.getCmp('txtPremiGrosFix').setValue('0');

				var polaTrans = Ext.getCmp('cboPola').getValue();
				var jenispiutangs = Ext.getCmp('cboJenisPiu').getValue();
				var tglapk = Ext.getCmp('txtRefnodt').getValue();
				var jeniss = Ext.getCmp('cboJenis').getValue();

				if (polaTrans.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Pola transaksi masih kosong!',
					title: 'MFAS'
					});


				winCariJenisAsuransi.hide();
					return;


				}
				else if (jenispiutangs.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Piutang masih kosong!',
					title: 'MFAS'
					});

				winCariJenisAsuransi.hide();
					return;
				}
				else if (tglapk == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Tanggal APK masih kosong!',
					title: 'MFAS'
					});

				winCariJenisAsuransi.hide();
					return;
				}
				else if (jeniss == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Konsumen masih kosong!',
					title: 'MFAS'
					});

				winCariJenisAsuransi.hide();
					return;
				}
				else 
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

				PremiGross();


												    //BiayaTJH();

												    
													 //angsdimuka();

												     //pokokpembiayaan();

												     //bunga();

												   

													 //uangmuka();

			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var txtTenorMIX = {
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
         		  Ext.getCmp('txtTenor').setValue(newValue);
         		  Ext.getCmp('txtTenor2').setValue(newValue);
         		  Ext.getCmp('txtTenor3').setValue(newValue);
         		  Ext.getCmp('txtTenor4').setValue(newValue);
         		  Ext.getCmp('txtTenor5').setValue(newValue);
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
				txtTenorMIX
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
											title: 'MFAS'
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
												title: 'MFAS'
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
				Ext.getCmp('txtKodeSkalaPerusahaan').setValue(record.get('fs_nilai1_referensi'));
				
				winCariSkalaPerusahaan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});
	
	var winGridKab = Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKabupatens,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKabupatens,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariKab.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Dati', dataIndex: 'fs_kode_dati', menuDisabled: true, width: 240},
			{text: 'Nama', dataIndex: 'fs_nama_dati', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKabupatens').setValue(record.get('fs_kode_dati'));
				Ext.getCmp('txtKabupaten').setValue(record.get('fs_nama_dati'));
				
				winCariKab.hide();
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

	var winGridKodeTrans = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupKodeTrans,
		bbar: Ext.create('Ext.PagingToolbar', {
			pageSize: 500,
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
			{text: 'Kode', dataIndex: 'fs_kode_transaksi', menuDisabled: true, width: 100},
			{text: 'Nama Transaksi', dataIndex: 'fs_nama_transaksi', menuDisabled: true, width: 260}
			
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

												    selisihDp();

												      

												   		 }
													 }
	};

	var txtTotalTrans3 = {
		anchor: '170%',
				emptyText: 'Enter a Name',
				fieldLabel: 'Total Trans',
				labelAlign: 'top',
				labelSeparator: '',
				hidden:true,
				id: 'txtTotalTrans3',
				name: 'txtTotalTrans3',
				xtype: 'textfield',
				 listeners: {
												    'change': function(field,newValue){

												    //pokokpembiayaan();

												    //bunga();

												    //PremiGross();

												   // PremiNett();

												    selisihDp();

												      

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


															var totalDP = Ext.getCmp('txtTotalDp').getValue();
															var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
															var premigross = Ext.getCmp('txtPremiGros').getValue();
															var preminet = Ext.getCmp('txtPremiNet').getValue();
															var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
															var uangmuka = Ext.getCmp('txtUangMuka').getValue();
															var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();

															if(newValue>0){

																var totalsss = newValue;

																var hasil2 = parseInt(pokok) - parseInt(biayaadmin) - parseInt(dimuka) - parseInt(preminet) +
															 parseInt(totalsss);
															}
															else {

																var totalsss = newValue * (-1);

																var hasil2 = parseInt(pokok) - parseInt(biayaadmin) - parseInt(dimuka) - parseInt(preminet) -
															 parseInt(totalsss);
															}

															

															function format1(n) {
													 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
															}
															
															var fix2 = format1(hasil2);

															if(hasil2 > 0){

																var fixa = format1(hasil2);
																Ext.getCmp('txtNilaiCair').setValue(fixa);
																Ext.getCmp('txtNilaiCair3').setValue(fixa);
																
															// document.getElementById("total_trx2").value=fix2;

															}

															else {
																var fixx2 = hasil2 * (-1);
																

																var fixed2 = format1(fixx2);
															 	
															 	//alert(fixed2);
															 	 Ext.getCmp('txtNilaiCair').setValue(fixed2);
															 	 Ext.getCmp('txtNilaiCair3').setValue(fixed2);
																//document.getElementById("total_trx2").value=fixed2;
															}

												      

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
								title: 'MFAS'
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
											title: 'MFAS'
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
											title: 'MFAS'
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
											title: 'MFAS'
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
					var sm = gridKode.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupKodeTrans2.remove(sm.getSelection());
					gridKode.getView().refresh();
					if (grupKodeTrans2.getCount() > 0) {
						sm.select(0);
					}
					
					var xprod = Ext.getCmp('txtProdAktif').getValue();
					var xQty = 0;
					store = gridKode.getStore();
					store.each(function(record, idx) {
						if (xprod.trim() == record.get('fs_kode_transaksi').trim()) {
							xQty = xQty + 1;
						}
					});
					gridKode.getView().refresh();
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
			dataIndex: 'fs_nama_perluasan',
			text: 'Jenis Perluasan',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_tenor_perluasan',
			text: 'Tenor',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridPerluasan.down('#removeData2').setDisabled(!records.length);
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
				cboPerluasan
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
			txtTenorPerluasan
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
										fs_nama_perluasan: Ext.getCmp('cboPerluasan').getValue(),
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
											title: 'MFAS'
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
											title: 'MFAS'
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
											title: 'MFAS'
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
					var sm = gridPerluasan.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupPerluasan.remove(sm.getSelection());
					gridPerluasan.getView().refresh();
					if (gridPerluasan.getCount() > 0) {
						sm.select(0);
					}
					
					//var xprod = Ext.getCmp('txtProdAktif').getValue();
					var xQty = 0;
					store = gridKode.getStore();
					store.each(function(record, idx) {
						if (xprod.trim() == record.get('fs_kode_transaksi').trim()) {
							xQty = xQty + 1;
						}
					});
					gridPerluasan.getView().refresh();
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
		buttons: [{
			text: 'OK',
			handler: function() {

				winKode.hide();
				vMask.hide();
				fnSaveTrans();
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

				/*if (xtotal < tenor) {
					Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Tahun Belum lengkap!!',
												title: 'SIAP'
											});
											xlanjut = false;
				}
				*/

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
				Ext.getCmp('txtPolaa').setValue(record.get('fs_nilai2_referensi'));
				

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
	
	var winGridKotaKonsumen = Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKotaKonsumen,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaKonsumen,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariKotaKonsumen.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Kota', dataIndex: 'fs_kode_kota', menuDisabled: true, width: 240},
			{text: 'Nama Kota', dataIndex: 'fs_nama_kota', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKotaKonsumen').setValue(record.get('fs_kode_kota'));
				Ext.getCmp('txtKotaKonsumen').setValue(record.get('fs_nama_kota'));
				
				winCariKotaKonsumen.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKota= Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKotaa,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaa,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariKota.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Kota', dataIndex: 'fs_kode_kota', menuDisabled: true, width: 240},
			{text: 'Nama Kota', dataIndex: 'fs_nama_kota', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKotaWiras').setValue(record.get('fs_nama_kota'));
				
				winCariKota.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});
	
	var winGridKotaTambahan = Ext.create('Ext.ux.LiveSearchGridPanel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKotaTambahan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaTambahan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariKotaTambahan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Kota', dataIndex: 'fs_kode_kota', menuDisabled: true, width: 240},
			{text: 'Nama Kota', dataIndex: 'fs_nama_kota', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKotaTambahan').setValue(record.get('fs_nama_kota'));
				
				winCariKotaTambahan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
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
	

	var winCariJenisKendaraan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridJenisKendaraan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupJenisKendaraan.load();
				vMask.show();
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
	
	var winCariKotaTambahan= Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKotaTambahan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKotaTambahan.load();
				vMask.show();
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
	
	var winCariKab = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKab
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKabupatens.load();
				vMask.show();
			}
		}
	});

	var winCariKota= Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKota
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKotaa.load();
				vMask.show();
			}
		}
	});
	
	var winCariKotaKonsumen = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKotaKonsumen
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKotaKonsumen.load();
				vMask.show();
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

	var cellEditingReg2 = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	var cboTipe = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: "Select a",
		fieldLabel: 'Type',
		id: 'cboTipe',
		name: 'cboTipe',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtTipe').setValue('');
				Ext.getCmp('cboCode').setValue('');
				Ext.getCmp('cboCount').setValue('');
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

	

	var txtTipe = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Type",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtTipe',
		name: 'txtTipe',
		readOnly: true,
		xtype: 'textfield'
	};

	var grupKode = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_code','fs_count','fs_nm_code',
			'fs_kd_tipe','fs_nm_tipe',
			'fs_alamat','fs_kd_kota','fs_nm_kota',
			'fs_kd_kab','fs_nm_kab','fs_kd_prop','fs_nm_prop',
			'fs_kd_neg','fs_nm_neg','fs_kd_wn','fs_nm_wn',
			'fs_kd_id','fd_tgl_id',
			'fs_tlp','fs_tlp2'
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
			url: 'alamat/kodecode'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_tipe': Ext.getCmp('cboTipe').getValue(),
					'fs_code': Ext.getCmp('cboCode').getValue(),
					'fs_count': Ext.getCmp('cboCount').getValue(),
					'fs_nm_code': Ext.getCmp('cboCount').getValue()
				});
			}
		}
	});

	var winGrid2 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupKode,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKode,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Code", dataIndex: 'fs_code', menuDisabled: true, width: 70},
			{text: "Count", dataIndex: 'fs_count', menuDisabled: true, width: 70},
			{text: "Name", dataIndex: 'fs_nm_code', menuDisabled: true, width: 340},
			{text: "Address", dataIndex: 'fs_alamat', menuDisabled: true, hidden: true},
			{text: "City Cd", dataIndex: 'fs_kd_kota', menuDisabled: true, hidden: true},
			{text: "City", dataIndex: 'fs_nm_kota', menuDisabled: true, hidden: true},
			{text: "District Cd", dataIndex: 'fs_kd_kab', menuDisabled: true, hidden: true},
			{text: "District", dataIndex: 'fs_nm_kab', menuDisabled: true, hidden: true},
			{text: "Province Cd", dataIndex: 'fs_kd_prop', menuDisabled: true, hidden: true},
			{text: "Province", dataIndex: 'fs_nm_prop', menuDisabled: true, hidden: true},
			{text: "Country Cd", dataIndex: 'fs_kd_neg', menuDisabled: true, hidden: true},
			{text: "Country", dataIndex: 'fs_nm_neg', menuDisabled: true, hidden: true},
			{text: "Citizen Cd", dataIndex: 'fs_kd_wn', menuDisabled: true, hidden: true},
			{text: "Citizen", dataIndex: 'fs_nm_wn', menuDisabled: true, hidden: true},
			{text: "ID Card", dataIndex: 'fs_kd_id', menuDisabled: true, hidden: true},
			{text: "ID Date", dataIndex: 'fd_tgl_id', menuDisabled: true, hidden: true},
			{text: "Phone 1", dataIndex: 'fs_tlp', menuDisabled: true, hidden: true},
			{text: "Phone 2", dataIndex: 'fs_tlp2', menuDisabled: true, hidden: true}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCode').setValue(record.get('fs_code'));
				Ext.getCmp('cboCount').setValue(record.get('fs_count'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nm_code'));
				Ext.getCmp('txtAlamat').setValue(record.get('fs_alamat'));
				Ext.getCmp('cboKota').setValue(record.get('fs_kd_kota'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nm_kota'));
				Ext.getCmp('cboKab').setValue(record.get('fs_kd_kab'));
				Ext.getCmp('txtKab').setValue(record.get('fs_nm_kab'));
				Ext.getCmp('cboProp').setValue(record.get('fs_kd_prop'));
				Ext.getCmp('txtProp').setValue(record.get('fs_nm_prop'));
				Ext.getCmp('cboNeg').setValue(record.get('fs_kd_neg'));
				Ext.getCmp('txtNeg').setValue(record.get('fs_nm_neg'));
				Ext.getCmp('cboWN').setValue(record.get('fs_kd_wn'));
				Ext.getCmp('txtWN').setValue(record.get('fs_nm_wn'));
				Ext.getCmp('txtId').setValue(record.get('fs_kd_id'));
				Ext.getCmp('txtIddt').setValue(record.get('fd_tgl_id'));
				Ext.getCmp('txtTlp').setValue(record.get('fs_tlp'));
				Ext.getCmp('txtTlp2').setValue(record.get('fs_tlp2'));
				
				fnDetil();
				winCari2.hide();
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
				grupKode.load();
				vMask.show();
			}
		}
	});

	var cboCode = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Code',
		id: 'cboCode',
		name: 'cboCode',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('cboCount').setValue('');
				Ext.getCmp('txtNama').setValue('');
				Ext.getCmp('txtAlamat').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			}/*,
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari2.show();
					winCari2.center();
				}
			}*/
		}
	};

	var winGrid3 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupKode,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKode,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Code", dataIndex: 'fs_code', menuDisabled: true, width: 70},
			{text: "Count", dataIndex: 'fs_count', menuDisabled: true, width: 70},
			{text: "Name", dataIndex: 'fs_nm_code', menuDisabled: true, width: 340},
			{text: "Address", dataIndex: 'fs_alamat', menuDisabled: true, hidden: true},
			{text: "City Cd", dataIndex: 'fs_kd_kota', menuDisabled: true, hidden: true},
			{text: "City", dataIndex: 'fs_nm_kota', menuDisabled: true, hidden: true},
			{text: "District Cd", dataIndex: 'fs_kd_kab', menuDisabled: true, hidden: true},
			{text: "District", dataIndex: 'fs_nm_kab', menuDisabled: true, hidden: true},
			{text: "Province Cd", dataIndex: 'fs_kd_prop', menuDisabled: true, hidden: true},
			{text: "Province", dataIndex: 'fs_nm_prop', menuDisabled: true, hidden: true},
			{text: "Country Cd", dataIndex: 'fs_kd_neg', menuDisabled: true, hidden: true},
			{text: "Country", dataIndex: 'fs_nm_neg', menuDisabled: true, hidden: true},
			{text: "Citizen Cd", dataIndex: 'fs_kd_wn', menuDisabled: true, hidden: true},
			{text: "Citizen", dataIndex: 'fs_nm_wn', menuDisabled: true, hidden: true},
			{text: "ID Card", dataIndex: 'fs_kd_id', menuDisabled: true, hidden: true},
			{text: "ID Date", dataIndex: 'fd_tgl_id', menuDisabled: true, hidden: true},
			{text: "Phone 1", dataIndex: 'fs_tlp', menuDisabled: true, hidden: true},
			{text: "Phone 2", dataIndex: 'fs_tlp2', menuDisabled: true, hidden: true}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCode').setValue(record.get('fs_code'));
				Ext.getCmp('cboCount').setValue(record.get('fs_count'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nm_code'));
				Ext.getCmp('txtAlamat').setValue(record.get('fs_alamat'));
				Ext.getCmp('cboKota').setValue(record.get('fs_kd_kota'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nm_kota'));
				Ext.getCmp('cboKab').setValue(record.get('fs_kd_kab'));
				Ext.getCmp('txtKab').setValue(record.get('fs_nm_kab'));
				Ext.getCmp('cboProp').setValue(record.get('fs_kd_prop'));
				Ext.getCmp('txtProp').setValue(record.get('fs_nm_prop'));
				Ext.getCmp('cboNeg').setValue(record.get('fs_kd_neg'));
				Ext.getCmp('txtNeg').setValue(record.get('fs_nm_neg'));
				Ext.getCmp('cboWN').setValue(record.get('fs_kd_wn'));
				Ext.getCmp('txtWN').setValue(record.get('fs_nm_wn'));
				Ext.getCmp('txtId').setValue(record.get('fs_kd_id'));
				Ext.getCmp('txtIddt').setValue(record.get('fd_tgl_id'));
				Ext.getCmp('txtTlp').setValue(record.get('fs_tlp'));
				Ext.getCmp('txtTlp2').setValue(record.get('fs_tlp2'));
				
				fnDetil();
				winCari3.hide();
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
			winGrid3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKode.load();
				vMask.show();
			}
		}
	});

	var cboCount = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Count',
		id: 'cboCount',
		labelWidth: 35,
		name: 'cboCount',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtNama').setValue('');
				Ext.getCmp('txtAlamat').setValue('');
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
					winCari3.show();
					winCari3.center();
				}
			}
		}
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Name',
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};


	var txtNilaiAsuransi = {
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Name',
		hidden:true,
		id: 'txtNilaiAsuransi',
		name: 'txtNilaiAsuransi',
		xtype: 'textfield'
	};

	var txtAtasNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		emptyText: 'Enter a Name',
		fieldLabel: 'A/N',
		id: 'txtAtasNama',
		name: 'txtAtasNama',
		xtype: 'textfield'
	};

	var txtBank = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Bank',
		id: 'txtBank',
		name: 'txtBank',
		xtype: 'textfield'
	};

	var txtAC = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'AC',
		id: 'txtAC',
		name: 'txtAC',
		xtype: 'textfield'
	};


	var txtAlamat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter an Address',
		fieldLabel: 'Address',
		grow: true,
		growMin: 50,
		growMax: 50,
		id: 'txtAlamat',
		name: 'txtAlamat',
		xtype: 'textareafield'
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

	Ext.define('DataGridReg2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek', type: 'bool'},
			{name: 'fs_refnojual', type: 'string'},
			{name: 'fd_refno', type: 'string'},
			{name: 'fs_kd_cust', type: 'string'},
			{name: 'fs_count', type: 'string'},
			{name: 'fs_nm_cust', type: 'string'},
			{name: 'fs_rangka', type: 'string'},
			{name: 'fs_mesin', type: 'string'},
			{name: 'fd_stnk', type: 'date', dateFormat: 'd-m-Y'},
			{name: 'fd_bpkb', type: 'date', dateFormat: 'd-m-Y'},
			{name: 'fs_note', type: 'string'}
		]
	});


	var grupGridReg2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridReg2',
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
			url: 'login/grid_detail2'
		}
	});



	var gridReg2 = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 191,
		sortableColumns: false,
		store: grupGridReg2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridReg2
		}),
		columns: [{
			xtype: 'rownumberer',
			width: 45
		}/*,{
			align: 'center',
			text: 'Add',
			dataIndex: 'fb_cek',
			menuDisabled: true,
			stopSelection: false,
			xtype: 'combobox',
			width: 35
		}*/
		,{
			align: 'center',
			text: 'Add',
			dataIndex: 'fb_cek',
			width: 35,
			editor: new Ext.form.ComboBox({
                displayField: 'name',
                editable: false,
                forceSelection: true,
                mode: 'local',
                store: grupTrx9,
                triggerAction: 'all',
            })
		},{
			text: 'Kode',
			dataIndex: 'fs_nm_cust',
			menuDisabled: true,
			width: 150
		},{
			text: 'Nama Transaksi',
			dataIndex: 'fs_rangka',
			menuDisabled: true,
			width: 150
		},{
			text: 'Nilai Transaksi',
			dataIndex: 'fs_mesin',
			menuDisabled: true,
			width: 155
		},{
			text: 'Ditagih Ke Konsumen',
			dataIndex: 'fs_note',
			menuDisabled: true,
			width: 150
		},
		{
			text: 'Pencairan Ke Dealer',
			dataIndex: 'fs_note',
			menuDisabled: true,
			width: 150
		}],
		plugins: [
			cellEditingReg2
		],
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var grupKota = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_kota','fs_nm_kota'],
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
			url: 'alamat/kodekota'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_kota': Ext.getCmp('cboKota').getValue(),
					'fs_nm_kota': Ext.getCmp('cboKota').getValue()
				});
			}
		}
	});

	var winGrid4 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupKota,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKota,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari4.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "City Code", dataIndex: 'fs_kd_kota', menuDisabled: true, width: 100},
			{text: "City Name", dataIndex: 'fs_nm_kota', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKota').setValue(record.get('fs_kd_kota'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nm_kota'));
				
				winCari4.hide();
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

	var winCari4 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid4
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKota.load();
				vMask.show();
			}
		}
	});

	var cboKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'Select a',
		fieldLabel: 'City',
		id: 'cboKota',
		name: 'cboKota',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtKota').setValue('');
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
					winCari4.show();
					winCari4.center();
				}
			}
		}
	};

	var txtKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'City',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKota',
		name: 'txtKota',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtKotaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kota',
		anchor: '100%',
		labelWidth:130,
		emptyText: 'Masukkan Kota',
		id: 'txtKotaKonsumen',
		name: 'txtKotaKonsumen',
		xtype: 'textfield'
	};

	var txtKodePaket = {
		fieldLabel: 'Kota',
		anchor: '100%',
		hidden:true,
		emptyText: 'Masukkan Kota',
		id: 'txtKodePaket',
		name: 'txtKodePaket',
		xtype: 'textfield'
	};
	
	var txtModelKendaraan = {
		fieldLabel: 'Model Kendaraan',
		anchor: '100%',
		hidden:true,
		emptyText: 'Masukkan Model',
		id: 'txtModelKendaraan',
		name: 'txtModelKendaraan',
		xtype: 'textfield'
	};

	var txtKodeuUsahaKerjaan = {
		anchor: '100%',
		hidden:true,
		id: 'txtKodeuUsahaKerjaan',
		name: 'txtKodeuUsahaKerjaan',
		xtype: 'textfield'
	};

	var txtKodeUsahaPenjamin = {
		anchor: '100%',
		hidden:true,
		id: 'txtKodeUsahaPenjamin',
		name: 'txtKodeUsahaPenjamin',
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



	var txtKodeKendaraan = {
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtKodeKendaraan',
		name: 'txtKodeKendaraan',
		xtype: 'textfield'
	};


	var txtStatusRumah = {
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

	var txtStatusKawin = {
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		hidden:true,
		id: 'txtStatusKawin',
		name: 'txtStatusKawin',
		xtype: 'textfield'
	};


	var txtKodeAgama = {
		fieldLabel: 'Jenis Kendaraan',
		hidden:true,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		id: 'txtKodeAgama',
		name: 'txtKodeAgama',
		xtype: 'textfield'
	};

	var txtKodePendidikan = {
		fieldLabel: 'Jenis Kendaraan',
		hidden:true,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		id: 'txtKodePendidikan',
		name: 'txtKodePendidikan',
		xtype: 'textfield'
	};


	var txtKodeKategoriUsaha = {
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

	var txtWilayahAsuransi = {
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

				var polaTrans = Ext.getCmp('cboPola').getValue();
				var jenispiutangs = Ext.getCmp('cboJenisPiu').getValue();
				var tglapk = Ext.getCmp('txtRefnodt').getValue();
				var jeniss = Ext.getCmp('cboJenis').getValue();

				if (polaTrans.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Pola transaksi masih kosong!',
					title: 'MFAS'
					});


					Ext.getCmp('txtTahun').setValue('0');
					return;


				}
				else if (jenispiutangs.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Piutang masih kosong!',
					title: 'MFAS'
					});
					Ext.getCmp('txtTahun').setValue('0');
					return;
				}
				else if (tglapk == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Tanggal APK masih kosong!',
					title: 'MFAS'
					});
					Ext.getCmp('txtTahun').setValue('0');
					return;
				}
				else if (jeniss == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Konsumen masih kosong!',
					title: 'MFAS'
					});

					Ext.getCmp('txtTahun').setValue('0');
					return;
				}
				else 
				{
				PremiGross();

												      Perluasan();

												      //BiayaTJH();

												    PremiGrossFix();

												    PremiNett();

													angsdimuka();

												     pokokpembiayaan();

												     bunga();

												   

													uangmuka();

												}
			}
		},
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
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

	var txtTeleponIstri = {
		anchor: '130%',
		labelAlign:'right',
		fieldLabel: 'Telepon',
		id: 'txtTeleponIstri',
		name: 'txtTeleponIstri',
		minValue: 0, 
		disabled:true,
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		maxLength : 18,
 		enforceMaxLength : true
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

	/*var txtNoPol = {
		fieldLabel: 'Nomor Polisi',
		anchor: '100%',
		style:'margin-left:180px',
		labelAlign:'right',
		fieldStyle: 'text-transform:uppercase;text-align:center',
		labelWidth:130,
		enforceMaxLength:true,
		maxLength:2,
		id: 'txtNoPol',
		name: 'txtNoPol',
		xtype: 'textfield'
	};*/

	var txtNoPol2 = {
		anchor: '10%',
		enforceMaxLength:true,
		maxLength:4,
		style:'margin-left:-45px',
		id: 'txtNoPol2',
		fieldStyle: 'text-align:center',
		name: 'txtNoPol2',
		hideTrigger:true,
		maskRe:/\d/,
		//disabled:true,
		minValue:0,
		xtype: 'textfield',
	};

	var txtNoPol3 = {
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

	var txtWarna = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Warna',
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		fieldStyle: 'text-transform:uppercase;',
		emptyText: 'Masukkan warna',
		id: 'txtWarna',
		name: 'txtWarna',
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

	var txtBiayaTjH2 = {
		fieldLabel: 'Sales',
		anchor: '80%',
		labelWidth:130,
		hidden:true,
		labelAlign:'right',
		emptyText: 'Masukkan Sales',
		id: 'txtBiayaTjH2',
		name: 'txtBiayaTjH2',
		xtype: 'textfield'
	};

	var txtKodeSupplier1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kode Supplier 1',
		anchor: '60%',
		emptyText: 'Masukkan Kode Supplier 1',
		id: 'txtKodeSupplier1',
		name: 'txtKodeSupplier1',
		xtype: 'textfield'
	};
	var txtKodeSupplier2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kode Supplier 2',
		anchor: '60%',
		emptyText: 'Masukkan Kode Supplier 2',
		id: 'txtKodeSupplier2',
		name: 'txtKodeSupplier2',
		xtype: 'textfield'
	};

	var txtCabangSupplier = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Cabang Supplier',
		anchor: '60%',
		emptyText: 'Masukkan cabang Supplier',
		id: 'txtCabangSupplier',
		name: 'txtKodeSupplier2',
		xtype: 'textfield'
	};

	var grupKab = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_kab','fs_nm_kab'],
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
			url: 'alamat/kodekab'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_kab': Ext.getCmp('cboKab').getValue(),
					'fs_nm_kab': Ext.getCmp('cboKab').getValue()
				});
			}
		}
	});

	var winGrid5 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupKab,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKab,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari5.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "District Code", dataIndex: 'fs_kd_kab', menuDisabled: true, width: 100},
			{text: "District Name", dataIndex: 'fs_nm_kab', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKab').setValue(record.get('fs_kd_kab'));
				Ext.getCmp('txtKab').setValue(record.get('fs_nm_kab'));
				
				winCari5.hide();
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

	var winCari5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid5
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKab.load();
				vMask.show();
			}
		}
	});

	var cboKab = {
		anchor: '98%',
		emptyText: 'Select a',
		fieldLabel: 'District',
		id: 'cboKab',
		name: 'cboKab',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtKab').setValue('');
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
					winCari5.show();
					winCari5.center();
				}
			}
		}
	};

	var txtKab = {
		anchor: '100%',
		emptyText: 'District',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKab',
		name: 'txtKab',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtTjh = {
		anchor: '100%',
		id: 'txtTjh',
		name: 'txtTjh',
		hidden: true,
		xtype: 'textfield'
	};

	var txtTjh2 = {
		anchor: '100%',
		id: 'txtTjh2',
		name: 'txtTjh2',
		hidden: true,
		xtype: 'textfield'
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

	var grupProp = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_prop','fs_nm_prop'],
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
			url: 'alamat/kodeprop'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_prop': Ext.getCmp('cboProp').getValue(),
					'fs_nm_prop': Ext.getCmp('cboProp').getValue()
				});
			}
		}
	});

	var winGrid6 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupProp,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupProp,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari6.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Province Code", dataIndex: 'fs_kd_prop', menuDisabled: true, width: 100},
			{text: "Province Name", dataIndex: 'fs_nm_prop', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboProp').setValue(record.get('fs_kd_prop'));
				Ext.getCmp('txtProp').setValue(record.get('fs_nm_prop'));
				
				winCari6.hide();
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

	var winCari6 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid6
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupProp.load();
				vMask.show();
			}
		}
	});

	var cboProp = {
		anchor: '98%',
		emptyText: 'Select a',
		fieldLabel: 'Province',
		id: 'cboProp',
		name: 'cboProp',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtProp').setValue('');
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
					winCari6.show();
					winCari6.center();
				}
			}
		}
	};

	var txtProp = {
		anchor: '100%',
		emptyText: 'Province',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtProp',
		name: 'txtProp',
		readOnly: true,
		xtype: 'textfield'
	};

	var grupNeg = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_neg','fs_nm_neg'],
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
			url: 'alamat/kodeneg'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_neg': Ext.getCmp('cboNeg').getValue(),
					'fs_nm_neg': Ext.getCmp('cboNeg').getValue()
				});
			}
		}
	});

	var winGrid7 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupNeg,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupNeg,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari7.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Country Code", dataIndex: 'fs_kd_neg', menuDisabled: true, width: 100},
			{text: "Country Name", dataIndex: 'fs_nm_neg', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNeg').setValue(record.get('fs_kd_neg'));
				Ext.getCmp('txtNeg').setValue(record.get('fs_nm_neg'));
				
				winCari7.hide();
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

	var winCari7 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid7
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupNeg.load();
				vMask.show();
			}
		}
	});

	var cboNeg = {
		anchor: '98%',
		emptyText: 'Select a',
		fieldLabel: 'Country',
		id: 'cboNeg',
		name: 'cboNeg',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtNeg').setValue('');
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
					winCari7.show();
					winCari7.center();
				}
			}
		}
	};

	var txtNeg = {
		anchor: '100%',
		emptyText: 'Country',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtNeg',
		name: 'txtNeg',
		readOnly: true,
		xtype: 'textfield'
	};

	var grupWN = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_wn','fs_nm_wn'],
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
			url: 'alamat/kodewn'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_wn': Ext.getCmp('cboWN').getValue(),
					'fs_nm_wn': Ext.getCmp('cboWN').getValue()
				});
			}
		}
	});

	var winGrid8 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupWN,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupWN,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari8.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Citizen Code", dataIndex: 'fs_kd_wn', menuDisabled: true, width: 100},
			{text: "Citizen Name", dataIndex: 'fs_nm_wn', menuDisabled: true, width: 380}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboWN').setValue(record.get('fs_kd_wn'));
				Ext.getCmp('txtWN').setValue(record.get('fs_nm_wn'));
				
				winCari8.hide();
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

	var winCari8 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid8
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupWN.load();
				vMask.show();
			}
		}
	});

	var cboWN = {
		anchor: '98%',
		emptyText: 'Select a',
		fieldLabel: 'Citizen',
		id: 'cboWN',
		name: 'cboWN',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtWN').setValue('');
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
					winCari8.show();
					winCari8.center();
				}
			}
		}
	};

	var txtWN = {
		anchor: '100%',
		emptyText: 'Citizen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtWN',
		name: 'txtWN',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtId = {
		anchor: '98%',
		fieldLabel: 'ID Card',
		id: 'txtId',
		name: 'txtId',
		xtype: 'textfield'
	};

	var txtIddt = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Up to',
		format: 'd-m-Y',
		id: 'txtIddt',
		labelWidth: 40,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		name: 'txtIddt',
		value: new Date(),
		xtype: 'datefield'
	};

	var txtTlp = {
		anchor: '100%',
		fieldLabel: 'Phone 1',
		id: 'txtTlp',
		name: 'txtTlp',
		xtype: 'textfield'
	};

	var txtTlp2 = {
		anchor: '100%',
		fieldLabel: 'Phone 2',
		id: 'txtTlp2',
		name: 'txtTlp2',
		xtype: 'textfield'
	};

	var grupGL = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_acno','fs_nm_acno'],
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
			url: 'alamat/kodegl'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_acno': Ext.getCmp('cboGL').getValue(),
					'fs_nm_acno': Ext.getCmp('cboGL').getValue()
				});
			}
		}
	});

	var winGrid10 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupGL,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGL,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari10.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Code", dataIndex: 'fs_kd_acno', menuDisabled: true, width: 120},
			{text: "Name", dataIndex: 'fs_nm_acno', menuDisabled: true, width: 360}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboGL').setValue(record.get('fs_kd_acno'));
				Ext.getCmp('txtGL').setValue(record.get('fs_nm_acno'));
				
				winCari10.hide();
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

	var winCari10 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid10
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupGL.load();
				vMask.show();
			}
		}
	});

	var cboGL = {
		anchor: '98%',
		emptyText: "Select a",
		fieldLabel: 'GL Acc',
		id: 'cboGL',
		name: 'cboGL',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtGL').setValue('');
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
					winCari10.show();
					winCari10.center();
				}
			}
		}
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

	var txtGL = {
		anchor: '100%',
		emptyText: "GL Acc",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtGL',
		name: 'txtGL',
		readOnly: true,
		xtype: 'textfield'
	};

	var cekSupp = {
		boxLabel: 'Active',
		boxLabelAlign: 'before',
		checked: true,
		hidden: true,
		id: 'cekSupp',
		name: 'cekSupp',
		xtype: 'checkboxfield'
	};

	var grupTipeCust = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fs_kd_tipe','fs_nm_tipe'],
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
			url: 'alamat/kodetipecust'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_tipe': Ext.getCmp('cboTipeCust').getValue(),
					'fs_nm_tipe': Ext.getCmp('txtTipeCust').getValue()
				});
			}
		}
	});

	var winGrid9 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		store: grupTipeCust,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupTipeCust,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari9.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Code", dataIndex: 'fs_kd_tipe', menuDisabled: true, width: 110},
			{text: "Name", dataIndex: 'fs_nm_tipe', menuDisabled: true, width: 370}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboTipeCust').setValue(record.get('fs_kd_tipe'));
				Ext.getCmp('txtTipeCust').setValue(record.get('fs_nm_tipe'));
				
				winCari9.hide();
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

	var winCari9 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid9
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupTipeCust.load();
				vMask.show();
			}
		}
	});

	var cboTipeCust = {
		anchor: '98%',
		emptyText: "Select a",
		fieldLabel: 'Type',
		id: 'cboTipeCust',
		name: 'cboTipeCust',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtTipeCust').setValue('');
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
					winCari9.show();
					winCari9.center();
				}
			}
		}
	};

	var txtTipeCust = {
		anchor: '100%',
		emptyText: "Type",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtTipeCust',
		name: 'txtTipeCust',
		readOnly: true,
		xtype: 'textfield'
	};

	var cekCust = {
		boxLabel: 'Active',
		boxLabelAlign: 'before',
		checked: true,
		hidden: true,
		id: 'cekCust',
		name: 'cekCust',
		xtype: 'checkboxfield'
	};

	function fnReset() {
				 Ext.getCmp('txtRefnodt').setValue('');
				 Ext.getCmp('cboJenis').setValue('');
				 Ext.getCmp('txtLembagaKeuangan1').setValue('');
				 Ext.getCmp('txtLembagaKeuangan2').setValue('');
				 Ext.getCmp('cboJenisPiu').setValue('');
				 Ext.getCmp('cboPola').setValue('');
				 Ext.getCmp('txtKodePaket').setValue('');
				 Ext.getCmp('cboFleet').setValue('');
				 Ext.getCmp('txtNamaKonsumen').setValue('');
				 Ext.getCmp('txtAlamatKonsumen').setValue('');
				 Ext.getCmp('txtKelurahan').setValue('');
				 Ext.getCmp('txtKecamatan').setValue('');
				 Ext.getCmp('txtKodeDati').setValue('');
				 Ext.getCmp('txtKabupatenKota').setValue('');
				 Ext.getCmp('cboKodePos').setValue('');
				 Ext.getCmp('txtNoKtp').setValue('');
				 Ext.getCmp('txtSd').setValue('');
				 Ext.getCmp('txtKartuKeluarga').setValue('');
				 Ext.getCmp('txtTelepon').setValue('');
				 Ext.getCmp('txtHp').setValue('');
				 Ext.getCmp('txtEmail').setValue('');
				 Ext.getCmp('txtNoNpwp').setValue('');
				 Ext.getCmp('txtNoNpwp2').setValue('');
				 Ext.getCmp('txtNoNpwp3').setValue('');
				 Ext.getCmp('txtNoNpwp4').setValue('');
				 Ext.getCmp('txtNoNpwp5').setValue('');
				 Ext.getCmp('txtNoNpwp6').setValue('');
				 Ext.getCmp('txtNamaPerusahaan').setValue('');
				 Ext.getCmp('txtAlamatKonsumen').setValue('');
				 Ext.getCmp('txtTlpperiodsusahaan').setValue('');
				 Ext.getCmp('txtKerjaSejak').setValue('');
				 Ext.getCmp('txtKerjaSejakTahun').setValue('');
				 Ext.getCmp('txtKodeKategoriUsaha').setValue('');
				 Ext.getCmp('txtKeteranganUsaha').setValue('');
				 Ext.getCmp('txtUsahaPekerjaan').setValue('');
				 Ext.getCmp('txtPendapatan').setValue('');
				 Ext.getCmp('cboJenKel').setValue('');
				 Ext.getCmp('txtKodeAgama').setValue('');
				 Ext.getCmp('txtUserPlaceBirth').setValue('');
				 Ext.getCmp('txtUserDatebirth').setValue('');
				 Ext.getCmp('txtKodePendidikan').setValue('');
				 Ext.getCmp('txtBiayaBulan').setValue('');
				 Ext.getCmp('txtIbuKandung').setValue('');
				 Ext.getCmp('cboJenisPiu').setValue('');
				 Ext.getCmp('cboStatusKawin').setValue('');
				 Ext.getCmp('txtTanggungan').setValue('');
				 Ext.getCmp('txtStatusRumah').setValue('');
				 Ext.getCmp('txtTinggalSejak').setValue('');
				 Ext.getCmp('txtTinggalSejakTahun').setValue('');
				 Ext.getCmp('txtAlamatSurat').setValue('');
				 Ext.getCmp('txtKabupatenKotaKonsumen').setValue('');
				 Ext.getCmp('cboKodePos2').setValue('');
				 Ext.getCmp('cboFirstTime').setValue('');
				 Ext.getCmp('txtKe').setValue('');
				 Ext.getCmp('txtModelKendaraan').setValue('');
				 Ext.getCmp('txtJenisKendaraan').setValue('');
				 Ext.getCmp('txtSilinder').setValue('');
				 Ext.getCmp('txtKodeKendaraan').setValue('');
				 Ext.getCmp('txtTahun').setValue('');
				 Ext.getCmp('txtWarna').setValue('');
				 Ext.getCmp('txtNorangka').setValue('');
				 Ext.getCmp('txtNomesin').setValue('');
				 Ext.getCmp('cboKomersil').setValue('');
				 Ext.getCmp('txtNamaBpkb').setValue('');
				 Ext.getCmp('txtAlamatbpkb').setValue('');
				 Ext.getCmp('txtNomorBpkb').setValue('');
				 Ext.getCmp('txtNoPol').setValue('');
				 Ext.getCmp('txtNoPol2').setValue('');
				 Ext.getCmp('txtNoPol3').setValue('');
				 Ext.getCmp('cboKotaBPKB').setValue('');
				 Ext.getCmp('txtNilaiAsuransi').setValue('');
				 Ext.getCmp('txtKodeAsuransi1').setValue('');
				 Ext.getCmp('txtKodeAsuransi2').setValue('');
				 Ext.getCmp('txtSales').setValue('');
				 Ext.getCmp('txtKodeDealer1').setValue('');
				 Ext.getCmp('txtKodeDealer2').setValue('');
				 Ext.getCmp('txtCabangDealer').setValue('');
				 Ext.getCmp('cboPolaAngs').setValue('');
				 Ext.getCmp('cboCaraBayar').setValue('');
				 Ext.getCmp('cboDimuka').setValue('');
				 Ext.getCmp('txtDimukaKali').setValue('');
				 Ext.getCmp('txtAngsuranDimuka').setValue('');
				 Ext.getCmp('txtTotalDp').setValue('');
				 Ext.getCmp('cboAngsuranDibayarDealer').setValue('');
				 Ext.getCmp('txtBiayaAdm').setValue('');
				 Ext.getCmp('txtPremiGros').setValue('');
				 Ext.getCmp('txtPremiGrosFix').setValue('');
				 Ext.getCmp('txtPerluasan').setValue('');
				 Ext.getCmp('txtBiayaTjH').setValue('');
				 Ext.getCmp('txtPremiNet').setValue('');
				 Ext.getCmp('txtHargaOTR').setValue('');
				 Ext.getCmp('txtUangMukaDealerp').setValue('');
				 Ext.getCmp('txtAsuransiDealer').setValue('');
				 Ext.getCmp('txtBungaFlat').setValue('');
				 Ext.getCmp('txtBungaFlatDealer').setValue('');
				 Ext.getCmp('txtBungaDealer').setValue('');
				 Ext.getCmp('txtAngsuranBulanDealer').setValue('');
				 Ext.getCmp('txtUangMukaKonsumenp').setValue('');
				 Ext.getCmp('txtAsuransiKonsumen').setValue('');
				 Ext.getCmp('txtBungaFlat3').setValue('');
				 Ext.getCmp('txtBungaFlat4').setValue('');
				 Ext.getCmp('txtTenor').setValue('');
				 Ext.getCmp('txtBungaKonsumen').setValue('');
				 Ext.getCmp('txtAngsuranBulanKonsumen').setValue('');
				 Ext.getCmp('txtNamaIstri').setValue('');
				 Ext.getCmp('txtTeleponSuamiIstri').setValue('');
				 Ext.getCmp('txtKodeuUsahaKerjaan').setValue('');
				 Ext.getCmp('txtNoPol2').setValue('');
				 Ext.getCmp('txtAlamatUsahaSuamiIstri').setValue('');
				 Ext.getCmp('txtTeleponIstri').setValue('');
				 Ext.getCmp('txtPendapatanSuamiIstri').setValue('');
				 Ext.getCmp('txtNamaPenjamin').setValue('');
				 Ext.getCmp('txtAlamatPenjamin').setValue('');
				 Ext.getCmp('txtKabupatenKotaPenjamin').setValue('');
				 Ext.getCmp('cboKodePosPenjamin').setValue('');
				 Ext.getCmp('txtTeleponPenjamin').setValue('');
				 Ext.getCmp('txtKodeUsahaPenjamin').setValue('');
				 Ext.getCmp('txtKeteranganUsahaPenjamin').setValue('');
				 Ext.getCmp('txtAlamatUsahaPenjamin').setValue('');
				 Ext.getCmp('txtTeleponPenjamin').setValue('');
				 Ext.getCmp('txtPendapatanPenjamin').setValue('');
				 Ext.getCmp('txtStatusPenjamin').setValue('');
				 Ext.getCmp('txtTanggalAngs1').gsetValue('');
				 Ext.getCmp('txtTanggalAngsBln').setValue('');
				 Ext.getCmp('cboPencairanKe').setValue('');
				 Ext.getCmp('cboUangMuka').setValue('');
				 Ext.getCmp('cboDeposit').setValue('');
				 Ext.getCmp('txtRekeningCair').setValue('');
				 Ext.getCmp('txtNamaBank').setValue('');
				 Ext.getCmp('txtNoRekCair').setValue('');
				 Ext.getCmp('txtNilaiCair3').setValue('');
		
	}

	var cboTrs = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '65.3%',
		displayField: 'fs_nm_strx',
		valueField: 'fs_kd_strx',
		editable: false,
		emptyText: 'Select a Trans Type',
		fieldLabel: 'Trans Type',
		id: 'cboTrs',
		name: 'cboTrs',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
	};

	var cboRefno = {
		anchor: '40%',
		emptyText: 'AUTOMATIC',
		fieldLabel: 'Ref. No',
		id: 'cboRefno',
		name: 'cboRefno',
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
					winCari.show();
					winCari.center();
				}
			}
		}
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
		xtype: 'datefield'
	};

	var txtTanggal = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal',
		submitFormat:'Y-m-d',
		format: 'd-m-Y',
		id: 'txtTanggal',
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -1000),
		name: 'txtTanggal',
		value: new Date(),
		xtype: 'datefield'
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
		minValue: Ext.Date.getFirstDateOfMonth(new Date()),
		name: 'txtTglCair',
		xtype: 'datefield'
	};

	var txtTanggalAngsBln = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35%',
		submitFormat:'Y-m-d',
		minValue:0,
		value:0,
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
		xtype: 'datefield'
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
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -100),
		name: 'txtUserDatebirth',
		xtype: 'datefield'
	};

	var grupTrx4 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_pendidikan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx5 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_status_rumah'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx6 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_status_kawin'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx7 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_kondisi_lingkungan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx8 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_kondisi_kantor'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx9 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_kategori_perusahaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx10 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_garasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var grupTrx11 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_first_time'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
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

	var grupTrx17 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_dimukakali'
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


	var grupTrx19 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_angdiluar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
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

	var grupTrx23 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_jenisasuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});



	var winz = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: false,
		frame: false,
		height: 450,
		layout: 'fit',
		minHeight: 580,
		maxHeight: 580,
		minWidth: 990,
		maxWidth: 990,
		title: 'MFAS',
		width: 500,
		items: [{ 
              //gridProd, {xtype: 'splitter'},
        }],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				vMask.show();
			}
		},
		buttons: [{
			text: 'Cancel',
			handler: function() {
				vMask.hide();
				winz.hide();
			}
		}]
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
	

	var grupTrx25 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_pola'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
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
		//disabled:true,
		id: 'cboNopol',
		name: 'cboNopol',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari80').setValue('');
				Ext.getCmp('txtWilayahAsuransi').setValue('');

													   PremiGross();

												      Perluasan();

												      //BiayaTJH();

												    PremiGrossFix();

												    PremiNett();

													angsdimuka();

												     pokokpembiayaan();

												     bunga();

												   

													uangmuka();
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

	var cboPendidikan = {
		editable:false,
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


	
	var cboStatusKawin = {
		editable:false,
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
					winCariStatusKonsumen.show();
					winCariStatusKonsumen.center();
				}
			}
		}
	};
	
	var cboStatusRumah= {
		editable:false,
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
	
	var cboKondisiLingkungan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35.3%',
		displayField: 'fs_nm_strx',
		editable: false,
		emptyText: 'Select Kondisi Lingkungan',
		fieldLabel: 'Kondisi Lingkungan',
		id: 'cboKondisiLingkungan',
		name: 'cboKondisiLingkungan',
		store: grupTrx7,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};

	var cboKategoriPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35.3%',
		displayField: 'fs_nm_strx',
		editable: false,
		emptyText: 'Select Kategori Perusahaan',
		fieldLabel: 'Kategori Perusahaan',
		id: 'cboKategoriPerusahaan',
		name: 'cboKategoriPerusahaan',
		store: grupTrx9,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};

	var cboKondisiKantor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '35.3%',
		displayField: 'fs_nm_strx',
		editable: false,
		emptyText: 'Select Kondisi Kantor',
		fieldLabel: 'Kondisi Kantor',
		id: 'cboKondisiKantor',
		name: 'cboKondisiKantor',
		store: grupTrx8,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
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

				var polaTrans = Ext.getCmp('cboPola').getValue();
				var jenispiutangs = Ext.getCmp('cboJenisPiu').getValue();
				var tglapk = Ext.getCmp('txtRefnodt').getValue();
				var jeniss = Ext.getCmp('cboJenis').getValue();


				if (polaTrans.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Pola transaksi masih kosong!',
					title: 'MFAS'
					});


					Ext.getCmp('cboKomersil').setValue('');
					return;


				}
				else if (jenispiutangs.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Piutang masih kosong!',
					title: 'MFAS'
					});
					Ext.getCmp('cboKomersil').setValue('');
					return;
				}
				else if (tglapk == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Tanggal APK masih kosong!',
					title: 'MFAS'
					});
					Ext.getCmp('cboKomersil').setValue('');
					return;
				}
				else if (jeniss == null) {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Jenis Konsumen masih kosong!',
					title: 'MFAS'
					});
					Ext.getCmp('cboKomersil').setValue('');
					return;
				}
				else 
				{

				}
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

					var a = Ext.getCmp('txtAngsuran').getValue();

					Ext.getCmp('txtAngsuranDimuka').setValue(a);

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

	var cboAngsuranDibayarDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		fieldLabel: 'Angs Dibayar Dealer',
		value:'YA',
		valueField:'Y',
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

	var btnDetailTrans = {
		xtype: 'button',
		text : 'My Button'
	};

	var cboAngdiluar = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '20.3%',
		labelWidth:140,
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Ang Dbyr Dlr',
		id: 'cboAngdiluar',
		name: 'cboAngdiluar',
		store: grupTrx19,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
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
		    		 //PremiGrossFix();
		    		 //Ext.getCmp('txtPremiGrosFix').setValue('0');
		    		  var tjh =  Ext.getCmp('txtBiayaTjH2').getValue();
		    		 var perluasan =  Ext.getCmp('txtPerluasan').getValue();
		    		 var premi =  Ext.getCmp('txtPremiGros').getValue();
		    		var fix = parseInt(premi) + parseInt(perluasan) + parseInt(tjh) + 25000;
					 //var premi = Ext.getCmp('txtPremiGrosFix').getValue();
					 var total = fix;
													
													 Ext.getCmp('txtPremiGrosFix').setValue(total);
													 Ext.getCmp('txtBiayaTjH').setValue(tjh);

							var dp = Ext.getCmp('txtTotalDp').getValue();
							var admin = Ext.getCmp('txtBiayaAdm').getValue();
							var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
							var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
							
							
							var xtotal = dp - admin - total - dimuka - totaltrans;
							document.getElementById('total_trx').value=0;
							if (xtotal > 0) {
					    	Ext.getCmp('txtUangMuka').setValue(xtotal);
					    	//Ext.getCmp('txtUangMuka2').setValue(xtotal);
							Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
							Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);
							}
							else {
								xtotals =  xtotal *(-1);		
							Ext.getCmp('txtUangMuka').setValue(xtotals);
							//Ext.getCmp('txtUangMuka2').setValue(xtotals);
							Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
							Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);
							}

							var combo1 = Ext.ComponentQuery.query('#txtBiayaTjH')[0];

							combo1.setDisabled(false);
		    	}

		    	else {
		    		
		    		var tjh2 = 0;
		    		// PremiGrossFix();
		    		 var tjh =  Ext.getCmp('txtBiayaTjH').getValue();
		    		 //alert(tjh);
		    		 var perluasan =  Ext.getCmp('txtPerluasan').getValue();
		    		 var premi =  Ext.getCmp('txtPremiGros').getValue();
		    		 var fix = parseInt(premi) + parseInt(perluasan) + parseInt(tjh2) + 25000;
					 //var premi = Ext.getCmp('txtPremiGrosFix').getValue();
					 var total = fix;

					  Ext.getCmp('txtPremiGrosFix').setValue(total);
		    		  Ext.getCmp('txtBiayaTjH').setValue(tjh2);
		    		  var totaltrans = Ext.getCmp('txtTotalTrans').getValue();

		    		 		 var dp = Ext.getCmp('txtTotalDp').getValue();
							var admin = Ext.getCmp('txtBiayaAdm').getValue();
							var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
							document.getElementById('total_trx').value=0;
							
							var xtotal = dp - admin - total - dimuka - totaltrans;

							if (xtotal > 0) {
					    	Ext.getCmp('txtUangMuka').setValue(xtotal);
					    	//Ext.getCmp('txtUangMuka2').setValue(xtotal);
							Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
							Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);
							}
							else {
								xtotals =  xtotal *(-1);		
							Ext.getCmp('txtUangMuka').setValue(xtotals);
							//Ext.getCmp('txtUangMuka2').setValue(xtotal);
							Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
							Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);
							}

							var combo1 = Ext.ComponentQuery.query('#txtBiayaTjH')[0];

							combo1.setDisabled(true);

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

	var cboDimukaKali = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'right',
		editable: false,
		fieldLabel: 'Kali',
		id: 'cboDimukaKali',
		name: 'cboDimukaKali',
		store: grupTrx17,
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
			}
		}
	};

	var cboSamaKontrak = {
		afterLabelTextTpl: required,
		allowBlank: false,
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


	var cboGarasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		displayField: 'fs_nm_strx',
		editable: false,
		emptyText: 'Select',
		fieldLabel: 'Rumah Memiliki Garasi',
		id: 'cboGarasi',
		name: 'cboGarasi',
		store: grupTrx10,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				
			}
		}
	};

	

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Name',
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	/*var txtBiayaBulan = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		emptyText: 'Masukkan Biaya per Bulan',
		fieldLabel: 'Biaya/Bulan',
		id: 'txtBiayaBulan',
		name: 'txtBiayaBulan',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 18,
 		enforceMaxLength : true
	};
	*/

	var txtKerjaSejak = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Kerja Sejak',
		id: 'txtKerjaSejak',
		name: 'txtKerjaSejak',
		emptyText: '31',
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
		allowBlank: false,
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

	var txtTinggalSejak = {
		afterLabelTextTpl: required,
		allowBlank: false,
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

	var txtTinggalSejakTahun = {
		afterLabelTextTpl: required,
		allowBlank: false,
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
 		maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		hideTrigger: true
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
		disabled:true,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
	};

	var txtTeleponUsahaPenjamin = {
		anchor: '150%',
		labelWidth:130,
		disabled:true,
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
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
	};


	var txtStatusPenjamin = {
		anchor: '70%',
		labelAlign:'right',
		labelWidth:130,
		enforceMaxLength:true,
		disabled:true,
		maxLength:20,
		emptyText: 'Masukkan Status',
		fieldLabel: 'Status Penjamin',
		id: 'txtStatusPenjamin',
		name: 'txtStatusPenjamin',
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
 		maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		hideTrigger: true
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

	var txtPager = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtPager',
		name: 'txtPager',
		xtype: 'textfield'
	};

	var txtTes = {
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes',
		name: 'txtTes',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes2 = {
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes2',
		name: 'txtTes2',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes4 = {
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes4',
		name: 'txtTes4',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes5 = {
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes5',
		name: 'txtTes5',
		xtype: 'textfield',
		hidden:true
	};

	var txtTes6 = {
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes6',
		name: 'txtTes6',
		xtype: 'textfield',
		hidden:true,
	};

	var txtTes3 = {
		anchor: '100%',
		emptyText: 'Masukkan Email',
		fieldLabel: 'Email',
		id: 'txtTes3',
		name: 'txtTes3',
		xtype: 'textfield',
		hidden:true
	};


	var txtNoNpwp = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'No NPWP',
		id: 'txtNoNpwp',
		name: 'txtNoNpwp',
		minValue: 0,
		maxLength:20,
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

             if(gff==3 && q!='donessss') {
            	newValue = newValue + '.';
            	Ext.getCmp('txtTes5').setValue('donessss');
            	field.setRawValue(newValue);
            }

            
        }
  		 },
	};

	var txtNoNpwp2 = {
		anchor: '100%',
		fieldLabel: ' ',
		fieldStyle: "text-align:center",
		labelWidth:0,
		//style:'margin-left:-20px',
		id: 'txtNoNpwp2',
		name: 'txtNoNpwp2',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 3,
 		enforceMaxLength : true
	};

	var txtNoNpwp3 = {
		anchor: '100%',
		fieldStyle: "text-align:center",
		fieldLabel: ' ',
		labelWidth:0,
		//style:'margin-left:-20px',
		id: 'txtNoNpwp3',
		name: 'txtNoNpwp3',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 3,
 		enforceMaxLength : true
	};

	var txtNoNpwp4 = {
		anchor: '100%',
		fieldLabel: ' ',
		fieldStyle: "text-align:center",
		labelWidth:0,
		//style:'margin-left:-20px',
		id: 'txtNoNpwp4',
		name: 'txtNoNpwp4',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 1,
 		enforceMaxLength : true
	};

	var txtNoNpwp5 = {
		anchor: '100%',
		fieldLabel: ' ',
		labelWidth:0,
		//style:'margin-left:-20px',
		id: 'txtNoNpwp5',
		name: 'txtNoNpwp5',
		minValue: 0,
		fieldStyle: "text-align:center", 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 3,
 		enforceMaxLength : true
	};

	var txtNoNpwp6 = {
		fieldStyle: "text-align:center",
		anchor: '100%',
		fieldLabel: ' ',
		labelWidth:0,
		//style:'margin-left:-20px',
		id: 'txtNoNpwp6',
		name: 'txtNoNpwp6',
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
		xtype: 'numberfield',
		maxLength : 3,
 		enforceMaxLength : true
	};



	var txtNamaWiras = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Nama',
		id: 'txtNamaWiras',
		name: 'txtNamaWiras',
		xtype: 'textfield'
	};

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

	/*var txtNamaPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Enter a Name',
		fieldLabel: 'Nama Perusahaan',
		id: 'txtNamaPerusahaan',
		name: 'txtNamaPerusahaan',
		xtype: 'textfield'
	};*/

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

	var txtTeleponSuamiIstri = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		fieldLabel: 'Telepon',
		id: 'txtTeleponSuamiIstri',
		name: 'txtTeleponSuamiIstri',
		xtype: 'textfield'
	};

	var txtTeleponPenjamin = {
		anchor: '130%',
		labelAlign:'right',
		fieldLabel: 'Telepon',
		id: 'txtTeleponPenjamin',
		name: 'txtTeleponPenjamin',
		disabled:true,
		minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		maxLength : 18,
 		enforceMaxLength : true
	};



	var txtNamaIstri = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		disabled:true,
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
		disabled:true,
		emptyText: 'Masukkan Nama Penjamin',
		fieldLabel: 'Nama',
		id: 'txtNamaPenjamin',
		name: 'txtNamaPenjamin',
		xtype: 'textfield'
	};

	var txtMil = {
		html: 'MIL',
		height: 22,
		width:24,
   		padding: 0,
	};

	var txtpersen1 = {
		html: '%/',
		height: 22,
		width:24,
   		padding: 0,
	};

	var txtpersen2 = {
		html: '%',
		height: 22,
		width:24,
   		padding: 0,
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

	var txtNilaiCair = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
     	anchor: '80%',
     	emptyText: ' ',
     	fieldLabel:'NILAI CAIR : Rp.  ',
     	labelStyle:'font-weight:bold;margin-left:40px;font-size:20px',
     	fieldStyle: 'font-size:23px;color:#FF0000',
     	id: 'txtNilaiCair',	
		name: 'txtNilaiCair',
		value: 0,
   		padding: 0,
   		labelWidth:280,
   		labelCls: 'biggertext',
   		xtype: 'displayfield',
	};

	var txtNilaiCair2 = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
		html: '<h1><font style="color:black">Selisih Total DP : </font></h1>',
		htmlAlign:'right',
		height: 35,
		width:280,
   		padding: 0,
	};


	var txtSelisihDp = {
		border:false,
      	bodyBorder:false,
     	hideBorders:true,
		html: '<h3><font style="color:black">Selisih Total DP :</font> <font style="color:red">Rp. <input type="text" id="total_trx" name="total_trx" readonly></font></h3>',
		htmlAlign:'right',
		height: 20,
		width:450,
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

	var txtJmlKendaraan = {
		afterLabelTextTpl: required,
		anchor: '100%',
		emptyText: 'Masukkan Pendapatan',
		fieldLabel: 'Jml Kend Yg Dimiliki',
		id: 'txtJmlKendaraan',
		name: 'txtJmlKendaraan',
		value: 1,
        stepValue: 1000,
		xtype: 'numberfield'
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

	var txtDimukaKali = {
		afterLabelTextTpl: required,
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		fieldLabel: 'Kali',
		disabled:true,
		id: 'txtDimukaKali',
		name: 'txtDimukaKali',
		value: 0,
		readOnly:true,
		xtype: 'textfield',
		listeners: {
												    'change': function(field,newValue){
												    angsdimuka();

												     pokokpembiayaan();

												     bunga();

												      PremiGross();

												      Perluasan();

												      //BiayaTJH();

												    PremiNett();

												     uangmuka();
												   		 }
													 }
	};

	

	/*var txtBiayaAdm = {
		afterLabelTextTpl: required,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Biaya Administrasi',
		id: 'txtBiayaAdm',
		name: 'txtBiayaAdm',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/


	var txtBiayaFidusia = {
		afterLabelTextTpl: required,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Biaya Fidusia',
		id: 'txtBiayaFidusia',
		name: 'txtBiayaFidusia',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
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

	/*var txtPremiGros = {
		afterLabelTextTpl: required,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Premi Ass Gross',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		id: 'txtPremiGros',
		name: 'txtPremiGros',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	/*var txtPremiNet = {
		afterLabelTextTpl: required,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		style:'margin-top:10px',
		fieldLabel: 'Premi Ass Net',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		id: 'txtPremiNet',
		name: 'txtPremiNet',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	/*var txtAngsuranDimuka = {
		afterLabelTextTpl: required,
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Angsuran Dimuka',
		readOnly:true,
		id: 'txtAngsuranDimuka',
		name: 'txtAngsuranDimuka',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	var txtPremiNetto = {
		afterLabelTextTpl: required,
		anchor: '30%',
		labelWidth:140,
		fieldLabel: 'Premi As. Netto',
		id: 'txtPremiNetto',
		name: 'txtPremiNetto',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtDendaHari = {
		afterLabelTextTpl: required,
		anchor: '10%',
		labelWidth:140,
		fieldLabel: 'Denda/Hari',
		id: 'txtDendaHari',
		name: 'txtDendaHari',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};


	/*var txtHargaOTR = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		fieldLabel: 'Harga OTR',
		id: 'txtHargaOTR',
		name: 'txtHargaOTR',
		value: 0,
        listeners: {
	    'change': function(field,newValue){
	      //alert(newValue);
	     Ext.getCmp('txtHargaOTRdealer').setValue(newValue);
	     Ext.getCmp('txtHargaOTRkonsumen').setValue(newValue);
	   		 }
		 }
	};*/

	/*var txtHargaOTRdealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		style:'margin-top:10px',
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: 'Harga OTR',
		readOnly:true,
		id: 'txtHargaOTRdealer',
		name: 'txtHargaOTRdealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtHargaOTRkonsumen = {
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		style:'margin-top:10px',
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtHargaOTRkonsumen',
		name: 'txtHargaOTRkonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

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
												  	var otrs = Ext.getCmp('txtHargaOTR').getValue();

												  	var models = Ext.getCmp('cboModelKendaraan').getValue();

												  	var tahuns = Ext.getCmp('txtTahun').getValue();
																									  	
													var komersils = Ext.getCmp('cboKomersil').getValue();


													var jenis_asuransis = Ext.getCmp('cboAsuransi').getValue();

													var dealers = Ext.getCmp('cboDealer').getValue();
													
													var nopols='';										  	


													var nopolss= Ext.getCmp('cboNopol').getValue();	



													var kondisi = Ext.getCmp('txtPolaa').getValue();
													var n = kondisi.length;
													if(n==2){

													var kondisifix = kondisi.substring(1, 2);

														if(kondisifix=='U'){

															var nopols = true;

														}
													}
													else {

															var nopols = false;
													}
												  	//var nopols = Ext.getCmp('cboNopol').getValue();

												  	if(nopols==true){


												  	if (otrs < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Harga Otr masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtTenor').setValue('0');

														return;


													}
													else if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (nopolss.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Kode Wilayah Polisi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else 
														{
														      
														    LuxTax();

														    Ext.getCmp('txtTenor2').setValue(newValue);

															Ext.getCmp('txtTenor3').setValue(newValue);	

															Ext.getCmp('txtTenor4').setValue(newValue);	

															Ext.getCmp('txtTenor5').setValue(newValue);	

															PremiGross();


															Perluasan();

															BiayaTJH();

															

															PremiNett();

														}

												  	}else {

												  	if (otrs < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Harga Otr masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtTenor').setValue('0');

														return;


													}
													else if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTenor').setValue('0');

																		return;
														}
													else {
														      
														    LuxTax();

														    Ext.getCmp('txtTenor2').setValue(newValue);

															Ext.getCmp('txtTenor3').setValue(newValue);	

															Ext.getCmp('txtTenor4').setValue(newValue);	

															Ext.getCmp('txtTenor5').setValue(newValue);	

															PremiGross();


															Perluasan();

															BiayaTJH();

															

															PremiNett();

														}



												  	}
													


												   		 }
													 }
	};

	/*var txtAsuransiDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: 'Asuransi',
		readOnly:true,
		id: 'txtAsuransiDealer',
		name: 'txtAsuransiDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	/*var txtPokokPembiayaanDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'right',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: 'Pokok Pembiayaan',
		readOnly:true,
		id: 'txtPokokPembiayaanDealer',
		name: 'txtPokokPembiayaanDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	var txtJumlahPembiayaanDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Jumlah Pembiayaan',
		id: 'txtJumlahPembiayaanDealer',
		name: 'txtJumlahPembiayaanDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	/*var txtBungaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;",
		fieldLabel: 'Bunga',
		id: 'txtBungaDealer',
		name: 'txtBungaDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	var txtNilaiKontrakDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Nilai Kontrak',
		id: 'txtNilaiKontrakDealer',
		name: 'txtNilaiKontrakDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtLembagaKeuangan2 = {
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
		anchor: '90%',
		hidden:true,
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Nilai Kontrak',
		id: 'txtLembagaKeuangan1',
		name: 'txtLembagaKeuangan1',
        xtype: 'textfield',
	};

	/*var txtAngsuranBulanDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		fieldLabel: 'Angsuran / Bulan',
		id: 'txtAngsuranBulanDealer',
		name: 'txtAngsuranBulanDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	/*var txtPiutangDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '190%',
		labelAlign:'right',
		labelWidth:140,
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		fieldLabel: 'Piutang Pembiayaan',
		id: 'txtPiutangDealer',
		name: 'txtPiutangDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	/*var txtAngsuran = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'right',
		fieldLabel: 'Angsuran',
		id: 'txtAngsuran',
		name: 'txtAngsuran',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	var txtAngsuranTdkSamaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '90%',
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Angsuran Tidak Sama',
		id: 'txtAngsuranTdkSamaDealer',
		name: 'txtAngsuranTdkSamaDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
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

	var txtMasaAngsDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldStyle: "text-align:right;",
		labelWidth:240,
		fieldLabel: 'Masa Angsuran (Bln/kali)',
		id: 'txtMasaAngsDealer',
		name: 'txtMasaAngsDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	/*var txtTotalDp = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		allowDecimals: true,
		labelWidth:130,
		fieldLabel: 'Total DP',
		id: 'txtTotalDp',
		name: 'txtTotalDp',
		xtype: 'numberfield',
		value: 0,
		enforceMaxLength:true,
		maxLength:15,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	/*var txtUangMuka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		allowDecimals: true,
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Uang Muka',
		style : "margin-top:10px",
		id: 'txtUangMuka',
		name: 'txtUangMuka',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

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

	/*var txtUangMukaDealerp = {
		anchor: '215%',
		allowDecimals: true,
		fieldLabel: ' ',
		id: 'txtUangMukaDealerp',
		name: 'txtUangMukaDealerp',
		style:'margin-left:10px',
		labelWidth:0,
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtUangMukaKonsumenp = {
		anchor: '215%',
		labelWidth:0,
		allowDecimals: true,
		fieldLabel: ' ',
		id: 'txtUangMukaKonsumenp',
		name: 'txtUangMukaKonsumenp',
		style:'margin-left:146px',
		fieldStyle: 'background-color: #eee; background-image: none;text-align:right;',
		readOnly:true,
		//style:'margin-left:-120px',
		xtype: 'numberfield',
		value: 0,
		hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/


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

	var txtKeteranganUsahaIstri = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		disabled:true,
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
		disabled:true,
		emptyText: 'Masukkan Keterangan usaha',
		fieldLabel: 'Ket. Usaha',
		id: 'txtKeteranganUsahaPenjamin',
		name: 'txtKeteranganUsahaPenjamin',
		xtype: 'textfield'
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

	var txtRefundDealer = {
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		hidden:true,
		id: 'txtRefundDealer',
		name: 'txtRefundDealer',
		xtype: 'textfield'
	};

	var txtKodeCabangDealer = {
		anchor: '80%',
		labelWidth:130,
		labelAlign:'right',
		hidden:true,
		id: 'txtKodeCabangDealer',
		name: 'txtKodeCabangDealer',
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
	     Ext.getCmp('txtAlamatIstri').setValue(newValue);
	   		 }
		 }
	};

	var txtAlamatUsahaSuamiIstri = {
		anchor: '100%',
		labelWidth:130,
		disabled:true,
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
		disabled:true,
		labelAlign:'left',
		emptyText: 'Masukkan Alamat Usaha',
		fieldLabel: 'Alamat Usaha',
		id: 'txtAlamatUsahaPenjamin',
		name: 'txtAlamatUsahaPenjamin',
		xtype: 'textfield'
	};

	var txtAlamtSuamiIstri = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		emptyText: 'Masukkan Alamat',
		fieldLabel: 'Alamat',
		id: 'txtAlamtSuamiIstri',
		name: 'txtAlamtSuamiIstri',
		xtype: 'textfield'
	};


	var txtAlamatPenjamin = {
		anchor: '100%',
		labelAlign:'left',
		labelWidth:130,
		disabled:true,
		emptyText: 'Masukkan Alamat',
		fieldLabel: 'Alamat',
		id: 'txtAlamatPenjamin',
		name: 'txtAlamatPenjamin',
		xtype: 'textfield'
	};


	var txtAlamatIstri = {
		anchor: '100%',
		labelWidth:130,
		labelAlign:'left',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly:true,
		disabled:true,
		rows: '1',
		fieldLabel: 'Alamat',
		id: 'txtAlamatIstri',
		name: 'txtAlamatIstri',
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



	var txtTlpperiodsusahaan = {
		anchor: '195%',
		labelAlign:'left',
		labelWidth:130,
		emptyText: 'Masukkan Telepon',
		fieldLabel: 'No Telepon',
		id: 'txtTlpperiodsusahaan',
		name: 'txtTlpperiodsusahaan',
		maxLength : 15,
 		enforceMaxLength : true,
 		maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
		hideTrigger: true
	};


	var txtAlamatWiras = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Masukkan Alamat',
		fieldLabel: 'Alamat',
		id: 'txtAlamatWiras',
		name: 'txtAlamatWiras',
		xtype: 'textarea'
	};

	var cboKabupatens = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: "Cari Kabupaten",
		fieldLabel: 'Kab',
		id: 'cboKabupatens',
		name: 'cboKabupatens',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtTipe').setValue('');
				Ext.getCmp('cboCode').setValue('');
				Ext.getCmp('cboCount').setValue('');
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
					winCariKab.show();
					winCariKab.center();
				}
			}
		}
	};

	var cboKotaWiras = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '40%',
		emptyText: "Cari Kota",
		fieldLabel: 'Kota',
		id: 'cboKotaWiras',
		name: 'cboKotaWiras',
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
					winCariKota.show();
					winCariKota.center();
				}
			}
		}
	};

	var cboJenis = {
		editable:false,
		afterLabelTextTpl: required,
		allowBlank: false,
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

	var cboFleet = {
		editable:false,
		allowBlank: false,
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

	var cboKategoriUsaha = {
		editable:false,
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

	var cboAsuransi = {
		editable:false,
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

													
					//BiayaTJH();
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');

					grupAsuransiMix.removeAll();
					gridAsuransi.getView().refresh();
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

	var cboSkalaPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		editable:false,
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

	var cboLembagaPembiayaan = {
		editable:false,
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


	var cboKodePos = {
		editable:false,
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

	var cboKodePosIstri = {
		fieldStyle: 'background-color: #eee; background-image: none;',
		anchor: '150%',
		labelAlign:'left',
		labelWidth:130,
		readOnly:true,
		disabled:true,
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

	var cboKodePosPenjamin = {
		anchor: '120%',
		labelAlign:'left',
		labelWidth:130,
		disabled:true,
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


	var cboKodePos2 = {
		editable:false,
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

	var cboJenisKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: "Select Jenis Kendaraan",
		fieldLabel: 'Jenis Kendaraan',
		id: 'cboJenisKendaraan',
		name: 'cboJenisKendaraan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtTipe').setValue('');
				Ext.getCmp('cboCode').setValue('');
				Ext.getCmp('cboCount').setValue('');
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
					winCariJenisKendaraan.show();
					winCariJenisKendaraan.center();
				}
			}
		}
	};

	var cboModelKendaraan = {
		style:'margin-top:10px',
		editable:false,
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

				 PremiGross();

												    Perluasan();

												    //BiayaTJH();

												    PremiNett();

												    var newValue = Ext.getCmp('txtUangMuka').getValue();

												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenp').setValue(total);
													Ext.getCmp('txtUangMukaDealerp').setValue(total);


													var uangmukax = Ext.getCmp('txtUangMuka2').getValue();
													
													var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
													var totalDP = Ext.getCmp('txtTotalDp').getValue();
													var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
													var premigross = Ext.getCmp('txtPremiGros').getValue();
													var preminet = Ext.getCmp('txtPremiNet').getValue();
													var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
													//var uangmuka = Ext.getCmp('txtUangMuka').getValue();
													//var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
													var grosfix = Ext.getCmp('txtPremiGrosFix').getValue();

													//alert(totaltrans);
													var hasil = totalDP - biayaadmin - grosfix- dimuka - totaltrans - total;
													var hasil2 = totalDP - biayaadmin - grosfix - dimuka - totaltrans;
													function format1(n) {
											 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
													}
													var fix = format1(hasil);
													var fix2 = format1(hasil2);
													
													if(total>=uangmukax){

														if(fix>0){
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

														 //document.getElementById("total_trx").value=fix;
														}

														else {
															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fixed2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fixed2);
															var fixed = fix;
														 
															//document.getElementById("total_trx").value=fix;
														}

													}
													else {

														if(fix>0){

															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

															//document.getElementById("total_trx").value=fix;
														}

														else {


															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);
															var fixed = fix;
														 
															//document.getElementById("total_trx").value=fix;
														}
														
													}

												    pokokpembiayaan();
												    bunga();
												    bungaFlat();

													var totalDP2 = Ext.getCmp('txtTotalDp').getValue();
													var totaltranscair2 = Ext.getCmp('txtTotalTrans2').getValue();
															var biayaadmin2 = Ext.getCmp('txtBiayaAdm').getValue();
															var premigross2 = Ext.getCmp('txtPremiGros').getValue();
															var preminet2 = Ext.getCmp('txtPremiNet').getValue();
															var dimuka2 = Ext.getCmp('txtAngsuranDimuka').getValue();
															var uangmuka2 = Ext.getCmp('txtUangMuka').getValue();
															var pokok2 = Ext.getCmp('txtPokokPembiayaanDealer').getValue();


															if(totaltranscair2>0){

																var totalsss = totaltranscair2;

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) + parseInt(totalsss);

															}
															else {

																var totalsss = totaltranscair2 * (-1);

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) - parseInt(totalsss);

															}
															
															function format1(n) {
													 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
															}
															
															var fix4 = format1(hasil3);

															if(hasil3 > 0){

																var fixa = format1(hasil3);
																Ext.getCmp('txtNilaiCair').setValue(fixa);
																Ext.getCmp('txtNilaiCair3').setValue(fixa);
																
															// document.getElementById("total_trx2").value=fix2;

															}

															else {
																var fixx22 = hasil3 * (-1);
																

																var fixed22 = format1(fixx22);
															 	
															 	//alert(fixed2);
															 	 Ext.getCmp('txtNilaiCair').setValue(fixed22);
															 	 Ext.getCmp('txtNilaiCair3').setValue(fixed22);
																//document.getElementById("total_trx2").value=fixed2;
															}
				
													
													   



			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					Ext.getCmp('txtJenisKendaraan').setValue('');
					Ext.getCmp('txtSilinder').setValue('');
					Ext.getCmp('txtModelKendaraan').setValue('');
					Ext.getCmp('txtKodeKendaraan').setValue('');
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

	var cboDealer = {
		editable:false,
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
					Ext.getCmp('txtKodeCabangDealer').setValue('');
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

	var cboKotaBPKB = {
		editable:false,
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
	
	var cboKotaTambahan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Select Kota",
		fieldLabel: 'Kota',
		id: 'cboKotaTambahan',
		name: 'cboKotaTambahan',
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
					winCariKotaTambahan.show();
					winCariKotaTambahan.center();
				}
			}
		}
	};

	var cboLembagaKeuangan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '60%',
		emptyText: "Select Lembaga Keuangan",
		fieldLabel: 'Lembaga Keuangan',
		id: 'cboLembagaKeuangan',
		name: 'cboLembagaKeuangan',
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
					//winCariLemabagaKeuangan.show();
					//winCariLemabagaKeuangan.center();
				}
			}
		}
	};

	var cboJenisAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '60%',
		emptyText: "Select Asuransi",
		fieldLabel: 'Jenis Asuransi',
		id: 'cboJenisAsuransi',
		name: 'cboJenisAsuransi',
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
					grupAsuransiMix.removeAll();
					gridAsuransi.getView().refresh();
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

	var cboUsahaPekerjaan = {
		editable:false,
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

	var cboPerusahaanAsuransi = {
		editable:false,
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '140%',
		labelAlign:'right',
		labelWidth:130,
		fieldLabel: 'Perusahaan Asuransi',
		id: 'cboPerusahaanAsuransi',
		name: 'cboPerusahaanAsuransi',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtCari18').setValue('');

				PremiNett();

				PremiGross();

				Perluasan();

				//BiayaTJH();
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtTjh').setValue('');
					Ext.getCmp('txtTj2').setValue('');
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

	var cboUsahaKerjaan = {
		anchor: '45%',
		labelWidth:130,
		disabled:true,
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

	var cboUsahaKerjaanPenjamin = {
		anchor: '45%',
		labelWidth:130,
		labelAlign:'left',
		disabled:true,
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

	var cboJenisPiu = {
		editable:false,
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

	var cboPola = {
		editable:false,
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

												     /* LuxTax();

												     angsdimuka();

												   
												     pokokpembiayaan();

												     bunga();

												      PremiGross();

												      Perluasan();

												      //BiayaTJH();

												    PremiNett();

												     uangmuka();
*/	
														
														 PremiGross();

												    Perluasan();

												    //BiayaTJH();

												    PremiNett();

												    var newValue = Ext.getCmp('txtUangMuka').getValue();

												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenp').setValue(total);
													Ext.getCmp('txtUangMukaDealerp').setValue(total);


													var uangmukax = Ext.getCmp('txtUangMuka2').getValue();
													
													var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
													var totalDP = Ext.getCmp('txtTotalDp').getValue();
													var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
													var premigross = Ext.getCmp('txtPremiGros').getValue();
													var preminet = Ext.getCmp('txtPremiNet').getValue();
													var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
													//var uangmuka = Ext.getCmp('txtUangMuka').getValue();
													//var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
													var grosfix = Ext.getCmp('txtPremiGrosFix').getValue();

													//alert(totaltrans);
													var hasil = totalDP - biayaadmin - grosfix- dimuka - totaltrans - total;
													var hasil2 = totalDP - biayaadmin - grosfix - dimuka - totaltrans;
													function format1(n) {
											 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
													}
													var fix = format1(hasil);
													var fix2 = format1(hasil2);
													
													if(total>=uangmukax){

														if(fix>0){
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

														 //document.getElementById("total_trx").value=fix;
														}

														else {
															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fixed2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fixed2);
															var fixed = fix;
														 
															//document.getElementById("total_trx").value=fix;
														}

													}
													else {

														if(fix>0){

															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

															//document.getElementById("total_trx").value=fix;
														}

														else {


															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);
															var fixed = fix;
														 
															//document.getElementById("total_trx").value=fix;
														}
														
													}

												    pokokpembiayaan();
												    bunga();
												    bungaFlat();

													var totalDP2 = Ext.getCmp('txtTotalDp').getValue();
													var totaltranscair2 = Ext.getCmp('txtTotalTrans2').getValue();
															var biayaadmin2 = Ext.getCmp('txtBiayaAdm').getValue();
															var premigross2 = Ext.getCmp('txtPremiGros').getValue();
															var preminet2 = Ext.getCmp('txtPremiNet').getValue();
															var dimuka2 = Ext.getCmp('txtAngsuranDimuka').getValue();
															var uangmuka2 = Ext.getCmp('txtUangMuka').getValue();
															var pokok2 = Ext.getCmp('txtPokokPembiayaanDealer').getValue();


															if(totaltranscair2>0){

																var totalsss = totaltranscair2;

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) + parseInt(totalsss);

															}
															else {

																var totalsss = totaltranscair2 * (-1);

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) - parseInt(totalsss);

															}
															
															function format1(n) {
													 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
															}
															
															var fix4 = format1(hasil3);

															if(hasil3 > 0){

																var fixa = format1(hasil3);
																Ext.getCmp('txtNilaiCair').setValue(fixa);
																Ext.getCmp('txtNilaiCair3').setValue(fixa);
																
															// document.getElementById("total_trx2").value=fix2;

															}

															else {
																var fixx22 = hasil3 * (-1);
																

																var fixed22 = format1(fixx22);
															 	
															 	//alert(fixed2);
															 	 Ext.getCmp('txtNilaiCair').setValue(fixed22);
															 	 Ext.getCmp('txtNilaiCair3').setValue(fixed22);
																//document.getElementById("total_trx2").value=fixed2;
															}

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
	
	var cboAgama = {
		editable:false,
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

	

	var cboPaket = {
		anchor: '80%',
		emptyText: "Jenis Paket",
		fieldLabel: 'Jenis Paket',
		labelAlign:'right',
		editable:false,
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
	
	var cboKotaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: "Pilih kota",
		fieldLabel: 'Kota',
		id: 'cboKotaKonsumen',
		name: 'cboKotaKonsumen',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('txtTipe').setValue('');
				Ext.getCmp('cboCode').setValue('');
				Ext.getCmp('cboCount').setValue('');
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
					winCariKotaKonsumen.show();
					winCariKotaKonsumen.center();
				}
			}
		}
	};
	

	

	var txtJenis = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Jenis",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJenis',
		name: 'txtJenis',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtKabupaten = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Kabupaten",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtKabupaten',
		name: 'txtKabupaten',
		readOnly: true,
		xtype: 'textfield'
	};


	var txtJenisPiu = {
		anchor: '100%',
		emptyText: "Jenis Piutang",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJenisPiu',
		name: 'txtJenisPiu',
		readOnly: true,
		hidden:true,
		xtype: 'textfield'
	};

	var txtUsahaPekerjaan = {
		anchor: '100%',
		emptyText: "Jenis Piutang",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtUsahaPekerjaan',
		name: 'txtUsahaPekerjaan',
		hidden:true,
		xtype: 'textfield'
	};

	var txtPola = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Pola Transaksi",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtPola',
		name: 'txtPola',
		readOnly: true,
		xtype: 'textfield'
	};

	var txtJenisPaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: "Jenis Paket",
		fieldStyle: 'background-color: #eee; background-image: none;',
		id: 'txtJenisPaket',
		name: 'txtJenisPaket',
		readOnly: true,
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

	var txtKodeDati = {
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		fieldLabel: 'Kode dati',
		hidden:true,
		id: 'txtKodeDati',
		name: 'txtKodeDati',
		xtype: 'textfield'
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

	var txtKabupatenKotaIstri = {
		anchor: '80%',
		labelAlign:'right',
		labelWidth:130,
		readOnly: true,
		disabled:true,
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
		disabled:true,
		fieldStyle: 'background-color: #eee; background-image: none;',
		fieldLabel: 'Kabupaten / Kota',
		id: 'txtKabupatenKotaPenjamin',
		name: 'txtKabupatenKotaPenjamin',
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


	var txtKotaWiras = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'masukkan kota',
		fieldLabel: 'Kota',
		id: 'txtKotaWiras',
		name: 'txtKotaWiras',
		xtype: 'textfield'
	};

	var txtKodePosSuamiIstri = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		emptyText: 'Masukkan Kode Pos',
		fieldLabel: '/',
		id: 'txtKodePosSuamiIstri',
		name: 'txtKodePosSuamiIstri',
		xtype: 'textfield'
	};

	var txtKodePosPenjamin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		emptyText: 'Masukkan Kode Pos',
		fieldLabel: '/',
		id: 'txtKodePosPenjamin',
		name: 'txtKodePosPenjamin',
		xtype: 'textfield'
	};

	var txtOTRkonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '45%',
		fieldStyle: "text-align:right;",
		id: 'txtOTRkonsumen',
		name: 'txtOTRkonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtJumlahPembiayaanKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '45%',
		fieldStyle: "text-align:right;",
		id: 'txtJumlahPembiayaanKonsumen',
		name: 'txtJumlahPembiayaanKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	/*var txtBungaKonsumen = {
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtBungaKonsumen',
		name: 'txtBungaKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	var txtNilaiKontrakKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '45%',
		fieldStyle: "text-align:right;",
		id: 'txtNilaiKontrakKonsumen',
		name: 'txtNilaiKontrakKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	/*var txtAngsuranBulanKonsumen = {
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtAngsuranBulanKonsumen',
		name: 'txtAngsuranBulanKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	/*var txtPiutangKonsumen = {
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtPiutangKonsumen',
		name: 'txtPiutangKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};*/

	var txtAngsuranTdkSamaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '45%',
		fieldStyle: "text-align:right;",
		id: 'txtAngsuranTdkSamaKonsumen',
		name: 'txtAngsuranTdkSamaKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtBungaFlat1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldStyle: "text-align:right;",
		id: 'txtBungaFlat1',
		name: 'txtBungaFlat1',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtMasaAngsDealer1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldStyle: "text-align:right;",
		id: 'txtMasaAngsDealer1',
		name: 'txtMasaAngsDealer1',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
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



	var txtMasaAngsKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldStyle: "text-align:right;",
		id: 'txtMasaAngsKonsumen',
		name: 'txtMasaAngsKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
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


	var txtMasaAngsKonsumen1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '112%',
		fieldStyle: "text-align:right;",
		id: 'txtMasaAngsKonsumen1',
		name: 'txtMasaAngsKonsumen1',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtAsuransiKonsumen = {
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtAsuransiKonsumen',
		name: 'txtAsuransiKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	/*var txtPokokPembiayaanKonsumen = {
		anchor: '190%',
		labelAlign:'left',
		labelWidth:140,
		fieldStyle: "text-align:right;background-color: #eee; background-image: none;",
		fieldLabel: ' ',
		readOnly:true,
		id: 'txtPokokPembiayaanKonsumen',
		name: 'txtPokokPembiayaanKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};
	*/
	

	var txtUangMukaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '97.5%',
		fieldStyle: "text-align:right;",
		id: 'txtUangMukaDealer',
		name: 'txtUangMukaDealer',
		value: 0,
        xtype: 'numberfield',
        minValue: 0,
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtUangMukaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '45%',
		fieldStyle: "text-align:right;",
		id: 'txtUangMukaKonsumen',
		name: 'txtUangMukaKonsumen',
		value: 0,
        xtype: 'numberfield',
        minValue: 0, 
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false
	};

	var txtKotaKodePosSuamiIstri = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kota/Kode Pos',
		anchor: '100%',
		emptyText: 'Masukkan Kota',
		id: 'txtKotaKodePosSuamiIstri',
		name: 'txtKotaKodePosSuamiIstri',
		xtype: 'textfield'
	};

	var txtKotaKodePosPenjamin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kota/Kode Pos',
		anchor: '100%',
		emptyText: 'Masukkan Kota',
		id: 'txtKotaKodePosPenjamin',
		name: 'txtKotaKodePosPenjamin',
		xtype: 'textfield'
	};


	var txtKodePos = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		emptyText: 'masukkan kode pos',
		fieldLabel: 'Kode Pos',
		id: 'txtKodePos',
		name: 'txtKodePos',
		xtype: 'textfield'
	};

	var txtKodePosKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		labelWidth:130,
		emptyText: 'Masukkan Kode Pos',
		fieldLabel: 'Kode Pos',
		id: 'txtKodePosKonsumen',
		name: 'txtKodePosKonsumen',
		xtype: 'textfield'
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
		maskRe:/\d/,
		minValue:0,
		xtype: 'textfield',
 		enforceMaxLength : true,
		hideTrigger: true
		};

	Ext.define('TestModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'name',
                type: 'string'
            }, {
                name: 'value',
                type: 'string'
            }]
        });
        var testStore = Ext.create('Ext.data.Store', {
            model: 'TestModel',
            data: [{
                name: 'a',
                value: '1'
            }, {
                name: 'bb',
                value: '2'
            }, {
                name: 'ccc',
                value: '3'
            }, {
                name: 'dddd',
                value: '4'
            }, {
                name: 'eeeee',
                value: '5'
            }, {
                name: 'ffffff',
                value: '6'
            }]
        });

    var grupTrx = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_trss'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
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

	var grupTrx3 = Ext.create('Ext.data.Store', {
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
			url: 'login/cb_agama'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_strx': '5000'
				});
			}
		}
	});

	var cboTrss = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '65.3%',
		displayField: 'fs_nm_strx',
		editable: false,
		emptyText: 'Select SPT Tahunan',
		fieldLabel: 'SPT Tahunan',
		id: 'cboTrss',
		name: 'cboTrss',
		store: grupTrx,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
		listeners: {
			change: function(combo, value) {
				//fnReset();
			}
		}
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
				

				var combo3 = Ext.ComponentQuery.query('#txtKe')[0];

				if(value=='Y'){

					Ext.getCmp('txtKe').setValue('0');

					combo3.setDisabled(true);

				} else {

					Ext.getCmp('txtKe').setValue('1');

					combo3.setDisabled(false);
				}

			}
		}
	};
	

	var cboPencairanKe = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		valueField:'D',
		value:'DEALER',
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

	var cboDeposit = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelAlign:'left',
		labelWidth:130,
		editable: false,
		valueField:'Y',
		value:'YA',
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

	var cboUangMuka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		valueField:'D',
		value:'DEALER',
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


	var cboPolaAngs = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'left',
		editable: false,
		value:'FLAT',
		valueField:'F',
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

	var cboCaraBayar = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '130%',
		labelWidth:130,
		labelAlign:'right',
		editable: false,
		valueField:'T',
		value:'TRASFER',
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
		disabled:true,
		xtype: 'numberfield',
		value: 0,
		maxLength : 2,
 		enforceMaxLength : true
	};




	var frmApkKonsumen = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Input APK Baru - Konsumen',
		width: 1050,
		xtype:'form',
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
												cboPola,
												txtPolaa
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
											txtTes,
												txtTes2,
												txtTes3,
												txtTes4,
												txtTes5,
												txtTes6,
												txtNoNpwp,
											{
											bodyCls: 'x-panel-body-default-framed',
											buttons: [
										{

											flex: 0.9,
											layout: 'anchor',
											xtype: 'container',
											items: []
										
										},{
											iconCls: 'icon-save',
											text: 'Simpan',
											handler: fnCekSave
										}
										,{
											iconCls: 'icon-reset',
											text: 'Cancel',
											handler: fnBack
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
												name: 'txtPendapatan',
												thousandSeparator: ',',
												useThousandSeparator: true,
												
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
												cboSkalaPerusahaan,
												txtKodeSkalaPerusahaan
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
												cboStatusKawin,
												txtStatusKawin
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
												 	allowBlank:false,
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
												txtJenisKendaraan,
												txtKodeKendaraan
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
												txtTjh,
												txtTjh2
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
												txtRefundDealer,
												txtKodeCabangDealer
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


												      var models = Ext.getCmp('cboModelKendaraan').getValue();
												  	
													var tahuns = Ext.getCmp('txtTahun').getValue();
																									  	
													var komersils = Ext.getCmp('cboKomersil').getValue();


													var jenis_asuransis = Ext.getCmp('cboAsuransi').getValue();

													var dealers = Ext.getCmp('cboDealer').getValue();
													
													var nopols='';										  	


													var nopolss= Ext.getCmp('cboNopol').getValue();	



													var kondisi = Ext.getCmp('txtPolaa').getValue();
													var n = kondisi.length;
													if(n==2){

													var kondisifix = kondisi.substring(1, 2);

														if(kondisifix=='U'){

															var nopols = true;

														}
													}
													else {

															var nopols = false;
													}
													

													if(nopols==true){

														if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (nopolss.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Kode Wilayah Polisi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}else {

															LuxTax();

												     Ext.getCmp('txtHargaOTRdealer').setValue(newValue);
												     Ext.getCmp('txtHargaOTRkonsumen').setValue(newValue);

												     angsdimuka();

												   
												     pokokpembiayaan();

												     bunga();

												      PremiGross();

												      Perluasan();

												      //BiayaTJH();

												    PremiNett();

												     uangmuka();


														}

													}else {


														if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtHargaOTR').setValue('0');

																		return;
														}else {

															LuxTax();

												     Ext.getCmp('txtHargaOTRdealer').setValue(newValue);
												     Ext.getCmp('txtHargaOTRkonsumen').setValue(newValue);

												     angsdimuka();

												   
												     pokokpembiayaan();

												     bunga();

												      PremiGross();

												      Perluasan();

												      //BiayaTJH();

												    PremiNett();

												     uangmuka();


														}


													}				
													
													


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

												    var tenors = Ext.getCmp('txtTenor').getValue();
												   	var otrss = Ext.getCmp('txtHargaOTR').getValue();


												   	var models = Ext.getCmp('cboModelKendaraan').getValue();
												  	
													var tahuns = Ext.getCmp('txtTahun').getValue();
																									  	
													var komersils = Ext.getCmp('cboKomersil').getValue();


													var jenis_asuransis = Ext.getCmp('cboAsuransi').getValue();

													var dealers = Ext.getCmp('cboDealer').getValue();
													
													var nopols='';										  	


													var nopolss= Ext.getCmp('cboNopol').getValue();	



													var kondisi = Ext.getCmp('txtPolaa').getValue();
													var n = kondisi.length;
													if(n==2){

													var kondisifix = kondisi.substring(1, 2);

														if(kondisifix=='U'){

															var nopols = true;

														}
													}
													else {

															var nopols = false;
													}
													

													if(nopols==true){

														if (tenors < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Tenor masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtTotalDp').setValue('0');

														return;


													}
													else if (otrss < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Harga OTR masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtTotalDp').setValue('0');

														return;


													}
													else if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (nopolss.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Kode Wilayah Polisi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
													}
													else 
														{

													    angsdimuka();

													     pokokpembiayaan();

													     bunga();

													      PremiGross();

													      Perluasan();

													      //BiayaTJH();

													    PremiGrossFix();

													    PremiNett();

														uangmuka();
													}


													}else {


														if (tenors < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Tenor masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtTotalDp').setValue('0');

														return;


													}
													else if (otrss < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Harga OTR masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtTotalDp').setValue('0');

														return;


													}
													else if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtTotalDp').setValue('0');

																		return;
													}
													else 
														{

													    angsdimuka();

													     pokokpembiayaan();

													     bunga();

													      PremiGross();

													      Perluasan();

													      //BiayaTJH();

													    PremiGrossFix();

													    PremiNett();

														uangmuka();
													}

													}
													

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

												      var otrs = Ext.getCmp('txtHargaOTR').getValue();
												      var tenorss = Ext.getCmp('txtTenor').getValue();
												      var totaldps = Ext.getCmp('txtTotalDp').getValue();

												      var models = Ext.getCmp('cboModelKendaraan').getValue();
												  	
													var tahuns = Ext.getCmp('txtTahun').getValue();
																									  	
													var komersils = Ext.getCmp('cboKomersil').getValue();


													var jenis_asuransis = Ext.getCmp('cboAsuransi').getValue();

													var dealers = Ext.getCmp('cboDealer').getValue();
													
													var nopols='';										  	


													var nopolss= Ext.getCmp('cboNopol').getValue();	



													var kondisi = Ext.getCmp('txtPolaa').getValue();
													var n = kondisi.length;
													if(n==2){

													var kondisifix = kondisi.substring(1, 2);

														if(kondisifix=='U'){

															var nopols = true;

														}
													}
													else {

															var nopols = false;
													}



													if(nopols==true){

														if (otrs < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Harga Otr masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtAngsuran').setValue('0');

														return;


													}
													else if (tenorss < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Tenor masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtAngsuran').setValue('0');

														return;


													}
													else if (totaldps < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field total DP masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtAngsuran').setValue('0');

														return;


													}
													else if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (nopolss.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Kode Wilayah Polisi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
													}
													else 
													{

												    Ext.getCmp('txtAngsuranBulanDealer').setValue(newValue);
												    Ext.getCmp('txtAngsuranBulanKonsumen').setValue(newValue);

												    angsdimuka();

												   
												     pokokpembiayaan();

												     bunga();

												      PremiGross();

												      Perluasan();

												      //BiayaTJH();

												       PremiGrossFix();
												       
												    PremiNett();

												    bungaFlat();
													}

													} else {	

														if (otrs < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Harga Otr masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtAngsuran').setValue('0');

														return;


													}
													else if (tenorss < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field Tenor masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtAngsuran').setValue('0');

														return;


													}
													else if (totaldps < 1) {
														Ext.MessageBox.show({
														buttons: Ext.MessageBox.OK,
														closable: false,
														icon: Ext.Msg.WARNING,
														msg: 'Field total DP masih kosong!',
														title: 'MFAS'
														});

														Ext.getCmp('txtAngsuran').setValue('0');

														return;


													}
													else if (models.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Model Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (tahuns < 1) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Tahun Kendaraan masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (komersils == null) {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Komersial masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (jenis_asuransis.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Jenis Asuransi masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
														}
														else if (dealers.trim() === '') {
																		Ext.MessageBox.show({
																		buttons: Ext.MessageBox.OK,
																		closable: false,
																		icon: Ext.Msg.WARNING,
																		msg: 'Field Dealer masih kosong!',
																		title: 'MFAS'
																		});

																		Ext.getCmp('txtAngsuran').setValue('0');

																		return;
													}
													else 
													{

												    Ext.getCmp('txtAngsuranBulanDealer').setValue(newValue);
												    Ext.getCmp('txtAngsuranBulanKonsumen').setValue(newValue);

												    angsdimuka();

												   
												     pokokpembiayaan();

												     bunga();

												      PremiGross();

												      Perluasan();

												      //BiayaTJH();

												       PremiGrossFix();
												       
												    PremiNett();

												    bungaFlat();
													}


													}
													
												  
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
												enableKeyEvents: true,
												value: 0,
												listeners: {
													  keyup: function(field) {

														var newValue = field.getValue();

														var dp = Ext.getCmp('txtTotalDp').getValue();
												var tjh = Ext.getCmp('txtBiayaTjH').getValue();
												var premi = Ext.getCmp('txtPremiGrosFix').getValue();
												var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
												var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
												var total = parseInt(dp) - parseInt(newValue) - parseInt(premi) - parseInt(dimuka) - parseInt(totaltrans);
												 //alert(newValue);
												 

												if (total > 0) {
												var xtotal = total;

										    	Ext.getCmp('txtUangMuka').setValue(xtotal);
										    	Ext.getCmp('txtUangMuka2').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);
												}
												else {
													var xtotal = total;
													xtotals =  xtotal *(-1);		
												Ext.getCmp('txtUangMuka').setValue(xtotals);
												Ext.getCmp('txtUangMuka2').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);
												}
													},
												    'change': function(field,newValue){

												var dp = Ext.getCmp('txtTotalDp').getValue();
												var tjh = Ext.getCmp('txtBiayaTjH').getValue();
												var premi = Ext.getCmp('txtPremiGrosFix').getValue();
												var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
												var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
												var total = parseInt(dp) - parseInt(newValue) - parseInt(premi) - parseInt(dimuka) - parseInt(totaltrans);
												 //alert(newValue);
												 

												if (total > 0) {
												var xtotal = total;

										    	Ext.getCmp('txtUangMuka').setValue(xtotal);
										    	Ext.getCmp('txtUangMuka2').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);
												}
												else {
													var xtotal = total;
													xtotals =  xtotal *(-1);		
												Ext.getCmp('txtUangMuka').setValue(xtotals);
												Ext.getCmp('txtUangMuka2').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);
												}
												   		 }
													 }
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
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Perluasan',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPerluasan2',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPerluasan2',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												hidden:true
											}),
											Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Premi Perluasan',
												readOnly:true,
												hideTrigger: true,
												id: 'txtPremiGrosFix2',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												fieldStyle: "text-align:right;background-color: #eee; background-image: none;text-align: left;",
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtPremiGrosFix2',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												hidden:true,

											}),
											Ext.create('Ext.ux.form.NumericField', {
												afterLabelTextTpl: required,
												allowBlank: false,
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Biaya TJH',
												hideTrigger: true,
												disabled:true,
												id: 'txtBiayaTjH',
												anchor: '100%',
												labelAlign:'left',
												labelWidth:130,
												style:'margin-top:10px',
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtBiayaTjH',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												enableKeyEvents: true,
												 listeners: {
											        keyup: function(form, e) {
											        

												    bunga();

												    PremiGross();

												    Perluasan();

												    //BiayaTJH();

												    PremiNett();

												    var tjh = Ext.getCmp('txtBiayaTjH').getValue();
												    var uangmuka =  Ext.getCmp('txtUangMuka').getValue();
													var premi = Ext.getCmp('txtPremiGros').getValue();
													var perluasan = Ext.getCmp('txtPerluasan').getValue();
													var total1 = parseInt(premi)+parseInt(tjh)+parseInt(perluasan)+25000;
													Ext.getCmp('txtPremiGrosFix').setValue(total1);

													var dp = Ext.getCmp('txtTotalDp').getValue();
													var admin = Ext.getCmp('txtBiayaAdm').getValue();
													var premi = Ext.getCmp('txtPremiGros').getValue();
													var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
													var grosfix = total1;
													var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
													
													
													var xtotal = dp - admin - grosfix - dimuka - totaltrans;

													if (xtotal > 0) {
											    	Ext.getCmp('txtUangMuka').setValue(xtotal);
											    	Ext.getCmp('txtUangMuka2').setValue(xtotal);
													Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
													Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);

													//document.getElementById("total_trx").value='0';
													}
													else {
														xtotals =  xtotal *(-1);		
													Ext.getCmp('txtUangMuka').setValue(xtotals);
													Ext.getCmp('txtUangMuka2').setValue(xtotal);
													Ext.getCmp('txtUangMukaDealerp').setValue(xtotals);
													Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);

													//document.getElementById("total_trx").value='0';
													}


											        pokokpembiayaan();
												   
											        }
											    }
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
												name: 'txtPremiGrosFix	',
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
												var premi = Ext.getCmp('txtPremiGrosFix').getValue();
												 var total = dp - admin - premi;
												 //alert(newValue);
												 

												if (total > 0) {
												var xtotal = total - newValue;

										    	Ext.getCmp('txtUangMuka').setValue(xtotal);
										    	Ext.getCmp('txtUangMuka2').setValue(xtotal);
												Ext.getCmp('txtUangMukaDealerp').setValue(xtotal);
												Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotal);
												}
												else {
													var xtotal = total - newValue;
													xtotals =  xtotal *(-1);		
												Ext.getCmp('txtUangMuka').setValue(xtotals);
												Ext.getCmp('txtUangMuka2').setValue(xtotals);
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


												    PremiGross();

												    Perluasan();

												    //BiayaTJH();

												    PremiNett();

												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenp').setValue(total);
													Ext.getCmp('txtUangMukaDealerp').setValue(total);


													var uangmukax = Ext.getCmp('txtUangMuka2').getValue();
													
													var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
													var totalDP = Ext.getCmp('txtTotalDp').getValue();
													var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
													var premigross = Ext.getCmp('txtPremiGros').getValue();
													var preminet = Ext.getCmp('txtPremiNet').getValue();
													var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
													//var uangmuka = Ext.getCmp('txtUangMuka').getValue();
													//var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
													var grosfix = Ext.getCmp('txtPremiGrosFix').getValue();

													//alert(totaltrans);
													var hasil = totalDP - biayaadmin - grosfix- dimuka - totaltrans - total;
													var hasil2 = totalDP - biayaadmin - grosfix - dimuka - totaltrans;
													function format1(n) {
											 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
													}
													var fix = format1(hasil);
													var fix2 = format1(hasil2);
													
													if(total>=uangmukax){

														if(fix>0){
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

														 document.getElementById("total_trx").value=fix;
														}

														else {
															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fixed2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fixed2);
															var fixed = fix;
														 
															document.getElementById("total_trx").value=fix;
														}

													}
													else {

														if(fix>0){

															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

															document.getElementById("total_trx").value=fix;
														}

														else {


															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);
															var fixed = fix;
														 
															document.getElementById("total_trx").value=fix;
														}
														
													}

												    pokokpembiayaan();
												    bunga();
												    bungaFlat();

													var totalDP2 = Ext.getCmp('txtTotalDp').getValue();
													var totaltranscair2 = Ext.getCmp('txtTotalTrans2').getValue();
															var biayaadmin2 = Ext.getCmp('txtBiayaAdm').getValue();
															var premigross2 = Ext.getCmp('txtPremiGros').getValue();
															var preminet2 = Ext.getCmp('txtPremiNet').getValue();
															var dimuka2 = Ext.getCmp('txtAngsuranDimuka').getValue();
															var uangmuka2 = Ext.getCmp('txtUangMuka').getValue();
															var pokok2 = Ext.getCmp('txtPokokPembiayaanDealer').getValue();


															if(totaltranscair2>0){

																var totalsss = totaltranscair2;

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) + parseInt(totalsss);

															}
															else {

																var totalsss = totaltranscair2 * (-1);

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) - parseInt(totalsss);

															}
															
															function format1(n) {
													 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
															}
															
															var fix4 = format1(hasil3);

															if(hasil3 > 0){

																var fixa = format1(hasil3);
																Ext.getCmp('txtNilaiCair').setValue(fixa);
																Ext.getCmp('txtNilaiCair3').setValue(fixa);
																
															// document.getElementById("total_trx2").value=fix2;

															}

															else {
																var fixx22 = hasil3 * (-1);
																

																var fixed22 = format1(fixx22);
															 	
															 	//alert(fixed2);
															 	 Ext.getCmp('txtNilaiCair').setValue(fixed22);
															 	 Ext.getCmp('txtNilaiCair3').setValue(fixed22);
																//document.getElementById("total_trx2").value=fixed2;
															}


												    //selisihDp();


												      

												   		 }
													 }
												
											}),
											Ext.create('Ext.ux.form.NumericField', {
												alwaysDisplayDecimals: true,
												currencySymbol: null,
												decimalPrecision: 2,
												decimalSeparator: '.',
												fieldLabel: 'Uang Muka',
												fieldStyle: 'text-align: left;',
												hideTrigger: true,
												id: 'txtUangMuka2',
												anchor: '130%',
												labelAlign:'left',
												style:'margin-top:10px',
												labelWidth:130,
												keyNavEnabled: false,
												mouseWheelEnabled: false,
												name: 'txtUangMuka2',
												thousandSeparator: ',',
												useThousandSeparator: true,
												value: 0,
												hidden:true
												
											}),
											{
											    xtype: 'box',
											    autoEl: {tag: 'hr',style:"size:30"}
											},
											txtTotalTrans,
											txtTotalTrans3,
											txtTotalTrans2,
											txtSelisihDp,
											txtBiayaTjH2,
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
						xtype:'button',
     										text:'HITUNG ULANG KALKULASI KREDIT',
     										style : "padding:6px;margin-top:10px",
     										anchor: '100%',
     										handler: fnRecalculate
					},
					{
						xtype:'displayfield',
     										title: ' ',
     										style : "padding:3px;",
     										anchor: '100%',
					},
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
													style:'margin-top:10px',
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
													anchor: '215%',
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
													anchor: '215%',
													labelWidth:0,
													style:'margin-left:146px',
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
													style:'margin-top:10px',
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

													    pokokpembiayaan();

													    bunga();

													     PremiGross();

													     Perluasan();

													     //BiayaTJH();

													    PremiNett();

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
												disabled:true,
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
												disabled:true,
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
	

	function fnKodeTrans() {
		
		//vMask.show();
		winKode.show();
		winKode.center();

	}


	function fnRecalculate() {



												   // Ext.getCmp('txtPremiGros').setValue('0');
												   	//Ext.getCmp('txtPremiGrosFix').setValue('0');
												    //Ext.getCmp('txtPremiGrosFix2').setValue('0');
												    //Ext.getCmp('txtPremiNet').setValue('0');
												    //Ext.getCmp('txtUangMuka2').setValue('0');
												    //Ext.getCmp('txtUangMuka').setValue('0');
												    document.getElementById('total_trx').value=0;

													//vMask.show();

	//LuxTax();

													//uangmuka();

													PremiGross();


												    Perluasan();

												    BiayaTJH();

												      PremiNett();

												    var checktjh = Ext.getCmp('checktjh').getValue();
													
													var premi = Ext.getCmp('txtPremiGros').getValue();
													
													var perluasan = Ext.getCmp('txtPerluasan').getValue();

													if(checktjh==true){

														
												 	 var tjh = Ext.getCmp('txtBiayaTjH').getValue();	
													  	
													}else {
														 var tjh=0;
													}

													 var totalz = parseInt(tjh) + parseInt(premi) + parseInt(perluasan) + 25000;


													 Ext.getCmp('txtPremiGrosFix').setValue(totalz);

												  

													 var newValue = Ext.getCmp('txtUangMuka').getValue();

													 var dps = Ext.getCmp('txtTotalDp').getValue();
														var admins = Ext.getCmp('txtBiayaAdm').getValue();
														var premis = Ext.getCmp('txtPremiGros').getValue();
														var dimukas = Ext.getCmp('txtAngsuranDimuka').getValue();
														var grosfixs = totalz;
														var totaltranss = Ext.getCmp('txtTotalTrans').getValue();
														
														
														//var xtotal = dps - admins - grosfixs - dimukas - totaltranss;
														//if (xtotal > 0) {
												    	//Ext.getCmp('txtUangMuka').setValue(xtotal);
												    	Ext.getCmp('txtUangMuka2').setValue(newValue);
														Ext.getCmp('txtUangMukaDealerp').setValue(newValue);
														Ext.getCmp('txtUangMukaKonsumenp').setValue(newValue);


												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenp').setValue(total);
													Ext.getCmp('txtUangMukaDealerp').setValue(total);


													var uangmukax = Ext.getCmp('txtUangMuka2').getValue();
													
													var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
													var totalDP = Ext.getCmp('txtTotalDp').getValue();
													var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
													var premigross = Ext.getCmp('txtPremiGros').getValue();
													var preminet = Ext.getCmp('txtPremiNet').getValue();
													var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
													//var uangmuka = Ext.getCmp('txtUangMuka').getValue();
													//var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
													var grosfix = totalz;

													//alert(totaltrans);
													var hasil = totalDP - biayaadmin - grosfix- dimuka - totaltrans - total;
													var hasil2 = totalDP - biayaadmin - grosfix - dimuka - totaltrans;
													function format1(n) {
											 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
													}
													var fix = format1(hasil);
													var fix2 = format1(hasil2);
													
													if(total>=uangmukax){

														if(fix>0){
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

														 document.getElementById("total_trx").value=fix;
														}

														else {
															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fixed2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fixed2);
															var fixed = fix;
														 
															document.getElementById("total_trx").value=fix;
														}

													}
													else {

														if(fix>0){

															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

															document.getElementById("total_trx").value=fix;
														}

														else {


															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);
															var fixed = fix;
														 
															document.getElementById("total_trx").value=fix;
														}
														
													}

												    pokokpembiayaan();
												    bunga();
												    bungaFlat();

													var totalDP2 = Ext.getCmp('txtTotalDp').getValue();
													var totaltranscair2 = Ext.getCmp('txtTotalTrans2').getValue();
															var biayaadmin2 = Ext.getCmp('txtBiayaAdm').getValue();
															var premigross2 = Ext.getCmp('txtPremiGros').getValue();
															var preminet2 = Ext.getCmp('txtPremiNet').getValue();
															var dimuka2 = Ext.getCmp('txtAngsuranDimuka').getValue();
															var uangmuka2 = Ext.getCmp('txtUangMuka').getValue();
															var pokok2 = Ext.getCmp('txtPokokPembiayaanDealer').getValue();


															if(totaltranscair2>0){

																var totalsss = totaltranscair2;

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) + parseInt(totalsss);

															}
															else {

																var totalsss = totaltranscair2 * (-1);

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) - parseInt(totalsss);

															}
															
															function format1(n) {
													 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
															}
															
															var fix4 = format1(hasil3);

															if(hasil3 > 0){

																var fixa = format1(hasil3);
																Ext.getCmp('txtNilaiCair').setValue(fixa);
																Ext.getCmp('txtNilaiCair3').setValue(fixa);
																
															// document.getElementById("total_trx2").value=fix2;

															}

															else {
																var fixx22 = hasil3 * (-1);
																

																var fixed22 = format1(fixx22);
															 	
															 	//alert(fixed2);
															 	 Ext.getCmp('txtNilaiCair').setValue(fixed22);
															 	 Ext.getCmp('txtNilaiCair3').setValue(fixed22);
																//document.getElementById("total_trx2").value=fixed2;
															}

														Ext.MessageBox.show({
															buttons: Ext.MessageBox.OK,
															closable: true,
															icon: Ext.Msg.WARNING,
															msg: 'Recalculate Berhasil !',
															title: 'MFAS'
														});

		

	}



	function fnTambahPerluasan() {
		
		//vMask.show();
		winPerluasan.show();
		winPerluasan.center();

	}

	function fnBack(){

		window.location.href = 'apknew';

	}


	function fnCekSaveMix() {
			grupAsuransiMix.clearFilter();
			var xtahun = '';
			var xjenisasuransi = '';
			var xtenor = '';
			
			var store = gridAsuransi.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tahun_ke');
				xjenisasuransi = xjenisasuransi +'|'+ record.get('fs_jenis_asuransi');
				xtenor = xtenor +'|'+ record.get('fs_tenor');
				
			});
			
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'apknew/ceksavemix',
				params: {
					'fs_tahun_ke': xkodetrans,
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
							title: 'MFAS'
						});
					}
					else {
						if (xtext.sukses === true && xtext.hasil == 'lanjut') {
							fnSaveTrans();
							fnMaskHide();
						}
						else {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'MFAS',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSaveTrans();
										fnMaskHide();
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
				}
			});
	}

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
				url: 'apknew/ceksavetrans',
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
							title: 'MFAS'
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
								title: 'MFAS',
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
			url: 'apknew/savetrans',
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
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				
				if (xtext.sukses === true) {

					//alert(xtext.total_trans2);
					Ext.getCmp('txtTotalTrans').setValue(xtext.total_trans);
					Ext.getCmp('txtTotalTrans3').setValue(xtext.total_trans);
					Ext.getCmp('txtTotalTrans2').setValue(xtext.total_trans2);

					//fnResetTrans();
					fnMaskHide();
					//vMask.hide();
					var xtotal = grupKodeTrans2.getCount();
				
					if (xtotal > 0) {

					} else {
						var a=0;
						Ext.getCmp('txtTotalTrans').setValue(a);
					}
				}	

				if (xtext.sukses2 === true) {

					//alert(xtext.total_trans2);
					Ext.getCmp('txtTotalTrans').setValue(xtext.total_trans);
					Ext.getCmp('txtTotalTrans3').setValue(xtext.total_trans);
					Ext.getCmp('txtTotalTrans2').setValue(xtext.total_trans2);

					//fnResetTrans();
					fnMaskHide();
					//vMask.hide();
					var xtotal = grupKodeTrans2.getCount();
				
					if (xtotal > 0) {

					} else {
						var a=0;
						Ext.getCmp('txtTotalTrans').setValue(a);
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
					title: 'MFAS'
				});
				fnMaskHide();
				vMask.hide();
			}
		});
	}

	function saveMix() {
			grupAsuransiMix.clearFilter();
			var xtahun = '';
			var xjenisasuransi = '';
			var xtenor = '';
			
			var store = gridAsuransi.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tahun_ke');
				xjenisasuransi = xjenisasuransi +'|'+ record.get('fs_jenis_asuransi');
				xtenor = xtenor +'|'+ record.get('fs_tenor');
				
			});
			
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'konsumen/savemix',
				params: {
					'fs_tahun_ke': xtahun,
					'fs_tenor': xtenor,
					'fs_jenis_asuransi': xjenisasuransi,
				},
				success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
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
						title: 'MFAS'
					});
					fnMaskHide();
					vMask.hide();
				}
			});
	}	

	function savePerluasan() {
			var jenis_kendaraan = Ext.getCmp('txtJenisKendaraan').getValue();
		var komersil = Ext.getCmp('cboKomersil').getValue();
		var otr = Ext.getCmp('txtHargaOTR').getValue();
		var asuransi = Ext.getCmp('txtNilaiAsuransi').getValue();
		var tenor = Ext.getCmp('txtTenor').getValue();
		var tahun_pencairan = Ext.getCmp('txtRefnodt').getValue();
		var usia_kendaraan = Ext.getCmp('txtTahun').getValue();
		var pola_transaksi = Ext.getCmp('cboPola').getValue();
		var wilayah_asuransi = Ext.getCmp('txtWilayahAsuransi').getValue();
	

			var xtahun = '';
			var xjenisasuransi = '';
			var xtenor = '';
			

			var xNama = '';
			var xTenor = '';

		if(asuransi=='M'){


			var store = gridAsuransi.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tahun_ke');
				xjenisasuransi = xjenisasuransi +'|'+ record.get('fs_jenis_asuransi');
				
			});
		}

		var store2 = gridPerluasan.getStore();
			store2.each(function(record, idx) {
				xNama = xNama +'|'+ record.get('fs_nama_perluasan');
				xTenor = xTenor +'|'+ record.get('fs_tenor_perluasan');
				
			});


			
			Ext.Ajax.request({
				method: 'POST',
				url: 'konsumen/perluasan2',
				params: {
				'jenis_kendaraan': jenis_kendaraan,
				'komersil': komersil,
				'otr': otr,
				'tahun_pencairan': tahun_pencairan,
				'tenor': tenor,
				'asuransi': asuransi,
				'usia_kendaraan': usia_kendaraan,
				'pola_transaksi': pola_transaksi,
				'wilayah_asuransi': wilayah_asuransi,
				'tahunke' : xtahun,
				'jenisasuransi' : xjenisasuransi,
				'nama_perluasan' : xNama,
				'tenor_perluasan' : xTenor,

				},
				success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.msg,
					title: 'MFAS'
				});
				

				if (xtext.sukses === true) {
					//Perluasan();
					fnMaskHide();

					var gros = Ext.getCmp('txtPremiGrosFix').getValue();
					var gros2 = Ext.getCmp('txtPremiGrosFix2').getValue();
					//alert(gros2);
					var perluasan1 = Ext.getCmp('txtPerluasan').getValue();
					var perluasan2 = Ext.getCmp('txtPerluasan2').getValue();

					var tjh = Ext.getCmp('txtBiayaTjH').getValue();
					var premi = Ext.getCmp('txtPremiGros').getValue();
					var perluasan = Ext.getCmp('txtPerluasan').getValue();
					var total = parseInt(tjh) + parseInt(premi) + parseInt(xtext.hasil) + 25000;


					/*if(perluasan2==0){

						var total = parseInt(gros) + parseInt(xtext.hasil);
					}
					else {

						if(xtext.hasil >= perluasan2){

							var total = parseInt(gros) + parseInt(xtext.hasil);
						}
						else {

								var total = parseInt(gros2) + parseInt(xtext.hasil);
								alert(total);

						}

					}*/
					
					//var perluasan = Ext.getCmp('txtPerluasan').getValue();
					Ext.getCmp('txtPerluasan').setValue(xtext.hasil);
					//var perluasan = Ext.getCmp('txtPerluasan').getValue();
				

						 Ext.getCmp('txtPremiGrosFix').setValue(total);
						 //Ext.getCmp('txtPremiGrosFix2').setValue(gros);

						 var xtotal = grupPerluasan.getCount();



						Ext.getCmp('txtPerluasan2').setValue(xtext.hasil);

				
						if (xtotal > 0) {
							
						}
						else {
							var xqty = 0;
							 Ext.getCmp('txtPerluasan').setValue(xtqy);
						}
					//vMask.hide();
				}

				if (xtext.sukses2 === true) {
					//Perluasan();
					var b = 0;
					var gros = Ext.getCmp('txtPremiGrosFix').getValue();
					var perluasan = Ext.getCmp('txtPerluasan').getValue();
					var total = parseInt(gros) - parseInt(perluasan);
					Ext.getCmp('txtPerluasan').setValue(b);
					Ext.getCmp('txtPremiGrosFix').setValue(total);
					fnMaskHide();
					//vMask.hide();
				}

				uangmuka();
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Saving Failed, Connection Failed!!',
						title: 'MFAS'
					});
					fnMaskHide();
					vMask.hide();
				}
			});
	}

	function NilaiCair() {

		var totaltranscair = Ext.getCmp('txtTotalTrans2').getValue();
		
		var totalDP = Ext.getCmp('txtTotalDp').getValue();
		var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
		var premigross = Ext.getCmp('txtPremiGros').getValue();
		var preminet = Ext.getCmp('txtPremiNet').getValue();
		var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
		var uangmuka = Ext.getCmp('txtUangMuka').getValue();
		var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();

		var hasil2 = parseInt(pokok) - parseInt(biayaadmin) - parseInt(dimuka) - parseInt(preminet) + parseInt(totaltranscair);
		//alert(hasil2);
		function format1(n) {
 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		}
		
		var fix2 = format1(hasil2);

		if(hasil2 > 0){

			var fixa = format1(hasil2);
			Ext.getCmp('txtNilaiCair').setValue(fixa);
			Ext.getCmp('txtNilaiCair3').setValue(fixa);
			
		// document.getElementById("total_trx2").value=fix2;

		}

		else {
			var fixx2 = hasil2 * (-1);
			

			var fixed2 = format1(fixx2);
		 	
		 	//alert(fixed2);
		 	 Ext.getCmp('txtNilaiCair').setValue(fixed2);
		 	 Ext.getCmp('txtNilaiCair3').setValue(fixed2);
			//document.getElementById("total_trx2").value=fixed2;
		}
		//Ext.getCmp('txtSelisihDp').setValue(hasil);
			
	}


	function PremiGross() {
		var jenis_kendaraan = Ext.getCmp('txtJenisKendaraan').getValue();
		var komersil = Ext.getCmp('cboKomersil').getValue();
		var otr = Ext.getCmp('txtHargaOTR').getValue();
		var asuransi = Ext.getCmp('txtNilaiAsuransi').getValue();
		var tenor = Ext.getCmp('txtTenor').getValue();
		var tahun_pencairan = Ext.getCmp('txtRefnodt').getValue();
		var usia_kendaraan = Ext.getCmp('txtTahun').getValue();
		var wilayah_asuransi = Ext.getCmp('txtWilayahAsuransi').getValue();
		var pola_transaksi = Ext.getCmp('cboPola').getValue();
	

			var xtahun = '';
			var xjenisasuransi = '';
			var xtenor = '';
			

			var xNama = '';
			var xTenor = '';

		if(asuransi=='M'){


			var store = gridAsuransi.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tahun_ke');
				xjenisasuransi = xjenisasuransi +'|'+ record.get('fs_jenis_asuransi');
				
			});
		}

		var store2 = gridPerluasan.getStore();
			store2.each(function(record, idx) {
				xNama = xNama +'|'+ record.get('fs_nama_perluasan');
				xTenor = xTenor +'|'+ record.get('fs_tenor_perluasan');
				
			});
	

		Ext.Ajax.request({
			method: 'POST',
			url: 'konsumen/premigross',
			params: {
				'jenis_kendaraan': jenis_kendaraan,
				'komersil': komersil,
				'otr': otr,
				'tahun_pencairan': tahun_pencairan,
				'tenor': tenor,
				'asuransi': asuransi,
				'usia_kendaraan': usia_kendaraan,
				'tahunke' : xtahun,
				'jenisasuransi' : xjenisasuransi,
				'wilayah_asuransi' : wilayah_asuransi,
				'pola_transaksi' : pola_transaksi
				},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					//	Ext.getCmp('cboGL').setValue(xtext.kdacno);
						Ext.getCmp('txtPremiGros').setValue(xtext.hasil);


					
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Kalkulasi Failed',
					title: 'MFAS'
				});
				//fnMaskHide();
			}
		});
	
		


	
		/*var xlux = xharga - xdiskon;
		Ext.getCmp('txtLuxKali').setValue(xlux);
		
		var xpersen = Ext.getCmp('txtLuxPersen').getValue();
		var xharga2 = Ext.getCmp('txtLuxKali').getValue();
		var xtotal = (xpersen / 100) * xharga2;
		Ext.getCmp('txtLuxTotal').setValue(xtotal);
		*/
	}

	function Perluasan() {


		var jenis_kendaraan = Ext.getCmp('txtJenisKendaraan').getValue();
		var komersil = Ext.getCmp('cboKomersil').getValue();
		var otr = Ext.getCmp('txtHargaOTR').getValue();
		var asuransi = Ext.getCmp('txtNilaiAsuransi').getValue();
		var tenor = Ext.getCmp('txtTenor').getValue();
		var tahun_pencairan = Ext.getCmp('txtRefnodt').getValue();
		var usia_kendaraan = Ext.getCmp('txtTahun').getValue();
		var pola_transaksi = Ext.getCmp('cboPola').getValue();
		var wilayah_asuransi = Ext.getCmp('txtWilayahAsuransi').getValue();
	

			var xtahun = '';
			var xjenisasuransi = '';
			var xtenor = '';
			

			var xNama = '';
			var xTenor = '';

		if(asuransi=='M'){


			var store = gridAsuransi.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tahun_ke');
				xjenisasuransi = xjenisasuransi +'|'+ record.get('fs_jenis_asuransi');
				
			});
		}

		var store2 = gridPerluasan.getStore();
			store2.each(function(record, idx) {
				xNama = xNama +'|'+ record.get('fs_nama_perluasan');
				xTenor = xTenor +'|'+ record.get('fs_tenor_perluasan');
				
			});
	

		Ext.Ajax.request({
			method: 'POST',
			url: 'konsumen/perluasan',
			params: {
				'jenis_kendaraan': jenis_kendaraan,
				'komersil': komersil,
				'otr': otr,
				'tahun_pencairan': tahun_pencairan,
				'tenor': tenor,
				'asuransi': asuransi,
				'usia_kendaraan': usia_kendaraan,
				'pola_transaksi': pola_transaksi,
				'wilayah_asuransi': wilayah_asuransi,
				'tahunke' : xtahun,
				'jenisasuransi' : xjenisasuransi,
				'nama_perluasan' : xNama,
				'tenor_perluasan' : xTenor,
				},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					//	Ext.getCmp('cboGL').setValue(xtext.kdacno);
						Ext.getCmp('txtPerluasan').setValue(xtext.hasil);
						Ext.getCmp('txtPerluasan2').setValue(xtext.hasil);
					
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Kalkulasi Failed',
					title: 'MFAS'
				});
				//fnMaskHide();
			}
		});
		
		/*var xlux = xharga - xdiskon;
		Ext.getCmp('txtLuxKali').setValue(xlux);
		
		var xpersen = Ext.getCmp('txtLuxPersen').getValue();
		var xharga2 = Ext.getCmp('txtLuxKali').getValue();
		var xtotal = (xpersen / 100) * xharga2;
		Ext.getCmp('txtLuxTotal').setValue(xtotal);
		*/
	}


	function BiayaTJH() {


		var jenis_kendaraan = Ext.getCmp('txtJenisKendaraan').getValue();
		var komersil = Ext.getCmp('cboKomersil').getValue();
		var otr = Ext.getCmp('txtHargaOTR').getValue();
		var asuransi = Ext.getCmp('txtNilaiAsuransi').getValue();
		var tenor = Ext.getCmp('txtTenor').getValue();
		var tahun_pencairan = Ext.getCmp('txtRefnodt').getValue();
		var usia_kendaraan = Ext.getCmp('txtTahun').getValue();
		var pola_transaksi = Ext.getCmp('cboPola').getValue();
		var wilayah_asuransi = Ext.getCmp('txtWilayahAsuransi').getValue();
	
	

		Ext.Ajax.request({
			method: 'POST',
			url: 'konsumen/tjh',
			params: {
				'jenis_kendaraan': jenis_kendaraan,
				'komersil': komersil,
				'otr': otr,
				'tahun_pencairan': tahun_pencairan,
				'tenor': tenor,
				'asuransi': asuransi,
				'pola_transaksi': pola_transaksi,
				'wilayah_asuransi': wilayah_asuransi
				},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				if (xtext.sukses === true) {
					//	Ext.getCmp('cboGL').setValue(xtext.kdacno);
						Ext.getCmp('txtBiayaTjH2').setValue(xtext.hasil);

					
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Kalkulasi Failed',
					title: 'MFAS'
				});
				//fnMaskHide();
			}
		});
	
	

	
		/*var xlux = xharga - xdiskon;
		Ext.getCmp('txtLuxKali').setValue(xlux);
		
		var xpersen = Ext.getCmp('txtLuxPersen').getValue();
		var xharga2 = Ext.getCmp('txtLuxKali').getValue();
		var xtotal = (xpersen / 100) * xharga2;
		Ext.getCmp('txtLuxTotal').setValue(xtotal);
		*/
	}


	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			var xwh = Ext.getCmp('cboStatusKawin').getValue();

			var txtNamaIstri = Ext.getCmp('txtNamaIstri').getValue();
			var txtAlamatIstri = Ext.getCmp('txtAlamatIstri').getValue();
			var cboKodePosIstri = Ext.getCmp('cboKodePosIstri').getValue();
			var txtTeleponIstri = Ext.getCmp('txtTeleponIstri').getValue();
			var txtKabupatenKotaIstri = Ext.getCmp('txtKabupatenKotaIstri').getValue();
			var cboUsahaKerjaan = Ext.getCmp('cboUsahaKerjaan').getValue();
			var txtKeteranganUsahaIstri = Ext.getCmp('txtKeteranganUsahaIstri').getValue();
			var txtAlamatUsahaSuamiIstri = Ext.getCmp('txtAlamatUsahaSuamiIstri').getValue();
			var txtTeleponUsaha = Ext.getCmp('txtTeleponUsaha').getValue();
			var txtPendapatanSuamiIstri = Ext.getCmp('txtPendapatanSuamiIstri').getValue();

			var txtNamaPenjamin = Ext.getCmp('txtNamaPenjamin').getValue();
			var txtAlamatPenjamin = Ext.getCmp('txtAlamatPenjamin').getValue();
			var cboKodePosPenjamin = Ext.getCmp('cboKodePosPenjamin').getValue();
			var txtTeleponPenjamin = Ext.getCmp('txtTeleponPenjamin').getValue();
			var txtKabupatenKotaPenjamin = Ext.getCmp('txtKabupatenKotaPenjamin').getValue();
			var cboUsahaKerjaanPenjamin = Ext.getCmp('cboUsahaKerjaanPenjamin').getValue();
			var txtKeteranganUsahaPenjamin = Ext.getCmp('txtKeteranganUsahaPenjamin').getValue();
			var txtAlamatUsahaPenjamin = Ext.getCmp('txtAlamatUsahaPenjamin').getValue();
			var txtTeleponUsahaPenjamin = Ext.getCmp('txtTeleponUsahaPenjamin').getValue();
			var txtPendapatanPenjamin = Ext.getCmp('txtPendapatanPenjamin').getValue();
			var txtStatusPenjamin = Ext.getCmp('txtStatusPenjamin').getValue();

			if(xwh=='KAWIN'){

				if (txtNamaIstri.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Nama Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (txtAlamatIstri.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Alamat Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (txtTeleponIstri.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Telepon Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (cboKodePosIstri.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Kode Pos Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (txtKabupatenKotaIstri.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Kota Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (cboUsahaKerjaan.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Pekerjaan Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (txtKeteranganUsahaIstri.trim() === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Keterangan Usaha Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}

				if (txtPendapatanSuamiIstri === '') {
					Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.Msg.WARNING,
					msg: 'Field Pendapatan Pasangan Masih kosong!',
					title: 'MFAS'
					});
					return;
				}	

				Ext.Ajax.request({
				method: 'POST',
				url: 'konsumen/CekSimpan',
				params: {
				'fn_no_batch': '',
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1').getValue(),
				'fs_ktp_konsumen': Ext.getCmp('txtNoKtp').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaKonsumen').getValue(),
				'fs_status_kawin': Ext.getCmp('cboStatusKawin').getValue(),
				'fs_tenor': Ext.getCmp('txtTenor').getValue(),
				'fs_jenis': Ext.getCmp('cboJenis').getValue(),
				'fs_jenis_kelamin': Ext.getCmp('cboJenKel').getValue(),
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
							title: 'MFAS'
						});
					}
					else {
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'MFAS',
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
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});



			} else {

				Ext.Ajax.request({
				method: 'POST',
				url: 'konsumen/CekSimpan',
				params: {
				'fn_no_batch': '',
				'fs_kode_lokasi': Ext.getCmp('txtLembagaKeuangan1').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtLembagaKeuangan2').getValue(),
				'fs_ktp_konsumen': Ext.getCmp('txtNoKtp').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPola').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaKonsumen').getValue(),
				'fs_status_kawin': Ext.getCmp('cboStatusKawin').getValue(),
				'fs_tenor': Ext.getCmp('txtTenor').getValue(),
				'fs_jenis': Ext.getCmp('cboJenis').getValue(),
				'fs_jenis_kelamin': Ext.getCmp('cboJenKel').getValue(),
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
							title: 'MFAS'
						});
					}
					else {
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'MFAS',
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
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});

			}
			
		}
	}

	function fnSimpan() {
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);


													//LuxTax();

													   document.getElementById('total_trx').value=0;

													PremiGross();


												    Perluasan();

												    BiayaTJH();

												      PremiNett();

												    var checktjh = Ext.getCmp('checktjh').getValue();
													
													var premi = Ext.getCmp('txtPremiGros').getValue();
													
													var perluasan = Ext.getCmp('txtPerluasan').getValue();

													if(checktjh==true){

														
												 	 var tjh = Ext.getCmp('txtBiayaTjH').getValue();	
													  	
													}else {
														 var tjh=0;
													}

													 var totalz = parseInt(tjh) + parseInt(premi) + parseInt(perluasan) + 25000;


													 Ext.getCmp('txtPremiGrosFix').setValue(totalz);

												  

												   var newValue = Ext.getCmp('txtUangMuka').getValue();

													 var dps = Ext.getCmp('txtTotalDp').getValue();
														var admins = Ext.getCmp('txtBiayaAdm').getValue();
														var premis = Ext.getCmp('txtPremiGros').getValue();
														var dimukas = Ext.getCmp('txtAngsuranDimuka').getValue();
														var grosfixs = totalz;
														var totaltranss = Ext.getCmp('txtTotalTrans').getValue();
														
														
														//var xtotal = dps - admins - grosfixs - dimukas - totaltranss;
														//if (xtotal > 0) {
												    	//Ext.getCmp('txtUangMuka').setValue(xtotal);
												    	Ext.getCmp('txtUangMuka2').setValue(newValue);
														Ext.getCmp('txtUangMukaDealerp').setValue(newValue);
														Ext.getCmp('txtUangMukaKonsumenp').setValue(newValue);

														//document.getElementById("total_trx").value='0';
														//}
														//else {
														/*
														xtotals =  xtotal *(-1);		
														Ext.getCmp('txtUangMuka').setValue(xtotals);
														Ext.getCmp('txtUangMuka2').setValue(newValue);
														Ext.getCmp('txtUangMukaDealerp').setValue(newValue);
														Ext.getCmp('txtUangMukaKonsumenp').setValue(xtotals);

														//document.getElementById("total_trx").value='0';
														}
														*/

												    var total = newValue;
												    Ext.getCmp('txtUangMukaKonsumenp').setValue(total);
													Ext.getCmp('txtUangMukaDealerp').setValue(total);


													var uangmukax = Ext.getCmp('txtUangMuka2').getValue();
													
													var totaltrans = Ext.getCmp('txtTotalTrans').getValue();
													var totalDP = Ext.getCmp('txtTotalDp').getValue();
													var biayaadmin = Ext.getCmp('txtBiayaAdm').getValue();
													var premigross = Ext.getCmp('txtPremiGros').getValue();
													var preminet = Ext.getCmp('txtPremiNet').getValue();
													var dimuka = Ext.getCmp('txtAngsuranDimuka').getValue();
													//var uangmuka = Ext.getCmp('txtUangMuka').getValue();
													//var pokok = Ext.getCmp('txtPokokPembiayaanDealer').getValue();
													var grosfix = totalz;

													//alert(totaltrans);
													var hasil = totalDP - biayaadmin - grosfix- dimuka - totaltrans - total;
													var hasil2 = totalDP - biayaadmin - grosfix - dimuka - totaltrans;
													function format1(n) {
											 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
													}
													var fix = format1(hasil);
													var fix2 = format1(hasil2);
													
													if(total>=uangmukax){

														if(fix>0){
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

														 document.getElementById("total_trx").value=fix;
														}

														else {
															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fixed2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fixed2);
															var fixed = fix;
														 
															document.getElementById("total_trx").value=fix;
														}

													}
													else {

														if(fix>0){

															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);

															document.getElementById("total_trx").value=fix;
														}

														else {


															//alert(fixx);
															var fixx2 = hasil * (-1);
															

															var fixed2 = format1(fixx2);
															
															//Ext.getCmp('txtUangMuka').setValue(fix2);
															Ext.getCmp('txtAsuransiDealer').setValue(fix);
															Ext.getCmp('txtAsuransiKonsumen').setValue(fix);
															var fixed = fix;
														 
															document.getElementById("total_trx").value=fix;
														}
														
													}

												    pokokpembiayaan();
												    bunga();
												    bungaFlat();

													var totalDP2 = Ext.getCmp('txtTotalDp').getValue();
													var totaltranscair2 = Ext.getCmp('txtTotalTrans2').getValue();
															var biayaadmin2 = Ext.getCmp('txtBiayaAdm').getValue();
															var premigross2 = Ext.getCmp('txtPremiGros').getValue();
															var preminet2 = Ext.getCmp('txtPremiNet').getValue();
															var dimuka2 = Ext.getCmp('txtAngsuranDimuka').getValue();
															var uangmuka2 = Ext.getCmp('txtUangMuka').getValue();
															var pokok2 = Ext.getCmp('txtPokokPembiayaanDealer').getValue();


															if(totaltranscair2>0){

																var totalsss = totaltranscair2;

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) + parseInt(totalsss);

															}
															else {

																var totalsss = totaltranscair2 * (-1);

																var hasil3 = parseInt(pokok2) - parseInt(biayaadmin2) -
															 parseInt(dimuka2) - parseInt(preminet2) - parseInt(totalsss);

															}
															
															function format1(n) {
													 		   return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
															}
															
															var fix4 = format1(hasil3);

															if(hasil3 > 0){

																var fixa = format1(hasil3);
																Ext.getCmp('txtNilaiCair').setValue(fixa);
																Ext.getCmp('txtNilaiCair3').setValue(fixa);
																
															// document.getElementById("total_trx2").value=fix2;

															}

															else {
																var fixx22 = hasil3 * (-1);
																

																var fixed22 = format1(fixx22);
															 	
															 	//alert(fixed2);
															 	 Ext.getCmp('txtNilaiCair').setValue(fixed22);
															 	 Ext.getCmp('txtNilaiCair3').setValue(fixed22);
																//document.getElementById("total_trx2").value=fixed2;
															}
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


			var xtahun = '';
			var xjenisperluasan = '';
			var xtenor = '';
			

			var store = gridPerluasan.getStore();
			store.each(function(record, idx) {
				xtahun = xtahun +'|'+ record.get('fs_tenor_perluasan');
				xjenisperluasan = xjenisperluasan +'|'+ record.get('fs_nama_perluasan');
				xtenor = xtenor +'|'+ record.get('fs_tenor');
				
			});


		
		Ext.Ajax.request({
			method: 'POST',
			url: 'konsumen/Simpan',
			params: {
				'fs_tahun_ke': xtahun,
				'fs_tenor': xtenor,
				'fs_jenis_perluasan': xjenisperluasan,
				'fs_kode_transaksi': xkodetrans,
			    'fs_nama_transaksi': xnamatrans,
			    'fs_persentase': xpersentase,
				'fs_nilai_transaksi': xnilaitransaksi,
				'fs_termasuk_dp': xditagihkonsumen,
				'fs_tambah_cair': xcairdelaer,
				'fd_tgl_apk': Ext.Date.format(Ext.getCmp('txtRefnodt').getValue(), 'Y-m-d'),
				'fs_jenis_pembiayaan': Ext.getCmp('cboJenis').getValue(),
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
				'fd_tanggal_perjanjian': Ext.Date.format(Ext.getCmp('txtTglCair').getValue(), 'Y-m-d'),
				'fd_tanggal_lahir': Ext.getCmp('txtUserDatebirth').getValue(),
				'fd_tanggal_lahir_konsumen': Ext.Date.format(Ext.getCmp('txtUserDatebirth').getValue(), 'Y-m-d') ,
				'fs_pendidikan_konsumen': Ext.getCmp('txtKodePendidikan').getValue(),
				'fn_biaya_konsumen': Ext.getCmp('txtBiayaBulan').getValue(),
				'fs_nama_ibu_kandung': Ext.getCmp('txtIbuKandung').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJenisPiu').getValue(),
				'fs_status_konsumen': Ext.getCmp('txtStatusKawin').getValue(),
				'fn_tanggungan_konsumen': Ext.getCmp('txtTanggungan').getValue(),
				'fs_status_rumah': Ext.getCmp('txtStatusRumah').getValue(),
				'fs_tinggal_sejak1': Ext.getCmp('txtTinggalSejak').getValue(),
				'fs_tinggal_sejak2': Ext.getCmp('txtTinggalSejakTahun').getValue(),
				'fs_alamat_korespondensi': Ext.getCmp('txtAlamatSurat').getValue(),
				'fs_kota_korespondensi': Ext.getCmp('txtKabupatenKotaKonsumen').getValue(),
				'fs_kodepos_korespondensi': Ext.getCmp('cboKodePos2').getValue(),
				'fs_pertama_kali_kredit': Ext.getCmp('cboFirstTime').getValue(),
				'fn_jumlah_kali_kredit': Ext.getCmp('txtKe').getValue(),
				'fs_kode_kendaraan': Ext.getCmp('txtKodeKendaraan').getValue(),
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
				'fn_piutang_dealer': Ext.getCmp('txtPiutangDealer').getValue(),
				'fn_piutang_konsumen': Ext.getCmp('txtPiutangKonsumen').getValue(),
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
				'fs_keterangan_usaha_pasangan ': Ext.getCmp('txtKeteranganUsahaIstri').getValue(),
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
				'fs_skala_perusahaan_konsumen': Ext.getCmp('txtKodeSkalaPerusahaan').getValue(),
				'fd_tanggal_buat': Ext.Date.format(new Date(), 'Y-m-d')
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				
				if (xtext.sukses === true) {


					Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xtext.hasil,
								title: 'MFAS',
								fn: function(btn) {
									if (btn == 'yes') {
										//fnReset();

										var noapk = xtext.fn_no_apk_cetak;

										Ext.Ajax.request({
										method: 'POST',
										url: 'analisa/print',
										params: {
											'fn_no_apk': xtext.fn_no_apk_cetak,
											'fs_jenis_pembiayaan': xtext.fs_jenis_pembiayaan_cetak
										},
										success: function(response) {
											var xtext2 = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												msg: xtext.hasil,
												title: 'MFAS'
											});

											var url = xtext2.url;
											var title = xtext2.title;
											if (xtext.sukses === true) {
												var popUp = Ext.create('Ext.window.Window', {
													closable: false,
								                    height: 650,
								                    modal: true, 
								                    width: 950,
								                    layout:'anchor',
								                    title: title,
								                    buttons: [{
														text: 'Close',
														handler: function() {
															vMask.hide();

															//var win = window;
															//win.document.write('<iframe id="tes" height="450" width="942" src="'+ url + noapk +'"></iframe>');
															
															//win.print();
															//win.close();
															//win.destroy();
															popUp.hide();

															window.location.href = 'apknew';
														}
													}]
							                	});

							                	popUp.add({html: '<iframe height="650" width="942" src="'+ url + noapk +'"></iframe>'});
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
												title: 'MFAS'
											});
											fnMaskHide();
										}
									});
										//window.location.href = 'apknew';
										
										fnMaskHide();
									}
								}
							});
					
					//alert(xtext.total_trans2);

					
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
					title: 'MFAS'
				});
				fnMaskHide();
				vMask.hide();
			}
		});
	}


	function fnResetTrans() {
		
		grupKodeTrans2.removeAll();
		gridKode.getView().refresh();
	}

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmApkKonsumen
	});
	
	function fnMaskShow() {
		frmApkKonsumen.mask('Please wait...');
	}

	function fnMaskHide() {
		frmApkKonsumen.unmask();
	}
	
	frmApkKonsumen.render(Ext.getBody());

	}


	Ext.Ajax.request({
		method: 'POST',
		url: 'konsumen/nilaidefa',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			
			if (xtext.sukses === true) {
				buatForm();
				
				//Ext.getCmp('txtNoApk').setValue(xtext.no_apk);
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
