<?php

class Reportkehadiran extends CI_Controller
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
				$this->load->view('vreportkehadiranpusat');
			}
			else 
			{
				$this->load->view('vreportkehadirancabang');
			}
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function gridcabang()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mReportKehadiran');
		$sSQL = $this->mReportKehadiran->listCabangAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mReportKehadiran->listCabang($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_nama_cabang' => ascii_to_entities(trim($xRow->fs_nama_cabang)),
					'fs_alamat_cabang'	=> ascii_to_entities(trim($xRow->fs_alamat_cabang)),
					'fs_kota_cabang' => ascii_to_entities(trim($xRow->fs_kota_cabang))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridemploye()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mReportKehadiran');
		$sSQL = $this->mReportKehadiran->listEmployeAll($kdcabang, $mmyy, $cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mReportKehadiran->listEmploye($kdcabang, $mmyy, $cari, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_nama' => ascii_to_entities(trim($xRow->fs_nama)),
					'fd_tanggal' => ascii_to_entities(trim($xRow->fd_tanggal)),
					'fs_bulan_tahun' => ascii_to_entities(trim($xRow->fs_bulan . ', ' . $xRow->fn_tahun)),
					'fn_1' => ascii_to_entities(trim($xRow->fn_1)),
					'fn_2' => ascii_to_entities(trim($xRow->fn_2)),
					'fn_3' => ascii_to_entities(trim($xRow->fn_3)),
					'fn_4' => ascii_to_entities(trim($xRow->fn_4)),
					'fn_5' => ascii_to_entities(trim($xRow->fn_5)),
					'fn_6' => ascii_to_entities(trim($xRow->fn_6)),
					'fn_7' => ascii_to_entities(trim($xRow->fn_7)),
					'fn_8' => ascii_to_entities(trim($xRow->fn_8)),
					'fn_9' => ascii_to_entities(trim($xRow->fn_9)),
					'fn_10' => ascii_to_entities(trim($xRow->fn_10)),
					'fn_11' => ascii_to_entities(trim($xRow->fn_11)),
					'fn_12' => ascii_to_entities(trim($xRow->fn_12)),
					'fn_13' => ascii_to_entities(trim($xRow->fn_13)),
					'fn_14' => ascii_to_entities(trim($xRow->fn_14)),
					'fn_15' => ascii_to_entities(trim($xRow->fn_15)),
					'fn_16' => ascii_to_entities(trim($xRow->fn_16)),
					'fn_17' => ascii_to_entities(trim($xRow->fn_17)),
					'fn_18' => ascii_to_entities(trim($xRow->fn_18)),
					'fn_19' => ascii_to_entities(trim($xRow->fn_19)),
					'fn_20' => ascii_to_entities(trim($xRow->fn_20)),
					'fn_21' => ascii_to_entities(trim($xRow->fn_21)),
					'fn_22' => ascii_to_entities(trim($xRow->fn_22)),
					'fn_23' => ascii_to_entities(trim($xRow->fn_23)),
					'fn_24' => ascii_to_entities(trim($xRow->fn_24)),
					'fn_25' => ascii_to_entities(trim($xRow->fn_25)),
					'fn_26' => ascii_to_entities(trim($xRow->fn_26)),
					'fn_27' => ascii_to_entities(trim($xRow->fn_27)),
					'fn_28' => ascii_to_entities(trim($xRow->fn_28)),
					'fn_29' => ascii_to_entities(trim($xRow->fn_29)),
					'fn_30' => ascii_to_entities(trim($xRow->fn_30)),
					'fn_31' => ascii_to_entities(trim($xRow->fn_31)),
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridreport()
	{
		$this->load->helper('day');

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		$nama = trim($this->input->post('fs_nama'));

		$this->db->query(NOLOCK);
		$this->load->model('mReportKehadiran');
		$sSQL = $this->mReportKehadiran->listReportAll($mmyy, $nama);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mReportKehadiran->listReport($mmyy, $nama, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fd_tanggal' => ascii_to_entities(trim(date_format(date_create($xRow->fd_tanggal),"d/m/Y"))),
						'fs_hari' => ascii_to_entities(trim(hari_indo($xRow->fd_tanggal))),
						'fd_masuk' => ascii_to_entities(trim(date('H:i', strtotime($xRow->fd_masuk)))),
						'fd_keluar' => ascii_to_entities(trim(date('H:i', strtotime($xRow->fd_keluar)))),
						'fn_jam' => ascii_to_entities(trim($xRow->fn_jam))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function monthdetail()
	{
		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		$nama = trim($this->input->post('fs_nama'));

		$this->load->model('mReportKehadiran');
		$sSQL = $this->mReportKehadiran->detailMonthly($mmyy, $nama);
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim(date_format(date_create($xRow->fd_tanggal),"d"))),
					'value' => ascii_to_entities(trim($xRow->fn_jam))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function checkprintpusat()
	{
		$kdcabang = trim($this->input->post('fs_kode_cabang'));
		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		
		$insert = array(
					'fs_kode_cabang' => $kdcabang,
					'fd_tanggal' => $mmyy,
					'fs_iduser_cetak' => trim($this->session->userdata('gUser')),
					'fd_tanggal_cetak' => trim(date('Y-m-d H:i:s'))
				);
		$exec = $this->db->insert('tx_absensi_cetak', $insert);
		if ($exec) {
			$hasil = array(
				'sukses'	=> true,
				'url'		=> 'reportkehadiran/preview/',
				'kdcabang' 	=> $kdcabang,
				'periode' 	=> $mmyy,
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

	function checkprintcabang()
	{
		$kdcabang = trim($this->session->userdata('gKodeCabang'));
		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		
		$insert = array(
					'fs_kode_cabang' => $kdcabang,
					'fd_tanggal' => $mmyy,
					'fs_iduser_cetak' => trim($this->session->userdata('gUser')),
					'fd_tanggal_cetak' => trim(date('Y-m-d H:i:s'))
				);
		$exec = $this->db->insert('tx_absensi_cetak', $insert);
		if ($exec) {
			$hasil = array(
				'sukses'	=> true,
				'url'		=> 'reportkehadiran/preview/',
				'kdcabang' 	=> $kdcabang,
				'periode' 	=> $mmyy,
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

	function preview($sKdCab, $sMY)
	{
		$this->load->library('Pdf');
		$this->load->model('mReportKehadiran');
		$data['report'] = $this->mReportKehadiran->previewDaily($sKdCab, $sMY);
		$html = $this->load->view('print/vlaporanharian', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PREVIEW LAPORAN HARIAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('laporan-harian.pdf', 'I');
	}
}