<?php

class Masterreferensi extends CI_Controller
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
			$this->load->view('vmasterreferensi');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function grid()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$sCari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterReferensi');
		$sSQL = $this->mMasterReferensi->listAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterReferensi->list($sCari, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_referensi' => ascii_to_entities(trim($xRow->fs_kode_referensi)),
					'fs_nilai1_referensi' => ascii_to_entities(trim($xRow->fs_nilai1_referensi)),
					'fs_nilai2_referensi' => ascii_to_entities(trim($xRow->fs_nilai2_referensi)),
					'fs_nama_referensi' => ascii_to_entities(trim($xRow->fs_nama_referensi))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function remove()
	{
		$kd = trim($this->input->post('fs_kode_referensi'));
		$nil1 = trim($this->input->post('fs_nilai1_referensi'));

		if (!empty($kd) && !empty($nil1)) {
			$where = "fs_kode_referensi = '".trim($kd)."' AND fs_nilai1_referensi = '".trim($nil1)."'";
			$this->db->where($where);
			$this->db->delete('tm_referensi');
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Data Referensi dihapus!'
					);
			echo json_encode($hasil);
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Hapus Gagal'
					);
			echo json_encode($hasil);
		}
	}

	function ceksave()
	{
		$kd = trim(str_replace(' ', '_', $this->input->post('fs_kode_referensi')));
		$nil1 = trim($this->input->post('fs_nilai1_referensi'));
		
		if (!empty($kd) && !empty($nil1)) {
			$this->load->model('mMasterReferensi');
			$sSQL = $this->mMasterReferensi->checkReferensi($kd, $nil1);
			if ($sSQL->num_rows() == 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Data Referensi belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
			else if($sSQL->num_rows() == 1)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Data Referensi sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Gagal simpan'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Data Referensi tidak diketahui!'
					);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$kd = trim(str_replace(' ', '_', strtolower($this->input->post('fs_kode_referensi'))));
		$nil1 = trim(strtoupper($this->input->post('fs_nilai1_referensi')));
		$nil2 = trim(strtoupper($this->input->post('fs_nilai2_referensi')));
		$nma = trim(strtoupper($this->input->post('fs_nama_referensi')));

		$update = false;
		$this->load->model('mMasterReferensi');
		$sSQL = $this->mMasterReferensi->checkReferensi($kd, $nil1);
		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_referensi' => $kd,
						'fs_nilai1_referensi' => $nil1,
						'fs_nilai2_referensi' => $nil2,
						'fs_nama_referensi' => $nma
					);
			$this->db->insert('tm_referensi', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Data Referensi Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$data2 = array(
						'fs_kode_referensi' => $kd,
						'fs_nilai1_referensi' => $nil1,
						'fs_nilai2_referensi' => $nil2,
						'fs_nama_referensi' => $nma
					);
			$where = "fs_kode_referensi = '".trim($kd)."' AND fs_nilai1_referensi = '".trim($nil1)."'";
			$this->db->where($where);
			$this->db->update('tm_referensi', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data Referensi, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}
}