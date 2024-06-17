<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Admin extends CI_Controller {

	public function index()
	{
		$this->load->view('dashboard/template/loghead');
		$this->load->view('dashboard/pages/login');
		$this->load->view('dashboard/template/logfoot');
	}

  public function member_login()
  {
    $this->load->view('dashboard/template/loghead');
    $this->load->view('dashboard/pages/memberlogin');
    $this->load->view('dashboard/template/logfoot');    
  }   

    public function logDetails()
     {
       $result=$this->Dashboard_Model->check_login();  
       if ($result == 1)
        {
          if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) 
           {
             echo "1";            
           }
           else
           {
             echo "0";   
           }           
        }
        else
        {
          echo "0";
        }
     } 
 
    public function memberLogDetails()
     {
       $result=$this->Dashboard_Model->member_login();  
       if ($result == 1)
        {
          if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) 
           {
             echo "1";            
           }
           else
           {
             echo "0";   
           }           
        }
        else
        {
          echo "0";
        }
     }      

     public function dashboard()
      {  
          if (($this->session->userdata('id') != '') &&  (($this->session->userdata('username') !='') || ($this->session->userdata('name') !=''))) {          
            $data['heading']='Dashboard';  
            $this->load->view('dashboard/template/header',$data);
            $this->load->view('dashboard/template/navigation');
            $this->load->view('dashboard/pages/index');
            $this->load->view('dashboard/template/footer');
          } 
         else
         {
            redirect(base_url());      
         }         
      }  

     public function changePassword()
      {  
          if (($this->session->userdata('id') != '') &&  ($this->session->userdata('username') !='')) {          
            $data['heading']='Change Password';    
            $this->load->view('templates/header',$data);
            $this->load->view('templates/navigation');
            $this->load->view('pages/change_password');
            $this->load->view('templates/footer');
          } 
         else
         {
            redirect(base_url());      
         }          
      }        

    public function checkPassword()
     {
        echo $result=$this->Dashboard_Model->check_password();  
     }          

    public function resetPassword()
     {
        echo $result=$this->Dashboard_Model->reset_password();  
     }  

    public function studentLogout()
      {       
          $this->session->unset_userdata('id');
          $this->session->unset_userdata('name');
          redirect(base_url());       
      } 

    public function logout()
      {       
          $this->session->unset_userdata('id');
          $this->session->unset_userdata('username');
          redirect(base_url().'/Admin');       
      }  	

}
