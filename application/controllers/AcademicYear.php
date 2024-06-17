<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class AcademicYear extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Academic Year';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/academicyear');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->AcademicYear_Model->loadData();  
            echo json_encode($data);
        }  

      public function loadTech()
        {
            $id=$this->input->post('id');
            $data['data']=$this->AcademicYear_Model->loadTech($id);  
            echo json_encode($data);
        }    

      public function loadStudentTech()
        {
            $id=$_SESSION['course_id'];
            $data['data']=$this->AcademicYear_Model->loadTech($id);  
            echo json_encode($data);
        }                               

      public function dataSave()
       {
          echo $result=$this->AcademicYear_Model->data_save();                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->AcademicYear_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->AcademicYear_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->AcademicYear_Model->data_delete($id);      
       }           

   }

?>