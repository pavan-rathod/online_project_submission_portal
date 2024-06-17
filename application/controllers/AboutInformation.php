<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class AboutInformation extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='About Us Information';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/about-information');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->AboutUs_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
            echo $result=$this->AboutUs_Model->data_save();                   
       } 

      public function detailsSave()
       {
          echo $result=$this->AboutUs_Model->detailsSave();                      
       }          
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->AboutUs_Model->single_record($id);
           $data['data']=$this->AboutUs_Model->details_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
           echo $result=$this->AboutUs_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->AboutUs_Model->data_delete($id);      
       }           

   }

?>