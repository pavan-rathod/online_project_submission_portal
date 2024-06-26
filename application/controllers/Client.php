<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    * 
    */ 
   class Client extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Client & Portfolio';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/client');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');           
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->Client_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
              if (isset($_FILES['banner-image']['name']))
               {
                 $config['upload_path'] = './Client';
                 $config['allowed_types']= 'jpg|jpeg|png|gif';
                 $this->load->library('upload', $config);
                 if (! $this->upload->do_upload('banner-image'))
                  {
                    echo $this->upload->display_errors();
                  }
                 else
                 {
                    echo $result=$this->Client_Model->data_save();
                 } 
               }                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('banner_id');
           $data['single']=$this->Client_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
              if ($this->input->post('img') != "") {
                if ($_FILES['banner-image']['name'])
                 {
                   $config['upload_path'] = './Client';
                   $config['allowed_types']= 'jpg|jpeg|png|gif';
                   $this->load->library('upload', $config);
                   if (! $this->upload->do_upload('banner-image'))
                    {
                      echo $this->upload->display_errors();
                    }
                   else
                   {
                      echo $result=$this->Client_Model->data_update();   
                   } 
                 }        
              }
             else
             {
                echo $result=$this->Client_Model->dataUpdateWithoutImg();  
             }             
       }  

      public function dataDelete()
       {
          $id=$this->input->post('banner_id');
          echo $result=$this->Client_Model->data_delete($id);      
       }           

   }

?>