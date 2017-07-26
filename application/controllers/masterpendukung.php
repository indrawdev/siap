<?php

class Masterpendukung extends CI_Controller
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
			$this->load->view('vmasterpendukung');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function grid()
	{
		$kd = trim($this->input->post('fs_kode_dokumen'));
		$jns = trim($this->input->post('fs_jenis_dokumen'));
		$jby = trim($this->input->post('fs_jenis_pembiayaan'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterPendukung');
		$sSQL = $this->mMasterPendukung->listAll($kd, $jns, $jby);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterPendukung->list($kd, $jns, $jby, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
					'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
					'fs_jenis_dokumen' => ascii_to_entities(trim($xRow->fs_jenis_dokumen)),
					'fs_nama_dokumen' => ascii_to_entities(trim($xRow->fs_nama_dokumen)),
					'fs_wajib' => ascii_to_entities(trim($xRow->fs_wajib))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function cb_pembiayaan()
	{
		$array = array(
				2 => array("P",'PERORANGAN'),
				4 => array("W",'WIRASWASTA'),
				6 => array("B",'BADAN USAHA')
		);
		$out = array_values($array);
		echo json_encode($out);
	}

	function cb_dokumen()
	{
		$array = array(
				2 => array("APK",'APK'),
				4 => array("SURVEY",'SURVEY')
		);
		$out = array_values($array);
		echo json_encode($out);
	}

	function cb_wajib()
	{
		$array = array(
				2 => array("1",'YA'),
				4 => array("0",'TIDAK')
		);
		$out = array_values($array);
		echo json_encode($out);
	}

	function ceksave()
	{
		$kd = trim($this->input->post('fs_kode_dokumen'));

		if (!empty($kd)) {
			$this->load->model('mMasterPendukung');
			$sSQL = $this->mMasterPendukung->checkDataPendukung($kd);
			if ($sSQL->num_rows() == 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Data Pendukung belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
			else if($sSQL->num_rows() == 1)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Data Pendukung sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Gagal simpan'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Data Pendukung tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$kd = trim($this->input->post('fs_kode_dokumen'));
		$jns = trim($this->input->post('fs_jenis_dokumen'));
		$jby = trim($this->input->post('fs_jenis_pembiayaan'));
		$nma = trim($this->input->post('fs_nama_dokumen'));
		$wjb = trim($this->input->post('fs_wajib'));

		$update = false;
		$this->load->model('mMasterPendukung');
		$sSQL = $this->mMasterPendukung->checkDataPendukung($kd);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_dokumen' => $kd,
						'fs_jenis_dokumen' => $jns,
						'fs_jenis_pembiayaan' => $jby,
						'fs_nama_dokumen' => $nma,
						'fs_wajib' => $wjb
					);
			$this->db->insert('tm_data_pendukung', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Data Pendukung Baru, Sukses!!'
					);
			echo json_encode($hasil);
		}
		else
		{
			$data2 = array(
						'fs_kode_dokumen' => $kd,
						'fs_jenis_dokumen' => $jns,
						'fs_jenis_pembiayaan' => $jby,
						'fs_nama_dokumen' => $nma,
						'fs_wajib' => $wjb
					);
			$where = "fs_kode_dokumen = '".trim($kd)."' 
						";
						$this->db->where($where);
			$this->db->update('tm_data_pendukung', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data Pendukung, Sukses!!'
					);
			echo json_encode($hasil);
		}

	}

}