$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadNotification();


    $("#save_modal").on('click', function () {
        loadDate();
        $("#title").html("Notification Form");
        $('.form-control').val('');
        $("#btn_notification_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-notification').modal('show');
        $('#txt_date').focus();
        $('#btn_notification_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#loadingDiv').hide();

    //Code to save and update Category
    $('#btn_notification_save').on('click', function (event) {
        event.preventDefault();
        var date = $('#txt_date').val();
        var title = $('#txt_title').val();
        var description = $('#txt_description').val();

            $('#btn_notification_save').prop('disabled', true);
            var action = $.trim($('#btn_notification_save').text());
            if (title != "") {
                if (description != "") {
                    if (action == "Save") {
                            $('#loadingDiv').show();
                            $.ajax({
                                type: 'POST',
                                url: base_url+'Notification/notificationSave',
                                data: { date: date,title:title,description:description},
                                success: function (res) {
                                    //console.log(res);
                                    if (res == 1) {
                                        loadNotification();
                                        swal({
                                            title: "Well Done..!",
                                            text: "Notification Saved successfully.....!",
                                            type: "success",
                                            timer: 1000
                                        });
                                        $('.form-control').val('');
                                        $('#save-notification').modal('hide');
                                    }
                                    else {
                                        swal("Sorry..!", "Unable to Save Notification .........!", "error");
                                    }
                                },
                                complete: function () {
                                    $('#loadingDiv').hide();
                                }
                            });
                    }
                    if (action == "Update") {
                        var notification_id = $('#txt_notification_id').val();
                        $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'Notification/notificationUpdate',
                            data: { notification_id: notification_id, date: date, title:title, description:description},
                            success: function (res) {
                                if (res == 1) {
                                    loadNotification();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Notification Updated successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-notification').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Update Notification .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });
                    }
                } else {
                    $('#save-result').html("<br>Please Enter Description .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_notification_save').prop('disabled', false);
                    $('#txt_description').focus();                    
                }
            }
            else {
                $('#save-result').html("<br>Please Enter Title .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_notification_save').prop('disabled', false);
                $('#txt_title').focus();
            }            
    });


});


/* Load All form Data */
   function loadNotification()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Notification'))
         {
           $('#dataTable-Notification').DataTable().destroy();
         }      
         $.post(base_url+'Notification/loadNotification',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['notification']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['notification'][i]['date']+"</td>";
                  html += "<td>"+data['notification'][i]['title']+"</td>";
                  html += "<td>"+data['notification'][i]['description']+"</td>";                                                                                               
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['notification'][i]['notification_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['notification'][i]['notification_id']+"del' onclick='deleteNotification(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadNotification').html(html);
              $('#dataTable-Notification').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by notification_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Notification/notificationRecord',
            data: {notification_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                $.each(data, function (key, value) {
                    $('#txt_notification_id').val(value.notification_id);
                    $('#txt_date').val(value.date);
                    $('#txt_title').val(value.title);
                    $('#txt_description').val(value.description);
                });
                $("#title").html("Update Notification");
                $("#btn_notification_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-notification').modal('show');
                $('#txt_date').focus();
                $('.form-control').attr('disabled', false);
                $('#btn_notification_save').prop('disabled', false);
            }
        });
    }

//Code to delete Banner
function deleteNotification(ele) {
    var code = $(ele).attr('id');
    var id = parseInt(code);
    swal({
        title: "Are you sure ?",
        text: "You will not be able to recover this Notification.......!!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function (result) {
        if (result == true) {
            $.ajax({
                type: 'POST',
                 url: base_url+'Notification/notificationDelete',
                data: {notification_id:id},
                success: function (res) {
                    if (res == 1) {
                        loadNotification();
                        swal({
                            title: "Well Done..!",
                            text: "Notification Deleted successfully.....!",
                            type: "success",
                            timer: 1000
                        });
                    }
                    else {
                        swal("Sorry..!", "Unable to Delete Notification .........!", "error");
                    }
                }
            });
        }
    });
}

function loadDate(){
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    //var todayDate = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month +'/'+(day < 10 ? '0' : '') +day;
    var todayDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
    $('#txt_date').val(todayDate);   
    console.log(todayDate);  
    //var outDate = ($('#txt_date').val() == "" ? todayDate : $('#txt_date').val());        
}
