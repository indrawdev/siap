<?php

class Masterpaket extends CI_Controller
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
			$this->load->view('vmasterpaket');
		}
		else
		{
			redirect('login','site_url');
		}
	}
	
	function listMasterPaket()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterPaket');
		$sSQL = $this->mMasterPaket->listMasterAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterPaket->listMaster($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_kode_paket'		=> ascii_to_entities(trim($xRow->fs_kode_paket)),
					'fs_nama_paket'	=> ascii_to_entities(trim($xRow->fs_nama_paket)),
					'fs_penjelasan_paket'	=> ascii_to_entities(trim($xRow->fs_penjelasan_paket)),
					'fs_aktif'			=> ascii_to_entities(trim($xRow->fs_aktif))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	

	function CekSimpan()
	{
		//$xdKodeCab = trim($this->input->post('fs_kode_cabang'));
		$xKodePaket = trim(strtoupper($this->input->post('fs_kode_paket')));
		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		
		if (trim($xKodePaket) <> '')
		{
			$this->load->model('mMasterPaket');
			$sSQL = $this->mMasterPaket->CekKode($xKodePaket);
			
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
					'hasil'		=> 'Kode Paket sudah ada !'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Kode Paket tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}


	function Simpan()
	{	

		$xKodePaket = trim($this->input->post('fs_kode_paket'));
		$xKodeCab = trim($this->input->post('fs_kode_cabang'));
		$xNamaPaket = trim($this->input->post('fs_nama_paket'));
		$xPenjelasanPaket = trim($this->input->post('fs_penjelasan_paket'));
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
					'fs_kode_paket'	=> trim(strtoupper($xKodePaket)),
					'fs_kode_cabang'	=> trim($xKodeCab),
					'fs_nama_paket'	=> trim(strtoupper($xNamaPaket)),
					'fs_penjelasan_paket'	=> trim(strtoupper($xPenjelasanPaket)),
					'fs_aktif'	=> trim($xAktif),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
					'fd_tanggal_dibuat'			=> trim($xTglSimpan)
				);
				
				$this->db->insert('tm_paket', $xData);
				
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