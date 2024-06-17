<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Technology_Model extends CI_Model
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
	        $id=$this->getMax('tech_id','tbl_technology');
	        $field=array(
	          'tech_id'=>(int)$id[0]['tech_id']+1,
	          'course_id'=>$this->input->post('course_id'),      	          
	          'technology'=>$this->input->post('name'), 
/*	          'email'=>$this->input->post('email'),           
	          'contact'=>$this->input->post('contact'), 
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password'),*/
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_technology',$field);
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
	        $this->db->from('tbl_technology a');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_course b', 'a.course_id = b.course_id');
	        $this->db->order_by('a.tech_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	

	   public function loadTech($id)
	    { 
	        $this->db->from('tbl_technology a');
	        $this->db->where('a.flag', '1');
	        //$this->db->join('tbl_course b', 'a.course_id = b.course_id');
	        $this->db->where('a.course_id', $id);
	        $query = $this->db->get();
	        //return $this->db->last_query();
	        return $query->result_array();  
	    } 	            	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_technology a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.tech_id', $id);
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
	          'course_id'=>$this->input->post('course_id'),           
	          'technology'=>$this->input->post('name'), 
/*	          'contact'=>$this->input->post('contact'), 
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password')*/	                                  
	        );
	      $this->db->where('tech_id', $id);      
	      $this->db->update('tbl_technology',$field);
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
	       $this->db->where('tech_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_technology', $data);
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