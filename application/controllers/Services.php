<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    * 
    */ 
   class Services extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Services';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/services');
              $this->load->view('dashboard/template/footer');
            }  
           else
           {
              redirect(base_url().'Admin');           
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->Services_Model->loadData();  
            echo json_encode($data);
        }  

      public function loadContactData()
        {
            $data['data']=$this->Services_Model->loadContactData();  
            echo json_encode($data);
        }                         

      public function dataSave()
       {
              if (isset($_FILES['banner-image']['name']))
               {
                 $config['upload_path'] = './Services';
                 $config['allowed_types']= 'jpg|jpeg|png|gif';
                 $this->load->library('upload', $config);
                 if (! $this->upload->do_upload('banner-image'))
                  {
                    echo $this->upload->display_errors();
                  }
                 else
                 {
                    echo $result=$this->Services_Model->data_save();
                 } 
               }                      
       }  

      public function detailsSave()
       {
          echo $result=$this->Services_Model->detailsSave();                      
       }          
       
      public function getRecord()
       {
           $id=$this->input->post('banner_id');
           $data['single']=$this->Services_Model->single_record($id);
           $data['data']=$this->Services_Model->details_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
              if ($this->input->post('img') != "") {
                if ($_FILES['banner-image']['name'])
                 {
                   $config['upload_path'] = './Services';
                   $config['allowed_types']= 'jpg|jpeg|png|gif';
                   $this->load->library('upload', $config);
                   if (! $this->upload->do_upload('banner-image'))
                    {
                      echo $this->upload->display_errors();
                    }
                   else
                   {
                      echo $result=$this->Services_Model->data_update();   
                   } 
                 }        
              }
             else
             {
                echo $result=$this->Services_Model->dataUpdateWithoutImg();  
             }             
       }  

      public function dataDelete()
       {
          $id=$this->input->post('banner_id');
          echo $result=$this->Services_Model->data_delete($id);      
       }           

   }

?>