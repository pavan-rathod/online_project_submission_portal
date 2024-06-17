
   /* Check User Authentication before edit Data */
 
   function checkAuthentication(ele,page)
     {
        swal({
            title: "Authentication Password !!!",
            text: "Please Enter Authentication Password Before Update :",
            type: "input",
            inputType: "password",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Authentication Password"
            }, function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write password!"); return false
                }
               if (inputValue != "")
                {     
                    var code=$(ele).attr('id');
                    var id=parseInt(code);   
                    var url=((page === 'sales' || page === 'purchase' || page === 'quotation') ? base_url+"report/"+page+"/"+"edit/"+id : base_url+page+"/"+page.toLowerCase()+"_edit/"+id);                        
                    $.post(base_url+'Mainpage/editUser',{isedit:inputValue},function(res){
                          (res==1 ? window.location.href=url : swal("Sorry!", "Please Enter Valid Password....!", "error"));
                    });                                        
                }
        });         
     } 

   /* Check print format brfore print Data */
 
   function checkPrintFormat(ele,page)
     {
        swal({
            title: "Select Printable Format !!!",
            text: "Please Select Format Before Print Bill :",
            showCancelButton: true,
            animation: "slide-from-top",
            cancelButtonColor: '#4CAF50', 
            cancelButtonText: "NON-GST", 
            confirmButtonColor: '#D41A27',            
            confirmButtonText: "GST",            
            closeOnConfirm: false,
            closeOnCancel: false
            }, function(isConfirm){   
                var code=$(ele).attr('id');
                var id=parseInt(code); 
                var pageURL = $(location).attr("href");
                var url=(pageURL.indexOf("return") > -1 ? base_url+"report/print/return/"+page+"/"+id+"/" : base_url+"report/print/"+page+"/"+id+"/");               
                var gst='';              
                if (isConfirm) 
                  { 
                    gst=1;
                    var url=url+""+gst;
                    window.location.href=url;                      
                  } 
                else   
                  { 
                    gst=0;
                    var url=url+""+gst;
                    window.location.href=url;  
                  }
        });         
     }      
  