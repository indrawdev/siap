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
			SELECT *
			FROM	tm_surveyor
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor_lama LIKE '%".trim($sCari)."%'
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%'
					OR fs_ktp_surveyor LIKE '%".trim($sCari)."%'
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_surveyor ");
	
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor_lama LIKE '%".trim($sCari)."%'
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%'
					OR fs_ktp_surveyor LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_surveyor LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekInisial($xdKodeSurveyor)
	{
		$xSQL = ("
			SELECT	fs_kode_surveyor_lama
			FROM	tm_surveyor
			WHERE	fs_kode_surveyor_lama = '".trim($xdKodeSurveyor)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}

?>