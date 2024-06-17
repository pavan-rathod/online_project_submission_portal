$(document).ready(function () {
  
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadSubject();    
    loadClass();

    $(".searchData").select2({
        dropdownParent: $("#save-subject"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Subject Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_subject_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-subject').modal('show');
        $('#btn_subject_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#class').on('change',function(){
         var class_id = $('#class').val();
         loadMedium(class_id,'');
    });

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_subject_save').on('click', function (event) {
        event.preventDefault();
        var medium_id = $('#medium').val();
        var subject_code = $('#txt_subject_code').val();
        var subject_name = $('#txt_subject_name').val();
        var developed_by = $('#txt_developer').val();
        var validity = $('#txt_validity').val();
        var price = $('#txt_price').val();
        var offer_price = "0";//$('#txt_offer_price').val();
        var description = $('#txt_description').val();
        var img = $('#subject-image').val();

            $('#btn_subject_save').prop('disabled', true);
            var action = $.trim($('#btn_subject_save').text());
            if (medium_id != "") {
              if (subject_code != "") {
                if (subject_name != "") {
                   if (developed_by != "") {
                      if (validity != "") {
                         if (price != "") {
                            if (offer_price != "") {
                               if (description != "") {
                                    if (action == "Save") {
                                        if (img != "") {
                                             $('#loadingDiv').show();
                                             $('#subject-image').upload(base_url+'Subject/subjectSave',{medium_id:medium_id,subject_code:subject_code,subject_name:subject_name,developed_by:developed_by,validity:validity,price:price,offer_price:offer_price,description:description,img:img},function(res){
                                                  if (res>0)
                                                   {
                                                        loadSubject();                                                                                  
                                                        swal({
                                                            title: "Well Done..!",
                                                            text: "Subject Saved successfully.....!",
                                                            type: "success",
                                                            timer: 1000
                                                        });
                                                        $('.form-control').val('');
                                                        $('#save-subject').modal('hide');                                                                       
                                                   }
                                                   else
                                                   { 
                                                       swal("Sorry..!", "Unable to Save Subject .........!", "error");
                                                   }
                                            }); 
                                         } else {
                                                $('#save-result').html("<br>Please Select Image .....!");
                                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                                $('#btn_subject_save').prop('disabled', false);
                                                $('#subject-image').focus();                      
                                         }                             
                                    }
                                    if (action == "Update") {
                                        var subject_id = $('#txt_subject_id').val();
                                        $('#loadingDiv').show();
                                             if (img != "") {  
                                                 $('#subject-image').upload(base_url+'Subject/subjectUpdate',{subject_id:subject_id,medium_id:medium_id,subject_code:subject_code,subject_name:subject_name,developed_by:developed_by,validity:validity,price:price,offer_price:offer_price,description:description,img:img},function(res){
                                                      if (res>0)
                                                       {
                                                            loadSubject();                                                                                  
                                                            swal({
                                                                title: "Well Done..!",
                                                                text: "Subject Updated successfully.....!",
                                                                type: "success",
                                                                timer: 1000
                                                            });
                                                            $('.form-control').val('');
                                                            $('#save-subject').modal('hide');                                                                       
                                                       }
                                                       else
                                                       { 
                                                           swal("Sorry..!", "Unable to Update Subject .........!", "error");
                                                       }
                                                });
                                             } else {
                                                $.ajax({
                                                    type: 'POST',
                                                    url: base_url+'Subject/subjectUpdate',
                                                    data: { subject_id: subject_id,medium_id:medium_id,subject_code:subject_code,subject_name:subject_name,developed_by:developed_by,validity:validity,price:price,offer_price:offer_price,description:description},
                                                    success: function (res) {
                                                        if (res == 1) {
                                                            loadSubject();
                                                            swal({
                                                                title: "Well Done..!",
                                                                text: "Subject Updated successfully.....!",
                                                                type: "success",
                                                                timer: 1000
                                                            });
                                                            $('.form-control').val('');
                                                            $('#save-subject').modal('hide');
                                                        }
                                                        else {
                                                            swal("Sorry..!", "Unable to Update Subject .........!", "error");
                                                        }
                                                    },
                                                    complete: function () {
                                                        $('#loadingDiv').hide();
                                                    }
                                                });                     
                                             }                       
                                    }
                               } else {
                                    $('#save-result').html("<br>Please Enter Description.....!");
                                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                    $('#btn_subject_save').prop('disabled', false);
                                    $('#txt_description').focus();
                               }
                            } else {
                                $('#save-result').html("<br>Please Enter Offer Price.....!");
                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                $('#btn_subject_save').prop('disabled', false);
                                $('#txt_offer_price').focus();
                            }
                         } else {
                              $('#save-result').html("<br>Please Enter Price.....!");
                              setTimeout(function () { $('#save-result').html(' '); }, 3000);
                              $('#btn_subject_save').prop('disabled', false);
                              $('#txt_price').focus();                           
                         }
                      } else {
                          $('#save-result').html("<br>Please Enter Validity.....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_subject_save').prop('disabled', false);
                          $('#txt_validity').focus();                          
                      }
                   } else {
                        $('#save-result').html("<br>Please Enter Developer Name.....!");
                        setTimeout(function () { $('#save-result').html(' '); }, 3000);
                        $('#btn_subject_save').prop('disabled', false);
                        $('#txt_developer').focus();  
                   }

                } else {
                      $('#save-result').html("<br>Please Enter Subject Name.....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_subject_save').prop('disabled', false);
                      $('#txt_subject_name').focus();                
                }
              } else {
                  $('#save-result').html("<br>Please Enter Subject Code.....!");
                  setTimeout(function () { $('#save-result').html(' '); }, 3000);
                  $('#btn_subject_save').prop('disabled', false);
                  $('#txt_subject_code').focus();                  
              }
            }
            else {
                $('#save-result').html("<br>Please Select Medium .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_subject_save').prop('disabled', false);
                $('#medium').focus();
            }            
    });


});


    //Load all class
    function loadClass() {
        $('#class').html('');
        $('#class').append('<option value="" selected>--- SELECT CLASS ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'ClassMst/loadClass',
            data: "action=loadClass",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['class']['length']; i++){
                    $('#class').append('<option value=' + data['class'][i]['class_id'] + '>' + data['class'][i]['class_name'].toUpperCase() + '</option>');
                }        
            }
        });
    }

//Load all District
function loadMedium(ele,id) {
    $('#medium').html('');
    $('#medium').append('<option value="" selected>--- SELECT MEDIUM ---</option>');
    $.ajax({
        type: 'POST',
        url: base_url+'Subject/loadMedium',
        data: {class_id:ele},
        success: function (res) {
            var data = jQuery.parseJSON(res);
            for (var i = 0; i < data['medium']['length']; i++){
                if (id==data['medium'][i]['medium_id']) {
                     $('#medium').append('<option value=' + data['medium'][i]['medium_id'] + ' selected>' + data['medium'][i]['medium'].toUpperCase() + '</option>');
                }else{
                     $('#medium').append('<option value=' + data['medium'][i]['medium_id'] + '>' + data['medium'][i]['medium'].toUpperCase() + '</option>'); 
                }
            }        
        }
    });
}

/* Load All form Data */
   function loadSubject()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Subject'))
         {
           $('#dataTable-Subject').DataTable().destroy();
         }      
         $.post(base_url+'Subject/loadSubject',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['subject']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['subject'][i]['class_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['subject'][i]['medium'].toUpperCase()+"</td>";
                  html += "<td>"+data['subject'][i]['subject_code'].toUpperCase()+"</td>";
                  html += "<td>"+data['subject'][i]['subject_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['subject'][i]['developed_by'].toUpperCase()+"</td>";
                  html += "<td>"+data['subject'][i]['price']+"</td>";
                  //html += "<td>"+data['subject'][i]['offer_price']+"</td>";
                  html += "<td><img id='"+data['subject'][i]['subject_id']+"timg' src="+data['subject'][i]['subject_image']+" style='height:150px;width:180px;border:1px solid #000;'></img></td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['subject'][i]['subject_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['subject'][i]['subject_id']+"del' onclick='deleteSubject(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadSubject').html(html);
              $('#dataTable-Subject').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by subject_id
    function getData(ele) {
        $('#loadingDiv').hide();
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Subject/subjectRecord',
            data: {subject_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['single']['length']; i++){
                    //console.log(value.subject_id);
                    $('#txt_subject_id').val(data['single'][i]['subject_id']);
                    $('#class').val(data['single'][i]['class_id']).trigger('change.select2');
                    loadMedium(data['single'][i]['class_id'],data['single'][i]['medium_id']);
                    $('#txt_subject_code').val(data['single'][i]['subject_code']);
                    $('#txt_subject_name').val(data['single'][i]['subject_name']);
                    $('#txt_developer').val(data['single'][i]['developed_by']);
                    $('#txt_validity').val(data['single'][i]['validity']);
                    $('#txt_price').val(data['single'][i]['price']);
                    $('#txt_offer_price').val(data['single'][i]['offer_price']);
                    $('#txt_description').val(data['single'][i]['description']);
                    $('#subjectPhoto').attr('src',data['single'][i]['subject_image']);
                }
                $("#title").html("Update Subject");
                $("#btn_subject_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-subject').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_subject_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Tehsil
    function deleteSubject(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Subject.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Subject/subjectDelete',
                    data: {subject_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadSubject();
                            swal({
                                title: "Well Done..!",
                                text: "Subject Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Subject .........!", "error");
                        }
                    }
                });
            }
        });
    }
