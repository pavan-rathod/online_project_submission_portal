$(document).ready(function(){
  
   // $('#old_password').focus();
    $('#old_password').parent().addClass('focused');

    $('#old_password').on('blur',function(){
        var old=$("#old_password").val();
        if (old!="")
         {
	        $.ajax({
	            type:'POST',
	            data:{old:old},
	            url:base_url+"Mainpage/checkPassword",
	            success:function(res){
	            	  (res==1 ? $('#check').val("1"):$('#check').val("0"));
	                  if (res==0)
	                   {
	                   	 swal("Sorry..!", "Please Enter Correct Password .........!", "warning");
	                   	 $("#old_password").val("");
	                   	 $("#old_password").focus();
	                   }
	            }
	        });
         } 
         else 
         {
         	swal("Sorry..!", "Please Enter Old Password .........!", "error");
         	$("#old_password").val("");
         	$("#old_password").focus();
         }
    });  

    $('#new_password').on('blur',function(){
        var npass=$("#new_password").val();
        if (npass=="")
         {
         	swal("Sorry..!", "Please Enter New Password .........!", "error");
         	$("#new_password").val("");
         	$("#new_password").focus();
         } 
    });  

    $('#confirm_password').on('blur',function(){
        var npass=$("#new_password").val();
        var cpass=$("#confirm_password").val();
        if (npass!=cpass)
         {
         	swal("Sorry..!", "New Password and Confirm Password must be Same .........!", "warning");
         	$("#confirm_password").val("");
         	$("#confirm_password").focus();
         } 
    }); 

    $('#resetPassword').on('click',function(){
        var old=$("#old_password").val();
        var npass=$("#new_password").val();
        var cpass=$("#confirm_password").val();
        var check=$("#check").val();
        if (old!="")
         {
            if (npass!="")
             {
             	if (cpass!="")
             	 {
             	 	if (check=="1")
             	 	 {
	             	 	$.ajax({
	             	 		 type:'POST',
	             	 		 data:{npass:npass},
	             	 		 url:base_url+"Mainpage/resetPassword",
	             	 		 success:function(res){
	             	 		 	console.log(res);
	             	 		 	if (res==1)
	             	 		 	 {
                                    swal({
                                        title: "Well Done..!",
                                        text: "Password Changed Successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });	             	 		 	 	
							        $("#old_password").val("");
							        $("#new_password").val("");
							        $("#confirm_password").val("");
	             	 		 	 } 
	             	 		 	 else
	             	 		 	 {
	             	 		 	 	swal("Sorry..!", "Unable to Change Password .........!", "error");
	             	 		 	 }
	             	 		 }
	             	 	});
             	 	 } 
             	 	 else 
             	 	 {
	                   	 swal("Sorry..!", "Please Enter Correct Password .........!", "warning");
	                   	 $("#old_password").val("");
	                   	 $("#old_password").focus();
             	 	 }
             	 } 
             	 else
             	 {
		         	swal("Sorry..!", "Please Confirm New Password .........!", "error");
		         	$("#confirm_password").val("");
		         	$("#confirm_password").focus();             	 	
             	 }
             } 
             else
             {
	         	swal("Sorry..!", "Please Enter New Password .........!", "error");
	         	$("#new_password").val("");
	         	$("#new_password").focus();
             }
         }
         else
         {
         	swal("Sorry..!", "Please Enter Old Password .........!", "error");
         	$("#old_password").val("");
         	$("#old_password").focus();
         }
    }); 

    $('#passwordClear').on('click',function(){
        $("#old_password").val("");
        $("#new_password").val("");
        $("#confirm_password").val("");
    });      

});

