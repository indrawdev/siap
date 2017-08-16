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
			<td width="100%" align="right"><?php echo $cabang->fs_kota_cabang . ", " . tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Kepada Yth.</td>
		</tr>
		<tr>
			<td width="100%" align="left">Direktorat Lalu Lintas</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Up. Kasubbag Reg.Ident.BPKB</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="20%"></td>
			<td width="60%" align="center"><b><u>Perihal : Permohonan Pemblokiran BPKB</u></b></td>
			<td width="20%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Dengan Hormat</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Bersama ini kami mohon bantuannya untuk melakukan pemblokiran terhadap BPKB kendaraan bermotor <?php if (!empty($pola_transaksi->fs_nama_referensi)){ echo $pola_transaksi->fs_nama_referensi;  } ?> yang masih menjadi agunan kredit dengan pihak kami, dengan data - data sebagai berikut: </td>
		</tr>
		<br>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Nomor BPKB</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fs_nomor_bpkb; ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Atas Nama</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fs_alamat_konsumen; ?><br><?php echo $detail->fs_kelurahan_konsumen . ", " . $detail->fs_kota_konsumen; ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Merk / Tipe</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?> / <?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Warna</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fs_warna_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Tahun Pembuatan</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Nomor Rangka</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fs_no_rangka; ?></td>
		</tr>
		<tr>
			<td width="25%"></td>
			<td width="20%" align="left">Nomor Mesin</td>
			<td width="1%">:</td>
			<td width="54%" align="left"><?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Atas bantuan serta kerjasama yang baik, kami ucapkan banyak terima kasih.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Hormat kami</td>
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
			<td width="30%"></td>
			<td width="30%"></td>
			<td width="10%"></td>
		</tr>
	</tbody>
</table>