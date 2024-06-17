$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadCallHistory();
    loadTrust();

    $(".searchData").select2({
        dropdownParent: $("#save-call-history"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#callHistoryTitle").html("Call History Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $('#trustContact').html("");
        $('#trustAddress').html("");  
        $('#namePerson').html("");
        $('#contactPerson').html("");          
        $("#btn_call_history_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-call-history').modal('show');
        $('#btn_call_history_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();
    $('#trustDiv').hide();
    $('#type').on('change',function(){
        var id=$('#type').val();
        if (id!="") {
            if (id==2) {
                 $('#trustDiv').hide();
                 $('#trust').val("");
                 $('#trustContact').html('');
                 $('#trustAddress').html('');                 
            }
            else{
                 $('#trustDiv').show();
            }
        }
        else{
             swal("OOPS..!", "Please Select Type .........!", "warning");
        }
    });     

    $('#trust').on('change',function(){
        var id=$('#trust').val();
        if (id!="") {
            getAddress(id);
            loadContact(id,'');       
        }else{
             $('#trustContact').html('');
             $('#trustAddress').html('');  
             //swal("OOPS..!", "Please Select Trust .........!", "warning");            
        }
    });

    $('#party').on('change',function(){
        var id=$('#party').val();
        $.ajax({
            type: 'POST',
            url: base_url+'Trust/contactRecord',
            data: {contact_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
               for (var i = 0; i < data['single']['length']; i++){
                     $('#partyMobile').html("Mobile : "+data['single'][i]['mobile']);             
                }
            }
        });
    });    

    //Code to save and update Category
    $('#btn_call_history_save').on('click', function (event) {
        event.preventDefault();
        var date = $('#txt_date').val();
        var trust_id = $('#trust').val();
        var party = $('#txt_partyname').val();
        var contact = $('#txt_contact').val();
        var purpose = $('#txt_purpose').val();
        var feedback = $('#txt_feedback').val();          

            $('#btn_call_history_save').prop('disabled', true);
            var action = $.trim($('#btn_call_history_save').text());
            if (date != ""  && party != "" && contact != "" && purpose != "" && feedback != "") {
                if (action == "Save") {
                        $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'CallHistory/callSave',
                            data: { date:date,trust_id:trust_id,party:party,contact:contact,purpose:purpose,feedback:feedback },
                            success: function (res) {
                                if (res == 1) {
                                    loadCallHistory();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Call History Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-call-history').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Save Call History .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });
                }
                if (action == "Update") {
                    var call_id = $('#txt_call_id').val();
                    $('#loadingDiv').show();
                    $.ajax({
                        type: 'POST',
                        url: base_url+'CallHistory/callUpdate',
                        data: { call_id:call_id,date:date,trust_id:trust_id,party:party,contact:contact,purpose:purpose,feedback:feedback },
                        success: function (res) {
                            if (res == 1) {
                                loadCallHistory();
                                swal({
                                    title: "Well Done..!",
                                    text: "Call History Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-call-history').modal('hide');
                            }
                            else {
                                swal("Sorry..!", "Unable to Update Call History .........!", "error");
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
                $('#btn_call_history_save').prop('disabled', false);
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

    
    function getAddress(id){
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
    }

    //Load all District
    function loadContact(ele,id) {        
        $.ajax({
            type: 'POST',
            url: base_url+'Trust/loadTrustContact',
            data: {trust_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#party').html('');
                $('#party').append('<option value="" selected>--- SELECT PARTY ---</option>');
               for (var i = 0; i < data['contact']['length']; i++){                   
                   if (id==data['contact'][i]['contact_id']) {
                         $('#party').append('<option value=' + data['contact'][i]['contact_id'] + ' selected>' + data['contact'][i]['person_name'].toUpperCase() + '</option>');
                    }else{
                         $('#party').append('<option value=' + data['contact'][i]['contact_id'] + '>' + data['contact'][i]['person_name'].toUpperCase() + '</option>'); 
                    } 
                   $('#partyMobile').html("Mobile : "+data['contact'][i]['mobile']);                  
                }
            }
        }); 
    }    

/* Load All form Data */
   function loadCallHistory()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-CallHistory'))
         {
           $('#dataTable-CallHistory').DataTable().destroy();
         }      
         $.post(base_url+'CallHistory/loadCallHistory',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['history']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+(data['history'][i]['trust_name']!=null ? data['history'][i]['trust_name'].toUpperCase():'-----------')+"</td>";
                  html += "<td>"+data['history'][i]['party_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['history'][i]['mobile_no']+"</td>";
                  html += "<td>"+data['history'][i]['call_date']+"</td>";
                  html += "<td>"+data['history'][i]['call_purpose']+"</td>";
                  html += "<td>"+data['history'][i]['feedback']+"</td>";
                  html += "<td><a class='btn bg-teal waves-effect' id='"+data['history'][i]['call_id']+"view' onclick='getData(this)'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-purple waves-effect' id='"+data['history'][i]['call_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['history'][i]['call_id']+"del' onclick='deleteCallHistory(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadCallHistory').html(html);
              $('#dataTable-CallHistory').DataTable({
                  responsive: true
              });
         });
    } 

    //Code to fetch data by stage_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        var action = $.trim($(ele).text());
        $.ajax({
            type: 'POST',
            url: base_url+'CallHistory/callRecord',
            data: {call_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $.each(data, function (key, value) {
                    $('#txt_call_id').val(value.call_id);
                    $('#txt_date').val(value.call_date);
                    if(value.trust_id!=0){
                        $('#type').val("1").trigger('change.select2');
                        $('#trust').val(value.trust_id).trigger('change.select2');
                        $('#trustContact').html("Telephone : "+value.landline_no);
                        $('#trustAddress').html("Address : "+value.address);
                        getAddress(value.trust_id);
                        $('#trustDiv').show();  
                    }
                    else{
                        $('#type').val("2").trigger('change.select2');
                        $('#trust').val("").change();
                        $('#trust').hide();   
                        $('#trustDiv').hide();        
                        $('#trust').val("");
                        $('#trustContact').html('');
                        $('#trustAddress').html('');                                                       
                      }
                    //loadContact(value.trust_id,value.party_id);
                    $('#txt_partyname').val(value.party_name);
                    $('#txt_contact').val(value.mobile_no);                    
                    $('#txt_purpose').val(value.call_purpose);
                    $('#txt_feedback').val(value.feedback);                                       
                    (action=="Edit"? $("#txt_visit_purpose").show():$("#txt_visit_purpose").hide());
                    (action=="Edit"? $("#lblPurpose").hide():$("#lblPurpose").show());                      
                });

                (action=="Edit"? $("#callHistoryTitle").html("Update Stage"):$("#callHistoryTitle").html("View Stage"));
                (action=="Edit"? $("#btn_call_history_save").show():$("#btn_call_history_save").hide());
                (action=="Edit"? $('.form-control').removeAttr('disabled'):$('.form-control').attr('disabled', true));

                $("#btn_call_history_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-call-history').modal('show');
                $('#btn_call_history_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Visitor
    function deleteCallHistory(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Call History.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'CallHistory/callDelete',
                    data: {call_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadCallHistory();
                            swal({
                                title: "Well Done..!",
                                text: "Call History Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Call History .........!", "error");
                        }
                    }
                });
            }
        });
    }
