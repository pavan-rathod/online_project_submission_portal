<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class Information extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Home Information';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/information');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->Information_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
            echo $result=$this->Information_Model->data_save();                   
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->Information_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
           echo $result=$this->Information_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->Information_Model->data_delete($id);      
       }           

   }

?>