<?php

class InputSurvey extends CI_Controller
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
			$this->load->view('vinputsurvey');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function cb_lingkungan()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->ambilReferensi($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_strx' => ascii_to_entities(trim($xRow->fs_nilai1_referensi)),
					'fs_nm_strx' => ascii_to_entities(trim($xRow->fs_nama_referensi))
					);
			}
		}
		echo json_encode($xArr);
		
	}

	function cb_garasi()
	{
		$array = array(
		  2 => array("Y",'YA'),
		  4 => array("T",'TIDAK')
		);

		$out = array_values($array);
		echo json_encode($out);
	}

	function cb_kantor()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->ambilReferensi($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_strx' => ascii_to_entities(trim($xRow->fs_nilai1_referensi)),
					'fs_nm_strx' => ascii_to_entities(trim($xRow->fs_nama_referensi))
					);
			}
		}
		echo json_encode($xArr);
	}

	function gridretail()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_flag_survey'));

		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->listRetailAll($cari, $sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mInputSurvey->listRetail($cari, $nStart, $nLimit, $sFlag);
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
						'fs_alamat_konsumen' => ascii_to_entities(trim($xRow->fs_alamat_konsumen)),
						'fs_kelurahan_konsumen' => ascii_to_entities(trim($xRow->fs_kelurahan_konsumen)),
						'fs_kecamatan_konsumen' => ascii_to_entities(trim($xRow->fs_kecamatan_konsumen)),
						'fs_kota_konsumen' => ascii_to_entities(trim($xRow->fs_kota_konsumen)),
						'fs_kodepos_konsumen' => ascii_to_entities(trim($xRow->fs_kodepos_konsumen)),
						'fs_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_ktp_konsumen)),
						'fs_masa_ktp_konsumen' => ascii_to_entities(trim($xRow->fs_masa_ktp_konsumen)),
						'fs_telepon_konsumen' => ascii_to_entities(trim($xRow->fs_telepon_konsumen)),
						'fs_handphone_konsumen' => ascii_to_entities(trim($xRow->fs_handphone_konsumen)),
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function gridfleet()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$sFlag = trim($this->input->post('fs_flag_survey'));

		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->listFleetAll($cari, $sFlag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mInputSurvey->listFleet($cari, $nStart, $nLimit, $sFlag);
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
						'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	function gridkonsumen()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$flag = trim($this->input->post('fs_flag_survey'));
		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->listKonsumenAll($cari,$flag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mInputSurvey->listKonsumen($cari,$nStart,$nLimit,$flag);
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

	function gridsurveyor()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->listSurveyorAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mInputSurvey->listSurveyor($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fs_kode_surveyor'		=> ascii_to_entities(trim($xRow->fs_kode_surveyor)),
						'fs_kode_surveyor_lama'	=> ascii_to_entities(trim($xRow->fs_kode_surveyor_lama)),
						'fs_nama_surveyor'	=> ascii_to_entities(trim($xRow->fs_nama_surveyor)),
						'fs_alamat_surveyor'	=> ascii_to_entities(trim($xRow->fs_alamat_surveyor)),
						'fs_ktp_surveyor'	=> ascii_to_entities(trim($xRow->fs_ktp_surveyor))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function apkpendukung()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$cari = trim($this->input->post('fs_cari'));

		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));
		$this->load->model('mInputSurvey');
		if ($noapk <> '')
		{
			$this->db->query(NOLOCK);
			$sSQL = $this->mInputSurvey->apkPendukungAll($noapk, $cari);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->mInputSurvey->apkPendukung($noapk,$cari,$nStart,$nLimit);
			$this->db->query(NOLOCK2);
			$xArr = array();
			if ($sSQL->num_rows() > 0)
			{
				foreach ($sSQL->result() as $xRow)
				{
					$xArr[] = array(
						'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
						'fs_nama_dokumen' => ascii_to_entities(trim($xRow->fs_nama_dokumen)),
						'fs_dokumen_upload' => ascii_to_entities(trim($xRow->fs_dokumen_upload)),
						'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
						'fs_wajib' => ascii_to_entities(trim($xRow->wajib)),
						'fs_iduser_buat' => ascii_to_entities(trim($xRow->fs_iduser_buat)),
						'fd_tanggal_buat' => ascii_to_entities(trim($xRow->fd_tanggal_buat))
					);
				}
			}
		}
		else if ($nobatch <> '')
		{
			$xnoapk = $this->mInputSurvey->listdetail($nobatch);
			foreach ($xnoapk->result() as $row) {
				$this->db->query(NOLOCK);
				$sSQL = $this->mInputSurvey->apkPendukungAll($row->fn_no_apk, $cari);
				$xTotal = $sSQL->num_rows();
				$sSQL = $this->mInputSurvey->apkPendukung($row->fn_no_apk,$cari,$nStart,$nLimit);
				$this->db->query(NOLOCK2);
				$xArr = array();
				if ($sSQL->num_rows() > 0)
				{
					foreach ($sSQL->result() as $xRow)
					{
						$xArr[] = array(
							'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
							'fs_nama_dokumen' => ascii_to_entities(trim($xRow->fs_nama_dokumen)),
							'fs_dokumen_upload' => ascii_to_entities(trim($xRow->fs_dokumen_upload)),
							'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
							'fs_wajib' => ascii_to_entities(trim($xRow->wajib)),
							'fs_iduser_buat' => ascii_to_entities(trim($xRow->fs_iduser_buat)),
							'fd_tanggal_buat' => ascii_to_entities(trim($xRow->fd_tanggal_buat))
						);
					}
				}
			}

		}
		else {
			$xTotal = 0;
			$xArr = array();
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function datapendukung()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->dataPendukungAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mInputSurvey->dataPendukung($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{	
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_dokumen' => ascii_to_entities(trim($xRow->fs_kode_dokumen)),
					'fs_jenis_pembiayaan' => ascii_to_entities(trim($xRow->fs_jenis_pembiayaan)),
					'fs_nama_dokumen' => ascii_to_entities(trim($xRow->fs_nama_dokumen)),
					'fs_wajib' => ascii_to_entities(trim($xRow->wajib)) 
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function griddetil()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		$flag = trim($this->input->post('fs_flag_survey'));
		$this->db->query(NOLOCK);
		$this->load->model('mInputSurvey');
		$sSQL = $this->mInputSurvey->listHasilSurveyAll($cari,$flag);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mInputSurvey->listHasilSurvey($cari,$nStart,$nLimit,$flag);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$pjj = $xRow->fs_kode_lokasi.$xRow->fs_nomor_dealer.$xRow->fs_nomor_dealer.$xRow->fs_jenis_piutang.$xRow->fs_pola_transaksi.$xRow->fn_nomor_perjanjian;
				$xArr[] = array(
						'fs_pjj' => ascii_to_entities(trim($pjj)),
						'fd_tanggal_survey' => ascii_to_entities(trim($xRow->tanggal_survey)),
						'fs_nama_konsumen' => ascii_to_entities(trim($xRow->nama_konsumen)),
						'fs_petugas_survey' => ascii_to_entities(trim($xRow->petugas_survey)),
						'fn_lama_survey' => ascii_to_entities(trim($xRow->lama_survey)),
						'fs_kondisi_lingkungan' => ascii_to_entities(trim($xRow->kondisi_lingkungan)),
						'fn_jumlah_kendaraan' => ascii_to_entities(trim($xRow->jumlah_kendaraan)),
						'fs_garasi' => ascii_to_entities(trim($xRow->garasi)),
						'fs_kondisi_kantor' => ascii_to_entities(trim($xRow->kondisi_kantor)),
						'fs_catatan_tempat_tinggal' => ascii_to_entities(trim($xRow->catatan_tempat_tinggal)),
						'fs_catatan_lingkungan' => ascii_to_entities(trim($xRow->catatan_lingkungan)),
						'fs_catatan_tempat_usaha' => ascii_to_entities(trim($xRow->catatan_tempat_usaha))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function uploadfile()
	{
		if(!empty($_FILES['fileDoc']['name']))
		{
			$config['upload_path'] = './uploads/';
			$config['max_size'] = 1000;
			$config['allowed_types'] = 'gif|jpg|jpeg|png';
			$config['file_name'] = $_FILES['fileDoc']['name'];
			$config['encrypt_name'] = TRUE;

			$this->load->library('upload', $config);
			$this->upload->initialize($config);
			
			if ($this->upload->do_upload('fileDoc'))
			{

				$uploadData = $this->upload->data();
				$file = $uploadData['file_name'];

				$kdcabang = trim($this->input->post('txtKdCabang'));
				$noapk = trim($this->input->post('txtNoApk'));
				$nobatch = trim($this->input->post('txtNoBatch'));
				$kodedoc = trim($this->input->post('cboKodeDoc'));
				$jnspmb = trim($this->input->post('txtJnsPembiayaan'));

				if ($noapk <> '')
				{
					$this->load->model('mInputSurvey');
					$sSQL = $this->mInputSurvey->checkDataPendukung($noapk, $kodedoc, $kdcabang);
					if ($sSQL->num_rows() > 0)
					{
						$response = array(
								  		'success' => false, 
								  		'msg' => 'Dokumen yang sama sudah di Upload !!'
								  	);
						echo json_encode($response);
						unlink('uploads/'. $file);
					}
					else
					{
						$insert = array(
							'fs_kode_cabang' => $kdcabang,
							'fs_jenis_pembiayaan' => $jnspmb,
							'fn_no_apk' => $noapk,
							'fs_kode_dokumen' => $kodedoc,
							'fs_dokumen_upload' => $file,
							'fs_iduser_buat' => trim($this->session->userdata('gUser')),
							'fd_tanggal_buat' => trim(date('Y-m-d'))
						);
						$exec = $this->db->insert('tx_apk_data_pendukung', $insert);
						
						if ($exec) {
							$response = array(
											'success' => true, 
								    		'data' => array(
								    				'name' => $file),
								    		'msg' => 'File Uploaded successfully'
										);
							echo json_encode($response);
						}
						else {
							$response = array(
								  			'success' => false, 
								  			'msg' => 'Gagal'
								  		);
							echo json_encode($response);
						}
					}
				}
				else if ($nobatch <> '')
				{
					$this->db->query(NOLOCK);
					$this->load->model('mInputSurvey');
					$xnoapk = $this->mInputSurvey->listdetail($nobatch);
					foreach ($xnoapk->result() as $row) {

						$sSQL = $this->mInputSurvey->checkDataPendukung($row->fn_no_apk, $kodedoc, $kdcabang);
						if ($sSQL->num_rows() > 0)
						{
							$response = array(
									  		'success' => false, 
									  		'msg' => 'Dokumen yang sama sudah di Upload !!'
									  	);
							echo json_encode($response);
							unlink('uploads/'. $file);

							return false;
						}
						else
						{
							$insert2 = array(
								'fs_kode_cabang' => $kdcabang,
								'fs_jenis_pembiayaan' => $jnspmb,
								'fn_no_apk' => $row->fn_no_apk,
								'fs_kode_dokumen' => $kodedoc,
								'fs_dokumen_upload' => $file,
								'fs_iduser_buat' => trim($this->session->userdata('gUser')),
								'fd_tanggal_buat' => trim(date('Y-m-d'))
							);
							$exec2 = $this->db->insert('tx_apk_data_pendukung', $insert2);
						}
						
					}
					if ($exec2) {
						$response = array(
									'success' => true, 
								    'data' => array(
								    			'name' => $file),
								    'msg' => 'File Uploaded successfully'
									);
						echo json_encode($response);
					}
					else {
						$response = array(
								  	'success' => false, 
								  	'msg' => 'Gagal'
								  	);
						echo json_encode($response);
					}
				}
				else {
					$response = array(
							  		'success' => false, 
							  		'msg' => 'Konsumen belum dipilih'
							  	);
					echo json_encode($response);
				}
			}
			else
			{
				$response = array(
							  'success' => false, 
							  'msg' => $this->upload->display_errors()
							);
				echo json_encode($response);
			}
		}
	}

	function remove()
	{
		$dokupload = trim($this->input->post('fs_dokumen_upload'));

		if ($dokupload <> '') {
			
			$this->load->model('mInputSurvey');
			$sSQL = $this->mInputSurvey->checkDeleteFile($dokupload);

			if ($sSQL->num_rows() > 0)
			{
				$hasil = array(
							'sukses' => false, 
							'hasil' => 'Data Pendukung sudah tidak bisa dihapus!'
						);
				echo json_encode($hasil);
			}
			else 
			{
				// detele record
				$where = "fs_dokumen_upload = '".trim($dokupload)."'";
				$this->db->where($where);
				$this->db->delete('tx_apk_data_pendukung');
				
				// remove file
				unlink('uploads/'. $dokupload);
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Data Pendukung dihapus!'
					);
				echo json_encode($hasil);	
			}
		}
	}

	function removeAll() 
	{
		$apkfile = $this->input->post('apk_file');
		
		if ($apkfile <> '')
		{
			$this->db->select('fs_dokumen_upload');
			$this->db->from('tx_apk_data_pendukung');
			$where = "fn_no_apk = '".trim($apkfile)."'";
			$this->db->where($where);
			$query = $this->db->get();
			foreach ($query->result() as $row)
			{
				$filename = $row->fs_dokumen_upload;
				// remove files
				unlink('uploads/'. $filename);
				// detele record
				$where2 = "fs_dokumen_upload = '".trim($filename)."'";
				$this->db->where($where2);
				$this->db->delete('tx_apk_data_pendukung');

			}
			$hasil = array(
				'sukses' => true,
				'hasil' => 'Deleted'
			);
			echo json_encode($hasil);
		}
	}

	function ceksave()
	{
		$noapk = trim($this->input->post('fn_no_apk'));
		$nobatch = trim($this->input->post('fn_no_batch'));

		if (trim($noapk) <> '')
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'lanjut'
			);
			echo json_encode($hasil);
		}
		else if (trim($nobatch) <> '')
		{
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'lanjut'
			);
			echo json_encode($hasil);
		}
		else 
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Saving Failed'
			);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$tanggal = trim($this->input->post('fd_tanggal_survey'));
		$petugas = trim($this->input->post('fs_petugas_survey'));
		$lama = trim($this->input->post('fn_lama_survey'));
		$lingkungan = trim($this->input->post('fs_kondisi_lingkungan'));
		$jumlah = trim($this->input->post('fn_jumlah_kendaraan'));
		$garasi = trim($this->input->post('fs_garasi'));
		$kantor = trim($this->input->post('fs_kondisi_kantor'));
		$cttinggal = $this->input->post('fs_catatan_tempat_tinggal');
		$ctlinkungan = $this->input->post('fs_catatan_lingkungan');
		$ctusaha = $this->input->post('fs_catatan_tempat_usaha');
		$flag = trim($this->input->post('fs_flag_survey'));


		$nobatch = trim($this->input->post('fn_no_batch'));
		$this->load->model('mInputSurvey','',true);

		$noapk = trim($this->input->post('fn_no_apk'));
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));

		//echo $noapk.'<br>'.$nobatch;die;
		if ($noapk <> ''){

			$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fn_no_apk',$noapk)->from('tx_apk')->get()->row();
		//var_dump($noapk);die;
		if($rowApk){

			$tahun_now = date('Y');
			$tahun_sejak =  substr($rowApk->fs_tinggal_sejak, 2,5);
			$tahun_sejak_kerja =  substr($rowApk->fs_kerja_sejak_konsumen, 2,5);

			$jenis_pembiayaan = $rowApk->fs_jenis_pembiayaan;

			$jenken = '';
$rowJenisKend = $this->db->where('fs_kode_referensi','jenis_kendaraan')->where('fs_nama_referensi',$rowApk->fs_jenis_kendaraan)->from('tm_referensi')->get()->row();
			
			if($rowJenisKend){
			$jenken = $rowJenisKend->fs_nilai1_referensi;
			}
			
			if($jenken=='MT'){

				$roda = 2;

			} else {

				$roda = 4;
			}

			$uang_muka_dealer = $rowApk->fs_uang_muka_dealer;
			$umur = $rowApk->umur;
			$tenor = $rowApk->fn_kali_masa_angsuran_dealer;
			$tanggungan = $rowApk->fn_tanggungan_konsumen;
			$status_rumah = $rowApk->fs_status_rumah;
			$pertama_kali_kredit = $rowApk->fs_pertama_kali_kredit;
			$telfon_usaha = 'T';
			if($rowApk->fs_telfon_usaha_konsumen!=''){
				$telfon_usaha = 'Y';
			}

			$tahun_fix = ($tahun_now - $tahun_sejak) * 12;
			$tahun_fix_kerja = ($tahun_now - $tahun_sejak_kerja) * 12;
			//echo $tahun_fix_kerja;die;
			$jumlah_kendaraan = $jumlah;

			if($jenis_pembiayaan=='P' && $roda==4){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=4
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=4
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=4
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=4
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=4
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$telfonusaha_score = '';

				$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE  fs_nilai1='".$telfon_usaha."' AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='telepon_usaha' AND fs_kendaraan=4
					");

				$row8 = $rowTelfonUsaha->row();


					if($rowTelfonUsaha->num_rows()>0){

						$telfonusaha_score = $row8->fs_score;

					}

				$lamakerja_score = '';

				$rowLamaKerja = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix_kerja." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='lama_kerja(bulan)' AND fs_kendaraan=4
					");

				$row9 = $rowLamaKerja->row();


					if($rowLamaKerja->num_rows()>0){

						$lamakerja_score = $row9->fs_score;

					}

				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=4
					");

				$row10 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row10->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $telfonusaha_score + $lamakerja_score + 
		$jumlahkendaraan_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='grade' AND fs_kendaraan=4
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}

			else if($jenis_pembiayaan=='W' && $roda==4){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=4
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=4
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=4
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=4
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=4
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$telfonusaha_score = '';

				$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE  fs_nilai1='".$telfon_usaha."' AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='telepon_usaha' AND fs_kendaraan=4
					");

				$row8 = $rowTelfonUsaha->row();


					if($rowTelfonUsaha->num_rows()>0){

						$telfonusaha_score = $row8->fs_score;

					}

				$lamakerja_score = '';

				$rowLamaKerja = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix_kerja." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='lama_kerja(bulan)' AND fs_kendaraan=4
					");

				$row9 = $rowLamaKerja->row();


					if($rowLamaKerja->num_rows()>0){

						$lamakerja_score = $row9->fs_score;

					}

				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=4
					");

				$row10 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row10->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $telfonusaha_score + $lamakerja_score + $jumlahkendaraan_score;

		//echo $hasil;die;

		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='grade' AND fs_kendaraan=4
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}


			else if($jenis_pembiayaan=='B' && $roda==4){


				$repeat_order = $rowApk->fs_repeat_order;
				$jumlah_karyawan = $rowApk->fn_jumlah_karyawan_perusahaan;
				$status_usaha = $rowApk->fs_status_perusahaan;
				$tahun_now = date('Y');
				$beroperasi_sejak =  substr($rowApk->fs_beroperasi_sejak, 0,5);
				//echo $beroperasi_sejak;die;
				$lama_beroperasi = ($tahun_now - $beroperasi_sejak) * 12;
				

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=4
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=4
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}

				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=4
					");

				$row4 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row4->fs_score;

					}

				$repeatorder_score = '';

				$rowRepeatOrder = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$repeat_order."' AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=4
					");

				$row5 = $rowRepeatOrder->row();


					if($rowRepeatOrder->num_rows()>0){

						$repeatorder_score = $row5->fs_score;

					}


				$jumlahkaryawan_score = '';

				$rowJumlahKaryawan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_karyawan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_karyawan' AND fs_kendaraan=4
					");

				$row6 = $rowJumlahKaryawan->row();


					if($rowJumlahKaryawan->num_rows()>0){

						$jumlahkaryawan_score = $row6->fs_score;

					}


				$statususaha_score = '';

				$rowStatusUsaha = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1=".$status_usaha." AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='status_usaha' AND fs_kendaraan=4
					");

				$row7 = $rowStatusUsaha->row();


					if($rowStatusUsaha->num_rows()>0){

						$statususaha_score = $row7->fs_score;

					}

				$lamaberoperasi_score = '';

				$rowLamaBeroperasi = $this->db->query("SELECT * FROM tm_score WHERE ".$lama_beroperasi." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='lama_usaha(bulan)' AND fs_kendaraan=4
					");

				$row8 = $rowLamaBeroperasi->row();


					if($rowLamaBeroperasi->num_rows()>0){

						$lamaberoperasi_score = $row8->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $jumlahkaryawan_score  + $statususaha_score + $pertamakredit_score + 
		$lamaberoperasi_score + $jumlahkendaraan_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='grade' AND fs_kendaraan=4
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



		}

		else if($jenis_pembiayaan=='P' && $roda==2){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=2
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=2
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=2
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=2
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=2
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$statusrumah_score = '';

			$rowStatusRumah = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1 = ".$status_rumah." AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='status_rumah' AND fs_kendaraan=2
					");

				$row10 = $rowStatusRumah->row();


					if($rowStatusRumah->num_rows()>0){

						$statusrumah_score = $row10->fs_score;

					}

				$lamatinggal_score = '';

				$rowLamaTinggal = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='lama_tinggal(bulan)' AND fs_kendaraan=2
					");

				$row11 = $rowLamaTinggal->row();


					if($rowLamaTinggal->num_rows()>0){

						$lamatinggal_score = $row11->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $statusrumah_score + 
		$lamatinggal_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='grade' AND fs_kendaraan=2
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}

			else if($jenis_pembiayaan=='W' && $roda==2){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=2
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=2
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=2
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=2
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=2
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$statusrumah_score = '';

				$rowStatusRumah = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1 = ".$status_rumah." AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='status_rumah' AND fs_kendaraan=2
					");

				$row10 = $rowStatusRumah->row();


					if($rowStatusRumah->num_rows()>0){

						$statusrumah_score = $row10->fs_score;

					}

				$lamatinggal_score = '';

				$rowLamaTinggal = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='lama_tinggal(bulan)' AND fs_kendaraan=2
					");

				$row11 = $rowLamaTinggal->row();


					if($rowLamaTinggal->num_rows()>0){

						$lamatinggal_score = $row11->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $statusrumah_score + 
		$lamatinggal_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='grade' AND fs_kendaraan=2
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}

			else if($jenis_pembiayaan=='B' && $roda==2){

				$repeat_order = $rowApk->fs_repeat_order;
				$jumlah_karyawan = $rowApk->fn_jumlah_karyawan_perusahaan;
				$status_usaha = $rowApk->fs_status_perusahaan;
				$tahun_now = date('Y');
				$beroperasi_sejak =  substr($rowApk->fs_beroperasi_sejak, 0,5);
				$lama_beroperasi = ($tahun_now - $beroperasi_sejak) * 12;

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=2
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=2
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}

				$statususaha_score = '';

				$rowStatusUsaha = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1=".$status_usaha." AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='status_usaha' AND fs_kendaraan=2
					");

				$row13 = $rowStatusUsaha->row();


					if($rowStatusUsaha->num_rows()>0){

						$statususaha_score = $row13->fs_score;

					}


					$jumlahkaryawan_score = '';

				$rowJumlahKaryawan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_karyawan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_karyawan' AND fs_kendaraan=2
					");

				$row6 = $rowJumlahKaryawan->row();


					if($rowJumlahKaryawan->num_rows()>0){

						$jumlahkaryawan_score = $row6->fs_score;

					}

				/*$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=2
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}*/


				/*$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=2
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}*/


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$repeat_order."' AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=2
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				/*$telfonusaha_score = '';

				$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE  fs_nilai1='".$telfon_usaha."' AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='telfon_usaha' AND fs_kendaraan=2
					");

				$row8 = $rowTelfonUsaha->row();


					if($rowTelfonUsaha->num_rows()>0){

						$telfonusaha_score = $row8->fs_score;

					}*/

				$lamakerja_score = '';

				$rowLamaKerja = $this->db->query("SELECT * FROM tm_score WHERE ".$lama_beroperasi." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='lama_usaha(bulan)' AND fs_kendaraan=2
					");

				$row9 = $rowLamaKerja->row();


					if($rowLamaKerja->num_rows()>0){

						$lamakerja_score = $row9->fs_score;

					}

				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=2
					");

				$row10 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row10->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score  + $pertamakredit_score + $statususaha_score + $lamakerja_score + $jumlahkendaraan_score + $jumlahkaryawan_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='grade' AND fs_kendaraan=2
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);

			}



		}



		} else if ($nobatch <> ''){


		  $rowBatch = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fn_no_batch',$nobatch)->from('tx_apk')->get()->result();


		  foreach ($rowBatch as $list){

		  	$rowApk = $this->db->where('fs_kode_cabang',$kode_cabang)->where('fn_no_apk',$list->fn_no_apk)->from('tx_apk')->get()->row();


		  	if($rowApk){

			$tahun_now = date('Y');
			$tahun_sejak =  substr($rowApk->fs_tinggal_sejak, 2,5);

			$tahun_sejak_kerja =  substr($rowApk->fs_kerja_sejak_konsumen, 2,5);


			$jenis_pembiayaan = $rowApk->fs_jenis_pembiayaan;

			$jenken = '';
$rowJenisKend = $this->db->where('fs_kode_referensi','jenis_kendaraan')->where('fs_nama_referensi',$rowApk->fs_jenis_kendaraan)->from('tm_referensi')->get()->row();
			
			if($rowJenisKend){
			$jenken = $rowJenisKend->fs_nilai1_referensi;
			}
			
			if($jenken=='MT'){

				$roda = 2;

			} else {

				$roda = 4;
			}


			$uang_muka_dealer = $rowApk->fs_uang_muka_dealer;
			$umur = $rowApk->umur;
			$tenor = $rowApk->fn_kali_masa_angsuran_dealer;
			$tanggungan = $rowApk->fn_tanggungan_konsumen;
			$status_rumah = $rowApk->fs_status_rumah;
			$pertama_kali_kredit = $rowApk->fs_pertama_kali_kredit;
			$telfon_usaha = 'T';
			if($rowApk->fs_telfon_usaha_konsumen!=''){
				$telfon_usaha = 'Y';
			}
			$tahun_fix = ($tahun_now - $tahun_sejak) * 12;
			$tahun_fix_kerja = ($tahun_now - $tahun_sejak_kerja) * 12;
			$jumlah_kendaraan = $jumlah;


			if($jenis_pembiayaan=='P' && $roda==4){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=4
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}



				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=4
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=4
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}



				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=4
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}




				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=4
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}




				$telfonusaha_score = '';

				$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE  fs_nilai1='".$telfon_usaha."' AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='telepon_usaha' AND fs_kendaraan=4
					");

				$row8 = $rowTelfonUsaha->row();


					if($rowTelfonUsaha->num_rows()>0){

						$telfonusaha_score = $row8->fs_score;

					}


				$lamakerja_score = '';

				$rowLamaKerja = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix_kerja." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='lama_kerja(bulan)' AND fs_kendaraan=4
					");

				$row9 = $rowLamaKerja->row();


					if($rowLamaKerja->num_rows()>0){

						$lamakerja_score = $row9->fs_score;

					}



				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=4
					");

				$row10 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row10->fs_score;

					}



		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $telfonusaha_score + $lamakerja_score + 
		$jumlahkendaraan_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='grade' AND fs_kendaraan=4
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}



		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);


				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($list->fn_no_apk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}

			else if($jenis_pembiayaan=='W' && $roda==4){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=4
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=4
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=4
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=4
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=4
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$telfonusaha_score = '';

				$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE  fs_nilai1='".$telfon_usaha."' AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='telepon_usaha' AND fs_kendaraan=4
					");

				$row8 = $rowTelfonUsaha->row();


					if($rowTelfonUsaha->num_rows()>0){

						$telfonusaha_score = $row8->fs_score;

					}

				$lamakerja_score = '';

				$rowLamaKerja = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix_kerja." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='lama_kerja(bulan)' AND fs_kendaraan=4
					");

				$row9 = $rowLamaKerja->row();


					if($rowLamaKerja->num_rows()>0){

						$lamakerja_score = $row9->fs_score;

					}

				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=4
					");

				$row10 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row10->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $telfonusaha_score + $lamakerja_score + $jumlahkendaraan_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='grade' AND fs_kendaraan=4
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($list->fn_no_apk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}


			else if($jenis_pembiayaan=='B' && $roda==4){


				$repeat_order = $rowApk->fs_repeat_order;
				$jumlah_karyawan = $rowApk->fn_jumlah_karyawan_perusahaan;
				$status_usaha = $rowApk->fs_status_perusahaan;
				$tahun_now = date('Y');
				$beroperasi_sejak =  substr($rowApk->fs_beroperasi_sejak, 0,5);
				//echo $beroperasi_sejak;die;
				$lama_beroperasi = ($tahun_now - $beroperasi_sejak) * 12;
				

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=4
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=4
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=4
					");

				$row4 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row4->fs_score;

					}	


				$repeatorder_score = '';

				$rowRepeatOrder = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$repeat_order."' AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=4
					");

				$row5 = $rowRepeatOrder->row();


					if($rowRepeatOrder->num_rows()>0){

						$repeatorder_score = $row5->fs_score;

					}


				$jumlahkaryawan_score = '';

				$rowJumlahKaryawan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_karyawan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_karyawan' AND fs_kendaraan=4
					");

				$row6 = $rowJumlahKaryawan->row();


					if($rowJumlahKaryawan->num_rows()>0){

						$jumlahkaryawan_score = $row6->fs_score;

					}



				$statususaha_score = '';

				$rowStatusUsaha = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1=".$status_usaha." AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='status_usaha' AND fs_kendaraan=4
					");

				$row7 = $rowStatusUsaha->row();


					if($rowStatusUsaha->num_rows()>0){

						$statususaha_score = $row7->fs_score;

					}

				$lamaberoperasi_score = '';

				$rowLamaBeroperasi = $this->db->query("SELECT * FROM tm_score WHERE ".$lama_beroperasi." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='lama_usaha(bulan)' AND fs_kendaraan=4
					");

				$row8 = $rowLamaBeroperasi->row();


					if($rowLamaBeroperasi->num_rows()>0){

						$lamaberoperasi_score = $row8->fs_score;

					}



		$hasil = $uangmuka_score + $tenor_score + $jumlahkaryawan_score  + $statususaha_score + $repeatorder_score + 
		$lamaberoperasi_score + $jumlahkendaraan_score;

		//echo $hasil;die;

		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='grade' AND fs_kendaraan=4
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($list->fn_no_apk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



		}

		else if($jenis_pembiayaan=='P' && $roda==2){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=2
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=2
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=2
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=2
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=2
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$statusrumah_score = '';

				$rowStatusRumah = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1 = ".$status_rumah." AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='status_rumah' AND fs_kendaraan=2
					");

				$row10 = $rowStatusRumah->row();


					if($rowStatusRumah->num_rows()>0){

						$statusrumah_score = $row10->fs_score;

					}

				$lamatinggal_score = '';

				$rowLamaTinggal = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='lama_tinggal(bulan)' AND fs_kendaraan=2
					");

				$row11 = $rowLamaTinggal->row();


					if($rowLamaTinggal->num_rows()>0){

						$lamatinggal_score = $row11->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $statusrumah_score + 
		$lamatinggal_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='P' AND
					fs_keterangan='grade' AND fs_kendaraan=2
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($list->fn_no_apk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}

			else if($jenis_pembiayaan=='W' && $roda==2){

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=2
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=2
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}


				$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=2
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}


				$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=2
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$pertama_kali_kredit."' AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=2
					");

				$row7 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row7->fs_score;

					}

				$statusrumah_score = '';

				$rowStatusRumah = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1 = ".$status_rumah." AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='status_rumah' AND fs_kendaraan=2
					");

				$row10 = $rowStatusRumah->row();


					if($rowStatusRumah->num_rows()>0){

						$statusrumah_score = $row10->fs_score;

					}

				$lamatinggal_score = '';

				$rowLamaTinggal = $this->db->query("SELECT * FROM tm_score WHERE ".$tahun_fix." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='lama_tinggal(bulan)' AND fs_kendaraan=2
					");

				$row11 = $rowLamaTinggal->row();


					if($rowLamaTinggal->num_rows()>0){

						$lamatinggal_score = $row11->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score + $umur_score + $tanggungan_score  + $pertamakredit_score + $statusrumah_score + 
		$lamatinggal_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='W' AND
					fs_keterangan='grade' AND fs_kendaraan=2
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($list->fn_no_apk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);



			}

			else if($jenis_pembiayaan=='B' && $roda==2){

				$repeat_order = $rowApk->fs_repeat_order;
				$jumlah_karyawan = $rowApk->fn_jumlah_karyawan_perusahaan;
				$status_usaha = $rowApk->fs_status_perusahaan;
				$tahun_now = date('Y');
				$beroperasi_sejak =  substr($rowApk->fs_beroperasi_sejak, 0,5);
				$lama_beroperasi = ($tahun_now - $beroperasi_sejak) * 12;

				$uangmuka_score = '';

				$rowUangMuka = $this->db->query("SELECT * FROM tm_score WHERE ".$uang_muka_dealer." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='uang_muka' AND fs_kendaraan=2
					");

				$row = $rowUangMuka->row();


					if($rowUangMuka->num_rows()>0){

						$uangmuka_score = $row->fs_score;

					}


				$tenor_score = '';

				$rowTenor = $this->db->query("SELECT * FROM tm_score WHERE ".$tenor." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='tenor(bulan)' AND fs_kendaraan=2
					");

				$row2 = $rowTenor->row();


					if($rowTenor->num_rows()>0){

						$tenor_score = $row2->fs_score;

					}

				$statususaha_score = '';

				$rowStatusUsaha = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1=".$status_usaha." AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='status_usaha' AND fs_kendaraan=2
					");

				$row7 = $rowStatusUsaha->row();


					if($rowStatusUsaha->num_rows()>0){

						$statususaha_score = $row7->fs_score;

					}


					$jumlahkaryawan_score = '';

				$rowJumlahKaryawan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_karyawan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_karyawan' AND fs_kendaraan=2
					");

				$row6 = $rowJumlahKaryawan->row();


					if($rowJumlahKaryawan->num_rows()>0){

						$jumlahkaryawan_score = $row6->fs_score;

					}

				/*$umur_score = '';

				$rowUmur = $this->db->query("SELECT * FROM tm_score WHERE ".$umur." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='umur(tahun)' AND fs_kendaraan=2
					");

				$row3 = $rowUmur->row();


					if($rowUmur->num_rows()>0){

						$umur_score = $row3->fs_score;

					}*/


				/*$tanggungan_score = '';

				$rowTanggungan = $this->db->query("SELECT * FROM tm_score WHERE ".$tanggungan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='tanggungan' AND fs_kendaraan=2
					");

				$row4 = $rowTanggungan->row();


					if($rowTanggungan->num_rows()>0){

						$tanggungan_score = $row4->fs_score;

					}*/


				$pertamakredit_score = '';

				$rowPertamaKredit = $this->db->query("SELECT * FROM tm_score WHERE fs_nilai1='".$repeat_order."' AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='pertama_kredit' AND fs_kendaraan=2
					");

				$row13 = $rowPertamaKredit->row();


					if($rowPertamaKredit->num_rows()>0){

						$pertamakredit_score = $row13->fs_score;

					}

				/*$telfonusaha_score = '';

				$rowTelfonUsaha = $this->db->query("SELECT * FROM tm_score WHERE  fs_nilai1='".$telfon_usaha."' AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='telfon_usaha' AND fs_kendaraan=2
					");

				$row8 = $rowTelfonUsaha->row();


					if($rowTelfonUsaha->num_rows()>0){

						$telfonusaha_score = $row8->fs_score;

					}*/

				$lamakerja_score = '';

				$rowLamaKerja = $this->db->query("SELECT * FROM tm_score WHERE ".$lama_beroperasi." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='lama_usaha(bulan)' AND fs_kendaraan=2
					");

				$row9 = $rowLamaKerja->row();


					if($rowLamaKerja->num_rows()>0){

						$lamakerja_score = $row9->fs_score;

					}

				$jumlahkendaraan_score = '';

				$rowJumlahKendaraan = $this->db->query("SELECT * FROM tm_score WHERE ".$jumlah_kendaraan." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='jumlah_kendaraan' AND fs_kendaraan=2
					");

				$row10 = $rowJumlahKendaraan->row();


					if($rowJumlahKendaraan->num_rows()>0){

						$jumlahkendaraan_score = $row10->fs_score;

					}


		$hasil = $uangmuka_score + $tenor_score  + $pertamakredit_score + $statususaha_score + $lamakerja_score + $jumlahkendaraan_score + $jumlahkaryawan_score;


		$grade = '';
		$rowGrade = $this->db->query("SELECT * FROM tm_score WHERE ".$hasil." BETWEEN fs_nilai1 AND  fs_nilai2 AND fs_jenis_pembiayaan='B' AND
					fs_keterangan='grade' AND fs_kendaraan=2
					");

		$rowGradeHasil = $rowGrade->row();

		if($rowGrade->num_rows()>0){

			$grade = $rowGradeHasil->fs_score;

		}

		$xData = array(
					'fs_score'	=> $hasil,
					'fs_grade'	=> $grade

				);
				
		$xWhere = "fs_kode_cabang = '".trim($kode_cabang)."' AND fn_no_apk = '".trim($list->fn_no_apk)."'";
			
		$this->db->where($xWhere);
		$this->db->update('tx_apk', $xData);

			}



		}





		  }
		//var_dump($noapk);die;
		

		}
		



		$data = array(
					'fd_tanggal_survey' => $tanggal,
					'fs_petugas_survey'	=> $petugas,
					'fn_lama_survey' => $lama,
					'fs_kondisi_lingkungan' => $lingkungan,
					'fn_jumlah_kendaraan' => $jumlah,
					'fs_garasi' => $garasi,
					'fs_kondisi_kantor' => $kantor,
					'fs_catatan_tempat_tinggal' => $cttinggal,
					'fs_catatan_lingkungan' => $ctlinkungan,
					'fs_catatan_tempat_usaha' => $ctusaha,
					'fs_flag_survey' => $flag,
					'fs_iduser_buat_survey' => trim($this->session->userdata('gUser')),
					'fd_tanggal_buat_survey' => trim(date('Y-m-d'))
				);
		if ($noapk <> ''){
			$where = "fn_no_apk = '".trim($noapk)."' 
						AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);

			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Success',
			);
			echo json_encode($hasil);
		}
		else if ($nobatch <> ''){
			$where = "fn_no_batch = '".trim($nobatch)."' 
						AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);
			
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Saving Success',
			);
			echo json_encode($hasil);
		}
		else {
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Saving Error',
			);
			echo json_encode($hasil);
		}
	}
 
	
}