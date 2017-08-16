<?php

class MStatusApk extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	/* CABANG */
	function listStatusAll($sMY, $sCari)
	{
		$xSQL = ("
			SELECT DISTINCT fn_no_apk, fd_tgl_apk, fs_kode_cabang,
			fs_kode_lokasi, fs_nomor_dealer, fs_jenis_piutang, fs_pola_transaksi,
			fn_nomor_perjanjian, fs_nama_konsumen, fs_catatan_analisa,
			CASE fs_flag_survey
				WHEN '1' THEN 'SUDAH DISURVEY' ELSE 'BELUM DISURVEY' END AS fs_status_survey,
			CASE 
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit = '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'MENUNGGU PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'SUDAH DIPUTUSKAN PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'A' OR fs_grade = 'B')) THEN 'SUDAH DIPUTUSKAN CABANG'
				WHEN fs_flag_keputusan = '1' THEN 'SUDAH DIPUTUSKAN CABANG' 
				WHEN fs_flag_keputusan = '0' THEN 'BELUM DIPUTUSKAN'
				ELSE '-' END AS fs_status_keputusan,
			CASE fs_flag_transfer
				WHEN '1' THEN 'SUDAH DITRANSFER' ELSE 'BELUM DITRANSFER' END AS fs_status_transfer,
			CASE fs_keputusan_kredit 
				WHEN 'B' THEN 'BATAL' 
				WHEN 'N' THEN 'DITOLAK'
				WHEN 'Y' THEN 'DISETUJUI'
				WHEN '' THEN 'DALAM PROSES'
			END keputusan_kredit
			FROM tx_apk
			WHERE MONTH(fd_tgl_apk) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tgl_apk) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
				AND fs_nama_konsumen LIKE '%".trim($sCari)."%'
				");
			}
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND fs_nama_konsumen LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listStatus($sMY, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT fn_no_apk, fd_tgl_apk, fs_kode_cabang,
			fs_kode_lokasi, fs_nomor_dealer, fs_jenis_piutang, fs_pola_transaksi,
			fn_nomor_perjanjian, fs_nama_konsumen, fs_catatan_analisa,
			CASE fs_flag_survey
				WHEN '1' THEN 'SUDAH DISURVEY' ELSE 'BELUM DISURVEY' END AS fs_status_survey,
			CASE 
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit = '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'MENUNGGU PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'SUDAH DIPUTUSKAN PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'A' OR fs_grade = 'B')) THEN 'SUDAH DIPUTUSKAN CABANG'
				WHEN fs_flag_keputusan = '1' THEN 'SUDAH DIPUTUSKAN CABANG' 
				WHEN fs_flag_keputusan = '0' THEN 'BELUM DIPUTUSKAN'
				ELSE '-' END AS fs_status_keputusan,
			CASE fs_flag_transfer
				WHEN '1' THEN 'SUDAH DITRANSFER' ELSE 'BELUM DITRANSFER' END AS fs_status_transfer,
			CASE fs_keputusan_kredit 
				WHEN 'B' THEN 'BATAL' 
				WHEN 'N' THEN 'DITOLAK'
				WHEN 'Y' THEN 'DISETUJUI'
				WHEN '' THEN 'DALAM PROSES'
			END keputusan_kredit
			FROM tx_apk
			WHERE MONTH(fd_tgl_apk) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tgl_apk) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
			
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");
			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%')
				");
			}
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND fs_nama_konsumen LIKE '%".trim($sCari)."%'
			");
		}
		

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	/* PUSAT */
	function listStatusPusatAll($sMY, $sCari)
	{
		$xSQL = ("
			SELECT DISTINCT fn_no_apk, fd_tgl_apk, fs_kode_cabang,
			fs_kode_lokasi, fs_nomor_dealer, fs_jenis_piutang, fs_pola_transaksi,
			fn_nomor_perjanjian, fs_nama_konsumen, fs_catatan_analisa, fs_catatan_analisa_pusat,
			CASE fs_flag_survey
				WHEN '1' THEN 'SUDAH DISURVEY' ELSE 'BELUM DISURVEY' END AS fs_status_survey,
			CASE 
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit = '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'MENUNGGU PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'SUDAH DIPUTUSKAN PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'A' OR fs_grade = 'B')) THEN 'SUDAH DIPUTUSKAN CABANG'
				WHEN fs_flag_keputusan = '1' THEN 'SUDAH DIPUTUSKAN CABANG' 
				WHEN fs_flag_keputusan = '0' THEN 'BELUM DIPUTUSKAN'
				ELSE '-' END AS fs_status_keputusan,
			CASE fs_flag_transfer
				WHEN '1' THEN 'SUDAH DITRANSFER' ELSE 'BELUM DITRANSFER' END AS fs_status_transfer,
			CASE fs_keputusan_kredit 
				WHEN 'B' THEN 'BATAL' 
				WHEN 'N' THEN 'DITOLAK'
				WHEN 'Y' THEN 'DISETUJUI'
				WHEN '' THEN 'DALAM PROSES'
			END keputusan_kredit
			FROM tx_apk
			WHERE MONTH(fd_tgl_apk) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tgl_apk) = YEAR('".trim($sMY)."')
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND fs_nama_konsumen LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listStatusPusat($sMY, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT fn_no_apk, fd_tgl_apk, fs_kode_cabang,
			fs_kode_lokasi, fs_nomor_dealer, fs_jenis_piutang, fs_pola_transaksi,
			fn_nomor_perjanjian, fs_nama_konsumen, fs_catatan_analisa, fs_catatan_analisa_pusat,
			CASE fs_flag_survey
				WHEN '1' THEN 'SUDAH DISURVEY' ELSE 'BELUM DISURVEY' END AS fs_status_survey,
			CASE 
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit = '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'MENUNGGU PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'C' OR fs_grade = 'D')) THEN 'SUDAH DIPUTUSKAN PUSAT'
				WHEN (fs_flag_keputusan = '1' AND fs_keputusan_kredit <> '' AND (fs_grade = 'A' OR fs_grade = 'B')) THEN 'SUDAH DIPUTUSKAN CABANG'
				WHEN fs_flag_keputusan = '1' THEN 'SUDAH DIPUTUSKAN CABANG' 
				WHEN fs_flag_keputusan = '0' THEN 'BELUM DIPUTUSKAN'
				ELSE '-' END AS fs_status_keputusan,
			CASE fs_flag_transfer
				WHEN '1' THEN 'SUDAH DITRANSFER' ELSE 'BELUM DITRANSFER' END AS fs_status_transfer,
			CASE fs_keputusan_kredit 
				WHEN 'B' THEN 'BATAL' 
				WHEN 'N' THEN 'DITOLAK'
				WHEN 'Y' THEN 'DISETUJUI'
				WHEN '' THEN 'DALAM PROSES'
			END keputusan_kredit
			FROM tx_apk
			WHERE MONTH(fd_tgl_apk) = MONTH('".trim($sMY)."')
			AND YEAR(fd_tgl_apk) = YEAR('".trim($sMY)."')

		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND fs_nama_konsumen LIKE '%".trim($sCari)."%'
			");
		}
		

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}