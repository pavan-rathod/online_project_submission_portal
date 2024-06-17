<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */ 
  class Dashboard_Model extends CI_Model
  {
  		 
	   public function trustList()
	    {
	        $this->db->from('tbl_trust a');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_tehsil tl', 'a.tehsil_id = tl.tehsil_id');		
	        $this->db->join('tbl_district dt', 'dt.district_id = tl.district_id');	        
	        $this->db->join('tbl_state st', 'st.state_id = dt.state_id');	                
	        $this->db->join('tbl_election b', 'a.election_type_id = b.election_id');	        
	        $this->db->join('tbl_trust_type c', 'a.trust_type_id = c.trust_type_id');
	        $this->db->join('tbl_registration_type d', 'a.registration_type_id = d.registration_type_id');	        
	        $this->db->order_by('a.trust_name');
	        $query = $this->db->get();
	        return $query->num_rows(); 	         
	    } 	     

	   public function boardReport()
	    { 
	        $this->db->from('tbl_stages a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.status', '0');
	         $this->db->where('a.next_date', date('Y/m/d'));
	        $this->db->join('tbl_trust b', 'a.trust_id = b.trust_id');
	        $this->db->join('tbl_trust_contact c', 'a.party_id = c.contact_id');
	        $query = $this->db->get();
	        return $query->num_rows();  
	    } 

	   public function check_login()
	    { 
           $this->db->where('username', $this->input->post('username'));
           $this->db->where('password', $this->input->post('password'));
           $query = $this->db->get('tbl_admin');
           $data=$query->result_array();
           if($query->num_rows()==1)
           {
             foreach($data as $row)
             {
               $this->session->set_userdata('id', $row['aid']);
               $this->session->set_userdata('username', $row['username']);
               $this->session->set_userdata('type', '');
             }      
             return true;
           }
           else
           {
             return false;
           }          
	    }	

	   public function member_login()
	    { 
	       $tbl=($this->input->post('type')==1?'tbl_teacher':'tbl_student');
           $this->db->where('email', $this->input->post('username'));
           $this->db->where('password', $this->input->post('password'));
           $query = $this->db->get($tbl);
           $data=$query->result_array();
           if($query->num_rows()==1)
           {
             foreach($data as $row)
             {
             	if ($this->input->post('type')==1) 
             	{
             		 $this->session->set_userdata('id', $row['teacher_id']);
             	}
             	else{
             		 $this->session->set_userdata('id', $row['student_id']);
             		 $this->session->set_userdata('course_id', $row['course_id']);
             	}
              
               $this->session->set_userdata('name', $row['name']);
               $this->session->set_userdata('type', $this->input->post('type'));
             }      
             return true;
           }
           else
           {
             return false;
           }          
	    }	 

     public function student_login()
      { 
           $tbl='tbl_student';
           $this->db->where('email', $this->input->post('name'));
           $this->db->where('password', $this->input->post('pass'));
           $query = $this->db->get($tbl);
           $data=$query->result_array();
           if($query->num_rows()==1)
           {
             foreach($data as $row)
             {
               $this->session->set_userdata('id', $row['student_id']);
               $this->session->set_userdata('course_id', $row['course_id']);              
               $this->session->set_userdata('name', $row['name']);
             }      
             return true;
           }
           else
           {
             return false;
           }          
      }      


	   public function check_password()
	    {
	       $this->db->where('aid', $this->session->userdata('id'));
	       $this->db->where('password', $this->input->post('old'));
	       $query=$this->db->get('tbl_admin');
	       return ($query->num_rows() != "" ? 1:0);
	    }     

	   public function reset_password()
	    {
	      $field=array(
	        'password'=>$this->input->post('npass'),                           
	        );
	      $this->db->where('aid', $this->session->userdata('id'));      
	      $this->db->update('tbl_admin',$field);
	      return ($this->db->affected_rows() >0 ? true: false);    
	    }  	       

  }


?>