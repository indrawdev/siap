<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


	function tanggal_indo($tanggal, $cetak_hari = false)
	{
		$hari = array ( 1 =>    'Senin',
					'Selasa',
					'Rabu',
					'Kamis',
					'Jumat',
					'Sabtu',
					'Minggu'
				);
				
		$bulan = array (1 =>   'Januari',
					'Februari',
					'Maret',
					'April',
					'Mei',
					'Juni',
					'Juli',
					'Agustus',
					'September',
					'Oktober',
					'November',
					'Desember'
				);

		$tgl_indo = '';

		if ($tanggal <> '') {
			$split 	  = explode('-', $tanggal);
			$tgl_indo = $split[2] . ' ' . $bulan[ (int)$split[1] ] . ' ' . $split[0];
			
			if ($cetak_hari) {
				$num = date('N', strtotime($tanggal));
				return $hari[$num] . ', ' . $tgl_indo;
			}
		}

		return $tgl_indo;
	}

	function hari_indo($tanggal)
	{
		$hari = array ( 1 =>    'Senin',
					'Selasa',
					'Rabu',
					'Kamis',
					'Jumat',
					'Sabtu',
					'Minggu'
				);

		if ($tanggal <> '') {
			$num = date('N', strtotime($tanggal));
				return $hari[$num];
		}
	}

	function bulan_indo($param)
	{
		$month = substr($param, 5, 2);
		$year = substr($param, 0, 4);
		$bulan = array (1 =>   'Januari',
					'Februari',
					'Maret',
					'April',
					'Mei',
					'Juni',
					'Juli',
					'Agustus',
					'September',
					'Oktober',
					'November',
					'Desember'
				);
		if ($param <> '') {
			return $bulan[ (int)$month ] .' '. $year;
		}
	}