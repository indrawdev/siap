<?php

class Mmastersdm extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}


	function ambilNiks($sUser)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_ ");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_nik='".trim($sCari)."'");

		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_nik LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilNikAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_sdm
		");


		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_nik='".trim($sCari)."'");

		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilNikAll2($sCari,$sCari2)
	{
		$xSQL = ("
			SELECT *
			FROM tm_sdm where fs_aktif=1
		");


		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_nik='".trim($sCari)."' AND fs_aktif=1");

		}

		if (trim($sCari2) <> '')
		{
			$xSQL = $xSQL.("
			AND fs_nik LIKE '%".trim($sCari2)."%'
					OR fs_nama LIKE '%".trim($sCari2)."%' AND fs_aktif=1");

		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilJabatanAll2($nik)
	{
		$xSQL = ("
			SELECT	a.*,b.*
			FROM	tm_jabatan a JOIN tm_struktur_jabatan b on a.fs_kode_jabatan=b.fs_kode_jabatan
			WHERE	b.fs_nik = '".trim($nik)."'");
	
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilJabatanAll()
	{
		$xSQL = ("
			SELECT *
			FROM tm_jabatan
			ORDER BY fs_kode_jabatan
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilCabangAll()
	{
		$xSQL = ("
			SELECT *
			FROM tm_cabang
			ORDER BY fs_kode_cabang
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilNik($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_sdm ");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_nik='".trim($sCari)."'");

		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_nik LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilNik2($sCari,$sCari2,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_sdm where fs_aktif=1");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_nik='".trim($sCari)."' AND fs_flag_login=1");

		}

		if (trim($sCari2) <> '')
		{
			$xSQL = $xSQL.("
			AND fs_nik LIKE '%".trim($sCari2)."%'
					OR fs_nama LIKE '%".trim($sCari2)."%' AND fs_flag_login=1");

		}

		
		$xSQL = $xSQL.("
			ORDER BY fs_nik LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilJabatan($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_jabatan ");
	
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_jabatan LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ambilJabatan2($nik,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	a.*,b.*
			FROM	tm_jabatan a JOIN tm_struktur_jabatan b on a.fs_kode_jabatan=b.fs_kode_jabatan
			WHERE	b.fs_nik = '".trim($nik)."'");

	
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kode_jabatan LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	
	function ambilCabang($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_cabang ");
	
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	

	function CekNik($xdKodeCab)
	{
		$xSQL = ("
			SELECT	fs_nik
			FROM	tm_sdm
			WHERE	fs_nik = '".trim($xdKodeCab)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilCabangs($kodecab)
	{
		$xSQL = ("
			SELECT	fs_kode_cabang
			FROM	tm_cabang
			WHERE	fs_kode_cabang = '".trim($kodecab)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}

?>