<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class AssignProject_Model extends CI_Model
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
	        $id=$this->getMax('assign_id','tbl_assign_project_to_teacher');
	        $field=array(
	          'assign_id'=>(int)$id[0]['assign_id']+1,
	          'teacher_id'=>$this->input->post('teacher_id'),   
	          'project_id'=>$this->input->post('project'),      	          
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_assign_project_to_teacher',$field);
	        if ($this->db->affected_rows() >0)
	         {
	            return true;
	         }
	         else
	         {
	            return false; 
	         }
	    } 	

	   public function loadData()
	    { 
	    	$this->db->select('a.assign_id,b.name teacher,d.name student,c.project_title');
	        $this->db->from('tbl_assign_project_to_teacher a');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_teacher b', 'a.teacher_id = b.teacher_id');
	        $this->db->join('tbl_project_registration c', 'a.project_id = c.registration_id');
	        $this->db->join('tbl_student d', 'c.student_id = d.student_id');
	        $this->db->order_by('a.assign_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_assign_project_to_teacher a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.assign_id', $id);
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
	          'teacher_id'=>$this->input->post('teacher_id'),   
	          'project_id'=>$this->input->post('project'),                                
	        );
	      $this->db->where('assign_id', $id);      
	      $this->db->update('tbl_assign_project_to_teacher',$field);
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
	       $this->db->where('assign_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_assign_project_to_teacher', $data);
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