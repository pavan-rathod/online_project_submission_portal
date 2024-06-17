<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class UploadProject extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Upload Project';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/uploadproject');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->UploadProject_Model->loadData();  
            echo json_encode($data);
        }  

      public function loadTech()
        {
            $id=$this->input->post('id');
            $data['data']=$this->UploadProject_Model->loadTech($id);  
            echo json_encode($data);
        }    

      public function loadStudentTech()
        {
            $id=$_SESSION['course_id'];
            $data['data']=$this->UploadProject_Model->loadTech($id);  
            echo json_encode($data);
        }                               

      public function dataSave()
       {
            if (isset($_FILES['banner-image']['name']))
             {
               $config['upload_path'] = './Documentation';
               $config['allowed_types']= 'pdf|doc|docx|zip';
               $this->load->library('upload', $config);
               if (! $this->upload->do_upload('banner-image'))
                {
                  echo $this->upload->display_errors();
                }
               else
               {
                  echo $result=$this->UploadProject_Model->data_save();
               } 
             }                                
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->UploadProject_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->UploadProject_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->UploadProject_Model->data_delete($id);      
       }           

   }

?>