$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    /*loadCourse();*/
    loadData();    

    $(".searchData").select2({
        dropdownParent: $("#save-banner"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Technology Form");
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
        //var course_id = $('#course').val();
        var startyear = $('#txt_startyear').val();
        var endyear = $('#txt_endyear').val();
/*        var email = $('#txt_email').val();
        var address = $('#txt_address').val();
        var password = $('#txt_password').val(); */       
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
              if (startyear != "") {
                if (endyear != "") { 
/*                  if (email != "") {
                    if (address != "") {    
                        if (password != "") { */                 
                              if (action == "Save") {
                                   $('#loadingDiv').show();
                                   $.post(base_url+'AcademicYear/dataSave',{endyear: endyear,startyear:startyear/*,email:email,address:address,password:password*/},function(res){
                                        if (res>0)
                                         {
                                              loadData();                                                                                  
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Academic Year Saved successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Save Academic Year.........!", "error");
                                         }
                                  });                            
                              }
                              if (action == "Update") {
                                  var id = $('#txt_id').val();
                                  $('#loadingDiv').show();  
                                     $.post(base_url+'AcademicYear/dataUpdate',{id:id,endyear:endyear,startyear:startyear/*,email:email,address:address,password:password*/},function(res){
                                          if (res>0)
                                           {
                                                loadData();                                                                                  
                                                swal({
                                                    title: "Well Done..!",
                                                    text: "Academic Year Updated successfully.....!",
                                                    type: "success",
                                                    timer: 1000
                                                });
                                                $('.form-control').val('');
                                                $('#save-banner').modal('hide');                                                                       
                                           }
                                           else
                                           { 
                                               swal("Sorry..!", "Unable to Update Academic Year .........!", "error");
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
                      } 
                    } else {
                          $('#save-result').html("<br>Please Enter Email Id .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#txt_banner_name').focus();                
                    }  */                            
                } else {
                      $('#save-result').html("<br>Please Enter End Year .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_save').prop('disabled', false);
                      $('#txt_description').focus();                
                } 
              } else {
                    $('#btn_save').prop('disabled', false);
                    $('#save-result').html("<br>Please Enter Start Year.....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#txt_name').focus();                
              }           
    });


});


    //Load all District
   /* function loadCourse(ele,id) {
        $('#course').html('');
        $('#course').append('<option value="" selected>--- SELECT COURSE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Course/loadData',
            data: {state_id:ele},
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
    }*/


/* Load All form Data */
   function loadData()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'AcademicYear/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['startyear']+"</td>";
                  html += "<td>"+data['data'][i]['endyear']+"</td>";
 /*                 html += "<td>"+data['data'][i]['contact']+"</td>";
                  html += "<td>"+data['data'][i]['address']+"</td>";
                  html += "<td>"+data['data'][i]['password']+"</td>";*/                                    
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['academic_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['academic_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
            url: base_url+'AcademicYear/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#txt_id').val(data['single']['academic_id']);
                $('#txt_startyear').val(data['single']['startyear']);
                $('#txt_endyear').val(data['single']['endyear']);
                //$('#course').val(data['single']['course_id']).trigger('change.select2');
/*                $('#txt_email').val(data['single']['email']);
                $('#txt_address').val(data['single']['address']);
                $('#txt_password').val(data['single']['password']);*/ 
                $("#title").html("Update Academic Year");
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
            text: "You will not be able to recover this Academic Year.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'AcademicYear/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Academic Year Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Academic Year .........!", "error");
                        }
                    }
                });
            }
        });
    }
