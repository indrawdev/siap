<?php

class MDashboard extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}

	function statusDisetujui()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, COUNT(fn_no_apk) as jumlah 
			FROM tx_apk 
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
				AND fs_keputusan_kredit = 'Y'
			");
		} else {
			$xSQL = $xSQL.(" 
				AND fs_keputusan_kredit = 'Y'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function statusDitolak()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, COUNT(fn_no_apk) as jumlah 
			FROM tx_apk 
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
				AND fs_keputusan_kredit = 'N'
			");
		} else {
			$xSQL = $xSQL.(" 
				AND fs_keputusan_kredit = 'N'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function statusDiproses()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, COUNT(fn_no_apk) as jumlah FROM tx_apk 
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
				AND fs_keputusan_kredit = ''
			");
		} else {
			$xSQL = $xSQL.(" 
				AND fs_keputusan_kredit = ''
			");
		}

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function statusDibatal()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, COUNT(fn_no_apk) as jumlah 
			FROM tx_apk 
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
				AND fs_keputusan_kredit = 'B'
			");
		} else {
			$xSQL = $xSQL.(" 
				AND fs_keputusan_kredit = 'B'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function gradeMonthly()
	{
		$xSQL = ("
			SELECT fs_grade as grade, COUNT(fs_grade) as jumlah FROM tx_apk WHERE MONTH(fd_tgl_apk) = MONTH(CURRENT_DATE())
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY fs_grade
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function gradeYearly()
	{
		$xSQL = ("
			SELECT fs_grade as grade, COUNT(fs_grade) as jumlah FROM tx_apk WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		$xSQL = $xSQL.("
			GROUP BY fs_grade
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}