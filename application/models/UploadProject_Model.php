<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class UploadProject_Model extends CI_Model
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
	        $id=$this->getMax('previous_project_id','tbl_upload_previous_project');
	        $field=array(
	          'previous_project_id'=>(int)$id[0]['previous_project_id']+1,
	          'academic_id'=>$this->input->post('year'),      	          
	          'technology_id'=>$this->input->post('technology'), 
              'project_name'=>$this->input->post('title'),           
	          'project_file'=>$_FILES['banner-image']['name'], 
	          /*	'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password'),*/
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_upload_previous_project',$field);
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
	        $this->db->from('tbl_upload_previous_project a');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_academic_year b', 'a.academic_id = b.academic_id');
	        $this->db->join('tbl_technology c', 'a.technology_id = c.tech_id');
	        $this->db->join('tbl_course d', 'd.course_id = c.course_id');
	        $this->db->order_by('a.previous_project_id','desc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	

	   public function loadTech($id)
	    { 
	        $this->db->from('tbl_upload_previous_project a');
	        $this->db->where('a.flag', '1');
	        //$this->db->join('tbl_course b', 'a.course_id = b.course_id');
	        $this->db->where('a.previous_project_id', $id);
	        $query = $this->db->get();
	        //return $this->db->last_query();
	        return $query->result_array();  
	    } 	            	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_upload_previous_project a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.previous_project_id', $id);
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
	          'academic_id'=>$this->input->post('academic_id'),           
	          'technology_id'=>$this->input->post('technology_id'), 
	          'project_name'=>$this->input->post('project_name'), 
	          'project_file'=>$this->input->post('project_file'), 
	          /*'password'=>$this->input->post('password')*/	                                  
	        );
	      $this->db->where('previous_project_id', $id);      
	      $this->db->update('tbl_upload_previous_project',$field);
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
	       $this->db->where('previous_project_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_upload_previous_project', $data);
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