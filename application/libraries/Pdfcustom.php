<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once dirname(__FILE__) . '/tcpdf/tcpdf.php';

class Pdfcustom extends TCPDF
{
    function __construct()
    {
        parent::__construct();
    }

    function Header() 
    {
    	$html = '<img src="assets/img/mandiri-finance.png" width="90"/>';
    	$this->SetFontSize(8);
    	$this->WriteHTML($html, true, 0, true, 0);
  	}
 
  	function Footer() 
  	{
    	$this->SetY(-15);
      $html = 
        '<div style="display:inline; color:gray;"><img src="assets/img/ojk-footer.png" style="width:16;height:12;"/> <i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></div>';
      $this->SetFontSize(8);
    	$this->WriteHTML($html, true, 0, true, 0);
  	}
}