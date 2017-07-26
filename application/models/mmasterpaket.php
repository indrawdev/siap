<?php

class Mmasterpaket extends CI_Model
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
			FROM	tm_paket
		");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_paket LIKE '%".trim($sCari)."%'
					OR fs_nama_paket LIKE '%".trim($sCari)."%'
			");
		}
		

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_paket ");
	
		
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_paket LIKE '%".trim($sCari)."%'
					OR fs_nama_paket LIKE '%".trim($sCari)."%'
			");
		}
		

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKode($xKodePaket)
	{
		$xSQL = ("
			SELECT	fs_kode_paket
			FROM	tm_paket
			WHERE	fs_kode_paket = '".trim($xKodePaket)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}

?>