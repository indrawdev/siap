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
			<td width="20%"></td>
			<td width="60%" align="center"><b>SURAT PERNYATAAN, PERSETUJUAN DAN KUASA</b></td>
			<td width="20%"></td>
		</tr>
		<br>
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
			<td width="20%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="79%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="100%" align="left">(selanjutnya disebut <b>“KONSUMEN”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">-</td>
			<td width="97%" align="justify">Bahwa berdasarkan Perjanjian Pembiayaan Nomor <b><?php echo $pjj->fs_pjj; ?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua perubahannya dan/atau perpanjangannya dan/atau pembaharuannya dan/atau penggantiannya akan disebut juga sebagai <b>“PERJANJIAN”</b>), <b>KONSUMEN</b> telah memperoleh dari <b>PT. MANDIRI FINANCE INDONESIA</b> yang berkedudukan di Jakarta Selatan (selanjutnya disebut <b>“MFI”</b>), fasilitas Pembiayaan Konsumen dalam bentuk penyediaan dana untuk pengadaan BARANG dengan data sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="3%"></td>
			<td width="3%" align="left">a.</td>
			<td width="20%" align="left">Merek</td>
			<td width="1%">:</td>
			<td width="73%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="3%" align="left">b.</td>
			<td width="20%" align="left">Jenis / Type</td>
			<td width="1%">:</td>
			<td width="73%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="3%" align="left">c.</td>
			<td width="20%" align="left">Tahun Kendaraan</td>
			<td width="1%">:</td>
			<td width="73%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="3%" align="left">d.</td>
			<td width="20%" align="left">Nomor Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="73%" align="left"><?php echo $detail->fs_no_rangka; ?> / <?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="3%" align="left">e.</td>
			<td width="20%" align="left">Warna</td>
			<td width="1%">:</td>
			<td width="73%" align="left"><?php echo $detail->fs_warna_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="3%" align="left">f.</td>
			<td width="20%" align="left">Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="73%" align="left">
				<?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?>
			</td>
		</tr>
		<br>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="left">(selanjutnya disebut <b>“BARANG”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">-</td>
			<td width="97%" align="justify">Bahwa fasilitas pembiayaan tersebut di atas diberikan oleh MFI kepada KONSUMEN dengan syarat-syarat dan ketentuan-ketentuan antara lain bahwa selama jangka waktu PERJANJIAN masih berlangsung dan/atau selama KONSUMEN belum melunasi seluruh kewajibannya kepada MFI berdasarkan PERJANJIAN tersebut di atas, maka KONSUMEN telah menjaminkan BARANG kepada MFI.</td>
		</tr>
		<br>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="justify">Selanjutnya, untuk menegaskan dan mempertahankan hak-hak MFI berkenaan dengan penyerahan jaminan atas BARANG oleh KONSUMEN kepada MFI tersebut di atas dan berkenaan dengan hak MFI lainnya sesuai dengan PERJANJIAN, dengan ini KONSUMEN menyatakan dengan sebenarnya serta menegaskan hal-hal sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="3%"></td>
			<td width="97%" align="left">
				<ol>
					<li style="text-align: justify;">Selama Jangka Waktu Fasilitas Pembiayaan berdasarkan PERJANJIAN masih berlangsung dan/atau selama KONSUMEN belum melunasi seluruh kewajibannya / hutang berdasarkan PERJANJIAN, maka meskipun atau seandainyapun BARANG tersebut berada dalam penguasaan Konsumen dan/atau dokumen-dokumen kepemilikan lain atas BARANG tercatat atas nama KONSUMEN, sebenarnya hak dan milik (seluruh) BARANG tersebut telah diserahkan oleh KONSUMEN kepada MFI, sedangkan KONSUMEN dalam hal ini hanyalah sebagai peminjam pakai semata-mata <i>(Bruiklenner)</i>;</li>
					<li style="text-align: justify;">MFI sepenuhnya berhak untuk setiap saat melakukan pemeriksaan baik atas keberadaan, maupun keadaan atas BARANG tersebut, di lokasi penempatan BARANG atau tempat (-tempat) lain dimana BARANG tersebut berada;</li>
					<li style="text-align: justify;">Berhubungan dengan itu, KONSUMEN dengan ini memberi persetujuan dimuka kepada MFI untuk setiap saat memasuki setiap tempat, pekarangan, bangunan dan/atau tempat-tempat yang menjadi tempat beradanya BARANG tersebut. Kunjungan MFI atau kuasanya atau wakilnya ke dalam tempat, pekarangan, bangunan dan/atau tempat-tempat dimaksud, tidaklah dapat dianggap sebagai pelanggaran hukum memasuki tempat orang lain;</li>
					<li style="text-align: justify;">KONSUMEN juga dengan ini mengikatkan diri untuk dan atas permintaan pertama secara tertulis dari MFI, tanpa syarat apapun dan semata-mata dengan biaya tanggungannya sendiri, menyerahkan setiap dan/atau semua BARANG tersebut dalam keadaan baik kepada MFI ditempat yang ditunjuk oleh MFI, yaitu dalam hal karena suatu peristiwa Cidera Janji oleh KONSUMEN terhadap PERJANJIAN, MFI telah memutuskan untuk menarik / mengambil BARANG tersebut dari penguasaan KONSUMEN atau penguasaan siapapun juga;</li>
					<li style="text-align: justify;">KONSUMEN setuju memikul setiap dan semua risiko dan konsekuensi yang mungkin timbul karena tindakan MFI dalam mempertahankan dan melaksanakan hak-hak MFI berdasarkan PERJANJIAN tersebut, antara lain dalam hal MFI menarik dan/atau mengambil dan/atau kemudian melakukan eksekusi dengan menjual BARANG tersebut guna melunasi seluruh kewajiban / hutang KONSUMEN kepada MFI berdasarkan PERJANJIAN.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">-</td>
			<td width="97%" align="justify">Untuk keperluan hal-hal tersebut di atas, KONSUMEN dengan ini memberi kuasa penuh dengan hak subtitusi kepada MFI, kuasa mana merupakan kuasa yang tidak dapat dicabut kembali dan tidak akan berakhir karena sebab-sebab apapun juga, untuk dan atas nama KONSUMEN,</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="center" style="border-bottom: 1px black solid"><b>K H U S U S</b></td>
		</tr>
		<br>
		<tr>
			<td width="6%"></td>
			<td width="2%" align="left">1.</td>
			<td width="92%" align="justify">Memasuki setiap dan semua pekarangan, bangunan dan/atau tempat-tempat baik milik KONSUMEN atau milik PIHAK lain yang menjadi tempat beradanya atau diduga beradanya setiap dan semua BARANG tersebut;</td>
		</tr>
		<tr>
			<td width="6%"></td>
			<td width="2%" align="left">2.</td>
			<td width="92%" align="justify">Mengambil atau menarik setiap dan semua BARANG tersebut baik dari penguasaan KONSUMEN maupun dari penguasaan pihak lain;</td>
		</tr>
		<tr>
			<td width="6%"></td>
			<td width="2%" align="left">3.</td>
			<td width="92%" align="justify">Menjual kepada siapa saja dengan harga dan syarat-syarat dan ketentuan-ketentuan sebagai yang dianggap baik oleh MFI sendiri BARANG milik KONSUMEN yang diperolehnya karena pembelian dengan Fasilitas Pembiayaan dari MFI;</td>
		</tr>
		<tr>
			<td width="6%"></td>
			<td width="2%" align="left">4.</td>
			<td width="92%" align="justify">Untuk tujuan tersebut di atas, menghadap dimana perlu, kepada siapa saja, mengadakan perundingan-perundingan, menetapkan harga dan syarat-syarat penjualannya, membuat atau suruh membuat semua dokumen penjualannya, menerima seluruh uang hasil penjualannya, memberikan kuitansi atau tanda penerimaan uangnya, membayar segala pajak dan biaya, memenuhi semua kewajiban KONSUMEN sebagai Pihak Penjual, menyerahkan BARANG tersebut kepada Pembeli dan selanjutnya melakukan segala tindakan lain apapun juga yang dipandang baik,      perlu dan berguna untuk tercapainya penjualan tersebut tidak ada tindakanpun yang dikecualikan;</td>
		</tr>
		<tr>
			<td width="6%"></td>
			<td width="2%" align="left">5.</td>
			<td width="92%" align="justify">Berkenaan dengan penjualan tersebut KONSUMEN menyatakan dengan ini:</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">a.</td>
			<td width="90%" align="justify">menjamin sepenuhnya bahwa BARANG yang dijual tersebut adalah benar hak dan milik KONSUMEN sendiri, tidak ada orang atau Pihak lain yang ikut memiliki baik sebagian ataupun seluruhnya, tidak tersangkut dalam suatu perkara atau sengketa;</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">b.</td>
			<td width="90%" align="justify">mengesahkan semua tindakan yang akan diambil atau akan dilakukan oleh MFI yang bersumber dari atau berdasarkan atas kuasa-kuasa dalam surat kuasa ini;</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">c.</td>
			<td width="90%" align="justify">membebaskan Pihak yang akan membeli dari segala tuntutan hukum dalam bentuk apapun juga dari Pihak manapun juga.</td>
		</tr>
		<tr>
			<td width="6%"></td>
			<td width="2%" align="left">6.</td>
			<td width="92%" align="justify">Mengambil semua langkah dan tindakan apa saja yang dianggap baik dan berguna bagi MFI, tidak ada satu tindakan pun yang dikecualikan termasuk tetapi tidak terbatas untuk melakukan penjualan BARANG tersebut dan menggunakan dana hasil penjualan BARANG tersebut untuk membayar hutang / kewajiban KONSUMEN kepada MFI berdasarkan PERJANJIAN.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Bahwa kuasa-kuasa tersebut merupakan bagian yang penting dan tidak terpisahkan dari PERJANJIAN yang dibuat oleh dan antara KONSUMEN dan MFI.  Karenanya selama PERJANJIAN itu masih berlangsung dan/atau selama KONSUMEN masih mempunyai kewajiban untuk membayar hutangnya kepada MFI berdasarkan PERJANJIAN itu, maka kuasa-kuasa tersebut tidak dapat dicabut kembali serta tidak akan berakhir karena sebab apapun juga, termasuk sebab-sebab yang disebut dalam pasal 1813 Kitab Undang-Undang Hukum Perdata.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Yang Menyatakan dan Memberi Kuasa,</td>
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
			<td width="35%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="15%"></td>
			<td width="50%"></td>
		</tr>
	</tbody>
</table>