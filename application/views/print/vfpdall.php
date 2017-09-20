<?php date_default_timezone_set("Asia/Jakarta"); ?>

<h1 align="center">TABEL FIRST PAYMENT DEFAULT</h1>
<table border="1" align="left" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th width="5%">No</th>
							<th width="25%">Nama Dealer</th>
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
							<td width="25%"><?php echo $row['nama_dealer'];?></td>
							<td><?php echo $row['penjualan'];?></td>
							<td><?php echo $row['lancar'];?></td>
							<td><?php echo $row['ovdue'];?></td>
							<td><?php echo $row['lunas'];?></td>
						</tr>
						<?php $no++; endforeach; ?>
					</tbody>
				</table>	
		