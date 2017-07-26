<?php

class Masterkendaraan extends CI_Controller
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
			$this->load->view('vmasterkendaraan');
		}
		else
		{
			redirect('login','site_url');
		}
	}
	
	function listMasterKendaraan()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterKendaraan');
		$sSQL = $this->mMasterKendaraan->listMasterAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterKendaraan->listMaster($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_kendaraan'		=> ascii_to_entities(trim($xRow->fs_kode_kendaraan)),
					'fs_kode_kendaraan_lama'		=> ascii_to_entities(trim($xRow->fs_kode_kendaraan_lama)),
					'fs_model_kendaraan'	=> ascii_to_entities(trim($xRow->fs_model_kendaraan)),
					'fs_jenis_kendaraan'	=> ascii_to_entities(trim($xRow->fs_jenis_kendaraan)),
					'fs_merek_kendaraan'	=> ascii_to_entities(trim($xRow->fs_merek_kendaraan)),
					'fs_silinder_kendaraan'	=> ascii_to_entities(trim($xRow->fs_silinder_kendaraan))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	

	function CekSimpan()
	{
		$xdKodeMerek = trim($this->input->post('fs_nama_referensi'));
		$NamaReferensi = strtoupper($xdKodeMerek);
		$cekNama = substr($NamaReferensi, 0, 5);
		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		
		if (trim($cekNama) <> '')
		{
			$this->load->model('mMasterKendaraan');
			$sSQL = $this->mMasterKendaraan->CekNamaRef($cekNama);
			
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
					'hasil'		=> 'Merek sudah ada ! </br></br>'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Kode Cabang tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}

	function CekSimpanKendaraan()
	{
		$xKodeModel = strtoupper(trim($this->input->post('fs_kode_baru')));
		$xKodeModelLama = strtoupper(trim($this->input->post('fs_kode_lama')));

		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		
		if (trim($xKodeModel) <> '' and trim($xKodeModelLama) <> '')
		{
			$this->load->model('mMasterKendaraan');
			$sSQL1 = $this->mMasterKendaraan->CekKodeLama($xKodeModelLama);
			$sSQL2 = $this->mMasterKendaraan->CekKodeBaru($xKodeModel);
			$sSQL3 = $this->mMasterKendaraan->CekNamaRef2($xKodeModel,$xKodeModelLama);
		
			if($sSQL1->num_rows() == 1 and $sSQL2->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Kode Model kendaraan lama sudah ada !</br></br>'
				);
				echo json_encode($xHasil);
			}
			else if($sSQL1->num_rows() == 0 and $sSQL2->num_rows() == 1)
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Kode Model kendaraan sudah ada ! </br></br>'
				);
				echo json_encode($xHasil);
			}
			else if($sSQL1->num_rows() == 1 and $sSQL2->num_rows() == 1)
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Kode Kendaraan Dan Kode Kendaraan Lama sudah ada ! </br></br>'
				);
				echo json_encode($xHasil);
			}
			else if($sSQL1->num_rows() == 0 and $sSQL2->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'lanjut'
				);
				echo json_encode($xHasil);
			}

		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Kode Model Kendaraan tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}



	function Simpan()
	{	

		$xKodeModel = trim($this->input->post('fs_kode_kendaraan'));
		$xKodeModelLama = trim($this->input->post('fs_kode_kendaraan_lama'));
		$xModel = trim($this->input->post('fs_model_kendaraan'));
		$xJenis = trim($this->input->post('fs_jenis_kendaraan'));
		$xMerek = trim($this->input->post('fs_merek_kendaraan'));
		$xSilinder = trim($this->input->post('fs_silinder_kendaraan'));
		$xTglSimpan = trim($this->input->post('fd_tanggal_dibuat'));

		$this->db->trans_begin();
		
		$xUpdate = false;
		
		if ($xUpdate == false)
		{
			if (trim($xKodeModel) <> '' and trim($xKodeModelLama) <> '')
			{
				$xData = array(
					'fs_kode_kendaraan'	=> trim(strtoupper($xKodeModel)),
					'fs_kode_kendaraan_lama' => trim(strtoupper($xKodeModelLama)),
					'fs_model_kendaraan'	=> trim(strtoupper($xModel)),
					'fs_jenis_kendaraan'	=> trim(strtoupper($xJenis)),
					'fs_merek_kendaraan'	=> trim(strtoupper($xMerek)),
					'fs_silinder_kendaraan'	=> trim(strtoupper($xSilinder)),
					'fd_tanggal_dibuat'	=> trim($xTglSimpan),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
				);

				$this->db->insert('tm_kendaraan', $xData);
				
			}
			else
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal, Kode Kendaraan Gagal!!</br>Silakan coba lagi kemudian...'
				);
				echo json_encode($xHasil);
				return;
			}
		}
		else
		{
			$xData = array(
					'fs_model_kendaraan'	=> trim(strtoupper($xModel)),
					'fs_jenis_kendaraan'	=> trim(strtoupper($xJenis)),
					'fs_merek_kendaraan'	=> trim(strtoupper($xMerek)),
					'fs_silinder_kendaraan'	=> trim(strtoupper($xSilinder)),
					'fd_tanggal_diedit'	=> trim($xTglSimpan),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser'))
				);
			

			$xWhere = "fs_kode_kendaraan = '".trim($xKodeModel)."' and fs_kode_kendaraan_lama = '".trim($xKodeModelLama)."' ";
			
			$this->db->where($xWhere);
			$this->db->update('tm_kendaraan', $xData);
			
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
			if ($this->db->trans_status() === false)
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Update Gagal'
				);
			}
			else
			{
				$this->db->trans_commit();
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Simpan Update Sukses'
				);
			}
			echo json_encode($xHasil);
		}
	}

}
?>