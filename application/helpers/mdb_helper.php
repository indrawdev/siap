<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	function readData()
	{
		$dbName = $_SERVER["DOCUMENT_ROOT"] . "/siap/tmpdb/att2000.mdb";
		if (!file_exists($dbName)) {
		    die("Could not find database file.");
		}
		
		$db = new PDO("odbc:DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=$dbName; Uid=; Pwd=;");
		
		$sql = "SELECT b.USERID, a.CHECKTIME FROM CHECKINOUT a LEFT JOIN USERINFO b ON b.USERID = a.USERID";
		$result = $db->query($sql);
		while ($row = $result->fetch()) {
			echo '<pre>';
		    echo $row["USERID"]. '<br>';
		    echo $row["CHECKTIME"]. '<br>';
		}
	}