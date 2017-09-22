<?php

class Fpd extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	function index()
	{
	 
	 $this->load->view('vfpd');
		
	}
	
	function GridTgl()
	{
		
		$xKdCabang = trim($this->input->post('fs_kd_cabang'));
		$xTgl = trim($this->input->post('fd_tgl'));
		$xTgl2 = trim($this->input->post('fd_tgl2'));

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;

		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;

		$this->db->query(NOLOCK);
		$this->load->model('mFpd');

		$sSQL = $this->mFpd->ambilReport($tglfix,$tglfix2,$xKdCabang);
		$xTotal = $sSQL->num_rows();

		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				
				$tes = $this->db->query("SELECT * FROM tx_arpjb WHERE kodsup='".$xRow->kodsup."' AND nomsup='".$xRow->nomsup."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."'");

				//$a="SELECT * FROM tx_arpjb WHERE kodsup='".$xRow->kodsup."' AND nomsup='".$xRow->nomsup."' AND tglang BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."'";

				$tes2 = $this->db->query("SELECT COUNT(a.tgllns) as lunas FROM tx_arpjb a LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb and a.kodelk=c.kodelk WHERE a.tglstj BETWEEN '".trim($tglfix)."'
				AND '".trim($tglfix2)."' and a.tgllns <>'' and a.kodsup='".$xRow->kodsup."' AND a.nomsup='".$xRow->nomsup."'");

				
				$queryz = $tes->result();
				$queryz2 = $tes2->row();

				
				$total=0;
				$total2=0;
				$lunas=$queryz2->lunas;



				foreach ($queryz as $xRows)
				{
				$query = $this->db->query("SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				//$s = "SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'";
				
				$a = $query->row();
				$total += $a->lancar;

				$query2 = $this->db->query("SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)");

				//$s="SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)";
				
				$a2 = $query2->row();
				$total2 += $a2->ovdue;
				}

			
				$nama_dealer='';
				
				if($xRow->fs_nama_dealer!=''){

					$nama_dealer=$xRow->fs_nama_dealer;
				}else {

					$nama_dealer='-';
				}


				$xArr[] = array(
					'kodelk' => trim($xRow->kodsup.'-'.$xRow->nomsup),
					'kodsup' => trim($xRow->kodsup),
					'nomsup' => trim($xRow->nomsup),
					'nama_dealer' => trim($nama_dealer),
					'kode_cabang' => trim($xKdCabang),
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
					'lunas' => $lunas,
					'tglfix' => $tglfix,
					'tglfix2' => $tglfix2,
					'ovdue' => $total2
				);


			}
		}
		echo json_encode($xArr);
	}


	function GridTgl2()
	{
		
		$xKdCabang = trim($this->input->post('fs_kd_cabang'));
		$xTgl = trim($this->input->post('fd_tgl'));
		$xTgl2 = trim($this->input->post('fd_tgl2'));

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;

		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;

		$this->db->query(NOLOCK);
		$this->load->model('mFpd');

		$sSQL = $this->mFpd->ambilReportSvy($tglfix,$tglfix2,$xKdCabang);
		$xTotal = $sSQL->num_rows();

		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				
				//$tampungan = $this->db->where('kodsup',$xRow->kodsup)->where('nomsup',$xRow->nomsup)->where('tglang >=',$tglfix)->where('tglang <=',$tglfix2)->get('tx_arpjb')->result();


				$tes = $this->db->query("SELECT a.kodelk,a.nomdel,a.polpen,a.jenpiu,b.nompjb  FROM tx_arapk b LEFT JOIN tx_arpjb a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk WHERE a.tglstj >= '".trim($tglfix)."'
				AND	a.tglstj <= '".trim($tglfix2)."' and b.ptgsvy='".$xRow->ptgsvy."'");

				$tes2 = $this->db->query("SELECT COUNT(a.tgllns) as lunas FROM tx_arpjb a LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb and a.kodelk=c.kodelk WHERE a.tglstj BETWEEN '".trim($tglfix)."'
				AND '".trim($tglfix2)."' and a.tgllns <>'' and c.ptgsvy='".$xRow->ptgsvy."'");

				$queryz = $tes->result();
				$queryz2 = $tes2->row();


				$total=0;
				$total2=0;
				$lunas=$queryz2->lunas;
				if($queryz){

				foreach ($queryz as $xRows)
				{

				$query = $this->db->query("SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$total += $a->lancar;

				$query2 = $this->db->query("SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)");
				$a2 = $query2->row();
				$total2 += $a2->ovdue;


				}


				}
				else {

				}
			

			
				$xArr[] = array(
					'kodelk' => trim($xRow->kodelk),
					'nama_svy' => trim($xRow->ptgsvy),
					'kode_cabang' => trim($xKdCabang),
					'tglfix' => trim($tglfix),
					'tglfix2' => trim($tglfix2),
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
					'lunas' => $lunas,
					'ovdue' => $total2
				);
			}
		}

		echo json_encode($xArr);
	}
	
	function previewfpd($kodsup,$nomsup,$tglfix,$tglfix2,$kode_cabang)
	{

		$this->load->library('Pdf');
		$this->load->model('mFpd');
		$hasil= $this->mFpd->ambilDataDealer($tglfix,$tglfix2,$kodsup,$nomsup);

		$thn1 = substr($tglfix,0,4);
		$bln1 = substr($tglfix,4,2);
		$tgl1 = substr($tglfix,6,2);
		$tgl_fix = $tgl1.'-'.$bln1.'-'.$thn1;

		$thn2 = substr($tglfix2,0,4);
		$bln2 = substr($tglfix2,4,2);
		$tgl2 = substr($tglfix2,6,2);
		$tgl_fix2 = $tgl2.'-'.$bln2.'-'.$thn2;
		$data['tglfix'] = $tgl_fix;
		$data['tglfix2'] = $tgl_fix2;
		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$nama_dealer = $this->db->where('fs_kode_dealer1',$kodsup)->where('fs_kode_dealer2',$nomsup)->from('tm_dealer')->get()->row();
		if($nama_dealer){
			$nam_dealer=$nama_dealer->fs_nama_dealer;
		}else {
			$nam_dealer='';
		}
		$data['hasil'] = $hasil;
		$data['kodsup'] = $kodsup;
		$data['nomsup'] = $nomsup;
		$data['nama_dealer'] = $nam_dealer;
		$html = $this->load->view('print/vfpdcab', $data,true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR FIRST PAYMENT DEFAULT');
		$pdf->SetPrintHeader(false);
		$pdf->SetMargins(8, 10, 35, true);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-fpd-cabang.pdf', 'I');
	}

	function downloadexcelfpd($kodsup,$nomsup,$tglfix,$tglfix2)
	{	

		$this->load->model('mFpd');
		$hasil= $this->mFpd->ambilDataDealer($tglfix,$tglfix2,$kodsup,$nomsup);
		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$nama_dealer = $this->db->where('fs_kode_dealer1',$kodsup)->where('fs_kode_dealer2',$nomsup)->from('tm_dealer')->get()->row();
		if($nama_dealer){
			$nam_dealer=$nama_dealer->fs_nama_dealer;
		}else {
			$nam_dealer='noname';
		}
		$thn1 = substr($tglfix,0,4);
		$bln1 = substr($tglfix,4,2);
		$tgl1 = substr($tglfix,6,2);
		$tgl_fix = $tgl1.'-'.$bln1.'-'.$thn1;

		$thn2 = substr($tglfix2,0,4);
		$bln2 = substr($tglfix2,4,2);
		$tgl2 = substr($tglfix2,6,2);
		$tgl_fix2 = $tgl2.'-'.$bln2.'-'.$thn2;
		$data['tglfix'] = $tgl_fix;
		$data['tglfix2'] = $tgl_fix2;

		$data['hasil'] = $hasil;
		$data['kodsup'] = $kodsup;
		$data['nomsup'] = $nomsup;
		$data['nama_dealer'] = $nam_dealer;
		$this->load->view('print/vagingdetailexcel', $data);
	}

	function downloadexcelsvy($ptgsvy,$kodelk,$tglfix,$tglfix2)
	{	

		$this->load->model('mFpd');
		$hasil= $this->mFpd->ambilDataSurveyor($tglfix,$tglfix2,$ptgsvy,$kodelk);
		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		
		$thn1 = substr($tglfix,0,4);
		$bln1 = substr($tglfix,4,2);
		$tgl1 = substr($tglfix,6,2);
		$tgl_fix = $tgl1.'-'.$bln1.'-'.$thn1;

		$thn2 = substr($tglfix2,0,4);
		$bln2 = substr($tglfix2,4,2);
		$tgl2 = substr($tglfix2,6,2);
		$tgl_fix2 = $tgl2.'-'.$bln2.'-'.$thn2;
		$data['tglfix'] = $tgl_fix;
		$data['tglfix2'] = $tgl_fix2;
		$data['hasil'] = $hasil;
		$data['ptgsvy'] = $ptgsvy;
		$this->load->view('print/vagingdetailexcel2', $data);
	}

	function previewfpd2($ptgsvy,$kodelk,$tglfix,$tglfix2,$kode_cabang)
	{

		$this->load->library('Pdf');
		$this->load->model('mFpd');
		$hasil= $this->mFpd->ambilDataSurveyor($tglfix,$tglfix2,$ptgsvy,$kodelk);
		
		$thn1 = substr($tglfix,0,4);
		$bln1 = substr($tglfix,4,2);
		$tgl1 = substr($tglfix,6,2);
		$tgl_fix = $tgl1.'-'.$bln1.'-'.$thn1;

		$thn2 = substr($tglfix2,0,4);
		$bln2 = substr($tglfix2,4,2);
		$tgl2 = substr($tglfix2,6,2);
		$tgl_fix2 = $tgl2.'-'.$bln2.'-'.$thn2;
		$data['tglfix'] = $tgl_fix;
		$data['tglfix2'] = $tgl_fix2;
		$data['ptgsvy'] = $ptgsvy;
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$data['hasil'] = $hasil;
		$html = $this->load->view('print/vfpdsvy', $data,true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR FIRST PAYMENT DEFAULT');
		$pdf->SetPrintHeader(false);
		$pdf->SetMargins(10, 10, 40, true);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-fpd-cabang.pdf', 'I');
	}


	function downloadfpdawal($xTgl,$xTgl2,$xKdCabang)
	{

		$this->load->library('Pdf');
		$this->load->model('mFpd');

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;

		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;

		$this->db->query(NOLOCK);
		$this->load->model('mFpd');

		$sSQL = $this->mFpd->ambilReports($tglfix,$tglfix2,$xKdCabang);
		$xTotal = $sSQL->num_rows();

		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				
				$tampungan = $this->db->where('kodsup',$xRow->kodsup)->where('nomsup',$xRow->nomsup)->where('tglang >=',$tglfix)->where('tglang <=',$tglfix2)->get('tx_arpjb')->result();


				$tes2 = $this->db->query("SELECT COUNT(a.tgllns) as lunas FROM tx_arpjb a LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb and a.kodelk=c.kodelk WHERE a.tglstj BETWEEN '".trim($tglfix)."'
				AND '".trim($tglfix2)."' and a.tgllns <>'' and a.kodsup='".$xRow->kodsup."' AND a.nomsup='".$xRow->nomsup."'");

				$queryz = $tes2->row();

				$lunas = $queryz->lunas;
				$total=0;
				$total2=0;
				if($tampungan){

				foreach ($tampungan as $xRows)
				{

				$query = $this->db->query("SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$total += $a->lancar;

				$query2 = $this->db->query("SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)");
				$a2 = $query2->row();
				$total2 += $a2->ovdue;
				}


				}
				else {

				}
			

				
				if($xRow->fs_nama_dealer!=''){

					$nama_dealer=$xRow->fs_nama_dealer;
				}else {

					$nama_dealer='-';
				}


				$xArr[] = array(
					'kodelk' => trim($xRow->kodsup.'-'.$xRow->nomsup),
					'kodsup' => trim($xRow->kodsup),
					'nomsup' => trim($xRow->nomsup),
					'nama_dealer' => trim($nama_dealer),
					'nama_konsumen' => trim($xRow->nampem),
					'lamovd' => trim($xRow->lamovd),
					'outgrs' => trim($xRow->outgrs),
					'outnet' => trim($xRow->outnet),
					'ovdgrs' => trim($xRow->ovdgrs),
					'ovdnet' => trim($xRow->ovdnet),
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
					'lunas' => $lunas,
					'tglfix' => $tglfix,
					'tglfix2' => $tglfix2,
					'ovdue' => $total2
				);
			}
		}


		$hasil= $xArr;
		

		$data['hasil'] = $hasil;
		$this->load->view('print/vdownloadfpd', $data);

	}

	function previewfpdawal($xTgl,$xTgl2,$xKdCabang)
	{

		$this->load->library('Pdf');
		$this->load->model('mFpd');

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;

		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;

		$this->db->query(NOLOCK);
		$this->load->model('mFpd');

		$sSQL = $this->mFpd->ambilReports($tglfix,$tglfix2,$xKdCabang);
		$xTotal = $sSQL->num_rows();

		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				
				$tampungan = $this->db->where('kodsup',$xRow->kodsup)->where('nomsup',$xRow->nomsup)->where('tglang >=',$tglfix)->where('tglang <=',$tglfix2)->get('tx_arpjb')->result();


				$tes2 = $this->db->query("SELECT COUNT(a.tgllns) as lunas FROM tx_arpjb a LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb and a.kodelk=c.kodelk WHERE a.tglstj BETWEEN '".trim($tglfix)."'
				AND '".trim($tglfix2)."' and a.tgllns <>'' and a.kodsup='".$xRow->kodsup."' AND a.nomsup='".$xRow->nomsup."'");

				$queryz = $tes2->row();

				$lunas = $queryz->lunas;
				$total=0;
				$total2=0;
				if($tampungan){

				foreach ($tampungan as $xRows)
				{

				$query = $this->db->query("SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$total += $a->lancar;

				$query2 = $this->db->query("SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)");
				$a2 = $query2->row();
				$total2 += $a2->ovdue;
				}


				}
				else {

				}
			

				
				if($xRow->fs_nama_dealer!=''){

					$nama_dealer=$xRow->fs_nama_dealer;
				}else {

					$nama_dealer='-';
				}


				$xArr[] = array(
					'kodelk' => trim($xRow->kodsup.'-'.$xRow->nomsup),
					'kodsup' => trim($xRow->kodsup),
					'nomsup' => trim($xRow->nomsup),
					'nama_dealer' => trim($nama_dealer),
					'nama_konsumen' => trim($xRow->nampem),
					'lamovd' => trim($xRow->lamovd),
					'outgrs' => trim($xRow->outgrs),
					'outnet' => trim($xRow->outnet),
					'ovdgrs' => trim($xRow->ovdgrs),
					'ovdnet' => trim($xRow->ovdnet),
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
					'lunas' => $lunas,
					'tglfix' => $tglfix,
					'tglfix2' => $tglfix2,
					'ovdue' => $total2
				);
			}
		}


		$hasil= $xArr;
		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$data['hasil'] = $hasil;
		//$data['kodsup'] = $kodsup;
		//$data['nomsup'] = $nomsup;
		//$data['nama_dealer'] = $nam_dealer;
		$html = $this->load->view('print/vfpdall', $data,true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR FIRST PAYMENT DEFAULT');
		$pdf->SetMargins(10, 10, 20, true);
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-fpd-cabang.pdf', 'I');
	}

	function previewsvyawal($xTgl,$xTgl2,$xKdCabang)
	{

		$this->load->library('Pdf');
		$this->load->model('mFpd');

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;

		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;

		$this->db->query(NOLOCK);
		$this->load->model('mFpd');

		$sSQL = $this->mFpd->ambilReportSvy2($tglfix,$tglfix2,$xKdCabang);
		$xTotal = $sSQL->num_rows();

		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				
				//$tampungan = $this->db->where('kodsup',$xRow->kodsup)->where('nomsup',$xRow->nomsup)->where('tglang >=',$tglfix)->where('tglang <=',$tglfix2)->get('tx_arpjb')->result();


				$tes = $this->db->query("SELECT a.kodelk,a.nomdel,a.polpen,a.jenpiu,b.nompjb  FROM tx_arapk b LEFT JOIN tx_arpjb a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk WHERE a.tglstj >= '".trim($tglfix)."'
				AND	a.tglstj <= '".trim($tglfix2)."' and b.ptgsvy='".$xRow->ptgsvy."'");

				$tes2 = $this->db->query("SELECT COUNT(a.tgllns) as lunas FROM tx_arpjb a LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb and a.kodelk=c.kodelk WHERE a.tglstj BETWEEN '".trim($tglfix)."'
				AND '".trim($tglfix2)."' and a.tgllns <>'' and c.ptgsvy='".$xRow->ptgsvy."'");

				$queryz = $tes->result();
				$queryz2 = $tes2->row();


				$total=0;
				$total2=0;
				$lunas=$queryz2->lunas;
				if($queryz){

				foreach ($queryz as $xRows)
				{

				$query = $this->db->query("SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$total += $a->lancar;

				$query2 = $this->db->query("SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)");
				$a2 = $query2->row();
				$total2 += $a2->ovdue;


				}


				}
				else {

				}
			

			
				$xArr[] = array(
					'kodelk' => trim($xRow->kodelk),
					'nama_svy' => trim($xRow->ptgsvy),
					'tglfix' => trim($tglfix),
					'tglfix2' => trim($tglfix2),
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
					'lunas' => $lunas,
					'ovdue' => $total2
				);
			}
		}

		$thn1 = substr($tglfix,0,4);
		$bln1 = substr($tglfix,4,2);
		$tgl1 = substr($tglfix,6,2);
		$tgl_fix = $tgl1.'-'.$bln1.'-'.$thn1;

		$thn2 = substr($tglfix2,0,4);
		$bln2 = substr($tglfix2,4,2);
		$tgl2 = substr($tglfix2,6,2);
		$tgl_fix2 = $tgl2.'-'.$bln2.'-'.$thn2;
		$data['tglfix'] = $tgl_fix;
		$data['tglfix2'] = $tgl_fix2;

		$hasil= $xArr;
		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$data['hasil'] = $hasil;
		//$data['kodsup'] = $kodsup;
		//$data['nomsup'] = $nomsup;
		//$data['nama_dealer'] = $nam_dealer;
		$html = $this->load->view('print/vsvyall', $data,true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR FIRST PAYMENT DEFAULT');
		$pdf->SetMargins(10, 10, 20, true);
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-fpd-cabang.pdf', 'I');
	}

	function downloadfpdawalsvy($xTgl,$xTgl2,$xKdCabang)
	{

		$this->load->library('Pdf');
		$this->load->model('mFpd');

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;

		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;

		$this->db->query(NOLOCK);
		$this->load->model('mFpd');

		$sSQL = $this->mFpd->ambilReportSvy2($tglfix,$tglfix2,$xKdCabang);
		$xTotal = $sSQL->num_rows();

		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				
				//$tampungan = $this->db->where('kodsup',$xRow->kodsup)->where('nomsup',$xRow->nomsup)->where('tglang >=',$tglfix)->where('tglang <=',$tglfix2)->get('tx_arpjb')->result();


				$tes = $this->db->query("SELECT a.kodelk,a.nomdel,a.polpen,a.jenpiu,b.nompjb  FROM tx_arapk b LEFT JOIN tx_arpjb a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk WHERE a.tglstj >= '".trim($tglfix)."'
				AND	a.tglstj <= '".trim($tglfix2)."' and b.ptgsvy='".$xRow->ptgsvy."'");

				$tes2 = $this->db->query("SELECT COUNT(a.tgllns) as lunas FROM tx_arpjb a LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb and a.kodelk=c.kodelk WHERE a.tglstj BETWEEN '".trim($tglfix)."'
				AND '".trim($tglfix2)."' and a.tgllns <>'' and c.ptgsvy='".$xRow->ptgsvy."'");

				$queryz = $tes->result();
				$queryz2 = $tes2->row();


				$total=0;
				$total2=0;
				$lunas=$queryz2->lunas;
				if($queryz){

				foreach ($queryz as $xRows)
				{

				$query = $this->db->query("SELECT COUNT(*) as lancar FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$total += $a->lancar;

				$query2 = $this->db->query("SELECT COUNT(*) as ovdue FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."' and (ovdnet > 0 or lamovd > 0)");
				$a2 = $query2->row();
				$total2 += $a2->ovdue;


				}


				}
				else {

				}
			

			
				$xArr[] = array(
					'kodelk' => trim($xRow->kodelk),
					'nama_svy' => trim($xRow->ptgsvy),
					'tglfix' => trim($tglfix),
					'tglfix2' => trim($tglfix2),
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
					'lunas' => $lunas,
					'ovdue' => $total2
				);
			}
		}

		$thn1 = substr($tglfix,0,4);
		$bln1 = substr($tglfix,4,2);
		$tgl1 = substr($tglfix,6,2);
		$tgl_fix = $tgl1.'-'.$bln1.'-'.$thn1;

		$thn2 = substr($tglfix2,0,4);
		$bln2 = substr($tglfix2,4,2);
		$tgl2 = substr($tglfix2,6,2);
		$tgl_fix2 = $tgl2.'-'.$bln2.'-'.$thn2;
		$data['tglfix'] = $tgl_fix;
		$data['tglfix2'] = $tgl_fix2;
		$hasil= $xArr;
		$data['hasil'] = $hasil;
		$this->load->view('print/vdownloadfpdsvy', $data);
	}
	
}
?>