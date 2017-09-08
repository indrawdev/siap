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
			<td width="100%" align="left"><?php if (!empty($dealer->fs_nama_dealer)) { echo $dealer->fs_nama_dealer; } ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">u.p. Bapak/Ibu</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="20%"></td>
			<td width="60%" align="center"><b><u>Perihal : Pemesanan Kendaraan Bermotor</u></b></td>
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
			<td width="100%" align="justify">Kami PT. MANDIRI FINANCE INDONESIA, dengan ini bertindak selaku   kuasa dari konsumen (Ref. PPKDPH No. <b><?php echo $pjj->fs_pjj; ?></b>) :</td>
		</tr>
		<br>
		<tr>
			<td width="10%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="89%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="10%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="89%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen . ", ". $detail->fs_kota_konsumen; ?></td>
		</tr>
		<tr>
			<td width="100%" align="justify">mengajukan pesanan Kendaraan Bermotor dengan data sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="95%">
				<table border="1" align="center" width="100%" cellpadding="1">
					<thead>
						<tr>
							<th width="5%">No</th>
							<th width="20%">Merek/Tipe</th>
							<th width="30%">No. Rangka / No. Mesin</th>
							<th width="10%">Tahun</th>
							<th width="10%">Warna</th>
							<th width="25%">Harga OTR</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan;} ?><br><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan;} ?></td>
							<td><?php echo $detail->fs_no_rangka; ?><br><?php echo $detail->fs_no_mesin; ?></td>
							<td><?php echo $detail->fn_tahun_kendaraan; ?></td>
							<td><?php echo $detail->fs_warna_kendaraan; ?></td>
							<td>Rp. <?php echo number_format($detail->fn_harga_otr) . ",-"; ?></td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Harap Kendaraan Bermotor tersebut diserahkan/dikirimkan kepada Konsumen tersebut di atas dengan alamat :</td>
		</tr>
		<tr>
			<td width="100%" align="justify" height="30"><?php echo $detail->fs_alamat_konsumen . ', ' . $detail->fs_kota_konsumen; ?></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Pembayaran akan segera kami lakukan setelah:</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">1.</td>
			<td width="97%" align="justify">Menerima "Tanda Terima Kendaraan" yang telah ditandatangani yang bersangkutan.</td>
		</tr>
		<tr>
			<td width="3%" align="left">2.</td>
			<td width="97%" align="justify">SPP Asli telah ditandatangani oleh Pejabat Dealer yang berwenang dan distempel.</td>
		</tr>
		<tr>
			<td width="3%" align="left">3.</td>
			<td width="97%" align="justify">Surat Pernyataan Penyerahan BPKB Asli bermaterai cukup dan telah ditandatangani oleh Pejabat Dealer yang berwenang dan distempel.</td>
		</tr>
		<tr>
			<td width="3%" align="left">4.</td>
			<td width="97%" align="justify">Kuitansi senilai OTR (Asli) dan tanda terima uang muka (tembusan).</td>
		</tr>
		<tr>
			<td width="3%" align="left">5.</td>
			<td width="97%" align="justify">Isi Nama (faktur).</td>
		</tr>
		<tr>
			<td width="3%" align="left">6.</td>
			<td width="97%" align="justify">P.O. (Purchase Order) / Surat Pesanan Kendaraan yang telah ditandatangani oleh Pejabat Dealer yang berwenang dan distempel.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih. </td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="30%" align="left">Disetujui,</td>
			<td width="30%"></td>
			<td width="30%" align="left">Hormat kami,</td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td width="30%" align="left">Supplier/Dealer</td>
			<td width="30%"></td>
			<td width="30%" align="left"></td>
			<td width="10%"></td>
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
			<td width="60%"></td>
			<td width="30%" align="left">
				
			</td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td width="30%" align="left" style="border-top: 1px solid black;"></td>
			<td width="30%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;">
				<?php 
					if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>
			</td>
			<td width="10%"></td>
		</tr>
	</tbody>
</table>