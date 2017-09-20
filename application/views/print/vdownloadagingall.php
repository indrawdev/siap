<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=ALLAGING.xls");
header('Pragma: public');
header("Expires: 0");
?>

<h1 align="center">TABEL AGING ALL </h1>
<table border="1" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th>No</th>
							<th>Kategori Aging</th>
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
								<td align="center" ><?php echo $no;?></td>
								<td align="center" ><?php echo trim($row['kategori']);?></td>
								<td align="center" ><?php echo trim($row['unit']);?></td>
								<td align="right" ><?php echo trim($row['ospokok']);?></td>
								<td align="right" ><?php echo trim($row['ospiu']);?></td>
							</tr>
						<?php $no++; endforeach; ?>
					</tbody>
</table>	
		