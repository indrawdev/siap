<?php

class Mmasterdealer extends CI_Model
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
			FROM	tm_dealer
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_dealer1 LIKE '%".trim($sCari)."%'
					OR fs_kode_dealer2 LIKE '%".trim($sCari)."%'
					OR fs_nama_dealer LIKE '%".trim($sCari)."%'
					OR fs_nama_pemilik LIKE '%".trim($sCari)."%'
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_dealer ");
		
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_dealer1 LIKE '%".trim($sCari)."%'
					OR fs_kode_dealer2 LIKE '%".trim($sCari)."%'
					OR fs_nama_dealer LIKE '%".trim($sCari)."%'
					OR fs_nama_pemilik LIKE '%".trim($sCari)."%'
			");
		}
		
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_dealer1 LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKodeDealer($xdKodeDealer1,$xdKodeDealer2)
	{
		$xSQL = ("
			SELECT	fs_kode_dealer1,fs_kode_dealer2
			FROM	tm_dealer
			WHERE	fs_kode_dealer1 = '".trim($xdKodeDealer1)."' AND fs_kode_dealer2 = '".trim($xdKodeDealer2)."'");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}

?>