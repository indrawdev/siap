<?php

class Masterdealer extends CI_Controller
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
			$this->load->view('vmasterdealer');
		}
		else
		{
			redirect('login','site_url');
		}
	}
	
	function listMasterDealer()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));
		
		$this->db->query(NOLOCK);
		$this->load->model('mMasterDealer');
		$sSQL = $this->mMasterDealer->listMasterAll($cari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mMasterDealer->listMaster($cari,$nStart,$nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kode_dealer1'		=> ascii_to_entities(trim($xRow->fs_kode_dealer1)),
					'fs_kode_dealer2'		=> ascii_to_entities(trim($xRow->fs_kode_dealer2)),
					'fs_nama_dealer'		=> ascii_to_entities(trim($xRow->fs_nama_dealer)),
					'fs_alamat_dealer'	=> ascii_to_entities(trim($xRow->fs_alamat_dealer)),
					'fs_kota_dealer'	=> ascii_to_entities(trim($xRow->fs_kota_dealer)),
					'fs_telepon_dealer'	=> ascii_to_entities(trim($xRow->fs_telepon_dealer)),
					'fs_handphone_dealer'	=> ascii_to_entities(trim($xRow->fs_handphone_dealer)),
					'fs_nama_pemilik'	=> ascii_to_entities(trim($xRow->fs_nama_pemilik))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	

	function CekSimpan()
	{
		$xdKodeDealer1 = trim($this->input->post('fs_kode_dealer1'));
		$xdKodeDealer2 = trim($this->input->post('fs_kode_dealer2'));
		//$xKdParam = trim($this->input->post('fs_kd_parameter'));
		
		if (trim($xdKodeDealer1) <> '' and (trim($xdKodeDealer2) <> ''))
		{
			$this->load->model('mMasterDealer');
			$sSQL = $this->mMasterDealer->CekKodeDealer($xdKodeDealer1,$xdKodeDealer2);
			
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
					'hasil'		=> 'Kode Dealer sudah ada, apakah Anda ingin meng-update?</br></br>
									<*Simpan ulang tidak akan meng-update Kode Dealer>'
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


		$xKotaDealer = trim($this->input->post('fs_kota_dealer'));
		$xKodeDealer = trim($this->input->post('fs_kode_dealer1'));
		$xNomorDealer = trim($this->input->post('fs_kode_dealer2'));
		$xCabangDealer = trim($this->input->post('fs_cabang_dealer'));
		$xNamaDealer = trim($this->input->post('fs_nama_dealer'));
		$xAlamatDealer = trim($this->input->post('fs_alamat_dealer'));
		$xTeleponDealer = trim($this->input->post('fs_telepon_dealer'));
		$xHpDealer = trim($this->input->post('fs_handphone_dealer'));
		$xNamaPemilik = trim($this->input->post('fs_nama_pemilik'));
		$xKtpPemilik = trim($this->input->post('fs_ktp_pemilik'));
		$xNamaBankPencairan = trim($this->input->post('fs_nama_bank_pencairan'));
		$xRekeningBank = trim($this->input->post('fs_rekening_bank_pencairan'));
		$xAtsNmBank = trim($this->input->post('fs_atasnama_bank_pencairan'));
		$xTglSimpan = trim($this->input->post('fd_tanggal_dibuat'));
		
		
		$this->db->trans_begin();
		
		$xUpdate = false;
		$this->load->model('mMasterDealer');
		$sSQL = $this->mMasterDealer->CekKodeDealer($xKodeDealer,$xNomorDealer);
		
		if ($sSQL->num_rows() > 0)
		{
			$xUpdate = true;
		}
		
		if ($xUpdate == false)
		{
			if (trim($xKodeDealer) <> '' and trim($xNomorDealer) <> '')
			{
				$xData = array(
					'fs_kota_dealer'	=> trim(strtoupper($xKotaDealer)),
					'fs_kode_dealer1'	=> trim($xKodeDealer),
					'fs_kode_dealer2'	=> trim($xNomorDealer),
					'fn_cabang_dealer'	=> trim(strtoupper($xCabangDealer)),
					'fs_nama_dealer'	=> trim(strtoupper($xNamaDealer)),
					'fs_alamat_dealer'	=> trim(strtoupper($xAlamatDealer)),
					'fs_telepon_dealer'	=> trim($xTeleponDealer),
					'fs_handphone_dealer'	=> trim($xHpDealer),
					'fs_nama_pemilik'	=> trim(strtoupper($xNamaPemilik)),
					'fs_ktp_pemilik'	=> trim($xKtpPemilik),
					'fs_nama_bank_pencairan'	=> trim(strtoupper($xNamaBankPencairan)),
					'fs_rekening_bank_pencairan'	=> trim($xRekeningBank),
					'fs_atasnama_bank_pencairan'	=> trim(strtoupper($xAtsNmBank)),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
					'fd_tanggal_dibuat'			=> trim($xTglSimpan)
				);
				
				$this->db->insert('tm_dealer', $xData);
				
			}
			else
			{
				$this->db->trans_rollback();
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal, Kode Dealer Gagal!!</br>Silakan coba lagi kemudian...'
				);
				echo json_encode($xHasil);
				return;
			}
		}
		else
		{
			$xData = array(
					'fs_kota_dealer'	=> trim(strtoupper($xKotaDealer)),
					'fn_cabang_dealer'	=> trim(strtoupper($xCabangDealer)),
					'fs_nama_dealer'	=> trim(strtoupper($xNamaDealer)),
					'fs_alamat_dealer'	=> trim(strtoupper($xAlamatDealer)),
					'fs_telepon_dealer'	=> trim($xTeleponDealer),
					'fs_handphone_dealer'	=> trim($xHpDealer),
					'fs_nama_pemilik'	=> trim(strtoupper($xNamaPemilik)),
					'fs_ktp_pemilik'	=> trim($xKtpPemilik),
					'fs_nama_bank_pencairan'	=> trim(strtoupper($xNamaBankPencairan)),
					'fs_rekening_bank_pencairan'	=> trim($xRekeningBank),
					'fs_atasnama_bank_pencairan'	=> trim(strtoupper($xAtsNmBank)),
					'fs_iduser_pembuat'			=> trim($this->session->userdata('gUser')),
					'fd_tanggal_dibuat'			=> trim($xTglSimpan)
				);
			
			$xWhere = "fs_kode_dealer1 = '".trim($xKodeDealer)."' AND  fs_kode_dealer2 = '".trim($xNomorDealer)."'";
			
			$this->db->where($xWhere);
			$this->db->update('tm_dealer', $xData);
			
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