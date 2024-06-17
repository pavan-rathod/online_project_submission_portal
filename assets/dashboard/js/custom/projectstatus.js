$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    //loadCourse();
    loadData();     
 
   /* $(".searchData").select2({
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
*/
    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_save').on('click', function (event) {
        event.preventDefault();
        var id=$('#txt_id').val();
        var img = $('#banner-image').val();    
            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
               
              //if (action == "Save") {
                   if (img != "") {
                    $('#loadingDiv').show();
                    $('#banner-image').upload(base_url+'ProjectRegistration/resendSynopsis',{id:id},function(res){
                      console.log(res);
                      if (res!="")
                       {                                                                                          
                            swal({
                                title: "Well Done..!",
                                text: "Synopsis uploaded successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                            loadData();    
                            $('.form-control').val('');
                            $('#save-banner').modal('hide');                                                                       
                       }
                       else
                       { 
                           swal("Sorry..!", "Unable to upload Synopsis........!", "error");
                       }
                    });                             
               }else{
                    $('#save-result').html("<br>Please Select Project Synopsis .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_banner_save').prop('disabled', false);
                    $('#banner-image').focus();                                    
              }   
          //}                                   
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
         $.post(base_url+'ProjectRegistration/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                   var status=data['data'][i]['status']==1 ? "<div class='alert alert-success'><strong>Approved</strong> </div>": data['data'][i]['status']==0 ?  "<div class='alert bg-teal'><strong>Pending</strong> </div>": "<div class='alert bg-red'><strong>Rejected</strong> </div>" ;      
                  //var status=((data['data'][i]['status'])==1 ? "<div class='alert alert-success'><strong>Approved</strong> </div>": (data['data'][i]['status'])==0" ? <div class='alert bg-teal'><strong>Pending</strong></div>" : "<div class='alert bg-red'><strong>Rejected</strong></div>");
                   var resend=data['data'][i]['status']==2 ? "<a class='btn bg-purple waves-effect' id='"+data['data'][i]['registration_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-ok' style='top:2px;'></span>&nbsp;&nbsp;Resend Synopsis</a>&nbsp;&nbsp;&nbsp;&nbsp;" :"";

                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['technology']+"</td>";
                  html += "<td>"+data['data'][i]['project_title']+"</td>";
                  //html += "<td>"+data['data'][i]['company_name']+"</td>";            
                  html += "<td>"+data['data'][i]['date']+"</td>";
                  html += "<td>"+data['data'][i]['rejection_reason']+"</td>";
                  html += "<td>"+data['data'][i]['remark']+"</td>";
                  html += "<td>"+status+resend+"</td>";                                   
                  //html += "<td>&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['registration_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
        $('#txt_id').val(id);
        $("#title").html("Resend Project Synopsis");
        $("#btn_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Resend Synopsis");
        $('#save-banner').modal('show');
        $('.form-control').attr('disabled', false);
        $('#btn_save').prop('disabled', false);

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
