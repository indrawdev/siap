<?php

class Mmasterdealer extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listKodePosAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_dati
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kodepos LIKE '%".trim($sCari)."%'
					OR fs_propinsi LIKE '%".trim($sCari)."%'
					OR fs_kelurahan LIKE '%".trim($sCari)."%'
					OR fs_kecamatan LIKE '%".trim($sCari)."%'
					OR fs_nama_dati LIKE '%".trim($sCari)."%')
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listKodePos($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_dati");
		
		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kodepos LIKE '%".trim($sCari)."%'
					OR fs_propinsi LIKE '%".trim($sCari)."%'
					OR fs_kelurahan LIKE '%".trim($sCari)."%'
					OR fs_kecamatan LIKE '%".trim($sCari)."%'
					OR fs_nama_dati LIKE '%".trim($sCari)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kodepos LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMasterAll($sCari)
	{
		$xSQL = ("
			SELECT fs_aktif, fs_kode_dealer1,
			fs_kode_dealer2, fn_cabang_dealer, fs_nama_dealer,
			fs_alamat_dealer, fs_kota_dealer,
			fs_telepon_dealer, fs_handphone_dealer,
			fs_nama_pemilik, fs_npwp_pemilik,
			fs_ktp_pemilik, fs_nama_bank_pencairan,
			fs_rekening_bank_pencairan, fs_atasnama_bank_pencairan,
			fn_persen_refund_bunga, fn_persen_refund_asuransi
			FROM tm_dealer
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				WHERE fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
				AND (fs_kode_dealer1 LIKE '%".trim($sCari)."%'
						OR fs_kode_dealer2 LIKE '%".trim($sCari)."%'
						OR fs_nama_dealer LIKE '%".trim($sCari)."%'
						OR fs_nama_pemilik LIKE '%".trim($sCari)."%')
				");
			}
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kode_dealer1 LIKE '%".trim($sCari)."%'
					OR fs_kode_dealer2 LIKE '%".trim($sCari)."%'
					OR fs_nama_dealer LIKE '%".trim($sCari)."%'
					OR fs_nama_pemilik LIKE '%".trim($sCari)."%')
			");
		}
		
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT fs_aktif, fs_kode_dealer1,
			fs_kode_dealer2, fn_cabang_dealer, fs_nama_dealer,
			fs_alamat_dealer, fs_kota_dealer,
			fs_telepon_dealer, fs_handphone_dealer,
			fs_nama_pemilik, fs_npwp_pemilik,
			fs_ktp_pemilik, fs_nama_bank_pencairan,
			fs_rekening_bank_pencairan, fs_atasnama_bank_pencairan,
			fn_persen_refund_bunga, fn_persen_refund_asuransi
			FROM tm_dealer
		");
		
		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.(" 
				WHERE fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'
			");
			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
				AND (fs_kode_dealer1 LIKE '%".trim($sCari)."%'
						OR fs_kode_dealer2 LIKE '%".trim($sCari)."%'
						OR fs_nama_dealer LIKE '%".trim($sCari)."%'
						OR fs_nama_pemilik LIKE '%".trim($sCari)."%')
				");
			}
		}

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE (fs_kode_dealer1 LIKE '%".trim($sCari)."%'
					OR fs_kode_dealer2 LIKE '%".trim($sCari)."%'
					OR fs_nama_dealer LIKE '%".trim($sCari)."%'
					OR fs_nama_pemilik LIKE '%".trim($sCari)."%')
			");
		}
		
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_dealer1 LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function check($kode_cabang, $kode_dealer1, $kode_dealer2, $cabang_dealer)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_dealer1, fs_kode_dealer2, fn_cabang_dealer
			FROM tm_dealer
			WHERE fs_kode_cabang ='".trim($kode_cabang)."' 
			AND fs_kode_dealer1 = '".trim($kode_dealer1)."'  
			AND fs_kode_dealer2 = '".trim($kode_dealer2)."'
			AND fn_cabang_dealer = '".trim($cabang_dealer)."'
			");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}

?>