<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class ProjectUpload_Model extends CI_Model
  {
  	
	   public function getMax($id,$tbl)
	      {
	        $this->db->select_max($id);
	        $query = $this->db->get($tbl);      
	        $res = $query->result(); 
	        return json_decode(json_encode($res), True);
	      }

	   public function data_save($doc,$ppt,$zip)
	    {
	        $id=$this->getMax('submission_id','tbl_project_submit');
	        $field=array(
	          'submission_id'=>(int)$id[0]['submission_id']+1,
	          'project_id'=>$this->input->post('id'), 
	          'tech_id'=>$this->input->post('tech_id'),           
	          'student_id'=>$_SESSION['id'], 
	          'company_letter'=>'', 
	          'project_documentation'=>$doc, 
	          'project_ppt'=>$ppt,
	          'project_zip'=>$zip,
	          'submission_date'=>Date('Y-m-d'),	          
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_project_submit',$field);
	        if ($this->db->affected_rows() >0)
	         {
			       $this->db->where('registration_id', $this->input->post('id'));
			       $data=array(
			          'submit_status'=>'1'
			        );
			       $this->db->update('tbl_project_registration', $data);
			          if ($this->db->affected_rows() > 0)
			           {
			             return true;
			           }
			           else
			           {
			             return false;
			           } 
	         }
	         else
	         {
	            return false; 
	         }
	    } 	

	   public function loadData()
	    { 
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.status', '1');
	        $this->db->where('a.flag', '1');
	        //$this->db->where('a.submit_status', '0');
	        $this->db->where('a.student_id', $_SESSION['id']);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->order_by('a.registration_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	    	

	   public function loadProjectData()
	    { 
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.status', '0');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->order_by('a.registration_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	            	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->where('a.registration_id', $id);
	        $query = $this->db->get();
	        //return $query->result_array(); 	    	
	        if ($query->num_rows() > 0)
	         {
	           return $query->row();
	         }
	         else
	         {
	           return false;
	         }
	    }  	
	    
	   public function data_update()
	    {
	      $id=$this->input->post('id');
	      $field=array(
	          'name'=>$this->input->post('name'), 
	          'email'=>$this->input->post('email'),           
	          'contact'=>$this->input->post('contact'), 
	          //'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password'),
	          'course_id'=>$this->input->post('course'),	                                  
	        );
	      $this->db->where('registration_id', $id);      
	      $this->db->update('tbl_project_registration',$field);
	      if ($this->db->affected_rows() >0)
	       {
	         return true;
	       }
	       else
	       {
	         return false;
	       }
	    }      

	   public function data_delete($id)
	    {
	       $this->db->where('registration_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_project_registration', $data);
	          if ($this->db->affected_rows() > 0)
	           {
	             return true;
	           }
	           else
	           {
	             return false;
	           }      
	    }  	  

	   public function data_approve($id)
	    {
	       $this->db->where('registration_id', $id);
	       $data=array(
	          'status'=>'1'
	        );
	       $this->db->update('tbl_project_registration', $data);
	          if ($this->db->affected_rows() > 0)
	           {
	             return true;
	           }
	           else
	           {
	             return false;
	           }      
	    }	

	   public function data_reject()
	    {
	       $this->db->where('registration_id', $this->input->post('id'));
	       $data=array(
	          'rejection_reason'=>$this->input->post('reason'),
	          'status'=>2
	        );
	       $this->db->update('tbl_project_registration', $data);
	          if ($this->db->affected_rows() > 0)
	           {
	             return true;
	           }
	           else
	           {
	             return false;
	           }      
	    }	          


  }


?>