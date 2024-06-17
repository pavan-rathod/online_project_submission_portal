$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadStages();
    loadTrust();

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
        loadWork(id,'')      
    });

    //Code to save and update Category
    $('#btn_stage_save').on('click', function (event) {
        event.preventDefault();      
        var trust_id = $('#trust').val();
        var party_id = $('#party').val();
        var todays_stage = $('#txt_todays_stage').val();
        var next_stage = $('#txt_next_stage').val();
        var court_name = $('#txt_court_name').val();   
        var application_no = $('#txt_application').val();   
        var section = $('#txt_section').val();   
        var type = $('#type').val();
        var work = $('#work').val();               
        var sub_date = $('#txt_sub_date').val();
        var next_date = $('#txt_next_date').val();        
        var application_date = $('#txt_application_date').val();
        var start_date = $('#txt_start_date').val();        

            $('#btn_stage_save').prop('disabled', true);
            var action = $.trim($('#btn_stage_save').text());
            if (trust_id !=""){ 
                if (party_id !="") {
                    if (todays_stage !="") {
                        if (next_stage !="") {
                            if (court_name !="") {
                                if (application_no !="") {
                                    if (section !="") {
                                        if (type !="" ) {
                                            if (sub_date !="") {
                                                if (next_date !="") {
                                                    if (application_date !="") {
                                                        if (start_date !="") {
                                                            if (work != "") {
                                                                    if (action == "Save") {
                                                                            $('#loadingDiv').show();
                                                                            $.ajax({
                                                                                type: 'POST',
                                                                                url: base_url+'Stages/stageSave',
                                                                                data: { trust_id:trust_id,party_id:party_id,todays_stage:todays_stage,next_stage:next_stage,court_name:court_name,application_no:application_no,section:section,type:type,sub_date:sub_date,next_date:next_date,application_date:application_date,start_date:start_date},
                                                                                success: function (res) {
                                                                                    if (res > 0) {
                                                                                            var work = [];
                                                                                            $.each($("#work option:selected"), function(){            
                                                                                                work.push($(this).val());
                                                                                            });
                                                                                            var i;
                                                                                            for (i = 0; i < work.length; i++) {
                                                                                                    $.ajax({
                                                                                                        type: 'POST',
                                                                                                        url: base_url+'Stages/workSave',
                                                                                                        data: { stage_id: res,work:work[i]},
                                                                                                        success: function (r) {
                                                                                                            //console.log(res);
                                                                                                            if (r > 0) {
                                                                                                                loadStages();
                                                                                                                swal({
                                                                                                                    title: "Well Done..!",
                                                                                                                    text: "Stage Saved successfully.....!",
                                                                                                                    type: "success",
                                                                                                                    timer: 1000
                                                                                                                });
                                                                                                                $('.form-control').val('');
                                                                                                                $('#save-stage').modal('hide');
                                                                                                            }
                                                                                                        }
                                                                                                    });                                                                                            
                                                                                            }                                                                                                                                                                           
                                                                                    }
                                                                                    else {
                                                                                        swal("Sorry..!", "Unable to Save Stage .........!", "error");
                                                                                    }
                                                                                },
                                                                                complete: function () {
                                                                                    $('#loadingDiv').hide();
                                                                                }
                                                                            });
                                                                    }
                                                                    if (action == "Update") {
                                                                        var stage_id = $('#txt_stage_id').val();
                                                                        $('#loadingDiv').show();
                                                                        $.ajax({
                                                                            type: 'POST',
                                                                            url: base_url+'Stages/stageUpdate',
                                                                            data: { stage_id:stage_id,trust_id:trust_id,party_id:party_id,todays_stage:todays_stage,next_stage:next_stage,court_name:court_name,application_no:application_no,section:section,type:type,sub_date:sub_date,next_date:next_date,application_date:application_date,start_date:start_date},
                                                                            success: function (res) {
                                                                                if (res > 0) {
                                                                                        var work = [];
                                                                                        $.each($("#work option:selected"), function(){            
                                                                                            work.push($(this).val());
                                                                                        });
                                                                                        var i;
                                                                                        for (i = 0; i < work.length; i++) {
                                                                                                $.ajax({
                                                                                                    type: 'POST',
                                                                                                    url: base_url+'Stages/workSave',
                                                                                                    data: { stage_id: res,work:work[i]},
                                                                                                    success: function (r) {
                                                                                                        //console.log(res);
                                                                                                        if (r > 0) {
                                                                                                            loadStages();
                                                                                                            swal({
                                                                                                                title: "Well Done..!",
                                                                                                                text: "Stage Updated successfully.....!",
                                                                                                                type: "success",
                                                                                                                timer: 1000
                                                                                                            });
                                                                                                            $('.form-control').val('');
                                                                                                            $('#save-stage').modal('hide');
                                                                                                        }
                                                                                                    }
                                                                                                });                                                                                            
                                                                                        }                                                                                         
                                                                                }
                                                                                else {
                                                                                    swal("Sorry..!", "Unable to Update Stage .........!", "error");
                                                                                }
                                                                            },
                                                                            complete: function () {
                                                                                $('#loadingDiv').hide();
                                                                            }
                                                                        });
                                                                    }    
                                                            } else {
                                                                swal({
                                                                    title: "Sorry..!",
                                                                    text: "Please Select Work......!",
                                                                    type: "warning",
                                                                    timer: 1000
                                                                });                
                                                                $('#btn_stage_save').prop('disabled', false);
                                                                $('#txt_start_date').focus();                                                                  
                                                            }                                                        
                                                        } else {
                                                            swal({
                                                                title: "Sorry..!",
                                                                text: "Please Enter Start Date......!",
                                                                type: "warning",
                                                                timer: 1000
                                                            });                
                                                            $('#btn_stage_save').prop('disabled', false);
                                                            $('#txt_start_date').focus();                                                              
                                                        }
                                                    } else {
                                                        swal({
                                                            title: "Sorry..!",
                                                            text: "Please Enter Application Date......!",
                                                            type: "warning",
                                                            timer: 1000
                                                        });                
                                                        $('#btn_stage_save').prop('disabled', false);
                                                        $('#txt_application_date').focus();                                                           
                                                    }
                                                } else {
                                                    swal({
                                                        title: "Sorry..!",
                                                        text: "Please Enter Next Date......!",
                                                        type: "warning",
                                                        timer: 1000
                                                    });                
                                                    $('#btn_stage_save').prop('disabled', false);
                                                    $('#txt_next_date').focus();                                                       
                                                }
                                            } else {
                                                swal({
                                                    title: "Sorry..!",
                                                    text: "Please Enter Submission Date......!",
                                                    type: "warning",
                                                    timer: 1000
                                                });                
                                                $('#btn_stage_save').prop('disabled', false);
                                                $('#txt_sub_date').focus();                                                 
                                            }
                                        } else {
                                            swal({
                                                title: "Sorry..!",
                                                text: "Please Select Type......!",
                                                type: "warning",
                                                timer: 1000
                                            });                
                                            $('#btn_stage_save').prop('disabled', false);
                                            $('#type').focus();                                               
                                        }
                                    } else {
                                        swal({
                                            title: "Sorry..!",
                                            text: "Please Enter Section......!",
                                            type: "warning",
                                            timer: 1000
                                        });                
                                        $('#btn_stage_save').prop('disabled', false);
                                        $('#txt_section').focus();                                         
                                    }
                                } else {
                                    swal({
                                        title: "Sorry..!",
                                        text: "Please Enter Application No......!",
                                        type: "warning",
                                        timer: 1000
                                    });                
                                    $('#btn_stage_save').prop('disabled', false);
                                    $('#txt_application').focus();                                      
                                }
                            } else {
                                swal({
                                    title: "Sorry..!",
                                    text: "Please Enter Court Name.....!",
                                    type: "warning",
                                    timer: 1000
                                });                
                                $('#btn_stage_save').prop('disabled', false);
                                $('#txt_court_name').focus();                                  
                            }
                        } else {
                            swal({
                                title: "Sorry..!",
                                text: "Please Enter Next Stage.....!",
                                type: "warning",
                                timer: 1000
                            });                
                            $('#btn_stage_save').prop('disabled', false);
                            $('#txt_todays_stage').focus();                             
                        }
                    } else {
                        swal({
                            title: "Sorry..!",
                            text: "Please Enter Today's Stage.....!",
                            type: "warning",
                            timer: 1000
                        });                
                        $('#btn_stage_save').prop('disabled', false);
                        $('#txt_todays_stage').focus();                          
                    }
                } else {
                    swal({
                        title: "Sorry..!",
                        text: "Please Select Party.....!",
                        type: "warning",
                        timer: 1000
                    });                
                    $('#btn_stage_save').prop('disabled', false);
                    $('#party').focus();                      
                }
            }
            else {
                    swal({
                        title: "Sorry..!",
                        text: "Please Select Trust.....!",
                        type: "warning",
                        timer: 1000
                    });                
                    $('#btn_stage_save').prop('disabled', false);
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


    //Load all District
    function loadWork(ele,id) {       
        $.ajax({
            type: 'POST',
            url: base_url+'Work/workRecord',
            data: {trust_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#work').html('');
               for (var i = 0; i < data['details']['length']; i++){                   
                   if (id==data['details'][i]['work_id']) {
                         $('#work').append('<option value=' + data['details'][i]['work_id'] + ' selected>' + data['details'][i]['work_details'].toUpperCase() + '</option>');
                    }else{
                         $('#work').append('<option value=' + data['details'][i]['work_id'] + '>' + data['details'][i]['work_details'].toUpperCase() + '</option>'); 
                    }                
                }
            }
        }); 
    }   

    //Load all District
    function loadStageWork(id) {       
        $.ajax({
            type: 'POST',
            url: base_url+'Stages/workData',
            data: {stage_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
               // $('#work').html('');
               for (var i = 0; i < data['details']['length']; i++){      
                    $("#work").find("option[value="+data['details'][i]['work_id']+"]").prop("selected", "selected");
                    //$('#work').append('<option value=' + data['details'][i]['work_id'] + ' selected>' + data['details'][i]['work_details'].toUpperCase() + '</option>');               
                }
            }
        }); 
    }        

/* Load All form Data */
   function loadStages()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Stage'))
         {
           $('#dataTable-Stage').DataTable().destroy();
         }      
         $.post(base_url+'Stages/loadStages',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['stage']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['stage'][i]['trust_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['stage'][i]['person_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['stage'][i]['todays_stage']+"</td>";
                  html += "<td>"+data['stage'][i]['next_stage']+"</td>";
                  html += "<td>"+data['stage'][i]['court_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['stage'][i]['application_no']+"</td>";
                  html += "<td>"+data['stage'][i]['section']+"</td>";
                  html += "<td>"+(data['stage'][i]['type']=="C" ? "CONTESTED": (data['stage'][i]['type']=="U" ? "UNCONTESTED":"-------"))+"</td>";
                  html += "<td>"+data['stage'][i]['next_date']+"</td>";
                  html += "<td><a class='btn bg-teal waves-effect' id='"+data['stage'][i]['stage_id']+"view' onclick='getData(this)'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-purple waves-effect' id='"+data['stage'][i]['stage_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['stage'][i]['stage_id']+"del' onclick='deleteStages(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadStage').html(html);
              $('#dataTable-Stage').DataTable({
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
            url: base_url+'Stages/stageRecord',
            data: {stage_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $.each(data, function (key, value) {
                    $('#txt_stage_id').val(value.stage_id);
                    $('#trust').val(value.trust_id).trigger('change.select2');
                    getAddress(value.trust_id);
                    loadContact(value.trust_id,value.party_id);
                    loadWork(value.trust_id,'')
                    loadStageWork(id);
                    $('#txt_todays_stage').val(value.todays_stage);
                    $('#txt_next_stage').val(value.next_stage);
                    $('#txt_court_name').val(value.court_name);      
                    $('#txt_application').val(value.application_no); 
                    $('#txt_section').val(value.section);   
                    $('#txt_sub_date').val(value.submission_date);
                    $('#txt_next_date').val(value.next_date);  
                    $('#txt_start_date').val(value.work_start_date);
                    $('#txt_application_date').val(value.application_date);                     
                    $('#type').val(value.type).trigger('change.select2');                 
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
    function deleteStages(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Stage.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Stages/stageDelete',
                    data: {stage_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadStages();
                            swal({
                                title: "Well Done..!",
                                text: "Stage Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Stage .........!", "error");
                        }
                    }
                });
            }
        });
    }
