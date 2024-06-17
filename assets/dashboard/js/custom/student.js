$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadCourse();
    loadData();    
 
    $(".searchData").select2({
        dropdownParent: $("#save-banner"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Student Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-banner').modal('show');
        $('#btn_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
        $('#bannerPhoto').attr('src','')
    });

    $("#import_student").on('click', function () {
        $("#title").html("Import Student Form");
        $('.form-control').val('');
        $("#btn_saveStudent").html("<i class='ace-icon fa fa-check'></i>&nbsp;Import Student");
        $('#save_student').modal('show');
        $('#btn_saveStudent').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#bannerPhoto').attr('src','')
    });    

    $('#btn_saveStudent').on('click', function (event) {
        event.preventDefault();
        var img = $('#banner-image').val();      
         if (img != "") {
                $('#banner-image').upload(base_url+'Student/dataUpload',{img:img},function(res){
                    console.log(res);
                    if (res!="")
                     {
                        loadData();                                                                                  
                        swal({
                            title: "Well Done..!",
                            text: "Student CSV File Data Imported successfully.....!",
                            type: "success",
                            timer: 1000
                        });
                        $('.form-control').val('');
                        $('#save_student').modal('hide');                                                                       
                     }
                     else
                     { 
                         swal("Sorry..!", "Unable to Import Student Data.........!", "error");
                     }
                  });  
          }else{
                $('#save-result').html("<br>Please Select Student File .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_banner_save').prop('disabled', false);
                $('#banner-image').focus();                                    
          }                             
    });   

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_save').on('click', function (event) {
        event.preventDefault();
        var name = $('#txt_name').val();
        var contact = $('#txt_contact').val();
        var email = $('#txt_email').val();
       // var address = 'test data';//$('#txt_address').val();
        var password = $('#txt_password').val();       
        var course = $('#course').val();        
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
              if (name != "") {
                if (contact != "") { 
                  if (email != "") {
                   /* if (address != "") {    */
                        if (password != "") {                  
                              if (action == "Save") {
                                   $('#loadingDiv').show();
                                   $.post(base_url+'Student/dataSave',{name: name,contact:contact,email:email,address:address,password:password,course:course},function(res){
                                        if (res>0)
                                         {
                                              loadData();                                                                                  
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Student Saved successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Save Student.........!", "error");
                                         }
                                  });                            
                              }
                              if (action == "Update") {
                                  var id = $('#txt_id').val();
                                  $('#loadingDiv').show();  
                                     $.post(base_url+'Student/dataUpdate',{id:id,name: name,contact:contact,email:email,address:address,password:password,course:course},function(res){
                                          if (res>0)
                                           {
                                                loadData();                                                                                  
                                                swal({
                                                    title: "Well Done..!",
                                                    text: "Student Updated successfully.....!",
                                                    type: "success",
                                                    timer: 1000
                                                });
                                                $('.form-control').val('');
                                                $('#save-banner').modal('hide');                                                                       
                                           }
                                           else
                                           { 
                                               swal("Sorry..!", "Unable to Update Student .........!", "error");
                                           }
                                    });                       
                              }
                          } else {
                                $('#save-result').html("<br>Please Enter Password .....!");
                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                $('#btn_save').prop('disabled', false);
                                $('#txt_description').focus();                
                          }                               
                     /* } else {
                            $('#save-result').html("<br>Please Enter Address .....!");
                            setTimeout(function () { $('#save-result').html(' '); }, 3000);
                            $('#btn_save').prop('disabled', false);
                            $('#txt_description').focus();                
                      } */
                    } else {
                          $('#save-result').html("<br>Please Enter Email Id .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#txt_banner_name').focus();                
                    }                              
                } else {
                      $('#save-result').html("<br>Please Enter Contact Number .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_save').prop('disabled', false);
                      $('#txt_description').focus();                
                } 
              } else {
                    $('#save-result').html("<br>Please Enter Name .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#txt_banner_name').focus();                
              }           
    });


});

    //Load all District
    function loadCourse(ele,id) {
        $('#course').html('');
        $('#course').append('<option value="" selected>--- SELECT COURSE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Course/loadData',
            data: {},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['course_id']) {
                         $('#course').append('<option value=' + data['data'][i]['course_id'] + ' selected>' + data['data'][i]['course'].toUpperCase() + '</option>');
                    }else{
                         $('#course').append('<option value=' + data['data'][i]['course_id'] + '>' + data['data'][i]['course'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }

/* Load All form Data */
   function loadData()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'Student/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['name']+"</td>";
                  html += "<td>"+data['data'][i]['contact']+"</td>";                  
                  html += "<td>"+data['data'][i]['email']+"</td>";
                  //html += "<td>"+data['data'][i]['address']+"</td>";
                  html += "<td>"+data['data'][i]['password']+"</td>";    
                  html += "<td>"+data['data'][i]['course']+"</td>";                                    
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['student_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['student_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadBanner').html(html);
              $('#dataTable-Banner').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by banner_id
    function getData(ele) {
        $('#loadingDiv').hide();
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Student/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#txt_id').val(data['single']['student_id']);
                $('#txt_name').val(data['single']['name']);
                $('#txt_contact').val(data['single']['contact']);
                $('#txt_email').val(data['single']['email']);
               // $('#txt_address').val(data['single']['address']);
                $('#txt_password').val(data['single']['password']); 
                $('#course').val(data['single']['course_id']).trigger('change.select2');
                $("#title").html("Update Student");
                $("#btn_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-banner').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Tehsil
    function deleteData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Student.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Student/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Student Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Student .........!", "error");
                        }
                    }
                });
            }
        });
    }
