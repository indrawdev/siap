<?php

class Analisa extends CI_Controller
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
			if (trim($this->session->userdata('gKodeCabang')) == '00')
			{
				$this->load->view('vanalisapusat');
			}
			else 
			{
				$this->load->view('vanalisacabang');
			}
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function cb_keputusan()
	{
		$sCari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mAnalisa');
		$sSQL = $this->mAnalisa->ambilReferensi($sCari);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_strx' => ascii_to_entities(trim($xRow->fs_nilai1_referensi)),
					'fs_nm_strx' => ascii_to_entities(trim($xRow->fs_nama_referensi))
				);
			}
		}
		echo json_encode($xArr);
	}


	// CABANG 
	function gridretail()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_flag_survey'));
		$this->load->model('mAnalisa');

		$this->db->query(NOLOCK);
		$sSQL = $this->mAnalisa->listRetailAll($cari, $sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mAnalisa->listRetail($cari, $nStart, $nLimit, $sFlag);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
						'fs_status_blacklist' => ascii_to_entities(trim($xRow->fs_status_blacklist)),
						'fs_status_reject' => ascii_to_entities(trim($xRow->fs_status_reject)),
						'fs_status_family' => ascii_to_entities(trim($xRow->fs_status_family)),
						'fs_grade' => ascii_to_entities(trim($xRow->fs_grade)),
						'fs_score' => ascii_to_entities(trim($xRow->fs_score)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridfleet()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_flag_survey'));

		$this->db->query(NOLOCK);
		$this->load->model('mAnalisa');
		$sSQL = $this->mAnalisa->listFleetAll($cari, $sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mAnalisa->listFleet($cari, $nStart, $nLimit, $sFlag);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fn_no_batch' => ascii_to_entities(trim($xRow->fn_no_batch)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
						'fs_status_blacklist' => ascii_to_entities(trim($xRow->fs_status_blacklist)),
						'fs_status_reject' => ascii_to_entities(trim($xRow->fs_status_reject)),
						'fs_status_family' => ascii_to_entities(trim($xRow->fs_status_family)),
						'fs_grade' => ascii_to_entities(trim($xRow->fs_grade)),
						'fs_score' => ascii_to_entities(trim($xRow->fs_score)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// PUSAT
	function gridretailpusat()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_flag_survey'));
		$this->load->model('mAnalisa');

		$this->db->query(NOLOCK);
		$sSQL = $this->mAnalisa->listRetailPusatAll($cari, $sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mAnalisa->listRetailPusat($cari, $nStart, $nLimit, $sFlag);
		$this->db->query(NOLOCK2);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
						'fs_status_blacklist' => ascii_to_entities(trim($xRow->fs_status_blacklist)),
						'fs_status_reject' => ascii_to_entities(trim($xRow->fs_status_reject)),
						'fs_status_family' => ascii_to_entities(trim($xRow->fs_status_family)),
						'fs_grade' => ascii_to_entities(trim($xRow->fs_grade)),
						'fs_score' => ascii_to_entities(trim($xRow->fs_score)),
						'fs_catatan_analisa_cabang' => ascii_to_entities(trim($xRow->fs_catatan_analisa)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridfleetpusat()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_flag_survey'));

		$this->db->query(NOLOCK);
		$this->load->model('mAnalisa');
		$sSQL = $this->mAnalisa->listFleetPusatAll($cari, $sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mAnalisa->listFleetPusat($cari, $nStart, $nLimit, $sFlag);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fn_no_batch' => ascii_to_entities(trim($xRow->fn_no_batch)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
						'fs_status_blacklist' => ascii_to_entities(trim($xRow->fs_status_blacklist)),
						'fs_status_reject' => ascii_to_entities(trim($xRow->fs_status_reject)),
						'fs_status_family' => ascii_to_entities(trim($xRow->fs_status_family)),
						'fs_grade' => ascii_to_entities(trim($xRow->fs_grade)),
						'fs_score' => ascii_to_entities(trim($xRow->fs_score)),
						'fs_catatan_analisa_cabang' => ascii_to_entities(trim($xRow->fs_catatan_analisa)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function griddetil() 
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$flag = trim($this->input->post('fs_flag_survey'));

		$this->db->query(NOLOCK);
		$this->load->model('mAnalisa');
		$sSQL = $this->mAnalisa->listKonsumenAll($cari,$flag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mAnalisa->listKonsumen($cari,$nStart,$nLimit,$flag);
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
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fd_tanggal_survey' => ascii_to_entities(trim($xRow->fd_tanggal_survey)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function checkinternal()
	{
		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$noapk = trim($this->input->post('fn_no_apk'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$cari = trim($this->input->post('fs_cari'));

		$this->load->model('mAnalisa');
		if (trim($noapk) <> '') {
			$xnoapk = $this->mAnalisa->node($noapk, $kdcabang);
			foreach ($xnoapk->result() as $row) {
				$this->db->query(NOLOCK);
				$sSQL = $this->mAnalisa->checkInternalAll($row->fs_ktp_konsumen, $cari);
				$xTotal = $sSQL->num_rows();
				$sSQL = $this->mAnalisa->checkInternal($row->fs_ktp_konsumen, $cari, $nStart, $nLimit);
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
									'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
									'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
									'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_npwp_konsumen' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_siup_perusahaan' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_status_blacklist' => ascii_to_entities(trim($xRow->fs_status_blacklist))
								);
					}
				}
				echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
			}
		}
	}

	function checkreject()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$cari = trim($this->input->post('fs_cari'));

		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));

		$this->load->model('mAnalisa');

		if (trim($noapk) <> '') {
			$xnoapk = $this->mAnalisa->node($noapk, $kdcabang);
			foreach ($xnoapk->result() as $row) {
				$this->db->query(NOLOCK);
				$sSQL = $this->mAnalisa->checkRejectAll($row->fs_ktp_konsumen, $cari);
				$xTotal = $sSQL->num_rows();
				$sSQL = $this->mAnalisa->checkReject($row->fs_ktp_konsumen, $cari, $nStart, $nLimit);
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
									'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
									'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
									'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_npwp_konsumen' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_siup_perusahaan' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_status_reject' => ascii_to_entities(trim($xRow->fs_status_reject))
								);
					}
				}
				echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
			}	
		}
	}

	function checkfamily()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$cari = trim($this->input->post('fs_cari'));
		$noapk = trim($this->input->post('fn_no_apk'));

		$this->load->model('mAnalisa');

		if (trim($noapk) <> '') {
			$xnoapk = $this->mAnalisa->node($noapk, $kdcabang);
			foreach ($xnoapk->result() as $row) {
				$this->db->query(NOLOCK);
				$sSQL = $this->mAnalisa->checkFamilyAll($row->fs_ktp_konsumen, $cari);
				$xTotal = $sSQL->num_rows();
				$sSQL = $this->mAnalisa->checkFamily($row->fs_ktp_konsumen, $cari, $nStart, $nLimit);
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
									'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
									'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
									'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_npwp_konsumen' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_siup_perusahaan' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
									'fs_status_family' => ascii_to_entities(trim($xRow->fs_status_family))
								);
					}
				}
				echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
			}	
		}

	}

	function detailchecking()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$noapk = trim($this->input->post('fn_no_apk'));
		$this->load->model('mAnalisa');

		if (trim($noapk) <> '') {
			$this->db->query(NOLOCK);
			$sSQL = $this->mAnalisa->dataCheckingAll($noapk);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->mAnalisa->dataChecking($noapk,$nStart,$nLimit);
			$this->db->query(NOLOCK2);

			if ($sSQL->num_rows() > 0)
			{
				foreach ($sSQL->result() as $xRow)
				{
					$xArr[] = array(
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fd_tanggal_survey' => ascii_to_entities(trim($xRow->fd_tanggal_survey)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
					);
				}
			}
			echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
		}
	}

	function cekprint()
	{
		$cabang = trim($this->input->post('fs_kode_cabang'));
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));

		// jenis pembiayaan
		$jenis = trim($this->input->post('fs_jenis_pembiayaan'));
		$this->load->model('mKontrak');
		
		if (trim($jenis) == 'P' || trim($jenis) == 'W')
		{
			if (trim($noapk) <> '')
			{
				$xkddoc = $this->mKontrak->dokumen('001');
				$xhitung = $this->mKontrak->hitung('001', $cabang);
				$xtotal = $xhitung->num_rows();

				if ($xtotal <= $xkddoc->fn_batas_cetak)
				{
					$hasil = array(
						'sukses'	=> true,
						'hasil'		=> 'lanjut'
					);
					echo json_encode($hasil);
				}
				
				if ($xtotal > $xkddoc->fn_batas_cetak) {
					$hasil = array(
						'sukses'	=> true,
						'hasil'		=> 'habis'
					);
					echo json_encode($hasil);
				}
			}
			else
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Printing Failed'
				);
				echo json_encode($hasil);
			}
		}
		else if (trim($jenis) == 'B')
		{		
			if(trim($noapk) <> '')
			{
				$xkddoc2 = $this->mKontrak->dokumen('002');
				$xhitung2 = $this->mKontrak->hitung('002', $cabang);
				$xtotal2 = $xhitung2->num_rows();

				if ($xtotal2 <= $xkddoc2->fn_batas_cetak)
				{
					$hasil = array(
						'sukses'	=> true,
						'hasil'		=> 'lanjut'
					);
					echo json_encode($hasil);
				}
				
				if ($xtotal2 > $xkddoc2->fn_batas_cetak) {
					$hasil = array(
						'sukses'	=> true,
						'hasil'		=> 'habis'
					);
					echo json_encode($hasil);
				}
			}
			else 
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Printing Failed'
				);
				echo json_encode($hasil);
			}
		}
		else 
		{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Konsumen belum dipilih'
				);
				echo json_encode($hasil);
		}

	}

	function print()
	{
		$cabang = trim($this->input->post('fs_kode_cabang'));
		$noapk = trim($this->input->post('fn_no_apk'));
		$jenis = trim($this->input->post('fs_jenis_pembiayaan'));

		if (trim($jenis) == 'P' || trim($jenis) == 'W') {
			$kddok = '001';
		}
		else if (trim($jenis) == 'B') {
			$kddok = '002';
		}
		else {
			$kddok = '';
		}

		/*
		$insert = array(
					'fs_kode_cabang' => trim($this->session->userdata('gKodeCabang')),
					'fn_no_apk' => $noapk,
					'fs_kode_dokumen' => $kddok,
					'fs_iduser_cetak' => trim($this->session->userdata('gUser')),
					'fd_tanggal_cetak' => trim(date('Y-m-d H:i:s'))
				);
		$exec = $this->db->insert('tx_apk_cetak', $insert);
		*/
		
		if ($kddok <> '') {
			$this->load->model('mKontrak');
			$xdoc = $this->mKontrak->dokumen($kddok);

			$hasil = array(
				'sukses'	=> true,
				'url'		=> $xdoc->fs_template_dokumen,
				'title'		=> $xdoc->fs_nama_dokumen,
				'hasil'		=> 'Printing Success'
			);
			echo json_encode($hasil);
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Printing Failed'
			);
			echo json_encode($hasil);
		}
	}

	function predatapendukung()
	{
		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$cari = trim($this->input->post('fs_cari'));

		$this->load->model('mAnalisa');
		if ($noapk <> '')
		{
			$this->db->query(NOLOCK);
			$sSQL = $this->mAnalisa->dataPendukungAll($noapk, $kdcabang, $cari);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->mAnalisa->dataPendukung($noapk, $kdcabang, $cari, $nStart, $nLimit);
			$this->db->query(NOLOCK2);
			$xArr = array();
			if ($sSQL->num_rows() > 0)
			{
				foreach ($sSQL->result() as $xRow)
				{
					$xArr[] = array(
						'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
						'fs_nama_dokumen' => ascii_to_entities(trim($xRow->fs_nama_dokumen)),
						'fs_dokumen_upload' => ascii_to_entities(trim($xRow->fs_dokumen_upload)),
						'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
						'fs_iduser_buat' => ascii_to_entities(trim($xRow->fs_iduser_buat)),
						'fd_tanggal_buat' => ascii_to_entities(trim($xRow->fd_tanggal_buat))
					);
				}
			}
		}
		else if ($nobatch <> '')
		{
			$xnoapk = $this->mAnalisa->detail($nobatch, $kdcabang);
			foreach ($xnoapk->result() as $row) {
				$this->db->query(NOLOCK);
				$sSQL = $this->mAnalisa->dataPendukungAll($row->fn_no_apk, $cari);
				$xTotal = $sSQL->num_rows();
				$sSQL = $this->mAnalisa->dataPendukung($row->fn_no_apk,$cari,$nStart,$nLimit);
				$this->db->query(NOLOCK2);
				$xArr = array();
				if ($sSQL->num_rows() > 0)
				{
					foreach ($sSQL->result() as $xRow)
					{
						$xArr[] = array(
							'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
							'fs_nama_dokumen' => ascii_to_entities(trim($xRow->fs_nama_dokumen)),
							'fs_dokumen_upload' => ascii_to_entities(trim($xRow->fs_dokumen_upload)),
							'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
							'fs_iduser_buat' => ascii_to_entities(trim($xRow->fs_iduser_buat)),
							'fd_tanggal_buat' => ascii_to_entities(trim($xRow->fd_tanggal_buat))
						);
					}
				}
			}
		}
		else {
			$xTotal = 0;
			$xArr = array();
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function detailgrid()
	{
		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$nBatch = trim($this->input->post('fn_no_batch'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->query(NOLOCK);
		$this->load->model('mAnalisa');
		
		$sSQL = $this->mAnalisa->listdetailAll($nBatch);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mAnalisa->listdetail($nStart, $nLimit, $nBatch);
		$this->db->query(NOLOCK2);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fn_no_batch' => ascii_to_entities(trim($xRow->fn_no_batch)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
						'fb_cek' => true
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ceksave()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));
		$arrnoapk = explode('|', trim($this->input->post('arr_no_apk')));

		if (!empty($noapk) || !empty($nobatch) || !empty($arrnoapk))
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'lanjut'
			);
			echo json_encode($hasil);
		}
		else 
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Saving Failed'
			);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$kdcabang = trim($this->session->userdata('gKodeCabang'));

		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));
		$arrnoapk = explode('|', trim($this->input->post('arr_no_apk')));

		$keputusan = trim($this->input->post('fs_keputusan_kredit'));
		$cat_analisa = trim($this->input->post('fs_catatan_analisa'));

		$grade = trim($this->input->post('fs_grade'));

		if (trim($keputusan) == 'N') {
			$data = array(
				'fs_keputusan_kredit' => $keputusan,
				'fs_catatan_analisa' => $cat_analisa,
				'fs_flag_keputusan' => 1,
				// duplicate
				'fs_keputusan_kredit_pusat' => $keputusan,
				'fs_catatan_analisa_pusat' => $cat_analisa,
				'fs_flag_keputusan_pusat' => 1,
				'fs_iduser_buat_keputusan' => trim($this->session->userdata('gUser')),
				'fd_tanggal_buat_keputusan' => trim(date('Y-m-d H:i:s'))
			);
		} else {
			if (trim($grade) == 'C' || trim($grade) == 'D') {
				$data = array(
					'fs_keputusan_kredit' => '',
					'fs_catatan_analisa' => $cat_analisa,
					'fs_flag_keputusan' => 1,
					'fs_iduser_buat_keputusan' => trim($this->session->userdata('gUser')),
					'fd_tanggal_buat_keputusan' => trim(date('Y-m-d'))
				);
			} else {
				$data = array(
					'fs_keputusan_kredit' => $keputusan,
					'fs_catatan_analisa' => $cat_analisa,
					'fs_flag_keputusan' => 1,
					'fs_iduser_buat_keputusan' => trim($this->session->userdata('gUser')),
					'fd_tanggal_buat_keputusan' => trim(date('Y-m-d'))
				);
			}
		}

		if (!empty($noapk) && (empty($nobatch) || empty($arrnoapk))) {
			$where = "fn_no_apk = '".trim($noapk)."' AND fs_kode_cabang = '".trim($kdcabang)."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);
				
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Success',
			);
			echo json_encode($hasil);
		}
		else if (!empty($arrnoapk) && !empty($nobatch) && !empty($noapk)) {
			$jml = count($arrnoapk) - 1;
			if ($jml > 0)
			{
				for ($i=1; $i<=$jml; $i++)
				{
					$where2 = "fn_no_apk = '".trim($arrnoapk[$i])."' AND fs_kode_cabang = '".trim($kdcabang)."'";
					$this->db->where($where2);
					$this->db->update('tx_apk', $data);
				}

				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Saving Success',
				);
				echo json_encode($hasil);
			}
			else 
			{
				$where1 = "fn_no_batch = '".trim($nobatch)."' AND fs_kode_cabang = '".trim($kdcabang)."'";
				$this->db->where($where1);
				$this->db->update('tx_apk', $data);

				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Saving Success',
				);
				echo json_encode($hasil);
			}	
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Saving Failed',
			);
			echo json_encode($hasil);
		}
	}

	function ceksavePusat()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));

		if (!empty($noapk) || !empty($nobatch))
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'lanjut'
			);
			echo json_encode($hasil);
		}
		else 
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Saving Failed'
			);
			echo json_encode($hasil);
		}
	}

	function savePusat()
	{
		$kdcabang = trim($this->input->post('fs_kode_cabang'));

		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));
		$arrnoapk = explode('|', trim($this->input->post('arr_no_apk')));

		$keputusan = trim($this->input->post('fs_keputusan_kredit'));
		$cat_analisa = trim($this->input->post('fs_catatan_analisa'));

		$data = array(
			'fs_keputusan_kredit_pusat' => $keputusan,
			'fs_catatan_analisa_pusat' => $cat_analisa,
			// duplicate
			'fs_keputusan_kredit' => $keputusan,
			'fs_flag_keputusan_pusat' => 1,
			'fs_iduser_buat_keputusan' => trim($this->session->userdata('gUser')),
			'fd_tanggal_buat_keputusan' => trim(date('Y-m-d'))
		);

		if (!empty($noapk) && (empty($nobatch) || empty($arrnoapk))) {
			$where = "fn_no_apk = '".trim($noapk)."' AND fs_kode_cabang = '".trim($kdcabang)."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);
				
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Success',
			);
			echo json_encode($hasil);
		}
		else if (!empty($arrnoapk) && !empty($nobatch) && !empty($noapk))  {
			$jml = count($arrnoapk) - 1;
			if ($jml > 0)
			{
				for ($i=1; $i<=$jml; $i++)
				{
					$where2 = "fn_no_apk = '".trim($arrnoapk[$i])."' AND fs_kode_cabang = '".trim($kdcabang)."'";
					$this->db->where($where2);
					$this->db->update('tx_apk', $data);
				}

				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Saving Success',
				);
				echo json_encode($hasil);
			}
			else 
			{
				$where1 = "fn_no_batch = '".trim($nobatch)."' AND fs_kode_cabang = '".trim($kdcabang)."'";
				$this->db->where($where1);
				$this->db->update('tx_apk', $data);

				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Saving Success',
				);
				echo json_encode($hasil);
			}
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Saving Failed',
			);
			echo json_encode($hasil);
		}
	}

}