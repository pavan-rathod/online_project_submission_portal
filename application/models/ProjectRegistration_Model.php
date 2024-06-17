<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class ProjectRegistration_Model extends CI_Model
  {  	
	   public function getMax($id,$tbl)
	      {
	        $this->db->select_max($id);
	        $query = $this->db->get($tbl);      
	        $res = $query->result(); 
	        return json_decode(json_encode($res), True);
	      }

	   public function data_save()
	    {
	        $id=$this->getMax('registration_id','tbl_project_registration');
	        $idd=(int)$id[0]['registration_id']+1;
	        $field=array(
	          'registration_id'=>$idd,
	          'student_id'=>$_SESSION['id'], 
	          'tech_id'=>$this->input->post('tech'),           
	          'project_title'=>$this->input->post('name'), 
	          'company_name'=>'', 
	          'sponsership_letter'=>'',
	          'synopsis'=>$_FILES['banner-image']['name'],
	          'date'=>Date('Y-m-d'),
	          'status'=>0,	          
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_project_registration',$field);
	        if ($this->db->affected_rows() >0)
	         {
	            return $idd;
	            //return true;
	         }
	         else
	         {
	            return false; 
	         }
	    } 	

	   public function detailsSave()
	    {
	        $id=$this->getMax('group_id','tbl_project_group');
	        $field=array(
	          'group_id'=>(int)$id[0]['group_id']+1,
	          'registration_id'=>$this->input->post('registration_id'),           
	          'student_id'=>$this->input->post('student_id'),           
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_project_group',$field);
	        if ($this->db->affected_rows() >0)
	         {
	            return $id;
	            //return true;
	         }
	         else
	         {
	            return false; 
	         }
	    }	    

	   public function loadData()
	    { 
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.student_id', $_SESSION['id']);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->order_by('a.registration_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	    	

	   public function loadProjectData()
	    { 
	    	$this->db->select('a.registration_id,b.name student,c.technology,a.project_title,a.date');
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.status', '0');
	        $this->db->where('a.flag', '1');
	        $this->db->where('d.teacher_id', $_SESSION['id']);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->join('tbl_assign_technology_teacher d', 'a.tech_id = d.tech_id');
	        $this->db->join('tbl_teacher e', 'e.teacher_id = d.teacher_id');
	        $this->db->join('tbl_assign_project_to_teacher f', 'e.teacher_id = f.teacher_id');
	        $this->db->order_by('a.registration_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	

	   public function loadFinalProjectData()
	    { 
	    	$this->db->select('b.name student,c.technology,d.project_title,d.company_name,a.submission_date,a.project_documentation,a.project_ppt,a.project_zip');
	        $this->db->from('tbl_project_submit a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('e.teacher_id', $_SESSION['id']);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->join('tbl_project_registration d', 'a.project_id = d.registration_id');	
	        $this->db->join('tbl_assign_technology_teacher e', 'd.tech_id = e.tech_id');
	        //$this->db->join('tbl_teacher f', 'f.teacher_id = e.teacher_id');	                
	        $this->db->order_by('a.submission_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    }

	   public function loadAllProjectData()
	    { 
	    	$this->db->select('a.registration_id,b.name student,c.technology,a.project_title,a.date');
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.status', '0');
	        $this->db->where('a.flag', '1');
	        //$this->db->where('d.teacher_id', $_SESSION['id']);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->join('tbl_assign_technology_teacher d', 'a.tech_id = d.tech_id');
	        $this->db->join('tbl_teacher e', 'e.teacher_id = d.teacher_id');
	        $this->db->order_by('a.registration_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    }	

	    public function loadTeacherProjectData()
	    { 
	    	$this->db->select('a.registration_id,b.name student,c.technology,a.project_title,a.date, a.synopsis,a.remark,a.rejection_reason');
	        $this->db->from('tbl_project_registration a');
	        //$this->db->where('a.status', '0');
	        $this->db->where('a.flag', '1');
	        $this->db->where('f.teacher_id', $_SESSION['id']);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        //$this->db->join('tbl_assign_technology_teacher d', 'a.tech_id = d.tech_id');
	        //$this->db->join('tbl_teacher e', 'e.teacher_id = d.teacher_id');
	        $this->db->join('tbl_assign_project_to_teacher f', 'f.project_id = a.registration_id');
	        $this->db->order_by('a.registration_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    }     	                	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_project_group a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.registration_id', $id);
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $query = $this->db->get();
	        //return $query->result_array(); 	    	
	        if ($query->num_rows() > 0)
	         {
	           return $query->result_array();  
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
	          'address'=>$this->input->post('address'), 
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

	   public function data_resend()
	    {
	      $id=$this->input->post('id');
	      $field=array(
	          'synopsis'=>$_FILES['banner-image']['name'],
	          'status'=>0,	                                   
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

	   public function data_remark($id)
	    {
	       $this->db->where('registration_id', $id);
	       $data=array(
	          'status'=>'1',
	          'remark'=>$this->input->post('remark'),
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