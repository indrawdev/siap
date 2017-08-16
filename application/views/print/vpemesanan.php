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
		<tr>
			<td width="7%" align="left">Perihal</td>
			<td width="1%">:</td>
			<td width="92%" align="left"><b>Pemberitahuan Persetujuan Pembiayaan</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Kepada Yth.</td>
		</tr>
		<tr>
			<td width="100%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
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
			<td width="5%"></td>
			<td width="95%" align="justify">Bersama ini kami, PT. MANDIRI FINANCE INDONESIA memberitahukan bahwa permohonan pembiayaan kendaraan yang diajukan telah disetujui dengan kondisi sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Nama Konsumen</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Alamat Konsumen</td>
			<td width="1%">:</td>
			<td width="69%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Nama di STNK/BPKB</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php echo $detail->fs_nama_bpkb; ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Jumlah Kendaraan</td>
			<td width="1%">:</td>
			<td width="69%" align="left">1 (SATU) unit</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Merk/Tipe Kendaraan</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan;} ?> / <?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan;} ?></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Tahun / Warna</td>
			<td width="1%">:</td>
			<td width="69%" align="left"><?php echo $detail->fn_tahun_kendaraan ." / ". $detail->fs_warna_kendaraan; ?></td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Harga OTR</td>
			<td width="1%">:</td>
			<td width="4%" align="left">Rp.</td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_harga_otr) . ",-"; ?></td>
			<td width="50%" align="right"></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Angsuran per bulan</td>
			<td width="1%">:</td>
			<td width="4%" align="left">Rp.</td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_angsuran_konsumen) . ",-"; ?></td>
			<td width="50%" align="right"></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Total DP</td>
			<td width="1%">:</td>
			<td width="4%" align="left">Rp.</td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_dp_bayar) . ",-"; ?></td>
			<td width="50%" align="right"></td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="25%" align="left">Nilai Cair</td>
			<td width="1%">:</td>
			<td width="4%" align="left">Rp.</td>
			<td width="15%" align="right"><?php if (!empty($detail->fn_nilai_pencairan)) { echo $detail->fn_nilai_pencairan . ",-"; } else { echo "-"; } ?></td>
			<td width="50%" align="right"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Dengan dipersyaratkan kondisi / dokumen yang wajib dipenuhi oleh konsumen adalah sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">1.</td>
			<td width="70%" style="border-bottom: 1px solid black"></td>
			<td width="23%"></td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">2.</td>
			<td width="70%" style="border-bottom: 1px solid black"></td>
			<td width="23%"></td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">3.</td>
			<td width="70%" style="border-bottom: 1px solid black"></td>
			<td width="23%"></td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="95%" align="left">dilengkapi / diserahkan ke selambat-lambatnya :</td>
		</tr>
		<tr>
			<td width="7%"></td>
			<td width="93%" align="left">Poin ( _ ) <b>Sebelum / pada saat penandatanganan kontrak perjanjian.</b></td>
		</tr>
		<tr>
			<td width="7%"></td>
			<td width="93%" align="left">Poin ( _ ) <b>Sebelum pengeluaran PO / pencairan dana.</b></td>
		</tr>
		<br>
		<tr>
			<td width="3%">*)</td>
			<td width="97%" align="left">Mohon menandatangani konfirmasi persetujuan dan mengirimkan kembali kepada kami melalui Fax.No <b><?php echo $cabang->fs_fax_cabang; ?></b></td>
		</tr>
		<tr>
			<td width="3%">*)</td>
			<td width="97%" align="left">Proses pembuatan kontrak setelah kami menerima konfirmasi persetujuan dealer.</td>
		</tr>
		<tr>
			<td width="3%">*)</td>
			<td width="20%" align="left">Jika unit telah tersedia,</td>
			<td width="13%" align="left">No. Rangka</td>
			<td width="1%">:</td>
			<td width="63%" align="left"><?php echo $detail->fs_no_rangka; ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="20%" align="left"></td>
			<td width="13%" align="left">No. Mesin</td>
			<td width="1%">:</td>
			<td width="63%" align="left"><?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="20%" align="left"></td>
			<td width="13%" align="left">Warna</td>
			<td width="1%">:</td>
			<td width="63%" align="left"><?php echo $detail->fs_warna_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="3%">*)</td>
			<td width="97%" align="left">Perubahan harga, data kendaraan, dll diberitahukan tertulis dengan ditandatangani.</td>
		</tr>
		<tr>
			<td width="3%">*)</td>
			<td width="97%" align="left">Konfirmasi persetujuan ini bukan Surat Pesanan Kendaraan/Purchase Order (PO).</td>
		</tr>
		<tr>
			<td width="3%">*)</td>
			<td width="97%" align="left">Sebelum kontrak ditandatangani, suku bunga tidak terikat.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="30%" align="left">Hormat kami,</td>
			<td width="20%"></td>
			<td width="30%" align="left">Konfirmasi Persetujuan</td>
			<td width="20%"></td>
		</tr>
		<tr>
			<td width="30%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
			<td width="20%"></td>
			<td width="30%" align="left">Konsumen</td>
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
		<tr>
			<td width="30%" align="left"><?php echo $cabang->fs_jabatan_pimpinan; ?></td>
			<td width="70%"></td>
		</tr>
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
	</tbody>
</table>