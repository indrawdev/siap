<?php
date_default_timezone_set('Asia/Jakarta');

class Report extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('day');
	}

	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vreport');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function cekprint()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));

		if (trim($noapk) <> '')
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Printing Success',
			);
			echo json_encode($hasil);
		}
		else if (trim($nobatch) <> '')
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Printing Success',
			);
			echo json_encode($hasil);
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Printing Failed',
			);
			echo json_encode($hasil);
		}

	}

	function previewbadanusaha($kdcab, $apk)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['user'] = $this->session->userdata('gUser');
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);

		// referensi
		$data['jenis_piutang'] = $this->mReport->ref_jenis_piutang($kdcab, $apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($kdcab, $apk);
		$data['pola_angsuran'] = $this->mReport->ref_pola_angsuran($kdcab, $apk);
		$data['agama'] = $this->mReport->ref_agama($kdcab, $apk);
		$data['pendidikan'] = $this->mReport->ref_pendidikan($kdcab, $apk);
		$data['cara_bayar'] = $this->mReport->ref_cara_bayar($kdcab, $apk);
		$data['status_konsumen'] = $this->mReport->ref_status_konsumen($kdcab, $apk);
		$data['status_rumah'] = $this->mReport->ref_status_rumah($kdcab, $apk);
		$data['skala_perusahaan'] = $this->mReport->ref_skala_perusahaan($kdcab, $apk);
		$data['kondisi_lingkungan'] = $this->mReport->ref_kondisi_lingkungan($kdcab, $apk);
		$data['kondisi_kantor'] = $this->mReport->ref_kondisi_kantor($kdcab, $apk);
		$data['jenis_asuransi'] = $this->mReport->ref_jenis_asuransi($kdcab, $apk);
		$data['keputusan_kredit'] = $this->mReport->ref_keputusan_kredit($kdcab, $apk);

		// bidang usaha
		$data['lembaga_keuangan'] = $this->mReport->lembaga_keuangan($kdcab, $apk);
		$data['dealer'] = $this->mReport->dealer($kdcab, $apk);
		$data['dati'] = $this->mReport->dati($kdcab, $apk);
		$data['kategori_usaha'] = $this->mReport->kategori_usaha($kdcab, $apk);
		$data['usaha_konsumen'] = $this->mReport->usaha_konsumen($kdcab, $apk);
		$data['usaha_pasangan'] = $this->mReport->usaha_pasangan($kdcab, $apk);
		$data['usaha_penjamin'] = $this->mReport->usaha_penjamin($kdcab, $apk);
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$data['denda_perhari'] = $this->mReport->denda_perhari();
		$data['detailltransaksi'] = $this->mReport->detailltransaksi($kdcab, $apk);
		$data['asuransi'] = $this->mReport->asuransi($kdcab, $apk);
		$data['pengurus'] = $this->mReport->pengurus($kdcab, $apk);
		$data['data_asuransi'] = $this->mReport->data_asuransi($kdcab, $apk);
		$data['data_asuransi_notmix'] = $this->mReport->data_asuransi_notmix($kdcab, $apk);
		$data['data_perluasan'] = $this->mReport->data_perluasan($kdcab, $apk);
		$data['internal_checking'] = $this->mReport->internal_checking($kdcab, $apk);
		$data['reject_checking'] = $this->mReport->reject_checking($kdcab, $apk);
		$data['family_checking'] = $this->mReport->family_checking($kdcab, $apk);
		$data['tanggal_cetak_spk'] = $this->mReport->tanggal_cetak_spk($kdcab, $apk);
		$data['tanggal_cetak_spo'] = $this->mReport->tanggal_cetak_spo($kdcab, $apk);

		$html = $this->load->view('print/vbadanusaha', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR PEMERIKSAAN APK');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-pemeriksaan-badan-usaha.pdf', 'I');
	}

	function previewperorangan($kdcab, $apk)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['user'] = $this->session->userdata('gUser');
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);

		// referensi
		$data['jenis_piutang'] = $this->mReport->ref_jenis_piutang($kdcab, $apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($kdcab, $apk);
		$data['pola_angsuran'] = $this->mReport->ref_pola_angsuran($kdcab, $apk);
		$data['agama'] = $this->mReport->ref_agama($kdcab, $apk);
		$data['pendidikan'] = $this->mReport->ref_pendidikan($kdcab, $apk);
		$data['cara_bayar'] = $this->mReport->ref_cara_bayar($kdcab, $apk);
		$data['status_konsumen'] = $this->mReport->ref_status_konsumen($kdcab, $apk);
		$data['status_rumah'] = $this->mReport->ref_status_rumah($kdcab, $apk);
		$data['skala_perusahaan'] = $this->mReport->ref_skala_perusahaan($kdcab, $apk);
		$data['kondisi_lingkungan'] = $this->mReport->ref_kondisi_lingkungan($kdcab, $apk);
		$data['kondisi_kantor'] = $this->mReport->ref_kondisi_kantor($kdcab, $apk);
		$data['jenis_asuransi'] = $this->mReport->ref_jenis_asuransi($kdcab, $apk);
		$data['keputusan_kredit'] = $this->mReport->ref_keputusan_kredit($kdcab, $apk);

		// bidang usaha
		$data['lembaga_keuangan'] = $this->mReport->lembaga_keuangan($kdcab, $apk);
		$data['dealer'] = $this->mReport->dealer($kdcab, $apk);
		$data['dati'] = $this->mReport->dati($kdcab, $apk);
		$data['kategori_usaha'] = $this->mReport->kategori_usaha($kdcab, $apk);
		$data['usaha_konsumen'] = $this->mReport->usaha_konsumen($kdcab, $apk);
		$data['usaha_pasangan'] = $this->mReport->usaha_pasangan($kdcab, $apk);
		$data['usaha_penjamin'] = $this->mReport->usaha_penjamin($kdcab, $apk);
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$data['denda_perhari'] = $this->mReport->denda_perhari();
		$data['detailltransaksi'] = $this->mReport->detailltransaksi($kdcab, $apk);
		$data['asuransi'] = $this->mReport->asuransi($kdcab, $apk);
		$data['data_asuransi'] = $this->mReport->data_asuransi($kdcab, $apk);
		$data['data_asuransi_notmix'] = $this->mReport->data_asuransi_notmix($kdcab, $apk);
		$data['data_perluasan'] = $this->mReport->data_perluasan($kdcab, $apk);
		$data['internal_checking'] = $this->mReport->internal_checking($kdcab, $apk);
		$data['reject_checking'] = $this->mReport->reject_checking($kdcab, $apk);
		$data['family_checking'] = $this->mReport->family_checking($kdcab, $apk);
		$data['tanggal_cetak_spk'] = $this->mReport->tanggal_cetak_spk($kdcab, $apk);
		$data['tanggal_cetak_spo'] = $this->mReport->tanggal_cetak_spo($kdcab, $apk);

		$html = $this->load->view('print/vperorangan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR PEMERIKSAAN APK');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-pemeriksaan-perorangan.pdf', 'I');
	}

	function angsuran($kdcab, $apk, $kop)
	{
		$this->load->library('Pdfcustom');
		$this->load->model('mReport');
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$html = $this->load->view('print/vangsuran', $data, true);
		$pdf = new Pdfcustom('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERJANJIAN PEMBELIAN DENGAN PEMBAYARAN SECARA ANGSURAN');
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.88, '', false);
		$pdf->setCellHeightRatio(1.14);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('perjanjian-pembelian-dengan-pembayaran-secara-angsuran.pdf', 'I');	
	}

	function struktur($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);

		// referensi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$data['dealer'] = $this->mReport->dealer($kdcab, $apk);
		$data['asuransi'] = $this->mReport->asuransi($kdcab, $apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($kdcab, $apk);
		$data['jenis_asuransi'] = $this->mReport->ref_jenis_asuransi($kdcab, $apk);
		$data['kategori_usaha'] = $this->mReport->kategori_usaha($kdcab, $apk);
		$data['denda_perhari'] = $this->mReport->denda_perhari($kdcab, $apk);
		$data['pinalti_lunas'] = $this->mReport->pinalti_lunas($kdcab, $apk);
		$data['asuransi_mix'] = $this->mReport->data_asuransi_mix($kdcab, $apk);
		$data['asuransi_notmix'] = $this->mReport->data_asuransi_notmix($kdcab, $apk);
		
		// biaya
		$data['biaya_survey'] = $this->mReport->biaya_survey($kdcab, $apk);
		$data['biaya_asuransi'] = $this->mReport->biaya_asuransi($kdcab, $apk);
		$data['biaya_provisi'] = $this->mReport->biaya_provisi($kdcab, $apk);
		$data['biaya_notaris'] = $this->mReport->biaya_notaris($kdcab, $apk);

		$html = $this->load->view('print/vstruktur', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('STRUKTUR PERJANJIAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 8.5, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.24);
		} else {
			$pdf->setCellHeightRatio(1.28);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('struktur-perjanjian.pdf', 'I');	
	}

	function tambahan($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$html = $this->load->view('print/vtambahan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERJANJIAN TAMBAHAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.31);
		} else {
			$pdf->setCellHeightRatio(1.38);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('perjanjian-tambahan.pdf', 'I');	
	}

	function syaratumum($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$html = $this->load->view('print/vsyaratumum', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SYARAT-SYARAT UMUM');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.25);
		} else {
			$pdf->setCellHeightRatio(1.30);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('syarat-syarat-umum.pdf', 'I');	
	}

	function persetujuankuasa($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		// referensi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vpersetujuankuasa', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERNYATAAN PERSETUJUAN DAN KUASA');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.42);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('pernyataan-persetujuan-dan-kuasa.pdf', 'I');	
	}

	function fidusia($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		// referensi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vfidusia', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERJANJIAN PENYERAHAN HAK MILIK SECARA FIDUSIA');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.35);
		} else {
			$pdf->setCellHeightRatio(1.40);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('perjanjian-penyerahan-hak-milih-secara-fidusia.pdf', 'I');	
	}

	function jaminanfidusia($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$html = $this->load->view('print/vjaminanfidusia', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT KUASA PEMBEBANAN JAMINAN FIDUSIA');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.45);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-kuasa-pembebanan-jaminan-fidusia.pdf', 'I');
	}


	function asuransi($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$html = $this->load->view('print/vasuransi', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN ASURANSI');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.45);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-asuransi.pdf', 'I');
	}

	function bedadata($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$html = $this->load->view('print/vbedadata', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN BERHUBUNGAN DENGAN AD');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.25);
		} else {
			$pdf->setCellHeightRatio(1.32);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-beda-data-identitas-perorangan.pdf', 'I');
	}

	function berhubunganad($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vberhubunganad', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN BERHUBUNGAN DENGAN AD');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.32);
		} else {
			$pdf->setCellHeightRatio(1.40);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-berhubungan-dengan-ad.pdf', 'I');
	}

	function jualbeli($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$data['dealer'] = $this->mReport->dealer($kdcab, $apk);

		$html = $this->load->view('print/vjualbeli', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN JUAL BELI');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-jual-beli.pdf', 'I');
	}

	function masatenggang($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$html = $this->load->view('print/vmasatenggang', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN MASA TENGGANG');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.42);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-masa-tenggang.pdf', 'I');
	}

	function unitmilikpribadi($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$data['pekerjaan'] = $this->mReport->ref_pekerjaan($kdcab, $apk);
		$data['usaha_konsumen'] = $this->mReport->usaha_konsumen($kdcab, $apk);
		$data['dealer'] = $this->mReport->dealer($kdcab, $apk);

		$html = $this->load->view('print/vunitmilikpribadi', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN UNIT MILIK PRIBADI');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-unit-milik-pribadi.pdf', 'I');
	}

	function pemesanan($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$html = $this->load->view('print/vpemesanan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PEMESANAN KENDARAAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pemesanan-kendaraan.pdf', 'I');
	}

	function purchase($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		$data['dealer'] = $this->mReport->dealer($kdcab, $apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$html = $this->load->view('print/vpurchase', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PURCHASE ORDER');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('purchase-order.pdf', 'I');
	}

	function pemblokiran($kdcab, $apk, $kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($kdcab, $apk);
		$data['detail'] = $this->mReport->detail($kdcab, $apk);
		$data['pjj'] = $this->mReport->pjj($kdcab, $apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($kdcab, $apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($kdcab, $apk);
		
		$html = $this->load->view('print/vpemblokiran', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PURCHASE ORDER');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pemblokiran-bpkb.pdf', 'I');
	}
}