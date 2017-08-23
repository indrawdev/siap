<?php

class Mastersetup extends CI_Controller
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
			$this->load->view('vmastersetup');
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
		$this->load->model('mMasterSetup');
		$sSQL = $this->mMasterSetup->listCabangAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterSetup->listCabang($cari, $nStart, $nLimit);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_nama_cabang' => ascii_to_entities(trim($xRow->fs_nama_cabang)),
					'fs_alamat_cabang' => ascii_to_entities(trim($xRow->fs_alamat_cabang)),
					'fs_kota_cabang' => ascii_to_entities(trim($xRow->fs_kota_cabang))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function gridcounter()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_counter'));
		$nj = $this->input->post('fs_no_jenis_counter');

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$this->db->query(NOLOCK);
		$this->load->model('mMasterSetup');
		$sSQL = $this->mMasterSetup->listCounterAll($kd, $jns, $nj);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterSetup->listCounter($kd, $jns, $nj, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fs_jenis_counter' => ascii_to_entities(trim($xRow->fs_jenis_counter)),
						'fs_no_jenis_counter' => ascii_to_entities($xRow->fs_no_jenis_counter),
						'fn_counter' => ascii_to_entities(trim($xRow->fn_counter))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function cb_jenisco()
	{
		$array = array(
		  2 => array("APK",'APK'),
		  4 => array("BATCH",'BATCH'),
		  6 => array("PJJ",'PJJ')
		);

		$out = array_values($array);
		echo json_encode($out);
	}

	function cb_nojen()
	{
		$array = array(
		  2 => array(0, '0'),
		  4 => array(91,'91'),
		  6 => array(92,'92'),
		  8 => array(93,'93'),
		  10 => array(95,'95'),
		  12 => array(96,'96'),
		  14 => array(97,'97')
		);

		$out = array_values($array);
		echo json_encode($out);
	}

	function ceksavecounter()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_counter'));
		$nj = $this->input->post('fs_no_jenis_counter');
		$ct = trim($this->input->post('fn_counter'));

		if (!empty($kd) && !empty($jns) && $nj <> '' && !empty($ct)) {
			$this->load->model('mMasterSetup');
			$sSQL = $this->mMasterSetup->checkCounter($kd, $jns, $nj, $ct);
			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Data Counter sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Data Counter belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Data Counter tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function savecounter()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_counter'));
		$nj = $this->input->post('fs_no_jenis_counter');
		$ct = trim($this->input->post('fn_counter'));

		$update = false;
		$this->load->model('mMasterSetup');
		$sSQL = $this->mMasterSetup->checkCounter($kd, $jns, $nj, $ct);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_cabang' => $kd,
						'fs_jenis_counter' => $jns,
						'fs_no_jenis_counter' => $nj,
						'fn_counter' => $ct
					);
			$this->db->insert('tm_counter', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Data Counter Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$data2 = array(
						'fs_kode_cabang' => $kd,
						'fs_jenis_counter' => $jns,
						'fs_no_jenis_counter' => $nj,
						'fn_counter' => $ct
					);
			$where = "fs_kode_cabang = '".trim($kd)."' 
						AND fs_jenis_counter = '".trim($jns)."' 
						AND fs_no_jenis_counter = '".$nj."'
						";
			$this->db->where($where);
			$this->db->update('tm_counter', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data Counter, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	function cekresetcounter()
	{
		$this->load->model('mMasterSetup');
		$sSQL = $this->mMasterSetup->checkYear();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$data[] = $xRow->yy;
			}

			$check = count(array_unique($data)); 

			if ($check == 1)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Prefix Nomor Counter '.$data[0].', berdasarkan tahun ini akan di reset semua.'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Prefix Nomor Counter '.$data[0].' tidak berurutan!!, silakan edit kembali nomor counternya.'
				);
				echo json_encode($hasil);
			}
		} 
		else 
		{
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Reset Gagal!!'
					);
			echo json_encode($hasil);
		}
	}

	function resetcounter()
	{
		$year = trim($this->input->post('fn_year'));
		$yy = substr($year, 2, 2);

		$this->load->model('mMasterSetup');
		$sSQL = $this->mMasterSetup->checkYear();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$data[] = $xRow->yy;
			}

			$check = count(array_unique($data)); 
			if ($check == 1)
			{
				$yeardb = $data[0];

				if ($yy > $yeardb)
				{
					// SET 1
					$newval = $yy . '0000';
					$dt = array(
							'fn_counter' => $newval
						);
					$this->db->update('tm_counter', $dt);

					$hasil = array(
						'sukses' => true,
						'hasil' => 'Reset Prefix Nomor Counter, Sukses!!'
					);
					echo json_encode($hasil);

				}
				else
				{
					$hasil = array(
						'sukses' => false,
						'hasil' => 'Reset Prefix Nomor Counter, tidak ada perubahan!!'
					);
					echo json_encode($hasil);
				}
			}
		}
		else
		{
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Reset Gagal!!'
					);
			echo json_encode($hasil);
		}
	}
}