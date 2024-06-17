$(document).ready(function(){

/*Type Validate*/  
  $('#type').on('focusout',function(){        
     if($('#type').val() == '')
     {
        $('#username-validate' ).html('Please Select Member Type.........!').css('color','red');
        setTimeout(function (){$('#username-validate').html('');},3000);
        $('#type').focus();      
     }
  }); 
/*Username Validate*/  
  $('#username').on('focusout',function(){        
     if($('#username').val() == '')
     {
        $('#username-validate' ).html('Please enter Username.........!').css('color','red');
        setTimeout(function (){$('#username-validate').html('');},3000);
        $('#username').focus();      
     }
  }); 
/*Username Password*/  
  $('#password').on('focusout',function(){        
     if($('#password').val() == '')
     {
        $('#password-validate' ).html('Please enter Password.........!').css('color','red');
        setTimeout(function (){$('#password-validate').html('');},3000);
        $('#password').focus();      
     }
  });   
/* Save Video Form Data */ 
  $('#btnLogin').on('click',function(){
      var type = $('#type').val();
      var username = $('#username').val();
      var password = $('#password').val();
      if (type!='')
       {      
          if (username!='')
           {
             if (password != '')
              {
                   $.post(base_url+'Admin/memberLogDetails',{type:type,username:username,password:password},function(res){
                   	  console.log(res);
                      if (res == '1')
                         {   
                              swal({
                                  title: "Well Done..!",
                                  text: "Login Successfully..........!",
                                  type: "success",
                                  timer: 1000
                              });                                
                             $('.form-control').val('');
                             window.open(base_url+'Admin/dashboard','_SELF');
                         }
                         else
                         { 
                             swal("Sorry..!", "Invalid Credentials.........!", "error");
                             $('.form-control').val('');
                         }
                      });
              }
              else
              {
                  $('#password-validate' ).html('Please enter Password .........!');
                  setTimeout(function (){$('#password-validate').html('');},3000);
                  $("#type-validate").focus();
              }
          }
          else
          {
            $('#username-validate' ).html('Please enter Username.........!').css('color','red');
            setTimeout(function (){$('#username-validate').html('');},3000);
            $('#username').focus();
          } 
        }
        else
        {
          $('#username-validate' ).html('Please Select Member Type.........!').css('color','red');
          setTimeout(function (){$('#username-validate').html('');},3000);
          $('#username').focus();
        }             
  }); 

});