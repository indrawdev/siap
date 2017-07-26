<?php

class Mmasterkendaraan extends CI_Model
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
			FROM tm_kendaraan
		");


		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_kode_kendaraan_lama LIKE '%".trim($sCari)."%'
					OR fs_model_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_jenis_kendaraan LIKE  '%".trim($sCari)."%'
					OR fs_model_kendaraan LIKE  '%".trim($sCari)."%'
					OR fs_silinder_kendaraan LIKE  '%".trim($sCari)."%'
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_kendaraan ");
		
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE fs_kode_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_kode_kendaraan_lama LIKE '%".trim($sCari)."%'
					OR fs_model_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_jenis_kendaraan LIKE  '%".trim($sCari)."%'
					OR fs_model_kendaraan LIKE  '%".trim($sCari)."%'
					OR fs_silinder_kendaraan LIKE  '%".trim($sCari)."%'
			");
		}
		

		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_kendaraan LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKodeCabang($xdKodeCab)
	{
		$xSQL = ("
			SELECT	fs_kode_cabang
			FROM	tm_cabang
			WHERE	fs_kode_cabang = '".trim($xdKodeCab)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function CekKodeLama($xdKodeLama)
	{
		$xSQL = ("
			SELECT	fs_kode_kendaraan_lama
			FROM	tm_kendaraan
			WHERE	fs_kode_kendaraan_lama = '".trim($xdKodeLama)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function CekKodeBaru($xdKode)
	{
		$xSQL = ("
			SELECT	fs_kode_kendaraan
			FROM	tm_kendaraan
			WHERE	fs_kode_kendaraan = '".trim($xdKode)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function CekNamaRef2($xKodeModel,$xKodeModelLama)
	{
		$xSQL = ("
			SELECT	*
			FROM	tm_kendaraan
			WHERE	fs_kode_kendaraan = '".trim($xKodeModel)."' and fs_kode_kendaraan_lama = '".trim($xKodeModelLama)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}

?>