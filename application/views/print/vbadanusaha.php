<?php date_default_timezone_set("Asia/Jakarta"); ?>
<table border="0" align="center" width="100%">
	<thead>
		<tr>
			<td width="30%" align="left" style="font-size: 8px"><strong>PT. MANDIRI FINANCE INDONESIA</strong></td>
			<td width="40%" align="center" style="font-size: 8px"><strong>DAFTAR PEMERIKSAAN APK</strong></td>
			<td width="5%"></td>
			<td width="7%" align="left">Tanggal</td>
			<td width="1%">:</td>
			<td width="14%" align="left"><?php echo date('d/m/Y') . '-' . date('H:i:s'); ?></td>
		</tr>
		<tr>
			<td width="60%"></td>
			<td width="15%"></td>
			<td width="7%" align="left">User</td>
			<td width="1%">:</td>
			<td width="14%" align="left"><?php echo $user; ?></td>		
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td width="9%" align="left">No.Aplikasi</td>
			<td width="1%">:</td>
			<td width="10%" align="left"><?php echo $detail->fn_no_apk; ?></td>
			<td width="15%" align="left">Lembaga Pembiayaan</td>
			<td width="1%">:</td>
			<td width="36%" align="left"><?php if (!empty($lembaga_keuangan->fs_nama_lembaga_keuangan)) { echo $lembaga_keuangan->fs_nama_lembaga_keuangan; } ?></td>
			<td width="8%" align="left">Surveyor</td>
			<td width="1%">:</td>
			<td width="19%" align="left"><?php if (!empty($detail->fs_petugas_survey)) { echo $detail->fs_petugas_survey; } ?></td>
		</tr>
		<tr>
			<td width="9%" align="left">No.Batch</td>
			<td width="1%">:</td>
			<td width="10%" align="left">
				<?php if (!empty($detail->fn_no_batch)) { echo $detail->fn_no_batch; } else { echo '-'; } ?>		
			</td>
			<td width="15%" align="left">Jenis Piutang</td>
			<td width="1%">:</td>
			<td width="18%" align="left"><?php if (!empty($jenis_piutang->fs_nama_referensi)) { echo $jenis_piutang->fs_nama_referensi; } ?></td>
			<td width="7%" align="left">Dealer</td>
			<td width="1%">:</td>
			<td width="38%" align="left"><?php if (!empty($dealer->fs_nama_dealer)) { echo $dealer->fs_nama_dealer; } ?></td>
		</tr>
		<tr>
			<td width="9%" align="left">Tgl.Aplikasi</td>
			<td width="1%">:</td>
			<td width="10%" align="left"><?php echo date("d/m/Y", strtotime($detail->fd_tgl_apk)); ?></td>
			<td width="15%" align="left">Pola Transaksi</td>
			<td width="1%">:</td>
			<td width="18%" align="left"><?php if (!empty($pola_transaksi->fs_nama_referensi)) { echo $pola_transaksi->fs_nama_referensi; } ?></td>
			<td width="7%" align="left">Cabang</td>
			<td width="1%">:</td>
			<td width="10%" align="left"><?php if (!empty($detail->fn_cabang_dealer)) { echo $detail->fn_cabang_dealer; } ?></td>
			<td width="8%" align="left">Lama Survei</td>
			<td width="1%">:</td>
			<td width="19%" align="left"><?php if (!empty($detail->fn_lama_survey)) { echo $detail->fn_lama_survey; } ?> hari</td>
		</tr>
		<tr>
			<td width="9%" align="left">Tgl.Survei</td>
			<td width="1%">:</td>
			<td width="10%" align="left"><?php echo date("d/m/Y", strtotime($detail->fd_tanggal_survey)); ?></td>
			<td width="15%" align="left">Nomor PJJ</td>
			<td width="1%">:</td>
			<td width="18%" align="left"><?php if (!empty($pjj->fs_pjj)) { echo $pjj->fs_pjj; } ?></td>
			<td width="7%" align="left">Sales</td>
			<td width="1%">:</td>
			<td width="48%" align="left"><?php echo $detail->fs_salesman; ?></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>I. DATA KONSUMEN (BADAN USAHA)</b></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left">Konsumen</td>
			<td width="1%">:</td>
			<td width="16%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="10%" align="left">Bentuk Usaha</td>
			<td width="1%">:</td>
			<td width="5%" align="left"><?php if (!empty($detail->fs_bentuk_perusahaan)) { echo $detail->fs_bentuk_perusahaan; } else { echo '-'; } ?></td>
			<td width="24%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="75%" align="left"><?php echo $detail->fs_alamat_konsumen; ?></td>
			<td width="5%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kota</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_kota_konsumen; ?></td>
			<td width="10%" align="left">Kode Pos</td>
			<td width="1%">:</td>
			<td width="5%" align="left"><?php echo $detail->fs_kodepos_konsumen; ?></td>
			<td width="24%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Telepon</td>
			<td width="1%">:</td>
			<td width="30%" align="left">
				<?php 
					if (!empty($detail->fs_telepon_konsumen)) { 
						echo $detail->fs_telepon_konsumen;
					} else { 
						echo '-'; 
					} 
				?>
			</td>
			<td width="10%" align="left">Handphone</td>
			<td width="1%">:</td>
			<td width="29%" align="left">
				<?php 
					if (!empty($detail->fs_handphone_konsumen)) {
						echo $detail->fs_handphone_konsumen;
					} else {
						echo '-';
					}
				?>
			</td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Email</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_email_konsumen; ?></td>
			<td width="40%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kelurahan</td>
			<td width="1%">:</td>
			<td width="40%" align="left"><?php echo $detail->fs_kelurahan_konsumen; ?></td>
			<td width="30%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kecamatan</td>
			<td width="1%">:</td>
			<td width="40%" align="left"><?php echo $detail->fs_kecamatan_konsumen; ?></td>
			<td width="30%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kabupaten</td>
			<td width="1%">:</td>
			<td width="40%" align="left"><?php if(!empty($dati->fs_nama_dati)) { echo $dati->fs_nama_dati;} ?></td>
			<td width="30%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Alamat Surat</td>
			<td width="1%">:</td>
			<td width="50%" align="left"><?php echo $detail->fs_alamat_korespondensi; ?></td>
			<td width="20%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kota</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_kota_korespondensi; ?></td>
			<td width="10%" align="left">Kode Pos</td>
			<td width="1%">:</td>
			<td width="5%" align="left"><?php echo $detail->fs_kodepos_korespondensi; ?></td>
			<td width="24%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kategori Usaha</td>
			<td width="1%">:</td>
			<td width="65%" align="left"><?php if(!empty($usaha_konsumen->fs_nama_sektor_ekonomi)) {echo $usaha_konsumen->fs_nama_sektor_ekonomi; } else { echo '-'; } ?></td>
			<td width="5%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Keterangan Usaha</td>
			<td width="1%">:</td>
			<td width="65%" align="left"><?php if (!empty($detail->fs_keterangan_usaha_konsumen)) { echo $detail->fs_keterangan_usaha_konsumen; } else { echo '-'; } ?></td>
			<td width="5%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Beroperasi Sejak</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if (!empty($detail->fs_beroperasi_sejak)) { echo $detail->fs_beroperasi_sejak; } else { echo '-'; } ?></td>
			<td width="10%" align="left">Jumlah Karyawan</td>
			<td width="1%">:</td>
			<td width="24%" align="left"><?php if(!empty($detail->fn_jumlah_karyawan_perusahaan)) { echo $detail->fn_jumlah_karyawan_perusahaan; } else { echo '-'; } ?></td>
			<td width="5%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Status Tempat Usaha</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if (!empty($detail->fs_tempat_perusahaan)) { echo $detail->fs_tempat_perusahaan; } else { echo '-'; } ?></td>
			<td width="10%" align="left">Group Usaha</td>
			<td width="1%">:</td>
			<td width="24%" align="left"><?php if (!empty($detail->fs_group_perusahaan)) { echo $detail->fs_group_perusahaan; } else { echo '-'; } ?></td>
			<td width="5%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left">Legalitas</td>
			<td width="1%">:</td>
			<td width="16%" align="left">SIUP</td>
			<td width="1%">:</td>
			<td width="46%" align="left"><?php if(!empty($detail->fs_siup_perusahaan)) { echo $detail->fs_siup_perusahaan; } else { echo '-'; } ?></td>
			<td width="24%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">NPWP</td>
			<td width="1%">:</td>
			<td width="60%" align="left"><?php if(!empty($detail->fs_npwp_konsumen)) { echo $detail->fs_npwp_konsumen; } else { echo '-'; } ?></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">TDP</td>
			<td width="1%">:</td>
			<td width="60%" align="left"><?php if(!empty($detail->fs_tdp_perusahaan)) { echo $detail->fs_tdp_perusahaan; } else { echo '-'; } ?></td>
			<td width="10%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left" rowspan="2">Penanggung Jawab</td>
			<td width="1%">:</td>
			<td width="16%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if(!empty($detail->fs_penanggungjawab_perusahaan)) { echo $detail->fs_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%" align="left">Jabatan</td>
			<td width="1%">:</td>
			<td width="15%" align="left"><?php if(!empty($detail->fs_jabatan_penanggungjawab_perusahaan)) { echo $detail->fs_jabatan_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="14%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="60%" align="left"><?php if (!empty($detail->fs_alamat_penanggungjawab_perusahaan)) { echo $detail->fs_alamat_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kota</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if (!empty($detail->fs_kota_penanggungjawab_perusahaan)) { echo $detail->fs_kota_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%" align="left">Kode Pos</td>
			<td width="1%">:</td>
			<td width="5%" align="left"><?php if (!empty($detail->fs_kodepos_penanggungjawab_perusahaan)) { echo $detail->fs_kodepos_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="24%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Telepon</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if (!empty($detail->fs_telepon_penanggungjawab_perusahaan)) { echo $detail->fs_telepon_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%" align="left">Handphone</td>
			<td width="1%">:</td>
			<td width="14%" align="left"><?php if (!empty($detail->fs_handphone_penanggungjawab_perusahaan)) { echo $detail->fs_handphone_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">KTP</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if (!empty($detail->fs_ktp_penanggungjawab_perusahaan)) { echo $detail->fs_ktp_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%" align="left">NPWP</td>
			<td width="1%">:</td>
			<td width="14%" align="left"><?php if (!empty($detail->fs_npwp_penanggungjawab_perusahaan)) { echo $detail->fs_npwp_penanggungjawab_perusahaan; } else { echo 'N/A'; } ?></td>
			<td width="10%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left" rowspan="2">Pendapatan &amp; Beban</td>
			<td width="1%">:</td>
			<td width="16%" align="left">Omzet/Bulan</td>
			<td width="1%">:</td>
			<td width="6%" align="left">Rp.</td>
			<td width="10%" align="right"><?php echo number_format($detail->fn_pendapatan_konsumen); ?></td>
			<td width="54%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Biaya/Bulan</td>
			<td width="1%">:</td>
			<td width="6%" align="left">Rp.</td>
			<td width="10%" align="right"><?php echo number_format($detail->fn_biaya_konsumen); ?></td>
			<td width="54%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left" style="border-top: 1px solid black">Mutasi Rek. Koran</td>
			<td width="17%" style="border-top: 1px solid black"></td>
			<td width="54%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Debet</td>
			<td width="1%">:</td>
			<td width="6%" align="left">Rp.</td>
			<td width="10%" align="right"><?php echo number_format($detail->fn_mutasi_debet); ?></td>
			<td width="54%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="16%" align="left">Kredit</td>
			<td width="1%">:</td>
			<td width="6%" align="left">Rp.</td>
			<td width="10%" align="right"><?php echo number_format($detail->fn_mutasi_kredit); ?></td>
			<td width="54%"></td>
		</tr>
		<br>

		<?php if (!empty($pengurus)) :?>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left"><b>Pengurus</b></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="50%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th width="8%">No</th>
							<th width="50%">Nama</th>
							<th width="40%">Jabatan</th>
						</tr>
					</thead>
					<tbody>
						<?php $i = 1; ?>
						<?php foreach ($pengurus as $val) : ?>
						<tr>
							<td align="center"><?php echo $i++; ?></td>
							<td align="left"><?php echo $val->fs_nama_pengurus; ?></td>
							<td align="left"><?php echo $val->fs_nama_jabatan; ?></td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</td>
			<td width="48%"></td>
		</tr>
		<br>
		<?php endif; ?>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left">Lain-lain</td>
			<td width="1%">:</td>
			<td width="25%" align="left">Jumlah Kendaraan Yang Dimiliki</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fn_jumlah_kendaraan; ?></td>
			<td width="15%" align="left">Pertama Kali Kredit</td>
			<td width="1%">:</td>
			<td width="15%" align="left">
				<?php 
					if ($detail->fs_pertama_kali_kredit == 'Y') {
						echo "YA";
					} else {
						echo "TIDAK";
					}
				?>
			</td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="25%" align="left">Ada Garasi</td>
			<td width="1%">:</td>
			<td width="30%" align="left">
				<?php 
					if ($detail->fs_garasi == 'Y') {
						echo "YA";
					} else {
						echo "TIDAK";
					} 
				?>
			</td>
			<td width="31%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="25%" align="left">Repeat Order</td>
			<td width="1%">:</td>
			<td width="15%" align="left">
				<?php if ($detail->fs_repeat_order == 'Y') { echo 'YA'; } else { echo 'TIDAK'; } ?>	
			</td>
			<td width="3%" align="left">Ke</td>
			<td width="1%">:</td>
			<td width="7%" align="left"><?php if (!empty($detail->fs_repeat_order_ke)) { echo $detail->fs_repeat_order_ke; } else { echo '0'; } ?></td>
			<td width="35%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="25%" align="left">Kondisi Lingkungan Setempat</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if(!empty($kondisi_lingkungan->fs_nama_referensi)) { echo $kondisi_lingkungan->fs_nama_referensi; } ?></td>
			<td width="31%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="25%" align="left">Kondisi Kantor</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php if(!empty($kondisi_kantor->fs_nama_referensi)) { echo $kondisi_kantor->fs_nama_referensi; } ?></td>
			<td width="31%"></td>
		</tr>
		<tr>
			<td width="13%"></td>
			<td width="25%" align="left">Kategori Perusahaan</td>
			<td width="1%">:</td>
			<td width="30%" align="left">-</td>
			<td width="31%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>II. DATA PIUTANG DAN ANGSURAN</b></td>
		</tr>
		<br>
		<tr>
			<td width="20%"></td>
			<td width="30%" align="center"><b>Angsuran Pertama</b></td>
			<td width="30%" align="center"><b>D e a l e r</b></td>
			<td width="20%" align="right"><b>K o n s u m e n</b></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left">Pola Angsuran</td>
			<td width="1%">:</td>
			<td width="10%" align="left" style="border-right: 1px solid black;"><?php if (!empty($pola_angsuran->fs_nama_referensi)) { echo $pola_angsuran->fs_nama_referensi; }  ?></td>
			<td width="2%"></td>
			<td width="10%" align="left">Bayar Dimuka</td>
			<td width="1%">:</td>
			<td width="15%" align="left" style="border-right: 1px solid black;">
				<?php 
					if ($detail->fs_angsuran_dimuka == 'Y') {
						echo "YA"; 
					} else {
						echo "TIDAK";
					}
				?>
			</td>
			<td width="2%"></td>
			<td width="13%" align="left">Harga OTR</td>
			<td width="1%">:</td>
			<td width="14%" align="right"><?php echo number_format($detail->fn_harga_otr); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_harga_otr); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="10%" align="left">Jumlah</td>
			<td width="1%">:</td>
			<td width="15%" align="left" style="border-right: 1px solid black;"><?php echo number_format($detail->fn_jumlah_angsuran_dimuka); ?></td>
			<td width="2%"></td>
			<td width="13%" align="left">U. Muka (<?php echo substr($detail->fs_uang_muka_dealer,0,2)?>%-<?php echo substr($detail->fs_uang_muka_dealer,0,2)?>%)</td>
			<td width="1%">:</td>
			<td width="14%" align="right"><?php echo number_format($detail->fn_uang_muka_dealer); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_uang_muka_konsumen); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left">Angs.Dibyr.Dlr</td>
			<td width="1%">:</td>
			<td width="10%" align="left" style="border-right: 1px solid black;"><?php echo $detail->fs_angsuran_dibayar_dealer; ?></td>
			<td width="2%"></td>
			<td width="10%" align="left">Berapa Kali</td>
			<td width="1%">:</td>
			<td width="15%" align="left" style="border-right: 1px solid black;"><?php echo $detail->fn_kali_angsuran_dimuka; ?></td>
			<td width="2%"></td>
			<td width="13%" align="left">Asuransi</td>
			<td width="1%">:</td>
			<td width="14%" align="right"><?php echo number_format($detail->fn_asuransi_dikredit_dealer); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_asuransi_dikredit_konsumen); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left">Cara Bayar</td>
			<td width="1%">:</td>
			<td width="10%" align="left" style="border-right: 1px solid black;"><?php if(!empty($cara_bayar->fs_nama_referensi)) { echo $cara_bayar->fs_nama_referensi;} ?></td>
			<td width="2%"></td>
			<td width="10%" align="left">Potong PPD</td>
			<td width="1%">:</td>
			<td width="15%" align="left" style="border-right: 1px solid black;">
				<?php 
					if ($detail->fs_angsuran_dimuka_potong_pencairan == 'Y') {
						echo "YA";
					} else {
						echo "TIDAK";
					}
				?>
			</td>
			<td width="2%"></td>
			<td width="13%" align="left">Jumlah</td>
			<td width="1%">:</td>
			<td width="14%" align="right">
				<?php
					$jml1 = $detail->fn_harga_otr - $detail->fn_uang_muka_dealer + $detail->fn_asuransi_dikredit_dealer;
					echo number_format($jml1);
				?>
			</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right">
				<?php
					$jml2 = $detail->fn_harga_otr - $detail->fn_uang_muka_konsumen + $detail->fn_asuransi_dikredit_konsumen;
					echo number_format($jml2);
				?>
			</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left">Kd.Bank SKMR</td>
			<td width="1%">:</td>
			<td width="10%" align="left" style="border-right: 1px solid black;">N/A</td>
			<td width="2%"></td>
			<td width="10%" align="left"></td>
			<td width="1%"></td>
			<td width="15%" align="left" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left">Bunga (Flat - Efek)</td>
			<td width="1%">:</td>
			<td width="14%" align="right">9.00 % - 18.38 %</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right">9.00 % - 18.38 %</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left">Bank</td>
			<td width="1%">:</td>
			<td width="10%" align="left" style="border-right: 1px solid black;">N/A</td>
			<td width="2%"></td>
			<td width="10%" align="left">DP Bayar</td>
			<td width="1%">:</td>
			<td width="13%" align="right"><?php echo number_format($detail->fn_dp_bayar); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left">Tenor</td>
			<td width="1%">:</td>
			<td width="14%" align="right"><?php echo $detail->fn_bulan_masa_angsuran_dealer; ?> bln - <?php echo $detail->fn_kali_masa_angsuran_dealer; ?> kali</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right"><?php echo $detail->fn_bulan_masa_angsuran_konsumen; ?> bln - <?php echo $detail->fn_kali_masa_angsuran_konsumen; ?> kali</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left">AC</td>
			<td width="1%">:</td>
			<td width="10%" align="left" style="border-right: 1px solid black;">N/A</td>
			<td width="2%"></td>
			<td width="10%" align="left">Biaya Adm.</td>
			<td width="1%">:</td>
			<td width="13%" align="right"><?php echo number_format($detail->fn_biaya_adm); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left">Bunga</td>
			<td width="1%">:</td>
			<td width="14%" align="right"><?php echo number_format($detail->fn_bunga_dealer); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_bunga_konsumen); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="10%" align="left">Asuransi Net</td>
			<td width="1%">:</td>
			<td width="8%" align="right"><?php echo number_format($detail->fn_premi_asuransi_netto); ?></td>
			<td width="5%" align="right">
				<?php
					if (!empty($detail->fn_premi_asuransi_netto) && !empty($detail->fn_harga_otr)) {
						echo number_format((($detail->fn_premi_asuransi_netto - 25000) / $detail->fn_harga_otr) * 100, 2, '.', ',') .'%';
					}
				?>
			</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left">Nilai Kontrak</td>
			<td width="1%">:</td>
			<td width="14%" align="right">
				<?php
					$nilai1 = $detail->fn_angsuran_dealer * $detail->fn_bulan_masa_angsuran_dealer;
					echo number_format($nilai1);
				?>
			</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right">
				<?php
					$nilai2 = $detail->fn_angsuran_konsumen * $detail->fn_bulan_masa_angsuran_konsumen;
					echo number_format($nilai2);
				?>
			</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="10%" align="left">Asuransi Gross</td>
			<td width="1%">:</td>
			<td width="8%" align="right"><?php echo number_format($detail->fn_premi_asuransi_gross); ?></td>
			<td width="5%" align="right">
				<?php
					if (!empty($detail->fn_premi_asuransi_gross) && !empty($detail->fn_harga_otr)) {
						echo number_format((($detail->fn_premi_asuransi_gross - 25000) / $detail->fn_harga_otr) * 100, 2, '.', ',') .'%';
					}
				?>
			</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left">Angsuran Per Bln</td>
			<td width="1%">:</td>
			<td width="14%" align="right"><?php echo number_format($detail->fn_angsuran_dealer); ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right"><?php echo number_format($detail->fn_angsuran_konsumen); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="12%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="10%" align="left">Denda/Hari</td>
			<td width="1%">:</td>
			<td width="8%" align="right"></td>
			<td width="5%" align="right"><?php echo $denda_perhari->fs_nilai1_referensi * 100 . '%'; ?></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left">Angsuran Td. Sama</td>
			<td width="1%">:</td>
			<td width="14%" align="right">-</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right">-</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left">Nilai Pencairan</td>
			<td width="1%"></td>
			<td width="12%" align="left" style="border-right: 1px solid black;"><?php echo $detail->fn_nilai_pencairan; ?></td>
			<td width="2%"></td>
			<td width="10%" align="left"></td>
			<td width="1%"></td>
			<td width="8%" align="right"></td>
			<td width="5%" align="right"></td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="2%"></td>
			<td width="13%" align="left" rowspan="2">Angsuran / Total Pendapatan</td>
			<td width="1%">:</td>
			<td width="14%" align="right">
				<?php
					if (!empty($detail->fn_angsuran_dealer) && !empty($detail->fn_pendapatan_konsumen))
					{
						$angs1 = ($detail->fn_angsuran_dealer / $detail->fn_pendapatan_konsumen) * 100;
						echo number_format($angs1) . "%";
					}
				?>
			</td>
			<td width="2%" style="border-right: 1px solid black;"></td>
			<td width="15%" align="right">
				<?php
					if (!empty($detail->fn_angsuran_konsumen) && !empty($detail->fn_pendapatan_konsumen))
					{
						$angs2 = ($detail->fn_angsuran_konsumen / $detail->fn_pendapatan_konsumen) * 100;
						echo number_format($angs2) ."%";
					}
				?>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left"><b>Data Kelengkapan APK</b></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left">Tanggal Cair</td>
			<td width="1%">:</td>
			<td width="10%" align="left"><?php echo date("d/m/Y", strtotime($detail->fd_tanggal_perjanjian)); ?></td>
			<td width="5%"></td>
			<td width="5%" align="left">A/N</td>
			<td width="1%">:</td>
			<td width="28%" align="left"><?php echo $detail->fs_atasnama_bank_pencairan; ?></td>
			<td width="2%"></td>
			<td width="15%" align="left">U.Muka Bayar Di</td>
			<td width="1%">:</td>
			<td width="20%" align="left">
			<?php if (!empty($detail->fs_uang_muka_bayar_di))
				if ($detail->fs_uang_muka_bayar_di == 'D') {
					echo 'DEALER';
				} else {
					echo 'KONSUMEN';
				}
			?>	
			</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left">Pencairan Ke</td>
			<td width="1%">:</td>
			<td width="10%" align="left">
				<?php if(!empty($detail->fs_cair_ke)) {
					if($detail->fs_cair_ke == 'D') {
						echo 'DEALER';
					} else {
						echo 'KONSUMEN';
					}
				} ?>
			</td>
			<td width="5%"></td>
			<td width="5%" align="left">BANK</td>
			<td width="1%">:</td>
			<td width="28%" align="left"><?php echo $detail->fs_nama_bank_pencairan; ?></td>
			<td width="2%"></td>
			<td width="15%" align="left">Deposit Potong PPD</td>
			<td width="1%">:</td>
			<td width="20%" align="left">
				<?php if(!empty($detail->fs_deposit_potong_pencairan)) {
					if ($detail->fs_deposit_potong_pencairan == 'Y') {
						echo 'YA';
					} else {
						echo 'TIDAK';
					}
				} ?>
			</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="10%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left"></td>
			<td width="5%"></td>
			<td width="5%" align="left">AC</td>
			<td width="1%">:</td>
			<td width="28%" align="left"><?php echo $detail->fs_rekening_bank_pencairan; ?></td>
			<td width="2%"></td>
			<td width="15%" align="left">Tanggal Angsuran I</td>
			<td width="1%">:</td>
			<td width="20%" align="left"><?php echo date("d/m/Y", strtotime($detail->fd_tanggal_angsuran_pertama)); ?></td>
		</tr>
			<tr>
			<td width="2%"></td>
			<td width="10%" align="left"></td>
			<td width="1%"></td>
			<td width="10%" align="left"></td>
			<td width="5%"></td>
			<td width="5%" align="left"></td>
			<td width="1%"></td>
			<td width="28%" align="left"></td>
			<td width="2%"></td>
			<td width="15%" align="left">Tgl. Angs/Bln</td>
			<td width="1%">:</td>
			<td width="20%" align="left"><?php echo $detail->fn_tanggal_jatuhtempo_perbulan; ?></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left"><b>L A I N - L A I N</b></td>
		</tr>
		<br>
		<?php foreach ($detailltransaksi as $key) : ?>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left"><?php echo $key->fs_kode_transaksi ." - ". $key->fs_nama_transaksi; ?></td>
			<td width="7%" align="left"><?php echo substr($key->fs_persentase_nilai_transaksi, 0, -3) . '%'; ?></td>
			<td width="1%">:</td>
			<td width="10%" align="right"><?php echo number_format($key->fn_nilai_transaksi); ?></td>
			<td width="1%"></td>
			<td width="10%" align="left">
				(T: <?php echo $key->fs_tagih_ke_konsumen; ?> 
				C: <?php if ($key->fs_cair_ke_dealer == '0') {echo "&nbsp;";}
				else {echo $key->fs_cair_ke_dealer;}?>)
			</td>
			<td width="39%"></td>
		</tr>
		<?php endforeach; ?>
		<tr>
			<td width="2%"></td>
			<td width="58%" align="left">T: Memotong uang muka (Y/T: Mengurangi / Tidak mengurangi TDP Konsumen)</td>
			<td width="40%"></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="58%" align="left">C: Pencairan ke Dealer (+/-: Menambah/Mengurangi Pencarian ke Dealer)</td>
			<td width="40%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left"><b>DATA ASURANSI</b></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="1">
					<thead>
						<tr>
							<th>Jenis Asuransi</th>
							<th>TAHUN I</th>
							<th>TAHUN II</th>
							<th>TAHUN III</th>
							<th>TAHUN IV</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>TLO</td>
							<?php 
								if (!empty($data_asuransi)) {
									$count = 0;
									foreach ($data_asuransi as $key) {
										$count = $count + 1;
										if ($key->fs_jenis_asuransi == 'TOTAL LOST') {
											echo '<td>X</td>';
										} else {
											echo '<td></td>';
										}
									}
									switch ($count) {
										case 0:
											echo "<td></td><td></td><td></td><td></td>";
											break;
										case 1:
											echo "<td></td><td></td><td></td>";
											break;
										case 2:
											echo "<td></td><td></td>";
											break;
										case 3:
											echo "<td></td>";
											break;
									}
								} else {
									if (!empty($data_asuransi_notmix)) {
										if ($data_asuransi_notmix->fs_jenis_asuransi == 'T') {
											$month = $data_asuransi_notmix->fn_bulan_masa_angsuran_dealer;
											switch (!empty($month)) {
												case ($month <= 12):
													echo '<td>X</td><td></td><td></td><td></td>';
												break;
												case ($month > 13 && $month <= 24):
													echo '<td>X</td><td>X</td><td></td><td></td>';
												break;
												case ($month > 24 && $month <= 36):
													echo '<td>X</td><td>X</td><td>X</td><td></td>';
												break;
												case ($month > 36 && $month <= 48):
													echo '<td>X</td><td>X</td><td>X</td><td>X</td>';
												break;
											}
										} else {
											echo '<td></td><td></td><td></td><td></td>';
										}
									}
								}
							?>
						</tr>
						<tr>
							<td>ALLRISK</td>
							<?php 
								if (!empty($data_asuransi)) {
									$count = 0;
									foreach ($data_asuransi as $key) {
										$count = $count + 1;
										if ($key->fs_jenis_asuransi == 'ALLRISK') {
											echo '<td>X</td>';
										} else {
											echo '<td></td>';
										}
									}
									switch ($count) {
										case 0:
											echo "<td></td><td></td><td></td><td></td>";
											break;
										case 1:
											echo "<td></td><td></td><td></td>";
											break;
										case 2:
											echo "<td></td><td></td>";
											break;
										case 3:
											echo "<td></td>";
											break;
									}
								} else {
									if (!empty($data_asuransi_notmix)) {
										if ($data_asuransi_notmix->fs_jenis_asuransi == 'A') {
											$month = $data_asuransi_notmix->fn_bulan_masa_angsuran_dealer;
											switch (!empty($month)) {
												case ($month <= 12):
													echo '<td>X</td><td></td><td></td><td></td>';
												break;
												case ($month > 13 && $month <= 24):
													echo '<td>X</td><td>X</td><td></td><td></td>';
												break;
												case ($month > 24 && $month <= 36):
													echo '<td>X</td><td>X</td><td>X</td><td></td>';
												break;
												case ($month > 36 && $month <= 48):
													echo '<td>X</td><td>X</td><td>X</td><td>X</td>';
												break;
											}
										} else {
											echo '<td></td><td></td><td></td><td></td>';
										}
									}
								}
							?>
						</tr>
					</tbody>
				</table>	
			</td>
		</tr>
		<br>
		<?php if (!empty($data_perluasan)) { ?>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left"><b>DATA PERLUASAN</b></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="1">
					<thead>
						<tr>
							<th>TAHUN I</th>
							<th>TAHUN II</th>
							<th>TAHUN III</th>
							<th>TAHUN IV</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<?php
								$count = 0;
								foreach ($data_perluasan as $key) {
									$count = $count + 1;
									echo '<td>'.$key->fs_jenis_perluasan.'</td>';
								}
								switch ($count) {
									case 0:
										echo "<td></td><td></td><td></td><td></td>";
										break;
									case 1:
										echo "<td></td><td></td><td></td>";
										break;
									case 2:
										echo "<td></td><td></td>";
										break;
									case 3:
										echo "<td></td>";
										break;
								}
							?>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<?php }?>
		<tr>
			<td width="100%" align="left"><b>III. DATA KENDARAAN</b></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="5%" align="left">Model</td>
			<td width="1%">:</td>
			<td width="68%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } else { echo '-'; }  ?></td>
			<td width="2%"></td>
			<td width="10%" align="left">Komersial</td>
			<td width="1%">:</td>
			<td width="15%" align="left"><?php echo $detail->fs_komersial; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="5%" align="left">Jenis</td>
			<td width="1%">:</td>
			<td width="20%" align="left"><?php echo $detail->fs_jenis_kendaraan; ?></td>
			<td width="2%"></td>
			<td width="15%" align="left">Silinder</td>
			<td width="1%">:</td>
			<td width="30%" align="left"><?php echo $detail->fs_silinder_kendaraan; ?></td>
			<td width="2%"></td>
			<td width="10%" align="left">Fleet</td>
			<td width="1%">:</td>
			<td width="15%" align="left"><?php echo $detail->fs_fleet; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="5%" align="left">Tahun</td>
			<td width="1%">:</td>
			<td width="20%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
			<td width="2%"></td>
			<td width="15%" align="left">Perusahaan Asuransi</td>
			<td width="1%">:</td>
			<td width="49%" align="left"><?php if(!empty($asuransi->fs_nama_perusahaan_asuransi)) { echo $asuransi->fs_nama_perusahaan_asuransi; } ?></td>
			<td width="5%"></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th width="18%" align="center">No. Mesin/Rangka</th>
							<th width="7%" align="center">Tahun</th>
							<th width="13%" align="center">Warna Kendaraan</th>
							<th width="15%" align="center">Kota BPKK/No. Polisi</th>
							<th width="10%" align="center">Nomor BPKB</th>
							<th width="37%" align="center">Nama di BPKB</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><?php echo $detail->fs_no_rangka; ?><br><?php echo $detail->fs_no_mesin; ?></td>
							<td><?php echo $detail->fn_tahun_kendaraan; ?></td>
							<td><?php echo $detail->fs_warna_kendaraan; ?></td>
							<td>
								<?php echo $detail->fs_kota_bpkb; ?><br>
								<?php echo $detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi; ?>
							</td>
							<td><?php echo $detail->fs_nomor_bpkb; ?></td>
							<td><?php echo $detail->fs_nama_bpkb; ?><br><?php echo $detail->fs_alamat_bpkb; ?></td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="49%">
				<table border="0" align="left" width="100%">
					<tbody>
						<tr>
							<td width="30%" align="left">Score / Grade</td>
							<td width="2%">:</td>
							<td width="60%" align="left"><?php if (!empty($detail->fs_score)) { echo $detail->fs_score; } else { echo '-'; } ?> / <?php if (!empty($detail->fs_grade)) { echo $detail->fs_grade; } else { echo '-'; } ?></td>
						</tr>
						<tr>
							<td width="30%" align="left">Keputusan</td>
							<td width="2%">:</td>
							<td width="60%" align="left"><?php if (!empty($keputusan_kredit->fs_nama_referensi)) { echo $keputusan_kredit->fs_nama_referensi; } else { echo '-'; } ?></td>
						</tr>
						<tr>
							<td width="30%" align="left">Tanggal keputusan</td>
							<td width="2%">:</td>
							<td width="60%" align="left"><?php echo date("d/m/Y", strtotime($detail->fd_tanggal_buat_keputusan)); ?></td>
						</tr>
						<tr>
							<td width="30%" align="left">Jenis Paket</td>
							<td width="2%">:</td>
							<td width="60%" align="left"><?php if(!empty($detail->fs_kode_paket)) { echo $detail->fs_kode_paket; } else { echo '-'; } ?></td>
						</tr>
						<br>
						<tr>
							<td width="100%"></td>
						</tr>
						<tr>
							<td width="30%" align="left">Tanggal Cetak SPK</td>
							<td width="2%">:</td>
							<td width="60%" align="left"><?php echo date('d/m/Y'); ?></td>
						</tr>
						<tr>
							<td width="30%" align="left">Tanggal Cetak PO</td>
							<td width="2%">:</td>
							<td width="60%" align="left"><?php if (!empty($tanggal_cetak_b->fd_tanggal_cetak)) { echo date("d/m/Y", strtotime($tanggal_cetak_b->fd_tanggal_cetak)); } ?></td>
						</tr>
					</tbody>
				</table>
			</td>
			<td width="49%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th><b>Catatan</b></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="left" height="70">
								<table width="100%">
									<tr>
										<td width="15%" align="left"><b><i>Cabang</i></b></td>
										<td width="1%">:</td>
										<td width="84%" align="left" height="30">
										<?php 
											if (!empty($detail->fs_catatan_analisa)) {
												echo $detail->fs_catatan_analisa;
											} else {
												echo '-';
											}
										?>
										</td>
									</tr>
									<tr>
										<td width="15%" align="left"><b><i>Pusat</i></b></td>
										<td width="1%">:</td>
										<td width="84%" align="left" height="30">
										<?php 
											if (!empty($detail->fs_catatan_analisa_pusat)) {
												echo $detail->fs_catatan_analisa_pusat;	
											} else {
												echo '-';
											}
										?>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th><b>Blacklist Report</b></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="left">
								<?php 
									if(!empty($internal_checking->fs_status_blacklist)) { 
										echo '('.$internal_checking->fs_status_blacklist.')'; 
									} else {
										echo '-';
									}
									if (!empty($reject_checking->fs_status_reject)) {
										echo ', ('.$reject_checking->fs_status_reject.')';
									} else {
										echo ', -';
									}
									if (!empty($family_checking->fs_status_family)) {
										echo ', ('.$family_checking->fs_status_family.')';
									} else {
										echo ', -';
									}
								?>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th><b>Catatan Tempat Tinggal</b></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="left" height="30">
								<?php echo $detail->fs_catatan_tempat_tinggal; ?>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th><b>Catatan Lingkungan Tempat Tinggal</b></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td width="100%" align="left" height="30">
								<?php echo $detail->fs_catatan_lingkungan; ?>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th><b>Catatan Tempat Usaha</b></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td width="100%" align="left" height="30">
								<?php echo $detail->fs_catatan_tempat_usaha; ?>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="40%"></td>
			<td width="20%" align="center">Proposed by,</td>
			<td width="20%" align="center">Reviewed by,</td>
			<td width="20%" align="center">Approved by,</td>
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
			<td width="40%"></td>
			<td width="20%" align="center">(.......................................)</td>
			<td width="20%" align="center">(.......................................)</td>
			<td width="20%" align="center">(.......................................)</td>
		</tr>
	</tbody>
</table>