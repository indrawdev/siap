<?php

class Aging extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	function index()
	{
	 
	 $this->load->view('vaging');
		
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
				
				$tes = $this->db->query("SELECT * FROM tx_arpjb WHERE kodsup='".$xRow->kodsup."' AND nomsup='".$xRow->nomsup."' AND tglang BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."'");

				//$a="SELECT * FROM tx_arpjb WHERE kodsup='".$xRow->kodsup."' AND nomsup='".$xRow->nomsup."' AND tglang BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."'";
				$queryz = $tes->result();

				
				$total=0;
				$total2=0;



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
					'penjualan' => $xRow->penjualan,
					'lancar' => $total,
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

		$arr = array("CURRENT","1-7 Hari","8-15 Hari","16-30 Hari","31-60 Hari","61-90 Hari","91-120 Hari","> 120 Hari","Total");
		$xArr = array();

		foreach ($arr as $value) {


				

				if($xKdCabang <> ''){
					$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb FROM tx_arpjb WHERE kodekr='".$xKdCabang."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

					$tes2 = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a WHERE kodekr='".$xKdCabang."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

					if($value=='CURRENT'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd=0 and ovdnet=0");

					}

					if($value=='1-7 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>1 and lamovd<=7");

					}

					if($value=='8-15 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>7 and lamovd<=15");

					}


					if($value=='16-30 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>15 and lamovd<=30");

					}

					if($value=='31-60 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>30 and lamovd<=60");

					}

					if($value=='61-90 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>60 and lamovd<=90");

					}


					if($value=='91-120 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>90 and lamovd<=120");

					}

					if($value=='> 120 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>120");

					}

					if($value=='Total'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns=''");

					}

				}else {
						$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

						$tes2 = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");


						if($value=='CURRENT'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd=0 and ovdnet=0");

						}


						if($value=='1-7 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>0 and lamovd<=7");
 
						}

						if($value=='8-15 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>7 and lamovd<=15");

						}

						if($value=='16-30 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>15 and lamovd<=30");

						}

						if($value=='31-60 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>30 and lamovd<=60");

						}

						if($value=='61-90 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>60 and lamovd<=90");

						}

						if($value=='91-120 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>90 and lamovd<=120");

						}

						if($value=='> 120 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>120");

						}


						if($value=='Total'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns=''");

						}
				}
				

				$queryz = $tes->result();
				$queryz2 = $tes->row();
				$queryz3 = $tes2->row();
				$units = $unit->row();

				$totalpokok=0;
				$totalpiu=0;
				$tglupd='';
				foreach ($queryz as $xRows)
				{

				if($value=='CURRENT'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='1-7 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd > 0 and lamovd <=7 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='8-15 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >7 and lamovd <=15 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='16-30 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >15 and lamovd <=30 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='31-60 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >30 and lamovd <=60 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='61-90 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >60 and lamovd <=90 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='91-120 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >90 and lamovd <=120 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='> 120 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >120 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='Total'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}





				}


				$xArr[] = array(
					'tglfix' => trim($tglfix),
					'tglfix2' => trim($tglfix2),
					'unit' => trim($units->unit),
					'kode_cabang' => trim($xKdCabang),
					'kategori' => $value,
					'ospiu' => number_format($totalpiu,0,',','.'),
					'ospokok' => number_format($totalpokok,0,',','.'),
				);


		}

		echo json_encode($xArr);
	}
	
	function previewaging($kategori,$tglfix,$tglfix2,$kode_cabang)
	{	


		$this->load->library('Pdf');

		$nama_cabang='';


		if($kode_cabang <> ''){

			$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb,nampem FROM tx_arpjb WHERE kodekr='".trim($kode_cabang)."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

			$queryzz = $this->db->where('fs_kode_cabang',$kode_cabang)->from('tm_cabang')->get()->row();
			$nama_cabang=$queryzz->fs_nama_cabang;

			$query = $tes->result();

		}else {

			$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb,nampem FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");
			$query = $tes->result();
		}
		
		
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
		$data['hasil'] = $query;
		$data['kategori'] = urldecode($kategori);
		$data['kode_cabang'] = $kode_cabang;
		$data['nama_cabang'] = $nama_cabang;
		$html = $this->load->view('print/vaging', $data,true);
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
		$pdf->Output('daftar-aging-svy.pdf', 'I');
	}

	function downloadexcelaging($kategori,$tglfix,$tglfix2,$kode_cabang)
	{	


		$this->load->library('Pdf');
	

		$nama_cabang='';

		if($kode_cabang <> ''){

			$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb,nampem FROM tx_arpjb WHERE kodekr='".trim($kode_cabang)."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");
			$queryzz = $this->db->where('fs_kode_cabang',$kode_cabang)->from('tm_cabang')->get()->row();
			$nama_cabang=$queryzz->fs_nama_cabang;
			$query = $tes->result();

		}else {

			$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb,nampem FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");
			$query = $tes->result();
		}
		
		
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
		$data['hasil'] = $query;
		$data['nama_cabang'] = $nama_cabang;
		$data['kategori'] = urldecode($kategori);
		$this->load->view('print/vdownloadexcelaging', $data);
	}

	function previewagingawal($xTgl,$xTgl2,$xKdCabang)
	{

		$this->load->library('Pdf');

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;



		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;


		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$arr = array("CURRENT","1-7 Hari","8-15 Hari","16-30 Hari","31-60 Hari","61-90 Hari","91-120 Hari","> 120 Hari","Total");
		$xArr = array();

		foreach ($arr as $value) {

			$nama_cabang='';
				

				if($xKdCabang <> 0){

					$queryzz = $this->db->where('fs_kode_cabang',$xKdCabang)->from('tm_cabang')->get()->row();
					$nama_cabang=$queryzz->fs_nama_cabang;

					$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb FROM tx_arpjb WHERE kodekr='".$xKdCabang."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

					$tes2 = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a WHERE kodekr='".$xKdCabang."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

					if($value=='CURRENT'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd=0 and ovdnet=0");

					}

					if($value=='1-7 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>1 and lamovd<=7");

					}

					if($value=='8-15 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>7 and lamovd<=15");

					}


					if($value=='16-30 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>15 and lamovd<=30");

					}

					if($value=='31-60 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>30 and lamovd<=60");

					}

					if($value=='61-90 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>60 and lamovd<=90");

					}


					if($value=='91-120 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>90 and lamovd<=120");

					}

					if($value=='> 120 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>120");

					}

					if($value=='Total'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns=''");

					}

				}else {
						$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

						$tes2 = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");


						if($value=='CURRENT'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd=0 and ovdnet=0");

						}


						if($value=='1-7 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>0 and lamovd<=7");
 
						}

						if($value=='8-15 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>7 and lamovd<=15");

						}

						if($value=='16-30 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>15 and lamovd<=30");

						}

						if($value=='31-60 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>30 and lamovd<=60");

						}

						if($value=='61-90 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>60 and lamovd<=90");

						}

						if($value=='91-120 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>90 and lamovd<=120");

						}

						if($value=='> 120 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>120");

						}


						if($value=='Total'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns=''");

						}
				}
				

				$queryz = $tes->result();

				$queryz2 = $tes->row();
				$queryz3 = $tes2->row();
				$units = $unit->row();

				$totalpokok=0;
				$totalpiu=0;
				$tglupd='';
				foreach ($queryz as $xRows)
				{

				if($value=='CURRENT'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='1-7 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd > 0 and lamovd <=7 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='8-15 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >7 and lamovd <=15 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='16-30 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >15 and lamovd <=30 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='31-60 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >30 and lamovd <=60 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='61-90 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >60 and lamovd <=90 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='91-120 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >90 and lamovd <=120 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='> 120 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >120 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='Total'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}





				}


				$xArr[] = array(
					'tglfix' => trim($tglfix),
					'tglfix2' => trim($tglfix2),
					'unit' => trim($units->unit),
					'kategori' => $value,
					'ospiu' => number_format($totalpiu,0,',','.'),
					'ospokok' => number_format($totalpokok,0,',','.'),
				);


		}


		$hasil= $xArr;
		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$data['hasil'] = $hasil;
		$data['nama_cabang'] = $nama_cabang;
		//$data['kodsup'] = $kodsup;
		//$data['nomsup'] = $nomsup;
		//$data['nama_dealer'] = $nam_dealer;
		$html = $this->load->view('print/vagingall', $data,true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetMargins(10, 10, 20, true);
		$pdf->SetTitle('DAFTAR AGING SURVEYOR');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-aging-all.pdf', 'I');
	}

	function downloadagingawal($xTgl,$xTgl2,$xKdCabang)
	{


		$this->load->library('Pdf');

		$tahun1= substr($xTgl, 0,4);
		$bulan1= substr($xTgl, 5,2);
		$hari1= substr($xTgl, 8,2);

		$tglfix= $tahun1.$bulan1.$hari1;



		$tahun2= substr($xTgl2, 0,4);
		$bulan2= substr($xTgl2, 5,2);
		$hari2= substr($xTgl2, 8,2);

		$tglfix2= $tahun2.$bulan2.$hari2;


		/*$sSQLs = $this->mFpd->ambilReportCount($tglfix,$tglfix2,$xKdCabang);
		$tes = $sSQLs->row();
		$count = $tes->nompjb;*/

		$arr = array("CURRENT","1-7 Hari","8-15 Hari","16-30 Hari","31-60 Hari","61-90 Hari","91-120 Hari","> 120 Hari","Total");
		$xArr = array();

		foreach ($arr as $value) {


				

				if($xKdCabang <> 0){

					$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb FROM tx_arpjb WHERE kodekr='".$xKdCabang."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

					$tes2 = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a WHERE kodekr='".$xKdCabang."' AND tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

					if($value=='CURRENT'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd=0 and ovdnet=0");

					}

					if($value=='1-7 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>1 and lamovd<=7");

					}

					if($value=='8-15 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>7 and lamovd<=15");

					}


					if($value=='16-30 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>15 and lamovd<=30");

					}

					if($value=='31-60 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>30 and lamovd<=60");

					}

					if($value=='61-90 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>60 and lamovd<=90");

					}


					if($value=='91-120 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>90 and lamovd<=120");

					}

					if($value=='> 120 Hari'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>120");

					}

					if($value=='Total'){

					$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.kodekr='".$xKdCabang."' AND a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns=''");

					}

				}else {
						$tes = $this->db->query("SELECT kodelk,nomdel,jenpiu,polpen,nompjb FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");

						$tes2 = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb WHERE tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND tgllns=''");


						if($value=='CURRENT'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd=0 and ovdnet=0");

						}


						if($value=='1-7 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>0 and lamovd<=7");
 
						}

						if($value=='8-15 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>7 and lamovd<=15");

						}

						if($value=='16-30 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>15 and lamovd<=30");

						}

						if($value=='31-60 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>30 and lamovd<=60");

						}

						if($value=='61-90 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>60 and lamovd<=90");

						}

						if($value=='91-120 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>90 and lamovd<=120");

						}

						if($value=='> 120 Hari'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns='' AND lamovd>120");

						}


						if($value=='Total'){

						$unit = $this->db->query("SELECT COUNT(*) as unit FROM tx_arpjb a LEFT JOIN tx_arovdd b ON a.kodelk=b.kodelk and a.nomdel=b.nomdel and a.jenpiu=b.jenpiu and a.polpen=b.polpen and a.nompjb=b.nompjb WHERE a.tglstj BETWEEN '".trim($tglfix)."' AND '".trim($tglfix2)."' AND a.tgllns=''");

						}
				}
				

				$queryz = $tes->result();

				$queryz2 = $tes->row();
				$queryz3 = $tes2->row();
				$units = $unit->row();

				$totalpokok=0;
				$totalpiu=0;
				$tglupd='';
				foreach ($queryz as $xRows)
				{

				if($value=='CURRENT'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd=0 and ovdnet=0 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='1-7 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd > 0 and lamovd <=7 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='8-15 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >7 and lamovd <=15 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='16-30 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >15 and lamovd <=30 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='31-60 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >30 and lamovd <=60 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='61-90 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >60 and lamovd <=90 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='91-120 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >90 and lamovd <=120 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='> 120 Hari'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE lamovd >120 and kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}

				if($value=='Total'){
				$query = $this->db->query("SELECT outgrs,outnet,tglupd FROM tx_arovdd WHERE  kodelk='".$xRows->kodelk."' and nomdel='".$xRows->nomdel."' and jenpiu='".$xRows->jenpiu."' and polpen='".$xRows->polpen."' and nompjb='".$xRows->nompjb."'");
				$a = $query->row();
				$hasil = $query->num_rows();
				if($hasil==0){

				}else {
					$outgrs=0;
					$outnet=0;
					$tglupds='';
					if($a->outgrs){
						$outgrs = $a->outgrs;
						
					}
					if($a->outnet){
						$outnet = $a->outnet;
						
					}
					if($a->tglupd){
						$tglupds = $a->tglupd;

					}
					$totalpokok += $outgrs;
					$totalpiu += $outnet;
					$tglupd = $tglupds;
				}
				
				
				}





				}


				$xArr[] = array(
					'tglfix' => trim($tglfix),
					'tglfix2' => trim($tglfix2),
					'unit' => trim($units->unit),
					'kategori' => $value,
					'ospiu' => number_format($totalpiu,0,',','.'),
					'ospokok' => number_format($totalpokok,0,',','.'),
				);


		}



		$hasil= $xArr;

		
		//$hasil = $sSQL->result();
		//$xTotal = $sSQL->num_rows();
		$data['hasil'] = $hasil;
		//$data['kodsup'] = $kodsup;
		//$data['nomsup'] = $nomsup;
		//$data['nama_dealer'] = $nam_dealer;
		$this->load->view('print/vdownloadagingall', $data);
	}

	
}
?>