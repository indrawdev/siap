<?php

class Kontrak extends CI_Controller
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
			$this->load->view('vkontrak');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function gridapk()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_keputusan_kredit'));

		$this->db->query(NOLOCK);
		$this->load->model('mKontrak');
		$sSQL = $this->mKontrak->listApkAll($cari,$sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mKontrak->listApk($cari,$nStart,$nLimit,$sFlag);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function griddok()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mKontrak');
		$sSQL = $this->mKontrak->listDokAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mKontrak->listDok($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fs_kode_dokumen'		=> ascii_to_entities(trim($xRow->fs_kode_dokumen)),
						'fs_nama_dokumen'		=> ascii_to_entities(trim($xRow->fs_nama_dokumen)),
						'fs_template_dokumen'	=> ascii_to_entities(trim($xRow->fs_template_dokumen)),
						'fn_batas_cetak'	=> ascii_to_entities(trim($xRow->fn_batas_cetak))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function cekprint()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$kddok = trim($this->input->post('fs_kode_dokumen'));

		$cabang = trim($this->session->userdata('gKodeCabang'));
		if (trim($noapk) <> '' && trim($kddok) <> '')
		{
			$this->load->model('mKontrak');
			$xkddoc = $this->mKontrak->dokumen($kddok);
			$xhitung = $this->mKontrak->hitung($kddok, $cabang);
			$xtotal = $xhitung->num_rows();

			if ($xtotal <= $xkddoc->fn_batas_cetak)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'lanjut'
				);
				echo json_encode($hasil);
			}
			
			if ($xtotal > $xkddoc->fn_batas_cetak) {
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'habis'
				);
				echo json_encode($hasil);
			}
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Printing Failed'
			);
			echo json_encode($hasil);
		}
	}

	function print()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$kddok = trim($this->input->post('fs_kode_dokumen'));
		$cek = trim($this->input->post('fs_cek'));

		$insert = array(
					'fs_kode_cabang' => trim($this->session->userdata('gKodeCabang')),
					'fn_no_apk' => $noapk,
					'fs_kode_dokumen' => $kddok,
					'fs_iduser_cetak' => trim($this->session->userdata('gUser')),
					'fd_tanggal_cetak' => trim(date('Y-m-d H:i:s'))
				);
		$exec = $this->db->insert('tx_apk_cetak', $insert);
		if ($exec) {
			$this->load->model('mKontrak');
			$xdoc = $this->mKontrak->dokumen($kddok);

			$hasil = array(
				'sukses'	=> true,
				'url'		=> $xdoc->fs_template_dokumen,
				'title'		=> $xdoc->fs_nama_dokumen,
				'hasil'		=> 'Printing Success'
			);
			echo json_encode($hasil);
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Printing Failed'
			);
			echo json_encode($hasil);
		}

	}
}