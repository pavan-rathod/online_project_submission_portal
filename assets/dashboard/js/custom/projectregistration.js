$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadCourse();
    loadStudent();
    loadData();    
 
    $(".searchData").select2({
        dropdownParent: $("#save-banner"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Project Registration Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-banner').modal('show');
        $('#btn_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
        $('#bannerPhoto').attr('src','')
    });

    $('#add_multiple_work').on('click',function(){
        var id=$('#student').val();
        var name=$("#student option:selected").text();
        if (id!='') {
            var html = "";
            var i = ($("#loadList tr").length > 0) ? $('#loadList tr:last').attr('id') : 0;
            i = (i != 0) ? parseInt(i.substring(4)) + 1 : 1;
            html += "<tr id=trid" + i + ">";
            html += "<td>" + i + "</td>";
            html += "<td id=tdid" + i + ">" + name + "</td>";
            html += "<td class=center><input type='hidden' value='"+id+"' id=st_"+i+"><a class='btn btn-sm btn-danger'  id=" + i + "l onclick='rowDelete(this)' ><i class='glyphicon glyphicon-trash'></i></a></td>";
            html += "</tr>";
            $('#loadList').append(html);
        }else{
          alert("Select Student.....!!");
        }
    });


    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_save').on('click', function (event) {
        event.preventDefault();
        var tech = $('#course').val();
        var name = $('#txt_name').val();
        var img = $('#banner-image').val();

            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
              if (tech != "") {
                if (name != "") { 
                  /*if (company != "") {       */          
                          if (action == "Save") {
                             if (img != "") {
                                    $('#banner-image').upload(base_url+'ProjectRegistration/dataSave',{tech:tech,name:name},function(res){
                                        if (res!="")
                                         {
                                         
                                              if ($("#loadList tr").length > 0) {
                                                    var flag = "";
                                                    $('#loadList tr').each(function () {
                                                        var id = $(this).attr('id');
                                                        id = id.substring(4);
                                                        var student_id = $('#st_' + id).val();
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: base_url+'ProjectRegistration/detailsSave',
                                                            data: { registration_id: res, student_id: student_id },
                                                            success: function (res) {
                                                            }
                                                        });
                                                    });
                                                        if (res != "") {
                                                            swal({
                                                                title: "Well Done..!",
                                                                text: "Project Registrations Saved successfully.....!",
                                                                type: "success",
                                                                timer: 1000
                                                            });
                                                            $('.form-control').val('');
                                                            $('#item-code-form').modal('hide');
                                                        }
                                              } else {
                                                        $('#student').focus();
                                                        swal({
                                                            title: "Sorry..!",
                                                            text: "Please Select Student .......!!!",
                                                            type: "error",
                                                            timer: 1000
                                                        });
                                              }                                          

                                              loadData();                                                                                  
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Project Registration Saved successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Save Project Registration.........!", "error");
                                         }
                                      });  
                                  /* $('#loadingDiv').show();
                                   $('#banner-image').upload(base_url+'ProjectRegistration/dataSave',{tech: tech,name:name},function(res){
                                         console.log("Response: "+res);
                                        if (res!="")
                                         {
                                         
                                              if ($("#loadList tr").length > 0) {
                                                    var flag = "";
                                                    $('#loadList tr').each(function () {
                                                        var id = $(this).attr('id');
                                                        id = id.substring(4);
                                                        var student_id = $('#st_' + id).val();
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: base_url+'ProjectRegistration/detailsSave',
                                                            data: { registration_id: res, student_id: student_id },
                                                            success: function (res) {
                                                            }
                                                        });
                                                    });
                                                        if (res != "") {
                                                            swal({
                                                                title: "Well Done..!",
                                                                text: "Project Registrations Saved successfully.....!",
                                                                type: "success",
                                                                timer: 1000
                                                            });
                                                            $('.form-control').val('');
                                                            $('#item-code-form').modal('hide');
                                                        }
                                              } else {
                                                        $('#student').focus();
                                                        swal({
                                                            title: "Sorry..!",
                                                            text: "Please Select Student .......!!!",
                                                            type: "error",
                                                            timer: 1000
                                                        });
                                              }                                          

                                              loadData();                                                                                  
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Project Registration Saved successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Save Project Registration.........!", "error");
                                         }
                                  }); */
                              }else{
                                    $('#save-result').html("<br>Please Select Project Synopsis .....!");
                                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                    $('#btn_banner_save').prop('disabled', false);
                                    $('#banner-image').focus();                                    
                              }                             
                          }
                          if (action == "Update") {
                              var id = $('#txt_id').val();
                              $('#loadingDiv').show();  
                                 $.post(base_url+'ProjectRegistration/dataUpdate',{id:id,tech: tech,name:name,company:company},function(res){
                                      if (res>0)
                                       {
                                            loadData();                                                                                  
                                            swal({
                                                title: "Well Done..!",
                                                text: "Project Registration Updated successfully.....!",
                                                type: "success",
                                                timer: 1000
                                            });
                                            $('.form-control').val('');
                                            $('#save-banner').modal('hide');                                                                       
                                       }
                                       else
                                       { 
                                           swal("Sorry..!", "Unable to Update Project Registration .........!", "error");
                                       }
                                });                       
                          }
                    /*} else {
                          $('#save-result').html("<br>Please Enter Company Name .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#txt_banner_name').focus();                
                    }        */                      
                } else {
                      $('#save-result').html("<br>Please Enter Project Title .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_save').prop('disabled', false);
                      $('#txt_description').focus();                
                } 
              } else {
                    $('#save-result').html("<br>Please Select Technology .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#course').focus();                
              }           
    });


});

    //Load all District
    function loadCourse(ele,id) {
        $('#course').html('');
        $('#course').append('<option value="" selected>--- SELECT TECHNOLOGY ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Technology/loadStudentTech',
            data: {},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['tech_id']) {
                         $('#course').append('<option value=' + data['data'][i]['tech_id'] + ' selected>' + data['data'][i]['technology'].toUpperCase() + '</option>');
                    }else{
                         $('#course').append('<option value=' + data['data'][i]['tech_id'] + '>' + data['data'][i]['technology'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }

    //Load all District
    function loadStudent(ele,id) {
        $('#student').html('');
        $('#student').append('<option value="" selected>--- SELECT STUDENT ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Student/loadStudentList',
            data: {},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['student_id']) {
                         $('#student').append('<option value=' + data['data'][i]['student_id'] + ' selected>' + data['data'][i]['name'].toUpperCase() + '</option>');
                    }else{
                         $('#student').append('<option value=' + data['data'][i]['student_id'] + '>' + data['data'][i]['name'].toUpperCase() + '</option>'); 
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
         $.post(base_url+'ProjectRegistration/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['technology']+"</td>";
                  html += "<td>"+data['data'][i]['project_title']+"</td>";
                  //html += "<td>"+data['data'][i]['company_name']+"</td>";
                  html += "<td>"+data['data'][i]['date']+"</td>";                                   
                  html += "<td><a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
            url: base_url+'ProjectRegistration/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['data']['length']; i++)
                  {
                      html += "<tr>";
                      html += "<td>"+(i+1)+"</td>";
                      html += "<td>"+data['data'][i]['technology']+"</td>";
                      html += "<td>"+data['data'][i]['project_title']+"</td>";
                      //html += "<td>"+data['data'][i]['company_name']+"</td>";
                      html += "<td>"+data['data'][i]['date']+"</td>";                                   
                      html += "<td>&nbsp;&nbsp;<a class='btn bg-cyan waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='getDate(this)'><span class='glyphicon glyphicon-check' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                      html += "</tr>";                    
                  }                
                $('#txt_id').val(data['single']['student_id']);
                $('#txt_name').val(data['single']['name']);
                $('#txt_contact').val(data['single']['contact']);
                $('#txt_email').val(data['single']['email']);
                $('#txt_address').val(data['single']['address']);
                $('#txt_password').val(data['single']['password']); 
                $('#course').val(data['single']['course_id']).trigger('change.select2');
                $("#title").html("Update Project Registration");
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
            text: "You will not be able to recover this Project Registration.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'ProjectRegistration/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Project Registration Deleted successfully.....!",
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

   
function rowDelete(ele) {
    $(ele).closest("tr").remove();
    var i = 1;
    $(ele).each(function () {
        $(this).html(i);
        i += 1;
    });
}   
