$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadType();

    $("#save_modal").on('click', function () {
        $("#title").html("Document Type Form");
        $('.form-control').val('');
        $("#btn_type_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-type').modal('show');
        $('#btn_type_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#loadingDiv').hide();

    //Code to save and update Category
    $('#btn_type_save').on('click', function (event) {
        event.preventDefault();
        var type_name = $('#txt_type_name').val();

            $('#btn_type_save').prop('disabled', true);
            var action = $.trim($('#btn_type_save').text());
            if (type_name != "") {
                if (action == "Save") {
                        $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'DocumentType/typeSave',
                            data: { type_name: type_name},
                            success: function (res) {
                                //console.log(res);
                                if (res == 1) {
                                    loadType();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Document Type Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-type').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Save Document Type .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });
                }
                if (action == "Update") {
                    var type_id = $('#txt_type_id').val();
                    $('#loadingDiv').show();
                    $.ajax({
                        type: 'POST',
                        url: base_url+'DocumentType/typeUpdate',
                        data: { type_id: type_id, type_name: type_name},
                        success: function (res) {
                            if (res == 1) {
                                loadType();
                                swal({
                                    title: "Well Done..!",
                                    text: "Document Type Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-type').modal('hide');
                            }
                            else {
                                swal("Sorry..!", "Unable to Update Document Type .........!", "error");
                            }
                        },
                        complete: function () {
                            $('#loadingDiv').hide();
                        }
                    });
                }
            }
            else {
                $('#save-result').html("<br>Please Enter Document Type .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_type_save').prop('disabled', false);
                $('#txt_type_name').focus();
            }            
    });


});


/* Load All form Data */
   function loadType()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Document-Type'))
         {
           $('#dataTable-Document-Type').DataTable().destroy();
         }      
         $.post(base_url+'DocumentType/loadType',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['type']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['type'][i]['type_name']+"</td>";                                                                                               
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['type'][i]['type_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['type'][i]['type_id']+"del' onclick='deleteType(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadDocumentType').html(html);
              $('#dataTable-Document-Type').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by type_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'DocumentType/typeRecord',
            data: {type_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $.each(data, function (key, value) {
                    $('#txt_type_id').val(value.type_id);
                    $('#txt_type_name').val(value.type_name);
                });
                $("#title").html("Update Document Type");
                $("#btn_type_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-type').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_type_save').prop('disabled', false);
            }
        });
    }

//Code to delete Banner
function deleteType(ele) {
    var code = $(ele).attr('id');
    var id = parseInt(code);
    swal({
        title: "Are you sure ?",
        text: "You will not be able to recover this Document Type.......!!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function (result) {
        if (result == true) {
            $.ajax({
                type: 'POST',
                 url: base_url+'DocumentType/typeDelete',
                data: {type_id:id},
                success: function (res) {
                    if (res == 1) {
                        loadType();
                        swal({
                            title: "Well Done..!",
                            text: "Document Type Deleted successfully.....!",
                            type: "success",
                            timer: 1000
                        });
                    }
                    else {
                        swal("Sorry..!", "Unable to Delete Document Type .........!", "error");
                    }
                }
            });
        }
    });
}
