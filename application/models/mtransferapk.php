<?php

class MTransferApk extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listTransferAll($sCari)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fd_tgl_apk, 
			a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi,
			a.fn_nomor_perjanjian, a.fs_nama_konsumen, b.fs_nama_referensi as keputusan_kredit,
			a.fs_catatan_analisa
			FROM tx_apk a JOIN tm_referensi b ON b.fs_nilai1_referensi = a.fs_keputusan_kredit
			AND b.fs_kode_referensi = 'keputusan_kredit'
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1'
			AND a.fs_flag_transfer = '0' AND a.fs_keputusan_kredit = 'Y'
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
			AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listTransfer($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fd_tgl_apk, 
			a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi,
			a.fn_nomor_perjanjian, a.fs_nama_konsumen, b.fs_nama_referensi as keputusan_kredit,
			a.fs_catatan_analisa
			FROM tx_apk a JOIN tm_referensi b ON b.fs_nilai1_referensi = a.fs_keputusan_kredit
			AND b.fs_kode_referensi = 'keputusan_kredit'
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1'
			AND a.fs_flag_transfer = '0' AND a.fs_keputusan_kredit = 'Y'
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
			AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function single($nApk, $nKdCab)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk 
			WHERE fn_no_apk = '".trim($nApk)."'
			AND fs_kode_cabang = '".trim($nKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function double($nApk, $nKdCab)
	{
		$xSQL = ("
			SELECT b.*
			FROM tx_apk a 
			LEFT JOIN tx_apk_pengurus b ON b.fn_no_apk = a.fn_no_apk AND a.fs_kode_cabang = b.fs_kode_cabang
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($nKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function detail($nApk, $nKdCab)
	{
		$xSQL = ("
			SELECT b.*
			FROM tx_apk a 
			LEFT JOIN tx_apk_detailtransaksi b ON b.fn_no_apk = a.fn_no_apk AND a.fs_kode_cabang = b.fs_kode_cabang
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($nKdCab)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}