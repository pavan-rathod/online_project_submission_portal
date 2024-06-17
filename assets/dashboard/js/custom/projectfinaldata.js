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

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_save').on('click', function (event) {
        event.preventDefault();
        var tech = $('#course').val();
        var name = $('#txt_name').val();
        var company = $('#txt_contact').val();       
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
              if (tech != "") {
                if (name != "") { 
                  if (company != "") {                 
                          if (action == "Save") {
                               $('#loadingDiv').show();
                               $("input[type='file']").upload(base_url+'ProjectRegistration/dataSave',{tech: tech,name:name,company:company},function(res){
                                    if (res>0)
                                     {
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
                    } else {
                          $('#save-result').html("<br>Please Enter Company Name .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#txt_banner_name').focus();                
                    }                              
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

/* Load All form Data */
   function loadData()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'ProjectApproval/loadFinalProjectData',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['student']+"</td>";
                  html += "<td>"+data['data'][i]['technology']+"</td>";
                  html += "<td>"+data['data'][i]['project_title']+"</td>";
                 // html += "<td>"+data['data'][i]['company_name']+"</td>";
                  html += "<td>"+data['data'][i]['submission_date']+"</td>";                                                     
                  html += "<td>&nbsp;&nbsp;<a class='btn bg-cyan waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-ok' style='top:2px;'></span>&nbsp;&nbsp;Download</a></td>";                  
                  html += "</tr>";   

                  //$("#completionLetter").attr('href',base_url+"Project/"+data['data'][i]['company_letter']);
                  $("#project_documentation").attr('href',base_url+"Project/"+data['data'][i]['project_documentation']);
                  $("#project_ppt").attr('href',base_url+"Project/"+data['data'][i]['project_ppt']);
                  $("#project_zip").attr('href',base_url+"Project/"+data['data'][i]['project_zip']);                 
              }
              $('#loadBanner').html(html);
              $('#dataTable-Banner').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by banner_id
/*    function getData(ele) {
        $('#loadingDiv').hide();
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'ProjectRegistration/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
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
    }*/

   //Code to delete Tehsil
/*    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "Do you really want to Approve Project.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, approve it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'ProjectApproval/dataApprove',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Wel Done..!",
                                text: "Project Approved successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Approve Student .........!", "error");
                        }
                    }
                });
            }
        });
    }*/

    function deleteData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $("#title").html("Download Project Documentation");
        $('#save-banner').modal('show');
    }    
