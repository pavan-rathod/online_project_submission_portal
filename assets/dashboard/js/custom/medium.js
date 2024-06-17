$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });
 
    loadMedium();
    loadClass();

    $(".searchData").select2({
        dropdownParent: $("#save-medium"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Medium Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_medium_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-medium').modal('show');
        $('#btn_medium_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#loadingDiv').hide();

    $('#txt_package').on('keyup',function(){
        calculateAmount();
    });    

    $('#txt_discount').on('keyup',function(){
        calculateAmount();
    });

    //Code to save and update Category
    $('#btn_medium_save').on('click', function (event) {
        event.preventDefault();
        var class_id = $('#class').val();
        var medium = $('#txt_medium_name').val();
        var package = $('#txt_package').val();
        var discount = $('#txt_discount').val();
        var total = $('#txt_total').val();

            $('#btn_medium_save').prop('disabled', true);
            var action = $.trim($('#btn_medium_save').text());
            if (class_id != "") {
              if (medium != "") {
                 if (package != "") {
                         if (discount != "") {
                                    if (action == "Save") {
                                            $('#loadingDiv').show();
                                            $.ajax({
                                                type: 'POST',
                                                url: base_url+'Medium/mediumSave',
                                                data: { class_id:class_id,medium: medium,package:package,discount:discount,total:total},
                                                success: function (res) {
                                                    console.log(res);
                                                    if (res == 1) {
                                                        loadMedium();
                                                        swal({
                                                            title: "Well Done..!",
                                                            text: "Medium Saved successfully.....!",
                                                            type: "success",
                                                            timer: 1000
                                                        });
                                                        $('.form-control').val('');
                                                        $('#save-medium').modal('hide');
                                                    }
                                                    else {
                                                        swal("Sorry..!", "Unable to Save Medium .........!", "error");
                                                    }
                                                },
                                                complete: function () {
                                                    $('#loadingDiv').hide();
                                                }
                                            });
                                    }
                                    if (action == "Update") {
                                        var medium_id = $('#txt_medium_id').val();
                                        $('#loadingDiv').show();
                                        $.ajax({
                                            type: 'POST',
                                            url: base_url+'Medium/mediumUpdate',
                                            data: { medium_id: medium_id,class_id:class_id,medium: medium,package:package,discount:discount,total:total},
                                             success: function (res) {
                                                if (res == 1) {
                                                    loadMedium();
                                                    swal({
                                                        title: "Well Done..!",
                                                        text: "Medium Updated successfully.....!",
                                                        type: "success",
                                                        timer: 1000
                                                    });
                                                    $('.form-control').val('');
                                                    $('#save-medium').modal('hide');
                                                }
                                                else {
                                                    swal("Sorry..!", "Unable to Update Medium .........!", "error");
                                                }
                                            },
                                            complete: function () {
                                                $('#loadingDiv').hide();
                                            }
                                        });
                                    }
                         } else {
                                $('#save-result').html("<br>Please Enter Discount .....!");
                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                $('#btn_medium_save').prop('disabled', false);
                                $('#txt_discount').focus();                     
                         }
                 } else {
                        $('#save-result').html("<br>Please Enter Medium .....!");
                        setTimeout(function () { $('#save-result').html(' '); }, 3000);
                        $('#btn_medium_save').prop('disabled', false);
                        $('#txt_package').focus();                       
                 }
              } else {
                    $('#save-result').html("<br>Please Enter Package Price .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_medium_save').prop('disabled', false);
                    $('#txt_package').focus();                   
              }
            }
            else {
                $('#save-result').html("<br>Please Select Class .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_medium_save').prop('disabled', false);
                $('#class').focus();                
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

/* Load All form Data */
   function loadMedium()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Medium'))
         {
           $('#dataTable-Medium').DataTable().destroy();
         }      
         $.post(base_url+'Medium/loadMedium',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['medium']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['medium'][i]['class_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['medium'][i]['medium'].toUpperCase()+"</td>";
                  html += "<td>"+data['medium'][i]['package']+"</td>";
                  html += "<td>"+data['medium'][i]['discount']+"</td>";
                  html += "<td>"+data['medium'][i]['total']+"</td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['medium'][i]['medium_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['medium'][i]['medium_id']+"del' onclick='deleteMedium(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadMedium').html(html);
              $('#dataTable-Medium').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by medium_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Medium/mediumRecord',
            data: {medium_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $.each(data, function (key, value) {
                    $('#txt_medium_id').val(value.medium_id);
                    $('#class').val(value.class_id).change();
                    $('#txt_medium_name').val(value.medium);
                    $('#txt_package').val(value.package);
                    $('#txt_discount').val(value.discount);
                    $('#txt_total').val(value.total);
                });
                $("#title").html("Update Medium");
                $("#btn_medium_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-medium').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_medium_save').prop('disabled', false);
            }
        });
    }

   //Code to delete District
    function deleteMedium(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Medium.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Medium/mediumDelete',
                    data: {medium_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadMedium();
                            swal({
                                title: "Well Done..!",
                                text: "Medium Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Medium .........!", "error");
                        }
                    }
                });
            }
        });
    }

    function calculateAmount(){
        var package=($('#txt_package').val() !="" ? parseFloat($('#txt_package').val()):0);
        console.log("Package:"+package)
        var discount=($('#txt_discount').val() !="" ? parseFloat($('#txt_discount').val()):0);  
        var discAmt=(parseFloat(package-((discount/100)*package))); 
        $('#txt_total').val((discAmt).toFixed(2));   
        $('#txt_total').attr('disabled',true); 

    }
