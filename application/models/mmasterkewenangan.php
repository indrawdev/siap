<?php

class MMasterKewenangan extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function ambilReferensi($sCari)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_referensi
			WHERE fs_kode_referensi = '".trim($sCari)."'");
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_referensi ASC
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listAll($kd, $pl, $pla, $scr)
	{
		$xSQL = ("
			SELECT *
			FROM tm_kewenangan
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($pl)) {
				$xSQL = $xSQL.("
					AND fs_pola_transaksi LIKE '%".trim($pl)."%'
				");
			}
		}
		else if (!empty($pl)) {
			$xSQL = $xSQL.("
				WHERE fs_pola_transaksi LIKE '%".trim($pl)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function list($kd, $pl, $pla, $scr, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_kewenangan
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($pl)) {
				$xSQL = $xSQL.("
					AND fs_pola_transaksi LIKE '%".trim($pl)."%'
				");
			}
		}
		else if (!empty($pl)) {
			$xSQL = $xSQL.("
				WHERE fs_pola_transaksi LIKE '%".trim($pl)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listCabangAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama_cabang, 
			fs_alamat_cabang, fs_kota_cabang
			FROM tm_cabang
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE fs_nama_cabang LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listCabang($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama_cabang, 
			fs_alamat_cabang, fs_kota_cabang
			FROM tm_cabang
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE fs_nama_cabang LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkKewenangan($kd, $pl)
	{
		$xSQL = ("
			SELECT *
			FROM tm_kewenangan
			WHERE fs_kode_cabang = '".trim($kd)."'
			AND fs_pola_transaksi = '".trim($pl)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}