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
        var id = $('#txt_id').val(); 
        var tech_id = $('#txt_tech_id').val();       
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());               
              if (action == "Save") {
                   $('#loadingDiv').show();
                   $("input[type='file']").upload(base_url+'ProjectUpload/dataSave',{id:id,tech_id:tech_id},function(res){
                        if (res>0)
                         {
                              loadData();                                                                                  
                              swal({
                                  title: "Well Done..!",
                                  text: "Project Uploaded Saved successfully.....!",
                                  type: "success",
                                  timer: 1000
                              });
                              $('.form-control').val('');
                              $('#save-banner').modal('hide');                                                                       
                         }
                         else
                         { 
                             swal("Sorry..!", "Unable to Save Project Uploaded.........!", "error");
                         }
                  });                            
              }
           /*   if (action == "Update") {
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
              }*/         
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
                //console.log(data);
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
         $.post(base_url+'ProjectUpload/loadData',{},function(res){
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
                  if (data['data'][i]['submit_status']==1)
                    html += "<td><div class='alert alert-success'><strong>Uploaded</strong> </div></td>";                  
                  else
                    html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['registration_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-upload' style='top:2px;'></span>&nbsp;&nbsp;Upload</a>&nbsp;&nbsp;</td>";                  
                  
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
            url: base_url+'ProjectUpload/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $('#txt_id').val(data['single']['registration_id']);
                $('#txt_tech_id').val(data['single']['tech_id']);
                $('#txt_tech').val(data['single']['technology']);
                $('#txt_name').val(data['single']['project_title']);
                $('#txt_contact').val(data['single']['company_name']);
                $('#txt_tech').attr('disabled',true);
                $('#txt_name').attr('disabled',true);
                $('#txt_contact').attr('disabled',true); 
                $('#txt_email').val(data['single']['date']);
                $('#txt_address').val(data['single']['address']);
                $('#txt_password').val(data['single']['password']); 
               // $('#course').val(data['single']['course_id']).trigger('change.select2');
                $("#title").html("Project Submission");
                $("#btn_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Save");
                $('#save-banner').modal('show');
                //$('.form-control').attr('disabled', false);
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
