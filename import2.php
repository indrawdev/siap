<?php
/* buka koneksi database kita */

// $database_host = "localhost";
// $database_user = "mfasdbadmin";
// $database_password = "mfiMFI2017#";
// $database_name = "mfas_trial";	

	
$hostname_Database = "localhost";
$database_Database = "mfas_trial";
$username_Database = "mfasdbadmin";
$password_Database = "mfiMFI2017#";


$mysqli = new mysqli($hostname_Database, $username_Database, $password_Database, $database_Database); 
if (mysqli_connect_errno()) {
   printf("Connect failed: %s\n", mysqli_connect_error());
   exit();
}


/* memanggil file DBF untuk kita Buka */
$db_path = "DBF/AROVDD.DBF";
$dbh = dbase_open($db_path, 2) or die("Error! Could not open dbase database file '$db_path'.");


if ($dbh){


$sqldelete="DELETE FROM tx_arovdd";	

$resultz = $mysqli->query($sqldelete);
if (!$resultz) {
   printf("%s\n", $mysqli->error);
   exit();
}

$jum_record=dbase_numrecords($dbh);



/* looping record dari DBF lalu insert ke mysql */
for ($ind=1;$ind<=$jum_record;$ind++){
$record=dbase_get_record($dbh,$ind);

$var16 = $mysqli->real_escape_string($record[0]);
$var17 = $mysqli->real_escape_string($record[1]);
$var18 = $mysqli->real_escape_string($record[2]);
$var19 = $mysqli->real_escape_string($record[3]);
$var21 = $mysqli->real_escape_string($record[4]);
$var22 = $mysqli->real_escape_string($record[5]);
$var23 = $mysqli->real_escape_string($record[6]);
$var24 = $mysqli->real_escape_string($record[7]);
$var25 = $mysqli->real_escape_string($record[8]);
$var26 = $mysqli->real_escape_string($record[9]);
$var27 = $mysqli->real_escape_string($record[10]);
$var28 = $mysqli->real_escape_string($record[11]);
$var29 = $mysqli->real_escape_string($record[12]);
$var30 = $mysqli->real_escape_string($record[13]);


$sql = "INSERT INTO `tx_arovdd` (kodelk,nomdel,jenpiu,polpen,nompjb,tglupd,tglovd,outgrs,outnet,ovdgrs,ovdnet,lamovd,jumken,cabang) 
VALUES ('$var16','$var17','$var18','$var19','$var21','$var22','$var23','$var24','$var25','$var26','$var27','$var28','$var29','$var30')";

$result = $mysqli->query($sql);
if (!$result) {
   printf("%s\n", $mysqli->error);
   exit();
}


}

/* close insert */
dbase_close($dbh);
}?>