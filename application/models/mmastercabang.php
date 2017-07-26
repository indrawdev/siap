<?php

class Mmastercabang extends CI_Model
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
			FROM tm_cabang
		");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_nama_cabang LIKE '%".trim($sCari)."%'
					OR fs_kota_cabang LIKE '%".trim($sCari)."%'
					OR fs_telfon_cabang LIKE  '%".trim($sCari)."%'
					OR fs_email_cabang LIKE  '%".trim($sCari)."%'");

		}
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function listMasterAlls()
	{
		$xSQL = ("
			SELECT *
			FROM tm_cabang
		");
			$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMasterAll2($nik)
	{
		$xSQL = ("
			SELECT	a.*,b.*
			FROM	tm_cabang a JOIN tm_struktur_cabang b on a.fs_kode_cabang=b.fs_kode_cabang
			WHERE	b.fs_nik = '".trim($nik)."'");
	
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster2($nik,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	a.*,b.*
			FROM	tm_cabang a JOIN tm_struktur_cabang b on a.fs_kode_cabang=b.fs_kode_cabang
			WHERE	b.fs_nik = '".trim($nik)."'");
	
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kode_cabang LIMIT ".$nStart.",".$nLimit."");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_cabang");
		
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_nama_cabang LIKE '%".trim($sCari)."%'
					OR fs_kota_cabang LIKE '%".trim($sCari)."%'
					OR fs_telfon_cabang LIKE '%".trim($sCari)."%'
					OR fs_email_cabang LIKE '%".trim($sCari)."%'
			");
		}

		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function listMasters($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_cabang");
	
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
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
}

?>