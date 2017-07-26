<?php

class MInputSurvey extends CI_Model
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
			FROM	tm_referensi
			WHERE	fs_kode_referensi = '".trim($sCari)."'");
		
		$xSQL = $xSQL.("
			ORDER BY fs_nama_referensi DESC
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listRetailAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
			AND fs_fleet = 'N'
		");


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

	function listRetail($sCari,$nStart,$nLimit,$sFlag){
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
			AND fs_fleet = 'N'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listFleetAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
		");


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
			ORDER BY fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listFleet($sCari,$nStart,$nLimit,$sFlag){
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
		");

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
			ORDER BY fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listdetail($nBatch)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function listKonsumenAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
		");


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

	function listKonsumen($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listHasilSurveyAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT a.fs_nama_konsumen as nama_konsumen, a.fd_tanggal_survey as tanggal_survey,
			a.fs_petugas_survey as petugas_survey, a.fn_lama_survey as lama_survey, 
			a.fn_jumlah_kendaraan as jumlah_kendaraan, b.fs_nama_referensi as kondisi_lingkungan, 
			c.fs_nama_referensi as kondisi_kantor, a.fs_catatan_tempat_tinggal as catatan_tempat_tinggal,
			a.fs_catatan_lingkungan as catatan_lingkungan, a.fs_catatan_tempat_usaha as catatan_tempat_usaha,
			CASE a.fs_garasi WHEN 'Y' THEN 'YA' WHEN 'T' THEN 'TIDAK' END garasi,
			a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian
			FROM tx_apk a JOIN tm_referensi b on b.fs_nilai1_referensi =  a.fs_kondisi_lingkungan
			AND b.fs_kode_referensi = 'kondisi_lingkungan_setempat'
			JOIN tm_referensi c on c.fs_nilai1_referensi = a.fs_kondisi_kantor
			AND c.fs_kode_referensi = 'kondisi_kantor'
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
		");


		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listHasilSurvey($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT a.fs_nama_konsumen as nama_konsumen, a.fd_tanggal_survey as tanggal_survey,
			a.fs_petugas_survey as petugas_survey, a.fn_lama_survey as lama_survey, 
			a.fn_jumlah_kendaraan as jumlah_kendaraan, b.fs_nama_referensi as kondisi_lingkungan, 
			c.fs_nama_referensi as kondisi_kantor, a.fs_catatan_tempat_tinggal as catatan_tempat_tinggal,
			a.fs_catatan_lingkungan as catatan_lingkungan, a.fs_catatan_tempat_usaha as catatan_tempat_usaha,
			CASE a.fs_garasi WHEN 'Y' THEN 'YA' WHEN 'T' THEN 'TIDAK' END garasi,
			a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian
			FROM tx_apk a JOIN tm_referensi b on b.fs_nilai1_referensi =  a.fs_kondisi_lingkungan
			AND b.fs_kode_referensi = 'kondisi_lingkungan_setempat'
			JOIN tm_referensi c on c.fs_nilai1_referensi = a.fs_kondisi_kantor
			AND c.fs_kode_referensi = 'kondisi_kantor'
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listSurveyorAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM	tm_surveyor
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor_lama LIKE '%".trim($sCari)."%'
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%'
					OR fs_ktp_surveyor LIKE '%".trim($sCari)."%'
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listSurveyor($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_surveyor ");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor LIKE '%".trim($sCari)."%'
					OR fs_kode_surveyor_lama LIKE '%".trim($sCari)."%'
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%'
					OR fs_ktp_surveyor LIKE '%".trim($sCari)."%'
			");
		}
		$xSQL = $xSQL.("
			ORDER BY fs_nama_surveyor LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function apkPendukungAll($nApk, $sCari)
	{
		$xSQL = ("
			SELECT	*
			FROM tx_apk_data_pendukung a 
			JOIN  tm_data_pendukung b  ON a.fs_kode_dokumen = b.fs_kode_dokumen
			WHERE a.fn_no_apk IN ('".trim($nApk)."')
			AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR b.fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function apkPendukung($nApk, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tx_apk_data_pendukung a 
			JOIN  tm_data_pendukung b  ON a.fs_kode_dokumen = b.fs_kode_dokumen
			WHERE a.fn_no_apk IN ('".trim($nApk)."')
			AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR b.fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY b.fs_no ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function dataPendukungAll($sCari)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_data_pendukung");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function dataPendukung($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_data_pendukung");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_dokumen LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


}
