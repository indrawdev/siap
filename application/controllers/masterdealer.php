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

	function cb_aktif()
	{
		$array = array(
		  2 => array("1",'YA'),
		  4 => array("0",'TIDAK')
		);

		$out = array_values($array);
		echo json_encode($out);
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

	function list()
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
					'fs_aktif' => ascii_to_entities(trim($xRow->fs_aktif)),
					'fn_cabang_dealer' => ascii_to_entities(trim($xRow->fn_cabang_dealer)),
					'fs_kode_dealer1' => ascii_to_entities(trim($xRow->fs_kode_dealer1)),
					'fs_kode_dealer2'		=> ascii_to_entities(trim($xRow->fs_kode_dealer2)),
					'fs_nama_dealer'		=> ascii_to_entities(trim($xRow->fs_nama_dealer)),
					'fs_alamat_dealer'	=> ascii_to_entities(trim($xRow->fs_alamat_dealer)),
					'fs_kota_dealer'	=> ascii_to_entities(trim($xRow->fs_kota_dealer)),
					'fs_telepon_dealer'	=> ascii_to_entities(trim($xRow->fs_telepon_dealer)),
					'fs_handphone_dealer'	=> ascii_to_entities(trim($xRow->fs_handphone_dealer)),
					'fs_nama_pemilik'	=> ascii_to_entities(trim($xRow->fs_nama_pemilik)),
					'fs_npwp_pemilik'	=> ascii_to_entities(trim($xRow->fs_nama_pemilik)),
					'fs_ktp_pemilik'	=> ascii_to_entities(trim($xRow->fs_nama_pemilik)),
					'fs_nama_bank_pencairan'	=> ascii_to_entities(trim($xRow->fs_nama_bank_pencairan)),
					'fs_rekening_bank_pencairan'	=> ascii_to_entities(trim($xRow->fs_rekening_bank_pencairan)),
					'fs_atasnama_bank_pencairan'	=> ascii_to_entities(trim($xRow->fs_atasnama_bank_pencairan)),
					'fn_persen_refund_bunga'	=> ascii_to_entities(trim($xRow->fn_persen_refund_bunga)),
					'fn_persen_refund_asuransi'	=> ascii_to_entities(trim($xRow->fn_persen_refund_asuransi))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function kodepos()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cari = trim($this->input->post('fs_cari'));

		$this->db->query(NOLOCK);
		$this->load->model('mMasterDealer');
		$sSQL = $this->mMasterDealer->listKodePosAll($cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mMasterDealer->listKodePos($cari, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fs_kodepos' => ascii_to_entities(trim($xRow->fs_kodepos)),
						'fs_propinsi' => ascii_to_entities(trim($xRow->fs_propinsi)),
						'fs_kelurahan' => ascii_to_entities(trim($xRow->fs_kelurahan)),
						'fs_kecamatan' => ascii_to_entities(trim($xRow->fs_kecamatan)),
						'fs_nama_dati' => ascii_to_entities(trim($xRow->fs_nama_dati))
					);
			}
			echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
		}
	}

	function ceksave()
	{
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
		$kode_dealer1 = trim($this->input->post('fs_kode_dealer1'));
		$kode_dealer2 = trim($this->input->post('fs_kode_dealer2'));
		$cabang_dealer = trim($this->input->post('fn_cabang_dealer'));

		if (!empty($kode_cabang) && !empty($kode_dealer1) && !empty($kode_dealer2) && !empty($cabang_dealer))
		{
			$this->load->model('mMasterDealer');
			$sSQL = $this->mMasterDealer->check($kode_cabang, $kode_dealer1, $kode_dealer2, $cabang_dealer);
			if ($sSQL->num_rows() == 0)
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
					'sukses'	=> true,
					'hasil'		=> 'Kode Dealer sudah ada, apakah Anda ingin meng-update?
					</br></br><*Simpan ulang tidak akan meng-update Kode Dealer>'
				);
				echo json_encode($hasil);
			}
		}
		else 
		{
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, Kode Cabang tidak diketahui!'
					);
			echo json_encode($hasil);
		}
	}

	function save()
	{
		$aktif = trim($this->input->post('fs_aktif'));
		$kode_cabang = trim($this->session->userdata('gKodeCabang'));
		$kode_dealer1 = trim($this->input->post('fs_kode_dealer1'));
		$kode_dealer2 = trim($this->input->post('fs_kode_dealer2'));
		$cabang_dealer = trim($this->input->post('fn_cabang_dealer'));
		$nama_dealer = trim($this->input->post('fs_nama_dealer'));
		$alamat_dealer = trim($this->input->post('fs_alamat_dealer'));
		$kota_dealer = trim($this->input->post('fs_kota_dealer'));
		$telepon_dealer = trim($this->input->post('fs_telepon_dealer'));
		$handphone_dealer = trim($this->input->post('fs_handphone_dealer'));
		$nama_pemilik = trim($this->input->post('fs_nama_pemilik'));
		$npwp_pemilik = trim($this->input->post('fs_npwp_pemilik'));
		$ktp_pemilik = trim($this->input->post('fs_ktp_pemilik'));
		$nama_bank = trim($this->input->post('fs_nama_bank_pencairan'));
		$rekening_bank = trim($this->input->post('fs_rekening_bank_pencairan'));
		$atasnama_bank = trim($this->input->post('fs_atasnama_bank_pencairan'));
		$refund_bunga = trim($this->input->post('fn_persen_refund_bunga'));
		$refund_asuransi = trim($this->input->post('fn_persen_refund_asuransi'));
		
		$update = false;

		$this->load->model('mMasterDealer');
		$sSQL = $this->mMasterDealer->check($kode_cabang, $kode_dealer1, $kode_dealer2, $cabang_dealer);

		if ($sSQL->num_rows() > 0)
		{
			$update = true;
		}

		if ($update == false)
		{
			$data1 = array(
					'fs_aktif' => $aktif,
					'fs_kode_cabang' => $kode_cabang,
					'fs_kode_dealer1' => $kode_dealer1,
					'fs_kode_dealer2' => $kode_dealer2,
					'fn_cabang_dealer' => $cabang_dealer,
					'fs_nama_dealer' => strtoupper($nama_dealer),
					'fs_alamat_dealer' => strtoupper($alamat_dealer),
					'fs_kota_dealer' => strtoupper($kota_dealer),
					'fs_telepon_dealer' => $telepon_dealer,
					'fs_handphone_dealer' => $handphone_dealer,
					'fs_nama_pemilik' => strtoupper($nama_pemilik),
					'fs_npwp_pemilik' => $npwp_pemilik,
					'fs_ktp_pemilik' => $ktp_pemilik,
					'fs_nama_bank_pencairan' => strtoupper($nama_bank),
					'fs_rekening_bank_pencairan' => $rekening_bank,
					'fs_atasnama_bank_pencairan' => strtoupper($atasnama_bank),
					'fn_persen_refund_bunga' => $refund_bunga,
					'fn_persen_refund_asuransi' => $refund_asuransi,
					'fs_iduser_buat' => trim($this->session->userdata('gUser')),
					'fd_tanggal_buat' => date('Y-m-d')
				);
			$this->db->insert('tm_dealer', $data1);

			$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Dealer Baru, Sukses!!'
					);
			echo json_encode($hasil);
		}
		else
		{
			$data2 = array(
					'fs_aktif' => $aktif,
					'fs_kode_cabang' => $kode_cabang,
					'fs_kode_dealer1' => $kode_dealer1,
					'fs_kode_dealer2' => $kode_dealer2,
					'fn_cabang_dealer' => $cabang_dealer,
					'fs_nama_dealer' => strtoupper($nama_dealer),
					'fs_alamat_dealer' => strtoupper($alamat_dealer),
					'fs_kota_dealer' => strtoupper($kota_dealer),
					'fs_telepon_dealer' => $telepon_dealer,
					'fs_handphone_dealer' => $handphone_dealer,
					'fs_nama_pemilik' => strtoupper($nama_pemilik),
					'fs_npwp_pemilik' => $npwp_pemilik,
					'fs_ktp_pemilik' => $ktp_pemilik,
					'fs_nama_bank_pencairan' => strtoupper($nama_bank),
					'fs_rekening_bank_pencairan' => $rekening_bank,
					'fs_atasnama_bank_pencairan' => strtoupper($atasnama_bank),
					'fn_persen_refund_bunga' => $refund_bunga,
					'fn_persen_refund_asuransi' => $refund_asuransi,
					'fs_iduser_edit' => trim($this->session->userdata('gUser')),
					'fd_tanggal_edit' => date('Y-m-d')
				);
			$where = "fs_kode_cabang = '".trim($kode_cabang)."' AND fs_kode_dealer1 = '".trim($kode_dealer1)."' AND  fs_kode_dealer2 = '".trim($kode_dealer2)."' AND  fn_cabang_dealer = '".trim($cabang_dealer)."'";
			$this->db->where($where);
			$this->db->update('tm_dealer', $data2);
			$hasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Update Dealer, Sukses!'
			);
			echo json_encode($hasil);
		}
	}

}