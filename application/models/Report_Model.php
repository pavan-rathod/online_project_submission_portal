<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Report_Model extends CI_Model
  {	

	   public function coursewiseTeacher()
	    { 
	        $this->db->from('tbl_teacher a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('b.course_id', $this->input->post('id'));
	        $this->db->join('tbl_assign_technology_teacher b', 'a.teacher_id = b.teacher_id');
	        $this->db->join('tbl_course c', 'b.course_id = c.course_id');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 

	   public function coursewiseStudent()
	    { 
	        $this->db->from('tbl_student a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.course_id', $this->input->post('id'));
	        $this->db->join('tbl_course c', 'a.course_id = c.course_id');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	    	    	

	   public function approvedProjectList()
	    { 
	    	$this->db->select('b.name student,b.contact,c.technology,a.project_title,a.company_name,e.name teacher');
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.status', '1');
	        $this->db->where('a.flag', '1');
	        $this->db->where('b.course_id', $this->input->post('id'));
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->join('tbl_assign_technology_teacher f', 'a.tech_id = f.tech_id');
	        $this->db->join('tbl_teacher e', 'e.teacher_id = f.teacher_id');	        
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 

	   public function submittedProjectList()
	    { 
	    	$this->db->select('b.name student,b.contact,c.technology,a.project_title,a.company_name,e.name teacher');
	        $this->db->from('tbl_project_registration a');
	        $this->db->where('a.status', '1');
	        $this->db->where('a.flag', '1');
	        $this->db->where('b.course_id', $this->input->post('id'));
	        $this->db->join('tbl_project_submit d', 'd.project_id = a.registration_id');
	        $this->db->join('tbl_student b', 'a.student_id = b.student_id');
	        $this->db->join('tbl_technology c', 'a.tech_id = c.tech_id');
	        $this->db->join('tbl_assign_technology_teacher f', 'a.tech_id = f.tech_id');
	        $this->db->join('tbl_teacher e', 'e.teacher_id = f.teacher_id');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	    	              	    	          


  }


?>