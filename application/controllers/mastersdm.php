<?php

class Mastersdm extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->library('Pdf');
	}
	
	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vmastersdm');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function ambil_nik()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$xdNik = trim($this->input->post('fs_nik'));
		
		$this->load->model('mMastersdm');

		$sSQL = $this->mMastersdm->ambilNikAll($xdNik);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMastersdm->ambilNik($xdNik,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nik'	=> trim($xRow->fs_nik),
					'fs_nama'	=> trim($xRow->fs_nama),
					'fd_tanggal_bergabung'	=> trim($xRow->fd_tanggal_bergabung)

				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_nik2()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$xdNik = trim($this->input->post('fs_nik'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mMastersdm');

		$sSQL = $this->mMastersdm->ambilNikAll2($xdNik,$cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMastersdm->ambilNik2($xdNik,$cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nik'	=> trim($xRow->fs_nik),
					'fs_nama'	=> trim($xRow->fs_nama),
					'fd_tanggal_bergabung'	=> trim($xRow->fd_tanggal_bergabung)

				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function cb_akses()
	{
		$total = '1';
		
		$array = array(
		  2 => array("1",'YA'),
		  4 => array("0",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function listMasterCabang()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK); 
		$this->load->model('mMasterCabang');
		$sSQL = $this->mMasterCabang->listMasterAlls();
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterCabang->listMasters($nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_nama_cabang'		=> ascii_to_entities(trim($xRow->fs_nama_cabang))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	

	function ambil_jabatan()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mMastersdm');
		$sSQL = $this->mMastersdm->ambilJabatanAll();
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mMastersdm->ambilJabatan($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_jabatan'	=> trim($xRow->fs_kode_jabatan),
					'fs_kode_parent	'	=> trim($xRow->fs_kode_parent),
					'fs_nama_jabatan'	=> trim($xRow->fs_nama_jabatan)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}


	function ambil_cabang()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mMastersdm');
		$sSQL = $this->mMastersdm->ambilCabangAll();
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mMastersdm->ambilCabang($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
					'fs_nama_cabang'	=> trim($xRow->fs_nama_cabang)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	

	function CekSimpan()
	{
		$xdNik = trim($this->input->post('fs_nik'));
		$nama = trim($this->input->post('fs_nama'));
		$tglJoin = trim($this->input->post('fd_tanggal_bergabung'));
		$akses = trim($this->input->post('fs_akses_sistem'));
		$jabatan = trim($this->input->post('fs_nama_jabatan'));
		$cabang = trim($this->input->post('fs_nama_cabang'));

		
		//$this->load->model('mUser','',true);
		//$ssql = $this->mUser->cek_level($level);
		
		/*$xupdate = false;
		if ($ssql->num_rows() > 0)
		{
			$xupdate == true;
		}
		
		//hapus detail
		/*$where = "fs_kd_comp = '".trim($this->session->userdata('gComp'))."'
					AND fs_level = '".trim($level)."'";
		
		$this->db->where($where);
		$this->db->delete('tm_parlevel');
		//eof hapus detail*/
		
		//simpan detail

		$xupdate = false;

		$kdcabang = explode('|', trim($this->input->post('fs_kode_cabang')));
		$kdjabatan = explode('|', trim($this->input->post('fs_kode_jabatan')));

		$tampunganKodeCab = '';
		$cats = explode('|', trim($this->input->post('fs_kode_cabang')));
		foreach($cats as $cat) {
		    $cat = trim($cat);
		    $cats = $this->db->where('fs_kode_cabang',$cat)->get('tm_cabang')->row();
		    if($cats){
		    $tampunganKodeCab .= "".$cats->fs_nama_cabang."|";
			}
		    //$array = array($tampunganKodeCab);
		}

		$tampunganKodeJabatan = '';
		$cats2 = explode('|', trim($this->input->post('fs_kode_jabatan')));
		foreach($cats2 as $cat2) {
		    $cat2 = trim($cat2);
		    $cats2 = $this->db->where('fs_kode_jabatan',$cat2)->get('tm_jabatan')->row();
		    if($cats2){
		    $tampunganKodeJabatan .= "".$cats2->fs_nama_jabatan."|";
			}
		    //$array = array($tampunganKodeCab);
		}

		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		


		if (trim($xdNik) <> '')
		{
			$this->load->model('mMastersdm');
			$sSQL = $this->mMastersdm->CekNik($xdNik);

			$sqll = $this->db->where('fs_nik',$xdNik)->from('tm_sdm')->order_by('fd_tanggal_buat','DESC')->get()->row();


			if($sqll){
				$aktif = $sqll->fs_aktif;
				$login = $sqll->fs_flag_login;
				if($aktif==0){

					$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Konfirmasi Penyimpanan<br>NIK : '.$xdNik.'<br>NAMA : '.$nama.'<br>TANGGAL BERGABUNG : '.$tglJoin.'<br>CABANG :
					'.$cabang.'<br>JABATAN : '.$jabatan.'<br>AKSES CABANG : '.$tampunganKodeCab.'<br>AKSES FUNGSI : '.$tampunganKodeJabatan.''
				);
				echo json_encode($xHasil);
				}
				else {

					$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Nik sudah ada!'
				);
				echo json_encode($xHasil);
				}
			}
			else {

				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Konfirmasi Penyimpanan<br>NIK : '.$xdNik.'<br>NAMA : '.$nama.'<br>TANGGAL BERGABUNG : '.$tglJoin.'<br>CABANG :
					'.$cabang.'<br>JABATAN : '.$jabatan.'<br>AKSES CABANG : '.$tampunganKodeCab.'<br>AKSES FUNGSI : '.$tampunganKodeJabatan.''
				);
				echo json_encode($xHasil);
			}
			
		
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Nik tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}

	function cekUnreg()
	{
		$xdNik = trim($this->input->post('fs_nik'));

		

		$xupdate = false;

		
		if (trim($xdNik) <> '')
		{
			$this->load->model('mMastersdm');
			$sSQL = $this->mMastersdm->CekNik($xdNik);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Apakah anda akan meng unregistrasi NIK ini ?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Apakah anda akan meng unregistrasi NIK ini ?'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Nik tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}

	function CekCab()
	{
		/*$this->db->from('tm_jabatan')
		->join('user_payment_detail','user_payment.user_payment_id=user_payment_detail.user_payment_id')
		->join('admin_bank','admin_bank.bank_id=user_payment_detail.bank_id')
		->join('user','user_payment.user_id = user.user_id')->where('user_payment.payment_status','Pending')->get()->result();
		*/


		$xdNik = trim($this->input->post('fs_kode_cabang'));

		$sql = $this->db->where('fs_kode_cabang',$xdNik)->from('tm_cabang')->get()->row();
		

		$xupdate = false;

		
		if (trim($xdNik) <> '')
		{	


			ob_start();
		$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
		$pdf->AddPage("A4");
		$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
		$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
		$pdf->SetDefaultMonospacedFont('helvetica');
		$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		$pdf->SetFont('helvetica', '', 12);
		$pdf->setFontSubsetting(false);
		
		$head="";
		$head .="
		<!DOCTYPE html>
				<html>
				<head>
				<meta charset=utf-8 />
						<style>
						table.one {
				    position:relative;
				    float:left;
				    border:solid 1px green;
				   }

				  table.two {
				    position:relative;
				    float:right;
				     border:solid 1px red;
				  }
						h4 {
							font-size: 15px;
							text-decoration: underline;
						}
						h2 {
							text-decoration: underline;
						}
						.tes {
				    margin-left: 129px;
				    margin-right: 129px;
					}
						</style>
						</style>
				</head>
				<body>
						
						
						";
						

						//ob_end_clean();

						$head .= "
						<br><br>
						<table border=\"1\" cellpadding=\"5\">
						
						<h2  align=\"center\" class=\"normal\" >STRUKTUR ORGANISASI CABANG </h2><br>
						
						<br><br><br><br><br>

						";


						$head .="
						
						<table border=\"1\" cellpadding=\"5\">

						 <thead>
                              <tr>
                                    <th>Nama Jabatan</th>
                                    <th>Nama SDM</th>
                                </tr>
                      	 </thead>
						<tbody>
						";


						$jabatan = $this->db->order_by('fs_kode_jabatan','ASC')->get('tm_jabatan')->result();

						foreach ($jabatan as $row){
						 

						$head .="
						
                                <tr>
								   <td align=\"right\">".$row->fs_nama_jabatan."</td>

								
							 ";


		$total = $this->db->from('tm_sdm')->where('fs_aktif','1')->where('fs_kode_cabang',$xdNik)->where('fs_kode_jabatan',$row->fs_kode_jabatan)->get()->result();




								//var_dump($total);die;
								if($total>1){
									$head .="
									<td coslpan=\"2\" align=\"right\">
									";

									foreach($total as $row2){

										$total2 = $this->db->from('tm_user')->where('fs_aktif','1')->where('fs_kode_cabang',$xdNik)->where('fs_nik',$row2->fs_nik)->get()->row();


								$head .="
									
									".$row2->fs_nama."  - 	".$total2->fs_email." <br>
									

								";
									}

									$head .="
									</td>
									";
								}



								$head .="
								</tr>
								";

						}

						$head .="
						
						</tbody>
						</table>	
						";
												
						$head .="
						
				</body>
				</html>
		
		";
		//$path = base_url() . '/assets/struktur_cabang/';
		//$path = '/siap/assets/struktur_cabang/';
		$full_path = $xdNik.'.pdf';
		chmod($full_path, 0755);
		ob_clean();
	

		$xHasil = array(
				'sukses'	=> true,
				'url'		=> 'mastersdm/previewcabang/',
				'title'		=> $xdNik,
				'hasil'		=> 'Cetak Struktur?'
			);
				echo json_encode($xHasil);
			
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, cabang tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}


	function previewcabang($apk)
	{

		$this->load->library('Pdf');
		$this->load->model('mReport');

		$data['jabatan'] = $this->db->order_by('fs_kode_jabatan','ASC')->get('tm_jabatan')->result();
		$data['kode_cabang'] = $apk;
		

		$html = $this->load->view('print/vstrukturcabang', $data, true);
		
		ob_clean();

		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('STRUKTUR ORGANISASI CABANG');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		error_reporting(E_ALL);
		$pdf->Output('daftar-struktur-cabang.pdf', 'I');

	}


	function Simpan()
	{


		$nik = trim($this->input->post('fs_nik'));
		$nama = trim($this->input->post('fs_nama'));
		$tglJoin = trim($this->input->post('fd_tanggal_bergabung'));
		$akses = trim($this->input->post('fs_akses_sistem'));


		$jabatan = trim($this->input->post('fs_kode_jabatan2'));
		$cabang = trim($this->input->post('fs_kode_cabang2'));

		
		//$this->load->model('mUser','',true);
		//$ssql = $this->mUser->cek_level($level);
		
		/*$xupdate = false;
		if ($ssql->num_rows() > 0)
		{
			$xupdate == true;
		}
		
		//hapus detail
		/*$where = "fs_kd_comp = '".trim($this->session->userdata('gComp'))."'
					AND fs_level = '".trim($level)."'";
		
		$this->db->where($where);
		$this->db->delete('tm_parlevel');
		//eof hapus detail*/
		
		//simpan detail

		$xupdate = false;

		$kdcabang = explode('|', trim($this->input->post('fs_kode_cabang')));
		$nmcabang = explode('|', trim($this->input->post('fs_nama_cabang')));

		$kdjabatan = explode('|', trim($this->input->post('fs_kode_jabatan')));
		
		$jml = count($kdcabang) - 1;
		$jml2 = count($kdjabatan) - 1;
		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{
				$data = array(
					'fs_nik'	=> trim($nik),
					'fs_kode_cabang'	=> trim($kdcabang[$i]),
					'fs_iduser_buat'		=> trim($this->session->userdata('gUser')),
					'fd_tanggal_buat'		=> trim(date('Y-m-d H:i:s'))
				);
				$this->db->insert('tm_struktur_cabang', $data);
			}
		}

		if ($jml2 != 0)
		{
			for ($i=1; $i<=$jml2; $i++)
			{
				$data = array(
					'fs_nik'	=> trim($nik),
					'fs_kode_jabatan'	=> trim($kdjabatan[$i]),
					'fs_iduser_buat'		=> trim($this->session->userdata('gUser')),
					'fd_tanggal_buat'		=> trim(date('Y-m-d H:i:s'))
				);
				$this->db->insert('tm_struktur_jabatan', $data);
			}
		}
		//eof simpan detail
		$data = array(
					'fs_nik'	=> trim($nik),
					'fs_kode_jabatan'	=> trim($jabatan),
					'fs_kode_cabang'	=> trim($cabang),
					'fs_akses_sistem'	=> trim($akses),
					'fs_nama'	=> trim($nama),
					'fd_tanggal_bergabung'	=> trim($tglJoin),
					'fs_iduser_buat'		=> trim($this->session->userdata('gUser')),
					'fd_tanggal_buat'		=> trim(date('Y-m-d H:i:s')),
					'fs_flag_login'	=> '0',
					'fs_aktif'	=> '1'
				);
		$this->db->insert('tm_sdm', $data);
		
		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Struktur SDM Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving SDM Update Success'
			);
			echo json_encode($hasil);
		}
	}

	function Unreg()
	{


		$nik = trim($this->input->post('fs_nik'));

		$xupdate = false;

		$this->db->where('fs_nik',$nik)->delete('tm_struktur_jabatan');
		$this->db->where('fs_nik',$nik)->delete('tm_struktur_cabang');
		$this->db->where('fs_nik',$nik)->delete('tm_user');

		$data = array(
					'fs_flag_login'	=> '0',
					'fs_aktif'	=> '0'
		);

           $this->db->where('fs_nik',$nik)->where('fs_aktif','1')->update('tm_sdm',$data);

		 
		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Unregistrasi Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Delete SDM Update Success'
			);
			echo json_encode($hasil);
		}
	}

}
?>