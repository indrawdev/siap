<?php

class Maging extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	

	function ambilDataDealer($tgl1,$tgl2,$kodsup,$nomsup)
	{

		$xSQL = ("
			SELECT d.fs_nama_dealer,b.kodelk,b.nomdel,b.polpen,b.jenpiu,b.nompjb,b.nampem,a.lamovd,a.outgrs,a.outnet,a.ovdgrs,a.ovdnet  FROM tx_arpjb b LEFT JOIN tm_dealer d on d.fs_kode_dealer1=b.kodsup and d.fs_kode_dealer2=b.nomsup LEFT JOIN tx_arovdd a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk AND a.nomdel=b.nomdel AND a.polpen=b.polpen AND a.jenpiu=b.jenpiu   WHERE b.tglstj >= '".trim($tgl1)."'
				AND	b.tglstj <= '".trim($tgl2)."' AND b.kodsup='".$kodsup."' and b.nomsup='".$nomsup."'");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}


	function ambilDataSurveyor($tgl1,$tgl2,$ptgsvy,$kodelk)
	{

		$xSQL = ("
			SELECT b.kodelk,b.nomdel,b.polpen,b.jenpiu,b.nompjb,b.nampem,a.lamovd,a.outgrs,a.outnet,a.ovdgrs,a.ovdnet  FROM tx_arpjb b LEFT JOIN tx_arovdd a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk AND a.nomdel=b.nomdel AND a.polpen=b.polpen AND a.jenpiu=b.jenpiu LEFT JOIN tx_arapk d ON b.nompjb=d.nompjb AND b.kodelk=d.kodelk AND b.nomdel=d.nomdel AND b.polpen=d.polpen AND b.jenpiu=d.jenpiu WHERE b.tglstj >= '".trim($tgl1)."'
				AND	b.tglstj <= '".trim($tgl2)."' AND b.kodelk='".$kodelk."' and d.ptgsvy='".$ptgsvy."'");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL->result();
	}

	function CekKodeJadwal($xKdJadwal)
	{
		$xSQL = ("
			SELECT	fs_kd_jadwal
			FROM	tm_jadwal
			WHERE	fs_kd_jadwal = '".trim($xKdJadwal)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKodeRuteJadwal($xKdRute)
	{
		$xSQL = ("
			SELECT	fs_kd_jadwal
			FROM	tm_jadwal
			WHERE	fs_kd_rute = '".trim($xKdRute)."'
				AND	fb_aktif = '1'
			ORDER BY fs_kd_jadwal DESC LIMIT 1
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ambilReport($tgl1,$tgl2,$kode_cabang)
	{

		if ($kode_cabang <> '')
		{

			$xSQL = ("
			SELECT b.kodsup,b.nomsup,d.fs_nama_dealer,COUNT(b.recoid) as penjualan,b.kodelk,b.nomdel,b.polpen,b.jenpiu,b.nompjb  FROM tx_arpjb b LEFT JOIN tm_dealer d on d.fs_kode_dealer1=b.kodsup and d.fs_kode_dealer2=b.nomsup  WHERE b.tglstj BETWEEN '".trim($tgl1)."'
				AND	'".trim($tgl2)."' AND b.kodelk='".$kode_cabang."'  GROUP BY CONCAT(b.kodsup,'',b.nomsup)");

		}else {

			$xSQL = ("
			SELECT b.kodsup,b.nomsup,d.fs_nama_dealer,COUNT(b.recoid) as penjualan,b.kodelk,b.nomdel,b.polpen,b.jenpiu,b.nompjb FROM tx_arpjb b LEFT JOIN tm_dealer d on d.fs_kode_dealer1=b.kodsup and d.fs_kode_dealer2=b.nomsup WHERE b.tglstj BETWEEN '".trim($tgl1)."'
				AND '".trim($tgl2)."' GROUP BY CONCAT(b.kodsup,' ',b.nomsup)");


		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function ambilReports($tgl1,$tgl2,$kode_cabang)
	{

		if ($kode_cabang <> 0)
		{

			$xSQL = ("
			SELECT b.kodsup,b.nomsup,d.fs_nama_dealer,COUNT(b.recoid) as penjualan,b.kodelk,b.nomdel,b.polpen,b.jenpiu,b.nompjb,b.nampem,a.lamovd,a.outgrs,a.outnet,a.ovdgrs,a.ovdnet  FROM tx_arpjb b LEFT JOIN tm_dealer d on d.fs_kode_dealer1=b.kodsup and d.fs_kode_dealer2=b.nomsup LEFT JOIN tx_arovdd a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk AND a.nomdel=b.nomdel AND a.polpen=b.polpen AND a.jenpiu=b.jenpiu AND  b.tglstj >= '".trim($tgl1)."'
				AND	b.tglstj <= '".trim($tgl2)."' AND b.kodelk='".$kode_cabang."'  GROUP BY CONCAT(b.kodsup,'',b.nomsup)");

		}else {

			$xSQL = ("
			SELECT b.kodsup,b.nomsup,d.fs_nama_dealer,COUNT(b.recoid) as penjualan,b.kodelk,b.nomdel,b.polpen,b.jenpiu,b.nompjb,b.nampem,a.lamovd,a.outgrs,a.outnet,a.ovdgrs,a.ovdnet FROM tx_arpjb b LEFT JOIN tm_dealer d on d.fs_kode_dealer1=b.kodsup and d.fs_kode_dealer2=b.nomsup LEFT JOIN tx_arovdd a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk AND a.nomdel=b.nomdel AND a.polpen=b.polpen AND a.jenpiu=b.jenpiu AND  b.tglstj >= '".trim($tgl1)."'
				AND	b.tglstj <= '".trim($tgl2)."' GROUP BY CONCAT(b.kodsup,' ',b.nomsup)");


		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function ambilReportSvy($tgl1,$tgl2,$kode_cabang)
	{

		if ($kode_cabang <> '')
		{

			$xSQL = ("
			SELECT b.ptgsvy,COUNT(b.recoid) as unit,a.kodelk,a.nomdel,a.polpen,a.jenpiu,b.nompjb  FROM tx_arapk b LEFT JOIN tx_arpjb a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk WHERE a.tglstj BETWEEN '".trim($tgl1)."'
				AND '".trim($tgl2)."' AND a.kodekr='".$kode_cabang."' GROUP BY b.ptgsvy");

		}else {

			$xSQL = ("
			SELECT b.ptgsvy,COUNT(b.recoid) as unit,a.kodelk,a.nomdel,a.polpen,a.jenpiu,a.nompjb  FROM tx_arapk b LEFT JOIN tx_arpjb a ON a.nompjb=b.nompjb AND a.kodelk=b.kodelk WHERE a.tglstj BETWEEN '".trim($tgl1)."'
				AND '".trim($tgl2)."'GROUP BY b.ptgsvy");


		}

		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}


	function ambilReportCount($tgl1,$tgl2,$kode_cabang)
	{

		if ($kode_cabang <> '')
		{

			$xSQL = ("
			SELECT	count(a.nompjb) as nompjb
			FROM	tx_arapk a
			LEFT JOIN tx_arpjb b ON a.nompjb = b.nompjb AND a.kodelk = b.kodelk AND a.nomdel = b.nomdel  AND a.jenpiu = b.jenpiu  AND a.polpen = b.polpen
			LEFT JOIN tx_arovdd c ON a.nompjb = c.nompjb AND a.kodelk = c.kodelk AND a.nomdel = c.nomdel  AND a.jenpiu = c.jenpiu  AND a.polpen = c.polpen
			WHERE b.tglstj >= '".trim($tgl1)."'
				AND	b.tglstj <= '".trim($tgl2)."' AND a.kodelk='".$kode_cabang."'");

		}else {

			$xSQL = ("
			SELECT	count(a.nompjb) as nompjb
			FROM	tx_arapk a
			LEFT JOIN tx_arpjb b ON a.nompjb = b.nompjb AND a.kodelk = b.kodelk AND a.nomdel = b.nomdel  AND a.jenpiu = b.jenpiu  AND a.polpen = b.polpen
			LEFT JOIN tx_arovdd c ON a.nompjb = c.nompjb AND a.kodelk = c.kodelk AND a.nomdel = c.nomdel  AND a.jenpiu = c.jenpiu  AND a.polpen = c.polpen
			WHERE b.tglstj >= '".trim($tgl1)."'
				AND	b.tglstj <= '".trim($tgl2)."'");


		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function GridJam($xKdJadwal,$xTgl)
	{
		$xSQL = ("
			SELECT	a.fs_kd_kota, IFNULL(b.fs_nm_variabel, '') fs_nm_kota,
					a.fs_kd_pelabuhan, IFNULL(c.fs_nm_variabel, '') fs_nm_pelabuhan,
					a.fs_jam_jadwal, a.fn_jarak, a.fn_durasi,
					CASE a.fn_urut WHEN (SELECT MAX(h.fn_urut) FROM tm_jadwal2 h WHERE h.fs_kd_jadwal = '".trim($xKdJadwal)."') THEN '00:00'
					ELSE DATE_FORMAT(DATE_ADD(CONCAT('".$xTgl." ', a.fs_jam_jadwal), INTERVAL (a.fn_durasi * 60) MINUTE),'%h:%i') END fs_jam_datang
			FROM 	tm_jadwal2 a
			LEFT JOIN tm_variabel b ON a.fs_kd_kota = b.fs_kd_variabel
				AND	b.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel c ON a.fs_kd_pelabuhan = c.fs_kd_variabel
				AND	c.fs_kd_tipe = '08'
			WHERE	a.fs_kd_jadwal = '".trim($xKdJadwal)."'
			ORDER BY LENGTH(a.fn_urut), a.fn_urut
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function GridArmada($xKdJadwal,$xTgl,$xTgl2)
	{
		$xSQL = ("
			SELECT	a.fd_tgl_jadwal, DATE_FORMAT(a.fd_tgl_jadwal,'%d-%m-%Y') fd_tgl_tampil,
					a.fn_urut, a.fs_jam_jadwal,
					IFNULL(f.fs_nm_variabel, '') fs_nm_kelas, IFNULL(c.fn_kapasitas, 0) fn_kapasitas,
					a.fs_kd_armada, IFNULL(d.fs_nm_lambung, '') fs_nm_armada,
					a.fs_kd_dermaga, IFNULL(e.fs_nm_variabel, '') fs_nm_dermaga
			FROM 	tm_jadwal3 a
			INNER JOIN tm_jadwal2 b ON a.fs_kd_jadwal = b.fs_kd_jadwal
				AND	a.fn_urut = b.fn_urut
				AND	a.fs_jam_jadwal = b.fs_jam_jadwal
			LEFT JOIN tm_jadwal4 c ON a.fs_kd_jadwal = c.fs_kd_jadwal
				AND	a.fd_tgl_jadwal = c.fd_tgl_jadwal
				AND	a.fn_urut = c.fn_urut
				AND	a.fs_jam_jadwal = c.fs_jam_jadwal
				AND	a.fs_kd_armada = c.fs_kd_armada
			LEFT JOIN tm_armada d ON a.fs_kd_armada = d.fs_kd_armada
			LEFT JOIN tm_variabel e ON a.fs_kd_dermaga = e.fs_kd_variabel
				AND	e.fs_kd_tipe = '07'
			LEFT JOIN tm_variabel f ON c.fs_kd_kelas = f.fs_kd_variabel
				AND	f.fs_kd_tipe = '03'
			WHERE	a.fs_kd_jadwal = '".trim($xKdJadwal)."'
				AND	a.fd_tgl_jadwal >= '".trim($xTgl)."'
				AND	a.fd_tgl_jadwal <= '".trim($xTgl2)."'
			ORDER BY a.fd_tgl_jadwal, LENGTH(a.fn_urut), a.fn_urut, LENGTH(a.fn_urut2), a.fn_urut2, f.fs_nm_variabel
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function GridKapasitas($xKdJadwal,$xTgl,$xTgl2)
	{
		$xSQL = ("
			SELECT	a.fs_kd_jadwal, a.fd_tgl_jadwal, a.fn_urut,
					a.fs_jam_jadwal, a.fs_kd_armada, a.fs_kd_kelas,
					IFNULL(b.fs_nm_variabel, '') fs_nm_kelas, a.fn_kapasitas
			FROM	tm_jadwal4 a
			LEFT JOIN tm_variabel b ON a.fs_kd_kelas = b.fs_kd_variabel
				AND	b.fs_kd_tipe = '03'
			WHERE	a.fs_kd_jadwal = '".trim($xKdJadwal)."'
				AND	a.fd_tgl_jadwal >= '".trim($xTgl)."'
				AND	a.fd_tgl_jadwal <= '".trim($xTgl2)."'
			ORDER BY a.fd_tgl_jadwal, LENGTH(a.fn_urut), a.fn_urut, b.fs_nm_variabel
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function GridKapasitas2($xKdArmada)
	{
		$xSQL = ("
			SELECT	a.fs_kd_armada, a.fs_no_lambung, a.fs_nm_lambung,
					a.fn_kendaraan, a.fn_barang,
					b.fs_kd_kelas, IFNULL(c.fs_nm_variabel, '') fs_nm_kelas,
					IFNULL(b.fn_kapasitas, 0) fn_kapasitas
			FROM 	tm_armada a
			INNER JOIN tm_armada2 b ON a.fs_kd_armada = b.fs_kd_armada
			LEFT JOIN tm_variabel c ON b.fs_kd_kelas = c.fs_kd_variabel
				AND	c.fs_kd_tipe = '03'
			WHERE	a.fs_kd_armada = '".trim($xKdArmada)."'
			ORDER BY c.fs_nm_variabel
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListJadwalAll()
	{
		$xSQL = ("
			SELECT	a.fs_kd_jadwal, a.fs_kd_rute,
					CONCAT(IFNULL(d.fs_nm_variabel, ''), ' - ', IFNULL(f.fs_nm_variabel, '')) fs_nm_rute,
					a.fb_aktif
			FROM 	tm_jadwal a
			LEFT JOIN tm_rute b ON a.fs_kd_rute = b.fs_kd_rute
			LEFT JOIN tm_variabel c ON b.fs_kd_kota_asal = c.fs_kd_variabel
				AND	c.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel d ON b.fs_kd_asal = d.fs_kd_variabel
				AND	d.fs_kd_tipe = '08'
			LEFT JOIN tm_variabel e ON b.fs_kd_kota_tujuan = e.fs_kd_variabel
				AND	e.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel f ON b.fs_kd_tujuan = f.fs_kd_variabel
				AND	f.fs_kd_tipe = '08'
			ORDER BY a.fs_kd_jadwal, c.fs_nm_variabel, e.fs_nm_variabel
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListJadwal($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	a.fs_kd_jadwal, a.fs_kd_rute,
					CONCAT(IFNULL(d.fs_nm_variabel, ''), ' - ', IFNULL(f.fs_nm_variabel, '')) fs_nm_rute,
					a.fb_aktif
			FROM 	tm_jadwal a
			LEFT JOIN tm_rute b ON a.fs_kd_rute = b.fs_kd_rute
			LEFT JOIN tm_variabel c ON b.fs_kd_kota_asal = c.fs_kd_variabel
				AND	c.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel d ON b.fs_kd_asal = d.fs_kd_variabel
				AND	d.fs_kd_tipe = '08'
			LEFT JOIN tm_variabel e ON b.fs_kd_kota_tujuan = e.fs_kd_variabel
				AND	e.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel f ON b.fs_kd_tujuan = f.fs_kd_variabel
				AND	f.fs_kd_tipe = '08'
			ORDER BY a.fs_kd_jadwal, c.fs_nm_variabel, e.fs_nm_variabel LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListJadwal2All()
	{
		$xSQL = ("
			SELECT	CONCAT(a.fs_kd_jadwal, ' - ', IFNULL(e.fs_nm_variabel, ''), ' - ', IFNULL(g.fs_nm_variabel, '')) fs_kd_jadwal,
					b.fs_kd_kota, IFNULL(h.fs_nm_variabel, '') fs_nm_kota,
					b.fs_kd_pelabuhan, IFNULL(i.fs_nm_variabel, '') fs_nm_pelabuhan,
					b.fs_jam_jadwal, b.fn_jarak, b.fn_durasi
			FROM 	tm_jadwal a
			INNER JOIN tm_jadwal2 b ON a.fs_kd_jadwal = b.fs_kd_jadwal
			LEFT JOIN tm_rute c ON a.fs_kd_rute = c.fs_kd_rute
			LEFT JOIN tm_variabel d ON c.fs_kd_kota_asal = d.fs_kd_variabel
				AND	d.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel e ON c.fs_kd_asal = e.fs_kd_variabel
				AND	e.fs_kd_tipe = '08'
			LEFT JOIN tm_variabel f ON c.fs_kd_kota_tujuan = f.fs_kd_variabel
				AND	f.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel g ON c.fs_kd_tujuan = g.fs_kd_variabel
				AND	g.fs_kd_tipe = '08'
			LEFT JOIN tm_variabel h ON b.fs_kd_kota = h.fs_kd_variabel
				AND	h.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel i ON b.fs_kd_pelabuhan = i.fs_kd_variabel
				AND	i.fs_kd_tipe = '08'
			ORDER BY a.fs_kd_jadwal, d.fs_nm_variabel, f.fs_nm_variabel, LENGTH(b.fn_urut), b.fn_urut
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListJadwal2($nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	CONCAT(a.fs_kd_jadwal, ' - ', IFNULL(e.fs_nm_variabel, ''), ' - ', IFNULL(g.fs_nm_variabel, '')) fs_kd_jadwal,
					b.fs_kd_kota, IFNULL(h.fs_nm_variabel, '') fs_nm_kota,
					b.fs_kd_pelabuhan, IFNULL(i.fs_nm_variabel, '') fs_nm_pelabuhan,
					b.fs_jam_jadwal, b.fn_jarak, b.fn_durasi
			FROM 	tm_jadwal a
			INNER JOIN tm_jadwal2 b ON a.fs_kd_jadwal = b.fs_kd_jadwal
			LEFT JOIN tm_rute c ON a.fs_kd_rute = c.fs_kd_rute
			LEFT JOIN tm_variabel d ON c.fs_kd_kota_asal = d.fs_kd_variabel
				AND	d.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel e ON c.fs_kd_asal = e.fs_kd_variabel
				AND	e.fs_kd_tipe = '08'
			LEFT JOIN tm_variabel f ON c.fs_kd_kota_tujuan = f.fs_kd_variabel
				AND	f.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel g ON c.fs_kd_tujuan = g.fs_kd_variabel
				AND	g.fs_kd_tipe = '08'
			LEFT JOIN tm_variabel h ON b.fs_kd_kota = h.fs_kd_variabel
				AND	h.fs_kd_tipe = '02'
			LEFT JOIN tm_variabel i ON b.fs_kd_pelabuhan = i.fs_kd_variabel
				AND	i.fs_kd_tipe = '08'
			ORDER BY a.fs_kd_jadwal, d.fs_nm_variabel, f.fs_nm_variabel, LENGTH(b.fn_urut), b.fn_urut LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListJadwal3($xKdJadwal)
	{
		$xSQL = ("
			SELECT	fn_urut, fs_jam_jadwal
			FROM	tm_jadwal2
			WHERE	fs_kd_jadwal = '".$xKdJadwal."'
			ORDER BY LENGTH(fn_urut), fn_urut
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListJadwalTgl($xTgl)
	{
		$xSQL = ("
			SELECT	DISTINCT fd_tgl_jadwal, DATE_FORMAT(fd_tgl_jadwal,'%d-%m-%Y') fd_tgl_tampil
			FROM	tm_jadwal3
			WHERE	fd_tgl_jadwal >= '".$xTgl."'
			ORDER BY fd_tgl_jadwal
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}
?>