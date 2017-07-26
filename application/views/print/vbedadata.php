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
			<td width="100%" align="left">Yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="19%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="80%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="19%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="80%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Sehubungan dengan Perjanjian Pembiayaan nomor <b><?php echo $pjj->fs_pjj; ?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua perubahannya dan/atau perpanjangannya dan/atau pembaharuannya dan/atau penggantiannya akan disebut juga sebagai <b>“PERJANJIAN”</b>) dan/atau dokumen-dokumen Pernyataan lainnya (selanjutnya disebut <b>“DOKUMEN”</b>), dengan ini kami menyatakan:</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa disamping identitas Saya sebagaimana tercantum dalam KTP/SIM/Passport/KITAS*) nomor <?php echo $detail->fs_ktp_konsumen; ?>, Saya juga memiliki identitas lain sebagaimana tercantum dalam:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Kartu Keluarga nomor</td>
			<td width="1%">:</td>
			<td width="40%" align="left"><?php echo $detail->fs_kartu_keluarga; ?></td>
			<td width="7%" align="left">tanggal</td>
			<td width="1%">:</td>
			<td width="10%" align="left">........</td>
			<td width="7%"></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Akta Nikah nomor</td>
			<td width="1%">:</td>
			<td width="40%" align="left">.............................</td>
			<td width="7%" align="left">tanggal</td>
			<td width="1%">:</td>
			<td width="10%" align="left">........</td>
			<td width="7%"></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Lain-lain</td>
			<td width="1%">:</td>
			<td width="40%" align="left">.............................</td>
			<td width="7%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left"></td>
			<td width="7%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Dimana perbedaan identitas pada dokumen-dokumen tersebut diatas berupa:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Nama</td>
			<td width="1%">:</td>
			<td width="70%" align="left">.............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Alamat</td>
			<td width="1%">:</td>
			<td width="70%" align="left">.............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Tempat &amp; tanggal lahir</td>
			<td width="1%">:</td>
			<td width="70%" align="left">.............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Status</td>
			<td width="1%">:</td>
			<td width="70%" align="left">.............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Tanda Tangan</td>
			<td width="1%">:</td>
			<td width="70%" align="left">.............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="27%" align="left">( _ ) Lain-lain</td>
			<td width="1%">:</td>
			<td width="70%" align="left">.............................</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa alamat domisili kami pada saat ini adalah di:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Kami belum mengurus proses perubahan dokumen dari alamat yang tercantum didalam KTP/SIM/Passport/KITAS*) ke alamat yang baru sebagaimana tersebut di atas.</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa BARANG dengan identitas dalam PERJANJIAN dan/atau DOKUMEN diatas, juga memiliki identitas sebagai berikut ini:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="17%" align="left">( _ ) Nomor Rangka</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_no_rangka; ?></td>
			<td width="2%"></td>
			<td width="17%" align="left">( _ ) Nomor Mesin</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="17%" align="left">( _ ) Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?></td>
			<td width="2%"></td>
			<td width="17%" align="left">( _ ) Tahun</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="17%" align="left">( _ ) Warna</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_warna_kendaraan; ?></td>
			<td width="7%"></td>
			<td width="17%" align="left"></td>
			<td width="1%"></td>
			<td width="30%" align="left"></td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Sebagaimana tercantum dalam:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="32%" align="left">( _ ) Surat Tanda Nomor Kendaraan</td>
			<td width="1%">:</td>
			<td width="40%" align="left">.............................</td>
			<td width="7%" align="left">tanggal</td>
			<td width="1%">:</td>
			<td width="17%" align="left">........</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="32%" align="left">( _ ) Faktur nomor</td>
			<td width="1%">:</td>
			<td width="40%" align="left">.............................</td>
			<td width="7%" align="left">tanggal</td>
			<td width="1%">:</td>
			<td width="17%" align="left">........</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left">( _ ) Fisik barang termasuk namun tidak terbatas pada gesekan nomor rangka dan nomor mesin</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Bahwa meskipun terdapat perbedaan sebagaimana di atas, namun sesungguhnya <b><u>mengacu pada kendaraan yang sama,</u></b> yang menjadi obyek atas fasilitas pembiayaan yang diberikan MFI kepada Saya berdasarkan PERJANJIAN dan/atau DOKUMEN.</td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="70%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%" align="left">
				<img src="assets/img/checkbox.png" width="8px" height="8px" />
			</td>
			<td width="98%" align="left" style="font-size: 7px"><i>Beri tanda V pada kotak sesuai dengan kondisi</i></td>
		</tr>
		<tr>
			<td width="2%" align="left">
				<img src="assets/img/checkbox.png" width="8px" height="8px" />
			</td>
			<td width="98%" align="left" style="font-size: 7px"><i>Beri tanda X pada kotak yang tidak digunakan</i></td>
		</tr>
		<br>
		<tr>
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
	</tbody>
</table>