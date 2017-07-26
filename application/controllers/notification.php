<?php

class Notification extends CI_Controller
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
			$this->load->view('vnotification');
		}
		else
		{
			redirect('login','site_url');
		}
	}


	function getdocnotif()
	{
		$this->db->query(NOLOCK);
		$this->load->model('mNotification');
		$sSQL = $this->mNotification->checkDokumen();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{	
				$xArr[] = array(
							'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
							'fs_hitung' => ascii_to_entities(trim($xRow->hitung))
						);
			}
			$hasil = array(
				'sukses'	=> true,
				'data' => $xArr
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses'	=> false
			);
			echo json_encode($hasil);
		}
	}

	function getfinalnotif()
	{
		$this->db->query(NOLOCK);
		$this->load->model('mNotification');
		$sSQL = $this->mNotification->checkFinal();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
							'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
							'fs_pjj' => ascii_to_entities(trim($pjj)),
						);
			}
			$hasil = array(
				'sukses' => true,
				'data' => $xArr
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false
			);
			echo json_encode($hasil);
		}
	}

	function griddocnotif()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->query(NOLOCK);
		$this->load->model('mNotification');
		$sSQL = $this->mNotification->checkDocAll();
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mNotification->checkDoc($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fs_hitung' => ascii_to_entities(trim($xRow->hitung . ' Dokumen'))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}


	function support()
	{
		$this->load->model('mNotification');
		$sSQL = $this->mNotification->isSupport();
		if ($sSQL->num_rows() > 0) 
		{
			$val = $sSQL->row();
			$xArr = array(
					'fs_name' => ascii_to_entities(trim($val->fs_nilai1_referensi)),
					'fn_phone' => ascii_to_entities(trim($val->fs_nilai2_referensi))
				);
			$hasil = array(
				'sukses' => true,
				'data' => $xArr
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false
			);
			echo json_encode($hasil);
		}
	}
}