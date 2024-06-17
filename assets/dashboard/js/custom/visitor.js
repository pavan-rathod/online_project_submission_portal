$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadVisitor(); 
    loadTrust();

    $(".searchData").select2({
        dropdownParent: $("#save-visitor"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#visitorTitle").html("Visitor Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $('#trustContact').html("");
        $('#trustAddress').html("");  
        $('#namePerson').html("");
        $('#contactPerson').html("");                  
        $("#btn_visitor_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-visitor').modal('show');
        $('#btn_visitor_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    $('#type').on('change',function(){
        var id=$('#type').val();
        if (id!="") {
            if (id==2) {
                 $('#trustDiv').hide();
                 $('#addressDiv').hide();
                 $('#trust').val("");
                 $('#trustContact').html('');
                 $('#trustAddress').html('');
            }
            else{
                 $('#trustDiv').show();
                 $('#addressDiv').show();
            }
        }
        else{
             swal("OOPS..!", "Please select Type .........!", "warning");
        }
    });    

    $('#trust').on('change',function(){
        var id=$('#trust').val();
        if (id!="") {
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
        } else {
             $('#trustContact').html('');
             $('#trustAddress').html('');  
             //swal("OOPS..!", "Please Select Trust .........!", "warning");   
        }
    });

    //Code to save and update Category
    $('#btn_visitor_save').on('click', function (event) {
        event.preventDefault();
        var trust_id = ($('#type').val()==1 ? $('#trust').val():0);
        console.log(trust_id);
        var visitor_name = $('#txt_visitor_name').val();
        var contact = $('#txt_contact').val();
        var date = $('#txt_date').val();
        var visit_purpose = $('#txt_visit_purpose').val();             

            $('#btn_visitor_save').prop('disabled', true);
            var action = $.trim($('#btn_visitor_save').text());
            if (visitor_name != "" && contact != "" && date != "" && visit_purpose != "") {
                if (action == "Save") {
                        $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'Visitor/visitorSave',
                            data: { trust_id:trust_id,visitor_name: visitor_name,contact:contact,date:date,visit_purpose:visit_purpose},
                            success: function (res) {
                                console.log(res);
                                if (res == 1) {
                                    loadVisitor();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Visitor Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-visitor').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Save Visitor .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });
                }
                if (action == "Update") {
                    var visitor_id = $('#txt_visitor_id').val();
                    $('#loadingDiv').show();
                    $.ajax({
                        type: 'POST',
                        url: base_url+'Visitor/visitorUpdate',
                        data: { visitor_id: visitor_id,trust_id:trust_id, visitor_name: visitor_name,contact:contact,date:date,visit_purpose:visit_purpose},
                        success: function (res) {
                           console.log(res);
                            if (res == 1) {
                                loadVisitor();
                                swal({
                                    title: "Well Done..!",
                                    text: "Visitor Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-visitor').modal('hide');
                            }
                            else {
                                swal("Sorry..!", "Unable to Update Visitor .........!", "error");
                            }
                        },
                        complete: function () {
                            $('#loadingDiv').hide();
                        }
                    });
                }
            }
            else {
                $('#save-result').html("<br>Please Enter Details .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_visitor_save').prop('disabled', false);
                $('#trust').focus();                
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
   function loadVisitor()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Visitor'))
         {
           $('#dataTable-Visitor').DataTable().destroy();
         }      
         $.post(base_url+'Visitor/loadVisitor',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['visitor']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+(data['visitor'][i]['trust_name']!=null ? data['visitor'][i]['trust_name'].toUpperCase():'------------')+"</td>";
                  html += "<td>"+data['visitor'][i]['visitor_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['visitor'][i]['contact']+"</td>";
                  html += "<td>"+data['visitor'][i]['visit_date']+"</td>";
                  html += "<td>"+data['visitor'][i]['visit_purpose']+"</td>";
                  html += "<td><a class='btn bg-teal waves-effect' id='"+data['visitor'][i]['visitor_id']+"view' onclick='getData(this)'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-purple waves-effect' id='"+data['visitor'][i]['visitor_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['visitor'][i]['visitor_id']+"del' onclick='deleteVisitor(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadVisitor').html(html);
              $('#dataTable-Visitor').DataTable({
                  responsive: true
              });
         });
    } 

    //Code to fetch data by visitor_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        var action = $.trim($(ele).text());
        $.ajax({
            type: 'POST',
            url: base_url+'Visitor/visitorRecord',
            data: {visitor_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $.each(data, function (key, value) {
                    $('#txt_visitor_id').val(value.visitor_id);
                    $('#txt_visitor_name').val(value.visitor_name);
                    $('#txt_contact').val(value.contact);
                    $('#txt_date').val(value.visit_date);
                    $('#txt_visit_purpose').val(value.visit_purpose);
                    $('#lblPurpose').html(value.visit_purpose);
                    if (value.trust_id!=0){
                        $('#type').val("1").trigger('change.select2');
                        $('#trust').val(value.trust_id).change();
                        $('#trustContact').html("Telephone : "+value.landline_no);
                        $('#trustAddress').html("Address : "+value.address);                           
                    }   
                    else{
                        $('#type').val("2").trigger('change.select2');
                        $('#trust').val("").change();
                        $('#trustDiv').hide(); 
                        $('#addressDiv').hide();    
                        $('#trust').val("");
                        $('#trustContact').html('');
                        $('#trustAddress').html('');                                                                      
                    } 

                    (action=="Edit"? $("#txt_visit_purpose").show():$("#txt_visit_purpose").hide());
                    (action=="Edit"? $("#lblPurpose").hide():$("#lblPurpose").show());                      
                });

                (action=="Edit"? $("#visitorTitle").html("Update Visitor"):$("#visitorTitle").html("View Visitor"));
                (action=="Edit"? $("#btn_visitor_save").show():$("#btn_visitor_save").hide());
                (action=="Edit"? $('.form-control').removeAttr('disabled'):$('.form-control').attr('disabled', true));

                $("#btn_visitor_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-visitor').modal('show');
                $('#btn_visitor_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Visitor
    function deleteVisitor(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Visitor.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Visitor/visitorDelete',
                    data: {visitor_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadVisitor();
                            swal({
                                title: "Well Done..!",
                                text: "Visitor Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Visitor .........!", "error");
                        }
                    }
                });
            }
        });
    }
