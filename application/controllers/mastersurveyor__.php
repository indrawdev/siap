<?php

class Mastersurveyor extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vmastersurveyor');
		}
		else
		{
			redirect('login','site_url');
		}
	}
	
	function listMasterSurveyor()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterSurveyor');
		$sSQL = $this->mMasterSurveyor->listMasterAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterSurveyor->listMaster($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_kode_surveyor'		=> ascii_to_entities(trim($xRow->fs_kode_surveyor)),
					'fs_kode_surveyor_lama'	=> ascii_to_entities(trim($xRow->fs_kode_surveyor_lama)),
					'fs_nama_surveyor'	=> ascii_to_entities(trim($xRow->fs_nama_surveyor)),
					'fs_alamat_surveyor'	=> ascii_to_entities(trim($xRow->fs_alamat_surveyor)),
					'fs_ktp_surveyor'	=> ascii_to_entities(trim($xRow->fs_ktp_surveyor)),
					'fs_aktif'			=> ascii_to_entities(trim($xRow->fs_aktif))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	

	function CekSimpan()
	{
		//$xdKodeCab = trim($this->input->post('fs_kode_cabang'));
		$xdKodeSurveyorLama = trim($this->input->post('fs_kode_surveyor_lama'));
		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		
		if (trim($xdKodeSurveyorLama) <> '')
		{
			$this->load->model('mMasterSurveyor');
			$sSQL = $this->mMasterSurveyor->CekInisial($xdKodeSurveyorLama);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'lanjut'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Kode Surveyyor sudah ada !'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Kode Surveyor tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}


	function Simpan()
	{	

		$xKodeSurveyor = trim($this->input->post('fs_kode_surveyor'));
		$xKodeCab = trim($this->input->post('fs_kode_cabang'));
		$xKodeSurveyorLama = trim($this->input->post('fs_kode_surveyor_lama'));
		$xAlamatSurveyor = trim($this->input->post('fs_alamat_surveyor'));
		$xNamaSurveyor = trim($this->input->post('fs_nama_surveyor'));
		$xKtpSurveyor = trim($this->input->post('fs_ktp_surveyor'));
		$xAktif = trim($this->input->post('fs_aktif'));
		$xTglSimpan = trim(strtolower($this->input->post('fd_tanggal_dibuat')));
		
		if (trim($xAktif) == 'true')
		{
			$xAktif = 1;
		}
		else
		{
			$xAktif = 0;
		}
		
		$this->db->trans_begin();
		
		$xUpdate = false;
		
		
		if ($xUpdate == false)
		{
			if (trim($xKodeCab) <> '')
			{
				$xData = array(
					'fs_kode_surveyor'	=> trim(strtoupper($xKodeSurveyor)),
					'fs_kode_cabang'	=> trim($xKodeCab),
					'fs_kode_surveyor_lama'	=> trim(strtoupper($xKodeSurveyorLama)),
					'fs_alamat_surveyor'	=> trim(strtoupper($xAlamatSurveyor)),
					'fs_nama_surveyor'	=> trim(strtoupper($xNamaSurveyor)),
					'fs_ktp_surveyor'	=> trim($xKtpSurveyor),
					'fs_aktif'	=> trim($xAktif),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
					'fd_tanggal_dibuat'			=> trim($xTglSimpan)
				);
				
				$this->db->insert('tm_surveyor', $xData);
				
			}
			else
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal, Kode Cabang Gagal!!</br>Silakan coba lagi kemudian...'
				);
				echo json_encode($xHasil);
				return;
			}
		}
		else
		{
			
		}
		
		
		if ($xUpdate == false)
		{
			if ($this->db->trans_status() === false)
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal'
				);
			}
			else
			{
				$this->db->trans_commit();
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Simpan Sukses'
				);
			}
			echo json_encode($xHasil);
		}
		else
		{
			
		}
	}

}
?>