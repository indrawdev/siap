<?php date_default_timezone_set("Asia/Jakarta"); ?>

<h1 align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TABEL FIRST PAYMENT DEFAULT CMO (<?php echo $ptgsvy;?>) <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PERIODE PENCAIRAN : <?php echo $tglfix?> s/d <?php echo $tglfix2;?></h1>
<table border="1" align="center" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th>Nomor PJJ</th>
							<th width="25%">Nama Konsumen</th>
							<th>Lama Overdue</th>
							<th width="15%">Outstanding Gross</th>
							<th width="15%">Outstanding Nett</th>
							<th>Overdue Gross</th>
							<th>Overdue Nett</th>
							<th>Tgl Cair</th>
						</tr>
					</thead>
					<tbody>
					<?php $no=1; 
							foreach ($hasil as $row) :
							?>
						<tr>
							

							<td><?php echo $row->kodelk.''.$row->nomdel.''.$row->jenpiu.''.$row->polpen.''.$row->nompjb;?></td>
							<td width="25%"><?php echo $row->nampem;?></td>
							<td><?php echo $row->lamovd;?></td>
							<td width="15%"><?php echo number_format($row->outgrs,0,',','.');?></td>
							<td width="15%"><?php echo number_format($row->outnet,0,',','.');?></td>
							<td><?php echo number_format($row->ovdgrs,0,',','.');?></td>
							<td><?php echo number_format($row->ovdnet,0,',','.');?></td>
							<td><?php echo $row->tglstj;?></td>
						</tr>
						<?php $no++; endforeach; ?>
					</tbody>
				</table>	
		