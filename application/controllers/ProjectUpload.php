  <?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class ProjectUpload extends CI_Controller
   {
      public function index()
     	  {
            if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) {          
              $data['heading']='Project Upload';   
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/pages/projectsubmission');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function loadData()
        {
            $data['data']=$this->ProjectUpload_Model->loadData();  
            echo json_encode($data);
        }                  

      public function dataSave()
       {
                $count = count($_FILES['files']['name']);
                $insert=0;
                //$letter='';
                $doc='';
                $ppt='';
                $zip='';                
                for($i=0;$i<$count;$i++){
                  
                  if(!empty($_FILES['files']['name'][$i])){
               
                    $_FILES['file']['name'] = $_FILES['files']['name'][$i];
                    $_FILES['file']['type'] = $_FILES['files']['type'][$i];
                    $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
                    $_FILES['file']['error'] = $_FILES['files']['error'][$i];
                    $_FILES['file']['size'] = $_FILES['files']['size'][$i];
            
                    $config['upload_path'] = './Project/'; 
                    $config['allowed_types'] = 'pdf|doc|docx|jpg|jpeg|png|gif|zip|pptx|ppt';
                    $config['max_size'] = '5000';

                    /*if ($i==0) 
                      $letter.=$_FILES['files']['name'][$i];
                    else*/
                    if($i==0)
                      $doc.=$_FILES['files']['name'][$i]; 
                    else if ($i==1) 
                      $ppt.=$_FILES['files']['name'][$i];
                    else 
                      $zip.=$_FILES['files']['name'][$i];                                          

                    //$path = './Documents/'.$_FILES['files']['name'][$i];
             
                    $this->load->library('upload',$config); 
              
                    if($this->upload->do_upload('file')){
                      // $this->Documents_Model->document_save($nameArr[$i],'Documents/'.$_FILES['files']['name'][$i]);    
                       $insert++;                    
                    }
                  }
                }         
          echo $result=$this->ProjectUpload_Model->data_save($doc,$ppt,$zip);                      
       }   
       
      public function getRecord()
       {
           $id=$this->input->post('id');
           $data['single']=$this->ProjectUpload_Model->single_record($id);
           echo json_encode($data);
       }    

      public function dataUpdate()
       {
          echo $result=$this->ProjectUpload_Model->data_update();              
       }  

      public function dataDelete()
       {
          $id=$this->input->post('id');
          echo $result=$this->ProjectUpload_Model->data_delete($id);      
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

   }

?>