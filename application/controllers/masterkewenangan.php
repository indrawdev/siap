<?php

class Masterkewenangan extends CI_Controller
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
			$this->load->view('vmasterkewenangan');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function grid()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$pla = trim($this->input->post('fn_maks_plafon'));
		$scr = trim($this->input->post('fs_maks_score'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterKewenangan');
		$sSQL = $this->mMasterKewenangan->listAll($kd, $pl, $pla, $scr);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterKewenangan->list($kd, $pl, $pla, $scr, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
							'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
							'fs_pola_transaksi' => ascii_to_entities(trim($xRow->fs_pola_transaksi)),
							'fn_maks_plafon' => ascii_to_entities(trim($xRow->fn_maks_plafon)),
							'fs_maks_score' => ascii_to_entities(trim($xRow->fs_maks_score))
						);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridcabang()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mMasterKewenangan');
		$sSQL = $this->mMasterKewenangan->listCabangAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterKewenangan->listCabang($cari, $nStart, $nLimit);
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

	function cb_referensi()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterKewenangan');
		$sSQL = $this->mMasterKewenangan->ambilReferensi($cari, $nStart, $nLimit);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_strx' => ascii_to_entities(trim($xRow->fs_nilai1_referensi)),
					'fs_nm_strx' => ascii_to_entities(trim($xRow->fs_nilai1_referensi)),
					'fs_xx_strx' => ascii_to_entities(trim($xRow->fs_nama_referensi))
				);
			}
		}
		echo json_encode($xArr);
	}

	function ceksave()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$pla = trim($this->input->post('fn_maks_plafon'));

		if (!empty($kd) && !empty($pl) && !empty($pla)) {
			$this->load->model('mMasterKewenangan');
			$sSQL = $this->mMasterKewenangan->checkKewenangan($kd, $pl, $pla);

			if ($sSQL->num_rows() == 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Kewenangan belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
			else if($sSQL->num_rows() == 1)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Kewenangan sudah ada, apakah Anda ingin meng-update?'
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
						'hasil' => 'Simpan Gagal, Kewenangan tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$pla = trim($this->input->post('fn_maks_plafon'));
		$scr = trim($this->input->post('fs_maks_score'));

		$update = false;

		$this->load->model('mMasterKewenangan');
		$sSQL = $this->mMasterKewenangan->checkKewenangan($kd, $pl, $pla);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_cabang' => $kd,
						'fs_pola_transaksi' => $pl,
						'fn_maks_plafon' => $pla,
						'fs_maks_score' => strtoupper($scr),
						'fs_iduser_buat' => trim($this->session->userdata('gUser')),
						'fd_tanggal_buat' => date('Y-m-d')
					);
			$this->db->insert('tm_kewenangan', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Kewenangan Baru, Sukses!!'
					);
			echo json_encode($hasil);
		}
		else 
		{
			$data2 = array(
						'fs_kode_cabang' => $kd,
						'fs_pola_transaksi' => $pl,
						'fn_maks_plafon' => $pla,
						'fs_maks_score' => strtoupper($scr),
						'fs_iduser_edit' => trim($this->session->userdata('gUser')),
						'fd_tanggal_edit' => date('Y-m-d')
					);
			$where = "fs_kode_cabang = '".trim($kd)."' 
						AND fs_pola_transaksi = '".trim($pl)."' 
						AND fn_maks_plafon = '".trim($pla)."'
						";
			$this->db->where($where);
			$this->db->update('tm_kewenangan', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Kewenangan, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}
}