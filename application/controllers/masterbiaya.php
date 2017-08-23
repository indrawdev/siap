<?php

class Masterbiaya extends CI_Controller
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
			$this->load->view('vmasterbiaya');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function gridadmin()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_piutang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$lm = trim($this->input->post('fd_lama_angsuran'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->listAdminAll($kd, $jns, $pl, $lm);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterBiaya->listAdmin($kd, $jns, $pl, $lm, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_jenis_piutang' => ascii_to_entities(trim($xRow->fs_jenis_piutang)),
					'fs_pola_transaksi' => ascii_to_entities(trim($xRow->fs_pola_transaksi)),
					'fd_lama_angsuran' => ascii_to_entities(trim($xRow->fd_lama_angsuran)),
					'fs_biaya_admin' => ascii_to_entities(trim($xRow->fs_biaya_admin))
				);
			}
		}	
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridfidusia()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_piutang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->listFidusiaAll($kd, $jns, $pl);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterBiaya->listFidusia($kd, $jns, $pl, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_jenis_piutang' => ascii_to_entities(trim($xRow->fs_jenis_piutang)),
					'fs_pola_transaksi' => ascii_to_entities(trim($xRow->fs_pola_transaksi)),
					'fs_min_otr' => ascii_to_entities(trim($xRow->fs_min_otr)),
					'fs_max_otr' => ascii_to_entities(trim($xRow->fs_max_otr)),
					'fs_biaya_fidusia' => ascii_to_entities(trim($xRow->fs_biaya_fidusia))
				);
			}
		}	
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridasuransi()
	{
		$kd = trim($this->input->post('fs_kode_asuransi'));
		$wil = trim($this->input->post('fs_wilayah_asuransi'));
		$jns = trim($this->input->post('fs_jenis_kendaraan'));
		$km = trim($this->input->post('fs_komersial'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->listAsuransiAll($kd, $wil, $jns, $km);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterBiaya->listAsuransi($kd, $wil, $jns, $km, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_asuransi' => ascii_to_entities(trim($xRow->fs_kode_asuransi)),
					'fs_wilayah_asuransi' => ascii_to_entities(trim($xRow->fs_wilayah_asuransi)),
					'fs_jenis_kendaraan' => ascii_to_entities(trim($xRow->fs_jenis_kendaraan)),
					'fs_komersial' => ascii_to_entities(trim($xRow->fs_komersial)),
					'fs_min_otr' => ascii_to_entities(trim($xRow->fs_min_otr)),
					'fs_max_otr' => ascii_to_entities(trim($xRow->fs_max_otr)),
					'fs_persentase_premi' => ascii_to_entities(trim($xRow->fs_persentase_premi))
				);
			}
		}	
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridperluasan()
	{
		$kd = trim($this->input->post('fs_kode_asuransi'));
		$wil = trim($this->input->post('fs_wilayah_asuransi'));
		$per = trim($this->input->post('fs_perluasan'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->listPerluasanAll($kd, $wil, $per);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterBiaya->listPerluasan($kd, $wil, $per, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_asuransi' => ascii_to_entities(trim($xRow->fs_kode_asuransi)),
					'fs_wilayah_asuransi' => ascii_to_entities(trim($xRow->fs_wilayah_asuransi)),
					'fs_perluasan' => ascii_to_entities(trim($xRow->fs_perluasan)),
					'fs_rate_kontribusi' => ascii_to_entities(trim($xRow->fs_rate_kontribusi))
				);
			}
		}	
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridtjh()
	{
		$jns = trim($this->input->post('fs_jenis_kendaraan'));

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->listTjhAll($jns);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterBiaya->listTjh($jns, $nStart, $nLimit);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_jenis_kendaraan' => ascii_to_entities(trim($xRow->fs_jenis_kendaraan)),
					'fs_min_otr' => ascii_to_entities(trim($xRow->fs_min_otr)),
					'fs_max_otr' => ascii_to_entities(trim($xRow->fs_max_otr)),
					'fs_rate_tjh' => ascii_to_entities(trim($xRow->fs_rate_tjh))
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
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->listCabangAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterBiaya->listCabang($cari, $nStart, $nLimit);
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
		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->ambilReferensi($cari, $nStart, $nLimit);
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

	function cb_komersil()
	{
		$array = array(
		  2 => array("Y",'YA'),
		  4 => array("T",'TIDAK')
		);

		$out = array_values($array);
		echo json_encode($out);
	}

	function cb_tenor()
	{
		$array = array(
			2 => array("12",'12'),
			4 => array("24",'24'),
			6 => array("36", '36'),
			8 => array("48", '48')
		);

		$out = array_values($array);
		echo json_encode($out);
	}

	function ceksaveadmin()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_piutang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$lm = trim($this->input->post('fd_lama_angsuran'));

		if (!empty($kd) && !empty($jns) && !empty($pl) && !empty($lm)) {
			$this->load->model('mMasterBiaya');
			$sSQL = $this->mMasterBiaya->checkBiayaAdmin($kd, $jns, $pl, $lm);

			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Biaya Admin sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Biaya Admin belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Biaya Admin tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function saveadmin()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_piutang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$lm = trim($this->input->post('fd_lama_angsuran'));
		$ba = trim($this->input->post('fs_biaya_admin'));

		$update = false;

		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->checkBiayaAdmin($kd, $jns, $pl, $lm);
		
		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_cabang' => $kd,
						'fs_jenis_piutang' => $jns,
						'fs_pola_transaksi' => $pl,
						'fd_lama_angsuran' => $lm,
						'fs_biaya_admin' => $ba,
						'fs_iduser_buat' => trim($this->session->userdata('gUser')),
						'fd_tanggal_buat' => date('Y-m-d'),
					);
			$this->db->insert('tm_biaya_admin', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Biaya Admin Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$data2 = array(
						'fs_kode_cabang' => $kd,
						'fs_jenis_piutang' => $jns,
						'fs_pola_transaksi' => $pl,
						'fd_lama_angsuran' => $lm,
						'fs_biaya_admin' => $ba,
						'fs_iduser_edit' => trim($this->session->userdata('gUser')),
						'fd_tanggal_edit' => date('Y-m-d')
					);
			$where = "fs_kode_cabang = '".trim($kd)."' 
						AND fs_jenis_piutang = '".trim($jns)."' 
						AND fs_pola_transaksi = '".trim($pl)."'
						AND fd_lama_angsuran = '".trim($lm)."'
						";
			$this->db->where($where);
			$this->db->update('tm_biaya_admin', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Biaya Admin, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	function ceksavefidusia()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_piutang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$min = trim($this->input->post('fs_min_otr'));
		$max = trim($this->input->post('fs_max_otr'));

		if (!empty($kd) && !empty($jns) && !empty($pl) && !empty($min) && !empty($max)) {
			$this->load->model('mMasterBiaya');
			$sSQL = $this->mMasterBiaya->checkBiayaFidusia($kd, $jns, $pl, $min, $max);

			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Biaya Fidusia sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Biaya Fidusia belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Biaya Fidusia tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function savefidusia()
	{
		$kd = trim($this->input->post('fs_kode_cabang'));
		$jns = trim($this->input->post('fs_jenis_piutang'));
		$pl = trim($this->input->post('fs_pola_transaksi'));
		$min = trim($this->input->post('fs_min_otr'));
		$max = trim($this->input->post('fs_max_otr'));
		$bif = trim($this->input->post('fs_biaya_fidusia'));
		
		$update = false;

		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->checkBiayaFidusia($kd, $jns, $pl, $min, $max);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_cabang' => $kd,
						'fs_jenis_piutang' => $jns,
						'fs_pola_transaksi' => $pl,
						'fs_min_otr' => $min,
						'fs_max_otr' => $max,
						'fs_biaya_fidusia' => $bif,
						'fs_iduser_buat' => trim($this->session->userdata('gUser')),
						'fd_tanggal_buat' => date('Y-m-d')
					);
			$this->db->insert('tm_biaya_fidusia', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Biaya Fidusia Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$data2 = array(
						'fs_kode_cabang' => $kd,
						'fs_jenis_piutang' => $jns,
						'fs_pola_transaksi' => $pl,
						'fs_min_otr' => $min,
						'fs_max_otr' => $max,
						'fs_biaya_fidusia' => $bif,
						'fs_iduser_edit' => trim($this->session->userdata('gUser')),
						'fd_tanggal_edit' => date('Y-m-d')
					);
			$where = "fs_kode_cabang = '".trim($kd)."' 
						AND fs_jenis_piutang = '".trim($jns)."' 
						AND fs_pola_transaksi = '".trim($pl)."'
						AND fs_min_otr = '".trim($min)."'
						AND fs_max_otr = '".trim($max)."'
						AND fs_biaya_fidusia = '".trim($bif)."'
						";
			$this->db->where($where);
			$this->db->update('tm_biaya_fidusia', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Biaya Fidusia, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	function ceksaveasuransi()
	{
		$kd = trim($this->input->post('fs_kode_asuransi'));
		$wil = trim($this->input->post('fs_wilayah_asuransi'));
		$jns = trim($this->input->post('fs_jenis_kendaraan'));
		$kom = trim($this->input->post('fs_komersial'));
		$min = trim($this->input->post('fs_min_otr'));
		$max = trim($this->input->post('fs_max_otr'));

		if (!empty($kd) && !empty($wil) && !empty($jns) && !empty($kom) && !empty($min) && !empty($max)) {
			$this->load->model('mMasterBiaya');
			$sSQL = $this->mMasterBiaya->checkBiayaAsuransi($kd, $wil, $jns, $kom, $min, $max);

			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Biaya Asuransi sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Biaya Asuransi belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Biaya Asuransi tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function saveasuransi()
	{
		$kd = trim($this->input->post('fs_kode_asuransi'));
		$wil = trim($this->input->post('fs_wilayah_asuransi'));
		$jns = trim($this->input->post('fs_jenis_kendaraan'));
		$kom = trim($this->input->post('fs_komersial'));
		$min = trim($this->input->post('fs_min_otr'));
		$max = trim($this->input->post('fs_max_otr'));
		$per = trim($this->input->post('fs_persentase_premi'));

		$update = false;

		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->checkBiayaAsuransi($kd, $wil, $jns, $kom, $min, $max);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_asuransi' => $kd,
						'fs_wilayah_asuransi' => $wil,
						'fs_jenis_kendaraan' => $jns,
						'fs_komersial' => $kom,
						'fs_min_otr' => $min,
						'fs_max_otr' => $max,
						'fs_persentase_premi' => $per,
						'fs_iduser_buat' => trim($this->session->userdata('gUser')),
						'fd_tanggal_buat' => date('Y-m-d')
					);
			$this->db->insert('tm_biaya_asuransi', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Biaya Asuransi Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else { 
			$data2 = array(
						'fs_kode_asuransi' => $kd,
						'fs_wilayah_asuransi' => $wil,
						'fs_jenis_kendaraan' => $jns,
						'fs_komersial' => $kom,
						'fs_min_otr' => $min,
						'fs_max_otr' => $max,
						'fs_persentase_premi' => $per,
						'fs_iduser_edit' => trim($this->session->userdata('gUser')),
						'fd_tanggal_edit' => date('Y-m-d')
					);
			$where = "fs_kode_asuransi = '".trim($kd)."' 
						AND fs_wilayah_asuransi = '".trim($wil)."' 
						AND fs_jenis_kendaraan = '".trim($jns)."' 
						AND fs_komersial = '".trim($kom)."' 
						AND fs_min_otr = '".trim($min)."'
						AND fs_max_otr = '".trim($max)."'
						";
			$this->db->where($where);
			$this->db->update('tm_biaya_asuransi', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Biaya Asuransi, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	function ceksaveperluasan()
	{
		$kd = trim($this->input->post('fs_kode_asuransi'));
		$wil = trim($this->input->post('fs_wilayah_asuransi'));
		$per = trim($this->input->post('fs_perluasan'));

		if (!empty($kd) && !empty($wil) && !empty($per)) {
			$this->load->model('mMasterBiaya');
			$sSQL = $this->mMasterBiaya->checkBiayaPerluasan($kd, $wil, $per);

			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
					'sukses' => true,
					'hasil'	=> 'Biaya Perluasan sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else 
			{
				$hasil = array(
					'sukses' => true,
					'hasil'	=> 'Biaya Perluasan belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Biaya Perluasan tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function saveperluasan()
	{
		$kd = trim($this->input->post('fs_kode_asuransi'));
		$wil = trim($this->input->post('fs_wilayah_asuransi'));
		$per = trim($this->input->post('fs_perluasan'));
		$rat = trim($this->input->post('fs_rate_kontribusi'));

		$update = false;

		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->checkBiayaPerluasan($kd, $wil, $per);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_kode_asuransi' => $kd,
						'fs_wilayah_asuransi' => $wil,
						'fs_perluasan' => $per,
						'fs_rate_kontribusi' => $rat
					);
			$this->db->insert('tm_biaya_perluasan', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Biaya Perluasan Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$data2 = array(
						'fs_kode_asuransi' => $kd,
						'fs_wilayah_asuransi' => $wil,
						'fs_perluasan' => $per,
						'fs_rate_kontribusi' => $rat
					);
			$where = "fs_kode_asuransi = '".trim($kd)."' 
						AND fs_wilayah_asuransi = '".trim($wil)."' 
						AND fs_perluasan = '".trim($per)."' 
						";
			$this->db->where($where);
			$this->db->update('tm_biaya_perluasan', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Biaya Perluasan, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	function ceksavetjh()
	{
		$jns = trim($this->input->post('fs_jenis_kendaraan'));
		$min = trim($this->input->post('fs_min_otr'));
		$max = trim($this->input->post('fs_max_otr'));

		if (!empty($jns) && !empty($min) && !empty($max)) {
			$this->load->model('mMasterBiaya');
			$sSQL = $this->mMasterBiaya->checkBiayaTJH($jns, $min, $max);

			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
					'sukses' => true,
					'hasil'	=> 'Biaya TJH sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			}
			else
			{
				$hasil = array(
					'sukses' => true,
					'hasil'	=> 'Biaya TJH belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Biaya TJH tidak diketahui!!'
					);
			echo json_encode($hasil);
		}
	}

	function savetjh()
	{
		$jns = trim($this->input->post('fs_jenis_kendaraan'));
		$min = trim($this->input->post('fs_min_otr'));
		$max = trim($this->input->post('fs_max_otr'));
		$rat = trim($this->input->post('fs_rate_tjh'));

		$update = false;

		$this->load->model('mMasterBiaya');
		$sSQL = $this->mMasterBiaya->checkBiayaTJH($jns, $min, $max);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
						'fs_jenis_kendaraan' => $jns,
						'fs_min_otr' => $min,
						'fs_max_otr' => $max,
						'fs_rate_tjh' => $rat
					);
			$this->db->insert('tm_biaya_tjh', $data1);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Biaya TJH Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$data2 = array(
						'fs_jenis_kendaraan' => $jns,
						'fs_min_otr' => $min,
						'fs_max_otr' => $max,
						'fs_rate_tjh' => $rat
					);
			$where = "fs_jenis_kendaraan = '".trim($jns)."' 
						AND fs_min_otr = '".trim($min)."' 
						AND fs_max_otr = '".trim($max)."' 
						";
			$this->db->where($where);
			$this->db->update('tm_biaya_tjh', $data2);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Biaya TJH, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}
} 