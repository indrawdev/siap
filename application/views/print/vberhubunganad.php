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
			<td width="40%"><b>SURAT PERNYATAAN</b></td>
			<td width="30%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="19%" align="left">Nama</td>
			<td width="1%">:</td>
			<td width="80%" align="left"><?php echo $detail->fs_nama_konsumen; ?></td>
		</tr>
		<tr>
			<td width="19%" align="left">Alamat</td>
			<td width="1%">:</td>
			<td width="80%" align="left" height="30"><?php echo $detail->fs_alamat_konsumen; ?></td>
		</tr>
		<tr>
			<td width="100%" align="left">untuk selanjutnya disebut juga sebagai <b>“KONSUMEN”</b>;</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa sehubungan dengan fasilitas pembiayaan konsumen dalam berntuk penyediaan dana yang diberikan oleh PT. MANDIRI FINANCE INDONESIA, berkedudukan di Jakarta Selatan (untuk selanjutnya disebut juga sebagai “MFI”) kepada Saya berdasarkan Perjanjian Pembiayaan No <b><?php echo $pjj->fs_pjj; ?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua perubahannya dan/atau perpanjangannya dan/atau pembaharuannya dan/atau penggantiannya disebut juga sebagai “PERJANJIAN”) untuk pengadaan barang yang berupa kendaraan sebagaimana dimaksud dalam PERJANJIAN tersebut di atas dengan data-data sebagai:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left">a. Merek</td>
			<td width="1%">:</td>
			<td width="67%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left">b.	Jenis / Type</td>
			<td width="1%">:</td>
			<td width="67%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left">c.	Tahun Kendaraan</td>
			<td width="1%">:</td>
			<td width="67%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left">d.	Nomor Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="67%" align="left"><?php echo $detail->fs_no_rangka . ' / '. $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left">e.	Warna</td>
			<td width="1%">:</td>
			<td width="67%" align="left"><?php echo $detail->fs_warna_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="30%" align="left">f.	Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="67%" align="left"><?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left">(selanjutnya disebut <b>“BARANG”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa KONSUMEN telah menyerahkan kepada MFI hak kepemilikan atas BARANG sebagai jaminan dimana selama jangka waktu PERJANJIAN masih berlangsung dan/atau selama KONSUMEN belum melunasi seluruh kewajiban kepada MFI berdasarkan berdasarkan PERJANJIAN tersebut di atas, KONSUMEN dengan ini menyatakan setuju dan menerima BARANG tersebut untuk dipergunakan oleh KONSUMEN dalam kapasitas sebagai Peminjam Pakai semata (bruiklenner), sedangkan hak dan bukti kepemilikan atas BARANG tersebut tetap berada dan dikuasai oleh MFI.</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa KONSUMEN wajib mentaati dan mematuhi semua ketentuan perundang-undangan yang berlaku dan atas biaya sendiri membayar secara tepat waktu biaya-biaya pendaftaran, ijin-ijin, pajak, pungutan dan/atau biaya lainnya sehubungan dengan penguasaan, pemakaian dan/atau penyimpanan BARANG, dalam hal ini termasuk mengurus dan melakukan perpanjangan Surat Tanda Nomor Kendaraan (STNK) dan Bea Balik Nama (BBN).</td>
		</tr>
		<br>
		<tr>
			<td width="2%">-</td>
			<td width="98%" align="justify">Bahwa dengan ini KONSUMEN menyatakan dengan sebenar-benarnya, bahwa BARANG dengan identitas di atas, juga memiliki identitas sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="20%" align="left">( _ ) Nomor Rangka</td>
			<td width="1%">:</td>
			<td width="27%" align="left"><?php echo $detail->fs_no_rangka; ?></td>
			<td width="2%"></td>
			<td width="20%" align="left">( _ ) Nomor Mesin</td>
			<td width="1%">:</td>
			<td width="27%" align="left"><?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="20%" align="left">( _ ) Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="27%" align="left"><?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?></td>
			<td width="2%"></td>
			<td width="20%" align="left">( _ ) Tahun</td>
			<td width="1%">:</td>
			<td width="27%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Sebagaimana tercantum dalam:</td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="44%" align="left">( _ ) Surat Tanda Nomor Kendaraan (STNK) nomor</td>
			<td width="1%">:</td>
			<td width="28%" align="left">.............................</td>
			<td width="7%" align="left">tanggal</td>
			<td width="1%">:</td>
			<td width="10%" align="left">........</td>
			<td width="15%"></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="44%" align="left">( _ ) Faktur nomor</td>
			<td width="1%">:</td>
			<td width="28%" align="left">.............................</td>
			<td width="7%" align="left">tanggal</td>
			<td width="1%">:</td>
			<td width="10%" align="left">........</td>
			<td width="15%"></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="left">( _ ) Fisik barang termasuk namun tidak terbatas pada gesekan nomor rangka dan nomor mesin.</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Bahwa meskipun terdapat perbedaan sebagaimana di atas, namun sesungguhnya <b><u>mengacu pada kendaraan yang sama</u></b>, yang menjadi obyek serta jaminan atas fasilitas pembiayaan Konsumen yang diberikan MFI kepada KONSUMEN berdasarkan PERJANJIAN.</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Bahwa sehubungan dengan kondisi di atas, dengan ini KONSUMEN berjanji dan mengikat diri kepada MFI bahwa apabila diperlukan KONSUMEN akan melakukan perubahan atau penyesuaian terhadap kondisi di atas, dan/atau dalam proses perpanjangan STNK dan/atau balik nama dan/atau mutasi dan/atau pengkoreksian data-data dan/atau tindakan-tindakan lain sehubungan dengan STNK dan/atau BPKB BARANG tersebut di atas, dan untuk itu maka dengan ini KONSUMEN menunjuk MFI untuk melakukan proses pengurusan tersebut baik dengan atau tanpa perantara sebuah Biro Jasa dan/atau Supplier yang ditunjuk oleh MFI, dengan seluruh biaya pengurusan menjadi beban dan tanggung jawab serta wajib dibayar oleh KONSUMEN secara dimuka dengan jumlah pembayaran awal didasarkan pada pembayaran pajak tahun sebelumnya, dengan ketentuan:</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">
				<ol>
					<li style="text-align: justify;">Apabila ternyata pembayaran KONSUMEN tersebut tidak mencukupi untuk membayar riil pengurusan STNK dan/atau BPKB BARANG, maka KONSUMEN dengan ini berjanji dan mengikat diri kepada MFI untuk melunasi kekurangannya tersebut segera setelah pengurusan selesai dilakukan, apabila KONSUMEN tidak segera melunasi kekurangannya tersebut, maka KONSUMEN setuju bahwa MFI berhak menggunakan setiap pembayarannya  yang diterima dari KONSUMEN untuk terlebih dahulu membayar kekurangannya tersebut.</li>
					<li style="text-align: justify;">Sebaliknya, apabila pembayaran KONSUMEN tersebut melebihi biaya riil pengurusan STNK dan/atau BPKB BARANG, maka MFI berhak mengalokasikan kelebihan tersebut untuk membayar hutang KONSUMEN yang tertunggak, dalam hal masih terdapat kelebihan, maka KONSUMEN wajib mengambil kelebihan tersebut dalam jangka waktu selambat-lambatnya 30 (tiga puluh) hari sejak ada pemberitahuan dari MFI untuk itu. Apabila dalam jangka waktu tersebut KONSUMEN tidak juga mengambil kelebihan dimaksud, maka MFI berhak mengalokasikan kelebihan tersebut untuk membayar hutang KONSUMEN yang akan jatuh tempo.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Bahwa sehubungan hal-hal tersebut di atas, dengan ini KONSUMEN menyatakan dan berjanji serta mengikat diri kepada MFI untuk tetap membayar angsuran setiap bulannya berdasarkan PERJANJIAN tersebut di atas, berikut dengan bunga, denda dan biaya-biaya lain (jika ada), sampai jumlah seluruh kewajiban KONSUMEN kepada MFI lunas, apabila terjadi hal-hal sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">
				<ol>
					<li style="text-align: justify;">Dalam hal penyimpanan BPKB dan proses pengurusan sebagaimana dimaksud di atas, ternyata asli STNK dan/atau asli BPKB atas BARANG hilang, maka KONSUMEN dengan ini menyatakan bersedia untuk menerima duplikasi STNK dan/atau BPKB atas BARANG tersebut serta Surat Keterangan yang dikeluarkan oleh pejabat yang berwenang untuk itu, dengan membebaskan KONSUMEN dari kewajiban membayar biaya pengurusan duplikat STNK dan/atau BPKB atas BARANG tersebut di atas. Kecuali dalam hal BPKB masih dalam proses BALIK NAMA oleh pihak yang berwenang menjadi atas nama KONSUMEN, yang diproses melalui pihak supplier tempat dimana KONSUMEN membeli BARANG tersebut, maka seluruh dan setiap risiko yang mungkin timbul menjadi beban dan tanggung jawab KONSUMEN sendiri sebagai pihak yang menunjuk supplier selaku penjual atas pembelian BARANG. Dalam hal ini KONSUMEN menyatakan membebaskan MFI dari risiko tersebut.</li>
					<li style="text-align: justify;">Dalam hal dilakukan proses perpanjangan STNK dan/atau BBN atas BARANG yang dilakukan melalui MFI, Konsumen dengan ini berjanji dan mengikat diri kepada MFI untuk menyerahkan asli STNK atas BARANG tersebut di atas kepada MFI, selambat-lambatnya dalam waktu 7 (tujuh) hari sebelum tanggal jatuh tempo STNK tersebut.</li>
					<li style="text-align: justify;">KONSUMEN dengan ini menerima dan menyetujui bahwa karena satu dan lain hal telah terjadi kesalahan administrasi dalam hal pencatatan data tentang BARANG didalam BPKB, sehingga dilakukan koreksi oleh Pihak yang berwenang (Kepolisian), yang mengakibatkan di dalam BPKB BARANG tersebut terdapat / terlihat hasil koreksi yang dapat berupa pencoretan dan/atau penghapusan dan/atau penimpaan dan/atau dengan cara-cara lain sesuai kebijakan pihak yang berwajib sendiri.</li>
					<li style="text-align: justify;">Karena satu dan lain hal telah terjadi penyitaan  terhadap STNK dan/atau BPKB BARANG dalam proses pengurusan tersebut pada saat ini dan untuk nantinya dengan ini menyatakan berhutang kepada MFI sesuai PERJANJIAN.</li>
					<li style="text-align: justify;">Apabila terdapat kekeliruan penulisan dan/atau pengisian didalam PERJANJIAN sehingga tidak sesuai dengan yang dimaksud dalam rangka pemeberian fasilitas berdasarkan PERJANJIAN, maka KONSUMEN setuju dan menerima bahwa kekeliruan tersebut akan tetap diinterprestasikan sesuai dan berdasarkan tujuan dan maksud dari pemberian fasilitas berdasarkan PERJANJIAN sesuai dengan dokumen pendukung.</li>
					<li style="text-align: justify;">KONSUMEN berjanji dan mengikat diri kepada MFI untuk membebaskan MFI dari segala tuntutan maupun gugatan sehubungan dengan hal-hal tersebut di atas, termasuk tetapi tidak terbatas apabila didalam PERJANJIAN terdapat / terjadi kekeliruan penulisan, khususnya didalam LAMPIRAN PERJANJIAN, maka KONSUMEN dengan ini menyatakan bahwa kekeliruan tersebut tidak mempengaruhi terhadap hal-hal yang telah disepakati.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<tr>
			<td width="50%" align="left">Yang Membuat Pernyataan,</td>
			<td width="50%" align="left">Menyetujui</td>
		</tr>
		<tr>
			<td width="50%"></td>
			<td width="50%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
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
			<td width="35%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="15%"></td>
			<td width="35%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>
			</td>
			<td width="15%"></td>
		</tr>
	</tbody>
</table>