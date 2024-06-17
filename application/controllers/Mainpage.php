<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mainpage extends CI_Controller {

	public function index()
	{
		$data['data']=$this->Slider_Model->loadData(); 
		$data['information']=$this->Information_Model->loadData();  
		$data['video']=$this->Video_Model->loadData(); 
		$this->load->view('template/header');
		$this->load->view('pages/index',$data);
		$this->load->view('template/footer');
	}

	public function about() 
	{
		$data['about']=$this->AboutUs_Model->loadData();  
         $i=0;
         foreach ($data['about'] as $value) {
            $data['info'][]=$this->AboutUs_Model->details_record($data['about'][$i]['id']); 
            $i++;
         }   		 
		$this->load->view('template/header');
		$this->load->view('pages/about',$data);
		$this->load->view('template/footer');
	}	
 
   public function saveData()
    {
        echo $result=$this->Contact_Model->data_save();                   
    }   	
 
	public function services()
	{
		$data['services']=$this->Services_Model->loadData();  
		$this->load->view('template/header');
		$this->load->view('pages/services',$data);
		$this->load->view('template/footer');
	}

  /* public function documentation()
	{
		$this->load->view('template/header');
		$this->load->view('pages/documentation');
		$this->load->view('template/footer');
	}*/


	public function detailInformation()
	{
		$id = $this->uri->segment(2);
		$data['services']=$this->Services_Model->single_record($id);
        $data['data']=$this->Services_Model->details_record($id);		
		$this->load->view('template/header');
		$this->load->view('pages/details',$data);
		$this->load->view('template/footer');
	}

	public function video() 
	{
		//$data['video']=$this->Video_Model->loadData();    
		$data['data']=$this->UploadProject_Model->loadData();  
		$this->load->view('template/header');
		$this->load->view('pages/video',$data);
		$this->load->view('template/footer');
	}	

	public function videoInformation()
	{
		$id = $this->uri->segment(2);
		$data['single']=$this->Video_Model->single_record($id);
		$this->load->view('template/header');
		$this->load->view('pages/videoInformation',$data);
		$this->load->view('template/footer');
	}

	public function client_portfolio()
	{
		$data['data']=$this->Client_Model->loadData();   
		$this->load->view('template/header');
		$this->load->view('pages/client_portfolio',$data);
		$this->load->view('template/footer');
	}	

	public function contact()
	{
		$this->load->view('template/header');
		$this->load->view('pages/documentation');
		$this->load->view('template/footer');
	}	

    public function studentLogin()
     {
       $result=$this->Dashboard_Model->student_login();  
       if ($result == 1)
        {
          if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) 
           {
             echo "1";            
           }
           else
           {
             echo "0";   
           }           
        }
        else
        {
          echo "0";
        }
     } 			


}
