<?php

class MReport extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function detail($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fn_no_apk = '".trim($nApk)."'
			AND fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		if ($sSQL->num_rows() > 0) 
    	{ 
        	return $sSQL->row();
    	}
    	return false;
	}

	function pjj($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT CONCAT(fs_kode_lokasi, fs_nomor_dealer, 
			fs_jenis_piutang, fs_pola_transaksi, fn_nomor_perjanjian) 
			AS fs_pjj
			FROM tx_apk
			WHERE fn_no_apk = '".trim($nApk)."'
			AND fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function cabang($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_cabang, b.fs_alamat_cabang, 
			b.fs_kota_cabang, b.fs_kodepos_cabang, 
			b.fs_telfon_cabang, b.fs_fax_cabang, 
			b.fs_nama_pimpinan, b.fs_jabatan_pimpinan, 
			b.fs_nama_bank_angsuran, b.fs_rekening_bank_angsuran
			FROM tx_apk a 
			JOIN tm_cabang b ON b.fs_kode_cabang = a.fs_kode_cabang
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function detailltransaksi($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_kode_transaksi,
			b.fs_nama_transaksi, b.fs_persentase_nilai_transaksi,
			b.fn_nilai_transaksi, b.fs_tagih_ke_konsumen, b.fs_cair_ke_dealer
			FROM tx_apk a JOIN tx_apk_detailtransaksi b ON 
			b.fn_no_apk = a.fn_no_apk AND
			b.fs_kode_cabang = a.fs_kode_cabang
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}

	function pengurus($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT c.fs_nama_jabatan, b.fs_nama_pengurus
			FROM tx_apk a JOIN tx_apk_pengurus b ON 
			b.fn_no_apk = a.fn_no_apk AND
			b.fs_kode_cabang = a.fs_kode_cabang
			JOIN tm_jabatan c ON c.fs_kode_jabatan = b.fs_kode_jabatan 
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}

	function dati($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_dati
			FROM tx_apk a JOIN tm_dati b ON 
			b.fs_kode_dati = a.fs_kode_dati_konsumen
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_agama($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_agama_konsumen
			WHERE b.fs_kode_referensi = 'agama' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_bentuk_perusahaan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_bentuk_perusahaan
			WHERE b.fs_kode_referensi = 'bentuk_perusahaan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_cara_bayar($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_cara_bayar
			WHERE b.fs_kode_referensi = 'cara_bayar' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_jenis_asuransi($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_jenis_asuransi
			WHERE b.fs_kode_referensi = 'jenis_asuransi' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_jenis_kendaraan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_jenis_kendaraan
			WHERE b.fs_kode_referensi = 'jenis_kendaraan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_jenis_piutang($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_jenis_piutang
			WHERE b.fs_kode_referensi = 'jenis_piutang' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_keputusan_kredit($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_keputusan_kredit
			WHERE b.fs_kode_referensi = 'keputusan_kredit' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_kode_pekerjaan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_usaha_pekerjaan_konsumen
			WHERE b.fs_kode_referensi = 'kode_pekerjaan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_kondisi_kantor($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_kondisi_kantor
			WHERE b.fs_kode_referensi = 'kondisi_kantor' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_kondisi_lingkungan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_kondisi_lingkungan
			WHERE b.fs_kode_referensi = 'kondisi_lingkungan_setempat' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_merek_kendaraan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_kode_kendaraan
			WHERE b.fs_kode_referensi = 'merek_kendaraan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_pekerjaan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_usaha_pekerjaan_konsumen
			WHERE b.fs_kode_referensi = 'pekerjaan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_pendidikan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_pendidikan_konsumen
			WHERE b.fs_kode_referensi = 'pendidikan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_pola_angsuran($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_pola_angsuran
			WHERE b.fs_kode_referensi = 'pola_angsuran' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_pola_transaksi($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_pola_transaksi
			WHERE b.fs_kode_referensi = 'pola_transaksi' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_skala_perusahaan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_skala_perusahaan_konsumen
			WHERE b.fs_kode_referensi = 'skala_perusahaan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_status_konsumen($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_status_konsumen
			WHERE b.fs_kode_referensi = 'status_konsumen' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_status_perusahaan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_status_perusahaan
			WHERE b.fs_kode_referensi = 'status_perusahaan' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_status_rumah($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_status_rumah
			WHERE b.fs_kode_referensi = 'status_rumah' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_status_tempat_usaha($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_status_tempat_usaha
			WHERE b.fs_kode_referensi = 'status_tempat_usaha' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function ref_wilayah_asuransi($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_referensi
			FROM tx_apk a JOIN tm_referensi b ON 
			b.fs_nilai1_referensi = a.fs_wilayah_asuransi
			WHERE b.fs_kode_referensi = 'wilayah_asuransi' AND a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}


	function kategori_usaha($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_sektor_ekonomi
			FROM tx_apk a JOIN tm_usaha b ON 
			b.fs_kode_sektor_ekonomi = a.fs_kategori_usaha_konsumen
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function usaha_konsumen($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_sektor_ekonomi
			FROM tx_apk a JOIN tm_usaha b ON 
			b.fs_kode_sektor_ekonomi = a.fs_kategori_usaha_konsumen
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function usaha_pasangan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_sektor_ekonomi
			FROM tx_apk a JOIN tm_usaha b ON 
			b.fs_kode_sektor_ekonomi = a.fs_usaha_pasangan
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function usaha_penjamin($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_sektor_ekonomi
			FROM tx_apk a JOIN tm_usaha b ON 
			b.fs_kode_sektor_ekonomi = a.fs_usaha_penjamin
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function kendaraan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_model_kendaraan, b.fs_jenis_kendaraan, 
			b.fs_merek_kendaraan, b.fs_silinder_kendaraan
			FROM tx_apk a JOIN tm_kendaraan b ON 
			b.fs_kode_kendaraan = a.fs_kode_kendaraan
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function lembaga_keuangan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_lembaga_keuangan
			FROM tx_apk a JOIN tm_lembagakeuangan b ON 
			b.fs_kode_lembaga_keuangan1 = a.fs_kode_lokasi
			WHERE a.fn_no_apk = '".trim($nApk)."' 
			AND a.fs_kode_cabang = '".trim($sKdCab)."' LIMIT 1
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function dealer($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_dealer, b.fs_alamat_dealer
			FROM tx_apk a JOIN tm_dealer b ON 
			b.fs_kode_dealer1 = a.fs_kode_dealer1
			AND b.fs_kode_dealer2 = a.fs_kode_dealer2
			AND b.fn_cabang_dealer = a.fn_cabang_dealer
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function asuransi($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fs_nama_perusahaan_asuransi, 
			b.fs_alamat_perusahaan_asuransi, b.fs_kota_perusahaan_asuransi
			FROM tx_apk a JOIN tm_perusahaan_asuransi b ON 
			b.fs_kode_asuransi1 = a.fs_kode_asuransi1
			AND b.fs_kode_asuransi2 = a.fs_kode_asuransi2
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function internal_checking($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT DISTINCT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, 
			a.fs_npwp_konsumen, a.fs_siup_perusahaan, 
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
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
			");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function reject_checking($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT DISTINCT a.fn_no_apk, a.fn_no_batch,
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
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function family_checking($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT DISTINCT a.fn_no_apk, a.fn_no_batch,
			case
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
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
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function data_asuransi($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fn_tahun_ke,
			b.fs_jenis_asuransi
			FROM tx_apk a LEFT JOIN tx_apk_asuransi b ON 
			b.fn_no_apk = a.fn_no_apk AND a.fs_kode_cabang = b.fs_kode_cabang
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
			ORDER BY b.fn_tahun_ke ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}

	function data_asuransi_notmix($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT fn_bulan_masa_angsuran_dealer,
			fs_jenis_asuransi
			FROM tx_apk 
			WHERE fn_no_apk = '".trim($nApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function data_perluasan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fn_tahun_ke, 
			b.fs_jenis_perluasan
			FROM tx_apk a JOIN tx_apk_perluasan b ON 
			b.fn_no_apk = a.fn_no_apk
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}

	function tanggal_cetak_spk($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fd_tanggal_cetak
			FROM tx_apk a JOIN tx_apk_cetak b ON 
			b.fn_no_apk = a.fn_no_apk
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
			AND b.fs_kode_dokumen = '016'
			ORDER BY b.fd_tanggal_cetak DESC LIMIT 1
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function tanggal_cetak_spo($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.fd_tanggal_cetak
			FROM tx_apk a JOIN tx_apk_cetak b ON 
			b.fn_no_apk = a.fn_no_apk
			WHERE a.fn_no_apk = '".trim($nApk)."'
			AND a.fs_kode_cabang = '".trim($sKdCab)."'
			AND b.fs_kode_dokumen = '017'
			ORDER BY b.fd_tanggal_cetak DESC LIMIT 1
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function data_kendaraan($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT fs_model_kendaraan
			FROM tm_referensi 
			WHERE fs_kode_referensi = 'persen_denda'
		");	
		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	function denda_perhari()
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi 
			FROM tm_referensi 
			WHERE fs_kode_referensi = 'persen_denda'
		");	

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

}