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
			<td width="100%" align="left"><b><?php echo $detail->fs_nama_konsumen; ?></b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">(selanjutnya disebut <b>“PEMBELI“</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b><?php if (!empty($dealer->fs_nama_dealer)) { echo $dealer->fs_nama_dealer; } ?></b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">(selanjutnya disebut <b>“PENJUAL“</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="left">Bahwa <b>PENJUAL</b> dengan ini menjual kepada <b>PEMBELI</b> barang berupa kendaraan dengan data sebagai berikut:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="25%" align="left">a. Merek</td>
			<td width="1%">:</td>
			<td width="72%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="25%" align="left">b.	Jenis / Type</td>
			<td width="1%">:</td>
			<td width="72%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="25%" align="left">c. Tahun Kendaraan</td>
			<td width="1%">:</td>
			<td width="72%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="25%" align="left">d.	Nomor Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="72%" align="left"><?php echo $detail->fs_no_rangka . ' / '. $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="25%" align="left">e.	Warna</td>
			<td width="1%">:</td>
			<td width="72%" align="left"><?php echo $detail->fs_warna_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="25%" align="left">f.	Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="72%" align="left"><?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">(selanjutnya disebut <b>“BARANG“</b>)</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa pembelian <b>BARANG</b> tersebut di atas, adalah berdasarkan fasilitas pembiayaan yang diberikan oleh PT. MANDIRI FINANCE INDONESIA berkedudukan di Jakarta (Selanjutnya disebut <b>“MFI“</b>) sesuai dengan Perjanjian Pembiayaan Nomor <b><?php echo $pjj->fs_pjj; ?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua perubahannya dan/atau perpanjangannya dan/atau penggantiannya akan disebut juga sebagai <b>“PERJANJIAN“</b>)</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa atas jual beli <b>BARANG</b> tersebut di atas, terdapat kekurangan dokumen yang dapat diserahkan oleh <b>PENJUAL</b> kepada <b>PEMBELI</b> sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="3%" align="left">
				<img src="assets/img/checkbox.png" width="10px" height="10px" />
			</td>
			<td width="95%" align="left">Kuitansi Blanko bermaterai atas nama yang tercantum di BPKB...............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="3%" align="left">
				<img src="assets/img/checkbox.png" width="10px" height="10px" />
			</td>
			<td width="95%" align="left">Copy KTP atas nama yang tercantum di BPKB ...............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="3%" align="left">
				<img src="assets/img/checkbox.png" width="10px" height="10px" />
			</td>
			<td width="95%" align="left">Tembusan faktur asli No...............................</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="3%" align="left">
				<img src="assets/img/checkbox.png" width="10px" height="10px" />
			</td>
			<td width="95%" align="left">..............................................................</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa sehubungan dengan hal-hal tersebut di atas, <b>PENJUAL</b> dan <b>PEMBELI</b> dengan ini berjanji dan mengikat diri kepada <b>MFI</b>, Bahwa apabila ternyata dikemudian hari terjadi tuntutan dan/atau gugatan dari pihak ketiga, maka baik <b>PENJUAL</b> maupun <b>PEMBELI</b> menjamin dan membebaskan <b>MFI</b> dari segala tuntutan baik secara perdata maupun secara pidana.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">Yang Membuat Pernyataan</td>
			<td width="34%" align="left"></td>
			<td width="36%" align="left">Mengetahui</td>
		</tr>
		<tr>
			<td width="30%" align="left">PENJUAL,</td>
			<td width="2%"></td>
			<td width="30%" align="left">PEMBELI,</td>
			<td width="2%"></td>
			<td width="36%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php if (!empty($dealer->fs_nama_dealer)) { echo $dealer->fs_nama_dealer; } ?></td>
			<td width="2%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="2%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>
			</td>
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