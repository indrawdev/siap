<?php

class Dashboard extends CI_Controller
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
			if (trim($this->session->userdata('gKodeCabang')) == '00')
			{
				$this->load->view('vdashboardpusat');
			}
			else 
			{
				$this->load->view('vdashboardcabang');
			}
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function setuju()
	{
		$this->load->model('mDashboard');
		$sSQL = $this->mDashboard->statusDisetujui();
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim(substr($xRow->bulan, 0, 3))),
					'value' => ascii_to_entities(trim($xRow->jumlah))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function tolak()
	{
		$this->load->model('mDashboard');
		$sSQL = $this->mDashboard->statusDitolak();
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim(substr($xRow->bulan, 0, 3))),
					'value' => ascii_to_entities(trim($xRow->jumlah))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function proses()
	{
		$this->load->model('mDashboard');
		$sSQL = $this->mDashboard->statusDiproses();
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim(substr($xRow->bulan, 0, 3))),
					'value' => ascii_to_entities(trim($xRow->jumlah))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function batal()
	{
		$this->load->model('mDashboard');
		$sSQL = $this->mDashboard->statusDibatal();
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim(substr($xRow->bulan, 0, 3))),
					'value' => ascii_to_entities(trim($xRow->jumlah))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function monthgrade()
	{
		$this->load->model('mDashboard');
		$sSQL = $this->mDashboard->gradeMonthly();
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim('Grade ' .$xRow->grade)),
					'value' => ascii_to_entities(trim($xRow->jumlah))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	function yeargrade()
	{
		$this->load->model('mDashboard');
		$sSQL = $this->mDashboard->gradeYearly();
		$xTotal = $sSQL->num_rows();
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'name' => ascii_to_entities(trim('Grade '.$xRow->grade)),
					'value' => ascii_to_entities(trim($xRow->jumlah))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}


}