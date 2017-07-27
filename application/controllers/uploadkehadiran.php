<?php

class Uploadkehadiran extends CI_Controller
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
			$this->load->view('vuploadkehadiran');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function periode()
	{
		$this->load->model('mUploadKehadiran');
		$this->load->helper('day');

		$sSQL = $this->mUploadKehadiran->isPeriode();
		if ($sSQL->num_rows() > 0) 
		{
			$val = $sSQL->row();
			$periode = bulan_indo($val->fs_nilai1_referensi);
			$hasil = array(
				'sukses' => true,
				'fn_periode' => ascii_to_entities(trim($periode))
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false
			);
			echo json_encode($hasil);
		}
	}

	function gridkehadiran()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$sKdCabang = trim($this->session->userdata('gKodeCabang'));
		$sCari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mUploadKehadiran');
		$sSQL = $this->mUploadKehadiran->listKehadiranAll($sCari, $sKdCabang);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mUploadKehadiran->listKehadiran($sCari, $sKdCabang, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fs_nama' => ascii_to_entities(trim($xRow->fs_nama)),
						'fd_checktime' => ascii_to_entities(trim($xRow->fd_checktime))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function uploadfile()
	{
		$this->load->model('mUploadKehadiran');
		$kdcabang = trim($this->session->userdata('gKodeCabang'));

		if(!empty($_FILES['fileXml']['name'])) {
			$name = $_FILES["fileXml"]["name"];
			$tmp = explode('.', $name);
			$file_extension = end($tmp);
			
			if ($file_extension <> 'xml') {
				$response = array(
								'success' => false, 
								'msg' => 'Jenis file ini bukan (.XML)'
							);
				echo json_encode($response);
			} else {
				$sSQL = $this->mUploadKehadiran->checkFileExist($kdcabang);
				if ($sSQL->num_rows() > 0) {
					$response = array(
									'success' => false, 
									'msg' => 'File yang sama sudah di Upload, SyncData terlebih dahulu!'
								);
					echo json_encode($response);
				} else {
					$config['upload_path'] = './tmpdb/';
					$config['max_size'] = 10000;
					$config['allowed_types'] = '*';
					$config['file_name'] = $_FILES['fileXml']['name'];
					$config['encrypt_name'] = TRUE;

					$this->load->library('upload', $config);
					$this->upload->initialize($config);

					if ($this->upload->do_upload('fileXml')) {
						$uploadData = $this->upload->data();
						$file = $uploadData['file_name'];
						$size = $uploadData['file_size'];

						$insert = array(
									'fs_kode_cabang' => $kdcabang,
									'fs_filename' => $file,
									'fs_filesize' => $size,
									'fd_tanggal_buat' => trim(date('Y-m-d H:i:s'))
								);

						$exec = $this->db->insert('tx_uploadfile', $insert);
						if ($exec) {
							$response = array(
											'success' => true, 
											'data' => array(
												'name' => $file),
											'msg' => 'File Uploaded Successfully.'
										);
							echo json_encode($response);
						} else {
							$response = array(
											'success' => false, 
										  	'msg' => $this->upload->display_errors()
										);
							echo json_encode($response);
						}
					}
				}
			}
		}
	}

	
	// syncdata XML
	function syncxml()
	{
		$this->load->model('mUploadKehadiran');
		$kdcabang = trim($this->session->userdata('gKodeCabang'));
		$sSQL = $this->mUploadKehadiran->checkFileExist($kdcabang);
		if ($sSQL->num_rows() > 0) {
			$val = $sSQL->row();
			$xml_file = './tmpdb/' . $val->fs_filename;
			$xml = simplexml_load_file($xml_file);
			
			// check param periode
			$periode = $this->mUploadKehadiran->isPeriode();
			if ($periode->num_rows() > 0) 
			{
				$xperiode = $periode->row();
				$periode_param = $xperiode->fs_nilai1_referensi;

				// check time in first row XML
				$periode_xml = date("Y-m", strtotime($xml->ROWDATA->ROW['CHECKTIME']));
				
				/* check file if same periode it self
				foreach ($xml->ROWDATA->ROW as $val) {
					echo $val['CHECKTIME'];
				}
				*/
				
				if ($periode_param == $periode_xml) {
					// delete old rows before replace new rows 
					// hapus data sesuai kode cabang dan parameter bulan di table tx_checkinput
					$this->mUploadKehadiran->deleteAllByMonth($kdcabang, $periode_param);
					// hapus data sesuai kode cabang dan parameter bulan di table tx_absensi
					$this->mUploadKehadiran->deleteAllAbsensi($kdcabang, $periode_param);

					// looping insert to db
					// memasukan data baru dari XML
					foreach ($xml->ROWDATA->ROW as $val) {
						$name = $val['Name'];
						$checktime = $val['CHECKTIME'];
						$data = array(
								'fs_kode_cabang' => $kdcabang,
								'fs_nama' => strval(strtoupper($name)),
								'fd_checktime' => date("Y-m-d H:i:s", strtotime($checktime))
							);
						$this->db->insert('tx_checkinout', $data);
					}

					// insert to tx_absensi
					$this->mUploadKehadiran->insertAllAbsensi($kdcabang, $periode_param);

					// set flag
					$update = array(
								'fs_flag_deleted' => 1
							);
					$where = "fs_kode_cabang = '".trim($kdcabang)."'";
					$this->db->where($where);
					$this->db->update('tx_uploadfile', $update);

					// delete file XML after syncdata
					unlink($xml_file);

					$hasil = array(
							'sukses' => true,
							'hasil' => 'Synchronize Data Sukses!!'
					);
					echo json_encode($hasil);
				} else {
					$update = array(
									'fs_flag_deleted' => 1
								);
					$where = "fs_kode_cabang = '".trim($kdcabang)."'";
					$this->db->where($where);
					$this->db->update('tx_uploadfile', $update);

					// delete file XML after syncdata
					unlink($xml_file);
					$hasil = array(
						'sukses' => false,
						'hasil' => 'Periode bulan tidak sesuai!, Silakan Upload kembali File (.XML)'
					);
					echo json_encode($hasil);
				}
			}

		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Synchronize Data Gagal / File (.XML) belum di Upload.'
					);
			echo json_encode($hasil);
		}

	}

}