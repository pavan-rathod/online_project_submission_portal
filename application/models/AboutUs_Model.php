<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class AboutUs_Model extends CI_Model
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
	        $id=$this->getMax('id','tbl_about_information');
	        $about_id=(int)$id[0]['id']+1;
	        $field=array(
	          'id'=>$about_id,
	          'main_point'=>$this->input->post('banner_name'), 
	          'details'=>$this->input->post('description'), 
	          //'image'=>$_FILES['banner-image']['name'],	          
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_about_information',$field);
	        if ($this->db->affected_rows() >0)
	         {
	            return $about_id;
	         }
	         else
	         {
	            return false; 
	         }
	    } 

	   public function detailsSave()
	    {
	        $id=$this->getMax('detail_id','tbl_about_details');
	        $field=array(
	          'detail_id'=> (int)$id[0]['detail_id']+1,
	          'about_id'=>$this->input->post('service_id'), 
	          'details'=>$this->input->post('details'),           
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_about_details',$field);
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
	        $this->db->from('tbl_about_information a');
	        $this->db->where('a.flag', '1');
	        $this->db->order_by('a.id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_about_information a');
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

	   public function details_record($id)
	    {
	        $this->db->from('tbl_about_details a');
	        $this->db->where('a.about_id', $id);
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
	      $id=$this->input->post('id');
	      $field=array(
	          'main_point'=>$this->input->post('banner_name'), 
	          'details'=>$this->input->post('description'), 
	          //'image'=>$_FILES['banner-image']['name']	                                  
	        );
	      $this->db->where('id', $id);      
	      $this->db->update('tbl_about_information',$field);
	      if ($this->db->affected_rows() >0)
	       {
		       $this->db->where('about_id', $id);
		       $this->db->delete('tbl_about_details');        	
        	   return $id;
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
	       $this->db->update('tbl_about_information', $data);
	          if ($this->db->affected_rows() > 0)
	           {
			       $this->db->where('about_id', $id);
			       $this->db->delete('tbl_about_details'); 	           	
	               return true;	           	
	           }
	           else
	           {
	             return false;
	           }      
	    }  	    


  }


?>