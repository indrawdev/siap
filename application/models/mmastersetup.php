<?php

class MMasterSetup extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listCounterAll($kd, $jns, $nj)
	{
		$xSQL = ("
			SELECT *
			FROM tm_counter
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_counter LIKE '%".trim($jns)."%'
				");
				if (!empty($nj)) {
					$xSQL = $xSQL.("
						AND fs_no_jenis_counter LIKE '%".trim($nj)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_counter LIKE '%".trim($jns)."%'
			");
			if (!empty($nj)) {
				$xSQL = $xSQL.("
					AND fs_no_jenis_counter LIKE '%".trim($nj)."%'
				");
			}
		}
		else if ($nj <> '') {
			$xSQL = $xSQL.("
				WHERE fs_no_jenis_counter LIKE '%".trim($nj)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listCounter($kd, $jns, $nj, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_counter
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_counter LIKE '%".trim($jns)."%'
				");
				if (!empty($nj)) {
					$xSQL = $xSQL.("
						AND fs_no_jenis_counter LIKE '%".trim($nj)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_counter LIKE '%".trim($jns)."%'
			");
			if (!empty($nj)) {
				$xSQL = $xSQL.("
						AND fs_no_jenis_counter LIKE '%".trim($nj)."%'
					");
			}
		}
		else if ($nj <> '') {
			$xSQL = $xSQL.("
				WHERE fs_no_jenis_counter LIKE '%".trim($nj)."%'
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
	
	function checkCounter($kd, $jns, $nj)
	{
		$xSQL = ("
			SELECT *
			FROM tm_counter
			WHERE fs_kode_cabang = '".trim($kd)."'
			AND fs_jenis_counter = '".trim($jns)."'
			AND fs_no_jenis_counter = '".trim($nj)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkYear()
	{
		$xSQL = ("
			SELECT LEFT (fn_counter, 2) AS yy FROM tm_counter
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}