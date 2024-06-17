$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadCourse();
    loadYear();
    loadData();    

    $(".searchData").select2({
        dropdownParent: $("#save-banner"),
        width: '100%'
    });   

    $('#course').on('change',function(){
         var course_id = $('#course').val();
         loadTechnology(course_id,'');
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Upload Project Form");
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
        var year = $('#year').val();
        var course = $('#course').val();
        var technology = $('#technology').val();
        var title = $('#txt_title').val();
        var img = $('#banner-image').val();
        /* var password = $('#txt_password').val(); */       
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
              if (year != "") {
                if (course != "") { 
                 if (technology != "") {
                    if (title != "") {    
/*                         if (password != "") { */                 
                              if (action == "Save") {
                                  if (img != "") {
                                      $('#banner-image').upload(base_url+'UploadProject/dataSave',{year:year,technology:technology,title:title,img:img},function(res){
                                            console.log(res);
                                            if (res>0)
                                             {
                                                  loadData();                                                                                  
                                                  swal({
                                                      title: "Well Done..!",
                                                      text: "Documentation Saved successfully.....!",
                                                      type: "success",
                                                      timer: 1000
                                                  });
                                                  $('.form-control').val('');
                                                  $('#save-banner').modal('hide');                                                                       
                                             }
                                             else
                                             { 
                                                 swal("Sorry..!", "Unable to Save Documentation.........!", "error");
                                             }
                                      });                                     
                                  }else
                                  {
                                    $('#save-result').html("<br>Please Select Documentation .....!");
                                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                    $('#btn_banner_save').prop('disabled', false);
                                    $('#banner-image').focus();                                    
                                  }                         
                              }
/*                          } else {
                                $('#save-result').html("<br>Please Enter Password .....!");
                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                $('#btn_save').prop('disabled', false);
                                $('#txt_description').focus();                
                          } */                               
                      } else {
                            $('#save-result').html("<br>Please Enter Title .....!");
                            setTimeout(function () { $('#save-result').html(' '); }, 3000);
                            $('#btn_save').prop('disabled', false);
                            $('#txt_title').focus();                
                      }   
                    } else {
                          $('#save-result').html("<br>Please Select Technology .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#technology').focus();                
                    }                           
                } else {
                      $('#save-result').html("<br>Please Select Course .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_save').prop('disabled', false);
                      $('#course').focus();                
                } 
              } else {
                    $('#btn_save').prop('disabled', false);
                    $('#save-result').html("<br>Please Select Year .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#year').focus();                
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
    }

    //Load all District
    function loadYear(ele,id) {
        $('#year').html('');
        $('#year').append('<option value="" selected>--- SELECT YEAR ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'AcademicYear/loadData',
            data: {state_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['academic_id']) {
                         $('#year').append('<option value=' + data['data'][i]['academic_id'] + ' selected>' + data['data'][i]['startyear']+'-'+ data['data'][i]['endyear']+ '</option>');
                    }else{
                         $('#year').append('<option value=' + data['data'][i]['academic_id'] + '>'  + data['data'][i]['startyear']+'-'+ data['data'][i]['endyear']+ '</option>'); 
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
         $.post(base_url+'UploadProject/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['startyear']+'-'+data['data'][i]['endyear']+"</td>";
                  html += "<td>"+data['data'][i]['course']+"</td>";
                  html += "<td>"+data['data'][i]['technology']+"</td>";
                  html += "<td>"+data['data'][i]['project_name']+"</td>";
                /*   html += "<td>"+data['data'][i]['address']+"</td>";
                  html += "<td>"+data['data'][i]['password']+"</td>";*/                                    
                  html += "<td><!--<a class='btn bg-purple waves-effect' id='"+data['data'][i]['tech_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;--><a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['previous_project_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
            url: base_url+'Technology/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#txt_id').val(data['single']['tech_id']);
                $('#txt_name').val(data['single']['technology']);
                $('#course').val(data['single']['course_id']).trigger('change.select2');
/*                $('#txt_email').val(data['single']['email']);
                $('#txt_address').val(data['single']['address']);
                $('#txt_password').val(data['single']['password']);*/ 
                $("#title").html("Update Technology");
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
            text: "You will not be able to recover this Project Documentation.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'UploadProject/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Project Documentation Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Project Documentation .........!", "error");
                        }
                    }
                });
            }
        });
    }


    function loadTechnology(ele,id) {
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
    }   