<?php

class Group extends CI_Controller
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
			$this->load->view('vgroup');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function nobacth()
	{
		$kdcabang = trim($this->session->userdata('gKodeCabang'));
		$this->load->model('mGroup');
		$b = $this->mGroup->getbatch($kdcabang)->row();
		return $b->fn_counter;
	}

	function gridgroup()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$fleet = trim($this->input->post('fs_fleet'));

		$this->db->query(NOLOCK);
		$this->load->model('mGroup');

		$sSQL = $this->mGroup->listgroupAll($cari, $fleet);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mGroup->listgroup($cari,$nStart,$nLimit,$fleet);
		$this->db->query(NOLOCK2);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_jenis' => ascii_to_entities(trim($xRow->fs_jenis)),
						'fs_npwp_konsumen' => ascii_to_entities(trim($xRow->fs_npwp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridungroup()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$fleet = trim($this->input->post('fs_fleet'));
		$this->db->query(NOLOCK);
		$this->load->model('mGroup');

		$sSQL = $this->mGroup->listungroupAll($cari, $fleet);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mGroup->listungroup($cari,$nStart,$nLimit,$fleet);
		$this->db->query(NOLOCK2);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fn_no_batch' => ascii_to_entities(trim($xRow->fn_no_batch)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function detailgrid()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$cari = '';

		$nBatch = trim($this->input->post('fn_no_batch'));
		$this->db->query(NOLOCK);
		$this->load->model('mGroup');
		
		$sSQL = $this->mGroup->listdetailAll($cari, $nBatch);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mGroup->listdetail($cari, $nStart, $nLimit, $nBatch);
		$this->db->query(NOLOCK2);
		$xArr = array();

		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fn_no_apk' => ascii_to_entities(trim($xRow->fn_no_apk)),
						'fn_no_batch' => ascii_to_entities(trim($xRow->fn_no_batch)),
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->fs_nama_konsumen)),
						'fd_tgl_apk' => ascii_to_entities(trim($xRow->fd_tgl_apk)),
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function ceksavegroup()
	{
		$is_noapk = trim($this->input->post('is_noapk'));
		
		$is_jns = explode('|', trim($this->input->post('fs_jenis_pembiayaan')));
		$is_ktp = explode('|', trim($this->input->post('fs_ktp_konsumen')));
		$is_npwp = explode('|', trim($this->input->post('fs_npwp_konsumen')));
		
		if ($this->session->userdata('gKodeCabang') != '00')
		{
			$arr_jns = count(array_unique($is_jns)) - 1;
			$arr_ktp = count(array_unique($is_ktp)) - 1;
			$arr_npwp = count(array_unique($is_npwp)) - 1;

			if ($arr_jns == 1) 
			{
				$split = array_unique($is_jns);
				if ($split[1] == 'P' || $split[1] == 'W')
				{
					if ($arr_ktp == 1)
					{
						$hasil = array(
									'sukses' => true,
									'hasil'	 => 'Saving '.$is_noapk. ' Record No. PJJ',
									);
						echo json_encode($hasil);
					}
					else
					{
						$hasil = array(
									'sukses'	=> false,
									'hasil'		=> 'Nomor KTP tidak sama'
									);
						echo json_encode($hasil);
					}
				}
				else
				{
					if ($arr_npwp == 1)
					{
						$hasil = array(
									'sukses' => true,
									'hasil'	 => 'Saving '.$is_noapk. ' Record No. PJJ',
									);
						echo json_encode($hasil);
					}
					else
					{
						$hasil = array(
									'sukses'	=> false,
									'hasil'		=> 'Nomor NPWP tidak sama'
								);
						echo json_encode($hasil);
					}
				}
			}
			else 
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Jenis Pembiayaan Konsumen, Tidak Sama<br>
									<*Silakan coba pilih kembali, dengan konsumen yang sama>'
				);
				echo json_encode($hasil);
			}
		}
		else
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Grouping, Failed as Head Office'
			);
			echo json_encode($hasil);
		}
		
	}

	function savegroup()
	{
		$kdcabang = explode('|', trim($this->input->post('fs_kode_cabang')));
		$nopjj = explode('|', trim($this->input->post('fs_pjj')));
		$noapk = explode('|', trim($this->input->post('fn_no_apk')));
		$batch = $this->nobacth();

		$this->load->model('mGroup','',true);
		$jml = count($nopjj) - 1;
		$batch = $batch + 1;
		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{
				$data = array(
						'fn_no_batch' => $batch
					);
				$where = "fn_no_apk = '".trim($noapk[$i])."' 
							AND fs_kode_cabang = '".trim($kdcabang[$i])."'";
				$this->db->where($where);
				$this->db->update('tx_apk', $data);
			}
		}

		
		$data2 = array(
				'fn_counter' => $batch
			);
		$where2 = "fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."' 
					AND fs_jenis_counter = 'BATCH'";
		$this->db->where($where2);
		$this->db->update('tm_counter', $data2);

		$hasil = array(
			'sukses'	=> true,
			'hasil'		=> 'Grouping Success',
		);
		echo json_encode($hasil);
	}

	function ceksaveungroup()
	{
		$is_nobatch = trim($this->input->post('is_nobatch'));
		
		if ($this->session->userdata('gKodeCabang') != '00')
		{
			if (trim($is_nobatch) <> 0)
			{
				$hasil = array(
					'sukses'	=> true,
					'hasil'		=> 'UnGroup '.$is_nobatch. ' Record No. Batch',
				);
				echo json_encode($hasil);
			}
			else
			{
				$hasil = array(
					'sukses'	=> false,
					'hasil'		=> 'UnGrouping Failed'
				);
				echo json_encode($hasil);
			}
		} 
		else 
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'UnGrouping Failed as Head Office'
			);
			echo json_encode($hasil);
		}

	}

	function saveungroup()
	{
		$kdcabang = explode('|', trim($this->input->post('fs_kode_cabang')));
		$nobacth = explode('|', trim($this->input->post('fn_no_batch')));

		$this->load->model('mGroup','',true);
		$jml = count($nobacth) - 1;

		if ($jml != 0)
		{
			for ($i=1; $i<=$jml; $i++)
			{
				$data = array(
						'fn_no_batch' => NULL
					);
				$where = "fn_no_batch = '".trim($nobacth[$i])."' 
							AND fs_kode_cabang = '".trim($kdcabang[$i])."'";
				$this->db->where($where);
				$this->db->update('tx_apk', $data);
			}
		}
		$hasil = array(
			'sukses'	=> true,
			'hasil'		=> 'UnGrouping Success',
		);
		echo json_encode($hasil);
	}
}