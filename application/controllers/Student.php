<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */  
   class Student extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Student';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/student');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->Student_Model->loadData();  
            echo json_encode($data);
        } 

      public function dataUpload()
       {     
        //echo $_FILES['banner-image']['name'];
             if (isset($_FILES['banner-image']['name']))
             {
               $config['upload_path'] = './StudentImport';
               $config['allowed_types']= 'csv';
               $this->load->library('upload', $config);
               if (! $this->upload->do_upload('banner-image'))
                {
                  echo $this->upload->display_errors();
                }
               else
               {
                   echo $result=$this->Student_Model->data_import();     
               } 
             }                               
       } 

      public function loadStudentList()
        {
            $data['data']=$this->Student_Model->loadStudentList();  
            echo json_encode($data);
        }                         

      public function dataSave()
       {
          echo $result=$this->Student_Model->data_save();                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->Student_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->Student_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->Student_Model->data_delete($id);      
       }           

   }

?>