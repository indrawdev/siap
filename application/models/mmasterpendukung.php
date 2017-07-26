<?php

class MMasterPendukung extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listAll($kd, $jns, $jby)
	{
		$xSQL = ("
			SELECT *
			FROM tm_data_pendukung
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_dokumen LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_dokumen LIKE '%".trim($jns)."%'
				");
				if (!empty($jby)) {
					$xSQL = $xSQL.("
						AND fs_jenis_pembiayaan LIKE '%".trim($jby)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_dokumen LIKE '%".trim($jns)."%'
			");
			if (!empty($jby)) {
				$xSQL = $xSQL.("
					AND fs_jenis_pembiayaan LIKE '%".trim($jby)."%'
				");
			}
		}
		else if (!empty($jby)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_pembiayaan LIKE '%".trim($jby)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function list($kd, $jns, $jby, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_data_pendukung
		");
		
		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_dokumen LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_dokumen LIKE '%".trim($jns)."%'
				");
				if (!empty($jby)) {
					$xSQL = $xSQL.("
						AND fs_jenis_pembiayaan LIKE '%".trim($jby)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_dokumen LIKE '%".trim($jns)."%'
			");
			if (!empty($jby)) {
				$xSQL = $xSQL.("
					AND fs_jenis_pembiayaan LIKE '%".trim($jby)."%'
				");
			}
		}
		else if (!empty($jby)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_pembiayaan LIKE '%".trim($jby)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_dokumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkDataPendukung($kd)
	{
		$xSQL = ("
			SELECT *
			FROM tm_data_pendukung
			WHERE fs_kode_dokumen = '".trim($kd)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}