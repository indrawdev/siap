<?php

class MUploadKehadiran extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function isPeriode()
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi FROM tm_referensi
			WHERE fs_kode_referensi = 'periode_absensi'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkFileExist($sKdCabang)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_filename FROM tx_uploadfile
			WHERE fs_flag_deleted = '0' AND fs_kode_cabang = '".trim($sKdCabang)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function deleteAllByMonth($sKdCabang, $sPeriode)
	{
		$xSQL = ("
			DELETE FROM tx_checkinout WHERE fs_kode_cabang = '".trim($sKdCabang)."' AND fd_checktime LIKE '".trim($sPeriode)."%';
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function deleteAllAbsensi($sKdCabang, $sPeriode)
	{
		$xSQL = ("
			DELETE FROM tx_absensi WHERE fs_kode_cabang = '".trim($sKdCabang)."' AND fd_tanggal LIKE '".trim($sPeriode)."%';
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function insertAllAbsensi($sKdCabang, $sPeriode)
	{
		$xSQL = ("
			INSERT INTO tx_absensi 
			SELECT fs_kode_cabang, fs_nama, date(fd_checktime) AS fd_tanggal,
			min(fd_checktime) AS fs_masuk, max(fd_checktime) AS fs_keluar, 
			TIMESTAMPDIFF(HOUR, min(fd_checktime), max(fd_checktime)) AS fn_jam 
			FROM tx_checkinout WHERE fs_kode_cabang = '".trim($sKdCabang)."' AND fd_checktime LIKE '".trim($sPeriode)."%'
			GROUP BY fd_tanggal, fs_nama;
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listKehadiranAll($sCari, $sKdCabang)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, fd_checktime
			FROM tx_checkinout
			WHERE fs_kode_cabang = '".trim($sKdCabang)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				AND fs_nama LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listKehadiran($sCari,$sKdCabang,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, fd_checktime
			FROM tx_checkinout
			WHERE fs_kode_cabang = '".trim($sKdCabang)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				AND fs_nama LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fd_checktime DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}