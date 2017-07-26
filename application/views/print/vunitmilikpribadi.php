<table border="0" align="center" width="100%">
	<thead>
		<?php if ($kop == 1) : ?>
		<tr>
			<td width="20%" align="left"><img src="assets/img/mandiri-finance.png" /></td>
			<td width="40%"></td>
			<td width="40%" align="right" style="font-size: 6px">
				<b>PT. MANDIRI FINANCE INDONESIA</b><br><?php echo $cabang->fs_nama_cabang; ?><br><?php echo $cabang->fs_alamat_cabang; ?><br>Telp: <?php echo $cabang->fs_telfon_cabang; ?>, Fax: <?php echo $cabang->fs_fax_cabang; ?></td>
		</tr>
		<?php endif ;?>
		<tr>
			<td width="100%"></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td width="100%" align="center"><b>SURAT PERNYATAAN</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Saya yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Alamat tinggal sekarang</td>
			<td width="1%">:</td>
			<td width="70%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">No. KTP/SIM</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php echo $detail->fs_ktp_konsumen; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Tempat Tanggal Lahir</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php echo $detail->fs_tempat_lahir_konsumen .', '. tanggal_indo($detail->fd_tanggal_lahir_konsumen); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Pekerjaan</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php if (!empty($usaha_konsumen->fs_nama_sektor_ekonomi)) { echo $usaha_konsumen->fs_nama_sektor_ekonomi; } ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Dengan ini saya menyatakan dengan sebenar-benarnya bahwa kendaraan yang BPKB nya ada dan/atau dibiayai oleh PT. Mandiri Finance Indonesia, sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Merk</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Tipe</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php echo $detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">Nomor Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="70%" align="left"><?php echo $detail->fs_no_rangka . ' / '. $detail->fs_no_mesin; ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">adalah benar-benar milik dan akan saya pergunakan PRIBADI dan BUKAN milik atau digunakan orang lain tanpa sepengetahuan dan persetujuan saya, yang mana unit ini dari <?php if (!empty($dealer->fs_nama_dealer)) { echo $dealer->fs_nama_dealer; } ?> *(dan kemudian diikat dengan Perjanjian Fidusia) dan saya tidak akan memindah tangankan atau menggadaikan bahkan menjual unit tersebut tanpa sepengetahuan dan persetujuan dari pihak PT. MANDIRI FINANCE INDONESIA baik secara tertulis maupun tidak.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Saya menyatakan bahwa pembiayaan yang dilakukan oleh PT. Mandiri Finance Indonesia dan mengikat nama saya, memang benar untuk kepentingan saya sendiri, bukan kontrak atas nama yang berkaitan dengan orang lain. Adapun pembiayaan / dana dari PT. MANDIRI FINANCE INDONESIA benar-benar akan <b>saya gunakan untuk diri saya dan BUKAN untuk orang lain.</b> Saya sanggup untuk melakukan pembayaran angsuran tepat waktu sesuai jatuh temponya yaitu tanggal <?php echo $detail->fs_tanggal_jatuhtempo_perbulan; ?> setiap bulannya.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Apabila pernyataan saya ini tidak benar maka saya bersedia menyerahkan unit saya tersebut di atas kepada pihak PT. Mandiri Finance Indonesia dan saya bersedia mempertanggungjawabkannya dan menerima sanksi hukum sesuai dengan ketentuan yang berlaku.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Demikian surat pernyataan ini saya buat dengan sebenar-benarnya tanpa adanya paksaan dari pihak manapun.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<tr>
			<td width="100%" align="left">Yang Membuat Pernyataan,</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="20%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="80%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left" style="font-size: 7px">
				<i>*) isi dimana pada siapa Konsumen membeli unit tersebut</i>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
	</tbody>
</table>