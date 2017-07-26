<?php

class StatusApk extends CI_Controller
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
			if (trim($this->session->userdata('gKodeCabang')) == '00')
			{
				$this->load->view('vstatusapkpusat');
			}
			else 
			{
				$this->load->view('vstatusapkcabang');
			}
		}
		else
		{
			redirect('login','site_url');
		}
	}

	/* CABANG */
	function gridstatus()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		$cari = trim($this->input->post('fs_cari'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mStatusApk');
		$sSQL = $this->mStatusApk->listStatusAll($mmyy, $cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mStatusApk->listStatus($mmyy, $cari, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_keputusan_kredit' => ascii_to_entities(trim($xRow->keputusan_kredit)),
						'fs_catatan_analisa' => ascii_to_entities(trim($xRow->fs_catatan_analisa))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	/* PUSAT */
	function gridstatuspusat()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		$cari = trim($this->input->post('fs_cari'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mStatusApk');
		$sSQL = $this->mStatusApk->listStatusPusatAll($mmyy, $cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mStatusApk->listStatusPusat($mmyy, $cari, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_keputusan_kredit_pusat' => ascii_to_entities(trim($xRow->keputusan_kredit))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
}