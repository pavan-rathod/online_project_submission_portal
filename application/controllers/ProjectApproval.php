<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
  
   /**
    *  
    */  
   class ProjectApproval extends CI_Controller
   {
      public function index() 
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) {          
              $data['heading']='Project Approval';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/projectapproval');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadProjectData()
        { 
            $data['data']=$this->ProjectRegistration_Model->loadTeacherProjectData();  
            echo json_encode($data);
        }   

      public function loadFinalProjectData()
        {
            $data['data']=$this->ProjectRegistration_Model->loadFinalProjectData();  
            echo json_encode($data);
        }                          

      public function dataSave()
       {
                $count = count($_FILES['files']['name']);
                $insert=0;
                $letter='';
                $synopsis='';
                for($i=0;$i<$count;$i++){
                  
                  if(!empty($_FILES['files']['name'][$i])){
               
                    $_FILES['file']['name'] = $_FILES['files']['name'][$i];
                    $_FILES['file']['type'] = $_FILES['files']['type'][$i];
                    $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
                    $_FILES['file']['error'] = $_FILES['files']['error'][$i];
                    $_FILES['file']['size'] = $_FILES['files']['size'][$i];
            
                    $config['upload_path'] = './Documents/'; 
                    $config['allowed_types'] = 'pdf|doc|docx|jpg|jpeg|png|gif';
                    $config['max_size'] = '5000';

                    if ($i==0) 
                      $letter.=$_FILES['files']['name'][$i];
                    else 
                      $synopsis.=$_FILES['files']['name'][$i];                    

                    $path = './Documents/'.$_FILES['files']['name'][$i];
             
                    $this->load->library('upload',$config); 
              
                    if($this->upload->do_upload('file')){
                      // $this->Documents_Model->document_save($nameArr[$i],'Documents/'.$_FILES['files']['name'][$i]);    
                       $insert++;                    
                    }
                  }
                }         
          echo $result=$this->ProjectRegistration_Model->data_save($letter,$synopsis);                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->ProjectRegistration_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->ProjectRegistration_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->ProjectRegistration_Model->data_delete($id);      
       }   

      public function dataApprove()
       {
          $id=$this->input->post('id');
          echo $result=$this->ProjectRegistration_Model->data_approve($id);      
       }  


      public function dataRemark()
       {
          $id=$this->input->post('id');
          echo $result=$this->ProjectRegistration_Model->data_remark($id);      
       }           

      public function dataReject()
       {
          echo $result=$this->ProjectRegistration_Model->data_reject();      
       }  

      public function ProjectSubmission()
        {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) {          
              $data['heading']='Project Final Submission';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/projectfinalsubmission');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }                         

   }

?>