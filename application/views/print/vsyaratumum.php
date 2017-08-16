<?php for($i = 1; $i <= 2; $i++) : ?>
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
			<td width="25%"></td>
			<td width="50%" align="center"><b>SYARAT-SYARAT UMUM<br>PEMBIAYAAN KEPEMILIKAN KENDARAAN BERMOTOR</b></td>
			<td width="25%"></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="justify">Sehubungan dengan permohonan pembiayaan kendaraan bermotor yang telah saya ajukan, maka dengan ini terlebih dahulu saya menyatakan dapat menerima ketentuan-ketentuan di bawah ini:</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>KENDARAAN</b></td>
		</tr>
		<tr>
			<td width="100%" align="justify">Pemilik kendaraan baik jenis, warna, kondisi, surat-surat dan kualitas kendaraan harus diteliti secara seksama oleh Konsumen, dimana apabila terjadi keluhan atas kendaraan dikemudian hari tidak menyebabkan kewajiban membayar agsuran terhenti atau tidak tertunda.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>PEMBAYARAN ANGSURAN</b></td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="2%" align="left">1.</td>
			<td width="95%" align="justify">Tanpa pemberitahuan lain tanggal jatuh tempo kewajiban angsuran sesuai tanggal penerimaan kendaraan oleh Konsumen, hal ini berlaku walaupun Surat Tanda Nomor Kendaraan (STNK) belum diterima Konsumen. Apabila tanggal jatuh tempo bertepatan dengan hari libur (Minggu atau Libur Nasional), maka untuk menghindari denda keterlambatan, Konsumen diharapkan membayar angsuran lebih awal yaitu pada hari kerja terakhir sebelum hari libur.</td>
		</tr>
		<tr>
			<td width="3%"></td>
			<td width="2%" align="left">2.</td>
			<td width="95%" align="justify">Pelaksanaan kewajiban angsuran akan dilakukan oleh Konsumen, melalui:</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">a.</td>
			<td width="93%" align="justify">Pembayaran langsung di Kantor Mandiri Finance, sesuai tempat perjanjian pembiayaan;</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">b.</td>
			<td width="93%" align="justify">Transfer langsung ke rekening atas nama <b>PT. MANDIRI FINANCE INDONESIA</b>, pada bank:</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">-</td>
			<td width="90%" align="left"><?php echo $cabang->fs_nama_bank_angsuran; ?>, a/c: <?php echo $cabang->fs_rekening_bank_angsuran; ?></td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">-</td>
			<td width="90%" align="left">BCA Cabang Sunter Danau, Jakarta, a/c: 419-3025890</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">c.</td>
			<td width="93%" align="left">Pembayaran melalui Virtual Account melalui:</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">-</td>
			<td width="90%" align="left">Bank Permata, a/c: 8863 xxxxxxxxxxxx</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">-</td>
			<td width="90%" align="left">Bank Mandiri, a/c: 8810 xxxxxxxxxxxx</td>
		</tr>
		<tr>
			<td width="8%"></td>
			<td width="2%" align="left">-</td>
			<td width="90%" align="left">Pegadaian, a/c: 8863 xxxxxxxxxxxx</td>
		</tr>
		<tr>
			<td width="5%"></td>
			<td width="2%" align="left">d.</td>
			<td width="93%" align="left">Pembayaran dijemput ke tempat Konsumen, akan dikenakan biaya sebesar Rp. 50.000,- untuk kendaraan roda empat atau lebih dan Rp. 25.000,- untuk kendaraan roda dua.</td>
		</tr>
		<br>
		<tr>
			<td width="5%"></td>
			<td width="95%" align="left"><i>(pilih salah satu secara pasti)</i></td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>ASURANSI</b></td>
		</tr>
		<tr>
			<td width="100%" align="left">
				<ol>
					<li style="text-align: justify;">Setiap kendaraan yang dibiayai harus diasuransikan dengan kondisi penutupan asuransi <b>TLO <i>(Total Loss Only)</i></b> atau <b>All Risk Comprehensive / Gabungan</b>.</li>
					<li style="text-align: justify;">Bilamana kendaraan mengalami kecelakaan atau kehilangan, Konsumen WAJIB segera melapor kepada Mandiri Finance dalam waktu 1x24 jam dan tidak melakukan perbaikan atas kerusakan yang terjadi akibat kecelakaan, sebelum mendapat rekomendasi dari Perusahaan Asuransi yang ditunjuk.</li>
					<li style="text-align: justify;">Apabila penutupan yang dipilih adalah TLO, jika terjadi klaim kecelakaan dengan nilai kerugian dibawah 75% menurut penilaian perusahaan asuransi, maka tidak ada penggantian kerugian.</li>
					<li style="text-align: justify;">Apabila terjadi klaim asuransi kehilangan, penggantian asuransi bukan berupa penggantian kendaraan baru, melainkan berupa uang tunai dan akan dialokasikan / digunakan untuk menutup sisa hutang konsumen Mandiri Finance. Apabila ada sisanya, akan dikembalikan kepada konsumen dan sebaliknya apabila hasil klaim asuransi tersebut tidak mencukupi, maka Mandiri Finance akan menagih kekurangannya.</li>
					<li style="text-align: justify;">Selama proses klaim asuransi berlangsung. Konsumen tetap wajib melakukan pembayaran angsuran sesuai tanggal jatuh tempo dan setiap keterlambatan pembayaran akan dibebankan denda keterlambatan.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>PENGURUSAN PERPANJANGAN STNK DAN BALIK NAMA BPKB</b></td>
		</tr>
		<tr>
			<td width="100%" align="left">Pengurusan perpanjangan STNK dan Balik Nama BPKB dapat dilakukan dengan 2 cara, yaitu:</td>
		</tr>
		<tr>
			<td width="100%" align="left">
				<ol>
					<li style="text-align: justify;">Mandiri Finance menerbitkan surat keterangan perpanjangan STNK untuk Polda dan dikenakan biaya administrasi sesuai dengan ketentuan yang berlaku.</li>
					<li style="text-align: justify;">Pengurusan BBN dilakukan melalui biro jasa yang ditunjuk Mandiri Finance dengan syarat membayar uang muka biaya pengurusan BBN STNK minimal senilai pajak yang tercantum pada STNK terakhir.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>PELUNASAN DIPERCEPAT</b></td>
		</tr>
		<tr>
			<td width="100%" align="left">
				<ol>
					<li style="text-align: justify;">Pelunasan dipercepat dapat dilakukan dengan pemberitahuan 2 (dua) hari dimuka, dan dana pelunasan paling lambat telah efektif pada rekening Mandiri Finance 1 (satu) hari sebelum pelunasan dilakukan</li>
					<li style="text-align: justify;">Asuransi yang telah ditutup adalah mengikat kepada unit kendaraan, sehingga bila hutang telah dilunasi atau unit dijual, maka seluruh biaya termasuk premi asuransi yang telah dibayar tidak dapat dikembalikan atau dibatalkan.</li>
					<li style="text-align: justify;">BPKB dapat diambil dalam waktu 7 (tujuh) hari setelah tanggal pelunasan.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>TUNGGAKAN DAN PENYELESAIAN</b></td>
		</tr>
		<tr>
			<td width="100%" align="left">
				<ol>
					<li style="text-align: justify;">Terhadap tunggakan angsuran akan dikenakan denda 0,5‰ per hari dihitung dari angsuran tertunggak.</li>
					<li style="text-align: justify;">Dalam hal angsuran tertunggal lebih dari 30 (tiga puluh) hari, Mandiri Finance berhak melakukan tindakan pengamanan terhadap kendaraan dengan menjalankan surat kuasa penarikan, dan seluruh biaya yang timbul akan menjadi tanggungan konsumen. Besarnya biaya akan ditentukan oleh Mandiri Finance berdasarkan kondisi saat penarikan dilakukan.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><b>WANPRESTASI / CIDERA JANJI</b></td>
		</tr>
		<tr>
			<td width="100%" align="left">Konsumen dinyatakan Wanprestasi / Cidera Janji oleh Mandiri Finance, apabila:</td>
		</tr>
		<tr>
			<td width="100%" align="left">
				<ol>
					<li style="text-align: justify;">Konsumen tidak membayar angsuran dengan jumlah (besarnya uang angsuran) dan waktu (tanggal jatuh tempo) yang telah ditentukan;</li>
					<li style="text-align: justify;">Konsumen tidak mematuhi / melanggar ketentuan yang tercantum didalam perjanjian,</li>
					<li style="text-align: justify;">Konsumen memberikan keterangan dan/atau data palsu / tidak sesuai dengan kenyataan;</li>
					<li style="text-align: justify;">Konsumen / Penjamin meninggal, dibawah pengampunan, dilikuidasi, dinyatakan pailit atau dinyatakan tidak mampu mengurus harta kekayaannya (berada dibawah kuratele / pengawasan), atau harta kekayaan Konsumen / Penjamin disita oleh pihak yang berwajib / pihak ketiga,</li>
					<li style="text-align: justify;">Konsumen menjaminkan, menjual, mengalihkan atau dengan cara apapun lainnya memindahkan fisik maupun hak kepemilikan atas kendaraan yang dibiayai kepada pihak lain tanpa persetujuan tertulis dari Mandiri Finance baik sebagian atau seluruhnya;</li>
					<li style="text-align: justify;">Kendaraan yang dibiayai sebagaimana tercantum dalam Perjanjian disita oleh pihak yang berwenang atau pihak lainnya.</li>
				</ol>
			</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left">Dengan menandatangani surat ini, saya menyatakan setuju dan mengikatkan diri kepada ketentuan-ketentuan yang telah disebutkan di atas.</td>
		</tr>
		<br>
		<tr>
			<td width="100%" align="left"><?php echo $cabang->fs_kota_cabang; ?>, <?php echo tanggal_indo($detail->fd_tanggal_perjanjian); ?></td>
		</tr>
		<tr>
			<td width="40%" align="left">PT. MANDIRI FINANCE INDONESIA</td>
			<td width="30%" align="left">KONSUMEN,</td>
			<td width="25%" align="left"></td>
		</tr>
		<br>
		<tr>
			<td width="100%"></td>
		</tr>
		<tr>
			<td width="70%"></td>
			<td width="30%">
				<table width="100%" align="center" border="1">
					<tbody>
						<tr>
							<td width="100%">
								<span style="font-size: 7px"><b>PERHATIAN</b></span>
								<br>
								<span style="font-size: 6px">
								SURVEYOR TIDAK DIPERKENANKAN MENERIMA 
								UANG TUNAI PERIHAL APAPUN DARI KONSUMEN</span>
							</td>
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
			<td width="25%" align="left" style="border-top: 1px solid black;">
				<?php if (!empty($nama->fs_nama_ca)) {
						echo $nama->fs_nama_ca;
					} else {
						echo $cabang->fs_nama_pimpinan;
					}
				?>
			</td>
			<td width="15%"></td>
			<td width="25%" align="left" style="border-top: 1px solid black;"><?php echo $detail->fs_nama_konsumen; ?></td>
			<td width="25%"></td>
		</tr>
		<br>
		<tr>
			<td width="55%" align="left"></td>
			<td width="5%" align="left"><img src="assets/img/ojk.png" width="38" align="middle"/></td>
			<td width="40%" align="right"><p style="font-size: 7px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
		</tr>
	</tbody>
</table>
<?php endfor; ?>