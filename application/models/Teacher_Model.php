<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Teacher_Model extends CI_Model
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
	        $id=$this->getMax('teacher_id','tbl_teacher');
	        $field=array(
	          'teacher_id'=>(int)$id[0]['teacher_id']+1,
	          'name'=>$this->input->post('name'), 
	          'email'=>$this->input->post('email'),           
	          'contact'=>$this->input->post('contact'), 
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password'),
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_teacher',$field);
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
	        $this->db->from('tbl_teacher a');
	        $this->db->where('a.flag', '1');
	        $this->db->order_by('a.teacher_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_teacher a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.teacher_id', $id);
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
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password')	                                  
	        );
	      $this->db->where('teacher_id', $id);      
	      $this->db->update('tbl_teacher',$field);
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
	       $this->db->where('teacher_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_teacher', $data);
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