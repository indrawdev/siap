<?php

class MReportKehadiran extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listCabangAll($sCari)
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
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listCabang($sCari, $nStart, $nLimit)
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
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listEmployeAll($sKdCab, $sMY, $sCari)
	{
		$xSQL = ("	                                   
			SELECT fs_kode_cabang, fs_nama, fd_tanggal,
			MONTHNAME(`fd_tanggal`) AS fs_bulan, YEAR(`fd_tanggal`) AS fn_tahun,                                        
			sum(case when day(`fd_tanggal`) = 1 then fn_jam end) as 'fn_1',            
			sum(case when day(`fd_tanggal`) = 2 then fn_jam end) as 'fn_2',
			sum(case when day(`fd_tanggal`) = 3 then fn_jam end) as 'fn_3',
			sum(case when day(`fd_tanggal`) = 4 then fn_jam end) as 'fn_4',
			sum(case when day(`fd_tanggal`) = 5 then fn_jam end) as 'fn_5',
			sum(case when day(`fd_tanggal`) = 6 then fn_jam end) as 'fn_6',
			sum(case when day(`fd_tanggal`) = 7 then fn_jam end) as 'fn_7',
			sum(case when day(`fd_tanggal`) = 8 then fn_jam end) as 'fn_8',
			sum(case when day(`fd_tanggal`) = 9 then fn_jam end) as 'fn_9',
			sum(case when day(`fd_tanggal`) = 10 then fn_jam end) as 'fn_10',
			sum(case when day(`fd_tanggal`) = 11 then fn_jam end) as 'fn_11',
			sum(case when day(`fd_tanggal`) = 12 then fn_jam end) as 'fn_12',
			sum(case when day(`fd_tanggal`) = 13 then fn_jam end) as 'fn_13',
			sum(case when day(`fd_tanggal`) = 14 then fn_jam end) as 'fn_14',
			sum(case when day(`fd_tanggal`) = 15 then fn_jam end) as 'fn_15',
			sum(case when day(`fd_tanggal`) = 16 then fn_jam end) as 'fn_16',
			sum(case when day(`fd_tanggal`) = 17 then fn_jam end) as 'fn_17',
			sum(case when day(`fd_tanggal`) = 18 then fn_jam end) as 'fn_18',
			sum(case when day(`fd_tanggal`) = 19 then fn_jam end) as 'fn_19',
			sum(case when day(`fd_tanggal`) = 20 then fn_jam end) as 'fn_20',
			sum(case when day(`fd_tanggal`) = 21 then fn_jam end) as 'fn_21',
			sum(case when day(`fd_tanggal`) = 22 then fn_jam end) as 'fn_22',
			sum(case when day(`fd_tanggal`) = 23 then fn_jam end) as 'fn_23',
			sum(case when day(`fd_tanggal`) = 24 then fn_jam end) as 'fn_24',
			sum(case when day(`fd_tanggal`) = 25 then fn_jam end) as 'fn_25',
			sum(case when day(`fd_tanggal`) = 26 then fn_jam end) as 'fn_26',
			sum(case when day(`fd_tanggal`) = 27 then fn_jam end) as 'fn_27',
			sum(case when day(`fd_tanggal`) = 28 then fn_jam end) as 'fn_28',
			sum(case when day(`fd_tanggal`) = 29 then fn_jam end) as 'fn_29',
			sum(case when day(`fd_tanggal`) = 30 then fn_jam end) as 'fn_30',
			sum(case when day(`fd_tanggal`) = 31 then fn_jam end) as 'fn_31'
			FROM tx_absensi
			WHERE MONTH(fd_tanggal) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tanggal) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
					AND (fs_nama LIKE '%".trim($sCari)."%')
				");
			}
		} else {
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($sKdCab)."'	
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
					AND (fs_nama LIKE '%".trim($sCari)."%')
				");
			}
		}

		$xSQL = $xSQL.("
			GROUP BY fs_nama
		");

		$sSQL = $this->db->query($xSQL);

		return $sSQL;
	}

	function listEmploye($sKdCab, $sMY, $sCari, $nStart, $nLimit)
	{

		$xSQL = ("	                                   
			SELECT fs_kode_cabang, fs_nama, fd_tanggal,
			MONTHNAME(`fd_tanggal`) AS fs_bulan, YEAR(`fd_tanggal`) AS fn_tahun,                                        
			sum(case when day(`fd_tanggal`) = 1 then fn_jam end) as 'fn_1',            
			sum(case when day(`fd_tanggal`) = 2 then fn_jam end) as 'fn_2',
			sum(case when day(`fd_tanggal`) = 3 then fn_jam end) as 'fn_3',
			sum(case when day(`fd_tanggal`) = 4 then fn_jam end) as 'fn_4',
			sum(case when day(`fd_tanggal`) = 5 then fn_jam end) as 'fn_5',
			sum(case when day(`fd_tanggal`) = 6 then fn_jam end) as 'fn_6',
			sum(case when day(`fd_tanggal`) = 7 then fn_jam end) as 'fn_7',
			sum(case when day(`fd_tanggal`) = 8 then fn_jam end) as 'fn_8',
			sum(case when day(`fd_tanggal`) = 9 then fn_jam end) as 'fn_9',
			sum(case when day(`fd_tanggal`) = 10 then fn_jam end) as 'fn_10',
			sum(case when day(`fd_tanggal`) = 11 then fn_jam end) as 'fn_11',
			sum(case when day(`fd_tanggal`) = 12 then fn_jam end) as 'fn_12',
			sum(case when day(`fd_tanggal`) = 13 then fn_jam end) as 'fn_13',
			sum(case when day(`fd_tanggal`) = 14 then fn_jam end) as 'fn_14',
			sum(case when day(`fd_tanggal`) = 15 then fn_jam end) as 'fn_15',
			sum(case when day(`fd_tanggal`) = 16 then fn_jam end) as 'fn_16',
			sum(case when day(`fd_tanggal`) = 17 then fn_jam end) as 'fn_17',
			sum(case when day(`fd_tanggal`) = 18 then fn_jam end) as 'fn_18',
			sum(case when day(`fd_tanggal`) = 19 then fn_jam end) as 'fn_19',
			sum(case when day(`fd_tanggal`) = 20 then fn_jam end) as 'fn_20',
			sum(case when day(`fd_tanggal`) = 21 then fn_jam end) as 'fn_21',
			sum(case when day(`fd_tanggal`) = 22 then fn_jam end) as 'fn_22',
			sum(case when day(`fd_tanggal`) = 23 then fn_jam end) as 'fn_23',
			sum(case when day(`fd_tanggal`) = 24 then fn_jam end) as 'fn_24',
			sum(case when day(`fd_tanggal`) = 25 then fn_jam end) as 'fn_25',
			sum(case when day(`fd_tanggal`) = 26 then fn_jam end) as 'fn_26',
			sum(case when day(`fd_tanggal`) = 27 then fn_jam end) as 'fn_27',
			sum(case when day(`fd_tanggal`) = 28 then fn_jam end) as 'fn_28',
			sum(case when day(`fd_tanggal`) = 29 then fn_jam end) as 'fn_29',
			sum(case when day(`fd_tanggal`) = 30 then fn_jam end) as 'fn_30',
			sum(case when day(`fd_tanggal`) = 31 then fn_jam end) as 'fn_31'
			FROM tx_absensi
			WHERE MONTH(fd_tanggal) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tanggal) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
					AND (fs_nama LIKE '%".trim($sCari)."%')
				");
			}
		} else {
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($sKdCab)."'	
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
					AND (fs_nama LIKE '%".trim($sCari)."%')
				");
			}
		}

		$xSQL = $xSQL.("
			GROUP BY fs_nama
			ORDER BY fs_nama ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);

		return $sSQL;
	}

	function listReportAll($sMY, $sNama)
	{
		$xSQL = ("
			SELECT fd_tanggal, fd_masuk, fd_keluar, fn_jam
			FROM tx_absensi
			WHERE fs_nama = '".trim($sNama)."'
			AND MONTH(fd_tanggal) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tanggal) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
		}

		$xSQL = $xSQL.("
			GROUP BY fd_tanggal, fs_nama
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listReport($sMY, $sNama, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fd_tanggal, fd_masuk, fd_keluar, fn_jam
			FROM tx_absensi
			WHERE fs_nama = '".trim($sNama)."'
			AND MONTH(fd_tanggal) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tanggal) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
		}
		
		$xSQL = $xSQL.("
			GROUP BY fd_tanggal, fs_nama
			ORDER BY fd_tanggal ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function detailMonthly($sMY, $sNama)
	{
		$xSQL = ("
			SELECT fd_tanggal, fn_jam 
			FROM tx_absensi
			WHERE fs_nama = '".trim($sNama)."'
			AND MONTH(fd_tanggal) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tanggal) = YEAR('".trim($sMY)."')
		");

		$xSQL = $xSQL.("
			GROUP BY fd_tanggal
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function previewDaily($sKdCab, $sMY)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, fd_tanggal,
			MONTHNAME(`fd_tanggal`) AS fs_bulan, YEAR(`fd_tanggal`) AS fn_tahun,                                        
			sum(case when day(`fd_tanggal`) = 1 then fn_jam end) as 'fn_1',            
			sum(case when day(`fd_tanggal`) = 2 then fn_jam end) as 'fn_2',
			sum(case when day(`fd_tanggal`) = 3 then fn_jam end) as 'fn_3',
			sum(case when day(`fd_tanggal`) = 4 then fn_jam end) as 'fn_4',
			sum(case when day(`fd_tanggal`) = 5 then fn_jam end) as 'fn_5',
			sum(case when day(`fd_tanggal`) = 6 then fn_jam end) as 'fn_6',
			sum(case when day(`fd_tanggal`) = 7 then fn_jam end) as 'fn_7',
			sum(case when day(`fd_tanggal`) = 8 then fn_jam end) as 'fn_8',
			sum(case when day(`fd_tanggal`) = 9 then fn_jam end) as 'fn_9',
			sum(case when day(`fd_tanggal`) = 10 then fn_jam end) as 'fn_10',
			sum(case when day(`fd_tanggal`) = 11 then fn_jam end) as 'fn_11',
			sum(case when day(`fd_tanggal`) = 12 then fn_jam end) as 'fn_12',
			sum(case when day(`fd_tanggal`) = 13 then fn_jam end) as 'fn_13',
			sum(case when day(`fd_tanggal`) = 14 then fn_jam end) as 'fn_14',
			sum(case when day(`fd_tanggal`) = 15 then fn_jam end) as 'fn_15',
			sum(case when day(`fd_tanggal`) = 16 then fn_jam end) as 'fn_16',
			sum(case when day(`fd_tanggal`) = 17 then fn_jam end) as 'fn_17',
			sum(case when day(`fd_tanggal`) = 18 then fn_jam end) as 'fn_18',
			sum(case when day(`fd_tanggal`) = 19 then fn_jam end) as 'fn_19',
			sum(case when day(`fd_tanggal`) = 20 then fn_jam end) as 'fn_20',
			sum(case when day(`fd_tanggal`) = 21 then fn_jam end) as 'fn_21',
			sum(case when day(`fd_tanggal`) = 22 then fn_jam end) as 'fn_22',
			sum(case when day(`fd_tanggal`) = 23 then fn_jam end) as 'fn_23',
			sum(case when day(`fd_tanggal`) = 24 then fn_jam end) as 'fn_24',
			sum(case when day(`fd_tanggal`) = 25 then fn_jam end) as 'fn_25',
			sum(case when day(`fd_tanggal`) = 26 then fn_jam end) as 'fn_26',
			sum(case when day(`fd_tanggal`) = 27 then fn_jam end) as 'fn_27',
			sum(case when day(`fd_tanggal`) = 28 then fn_jam end) as 'fn_28',
			sum(case when day(`fd_tanggal`) = 29 then fn_jam end) as 'fn_29',
			sum(case when day(`fd_tanggal`) = 30 then fn_jam end) as 'fn_30',
			sum(case when day(`fd_tanggal`) = 31 then fn_jam end) as 'fn_31'
			FROM tx_absensi
			WHERE MONTH(fd_tanggal) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tanggal) = YEAR('".trim($sMY)."')
		");

		$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($sKdCab)."'	
		");

		$xSQL = $xSQL.("
			GROUP BY fs_nama
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}
	
}