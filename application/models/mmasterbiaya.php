<?php

class MMasterBiaya extends CI_Model
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

	function listAdminAll($kd, $jns, $pl, $lm)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_admin
		");
		
		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_piutang LIKE '%".trim($jns)."%'
				");
				if (!empty($pl)) {
					$xSQL = $xSQL.("
						AND fs_pola_transaksi LIKE '%".trim($pl)."%'
					");
					if (!empty($lm)) {
						$xSQL = $xSQL.("
							AND fd_lama_angsuran LIKE '%".trim($lm)."%'
						");
					}
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_piutang LIKE '%".trim($jns)."%'
			");
			if (!empty($pl)) {
				$xSQL = $xSQL.("
					AND fs_pola_transaksi LIKE '%".trim($pl)."%'
				");
				if (!empty($lm)) {
					$xSQL = $xSQL.("
						AND fd_lama_angsuran LIKE '%".trim($lm)."%'
					");
				}
			}
		}
		else if (!empty($pl)) {
			$xSQL = $xSQL.("
				WHERE fs_pola_transaksi LIKE '%".trim($pl)."%'
			");
			if (!empty($lm)) {
				$xSQL = $xSQL.("
					AND fd_lama_angsuran LIKE '%".trim($lm)."%'
				");
			}
		}
		else if (!empty($lm)) {
			$xSQL = $xSQL.("
				WHERE fd_lama_angsuran LIKE '%".trim($lm)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listAdmin($kd, $jns, $pl, $lm, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_admin
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_piutang LIKE '%".trim($jns)."%'
				");
				if (!empty($pl)) {
					$xSQL = $xSQL.("
						AND fs_pola_transaksi LIKE '%".trim($pl)."%'
					");
					if (!empty($lm)) {
						$xSQL = $xSQL.("
							AND fd_lama_angsuran LIKE '%".trim($lm)."%'
						");
					}
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_piutang LIKE '%".trim($jns)."%'
			");
			if (!empty($pl)) {
				$xSQL = $xSQL.("
					AND fs_pola_transaksi LIKE '%".trim($pl)."%'
				");
				if (!empty($lm)) {
					$xSQL = $xSQL.("
						AND fd_lama_angsuran LIKE '%".trim($lm)."%'
					");
				}
			}
		}
		else if (!empty($pl)) {
			$xSQL = $xSQL.("
				WHERE fs_pola_transaksi LIKE '%".trim($pl)."%'
			");
			if (!empty($lm)) {
				$xSQL = $xSQL.("
					AND fd_lama_angsuran LIKE '%".trim($lm)."%'
				");
			}
		}
		else if (!empty($lm)) {
			$xSQL = $xSQL.("
				WHERE fd_lama_angsuran LIKE '%".trim($lm)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listFidusiaAll($kd, $jns, $pl)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_fidusia
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_piutang LIKE '%".trim($jns)."%'
				");
				if (!empty($pl)) {
					$xSQL = $xSQL.("
						AND fs_pola_transaksi LIKE '%".trim($pl)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_piutang LIKE '%".trim($jns)."%'
			");
			if (!empty($pl)) {
				$xSQL = $xSQL.("
					AND fs_pola_transaksi LIKE '%".trim($pl)."%'
				");
			}
		}
		else if (!empty($pl)) {
			$xSQL = $xSQL.("
				WHERE fs_pola_transaksi LIKE '%".trim($pl)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listFidusia($kd, $jns, $pl, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_fidusia
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_cabang LIKE '%".trim($kd)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_piutang LIKE '%".trim($jns)."%'
				");
				if (!empty($pl)) {
					$xSQL = $xSQL.("
						AND fs_pola_transaksi LIKE '%".trim($pl)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_piutang LIKE '%".trim($jns)."%'
			");
			if (!empty($pl)) {
				$xSQL = $xSQL.("
					AND fs_pola_transaksi LIKE '%".trim($pl)."%'
				");
			}
		}
		else if (!empty($pl)) {
			$xSQL = $xSQL.("
				WHERE fs_pola_transaksi LIKE '%".trim($pl)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listAsuransiAll($kd, $wil, $jns, $km)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_asuransi
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_asuransi LIKE '%".trim($kd)."%'
			");
			if (!empty($wil)) {
				$xSQL = $xSQL.("
					AND fs_wilayah_asuransi LIKE '%".trim($wil)."%'
				");
				if (!empty($jns)) {
					$xSQL = $xSQL.("
						AND fs_jenis_kendaraan LIKE '%".trim($jns)."%'
					");
					if (!empty($km)) {
						$xSQL = $xSQL.("
							AND fs_komersial LIKE '%".trim($km)."%'
						");
					}
				}
			}
		}
		else if (!empty($wil)) {
			$xSQL = $xSQL.("
				WHERE fs_wilayah_asuransi LIKE '%".trim($wil)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_kendaraan LIKE '%".trim($jns)."%'
				");
				if (!empty($km)) {
					$xSQL = $xSQL.("
						AND fs_komersial LIKE '%".trim($km)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_kendaraan LIKE '%".trim($jns)."%'
			");
			if (!empty($km)) {
				$xSQL = $xSQL.("
					AND fs_komersial LIKE '%".trim($km)."%'
				");
			}
		}
		else if (!empty($km)) {
			$xSQL = $xSQL.("
				WHERE fs_komersial LIKE '%".trim($km)."%'
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listAsuransi($kd, $wil, $jns, $km, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_asuransi
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_asuransi LIKE '%".trim($kd)."%'
			");
			if (!empty($wil)) {
				$xSQL = $xSQL.("
					AND fs_wilayah_asuransi LIKE '%".trim($wil)."%'
				");
				if (!empty($jns)) {
					$xSQL = $xSQL.("
						AND fs_jenis_kendaraan LIKE '%".trim($jns)."%'
					");
					if (!empty($km)) {
						$xSQL = $xSQL.("
							AND fs_komersial LIKE '%".trim($km)."%'
						");
					}
				}
			}
		}
		else if (!empty($wil)) {
			$xSQL = $xSQL.("
				WHERE fs_wilayah_asuransi LIKE '%".trim($wil)."%'
			");
			if (!empty($jns)) {
				$xSQL = $xSQL.("
					AND fs_jenis_kendaraan LIKE '%".trim($jns)."%'
				");
				if (!empty($km)) {
					$xSQL = $xSQL.("
						AND fs_komersial LIKE '%".trim($km)."%'
					");
				}
			}
		}
		else if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_kendaraan LIKE '%".trim($jns)."%'
			");
			if (!empty($km)) {
				$xSQL = $xSQL.("
					AND fs_komersial LIKE '%".trim($km)."%'
				");
			}
		}
		else if (!empty($km)) {
			$xSQL = $xSQL.("
				WHERE fs_komersial LIKE '%".trim($km)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fd_tanggal_buat DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listPerluasanAll($kd, $wil, $per)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_perluasan
		");

		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_asuransi LIKE '%".trim($kd)."%'
			");
			if (!empty($wil)) {
				$xSQL = $xSQL.("
					AND fs_wilayah_asuransi LIKE '%".trim($wil)."%'
				");
				if (!empty($per)) {
					$xSQL = $xSQL.("
						AND fs_perluasan LIKE '%".trim($per)."%'
					");
				}
			}
		}
		else if (!empty($wil)) {
			$xSQL = $xSQL.("
				WHERE fs_wilayah_asuransi LIKE '%".trim($wil)."%'
			");
			if (!empty($per)) {
				$xSQL = $xSQL.("
					AND fs_perluasan LIKE '%".trim($per)."%'
				");
			}
		}
		else if (!empty($per)) {
			$xSQL = $xSQL.("
				WHERE fs_perluasan LIKE '%".trim($per)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listPerluasan($kd, $wil, $per, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_perluasan
		");
		
		if (!empty($kd)) {
			$xSQL = $xSQL.("
				WHERE fs_kode_asuransi LIKE '%".trim($kd)."%'
			");
			if (!empty($wil)) {
				$xSQL = $xSQL.("
					AND fs_wilayah_asuransi LIKE '%".trim($wil)."%'
				");
				if (!empty($per)) {
					$xSQL = $xSQL.("
						AND fs_perluasan LIKE '%".trim($per)."%'
					");
				}
			}
		}
		else if (!empty($wil)) {
			$xSQL = $xSQL.("
				WHERE fs_wilayah_asuransi LIKE '%".trim($wil)."%'
			");
			if (!empty($per)) {
				$xSQL = $xSQL.("
					AND fs_perluasan LIKE '%".trim($per)."%'
				");
			}
		}
		else if (!empty($per)) {
			$xSQL = $xSQL.("
				WHERE fs_perluasan LIKE '%".trim($per)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_asuransi DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listTjhAll($jns)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_tjh
		");

		if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_kendaraan LIKE '%".trim($jns)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listTjh($jns, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_tjh
		");

		if (!empty($jns)) {
			$xSQL = $xSQL.("
				WHERE fs_jenis_kendaraan LIKE '%".trim($jns)."%'
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_jenis_kendaraan DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listCabangAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama_cabang, 
			fs_alamat_cabang, fs_kota_cabang
			FROM tm_cabang
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE fs_nama_cabang LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listCabang($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama_cabang, 
			fs_alamat_cabang, fs_kota_cabang
			FROM tm_cabang
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE fs_nama_cabang LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkBiayaAdmin($kd, $jns, $pl, $lm)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_admin
			WHERE fs_kode_cabang = '".trim($kd)."'
			AND fs_jenis_piutang = '".trim($jns)."'
			AND fs_pola_transaksi = '".trim($pl)."'
			AND fd_lama_angsuran = '".trim($lm)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkBiayaFidusia($kd, $jns, $pl, $min, $max)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_fidusia
			WHERE fs_kode_cabang = '".trim($kd)."'
			AND fs_jenis_piutang = '".trim($jns)."'
			AND fs_pola_transaksi = '".trim($pl)."'
			AND fs_min_otr = '".trim($min)."'
			AND fs_max_otr = '".trim($max)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkBiayaAsuransi($kd, $wil, $jns, $kom, $min, $max)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_asuransi
			WHERE fs_kode_asuransi = '".trim($kd)."'
			AND fs_wilayah_asuransi = '".trim($wil)."'
			AND fs_jenis_kendaraan = '".trim($jns)."'
			AND fs_komersial = '".trim($kom)."'
			AND fs_min_otr = '".trim($min)."'
			AND fs_max_otr = '".trim($max)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkBiayaPerluasan($kd, $wil, $per)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_perluasan
			WHERE fs_kode_asuransi = '".trim($kd)."'
			AND fs_wilayah_asuransi = '".trim($wil)."'
			AND fs_perluasan = '".trim($per)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkBiayaTJH($jns, $min, $max)
	{
		$xSQL = ("
			SELECT *
			FROM tm_biaya_tjh
			WHERE fs_jenis_kendaraan = '".trim($jns)."'
			AND fs_min_otr = '".trim($min)."'
			AND fs_max_otr = '".trim($max)."'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}