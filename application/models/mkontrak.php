<?php

class MKontrak extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listApkAll($sCari,$sFlag)
	{

		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_keputusan_kredit = '".trim($sFlag)."'
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listApk($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_keputusan_kredit = '".trim($sFlag)."'
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}
		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;

	}

	function listDokAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_dokumen_cetak WHERE fn_flag_preview = '0'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listDok($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_dokumen_cetak WHERE fn_flag_preview = '0'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_dokumen ASC LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function dokumen($nKode)
	{
		$xSQL = ("
			SELECT *
			FROM tm_dokumen_cetak
			WHERE fs_kode_dokumen = ".trim($nKode)."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function hitung($nKode, $nCabang, $nApk)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk_cetak
			WHERE fs_kode_dokumen = ".trim($nKode)."
			AND fs_kode_cabang = ".trim($nCabang)."
			AND fn_no_apk = ".trim($nApk)."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}