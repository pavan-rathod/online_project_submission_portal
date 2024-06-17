<?php
 
   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */  
   class ProjectRegistration extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) {          
              $data['heading']='Project Registration';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/projectregistration');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->ProjectRegistration_Model->loadData();  
            echo json_encode($data);
        }                          

      public function dataSave()
       {     
        //echo $_FILES['banner-image']['name'];
             if (isset($_FILES['banner-image']['name']))
             {
               $config['upload_path'] = './Synopsis';
               $config['allowed_types']= 'pdf|doc|docx|zip';
               $this->load->library('upload', $config);
               if (! $this->upload->do_upload('banner-image'))
                {
                  echo $this->upload->display_errors();
                }
               else
               {
                   echo $result=$this->ProjectRegistration_Model->data_save();     
               } 
             }                               
       } 

      public function resendSynopsis()
       {     
        //echo $_FILES['banner-image']['name'];
             if (isset($_FILES['banner-image']['name']))
             {
               $config['upload_path'] = './Synopsis';
               $config['allowed_types']= 'pdf|doc|docx|zip';
               $this->load->library('upload', $config);
               if (! $this->upload->do_upload('banner-image'))
                {
                  echo $this->upload->display_errors();
                }
               else
               {
                   echo $result=$this->ProjectRegistration_Model->data_resend();     
               } 
             }                               
       }  


      public function detailsSave()
        {
            $data['data']=$this->ProjectRegistration_Model->detailsSave();  
            echo json_encode($data);
        }          
       
      public function getRecord()
       { 
           $id=$this->input->post('id');
           $data['data']=$this->ProjectRegistration_Model->single_record($id);
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

      public function ProjectStatus()
        {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) {          
              $data['heading']='Project Status';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/projectstatus');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        } 

        public function loadAllProjectData()
        {
            $data['data']=$this->ProjectRegistration_Model->loadAllProjectData();  
            echo json_encode($data);
        }                

   }

?>