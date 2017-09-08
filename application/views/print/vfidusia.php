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
			<td width="70%" align="center"><b>PERJANJIAN PENYERAHAN HAK MILIK SECARA FIDUSIA</b></td>
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
			<td width="100%" align="justify" height="40"><b><?php echo $detail->fs_nama_konsumen; ?></b>, karyawan swasta, berlamat di <?php echo $detail->fs_alamat_konsumen; ?>, pemegang Kartu Tanda Penduduk Nomor <b><?php echo $detail->fs_ktp_konsumen; ?></b></td>
		</tr>
		<tr>
			<td width="100%" align="left">(selanjutnya disebut <b>“PIHAK PERTAMA”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify"><b><?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?></b>, selaku Kepala Cabang, oleh karena itu bertindak untuk dan atas nama PT. Mandiri Finance Indonesia, berkedudukan di Jakarta Selatan,</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">(selanjutnya disebut <b>“PIHAK KEDUA”</b>);</td>
		</tr>
		<br>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Bahwa berdasarkan Perjanjian Pembiayaan Nomor <b><?php echo $pjj->fs_pjj;?></b> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?> (untuk selanjutnya perjanjian tersebut berikut setiap dan semua perubahannya dan/atau perpanjangannya dan/atau pembaharuannya dan/atau penggantiannya akan disebut juga sebagai <b>“PERJANJIAN”</b>), yang telah dibuat dan ditandatangani bersama antara <b><?php echo $detail->fs_nama_konsumen; ?></b> (selanjutnya disebut <b>“KONSUMEN”</b>) dengan PIHAK KEDUA;</td>
		</tr>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Bahwa berdasarkan ketentuan PERJANJIAN tersebut, KONSUMEN wajib memberikan jaminan untuk pembayaran kembali dengan tertib dan secara sebagaimana mestinya dari seluruh jumlah uang yang terhutang dan kewajiban lainnya yang harus dibayar oleh KONSUMEN kepada PIHAK KEDUA;</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Maka sehubungan dengan apa yang diuraikan di atas:</td>
		</tr>
		<br>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">Sekarang PIHAK PERTAMA menerangkan dengan ini menyerahkan hak milik secara fidusia kepada PIHAK KEDUA, barang berupa kendaraan dengan data sebagai berikut: </td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="2%">a.</td>
			<td width="20%" align="left">Merek</td>
			<td width="1%">:</td>
			<td width="75%" align="left"><?php if (!empty($kendaraan->fs_merek_kendaraan)) { echo $kendaraan->fs_merek_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%">b.</td>
			<td width="20%" align="left">Jenis / Type</td>
			<td width="1%">:</td>
			<td width="73%" align="left"><?php if (!empty($kendaraan->fs_model_kendaraan)) { echo $kendaraan->fs_model_kendaraan; } ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%">c.</td>
			<td width="20%" align="left">Tahun Kendaraan</td>
			<td width="1%">:</td>
			<td width="75%" align="left"><?php echo $detail->fn_tahun_kendaraan; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%">d.</td>
			<td width="20%" align="left">Nomor Rangka / Mesin</td>
			<td width="1%">:</td>
			<td width="75%" align="left"><?php echo $detail->fs_no_rangka; ?> / <?php echo $detail->fs_no_mesin; ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%">e.</td>
			<td width="20%" align="left">Warna</td>
			<td width="1%">:</td>
			<td width="75%" align="left"><?php echo strtoupper($detail->fs_warna_kendaraan); ?></td>
		</tr>
		<tr>
			<td width="2%"></td>
			<td width="2%">f.</td>
			<td width="20%" align="left">Nomor Polisi</td>
			<td width="1%">:</td>
			<td width="75%" align="left">
				<?php echo strtoupper($detail->fs_kode_wilayah_no_polisi . $detail->fs_no_polisi . $detail->fs_kode_akhir_wilayah_no_polisi); ?>
			</td>
		</tr>
		<br>
		<tr>
			<td width="2%"></td>
			<td width="98%" align="justify">Selanjutnya disebut <b>“BARANG JAMINAN”</b>;</td>
		</tr>
		<br>
		<tr>
			<td width="2%" align="left">-</td>
			<td width="98%" align="justify">PIHAK KEDUA menerangkan dengan ini menerima penyerahan hak milik secara fidusia kepada PIHAK PERTAMA tersebut.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Selanjutnya para penghadap masing-masing menerangkan bahwa penyerahan hak milik fidusia ini diterima dan dilangsungkan dengan memakai syarat-syarat dan ketentuan-ketentuan sebagai berikut:</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="center"><b>Pasal 1</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Penyerahan dan penerimaan hak milik secara fidusia tesebut telah dilakukan, dimana BARANG JAMINAN tersebut berada dan telah menjadi milik PIHAK KEDUA secara fidusia dan karenanya semua surat-surat atau dokumen-dokumen yang merupakan bukti pemilikan BARANG JAMINAN tersebut diserahkan oleh PIHAK PERTAMA kepada PIHAK KEDUA untuk disimpan, sedangkan BARANG JAMINAN tersebut tetap berada pada PIHAK PERTAMA, akan tetapi sekarang bukan sebagai pemilik tetapi hanya selaku peminjam pakai belaka.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Pemakaian / peminjaman tersebut akan berakhir bilamana KONSUMEN tidak memenuhi salah satu ketentuan dalam Perjanjian ini dan/atau ketentuan dalam PERJANJIAN yang telah dibuat dan yang akan dibuat dikemudian hari, termasuk perubahannya dan/atau penambahannya dan/atau pembaharuannya dan/atau perpanjangannya yang mungkin ada dan/atau perjanjian-perjanjian apapun antara KONSUMEN dan PIHAK KEDUA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="center"><b>Pasal 2</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">BARANG JAMINAN tersebut dapat dipergunakan oleh PIHAK PERTAMA menurut sifat dan peruntukannya, akan tetapi dengan kewajiban:</td>
		</tr>
		<br>
		<tr>
			<td width="3%" align="left">a.</td>
			<td width="97%" align="justify">Membayar semua kewajiban pajak dan beban-beban lainnya berkenaan dengan BARANG JAMINAN tersebut sebagaimana mestinya;</td>
		</tr>
		<tr>
			<td width="3%" align="left">b.</td>
			<td width="97%" align="justify">Menggunakan atau mengoperasikan BARANG JAMINAN sesuai dengan sifat dan peruntukannya sebagaimana lazimnya dan dalam menggunakannya itu harus senantiasa berpedoman dan patuh pada persyaratan teknis penggunaan yang ditetapkan oleh pabrik pembuatannya;</td>
		</tr>
		<tr>
			<td width="3%" align="left">c.</td>
			<td width="97%" align="justify">Memelihara BARANG JAMINAN tersebut dengan sebaik-baiknya dan melakukan segala perbaikan-perbaikan yang diperlukan. Apabila untuk penggunaan BARANG JAMINAN tersebut masih diperlukan surat kuasa khusus tersendiri, maka PIHAK KEDUA dengan ini memberikan kuasa kepada PIHAK PERTAMA untuk mempergunakannya dan karenanya semua kuasa-kuasa yang masih diperlukan dianggap kata demi kata telah diberikan dalam Perjanjian ini.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 3</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">PIHAK PERTAMA dengan ini berjanji dan mengikatkan diri untuk tidak akan menyewakan, menggadaikan, memindahtangankan, melakukan fidusia ulang atau membebankan / menjaminkan dengan cara bagaimanapun juga BARANG JAMINAN tersebut kepada Pihak manapun juga, tanpa persetujuan tertulis terlebih dahulu dari PIHAK KEDUA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">PIHAK KEDUA atau wakilnya yang sah setiap waktu berhak untuk memeriksa tentang masih adanya atau keadaan dari BARANG JAMINAN tersebut dan bilamana perlu atas biaya PIHAK PERTAMA, melakukan atau suruh melakukan segala sesuatu yang harus dilakukan oleh PIHAK PERTAMA bilamana ternyata PIHAK PERTAMA melalaikan kewajibannya.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 4</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Apabila BARANG JAMINAN tersebut rusak dan/atau karena apapun juga sehingga tidak dapat dipergunakan lagi, maka PIHAK PERTAMA dengan ini berjanji serta mengikat diri akan mengganti dengan barang-barang jaminan lainnya yang disetujui dan dapat diterima oleh PIHAK KEDUA dan pengganti dari BARANG JAMINAN tersebut sebagai jaminan yang dinyatakan dalam Perjanjian ini dan karenanya harus tunduk dan mentaati semua ketentuan-ketentuan dan syarat-syarat dalam Perjanjian ini.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 5</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">PIHAK PERTAMA berjanji dan mengikatkan diri untuk mengasuransikan BARANG JAMINAN tersebut terhadap bahaya kebakaran dan bahaya-bahaya lainnya yang dianggap perlu kepada perusahaan asuransi yang ditunjuk atau disetujui oleh PIHAK KEDUA, dengan syarat-syarat dan perjanjian-perjanjian yang disetujui atau ditentukan oleh PIHAK KEDUA dan didalam polis yang bersangkutan harus dicantumkan bahwa dalam hal terjadi suatu peristiwa, maka uang ganti rugi asuransinya harus dibayarkan kepada PIHAK KEDUA untuk diperhitungkan dengan jumlah-jumlah kewajiban PIHAK PERTAMA kepada PIHAK KEDUA, apabila terdapat kelebihan, maka PIHAK KEDUA dengan permintaan dari PIHAK PERTAMA, dapat mengembalikan kelebihannya kepada PIHAK PERTAMA, akan tetapi tanpa PIHAK KEDUA diwajibkan untuk membayar bunga atau ganti kerugian berupa apapun atas uang kelebihan tersebut.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Pada polis asuransi harus dicantumkan klausula leasing atas nama PIHAK KEDUA, sehingga dalam hal terjadi kerugian, maka uang penggantiannya (klaim) harus dibayarkan untuk PIHAK KEDUA <i>(Leasing’s Clause)</i>.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Bagaimanapun juga premi-premi dan biaya-biaya lainnya yang berkenaan dengan asuransi tersebut, menjadi tanggungan sepenuhnya dari PIHAK PERTAMA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Bilamana PIHAK PERTAMA tidak atau lalai mengasuransikan BARANG JAMINAN tersebut, maka PIHAK KEDUA berhak dan dengan ini sekarang dan untuk nanti pada waktunya telah diberi kuasa oleh PIHAK PERTAMA untuk mengurus penutupan asuransi termaksud; untuk keperluan mana menandatangani segala sesuatu yang dianggap perlu, sedangkan premi-premi dan biayanya tetap harus dibayar oleh dan menjadi tanggungan PIHAK PERTAMA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Sepanjang masih diperlukan, PIHAK PERTAMA dengan ini memberikan kepada PIHAK KEDUA untuk memperpanjang dan menambah nilai asuransi atas BARANG JAMINAN tersebut bilamana asuransinya telah berakhir jangka waktunya. Akan tetapi bilamana PIHAK KEDUA tidak mempergunakan kekuasaan yang diberikan kepadanya tersebut, maka PIHAK KEDUA dibebaskan dari segala tuntutan atau tagihan berupa apapun mengenai akibat dari tidak dipergunakannya kekuasaan dimaksud.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 6</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Dalam hal KONSUMEN tidak menjalankan atau memenuhi salah satu ketentuan dalam Perjanjian tersebut dan/atau perjanjian-perjanjian lainnya, baik yang telah dan/atau akan dibuat oleh KONSUMEN dan PIHAK KEDUA termasuk perubahannya dan/atau penambahannya dan/atau pembaharuannya dan/atau perpanjangannya yang mungkin ada, hal mana cukup dibuktikan dengan lewatnya waktu saja dan karena itu tidak diperlukan pemberitahuan dengan surat dari juru sita atau surat-surat lain yang berkekuatan demikian, maka PIHAK KEDUA dengan ini sekarang untuk nantinya telah diberi kuasa dan karenanya ada hak sepenuhnya untuk menjual BARANG JAMINAN tersebut, baik dengan cara lelang maupun dibawah tangan dengan syarat-syarat serta harga yang layak akan ditentukan oleh PIHAK KEDUA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Untuk keperluan tersebut di atas, PIHAK KEDUA dikuasakan menghadap dimana perlu, memberikan keterangan-keterangan serta memperlihatkan surat-surat yang dimana, membuat, suruh membuat dan menandatangani perjanjian-perjanjian dan surat-surat yang diperlukan, melakukan jual-beli, menentukan syarat-syaratnya, menerima harga pembayarannya, membuat dan menandatangani serta memberikan kwitansinya, menyerahkan BARANG JAMINAN yang dijual kepada pembeli, memperhitungkan uang penjualan itu dengan kewajiban KONSUMEN kepada PIHAK KEDUA; memilih tempat tinggal kediaman dan singkatnya melakukan apa saja yang perlu dan berguna untuk mencapai maksud tersebut di atas, tidak ada tindakan yang dikecualikan.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Apabila hasil penjualan BARANG JAMINAN tersebut ternyata tidak mencukupi untuk melunasi hutang KONSUMEN, maka PIHAK PERTAMA terikat sekarang untuk nantinya membayar sisanya atau kekurangannya tersebut kepada PIHAK KEDUA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 7</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Dalam hal PIHAK KEDUA mempergunakan hak-haknya dan hak-hak istimewanya yang tersebut dalam Perjanjian ini, maka PIHAK PERTAMA pada saat ini dan untuk nantinya dengan ini mengikatkan diri kepada PIHAK KEDUA untuk menyerahkan BARANG JAMINAN tersebut atas permintaan pertama dari PIHAK KEDUA dan bilamana PIHAK PERTAMA ternyata lalai, hal mana cukup dibuktikan dengan lewatnya waktu saja dan oleh karena itu tidak diperlukan pemberitahuan dengan surat juru sita atau surat-surat lain yang berkekuatan demikian, maka PIHAK KEDUA berhak tanpa perantaraan hakim mengambil atau suruh mengambil BARANG JAMINAN tersebut, baik dari tangan PIHAK PERTAMA maupun dari tangan Pihak Ketiga yang menguasainya, yang sedemikian bilamana dianggap perlu dengan bantuan polisi atau alat-alat kekuasaan negara lainnya, akan tetapi semua biaya yang bertalian dengan itu menjadi tanggungan dan harus dibayar oleh PIHAK PERTAMA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 8</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Penyerahan hak milik secara fidusia ini dilakukan oleh PIHAK PERTAMA kepada PIHAK KEDUA dengan syarat yang memutuskan, bahwa apabila PIHAK PERTAMA telah memenuhi dan membayar lunas semua apa yang wajib dibayar oleh KONSUMEN kepada PIHAK KEDUA yang timbul dari atau berdasarkan Perjanjian dan/atau perjanjian-perjanjian apapun antara KONSUMEN dan PIHAK KEDUA, baik yang telah dan/atau akan dibuat, maka BARANG JAMINAN yang diserahkan hak miliknya secara fidusia kepada PIHAK KEDUA akan beralih dengan sendirinya menurut hukum kepada PIHAK PERTAMA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 9</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Perjanjian dan kekuasaan-kekuasaan yang tersebut dalam Perjanjian ini tidak dapat dicabut selama PERJANJIAN tersebut antara KONSUMEN dan PIHAK KEDUA belum selesai seluruhnya, baik hutang yang akan timbul / dibuat dikemudian hari oleh KONSUMEN kepada PIHAK KEDUA termasuk perubahannya dan/atau penambahannya dan/atau pembaruannya dan/atau perpanjangannya yang mungkin ada dan/atau perjanjian-perjanjian apapun antara KONSUMEN dan PIHAK KEDUA, yang dengan tidak adanya kuasa-kuasa mana tidak akan berlangsung juga kuasa-kuasa tersebut dalam Perjanjian ini diberikan dengan melepaskan segala aturan-aturan yang termuat dalam Undang-Undang yang mengatur dasar-dasar dan sebab-sebab yang menyebabkan sesuatu kuasa berakhir.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 10</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Ongkos Perjanjian dan biaya-biaya lainnya yang berhubungan dengan pembuatan Perjanjian ini, antara lain biaya pelaksaan jaminan tersebut dalam Perjanjian ini, seluruhnya menjadi tanggungan dan harus dibayar oleh PIHAK PERTAMA.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center"><b>Pasal 11</b></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Untuk Perjanjian ini dengan segala akibat dan pelaksanaannya, kedua belah Pihak memilih Domisili hukum di Kantor Pengadilan Negeri <?php echo $cabang->fs_kota_cabang; ?>, akan tetapi pemilihan domisili hukum tersebut tidak membatasi atau tidak boleh diartikan sebagai membatasi hak Mandiri Finance untuk mengajukan tuntutan-tuntutan hukum kepada Konsumen berkenaan dengan Perjanjian ini di Pengadilan lain di Indonesia. Domisili hukum tersebut berlaku pula terhadap (Para) Pengganti dan/ atau (Para) Penerima hak dari Mandiri Finance dan Konsumen.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="30%" align="left">PIHAK PERTAMA</td>
			<td width="20%"></td>
			<td width="30%" align="left">PIHAK KEDUA,</td>
			<td width="20%"></td>
		</tr>
		<tr>
			<td width="50%"></td>
			<td width="30%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
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
			<td width="30%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="20%"></td>
			<td width="30%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>
			</td>
			<td width="20%"></td>
		</tr>
	</tbody>
</table>