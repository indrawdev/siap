<table border="1" width="100%" cellpadding="5">
	 <thead>
                        <tr>
                                    <th>Nama Jabatan</th>
                                    <th>Nama SDM</th>
                                </tr>
                      	 </thead>
   					<?php
						foreach ($jabatan as $row){
							?>
	<tbody>
	<tr>
		<td align="right"><?php echo $row->fs_nama_jabatan?></td>
	

	<?php $total = $this->db->from('tm_sdm')->where('fs_aktif','1')->where('fs_kode_cabang',$kode_cabang)->where('fs_kode_jabatan',$row->fs_kode_jabatan)->get()->result();
	if($total>1){
	?>
	<td align="right" coslpan="2">
	<?php foreach($total as $row2){

										$total2 = $this->db->from('tm_user')->where('fs_aktif','1')->where('fs_kode_cabang',$kode_cabang)->where('fs_nik',$row2->fs_nik)->get()->row();
	?>
	<!--<?php echo $row2->fs_nama."-".$total2->fs_email."<br>";?>-->
	<?php echo $row2->fs_nama."<br>";?>
	
	<?php }?>

		</td>

<?php } else {?>
		<td align="right" coslpan="2"> 123123123123</td>
		<?php } ?>
	</tr>
	<?php } ?>
	</tbody>

</table>