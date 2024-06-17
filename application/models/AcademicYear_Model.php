<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class AcademicYear_Model extends CI_Model
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
	        $id=$this->getMax('academic_id','tbl_academic_year');
	        $field=array(
	          'academic_id'=>(int)$id[0]['academic_id']+1,
	          'startyear'=>$this->input->post('startyear'),      	          
	          'endyear'=>$this->input->post('endyear'), 
/*	          'email'=>$this->input->post('email'),           
	          'contact'=>$this->input->post('contact'), 
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password'),*/
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_academic_year',$field);
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
	        $this->db->from('tbl_academic_year a');
	        $this->db->where('a.flag', '1');
	        $this->db->order_by('a.academic_id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	 	

	   /*public function loadTech($id)
	    { 
	        $this->db->from('tbl_academic_year a');
	        $this->db->where('a.flag', '1');
	        //$this->db->join('tbl_course b', 'a.course_id = b.course_id');
	        $this->db->where('a.course_id', $id);
	        $query = $this->db->get();
	        //return $this->db->last_query();
	        return $query->result_array();  
	    } 	 */           	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_academic_year a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.academic_id', $id);
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
	          'startyear'=>$this->input->post('startyear'),      	          
	          'endyear'=>$this->input->post('endyear'), 
/*	          'contact'=>$this->input->post('contact'), 
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password')*/	                                  
	        );
	      $this->db->where('academic_id', $id);      
	      $this->db->update('tbl_academic_year',$field);
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
	       $this->db->where('academic_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_academic_year', $data);
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