<?php

class Mmasteruser extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}


	function ambilNikAll()
	{
		$xSQL = ("
			SELECT *
			FROM	tm_sdm
			ORDER BY fs_nik
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMasterAll()
	{
		$xSQL = ("
			SELECT *
			FROM	tm_sdm
			WHERE	fs_aktif = '1' and fs_flag_login='0' and fs_akses_sistem='1'
		");
		
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

	function ambilMacAll()
	{
		$xSQL = ("
			SELECT *
			FROM tm_mac_address
			ORDER BY fs_kode_cabang
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilNikAll2($sCari,$sCari2)
	{
		$xSQL = ("
			SELECT a.*, b.* FROM tm_user a JOIN tm_sdm b ON a.fs_nik=b.fs_nik where b.fs_aktif=1 and b.fs_flag_login=1  group by a.fs_username
		");


		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND b.fs_nik='".trim($sCari)."' AND fb.s_flag_login=1 AND b.fs_aktif=1 ");

		}

		if (trim($sCari2) <> '')
		{
			$xSQL = $xSQL.("
			AND b.fs_nik LIKE '%".trim($sCari2)."%'
					OR b.fs_nama LIKE '%".trim($sCari2)."%' AND b.fs_flag_login=1 AND b.fs_aktif=1");

		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilCabangAll2($sCari)
	{
		$xSQL = ("
			SELECT * from tm_cabang
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_nama_cabang LIKE '%".trim($sCari)."%'");

		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function ambilCabang2($sCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT * from tm_cabang");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE fs_kode_cabang LIKE '%".trim($sCari)."%'
					OR fs_nama_cabang LIKE '%".trim($sCari)."%'");

		}

		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function ambilNik2($sCari,$sCari2,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT a.*, b.* FROM tm_user a JOIN tm_sdm b ON a.fs_nik=b.fs_nik where b.fs_aktif=1 and b.fs_flag_login=1  group by a.fs_username");
		

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			WHERE b.fs_nik='".trim($sCari)."' AND b.fs_flag_login=1 AND b.fs_aktif=1 ");

		}

		if (trim($sCari2) <> '')
		{
			$xSQL = $xSQL.("
			AND b.fs_nik LIKE '%".trim($sCari2)."%'
					OR b.fs_nama LIKE '%".trim($sCari2)."%' AND b.fs_flag_login=1 ND b.fs_aktif=1");

		}

		
		$xSQL = $xSQL.("
			ORDER BY b.fs_nik LIMIT ".$nStart.",".$nLimit."
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

	function ambilUserAll($kodecab)
	{
		$xSQL = ("
			SELECT *
			FROM tm_user
			WHERE	fs_kode_cabang = '".trim($kodecab)."'");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilNik($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_sdm ");
	
		
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
	
	function ambilMac($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_mac_address ");
	
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
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

	function ambilUser($kodecab,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_user WHERE fs_kode_cabang = '".trim($kodecab)."'");
	
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listMaster($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_sdm 
			WHERE fs_aktif = '1' and fs_flag_login='0' and fs_akses_sistem='1'");
	
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	

	function CekNik($xdNik)
	{
		$xSQL = ("
			SELECT	fs_nik
			FROM	tm_user
			WHERE	fs_nik = '".trim($xdNik)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function CekMac($xdNik,$cabang)
	{
		$xSQL = ("
			SELECT	*
			FROM	tm_mac_address
			WHERE	fs_mac_address = '".trim($xdNik)."' and fs_kode_cabang  = '".trim($cabang)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function CekMac2($xdNik)
	{
		$xSQL = ("
			SELECT	*
			FROM	tm_mac_address
			WHERE	fs_mac_address = '".trim($xdNik)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function LoadMenu($xKdLevel)
	{
		
	$xSQL = ("
			SELECT	a.fs_kd_parent, a.fs_kd_child,
					a.fs_nm_menu, a.fs_nm_form, a.fs_nm_formweb,
					CASE IFNULL((SELECT h.fs_kd_parent
							FROM	tm_parlevel h
							WHERE h.fs_kd_parent = a.fs_kd_parent
							AND	h.fs_kd_child = a.fs_kd_child
							AND	h.fs_index = '1'
							AND	h.fs_level = '".trim($xKdLevel)."'), '') WHEN '' THEN 'false' ELSE 'true' END fb_tambah
			FROM	tg_menu a
			ORDER BY a.fs_kd_parent, a.fs_kd_child
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
		
		/*$xSQL = ("
			SELECT	a.fs_kd_parent, a.fs_kd_child,
					a.fs_nm_menu, a.fs_nm_form, a.fs_nm_formweb,
					CASE ISNULL((SELECT h.fs_kd_parent
						FROM	tm_parlevel h (NOLOCK)
						WHERE	h.fs_kd_comp = a.fs_kd_comp
							AND	h.fs_kd_parent = a.fs_kd_parent
							AND	h.fs_kd_child = a.fs_kd_child
							AND	h.fs_index = '1'
							AND	h.fs_level = '".trim($xKdLevel)."'
					), '') WHEN '' THEN 'false' ELSE 'true' END fb_tambah
			FROM	tg_menu a (NOLOCK)
			ORDER BY a.fs_kd_parent, a.fs_kd_child
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;*/
	}


	function KodeAksesAll($xKdLevel)
	{
		$xSQL = ("
			SELECT	fs_nama_jabatan, fs_kode_jabatan
			FROM 	tm_jabatan
			WHERE	LTRIM(RTRIM(fs_kode_jabatan)) <> ''
		");
			
		if (trim($xKdLevel) <> '')
		{
			$xSQL = $xSQL.("
				AND fs_kode_jabatan LIKE '%".trim($xKdLevel)."%'
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_jabatan DESC
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function CekKodeAkses($xKdLevel)
	{
		$xSQL = ("
			SELECT	fs_level
			FROM	tm_parlevel
			WHERE	fs_level = '".trim($xKdLevel)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	
	function KodeAkses($xKdLevel,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	fs_nama_jabatan, fs_kode_jabatan
			FROM 	tm_jabatan
			WHERE	LTRIM(RTRIM(fs_kode_jabatan)) <> ''
		");
			
		if (trim($xKdLevel) <> '')
		{
			$xSQL = $xSQL.("
				AND fs_kode_jabatan LIKE '%".trim($xKdLevel)."%'
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kode_jabatan LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function CekUser($xdCabang)
	{
		$xSQL = ("
			SELECT	*
			FROM	tm_user
			WHERE	fs_kode_cabang = '".trim($xdCabang)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function CekUser2($xdMac,$xdCabang)
	{
		$xSQL = ("
			SELECT	*
			FROM	tm_mac_address
			WHERE	fs_mac_address = '".trim($xdMac)."' and fs_kode_cabang = '".trim($xdCabang)."'
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