<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Row_grid extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('row_grid_model','get_db');
		$this->load->helper('url');
	}
	public function index()
	{
		$this->load->view('row_grid_view');
	}

	public function do_read(){
		$result = $this->get_db->do_read();
        echo '{success: true, total: '.$result->num_rows().', data: '.utf8_encode(json_encode($result->result_array())).'}';
	}

	public function do_save(){
		$post = $this->input->post();
		if(isset($post['id'])) $save =  $this->get_db->do_update($post);
		else $save = $this->get_db->do_insert($post);

		echo '{success:true}';
	}
}