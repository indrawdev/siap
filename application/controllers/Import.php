<?php

class Import extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		//change db
		//$this->mMainModul->change_db($this->session->userdata('gServer'),$this->session->userdata('gDatabase'));
		//eof change db
	}
	


	function index()
	{


$hostname_Database = "localhost";
$database_Database = "mfas_trial";
$username_Database = "mfasdbadmin";
$password_Database = "mfiMFI2017#";

echo $password_Database;die;

$mysqli = new mysqli($hostname_Database, $username_Database, $password_Database, $database_Database); 
if (mysqli_connect_errno()) {
   printf("Connect failed: %s\n", mysqli_connect_error());
   exit();
}

		$db_path = "import_tmp/ARAPK.DBF";
		$dbh = dbase_open($db_path, 2) or die("Error! Could not open dbase database file '$db_path'.");


		if ($dbh){

		$jum_record=dbase_numrecords($dbh);



		/* looping record dari DBF lalu insert ke mysql */
		for ($ind=1;$ind<=$jum_record;$ind++){
		$record=dbase_get_record($dbh,$ind);


		$data = array(
				'recoid' => $record[0]   
				'nomapk' => $record[1] 
				'flagtr' => $record[2] 
				'nomlks' => $record[3] 
				'noapke' => $record[4] 
				'jnsfrm' => $record[5] 
				'tglapk' => $record[6]  
				'kodelk' => $record[7]  
				'nomdel' => $record[8]  
				'jenpiu' => $record[9]  
				'polpen' => $record[10] 
				'nompjb' => $record[11]  
				'tglpjb' => $record[12]  
				'nampem' => $record[13]
				'alpem1' => $record[14]  
				'alpem2' => $record[15]  
				'namkot' => $record[16]  
				'kodeps' => $record[17]  
				'notelp' => $record[18]  
				'hphone' => $record[19]  
				'tpager' => $record[20]   
				'ushpem' => $record[21]  
				'kuspem' => $record[22]  
				'alupe1' => $record[23]  
				'alupe2' => $record[24]  
				'tlupem' => $record[25]  
				'gajpem' => $record[26]  
				'namphl' => $record[27]  
				'ushphl' => $record[28] 
				'kusphl' => $record[29]  
				'aluph1' => $record[30]  
				'aluph2' => $record[31] 
				'tluphl' => $record[33]  
				'gajphl' => $record[34]  
				'nampjm' => $record[35] 
				'alpjm1' => $record[36]  
				'alpjm2' => $record[37]  
				'kotpjm' => $record[38]  
				'kdppjm' => $record[39]  
				'tlppjm' => $record[40]  
				'ushpjm' => $record[41] 
				'kuspjm' => $record[42]  
				'stapjm' => $record[43] 
				'alupj1' => $record[44]  
				'alupj2' => $record[45]  
				'tlupjm' => $record[46]  
				'gajpjm' => $record[47]  
				'alkor1' => $record[48]  
				'alkor2' => $record[49] 
				'kotkor' => $record[50]  
				'poskor' => $record[51]  
				'stsrmh' => $record[52]  
				'sjktgl' => $record[53]  
				'tgjtkh' => $record[54]  
				'jnsklm' => $record[55]  
				'tptlhr' => $record[56]  
				'tgllhr' => $record[57]  
				'agama'  => $record[58] 
				'penddk' => $record[59]  
				'status' => $record[60]  
				'stskwn' => $record[61] 
				'tgngan' => $record[62]  
				'biayah' => $record[63] 
				'sjkker' => $record[64]  
				'tglsvy' => $record[65]  
				'lamsvy' => $record[66]  
				'ptgsvy' => $record[67]  
				'kptsan' => $record[68]  
				'tglkep' => $record[69]  
				'ketkep' => $record[70]  
				'tglspp' => $record[71]  
				'namsls' => $record[72]  
				'resiko' => $record[73]  
				'flagct' => $record[74]  
				'flctdp' => $record[75]  
				'flctsp' => $record[76]  
				'updtke' => $record[77]  
				'updtsp' => $record[78]  
				'tarikw' => $record[79]  
				'tglinp' => $record[80]  
				'naminp' => $record[81]   
				'usersp' => $record[82] 
				'srtstj' => $record[83] 
				'batapk' => $record[84]  
				'batspp' => $record[85]  
				'nomktp' => $record[86]  
				'nktpsd' => $record[87]  
				'flappr' => $record[88]  
				'apprid' => $record[89]  
				'nonpwp' => $record[90] 
				'sptthn' => $record[91]  
				'namibu' => $record[92]  
				'kecama' => $record[93]  
				'kelura' => $record[94]  
				'jobkon' => $record[95]  
				'kddati' => $record[96]  
				'tglspk' => $record[97]  
				'tgctpo' => $record[98]

				);
				$this->db->insert('tx_arapk', $data);


		}
		base_close($dbh);
	}

		
			
		
}
?>