<?php

class MNotification extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function checkDokumen()
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_lokasi, a.fs_nomor_dealer, 
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian, 
			a.fs_nama_konsumen, 
			(SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - 
			COUNT(b.fs_kode_dokumen) AS hitung
			FROM tx_apk a 
			LEFT JOIN tx_apk_data_pendukung b ON b.fn_no_apk = a.fn_no_apk
			AND b.fs_kode_cabang = a.fs_kode_cabang
			LEFT JOIN tm_data_pendukung c 
			ON b.fs_kode_dokumen = c.fs_kode_dokumen
			AND c.fs_wajib = 1
		");

		if ($this->session->userdata('gKodeCabang') != '00')
		{
			$xSQL = $xSQL.("
				WHERE a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_apk 
			HAVING (SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - COUNT(b.fs_kode_dokumen)> 0
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkFinal()
	{
		$xSQL = ("
			SELECT fs_nama_konsumen, fs_kode_lokasi, 
			fs_nomor_dealer, fs_jenis_piutang, 
			fs_pola_transaksi, fn_nomor_perjanjian
			FROM tx_apk 
			WHERE fs_flag_keputusan = '0' AND fs_flag_survey = '1'
		");

		if ($this->session->userdata('gKodeCabang') != '00')
		{
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk ASC
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkDocAll()
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_lokasi, a.fs_nomor_dealer, 
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian, 
			a.fs_nama_konsumen, 
			(SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - 
			COUNT(b.fs_kode_dokumen) AS hitung
			FROM tx_apk a 
			LEFT JOIN tx_apk_data_pendukung b ON b.fn_no_apk = a.fn_no_apk 
			AND b.fs_kode_cabang = a.fs_kode_cabang
			LEFT JOIN tm_data_pendukung c 
			ON b.fs_kode_dokumen = c.fs_kode_dokumen
			AND c.fs_wajib = 1
		");

		if ($this->session->userdata('gKodeCabang') != '00')
		{
			$xSQL = $xSQL.("
				WHERE a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_apk 
			HAVING (SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - COUNT(b.fs_kode_dokumen)> 0
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkDoc($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_lokasi, a.fs_nomor_dealer, 
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian, 
			a.fs_nama_konsumen, 
			(SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - 
			COUNT(b.fs_kode_dokumen) AS hitung
			FROM tx_apk a 
			LEFT JOIN tx_apk_data_pendukung b ON b.fn_no_apk = a.fn_no_apk
			AND b.fs_kode_cabang = a.fs_kode_cabang
			LEFT JOIN tm_data_pendukung c 
			ON b.fs_kode_dokumen = c.fs_kode_dokumen
			AND c.fs_wajib = 1
		");

		if ($this->session->userdata('gKodeCabang') != '00')
		{
			$xSQL = $xSQL.("
				WHERE a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_apk 
			HAVING (SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - COUNT(b.fs_kode_dokumen)> 0
			ORDER BY a.fn_no_apk LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function isSupport()
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nilai2_referensi, fs_nama_referensi 
			FROM tm_referensi WHERE fs_kode_referensi = 'support_contact'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}