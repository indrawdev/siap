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
$db_path = "DBF/ARPJB.DBF";
$dbh = dbase_open($db_path, 2) or die("Error! Could not open dbase database file '$db_path'.");


if ($dbh){


$sqldelete="DELETE FROM tx_arpjb";	

$resultz = $mysqli->query($sqldelete);
if (!$resultz) {
   printf("%s\n", $mysqli->error);
   exit();
}

$jum_record=dbase_numrecords($dbh);



/* looping record dari DBF lalu insert ke mysql */
for ($ind=1;$ind<=$jum_record;$ind++){
$record=dbase_get_record($dbh,$ind);

$var0 = $mysqli->real_escape_string($record[0]);
$var1 = $mysqli->real_escape_string($record[1]);
$var2 = $mysqli->real_escape_string($record[2]);
$var3 = $mysqli->real_escape_string($record[3]);
$var4 = $mysqli->real_escape_string($record[4]);
$var5 = $mysqli->real_escape_string($record[5]);
$var6 = $mysqli->real_escape_string($record[6]);
$var7 = $mysqli->real_escape_string($record[7]);
$var8 = $mysqli->real_escape_string($record[8]);
$var9 = $mysqli->real_escape_string($record[9]);
$var10 = $mysqli->real_escape_string($record[10]);
$var11 = $mysqli->real_escape_string($record[11]);
$var12 = $mysqli->real_escape_string($record[12]);
$var13 = $mysqli->real_escape_string($record[13]);
$var14 = $mysqli->real_escape_string($record[14]);
$var15 = $mysqli->real_escape_string($record[15]);
$var16 = $mysqli->real_escape_string($record[16]);
$var17 = $mysqli->real_escape_string($record[17]);
$var18 = $mysqli->real_escape_string($record[18]);
$var19 = $mysqli->real_escape_string($record[19]);
$var20 = $mysqli->real_escape_string($record[20]);
$var21 = $mysqli->real_escape_string($record[21]);
$var22 = $mysqli->real_escape_string($record[22]);
$var23 = $mysqli->real_escape_string($record[23]);
$var24 = $mysqli->real_escape_string($record[24]);
$var25 = $mysqli->real_escape_string($record[25]);
$var26 = $mysqli->real_escape_string($record[26]);
$var27 = $mysqli->real_escape_string($record[27]);
$var28 = $mysqli->real_escape_string($record[28]);
$var29 = $mysqli->real_escape_string($record[29]);
$var30 = $mysqli->real_escape_string($record[30]);
$var31 = $mysqli->real_escape_string($record[31]);
$var32 = $mysqli->real_escape_string($record[32]);
$var33 = $mysqli->real_escape_string($record[33]);
$var34 = $mysqli->real_escape_string($record[34]);
$var35 = $mysqli->real_escape_string($record[35]);
$var36 = $mysqli->real_escape_string($record[36]);
$var37 = $mysqli->real_escape_string($record[37]);
$var38 = $mysqli->real_escape_string($record[38]);
$var39 = $mysqli->real_escape_string($record[39]);
$var40 = $mysqli->real_escape_string($record[40]);
$var41 = $mysqli->real_escape_string($record[41]);
$var42 = $mysqli->real_escape_string($record[42]);
$var43 = $mysqli->real_escape_string($record[43]);
$var44 = $mysqli->real_escape_string($record[44]);
$var45 = $mysqli->real_escape_string($record[45]);
$var46 = $mysqli->real_escape_string($record[46]);
$var47 = $mysqli->real_escape_string($record[47]);
$var48 = $mysqli->real_escape_string($record[48]);
$var49 = $mysqli->real_escape_string($record[49]);
$var50 = $mysqli->real_escape_string($record[50]);
$var51 = $mysqli->real_escape_string($record[51]);
$var52 = $mysqli->real_escape_string($record[52]);
$var53 = $mysqli->real_escape_string($record[53]);
$var54 = $mysqli->real_escape_string($record[54]);
$var55 = $mysqli->real_escape_string($record[55]);
$var56 = $mysqli->real_escape_string($record[56]);
$var57 = $mysqli->real_escape_string($record[57]);
$var58 = $mysqli->real_escape_string($record[58]);
$var59 = $mysqli->real_escape_string($record[59]);
$var60 = $mysqli->real_escape_string($record[60]);
$var61 = $mysqli->real_escape_string($record[61]);
$var62 = $mysqli->real_escape_string($record[62]);
$var63 = $mysqli->real_escape_string($record[63]);
$var64 = $mysqli->real_escape_string($record[64]);
$var65 = $mysqli->real_escape_string($record[65]);
$var66 = $mysqli->real_escape_string($record[66]);
$var67 = $mysqli->real_escape_string($record[67]);
$var68 = $mysqli->real_escape_string($record[68]);
$var69 = $mysqli->real_escape_string($record[69]);
$var70 = $mysqli->real_escape_string($record[70]);
$var71 = $mysqli->real_escape_string($record[71]);
$var72 = $mysqli->real_escape_string($record[72]);
$var73 = $mysqli->real_escape_string($record[73]);
$var74 = $mysqli->real_escape_string($record[74]);
$var75 = $mysqli->real_escape_string($record[75]);
$var76 = $mysqli->real_escape_string($record[76]);
$var77 = $mysqli->real_escape_string($record[77]);
$var78 = $mysqli->real_escape_string($record[78]);
$var79 = $mysqli->real_escape_string($record[79]);
$var80 = $mysqli->real_escape_string($record[80]);
$var81 = $mysqli->real_escape_string($record[81]);
$var82 = $mysqli->real_escape_string($record[82]);
$var83 = $mysqli->real_escape_string($record[83]);
$var84 = $mysqli->real_escape_string($record[84]);
$var85 = $mysqli->real_escape_string($record[85]);
$var86 = $mysqli->real_escape_string($record[86]);
$var87 = $mysqli->real_escape_string($record[87]);
$var88 = $mysqli->real_escape_string($record[88]);
$var89 = $mysqli->real_escape_string($record[89]);
$var90 = $mysqli->real_escape_string($record[90]);
$var91 = $mysqli->real_escape_string($record[91]);
$var92 = $mysqli->real_escape_string($record[92]);
$var93 = $mysqli->real_escape_string($record[93]);
$var94 = $mysqli->real_escape_string($record[94]);
$var95 = $mysqli->real_escape_string($record[95]);

$sql = "INSERT INTO `tx_arpjb` (recoid,nomrjb,nomdel,kodelk,nomrut,jenpiu,polpen,nompjb,kodekr,tglpjb,jumken,jenken,thnken,kodebk,kowibk,noacbk,nombbk,nombbt,nobbkt,masafl,nampem,alpem1,alpem2,namkot,hrgotr,potang,umpmlk,prempl,perbap,perbep,biangp,jlangp,jaytsp,anytsp,umdeal,premdl,perbad,perbed,biangd,juhang,juhadk,jlangd,jlayts,angyts,apbyrm,apbyrk,apbyrv,apbydk,biaadm,dendad,binori,biasur,pdtlin,residu,carang,lamang,masang,bekang,bekanp,angdel,carbar,tglang,tgangs,anggih,juangi,juandk,tglstj,tglrep,biarep,tagrep,selrep,srepdk,angrep,arepdk,noskmr,tgskmr,flagnw,sudobl,nodobl,sudoby,nodoby,tgllns,tglres,akrctk,kodsup,nomsup,flagcr,flagbl,kodcab,tglanp,tgangp,aroffs,dndphr,prmask,status,nlcair) 

VALUES ('$var0','$var1','$var2','$var3','$var4','$var5','$var6','$var7','$var8','$var9','$var10','$var11','$var12','$var13','$var14','$var15','$var16','$var17','$var18','$var19','$var20','$var21','$var22','$var23','$var24','$var25','$var26','$var27','$var28','$var29','$var30','$var31','$var32','$var33','$var34','$var35','$var36','$var37','$var38','$var39','$var40','$var41','$var42','$var43','$var44','$var45','$var46','$var47','$var48','$var49','$var50','$var51','$var52','$var53','$var54','$var55','$var56','$var57','$var58','$var59','$var60','$var61','$var62','$var63','$var64','$var65','$var66','$var67','$var68',
	'$var69','$var70','$var71','$var72','$var73','$var74','$var75','$var76','$var77','$var78','$var79','$var80','$var81','$var82'
	,'$var83','$var84','$var85','$var86','$var87','$var88','$var89','$var90','$var91','$var92','$var93','$var94','$var95')";
$result = $mysqli->query($sql);
if (!$result) {
   printf("%s\n", $mysqli->error);
   exit();
}


}

/* close insert */
dbase_close($dbh);
}?>