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
	<?php for($i = 1; $i <= 3; $i++) : ?>
	<tbody>
		<tr>
			<td width="100%" align="center"><b>STRUKTUR 
			<?php if ($detail->fs_komersial == 'Y') {
				echo "PERJANJIAN INVESTASI";
			} else {
				echo "PERJANJIAN MULTIGUNA";
			} ?> PEMBELIAN DENGAN<br>PEMBAYARAN SECARA ANGSURAN</b></td>
		</tr>
		<tr>
			<td width="100%" align="center">Nomor: <b><?php echo $pjj->fs_pjj; ?></b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Pada hari ini, <?php echo hari_indo($detail->fd_tanggal_perjanjian); ?> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?>, yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">I.</td>
			<td width="97%" align="justify" height="50"><b>PT. Mandiri Finance Indonesia</b>, <?php echo $cabang->fs_nama_cabang; ?>, yang beralamat di <?php echo $cabang->fs_alamat_cabang; ?>, <?php echo $cabang->fs_kota_cabang; ?>, dalam hal ini bertindak dan untuk atas nama serta mewakili kepentingan diri sendiri dan pihak sebagaimana tercantum dalam Struktur Perjanjian dan atau lampiran perjanjian yang menjadi satu kesatuan dan bagian yang tidak terpisahkan dari perjanjian ini (dan selanjutnya disebut <b>”Perseroan”</b>), dan</td>
		</tr>
		<tr>
			<td width="3%" align="left">II.</td>
			<td width="97%" align="justify"><b>Debitur</b> sebagaimana dimaksud dalam Struktur Perjanjian</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Dengan ini sepakat dan bersama-sama menetapkan hal-hal pokok, yang selanjutnya akan disebut sebagai Struktur Pembiayaan, sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">1.</td>
			<td width="35%" align="left">Jenis Kegiatan Usaha</td>
			<td width="1%">:</td>
			<td width="61%" align="left" height="20"><?php if (!empty($kategori_usaha->fs_nama_sektor_ekonomi)) { echo $kategori_usaha->fs_nama_sektor_ekonomi; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">2.</td>
			<td width="35%" align="left">Debitur</td>
			<td width="62%"></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">a.</td>
			<td width="32%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">b.</td>
			<td width="32%" align="left">Nomor KTP</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fs_ktp_konsumen; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">c.</td>
			<td width="32%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="61%" align="left" height="25"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">3.</td>
			<td width="35%" align="left">Barang dan/atau Jasa</td>
			<td width="61%"></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">a.</td>
			<td width="32%" align="left">Merek / Type</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?> / <?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">b.</td>
			<td width="32%" align="left">Tahun Kendaraan</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">c.</td>
			<td width="32%" align="left">Warna</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo strtoupper($detail->fs_warna_kendaraan); ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">d.</td>
			<td width="32%" align="left">Kondisi</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($pola_transaksi->fs_nama_referensi)) { echo $pola_transaksi->fs_nama_referensi; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">e.</td>
			<td width="32%" align="left">Nomor Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fs_no_rangka .' / '. $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">f.</td>
			<td width="32%" align="left">Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="61%" align="left">
				<?php if (!empty($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi)) { echo $detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi; } else { echo '-'; } ?>
			</td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">g.</td>
			<td width="32%" align="left">Atas Nama</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fs_nama_bpkb; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">4.</td>
			<td width="35%" align="left">Penyedia Barang dan/atau Jasa</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($dealer->fs_nama_dealer)) {echo $dealer->fs_nama_dealer; } else { echo '-'; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">5.</td>
			<td width="35%" align="left">Nilai Barang dan/atau Jasa</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo "Rp. " . number_format($detail->fn_harga_otr) . ",-"; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">6.</td>
			<td width="35%" align="left">Uang Muka yang dibayar sendiri oleh Debitur</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo "Rp. " . number_format($detail->fn_dp_bayar) . ",-"; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">7.</td>
			<td width="35%" align="left">Pokok Hutang</td>
			<td width="1%">:</td>
			<td width="61%" align="left">
				<?php
					$jml = $detail->fn_harga_otr - $detail->fn_uang_muka_dealer + $detail->fn_asuransi_dikredit_dealer;
					echo "Rp. " . number_format($jml) . ",-";
				?>
			</td>
		</tr>
		<tr>
			<td width="3%" align="left">8.</td>
			<td width="35%" align="left">Bunga Pembiayaan</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo "Rp. " . number_format($detail->fn_bunga_dealer) . ",-"; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">9.</td>
			<td width="35%" align="left">Angsuran per Bulan</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo "Rp. " . number_format($detail->fn_angsuran_dealer) . ",-"; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">10.</td>
			<td width="35%" align="left">Jangka Waktu Pembiayaan</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fn_bulan_masa_angsuran_dealer . ' Bulan'; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">11.</td>
			<td width="35%" align="left">Tanggal Jatuh Tempo Angsuran</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo $detail->fn_tanggal_jatuhtempo_perbulan; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">12.</td>
			<td width="35%" align="left">Asuransi Barang</td>
			<td width="62%"></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">a.</td>
			<td width="32%" align="left">Perusahaan Asuransi</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($asuransi->fs_nama_perusahaan_asuransi)) { echo $asuransi->fs_nama_perusahaan_asuransi; } else { echo '-'; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">b.</td>
			<td width="32%" align="left">Jenis Asuransi</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($jenis_asuransi->fs_nama_referensi)){ echo $jenis_asuransi->fs_nama_referensi; } else { echo '-'; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">c.</td>
			<td width="32%" align="left">Jangka Waktu Pertanggungan</td>
			<td width="1%">:</td>
			<td width="61%" align="left">
				<?php  
					if (!empty($jenis_asuransi->fs_nama_referensi)) 
					{
						if ($jenis_asuransi->fs_nama_referensi <> 'MIX')
						{
							echo $asuransi_notmix->fn_bulan_masa_angsuran_dealer .' Bulan';
						}
						else 
						{
							echo $asuransi_mix->fn_tahun_ke .' Bulan';
						}
					}
					else 
						{ echo '-'; }
				?>	
			</td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">d.</td>
			<td width="32%" align="left">Nilai Pertanggungan</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php echo "Rp. " . number_format($detail->fn_harga_otr) . ",-"; ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">13.</td>
			<td width="35%" align="left">Asuransi Jiwa</td>
			<td width="1%">:</td>
			<td width="61%" align="left">-</td>
		</tr>
		<tr>
			<td width="3%" align="left">14.</td>
			<td width="35%" align="left">Biaya-Biaya</td>
			<td width="62%"></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">a.</td>
			<td width="32%" align="left">Biaya Survey</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($biaya_survey->fn_nilai_transaksi)) { echo "Rp. " . number_format($biaya_survey->fn_nilai_transaksi) . ",-"; } else { echo "-"; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">b.</td>
			<td width="32%" align="left">Biaya Asuransi / Penjaminan /Fidusia</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($biaya_asuransi->fn_nilai_transaksi)) { echo "Rp. " . number_format($biaya_asuransi->fn_nilai_transaksi) . ",-"; } else { echo "-"; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">c.</td>
			<td width="32%" align="left">Biaya Provisi</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($biaya_provisi->fn_nilai_transaksi)) { echo "Rp. " . number_format($biaya_provisi->fn_nilai_transaksi) . ",-"; } else { echo "-"; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="3%" align="left">d.</td>
			<td width="32%" align="left">Biaya Notaris</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if (!empty($biaya_notaris->fn_nilai_transaksi)) { echo "Rp. " . number_format($biaya_notaris->fn_nilai_transaksi) . ",-"; } else { echo "-"; } ?></td>
		</tr>
		<tr>
			<td width="3%" align="left">15.</td>
			<td width="35%" align="left">Denda Keterlambatan Angsuran</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if(!empty($denda_perhari->fs_nilai1_referensi)) { echo $denda_perhari->fs_nilai1_referensi * 100 . "% <i>per hari dari jumlah angsuran per bulan.</i>"; } else { echo '-'; }?></td>
		</tr>
		<tr>
			<td width="3%" align="left">16.</td>
			<td width="35%" align="left">Pinalti Pelunasan</td>
			<td width="1%">:</td>
			<td width="61%" align="left"><?php if(!empty($pinalti_lunas->fs_nilai1_referensi)) { echo $pinalti_lunas->fs_nilai1_referensi . "% <i>(dari nilai sisa pokok pembayaran terakhir)</i>"; } else { echo '-'; }?></td>
		</tr>
		<tr>
			<td width="3%" align="left">17.</td>
			<td width="35%" align="left">Jaminan Tambahan (additional Collateral)</td>
			<td width="1%">:</td>
			<td width="61%" align="left"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Demikian Perjanjian ini dibuat dan ditandatangani pada hari dan tanggal tersebut di bawah ini, dibuat dalam rangkap 2 (dua) yang mempunyai kekuatan hukum yang sama untuk Perseroan dan Debitur.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<tr>
			<td width="30%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
			<td width="20%"></td>
			<td width="25%" align="left">DEBITUR,</td>
			<td width="25%"></td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo strtoupper($cabang->fs_nama_pimpinan);
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
		<tr>
			<td width="47%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="40" align="middle"/></td>
			<td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
	</tbody>
	<?php endfor; ?>
</table>