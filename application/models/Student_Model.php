<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Student_Model extends CI_Model
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
	        $id=$this->getMax('student_id','tbl_student');
	        $field=array(
	          'student_id'=>(int)$id[0]['student_id']+1,
	          'name'=>$this->input->post('name'), 
	          'email'=>$this->input->post('email'),           
	          'contact'=>$this->input->post('contact'), 
	          'address'=>$this->input->post('address'), 
	          'password'=>$this->input->post('password'),
	          'course_id'=>$this->input->post('course'),
	          'flag'=>'1'
	          );
	        $this->db->insert('tbl_student',$field);
	        if ($this->db->affected_rows() >0)
	         {
	            return true;
	         }
	         else
	         {
	            return false; 
	         }
	    } 

	   public function data_import()
	    {
			$File = $_FILES['banner-image']['tmp_name'];
            
			$row = 1;
			if (($handle = fopen($File, "r")) !== FALSE) {
			    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
			        $num = count($data);
			        //echo "<p> $num fields in line $row: <br /></p>\n";
			        $row++;
			        $name="";
			        $email="";
			        $contact="";
			        $pass="";
			        $course="";
			        for ($c=0; $c < $num; $c++) {
			            //echo $data[$c] . "<br />\n";
			            if($c==0)
			            	$name.=$data[$c];
			            if($c==1)
			            	$email.=$data[$c];
			            if($c==2)
			            	$contact.=$data[$c];
			            if($c==3)
			            	$pass.=$data[$c];			            				            				            
			            if($c==4)
			            	$course.=$data[$c];			            
			        }

			        $id=$this->getMax('student_id','tbl_student');
			        $field=array(
			          'student_id'=>(int)$id[0]['student_id']+1,
			          'name'=>$name, 
			          'email'=>$email,           
			          'contact'=>$contact, 
			          'address'=>'', 
			          'password'=>$pass,
			          'course_id'=>$course,
			          'flag'=>'1'
			          );
			        $this->db->insert('tbl_student',$field);			        
			    }
			    fclose($handle);
			}

			 if ($row >0)
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
	        $this->db->from('tbl_student a');
	        $this->db->where('a.flag', '1');
	        $this->db->join('tbl_course c', 'a.course_id = c.course_id');
	        $this->db->order_by('a.student_id','desc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 	  

	   public function loadStudentList()
	    { 
	        $this->db->from('tbl_student a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.course_id', $_SESSION['course_id']);
	        //$this->db->where_not_in('a.student_id', $_SESSION['id']);
	        $this->db->join('tbl_course c', 'a.course_id = c.course_id');
	        $this->db->order_by('a.student_id','asc');
	        $query = $this->db->get();
	        //return $query->get_last_query();  
	        return $query->result_array();  
	    } 		          	    

	   public function single_record($id)
	    {
	        $this->db->from('tbl_student a');
	        $this->db->where('a.flag', '1');
	        $this->db->where('a.student_id', $id);
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
	          'password'=>$this->input->post('password'),
	          'course_id'=>$this->input->post('course'),	                                  
	        );
	      $this->db->where('student_id', $id);      
	      $this->db->update('tbl_student',$field);
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
	       $this->db->where('student_id', $id);
	       $data=array(
	          'flag'=>'0'
	        );
	       $this->db->update('tbl_student', $data);
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