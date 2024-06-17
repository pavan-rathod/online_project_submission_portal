<?php

  defined('BASEPATH') OR exit('No direct script access allowed');

  /**
   * 
   */
  class Contact_Model extends CI_Model
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
	        $id=$this->getMax('id','tbl_contact');
	        $field=array(
	          'id'=>(int)$id[0]['id']+1,
	          'name'=>$this->input->post('name'), 
	          'contact'=>$this->input->post('contact'), 
	          'email'=>$this->input->post('email'), 
	          'service'=>$this->input->post('service'),
	          'description'=>$this->input->post('description')	          	          
	          );
	        $this->db->insert('tbl_contact',$field);
	        if ($this->db->affected_rows() >0)
	         {
	         	//sendCraftServiceMail($this->input->post('name'),$this->input->post('contact'),$this->input->post('email'),$this->input->post('service'),$this->input->post('description'));
	            return true;
	         }
	         else
	         {
	            return false; 
	         }
	    } 	

	   public function loadData()
	    { 
	        $this->db->from('tbl_contact a');
	        //$this->db->where('a.flag', '1');
	        $this->db->order_by('a.id','asc');
	        $query = $this->db->get();
	        return $query->result_array();  
	    } 

	   public function sendCraftServiceMail($name,$contact,$email,$service,$description)
	    {
           try{
              require 'Mail/phpmailer/PHPMailerAutoload.php';
              require 'Mail/phpmailer/class.smtp.php';
                $sub="GlobTech Solutions Contact Message";                           

                $msg = 'Hello Administrator, You have received contact request from : Applicant Name : '.$name.' Contact No  : '.$contact.' Email Id :'.$email.' Service Request :'.$service.' Description :'.$description.'  Requeste Date :'.date('Y-m-d');       

                //$msg="Respected Sir , Our team will send you your new password within 24 hours.Thank you.";

                $setArray=array('sales@globtechs.com');
                $toArray=array('sales@globtechs.com');
                $subArray=array($sub);
                $msgArray=array($msg);
                $setFromName=array('GlobTech Solutions');
                $setToName=array('GlobTech Solutions');
                $i=0;
                $flag=0;

                do{
                $mail = new PHPMailer;
                //$mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication
                $mail->Username = 'sales@globtechs.com';                 // SMTP username
                $mail->Password = 'globtechs.com';                        // SMTP password
                $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
                //$mail->Port = 587;    465   

                    $mail->setFrom($setArray[$i], $setFromName[$i]);
                    $mail->addAddress($toArray[$i], $setToName[$i] );    // Add a recipient
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject =$subArray[$i];
                    $mail->Body = $msgArray[$i];
                    $mail->AltBody =$msgArray[$i];

                    if(!$mail->send()) {
                      $flag=0;
                    } else {
                        $flag=1;
                    }
                    $i++;

                }while($i<1);

                  if($flag==1){
                      return 1;                                                                    
                  }
                  else{
                      return 0;
                  }
            }/*End of try*/
            catch(Exception $e){
              return 0;
            }/* End of catch*/  
	    } 	    	        	    	    

  }


?>