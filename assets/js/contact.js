$(document).ready(function () {
 
    loadService();  
    //$('#service').append('<option value="Other">OTHER</option>');  

    $('#service').on('change',function(){
        var service = $("#service").val();
        if (service != "") {
           var data = $("#service option:selected").text();
           var i=0;
           if ($('#selectedServices').text().indexOf(data) > -1) {
              alert("This Service is Already Selected........!!!");
           } else {
              i+=1;
              $('#selectedServices').append("<span class='ser'>"+data+"&nbsp&nbsp;<span class='fa fa-trash' id=id_"+i+" onclick='getData(this)' title='Delete'> </span>  &nbsp&nbsp;<br>");
           }

        } else {
           alert("Please Select Service........!!!");
           $("#service").focus();
        }
        //var service = $("#service option:selected").text();
    });

    //Code to save and update Tehsil
    $('#btn_banner_save').on('click', function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var contact = $('#contact').val();
        var email = $('#email').val();
        var data = $('#selectedServices').html();
        var service = data.substring(0, data.length-1);
        service = service.trim();
        //alert(service);        
        var description = $('#description').val();

            $('#btn_banner_save').prop('disabled', true);
            //var action = $.trim($('#btn_banner_save').text());
              if (name != "") {
                if (email != "") { 
                   if (service != "") { 
                        //if (action == "Save") {
                            $.ajax({
                                type: 'POST',
                                url: base_url+'Mainpage/saveData',
                                data: { name:name, contact:contact, email: email, service:service, description:description},
                                success: function (res) {
                                    if (res == 1) {
                                        alert("Contact Message Save Successfully .....!");
                                        $('.form-control').val('');
                                        $('#selectedServices').html('');
                                        $('#btn_banner_save').prop('disabled', false);
                                    }
                                    else {
                                        alert("Unable to Save Contact Details .....!");
                                    }
                                },
                                complete: function () {
                                    $('#loadingDiv').hide();
                                }
                            });                            
                        //}
                    } else {
                      $('#save-result').html("<br>Please Select Service .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_banner_save').prop('disabled', false);
                      $('#service').focus();                
                    } 
                } else {
                      $('#save-result').html("<br>Please Enter Email Address .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_banner_save').prop('disabled', false);
                      $('#email').focus();                
                } 

              } else {
                    $('#save-result').html("<br>Please Enter Name .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_banner_save').prop('disabled', false);
                    $('#name').focus();                
              }           
    });

});

    
    function getData(ele){
       $(ele).parents('span').remove();
    }

    //Load all Trust
    function loadService() {
        $('#service').html('');
        $('#service').append('<option value="" selected>--- SELECT SERVICE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Services/loadContactData',
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['data']['length']; i++){
                    $('#service').append('<option value=' + data['data'][i]['service_id'] + '>' + data['data'][i]['name'].toUpperCase() + '</option>');
                }        
            }
        });
       //$('#service').append('<option value="Other">OTHER</option>'); 
    }
