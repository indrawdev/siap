<?php for ($i = 1; $i <= 1; $i++) : ?>
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
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="center" style="font-size: 9px">
				<b><?php
					if ($detail->fs_komersial == 'Y') {
						echo "PERJANJIAN PEMBIAYAAN INVESTASI";
					} else {
						echo "PERJANJIAN PEMBIAYAAN MULTIGUNA";
					}
				?> - PEMBELIAN DENGAN PEMBAYARAN SECARA ANGSURAN</b>
			</td>
		</tr>
		<tr>
			<td width="100%" align="center">Nomor: <b><?php echo $pjj->fs_pjj; ?></b></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="left">Pada hari ini, <?php echo hari_indo($detail->fd_tanggal_perjanjian); ?> tanggal <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?>, yang bertanda tangan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="2%" align="left"><b>I.</b></td>
			<td width="98%" align="justify"><b>PT. Mandiri Finance Indonesia</b>, berkedudukan di Jakarta Selatan, dalam hal ini bertindak dan untuk atas nama serta mewakili kepentingan diri sendiri dan pihak sebagaimana tercantum dalam Struktur Perjanjian dan atau lampiran perjanjian yang menjadi satu kesatuan dan bagian yang tidak terpisahkan dari perjanjian ini (dan selanjutnya disebut <b>”Perseroan”</b>), dan</td>
		</tr>
		<tr>
			<td width="2%" align="left"><b>II.</b></td>
			<td width="98%" align="justify"><b>Debitur</b> sebagaimana dimaksud dalam Struktur Perjanjian.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Perseroan dan Debitur dengan ini sepakat untuk saling mengikatkan diri dengan ini membuat serta menandatangani <?php if ($detail->fs_komersial == 'Y') { echo 'Perjanjian Pembiayaan Investasi'; } else { echo 'Perjanjian Pembiayaan Multiguna'; } ?> - Pembelian Dengan Pembayaran Secara Angsuran ini dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut: (selanjutnya <?php if ($detail->fs_komersial == 'Y') { echo 'Perjanjian Pembiayaan Investasi'; } else { echo 'Perjanjian Pembiayaan Multiguna'; } ?> - Pembelian Dengan Pembayaran Secara Angsuran ini disebut <b>“Perjanjian”</b>).</td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="100%" align="center"><b>PASAL 1</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>ISTILAH</b></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Setiap istilah di bawah ini mempunyai arti dan pengertian sebagai berikut:</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.1.</td>
							<td width="92%" align="justify"><b>“Angsuran”</b> adalah Pokok Hutang berikut bunga yang dibayarkan secara berkala pada setiap bulan dalam jumlah dan tanggal sebagaimana tersebut dalam Struktur Perjanjian.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.2.</td>
							<td width="92%" align="justify"><b>“Barang dan/atau Jasa”</b> adalah barang dan/atau jasa yang dibiayai berdasarkan kebutuhan dan sesuai pilihan Debitur sendiri dengan menggunakan Fasilitas dengan sistem pembayaran angsuran atau berkala oleh Debitur.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.3.</td>
							<td width="92%" align="justify"><b>“Fasilitas Pembelian Dengan Pembayaran Secara Angsuran”</b> (selanjutnya disebut <b>“Fasilitas”</b>) adalah kegiatan pembiayaan dalam bentuk pengadaan Barang dan/atau Jasa yang dibeli oleh Debitur dari Penyedia Barang atau Jasa dengan Pembayaran secara Angsuran.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.4.</td>
							<td width="92%" align="justify"><b>“Jaminan”</b> adalah jaminan pribadi atau jaminan perusahaan dan/atau jaminan kebendaan baik berwujud ataupun tidak berwujud yang diserahkan oleh penjamin kepada Perseroan untuk menjamin hutang Debitur dengan sebagaimana mestinya.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.5.</td>
							<td width="92%" align="justify"><b>“Debitur”</b> adalah Pihak yang memperoleh Fasilitas dari Perseroan sebagaimana ternyata dalam Perjanjian dan Struktur Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.6.</td>
							<td width="92%" align="justify"><b>“Bunga”</b> adalah suku bunga efektif.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.7.</td>
							<td width="92%" align="justify"><b>“Pokok Hutang”</b> adalah jumlah Fasilitas yang disetujui untuk diberikan kepada Debitur guna melunasi harga pembelian  Barang dan/atau Jasa sebagaimana disebutkan dalam Struktur Perjanjian.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.8.</td>
							<td width="92%" align="justify"><b>“Pembayaran Kembali”</b> adalah kewajiban Debitur untuk membayar kembali hutangnya (Pokok Hutang berikut Bunga) kepada Perseroan yang dilakukan secara Angsuran, dimana masing-masing besar Pokok Hutang berikut Bunga tercantum dalam Struktur Perjanjian, yang harus dibayar tepat pada waktunya.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.9.</td>
							<td width="92%" align="justify"><b>“Pengakhiran Lebih Awal”</b> adalah pengakhiran Perjanjian ini oleh Debitur sebelum Angsuran terakhir sebagaimana tercantum dalam Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.10.</td>
							<td width="92%" align="justify"><b>“Penjamin”</b> adalah Debitur atau pihak ketiga yang mengikatkan dirinya sebagai penjamin atau penanggung dengan menyerahkan Jaminan kepada Perseroan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.11.</td>
							<td width="92%" align="justify"><b>“Perjanjian Jaminan”</b> adalah perjanjian antara Penjamin dan Perseroan dimana Penjamin menyerahkan Jaminan kepada Perseroan yang diikat sesuai dengan ketentuan perundang-undangan yang berlaku.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.12.</td>
							<td width="92%" align="justify"><b>“Perusahaan Asuransi”</b> adalah perusahaan yang memberikan jasa asuransi terhadap Barang.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.13.</td>
							<td width="92%" align="justify"><b>“Struktur Perjanjian”</b> adalah Struktur Perjanjian Pembelian Dengan Pembayaran Secara Angsuran yang mengatur hal-hal pokok dari perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">1.14.</td>
							<td width="92%" align="justify"><b>“Penyedia Barang dan/ atau Jasa”</b> adalah pihak yang menjual Barang dan/atau Jasa kepada Debitur.</td>
						</tr>
					</tbody>
				</table>
			</td>
			<td width="2%"></td>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="100%" align="center"><b>PASAL 2</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PERSYARATAN POKOK</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">2.1.</td>
							<td width="92%" align="justify">Debitur dengan ini mengakui dan setuju bahwa:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Fasilitas yang diperoleh berdasarkan perjanjian ini, merupakan Fasilitas Pembelian Dengan Pembayaran Secara Angsuran berdasarkan Perjanjian yang dilakukan oleh Perseroan dan Pihak ketiga lainnya, sehingga Debitur mengakui dan setuju bahwa:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Pihak yang diwakili Perseroan sebagaimana disebutkan dalam Struktur Perjanjian dan/atau Lampiran Perjanjian memperoleh hak-hak selaku kreditur yang timbul berdasarkan Perjanjian ini berikut perjanjian perngikatan jaminannya serta Perjanjian yang turutannya merupakan bagian dan satu kesatuan dari Perjanjian ini beserta dengan segala perpanjangan dan perubahan daripadanya.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Hutang yang timbul akibat kepesertaan pihak yang diwakili oleh Perseroan sebagaimana disebutkan dalam Struktur Perjanjian dan/atau Lampiran Perjanjian merupakan bagian dari hutang yang timbul berdasarkan Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">2.2.</td>
							<td width="92%" align="justify">Perseroan setuju untuk memberikan Fasilitas kepada Debitur, dan Debitur setuju untuk menerima Fasilitas dari Perseroan berdasarkan syarat dan ketentuan sebagaimana diuraikan dalam Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">2.3.</td>
							<td width="92%" align="justify">Bunga, biaya-biaya dan/atau denda:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Debitur wajib membayar kepada Perseroan suku bunga yang besarnya sebagaimana ditentukan dalam Struktur Perjanjian.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Debitur wajib membayar biaya-biaya sebagaimana ditentukan dalam Perjanjian ini dan harus dibayar segera setelah Perjanjian ini ditandatangani dan/atau atas permintaan pertama dari Perseroan.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Atas setiap keterlambatan pembayaran Angsuran, Debitur dikenakan denda sebagaimana ditentukan dalam Struktur Perjanjian yang dihitung dari jumlah Angsuran yang tertunggak.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 3</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>CARA PENARIKAN FASILITAS</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">3.1.</td>
							<td width="92%" align="justify">Penarikan Fasilitas dapat dilakukan bilamana persediaan dana rupiah pada Perseroan mencukupi dan setelah Debitur terlebih dahulu memenuhi semua syarat-syarat pendahuluan yang ditetapkan oleh Perseroan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">3.2.</td>
							<td width="92%" align="justify">Penarikan atau pencairan Fasilitas (hutang) dalam Perjanjian ini akan dilakukan dengan cara pembayaran langsung oleh Perseroan kepada Penyedia Barang dan/atau Jasa atau pihak lain yang ditunjuk oleh Penyedia Barang dan/atau Jasa, uang sejumlah <b>Pokok Hutang</b> sebagaimana tersebut dalam Struktur Perjanjian, atau jumlah lain berdasarkan kondisi dan situasi tertentu yang telah disepakati terlebih dahulu oleh Perseroan dan Debitur, guna melunasi harga pembelian Barang dan/atau Jasa oleh Debitur kepada Penyedia Barang dan/atau Jasa. </td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="8%" align="left">3.3.</td>
							<td width="92%" align="justify">Dalam hal pembelian Barang berupa tanah dan/atau bangunan, maka penarikan atau pencairan Fasilitas (Hutang) dalam Perjanjian ini akan dilakukan setelah:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Dibuat dan ditandatanganinya Akta Perjanjian Pengikatan Jual Beli (PPJB) atau Akta Jual Beli (AJB) dihadapan Pejabat Pembuat Akta Tanah (PPAT) oleh dan antara Debitur dengan Penyedia Barang.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Debitur terlebih dahulu membayar pajak, biaya dan beban lainnya untuk dapat terlaksananya PPJB atau AJB, termasuk tetapi tidak terbatas pada Pajak Pertambahan Nilai (PPN), pendaftaran (balik nama) sertifikat tanah menjadi atas nama Debitur, termasuk tetapi tidak terbatas pada:</td>
						</tr>
						<tr>
							<td width="13%" align="left"></td>
							<td width="3%" align="left">-</td>
							<td width="84%" align="justify">Bea Perolehan Hak Atas Tanah Dan Bangunan (BPHTB),</td>
						</tr>
						<tr>
							<td width="13%" align="left"></td>
							<td width="3%" align="left">-</td>
							<td width="84%" align="justify">Biaya balik nama sertifikat atas nama Debitur,</td>
						</tr>
						<tr>
							<td width="13%" align="left"></td>
							<td width="3%" align="left">-</td>
							<td width="84%" align="justify">PNBP dan biaya-biaya lainnya yang dipersyaratkan sesuai peraturan perundang-undangan yang berlaku untuk transaksi atas tanah dan bangunan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">3.4.</td>
							<td width="92%" align="justify">Bukti pembayaran oleh Perseroan kepada Penyedia Barang dan/atau Jasa atau pihak lain yang ditunjuk oleh Penyedia Barang dan/atau Jasa sebesar Pokok Hutang atau jumlah lain berdasarkan kondisi dan situasi tertentu yang telah disepakati terlebih dahulu oleh Perseroan dan Debitur, merupakan bukti penerimaan uang oleh Debitur dari Perseroan sebagai pencairan atas Fasilitas berdasarkan Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">3.5.</td>
							<td width="92%" align="justify">Debitur bertanggung jawab atas segala risiko dalam bentuk apapun, baik berkenaan dengan penyerahan Barang dan/atau pelaksanaan Jasa oleh Penyedia Barang dan/atau Jasa kepada Debitur maupun risiko lain yang pada umumnya harus ditanggung oleh setiap Pembeli atas Barang dan/atau Jasa yang dibeli oleh Debitur dari Penyedia Barang dan/atau Jasa, yang pembayarannya dilakukan oleh atau melalui kuasa atau atas kuasa dari Debitur, demikian juga risiko atas pemakaian dan/atau penggunaan Barang dan/atau Jasa menjadi beban dan tanggung jawab Debitur.</td>
						</tr>
						<br>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 4</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PERNYATAAN, JAMINAN DAN PENGAKUAN HUTANG</b></td>
						</tr>
						<br>
						<br>
						<tr>
							<td width="8%" align="left">4.1.</td>
							<td width="92%" align="justify">Debitur dengan ini mengakui benar dan secara sah berhutang kepada Perseroan sebesar Pokok Hutang sebagaimana tercantum pada Struktur Pembiayaan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">4.2.</td>
							<td width="92%" align="justify">Debitur dengan ini mengakui bahwa besarnya seluruh hutang yang terhutang oleh Debitur kepada Perseroan berdasarkan Perjanjian ini, didasarkan pada pembukuan dan pencatatan-pencatatan dari Perseroan. Pembukuan dan pencatatan-pencatatan dari Perseroan merupakan bukti tentang semua jumlah hutang atau kewajiban Debitur kepada Perseroan berdasarkan Perjanjian ini dan mengikat terhadap Debitur.</td>
						</tr>
						<tr>
							<td width="8%" align="left">4.3.</td>
							<td width="92%" align="justify">Jumlah yang sewaktu-waktu terhutang oleh Debitur kepada Perseroan berdasarkan Perjanjian ini meliputi semua jumlah Pokok Hutang, Bunga, Angsuran yang tertunggak, denda, pajak serta biaya-biaya lain yang berkenaan dengan Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">4.4.</td>
							<td width="92%" align="justify">Debitur dengan ini menyatakan dan menjamin kepada Perseroan bahwa Debitur:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Pada saat penandatanganan Perjanjian ini dalam keadaan sehat dan tidak/sedang dalam perawatan di rumah sakit;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Tidak tersangkut dalam suatu perkara atau sengketa apapun juga;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Tidak berada dalam keadaan pailit;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">d.</td>
							<td width="87%" align="justify">Tidak berada dalam keadaan wanprestasi atau dinyatakan bermasalah oleh pihak ketiga lainnya;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">e.</td>
							<td width="87%" align="justify">Jaminan yang diserahkan kepada Perseroan adalah benar milik Penjamin dan tidak ada pihak lain yang turut memiliki jaminan tersebut, sehingga Penjamin adalah pihak satu-satunya yang berhak dan berwenang penuh untuk menjaminkannya, bahwa jaminan tersebut tidak sedang dijaminkan kepada siapapun juga, tidak sedang dijual, tidak tersangkut dalam suatu perkara atau sengketa, tidak dalam sitaan, dan bebas dari segala hutang pajak dan/atau bea kepada Pemerintah, demikian sehingga Perseroan dibebaskan sepenuhnya dari tanggung jawab, bila dikemudian hari ternyata ada tuntutan-tuntutan mengenai hal-hal tersebut di atas dari pihak manapun juga;</td>
						</tr>
					</tbody>
				</table>
			</td>
			<td width="2%"></td>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="7%" align="left"></td>
							<td width="5%" align="left">f.</td>
							<td width="88%" align="justify">Untuk membuat, menandatangani dan menyerahkan Perjanjian ini dan jaminan-jaminan kepada Perseroan, Debitur dan Penjamin tidak memerlukan ijin atau persetujuan dari orang lain / pihak siapapun juga untuk membuat, menandatangani dan menyerahkan Perjanjian ini dan jaminan-jaminan kepada Perseroan, maka Debitur dan Penjamin telah memperoleh ijin atau persetujuan tersebut pada tanggal ditandatanganinya Perjanjian ini;</td>
						</tr>
						<tr>
							<td width="7%" align="left"></td>
							<td width="5%" align="left">g.</td>
							<td width="88%" align="justify">Pemberian Fasilitas ini kepada Debitur tidak akan menyebabkan atau timbulnya suatu peristiwa kelalaian / pelanggaran.</td>
						</tr>
						<tr>
							<td width="7%" align="left">4.5.</td>
							<td width="93%" align="justify">Perseroan atau wakilnya yang sah setiap waktu berhak untuk memeriksa keadaan dan/atau keberadaan dari jaminan dan bilamana perlu atas biaya Debitur, melakukan atau suruh melakukan segala sesuatu yang harus dilakukan oleh Debitur dan/atau Penjamin bila ternyata Debitur dan/atau Penjamin melalaikan kewajibannya. Apabila Jaminan tersebut rusak dan/atau karena apapun juga sehingga tidak dapat dipergunakannya lagi atau tidak lagi cukup untuk menjamin hutang Debitur kepada Perseroan, maka Debitur dan/atau Penjamin dengan ini berjanji serta mengikat diri akan mengganti dan/atau menambah dengan barang-barang jaminan lainnya yang disetujui dan dapat diterima oleh Perseroan, dan pengganti dan/atau penambah dari Jaminan tersebut termasuk sebagai jaminan yang dinyatakan dalam Perjanjian ini dan karenanya harus tunduk dan mentaati semua ketentuan-ketentuan dan syarat-syarat dalam Perjanjian ini.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 5</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PEMBAYARAN KEMBALI OLEH DEBITUR</b></td>
						</tr>
						<br>
						<tr>
							<td width="7%" align="left">5.1.</td>
							<td width="93%" align="justify">Debitur wajib membayar kembali hutangnya (Pokok Hutang berikut Bunga) kepada Perseroan dalam Angsuran yang masing-masing besarnya sebagaimana tercantum dalam Struktur Perjanjian, yang harus dibayar tepat pada waktunya.</td>
						</tr>
						<tr>
							<td width="7%" align="left">5.2.</td>
							<td width="93%" align="justify">Untuk setiap kali keterlambatan membayar jumlah uang Angsuran yang seharusnya dibayar oleh Debitur kepada Perseroan, Debitur wajib membayar kepada Perseroan Denda Keterlambatan sebesar sebagaimana tercantum dalam Struktur Perjanjian, serta membayar biaya pengambilan uang Angsuran yang tertunggak dalam hal Perseroan terpaksa harus mengambil uang pembayaran tersebut    ke tempat Debitur. Denda dan biaya tersebut di atas dapat ditagih secara seketika dan sekaligus tanpa diperlukan teguran untuk itu oleh Perseroan kepada Debitur.</td>
						</tr>
						<tr>
							<td width="7%" align="left">5.3.</td>
							<td width="93%" align="justify">Apabila terjadi tindakan moneter oleh Pemerintah Republik Indonesia, maka Perseroan berhak menyesuaikan jumlah kewajiban pembayaran oleh Debitur kepada Perseroan sebagaimana akan diberitahukan secara tertulis kepada Debitur minimal 30 (tiga puluh) hari kerja sebelum pemberitahuan dimaksud berlaku efektif.</td>
						</tr>
						<tr>
							<td width="7%" align="left">5.4.</td>
							<td width="93%" align="justify">Kecuali ditentukan lain, semua pembayaran harus dilakukan kepada dan dikantor Perseroan sebagaimana tercantum dalam Struktur Perjanjian. Pembayaran dengan cek bilyet giro, transfer dan lainnya harus dibuat atas nama Perseroan dan baru dianggap sebagai pembayaran apabila dana telah diterima di rekening Perseroan. Apabila terdapat biaya yang timbul karena pembebanan oleh Bank, sehingga mengurangi jumlah pembayaran yang seharusnya diterima Perseroan, maka debitur wajib membayar secara seketika dan sekaligus lunas kekurangan Angsuran, beserta denda apabila terjadi keterlambatan pembayaran kekurangan Angsuran, setelah memperoleh konfirmasi mengenai hal tersebut dari Perseroan.</td>
						</tr>
						<tr>
							<td width="7%" align="left">5.5.</td>
							<td width="93%" align="justify">Dalam hal tanggal Pembayaran Kembali oleh Debitur setiap bulannya sebagaimana ditentukan didalam Struktur Perjanjian jatuh diluar hari kerja Perseroan dan/atau hari libur Nasional, maka pembayaran harus diterima dan/atau masuk ke Rekening Perseroan selambat-lambatnya sehari sebelum tanggal jatuh tempo sebagaimana ditentukan didalam Struktur Perjanjian. Apabila melampaui tanggal jatuh tempo tersebut, maka Debitur akan dibebankan Denda Keterlambatan sebagaimana ditentukan didalam Struktur Perjanjian.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 6</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PENGAKHIRAN LEBIH AWAL</b></td>
						</tr>
						<br>
						<tr>
							<td width="7%" align="left">6.1.</td>
							<td width="93%" align="justify">Debitur berhak untuk mengakhiri Perjanjian ini sebelum pembayaran  Angsuran terakhir.</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="8%" align="left">6.2.</td>
							<td width="92%" align="justify">Dalam hal Debitur hendak melakukan Pengakhiran Lebih Awal, maka Debitur harus memberitahukan kehendaknya kepada Perseroan setidak-tidaknya 30 (tiga puluh) hari sebelumnya dan membayar seluruh sisa kewajiban ditambah Denda Pengakhiran Lebih Awal yang besarnya tercantum dalam Struktur Perjanjian.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 7</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>JAMINAN</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">7.1.</td>
							<td width="92%" align="justify">Untuk menjamin pembayaran kembali dengan tertib dan secara sebagaimana mestinya seluruh kewajiban Debitur kepada Perseroan (Pokok Hutang, Bunga, Angsuran yang tertunggak, Denda serta biaya-biaya lain yang timbul karena Perjanjian ini), Debitur dan/atau Penjamin dengan ini menyerahkan Jaminan kepada Perseroan berupa Barang sebagaimana ditentukan dalam Struktur Perjanjian yang menurut pertimbangan Perseroan dianggap telah mencukupi.</td>
						</tr>
						<tr>
							<td width="8%" align="left">7.2.</td>
							<td width="92%" align="justify">Semua biaya dalam rangka penjaminan dimaksud, menjadi beban Debitur dan/atau Penjamin sepenuhnya.</td>
						</tr>
						<tr>
							<td width="8%" align="left">7.3.</td>
							<td width="92%" align="justify">Dalam rangka pemberian dan pelaksanaan jaminan, Debitur dan/atau Penjamin dengan ini menyatakan berjanji dan mengikat diri kepada Perseroan untuk menyerahkan asli bukti-bukti kepemilikan atas Jaminan. Dalam hal ini, Jaminan berupa kendaraan bermotor, maka asli BPKB / Faktur / NIK / Form A wajib diserahkan kepada Perseroan. Dalam hal Jaminan berupa tanah dan/atau bangunan, maka asli bukti kepemilikan atas tanah dan/atau bangunan berikut ini wajib diserahkan kepada Perseroan:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Asli Ijin Mendirikan Bangunan (IMB);</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Asli gambar-gambar bangunan <i>(blue print)</i>;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Asli pembayaran Pajak Bumi dan Bangunan (PBB);</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">d.</td>
							<td width="87%" align="justify">Asli <i>Sertipikat</i> Tanah yang sudah terdaftar atas nama Penjamin;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">e.</td>
							<td width="87%" align="justify">Asli <i>Covernote</i> dari Penyedia Barang dan/atau Jasa, dan/atau dari PPAT.</td>
						</tr>
						<tr>
							<td width="8%" align="left">7.4.</td>
							<td width="92%" align="justify">Berkenan dengan kewajiban dalam ayat 1 di atas, Penjamin dan Perseroan akan membuat dan menandatangani akta atau dokumen Jaminan yang diperlukan sesuai Jaminan yang diserahkan oleh Debitur.</td>
						</tr>
						<tr>
							<td width="8%" align="left">7.5.</td>
							<td width="92%" align="justify">Selama Perjanjian ini berlaku dan selama tidak terjadi Peristiwa Cidera Janji sebagaimana ditentukan dalam Pasal 12 Perjanjian ini, maka Penjamin dapat mempergunakan Jaminan atas biaya dan risiko serta tanggung jawab Penjamin namun hanya sebagai peminjam pakai semata <i>(bruiklenner)</i>.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 8</b></td>
						</tr>
						<tr>
							<td width="10%"></td>
							<td width="80%" align="center"><b>LARANGAN PENJUALAN, PENJAMINAN KEMBALI, PEMINDAHAN TEMPAT, PERUBAHAN SERTA PENGGUNAAN JAMINAN OLEH PIHAK LAIN</b></td>
							<td width="10%"></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Tanpa persetujuan tertulis terlebih dahulu dari Perseroan, Debitur dan/atau Penjamin tidak diperbolehkan:</td>
						</tr>
						<tr>
							<td width="8%" align="left">8.1.</td>
							<td width="92%" align="justify">Menjaminkan kembali, menjual, mengalihkan atau dengan cara apapun lainnya memindahkan hak kepemilikan atas jaminan, baik sebagian ataupun seluruhnya.</td>
						</tr>
						<tr>
							<td width="8%" align="left">8.2.</td>
							<td width="92%" align="justify">Memindahkan Jaminan dari tempat atau lokasi yang telah disepakati bersama oleh Perseroan dengan Debitur dan/atau Penjamin           ke lokasi lain, kecuali dalam keadaan memaksa, dengan ketentuan bahwa Debitur dan/atau Penjamin wajib dengan segera memberitahukan secara tertulis kepada Perseroan tempat atau lokasi Jaminan yang baru.</td>
						</tr>
						<tr>
							<td width="8%" align="left">8.3.</td>
							<td width="92%" align="justify">Mengadakan tambahan, pengurangan atau merubah bentuk, fungsi maupun mutu Jaminan, akan tetapi apabila terjadi hal demikian, maka setiap tambahan dan/atau penyempurnaan pada jaminan yang akan dilakukan dengan atau tanpa persetujuan Perseroan, menjadi atau termasuk bagian dari Jaminan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">8.4.</td>
							<td width="92%" align="justify">Menyewakan atau mengirimkan orang atau pihak lain mempergunakan Jaminan tersebut.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 9</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>TANGGUNG JAWAB TERHADAP JAMINAN</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">9.1.</td>
							<td width="92%" align="justify">Debitur dan/atau Penjamin atas biaya dan ongkosnya sendiri wajib dan taat serta patuh untuk:</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify" style="font-size: 7.2px">Melakukan pemeliharaan dan perawatan Jaminan secara baik dan teratur.</td>
						</tr>
					</tbody>
				</table>
			</td>
			<td width="2%"></td>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Melakukan perbaikan-perbaikan terhadap bagian yang rusak, hancur atau hilang dan setiap penggatian harus menggunakan suku cadang yang asli yang dianjurkan oleh pabrik pembuat Jaminan.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Perseroan atau kuasanya dapat untuk pada setiap waktu dipandang perlu, melakukan pemeriksaan terhadap keberadaan dan keadaan Jaminan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">9.2.</td>
							<td width="92%" align="justify">Debitur dan/atau Penjamin menjamin pemakaian atau penggunaan Jaminan dengan cara yang benar.</td>
						</tr>
						<tr>
							<td width="8%" align="left">9.3.</td>
							<td width="92%" align="justify">Debitur dan/atau Penjamin wajib dan mematuhi semua ketentuan perundangan dan/atau peraturan yang berlaku dan atas biayanya sendiri wajib membayar tepat pada waktunya biaya-biaya pendaftaran, ijin, pajak, pungutan dan/atau biaya lainnya yang diharuskan sehubungan dengan penguasaan, pemakaian dan/atau penyimpanan Jaminan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">9.4.</td>
							<td width="92%" align="justify">Bilamana terjadi kerusakan, kehilangan atau risisko pada Jaminan tersebut, maka Debitur dan/atau Penjamin harus segera melaporkannya kepada Perseroan selambat-lambatnya 1 X 24 jam.</td>
						</tr>
						<tr>
							<td width="8%" align="left">9.5.</td>
							<td width="92%" align="justify">Untuk perubahan fisik dan/atau mesin Jaminan harus dilakukan dengan izin tertulis terlebih dahulu dari Perseroan.</td>
						</tr>
						<br>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 10</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PENGALIHAN HAK DAN KEWAJIBAN DALAM PERJANJIAN INI</b></td>
						</tr>
						<br>
						
						<tr>
							<td width="8%" align="left">10.1.</td>
							<td width="92%" align="justify">Tanpa persetujuan tertulis terlebih dahulu dari Perseroan, Debitur dengan cara dan alasan apapun juga, tidak berhak mengalihkan atau memindahkan hak dan kewajibannya menurut Perjanjian ini, baik sebagian maupun seluruhnya kepada pihak manapun.</td>
						</tr>
						<tr>
							<td width="8%" align="left">10.2.</td>
							<td width="92%" align="justify">Sebaliknya, Perseroan tanpa memerlukan persetujuan Debitur, berhak mengalihkan atau memindahtangankan dengan cara apapun hak dan kewajibannya berdasarkan Perjanjian ini.</td>
						</tr>
						<br>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 11</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>ASURANSI</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">11.1.</td>
							<td width="92%" align="justify">Selama Perjanjian ini berlangsung, dalam hal ini Debitur dan/atau Penjamin mengasuransikan Jaminan dan/atau memperpanjang masa asuransi Jaminan (apabila ternyata masa asuransi pada penutupan sebelumnya akan atau telah berakhir) terhadap bahaya-bahaya yang dianggap perlu, begitu juga dalam hal Debitur mengasuransikan diri Debitur <i>(Life Insurance)</i>, maka Debitur dan/atau Penjamin wajib membayar dengan biayanya sendiri berupa premi asuransi serta biaya-biaya lain yang ditetapkan dan wajib dibayar kepada suatu Perusahaan Asuransi dengan jumlah pertanggungan minimal sebesar Pokok Hutang Debitur kepada Perseroan. Setiap dan semua polis asuransi asli diberikan kepada dan disimpan oleh Perseroan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">11.2.</td>
							<td width="92%" align="justify">Polis atau polis-polis asuransi memuat suatu klausula yang menyebutkan bahwa ganti rugi atau hasil klaim asuransi dibayarkan kepada Perseroan, dan Perseroan selaku penerima uang ganti rugi asuransi <i>(Loss Payee)</i> untuk diperhitungakan dengan jumlah-jumlah kewajiban Debitur kepada Perseroan. Apabila terdapat kelebihan, maka Perseroan dapat mengembalikan kelebihannya kepada Debitur dan/atau Penjamin. Dalam hal hasil uang pertanggungan tidak cukup untuk melunasi seluruh hutang Debitur, sisa hutang tersebut tetap menjadi hutang Debitur kepada Perseroan dan harus dibayar dengan seketika dan sekaligus oleh Debitur dan/atau Penjamin pada saat ditagih oleh Perseroan.</td>
						</tr>
						<tr>
							<td width="8%" align="left">11.3.</td>
							<td width="92%" align="justify">Apabila asuransi dilakukan secara “dibawah harga pertanggungan <i>(under insured)</i>” ataupun “diatas harga pertanggungan <i>(over insured)</i>”, maka Debitur dan/atau Penjamin sepenuhnya tunduk pada ketentuan-ketentuan tentang pemberian ganti rugi dan lain-lain yang berlaku dalam polis asuransi tersebut.</td>
						</tr>
						<tr>
							<td width="8%" align="left">11.4.</td>
							<td width="92%" align="justify">Dalam hal proses klaim asuransi atas jaminan yang mengalami kerusakan dan/atau hilang, sesuai jenis asuransi yang telah ditutup oleh Debitur dan/atau Penjamin masih dalam proses oleh Perusahaan Asuransi, Debitur dan/atau Penjamin tetap berkewajiban untuk melakukan pembayaran Angsuran secara tepat waktu. Dan jumlah-jumlah tersebut akan diperhitungkan pada saat pencairan dana hasil klaim dari Perusahaan Asuransi.</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="100%" align="center"><b>PASAL 12</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PERISTIWA CIDERA JANJI DAN PENYELESAIANNYA</b></td>
						</tr>
						<br>
						<br>
						<tr>
							<td width="8%" align="left">12.1.</td>
							<td width="92%" align="justify">Peristiwa-peristiwa di bawah ini merupakan kelalaian atau cidera janji terhadap Perjanjian ini oleh Debitur dan/atau Penjamin:</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Bilamana suatu Angsuran yang tertunggak, Pokok Hutang dan Bunga atau lain-lain jumlah yang terhutang berdasarkan Perjanjian ini tidak dibayar lunas pada waktunya dan dengan cara sebagaimana ditentukan dalam Perjanjian ini, dalam hal ini, lewatnya waktu saja telah menjadi bukti yang sah dan cukup bahwa Debitur telah melalaikan kewajibannya.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Bilamana Debitur dan/atau Penjamin telah lalai memenuhi syarat-syarat atau ketentuan-ketentuan lainnya dalam Perjanjian ini dan/atau terjadi kelalaian ataupun pelanggaran terhadap syarat-syarat dan ketentuan-ketentuannya yang termaktub dalam Perjanjian-perjanjian Jaminan yang dibuat berkenaan dengan Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Jika suatu pernyataan, surat keterangan atau dokumen yang diberikan Debitur dan/atau Penjamin sehubungan dengan Penjaminan ini ternyata palsu, tidak benar atau tidak sesuai dengan kenyataan sebenarnya dalam hal-hal yang dianggap penting oleh Perseroan.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">d.</td>
							<td width="87%" align="justify">Bilamana Debitur dan/atau Penjamin, bila ada, meninggal dunia atau ditaruh dibawah pengampuan (dalam hal Debitur dan/atau Penjamin adalah suatu badan).</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">e.</td>
							<td width="87%" align="justify">Bilamana Debitur dan/atau Penjamin, bila ada, mengajukan permohonan untuk dinyatakan pailit atau diberi penundaan pembayaran hutang <i>(surseance van betaling)</i> atau karena sebab apapun tidak berhak lagi mengurus dan menguasai kekayaannya atau dinyatakan pailit atau suatu permohonan atas tuntutan untuk kepailitan telah diajukan terhadap Debitur dan/atau Penjamin oleh instansi yang berwenang.</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">f.</td>
							<td width="87%" align="justify">Bilamana Jaminan atau barang-barang lain yang dijaminkan untuk pembayaran hutang Debitur kepada Perseroan berdasarkan Perjanjian ini disita oleh yang berwenang atau pihak lainnya;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">g.</td>
							<td width="87%" align="justify">Mengalihkan Jaminan kepada pihak lain, tanpa persetujuan tertulis dari Perseroan.</td>
						</tr>
						<br>
						<br>
						<tr>
							<td width="8%" align="left">12.2.</td>
							<td width="92%" align="justify">Apabila terjadi salah satu saja dari peristiwa-peristiwa cidera janji sebagaimana tersebut dalam ayat 1 di atas, sebagai penyelesaiaan di luar pengadilan, maka menyimpang dari ketentuan tentang jangka waktu Pembiayaan sebagaimana tercantum dalam Struktur Perjanjian, atau yang tercantum dalam jadwal lain yang dibuat secara khusus atau tersendiri, maka Para Pihak dengan ini menyatakan melepaskan ketentuan-ketentuan dalam pasal 1266 Kitab Undang-Undang Hukum Perdata Republik Indonesia, Perseroan adalah berhak untuk mengakhiri Perjanjian ini, dan:</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">a.</td>
							<td width="87%" align="justify">Seketika dan sekaligus menagih seluruh jumlah hutang Debitur kepada Perseroan yang timbul berdasarkan Perjanjian ini, baik yang sudah jatuh tempo maupun yang belum, demikian itu berikut Bunga, Denda serta semua biaya yang timbul berdasarkan Perjanjian ini, dan</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">b.</td>
							<td width="87%" align="justify">Debitur berjanji dan mengikatkan diri untuk menyerahkan secara sukarela Jaminan berikut seluruh perlengkapan dan peralatan pendukungnya tersebut kepada Perseroan, dan</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">c.</td>
							<td width="87%" align="justify">Jika karena suatu sebab penyerahan sukarela tidak dilaksanakan atau tidak dapat dilaksanakan, maka dimana perlu Perseroan meminta bantuan pihak yang berwajib, instansi pemerintah dan/atau pihak lain dalam pelaksanaan eksekusi Jaminan, dan</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">d.</td>
							<td width="87%" align="justify">Apabila ternyata Debitur tidak melakukan pembayaran dimaksud butir a di atas, maka dengan lewatnya waktu saja telah menjadi bukti yang sempurna atas kelalain Debitur dalam hal ini, maka Perseroan berhak untuk:</td>
						</tr>
						<tr>
							<td width="13%" align="left"></td>
							<td width="3%" align="left">-</td>
							<td width="84%" align="justify">Berdasarkan Sertipikat Jaminan Fidusia atau Sertipikat Hak Tanggungan meminta atau mengosongkan dan menjual Jaminan baik secara dimuka umum (lelang) atau dengan penjualan secara dibawah tangan, dan</td>
						</tr>
						<tr>
							<td width="13%" align="left"></td>
							<td width="3%" align="left">-</td>
							<td width="84%" align="justify">Meminta pelaksanaan Perjanjian Jaminan lainnya;</td>
						</tr>
						<tr>
							<td width="8%" align="left"></td>
							<td width="5%" align="left">e.</td>
							<td width="87%" align="justify">Kewajiban-kewajiban Perseroan untuk memberi Fasilitas lebih lanjut kepada Debitur segera berakhir.</td>
						</tr>
					</tbody>
				</table>
			</td>
			<td width="2%"></td>
			<td width="49%">
				<table width="100%" cellpadding="0.7">
					<tbody>
						<tr>
							<td width="8%" align="left">12.3.</td>
							<td width="92%" align="justify">Dalam hal Perseroan meminta Jaminan, maka Debitur dan/atau Penjamin wajib untuk menyerahkan Jaminan kepada Perseroan untuk dijual. Dalam hal Jaminan berupa tanah dan/atau bangunan maka Debitur dan/atau Penjamin wajib menyerahkan Jaminan dalam kondisi kosong kepada Perseroan.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 13</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>BIAYA-BIAYA</b></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Debitur menyetujui bahwa semua biaya mengenai Perjanjian ini, dan/atau perjanjian jaminan yang bertalian dengannya serta biaya lainnya yang timbul dari Perjanjian ini dan pelaksanaanya termasuk biaya pemeliharaan, premi asuransi, biaya pengambilan atau pengosongan Barang Jaminan, biaya penjualan, pertukaran, eksekusi, kompromi (dading) atau penyelesaian lain untuk Jaminan, biaya Notaris/PPAT, bea materai, serta segala ongkos yang timbul untuk menagih hutang dan pelaksanaan perjanjian-perjanjian jaminannya akan ditanggung dan dibayar oleh Debitur dan/atau Penjamin.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 14</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PENGGUNAAN UANG HASIL PELAKSANAAN JAMINAN</b></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Bilamana Perseroan menjalankan hak-hak dan hak istimewa yang timbul dari Perjanjian ini dan/atau perjanjian jaminan yang dibuat berkenaan dengan Perjanjian ini, maka semua hasil perolehan yang diterima oleh Perseroan dari pelaksanaan jaminan-jaminan yang diberikan akan diperhitungkan dengan semua hutang dan kewajiban Debitur kepada Perseroan akan mengembalikan kelebihannya tersebut kepada Debitur. Sebaliknya bilamana hasil penjualan tersebut ternyata cukup untuk melunasi seluruh hutang Debitur kepada Perseroan, maka kekurangan itu akan tetap menjadi tanggung jawab dan kewajiban Debitur untuk melunasinya.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 15</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PENGGUNAAN UANG PEMBAYARAN</b></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Setiap jumlah uang yang diterima oleh Perseroan berdasarkan Perjanjian ini atau berdasarkan setiap Perjanjian Jaminan yang berhubungan dengan Perjanjian ini akan dipergunakan untuk:</td>
						</tr>
						<tr>
							<td width="5%" align="left">a.</td>
							<td width="95%" align="justify">Pertama, untuk membayar semua biaya yang terhutang berdasarkan Perjanjian ini;</td>
						</tr>
						<tr>
							<td width="5%" align="left">b.</td>
							<td width="95%" align="justify">Kedua, untuk pembayaran premi asuransi yang tertunggak;</td>
						</tr>
						<tr>
							<td width="5%" align="left">c.</td>
							<td width="95%" align="justify">Ketiga, untuk pembayaran denda yang tertunggak;</td>
						</tr>
						<tr>
							<td width="5%" align="left">d.</td>
							<td width="95%" align="justify">Keempat, untuk pembayaran Bunga yang tertunggak;</td>
						</tr>
						<tr>
							<td width="5%" align="left">e.</td>
							<td width="95%" align="justify">Kelima, untuk pembayaran Pokok Hutang.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 16</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b><i>CROSS DEFAULT</i> DAN <i>CROSS COLLATERAL</i></b></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Apabila Debitur juga memiliki perjanjian-perjanjian fasilitas lainnya pada Perseroan, selain daripada Perjanjian ini, maka:</td>
						</tr>
						<tr>
							<td width="8%" align="left">16.1.</td>
							<td width="92%" align="justify">Jika terjadi peristiwa Cidera Janji oleh Debitur terhadap Perjanjian ini, harus diartikan juga terjadi adanya peristiwa Cidera Janji oleh Debitur terhadap perjanjian (-perjanjian) / fasilitas lainnya yang dibuat oleh Debitur dan Perseroan, demikian pula sebaliknya <i>(Cross Default)</i>;</td>
						</tr>
						<tr>
							<td width="8%" align="left">16.2.</td>
							<td width="92%" align="justify">Jika untuk kepentingan Perjanjian ini oleh Debitur telah diberikan jaminan-jaminan kepada Perseroan, maka jaminan-jaminan tersebut harus berlaku juga terhadap perjanjian-perjanjian fasilitas lainnya yang dibuat oleh Debitur dan Perseroan, demikian pula sebaliknya <i>(Cross Collateral)</i>.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Sehingga demikian selama seluruh kewajiban Debitur berdasarkan Perjanjian ini dan perjanjian (-perjanjian) / fasilitas lainnya belum dilunasi kepada Perseroan, maka seluruh jaminan tersebut, sekalipun telah lunas dan/atau telah berakhir jangka waktu fasilitasnya, akan menjadi jaminan pelunasan hutang untuk perjanjian (-perjanjian) / fasilitas yang belum dilunasi tersebut.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 17</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>MEKANISME PENYELESAIAN PERSELISIHAN</b></td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="justify">Apabila terjadi perselisihan antara Debitur dengan Perseroan selama Perjanjian ini berlangsung, maka:</td>
						</tr>
						<tr>
							<td width="8%" align="left">17.1.</td>
							<td width="92%" align="justify">Sebagai penyelesaian perselisihan akan dilakukan mediasi sekurang-kurangnya dalam 3 (hari) kerja sejak terjadinya pelaporan kejadian atau perselisihan oleh Debitur.</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="8%" align="left">17.2.</td>
							<td width="92%" align="justify">Proses mediasi ini akan dilaksanakan di kantor Perseroan sesuai yang telah disepakati oleh kedua pihak.</td>
						</tr>
						<tr>
							<td width="8%" align="left">17.3.</td>
							<td width="92%" align="justify">Apabila setelah proses mediasi perselisihan antara kedua belah pihak tidak dapat terselesaikan maka dalam pelaksanaannya Debitur dan Perseroan setuju untuk memilih menyelesaikan perselisihan di Kantor Kepaniteraan Pengadilan Negeri Jakarta Selatan, namun tidak mengurangi hak dan wewenang pihak yang satu untuk memohon pelaksanaan (eksekusi) atau mengajukan tuntutan / gugatan hukum terhadap pihak lainnya berdasarkan Perjanjian ini dimuka pengadilan lain dalam Wilayah Republik Indonesia.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 18</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>PEMBERITAHUAN</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">18.1.</td>
							<td width="92%" align="justify">Semua surat menyurat atau pemberitahuan-pemberitahuan yang harus dikirim oleh masing-masing pihak kepada pihak lainnya dalam Perjanjian ini dan Perjanjian Jaminan dilakukan dengan secara langsung, surat tercatat, faksimil, email atau telex atau diserahkan atau melalui perusahaan ekspedisi (kurir) ke alamat-alamat sebagaimana tersebut dalam Perjanjian ini.</td>
						</tr>
						<tr>
							<td width="8%" align="left">18.2.</td>
							<td width="92%" align="justify">Surat menyurat atau pemberitahuan-pemberitahuan dianggap telah diterima oleh pihak yang dituju: (i) pada tanggal tanda terima ditandatangani oleh Debitur atau Perseroan atau wakil (-wakil) dari Debitur atau Perseroan, apabila disampaikan secara langsung atau melaui jasa kurir; (ii) pada tanggal setelah 5 (lima) hari kerja sejak diposkannya apabila dikirim dengan surat tercatat atau sejak diserahkan kepada perusahaan ekspedisi (kurir) dan cukup bila ditandatangani oleh Debitur atau Perseroan atau wakil (-wakil) dari Debitur atau Perseroan; (iii) pada hari dikirimkannya apabila dikirim melalui telex yang dikonfirmasi dengan kode jawab; (iv) pada hari dikirimkannya apabila dikirim melalui faksimil yang dikonfirmasi dengan tanda telah dikirim; dan (v) pada hari dikirimkannya apabila dikirim melalui email.</td>
						</tr>
						<tr>
							<td width="8%" align="left">18.3.</td>
							<td width="92%" align="justify">Dalam hal terjadi perubahan alamat dari alamat tersebut di atas atau alamat terakhir yang tercatat pada masing-masing pihak, maka perubahan tersebut harus diberitahukan secara tertulis kepada pihak lain dalam Perjanjian ini selambat-lambatnya 5 (lima) hari kerja sebelum terjadinya perubahan alamat dimaksud. Jika perubahan alamat tersebut tidak diberitahukan, maka        surat-menyurat atau pemberitahuan-pemberitahuan berdasarkan Perjanjian ini dianggap telah diberikan sebagaimana mestinya dengan dikirimnya surat atau pemberitahuan itu dengan secara langsung, surat tercatat, faksimil atau telex atau diserahkan melalui perusahaan ekspedisi (kurir) yang ditunjukan ke alamat tersebut di atas atau alamat terakhir yang diketahui atau tercatat pada masing-masing pihak.</td>
						</tr>
						<br>
						<tr>
							<td width="100%" align="center"><b>PASAL 19</b></td>
						</tr>
						<tr>
							<td width="100%" align="center"><b>LAIN-LAIN</b></td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.1.</td>
							<td width="92%" align="justify">Apabila Jangka Waktu Pembiayaan ini telah berakhir sebagaimana tercantum didalam Struktur Perjanjian atau  berdasarkan  ketentuan</td>
						</tr>
						<br>
					</tbody>
				</table>
			</td>
			<td width="2%"></td>
			<td width="49%">
				<table width="100%" cellpadding="1">
					<tbody>
						<tr>
							<td width="8%" align="left"></td>
							<td width="92%" align="justify">yang tercantum dalam Pasal 12.2 sub. a, Debitur wajib melunasi seluruh jumlah hutangnya kepada Perseroan, baik berupa Pokok Hutang, Bunga, Angsuran yang tertunggak, Denda dan biaya-biaya yang terhutang berdasarkan Perjanjian ini (jika ada), dan Debitur wajib untuk mengambil dokumen-dokumen kepemilikan atas Barang di kantor Perseroan selambat-lambatnya dalam waktu 1 (satu) bulan sejak tanggal pelunasan oleh Debitur. Apabila Debitur tidak mengambil dokumen-dokumen kepemilikan dimaksud, maka Debitur dibebankan biaya administrasi penitipan sebesar Rp. 100.000,- (seratus ribu rupiah) setiap bulannya, yang terhitung dari sejak Debitur melalaikan kewajiban mengambil dokumen-dokumen kepemilikan tersebut di atas.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.2.</td>
							<td width="92%" align="justify">Bilamana Debitur meninggal dunia, maka seluruh hutang dan kewajiban Debitur yang timbul berdasarkan Perjanjian ini merupakan hutang dan kewajiban (Para) ahli waris dari Debitur.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.3.</td>
							<td width="92%" align="justify">Setiap lampiran, surat, dokumen apapun adendum dari Perjanjian ini, merupakan satu kesatuan yang tidak terpisahkan dari Perjanjian ini dan oleh karenanya mengikat Perseroan dan Debitur.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.4.</td>
							<td width="92%" align="justify">Debitur telah membaca dan memahami seluruh ketentuan yang ada dalam Perjanjian ini, serta Debitur memperoleh informasi yang jelas dan benar tentang fasilitas yang diberikan oleh Perseroan kepada Debitur. Oleh karena itu Debitur dengan ini menyatakan tunduk kepada Perjanjian ini beserta lampirannya.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.5.</td>
							<td width="92%" align="justify">Perjanjian ini telah disesuaikan dengan ketentuan peraturan perundang-undangan termasuk ketentuan Peraturan Otoritas Jasa Keuangan.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.6.</td>
							<td width="92%" align="justify">Jika ada salah satu ketentuan dalam Perjanjian ini yang oleh karena suatu ketetapan pemerintah atau pengadilan dilarang atau tidak dapat dilaksanakan atau menjadi tidak berlaku atau dinyatakan batal demi hukum, hal tersebut tidak mempengaruhi keabsahan ketentuan lainnya dalam perjanjian ini, dan  ketentuan-ketentuan lainnya tersebut tetap berlaku dan mengikat serta dapat dilaksanakan sebagaimana ditentukan dalam Perjanjian ini, dalam hal ini Debitur dan Perseroan setuju untuk membuat dan menandatangani dokumen yang berisikan ketentuan pengganti atas ketentuan yang dilarang atau tidak dapat dilaksanakan tersebut.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.7.</td>
							<td width="92%" align="justify">Terhadap Perjanjian ini dan segala dokumen yang berhubungan dan yang timbul akibat Perjanjian ini dan Perjanjian Jaminan, tunduk pada hukum negara Republik Indonesia.</td>
						</tr>
						<br>
						<tr>
							<td width="8%" align="left">19.8.</td>
							<td width="92%" align="justify">Kecuali ditetapkan lain dalam Perjanjian ini maka kedua belah pihak memilih tempat kedudukan hukum yang tetap dan seumumnya di Kantor Kepaniteraan Pengadilan Negeri Jakarta Selatan, namun tidak mengurangi hak dan wewenang pihak yang satu untuk memohon pelaksanaan (eksekusi) atau mengajukan tuntutan / gugatan hukum terhadap pihak lainnya berdasarkan Perjanjian ini dimuka pengadilan lain dalam Wilayah Republik Indonesia.</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Demikian Perjanjian ini dibuat dan ditandatangani pada hari dan tanggal tersebut dibawah ini, dibuat dalam rangkap 2 (dua) yang mempunyai kekuatan hukum yang sama untuk Perseroan dan Debitur.</td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="50%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
			<td width="50%"></td>
		</tr>	
		<tr>
			<td width="35%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
			<td width="35%" align="left">DEBITUR,</td>
			<td width="30%" align="left">
				<?php 
					if ($detail->fs_status_konsumen == 'K') {
						if ($detail->fs_jenis_kelamin_konsumen == 'L') {
							echo 'ISTRI,';
						} else {
							echo 'SUAMI,';
						}
					} else {
						echo 'PENJAMIN,';
					}
				?>
			</td>
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
			<td width="25%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>	
			</td>
			<td width="10%"></td>
			<td width="25%" align="left" style="border-top: 1px solid black;">
				<?php
					if ($detail->fs_jenis_pembiayaan == 'P' || $detail->fs_jenis_pembiayaan == 'W') {
						echo $detail->fs_nama_konsumen;
					} else {
						echo $detail->fs_penanggungjawab_perusahaan;
					}
				?>
			</td>
			<td width="10%"></td>
			<td width="25%" align="left" style="border-top: 1px solid black;">
				<?php 
					if ($detail->fs_status_konsumen == 'K') {
						echo $detail->fs_nama_pasangan;
					} else {
						echo $detail->fs_nama_penjamin;
					}
				?>
			</td>
		</tr>
	</tbody>
</table>
<?php endfor; ?>