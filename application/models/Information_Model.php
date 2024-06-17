<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Information_Model extends CI_Model
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
	        $id=$this->getMax('id','tbl_home_information');
	        $field=array(
	          'id'=>(int)$id[0]['id']+1,
	          'information'=>$this->input->post('banner_name'), 
	          //'description'=>$this->input->post('description'), 
	          //'image'=>$_FILES['banner-image']['name'],	          
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_home_information',$field);
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
	        $this->db->from('tbl_home_information a');
	        $this->db->where('a.flag', '1');
	        $this->db->order_by('a.id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_home_information a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.id', $id);
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
	          'information'=>$this->input->post('banner_name'), 
	          //'description'=>$this->input->post('description'), 
	          //'image'=>$_FILES['banner-image']['name']	                                  
	        );
	      $this->db->where('id', $id);      
	      $this->db->update('tbl_home_information',$field);
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
	       $this->db->where('id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_home_information', $data);
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