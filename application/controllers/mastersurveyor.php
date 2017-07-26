<?php

class Mastersurveyor extends CI_Controller
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
			$this->load->view('vmastersurveyor');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function cb_aktif()
	{
		$array = array(
		  2 => array("1",'YA'),
		  4 => array("0",'TIDAK')
		);

		$out = array_values($array);
		echo json_encode($out);
	}

	function list()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterSurveyor');
		$sSQL = $this->mMasterSurveyor->listMasterAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterSurveyor->listMaster($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_aktif' => ascii_to_entities(trim($xRow->fs_aktif)),
					'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_kode_surveyor' => ascii_to_entities(trim($xRow->fs_kode_surveyor)),
					'fs_kode_surveyor_lama'	=> ascii_to_entities(trim($xRow->fs_kode_surveyor_lama)),
					'fs_nama_surveyor'	=> ascii_to_entities(trim($xRow->fs_nama_surveyor)),
					'fs_alamat_surveyor' => ascii_to_entities(trim($xRow->fs_alamat_surveyor)),
					'fs_ktp_surveyor' => ascii_to_entities(trim($xRow->fs_ktp_surveyor)),
					'fs_handphone_surveyor' => ascii_to_entities(trim($xRow->fs_handphone_surveyor))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function initial($sSurveyor)
	{
		$names = explode(' ', $sSurveyor);
		if (!empty($names[1])) {
			return $names[0][0].$names[0][1].$names[1][0];
		} else {
			return $names[0][0].$names[0][2].$names[0][1];
		}
		
	}

	function nilaidefa()
	{
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
		$hasil = array(
			'sukses'	=> true,
			'kode_cabang' => trim($kode_cabang)
		);
		echo json_encode($hasil);
	}

	function kodesurveyor($sSurveyor)
	{
		$names = explode(' ', $sSurveyor);
		if (!empty($names[1])) {
			return $names[0][0].$names[1][0].$names[0][1].$names[1][1].$names[0][2];
		} else {
			return $names[0][0].$names[0][2].$names[0][1].$names[0][4].$names[0][3];
		}
		
	}

	function ceksave()
	{
		$nama_surveyor = trim(strtoupper($this->input->post('fs_nama_surveyor')));
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));

		if ($nama_surveyor <> '')
		{
			if (strlen($nama_surveyor) >= 5) {
				$xkodesurveyor = $this->kodesurveyor($nama_surveyor);
				$this->load->model('mMasterSurveyor');
				$sSQL = $this->mMasterSurveyor->cekKode($xkodesurveyor, $kode_cabang);
				if ($sSQL->num_rows() == 0)
				{
					$hasil = array(
						'sukses'	=> true,
						'hasil'		=> 'lanjut'
					);
					echo json_encode($hasil);
				}
				else if($sSQL->num_rows() == 1)
				{
					$hasil = array(
						'sukses'	=> true,
						'hasil'		=> 'Nama Surveyor sudah ada, apakah Anda ingin meng-update?
						</br></br><*Simpan ulang tidak akan meng-update Kode Surveyor>'
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
						'sukses'	=> false,
						'hasil'		=> 'Nama surveyor, kurang dari 5 karakter'
					);
				echo json_encode($hasil);
			}
		}
		else 
		{
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Nama Surveyor tidak diketahui!'
					);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$aktif = trim($this->input->post('fs_aktif'));
		$nama_surveyor = trim($this->input->post('fs_nama_surveyor'));
		$alamat_surveyor = trim($this->input->post('fs_alamat_surveyor'));
		$ktp_surveyor = trim($this->input->post('fs_ktp_surveyor'));
		$handphone_surveyor = trim($this->input->post('fs_handphone_surveyor'));
		
		$initial = trim($this->input->post('fs_kode_surveyor2'));

		if (!empty($initial)) {
			$xinitial = $initial;
		} else {
			$xinitial = $this->initial($nama_surveyor);
		}

		$xkodesurveyor = $this->kodesurveyor($nama_surveyor);
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));

		$update = false;
		$this->load->model('mMasterSurveyor');
		$sSQL = $this->mMasterSurveyor->cekKode($xkodesurveyor, $kode_cabang);
		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_aktif' => $aktif,
						'fs_kode_cabang' => $kode_cabang,
						'fs_kode_surveyor' => strtoupper($xkodesurveyor),
						'fs_kode_surveyor_lama' => strtoupper($xinitial),
						'fs_nama_surveyor' => strtoupper($nama_surveyor),
						'fs_alamat_surveyor' => strtoupper($alamat_surveyor),
						'fs_ktp_surveyor' => $ktp_surveyor,
						'fs_handphone_surveyor' => $handphone_surveyor,
						'fs_iduser_buat' => trim($this->session->userdata('gUser')),
						'fd_tanggal_buat' => date('Y-m-d')
					);
			$this->db->insert('tm_surveyor', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Surveyor Baru, Sukses!! 
						<br> Kode Surveyor : "'.strtoupper($xkodesurveyor).'"'
					);
			echo json_encode($hasil);
		}
		else 
		{
			$data2 = array(
						'fs_aktif' => $aktif,
						'fs_kode_cabang' => $kode_cabang,
						'fs_kode_surveyor' => strtoupper($xkodesurveyor),
						'fs_kode_surveyor_lama' => strtoupper($xinitial),
						'fs_nama_surveyor' => strtoupper($nama_surveyor),
						'fs_alamat_surveyor' => strtoupper($alamat_surveyor),
						'fs_ktp_surveyor' => $ktp_surveyor,
						'fs_handphone_surveyor' => $handphone_surveyor,
						'fs_iduser_edit' => trim($this->session->userdata('gUser')),
						'fd_tanggal_edit' => date('Y-m-d')
					);
			$where = "fs_kode_surveyor = '".trim($xkodesurveyor)."' AND fs_kode_cabang = '".trim($kode_cabang)."'";
			$this->db->where($where);
			$this->db->update('tm_surveyor', $data2);
			$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Update, Kode Surveyor : "'.strtoupper($xkodesurveyor).'" Sukses!!'
				);
			echo json_encode($hasil);
		}
	}
}