<?php

class TransferApk extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vtransferapk');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function gridtransfer()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mTransferApk');
		$sSQL = $this->mTransferApk->listTransferAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mTransferApk->listTransfer($cari, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_keputusan_kredit' => ascii_to_entities(trim($xRow->keputusan_kredit)),
						'fs_catatan_analisa' => ascii_to_entities(trim($xRow->fs_catatan_analisa))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ceksave()
	{
		$is_noapk = trim($this->input->post('is_noapk'));
		if ($this->session->userdata('gKodeCabang') != '00') {
			if ($is_noapk > 0)
			{
				$hasil = array(
					'sukses' => true,
					'hasil'	 => 'Export '.$is_noapk. ' Record No. PJJ',
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses' => false,
					'hasil' => 'Please, Check No. PJJ'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Cannot Export DBF as Head Office'
				);
			echo json_encode($hasil);
		}
	}

	function deleteDBF()
	{
		foreach (glob("temp/*.dbf") as $file) {
			unlink($file);
		}
		unlink("./temp/download.zip");
	}

	function createDBF()
	{
		$this->load->helper('dbf');
		createAPK();
		createAPKJ();
		createAPKK();
		createAPKP();
		createAPKS();
		createAPKT();
		createCAIR();
	}

	function createZip()
	{
		$zip = new ZipArchive;
		$download = 'temp/download.zip';
		$zip->open($download, ZipArchive::CREATE);

		foreach (glob("temp/*.dbf") as $file) { 
        	$zip->addFile($file);
    	}
    	$zip->close();
	}

	function save()
	{
		$noapk = explode('|', trim($this->input->post('fn_no_apk')));
		$kdcabang = trim($this->session->userdata('gKodeCabang'));
		$jml = count($noapk) - 1;
		$this->deleteDBF();
		$this->createDBF();

		$db1 = dbase_open('./temp/DTAPK.dbf', 2);
		$db2 = dbase_open('./temp/DTAPKJ.dbf', 2);
		$db3 = dbase_open('./temp/DTAPKK.dbf', 2);
		$db4 = dbase_open('./temp/DTAPKP.dbf', 2);
		$db5 = dbase_open('./temp/DTAPKS.dbf', 2);
		$db6 = dbase_open('./temp/DTAPKT.dbf', 2);
		$db7 = dbase_open('./temp/DTCAIR.dbf', 2);
		
		if ($jml > 0) {

			for ($i=1; $i<=$jml; $i++) {
				$this->load->model('mTransferApk');
				
				$single = $this->mTransferApk->single($noapk[$i], $kdcabang);
				foreach ($single->result() as $row) {

						// REVISI 'karena di database sudah terlanjur jadi = T'
						if (!empty($row->fs_komersial)) { 
							if ($row->fs_komersial == 'T') {
								$komersial = 'N';
							} else {
								$komersial = $row->fs_komersial;
							}
						} else {
							$komersial = '';
						}

						dbase_add_record($db1, array(
							'A', $row->fn_no_apk, $row->fs_jenis_pembiayaan, 
							date("Ymd", strtotime($row->fd_tgl_apk)), $row->fs_kode_lokasi, 
							$row->fs_nomor_dealer, $row->fs_jenis_piutang, 
							$row->fs_pola_transaksi, $row->fn_nomor_perjanjian, 
							date("Ymd", strtotime($row->fd_tanggal_perjanjian)), 
							$row->fs_nama_konsumen, substr($row->fs_alamat_konsumen, 0, 30), 
							substr($row->fs_alamat_konsumen, 30, 30), $row->fs_kota_konsumen, 
							$row->fs_kodepos_konsumen, $row->fs_telepon_konsumen, 
							$row->fs_kategori_usaha_konsumen, $row->fs_keterangan_usaha_konsumen,
							substr($row->fs_alamat_usaha_konsumen, 0, 30), substr($row->fs_alamat_usaha_konsumen, 30, 30),
							$row->fs_telfon_usaha_konsumen, $row->fn_pendapatan_konsumen, $row->fs_nama_pasangan,
							$row->fs_usaha_pasangan, $row->fs_keterangan_usaha_pasangan, 
							substr($row->fs_alamat_usaha_pasangan, 0, 30), substr($row->fs_alamat_usaha_pasangan, 30, 30),
							$row->fs_telepon_usaha_pasangan, $row->fn_pendapatan_pasangan, $row->fs_nama_penjamin,
							substr($row->fs_alamat_penjamin, 0, 30), substr($row->fs_alamat_penjamin, 30, 30),
							$row->fs_kota_penjamin, $row->fs_kodepos_penjamin, $row->fs_telepon_penjamin, 
							$row->fs_usaha_penjamin, $row->fs_keterangan_usaha_penjamin, $row->fs_status_penjamin,
							substr($row->fs_alamat_usaha_penjamin, 0, 30), substr($row->fs_alamat_usaha_penjamin, 30, 30),
							$row->fs_telepon_usaha_penjamin, $row->fn_pendapatan_penjamin, 
							substr($row->fs_alamat_korespondensi, 0, 30), substr($row->fs_alamat_korespondensi, 30, 30),
							$row->fs_kota_korespondensi, $row->fs_kodepos_korespondensi, $row->fs_status_rumah, '', '',
							$row->fs_jenis_kelamin_konsumen, $row->fs_tempat_lahir_konsumen, 
							date("Ymd", strtotime($row->fd_tanggal_lahir_konsumen)),
							$row->fs_agama_konsumen, $row->fs_pendidikan_konsumen, $row->fs_status_konsumen, 
							$row->fn_tanggungan_konsumen, $row->fn_biaya_konsumen, '', '', 
							date("Ymd", strtotime($row->fd_tanggal_survey)),
							$row->fn_lama_survey, $row->fs_petugas_survey, $row->fs_keputusan_kredit, 
							date("Ymd", strtotime($row->fd_tanggal_buat_keputusan)), 
							$row->fs_catatan_analisa, '', $row->fs_salesman, '',
							date("Ymd", strtotime($row->fd_tanggal_buat)), 
							(string) substr($row->fs_kerja_sejak_konsumen, -4, 4).substr($row->fs_kerja_sejak_konsumen, 0, 2), (string) substr($row->fs_tinggal_sejak, -4, 4).substr($row->fs_tinggal_sejak, 0, 2),
							$row->fs_iduser_buat, $row->fs_jenis_asuransi, '', $row->fs_handphone_konsumen,
							$row->fs_email_konsumen, '', 'X', 1, 1, $row->fs_iduser_buat, 1, 1, $row->fs_iduser_buat, 
							0, 0, '', '', $row->fs_ktp_konsumen, date("Ymd", strtotime($row->fs_masa_ktp_konsumen)), $row->fs_npwp_konsumen,
							'', $row->fs_nama_ibu_kandung, $row->fs_usaha_pekerjaan_konsumen, $row->fs_kelurahan_konsumen,
							$row->fs_kecamatan_konsumen, $row->fs_kode_dati_konsumen, '', ''
						));

						dbase_add_record($db3, array(
							'A', $row->fn_no_apk, 1, $row->fs_warna_kendaraan, $row->fn_tahun_kendaraan,
							0, 0, $row->fs_kota_bpkb, $row->fs_nama_bpkb, substr($row->fs_alamat_bpkb, 0, 30), substr($row->fs_alamat_bpkb, 30, 30), '', '', 0,
							$row->fs_kode_wilayah_no_polisi, $row->fs_no_polisi, $row->fs_kode_akhir_wilayah_no_polisi,
							0, 0, 0, 0, '', '', '', '', $row->fs_no_rangka, $row->fs_no_mesin, $row->fs_nomor_bpkb
						));

						dbase_add_record($db5, array(
							'A', $row->fn_no_apk, $row->fs_jenis_pembiayaan, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
							$row->fs_garasi, $row->fs_repeat_order, $row->fs_kondisi_lingkungan, $row->fs_kondisi_kantor,
							$row->fs_skala_perusahaan_konsumen, 0, 0, 0, '', $row->fs_score, $row->fs_grade,
							$row->fs_kode_paket, '', '', $row->fn_premi_asuransi, $row->fn_jumlah_kali_kredit,
							$row->fs_pertama_kali_kredit, '', '', '', '', '', $komersial, 
							$row->fs_nama_perusahaan_konsumen
						));

						dbase_add_record($db6, array(
							'A', $row->fn_no_apk, $row->fn_cabang_dealer, 0, '', $row->fs_nama_bank_pencairan,
							$row->fs_rekening_bank_pencairan, 0, 0, '', 0, 0, 0, $row->fs_kode_kendaraan, 1,
							$row->fn_tahun_kendaraan, $row->fn_harga_otr, $row->fs_silinder_kendaraan,
							$row->fn_uang_muka_konsumen, $row->fn_asuransi_dikredit_konsumen,
							$row->fn_persen_bunga_flat_konsumen, $row->fn_persen_bunga_efektif_konsumen,
							$row->fn_bunga_konsumen, $row->fn_angsuran_konsumen, $row->fn_angsuran_tidak_sama_dealer,
							'', $row->fn_uang_muka_dealer, $row->fn_asuransi_dikredit_dealer,
							$row->fn_persen_bunga_flat_dealer, $row->fn_persen_bunga_efektif_dealer, $row->fn_bunga_dealer,
							$row->fn_angsuran_dealer, $row->fn_angsuran_tidak_sama_konsumen, '', $row->fs_pola_angsuran,
							$row->fs_cara_bayar, $row->fs_angsuran_dibayar_dealer, $row->fn_bulan_masa_angsuran_dealer,
							$row->fn_kali_masa_angsuran_dealer, $row->fn_bulan_masa_angsuran_konsumen, 
							$row->fn_kali_masa_angsuran_konsumen, 
							date("Ymd", strtotime($row->fd_tanggal_angsuran_pertama)), 
							$row->fn_tanggal_jatuhtempo_perbulan, $row->fs_angsuran_dimuka, $row->fn_kali_angsuran_dimuka,
							$row->fn_jumlah_angsuran_dimuka, $row->fs_angsuran_dimuka_potong_pencairan, 
							$row->fs_deposit_potong_pencairan, $row->fn_biaya_adm, 0, 0, $row->fn_premi_asuransi_netto, 
							0, 0, $row->fs_kode_dealer1, $row->fs_kode_dealer2, '', '', '', '', 
							$row->fs_atasnama_bank_pencairan, $row->fs_cair_ke, $row->fs_uang_muka_bayar_di,
							'', '', 0, 5, 0, 0
						));

						dbase_add_record($db7, array(
							$row->fn_no_apk, $row->fn_nilai_pencairan
						));
				}

				$dbl = $this->mTransferApk->double($noapk[$i], $kdcabang);
				foreach ($dbl->result() as $row) {

						dbase_add_record($db4, array(
							'A', $row->fn_no_apk, $row->fs_nama_pengurus, '', $row->fs_alamat_pengurus,
							$row->fs_kota_pengurus, '', '', '', $row->fs_ktp_pengurus, $row->fs_kode_jabatan,
							$row->fs_persen_saham, $row->fs_npwp_pengurus
						));
				}

				$dtl = $this->mTransferApk->detail($noapk[$i], $kdcabang);
				foreach ($dtl->result() as $row) {
						if (!empty($row->fs_cair_ke_dealer)) { 
							$cair_dealer = $row->fs_cair_ke_dealer; 
						} else {
							$cair_dealer = '';
						}
						
						dbase_add_record($db2, array(
							'S', $row->fn_no_apk, $row->fs_kode_transaksi, 
							$row->fs_nama_transaksi, $row->fn_nilai_transaksi, 
							$row->fs_tagih_ke_konsumen, $cair_dealer , ''
						));
				}

				$data = array(
						'fs_flag_transfer' => 1
					);
				$where = "fn_no_apk = '".trim($noapk[$i])."' AND fs_kode_cabang ='".trim($kdcabang)."'";
				$this->db->where($where);
				$this->db->update('tx_apk', $data);
		
			}

			dbase_close($db1);
			dbase_close($db2);
			dbase_close($db3);
			dbase_close($db4);
			dbase_close($db5);
			dbase_close($db6);
			dbase_close($db7);

			$this->createZip();

			$hasil = array(
				'sukses' => true,
				'url' => './temp/download.zip',
				'hasil' => 'Export to DBF Success',
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Export to DBF Failed',
			);
			echo json_encode($hasil);
		}
	}

}