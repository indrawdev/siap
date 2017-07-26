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
			<td width="17%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="80%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="17%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="80%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="17%" align="left">No. KTP</td>
			<td width="1%">:</td>
			<td width="80%" align="left"><?php echo $detail->fs_ktp_konsumen; ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Sehubungan dengan telah diterimanya dana pembiayaan dari PT. MANDIRI FINANCE INDONESIA berdasarkan Surat Perjanjian Pembelian Dengan Pembayaran Secara Angsuran dengan Penyerahan Hak Milik Secara Fidusia tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?>. No. <b><?php echo $pjj->fs_pjj; ?></b>, dengan ini menyatakan:</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">
				<ol>
					<li style="text-align: justify;">Bahwa saya sanggup untuk melakukan pembayaran angsuran tepat waktu per bulan sesuai jatuh tempo tanggal <?php echo $detail->fn_tanggal_jatuhtempo_perbulan; ?> setiap bulannya. Adapun keterlambatan hanya berlaku 3 (tiga) hari setelah tanggal jatuh tempo. Dan apabila terjadi keterlambatan melebihi waktu yang telah disepakati, maka saya bersedia menyerahkan unit kendaraan untuk dititipkan kepada pihak PT. MANDIRI FINANCE INDONESIA.</li>
					<li style="text-align: justify;">Dan apabila saya tidak dapat memenuhi ketentuan di pasal 1 di atas, saya akan memberikan wewenang sepenuhnya tanpa syarat apapun kepada PT. MANDIRI FINANCE INDONESIA untuk mengambil unit kendaraan yang dijaminkan sesuai dengan Surat Perjanjian Pembelian Dengan Pembayaran Secara Angsuran tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> nomor <b><?php echo $pjj->fs_pjj; ?></b></li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Demikian Surat Pernyataan ini saya buat dengan sebenar-benarnya dalam keadaan sehat jasmani dan rohani, serta tidak ada unsur paksaan dari pihak manapun juga.</td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="70%"></td>
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
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
	</tbody>
</table>