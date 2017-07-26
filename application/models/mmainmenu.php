<?php

class MMainMenu extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}

	function dataPendukungAll($sCari,$jenis_pembiayaan)
	{
		$xSQL = ("
			SELECT	*
			FROM tm_data_pendukung");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
			AND (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function dataPendukung($sCari,$jenis_pembiayaan,$nStart,$nLimit)
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
	
	
	function CekKodeAkses()
	{
		$nik = $this->session->userdata('gNik');
		$kode_cabang = $this->session->userdata('gKodeCabang');
		
		$xSQL = ("
			SELECT fs_nik
			FROM	tm_user
			WHERE	fs_nik = '".trim($kode_cabang)."' and fs_kode_cabang = '".trim($kode_cabang)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function load_menu()
	{
		$xSQL = ("
			SELECT	fs_kd_child, fs_kd_parent, fs_nm_menu,
					fs_nm_form,fs_nm_formweb
			FROM	tg_menu
			ORDER BY fs_kd_child, fs_kd_parent
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function LoadMenu2($xKdUser)
	{

		$xSQL = ("
			SELECT	DISTINCT a.fs_kd_child, b.fs_kd_parent, b.fs_nm_menu,
					b.fs_nm_formweb
			FROM	tm_parlevel a
			INNER JOIN tg_menu b ON a.fs_kd_child = b.fs_kd_child and a.fs_kd_parent = b.fs_kd_parent WHERE a.fs_level in(".$xKdUser.")
		");
		
		echo $xSQL;die;
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function LoadMenu3()
	{

		$xSQL = ("
			SELECT * FROM tg_menu
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function cekJabatan($xdNik)
	{
		$xSQL = ("
			SELECT	fs_nik , fs_kode_jabatan
			FROM	tm_struktur_jabatan
		");
		
		if (trim($xdNik) <> '')
		{
			$xSQL = $xSQL.("
				WHERE fs_nik = '".trim($xdNik)."'");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}

?>