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

	function previewbadanusaha($apk)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['user'] = $this->session->userdata('gUser');
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);

		// referensi
		$data['jenis_piutang'] = $this->mReport->ref_jenis_piutang($apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($apk);
		$data['pola_angsuran'] = $this->mReport->ref_pola_angsuran($apk);
		$data['agama'] = $this->mReport->ref_agama($apk);
		$data['pendidikan'] = $this->mReport->ref_pendidikan($apk);
		$data['cara_bayar'] = $this->mReport->ref_cara_bayar($apk);
		$data['status_konsumen'] = $this->mReport->ref_status_konsumen($apk);
		$data['status_rumah'] = $this->mReport->ref_status_rumah($apk);
		$data['skala_perusahaan'] = $this->mReport->ref_skala_perusahaan($apk);
		$data['kondisi_lingkungan'] = $this->mReport->ref_kondisi_lingkungan($apk);
		$data['kondisi_kantor'] = $this->mReport->ref_kondisi_kantor($apk);
		$data['jenis_asuransi'] = $this->mReport->ref_jenis_asuransi($apk);
		$data['keputusan_kredit'] = $this->mReport->ref_keputusan_kredit($apk);

		// bidang usaha
		$data['lembaga_keuangan'] = $this->mReport->lembaga_keuangan($apk);
		$data['dealer'] = $this->mReport->dealer($apk);
		$data['dati'] = $this->mReport->dati($apk);
		$data['kategori_usaha'] = $this->mReport->kategori_usaha($apk);
		$data['usaha_konsumen'] = $this->mReport->usaha_konsumen($apk);
		$data['usaha_pasangan'] = $this->mReport->usaha_pasangan($apk);
		$data['usaha_penjamin'] = $this->mReport->usaha_penjamin($apk);
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
		$data['denda_perhari'] = $this->mReport->denda_perhari();
		$data['detailltransaksi'] = $this->mReport->detailltransaksi($apk);
		$data['asuransi'] = $this->mReport->asuransi($apk);
		$data['pengurus'] = $this->mReport->pengurus($apk);
		$data['data_asuransi_notmix'] = $this->mReport->data_asuransi_notmix($apk);
		$data['data_asuransi'] = $this->mReport->data_asuransi($apk);
		$data['data_perluasan'] = $this->mReport->data_perluasan($apk);
		$data['internal_checking'] = $this->mReport->internal_checking($apk);
		$data['reject_checking'] = $this->mReport->reject_checking($apk);
		$data['family_checking'] = $this->mReport->family_checking($apk);
		$data['tanggal_cetak_spk'] = $this->mReport->tanggal_cetak_spk($apk);
		$data['tanggal_cetak_spo'] = $this->mReport->tanggal_cetak_spo($apk);

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

	function previewperorangan($apk)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['user'] = $this->session->userdata('gUser');
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);

		// referensi
		$data['jenis_piutang'] = $this->mReport->ref_jenis_piutang($apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($apk);
		$data['pola_angsuran'] = $this->mReport->ref_pola_angsuran($apk);
		$data['agama'] = $this->mReport->ref_agama($apk);
		$data['pendidikan'] = $this->mReport->ref_pendidikan($apk);
		$data['cara_bayar'] = $this->mReport->ref_cara_bayar($apk);
		$data['status_konsumen'] = $this->mReport->ref_status_konsumen($apk);
		$data['status_rumah'] = $this->mReport->ref_status_rumah($apk);
		$data['skala_perusahaan'] = $this->mReport->ref_skala_perusahaan($apk);
		$data['kondisi_lingkungan'] = $this->mReport->ref_kondisi_lingkungan($apk);
		$data['kondisi_kantor'] = $this->mReport->ref_kondisi_kantor($apk);
		$data['jenis_asuransi'] = $this->mReport->ref_jenis_asuransi($apk);
		$data['keputusan_kredit'] = $this->mReport->ref_keputusan_kredit($apk);

		// bidang usaha
		$data['lembaga_keuangan'] = $this->mReport->lembaga_keuangan($apk);
		$data['dealer'] = $this->mReport->dealer($apk);
		$data['dati'] = $this->mReport->dati($apk);
		$data['kategori_usaha'] = $this->mReport->kategori_usaha($apk);
		$data['usaha_konsumen'] = $this->mReport->usaha_konsumen($apk);
		$data['usaha_pasangan'] = $this->mReport->usaha_pasangan($apk);
		$data['usaha_penjamin'] = $this->mReport->usaha_penjamin($apk);
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
		$data['denda_perhari'] = $this->mReport->denda_perhari();
		$data['detailltransaksi'] = $this->mReport->detailltransaksi($apk);
		$data['asuransi'] = $this->mReport->asuransi($apk);
		$data['data_asuransi_notmix'] = $this->mReport->data_asuransi_notmix($apk);
		$data['data_asuransi'] = $this->mReport->data_asuransi($apk);
		$data['data_perluasan'] = $this->mReport->data_perluasan($apk);
		$data['internal_checking'] = $this->mReport->internal_checking($apk);
		$data['reject_checking'] = $this->mReport->reject_checking($apk);
		$data['family_checking'] = $this->mReport->family_checking($apk);
		$data['tanggal_cetak_spk'] = $this->mReport->tanggal_cetak_spk($apk);
		$data['tanggal_cetak_spo'] = $this->mReport->tanggal_cetak_spo($apk);

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

	function angsuran($apk,$kop)
	{
		$this->load->library('Pdfcustom');
		$this->load->model('mReport');
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
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

	function struktur($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);

		// referensi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($apk);
		$data['jenis_asuransi'] = $this->mReport->ref_jenis_asuransi($apk);
		$data['kategori_usaha'] = $this->mReport->kategori_usaha($apk);

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
			$pdf->setCellHeightRatio(1.32);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('struktur-perjanjian.pdf', 'I');	
	}

	function tambahan($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
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

	function syaratumum($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
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

	function persetujuankuasa($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
		// referensi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);

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

	function fidusia($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
		// referensi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);

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

	function jaminanfidusia($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
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


	function asuransi($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
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

	function bedadata($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
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

	function berhubunganad($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);

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

	function jualbeli($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
		$data['dealer'] = $this->mReport->dealer($apk);

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

	function masatenggang($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
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

	function unitmilikpribadi($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);

		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
		$data['pekerjaan'] = $this->mReport->ref_pekerjaan($apk);
		$data['usaha_konsumen'] = $this->mReport->usaha_konsumen($apk);
		$data['dealer'] = $this->mReport->dealer($apk);

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

	function pemesanan($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
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

	function purchase($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
		$data['dealer'] = $this->mReport->dealer($apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
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

	function pemblokiran($apk,$kop)
	{
		$this->load->library('Pdf');
		$this->load->model('mReport');
		$data['kop'] = $kop;
		$data['cabang'] = $this->mReport->cabang($apk);
		$data['detail'] = $this->mReport->detail($apk);
		$data['pjj'] = $this->mReport->pjj($apk);
		// relasi
		$data['kendaraan'] = $this->mReport->kendaraan($apk);
		$data['pola_transaksi'] = $this->mReport->ref_pola_transaksi($apk);
		
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