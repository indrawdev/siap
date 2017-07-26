<?php

class StnkBpkbStatus extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		//change db
		$this->load->model('mMainModul','',true);
		$this->mMainModul->change_db($this->session->userdata('gServer'),$this->session->userdata('gDatabase'));
		//eof change db
	}
	
	function index()
	{
		if (trim($this->session->userdata('gDatabase')) <> '')
		{
			$this->load->view('vstnkbpkbstatus');
		}
		else
		{
			redirect('','refresh');
		}
	}
	
	function grid_detail()
	{
		$tgl = trim($this->input->post('fd_tgl'));
		$tgl2 = trim($this->input->post('fd_tgl2'));
		$kdcust = trim($this->input->post('fs_kd_cust'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdcust2 = trim($this->input->post('fs_kd_cust2'));
		$kdcount2 = trim($this->input->post('fs_count2'));
		$nstart = trim($this->input->post('start'));
		
		$this->load->model('mStnkBpkbStatus','',true);
		$ssql = $this->mStnkBpkbStatus->grid_all($tgl,$tgl2,$kdcust,$kdcount,$kdcust2,$kdcount2);
		$total = $ssql->num_rows();
		
		$ssql = $this->mStnkBpkbStatus->grid($tgl,$tgl2,$kdcust,$kdcount,$kdcust2,$kdcount2,$nstart);
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($ssql->result()).'})';
	}
	
	function grid_detail2()
	{
		$tgl = trim($this->input->post('fd_tgl'));
		$tgl2 = trim($this->input->post('fd_tgl2'));
		$kdcust = trim($this->input->post('fs_kd_cust'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdcust2 = trim($this->input->post('fs_kd_cust2'));
		$kdcount2 = trim($this->input->post('fs_count2'));
		$nstart = trim($this->input->post('start'));
		
		$this->load->model('mStnkBpkbStatus','',true);
		$ssql = $this->mStnkBpkbStatus->grid2_all($tgl,$tgl2,$kdcust,$kdcount,$kdcust2,$kdcount2);
		$total = $ssql->num_rows();
		
		$ssql = $this->mStnkBpkbStatus->grid2($tgl,$tgl2,$kdcust,$kdcount,$kdcust2,$kdcount2,$nstart);
		
		echo '({"total":"'.$total.'","hasil":'.json_encode($ssql->result()).'})';
	}
	
	function excel_stnk()
	{
		ini_set('memory_limit', '-1');
		
		$this->load->model('mMainModul','',true);
		$jamskg = $this->mMainModul->microtime_float();
		
		$nmfiletemp = 'tstatusstnk';
		$nmfile = 'statusstnk-'.$jamskg;
		$xIP = trim($this->session->userdata('ip_address'));
		$gIP = trim($this->session->userdata('gIP'));
		
		$oReader = PHPExcel_IOFactory::createReader('Excel5');
		
		if (trim($xIP) == trim($gIP))
		{
			$xtPath = '/var/www/'.config_item('base_folder').'/assets/docs/';
			$xPath = '/var/www/'.config_item('base_folder').'/temp/';
		}
		else
		{
			$xtPath = APPPATH.'../assets/docs/';
			$xPath = APPPATH.'../temp/';
		}
		
		$oExcel = $oReader->load($xtPath.$nmfiletemp.'.xls');
		$pjghal = 38;
		$i = 1;
		$l = 0; // no urut
		
		$k = 1; // pjg hal
		$p = 1; // awal hal
		$oExcel->getActiveSheet()->setTitle('StatusSTNK');
		$oExcel->getActiveSheet()->setShowGridlines(false);
		
		$oExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
		$oExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
		$oExcel->getActiveSheet()->getPageMargins()->setTop(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setBottom(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setLeft(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setRight(0);
		// $oExcel->getActiveSheet()->getHeaderFooter()->setOddFooter('&L&B' . '&RPage &P of &N');
		$oExcel->getDefaultStyle()->getFont()->setName('Calibri');
		$oExcel->getDefaultStyle()->getFont()->setSize(10);
		
		$sel = $oExcel->getActiveSheet();
		
		$tgl = trim($this->input->post('fd_tgl'));
		$tgl2 = trim($this->input->post('fd_tgl2'));
		$kdcust = trim($this->input->post('fs_kd_cust'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdcust2 = trim($this->input->post('fs_kd_cust2'));
		$kdcount2 = trim($this->input->post('fs_count2'));
		
		$this->load->model('mStnkBpkbStatus','',true);
		$ssql = $this->mStnkBpkbStatus->grid_all($tgl,$tgl2,$kdcust,$kdcount,$kdcust2,$kdcount2);
		
		if ($ssql->num_rows() > 0)
		{
			$warnakolom = array(
				'fill' => array(
					'type' => PHPExcel_Style_Fill::FILL_SOLID,
					'color' => array('rgb' => 'fff8dc')
				)
			);
			
			$i = 1;
			$k = 1;
			$sel->setCellValue('A'.$i, 'STNK Status');
			$sel->mergeCells('A'.$i.':N'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('A'.$i)->getFont()->SetUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
			$sel->getStyle('A'.$i)->getFont()->setBold(true);
			$sel->getStyle('A'.$i)->getFont()->setSize(12);
			$p = $i;
			$i = $i + 2;
			$k = $k + 2;
			
			$sel->setCellValue('A'.$i, 'No');
			$sel->setCellValue('B'.$i, 'Dept');
			$sel->setCellValue('C'.$i, 'Customer');
			$sel->setCellValue('D'.$i, 'Status');
			$sel->setCellValue('E'.$i, 'Tgl Serah Ke Agen');
			$sel->setCellValue('F'.$i, 'Tgl Terima Dr Agen');
			$sel->setCellValue('G'.$i, 'No STNK');
			$sel->setCellValue('H'.$i, 'Tgl Serah Ke Cust');
			$sel->setCellValue('I'.$i, 'No Polisi');
			$sel->setCellValue('J'.$i, 'BBN');
			$sel->setCellValue('K'.$i, 'Jasa');
			$sel->setCellValue('L'.$i, 'Rangka');
			$sel->setCellValue('M'.$i, 'Mesin');
			$sel->setCellValue('N'.$i, 'Biro Jasa');
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('H'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('I'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('J'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('K'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('L'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('M'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('N'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			
			$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
				array(
					'borders' => array(
						'top' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->getStyle('A'.$i.':'.'N'.$i)->applyFromArray($warnakolom);
			$i++;
			$k++;
			$l++;
			
			foreach ($ssql->result() as $row)
			{
				if ($k > $pjghal)
				{
					$j = $i - 1;
					$sel->setBreak('A'.$j, PHPExcel_Worksheet::BREAK_ROW);
					$sel->getStyle('A'.$j.':N'.$j)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					
					$q = $p + 2;
					$arr = array(
						'borders' => array(
							'left' => array(
								'style' => PHPExcel_Style_Border::BORDER_THIN
							)
						)
					);
					$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
					$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
					$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
					$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
					$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
					$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
					$sel->getStyle('G'.$q.':G'.$j)->applyFromArray($arr);
					$sel->getStyle('H'.$q.':H'.$j)->applyFromArray($arr);
					$sel->getStyle('I'.$q.':I'.$j)->applyFromArray($arr);
					$sel->getStyle('J'.$q.':J'.$j)->applyFromArray($arr);
					$sel->getStyle('K'.$q.':K'.$j)->applyFromArray($arr);
					$sel->getStyle('L'.$q.':L'.$j)->applyFromArray($arr);
					$sel->getStyle('M'.$q.':M'.$j)->applyFromArray($arr);
					$sel->getStyle('N'.$q.':N'.$j)->applyFromArray($arr);
					$sel->getStyle('N'.$q.':N'.$j)->applyFromArray(
						array(
							'borders' => array(
								'right' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$p = $i;
					
					$k = 1;
					$sel->setCellValue('A'.$i, 'STNK Status');
					$sel->mergeCells('A'.$i.':N'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('A'.$i)->getFont()->SetUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
					$sel->getStyle('A'.$i)->getFont()->setBold(true);
					$sel->getStyle('A'.$i)->getFont()->setSize(12);
					$i = $i + 2;
					$k = $k + 2;
					
					$sel->setCellValue('A'.$i, 'No');
					$sel->setCellValue('B'.$i, 'Dept');
					$sel->setCellValue('C'.$i, 'Customer');
					$sel->setCellValue('D'.$i, 'Status');
					$sel->setCellValue('E'.$i, 'Tgl Serah Ke Agen');
					$sel->setCellValue('F'.$i, 'Tgl Terima Dr Agen');
					$sel->setCellValue('G'.$i, 'No STNK');
					$sel->setCellValue('H'.$i, 'Tgl Serah Ke Cust');
					$sel->setCellValue('I'.$i, 'No Polisi');
					$sel->setCellValue('J'.$i, 'BBN');
					$sel->setCellValue('K'.$i, 'Jasa');
					$sel->setCellValue('L'.$i, 'Rangka');
					$sel->setCellValue('M'.$i, 'Mesin');
					$sel->setCellValue('N'.$i, 'Biro Jasa');
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('H'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('I'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('J'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('K'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('L'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('M'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('N'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					
					$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
						array(
							'borders' => array(
								'top' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':'.'N'.$i)->applyFromArray($warnakolom);
					$q = $i;
					$i++;
					$k++;
				}
				
				$sel->setCellValue('A'.$i, trim($l));
				$sel->setCellValue('B'.$i, trim($row->fs_nm_dept));
				$sel->setCellValue('C'.$i, trim($row->fs_nm_cust));
				$sel->setCellValue('D'.$i, trim($row->fs_status));
				$sel->setCellValue('E'.$i, trim($row->fd_serah_ke_agen));
				$sel->setCellValue('F'.$i, trim($row->fd_terima_dr_agen));
				$sel->setCellValue('G'.$i, trim($row->fs_stnk));
				$sel->setCellValue('H'.$i, trim($row->fd_serah_stnk_ke_cust));
				$sel->setCellValue('I'.$i, trim($row->fs_nopol));
				$sel->setCellValue('J'.$i, number_format(trim($row->fn_bbn)));
				$sel->setCellValue('K'.$i, number_format(trim($row->fn_jasa)));
				$sel->setCellValue('L'.$i, trim($row->fs_rangka));
				$sel->setCellValue('M'.$i, trim($row->fs_mesin));
				$sel->setCellValue('N'.$i, trim($row->fs_biro_jasa));
				$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('H'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('I'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('J'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('K'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('L'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('M'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('N'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				
				if ($k % 2 <> 0) {
					$sel->getStyle('A'.$i.':'.'N'.$i)->applyFromArray($warnakolom);
				}
				$i++;
				$k++;
				$l++;
			}
			$j = $i - 1;
			$sel->getStyle('A'.$j.':N'.$j)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$q = $p + 2;
			$arr = array(
				'borders' => array(
					'left' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				)
			);
			$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
			$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
			$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
			$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
			$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
			$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
			$sel->getStyle('G'.$q.':G'.$j)->applyFromArray($arr);
			$sel->getStyle('H'.$q.':H'.$j)->applyFromArray($arr);
			$sel->getStyle('I'.$q.':I'.$j)->applyFromArray($arr);
			$sel->getStyle('J'.$q.':J'.$j)->applyFromArray($arr);
			$sel->getStyle('K'.$q.':K'.$j)->applyFromArray($arr);
			$sel->getStyle('L'.$q.':L'.$j)->applyFromArray($arr);
			$sel->getStyle('M'.$q.':M'.$j)->applyFromArray($arr);
			$sel->getStyle('N'.$q.':N'.$j)->applyFromArray($arr);
			$sel->getStyle('N'.$q.':N'.$j)->applyFromArray(
				array(
					'borders' => array(
						'right' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$oWriter = PHPExcel_IOFactory::createWriter($oExcel, 'Excel5');
			$oWriter->save($xPath.$nmfile.'.xls');
			
			//hapus file lama
			$this->load->model('mMainModul','',true);
			$jamskg = $this->mMainModul->microtime_float();
			$exp = 1800;
			
			$current_dir = @opendir($xPath);
			while ($filename = @readdir($current_dir))
			{
				if ($filename != '.' and $filename != '..' and $filename != 'captcha')
				{
					$filename2 = str_replace('.xls', '', $filename);
					$filename2 = str_replace('.pdf', '', $filename2);
					
					$xlen = strlen($filename2);
					$xmulai = stripos($filename2,'-') + 1;
					$filename2 = substr($filename2,$xmulai,$xlen);
					
					if (($filename2 + $exp) < $jamskg)
					{
						@unlink($xPath.$filename);
					}
				}
			}
			@closedir($current_dir);
			//eof hapus file lama
			
			$hasil = array(
				'sukses'	=> true,
				'nmfile'	=> $xPath.$nmfile.'.xls'
			);
			
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'No record!!
			');
			echo json_encode($hasil);
		}
	}
	
	function excel_bpkb()
	{
		ini_set('memory_limit', '-1');
		
		$this->load->model('mMainModul','',true);
		$jamskg = $this->mMainModul->microtime_float();
		
		$nmfiletemp = 'tstatusbpkb';
		$nmfile = 'statusbpkb-'.$jamskg;
		$xIP = trim($this->session->userdata('ip_address'));
		$gIP = trim($this->session->userdata('gIP'));
		
		$oReader = PHPExcel_IOFactory::createReader('Excel5');
		
		if (trim($xIP) == trim($gIP))
		{
			$xtPath = '/var/www/'.config_item('base_folder').'/assets/docs/';
			$xPath = '/var/www/'.config_item('base_folder').'/temp/';
		}
		else
		{
			$xtPath = APPPATH.'../assets/docs/';
			$xPath = APPPATH.'../temp/';
		}
		
		$oExcel = $oReader->load($xtPath.$nmfiletemp.'.xls');
		$pjghal = 38;
		$i = 1;
		$l = 0; // no urut
		
		$k = 1; // pjg hal
		$p = 1; // awal hal
		$oExcel->getActiveSheet()->setTitle('StatusBPKB');
		$oExcel->getActiveSheet()->setShowGridlines(false);
		
		$oExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
		$oExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
		$oExcel->getActiveSheet()->getPageMargins()->setTop(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setBottom(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setLeft(0.2);
		$oExcel->getActiveSheet()->getPageMargins()->setRight(0);
		// $oExcel->getActiveSheet()->getHeaderFooter()->setOddFooter('&L&B' . '&RPage &P of &N');
		$oExcel->getDefaultStyle()->getFont()->setName('Calibri');
		$oExcel->getDefaultStyle()->getFont()->setSize(10);
		
		$sel = $oExcel->getActiveSheet();
		
		$tgl = trim($this->input->post('fd_tgl'));
		$tgl2 = trim($this->input->post('fd_tgl2'));
		$kdcust = trim($this->input->post('fs_kd_cust'));
		$kdcount = trim($this->input->post('fs_count'));
		$kdcust2 = trim($this->input->post('fs_kd_cust2'));
		$kdcount2 = trim($this->input->post('fs_count2'));
		
		$this->load->model('mStnkBpkbStatus','',true);
		$ssql = $this->mStnkBpkbStatus->grid2_all($tgl,$tgl2,$kdcust,$kdcount,$kdcust2,$kdcount2);
		
		if ($ssql->num_rows() > 0)
		{
			$warnakolom = array(
				'fill' => array(
					'type' => PHPExcel_Style_Fill::FILL_SOLID,
					'color' => array('rgb' => 'fff8dc')
				)
			);
			
			$i = 1;
			$k = 1;
			$sel->setCellValue('A'.$i, 'BPKB Status');
			$sel->mergeCells('A'.$i.':N'.$i);
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('A'.$i)->getFont()->SetUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
			$sel->getStyle('A'.$i)->getFont()->setBold(true);
			$sel->getStyle('A'.$i)->getFont()->setSize(12);
			$p = $i;
			$i = $i + 2;
			$k = $k + 2;
			
			$sel->setCellValue('A'.$i, 'No');
			$sel->setCellValue('B'.$i, 'Dept');
			$sel->setCellValue('C'.$i, 'Customer');
			$sel->setCellValue('D'.$i, 'Status');
			$sel->setCellValue('E'.$i, 'Tgl Serah Ke Agen');
			$sel->setCellValue('F'.$i, 'Tgl Terima Dr Agen');
			$sel->setCellValue('G'.$i, 'No BPKB');
			$sel->setCellValue('H'.$i, 'Tgl Serah Ke Cust');
			$sel->setCellValue('I'.$i, 'No Polisi');
			$sel->setCellValue('J'.$i, 'BBN');
			$sel->setCellValue('K'.$i, 'Jasa');
			$sel->setCellValue('L'.$i, 'Rangka');
			$sel->setCellValue('M'.$i, 'Mesin');
			$sel->setCellValue('N'.$i, 'Biro Jasa');
			$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('H'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('I'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('J'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('K'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('L'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('M'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$sel->getStyle('N'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			
			$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
				array(
					'borders' => array(
						'top' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			$sel->getStyle('A'.$i.':'.'N'.$i)->applyFromArray($warnakolom);
			$i++;
			$k++;
			$l++;
			
			foreach ($ssql->result() as $row)
			{
				if ($k > $pjghal)
				{
					$j = $i - 1;
					$sel->setBreak('A'.$j, PHPExcel_Worksheet::BREAK_ROW);
					$sel->getStyle('A'.$j.':N'.$j)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					
					$q = $p + 2;
					$arr = array(
						'borders' => array(
							'left' => array(
								'style' => PHPExcel_Style_Border::BORDER_THIN
							)
						)
					);
					$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
					$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
					$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
					$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
					$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
					$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
					$sel->getStyle('G'.$q.':G'.$j)->applyFromArray($arr);
					$sel->getStyle('H'.$q.':H'.$j)->applyFromArray($arr);
					$sel->getStyle('I'.$q.':I'.$j)->applyFromArray($arr);
					$sel->getStyle('J'.$q.':J'.$j)->applyFromArray($arr);
					$sel->getStyle('K'.$q.':K'.$j)->applyFromArray($arr);
					$sel->getStyle('L'.$q.':L'.$j)->applyFromArray($arr);
					$sel->getStyle('M'.$q.':M'.$j)->applyFromArray($arr);
					$sel->getStyle('N'.$q.':N'.$j)->applyFromArray($arr);
					$sel->getStyle('N'.$q.':N'.$j)->applyFromArray(
						array(
							'borders' => array(
								'right' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$p = $i;
					
					$k = 1;
					$sel->setCellValue('A'.$i, 'BPKB Status');
					$sel->mergeCells('A'.$i.':N'.$i);
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('A'.$i)->getFont()->SetUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
					$sel->getStyle('A'.$i)->getFont()->setBold(true);
					$sel->getStyle('A'.$i)->getFont()->setSize(12);
					$i = $i + 2;
					$k = $k + 2;
					
					$sel->setCellValue('A'.$i, 'No');
					$sel->setCellValue('B'.$i, 'Dept');
					$sel->setCellValue('C'.$i, 'Customer');
					$sel->setCellValue('D'.$i, 'Status');
					$sel->setCellValue('E'.$i, 'Tgl Serah Ke Agen');
					$sel->setCellValue('F'.$i, 'Tgl Terima Dr Agen');
					$sel->setCellValue('G'.$i, 'No STNK');
					$sel->setCellValue('H'.$i, 'Tgl Serah Ke Cust');
					$sel->setCellValue('I'.$i, 'No Polisi');
					$sel->setCellValue('J'.$i, 'BBN');
					$sel->setCellValue('K'.$i, 'Jasa');
					$sel->setCellValue('L'.$i, 'Rangka');
					$sel->setCellValue('M'.$i, 'Mesin');
					$sel->setCellValue('N'.$i, 'Biro Jasa');
					$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('B'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('C'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('D'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('H'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('I'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('J'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('K'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('L'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('M'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					$sel->getStyle('N'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
					
					$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
						array(
							'borders' => array(
								'top' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':N'.$i)->applyFromArray(
						array(
							'borders' => array(
								'bottom' => array(
									'style' => PHPExcel_Style_Border::BORDER_THIN
								)
							)
						)
					);
					$sel->getStyle('A'.$i.':'.'N'.$i)->applyFromArray($warnakolom);
					$q = $i;
					$i++;
					$k++;
				}
				
				$sel->setCellValue('A'.$i, trim($l));
				$sel->setCellValue('B'.$i, trim($row->fs_nm_dept));
				$sel->setCellValue('C'.$i, trim($row->fs_nm_cust));
				$sel->setCellValue('D'.$i, trim($row->fs_status));
				$sel->setCellValue('E'.$i, trim($row->fd_serah_ke_agen));
				$sel->setCellValue('F'.$i, trim($row->fd_terima_dr_agen));
				$sel->setCellValue('G'.$i, trim($row->fs_bpkb));
				$sel->setCellValue('H'.$i, trim($row->fd_serah_bpkb_ke_cust));
				$sel->setCellValue('I'.$i, trim($row->fs_nopol));
				$sel->setCellValue('J'.$i, number_format(trim($row->fn_bbn)));
				$sel->setCellValue('K'.$i, number_format(trim($row->fn_jasa)));
				$sel->setCellValue('L'.$i, trim($row->fs_rangka));
				$sel->setCellValue('M'.$i, trim($row->fs_mesin));
				$sel->setCellValue('N'.$i, trim($row->fs_biro_jasa));
				$sel->getStyle('A'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('E'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('F'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('G'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('H'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('I'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('J'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('K'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				$sel->getStyle('L'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('M'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				$sel->getStyle('N'.$i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				
				if ($k % 2 <> 0) {
					$sel->getStyle('A'.$i.':'.'N'.$i)->applyFromArray($warnakolom);
				}
				$i++;
				$k++;
				$l++;
			}
			$j = $i - 1;
			$sel->getStyle('A'.$j.':N'.$j)->applyFromArray(
				array(
					'borders' => array(
						'bottom' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$q = $p + 2;
			$arr = array(
				'borders' => array(
					'left' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				)
			);
			$sel->getStyle('A'.$q.':A'.$j)->applyFromArray($arr);
			$sel->getStyle('B'.$q.':B'.$j)->applyFromArray($arr);
			$sel->getStyle('C'.$q.':C'.$j)->applyFromArray($arr);
			$sel->getStyle('D'.$q.':D'.$j)->applyFromArray($arr);
			$sel->getStyle('E'.$q.':E'.$j)->applyFromArray($arr);
			$sel->getStyle('F'.$q.':F'.$j)->applyFromArray($arr);
			$sel->getStyle('G'.$q.':G'.$j)->applyFromArray($arr);
			$sel->getStyle('H'.$q.':H'.$j)->applyFromArray($arr);
			$sel->getStyle('I'.$q.':I'.$j)->applyFromArray($arr);
			$sel->getStyle('J'.$q.':J'.$j)->applyFromArray($arr);
			$sel->getStyle('K'.$q.':K'.$j)->applyFromArray($arr);
			$sel->getStyle('L'.$q.':L'.$j)->applyFromArray($arr);
			$sel->getStyle('M'.$q.':M'.$j)->applyFromArray($arr);
			$sel->getStyle('N'.$q.':N'.$j)->applyFromArray($arr);
			$sel->getStyle('N'.$q.':N'.$j)->applyFromArray(
				array(
					'borders' => array(
						'right' => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					)
				)
			);
			
			$oWriter = PHPExcel_IOFactory::createWriter($oExcel, 'Excel5');
			$oWriter->save($xPath.$nmfile.'.xls');
			
			//hapus file lama
			$this->load->model('mMainModul','',true);
			$jamskg = $this->mMainModul->microtime_float();
			$exp = 1800;
			
			$current_dir = @opendir($xPath);
			while ($filename = @readdir($current_dir))
			{
				if ($filename != '.' and $filename != '..' and $filename != 'captcha')
				{
					$filename2 = str_replace('.xls', '', $filename);
					$filename2 = str_replace('.pdf', '', $filename2);
					
					$xlen = strlen($filename2);
					$xmulai = stripos($filename2,'-') + 1;
					$filename2 = substr($filename2,$xmulai,$xlen);
					
					if (($filename2 + $exp) < $jamskg)
					{
						@unlink($xPath.$filename);
					}
				}
			}
			@closedir($current_dir);
			//eof hapus file lama
			
			$hasil = array(
				'sukses'	=> true,
				'nmfile'	=> $xPath.$nmfile.'.xls'
			);
			
			echo json_encode($hasil);
		}
		else
		{
			$hasil = array(
				'sukses'	=> false,
				'hasil'		=> 'No record!!
			');
			echo json_encode($hasil);
		}
	}	
}
?>