$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadRegistration();

    $("#save_modal").on('click', function () {
        $("#registrationTitle").html("Registration Type Form");
        $('.form-control').val('');
        $("#btn_registration_type_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-registration-type').modal('show');
        $('#btn_registration_type_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    //Code to save and update Category
    $('#btn_registration_type_save').on('click', function (event) {
        event.preventDefault();
        var registration_type = $('#txt_registration_type_name').val();

            $('#btn_registration_type_save').prop('disabled', true);
            var action = $.trim($('#btn_registration_type_save').text());
            if (registration_type != "") {
                if (action == "Save") {
                        $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'RegistrationType/registrationTypeSave',
                            data: { registration_type: registration_type},
                            success: function (res) {
                                //console.log(res);
                                if (res == 1) {
                                    loadRegistration();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Registration Type Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-registration-type').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Save Registration Type .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });
                }
                if (action == "Update") {
                    var registration_type_id = $('#txt_registration_type_id').val();
                    $('#loadingDiv').show();
                    $.ajax({
                        type: 'POST',
                        url: base_url+'RegistrationType/registrationTypeUpdate',
                        data: { registration_type_id: registration_type_id, registration_type: registration_type},
                        success: function (res) {
                            if (res == 1) {
                                loadRegistration();
                                swal({
                                    title: "Well Done..!",
                                    text: "Registration Type Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-registration-type').modal('hide');
                            }
                            else {
                                swal("Sorry..!", "Unable to Update Registration Type .........!", "error");
                            }
                        },
                        complete: function () {
                            $('#loadingDiv').hide();
                        }
                    });
                }
            }
            else {
                $('#save-result').html("<br>Please Enter Registration Type .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_registration_type_save').prop('disabled', false);
                $('#txt_registration_type_name').focus();
            }            
    });


});


/* Load All form Data */
   function loadRegistration()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Registration-Type'))
         {
           $('#dataTable-Registration-Type').DataTable().destroy();
         }      
         $.post(base_url+'RegistrationType/loadRegistrationType',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['registration']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['registration'][i]['registration_type']+"</td>";                                                                                               
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['registration'][i]['registration_type_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['registration'][i]['registration_type_id']+"del' onclick='deleteRegistration(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadRegistrationType').html(html);
              $('#dataTable-Registration-Type').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by registration_type_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'RegistrationType/registrationTypeRecord',
            data: {registration_type_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $.each(data, function (key, value) {
                    $('#txt_registration_type_id').val(value.registration_type_id);
                    $('#txt_registration_type_name').val(value.registration_type);
                });
                $("#registrationTitle").html("Update Registration Type");
                $("#btn_registration_type_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-registration-type').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_registration_type_save').prop('disabled', false);
            }
        });
    }

//Code to delete Banner
function deleteRegistration(ele) {
    var code = $(ele).attr('id');
    var id = parseInt(code);
    swal({
        title: "Are you sure ?",
        text: "You will not be able to recover this Registration Type.......!!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function (result) {
        if (result == true) {
            $.ajax({
                type: 'POST',
                 url: base_url+'RegistrationType/registrationTypeDelete',
                data: {registration_type_id:id},
                success: function (res) {
                    if (res == 1) {
                        loadRegistration();
                        swal({
                            title: "Well Done..!",
                            text: "Registration Type Deleted successfully.....!",
                            type: "success",
                            timer: 1000
                        });
                    }
                    else {
                        swal("Sorry..!", "Unable to Delete Registration Type .........!", "error");
                    }
                }
            });
        }
    });
}
