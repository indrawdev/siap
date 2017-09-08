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
		<tr>
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
		<?php endif ;?>
		<tr>
			<td width="100%"></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td width="15%"></td>
			<td width="70%" align="center"><b>SURAT KUASA PEMBERIAN JAMINAN FIDUSIA</b></td>
			<td width="15%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="20%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="79%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="20%" align="left">No. KTP</td>
			<td width="1%">:</td>
			<td width="79%" align="left"><?php echo $detail->fs_ktp_konsumen; ?></td>
		</tr>
		<tr>
			<td width="20%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="79%" align="left" height="25"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="100%" align="left">Selanjutnya disebut <strong>Pemberi Kuasa</strong></td>
		</tr>
		<br>
		<tr>
			<td width="20%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="79%" align="left"><?php echo $pk_nama->fs_nama_referensi; ?></td>
		</tr>
		<tr>
			<td width="20%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="79%" align="left"><?php echo $pk_alamat->fs_nama_referensi; ?></td>
		</tr>
		<tr>
			<td width="20%" align="left">Jabatan</td>
			<td width="1%">:</td>
			<td width="79%" align="left"><?php echo $pk_jabatan->fs_nama_referensi; ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Dalam hal ini bertindak selaku Kuasa Direksi dari dan oleh karena itu bertindak untuk dan atas nama PT. MANDIRI FINANCE INDONESIA berkedudukan dikantor pusat Jakarta "Selanjutnya disebut <strong>Penerima Kuasa</strong>".</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="center">------------------------------------------------------------------------- <strong>KHUSUS</strong> -------------------------------------------------------------------------</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Pemberi Kuasa memberikan kuasa kepada Penerima Kuasa untuk mewakili membuat, meyerahkan surat-surat untuk pembuatan akta jaminan fidusia dan menandatangani Akta Notaris jaminan fidusia dihadapan Notaris yang ditunjuk oleh Penerima Kuasa, serta mendaftarkan Akta Jaminan Fidusia pada kantor Pendaftaran Fidusia, berikut penambahan dan atau perubahannya menurut syarat -  syarat dan ketentuan yang berlaku dalam Undang - undang Repulik Indonesia Nomor 42 Tahun 1999 Tentang Jaminan Fidusia beserta peraturan pelaksanaannya yang telah dan atau yang akan berlaku dikemudian hari, menerima serta menyimpan akta notaris jaminan fidusia dan sertifikat jaminan fidusia, dengan data - data objek jaminan fidusia sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="30%" align="left">Hutang Pokok Jaminan Fidusia</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php if (!empty($detail->fn_pokok_pembiayaan_dealer)) { echo 'Rp. ' . number_format($detail->fn_pokok_pembiayaan_dealer); } ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">Merk / Type / Model</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?> <?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">Warna / Tahun</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php echo $detail->fs_warna_kendaraan; ?> / <?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">No. Rangka / No. Mesin</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php echo $detail->fs_no_rangka; ?> / <?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">No. Polisi</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">No. BPKB</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php if (!empty($detail->fs_nomor_bpkb)) { echo $detail->fs_nomor_bpkb; } ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Surat Kuasa ini berlaku dan tidak dapat dibatalkan oleh Pemberi Kuasa selama Objek Jaminan Fidusia dibayar lunas kepada Penerima Kuasa dan Surat kuasa ini menyampingkan pasal 1813, 1814, 1816 KUH Perdata. Surat Kuasa ini dibuat tanpa ada paksaan dan tekanan dari pihak lain serta sehat jasmani dan rohani.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Demikian Surat Kuasa ini dibuat dan ditandatangani di <?php echo $cabang->fs_kota_cabang; ?>, Pada Tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
		<tr>
			<td width="30%" align="left">PEMBERI KUASA</td>
			<td width="20%"></td>
			<td width="30%" align="left">PENERIMA KUASA,</td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php echo strtoupper($detail->fs_nama_konsumen); ?></td>
			<td width="20%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo strtoupper($nama->fs_nama_ca);
					} else {
						echo strtoupper($pk_nama->fs_nama_referensi);
					}
				?>
			</td>
			<td width="20%"></td>
		</tr>
	</tbody>
</table>