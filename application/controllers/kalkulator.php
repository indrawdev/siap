<?php

class Kalkulator extends CI_Controller
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
		$this->load->view('vkalkulator');
	}

	function ambil_perluasan()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		
		$cari = trim($this->input->post('fs_cari'));
		$pola = 'perluasan_asuransi';


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

	

	function CekSimpan()
	{

		$jenis_pembiayaan = trim($this->input->post('fs_jenis_pembiayaan'));
		$kodelokasi = trim($this->input->post('fs_kode_lokasi'));
		$nomordealer = trim($this->input->post('fs_nomor_dealer'));
		$jenispiutang = trim($this->input->post('fs_jenis_piutang'));
		$polatrans = trim($this->input->post('fs_pola_transaksi'));
		$nama = trim($this->input->post('fs_nama_konsumen'));
		$tgl_lahir = trim($this->input->post('fd_tanggal_lahir'));
		
		$umur1 = substr($tgl_lahir,0,4);
		$umur2 = substr($tgl_lahir,5,2);
		$umur3 = substr($tgl_lahir,8,2);
		$birthDate = $umur3.'-'.$umur2.'-'.$umur1;
		//echo "Age is:" . $birthDate;die;
 		$birthDate = explode("-", $birthDate);
  		$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    		? ((date("Y") - $birthDate[2]) - 1)
    	: (date("Y") - $birthDate[2]));

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


			if($age >= 17){

				if($sSQL->num_rows()==''){
				

					$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Konfirmasi Penyimpanan<br>NO APK : '.$no_apk.'<br>NO PJJ : '.$no_pjj_fix.'<br>NAMA LENGKAP : '.$nama.''
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
			else {

				$xHasil = array(
						'sukses'	=> false,
						'hasil'		=> 'Maaf, Umur konsumen belum cukup'
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

			$this->db->where('no_apk',$no_apk)->delete('tm_temporary_mix');

		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{


			$data = array(
					'kode_cabang' => trim($kode_cabang),
					'no_apk'	=> trim($no_apk),
					'tahun'		=> trim($tahun[$i]),
					'asuransi'	=> trim($jenis_asuransi[$i])
				);


				
				$this->db->insert('tm_temporary_mix', $data);

				$xupdate = true;
			}
		}


		} else {

		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{


				

				$data = array(
					'kode_cabang' => trim($kode_cabang),
					'no_apk'	=> trim($no_apk),
					'tahun'		=> trim($tahun[$i]),
					'asuransi'	=> trim($jenis_asuransi[$i])
				);


				
				$this->db->insert('tm_temporary_mix', $data);
			}
		}

		}
		
		
		
		if ($xupdate == false)
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
				
				$jenis_pembiayaan = trim($this->input->post('fs_jenis_pembiayaan'));
				$kode_lokasi = trim($this->input->post('fs_kode_lokasi'));
				$nomor_dealer = trim($this->input->post('fs_nomor_dealer'));
				$jenis_piutang = trim($this->input->post('fs_jenis_piutang'));
				
				$kode_paket = trim($this->input->post('fs_kode_paket'));
				$fleet = trim($this->input->post('fs_fleet'));
				$nama_konsumen = trim($this->input->post('fs_nama_konsumen'));
				$alamat_konsumen = trim($this->input->post('fs_alamat_konsumen'));
				$kelurahan_konsumen = trim($this->input->post('fs_kelurahan_konsumen'));
				$kecamatan_konsumen = trim($this->input->post('fs_kecamatan_konsumen'));
				$kode_dati_konsumen = trim($this->input->post('fs_kode_dati_konsumen'));
				$kota_konsumen = trim($this->input->post('fs_kota_konsumen'));
				$kode_pos_konsumen = trim($this->input->post('fs_kodepos_konsumen'));
				$ktp_konsumen = trim($this->input->post('fs_ktp_konsumen'));
				$masa_ktp_konsumen = trim($this->input->post('fs_masa_ktp_konsumen'));
				$kartu_keluarga = trim($this->input->post('fs_kartu_keluarga'));
				$telepon_konsumen = trim($this->input->post('fs_telepon_konsumen'));
				$hp_konsumen = trim($this->input->post('fs_handphone_konsumen'));
				$email_konsumen = trim($this->input->post('fs_email_konsumen'));
				$npwp = $this->input->post('fs_npwp1').''.$this->input->post('fs_npwp2').''.$this->input->post('fs_npwp3').''.$this->input->post('fs_npwp4').''.$this->input->post('fs_npwp5').''.$this->input->post('fs_npwp6');
				
				$nama_perusahaan = trim($this->input->post('txtNamaPerusahaan'));
				$alamat_usaha_konsumen = trim($this->input->post('fs_alamat_usaha_konsumen'));
				$telfon_usaha_konsumen = trim($this->input->post('fs_telfon_usaha_konsumen'));
				$kerja_sejak = $this->input->post('fs_kerja_sejak_tgl').''.$this->input->post('fs_kerja_sejak_tahun');
				$kategori_usaha_konsumen = trim($this->input->post('fs_kategori_usaha_konsumen'));
				$keterangan_usaha_konsumen = trim($this->input->post('fs_keterangan_usaha_konsumen'));
				$usaha_pekerjaan_konsumen = trim($this->input->post('fs_usaha_pekerjaan_konsumen'));
				$pendapatan_konsumen = trim($this->input->post('fn_pendapatan_konsumen'));
				$jenis_kelamin_konsumen = trim($this->input->post('fs_jenis_kelamin_konsumen'));
				$agama_konsumen = trim($this->input->post('fs_agama_konsumen'));
				$tempat_lahir_konsumen = trim($this->input->post('fs_tempat_lahir_konsumen'));
				$tgl_lahir_konsumen = trim($this->input->post('fd_tanggal_lahir_konsumen'));
				$pendidikan_konsumen = trim($this->input->post('fs_pendidikan_konsumen'));
				$biaya_konsumen = trim($this->input->post('fn_biaya_konsumen'));
				$nama_ibu_kandung = trim($this->input->post('fs_nama_ibu_kandung'));
				$jenis_piutang = trim($this->input->post('fs_jenis_piutang'));
				$status_konsumen = trim($this->input->post('fs_status_konsumen'));
				$tanggungan_konsumen = trim($this->input->post('fn_tanggungan_konsumen'));
				$status_rumah = trim($this->input->post('fs_status_rumah'));
				$tinggal_sejak = $this->input->post('fs_tinggal_sejak1').''.$this->input->post('fs_tinggal_sejak2');
				$alamat_korespondensi = trim($this->input->post('fs_alamat_korespondensi'));
				$kota_korespondensi = trim($this->input->post('fs_kota_korespondensi'));
				$kode_pos_korespondensi = trim($this->input->post('fs_kodepos_korespondensi'));
				$pertama_kali_kredit = trim($this->input->post('fs_pertama_kali_kredit'));
				$jumlah_kali_kredit = trim($this->input->post('fn_jumlah_kali_kredit'));
				$kode_kendaraan = trim($this->input->post('fs_kode_kendaraan'));
				$jenis_kendaraan = trim($this->input->post('fs_jenis_kendaraan'));
				$silinder_kendaraan = trim($this->input->post('fs_silinder_kendaraan'));
				$tahun_kendaraan = trim($this->input->post('fn_tahun_kendaraan'));
				$warna_kendaraaan = trim($this->input->post('fs_warna_kendaraan'));
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
				$premi_asuransi_gross = trim($this->input->post('fn_premi_asuransi_gross'));
				$premi_asuransi_netto = trim($this->input->post('fn_premi_asuransi_netto'));
				$harga_otr = trim($this->input->post('fn_harga_otr'));
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
				$nama_pasangan = trim($this->input->post('fs_nama_pasangan'));
				$handphone_pasangan = trim($this->input->post('fs_handphone_pasangan'));
				$usaha_pasangan = trim($this->input->post('fs_usaha_pasangan'));
				$keterangan_usaha_pasangan = trim($this->input->post('fs_keterangan_usaha_pasangan'));
				$alamat_usaha_pasangan = trim($this->input->post('fs_alamat_usaha_pasangan'));
				$telepon_usaha_pasangan = trim($this->input->post('fs_telepon_usaha_pasangan'));
				$pendapatan_pasangan = trim($this->input->post('fn_pendapatan_pasangan'));
				$nama_penjamin = trim($this->input->post('fs_nama_penjamin'));
				$alamat_penjamin = trim($this->input->post('fs_alamat_penjamin'));
				$kota_penjamin = trim($this->input->post('fs_kota_penjamin'));
				$kodepos_penjamin = trim($this->input->post('fs_kodepos_penjamin'));
				$telepon_penjamin = trim($this->input->post('fs_telepon_penjamin'));
				$usaha_penjamin = trim($this->input->post('fs_usaha_penjamin'));
				$keterangan_usaha_penjamin = trim($this->input->post('fs_keterangan_usaha_penjamin'));
				$alamat_usaha_penjamin = trim($this->input->post('fs_alamat_usaha_penjamin'));
				$telepon_usaha_penjamin = trim($this->input->post('fs_telepon_usaha_penjamin'));
				$pendapatan_penjamin = trim($this->input->post('fn_pendapatan_penjamin'));
				$status_penjamin = trim($this->input->post('fs_status_penjamin'));
				$tanggal_angsuran_pertama = trim($this->input->post('fd_tanggal_angsuran_pertama'));
				$tanggal_jatuhtempo_perbulan = trim($this->input->post('fn_tanggal_jatuhtempo_perbulan'));
				$cair_ke = trim($this->input->post('fs_cair_ke'));
				$uang_muka_bayar_di = trim($this->input->post('fs_uang_muka_bayar_di'));
				$deposit_potong_pencairan = trim($this->input->post('fs_deposit_potong_pencairan'));
				$atasnama_bank_pencairan = trim($this->input->post('fs_atasnama_bank_pencairan'));
				$nama_bank_pencairan = trim($this->input->post('fs_nama_bank_pencairan'));
				$rekening_bank_pencairan = trim($this->input->post('fs_rekening_bank_pencairan'));
				$nilai_pencairan = trim($this->input->post('fn_nilai_pencairan'));
				$tanggal_buat = trim($this->input->post('fd_tanggal_buat'));
				$uangmuka1 = trim($this->input->post('fs_uangmuka1'));
		$xupdate = false;

		$tgl_lahir = trim($this->input->post('fd_tanggal_lahir'));
		
		$umur1 = substr($tgl_lahir,0,4);
		$umur2 = substr($tgl_lahir,5,2);
		$umur3 = substr($tgl_lahir,8,2);
		$birthDate = $umur3.'-'.$umur2.'-'.$umur1;
		//echo "Age is:" . $birthDate;die;
 		$birthDate = explode("-", $birthDate);
  		$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    		? ((date("Y") - $birthDate[2]) - 1)
    	: (date("Y") - $birthDate[2]));

		/*$uangmuka1 = trim($this->input->post('fs_uangmuka1'));
		$uangmuka2 = trim($this->input->post('fs_uangmuka2'));


		$tgl_lahir = trim($this->input->post('fd_tanggal_lahir'));
		
		$umur1 = substr($tgl_lahir,0,4);
		$umur2 = substr($tgl_lahir,5,2);
		$umur3 = substr($tgl_lahir,8,2);
		$birthDate = $umur3.'-'.$umur2.'-'.$umur1;
		//echo "Age is:" . $birthDate;die;
 		$birthDate = explode("-", $birthDate);
  		$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    		? ((date("Y") - $birthDate[2]) - 1)
    	: (date("Y") - $birthDate[2]));


		$jenken = '';
		$rowJenisKend = $this->db->where('fs_kode_referensi','jenis_kendaraan')->where('fs_nama_referensi',$jenis_kendaraan)->from('tm_referensi')->get()->row();
		
		if($rowJenisKend){
		$jenken = $rowJenisKend->fs_nilai1_referensi;
		}
		
		if($jenken=='MT'){

			$roda = 2;

		} else {

			$roda = 4;
		}



		if($jenis_pembiayaan=='P'){

		$pertamakredit_score = '';

		$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE ".$uangmuka1." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
			fs_keterangan='uang_muka' AND fs_kendaraan=".$roda."
			");

		$row = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row->fs_score;

					}

		//$rowPertamaKredit = $this->db->where("'".$uangmuka1."' BETWEEN fs_nilai1 AND fs_nilai2")->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','uang_muka')->from('tm_score')->get()->row();



		$tenor_score = '';

		$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$kali_masa_angsuran_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND fs_keterangan='tenor' AND fs_kendaraan=".$roda."");

		//$rowTenor = $this->db->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','tenor')->where('fs_nilai1 >=', $kali_masa_angsuran_dealer)->where('fs_nilai2 <=', $kali_masa_angsuran_dealer)->from('tm_score')->get()->row();
		
		$row2 = $rowTenor->row();

		
		if($rowTenor->num_rows()>0){

			$tenor_score = $row2->fs_score;

		}

		$umur_score = '';

		$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$age." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND fs_keterangan='umur' AND fs_kendaraan=".$roda."");
		//$rowUmur = $this->db->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','umur')->where('fs_nilai1 >=', $age)->where('fs_nilai2 <=', $age)->from('tm_score')->get()->row();
		
		$row3 = $rowUmur->row();

		
		if($rowUmur->num_rows()>0){

			$umur_score = $row3->fs_score;

		}

		$tanggungan_score = '';

		$rowTanggunan = $this->db->query("SELECT * FROM tm_score WHERE ".$age." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND fs_keterangan='tanggungan' AND fs_kendaraan=".$roda."");
		//$rowUmur = $this->db->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','umur')->where('fs_nilai1 >=', $age)->where('fs_nilai2 <=', $age)->from('tm_score')->get()->row();
		
		$row4 = $rowTanggunan->row();

		
		if($rowTanggunan->num_rows()>0){

			$tanggungan_score = $row4->fs_score;

		}


		$tahun_now = date('Y');
		$tahun_sejak = $this->input->post('fs_tinggal_sejak2');

		$tahun_fix = $tahun_now - $tahun_sejak;


		$lamatinggal_score = '';

		$rowLamatinggal = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND fs_keterangan='lama_tinggal' AND fs_kendaraan=".$roda."");
		//$rowUmur = $this->db->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','umur')->where('fs_nilai1 >=', $age)->where('fs_nilai2 <=', $age)->from('tm_score')->get()->row();
		
		$row5 = $rowLamatinggal->row();

		
		if($rowLamatinggal->num_rows()>0){

			$lamatinggal_score = $row5->fs_score;

		}


		$statusrumah_score = '';

		$rowStatusRumah = $this->db->query("SELECT * FROM tm_score WHERE ".$status_rumah." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND fs_keterangan='status_rumah' AND fs_kendaraan=".$roda."");
		//$rowUmur = $this->db->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','umur')->where('fs_nilai1 >=', $age)->where('fs_nilai2 <=', $age)->from('tm_score')->get()->row();
		
		$row6 = $rowStatusRumah->row();

		
		if($rowStatusRumah->num_rows()>0){

			$statusrumah_score = $row6->fs_score;

		}


		$telfonusaha_score = '';

		$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE ".$status_rumah." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND fs_keterangan='telfon_usaha' AND fs_kendaraan=".$roda."");
		//$rowUmur = $this->db->where('fs_jenis_pembiayaan','P')->where('fs_kendaraan',$roda)->where('fs_keterangan','umur')->where('fs_nilai1 >=', $age)->where('fs_nilai2 <=', $age)->from('tm_score')->get()->row();
		
		$row7 = $rowTelfonUsaha->row();

		
		if($rowTelfonUsaha->num_rows()>0){

			$telfonusaha_score = $row7->fs_score;

		}

		




		} 

		*/
		//else if(){

		//}


		if (trim($no_apk) <> '')
		{
			
				$data = array(
				'fs_kode_cabang' => $kode_cabang,
				'fn_no_apk' => $no_apk,
				'fn_nomor_perjanjian' => $no_pjj,
				'fn_no_batch'=> '',
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
				'fs_kota_konsumen' => $kota_konsumen,
				'fs_kodepos_konsumen' => $kode_pos_konsumen,
				'fs_ktp_konsumen' => $ktp_konsumen,
				'fs_masa_ktp_konsumen' => $masa_ktp_konsumen,
				'fs_kartu_keluarga' => $kartu_keluarga,
				'fs_telepon_konsumen' => $telepon_konsumen,
				'fs_handphone_konsumen' => $hp_konsumen,
				'fs_email_konsumen' => $email_konsumen,
				'fs_group_perusahaan' => '',
				'fs_npwp_konsumen' => $npwp,
				'fs_siup_perusahaan' => '',
				'fs_tdp_perusahaan' => '',
				'fs_nama_perusahaan_konsumen' => $nama_perusahaan,
				'fs_bentuk_perusahaan' => '',
				'fs_status_perusahaan' => '',
				'fs_tempat_perusahaan' => '',
				'fs_beroperasi_sejak' => '',
				'fs_alamat_usaha_konsumen' => $alamat_usaha_konsumen,
				'fs_telfon_usaha_konsumen' => $telfon_usaha_konsumen,
				'fs_kerja_sejak_konsumen' => $kerja_sejak,
				'fs_kategori_usaha_konsumen' => $kategori_usaha_konsumen,
				'fs_keterangan_usaha_konsumen' => $keterangan_usaha_konsumen,
				'fs_usaha_pekerjaan_konsumen' => $usaha_pekerjaan_konsumen,
				'fs_skala_perusahaan_konsumen' => '',
				'fn_pendapatan_konsumen	' => $pendapatan_konsumen,
				'fs_jenis_kelamin_konsumen' => $jenis_kelamin_konsumen,
				'fs_agama_konsumen' => $agama_konsumen,
				'fs_tempat_lahir_konsumen' => $tempat_lahir_konsumen,
				'fd_tanggal_lahir_konsumen' => $tgl_lahir_konsumen,
				'fs_pendidikan_konsumen' => $pendidikan_konsumen,
				'fn_biaya_konsumen' => $biaya_konsumen,
				'fs_nama_ibu_kandung' =>  $nama_ibu_kandung,
				'fs_jenis_piutang' =>  $jenis_piutang,
				'fs_status_konsumen' =>  $status_konsumen,
				'fn_tanggungan_konsumen' =>  $tanggungan_konsumen,
				'fn_jumlah_karyawan_perusahaan' =>  '',
				'fs_status_rumah' => $status_rumah,
				'fs_tinggal_sejak' => $tinggal_sejak,
				'fs_alamat_korespondensi' => $alamat_korespondensi,
				'fs_kota_korespondensi' => $kota_korespondensi,
				'fs_kodepos_korespondensi' => $kode_pos_korespondensi,
				'fs_pertama_kali_kredit' => $pertama_kali_kredit,
				'fn_jumlah_kali_kredit'=> $jumlah_kali_kredit,
				'fn_mutasi_debet' => '',
				'fn_mutasi_kredit' => '',
				'fs_penanggungjawab_perusahaan' => '',
				'fs_ktp_penanggungjawab_perusahaan' => '',
				'fs_npwp_penanggungjawab_perusahaan' => '',
				'fs_alamat_penanggungjawab_perusahaan' => '',
				'fs_kota_penanggungjawab_perusahaan' => '',
				'fs_kodepos_penanggungjawab_perusahaan' => '',
				'fs_jabatan_penanggungjawab_perusahaan' => '',
				'fs_telepon_penanggungjawab_perusahaan' =>  '',
				'fs_handphone_penanggungjawab_perusahaan' => '',
				'fs_repeat_order' => '',
				'fs_repeat_order_ke' => '',
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
				'fn_biaya_adm' => $biaya_adm,
				'fn_premi_asuransi_gross' => $premi_asuransi_gross,
				'fn_premi_asuransi_gross_perluasan' => '',
				'fn_premi_asuransi_netto' => $premi_asuransi_netto,
				'fn_denda_perhari' => '',
				'fn_harga_otr' => $harga_otr,
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
				'fs_nama_pasangan' => $nama_pasangan,
				'fs_handphone_pasangan'=> $handphone_pasangan,
				'fs_usaha_pasangan' => $usaha_pasangan,
				'fs_keterangan_usaha_pasangan ' => $keterangan_usaha_pasangan,
				'fs_alamat_usaha_pasangan' => $alamat_usaha_pasangan,
				'fs_telepon_usaha_pasangan' => $telepon_usaha_pasangan,
				'fn_pendapatan_pasangan' => $pendapatan_pasangan,
				'fs_nama_penjamin' => $nama_penjamin,
				'fs_alamat_penjamin' => $alamat_penjamin,
				'fs_kota_penjamin' => $kota_penjamin,
				'fs_kodepos_penjamin' => $kodepos_penjamin,
				'fs_telepon_penjamin' => $telepon_penjamin,
				'fs_usaha_penjamin' => $usaha_penjamin,
				'fs_keterangan_usaha_penjamin' => $keterangan_usaha_penjamin,
				'fs_alamat_usaha_penjamin' => $alamat_usaha_penjamin,
				'fs_telepon_usaha_penjamin' => $telepon_usaha_penjamin,
				'fn_pendapatan_penjamin' => $pendapatan_penjamin,
				'fs_status_penjamin' => $status_penjamin,
				'fd_tanggal_perjanjian' => '',
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
				'fs_kondisi_kantor' => '',
				'fs_catatan_tempat_tinggal' => '',
				'fs_catatan_lingkungan' => '',
				'fs_catatan_tempat_usaha' => '',
				'fs_flag_survey' => '',
				'fs_iduser_buat_survey' => '',
				'fd_tanggal_buat_survey' =>'',
				'fs_keputusan_kredit' => '',
				'fs_flag_keputusan' => '',
				'fs_iduser_buat_keputusan' => '',
				'fd_tanggal_buat_keputusan' => '',
				'fs_score' => '',
				'fs_grade' => '',
				'fs_kategori_perusahaan_konsumen' => '',
				'fs_uang_muka_dealer' => $uangmuka1,
				'umur' => $age,
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

	function grid_asuransi()
	{
		$namaref = trim($this->input->post('fs_nama_referensi'));
		$namakoderef = 'jenis_asuransi';

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
					'fs_jenis_asuransi'	=> trim($xRow->fs_nama_referensi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function grid_trans()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mSearch');

		$sSQL = $this->mSearch->ambilKodeTransAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->ambilKodeTrans($cari,$nStart,$nLimit);
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

	function nilaidefa()
	{

		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
		$no_apk = '';
		$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fs_jenis_counter','APK')->from('tm_counter')->get()->row();
		if($rowApk){
		$no_apk = $rowApk->fn_counter+1;
		}


		$hasil = array(
			'sukses'	=> true,
			'kode_cabang'	=> trim($kode_cabang)
		);
		echo json_encode($hasil);
	}

	function biayaadmin()
	{

		$pola = trim($this->input->post('fs_pola_transaksi'));
		$jenispiu = trim($this->input->post('fs_jenis_piutang'));
		$tenor = trim($this->input->post('fd_lama_angsuran'));
		$otr = trim($this->input->post('fs_otr'));

		//print_r($jenispiu);


		$biaya = '';
		$rowBiaya = $this->db->where('fs_pola_transaksi',$pola)->where('fs_jenis_piutang',$jenispiu)->where('fd_lama_angsuran',$tenor)->from('tm_biaya_admin')->get()->row();

		if($rowBiaya){
		$biaya = $rowBiaya->fs_biaya_admin;
		}


		$hasil = array(
			'sukses'	=> true,
			'hasil'	=> trim($biaya)
		);
		echo json_encode($hasil);
	}

	function biayafidusia()
	{

		$pola = trim($this->input->post('fs_pola_transaksi'));
		$jenispiu = trim($this->input->post('fs_jenis_piutang'));
		$otr = trim($this->input->post('fs_otr'));

		//print_r($jenispiu);


		$biaya = '';
$rowBiaya = $this->db->where('fs_pola_transaksi',$pola)->where('fs_kode_cabang',$this->session->userdata('gKodeCabang'))->where('fs_jenis_piutang',$jenispiu)->where('fs_max_otr >=',$otr)->where('fs_min_otr <=',$otr)->from('tm_biaya_fidusia')->get()->row();

		if($rowBiaya){
		$biaya = $rowBiaya->fs_biaya_fidusia;
		}


		$hasil = array(
			'sukses'	=> true,
			'hasil'	=> trim($biaya)
		);
		echo json_encode($hasil);
	}

	function premigross()
	{

		$jenis = trim($this->input->post('jenis_kendaraan'));
		$tjh = 0;
		$komersil = trim($this->input->post('komersil'));
		//echo $komersil;die;
		$otr = trim($this->input->post('otr'));
		$tahuns = trim($this->input->post('tahun_pencairan'));
		$tenor = trim($this->input->post('tenor'));
		$asuransi = trim($this->input->post('asuransi'));
		$usia_kendaraan = trim($this->input->post('usia_kendaraan'));
		$tahun = substr($tahuns, 0,4);
		//echo $tahun;die;

		$jenken = '';
		$rowJenisKend = $this->db->where('fs_kode_referensi','jenis_kendaraan')->where('fs_nama_referensi',$jenis)->from('tm_referensi')->get()->row();

		$rowWilayah = $this->db->where('fs_kode_cabang',$this->session->userdata('gKodeCabang'))->from('tm_cabang')->get()->row();
		$wilayah = $rowWilayah->fs_wilayah_asuransi;
		//echo $this->session->userdata('gKodeCabang').' ';

		$rowLoadingRate = $this->db->where('fs_kode_referensi','loading_rate')->from('tm_referensi')->get()->row();
		$loadingrate = $rowLoadingRate->fs_nilai1_referensi;

		
		if($rowJenisKend){
		$jenken = $rowJenisKend->fs_nilai1_referensi;
		}

		if($asuransi == 'T'){


			$rate =  $tahun - $usia_kendaraan;

				if($tenor>0 and $tenor<=12){

						$thn_kredit=1;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							

							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>12 and $tenor<=24){

						$thn_kredit=2;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
						
								$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>24 and $tenor<=36){

						$thn_kredit=3;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						//echo $defrisiasi.' ';
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							

								$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;
						//echo $premigross1;
						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>36 and $tenor<=48){

						$thn_kredit=4;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							
							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);
							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>48){

						$thn_kredit=4;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							

								$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}
			
		}

		else if($asuransi == 'A') {

			$rate =  $tahun - $usia_kendaraan;


			if($jenken=='BS' || $jenken=='PU' || $jenken=='MT') 
			{

				if($tenor>0 and $tenor<=12){

						$thn_kredit=1;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}

							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}

						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>12 and $tenor<=24){

						$thn_kredit=2;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}

							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>24 and $tenor<=36){

						$thn_kredit=3;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;

							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}
							
							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				if($tenor>36 and $tenor<=48){

						$thn_kredit=4;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;

							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}
							
							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}


			} else {
				
				$rate =  $tahun - $usia_kendaraan;

				 if($tenor>0 and $tenor<=12){

				
						$thn_kredit=1;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;

						//echo $otrfix.' ';

						

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

						//var_dump($rowBiaya)

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}


							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);


							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $value['persen'].' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
						//	}
						}
						//$persentampungan = $res;
						
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}


				 /*if($tenor=='12'){

						$thn_kredit=1;

						//
						//$i=1;
						$total = '1';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otr)->where('fs_min_otr <=',$otr)->from('tm_biaya_asuransi')->get()->row();
						//$a = var_dump($rowBiaya);
						//echo $jenken;die;
						if($rowBiaya){
							$total = $rowBiaya->fs_persentase_premi;
							}

						//echo $rate;die;
						$premi_rate=0;
						if($rate > 5){

							//echo $loadingrate;die;
							$premi_rate = ($rate-6+1)*$loadingrate;

						}
						$premipercent =  $total+($premi_rate*$total);
						$premigross1 = $premipercent * $otr;
						
						
						$premigrossfix = $premigross1 + 25000 + $tjh;
						//echo $premipercent;die;

					
						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
					}
				*/
				 else if($tenor>12 and $tenor<=24){

						$thn_kredit=2;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//$otr2 = $otr;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}


							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $value['persen'].' ';
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' '; 
						
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
						//	}
						}
						//$persentampungan = $res;
						//echo $premigross1;die;
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
					}



					else if($tenor>24 and $tenor<=36){

						$thn_kredit=3;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

			$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}


							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
						//	}
						}
						//$persentampungan = $res;
						//echo $premigross1;die;
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
					}

					else if($tenor>36 and $tenor<=48){

						$thn_kredit=4;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

			$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}


							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}

							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
						//	}
						}
						//$persentampungan = $res;
						//echo $premigross1;die;
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
					}

					else if($tenor>48){

						$thn_kredit=4;

						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							
							if($rate > 5){

								$premi_rate = ($rate-6+$i)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}

							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigrossfix = $premigross1;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
						//}
						
				}

				else {

					$premigrossfix = 0;

						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premigrossfix)
						);
						echo json_encode($hasil);
				}


				
			}

		}
		else if($asuransi == 'M') {

			$jenis = explode('|', trim($this->input->post('jenisasuransi')));
			$tahunke = explode('|', trim($this->input->post('tahunke')));

			$rate =  $tahun - $usia_kendaraan;
			


				$jml = count($tahunke) - 1;

				if ($jml != 0)
				{	
					$premimix=1;
					for ($j=1; $j<=$jml; $j++)
					{ 

					if($jenis[$j]=='TOTAL LOST'){

						$thn_kredit=$j;


						
						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$j)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi','T')->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


								$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premimix += $premigross1;
						
				
						}

						else if($jenis[$j]=='ALLRISK'){


						$thn_kredit=$j;


						//
						//$i=1;
						$total = 1;
						$arr = array();
						$arr2 = array();

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$j)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
					

						$rowBiaya = $this->db->where('fs_kode_asuransi','A')->where('fs_wilayah_asuransi',$wilayah)->where('fs_jenis_kendaraan',$jenken)->where('fs_komersial',$komersil)->where('fs_max_otr >=',$otrfix)->where('fs_min_otr <=',$otrfix)->from('tm_biaya_asuransi')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_persentase_premi;

							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							
							if($rate > 5){

								$premi_rate = ($rate-6+$j)*$loadingrate;
								//echo $premi_rate.' ';
								//$arr2[] = $premi_rate;
							}

							$arr[] = array(
								'ke'	=> trim($i),
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						
						
						//echo $arr2;die;
						//$str = implode(", ", $arr);
						//echo $str;die;
						$premigross1=1;
						$premipercent=1;

						foreach ($arr as $value) {
							//foreach ($arr2 as $value2) {

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							if($value['ke']==1){
							$premigrossx = $premipercents * $otr;

							} else {

							$premigrossx = $premipercents * $otr * $defrisiasi;	
							}
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}



						$premimix += $premigross1;
				

						}

						
					

					}



						$premidone = $premimix;
						$hasil = array(
							'sukses'	=> true,
							'hasil'	=> trim($premidone)
						);
						echo json_encode($hasil); 

				}


		}		
	}

	function perluasan()
	{

		$jenis = trim($this->input->post('jenis_kendaraan'));
		$tjh = 0;
		$komersil = trim($this->input->post('komersil'));
		$otr = trim($this->input->post('otr'));
		$tahuns = trim($this->input->post('tahun_pencairan'));
		$tenor = trim($this->input->post('tenor'));
		$asuransi = trim($this->input->post('asuransi'));
		$usia_kendaraan = trim($this->input->post('usia_kendaraan'));
		$tahun = substr($tahuns, 0,4);
		//echo $tahun;die;

		$jenken = '';
		$rowJenisKend = $this->db->where('fs_kode_referensi','jenis_kendaraan')->where('fs_nama_referensi',$jenis)->from('tm_referensi')->get()->row();

		$rowWilayah = $this->db->where('fs_kode_cabang',$this->session->userdata('gKodeCabang'))->from('tm_cabang')->get()->row();
		$wilayah = $rowWilayah->fs_wilayah_asuransi;
		//echo $this->session->userdata('gKodeCabang').' ';

		$rowLoadingRate = $this->db->where('fs_kode_referensi','loading_rate')->from('tm_referensi')->get()->row();
		$loadingrate = $rowLoadingRate->fs_nilai1_referensi;

		
		if($rowJenisKend){
		$jenken = $rowJenisKend->fs_nilai1_referensi;
		}

		if($komersil=='1'){
			$komersil='T';
		}else {
			$komersil='Y';
		}

		if($asuransi == 'T'){

			$nama_perluasan = explode('|', trim($this->input->post('nama_perluasan')));
			$tenor = explode('|', trim($this->input->post('tenor_perluasan')));

			$rate =  $tahun - $usia_kendaraan;
			


				$jml = count($tenor) - 1;


						$arr = array();
						$arr2 = array();
						$arr3 = array();
						$arr4 = array();
						$arr5 = array();

						$premigempa=0;
						$premihuruhara=0;
						$premisabotase=0;
						$premibanjir=0;
				if ($jml != 0)
				{

						for ($j=1; $j<=$jml; $j++)
						{ 

							
						if($nama_perluasan[$j]=='BANJIR'){


						$thn_kredit=$tenor[$j];

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Banjir')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;

							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


							$arr[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($otrfix);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr as $value) {
							

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premibanjir = $premigross1;

						}
						
						

						if($nama_perluasan[$j]=='GEMPA'){


						$thn_kredit=$tenor[$j];


						//echo $thn_kredit.' ';

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Gempa')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;


							//$arr[] = $persen;
							
							$premi_rate=0;
							


							$arr2[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr2 as $value) {
							

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigempa += $premigross1;

						}


						if($nama_perluasan[$j]=='HURU-HARA'){


						$thn_kredit=$tenor[$j];

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Huru-hara')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


							$arr3[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr3 as $value) {
							
							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						
						$premihuruhara += $premigross1;

						}

						if($nama_perluasan[$j]=='SABOTASE'){


						$thn_kredit=$tenor[$j];

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';
						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Sabotase')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


							$arr4[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr4 as $value) {
							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premisabotase += $premigross1;

						}
		
						


						
	

						
				}

				$biayafix =  $premisabotase + $premibanjir + $premigempa + $premihuruhara;
				$hasil = array(
					'sukses'	=> true,
					'hasil'	=> trim($biayafix)
				);
				echo json_encode($hasil);


				}

			}

			else if($asuransi == 'A'){

			$nama_perluasan = explode('|', trim($this->input->post('nama_perluasan')));
			$tenor = explode('|', trim($this->input->post('tenor_perluasan')));

			$rate =  $tahun - $usia_kendaraan;
			


				$jml = count($tenor) - 1;


						$arr = array();
						$arr2 = array();
						$arr3 = array();
						$arr4 = array();
						$arr5 = array();

						$premigempa=0;
						$premihuruhara=0;
						$premisabotase=0;
						$premibanjir=0;
				if ($jml != 0)
				{

						for ($j=1; $j<=$jml; $j++)
						{ 

							
						if($nama_perluasan[$j]=='BANJIR'){


						$thn_kredit=$tenor[$j];

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Banjir')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;

							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


							$arr[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($otrfix);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr as $value) {
							

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premibanjir = $premigross1;

						}
						
						

						if($nama_perluasan[$j]=='GEMPA'){


						$thn_kredit=$tenor[$j];


						//echo $thn_kredit.' ';

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Gempa')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;


							//$arr[] = $persen;
							
							$premi_rate=0;
							


							$arr2[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr2 as $value) {
							

							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premigempa += $premigross1;

						}


						if($nama_perluasan[$j]=='HURU-HARA'){


						$thn_kredit=$tenor[$j];

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';

						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Huru-hara')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


							$arr3[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr3 as $value) {
							
							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						
						$premihuruhara += $premigross1;

						}

						if($nama_perluasan[$j]=='SABOTASE'){


						$thn_kredit=$tenor[$j];

						//
						//$i=1;
						$total = 1;
						for($i=1;$i<=$thn_kredit;$i++){

						$rowDefrisiasi = $this->db->where('fs_kode_referensi','depresiasi_asuransi')->where('fs_nilai1_referensi',$i)->from('tm_referensi')->get()->row();
						
						$defrisiasi = $rowDefrisiasi->fs_nilai2_referensi;
						$otrfix = $otr * $defrisiasi;
						//echo $otrfix.' ';
						$rowBiaya = $this->db->where('fs_kode_asuransi',$asuransi)->where('fs_wilayah_asuransi',$wilayah)->where('fs_perluasan','Sabotase')->from('tm_biaya_perluasan')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_kontribusi;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;
							


							$arr4[] = array(
								'persen'	=> trim($persen),
								'premi_rate'		=> trim($premi_rate),
								'otrfix'  => trim($otrfix)
							);

							
							//$arr2[] = array($premipercent);
					

							//$total = $rowBiaya->fs_persentase_premi;
							}

						}

						$premigross1=0;
						$premipercent=0;

						foreach ($arr4 as $value) {
							//echo $value2;die;
							//$premipercent +=  $value+($value2*$value);
							//$premipercents =  $value['persen']+($value['persen']*$value['premi_rate']);
							//echo $premipercents.' ';
							$premigrossx = $value['otrfix'] * $value['persen'];
							//echo $premigrossx.' ';
							$premigross1 += $premigrossx;
							//echo $value['premi_rate'].' ';
					
						}
						
						$premisabotase += $premigross1;

						}
		
						


						
	

						
				}

				$biayafix =  $premisabotase + $premibanjir + $premigempa + $premihuruhara;
				$hasil = array(
					'sukses'	=> true,
					'hasil'	=> trim($biayafix)
				);
				echo json_encode($hasil);


				}

			}

	}

	function tjh()
	{

		$jenis = trim($this->input->post('jenis_kendaraan'));
		$tjh = 0;
		$komersil = trim($this->input->post('komersil'));
		$otr = trim($this->input->post('otr'));
		$tahuns = trim($this->input->post('tahun_pencairan'));
		$tenor = trim($this->input->post('tenor'));
		$asuransi = trim($this->input->post('asuransi'));
		$usia_kendaraan = trim($this->input->post('usia_kendaraan'));
		$tahun = substr($tahuns, 0,4);
		//echo $tahun;die;

		$jenken = '';
		$rowJenisKend = $this->db->where('fs_kode_referensi','jenis_kendaraan')->where('fs_nama_referensi',$jenis)->from('tm_referensi')->get()->row();

		$rowWilayah = $this->db->where('fs_kode_cabang',$this->session->userdata('gKodeCabang'))->from('tm_cabang')->get()->row();
		$wilayah = $rowWilayah->fs_wilayah_asuransi;
		//echo $this->session->userdata('gKodeCabang').' ';

		$rowLoadingRate = $this->db->where('fs_kode_referensi','loading_rate')->from('tm_referensi')->get()->row();
		$loadingrate = $rowLoadingRate->fs_nilai1_referensi;

		
		if($rowJenisKend){
		$jenken = $rowJenisKend->fs_nilai1_referensi;
		}

		$otr1 = $otr - 25000000;

		if($otr1 > 0 ){

			$harga_premi3 = 25000000;
			$rowBiaya3 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >=','0')->where('fs_min_otr <=',$harga_premi3)->from('tm_biaya_tjh')->get()->row();

							if($rowBiaya3){
							$persen3 = $rowBiaya3->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';

							$premi3 = $harga_premi3 * $persen3;

							}

			$harga_premi2 = 50000000;
			$rowBiaya2 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >','25000000')->where('fs_min_otr <=',$harga_premi2)->from('tm_biaya_tjh')->get()->row();

							

							if($rowBiaya2){
							$persen2 = $rowBiaya2->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi2 = $otr1 * $persen2;

							}

							if($otr1 >= 25000000 ){

								$otr2 = $otr1 - 25000000;

								$harga_premi4 = 25000000;
			$rowBiaya4 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >=','0')->where('fs_min_otr <=',$harga_premi4)->from('tm_biaya_tjh')->get()->row();

							if($rowBiaya4){
							$persen4 = $rowBiaya4->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';

							$premi4 = $harga_premi4 * $persen4;

							}

			$harga_premi6 = 25000000;
			$rowBiaya6 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >','25000000')->where('fs_min_otr <=','50000000')->from('tm_biaya_tjh')->get()->row();

							

							if($rowBiaya6){
							$persen6 = $rowBiaya6->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi6 = $harga_premi6 * $persen6;

							}

			$harga_premi5 = 50000000;
			$rowBiaya5 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >','50000000')->where('fs_min_otr <=','1000000000')->from('tm_biaya_tjh')->get()->row();

							

							if($rowBiaya5){
							$persen5 = $rowBiaya5->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi5 = $otr2 * $persen5;

							}


									if($otr2 >= 50000000){

										$otr3 = $otr2 - 50000000;



						$harga_premi7 = 25000000;
						$rowBiaya7 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >=','0')->where('fs_min_otr <=',$harga_premi7)->from('tm_biaya_tjh')->get()->row();

										if($rowBiaya7){
										$persen7 = $rowBiaya7->fs_rate_tjh;
										//$arr[] = $persen;
										//echo $persen.' ';

										$premi7 = $harga_premi7 * $persen7;
										}

					$harga_premi8 = 25000000;
					$rowBiaya8 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >','25000000')->where('fs_min_otr <=','50000000')->from('tm_biaya_tjh')->get()->row();

									

									if($rowBiaya8){
									$persen8 = $rowBiaya8->fs_rate_tjh;
									//$arr[] = $persen;
									//echo $persen.' ';
									$premi8 = $harga_premi8 * $persen8;

									}

			$harga_premi9 = 50000000;
			$rowBiaya9 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >','50000000')->where('fs_min_otr <=','1000000000')->from('tm_biaya_tjh')->get()->row();

							

							if($rowBiaya9){
							$persen9 = $rowBiaya9->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi9 = $harga_premi9 * $persen9;

							}

			$harga_premi10 = 50000000;
			$rowBiaya10 = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >','1000000000')->where('fs_min_otr <=','999999999999999999')->from('tm_biaya_tjh')->get()->row();

							

							if($rowBiaya10){
							$persen10 = $rowBiaya10->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi10 = $otr3 * $persen10;

							}

							if($otr3 >= 999999999999999999){


							} else {

								$premigrossfix9 = $premi7 + $premi8 + $premi9 + $premi10;

										$hasil = array(
											'sukses'	=> true,
											'hasil'	=> trim($premigrossfix9)
										);
										echo json_encode($hasil);

							}



									}else {

										$premigrossfix3 = $premi4 + $premi5 + $premi6;

										$hasil = array(
											'sukses'	=> true,
											'hasil'	=> trim($premigrossfix3)
										);
										echo json_encode($hasil);

									}


							} else {

							$premigrossfix2 = $premi3 + $premi2;

							$hasil = array(
								'sukses'	=> true,
								'hasil'	=> trim($premigrossfix2)
							);
							echo json_encode($hasil);

							}




		}
		else {

			$harga_premi = 25000000;
			$rowBiaya = $this->db->where('fs_jenis_kendaraan',$jenken)->where('fs_max_otr >=','0')->where('fs_min_otr <=',$harga_premi)->from('tm_biaya_tjh')->get()->row();

							if($rowBiaya){
							$persen = $rowBiaya->fs_rate_tjh;
							//$arr[] = $persen;
							//echo $persen.' ';
							$premi_rate=0;

							$premigrossfix = $harga_premi * $persen;

							$hasil = array(
								'sukses'	=> true,
								'hasil'	=> trim($premigrossfix)
							);
							echo json_encode($hasil);	

							}
		}


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
	
	
}
?>