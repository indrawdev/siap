<?php

class MMasterReferensi extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_referensi
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kode_referensi LIKE '%".trim($sCari)."%'
				 OR fs_nama_referensi LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function list($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_referensi
		");
		
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kode_referensi LIKE '%".trim($sCari)."%'
				 OR fs_nama_referensi LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_referensi ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkReferensi($kd, $nil1)
	{
		$xSQL = ("
			SELECT *
			FROM tm_referensi
			WHERE fs_kode_referensi = '".trim($kd)."'
			AND fs_nilai1_referensi = '".trim($nil1)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}