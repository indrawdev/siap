<?php

class Apknew extends CI_Controller
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
		$this->load->view('vapknew');
	}

	function konsumen()
	{
		$this->load->view('vapknew');
	}

	function ceksavetrans()
	{
		
		$kodetrans = explode('|', trim($this->input->post('fs_kode_transaksi')));
		$namatrans = explode('|', trim($this->input->post('fs_nama_transaksi')));
		$persentase = explode('|', trim($this->input->post('fs_persentase')));
		$nilaitrans = explode('|', trim($this->input->post('fs_nilai_transaksi')));
		$ditagihkonsumen = explode('|', trim($this->input->post('fs_termasuk_dp')));
		$cairdealer = explode('|', trim($this->input->post('fs_tambah_cair')));
		
		$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Lanjut Save ?'
		);
		echo json_encode($hasil);

	}

	function ceknoapk()
	{
		$noapk = trim($this->input->post('fn_no_apk'));

		if($noapk!=''){

			$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Apakah anda yakin ingin duplikasi apk dengan nomor apk '.$noapk.'? '
			);

		} else {

			$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'APk belum di pilih! '
		);
		}
		
		
		echo json_encode($hasil);

	}

	function duplikat()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$kode_cabang = trim($this->input->post('fs_kode_cabang'));
		//$nopjj = trim($this->input->post('fn_nomor_perjanjian'));

		$rowApk2 = $this->db->where('fn_no_apk',$noapk)->where('fs_kode_cabang',$kode_cabang)->from('tx_apk')->get()->row();
				
		
				$no_apk = '';
				$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','APK')->from('tm_counter')->get()->row();
				if($rowApk){
				$no_apk = $rowApk->fn_counter+1;
				}

				$no_pjj = '';
				$rowPjj = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','PJJ')->where('fs_no_jenis_counter',$rowApk2->fs_pola_transaksi)->from('tm_counter')->get()->row();
				if($rowPjj){ 
				$no_pjj = $rowPjj->fn_counter+1;
				
				}
				//print_r($no_pjj);die;
				$no_pjj_fix = $rowApk2->fs_kode_lokasi.''.$rowApk2->fs_nomor_dealer.''.$rowApk2->fs_jenis_piutang.''.$rowApk2->fs_pola_transaksi.''.$no_pjj;
				
				$data = array(
				'fs_kode_cabang' => $kode_cabang,
				'fn_no_apk' => $no_apk,
				'fn_nomor_perjanjian' => $no_pjj,
				'fd_tgl_apk'=> $rowApk2->fd_tgl_apk,
				'fs_jenis_pembiayaan' => $rowApk2->fs_jenis_pembiayaan,
				'fs_kode_lokasi'=> $rowApk2->fs_kode_lokasi,
				'fs_nomor_dealer' => $rowApk2->fs_nomor_dealer,
				'fs_jenis_piutang' => $rowApk2->fs_jenis_piutang,
				'fs_pola_transaksi' => $rowApk2->fs_pola_transaksi,
				'fs_kode_paket' => $rowApk2->fs_kode_paket,
				'fs_fleet' => $rowApk2->fs_fleet,
				'fs_nama_konsumen' => $rowApk2->fs_nama_konsumen,
				'fs_alamat_konsumen' => $rowApk2->fs_alamat_konsumen,
				'fs_kelurahan_konsumen' => $rowApk2->fs_kelurahan_konsumen,
				'fs_kecamatan_konsumen' => $rowApk2->fs_kecamatan_konsumen,
				'fs_kode_dati_konsumen' => $rowApk2->fs_kode_dati_konsumen,
				'fs_kota_konsumen' => $rowApk2->fs_kota_konsumen,
				'fs_kodepos_konsumen' => $rowApk2->fs_kodepos_konsumen,
				'fs_ktp_konsumen' => $rowApk2->fs_ktp_konsumen,
				'fs_masa_ktp_konsumen' => $rowApk2->fs_masa_ktp_konsumen,
				'fs_kartu_keluarga' => $rowApk2->fs_kartu_keluarga,
				'fs_telepon_konsumen' => $rowApk2->fs_telepon_konsumen,
				'fs_handphone_konsumen' => $rowApk2->fs_handphone_konsumen,
				'fs_email_konsumen' => $rowApk2->fs_email_konsumen,
				'fs_group_perusahaan' => $rowApk2->fs_group_perusahaan,
				'fs_npwp_konsumen' => $rowApk2->fs_npwp_konsumen,
				'fs_siup_perusahaan' => $rowApk2->fs_siup_perusahaan,
				'fs_tdp_perusahaan' => $rowApk2->fs_tdp_perusahaan,
				'fs_nama_perusahaan_konsumen' => $rowApk2->fs_nama_perusahaan_konsumen,
				'fs_bentuk_perusahaan' => $rowApk2->fs_bentuk_perusahaan,
				'fs_status_perusahaan' => $rowApk2->fs_status_perusahaan,
				'fs_tempat_perusahaan' => $rowApk2->fs_tempat_perusahaan,
				'fs_beroperasi_sejak' => $rowApk2->fs_beroperasi_sejak,
				'fs_alamat_usaha_konsumen' => $rowApk2->fs_alamat_usaha_konsumen,
				'fs_telfon_usaha_konsumen' => $rowApk2->fs_telfon_usaha_konsumen,
				'fs_kerja_sejak_konsumen' => $rowApk2->fs_kerja_sejak_konsumen,
				'fs_kategori_usaha_konsumen' => $rowApk2->fs_kategori_usaha_konsumen,
				'fs_keterangan_usaha_konsumen' => $rowApk2->fs_keterangan_usaha_konsumen,
				'fs_usaha_pekerjaan_konsumen' => $rowApk2->fs_usaha_pekerjaan_konsumen,
				'fs_skala_perusahaan_konsumen' => $rowApk2->fs_skala_perusahaan_konsumen,
				'fn_pendapatan_konsumen	' => $rowApk2->fn_pendapatan_konsumen,
				'fs_jenis_kelamin_konsumen' => $rowApk2->fs_jenis_kelamin_konsumen,
				'fs_agama_konsumen' => $rowApk2->fs_agama_konsumen,
				'fs_tempat_lahir_konsumen' => $rowApk2->fs_tempat_lahir_konsumen,
				'fd_tanggal_lahir_konsumen' => $rowApk2->fd_tanggal_lahir_konsumen,
				'fs_pendidikan_konsumen' => $rowApk2->fs_pendidikan_konsumen,
				'fn_biaya_konsumen' => $rowApk2->fn_biaya_konsumen,
				'fs_nama_ibu_kandung' =>  $rowApk2->fs_nama_ibu_kandung,
				'fs_jenis_piutang' =>  $rowApk2->fs_jenis_piutang,
				'fs_status_konsumen' =>  $rowApk2->fs_status_konsumen,
				'fn_tanggungan_konsumen' =>  $rowApk2->fn_tanggungan_konsumen,
				'fn_jumlah_karyawan_perusahaan' =>  $rowApk2->fn_jumlah_karyawan_perusahaan,
				'fs_status_rumah' => $rowApk2->fs_status_rumah,
				'fs_tinggal_sejak' => $rowApk2->fs_tinggal_sejak,
				'fs_alamat_korespondensi' => $rowApk2->fs_alamat_korespondensi,
				'fs_kota_korespondensi' => $rowApk2->fs_kota_korespondensi,
				'fs_kodepos_korespondensi' => $rowApk2->fs_kodepos_korespondensi,
				'fs_pertama_kali_kredit' => $rowApk2->fs_pertama_kali_kredit,
				'fn_jumlah_kali_kredit'=> $rowApk2->fn_jumlah_kali_kredit,
				'fn_mutasi_debet' => $rowApk2->fn_mutasi_debet,
				'fn_mutasi_kredit' => $rowApk2->fn_mutasi_kredit,
				'fs_penanggungjawab_perusahaan' => $rowApk2->fs_penanggungjawab_perusahaan,
				'fs_ktp_penanggungjawab_perusahaan' => $rowApk2->fs_ktp_penanggungjawab_perusahaan,
				'fs_npwp_penanggungjawab_perusahaan' => $rowApk2->fs_npwp_penanggungjawab_perusahaan,
				'fs_alamat_penanggungjawab_perusahaan' => $rowApk2->fs_alamat_penanggungjawab_perusahaan,
				'fs_kota_penanggungjawab_perusahaan' => $rowApk2->fs_kota_penanggungjawab_perusahaan,
				'fs_kodepos_penanggungjawab_perusahaan' => $rowApk2->fs_kodepos_penanggungjawab_perusahaan,
				'fs_jabatan_penanggungjawab_perusahaan' => $rowApk2->fs_jabatan_penanggungjawab_perusahaan,
				'fs_telepon_penanggungjawab_perusahaan' =>  $rowApk2->fs_telepon_penanggungjawab_perusahaan,
				'fs_handphone_penanggungjawab_perusahaan' => $rowApk2->fs_handphone_penanggungjawab_perusahaan,
				'fs_repeat_order' => $rowApk2->fs_repeat_order,
				'fs_repeat_order_ke' => $rowApk2->fs_repeat_order_ke,
				'fs_kode_kendaraan' => $rowApk2->fs_kode_kendaraan,
				'fs_jenis_kendaraan'=> $rowApk2->fs_jenis_kendaraan,
				'fs_silinder_kendaraan' => $rowApk2->fs_silinder_kendaraan,
				'fn_tahun_kendaraan' => $rowApk2->fn_tahun_kendaraan,
				'fs_warna_kendaraan' => $rowApk2->fs_warna_kendaraan,
				'fs_no_rangka' => $rowApk2->fs_no_rangka,
				'fs_no_mesin' => $rowApk2->fs_no_mesin,
				'fs_komersial' => $rowApk2->fs_komersial,
				'fs_nama_bpkb' => $rowApk2->fs_nama_bpkb,
				'fs_alamat_bpkb' => $rowApk2->fs_alamat_bpkb,
				'fs_nomor_bpkb' => $rowApk2->fs_nomor_bpkb,
				'fs_kode_wilayah_no_polisi' => $rowApk2->fs_kode_wilayah_no_polisi,
				'fs_no_polisi' => $rowApk2->fs_no_polisi,
				'fs_kode_akhir_wilayah_no_polisi' => $rowApk2->fs_kode_akhir_wilayah_no_polisi,
				'fs_kota_bpkb' => $rowApk2->fs_kota_bpkb,
				'fs_jenis_asuransi' => $rowApk2->fs_jenis_asuransi,
				'fs_kode_asuransi1' => $rowApk2->fs_kode_asuransi1,
				'fs_kode_asuransi2' => $rowApk2->fs_kode_asuransi2,
				'fs_salesman' => $rowApk2->fs_salesman,
				'fs_kode_dealer1' => $rowApk2->fs_kode_dealer1,
				'fs_kode_dealer2' => $rowApk2->fs_kode_dealer2,
				'fn_cabang_dealer' => $rowApk2->fn_cabang_dealer,
				'fs_pola_angsuran' => $rowApk2->fs_pola_angsuran,
				'fs_cara_bayar' => $rowApk2->fs_cara_bayar,
				'fs_angsuran_dimuka' => $rowApk2->fs_angsuran_dimuka,
				'fn_kali_angsuran_dimuka' => $rowApk2->fn_kali_angsuran_dimuka,
				'fn_jumlah_angsuran_dimuka' => $rowApk2->fn_jumlah_angsuran_dimuka,
				'fs_angsuran_dimuka_potong_pencairan' => $rowApk2->fs_angsuran_dimuka_potong_pencairan,
				'fs_angsuran_dibayar_dealer' => $rowApk2->fs_angsuran_dibayar_dealer,
				'fn_biaya_adm' => $rowApk2->fn_biaya_adm,
				'fn_premi_asuransi_gross' => $rowApk2->fn_premi_asuransi_gross,
				'fn_premi_asuransi_gross_perluasan' => $rowApk2->fn_premi_asuransi_gross_perluasan,
				'fn_premi_asuransi_netto' => $rowApk2->fn_premi_asuransi_netto,
				'fn_denda_perhari' => '',
				'fn_dp_bayar' => $rowApk2->fn_dp_bayar,
				'fn_piutang_dealer' => $rowApk2->fn_piutang_dealer,
				'fn_piutang_konsumen' => $rowApk2->fn_piutang_konsumen,
				'fn_biaya_adm' => $rowApk2->fn_biaya_adm,
				'fn_biaya_tjh' =>$rowApk2->fn_biaya_tjh,
				'fn_selisih_dp' => $rowApk2->fn_selisih_dp,
				'fn_premi_asuransi' => $rowApk2->fn_premi_asuransi,
				'fn_pokok_pembiayaan_dealer' => $rowApk2->fn_pokok_pembiayaan_dealer,
				'fn_pokok_pembiayaan_konsumen' => $rowApk2->fn_pokok_pembiayaan_konsumen,
				'fn_harga_otr' => $rowApk2->fn_harga_otr,
				'fn_uang_muka_dealer' => $rowApk2->fn_uang_muka_dealer,
				'fn_asuransi_dikredit_dealer' => $rowApk2->fn_asuransi_dikredit_dealer,
				'fn_persen_bunga_flat_dealer' => $rowApk2->fn_persen_bunga_flat_dealer,
				'fn_persen_bunga_efektif_dealer' => $rowApk2->fn_persen_bunga_efektif_dealer,
				'fn_bulan_masa_angsuran_dealer' => $rowApk2->fn_bulan_masa_angsuran_dealer,
				'fn_kali_masa_angsuran_dealer' => $rowApk2->fn_kali_masa_angsuran_dealer,
				'fn_bunga_dealer' => $rowApk2->fn_bunga_dealer,
				'fn_angsuran_dealer' => $rowApk2->fn_angsuran_dealer,
				'fn_angsuran_tidak_sama_dealer' => '',
				'fn_uang_muka_konsumen' => $rowApk2->fn_uang_muka_konsumen,
				'fn_asuransi_dikredit_konsumen' => $rowApk2->fn_asuransi_dikredit_konsumen,
				'fn_persen_bunga_flat_konsumen' => $rowApk2->fn_persen_bunga_flat_konsumen,
				'fn_persen_bunga_efektif_konsumen' => $rowApk2->fn_persen_bunga_efektif_konsumen,
				'fn_bulan_masa_angsuran_konsumen' => $rowApk2->fn_bulan_masa_angsuran_konsumen,
				'fn_kali_masa_angsuran_konsumen' => $rowApk2->fn_kali_masa_angsuran_konsumen,
				'fn_bunga_konsumen' => $rowApk2->fn_bunga_konsumen,
				'fn_angsuran_konsumen' => $rowApk2->fn_angsuran_konsumen,
				'fn_angsuran_tidak_sama_konsumen' => '',
				'fs_nama_pasangan' => $rowApk2->fs_nama_pasangan,
				'fs_handphone_pasangan'=> $rowApk2->fs_handphone_pasangan,
				'fs_usaha_pasangan' => $rowApk2->fs_usaha_pasangan,
				'fs_keterangan_usaha_pasangan ' => $rowApk2->fs_keterangan_usaha_pasangan,
				'fs_alamat_usaha_pasangan' => $rowApk2->fs_alamat_usaha_pasangan,
				'fs_telepon_usaha_pasangan' => $rowApk2->fs_telepon_usaha_pasangan,
				'fn_pendapatan_pasangan' => $rowApk2->fn_pendapatan_pasangan,
				'fs_nama_penjamin' => $rowApk2->fs_nama_penjamin,
				'fs_alamat_penjamin' => $rowApk2->fs_alamat_penjamin,
				'fs_kota_penjamin' => $rowApk2->fs_kota_penjamin,
				'fs_kodepos_penjamin' => $rowApk2->fs_kodepos_penjamin,
				'fs_telepon_penjamin' => $rowApk2->fs_telepon_penjamin,
				'fs_usaha_penjamin' => $rowApk2->fs_usaha_penjamin,
				'fs_keterangan_usaha_penjamin' => $rowApk2->fs_keterangan_usaha_penjamin,
				'fs_alamat_usaha_penjamin' => $rowApk2->fs_alamat_usaha_penjamin,
				'fs_telepon_usaha_penjamin' => $rowApk2->fs_telepon_usaha_penjamin,
				'fn_pendapatan_penjamin' => $rowApk2->fn_pendapatan_penjamin,
				'fs_status_penjamin' => $rowApk2->fs_status_penjamin,
				'fd_tanggal_perjanjian' => $rowApk2->fd_tanggal_perjanjian,
				'fd_tanggal_angsuran_pertama' => $rowApk2->fd_tanggal_angsuran_pertama,
				'fn_tanggal_jatuhtempo_perbulan' => $rowApk2->fn_tanggal_jatuhtempo_perbulan,
				'fs_cair_ke' => $rowApk2->fs_cair_ke,
				'fs_uang_muka_bayar_di' => $rowApk2->fs_uang_muka_bayar_di,
				'fs_deposit_potong_pencairan' => $rowApk2->fs_deposit_potong_pencairan,
				'fs_atasnama_bank_pencairan' => $rowApk2->fs_atasnama_bank_pencairan,
				'fs_nama_bank_pencairan' => $rowApk2->fs_nama_bank_pencairan,
				'fs_rekening_bank_pencairan' => $rowApk2->fs_rekening_bank_pencairan,
				'fn_nilai_pencairan' => $rowApk2->fn_nilai_pencairan,
				'fs_propinsi_konsumen' => $rowApk2->fs_propinsi_konsumen,
				'fs_iduser_edit' => '',
				'fd_tanggal_edit' => '',
				'fd_tanggal_survey' => '',
				'fs_petugas_survey' => '',
				'fn_lama_survey' => '',
				'fs_kondisi_lingkungan' =>'',
				'fn_jumlah_kendaraan' => '',
				'fs_garasi' => '',
				'fs_kondisi_kantor' => '',
				'fs_catatan_tempat_tinggal' => '',
				'fs_catatan_lingkungan' => '',
				'fs_catatan_tempat_usaha' => '',
				'fs_flag_survey' => '0',
				'fs_iduser_buat_survey' => '',
				'fd_tanggal_buat_survey' =>'',
				'fs_keputusan_kredit' => '',
				'fs_flag_keputusan' => '0',
				'fs_iduser_buat_keputusan' => '',
				'fd_tanggal_buat_keputusan' => '',
				'fs_score' => '',
				'fs_grade' => '',
				'fs_kategori_perusahaan_konsumen' => $rowApk2->fs_kategori_perusahaan_konsumen,
				'fs_uang_muka_dealer' => $rowApk2->fs_uang_muka_dealer,
				'umur' => $rowApk2->umur,
				'fs_iduser_buat'		=> trim($this->session->userdata('gUser')),
				'fd_tanggal_buat'		=> trim(date('Y-m-d H:i:s'))
				);
				$this->db->insert('tx_apk', $data);
			

		//eof simpan detail
		$xData = array(
					'fn_counter'	=> $no_apk
				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fs_jenis_counter = 'APK' ";
			
		$this->db->where($xWhere);
		$this->db->update('tm_counter', $xData);

		$xData2 = array(
					'fn_counter'	=> $no_pjj
				);
			
		$xWhere2 = "fs_kode_cabang = '".trim($kode_cabang)."' AND fs_jenis_counter = 'PJJ' AND fs_no_jenis_counter = '".trim($rowApk2->fs_pola_transaksi)."'";
		//print_r($xWhere2);die;	
		$this->db->where($xWhere2);
		$this->db->update('tm_counter', $xData2);
	

		$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Duplikasi APK berhasil! '
		);

		echo json_encode($hasil);

		
		
		
		

	}

	function savetrans()
	{
			
		$kodetrans = explode('|', trim($this->input->post('fs_kode_transaksi')));
		$namatrans = explode('|', trim($this->input->post('fs_nama_transaksi')));
		$persentase = explode('|', trim($this->input->post('fs_persentase')));
		$nilaitrans = explode('|', trim($this->input->post('fs_nilai_transaksi')));
		$ditagihkonsumen = explode('|', trim($this->input->post('fs_termasuk_dp')));
		$cairdealer = explode('|', trim($this->input->post('fs_tambah_cair')));
		$no_apk = trim($this->input->post('fn_no_apk'));
		$kode_cabang = trim($this->input->post('fs_kode_cabang'));
		
		$xupdate = false;
		$total_trans = 0;
		$total_cairminus = 0;
		$total_cairplus = 0;
		$jml = count($kodetrans) - 1;
		if ($jml != 0)
		{
			$this->db->where('fn_no_apk',$no_apk)->where('fs_kode_cabang',$kode_cabang)->delete('tx_apk_detailtransaksi');

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


					if($cairdealer[$i]=='-'){


				//echo $nilaitrans[$i].' ';
					$total_cairminus +=  $nilaitrans[$i];

					}
					
					if($cairdealer[$i]=='+'){

					
					$total_cairplus +=  $nilaitrans[$i];


					}

					//echo $total_trans;
					//echo $nilaitrans[$i];
				}


				
				$this->db->insert('tx_apk_detailtransaksi', $data);
			}

			$total_cairminus = $total_cairminus * (-1);
			$totalcair = $total_cairminus + $total_cairplus;
			//print_r($total_cairplus.'<br>'.$total_cairminus);die;
			
			if ($xupdate == false)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Saving Kode Transaksi Success',
					'total_trans'		=> $total_trans,
					'total_trans2'		=> $totalcair
				);
				echo json_encode($hasil);
			}
		}

		else {

			$hasil = array(
				'sukses2'	=> true,
				'hasil'		=> 'Delete Transaksi Success',
				'total_trans'		=> 0,
				'total_trans2'		=> 0
			);

			echo json_encode($hasil);

		}
		
		//echo($total_trans);die;
	}
	

	function deleteapk()
	{
		$kode_cabang = trim($this->input->post('fs_kode_cabang'));
		$no_apk = trim($this->input->post('fn_no_apk'));


		//echo $nama;die;
		$this->db->where('fs_kode_cabang',$kode_cabang)->where('fn_no_apk',$no_apk)->delete('tx_apk');

		$xHasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Delete Success!'
		);
		echo json_encode($xHasil);
		
	}

	function grid_apk()
	{

		$cari = trim($this->input->post('fs_cari'));
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilGridAll($cari,$kode_cabang);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilGrid($cari,$kode_cabang,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_no_apk'	=> trim($xRow->fn_no_apk),
					'fs_no_pjj'	=> trim($xRow->fs_kode_lokasi.''.$xRow->fs_nomor_dealer.''.$xRow->fs_pola_transaksi.''.$xRow->fs_jenis_piutang.''.$xRow->fn_nomor_perjanjian),
					'fs_tgl_apk'	=> trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen'	=> trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan'	=> trim($xRow->fs_jenis_pembiayaan),
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
					'fs_keputusan_kredit'	=> trim($xRow->fs_keputusan_kredit),
					'fs_flag_keputusan_cabang'	=> trim($xRow->fs_flag_keputusan),
					'fs_flag_keputusan_pusat'	=> trim($xRow->fs_flag_keputusan_pusat)

				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_usaha()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$cari = trim($this->input->post('fs_cari'));

		$nStart = trim($this->input->post('start'));
		$nLimit = 999999;
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilUsahaAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilUsaha($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nama_sektor_ekonomi'	=> trim($xRow->fs_nama_sektor_ekonomi),
					'fs_kode_sektor_ekonomi'	=> trim($xRow->fs_kode_sektor_ekonomi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function kodetransaksi()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilKodeTransaksiAll();
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilKodeTransaksi($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_transaksi'	=> trim($xRow->fs_kode_transaksi),
					'fs_nama_transaksi'	=> trim($xRow->fs_nama_transaksi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_usaha_kerja()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = '500';

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilUsahaKerjaAll($cari,$namakoderef);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilUsahaKerja($cari,$namakoderef,$nStart,$nLimit);
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

	function ambil_skala_perusahaan()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilSkalaAll($cari,$namakoderef);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilSkala($cari,$namakoderef,$nStart,$nLimit);
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


	function ambil_jenis_asuransi()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilJenisAsuransiAll($cari,$namakoderef);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilJenisAsuransi($cari,$namakoderef,$nStart,$nLimit);
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
	
	function ambil_agama()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilAgamaAll($namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilAgama($namakoderef,$nStart,$nLimit);
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

	function ambil_negara()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilNegaraAll($namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilNegara($namakoderef,$nStart,$nLimit);
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

	
	
	function ambil_pendidikan()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilPendidikanAll($cari,$namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilPendidikan($cari,$namakoderef,$nStart,$nLimit);
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

	function ambil_plat()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilPlatAll($cari);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilPlat($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);



		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_plat'	=> trim($xRow->fs_kode_plat),
					'fs_wilayah'	=> trim($xRow->fs_wilayah),
					'fs_kode_wilayah'	=> trim($xRow->fs_kode_wilayah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function ambil_status_konsumen()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilStatusKonsumenAll($namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilStatusKonsumen($namakoderef,$nStart,$nLimit);
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
	
	function ambil_model()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilModelAll($cari);
		$xTotal = $sSQL->num_rows();


		$sSQL = $this->mSearch->ambilModel($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_merek_kendaraan'	=> trim($xRow->fs_merek_kendaraan),
					'fs_kode_kendaraan_lama'	=> trim($xRow->fs_kode_kendaraan_lama),
					'fs_silinder_kendaraan'	=> trim($xRow->fs_silinder_kendaraan),
					'fs_model_kendaraan'	=> trim($xRow->fs_model_kendaraan),
					'fs_jenis_kendaraan'	=> trim($xRow->fs_jenis_kendaraan)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_dealer()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$kode_cabang = $this->session->userdata('gKodeCabang');
		//echo $kode_cabang;die;
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilDealerAll($cari,$kode_cabang);
		$xTotal = $sSQL->num_rows();


		$sSQL = $this->mSearch->ambilDealer($cari,$kode_cabang,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nama_dealer'	=> trim($xRow->fs_nama_dealer),
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
					'fn_persen_refund_bunga'	=> trim($xRow->fn_persen_refund_bunga),
					'fs_alamat_dealer'	=> trim($xRow->fs_alamat_dealer),
					'fs_nama_pemilik'	=> trim($xRow->fs_nama_pemilik),
					'fs_kode_dealer1'	=> trim($xRow->fs_kode_dealer1),
					'fs_telepon_dealer'	=> trim($xRow->fs_telepon_dealer),
					'fs_kota_dealer'	=> trim($xRow->fs_kota_dealer),
					'fn_cabang_dealer'	=> trim($xRow->fn_cabang_dealer),
					'fs_rekening_bank_pencairan'	=> trim($xRow->fs_rekening_bank_pencairan),
					'fs_nama_bank_pencairan'	=> trim($xRow->fs_nama_bank_pencairan),
					'fs_atasnama_bank_pencairan'	=> trim($xRow->fs_atasnama_bank_pencairan),
					'fs_kode_dealer2'	=> trim($xRow->fs_kode_dealer2)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_perusahaan_asuransi()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilPerusahaanAsuransiAll($cari);
		$xTotal = $sSQL->num_rows();


		$sSQL = $this->mSearch->ambilPerusahaanAsuransi($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nama_perusahaan_asuransi'	=> trim($xRow->fs_nama_perusahaan_asuransi),
					'fs_alamat_perusahaan_asuransi'	=> trim($xRow->fs_alamat_perusahaan_asuransi),
					'fs_kota_perusahaan_asuransi'	=> trim($xRow->fs_kota_perusahaan_asuransi),
					'fs_kodepos_perusahaan_asuransi'	=> trim($xRow->fs_kodepos_perusahaan_asuransi),
					'fs_telfon_perusahaan_asuransi'	=> trim($xRow->fs_telfon_perusahaan_asuransi),
					'fs_kode_asuransi2'	=> trim($xRow->fs_kode_asuransi2),
					'fs_perwakilan_perusahaan_asuransi'	=> trim($xRow->fs_perwakilan_perusahaan_asuransi),
					'fs_kode_asuransi1'	=> trim($xRow->fs_kode_asuransi1),
					'fs_perwakilan_perusahaan_asuransi'	=> trim($xRow->fs_perwakilan_perusahaan_asuransi),
					'fs_tjh'	=> trim($xRow->fs_tjh)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	
	function ambil_jenis_kendaraan()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilJenisKendaraanAll($namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilJenisKendaraan($namakoderef,$nStart,$nLimit);
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
	function ambil_status_rumah()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilStatusRumahAll($namakoderef);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilStatusRumah($namakoderef,$nStart,$nLimit);
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
	
	
		
	function ambil_dati()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilKabAll();
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilKab($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_dati'	=> trim($xRow->fs_kode_dati),
					'fs_nama_dati'	=> trim($xRow->fs_nama_dati)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function ambil_kota()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilKotaAll();
		$xTotal = $sSQL->num_rows();


		$sSQL = $this->mSearch->ambilKota($nStart,$nLimit);
		$this->db->query(NOLOCK2);


		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_kota'	=> trim($xRow->fs_kode_kota),
					'fs_nama_kota'	=> trim($xRow->fs_nama_kota)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_kotaa()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilKotaAll();
		$xTotal = $sSQL->num_rows();


		$sSQL = $this->mSearch->ambilKota($nStart,$nLimit);
		$this->db->query(NOLOCK2);


		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_kota'	=> trim($xRow->fs_kode_kota),
					'fs_nama_kota'	=> trim($xRow->fs_nama_kota)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function ambil_kota_tambahan()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilKotaTambahanAll();
		$xTotal = $sSQL->num_rows();


		$sSQL = $this->mSearch->ambilKotaTambahan($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_kota'	=> trim($xRow->fs_kode_kota),
					'fs_nama_kota'	=> trim($xRow->fs_nama_kota)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	
	function ambil_kotaBPKB()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->ambilKotaBPKBAll();
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilKotaBPKB($nStart,$nLimit);
		$this->db->query(NOLOCK2);


		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_kota'	=> trim($xRow->fs_kode_kota),
					'fs_nama_kota'	=> trim($xRow->fs_nama_kota)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function ambil_lembaga()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		
		$cari = trim($this->input->post('fs_cari'));


		$sSQL = $this->mSearch->ambilLembagaAll($cari);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilLembaga($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
					'fs_split'	=> trim($xRow->fs_kode_lembaga_keuangan1).'-'. trim($xRow->fn_kode_lembaga_keuangan2),
					'fs_nama_lembaga_keuangan'	=> trim($xRow->fs_nama_lembaga_keuangan),
					'fs_kode_lembaga_keuangan1'	=> trim($xRow->fs_kode_lembaga_keuangan1),
					'fs_kode_lembaga_keuangan2'	=> trim($xRow->fn_kode_lembaga_keuangan2)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_paket()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		
		$cari = trim($this->input->post('fs_cari'));

		$sSQL = $this->mSearch->ambilPaketAll($cari);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilPaket($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_kode_paket'	=> trim($xRow->fs_kode_paket),
					'fs_nama_paket'	=> trim($xRow->fs_nama_paket)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_kode_pos1()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		
		$cari = trim($this->input->post('fs_cari'));

		$sSQL = $this->mSearch->ambilKodePos1All($cari);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilKodePos1($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kodepos' => trim($xRow->fs_kodepos),
					'fs_kelurahan'	=> trim($xRow->fs_kelurahan),
					'fs_kecamatan'	=> trim($xRow->fs_kecamatan),
					'fs_nama_dati'	=> trim($xRow->fs_nama_dati),
					'fs_kode_dati'	=> trim($xRow->fs_kode_dati),
					'fs_propinsi'	=> trim($xRow->fs_propinsi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}


	function ambil_pola()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		
		$cari = trim($this->input->post('fs_cari'));
		$pola = trim($this->input->post('fs_kode_referensi'));


		$sSQL = $this->mSearch->ambilPolaAll($cari,$pola);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mSearch->ambilPola($cari,$pola,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nilai1_referensi' => trim($xRow->fs_nilai1_referensi),
					'fs_nilai2_referensi' => trim($xRow->fs_nilai2_referensi),
					'fs_nama_referensi'	=> trim($xRow->fs_nama_referensi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function cb_jenis()
	{
		$total = '1';
		
		$array = array(
		  1 => array("P",'PERSEORANGAN'),
		  2 => array("W",'WIRASWASTA')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_fleet()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("N",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
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


	function ambil_piutang()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = trim($this->input->post('fs_kode_referensi'));
		$namanilairef = trim($this->input->post('fs_nilai1_referensi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilPiutangAll($cari,$namakoderef);
		

		$sSQL = $this->mSearch->ambilPiutang($cari,$namakoderef,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		$xTotal = $sSQL->num_rows();

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