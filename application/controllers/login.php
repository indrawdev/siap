<?php

class Login extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{

		   $this->load->view('vlogin');
		  
	}
	
	function ambil_comp()
	{
		$total = '1';
		
		$array = array(
		  2 => array("MFI",'MANDIRI FINANCE INDONESIA')
		);

	
		$out = array_values($array);
		
		
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($out).'})';
	
	}


	function grid_detail2()
	{
		$total = '2';
		
		$array = array(
		  2 => array('AMG','AUTO MANDIRI GROUP','ASTER-AMG','AUTO MANDIRI GROUP','ASTER-AMG','AUTO MANDIRI GROUP','ASTER-AMG','AUTO MANDIRI GROUP'),
		  4 => array('GIT','PT.GLOBAL INDOTRADA INDONESIA','ASTER-BEKASI','PT.GLOBAL INDOTRADA INDONESIA','ASTER-BEKASI','PT.GLOBAL INDOTRADA INDONESIA','ASTER-BEKASI','PT.GLOBAL INDOTRADA INDONESIA')
		);

	
		$out = array_values($array);
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($out).'})';
	}

	function cb_trss()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'YA'),
		  4 => array("1",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}
	
	function cb_dibayar()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}
	

	function cb_pola()
	{
		$total = '1';
		
		$array = array(
		  0 => array("0",'91'),
		  1 => array("1",'92'),
		  2=> array("2",'93'),
		  3=> array("3",'95'),
		  4=> array("4",'96'),
		  5=> array("4",'97')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_repeat()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'YA'),
		  4 => array("1",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_jenis_asuransi()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'ALL RISK'),
		  4 => array("1",'TOTAL LOST ONLY')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_deposit()
	{
		$total = '1';
		
		$array = array(
		  2 => array("Y",'YA'),
		  4 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_jenis()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'PERORANGAN'),
		  4 => array("1",'WIRASWASTA')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_pencarianke()
	{
		$total = '1';
		
		$array = array(
		  1 => array("D",'DEALER'),
		  2 => array("K",'KONSUMEN')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_uangmuka()
	{
		$total = '1';
		
		$array = array(
		  1 => array("D",'DEALER'),
		  2 => array("M",'MFI')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_samakontrak()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'YA'),
		  4 => array("1",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function cb_komersil()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_garasi()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'YA'),
		  4 => array("1",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_dimuka()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_dp()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function cb_asuransi_mix()
	{
		$total = '1';
		
		$array = array(
		  1 => array("ALLRISK",'ALLRISK'),
		  2 => array("TOTAL LOST",'TOTAL LOST')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function cb_tahun_ke()
	{
		$total = '1';

		$tenor = trim($this->input->post('fs_tenor'));

		if($tenor>1 and $tenor <=12){

		$array = array(
		  1 => array("1",'1')
		);

		}

		if($tenor>12 and $tenor <=24){

		$array = array(
		  1 => array("1",'1'),
		  2 => array("2",'2')
		);

		}

		if($tenor>24 and $tenor <=36){

		$array = array(
		  1 => array("1",'1'),
		  2 => array("2",'2'),
		  3 => array("3",'3')
		);

		}


		if($tenor>36 and $tenor <=48){

		$array = array(
		  1 => array("1",'1'),
		  2 => array("2",'2'),
		  3 => array("3",'3'),
		  4 => array("4",'4')
		);

		}

		if($tenor>48){

		$array = array(
		  1 => array("1",'1'),
		  2 => array("2",'2'),
		  3 => array("3",'3'),
		  4 => array("4",'4')
		);

		}
		
	
	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function cb_cair()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'BLANK'),
		  2 => array("+",'+'),
		  3 => array("-",'-')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}


	function cb_potongpencairan()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_angdiluar()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'YA'),
		  4 => array("1",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_jenkel()
	{
		$total = '1';
		
		$array = array(
		  1 => array("L",'L'),
		  2 => array("P",'P')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_kredit()
	{
		$total = '1';
		
		$array = array(
		  1 => array("Y",'YA'),
		  2 => array("T",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_kondisi_lingkungan()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'LUX'),
		  2 => array("1",'MENENGAH'),
		  3 => array("2",'SEDERHANA')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_bentuk()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'CV'),
		  2 => array("1",'FIRMA'),
		  3 => array("2",'LAIN-LAIN'),
		  4 => array("3",'PT'),

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_status_usaha()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'Cabang'),
		  2 => array("1",'Pusat'),
		  3 => array("2",'Perwakilan')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_tempat_usaha()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'Milik Sendiri'),
		  2 => array("1",'Sewa')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_jenisasuransi()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'Jenis Asuransi 1'),
		  2 => array("1",'Jenis Asuransi 2')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_polaangs()
	{
		$total = '1';
		

		$nstart = trim($this->input->post('start'));
		
		$kdprod = 'pola_angsuran';
		
		$this->load->model('mSearch','',true);
		$ssql = $this->mSearch->ambil_pola($kdprod);
		
		echo json_encode($ssql->result());
	}

	function cb_carabayar()
	{
		
		$total = '1';
		

		$nstart = trim($this->input->post('start'));
		
		$kdprod = 'cara_bayar';
		
		$this->load->model('mSearch','',true);
		$ssql = $this->mSearch->ambil_cara_bayar($kdprod);
		
		echo json_encode($ssql->result());
	}

	function cb_dimukakali()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'0'),
		  2 => array("1",'1'),
		  3 => array("2",'2'),
		  4 => array("3",'3'),
		  4 => array("4",'4')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_first_time()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'Repeat'),
		  2 => array("1",'Tidak, ada bukti'),
		  3 => array("2",'Tidak, tidak ada bukti'),
		  4 => array("3",'Ya')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_kondisi_kantor()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'LUX'),
		  2 => array("1",'MENENGAH'),
		  3 => array("2",'SEDERHANA')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_kategori_perusahaan()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'BESAR'),
		  2 => array("1",'KECIL'),
		  3 => array("2",'MENENGAH')

		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_agama()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'ISLAM'),
		  2 => array("1",'BUDDHA'),
		  3 => array("2",'KRISTEN'),
		  4 => array("3",'HINDU'),
		  5 => array("4",'KATOLIK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_status_kawin()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'BELUM/TIDAK KAWIN'),
		  2 => array("1",'CERAI'),
		  3 => array("2",'KAWIN')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_pendidikan()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'D1'),
		  2 => array("1",'D2'),
		  3 => array("2",'D3'),
		  4 => array("3",'LAIN-LAIN'),
		  5 => array("4",'S1'),
		  6 => array("5",'S2'),
		  7 => array("6",'S3'),
		  8 => array("7",'SD'),
		  9 => array("8",'SLTA'),
		  10 => array("9",'SLTP'),
		  11 => array("10",'TIDAK LULUS SD')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function cb_status_rumah()
	{
		$total = '1';
		
		$array = array(
		  1 => array("0",'ANGSURAN KPR'),
		  2 => array("1",'KONTRAK'),
		  3 => array("2",'D3'),
		  4 => array("3",'KOS'),
		  5 => array("4",'LAIN-LAIN'),
		  6 => array("5",'RUMAH INSTANSI'),
		  7 => array("6",'RUMAH ORTU/KELUARGA'),
		  8 => array("7",'RUMAH SENDIRI'));

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	/*function ambil_comp()
	{
		$nstart = trim($this->input->post('start'));
		$this->load->model('mSearch','',true);
		$ssql = $this->mSearch->change_comp_all('');
		$total = $ssql->num_rows();
		
		$ssql = $this->mSearch->change_comp('',$nstart);
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($ssql->result()).'})';
	}*/
	
	/*function change_comp()
	{
		//set sesi
		if (strripos(base_url(),config_item('ip_server')) <> 0)
		{
			$this->session->set_userdata('gServer', config_item('ip_db_server'));
		}
		else
		{
			$this->session->set_userdata('gServer', config_item('ip_db_lokal'));
		}
		$this->session->set_userdata('gIP', config_item('ip_server'));
		
		if (substr(trim($this->session->userdata('gServer')), strlen(trim($this->session->userdata('gServer'))) - 2, 3) == '44')
		{
			$this->session->set_userdata('gKonek','SERVER-IDS');
		}
		else
		{
			$this->session->set_userdata('gKonek','SERVER-(LOCAL)');
		}
		//eof set sesi
		
		$xdb_aktif = trim($this->input->post('fs_nm_db'));
		$xComp = trim($this->input->post('fs_kd_comp'));
		
		if (trim($xdb_aktif) <> '')
		{
			//change db
			$this->load->model('mMainModul','',true);
			$this->mMainModul->change_db($this->session->userdata('gServer'),$xdb_aktif);
			//eof change db
			
			$nstart = trim($this->input->post('start'));
			
			$this->load->model('mSearch','',true);
			$ssql = $this->mSearch->login_dept_all($xComp,'','');
			$total = $ssql->num_rows();
			
			$ssql = $this->mSearch->login_dept($xComp,'','',$nstart);
			
			echo '({"total":"'.$total.'","hasil":'.json_encode($ssql->result()).'})';
		}
	}*/

	function change_comp()
	{
		
		
		$total = '1';
		
		$array = array(
		  2 => array("AMG",'000001','MANDIRI FINANCE INDONESIA'),
		  4 => array("GMA",'000001','GLOBAL MANDIRI AUTONUSA')
		);

	
		$out = array_values($array);
		
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($out).'})';
	
		
	}
	
	function buat_captcha()
	{
		$this->load->helper('captcha');
		
		$this->load->database();
		
		$vals = array(
			'expiration'	=> 3600,
			'font_path'		=> './assets/css/font/comic.ttf',
			'img_height'	=> 70,
			'img_path'		=> './temp/captcha/',
			'img_url'		=> './temp/captcha/',
			'img_width'		=> 270
		);
		
		$cap = create_captcha($vals);
		
		if ($cap)
		{
			$data = array(
				'captcha_time'	=> round($cap['time']),
				'ip_address'	=> $this->input->ip_address(),
				'word'			=> $cap['word']
			);
			
			$this->db->insert('captcha', $data);
			
			$this->session->set_userdata('vcpt',round(trim($cap['time'])));
			
			$xPathFile = base_url('/temp/captcha/'.trim($cap['time']).'.jpg');
			
			$hasil = array(
				'src'	=> $xPathFile
			);
			echo json_encode($hasil);
		}
	}


	function ceklogin()
	{
		$this->form_validation->set_rules('txtUserName', 'xKdUser', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtUserPass', 'xPassword', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtCaptcha', 'xCaptcha', 'trim|required|xss_clean');
		
		
		$this->load->database();
		if ($this->form_validation->run() == FALSE)
		{
			echo "'Kode Petugas atau Password Salah!!'";
		}
		else
		{
			$xNmUser = trim($this->input->post('txtUserName'));
			$xPassword = trim($this->input->post('txtUserPass'));


			$xWord = trim($this->input->post('txtCaptcha'));
			$xUserPassword = trim($this->input->post('txtTgl'));
			
			$exp = time() - 3600;
			$xWhere = "captcha_time < '".trim($exp)."'";
			$this->db->where($xWhere);
			$this->db->delete('captcha');
			
			$this->load->model('mMainModul');
			$sSQL = $this->mMainModul->CekCaptcha($xWord);
			$sSQL = $sSQL->row();
			$xJml = $sSQL->fn_jml;
			
			if ($xJml > 0)
			{
				$nama_cabang = trim($this->input->post('cboDept'));
				$kode_cabang = trim($this->input->post('txtDept'));
				
				$db = trim($this->input->post('txtDB'));
				$usernm = str_replace("'",'"',trim($this->input->post('txtUserName')));
				$userpass = str_replace("'",'"',trim($this->input->post('txtUserPass')));
				

				$usernm = strtoupper($usernm);
				$userpass = strtoupper($userpass);

				//change db
				//$this->load->model('mMainModul','',true);
				//$this->mMainModul->change_db($this->session->userdata('gServer'),$db);
				//eof change db
				
				/*$this->load->model('mSearch','',true);
				$ssql = $this->mSearch->dept_def($kddept,$kdcount);
				$ssql = $ssql->row();
				$deptdef = $ssql->fs_nm_code;
				$kota = ucwords(strtolower($ssql->fs_kota));
				
				$lDept = strlen(trim($kddept));
				$lDept = $lDept - 2;
				$xDept = substr(trim($kddept), $lDept, 2);
				
				$lCount = strlen(trim($kdcount));
				$lCount = $lCount - 2;
				$xCount = substr(trim($kdcount), $lCount, 2);
				*/
				if ((trim($usernm) == 'MFI' and trim($userpass) == 'AMGGROUP'))
				{
					//set sesi
					$new = array(
						'gNamaCabang'		=> trim($nama_cabang),
						'gKodeCabang'			=> trim($kode_cabang),
						'gUser'			=> trim($usernm),
						'gPass'			=> trim($userpass),
						'gSparePart'	=> '0',
						'gUserLevel'	=> '1',
					);
					$this->session->set_userdata($new);
					
					//$this->load->model('mMainModul','',true);
					//$ssql = $this->mMainModul->get_tax();
					//$ssql = $ssql->row();
					//$otax = $ssql->fb_otax;
					
					//$new = array('gOTax'=>trim($otax));
					//$this->session->set_userdata($new);
					//eof set sesi
					
					//$this->session->unset_userdata('vcpt');
					echo "{success:true}";
				}
				else
				{
					//coding pass
					//$this->load->model('mMainModul','',true);
					//$ssql = $this->mMainModul->coding($userpass);
					//$userpass = $ssql;
					//eof coding pass
					
					//cari user, password di db
					$this->load->model('mSearch','',true);
					$ssql = $this->mSearch->valid_userpass($kode_cabang,$usernm,$userpass);

					//eof cari user, password di db	

					if ($ssql->num_rows() > 0)//user, password ada di db
					{
						$ssql = $ssql->row();
						$usernm = $ssql->fs_username;
						$nik = $ssql->fs_nik;
						// $userpass = $ssql->fs_password;


						//set sesi
						$new = array(
						'gNamaCabang'		=> trim($nama_cabang),
						'gKodeCabang'			=> trim($kode_cabang),
						'gUser'			=> trim($usernm),
						'gNik'			=> trim($nik),
						'gPass'			=> '',
						'gUserLevel'	=> '0'
						);

						$this->session->set_userdata($new);
						echo "{success:true}";
			  		  		
					   //$this->load->view('vlogin');
					  
					 

					}
					else//user, password tdk ada di db
					{
						echo "'User Code or Password Incorrect!!'";
					}
				}
			}
			else
			{
				echo "'Captcha Incorrect!!'";
			}

		}
	}

	

	/*function ceklogin()
	{
		$this->form_validation->set_rules('cboComp', 'Company', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtComp', 'CompCode', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtDB', 'Database', 'trim|required|xss_clean');
		$this->form_validation->set_rules('cboDept', 'DeptName', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtDept', 'DeptCode', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtCount', 'DeptCount', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtUserName', 'UserCode', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtUserPass', 'Password', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtCaptcha', 'Captcha', 'trim|required|xss_clean');
		
		
		if ($this->form_validation->run() == FALSE)
		{
			echo "'User Code or Password Incorrect!!'";
		}
		else
		{
			$word = trim($this->input->post('txtCaptcha'));
			
			// change db
			$this->load->model('mMainModul','',true);
			$this->mMainModul->change_db($this->session->userdata('gServer'),config_item('base_server'));
			// eof change db
			
			$exp = time()-3600;
			$where = "captcha_time < '".trim($exp)."'";
			$this->db->where($where);
			$this->db->delete('captcha');
			
			$this->load->model('mMainModul','',true);
			$ssql = $this->mMainModul->cek_captcha($word);
			$ssql = $ssql->row();
			$jml = $ssql->fn_jml;
			
			if ($jml > 0)
			{
				$kdcomp = trim($this->input->post('txtComp'));
				$nmcomp = trim($this->input->post('cboComp'));
				$kddept = trim($this->input->post('txtDept'));
				$kdcount = trim($this->input->post('txtCount'));
				
				$db = trim($this->input->post('txtDB'));
				$usernm = str_replace("'",'"',trim($this->input->post('txtUserName')));
				$userpass = str_replace("'",'"',trim($this->input->post('txtUserPass')));
				
				
				//change db
				$this->load->model('mMainModul','',true);
				$this->mMainModul->change_db($this->session->userdata('gServer'),$db);
				//eof change db
				
				$this->load->model('mSearch','',true);
				$ssql = $this->mSearch->dept_def($kddept,$kdcount);
				$ssql = $ssql->row();
				$deptdef = $ssql->fs_nm_code;
				$kota = ucwords(strtolower($ssql->fs_kota));
				
				$lDept = strlen(trim($kddept));
				$lDept = $lDept - 2;
				$xDept = substr(trim($kddept), $lDept, 2);
				
				$lCount = strlen(trim($kdcount));
				$lCount = $lCount - 2;
				$xCount = substr(trim($kdcount), $lCount, 2);
				
				if ((trim($usernm) == 'MFI' and trim($userpass) == 'AMGGROUP'))
				{
					//set sesi
					$new = array(
						'gDatabase'		=> trim($db),
						'gComp'			=> trim($kdcomp),
						'gCompName'		=> trim($nmcomp),
						'gDept'			=> trim($kddept),
						'gCount'		=> trim($kdcount),
						
						'gDeptName'		=> trim($deptdef),
						'gGudang'		=> trim($xDept).trim($xCount),
						'gWilayah'		=> trim($xDept),
						'gKota'			=> trim($kota),
						'gUser'			=> trim($usernm),
						
						'gPass'			=> trim($userpass),
						'gSparePart'	=> '0'
					);
					$this->session->set_userdata($new);
					
					$this->load->model('mMainModul','',true);
					$ssql = $this->mMainModul->get_tax();
					$ssql = $ssql->row();
					$otax = $ssql->fb_otax;
					
					$new = array('gOTax'=>trim($otax));
					$this->session->set_userdata($new);
					//eof set sesi
					
					$this->session->unset_userdata('vcpt');
					echo "{success:true}";
				}
				else
				{
					//coding pass
					$this->load->model('mMainModul','',true);
					$ssql = $this->mMainModul->coding($userpass);
					$userpass = $ssql;
					//eof coding pass
					
					//cari user, password di db
					$this->load->model('mSearch','',true);
					$ssql = $this->mSearch->valid_userpass($kdcomp,$usernm,$userpass);
					//eof cari user, password di db
					
					if ($ssql->num_rows() > 0)//user, password ada di db
					{
						$ssql = $ssql->row();
						$usernm = $ssql->fs_kd_user;
						// $userpass = $ssql->fs_password;
						
						//set sesi
						$new = array(
							'gDatabase'	=> trim($db),
							'gComp'		=> trim($kdcomp),
							'gCompName'	=> trim($nmcomp),
							'gDept'		=> trim($kddept),
							'gCount'	=> trim($kdcount),
							
							'gDeptName' => trim($deptdef),
							'gGudang'	=> trim($xDept).trim($xCount),
							'gWilayah'	=> trim($xDept),
							'gKota'		=> trim($kota),
							'gUser'		=> trim($usernm),
							
							'gPass'		=> ''
						);
						$this->session->set_userdata($new);
						
						$this->load->model('mMainModul','',true);
						$ssql = $this->mMainModul->user_tipe($usernm);
						$ssql = $ssql->row();
						$usertipe = $ssql->fb_sparepart;
						
						$new = array(
							'gSparePart'	=> trim($usertipe)
						);
						$this->session->set_userdata($new);
						
						$this->load->model('mMainModul','',true);
						$ssql = $this->mMainModul->get_tax();
						$ssql = $ssql->row();
						$otax = $ssql->fb_otax;
						
						$new = array(
							'gOTax'	=> trim($otax)
						);
						$this->session->set_userdata($new);
						//eof set sesi
						
						$this->session->unset_userdata('vcpt');
						echo "{success:true}";
					}
					else//user, password tdk ada di db
					{
						echo "'User Code or Password Incorrect!!'";
					}
				}
			}
			else
			{
				echo "'Captcha Incorrect!!'";
			}
		}
	}
	*/
	function logout()
	{


		$this->session->sess_destroy();
		echo "{success:true}";
		//redirect('','refresh');
	}
}
?>