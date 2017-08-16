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
			<td width="100%" align="center"><b>PERJANJIAN PEMBIAYAAN KONSUMEN<br>DAN PENGAKUAN HUTANG</b></td>
		</tr>
		<tr>
			<td width="100%" align="center">Nomor: <b><?php echo $pjj->fs_pjj; ?></b></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Pada hari ini, <?php echo hari_indo($detail->fd_tanggal_perjanjian); ?> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?>, yang bertanda tangan di bawah ini :</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">I.</td>
			<td width="97%" align="justify"><b>DAUD UDIN</b></td>
		</tr>
		<tr>
			<td width="3%" align="left"></td>
			<td width="97%" align="justify" height="45">Dalam hal ini bertindak dalam jabatannya selaku BAGIAN KREDIT, beralamat di PT MANDIRI FINANCE INDONESIA, RAYA BOULEVARD BARAT LC7 NO 64, JAKARTA 14240 dari dan demikian sah mewakili  Direksi Perseroan Terbatas PT MANDIRI FINANCE INDONESIA berkedudukan di Jakarta akan disebut juga "MFI"</td>
		</tr>
		<tr>
			<td width="3%" align="left">II.</td>
			<td width="97%" align="justify"><b>MAMAN DJAILANI</b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="justify" height="45">DRAMAGA H.ABAS RT/RW.002/001 BOGOR, yang dalam hal ini bertindak untuk dan atas nama pribadi dan untuk tindakan hukum atas perjanjian ini telah mendapat persetujuan dari ISTRI, nama SONIA AMITA di DRAMAGA H.ABAS RT/RW.002/001, BOGOR</td>
		</tr>
		<tr>
			<td width="100%" align="justify">Selanjutnya bersama-sama dengan penerima dan pengganti haknya akan disebut juga, <b>"Konsumen"</b>.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Para pihak dengan ini setuju untuk mengadakan Perjanjian Pembiayaan dengan Penyerahan Hak Milik secara Fiducia dengan ketentuan-ketentuan sebagai berikut :</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">1.</td>
			<td width="97%" align="justify">Bahwa Konsumen telah mengajukan permohonan kepada MFI untuk diberi pembiayaan guna pembelian kendaraan bermotor (selanjutnya akan disebut <b>"Barang"</b>) dengan data-data sebagai berikut :</td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="12%" align="left">Merek / Tipe</td>
			<td width="1%">:</td>
			<td width="35%" align="left"></td>
			<td width="15%" align="left">No. Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="32%" align="left"></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="12%" align="left">Tahun</td>
			<td width="1%">:</td>
			<td width="35%" align="left"></td>
			<td width="15%" align="left">Supplier / Dealer</td>
			<td width="1%">:</td>
			<td width="32%" align="left"></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="12%" align="left">Warna</td>
			<td width="1%">:</td>
			<td width="35%" align="left"></td>
			<td width="15%" align="left">Atas Nama</td>
			<td width="1%">:</td>
			<td width="32%" align="left"></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="12%" align="left">Kondisi</td>
			<td width="1%">:</td>
			<td width="35%" align="left"></td>
			<td width="15%" align="left">Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="32%" align="left"></td>
		</tr>
		<tr>
			<td width="3%" align="left">2.</td>
			<td width="97%" align="justify">MFI dengan ini memberi pembiayaan kepada Konsumen untuk pembelian Barang yang diakui telah diterima dan oleh karena itu Konsumen dengan ini secara tegas mengakui benar-benar dan secara sah telah berhutang uang kepada MFI untuk jumlah sebesar: <b>Rp. 166,356,000,-</b> <i><u>(SERATUS ENAM PULUH ENAM JUTA TIGA RATUS LIMA PULUH ENAM RIBU RUPIAH)</u></i> selanjutnya akan disebut juga <b>"Hutang"</b>. Terdiri dari Hutang Pokok <b>Rp. 124,775,280,-</b> dan Bunga <b>Rp. 41,580,720,-</b></td>
		</tr>
		<tr>
			<td width="3%" align="left">3.</td>
			<td width="97%" align="justify">Atas jumlah tersebut di atas, Konsumen dengan ini sanggup dan berjanji tanpa syarat untuk membayar kepada MFI, sejumlah uang yang akan jatuh tempo pada tanggal 4 setiap bulannya, selama 36 bulan, dengan perincian sebagai berikut:</td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="97%">
				<table border="1" align="center" width="100%" style="padding: 2;">
					<thead>
						<tr>
							<th width="30%">Dari Tanggal</th>
							<th width="30%">s/d Tanggal</th>
							<th width="40%">Nilai Angsuran Per Bulan</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td width="30%">04/07/2017</td>
							<td width="30%">04/06/2020</td>
							<td width="40%">Rp. 4,621,000,-</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="justify">pada tempat yang telah ditentukan yaitu : RAYA BOULEVARD BARAT LC7 NO 64 , JAKARTA 14240 atau :</td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="15%" align="left">Ke Rekening</td>
			<td width="1%">:</td>
			<td width="81%" align="justify"><b>PT MANDIRI FINANCE INDONESIA</b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="15%" align="left">Pada Bank</td>
			<td width="1%">:</td>
			<td width="81%" align="justify"><b>BCA CAB KARANG ANYAR</b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="15%" align="left">No. Rekening</td>
			<td width="1%">:</td>
			<td width="81%" align="justify"><b>370-3010411</b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="justify">Kesanggupan ini dikeluarkan dengan ketentuan <i>"tanpa protes non pembayaran dan tanpa biaya"</i>.</td>
		</tr>
		<tr>
			<td width="3%" align="left">4.</td>
			<td width="97%" align="justify">Atas pembelian Barang tersebut, Konsumen dengan ini atas tanggungan sendiri meminta MFI untuk membayarkan uang sejumlah: <b>Rp. 124,775,280,-</b> <i><u>(SERATUS DUA PULUH EMPAT JUTA TUJUH RATUS TUJUH PULUH LIMA RIBU DUA RATUS DELAPAN PULUH RUPIAH)</u></i> </td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="15%" align="left">Ke Rekening</td>
			<td width="1%">:</td>
			<td width="81%" align="justify"><b></b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="15%" align="left">Pada Bank</td>
			<td width="1%">:</td>
			<td width="81%" align="justify"><b></b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="15%" align="left">No. Rekening</td>
			<td width="1%">:</td>
			<td width="81%" align="justify"><b></b></td>
		</tr>
		<tr>
			<td width="3%" align="left">5.</td>
			<td width="97%" align="justify">Perjanjian ini berlaku dan mengikat sejak tanggal ditandatangani oleh para pihak dan berakhir sampai seluruh kewajiban Konsumen dipenuhi. Para pihak telah sepakat dan setuju untuk mematuhi seluruh syarat dan ketentuan Perjanjian sebagaimana tercantum pada halaman di balik Perjanjian ini, yang merupakan bagian tak terpisahkan dari Perjanjian ini.</td>
		</tr>
		<tr>
			<td width="3%" align="left">6.</td>
			<td width="97%" align="justify">Mengenai perselisihan yang timbul sebagai akibat dari Perjanjian ini, para pihak memilih tempat kedudukan hukum yang tetap di kantor Kepaniteraan Pengadilan Negeri JAKARTA di JAKARTA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="30%" align="left">Untuk dan atas nama MFI</td>
			<td width="5%"></td>
			<td width="30%" align="left">KONSUMEN</td>
			<td width="5%"></td>
			<td width="30%" align="left">MENYETUJUI</td>
		</tr>
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
			<td width="30%" align="left" style="border-top: 1px solid black;">DAUD UDIN</td>
			<td width="5%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;">MAMAN DJAILANI</td>
			<td width="5%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;">SONIA AMITA</td>
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
</table>