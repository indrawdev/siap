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
			<td width="30%"></td>
			<td width="40%" align="center"><b>SURAT PERNYATAAN ASURANSI</b></td>
			<td width="30%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="justify">(selanjutnya disebut <b>“KONSUMEN”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Sehubungan dengan Perjanjian Pembiayaan nomor <b><?php echo $pjj->fs_pjj; ?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua perubahannya dan/atau perpanjangannya dan/atau pembaharuannya dan/atau penggantiannya akan disebut juga sebagai <b>“PERJANJIAN”</b>) antara <b>PT. MANDIRI FINANCE INDONESIA,</b> berkedudukan di Jakarta Selatan (selanjutnya <b>“MFI”</b>) dengan KONSUMEN untuk pembiayaan Barang sebagaimana dimaksud dalam PERJANJIAN tersebut (selanjutnya disebut <b>“BARANG”</b>), maka dengan ini KONSUMEN menyatakan bahwa:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify"><b>BARANG TERSEBUT DIASURANSIKAN dengan kondisi sebagai berikut:</b></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%">
				<table border="1" align="center" width="100%" cellpadding="2">
					<thead>
						<tr>
							<th width="27%"><b>Jenis Penutupan Asuransi</b></th>
							<th width="7%"><b>Tahun I</b></th>
							<th width="7%"><b>Tahun II</b></th>
							<th width="7%"><b>Tahun III</b></th>
							<th width="7%"><b>Tahun IV</b></th>
							<th width="15%"><b>Pemakaian Kendaraan</b></th>
							<th width="30%"><b>Perusahaan Asuransi</b></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="middle">( _ ) TLO<br></td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td></td>
							<td>PT. ASURANSI UMUM MEGA</td>
						</tr>
						<tr>
							<td align="left">( _ ) All Risk/Comprehensive/Gabungan</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>PRIBADI /  KOMERSIL *)</td>
							<td>PT. ASURANSI TRI PAKARTA</td>
						</tr>
						<tr>
							<td align="left">( _ ) Others:<br></td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td>( _ )</td>
							<td></td>
							<td>PT. ASURANSI MITRA PELINDUNG MUSTIKA</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Untuk menjamin lebih lanjut pembayaran kembali dengan tertib sebagaimana mestinya setiap jumlah uang yang terhutang dan wajib dibayar oleh KONSUMEN kepada MFI Berdasarkan PERJANJIAN, maka KONSUMEN dengan ini memberikan kepada MFI sebagai MFI dengan ini menerima baik cessie semua hak dan tagihan yang dipunyai oleh KONSUMEN terhadap Perusahaan Asuransi berdasarkan Perjanjian asuransi yang telah atau yang kemudian akan ditutup oleh KONSUMEN untuk kerusakan dan risiko lain atas BARANG tersebut, dengan syarat-syarat sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="2%" align="left">a.</td>
			<td width="96%" align="justify">Setiap dan semua Premi asuransi serta semua pembayaran yang harus dilakukan oleh KONSUMEN menurut perjanjian (-perjanjian) asuransi tersebut harus dibayar tepat pada waktunya dan untuk setiap kelalaian adalah menjadi tanggung jawab KONSUMEN sendiri dan asli tanda (-tanda) pelunasan itu harus diserahkan kepada MFI dalam waktu 7 (tujuh) hari kerja setelah pembayaran dilakukan.</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%" align="left">b.</td>
			<td width="96%" align="justify">Setiap dan semua polis asuransi harus diberikan kepada dan disimpan oleh MFI.</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%" align="left">c.</td>
			<td width="96%" align="justify">Apabila terjadi kerugian atas BARANG tersebut, MFI dengan ini diberi kuasa yang tidak dapat dicabut kembali oleh KONSUMEN, untuk membicarakan perihal ganti rugi dengan Perusahaan Asuransi dan minta atau menurut uang ganti rugi dan melakukan semua tindakan apapun juga yang KONSUMEN sendiri dapat atau berhak untuk melakukannya menurut perjanjian (-perjanjian) asuransi yang bersangkutan, demikian tidak ada satu tindakan pun yang dikecualikan.</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%" align="left">d.</td>
			<td width="96%" align="justify">KONSUMEN dengan ini memberi kuasa mutlak kepada MFI untuk mempergunakan jumlah uang yang diterima oleh MFI dari Perusahaan Asuransi untuk membayar seluruh hutang atau kewajiban KONSUMEN kepada MFI berdasarkan PERJANJIAN.</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%" align="left">e.</td>
			<td width="96%" align="justify">MFI berhak setiap waktu memberitahukan secara resmi tentang cessie ini, dan seluruh biaya yang timbul menjadi beban dan wajib dibayar oleh KONSUMEN.</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%" align="left">f.</td>
			<td width="96%" align="justify">KONSUMEN berjanji dan mengikat diri untuk, tanpa persetujuan tertulis terlebih dahulu dari MFI, tidak akan melakukan tindakan-tindakan yang Konsumen telah kuasakan kepada MFI berdasarkan PERJANJIAN.</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Apabila BARANG tersebut diasuransikan di Bawah Harga Pertanggungan dan/atau digunakan diluar ketentuan yang tercantum didalam polis, sehingga dikemudian hari BARANG tersebut mengalami kerugian / kerusakan, baik “secara keseluruhan / <i>Total Loss</i>” atau “hilang sama sekali” dan/atau kerusakan “sebagian” yang pada akhirnya mengakibatkan penolakan ganti rugi dari Perusahaan Asuransi, maka akan diselesaikan sesuai dengan ketentuan yang berlaku dalam Polis Asuransi dan dalam hal ini KONSUMEN berjanji dan mengikat diri kepada MFI untuk:</td>
		</tr>
		<br>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Membayar kerugian / kerusakan tersebut dan tidak akan melakukan tuntutan apapun dan berapapun jumlahnya kepada MFI maupun kepada Perusahaan Asuransi, serta menanggung kelancaran pembayaran angsuran setiap bulannya berdasarkan PERJANJIAN tersebut di atas sampai jumlah seluruh kewajiban KONSUMEN kepada MFI lunas, jika terjadi klaim <i>partial loss</i> (kerugian / kerusakan sebagian), atau</td>
		</tr>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Membayar seluruh kewajiban KONSUMEN kepada MFI berdasarkan PERJANJIAN tersebut di atas, meliputi hutang pokok, bunga, denda dan biaya-biaya lain jika terjadi klaim <i>total loss</i> (kerugian / kerusakan keseluruhan).</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>BARANG TERSEBUT TIDAK DIASURANSIKAN OLEH KONSUMEN :</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Penutupan asuransi atas BARANG dilakukan oleh MFI, termasuk pembayaran premi asuransinya dengan klausula leasing atas nama PT. MANDIRI FINANCE INDONESIA, sehingga apabila dikemudian hari, BARANG tersebut mengalami kerugian / kerusakan, baik “secara keseluruhan / <i>Total Loss</i>” atau “hilang sama sekali” dan/atau kerusakan “sebagain”, maka KONSUMEN berjanji dan mengikat diri kepada MFI untuk:</td>
		</tr>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Menyerahkan kepada MFI, dokumen-dokumen yang diminta oleh MFI dalam rangka pembuktian dan persyaratan atas kasus atau kejadian tersebut atau pengurusan klaim pada Perusahaan Asuransi yang telah ditentukan.</td>
		</tr>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Membayar seluruh kewajiban KONSUMEN kepada MFI, berdasarkan PERJANJIAN tersebut di atas, meliputi hutang pokok, bunga, denda dan biaya-biaya lain.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Apabila hasil klaim asuransi tersebut di atas tidak / belum cukup untuk melunasi seluruh kewajiban KONSUMEN kepada MFI, maka kekurangan itu akan tetap menjadi beban dan tanggung jawab KONSUMEN untuk melunasinya.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Demikian Surat Pernyataan ini dibuat untuk dipergunakan sebagaimana mestinya.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<br>
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
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="2%" align="left">
				<img src="assets/img/checkbox.png" width="8px" height="8px" />
			</td>
			<td width="97%" align="left" style="font-size: 7px"><i>Beri tanda V pada kotak sesuai dengan kondisi</i></td>
		</tr>
		<tr>
			<td width="2%" align="left">
				<img src="assets/img/checkbox.png" width="8px" height="8px" />
			</td>
			<td width="97%" align="left" style="font-size: 7px"><i>Beri tanda X pada kotak yang tidak digunakan</i></td>
		</tr>
		<tr>
			<td width="100%" align="left" style="font-size: 7px"><i>*) Coret yang tidak perlu</i></td>
		</tr>
	</tbody>
</table>