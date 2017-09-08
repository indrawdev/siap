<?php date_default_timezone_set("Asia/Jakarta"); ?>
<table border="0" align="center" width="100%">
	<thead>
		<?php if ($kop == 1) : ?>
		<tr>
			<td width="20%" align="left"><img src="assets/img/mandiri-finance.png" /></td>
			<td width="40%"></td>
			<td width="40%" align="right" style="font-size: 6px">
				<b>PT. MANDIRI FINANCE INDONESIA</b><br><?php echo $cabang->fs_nama_cabang; ?><br><?php echo $cabang->fs_alamat_cabang; ?><br>Telp: <?php echo $cabang->fs_telfon_cabang; ?>, Fax: <?php echo $cabang->fs_fax_cabang; ?></td>
		</tr>
		<?php else: ?>
		<br>
		<!--
		<tr>
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
		-->
		<?php endif ;?>
		<tr>
			<td width="100%"></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td width="40%" align="left">Kepada Yth.</td>
			<td width="60%" align="right"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo(date('Y-m-d')); ?></td>
		</tr>
		<tr>
			<td width="100%" align="left">
				<?php echo $dealer->fs_nama_dealer; ?><br><?php echo $dealer->fs_alamat_dealer; ?><br><?php echo $dealer->fs_kota_dealer; ?>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">u.p. <?php echo $dealer->fs_nama_pemilik; ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Dengan hormat,</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Menunjuk permohonan pembiayaan <strong>No. <?php echo $detail->fn_no_apk; ?></strong> tanggal <?php echo tanggal_indo($detail->fd_tgl_apk); ?> :</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="12%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="82%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="12%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="82%" align="left"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="12%" align="left">Kendaraan</td>
			<td width="1%">:</td>
			<td width="82%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="12%" align="left">Banyaknya</td>
			<td width="1%">:</td>
			<td width="82%" align="left">1 unit</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">dapat kami sampaikan bahwa :</td>
		</tr>
		<br>
		<tr>
			<td width="5%" align="left">[__]</td>
			<td width="95%" align="left">Permohonan tersebut tidak dapat disetujui, dengan alasan :</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="90%" align="left">Tidak memenuhi kriteria kredit yang dapat disetujui.</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="90%" align="left">Konsumen tidak bersedia memenuhi kondisi persetujuan :</td>
		</tr>
		<tr>
			<td width="10%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="40%" align="left">DP naik menjadi ___%</td>
			<td width="5%" align="left">[__]</td>
			<td width="40%" align="left">Tenor max. tahun</td>
		</tr>
		<tr>
			<td width="10%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="40%" align="left">BG full tenor</td>
			<td width="5%" align="left">[__]</td>
			<td width="40%" align="left">............................</td>
		</tr>
		<br>
		<tr>
			<td width="5%" align="left">[__]</td>
			<td width="95%" align="left">Permohonan tersebut kami anggap batal dengan alasan :</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="90%" align="left">Konsumen tidak dapat dihubungi setelah lewat 1 minggu.</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="90%" align="left">Konsumen menyatakan akan membeli secara.</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="90%" align="left">Konsumen membatalkan niatnya untuk membeli kendaraan.</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="90%" align="left">Konsumen tidak bersedia memberikan data yang diminta.</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="5%" align="left">[__]</td>
			<td width="50%" align="left" style="border-bottom: 1px solid black;"></td>
			<td width="40%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Apabila diinginkan, data-data konsumen tersebut dapat diambil di kantor MFI selambat-lambatnya 7 hari sejak tanggal surat ini.</td>
		</tr>
		<tr>
			<td width="100%" align="justify">Atas perhatian dan kerjasama yang baik, kami ucapkan terima kasih.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Hormat kami,</td>
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
			<td width="35%" align="left" style="border-bottom: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo strtoupper($nama->fs_nama_ca);
					} else {
						echo strtoupper($cabang->fs_nama_pimpinan);
					}
				?>
			</td>
			<td width="15%"></td>
			<td width="50%"></td>
		</tr>
		<tr>
			<td width="35%" align="left">
				<?php if (!empty($nama->fs_jabatan_ca)) {
						echo strtoupper($nama->fs_jabatan_ca);
					} else {
						echo strtoupper($cabang->fs_jabatan_pimpinan);
					}
				?>
			</td>
			<td width="15%"></td>
			<td width="50%"></td>
		</tr>
	</tbody>
</table>