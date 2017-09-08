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
    	$this->SetY(-12);
    	$html = 
        '<p style="color:gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan</i></p>';
    	$this->SetFontSize(8);
    	$this->WriteHTML($html, true, 0, true, 0);
  	}
    /*
    function Footer() 
    {
      $this->SetY(-15);
      $html = 
        '<table>
          <tbody>
          <tr>
            <td width="47%" align="left"></td>
            <td width="5%" align="left"><img src="assets/img/ojk.png" width="40"/></td>
            <td width="48%" align="right"><p style="font-size: 8px; color: gray"><i>Terdaftar dan dibawah pengawasan Otoritas Jasa Keuangan (OJK)</i></p></td>
          </tr>
          </tbody>
        </table>';
      $this->SetFontSize(8);
      $this->WriteHTML($html, true, 0, true, 0);
    }
    */
}