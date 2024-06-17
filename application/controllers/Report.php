<?php

   defined('BASEPATH') OR exit('No direct script access allowed');
 
   /**
    *  
    */ 
   class Report extends CI_Controller
   {
      public function Teacher()
     	  {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Teacher Report';  
              $data['data']=$this->Teacher_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/teacherReport');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
     	  }

      public function Student()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Student Report';  
              $data['data']=$this->Student_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/studentReport');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }   

      public function Course()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Course Report';  
              $data['data']=$this->Course_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/courseReport');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }    

      public function Technology()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Technology Report';  
              $data['data']=$this->Technology_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/technologyReport');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        } 

      public function CoursewiseTeacher()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Coursewise Teacher';  
              //$data['data']=$this->Technology_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/coursewiseTeacher');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }     

      public function coursewiseTeacherList()
        {
            $data['data']=$this->Report_Model->coursewiseTeacher();  
            echo json_encode($data);
        } 

      public function CoursewiseStudent()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Coursewise Student';  
              //$data['data']=$this->Technology_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/coursewiseStudent');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }     

      public function coursewiseStudentList()
        {
            $data['data']=$this->Report_Model->coursewiseStudent();  
            echo json_encode($data);
        }   

      public function ApprovedProject()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Approved Project';  
              //$data['data']=$this->Technology_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/approvedProject');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }     

      public function approvedProjectList()
        {
            $data['data']=$this->Report_Model->approvedProjectList();  
            echo json_encode($data);
        }    

      public function SubmittedProject()
        {
            if (($this->session->userdata('id') != '')) {          
              $data['heading']='Submitted Project';  
              //$data['data']=$this->Technology_Model->loadData();  
              $this->load->view('dashboard/template/header',$data);
              $this->load->view('dashboard/template/navigation');
              $this->load->view('dashboard/reports/submittedProject');
              $this->load->view('dashboard/template/footer');
            } 
           else
           {
              redirect(base_url().'Admin');      
           }         
        }     

      public function submittedProjectList()
        {
            $data['data']=$this->Report_Model->submittedProjectList();  
            echo json_encode($data);
        }                                                                      

   }

?>