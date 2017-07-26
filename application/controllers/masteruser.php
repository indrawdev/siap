<?php

class Masteruser extends CI_Controller
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
			$this->load->view('vmasteruser');
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
		
		$this->load->model('mMastersdm');

		$sSQL = $this->mMastersdm->ambilNikAll();
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMastersdm->ambilNik($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_nik'	=> trim($xRow->fs_nik),
					'fs_nama'	=> trim($xRow->fs_nama)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function cb_akses()
	{
		$total = '1';
		
		$array = array(
		  2 => array("0",'YA'),
		  4 => array("1",'TIDAK')
		);

	
		$out = array_values($array);
		
		echo json_encode($out);
	}

	function ambil_nik2()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$xdNik = trim($this->input->post('fs_nik'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mMasterUser');

		$sSQL = $this->mMasterUser->ambilNikAll2($xdNik,$cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterUser->ambilNik2($xdNik,$cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);



		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{

				$xArr[] = array(
					'fs_nik'	=> trim($xRow->fs_nik),
					'fs_nama'	=> trim($xRow->fs_nama),
					'fs_username'	=> trim($xRow->fs_username),
					'fs_password'	=> trim($xRow->fs_password),
					'fs_email'	=> trim($xRow->fs_email)

				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function listMasterUser()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterUser');
		$sSQL = $this->mMasterUser->listMasterAll();
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterUser->listMaster($nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{

				 $namaCabang = '';
				 $namaJabatan = '';
				 $cats = $this->db->where('fs_kode_cabang',$xRow->fs_kode_cabang)->get('tm_cabang')->row();
			     if($cats){
			     $namaCabang = $cats->fs_nama_cabang;
				 }

				 $cats2 = $this->db->where('fs_kode_jabatan',$xRow->fs_kode_jabatan)->get('tm_jabatan')->row();
			     if($cats2){
			     $namaJabatan = $cats2->fs_nama_jabatan;
				 }


				$xArr[] = array(
					'fs_nama_cabang'		=> ascii_to_entities(trim($namaCabang)),
					'fd_tanggal_bergabung'		=> ascii_to_entities(trim($xRow->fd_tanggal_bergabung)),
					'fs_nama_jabatan'		=> ascii_to_entities(trim($namaJabatan)),
					'fs_nama'		=> ascii_to_entities(trim($xRow->fs_nama)),
					'fs_nik'		=> ascii_to_entities(trim($xRow->fs_nik)),
					'fs_flag_login'		=> ascii_to_entities(trim($xRow->fs_flag_login))
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

	function ambil_jabatan2()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$nik = trim($this->input->post('fs_nik'));
		
		$this->load->model('mMastersdm');
		$sSQL = $this->mMastersdm->ambilJabatanAll2($nik);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mMastersdm->ambilJabatan2($nik,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_jabatan'	=> trim($xRow->fs_kode_jabatan),
					'fs_kode_parent	'	=> trim($xRow->fs_kode_parent),
					'fs_nama_jabatan'	=> trim($xRow->fs_nama_jabatan),
					'fb_cek2'	=> '1'
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

	function ambil_cabang_cari()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->load->model('mMasterUser');
		$sSQL = $this->mMasterUser->ambilCabangAll2($cari);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mMasterUser->ambilCabang2($cari,$nStart,$nLimit);
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


	function ambil_user()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kodecab = trim($this->input->post('fs_kode_cabang'));
		
		$this->load->model('mMasterUser');
		$sSQL = $this->mMasterUser->ambilUserAll($kodecab);
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mMasterUser->ambilUser($kodecab,$nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
					'fs_nik'	=> trim($xRow->fs_nik),
					'fs_nm_user'	=> trim($xRow->fs_nm_user),
					'fs_username'	=> trim($xRow->fs_username),
					'fs_email'	=> trim($xRow->fs_email)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ambil_mac()
	{

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mMasterUser');
		$sSQL = $this->mMasterUser->ambilMacAll();
		$xTotal = $sSQL->num_rows();

		$sSQL = $this->mMasterUser->ambilMac($nStart,$nLimit);
		$this->db->query(NOLOCK2);

		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_mac_address'	=> trim($xRow->fs_mac_address),
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
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



		if (trim($xdNik) <> '')
		{
			$this->load->model('mMasterUser');
			$sSQL = $this->mMasterUser->CekNik($xdNik);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'User avaliable , Lanjut ?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'User sudah ada!'
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
		$xdNik = trim($this->input->post('fs_mac'));

		

		$xupdate = false;

		
		if (trim($xdNik) <> '')
		{
			$this->load->model('mMasterUser');
			$sSQL = $this->mMasterUser->CekMac2($xdNik);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Apakah anda akan meng unregistrasi Mac ini ?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Apakah anda akan meng unregistrasi Mac ini ?'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Mac tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}

		function Unreg()
	{


		$nik = trim($this->input->post('fs_mac'));

		$xupdate = false;

		$this->db->where('fs_mac_address',$nik)->delete('tm_mac_address');

		 
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
				'hasil'		=> 'Delete Unregistrasi Update Success'
			);
			echo json_encode($hasil);
		}
	}

	function CekMac()
	{
		$mac = trim($this->input->post('fs_mac'));
		$cabang = trim($this->input->post('fs_kode_cabang'));



		if (trim($mac) <> '')
		{
			$this->load->model('mMasterUser');
			$sSQL = $this->mMasterUser->CekMac($mac,$cabang);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Mac avaliable , Lanjut ?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Mac sudah ada!'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Mac tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}

	function CekSimpan3()
	{
		$xdNik = trim($this->input->post('fs_nik'));

		if (trim($xdNik) <> '')
		{
			$this->load->model('mMasterUser');
			$sSQL = $this->mMasterUser->CekNik($xdNik);
			
			if ($sSQL->num_rows() == 1)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Anda Yakin ingin meng update user ini ?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'User belum terdaftar'
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



	function listMasterCabang()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$nik = trim($this->input->post('fs_nik'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterCabang');
		$sSQL = $this->mMasterCabang->listMasterAll2($nik);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterCabang->listMaster2($nik,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_nama_cabang'		=> ascii_to_entities(trim($xRow->fs_nama_cabang)),
					'fs_aktif'		=> '1'
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function CekUser2()
	{
		$xdMac = trim($this->input->post('fs_mac'));
		$xdCab = trim($this->input->post('fs_kode_cabang'));

		if (trim($xdNik) <> '')
		{
			$this->load->model('mMasterUser');
			$sSQL = $this->mMasterUser->CekNik2($xdMac,$xdCab);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'User avaliable , Lanjut ?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Mac address sudah ada!'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Mac address tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}

	function CekUser()
	{
		$xdCabang = trim($this->input->post('fs_kode_cabang'));

		$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> ''
				);
				echo json_encode($xHasil);
	}

	function CekNik()
	{
		$xdCabang = trim($this->input->post('fs_nik'));

		$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> ''
				);
				echo json_encode($xHasil);
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
			for ($i=1; $i<=$jml; $i++)
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
					'fd_tanggal_dibuat'		=> trim(date('Y-m-d H:i:s'))
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

	function Simpan4()
	{


		$nik = trim($this->input->post('fs_nik'));
		$username = trim($this->input->post('fs_username'));
		$password = trim($this->input->post('fs_password'));
		$email = trim($this->input->post('fs_email'));

		$xupdate = false;

		$data = array(
					'fs_email'	=> trim($email),
					'fs_password'	=> trim(md5($password)),
					'fs_iduser_edit'		=> trim($this->session->userdata('gUser')),
					'fd_tanggal_edit'		=> trim(date('Y-m-d H:i:s'))
				);
		 $this->db->where('fs_nik',$nik)->where('fs_username',$username)->update('tm_user',$data);
		
		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Edit User Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Edit User Success'
			);
			echo json_encode($hasil);
		}
	}

	function Simpan2()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$nik = trim($this->input->post('fs_nik'));
		$nama = trim($this->input->post('fs_nama'));
		$tglJoin = trim($this->input->post('fd_tanggal_buat'));
		$username = strtoupper(trim($this->input->post('fs_username')));
		$email = trim($this->input->post('fs_email'));
		$password = strtoupper(trim($this->input->post('fs_password')));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterCabang');
		$sSQL = $this->mMasterCabang->listMasterAll2($nik);
		$xTotal = $sSQL->num_rows();
		
		//$sSQL = $this->mMasterCabang->listMaster2($nik,$nStart,$nLimit);
		//$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{

				$data = array(
					'fs_nik'	=> trim($nik),
					'fs_aktif'	=> '1',
					'fs_kode_cabang'	=> trim($xRow->fs_kode_cabang),
					'fs_nm_user'	=> trim($nama),
					'fs_username'	=> trim($username),
					'fs_email'	=> trim($email),
					'fs_password'	=> trim(md5($password)),
					'fs_iduser_buat'		=> trim($this->session->userdata('gUser')),
					'fd_tanggal_buat'		=> trim($tglJoin)
				);
				$this->db->insert('tm_user', $data);

			}
		}

		$datas = array(
					'fs_flag_login'	=> '1',
					'fs_aktif'	=> '1'
		);

        $this->db->where('fs_nik',$nik)->where('fs_aktif','1')->where('fs_flag_login','0')->update('tm_sdm',$datas);


		$xupdate = false;

		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving User Success'
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

	function simpan_mac()
	{

		$mac = trim($this->input->post('fs_mac'));
		$kodecab = trim($this->input->post('fs_kode_cabang'));

		$data = array(
					'fs_mac_address' => trim($mac),
					'fs_kode_cabang'	=> trim($kodecab)
				);
		$this->db->insert('tm_mac_address', $data);

	


		$xupdate = false;

		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Mac Address Success'
			);
			echo json_encode($hasil);
		
		}
	}

	function CekSimpan2()
	{
		$xKdLevel = trim($this->input->post('fs_kd_akses'));
				
		if (trim($xKdLevel) == '')
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Kode Hak Akses tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
		else
		{
			$this->load->model('mMasterUser');
			$sSQL = $this->mMasterUser->CekKodeAkses($xKdLevel);
			
			if ($sSQL->num_rows() > 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Kode Hak Akses sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'lanjut'
				);
				echo json_encode($xHasil);
			}
		}
	}

	function save2()
	{
		$level = trim($this->input->post('fs_level'));
		
		$this->load->model('mMasterUser','',true);
		$ssql = $this->mMasterUser->CekKodeAkses($level);
		
		$xupdate = false;
		if ($ssql->num_rows() > 0)
		{
			$xupdate == true;
		}
		
		$where = "fs_level = '".trim($level)."'";
		
		$this->db->where($where);
		$this->db->delete('tm_parlevel');
		//eof hapus detail
		
		//simpan detail
		$kdinduk = explode('|', trim($this->input->post('fs_kd_induk')));
		$kdmenu = explode('|', trim($this->input->post('fs_kd_menu')));
		
		$jml = count($kdinduk) - 1;
		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{
				if (strlen(trim($kdinduk[$i])) == 2 and trim($kdmenu[$i]) == '')
				{
					$kdroot = '1';
				}
				else
				{
					$kdroot = '0';
				}
				
				$data = array(
					'fs_kd_comp'	=> trim($this->session->userdata('gComp')),
					'fs_kd_parent'	=> trim($kdinduk[$i]),
					'fs_kd_child'	=> trim($kdmenu[$i]),
					'fs_level'		=> trim($level),
					'fs_index'		=> '1'
					/*'fb_root'		=> trim($kdroot),
					
					'fs_usrcrt'		=> trim($this->session->userdata('gUser')),
					'fd_usrcrt'		=> trim(date('Y-m-d H:i:s')),
					'fs_upddt'		=> trim($this->session->userdata('gUser')),
					'fd_upddt'		=> trim(date('Y-m-d H:i:s'))*/
				);
				$this->db->insert('tm_parlevel', $data);
			}
		}
		//eof simpan detail
		
		if ($xupdate == false)
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Level Success'
			);
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Level Update Success'
			);
			echo json_encode($hasil);
		}
	}


	function KodeAkses()
	{
		$xKdLevel = trim($this->input->post('fs_kd_akses'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterUser');
		$sSQL = $this->mMasterUser->KodeAksesAll($xKdLevel);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterUser->KodeAkses($xKdLevel,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_jabatan'	=> ascii_to_entities(trim($xRow->fs_kode_jabatan)),
					'fs_nama_jabatan'	=> ascii_to_entities(trim($xRow->fs_nama_jabatan))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function AmbilNodes()
	{
		$xKdLevel = trim($this->input->post('fs_level'));

		
		//
		$this->load->model('mMasterUser');
		$ssql = $this->mMasterUser->LoadMenu($xKdLevel);
		//$this->db->query(NOLOCK);	

		//$this->db->query(NOLOCK2);

		$arr0 = array();
		$arr1 = array();
		$arr2 = array();
		$arr3 = array();
		$arr4 = array();
		if ($ssql->num_rows() > 0)
		{
			foreach ($ssql->result() as $row0)
			{
				if (trim($row0->fs_kd_child) == '')//strlen(trim($row0->fs_kd_parent)) == 2 and 
				{
					
					$i = 0;
					foreach ($ssql->result() as $row1)
					{
						if (strlen(trim($row1->fs_kd_parent)) == strlen(trim($row0->fs_kd_parent))
							and trim($row1->fs_kd_parent) == trim($row0->fs_kd_parent)
							and trim($row1->fs_kd_child) <> '')
						{
							++$i;
						}
					}
					
					if ($i == 0)
					{
						if (trim($row0->fs_nm_formweb) <> '')
						{
							$arr0[] = array(
								'fs_kd_induk'	=> $row0->fs_kd_parent,
								'fs_kd_menu'	=> $row0->fs_kd_child,
								'fs_nm_menu'	=> $row0->fs_nm_menu,
								'fb_tambah'		=> $row0->fb_tambah,
								'expanded'		=> true,
								'leaf'			=> true
							);
						}
					}
					else
					{
						$arr1 = array();
						foreach ($ssql->result() as $row1)
						{
							if ((strlen(trim($row1->fs_kd_parent)) == strlen(trim($row0->fs_kd_parent)))
								and (trim($row1->fs_kd_parent) == trim($row0->fs_kd_parent))
								and trim($row1->fs_kd_child) <> '')
							{
								
								$i = 0;
								foreach ($ssql->result() as $row2)
								{
									if (strlen(trim($row2->fs_kd_parent)) == strlen(trim($row1->fs_kd_child))
										and trim($row2->fs_kd_parent) == trim($row1->fs_kd_child))
									{
										++$i;
									}
								}
								
								if ($i == 0)
								{
									if (trim($row1->fs_nm_formweb) <> '')
									{
										$arr1[] = array(
											'fs_kd_induk'	=> $row1->fs_kd_parent,
											'fs_kd_menu'	=> $row1->fs_kd_child,
											'fs_nm_menu'	=> $row1->fs_nm_menu,
											'fb_tambah'		=> $row1->fb_tambah,
											'expanded'		=> true,
											'leaf'			=> true
										);
									}
								}
								else
								{
									$arr2 = array();
									foreach ($ssql->result() as $row2)
									{
										if (strlen(trim($row2->fs_kd_parent)) == strlen(trim($row1->fs_kd_child))
											and trim($row2->fs_kd_parent) == trim($row1->fs_kd_child))
										{
											
											$i = 0;
											foreach ($ssql->result() as $row3)
											{
												if (strlen(trim($row3->fs_kd_parent)) == strlen(trim($row2->fs_kd_child))
													and trim($row3->fs_kd_parent) == trim($row2->fs_kd_child))
												{
													++$i;
												}
											}
											
											if ($i == 0)
											{
												if (trim($row2->fs_nm_formweb) <> '')
												{
													$arr2[] = array(
														'fs_kd_induk'	=> $row2->fs_kd_parent,
														'fs_kd_menu'	=> $row2->fs_kd_child,
														'fs_nm_menu'	=> $row2->fs_nm_menu,
														'fb_tambah'		=> $row2->fb_tambah,
														'expanded'		=> true,
														'leaf'			=> true
													);
												}
											}
											else
											{
												$arr3 = array();
												foreach ($ssql->result() as $row3)
												{
													if (strlen(trim($row3->fs_kd_parent)) == strlen(trim($row2->fs_kd_child))
														and trim($row3->fs_kd_parent) == trim($row2->fs_kd_child))
													{
														
														$i = 0;
														foreach ($ssql->result() as $row4)
														{
															if (strlen(trim($row4->fs_kd_parent)) == strlen(trim($row3->fs_kd_child))
																and trim($row4->fs_kd_parent) == trim($row3->fs_kd_child))
															{
																++$i;
															}
														}
														
														if ($i == 0)
														{
															if (trim($row3->fs_nm_formweb) <> '')
															{
																$arr3[] = array(
																	'fs_kd_induk'	=> $row3->fs_kd_parent,
																	'fs_kd_menu'	=> $row3->fs_kd_child,
																	'fs_nm_menu'	=> $row3->fs_nm_menu,
																	'fb_tambah'		=> $row3->fb_tambah,
																	'expanded'		=> true,
																	'leaf'			=> true
																);
															}
														}
														else
														{
															$arr4 = array();
															foreach ($ssql->result() as $row4)
															{
																if (strlen(trim($row4->fs_kd_parent)) == strlen(trim($row3->fs_kd_child))
																	and trim($row4->fs_kd_parent) == trim($row3->fs_kd_child))
																{
																	if (trim($row4->fs_nm_formweb) <> '')
																	{
																		$arr4[] = array(
																			'fs_kd_induk'	=> $row4->fs_kd_parent,
																			'fs_kd_menu'	=> $row4->fs_kd_child,
																			'fs_nm_menu'	=> $row4->fs_nm_menu,
																			'fb_tambah'		=> $row4->fb_tambah,
																			'expanded'		=> true,
																			'leaf'			=> true
																		);
																	}
																}
															}
															$arr3[] = array(
																'fs_kd_induk'	=> $row3->fs_kd_parent,
																'fs_kd_menu'	=> $row3->fs_kd_child,
																'fs_nm_menu'	=> $row3->fs_nm_menu,
																'fb_tambah'		=> $row3->fb_tambah,
																'expanded'		=> true,
																'leaf'			=> false,
																'children'		=> $arr4
															);
														}
													}
												}
												$arr2[] = array(
													'fs_kd_induk'	=> $row2->fs_kd_parent,
													'fs_kd_menu'	=> $row2->fs_kd_child,
													'fs_nm_menu'	=> $row2->fs_nm_menu,
													'fb_tambah'		=> $row2->fb_tambah,
													'expanded'		=> true,
													'leaf'			=> false,
													'children'		=> $arr3
												);
											}
										}
									}
									$arr1[] = array(
										'fs_kd_induk'	=> $row1->fs_kd_parent,
										'fs_kd_menu'	=> $row1->fs_kd_child,
										'fs_nm_menu'	=> $row1->fs_nm_menu,
										'fb_tambah'		=> $row1->fb_tambah,
										'expanded'		=> true,
										'leaf'			=> false,
										'children'		=> $arr2
									);
								}
							}
						}
						$arr0[] = array(
							'fs_kd_induk'	=> $row0->fs_kd_parent,
							'fs_kd_menu'	=> $row0->fs_kd_child,
							'fs_nm_menu'	=> $row0->fs_nm_menu,
							'fb_tambah'		=> $row0->fb_tambah,
							'expanded'		=> true,
							'leaf'			=> false,
							'children'		=> $arr1
						);
					}
				}
			}
		}
		echo json_encode($arr0);
	}
		

	}
?>