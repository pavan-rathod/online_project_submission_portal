$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadProject();
    loadTeacher();    
    loadData();    

    $(".searchData").select2({
        dropdownParent: $("#save-banner"),
        width: '100%'
    });  

    /*$('#course').on('change',function(){
         var course_id = $('#course').val();
         loadTechnology(course_id,'');
    }); */     

    $("#save_modal").on('click', function () {
        $("#title").html("Assign Project To Teacher Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-banner').modal('show');
        $('#btn_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
        $('#bannerPhoto').attr('src','')
    });

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_save').on('click', function (event) {
        event.preventDefault();
        var teacher_id = $('#teacher').val();
        var project = $('#course').val();
        //var technology = $('#technology').val();
/*        var address = $('#txt_address').val();
        var password = $('#txt_password').val(); */       
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
              if (teacher_id != "") {
                if (course != "") { 
                  //if (technology != "") {
 /*                   if (address != "") {    
                        if (password != "") { */                 
                              if (action == "Save") {
                                   $('#loadingDiv').show();
                                   $.post(base_url+'AssignProject/dataSave',{teacher_id: teacher_id,project:project/*,technology:technology,address:address,password:password*/},function(res){
                                        if (res>0)
                                         {
                                              loadData();                                                                                  
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Project Assigned successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Assign Project.........!", "error");
                                         }
                                  });                            
                              }
                              if (action == "Update") {
                                  var id = $('#txt_id').val();
                                  $('#loadingDiv').show();  
                                     $.post(base_url+'AssignProject/dataUpdate',{id:id,teacher_id: teacher_id,project:project/*,technology:technology,email:email,address:address,password:password*/},function(res){
                                          if (res>0)
                                           {
                                                loadData();                                                                                  
                                                swal({
                                                    title: "Well Done..!",
                                                    text: "Project Assignment Updated successfully.....!",
                                                    type: "success",
                                                    timer: 1000
                                                });
                                                $('.form-control').val('');
                                                $('#save-banner').modal('hide');                                                                       
                                           }
                                           else
                                           { 
                                               swal("Sorry..!", "Unable to Update Project Assignment .........!", "error");
                                           }
                                    });                       
                              }
/*                          } else {
                                $('#save-result').html("<br>Please Enter Password .....!");
                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                $('#btn_save').prop('disabled', false);
                                $('#txt_description').focus();                
                          }                               
                      } else {
                            $('#save-result').html("<br>Please Enter Address .....!");
                            setTimeout(function () { $('#save-result').html(' '); }, 3000);
                            $('#btn_save').prop('disabled', false);
                            $('#txt_description').focus();                
                      } */ 
                    /*} else {
                          $('#save-result').html("<br>Please Select Technology .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#txt_banner_name').focus();                
                    } */                            
                } else {
                      $('#save-result').html("<br>Please Select Project .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_save').prop('disabled', false);
                      $('#txt_description').focus();                
                } 
              } else {
                    $('#btn_save').prop('disabled', false);
                    $('#save-result').html("<br>Please Select Teacher Name .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#txt_name').focus();                
              }           
    });


});


    //Load all District
    function loadProject(ele,id) {
        $('#course').html('');
        $('#course').append('<option value="" selected>--- SELECT PROJECT ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'ProjectRegistration/loadAllProjectData',
            data: {state_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['registration_id']) {
                         $('#course').append('<option value=' + data['data'][i]['registration_id'] + ' selected>' + data['data'][i]['project_title'].toUpperCase() + '</option>');
                    }else{
                         $('#course').append('<option value=' + data['data'][i]['registration_id'] + '>' + data['data'][i]['project_title'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }

    //Load all District
  /*  function loadTechnology(ele,id) {
        $('#technology').html('');
        $('#technology').append('<option value="" selected>--- SELECT TECHNOLOGY ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Technology/loadTech',
            data: {id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['tech_id']) {
                         $('#technology').append('<option value=' + data['data'][i]['tech_id'] + ' selected>' + data['data'][i]['technology'].toUpperCase() + '</option>');
                    }else{
                         $('#technology').append('<option value=' + data['data'][i]['tech_id'] + '>' + data['data'][i]['technology'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }  */  

    //Load all District
    function loadTeacher(ele,id) {
        $('#teacher').html('');
        $('#teacher').append('<option value="" selected>--- SELECT TEACHER ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Teacher/loadData',
            data: {},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['teacher_id']) {
                         $('#teacher').append('<option value=' + data['data'][i]['teacher_id'] + ' selected>' + data['data'][i]['name'].toUpperCase() + '</option>');
                    }else{
                         $('#teacher').append('<option value=' + data['data'][i]['teacher_id'] + '>' + data['data'][i]['name'].toUpperCase() + '</option>'); 
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
         $.post(base_url+'AssignProject/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['teacher']+"</td>";
                  html += "<td>"+data['data'][i]['project_title']+"</td>";
                  html += "<td>"+data['data'][i]['student']+"</td>";
 /*                
                  html += "<td>"+data['data'][i]['address']+"</td>";
                  html += "<td>"+data['data'][i]['password']+"</td>";*/                                    
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['assign_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['assign_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
            url: base_url+'AssignProject/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $('#txt_id').val(data['single']['assign_id']);
               $('#teacher').val(data['single']['teacher_id']).trigger('change.select2');
               $('#course').val(data['single']['project_id']).trigger('change.select2');
               //loadTechnology(data['single']['course_id'],data['single']['tech_id']);
              // $('#technology').val(data['single']['tech_id']).trigger('change.select2');
/*                $('#txt_email').val(data['single']['email']);
                $('#txt_address').val(data['single']['address']);
                $('#txt_password').val(data['single']['password']);*/ 
                $("#title").html("Update Project Assignment");
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
            text: "You will not be able to recover this Project Assignment.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'AssignProject/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Project Assignment Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Project Assignment .........!", "error");
                        }
                    }
                });
            }
        });
    }
