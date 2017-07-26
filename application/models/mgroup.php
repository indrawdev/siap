<?php

class Mgroup extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function getbatch($nKdCabang)
	{
		$xSQL = ("
			SELECT fn_counter
			FROM tm_counter
			WHERE fs_kode_cabang = '".trim($nKdCabang)."'
			AND fs_jenis_counter = 'BATCH' 
			
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listgroupAll($sCari,$sFleet)
	{

		$xSQL = ("
			SELECT *,
			CASE fs_jenis_pembiayaan WHEN 'P' THEN 'PERORANGAN' 
			WHEN 'W' THEN 'WIRASWASTA' WHEN 'B' THEN 'BADAN USAHA' ELSE '' END fs_jenis 
			FROM tx_apk
			WHERE fs_fleet = '".trim($sFleet)."'
			AND fn_no_batch IS NULL AND (fs_flag_survey = '0' OR fs_flag_keputusan = '0')
		");

		if ($this->session->userdata('gKodeCabang') != '00') 
		{
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listgroup($sCari,$nStart,$nLimit,$sFleet)
	{
		$xSQL = ("
			SELECT *,
			CASE fs_jenis_pembiayaan WHEN 'P' THEN 'PERORANGAN' 
			WHEN 'W' THEN 'WIRASWASTA' WHEN 'B' THEN 'BADAN USAHA' ELSE '' END fs_jenis 
			FROM tx_apk
			WHERE fs_fleet = '".trim($sFleet)."'
			AND fn_no_batch IS NULL AND (fs_flag_survey = '0' OR fs_flag_keputusan = '0')
		");

		if ($this->session->userdata('gKodeCabang') != '00') 
		{
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_konsumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listungroupAll($sCari, $sFleet)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE (fs_flag_survey = '0' AND fs_flag_keputusan = '0') AND fs_fleet = '".trim($sFleet)."'
			AND fn_no_batch IS NOT NULL
		");

		if ($this->session->userdata('gKodeCabang') != '00') 
		{
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listungroup($sCari,$nStart,$nLimit,$sFleet)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE (fs_flag_survey = '0' AND fs_flag_keputusan = '0') AND fs_fleet = '".trim($sFleet)."'
			AND fn_no_batch IS NOT NULL
		");

		if ($this->session->userdata('gKodeCabang') != '00') 
		{
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY fn_no_batch
			ORDER BY fs_nama_konsumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listdetailAll($sCari, $nBatch)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = '0' AND fs_flag_keputusan = '0'
		");

		if ($this->session->userdata('gKodeCabang') != '00') 
		{
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listdetail($sCari,$nStart,$nLimit,$nBatch)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = '0' AND fs_flag_keputusan = '0'
		");

		if ($this->session->userdata('gKodeCabang') != '00') 
		{
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}