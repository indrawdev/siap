<?php
 
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=ALLFPDCMO.xls");
header("Pragma: no-cache");
header("Expires: 0");
?>

<h1 align="center">TABEL FIRST PAYMENT DEFAULT  <br>PERIODE PENCAIRAN : <?php echo $tglfix?> s/d <?php echo $tglfix2;?></h1>
<table border="1" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th align="center" width="1%">No</th>
							<th align="center" width="15%">Nama Surveyor</th>
							<th>Penjualan </th>
							<th>Lancar </th>
							<th>Overdue </th>
							<th>Lunas </th>
						</tr>
					</thead>
					<tbody>
					<?php $no=1; 

							foreach ($hasil as $row) :
							?>
						<tr>
							

							<td align="center" width="1%"><?php echo $no;?></td>
							<td align="center" width="15%"><?php echo $row['nama_svy'];?></td>
							<td><?php echo $row['penjualan'];?></td>
							<td><?php echo $row['lancar'];?></td>
							<td><?php echo $row['ovdue'];?></td>
							<td><?php echo $row['lunas'];?></td>
						</tr>
						<?php $no++; endforeach; ?>
					</tbody>
				</table>	
		