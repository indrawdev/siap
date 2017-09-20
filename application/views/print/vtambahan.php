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
	<?php for($i = 1; $i <= 1; $i++) : ?>
	<tbody>
		<tr>
			<td width="30%"></td>
			<td width="40%" align="center"><b>PERJANJIAN TAMBAHAN</b></td>
			<td width="30%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">1.</td>
			<td width="20%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="76%" align="left"><?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="20%" align="left">Jabatan</td>
			<td width="1%">:</td>
			<td width="76%" align="left">Business Manager</td>
		</tr>
		<br>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="justify">Dalam hal ini bertindak sebagai kuasa Direksi PT. MANDIRI FINANCE INDONESIA, yang berkedudukan di Jakarta Selatan (selanjutnya disebut <b>“MFI”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">2.</td>
			<td width="20%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="76%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="20%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="76%" align="left" height="40"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<br>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="left">(selanjutnya disebut <b>“KONSUMEN”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Sehubungan dengan Perjanjian Pembiayaan Konsumen Nomor <b><?php echo $pjj->fs_pjj; ?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua penambahannya dan/atau perubahannnya dan/atau perpanjangannya dan/atau pembaharuannya dan/atau penggantiannya akan disebut juga sebagai “PERJANJIAN”) dan Perjanjian Jaminan antara MFI dengan KONSUMEN saling sepakat dan menyetujui penambahan PERJANJIAN sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">1.</td>
			<td width="97%" align="justify">Bahwa MFI sebagai Kuasa dan/atau Penyalur <i>(Channeling Agent)</i> dan/atau agen fasilitas atas fasilitas Pembiayaan Konsumen berdasarkan PERJANJIAN tersebut di atas, dari dan oleh karena itu bertindak untuk dan atas nama:</td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">2.</td>
			<td width="97%" align="justify">Bahwa MFI sebagai Kuasa dan/atau Penyalur <i>(Channeling Agent)</i> dan/atau agen fasilitas yang diberi kuasa dan wewenang mewakili Bank dapat melakukan tindakan-tindakan sesuai persyaratan-persyaratan yang tercantum dalam PERJANJIAN.</td>
		</tr>
		<tr>
			<td width="3%" align="left">3.</td>
			<td width="97%" align="justify">Mewakili dalam hal Piutang MFI terhadap KONSUMEN berdasarkan PERJANJIAN dan Perjanjian Tambahan ini dan/atau perjanjian lainnya antara KONSUMEN dan MFI, dialihkan oleh MFI kepada Pihak Lain, termasuk tetapi tidak terbatas kepada BANK, KONSUMEN pada saat ini dan untuk nantinya dengan ini memberikan persetujuan dimuka atas pengalihan tersebut, tanpa diperlukan suatu pemberitahuan resmi atau dalam bentuk atau dengan cara lain apapun juga.</td>
		</tr>
		<tr>
			<td width="3%" align="left">4.</td>
			<td width="97%" align="justify">Bahwa Perjanjian Tambahan ini merupakan satu kesatuan dan bagian yang tidak terpisahkan dari PERJANJIAN tersebut di atas.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Demikian Perjanjian ini dibuat dan ditandatangani pada hari dan tanggal di bawah ini.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<tr>
			<td width="50%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
			<td width="50%" align="left">KONSUMEN</td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>
			</td>
			<td width="20%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="20%"></td>
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
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
	</tbody>
	<?php endfor; ?>
</table>