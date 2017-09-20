<?php
 
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=ALLFPDCAB.xls");
header("Pragma: no-cache");
header("Expires: 0");
?>

<h1 align="center">TABEL FIRST PAYMENT DEFAULT  <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PERIODE PENCAIRAN : <?php echo $tglfix?> s/d <?php echo $tglfix2;?></h1>
<table border="1" align="left" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th width="5%">No</th>
							<th width="10%">Nama Dealer</th>
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
							

							<td width="5%"><?php echo $no;?></td>
							<td width="10%"><?php echo $row['nama_dealer'];?></td>
							<td><?php echo $row['penjualan'];?></td>
							<td><?php echo $row['lancar'];?></td>
							<td><?php echo $row['ovdue'];?></td>
							<td><?php echo $row['lunas'];?></td>
						</tr>
						<?php $no++; endforeach; ?>
					</tbody>
				</table>	
		