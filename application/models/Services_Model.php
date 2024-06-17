<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Services_Model extends CI_Model
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
	        $id=$this->getMax('service_id','tbl_services');
	        $service_id=(int)$id[0]['service_id']+1;
	        $field=array(
	          'service_id'=> $service_id,
	          'name'=>$this->input->post('banner_name'), 
	          'description'=>$this->input->post('description'), 
	          'image'=>$_FILES['banner-image']['name'],	          
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_services',$field);
	        if ($this->db->affected_rows() >0)
	         {
	            return $service_id;
	         }
	         else
	         {
	            return false; 
	         }
	    } 

	   public function detailsSave()
	    {
	        $id=$this->getMax('detail_id','tbl_service_details');
	        $field=array(
	          'detail_id'=> (int)$id[0]['detail_id']+1,
	          'service_id'=>$this->input->post('service_id'), 
	          'details'=>$this->input->post('details'),           
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_service_details',$field);
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
	        $this->db->from('tbl_services a');
	        $this->db->where('a.flag', '1');
	        $this->db->order_by('a.service_id','desc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 

	   public function loadContactData()
	    { 
	        $this->db->from('tbl_services a');
	        $this->db->where_in('a.flag', ['1','2']);
	        $this->db->order_by('a.service_id','desc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    }	    	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_services a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.service_id', $id);
	        $query = $this->db->get();    	
	        if ($query->num_rows() > 0)
	         {
	           return $query->row();
	         }
	         else
	         {
	           return false;
	         }
	    }  

	   public function details_record($id)
	    {
	        $this->db->from('tbl_service_details a');
	        $this->db->where('a.service_id', $id);
	        $query = $this->db->get();    	
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
	      $id=$this->input->post('banner_id');
	      $field=array(
	          'name'=>$this->input->post('banner_name'), 
	          'description'=>$this->input->post('description'), 
	          'image'=>$_FILES['banner-image']['name']	                                  
	        );
	      $this->db->where('service_id', $id);      
	      $this->db->update('tbl_services',$field);
	      if ($this->db->affected_rows() >0)
	       {
		       $this->db->where('service_id', $id);
		       $this->db->delete('tbl_service_details');        	
        	   return $id;
	       }
	       else
	       {
	         return false;
	       }
	    }  

	   public function dataUpdateWithoutImg()
	    {
	      $id=$this->input->post('banner_id');
	      $field=array(
	          'name'=>$this->input->post('banner_name'), 
	          'description'=>$this->input->post('description')	 	                                  
	        );
	      $this->db->where('service_id', $id);      
	      $this->db->update('tbl_services',$field);
	      if ($this->db->affected_rows() >0)
	       {
		       $this->db->where('service_id', $id);
		       $this->db->delete('tbl_service_details');        	
        	   return $id;
	       }
	       else
	       {
	         return false;
	       }
	    } 	    

	   public function data_delete($id)
	    {
	       $this->db->where('service_id', $id);
	       $this->db->delete('tbl_services');
	          if ($this->db->affected_rows() > 0)
	           {
			       $this->db->where('service_id', $id);
			       $this->db->delete('tbl_service_details'); 	           	
	               return true;
	           }
	           else
	           {
	             return false;
	           }      
	    }  	    


  }


?>