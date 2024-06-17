$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadClass();

    $("#save_modal").on('click', function () {
        $("#title").html("Class Form");
        $('.form-control').val('');
        $("#btn_class_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-class').modal('show');
        $('#txt_class_name').focus();
        $('#btn_class_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#loadingDiv').hide();

    //Code to save and update Category
    $('#btn_class_save').on('click', function (event) {
        event.preventDefault();
        var class_name = $('#txt_class_name').val();

            $('#btn_class_save').prop('disabled', true);
            var action = $.trim($('#btn_class_save').text());
            if (class_name != "") {
                if (action == "Save") {
                        $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'ClassMst/classSave',
                            data: { class_name: class_name},
                            success: function (res) {
                                //console.log(res);
                                if (res == 1) {
                                    loadClass();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Class Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-class').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Save Class .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });
                }
                if (action == "Update") {
                    var class_id = $('#txt_class_id').val();
                    $('#loadingDiv').show();
                    $.ajax({
                        type: 'POST',
                        url: base_url+'ClassMst/classUpdate',
                        data: { class_id: class_id, class_name: class_name},
                        success: function (res) {
                            if (res == 1) {
                                loadClass();
                                swal({
                                    title: "Well Done..!",
                                    text: "Class Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-class').modal('hide');
                            }
                            else {
                                swal("Sorry..!", "Unable to Update Class .........!", "error");
                            }
                        },
                        complete: function () {
                            $('#loadingDiv').hide();
                        }
                    });
                }
            }
            else {
                $('#save-result').html("<br>Please Enter Class .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_class_save').prop('disabled', false);
                $('#txt_class_name').focus();
            }            
    });


});


/* Load All form Data */
   function loadClass()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Class'))
         {
           $('#dataTable-Class').DataTable().destroy();
         }      
         $.post(base_url+'ClassMst/loadClass',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['class']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['class'][i]['class_name']+"</td>";                                                                                               
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['class'][i]['class_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['class'][i]['class_id']+"del' onclick='deleteClass(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadClass').html(html);
              $('#dataTable-Class').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by class_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'ClassMst/classRecord',
            data: {class_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $.each(data, function (key, value) {
                    $('#txt_class_id').val(value.class_id);
                    $('#txt_class_name').val(value.class_name);
                });
                $("#title").html("Update Class");
                $("#btn_class_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-class').modal('show');
                $('#txt_class_name').focus();
                $('.form-control').attr('disabled', false);
                $('#btn_class_save').prop('disabled', false);
            }
        });
    }

//Code to delete Banner
function deleteClass(ele) {
    var code = $(ele).attr('id');
    var id = parseInt(code);
    swal({
        title: "Are you sure ?",
        text: "You will not be able to recover this Class.......!!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function (result) {
        if (result == true) {
            $.ajax({
                type: 'POST',
                 url: base_url+'ClassMst/classDelete',
                data: {class_id:id},
                success: function (res) {
                    if (res == 1) {
                        loadClass();
                        swal({
                            title: "Well Done..!",
                            text: "Class Deleted successfully.....!",
                            type: "success",
                            timer: 1000
                        });
                    }
                    else {
                        swal("Sorry..!", "Unable to Delete Class .........!", "error");
                    }
                }
            });
        }
    });
}
