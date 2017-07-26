<?php

class MAnalisa extends CI_Model
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

	/* CABANG */
	function listRetailAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (c.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan = '0'
		");
		// AND (e.fn_maks_plafon <= a.fn_pokok_pembiayaan_dealer OR e.fs_maks_score = a.fs_score)

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

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

	function listRetail($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan = '0'
		");
		// AND (e.fn_maks_plafon <= a.fn_pokok_pembiayaan_dealer OR e.fs_maks_score = a.fs_score)

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

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

	function listFleetAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'Y' AND a.fn_no_batch IS NOT NULL
			AND a.fs_flag_keputusan = '0'
		");
		// AND (e.fn_maks_plafon <= a.fn_pokok_pembiayaan_dealer OR e.fs_maks_score = a.fs_score)

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listFleet($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'Y' AND a.fn_no_batch IS NOT NULL
			AND a.fs_flag_keputusan = '0'
		");
		//AND (e.fn_maks_plafon <= a.fn_pokok_pembiayaan_dealer OR e.fs_maks_score = a.fs_score)

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND a.fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	/* PUSAT */
	function listRetailPusatAll($sCari, $sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (c.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
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

	function listRetailPusat($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
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

	function listFleetPusatAll($sCari,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'Y' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND a.fn_no_batch IS NOT NULL
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
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
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listFleetPusat($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '".trim($sFlag)."'
			AND a.fs_fleet = 'Y' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND a.fn_no_batch IS NOT NULL
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
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
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function node($nApk, $nKdCab)
	{
		$xSQL = ("
			SELECT fs_ktp_konsumen, fs_nama_konsumen,
			fd_tanggal_lahir_konsumen, fs_tempat_lahir_konsumen,
			fs_nama_ibu_kandung, fs_npwp_konsumen, fs_siup_perusahaan
			FROM tx_apk
			WHERE fn_no_apk = '".trim($nApk)."' AND fs_kode_cabang = '".trim($nKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function detail($nBatch, $nKdCab)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_kode_cabang = '".trim($nKdCab)."'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listdetailAll($nBatch)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = 1
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				AND fs_flag_keputusan = 0
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listdetail($nStart,$nLimit,$nBatch)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = 1
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
				AND fs_flag_keputusan = 0
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
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
			AND fs_flag_keputusan = 0
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
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

	function listKonsumen($sCari,$nStart,$nLimit,$sFlag)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_flag_survey = '".trim($sFlag)."'
			AND fs_flag_keputusan = 0
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
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
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function dataPendukungAll($nApk, $nKdCab, $sCari)
	{
		$xSQL = ("
			SELECT	*
			FROM tx_apk_data_pendukung a 
			JOIN  tm_data_pendukung b  ON a.fs_kode_dokumen = b.fs_kode_dokumen
			WHERE a.fn_no_apk IN ('".trim($nApk)."') AND a.fs_kode_cabang = '".trim($nKdCab)."'
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

	function dataPendukung($nApk, $nKdCab, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tx_apk_data_pendukung a 
			JOIN  tm_data_pendukung b  ON a.fs_kode_dokumen = b.fs_kode_dokumen
			WHERE a.fn_no_apk IN ('".trim($nApk)."') AND a.fs_kode_cabang = '".trim($nKdCab)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (a.fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR b.fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fs_kode_dokumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkInternalAll($nKtp, $sCari)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist
			FROM tx_apk a
			LEFT JOIN  tm_blacklist b 
			ON b.fs_ktp_konsumen = a.fs_ktp_konsumen
			OR CONCAT(b.fs_nama_konsumen, b.fd_tanggal_lahir_konsumen) = CONCAT(a.fs_nama_konsumen, a.fd_tanggal_lahir_konsumen)
			OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			OR b.fs_npwp_konsumen = a.fs_npwp_konsumen
			OR b.fs_siup_perusahaan = a.fs_siup_perusahaan
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
			");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkInternal($nKtp, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan, 
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist
			FROM tx_apk a
			LEFT JOIN  tm_blacklist b 
			ON b.fs_ktp_konsumen = a.fs_ktp_konsumen
			OR CONCAT(b.fs_nama_konsumen, b.fd_tanggal_lahir_konsumen) = CONCAT(a.fs_nama_konsumen, a.fd_tanggal_lahir_konsumen)
			OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			OR b.fs_npwp_konsumen = a.fs_npwp_konsumen
			OR b.fs_siup_perusahaan = a.fs_siup_perusahaan
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
			");
		
		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkRejectAll($nKtp, $sCari)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject
			FROM tx_apk a
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
			");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkReject($nKtp, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject
			FROM tx_apk a
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
			");
		
		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkFamilyAll($nKtp, $sCari)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
			");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkFamily($nKtp, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
			");

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}