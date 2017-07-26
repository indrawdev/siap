<?php

class Mastercabang extends CI_Controller
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
			$this->load->view('vmastercabang');
		}
		else
		{
			redirect('login','site_url');
		}
	}
	
	function listMasterCabang()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterCabang');
		$sSQL = $this->mMasterCabang->listMasterAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterCabang->listMaster($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_cabang'		=> ascii_to_entities(trim($xRow->fs_kode_cabang)),
					'fs_nama_cabang'		=> ascii_to_entities(trim($xRow->fs_nama_cabang)),
					'fs_alamat_cabang'	=> ascii_to_entities(trim($xRow->fs_alamat_cabang)),
					'fs_kota_cabang'	=> ascii_to_entities(trim($xRow->fs_kota_cabang)),
					'fs_telfon_cabang'	=> ascii_to_entities(trim($xRow->fs_telfon_cabang)),
					'fs_fax_cabang'	=> ascii_to_entities(trim($xRow->fs_fax_cabang)),
					'fs_email_cabang'	=> ascii_to_entities(trim($xRow->fs_email_cabang)),
					'fs_aktif'			=> ascii_to_entities(trim($xRow->fs_aktif))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	

	function CekSimpan()
	{
		$xdKodeCab = trim($this->input->post('fs_kode_cabang'));
		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		
		if (trim($xdKodeCab) <> '')
		{
			$this->load->model('mMasterCabang');
			$sSQL = $this->mMasterCabang->CekKodeCabang($xdKodeCab);
			
			if ($sSQL->num_rows() == 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'lanjut'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Kode Cabang sudah ada, apakah Anda ingin meng-update?</br></br>
									<*Simpan ulang tidak akan meng-update Kode Cabang>'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Kode Cabang tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
	}


	function Simpan()
	{

		$xKotaCab = trim($this->input->post('fs_kota_cabang'));
		$xKodeCab = trim($this->input->post('fs_kode_cabang'));
		$xNamaCab = trim($this->input->post('fs_nama_cabang'));
		$xAlamatCab = trim($this->input->post('fs_alamat_cabang'));
		$xKodePosCab = trim($this->input->post('fs_kodepos_cabang'));
		$xTelfonCab = trim($this->input->post('fs_telfon_cabang'));
		$xFaxCab = trim($this->input->post('fs_fax_cabang'));
		$xEmailCab = trim($this->input->post('fs_email_cabang'));
		$xNamaPimpinan = trim($this->input->post('fs_nama_pimpinan'));
		$xJabatanPimpinan = trim($this->input->post('fs_jabatan_pimpinan'));
		$xKtpPimpinan = trim($this->input->post('fs_ktp_pimpinan'));
		$xEmailPimpinan = trim($this->input->post('fs_email_pimpinan'));
		$xNmBankAngs = trim($this->input->post('fs_nama_bank_angsuran'));
		$xRekBankAngs = trim($this->input->post('fs_rekening_bank_angsuran'));
		$xAtasNmAngs = trim($this->input->post('fs_atasnama_bank_angsuran'));
		$xAktif = trim($this->input->post('fs_aktif'));
		$xTglSimpan = trim(strtolower($this->input->post('fd_tanggal_dibuat')));
		
		if (trim($xAktif) == 'true')
		{
			$xAktif = 1;
		}
		else
		{
			$xAktif = 0;
		}
		
		$this->db->trans_begin();
		
		$xUpdate = false;
		$this->load->model('mMasterCabang');
		$sSQL = $this->mMasterCabang->CekKodeCabang($xKodeCab);
		
		if ($sSQL->num_rows() > 0)
		{
			$xUpdate = true;
		}
		
		if ($xUpdate == false)
		{
			if (trim($xKodeCab) <> '')
			{
				$xData = array(
					'fs_kota_cabang'	=> trim(strtoupper($xKotaCab)),
					'fs_kode_cabang'	=> trim($xKodeCab),
					'fs_nama_cabang'	=> trim(strtoupper($xNamaCab)),
					'fs_alamat_cabang'	=> trim(strtoupper($xAlamatCab)),
					'fs_kodepos_cabang'	=> trim($xKodePosCab),
					'fs_telfon_cabang'	=> trim($xTelfonCab),
					'fs_fax_cabang'	=> trim($xFaxCab),
					'fs_email_cabang'	=> trim($xEmailCab),
					'fs_nama_pimpinan'	=> trim($xNamaPimpinan),
					'fs_jabatan_pimpinan'	=> trim($xJabatanPimpinan),
					'fs_ktp_pimpinan'	=> trim($xKtpPimpinan),
					'fs_email_pimpinan'	=> trim($xEmailPimpinan),
					'fs_nama_bank_angsuran'	=> trim($xNmBankAngs),
					'fs_rekening_bank_angsuran'	=> trim($xRekBankAngs),
					'fs_atasnama_bank_angsuran'	=> trim($xAtasNmAngs),
					'fs_aktif'	=> trim($xAktif),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
					'fd_tanggal_dibuat'			=> trim($xTglSimpan)
				);
				
				$this->db->insert('tm_cabang', $xData);
				
			}
			else
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal, Kode Cabang Gagal!!</br>Silakan coba lagi kemudian...'
				);
				echo json_encode($xHasil);
				return;
			}
		}
		else
		{
			$xData = array(
					'fs_kota_cabang'	=> trim(strtoupper($xKotaCab)),
					'fs_nama_cabang'	=> trim(strtoupper($xNamaCab)),
					'fs_alamat_cabang'	=> trim(strtoupper($xAlamatCab)),
					'fs_kodepos_cabang'	=> trim($xKodePosCab),
					'fs_telfon_cabang'	=> trim($xTelfonCab),
					'fs_fax_cabang'	=> trim($xFaxCab),
					'fs_email_cabang'	=> trim($xEmailCab),
					'fs_nama_pimpinan'	=> trim($xNamaPimpinan),
					'fs_jabatan_pimpinan'	=> trim($xJabatanPimpinan),
					'fs_ktp_pimpinan'	=> trim($xKtpPimpinan),
					'fs_email_pimpinan'	=> trim($xEmailPimpinan),
					'fs_nama_bank_angsuran'	=> trim($xNmBankAngs),
					'fs_rekening_bank_angsuran'	=> trim($xRekBankAngs),
					'fs_atasnama_bank_angsuran'	=> trim($xAtasNmAngs),
					'fs_aktif'	=> trim($xAktif),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
					'fd_tanggal_dibuat'			=> trim($xTglSimpan)
				);
			
			$xWhere = "fs_kode_cabang = '".trim($xKodeCab)."'";
			
			$this->db->where($xWhere);
			$this->db->update('tm_cabang', $xData);
			
		}
		
		
		if ($xUpdate == false)
		{
			if ($this->db->trans_status() === false)
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal'
				);
			}
			else
			{
				$this->db->trans_commit();
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Simpan Sukses'
				);
			}
			echo json_encode($xHasil);
		}
		else
		{
			if ($this->db->trans_status() === false)
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Update Gagal'
				);
			}
			else
			{
				$this->db->trans_commit();
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Simpan Update Sukses'
				);
			}
			echo json_encode($xHasil);
		}
	}

}
?>