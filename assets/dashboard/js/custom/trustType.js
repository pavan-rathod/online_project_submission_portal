$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadTrust();

    $("#save_modal").on('click', function () {
        $("#trustTitle").html("Trust Type Form");
        $('.form-control').val('');
        $("#btn_trust_type_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-trust-type').modal('show');
        $('#btn_trust_type_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    //Code to save and update Category
    $('#btn_trust_type_save').on('click', function (event) {
        event.preventDefault();
        var trust_type = $('#txt_trust_type_name').val();

            $('#btn_trust_type_save').prop('disabled', true);
            var action = $.trim($('#btn_trust_type_save').text());
            if (action == "Save") {
                if (trust_type != "") {
                    $('#loadingDiv').show();
                    $.ajax({
                        type: 'POST',
                        url: base_url+'TrustType/trustTypeSave',
                        data: { trust_type: trust_type},
                        success: function (res) {
                            //console.log(res);
                            if (res == 1) {
                                loadTrust();
                                swal({
                                    title: "Wel Done..!",
                                    text: "Trust Type Saved successfully.....!",
                                    type: "success",
                                    timer: 3000
                                });
                                $('.form-control').val('');
                                $('#save-trust-type').modal('hide');
                            }
                            else {
                                swal("Sorry..!", "Unable to Save Trust Type .........!", "error");
                            }
                        },
                        complete: function () {
                            $('#loadingDiv').hide();
                        }
                    });
                }
                else {
                    $('#save-result').html("<br>Please Enter Trust Type .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_trust_type_save').prop('disabled', false);
                }
            }
            if (action == "Update") {
                var trust_type_id = $('#txt_trust_type_id').val();
                $('#loadingDiv').show();
                $.ajax({
                    type: 'POST',
                    url: base_url+'TrustType/trustTypeUpdate',
                    data: { trust_type_id: trust_type_id, trust_type: trust_type},
                    success: function (res) {
                        if (res == 1) {
                            loadTrust();
                            swal({
                                title: "Wel Done..!",
                                text: "Trust Type Updated successfully.....!",
                                type: "success",
                                timer: 3000
                            });
                            $('.form-control').val('');
                            $('#save-trust-type').modal('hide');
                        }
                        else {
                            swal("Sorry..!", "Unable to Update Trust Type .........!", "error");
                        }
                    },
                    complete: function () {
                        $('#loadingDiv').hide();
                    }
                });
            }
    });


});


/* Load All form Data */
   function loadTrust()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Trust-Type'))
         {
           $('#dataTable-Trust-Type').DataTable().destroy();
         }      
         $.post(base_url+'TrustType/loadTrustType',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['trust']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['trust'][i]['trust_type']+"</td>";                                                                                               
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['trust'][i]['trust_type_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['trust'][i]['trust_type_id']+"del' onclick='deleteTrust(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadTrustType').html(html);
              $('#dataTable-Trust-Type').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by trust_type_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'TrustType/trustTypeRecord',
            data: {trust_type_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $.each(data, function (key, value) {
                    $('#txt_trust_type_id').val(value.trust_type_id);
                    $('#txt_trust_type_name').val(value.trust_type);
                });
                $("#trustTitle").html("Update Trust Type");
                $("#btn_trust_type_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-trust-type').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_trust_type_save').prop('disabled', false);
            }
        });
    }

//Code to delete Banner
function deleteTrust(ele) {
    var code = $(ele).attr('id');
    var id = parseInt(code);
    swal({
        title: "Are you sure ?",
        text: "You will not be able to recover this Trust Type.......!!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function (result) {
        if (result == true) {
            $.ajax({
                type: 'POST',
                 url: base_url+'TrustType/trustTypeDelete',
                data: {trust_type_id:id},
                success: function (res) {
                    if (res == 1) {
                        loadTrust();
                        swal({
                            title: "Wel Done..!",
                            text: "Trust Type Deleted successfully.....!",
                            type: "success",
                            timer: 3000
                        });
                    }
                    else {
                        swal("Sorry..!", "Unable to Delete Trust Type .........!", "error");
                    }
                }
            });
        }
    });
}
