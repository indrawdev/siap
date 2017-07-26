<?php

class Mmastersurveyor extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listMasterAll($sCari)
	{
		$xSQL = ("
			SELECT fs_aktif, fs_kode_cabang, fs_kode_surveyor, 
			fs_kode_surveyor_lama, fs_nama_surveyor, 
			fs_alamat_surveyor, fs_ktp_surveyor, fs_handphone_surveyor
			FROM tm_surveyor
			WHERE fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor_lama LIKE '%".trim($sCari)."%'
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%'
					OR fs_ktp_surveyor LIKE '%".trim($sCari)."%')
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT fs_aktif, fs_kode_cabang, fs_kode_surveyor, 
			fs_kode_surveyor_lama, fs_nama_surveyor, 
			fs_alamat_surveyor, fs_ktp_surveyor, fs_handphone_surveyor
			FROM tm_surveyor
			WHERE fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
		");
	
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor_lama LIKE '%".trim($sCari)."%'
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%'
					OR fs_ktp_surveyor LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_surveyor LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function cekInisial($sKode)
	{
		$xSQL = ("
			SELECT fs_kode_surveyor_lama
			FROM tm_surveyor
			WHERE fs_kode_surveyor_lama = '".trim($sKode)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function cekKode($sKode,$sCabang)
	{
		$xSQL = ("
			SELECT fs_kode_surveyor
			FROM tm_surveyor
			WHERE fs_kode_surveyor = '".trim($sKode)."' AND fs_kode_cabang = '".trim($sCabang)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}

?>