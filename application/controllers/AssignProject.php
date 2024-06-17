<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class AssignProject extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Assign Project';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/assignproject');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->AssignProject_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
          echo $result=$this->AssignProject_Model->data_save();                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->AssignProject_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->AssignProject_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->AssignProject_Model->data_delete($id);      
       }           

   }

?>