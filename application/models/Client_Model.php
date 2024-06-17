<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Client_Model extends CI_Model
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
	        $id=$this->getMax('client_id','tbl_client_portfolio');
	        $field=array(
	          'client_id'=>(int)$id[0]['client_id']+1,
	          //'data'=>$this->input->post('banner_name'), 
	          'data'=>$this->input->post('description'), 
	          'path'=>$_FILES['banner-image']['name'],	          
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_client_portfolio',$field);
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
	        $this->db->from('tbl_client_portfolio a');
	        $this->db->where('a.flag', '1');
	        $query = $this->db->get();
	         $this->db->order_by('a.client_id','asc');
	        return $query->result_array();  
	    } 	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_client_portfolio a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.client_id', $id);
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
	      $id=$this->input->post('banner_id');
	      $field=array(
	          //'name'=>$this->input->post('banner_name'), 
	          'data'=>$this->input->post('description'), 
	          'path'=>$_FILES['banner-image']['name']	                                  
	        );
	      $this->db->where('client_id', $id);      
	      $this->db->update('tbl_client_portfolio',$field);
	      if ($this->db->affected_rows() >0)
	       {
	         return true;
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
	          //'name'=>$this->input->post('banner_name'), 
	          'data'=>$this->input->post('description')	 	                                  
	        );
	      $this->db->where('client_id', $id);      
	      $this->db->update('tbl_client_portfolio',$field);
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
	       $this->db->where('client_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_client_portfolio', $data);
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