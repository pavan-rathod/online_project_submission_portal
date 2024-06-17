<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class AssignTechnology extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Assign Technology';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/assigntechnology');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->AssignTechnology_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
          echo $result=$this->AssignTechnology_Model->data_save();                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->AssignTechnology_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->AssignTechnology_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->AssignTechnology_Model->data_delete($id);      
       }           

   }

?>