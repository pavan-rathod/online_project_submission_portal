$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    //loadCourse();
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

    
    $("#btn_saveRemark").on('click', function(){
          var titleId=$('#txt_titleId').val();
          var remark = $('#txt_remark').val();
          if (remark != "") {
                  $.ajax({
                      type: 'POST',
                      url: base_url+'ProjectApproval/dataRemark',
                      data: {id:titleId, remark:remark},
                      success: function (res) {
                          if (res>0)
                           {
                                loadData();                                                                                  
                                swal({
                                    title: "Well Done..!",
                                    text: "Project Remark Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#approve-project').modal('hide');                                                                       
                           }
                           else
                           { 
                               swal("Sorry..!", "Unable to Update Project Remark .........!", "error");
                           }
                      }
                  });
          }else {
                    $('#save-result').html("<br>Please Enter Project Remark .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#txt_remark').focus();                
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
         $.post(base_url+'ProjectApproval/loadProjectData',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>"; 
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['student']+"</td>";
                  html += "<td>"+data['data'][i]['technology']+"</td>";
                  html += "<td id='"+data['data'][i]['registration_id']+"title'>"+data['data'][i]['project_title'] +"</td>";
                  html += "<td>"+data['data'][i]['date']+"</td>";
                  html += "<td>"+data['data'][i]['remark']+"</td>";
                  html += "<td>"+data['data'][i]['rejection_reason']+"</td>";                                                                                        
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['registration_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-ok' style='top:2px;'></span>&nbsp;&nbsp;Approved</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-indigo waves-effect' id='"+data['data'][i]['registration_id']+"approve' onclick='getProjectData(this)'><span class='glyphicon glyphicon-ok' style='top:2px;'></span>&nbsp;&nbsp;Conditionally Approved</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Reject</a>&nbsp;&nbsp;<a class='btn bg-cyan waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='downloadData(this)'><span class='glyphicon glyphicon-check' style='top:2px;'></span>&nbsp;&nbsp;View Group</a>&nbsp;&nbsp;<a class='btn bg-teal waves-effect' href='"+base_url+"Synopsis/"+data['data'][i]['synopsis']+"' id='"+data['data'][i]['registration_id']+"del' download='Synopsis_'"+data['data'][i]['project_title']+"><span class='glyphicon glyphicon-check' style='top:2px;'></span>&nbsp;&nbsp;Download Synopsis</a></td>";                  
                  html += "</tr>";       

                  $("#sponsership_letter").attr('href',base_url+"Documents/"+data['data'][i]['sponsership_letter']);
                  $("#synopsis").attr('href',base_url+"Documents/"+data['data'][i]['synopsis']);                               
              }
              $('#loadBanner').html(html);
              $('#dataTable-Banner').DataTable({
                  responsive: true
              });
         });
    } 


    function downloadData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $("#title1").html("View Project Member");
        $('#download-banner').modal('show');
        $.ajax({
            type: 'POST',
            url: base_url+'ProjectRegistration/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                var html = "";  
                 for (var i = 0; i < data['data']['length']; i++)
                  {                      
                  
                      html += "<tr>";
                      html += "<td>"+(i+1)+"</td>";
                      html += "<td>"+data['data'][i]['name']+"</td>";                                  
                      //html += "<td>&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                      html += "</tr>";                    
                  }
                   $('#loadList').html(html);
            }
        });
    } 

    function getProjectData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $("#title1").html("Suggestion Or Remark");
        $('#approve-project').modal('show');
        $("#txt_titleId").val(id);
        var projectTitle=$("#"+id+"title").html();
        $("#projectLabel").html(projectTitle);
        console.log(projectTitle);
    }     

   //Code to delete Tehsil
    function getData(ele) {
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
                                title: "Well Done..!",
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
    }

    function deleteData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $('#save-banner').modal('show');
        $('.form-control').attr('disabled', false);
        $('#btn_save').prop('disabled', false); 
        $('#btn_reject').on('click',function(){
           var reason=$('#txt_name').val();
            $.ajax({
                type: 'POST',
                 url: base_url+'ProjectApproval/dataReject',
                data: {id:id,reason:reason},
                success: function (res) {
                    if (res == 1) {                            
                        loadData();
                        swal({
                            title: "Well Done..!",
                            text: "Project Registration Reject successfully.....!",
                            type: "success",
                            timer: 1000
                        });
                    }
                    else {
                        swal("Sorry..!", "Unable to Reject Project Registration .........!", "error");
                    }
                }
            });
        }); 
    }    
