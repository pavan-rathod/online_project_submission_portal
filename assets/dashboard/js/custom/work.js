$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadWorkList();
    loadTrust();

    $(".searchData").select2({
        dropdownParent: $("#save-work"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#workTitle").html("Work Details Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $('#trustContact').html("");
        $('#trustAddress').html("");  
        $('#namePerson').html("");
        $('#contactPerson').html("");                 
        $('#addWork').html("");
        $('#work_list').hide();
        $("#btn_work_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-work').modal('show');
        $('#btn_work_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    $('#trust').on('change',function(){
        var id=$('#trust').val();
        $.ajax({
            type: 'POST', 
            url: base_url+'Trust/trustDetails',
            data: {trust_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
               for (var i = 0; i < data['single']['length']; i++){
                     $('#trustContact').html("Telephone : "+data['single'][i]['landline_no']);
                     $('#trustAddress').html("Address : "+data['single'][i]['address']);              
                     $('#namePerson').html("Person Name: "+data['single'][i]['person_name']);
                     $('#contactPerson').html("Person Contact : "+data['single'][i]['mobile']);
                }
            }
        });
    });    

    $('#work-table').hide();
    $('#add_multiple_work').on('click', function () {
        $('#work-table').show();
        var work = $('#txt_work_name').val();
        if (work != "") {
                addWork(work);
                $('#txt_work_name').val("");
                $('#txt_work_name').focus();
        } else {
                $('#txt_work_name').focus();
                swal({
                    title: "Sorry..!",
                    text: "Please Enter Work .........!",
                    type: "error",
                    timer: 1000
                });
        }
    });    

   //Code to save work details
    $('#btn_work_save').on('click', function (event) {
        event.preventDefault();
        var trust_id = $('#trust').val();
        if (trust_id != "") {
            if ($("#addWork tr").length > 0) {
                $('#btn_work_save').prop('disabled', true);
                var action = $.trim($('#btn_work_save').text());
                if (action == "Save") {
                    var flag = "";
                    $('#addWork tr').each(function () {
                        var id = $(this).attr('id');
                        id = id.substring(4);
                        var work = $('#tdid' + id).html();
                        $.ajax({
                            type: 'POST',
                             url: base_url+'Work/workSave',
                            data: { trust_id: trust_id, work: work },
                            success: function (res) {
                                if (res != "") {
                                    loadWorkList();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Work Details Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-work').modal('hide');
                                }
                            }
                        });
                    });
                }
            }
            else {
                $('#txt_work_name').focus();
                swal({
                    title: "Sorry..!",
                    text: "Please Add Work Details .......!!!",
                    type: "error",
                    timer: 1000
                });
            }
        }
        else {
            $('#trust').focus();
            swal({
                title: "Sorry..!",
                text: "Please Select Trust .......!!!",
                type: "error",
                timer: 1000
            });
        }
    });


});


    //Load all Trust
    function loadTrust() {
        $('#trust').html('');
        $('#trust').append('<option value="" selected>--- SELECT TRUST ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Trust/loadTrust',
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['trust']['length']; i++){
                    $('#trust').append('<option value=' + data['trust'][i]['trust_id'] + '>' + data['trust'][i]['trust_name'].toUpperCase() + '</option>');
                }        
            }
        });
    }

/* Load All form Data */
   function loadWorkList()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Work'))
         {
           $('#dataTable-Work').DataTable().destroy();
         }      
         $.post(base_url+'Work/loadWork',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['work']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td id=" + data['work'][i]['trust_id'] + "TrustName>" + data['work'][i]['trust_name'].toUpperCase() + "</td>";
                  html += "<td id=" + data['work'][i]['trust_id'] + "MobNo>"+data['work'][i]['landline_no']+"</td>";
                  html += "<td id=" + data['work'][i]['trust_id'] + "email>"+data['work'][i]['email_id']+"</td>";                    
                  html += "<td><a class='btn bg-cyan waves-effect' id=" + data['work'][i]['trust_id'] + "edit onClick='viewWorkList(this);'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;&nbsp;&nbsp;</td>"; 
                  html += "</tr>";                    
              }
              $('#loadWork').html(html);
              $('#dataTable-Work').DataTable({
                  responsive: true
              });
         });
    } 

    //Code to view data by item_id
    function viewWorkList(ele) {
        if ($.fn.DataTable.isDataTable('#dataTable-Work-List')) {
            $('#dataTable-Work-List').DataTable().destroy();
        }
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Work/workRecord',
            data: { trust_id: id },
            success: function (res) {
                var data = jQuery.parseJSON(res);
                var html = "";
                for (var i = 0; i < data['details']['length']; i++){
                    html += "<tr>";
                    html += "<td>" + (i+1) + "</td>";
                    html += "<td>" +data['details'][i]['work_details'] + "</td>";
                    html += "<td>";
                    html += "<a class='btn bg-red waves-effect' href='#' id=" + data['details'][i]['work_id'] + "del onClick='deleteWorkList(this);'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a>&nbsp;&nbsp;&nbsp;&nbsp;";
                    html += "</td>";
                    html += "</tr>";
                }
                $("#workList").html(html);
                $('#dataTable-Work-List').DataTable({
                    responsive: true
                });
                console.log($("#" + id + "TrustName").html());
                $('#TrustData').html("&nbsp;&nbsp;" + $("#" + id + "TrustName").html());
                $('#TrustContact').html("&nbsp;&nbsp;" + $("#" + id + "MobNo").html());
                $('#TrustEmail').html("&nbsp;&nbsp;" + $("#" + id + "email").html());                
                $('#work_list').modal('show');
            }
        });
    }

   //Code to delete District
    function deleteWorkList(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Work Details.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Work/workDelete',
                    data: {work_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            $('#work_list').modal('hide');
                            loadWorkList();
                            swal({
                                title: "Well Done..!",
                                text: "Work Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Work .........!", "error");
                        }
                    }
                });
            }
        });
    }

    //Code to add Code in to table
    function addWork(work) {
        var html = "";
        var i = ($("#addWork tr").length > 0) ? $('#addWork tr:last').attr('id') : 0;
        i = (i != 0) ? parseInt(i.substring(4)) + 1 : 1;
        html += "<tr id=trid" + i + ">";
        html += "<td>" + i + "</td>";
        html += "<td id=tdid" + i + ">" + work + "</td>";
        html += "<td class=center><a class='btn btn-sm btn-danger'  id=" + i + "l onclick='rowDelete(this)' ><i class='glyphicon glyphicon-trash'></i></a></td>";
        html += "</tr>";
        $('#addWork').append(html);
    }

    function rowDelete(ele) {
        $(ele).closest("tr").remove();
        var i = 1;
        $(ele).each(function () {
            $(this).html(i);
            i += 1;
        });
    }

