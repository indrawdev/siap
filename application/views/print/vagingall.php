<?php date_default_timezone_set("Asia/Jakarta"); ?>

<h1 align="center">TABEL AGING ALL <?php echo $nama_cabang;?></h1>
<table border="1" align="left" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th width="5%">No</th>
							<th width="25%">Kategori Aging</th>
							<th>Unit </th>
							<th>O/S POKOK </th>
							<th>O/S PIUTANG </th>
						</tr>
					</thead>
					<tbody>
					<?php $no=1; 

							foreach ($hasil as $row) :
							?>
						<tr>
							

							<td width="5%"><?php echo $no;?></td>
							<td width="25%"><?php echo $row['kategori'];?></td>
							<td><?php echo $row['unit'];?></td>
							<td><?php echo $row['ospokok'];?></td>
							<td><?php echo $row['ospiu'];?></td>
							
						</tr>
						<?php $no++; endforeach; ?>
					</tbody>
				</table>	
		