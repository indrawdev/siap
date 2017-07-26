<?php

class Badan_usaha extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		//change db
		//$this->mMainModul->change_db($this->session->userdata('gServer'),$this->session->userdata('gDatabase'));
		//eof change db
	}
	


	function index()
	{
		$this->load->view('vapkbadanusaha');
	}

	function delete_pengurus()
	{

		$kode_cabang = trim($this->input->post('kode_cabang'));
		$no_apk = trim($this->input->post('apk_pengurus'));
		$kode_jabatan = trim($this->input->post('kode_jabatan'));
		$nama = trim($this->input->post('nama'));

		//echo $nama;die;
		$this->db->where('fs_kode_cabang',$kode_cabang)->where('fn_no_apk',$no_apk)->where('fs_kode_jabatan',$kode_jabatan)
		->where('fs_nama_pengurus',$nama)->delete('tx_apk_pengurus');

		$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Delete Success!'
		);
		echo json_encode($xHasil);
		
	}

	function CekSimpan()
	{

		$jenis_pembiayaan = trim($this->input->post('fs_jenis_pembiayaan'));
		$kodelokasi = trim($this->input->post('fs_kode_lokasi'));
		$nomordealer = trim($this->input->post('fs_nomor_dealer'));
		$jenispiutang = trim($this->input->post('fs_jenis_piutang'));
		$polatrans = trim($this->input->post('fs_pola_transaksi'));
		$nama = trim($this->input->post('fs_nama_badan_usaha'));
	
  		//$umurboleh = date('Y-m-d') - $umur;
		//echo $umurboleh;die;
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
		$no_apk = '';
		$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','APK')->from('tm_counter')->get()->row();
		if($rowApk){
		$no_apk = $rowApk->fn_counter+1;
		}

		$no_pjj = '';
		$rowPjj = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','PJJ')->where('fs_no_jenis_counter',$polatrans)->from('tm_counter')->get()->row();
		if($rowPjj){
		$no_pjj = $rowPjj->fn_counter+1;
		}

		$xupdate = false;

		if (trim($no_apk) <> '')
		{
			$this->load->model('mSearch');
			$sSQL = $this->mSearch->cekAPK($no_apk,$kode_cabang);

			$no_pjj_fix = $kodelokasi.''.$nomordealer.''.$jenispiutang.''.$polatrans.''.$no_pjj;



				if($sSQL->num_rows()==''){
				

					$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Konfirmasi Penyimpanan<br>NO APK : '.$no_apk.'<br>NO PJJ : '.$no_pjj_fix.'<br>NAMA BADAN USAHA : '.$nama.''
				);
				echo json_encode($xHasil);
					
				}
				else {

						$xHasil = array(
						'sukses'	=> false,
						'hasil'		=> 'NO APK sudah ada!'
					);
					echo json_encode($xHasil);
				}

			
			
		
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, APK tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}


	function Simpan()
	{				


				$pola_trans = trim($this->input->post('fs_pola_transaksi'));

				$kode_cabang = trim($this->session->userdata('gKodeCabang'));
				$no_apk = '';
				$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','APK')->from('tm_counter')->get()->row();
				if($rowApk){
				$no_apk = $rowApk->fn_counter+1;
				}

				$no_pjj = '';
				$rowPjj = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','PJJ')->where('fs_no_jenis_counter',$pola_trans)->from('tm_counter')->get()->row();
				if($rowPjj){
				$no_pjj = $rowPjj->fn_counter+1;
				}

				$tgl_apk = trim($this->input->post('fd_tgl_apk'));
				$tgl_perjanjian = trim($this->input->post('fd_tanggal_perjanjian'));

				$jenis_pembiayaan = trim($this->input->post('fs_jenis_pembiayaan'));
				$kode_lokasi = trim($this->input->post('fs_kode_lokasi'));
				$nomor_dealer = trim($this->input->post('fs_nomor_dealer'));
				$jenis_piutang = trim($this->input->post('fs_jenis_piutang'));
				
				$no_pjj_fix = $kode_lokasi.''.$nomor_dealer.''.$jenis_piutang.''.$pola_trans.''.$no_pjj;
				
				$kode_paket = trim($this->input->post('fs_kode_paket'));
				$fleet = trim($this->input->post('fs_fleet'));
				$nama_konsumen = trim($this->input->post('fs_nama_konsumen'));
				$alamat_konsumen = trim($this->input->post('fs_alamat_konsumen'));
				$kelurahan_konsumen = trim($this->input->post('fs_kelurahan_konsumen'));
				$kecamatan_konsumen = trim($this->input->post('fs_kecamatan_konsumen'));
				$telfon_usaha_konsumen = trim($this->input->post('fs_telfon_usaha_konsumen'));
				$kode_dati_konsumen = trim($this->input->post('fs_kode_dati_konsumen'));
				$propinsi_konsumen = trim($this->input->post('fs_propinsi_konsumen'));
				$kota_konsumen = trim($this->input->post('fs_kota_konsumen'));
				$kode_pos_konsumen = trim($this->input->post('fs_kodepos_konsumen'));
				$ktp_konsumen = trim($this->input->post('fs_ktp_konsumen'));
				$masa_ktp_konsumen = trim($this->input->post('fs_masa_ktp_konsumen'));
				$kartu_keluarga = trim($this->input->post('fs_kartu_keluarga'));
				$telepon_konsumen = trim($this->input->post('fs_telepon_konsumen'));
				$group_perusahaan = trim($this->input->post('fs_group_perusahaan'));
				$email_konsumen = trim($this->input->post('fs_email_konsumen'));
				$npwp = $this->input->post('fs_npwp_konsumen');
				$siup_perusahaan = $this->input->post('fs_siup_perusahaan');
				$tdp_perusahaan = $this->input->post('fs_tdp_perusahaan');

				$bentuk_perusahaan = $this->input->post('fs_bentuk_perusahaan');
				$status_perusahaan = $this->input->post('fs_status_perusahaan');
				$tempat_perusahaan = $this->input->post('fs_tempat_perusahaan');
				$beroperasi_sejak = $this->input->post('fs_beroperasi_sejak');
				$kategori_perusahaan_konsumen = $this->input->post('fs_kategori_perusahaan_konsumen');
				$kategori_usaha_konsumen = $this->input->post('fs_kategori_usaha_konsumen');
				$keterangan_usaha_konsumen = $this->input->post('fs_keterangan_usaha_konsumen');
				$jumlah_karyawan_perusahaan = $this->input->post('fn_jumlah_karyawan_perusahaan');
				$pendapatan_konsumen = $this->input->post('fn_pendapatan_konsumen');
				$biaya_konsumen = $this->input->post('fn_biaya_konsumen');
				$mutasi_debet = $this->input->post('fn_mutasi_debet');
				$mutasi_kredit = $this->input->post('fn_mutasi_kredit');

				$alamat_korespondensi = $this->input->post('fs_alamat_korespondensi');
				$kota_korespondensi = $this->input->post('fs_kota_korespondensi');
				$kodepos_korespondensi = $this->input->post('fs_kodepos_korespondensi');
				$penanggungjawab_perusahaan = $this->input->post('fs_penanggungjawab_perusahaan');
				$ktp_penanggungjawab_perusahaan = $this->input->post('fs_ktp_penanggungjawab_perusahaan');
				$npwp_penanggungjawab_perusahaan = $this->input->post('fs_npwp_penanggungjawab_perusahaan');
				$alamat_penanggungjawab_perusahaan = $this->input->post('fs_alamat_penanggungjawab_perusahaan');
				$kota_penanggungjawab_perusahaan = $this->input->post('fs_kota_penanggungjawab_perusahaan');
				$kodepos_penanggungjawab_perusahaan = $this->input->post('fs_kodepos_penanggungjawab_perusahaan');
				$jabatan_penanggungjawab_perusahaan = $this->input->post('fs_jabatan_penanggungjawab_perusahaan');
				$telepon_penanggungjawab_perusahaan = $this->input->post('fs_telepon_penanggungjawab_perusahaan');
				$handphone_penanggungjawab_perusahaan = $this->input->post('fs_handphone_penanggungjawab_perusahaan');
				$repeat_order = $this->input->post('fs_repeat_order');
				$repeat_order_ke = $this->input->post('fs_repeat_order_ke');
				
				$alamat_korespondensi = trim($this->input->post('fs_alamat_korespondensi'));
				$kota_korespondensi = trim($this->input->post('fs_kota_korespondensi'));
				$kode_pos_korespondensi = trim($this->input->post('fs_kodepos_korespondensi'));

				$kode_kendaraan = trim($this->input->post('fs_kode_kendaraan'));
				$jenis_kendaraan = trim($this->input->post('fs_jenis_kendaraan'));
				$silinder_kendaraan = trim($this->input->post('fs_silinder_kendaraan'));
				$tahun_kendaraan = trim($this->input->post('fn_tahun_kendaraan'));
				$warna_kendaraaan = trim($this->input->post('fs_warna_kendaraan'));
				$warna_kendaraaan = strtoupper($warna_kendaraaan);
				$no_rangka = trim($this->input->post('fs_no_rangka'));
				$no_mesin = trim($this->input->post('fs_no_mesin'));
				$komersial = trim($this->input->post('fs_komersial'));
				$nama_bpkb = trim($this->input->post('fs_nama_bpkb'));
				$alamat_bpkb = trim($this->input->post('fs_alamat_bpkb'));
				$nomor_bpkb = trim($this->input->post('fs_nomor_bpkb'));
				$kode_wilayah_polisi = trim($this->input->post('fs_kode_wilayah_no_polisi'));
				$no_polisi = trim($this->input->post('fs_no_polisi'));
				$kode_akhir_wilayah_polisi = trim($this->input->post('fs_kode_akhir_wilayah_no_polisi'));
				$kota_bpkb = trim($this->input->post('fs_kota_bpkb'));
				$jenis_asuransi = trim($this->input->post('fs_jenis_asuransi'));
				$kode_asuransi1 = trim($this->input->post('fs_kode_asuransi1'));
				$kode_asuransi2 = trim($this->input->post('fs_kode_asuransi2'));
				$sales = trim($this->input->post('fs_salesman'));
				$kode_dealer1 = trim($this->input->post('fs_kode_dealer1'));
				$kode_dealer2 = trim($this->input->post('fs_kode_dealer2'));
				$cabang_dealer = trim($this->input->post('fn_cabang_dealer'));
				$pola_angsuran = trim($this->input->post('fs_pola_angsuran'));
				$cara_bayar = trim($this->input->post('fs_cara_bayar'));
				$angsuran_dimuka = trim($this->input->post('fs_angsuran_dimuka'));
				$kali_angsuran_dimuka = trim($this->input->post('fn_kali_angsuran_dimuka'));
				$jumlah_angsuran_dimuka = trim($this->input->post('fn_jumlah_angsuran_dimuka'));
				$angsuran_dimuka_potong_pencairan = trim($this->input->post('fs_angsuran_dimuka_potong_pencairan'));
				$angsuran_dibayar_dealer = trim($this->input->post('fs_angsuran_dibayar_dealer'));
				$biaya_adm = trim($this->input->post('fn_biaya_adm'));
				$biaya_tjh = trim($this->input->post('fn_biaya_tjh'));
				$dp_bayar = trim($this->input->post('fn_dp_bayar'));
				$selisih_dp = trim($this->input->post('fn_selisih_dp'));
				$pokok_pembiayaan_dealer = trim($this->input->post('fn_pokok_pembiayaan_dealer'));
				$pokok_pembiayaan_konsumen = trim($this->input->post('fn_pokok_pembiayaan_konsumen'));
				$premi_asuransi_gross_perluasan = trim($this->input->post('fn_premi_asuransi_gross_perluasan'));
				$premi_asuransi = trim($this->input->post('fn_premi_asuransi'));
				$premi_asuransi_gross = trim($this->input->post('fn_premi_asuransi_gross'));
				$premi_asuransi_netto = trim($this->input->post('fn_premi_asuransi_netto'));
				$harga_otr = trim($this->input->post('fn_harga_otr'));
				$piutang_dealer = trim($this->input->post('fn_piutang_dealer'));
				$piutang_konsumen = trim($this->input->post('fn_piutang_konsumen'));
				$uang_muka_dealer = trim($this->input->post('fn_uang_muka_dealer'));
				$asuransi_dikredit_dealer = trim($this->input->post('fn_asuransi_dikredit_dealer'));
				$persen_bunga_flat_dealer = trim($this->input->post('fn_persen_bunga_flat_dealer'));
				$persen_bunga_efektif_dealer = trim($this->input->post('fn_persen_bunga_efektif_dealer'));
				$bulan_masa_angsuran_dealer = trim($this->input->post('fn_bulan_masa_angsuran_dealer'));
				$kali_masa_angsuran_dealer = trim($this->input->post('fn_kali_masa_angsuran_dealer'));
				$bunga_dealer = trim($this->input->post('fn_bunga_dealer'));
				$angsuran_dealer = trim($this->input->post('fn_angsuran_dealer'));
				$uang_muka_konsumen = trim($this->input->post('fn_uang_muka_konsumen'));
				$asuransi_dikredit_konsumen = trim($this->input->post('fn_asuransi_dikredit_konsumen'));
				$persen_bunga_flat_konsumen = trim($this->input->post('fn_persen_bunga_flat_konsumen'));
				$persen_bunga_efektif_konsumen = trim($this->input->post('fn_persen_bunga_efektif_konsumen'));
				$bulan_masa_angsuran_konsumen = trim($this->input->post('fn_bulan_masa_angsuran_konsumen'));
				$kali_masa_angsuran_konsumen = trim($this->input->post('fn_kali_masa_angsuran_konsumen'));
				$bunga_konsumen = trim($this->input->post('fn_bunga_konsumen'));
				$angsuran_konsumen = trim($this->input->post('fn_angsuran_konsumen'));
				$tanggal_angsuran_pertama = trim($this->input->post('fd_tanggal_angsuran_pertama'));
				$tanggal_jatuhtempo_perbulan = trim($this->input->post('fn_tanggal_jatuhtempo_perbulan'));

				$cair_ke = trim($this->input->post('fs_cair_ke'));
				if($cair_ke='DEALER'){
					$cair_ke = 'D';
				}
				$uang_muka_bayar_di = trim($this->input->post('fs_uang_muka_bayar_di'));
				if($uang_muka_bayar_di='DEALER'){
					$uang_muka_bayar_di = 'D';
				}
				$deposit_potong_pencairan = trim($this->input->post('fs_deposit_potong_pencairan'));
				if($deposit_potong_pencairan='YA'){
					$deposit_potong_pencairan = 'Y';
				}
				//$deposit_potong_pencairan = trim($this->input->post('fs_deposit_potong_pencairan'));
				$atasnama_bank_pencairan = trim($this->input->post('fs_atasnama_bank_pencairan'));
				$nama_bank_pencairan = trim($this->input->post('fs_nama_bank_pencairan'));
				$rekening_bank_pencairan = trim($this->input->post('fs_rekening_bank_pencairan'));
				$nilai_pencairan = trim($this->input->post('fn_nilai_pencairan'));
				$tanggal_buat = trim($this->input->post('fd_tanggal_buat'));
				$uangmuka1 = trim($this->input->post('fs_uangmuka1'));
		$xupdate = false;
		



  		$kodetrans = explode('|', trim($this->input->post('fs_kode_transaksi')));
		$namatrans = explode('|', trim($this->input->post('fs_nama_transaksi')));
		$persentase = explode('|', trim($this->input->post('fs_persentase')));
		$nilaitrans = explode('|', trim($this->input->post('fs_nilai_transaksi')));
		$ditagihkonsumen = explode('|', trim($this->input->post('fs_termasuk_dp')));
		$cairdealer = explode('|', trim($this->input->post('fs_tambah_cair')));
		
		$xupdate = false;
		$total_trans = 0;
		$total_cairminus = 0;
		$total_cairplus = 0;
		$jml = count($kodetrans) - 1;
		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{


				
				$data = array(
					'fs_kode_cabang'		=> trim($kode_cabang),
					'fn_no_apk'		=> trim($no_apk),
					'fs_nama_transaksi'		=> trim($namatrans[$i]),
					'fs_kode_transaksi'	=> trim($kodetrans[$i]),
					'fn_nilai_transaksi'	=> trim($nilaitrans[$i]),
					'fs_persentase_nilai_transaksi'	=> trim($persentase[$i]),
					'fs_tagih_ke_konsumen'	=> trim($ditagihkonsumen[$i]),
					'fs_cair_ke_dealer'	=> trim($cairdealer[$i])
				);

				if($ditagihkonsumen[$i]=='Y'){

					$total_trans +=  $nilaitrans[$i];

					//echo $total_trans;
					//echo $nilaitrans[$i];
				}

				if($cairdealer[$i]!='0'){


					if($cairdealer[$i]!='-'){

					$total_cairminus +=  $nilaitrans[$i];

					}
					
					if($cairdealer[$i]!='+'){

					
					$total_cairplus +=  $nilaitrans[$i];


					}

					//echo $total_trans;
					//echo $nilaitrans[$i];
				}


				
				$this->db->insert('tx_apk_detailtransaksi', $data);
			}
		}


		$tahun = explode('|', trim($this->input->post('fs_tahun_ke')));
		$tenor = explode('|', trim($this->input->post('fs_tenor')));
		$jenis_perluasan = explode('|', trim($this->input->post('fs_jenis_perluasan')));
		//var_dump($jenis_perluasan);die;
		$xupdate = false;
		$total_trans = 0;
		$total_cairminus = 0;
		$total_cairplus = 0;
		$jml = count($tahun) - 1;

		if($no_apk!=''){


		if ($jml != 0)
		{
			
			$this->db->where('fn_no_apk',$no_apk)->delete('tx_apk_perluasan');
			for ($i=1; $i<=$jml; $i++)
			{

			//echo $jenis_perluasan[$i];die;

			$data = array(
					'fs_kode_cabang' => trim($kode_cabang),
					'fn_no_apk'	=> trim($no_apk),
					'fn_tahun_ke' => trim($tahun[$i]),
					'fs_jenis_perluasan' => trim($jenis_perluasan[$i])
				);


				
				$this->db->insert('tx_apk_perluasan', $data);

				$xupdate = true;
			}
		}


		} else {

		if ($jml != 0)
		{

			$this->db->where('fn_no_apk',$no_apk)->delete('tx_apk_perluasan');

			for ($i=1; $i<=$jml; $i++)
			{


				

				$data = array(
					'fs_kode_cabang' => trim($kode_cabang),
					'fn_no_apk'	=> trim($no_apk),
					'fn_tahun_ke'		=> trim($tahun[$i]),
					'fs_jenis_perluasan'	=> trim($jenis_perluasan[$i])
				);


				
				$this->db->insert('tx_apk_perluasan', $data);
			}
		}

		}

		if (trim($no_apk) <> '')
		{
			
				$data = array(
				'fs_kode_cabang' => $kode_cabang,
				'fn_no_apk' => $no_apk,
				'fn_nomor_perjanjian' => $no_pjj,
				'fd_tgl_apk'=> $tgl_apk,
				'fs_jenis_pembiayaan' => $jenis_pembiayaan,
				'fs_kode_lokasi'=> $kode_lokasi,
				'fs_nomor_dealer' => $nomor_dealer,
				'fs_jenis_piutang' => $jenis_piutang,
				'fs_pola_transaksi' => $pola_trans,
				'fs_kode_paket' => $kode_paket,
				'fs_fleet' => $fleet,
				'fs_nama_konsumen' => $nama_konsumen,
				'fs_alamat_konsumen' => $alamat_konsumen,
				'fs_kelurahan_konsumen' => $kelurahan_konsumen,
				'fs_kecamatan_konsumen' => $kecamatan_konsumen,
				'fs_kode_dati_konsumen' => $kode_dati_konsumen,
				'fs_propinsi_konsumen' => $propinsi_konsumen,
				'fs_kota_konsumen' => $kota_konsumen,
				'fs_kodepos_konsumen' => $kode_pos_konsumen,
				'fs_ktp_konsumen' => '',
				'fs_masa_ktp_konsumen' => '',
				'fs_kartu_keluarga' => '',
				'fs_telepon_konsumen' => $telepon_konsumen,
				'fs_handphone_konsumen' => '',
				'fs_email_konsumen' => $email_konsumen,
				'fs_group_perusahaan' => $group_perusahaan,
				'fs_npwp_konsumen' => $npwp,
				'fs_siup_perusahaan' => $siup_perusahaan,
				'fs_tdp_perusahaan' => $tdp_perusahaan,
				'fs_nama_perusahaan_konsumen' => '', 
				'fs_bentuk_perusahaan' => $bentuk_perusahaan,
				'fs_status_perusahaan' => $status_perusahaan,
				'fs_tempat_perusahaan' => $tempat_perusahaan,
				'fs_beroperasi_sejak' => $beroperasi_sejak,
				'fs_alamat_usaha_konsumen' => '',
				'fs_telfon_usaha_konsumen' => $telfon_usaha_konsumen,
				'fs_kerja_sejak_konsumen' => '',
				'fs_kategori_usaha_konsumen' => $kategori_usaha_konsumen,
				'fs_keterangan_usaha_konsumen' => $keterangan_usaha_konsumen,
				'fs_kategori_perusahaan_konsumen' => $kategori_perusahaan_konsumen,
				'fs_usaha_pekerjaan_konsumen' => '',
				'fn_pendapatan_konsumen	' => $pendapatan_konsumen,
				'fs_jenis_kelamin_konsumen' => '',
				'fs_agama_konsumen' => '',
				'fs_tempat_lahir_konsumen' => '',
				'fd_tanggal_lahir_konsumen' => '',
				'fs_pendidikan_konsumen' => '',
				'fn_biaya_konsumen' => $biaya_konsumen,
				'fs_nama_ibu_kandung' =>  '',
				'fs_jenis_piutang' =>  $jenis_piutang,
				'fs_status_konsumen' =>  '',
				'fn_tanggungan_konsumen' =>  '',
				'fn_jumlah_karyawan_perusahaan' =>  $jumlah_karyawan_perusahaan,
				'fs_status_rumah' => '',
				'fs_tinggal_sejak' => '',
				'fs_alamat_korespondensi' => $alamat_korespondensi,
				'fs_kota_korespondensi' => $kota_korespondensi,
				'fs_kodepos_korespondensi' => $kode_pos_korespondensi,
				'fs_pertama_kali_kredit' => '',
				'fn_jumlah_kali_kredit'=> '',
				'fn_mutasi_debet' => $mutasi_debet,
				'fn_mutasi_kredit' => $mutasi_kredit,
				'fs_penanggungjawab_perusahaan' => $penanggungjawab_perusahaan,
				'fs_ktp_penanggungjawab_perusahaan' => $ktp_penanggungjawab_perusahaan,
				'fs_npwp_penanggungjawab_perusahaan' => $npwp_penanggungjawab_perusahaan,
				'fs_alamat_penanggungjawab_perusahaan' => $alamat_penanggungjawab_perusahaan,
				'fs_kota_penanggungjawab_perusahaan' => $kota_penanggungjawab_perusahaan,
				'fs_kodepos_penanggungjawab_perusahaan' => $kodepos_penanggungjawab_perusahaan,
				'fs_jabatan_penanggungjawab_perusahaan' => $jabatan_penanggungjawab_perusahaan,
				'fs_telepon_penanggungjawab_perusahaan' =>  $telepon_penanggungjawab_perusahaan,
				'fs_handphone_penanggungjawab_perusahaan' => $handphone_penanggungjawab_perusahaan,
				'fs_repeat_order' => $repeat_order,
				'fs_repeat_order_ke' => $repeat_order_ke,
				'fs_kode_kendaraan' => $kode_kendaraan,
				'fs_jenis_kendaraan'=> $jenis_kendaraan,
				'fs_silinder_kendaraan' => $silinder_kendaraan,
				'fn_tahun_kendaraan' => $tahun_kendaraan,
				'fs_warna_kendaraan' => $warna_kendaraaan,
				'fs_no_rangka' => $no_rangka,
				'fs_no_mesin' => $no_mesin,
				'fs_komersial' => $komersial,
				'fs_nama_bpkb' => $nama_bpkb,
				'fs_alamat_bpkb' => $alamat_bpkb,
				'fs_nomor_bpkb' => $nomor_bpkb,
				'fs_kode_wilayah_no_polisi' => $kode_wilayah_polisi,
				'fs_no_polisi' => $no_polisi,
				'fs_kode_akhir_wilayah_no_polisi' => $kode_akhir_wilayah_polisi,
				'fs_kota_bpkb' => $kota_bpkb,
				'fs_jenis_asuransi' => $jenis_asuransi,
				'fs_kode_asuransi1' => $kode_asuransi1,
				'fs_kode_asuransi2' => $kode_asuransi2,
				'fs_salesman' => $sales,
				'fs_kode_dealer1' => $kode_dealer1 ,
				'fs_kode_dealer2' => $kode_dealer2,
				'fn_cabang_dealer' => $cabang_dealer,
				'fs_pola_angsuran' => $pola_angsuran,
				'fs_cara_bayar' => $cara_bayar,
				'fs_angsuran_dimuka' => $angsuran_dimuka,
				'fn_kali_angsuran_dimuka' => $kali_angsuran_dimuka,
				'fn_jumlah_angsuran_dimuka' => $jumlah_angsuran_dimuka,
				'fs_angsuran_dimuka_potong_pencairan' => $angsuran_dimuka_potong_pencairan,
				'fs_angsuran_dibayar_dealer' => $angsuran_dibayar_dealer,
				'fn_dp_bayar' => $dp_bayar,
				'fn_biaya_adm' => $biaya_adm,
				'fn_biaya_tjh' => $biaya_tjh,
				'fn_selisih_dp' => $selisih_dp,
				'fn_pokok_pembiayaan_dealer' => $pokok_pembiayaan_dealer,
				'fn_pokok_pembiayaan_konsumen' => $pokok_pembiayaan_konsumen,
				'fn_premi_asuransi_gross' => $premi_asuransi_gross,
				'fn_premi_asuransi' => $premi_asuransi,
				'fn_premi_asuransi_gross_perluasan' => $premi_asuransi_gross_perluasan,
				'fn_premi_asuransi_netto' => $premi_asuransi_netto,
				'fn_denda_perhari' => '',
				'fn_harga_otr' => $harga_otr,
				'fn_piutang_dealer' => $piutang_dealer,
				'fn_piutang_konsumen' => $piutang_konsumen,
				'fn_uang_muka_dealer' => $uang_muka_dealer,
				'fn_asuransi_dikredit_dealer' => $asuransi_dikredit_dealer,
				'fn_persen_bunga_flat_dealer' => $persen_bunga_flat_dealer,
				'fn_persen_bunga_efektif_dealer' => $persen_bunga_efektif_dealer,
				'fn_bulan_masa_angsuran_dealer' => $bulan_masa_angsuran_dealer,
				'fn_kali_masa_angsuran_dealer' => $kali_masa_angsuran_dealer,
				'fn_bunga_dealer' => $bunga_dealer,
				'fn_angsuran_dealer' => $angsuran_dealer,
				'fn_angsuran_tidak_sama_dealer' => '',
				'fn_uang_muka_konsumen' => $uang_muka_konsumen,
				'fn_asuransi_dikredit_konsumen' => $asuransi_dikredit_konsumen,
				'fn_persen_bunga_flat_konsumen' => $persen_bunga_flat_konsumen,
				'fn_persen_bunga_efektif_konsumen' => $persen_bunga_efektif_konsumen,
				'fn_bulan_masa_angsuran_konsumen' => $bulan_masa_angsuran_konsumen,
				'fn_kali_masa_angsuran_konsumen' => $kali_masa_angsuran_konsumen,
				'fn_bunga_konsumen' => $bunga_konsumen,
				'fn_angsuran_konsumen' => $angsuran_konsumen,
				'fn_angsuran_tidak_sama_konsumen' => '',
				'fs_nama_pasangan' => '',
				'fs_handphone_pasangan'=> '',
				'fs_usaha_pasangan' => '',
				'fs_keterangan_usaha_pasangan ' => '',
				'fs_alamat_usaha_pasangan' => '',
				'fs_telepon_usaha_pasangan' => '',
				'fn_pendapatan_pasangan' => '',
				'fs_nama_penjamin' => '',
				'fs_alamat_penjamin' => '',
				'fs_kota_penjamin' => '',
				'fs_kodepos_penjamin' => '',
				'fs_telepon_penjamin' => '',
				'fs_usaha_penjamin' => '',
				'fs_keterangan_usaha_penjamin' => '',
				'fs_alamat_usaha_penjamin' => '',
				'fs_telepon_usaha_penjamin' => '',
				'fn_pendapatan_penjamin' => '',
				'fs_status_penjamin' => '',
				'fd_tanggal_perjanjian' => $tgl_perjanjian,
				'fd_tanggal_angsuran_pertama' => $tanggal_angsuran_pertama,
				'fn_tanggal_jatuhtempo_perbulan' => $tanggal_jatuhtempo_perbulan,
				'fs_cair_ke' => $cair_ke,
				'fs_uang_muka_bayar_di' => $uang_muka_bayar_di,
				'fs_deposit_potong_pencairan' => $deposit_potong_pencairan,
				'fs_atasnama_bank_pencairan' => $atasnama_bank_pencairan,
				'fs_nama_bank_pencairan' => $nama_bank_pencairan,
				'fs_rekening_bank_pencairan' => $rekening_bank_pencairan,
				'fn_nilai_pencairan' => $nilai_pencairan,
				'fs_iduser_edit' => '',
				'fd_tanggal_edit' => '',
				'fd_tanggal_survey' => '',
				'fs_petugas_survey' => '',
				'fn_lama_survey' => '',
				'fs_kondisi_lingkungan' =>'',
				'fn_jumlah_kendaraan' => '',
				'fs_garasi' => '',
				'fs_flag_survey' => '0',
				'fs_flag_keputusan' => '0',
				'fs_kondisi_kantor' => '',
				'fs_catatan_tempat_tinggal' => '',
				'fs_catatan_lingkungan' => '',
				'fs_catatan_tempat_usaha' => '',
				'fs_iduser_buat_survey' => '',
				'fd_tanggal_buat_survey' =>'',
				'fs_keputusan_kredit' => '',
				'fs_iduser_buat_keputusan' => '',
				'fd_tanggal_buat_keputusan' => '',
				'fs_score' => '',
				'fs_grade' => '',
				'fs_uang_muka_dealer' => $uangmuka1,
				'umur' => '',
				'fs_iduser_buat'		=> trim($this->session->userdata('gUser')),
				'fd_tanggal_buat'		=> trim(date('Y-m-d H:i:s'))
				);
				$this->db->insert('tx_apk', $data);
			
		}







		//eof simpan detail
		$xData = array(
					'fn_counter'	=> $no_apk
				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fs_jenis_counter = 'APK' ";
			
		$this->db->where($xWhere);
		$this->db->update('tm_counter', $xData);
		
		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'fn_no_apk_cetak'	=> $no_apk,
				'fs_jenis_pembiayaan_cetak'	=> $jenis_pembiayaan,
				'hasil'		=> 'Saving APK Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving APK Success'
			);
			echo json_encode($hasil);
		}
	}

	function savemix()
	{
			
		$tahun = explode('|', trim($this->input->post('fs_tahun_ke')));
		$tenor = explode('|', trim($this->input->post('fs_tenor')));
		$jenis_asuransi = explode('|', trim($this->input->post('fs_jenis_asuransi')));
		
		$xupdate = false;
		$total_trans = 0;
		$total_cairminus = 0;
		$total_cairplus = 0;
		$jml = count($tahun) - 1;

		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
				$no_apk = '';
				$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','APK')->from('tm_counter')->get()->row();
				if($rowApk){
				$no_apk = $rowApk->fn_counter;
				}

		if($no_apk!=''){

			$this->db->where('fn_no_apk',$no_apk)->delete('tx_apk_asuransi');

		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{


			$data = array(
					'fs_kode_cabang' => trim($kode_cabang),
					'fn_no_apk'	=> trim($no_apk),
					'fn_tahun_ke'		=> trim($tahun[$i]),
					'fs_jenis_asuransi'	=> trim($jenis_asuransi[$i])
				);


				
				$this->db->insert('tx_apk_asuransi', $data);

				$xupdate = true;
			}
		}


		} else {

		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{


				

				$data = array(
					'fs_kode_cabang' => trim($kode_cabang),
					'fn_no_apk'	=> trim($no_apk),
					'fn_tahun_ke'		=> trim($tahun[$i]),
					'fs_jenis_asuransi'	=> trim($jenis_asuransi[$i])
				);



				
				$this->db->insert('tx_apk_asuransi', $data);
			}
		}

		}
		
		
		
		if ($xupdate == true)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving MIX asuransi Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Update MIX asuransi Success'
			);
			echo json_encode($hasil);
		}
	}
	function savepengurus()
	{
	
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
		$no_apk = '';
		$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','APK')->from('tm_counter')->get()->row();
		if($rowApk){
		$no_apk = $rowApk->fn_counter+1;
		}

		$kodejabatan = trim($this->input->post('fs_kode_jabatan'));
		$namapengurus = trim($this->input->post('fs_nama_pengurus'));
		$alamatpengurus = trim($this->input->post('fs_alamat_pengurus'));
		$kodepospengurus = trim($this->input->post('fs_kodepos_pengurus'));
		$kotapengurus = trim($this->input->post('fs_kota_pengurus'));
		$ktppengurus = trim($this->input->post('fs_ktp_pengurus'));
		$npwppengurus = trim($this->input->post('fs_npwp_pengurus'));
		$persensaham = trim($this->input->post('fs_persen_saham'));
		$aktif = trim($this->input->post('fs_aktif'));
		
		$xupdate = false;

				$data = array(
					'fs_kode_jabatan'		=> trim($kodejabatan),
					'fs_nama_pengurus'		=> trim($namapengurus),
					'fs_alamat_pengurus'		=> trim($alamatpengurus),
					'fs_kodepos_pengurus'	=> trim($kodepospengurus),
					'fs_kota_pengurus'	=> trim($kotapengurus),
					'fs_ktp_pengurus'	=> trim($ktppengurus),
					'fs_npwp_pengurus'	=> trim($npwppengurus),
					'fs_persen_saham'	=> trim($persensaham),
					'fn_no_apk'	=> trim($no_apk),
					'fs_kode_cabang'	=> trim($kode_cabang),
					'fs_aktif'	=> trim($aktif)
				);

				
		$this->db->insert('tx_apk_pengurus', $data);

		/*$xData = array(
					'fn_counter'	=> $no_apk
				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fs_jenis_counter = 'APK' ";
			
		$this->db->where($xWhere);
		$this->db->update('tm_counter', $xData);
		*/
	

		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Pengurus Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving DO Update Success',
				'refno'		=> $refno
			);
			echo json_encode($hasil);
		}
	}
	

	function cb_jenis()
	{
		$total = '1';
		
		$array = array(
		  1 => array("B",'BADAN USAHA')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_status_usaha()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'CABANG'),
		  2 => array("1",'PERWAKILAN'),
		  3 => array("2",'PUSAT')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_skala_perusahaan()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'BESAR'),
		  2 => array("1",'KECIL'),
		  3 => array("2",'MENENGAH')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_bentuk_usaha()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'CV'),
		  2 => array("1",'FIRMA'),
		  3 => array("2",'LAIN-LAIN'),
		  4 => array("3",'PT')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_status_tempat_usaha()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'MILIK SENDIRI'),
		  2 => array("1",'SEWA')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function listMasterPengurus()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));
		$kode_cabang = $this->session->userdata('gKodeCabang');

		$this->db->query(NOLOCK);
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->listMasterAll($cari,$kode_cabang);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->listMaster($cari,$kode_cabang,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fn_no_apk'		=> ascii_to_entities(trim($xRow->fn_no_apk)),
					'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_kode_jabatan'		=> ascii_to_entities(trim($xRow->fs_kode_jabatan)),
					'fs_nama_pengurus'	=> ascii_to_entities(trim($xRow->fs_nama_pengurus)),
					'fs_alamat_pengurus'	=> ascii_to_entities(trim($xRow->fs_alamat_pengurus)),
					'fs_kodepos_pengurus'	=> ascii_to_entities(trim($xRow->fs_kodepos_pengurus)),
					'fs_kota_pengurus'	=> ascii_to_entities(trim($xRow->fs_kota_pengurus)),
					'fs_ktp_pengurus'	=> ascii_to_entities(trim($xRow->fs_ktp_pengurus)),
					'fs_npwp_pengurus'	=> ascii_to_entities(trim($xRow->fs_npwp_pengurus)),
					'fs_persen_saham'	=> ascii_to_entities(trim($xRow->fs_persen_saham)),
					'fs_aktif'			=> ascii_to_entities(trim($xRow->fs_aktif))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_jabatan()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilJabatanAll($cari,$namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilJabatan($cari,$namakoderef,$nStart,$nLimit);
		$this->db->query(NOLOCK2);



		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nama_referensi'	=> trim($xRow->fs_nama_referensi),
					'fs_nilai1_referensi'	=> trim($xRow->fs_nilai1_referensi),
					'fs_nilai2_referensi'	=> trim($xRow->fs_nilai2_referensi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	
	function acno()
	{
		$nstart = trim($this->input->post('start'));
		$kdacno = trim($this->input->post('fs_kd_acno'));
		$nmacno = trim($this->input->post('fs_nm_acno'));
		
		$this->load->model('mSearch','',true);
		$ssql = $this->mSearch->accgl_acno_all($kdacno,$nmacno);
		$total = $ssql->num_rows();
		
		$ssql = $this->mSearch->accgl_acno($kdacno,$nmacno,$nstart);
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($ssql->result()).'})';
	}
	
	function acno2()
	{
		$nstart = trim($this->input->post('start'));
		$kdacno = trim($this->input->post('fs_kd_acno'));
		$nmacno = trim($this->input->post('fs_nm_acno'));
		
		$this->load->model('mSearch','',true);
		$ssql = $this->mSearch->accgl_acno_all($kdacno,$nmacno);
		$total = $ssql->num_rows();
		
		$ssql = $this->mSearch->accgl_acno2($kdacno,$nmacno,$nstart);
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($ssql->result()).'})';
	}
	
	function cek_show()
	{
		$kddept = trim($this->input->post('fs_kd_dept')).trim($this->input->post('fs_count'));
		$kdacnoa = trim($this->input->post('fs_kd_acnoa'));
		$kdacnob = trim($this->input->post('fs_kd_acnob'));
		$tgla = trim($this->input->post('fd_tgla'));
		$tglb = trim($this->input->post('fd_tglb'));
		
		if (trim($kdacnoa) <> '' and trim($kdacnob) <> '' and trim($tgla) <> '' and trim($tglb) <> '')
		{
			$hasil = array(
				'sukses'	=> true
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> false
			);
			echo json_encode($hasil);
		}
	}
	
	function grid_header()
	{
		$kddept = trim($this->input->post('fs_kd_dept')).trim($this->input->post('fs_count'));
		$kdacnoa = trim($this->input->post('fs_kd_acnoa'));
		$kdacnob = trim($this->input->post('fs_kd_acnob'));
		$tgla = trim($this->input->post('fd_tgla'));
		$tglb = trim($this->input->post('fd_tglb'));
		
		$nstart = trim($this->input->post('start'));
		
		$arr = array();
		if (trim($kdacnoa) <> '' and trim($kdacnob) <> '')
		{
			$this->load->model('mAccGL','',true);
			$ssql = $this->mAccGL->accgl_header_all($kddept,$kdacnoa,$kdacnob,$tgla,$tglb);
			$total = $ssql->num_rows();
			
			$ssql = $this->mAccGL->accgl_header($kddept,$kdacnoa,$kdacnob,$tgla,$tglb,$nstart);
			
			$bal = 0;
			
			if ($ssql->num_rows() > 0)
			{
				foreach ($ssql->result() as $row)
				{
					$bal = $bal + $row->BALANCE;
					$xTgl = trim($row->fd_refno);
					$xTgl = substr($xTgl,6,2).'-'.substr($xTgl,4,2).'-'.substr($xTgl,0,4);
					
					$arr[] = array(
						'fs_kd_dept'	=> trim($row->fs_kd_dept),
						'fs_count'		=> trim($row->fs_count),
						'DEPTNM'		=> trim($row->DEPTNM),
						'ACNO'			=> trim($row->ACNO),
						'ACNM'			=> trim($row->ACNM),
						
						'fs_kd_trx'		=> trim($row->fs_kd_trx),
						'fs_kd_strx'	=> trim($row->fs_kd_strx),
						'fs_refno'		=> trim($row->fs_refno),
						'fd_refno'		=> trim($xTgl),
						'fs_Descrp'		=> trim($row->fs_Descrp),
						
						'fs_acno'		=> trim($row->fs_acno),
						'DEBET'			=> trim($row->DEBET),
						'CREDIT'		=> trim($row->CREDIT),
						'BALANCE1'		=> trim($row->BALANCE),
						'BALANCE'		=> trim($bal)
					);

				}
			}
		}
		echo '({"total":"'.$total.'","hasil":'.json_encode($arr).'})';
	}
	
	function cek_detail()
	{
		$kddept = trim($this->input->post('fs_kd_dept'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdtrx = trim($this->input->post('fs_kd_trx'));
		$kdstrx = trim($this->input->post('fs_kd_strx'));
		$refno = trim($this->input->post('fs_refno'));
		
		if (trim($kddept) <> '' and trim($kdcount) <> '' and trim($kdtrx) <> '' and trim($refno) <> '')
		{
			$hasil = array(
				'sukses'	=> true
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> false
			);
			echo json_encode($hasil);
		}
	}
	
	function grid_detail()
	{
		$kddept = trim($this->input->post('fs_kd_dept'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdtrx = trim($this->input->post('fs_kd_trx'));
		$kdstrx = trim($this->input->post('fs_kd_strx'));
		$refno = trim($this->input->post('fs_refno'));
		
		$this->load->model('mAccGL','',true);
		$ssql = $this->mAccGL->accgl_detail($kddept,$kdcount,$kdtrx,$kdstrx,$refno);
		echo json_encode($ssql->result());
	}
	
	function excel_header()
	{
		ini_set('memory_limit', '-1');
		
		$kddept = trim($this->input->post('fs_kd_dept')).trim($this->input->post('fs_count'));
		$kdacnoa = trim($this->input->post('fs_kd_acnoa'));
		$kdacnob = trim($this->input->post('fs_kd_acnob'));
		$nmacnoa = trim($this->input->post('fs_nm_acnoa'));
		$nmacnob = trim($this->input->post('fs_nm_acnob'));
		$tgla = trim($this->input->post('fd_tgla'));
		$tglb = trim($this->input->post('fd_tglb'));
		
		$this->load->model('mMainModul','',true);
		$jamskg = $this->mMainModul->microtime_float();
		
		$nmfiletemp = 'taccgl';
		$nmfile = 'accgl-'.$jamskg;
		
		$xIP = trim($this->session->userdata('ip_address'));
		$gIP = trim($this->session->userdata('gIP'));
		
		$oReader = PHPExcel_IOFactory::createReader('Excel5');
		
		if (trim($xIP) == trim($gIP))
		{
			$xtPath = '/var/www/'.config_item('base_folder').'/assets/docs/';
			$xPath = '/var/www/'.config_item('base_folder').'/temp/';
		}
		else
		{
			$xtPath = APPPATH.'../assets/docs/';
			$xPath = APPPATH.'../temp/';
			
		}
		
		$oExcel = $oReader->load($xtPath.$nmfiletemp.'.xls');
		$pjghal = 38;
		$i = 1;
		$l = 0; // no urut
		
		$k = 1; // pjg hal
		$p = 1; // awal hal
		
		$oExcel->getActiveSheet()->setTitle('Buku Besar');
		$oExcel->getActiveSheet()->setShowGridlines(false);
		
		$oExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
		$oExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
		
		$oExcel->getActiveSheet()->getPageMargins()->setTop(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setBottom(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setLeft(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setRight(0);
		
		$oExcel->getDefaultStyle()->getFont()->setName('Calibri');
		$oExcel->getDefaultStyle()->getFont()->setSize(10);
		$sel = $oExcel->getActiveSheet();
		
		$this->load->model('mAccGL','',true);
		$ssql = $this->mAccGL->accgl_header_all($kddept,$kdacnoa,$kdacnob,$tgla,$tglb);
		
		if ($ssql->num_rows() > 0)
		{
			$i = 1;
			$k = 1;
			$p = $i;
			$sel->setCellValue('A'.$i, 'Laporan Buku Besar');
			$sel->mergeCells('A'.$i.':G'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('A'.$i)->getFont()->SetUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
			$sel->getStyle('A'.$i)->getFont()->setBold(true);
			$sel->getStyle('A'.$i)->getFont()->setSize(12);
			$i++;
			$k++;
			$sel->mergeCells('A'.$i.':G'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->setCellValue('A'.$i, 'Periode: '.substr($tgla,6,2).'-'.substr($tgla,4,2).'-'.substr($tgla,0,4).' s/d '.substr($tglb,6,2).'-'.substr($tglb,4,2).'-'.substr($tglb,0,4));
			$i++;
			$k++;
			$sel->mergeCells('A'.$i.':G'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->setCellValue('A'.$i, 'Perkiraan antara: '.trim($nmacnoa).' s/d '.trim($nmacnob));
			$i++;
			$k++;
			$sel->mergeCells('A'.$i.':G'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$i++;
			$k++;
			
			$sel->setCellValue('A'.$i, 'No');
			$sel->setCellValue('B'.$i, 'Faktur');
			$sel->setCellValue('C'.$i, 'Tanggal');
			$sel->setCellValue('D'.$i, 'Keterangan');
			$sel->setCellValue('E'.$i, 'Debet');
			$sel->setCellValue('F'.$i, 'Kredit');
			$sel->setCellValue('G'.$i, 'Saldo');
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			
			$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
				array(
					'borders' => array(
						'top' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$i++;
			$k++;
			$l++;
			
			$debet = 0;
			$kredit = 0;
			$kdacno = '';
			foreach ($ssql->result() as $row)
			{
				if ($k > $pjghal)
				{
					$j = $i - 1;
					$sel->setBreak('A'.$j, PHPExcel_Worksheet::BREAK_ROW);
					$sel->getStyle('A'.$j.':G'.$j)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					
					$q = $p + 4;
					$arr = array(
						'borders' => array(
							'left' => array(
								'style' => PHPExcel_Style_Border::BORDER_THIN
							)
						)
					);
					$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
					$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
					$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
					$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
					$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
					$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
					$sel->getStyle('G'.$q.':G'.$j)->applyFromArray($arr);
					$sel->getStyle('G'.$q.':G'.$j)->applyFromArray(
						array(
							'borders' => array(
								'right' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$p = $i;
					
					$k = 1;
					$sel->setCellValue('A'.$i, 'Laporan Buku Besar');
					$sel->mergeCells('A'.$i.':G'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$i++;
					$k++;
					$sel->mergeCells('A'.$i.':G'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->setCellValue('A'.$i, 'Periode: '.substr($tgla,6,2).'-'.substr($tgla,4,2).'-'.substr($tgla,0,4).' s/d '.substr($tglb,6,2).'-'.substr($tglb,4,2).'-'.substr($tglb,0,4));
					$i++;
					$k++;
					$sel->mergeCells('A'.$i.':G'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->setCellValue('A'.$i, 'Perkiraan antara: '.trim($nmacnoa).' s/d '.trim($nmacnob));
					$i++;
					$k++;
					$sel->mergeCells('A'.$i.':G'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$i++;
					$k++;
					
					$sel->setCellValue('A'.$i, 'No');
					$sel->setCellValue('B'.$i, 'Faktur');
					$sel->setCellValue('C'.$i, 'Tanggal');
					$sel->setCellValue('D'.$i, 'Keterangan');
					$sel->setCellValue('E'.$i, 'Debet');
					$sel->setCellValue('F'.$i, 'Kredit');
					$sel->setCellValue('G'.$i, 'Saldo');
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					
					$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
						array(
							'borders' => array(
								'top' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$q = $i;
					$i++;
					$k++;
				}
				
				$debet = $debet + trim($row->DEBET);
				$kredit = $kredit + trim($row->CREDIT);
				
				if (trim($kdacno) == '' or trim($kdacno <> trim($row->ACNO)))
				{
					$sel->mergeCells('A'.$i.':G'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
					$sel->setCellValue('A'.$i, trim($row->ACNM));
					$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
						array(
							'borders' => array(
								'top' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$i++;
					$k++;
				}
				
				$sel->setCellValue('A'.$i, $l.'.');
				$sel->setCellValue('B'.$i, trim($row->fs_refno));
				$sel->setCellValue('C'.$i, substr(trim($row->fd_refno),6,2).'-'.substr(trim($row->fd_refno),4,2).'-'.substr(trim($row->fd_refno),0,4));
				$sel->setCellValue('D'.$i, trim($row->fs_Descrp));
				$sel->setCellValue('E'.$i, number_format(trim($row->DEBET), 2, '.', ','));
				$sel->setCellValue('F'.$i, number_format(trim($row->CREDIT), 2, '.', ','));
				$sel->setCellValue('G'.$i, number_format(trim($row->BALANCE), 2, '.', ','));
				$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
				$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
				$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
				$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				
				$kdacno = trim($row->ACNO);
				$sel->getStyle('A'.$i.':G'.$i)->applyFromArray(
					array(
						'borders' => array(
							'bottom' => array(
								'style' => PHPExcel_Style_Border::BORDER_DOTTED
							)
						)
					)
				);
				$i++;
				$k++;
				$l++;
			}
			$j = $i - 1;
			$sel->getStyle('A'.$j.':G'.$j)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$q = $p + 4;
			$arr = array(
				'borders' => array(
					'left' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				)
			);
			$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
			$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
			$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
			$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
			$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
			$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
			$sel->getStyle('G'.$q.':G'.$j)->applyFromArray($arr);
			$sel->getStyle('G'.$q.':G'.$j)->applyFromArray(
				array(
					'borders' => array(
						'right' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->setCellValue('D'.$i, 'T O T A L : ');
			$sel->setCellValue('E'.$i, number_format($debet, 2, '.', ','));
			$sel->setCellValue('F'.$i, number_format($kredit, 2, '.', ','));
			$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
			$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
			$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
			
			$oWriter = PHPExcel_IOFactory::createWriter($oExcel, 'Excel5');
			$oWriter->save($xPath.$nmfile.'.xls');
			
			//hapus file lama
			$this->load->model('mMainModul','',true);
			$jamskg = $this->mMainModul->microtime_float();
			$exp = 1800;
			
			$current_dir = @opendir($xPath);
			while ($filename = @readdir($current_dir))
			{
				if ($filename != '.' and $filename != '..' and $filename != 'captcha')
				{
					$filename2 = str_replace('.xls', '', $filename);
					$filename2 = str_replace('.pdf', '', $filename2);
					
					$xlen = strlen($filename2);
					$xmulai = stripos($filename2,'-') + 1;
					$filename2 = substr($filename2,$xmulai,$xlen);
					
					if (($filename2 + $exp) < $jamskg)
					{
						@unlink($xPath.$filename);
					}
				}
			}
			@closedir($current_dir);
			//eof hapus file lama
			
			$hasil = array(
				'sukses'	=> true,
				'nmfile'	=> $xPath.$nmfile.'.xls'
			);
			echo json_encode($hasil);
			
		}
		else
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'No record!!
			');
			echo json_encode($hasil);
		}
	}
	
	function excel_detail()
	{
		ini_set('memory_limit', '-1');
		
		$kddept = trim($this->input->post('fs_kd_dept'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdtrx = trim($this->input->post('fs_kd_trx'));
		$kdstrx = trim($this->input->post('fs_kd_strx'));
		$refno = trim($this->input->post('fs_refno'));
		
		$this->load->model('mMainModul','',true);
		$jamskg = $this->mMainModul->microtime_float();
		
		$nmfiletemp = 'taccgldet';
		$nmfile = 'accgldet-'.$jamskg;
		
		$xIP = trim($this->session->userdata('ip_address'));
		$gIP = trim($this->session->userdata('gIP'));
		
		$oReader = PHPExcel_IOFactory::createReader('Excel5');
		
		if (trim($xIP) == trim($gIP))
		{
			$xtPath = '/var/www/'.config_item('base_folder').'/assets/docs/';
			$xPath = '/var/www/'.config_item('base_folder').'/temp/';
		}
		else
		{
			$xtPath = APPPATH.'../assets/docs/';
			$xPath = APPPATH.'../temp/';
			
		}
		
		$oExcel = $oReader->load($xtPath.$nmfiletemp.'.xls');
		$pjghal = 38;
		$i = 1;
		$l = 0; // no urut
		
		$k = 1; // pjg hal
		$p = 1; // awal hal
		
		$oExcel->getActiveSheet()->setTitle('Jurnal Detail Buku Besar');
		$oExcel->getActiveSheet()->setShowGridlines(false);
		
		$oExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
		$oExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
		
		$oExcel->getActiveSheet()->getPageMargins()->setTop(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setBottom(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setLeft(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setRight(0);
		
		$oExcel->getDefaultStyle()->getFont()->setName('Calibri');
		$oExcel->getDefaultStyle()->getFont()->setSize(10);
		$sel = $oExcel->getActiveSheet();
		
		$this->load->model('mAccGL','',true);
		$ssql = $this->mAccGL->accgl_detail($kddept,$kdcount,$kdtrx,$kdstrx,$refno);
		
		if ($ssql->num_rows() > 0)
		{
			$i = 1;
			$k = 1;
			$p = $i;
			$sel->setCellValue('A'.$i, 'Jurnal Detail Laporan Buku Besar');
			$sel->mergeCells('A'.$i.':F'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('A'.$i)->getFont()->SetUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
			$sel->getStyle('A'.$i)->getFont()->setBold(true);
			$sel->getStyle('A'.$i)->getFont()->setSize(12);
			$i++;
			$k++;
			$sel->mergeCells('A'.$i.':F'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->setCellValue('A'.$i, 'Reference: '.trim($refno));
			$i = $i + 2;
			$k = $k + 2;
			
			$sel->setCellValue('A'.$i, 'No');
			$sel->setCellValue('B'.$i, 'Kode');
			$sel->setCellValue('C'.$i, 'Perkiraan');
			$sel->setCellValue('D'.$i, 'Keterangan');
			$sel->setCellValue('E'.$i, 'Debet');
			$sel->setCellValue('F'.$i, 'Kredit');
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			
			$sel->getStyle('A'.$i.':F'.$i)->applyFromArray(
				array(
					'borders' => array(
						'top' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->getStyle('A'.$i.':F'.$i)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$i++;
			$k++;
			$l++;
			
			foreach ($ssql->result() as $row)
			{
				if ($k > $pjghal)
				{
					$j = $i - 1;
					$sel->setBreak('A'.$j, PHPExcel_Worksheet::BREAK_ROW);
					$sel->getStyle('A'.$j.':F'.$j)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					
					$q = $p + 3;
					$arr = array(
						'borders' => array(
							'left' => array(
								'style' => PHPExcel_Style_Border::BORDER_THIN
							)
						)
					);
					$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
					$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
					$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
					$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
					$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
					$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
					$sel->getStyle('F'.$q.':F'.$j)->applyFromArray(
						array(
							'borders' => array(
								'right' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$p = $i;
					
					$k = 1;
					$sel->setCellValue('A'.$i, 'Jurnal Detail Laporan Buku Besar');
					$sel->mergeCells('A'.$i.':F'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$i++;
					$k++;
					$sel->mergeCells('A'.$i.':F'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->setCellValue('A'.$i, 'Reference: '.trim($refno));
					$i = $i + 2;
					$k = $k + 2;
					
					$sel->setCellValue('A'.$i, 'No');
					$sel->setCellValue('B'.$i, 'Kode');
					$sel->setCellValue('C'.$i, 'Perkiraan');
					$sel->setCellValue('D'.$i, 'Keterangan');
					$sel->setCellValue('E'.$i, 'Debet');
					$sel->setCellValue('F'.$i, 'Kredit');
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					
					$sel->getStyle('A'.$i.':F'.$i)->applyFromArray(
						array(
							'borders' => array(
								'top' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':F'.$i)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$q = $i;
					$i++;
					$k++;
				}
				
				$sel->setCellValue('A'.$i, $l.'.');
				$sel->setCellValue('B'.$i, trim($row->fs_kd_acc));
				$sel->setCellValue('C'.$i, trim($row->fs_nm_acc));
				$sel->setCellValue('D'.$i, trim($row->fs_note));
				$sel->setCellValue('E'.$i, number_format(trim($row->fn_debet), 2, '.', ','));
				$sel->setCellValue('F'.$i, number_format(trim($row->fn_credit), 2, '.', ','));
				$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
				$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
				$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
				$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$i++;
				$k++;
				$l++;
			}
			$j = $i - 1;
			$sel->getStyle('A'.$j.':F'.$j)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$q = $p + 3;
			$arr = array(
				'borders' => array(
					'left' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				)
			);
			$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
			$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
			$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
			$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
			$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
			$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
			$sel->getStyle('F'.$q.':F'.$j)->applyFromArray(
				array(
					'borders' => array(
						'right' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$oWriter = PHPExcel_IOFactory::createWriter($oExcel, 'Excel5');
			$oWriter->save($xPath.$nmfile.'.xls');
			
			//hapus file lama
			$this->load->model('mMainModul','',true);
			$jamskg = $this->mMainModul->microtime_float();
			$exp = 1800;
			
			$current_dir = @opendir($xPath);
			while ($filename = @readdir($current_dir))
			{
				if ($filename != '.' and $filename != '..' and $filename != 'captcha')
				{
					$filename2 = str_replace('.xls', '', $filename);
					$filename2 = str_replace('.pdf', '', $filename2);
					
					$xlen = strlen($filename2);
					$xmulai = stripos($filename2,'-') + 1;
					$filename2 = substr($filename2,$xmulai,$xlen);
					
					if (($filename2 + $exp) < $jamskg)
					{
						@unlink($xPath.$filename);
					}
				}
			}
			@closedir($current_dir);
			//eof hapus file lama
			
			$hasil = array(
				'sukses'	=> true,
				'nmfile'	=> $xPath.$nmfile.'.xls'
			);
			echo json_encode($hasil);
			
		}
		else
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'No record!!
			');
			echo json_encode($hasil);
		}
	}
}
?>