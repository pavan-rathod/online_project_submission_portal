<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /** 
    * 
    */ 
   class Video extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
              $data['heading']='Video';  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/video');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');           
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->Video_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
/*                $count = count($_FILES['files']['name']);
                $img='';
                $vdo='';
                for($i=0;$i<$count;$i++){
                  if(!empty($_FILES['files']['name'][$i])){
               
                    $_FILES['file']['name'] = $_FILES['files']['name'][$i];
                    $_FILES['file']['type'] = $_FILES['files']['type'][$i];
                    $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
                    $_FILES['file']['error'] = $_FILES['files']['error'][$i];
                    $_FILES['file']['size'] = $_FILES['files']['size'][$i];

                    if ($i==0) {
                          $config['upload_path'] = './Service_Video/'; 
                          $config['allowed_types'] = '*';             
                          $this->load->library('upload',$config); 
                         if (! $this->upload->do_upload('file'))
                          {
                            echo $this->upload->display_errors();
                          }
                         else
                         {
                            $img.=$_FILES['files']['name'][$i];
                         }                                     
                    }                  
                    
                  }
                } */       
                echo $result=$this->Video_Model->data_save();
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('banner_id');
           $data['single']=$this->Video_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
/*              if ($this->input->post('thumnail')) {
                  $count = count($_FILES['files']['name']);
                  $img='';
                  $vdo='';
                  for($i=0;$i<$count;$i++){
                    if(!empty($_FILES['files']['name'][$i])){
                 
                      $_FILES['file']['name'] = $_FILES['files']['name'][$i];
                      $_FILES['file']['type'] = $_FILES['files']['type'][$i];
                      $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
                      $_FILES['file']['error'] = $_FILES['files']['error'][$i];
                      $_FILES['file']['size'] = $_FILES['files']['size'][$i];

                      if ($i==0) {
                            $config['upload_path'] = './Service_Video/'; 
                            $config['allowed_types'] = '*';             
                            $this->load->library('upload',$config); 
                           if (! $this->upload->do_upload('file'))
                            {
                              echo $this->upload->display_errors();
                            }
                           else
                           {
                              $img.=$_FILES['files']['name'][$i];
                           }                                     
                      }                  
                      
                    }
                  }        
                  echo $result=$this->Video_Model->data_update($img);      
              }
             else
             {
                echo $result=$this->Video_Model->dataUpdateWithoutImg();  
             } */  
             echo $result=$this->Video_Model->data_update();          
       }  

      public function dataDelete()
       {
          $id=$this->input->post('banner_id');
          echo $result=$this->Video_Model->data_delete($id);      
       }           

   }

?>