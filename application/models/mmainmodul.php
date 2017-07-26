<?php

class MMainModul extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function AmbilKode($xKdParam,$xKdPrefix,$xJmlNol)
	{
		$xSQL = ("
			SELECT	CONCAT('".trim($xKdPrefix)."',LPAD(RIGHT(fn_nilai, ".$xJmlNol.") + 1, ".$xJmlNol.", '0')) fn_nilai
			FROM 	tm_parameter_no
			WHERE 	fs_kd_parameter = '".trim($xKdParam)."'
				AND	fn_nilai LIKE '".trim($xKdPrefix)."%'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function AmbilMaxHari($xBln,$xThn)
	{
		$xBln = (int)$xBln;
		if ($xBln == 1 or $xBln == 3 or $xBln == 5 or $xBln == 7 or $xBln == 8 or $xBln == 10 or $xBln == 12)
		{
			return 31;
		}
		elseif ($xBln == 4 or $xBln == 6 or $xBln == 9 or $xBln == 11)
		{
			return 30;
		}
		elseif ($xBln == 2)
		{
			if ($xThn % 4 == 0)
			{
				return 29;
			}
			else
			{
				return 28;
			}
		}
	}
	
	function AmbilTgl($xTgl,$xJmlHari)
	{
		if ($xJmlHari == 0)
		{
			return $xTgl;
		}
		else
		{
			$xHr = substr(trim($xTgl),-2);
			$xBln = substr(trim($xTgl),5,2);
			$xThn = substr(trim($xTgl),0,4);
			
			if ($xJmlHari > 0)
			{
				$xJmlHari--;
				$xHr++;
				
				if ($xHr > $this->AmbilMaxHari($xBln,$xThn))
				{
					$xHr = 1;
					$xBln++;
				}
				
				if ($xBln > 12)
				{
					$xBln = 1;
					$xThn++;
				}
			}
			else
			{
				$xJmlHari++;
				$xHr--;
				
				if ($xHr == 0)
				{
					$xBln--;
					
					if ($xBln == 0)
					{
						$xBln = 12;
						$xThn--;
					}
					$xHr = $this->AmbilMaxHari($xBln,$xThn);
				}
			}
			$xTglBaru = '';
			$xTglBaru = sprintf('%02d',trim($xHr)).'-'.sprintf('%02d',trim($xBln)).'-'.trim($xThn);
			
			return $xTglBaru;
		}
	}
	
	function BuatPDF($xNmFile)
	{
		error_reporting(E_ALL);
		ini_set('display_errors', TRUE);
		ini_set('display_startup_errors', TRUE);
		
		define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');
		
		$xLibPath = APPPATH.'../application/libraries/';
		$xPath = APPPATH.'../temp/';
		
		require_once $xLibPath.'PHPExcel/PHPExcel.php';
		
		$rendererName = PHPExcel_Settings::PDF_RENDERER_MPDF;
		$rendererLibraryPath = $xLibPath.'MPDF57/';
		
		$oReader = PHPExcel_IOFactory::createReader('Excel5');
		$oExcel = $oReader->load($xPath.trim($xNmFile).'.xls');
		
		try {
			if (!PHPExcel_Settings::setPdfRenderer(
				$rendererName,
				$rendererLibraryPath
			)) {
				echo (
					'NOTICE: Please set the $rendererName and $rendererLibraryPath values' .
					EOL .
					'at the top of this script as appropriate for your directory structure' .
					EOL
				);
			} else {
				$oWriter = PHPExcel_IOFactory::createWriter($oExcel, 'PDF');
				$oWriter->save(str_replace('.php', '.pdf', $xPath.trim($xNmFile).'.pdf'));
			}
		} catch (Exception $e) {
		}
	}
	
	function CekCaptcha($sCaptcha)
	{
		$xSQL = ("
			SELECT 	COUNT(*) AS fn_jml
			FROM 	captcha
			WHERE 	word = '".trim($sCaptcha)."'
				AND ip_address = '".trim($this->input->ip_address())."'
				AND captcha_time >= '".trim($this->session->userdata('vcpt'))."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ChangeDB($nama_server,$nama_db)
	{
		$config['hostname'] = $nama_server;
		$config['username'] = "root";
		$config['password'] = "root";
		$config['database'] = $nama_db;
		$config['dbdriver'] = "mysql";
		$config['dbprefix'] = "";
		$config['pconnect'] = FALSE;
		$config['db_debug'] = TRUE;
		
		$this->load->database($config,TRUE);
	}
	
	function Coding($xString)
	{
		$xLenStr = strlen(trim($xString));
		$xText = array();
		$xHasil = '';
		$xSisa = 0;
		for($i = 0; $i < $xLenStr; $i++)
		{
			$xHasil = $xHasil.chr((255 - ord(substr(trim($xString),$i,1))) + $xSisa);
			if ($i <> $xLenStr)
			{
				$xSisa = ord(substr(trim($xString),$i,1)) % 30;
			}
		}
		return $xHasil;
	}
	
	function CekCounterField($xField)
	{
		$sSQL = $this->db->query("
			SELECT	a.COLUMN_NAME
			FROM 	`information_schema`.`COLUMNS` a
			WHERE 	table_name = 'tm_parameter'
				AND a.COLUMN_NAME = '".trim($xField)."'
			");
		return $sSQL;
	}
	
	function CounterFieldTerakhir()
	{
		$sSQL = $this->db->query("
			SELECT a.COLUMN_NAME fs_kolom
			FROM `information_schema`.`COLUMNS` a
			WHERE table_name = 'tm_parameter'
			ORDER BY a.ORDINAL_POSITION DESC LIMIT 1
			");
		return $sSQL;
	}
	
	function CounterAdd($xField,$xField1)
	{
		$xSQL = ("
			ALTER TABLE tm_parameter
			ADD COLUMN ".trim($xField)." INTEGER UNSIGNED NOT NULL DEFAULT 0 AFTER ".trim($xField1)."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CounterDel($xField)
	{
		$xSQL = ("
			ALTER TABLE tm_parameter
			DROP COLUMN ".trim($xField)."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function Decoding($xString)
	{
		$xlenstr = strlen(trim($xString));
		$xText = array();
		$xHasil = '';
		$sisa = 0;
		for($i = 0; $i < $xlenstr; $i++)
		{
			$xHasil = $xHasil.chr((255 - ord(substr(trim($xString),$i,1))) - $sisa);
			if ($i <> $xlenstr)
			{
				$sisa = ord(substr(trim($xString),$i,1)) % 30;
			}
		}
		return $xHasil;
	}
	
	function MicrotimeFloat()
	{
		 list($usec, $sec) = explode(" ", microtime());
		 return round(((float)$usec + (float)$sec));
	}
	
	function NamaBulan($xNmBulan)
	{
		$xArrNmBulan = array(
			1	=> 'Januari',
			2	=> 'Februari',
			3	=> 'Maret',
			4	=> 'April',
			5	=> 'Mei',
			6	=> 'Juni',
			7	=> 'Juli',
			8	=> 'Agustus',
			9	=> 'September',
			10	=> 'Oktober',
			11	=> 'Nopember',
			12	=> 'Desember',
		);
		return $xArrNmBulan[$xNmBulan];
	}
	
	function NamaHari($xNmHari)
	{
		$xArrNmHari = array(
			0	=> 'Minggu',
			1	=> 'Senin',
			2	=> 'Selasa',
			3	=> 'Rabu',
			4	=> 'Kamis',
			5	=> 'Jumat',
			6	=> 'Sabtu'
		);
		return $xArrNmHari[$xNmHari];
	}
	
	function ParamSistem($xKdParam)
	{
		$xSQL = ("
			SELECT	fs_nilai
			FROM	tm_parameter_sistem
			WHERE	fs_kd_parameter = '".trim($xKdParam)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function TabelSesi()
	{
		$xSQL = ("
			IF NOT EXISTS (	SELECT	name 
							FROM   	sysobjects (NOLOCK)
							WHERE  	name = 'CI_Sessions' 
								AND	type = 'U')
			BEGIN
				CREATE TABLE CI_Sessions (
					session_id VARCHAR(40) DEFAULT '0' NOT NULL,
					ip_address VARCHAR(16) DEFAULT '0' NOT NULL,
					user_agent VARCHAR(120) NOT NULL,
					last_activity INT DEFAULT 0 NOT NULL,
					user_data VARCHAR(8000) NOT NULL,
					CONSTRAINT  PK_CI_Session PRIMARY KEY (session_id ASC)
				)
			
				CREATE NONCLUSTERED INDEX NCI_Session_Activity
				ON CI_Sessions(last_activity DESC)
			END 
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function TabelCaptcha()
	{
		$xSQL = ("
			IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[captcha]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
			DROP TABLE [dbo].[captcha]
			
			CREATE TABLE [dbo].[captcha] (
				[captcha_id]	[BIGINT] IDENTITY (1, 1) NOT NULL,
				[captcha_time] 	[VARCHAR] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL DEFAULT ('0'),
				[ip_address] 	[VARCHAR] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL DEFAULT ('0'),
				[word] 			[VARCHAR] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL DEFAULT (' ')
			) ON [PRIMARY]
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function TglDMY($sStr)
	{
		// 3000-01-01
		$xHasil = substr(trim($sStr),8,2).'-'.substr(trim($sStr),5,2).'-'.substr(trim($sStr),0,4);
		return $xHasil;
	}
	
	function TglYMD($sStr)
	{
		// 01-01-3000
		$xHasil = substr(trim($sStr),6,4).'-'.substr(trim($sStr),3,2).'-'.substr(trim($sStr),0,2);
		return $xHasil;
	}
	
	function ValidUserPass($KdUser)
	{
		$xSQL = ("
			SELECT	IFNULL(fs_kd_user, '') fs_kd_user,
					IFNULL(fs_nm_user, '') fs_nm_user, IFNULL(fs_password, '') fs_password
			FROM	tm_user
			WHERE	fs_kd_user = ?
				AND	fb_aktif = '1'
		");
		
		$sSQL = $this->db->query($xSQL, trim($KdUser));
		return $sSQL;
	}
}
?>
