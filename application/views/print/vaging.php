<?php date_default_timezone_set("Asia/Jakarta");
?>

<h1 align="center">TABEL AGING SURVEYOR (<?php echo $kategori?>) <?php echo $nama_cabang?> </h1>
<table border="1" align="left" width="100%" cellpadding="5px">
					<thead>
						<tr>
							<th>Nomor PJJ</th>
							<th width="25%">Nama Konsumen</th>
							<th>Nama Svy</th>
							<th width="15%">Outstanding Gross</th>
							<th width="15%">Outstanding Nett</th>
							<th>Overdue Gross</th>
							<th>Overdue Nett</th>
							<th>Tgl Cair</th>
							<th>OVD</th>
						</tr>
					</thead>
					<tbody>
					<?php $no=1; 
							foreach ($hasil as $row) :

								$queryz = $this->db->query("SELECT ptgsvy FROM tx_arapk WHERE kodelk='".$row->kodelk."' and nomdel='".$row->nomdel."' and jenpiu='".$row->jenpiu."' and polpen='".$row->polpen."' and nompjb='".$row->nompjb."'");
									$b = $queryz->row();

								if($kategori=='CURRENT'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb  WHERE a.lamovd=0 and a.ovdnet=0 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='1-7 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb WHERE a.lamovd>0 and a.lamovd<=7 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='8-15 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb   WHERE a.lamovd>7 and a.lamovd<=15 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='16-30 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb  WHERE a.lamovd>15 and a.lamovd<=30 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='31-60 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb   WHERE a.lamovd>30 and a.lamovd<=60 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='61-90 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb  WHERE a.lamovd>60 and a.lamovd<=91 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='91-120 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb  WHERE a.lamovd>90 and a.lamovd<=120 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}

								if($kategori=='> 120 Hari'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb WHERE a.lamovd>120 and a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}


								if($kategori=='Total'){
									$query = $this->db->query("SELECT a.outgrs,a.outnet,a.ovdgrs,a.ovdnet,a.tglupd,b.nampem,c.ptgsvy,b.tglstj,a.lamovd FROM tx_arovdd a LEFT JOIN tx_arpjb b ON a.nompjb=b.nompjb LEFT JOIN tx_arapk c ON a.nompjb=c.nompjb WHERE a.kodelk='".$row->kodelk."' and a.nomdel='".$row->nomdel."' and a.jenpiu='".$row->jenpiu."' and a.polpen='".$row->polpen."' and a.nompjb='".$row->nompjb."'");

									
									$a = $query->row();
									$hasil = $query->num_rows();
								}
							?>

							<?php if($hasil!=0) {?>
						<tr>
							
							<td><?php echo $row->kodelk.''.$row->nomdel.''.$row->jenpiu.''.$row->polpen.''.$row->nompjb;?></td>
							<td width="25%"><?php echo $row->nampem;?></td>
							<td><?php echo $b->ptgsvy;?></td>
							<td width="15%"><?php echo number_format($a->outgrs,0,',','.');?></td>
							<td width="15%"><?php echo number_format($a->outnet,0,',','.');?></td>
							<td><?php echo number_format($a->ovdgrs,0,',','.');?></td>
							<td><?php echo number_format($a->ovdnet,0,',','.');?></td>
							<td><?php echo $a->tglstj;?></td>
							<td><?php echo $a->lamovd;?></td>
							
						</tr>
						<?php }?>
						<?php $no++; endforeach; ?>
					</tbody>
				</table>	
		