<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Video_Model extends CI_Model
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
	        $id=$this->getMax('video_id','tbl_video');
	        $field=array(
	          'video_id'=>(int)$id[0]['video_id']+1,
	          'name'=>$this->input->post('banner_name'), 
	          //'thumbnail'=>$img, 
	          'path'=>$this->input->post('img'),	          
              'flag'=>'1'
	          );
	        $this->db->insert('tbl_video',$field);
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
	        $this->db->from('tbl_video a');
	        $this->db->where('a.flag', '1');
	        $this->db->order_by('a.video_id','desc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	        	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_video a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.video_id', $id);
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
	          'name'=>$this->input->post('banner_name'), 
	          //'thumbnail'=>$img, 
	          'path'=>$this->input->post('img')	                                  
	        );
	      $this->db->where('video_id', $id);      
	      $this->db->update('tbl_video',$field);
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
	       $this->db->where('video_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_video', $data);
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