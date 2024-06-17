$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadBoard('');

    //loadTrust();

    $(".searchData").select2({
        dropdownParent: $("#save-stage"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#stageTitle").html("Stage Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $('#trustContact').html("");
        $('#trustAddress').html("");           
        $("#btn_stage_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-stage').modal('show');
        $('#btn_stage_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    $('#trust').on('change',function(){
        var id=$('#trust').val();
        getAddress(id);
        loadContact(id,'');       
    });

    $("#btn_BoardReport").on('click',function(){
        var board_date = $('#txt_board_date').val();   
        loadBoard(board_date);            
    });

    //Code to save and update Category
    $('.selectable').on('keyup',function(){
        alert("OK");
        var trObj = $(this).closest("tr");
        var str=$(trObj).attr('id');
        var id=str.substring(4,str.length);
        console.log(id);
        var info=$('#tdinfo'+id).html();
 
        if (info != "") 
         {
            $.ajax({
                type: 'POST',
                data: {stage_id:id,info:info},
                url: base_url+'Board/boardUpdate',
                success: function(res){
                    if (res > 0)
                     {
                        swal("Well Done..!", "Details Updated Successfully.....!", "success");
                     }
                }
            });
         }
         else
         {
            swal("Well Done..!","Please Enter Details ...!","error");    
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
            url: base_url+'Trust/trustRecord',
            data: {trust_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
               for (var i = 0; i < data['single']['length']; i++){
                     $('#trustContact').html("Telephone : "+data['single'][i]['landline_no']);
                     $('#trustAddress').html("Address : "+data['single'][i]['address']);              
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
                console.log(data);
                $('#party').html('');
                $('#party').append('<option value="" selected>--- SELECT PARTY ---</option>');
               for (var i = 0; i < data['contact']['length']; i++){                   
                   if (id==data['contact'][i]['contact_id']) {
                         $('#party').append('<option value=' + data['contact'][i]['contact_id'] + ' selected>' + data['contact'][i]['person_name'].toUpperCase() + '</option>');
                    }else{
                         $('#party').append('<option value=' + data['contact'][i]['contact_id'] + '>' + data['contact'][i]['person_name'].toUpperCase() + '</option>'); 
                    }                
                }
            }
        }); 
    }    

/* Load All form Data */
   function loadBoard(dt)
    {
        if ($.fn.DataTable.isDataTable('#Editable_dataTable'))
         {
           $('#Editable_dataTable').DataTable().destroy();
         }      
         $.post(base_url+'Board/loadBoard',{date:dt},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['board']['length']; i++)
              {
                  html += "<tr id='trid"+data['board'][i]['stage_id']+"'>";
                  html += "<td class='unselectable'>"+(i+1)+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['registration_no'].toUpperCase()+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['application_no'].toUpperCase()+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['application_date'].substring(0, 4)+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['section']+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['trust_name']+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['person_name']+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['mobile']+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['type']+"</td>";
                  html += "<td class='unselectable'>"+data['board'][i]['todays_stage']+"</td>";
                  html += "<td class='selectable' id='tdinfo"+data['board'][i]['stage_id']+"'></td>";
                  html += "<td><!--<a class='btn bg-teal waves-effect' id='"+data['board'][i]['stage_id']+"view' onclick='getData(this)'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-purple waves-effect' id='"+data['board'][i]['stage_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>-->&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['board'][i]['stage_id']+"del' onclick='closeClose(this)'><span class='glyphicon glyphicon-remove-circle' style='top:2px;'></span>&nbsp;&nbsp;Close</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadBoard').html(html);
              $('#Editable_dataTable').DataTable({
                  responsive: true
              });
              $('#Editable_dataTable').editableTableWidget();
         });
    } 

    //Code to fetch data by stage_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        var action = $.trim($(ele).text());
        $.ajax({
            type: 'POST',
            url: base_url+'Stages/stageRecord',
            data: {stage_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $.each(data, function (key, value) {
                    $('#txt_stage_id').val(value.stage_id);
                    $('#trust').val(value.trust_id).trigger('change.select2');
                    //$('#party').val(value.party_id);
                    getAddress(value.trust_id);
                    loadContact(value.trust_id,value.party_id);
                    $('#txt_work_details').val(value.work_details);
                    $('#txt_stage').val(value.stage);
                    $('#txt_stage_date').val(value.stage_date);
                    $('#txt_next_date').val(value.next_date);        
                    $('#txt_application').val(value.application_no);  
                    $('#trustContact').html("Telephone : "+value.landline_no);
                    $('#trustAddress').html("Address : "+value.address);                     
                    (action=="Edit"? $("#txt_visit_purpose").show():$("#txt_visit_purpose").hide());
                    (action=="Edit"? $("#lblPurpose").hide():$("#lblPurpose").show());                      
                });

                (action=="Edit"? $("#stageTitle").html("Update Stage"):$("#stageTitle").html("View Stage"));
                (action=="Edit"? $("#btn_stage_save").show():$("#btn_stage_save").hide());
                (action=="Edit"? $('.form-control').removeAttr('disabled'):$('.form-control').attr('disabled', true));

                $("#btn_stage_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-stage').modal('show');
                $('#btn_stage_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Visitor
    function closeClose(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "Do you really want to close this Stage.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, close it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Board/boardClose',
                    data: {stage_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadBoard('');
                            swal({
                                title: "Well Done..!",
                                text: "Stage Closed successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Close Stage .........!", "error");
                        }
                    }
                });
            }
        });
    }
