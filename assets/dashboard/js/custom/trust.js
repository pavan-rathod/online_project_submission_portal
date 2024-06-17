$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadTrust();
    loadState();
    loadElectionType();
    loadTrustType();
    loadRegistrationType();

    $(".searchData").select2({
        dropdownParent: $("#save-trust")
    });    

    $("#save_modal").on('click', function () {
        $("#trustTitle").html("Trust Form");
        $('.form-control').val('');
        $('#contact_detail').html('');
        $('#txt_location').html('');
        $('#trustPhoto').attr('src','');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_trust_save").show();
        $("#add_more_person").show();
        $(".center").show();        
        $("#btn_trust_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-trust').modal('show');
        $('#btn_trust_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#state').on('change',function(){
         var state_id = $('#state').val();
         loadDistrict(state_id,'');
    });    

    $('#district').on('change',function(){
         var district_id = $('#district').val();
         loadTehsil(district_id,'');
    }); 

    $('#loadingDiv').hide();    

    $('#certDiv').hide();
    $('#certDiv1').hide();
    $('#returnDiv').hide();  
    $('#otherTrust').hide();    

    $('#trust_type').on('change',function(){
         var val=$('#trust_type option:selected').html();
         if (val=="OTHER") {
             $('#otherTrust').show();
             $('#txt_other_type').focus();
         }
    });

    $('#cert_20A').on('change',function(){
         var res=$('#cert_20A').val();
         if (res==1) {
             $('#certDiv').show();
         } else {
             $('#certDiv').hide();
         }
    });

    $('#cert_80G').on('change',function(){
         var res=$('#cert_80G').val();
         if (res==1) {
             $('#certDiv1').show();
         } else {
             $('#certDiv1').hide();
         }
    }); 

    $('#itreturn').on('change',function(){
         var res=$('#itreturn').val();
         if (res==1) {
             $('#returnDiv').show();
         } else {
             $('#returnDiv').hide();
         }
    });       

    $('#add_more_person').on('click',function(){
        var name = $('#txt_person_name').val();
        var mobile = $('#txt_mobile_number').val();
        var altmobile = $('#txt_altmobile_number').val();
        var birthDate = $('#date_of_birth').val();   
        var address = $('#txt_contact_address').val();  
        var email = $('#txt_contact_email').val();   
        if (name!="" && mobile!="") 
        {

            var i = ($("#contact_detail tr").length > 0) ? $('#contact_detail tr:last').attr('id'): 0;
            i = (i!=0) ? parseInt(i.substring(4))+1 : 1;

            var td="<tr id=trid"+i+"><td class='trsrno'>"+i+"</td><td id=trname"+i+" >"+name+"</td><td id=trbirth"+i+">"+birthDate+"</td><td id=trmobile"+i+" >"+mobile+"</td><td id=traltmobile"+i+" >"+altmobile+"</td><td id=tremail"+i+" >"+email+"</td><td id=traddress"+i+" >"+address+"</td><td><a class='btn btn-xs btn-danger'  id="+i+"l onclick='rowDelete(this)' ><i class='glyphicon glyphicon-trash'></i></tr>";               
            $('#contact_detail').append(td);
            $('#txt_person_name').val('');
            $('#txt_mobile_number').val('');
            $('#txt_altmobile_number').val('');
            $('#date_of_birth').val(''); 
            $('#txt_contact_address').val(''); 
            $('#txt_contact_email').val(''); 
            $('#txt_person_name').focus('');
        }
        else
        {
            swal("Sorry..!","Please Enter all Contact Person's Details........!!!","warning");
            $('#txt_person_name').focus();
        }
    });    


    $('#txt_trust_name').on('blur',function(){
         var trust=$('#txt_trust_name').val();
         if (trust != "") {
                $.ajax({
                    type:'POST',
                    url: base_url+'Trust/checkExistance',
                    data:{trust:trust},
                    success:function(res){
                        if (res > 0) {
                            $('#errorMsg').html('Trust Name is Already Exist.....!!!');
                            $('#txt_trust_name').val('');
                            $('#txt_trust_name').focus(); 
                            setTimeout(function(){$('#errorMsg').html('')},3000);    
                        }
                    }
                });
         } else {
                    $('#errorMsg').html('Please Enter Trust Name .....!!!');
                    $('#txt_trust_name').val('');
                    $('#txt_trust_name').focus();      
                    setTimeout(function(){$('#errorMsg').html('')},3000);                           
         }
    });

    //Code to save and update Category
    $('#btn_trust_save').on('click', function (event) {
        event.preventDefault();
        var trust_name = $('#txt_trust_name').val();
        var registration_date = $('#txt_registration_date').val();
        var registration_no = $('#txt_registration_no').val();
        var registration_no1 = $('#txt_registration_no1').val();
        var registration_type = $('#registration_type').val();
        var email_id = $('#txt_email').val();
        var landline_no = $('#txt_landline_no').val();
        var address = $('#txt_location').html();
        var tehsil_id = $('#tehsil').val();
        var pincode = $('#txt_pin_code').val();
        var latitude = $('#txt_latitude').val();
        var longitude = $('#txt_longitude').val();
        var election_type_id = $('#election_type').val();
        var trust_type_id = $('#trust_type').val();
        var other_type = $('#txt_other_type').val();
        var cert_20A=$('#cert_20A').val();  
        var certificate_no = $('#txt_certificate_no').val(); 
        var cert_80G=$('#cert_80G').val();  
        var certificate_no1 = $('#txt_certificate_no1').val();         
        var itreturn=$('#itreturn').val();
        var acknowledgment=$('#txt_acknowledgment').val();
        var year=$('#txt_year').val();  
        var pan = $('#txt_pan_no').val(); 
        var fcra = $('#txt_fcra_no').val(); 
        var election_date = $('#txt_election_date').val(); 
        var financial_year = $('#txt_financial_year').val();         
        var img=$('#trust-image').val();    

            $('#btn_trust_save').prop('disabled', true);
            var action = $.trim($('#btn_trust_save').text());
            if (trust_name != "") { 
/*               if (registration_date != "") 
               {*/
                   if (registration_no != "") 
                   {
                       if (registration_type != "") 
                       {
                           if (address != "") 
                           {
                               if (tehsil_id != "") 
                               {
                                   if (election_type_id != "") 
                                   {
                                       if (trust_type_id != "") 
                                       {
                                            if (action == "Save") {
                                                $('#loadingDiv').show();
                                                if (img != ""){
                                                     $('#trust-image').upload(base_url+'Trust/trustSave',{trust_name:trust_name,registration_date:registration_date,registration_no:registration_no,registration_no1:registration_no1,registration_type:registration_type,email_id:email_id,landline_no:landline_no,address:address,tehsil_id:tehsil_id,pincode:pincode,latitude:latitude,longitude:longitude,election_type_id:election_type_id,trust_type_id:trust_type_id,other_type:other_type,cert_20A:cert_20A,certificate_no:certificate_no,cert_80G:cert_80G,certificate_no1:certificate_no1,itreturn:itreturn,acknowledgment:acknowledgment,year:year,pan:pan,fcra:fcra,election_date:election_date,financial_year:financial_year,img:img},function(res){
                                                          if (res>0)
                                                           {
                                                                if ($("#contact_detail tr").length > 0) {
                                                                   saveContact(res);      
                                                                }else{
                                                                    swal({
                                                                        title: "Well Done..!",
                                                                        text: "Trust Saved successfully.....!",
                                                                        type: "success",
                                                                        timer: 1000
                                                                    });
                                                                    $('.form-control').val('');
                                                                    $('#save-trust').modal('hide');                                                                       
                                                                }

                                                                 loadTrust();                                                                                  
                                                           }
                                                           else
                                                           { 
                                                               swal("Sorry..!", "Unable to Save Trust .........!", "error");
                                                           }
                                                        });  
                                                 }else{ 
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: base_url+'Trust/trustSave',
                                                            data: { trust_name:trust_name,registration_date:registration_date,registration_no:registration_no,registration_no1:registration_no1,registration_type:registration_type,email_id:email_id,landline_no:landline_no,address:address,tehsil_id:tehsil_id,pincode:pincode,latitude:latitude,longitude:longitude,election_type_id:election_type_id,trust_type_id:trust_type_id,other_type:other_type,cert_20A:cert_20A,certificate_no:certificate_no,cert_80G:cert_80G,certificate_no1:certificate_no1,itreturn:itreturn,acknowledgment:acknowledgment,year:year,pan:pan,fcra:fcra,election_date:election_date,financial_year:financial_year,img:img},
                                                            success: function (res) {
                                                                console.log(res);
                                                                if (res > 0) {
                                                                        if ($("#contact_detail tr").length > 0) {
                                                                           saveContact(res);      
                                                                        }else{
                                                                            swal({
                                                                                title: "Wel Done..!",
                                                                                text: "Trust Saved successfully.....!",
                                                                                type: "success",
                                                                                timer: 1000
                                                                            });
                                                                            $('.form-control').val('');
                                                                            $('#save-trust').modal('hide');                                                                       
                                                                        }   
                                                                        loadTrust();  
                                                                }
                                                                else {
                                                                    swal("Sorry..!", "Unable to Update Trust .........!", "error");
                                                                }
                                                            },
                                                            complete: function () {
                                                                $('#loadingDiv').hide();
                                                            }
                                                        });
                                                 }                      
                                            }
                                            if (action == "Update") {
                                                console.log('Update');
                                                var trust_id = $('#txt_trust_id').val();
                                                $('#loadingDiv').show();
                                                if (img != ""){
                                                         $('#trust-image').upload(base_url+'Trust/trustUpdate',{trust_id:trust_id,trust_name:trust_name,registration_date:registration_date,registration_no:registration_no,registration_no1:registration_no1,registration_type:registration_type,email_id:email_id,landline_no:landline_no,address:address,tehsil_id:tehsil_id,pincode:pincode,latitude:latitude,longitude:longitude,election_type_id:election_type_id,trust_type_id:trust_type_id,other_type:other_type,cert_20A:cert_20A,certificate_no:certificate_no,cert_80G:cert_80G,certificate_no1:certificate_no1,itreturn:itreturn,acknowledgment:acknowledgment,year:year,pan:pan,fcra:fcra,election_date:election_date,financial_year:financial_year,img:img},function(res){
                                                               console.log(res);
                                                              if (res > 0)
                                                               {
                                                                    if ($("#contact_detail tr").length > 0) {
                                                                       updateContact(res);       
                                                                    }else{
                                                                        swal({
                                                                            title: "Wel Done..!",
                                                                            text: "Trust Updated successfully.....!",
                                                                            type: "success",
                                                                            timer: 1000
                                                                        });
                                                                        $('.form-control').val('');
                                                                        $('#save-trust').modal('hide');                                                                       
                                                                    }                                                                                                  
                                                                    loadTrust();                                                                                  
                                                               }
                                                               else
                                                               { 
                                                                   swal("Sorry..!", "Unable to Update Trust .........!", "error");
                                                               }
                                                        }); 
                                                }else{
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: base_url+'Trust/trustUpdate',
                                                            data: { trust_id:trust_id,trust_name:trust_name,registration_date:registration_date,registration_no:registration_no,registration_no1:registration_no1,registration_type:registration_type,email_id:email_id,landline_no:landline_no,address:address,tehsil_id:tehsil_id,pincode:pincode,latitude:latitude,longitude:longitude,election_type_id:election_type_id,trust_type_id:trust_type_id,other_type:other_type,cert_20A:cert_20A,certificate_no:certificate_no,cert_80G:cert_80G,certificate_no1:certificate_no1,itreturn:itreturn,acknowledgment:acknowledgment,year:year,pan:pan,fcra:fcra,election_date:election_date,financial_year:financial_year,img:img},
                                                            success: function (res) {
                                                                 console.log(res);
                                                                if (res > 0) {
                                                                        if ($("#contact_detail tr").length > 0) {
                                                                           updateContact(res);       
                                                                        }else{
                                                                            swal({
                                                                                title: "Wel Done..!",
                                                                                text: "Trust Updated successfully.....!",
                                                                                type: "success",
                                                                                timer: 1000
                                                                            });
                                                                            $('.form-control').val('');
                                                                            $('#save-trust').modal('hide');                                                                       
                                                                        }                                          
                                                                        loadTrust();  
                                                                }
                                                                else {
                                                                    swal("Sorry..!", "Unable to Update Trust .........!", "error");
                                                                }
                                                            },
                                                            complete: function () {
                                                                $('#loadingDiv').hide();
                                                            }
                                                        });
                                                }
                                            }
                                       }else {
                                            swal({
                                                title: "Sorry....!",
                                                text: "Please Select Trust Type .....!!",
                                                type: "warning",
                                                timer: 2000
                                            });                
                                            $('#btn_trust_save').prop('disabled', false);
                                            $('#trust_type').focus();
                                        }
                                   }else {
                                        swal({
                                            title: "Sorry....!",
                                            text: "Please Select Election Type .....!!",
                                            type: "warning",
                                            timer: 2000
                                        });                
                                        $('#btn_trust_save').prop('disabled', false);
                                        $('#election_type').focus();
                                    }
                               }else {
                                    swal({
                                        title: "Sorry....!",
                                        text: "Please Select Tehsil .....!!",
                                        type: "warning",
                                        timer: 2000
                                    });                
                                    $('#btn_trust_save').prop('disabled', false);
                                    $('#tehsil').focus();
                                }
                           }else {
                                swal({
                                    title: "Sorry....!",
                                    text: "Please Enter Address .....!!",
                                    type: "warning",
                                    timer: 2000
                                });                
                                $('#btn_trust_save').prop('disabled', false);
                                $('#txt_address').focus();
                            }
                       }else {
                            swal({
                                title: "Sorry....!",
                                text: "Please Select Registration Type .....!!",
                                type: "warning",
                                timer: 2000
                            });                
                            $('#btn_trust_save').prop('disabled', false);
                            $('#registration_type').focus();
                        } 
                   }else {
                        swal({
                            title: "Sorry....!",
                            text: "Please Enter Registration Number .....!!",
                            type: "warning",
                            timer: 2000
                        });                
                        $('#btn_trust_save').prop('disabled', false);
                        $('#txt_registration_no').focus();
                    }                 
/*               }else {
                    swal({
                        title: "Sorry....!",
                        text: "Please Enter Registration Date .....!!",
                        type: "warning",
                        timer: 2000
                    });                
                    $('#btn_trust_save').prop('disabled', false);
                    $('#txt_registration_date').focus();
                }  */                

            }
            else {
                    swal({
                        title: "Sorry....!",
                        text: "Please Enter Trust Name .....!!",
                        type: "warning",
                        timer: 2000
                    });                
                    $('#btn_trust_save').prop('disabled', false);
                    $('#txt_trust_name').focus();
            }            
    });


});

    //Load all State
    function loadState() {
        $('#state').html('');
        $('#state').append('<option value="" selected>--- SELECT STATE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'State/loadState',
            data: "action=loadState",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['state']['length']; i++){
                    $('#state').append('<option value=' + data['state'][i]['state_id'] + '>' + data['state'][i]['state_name'].toUpperCase() + '</option>');
                }        
            }
        });
    }

    //Load all District
    function loadDistrict(ele,id) {
        $('#district').html('');
        $('#district').append('<option value="" selected>--- SELECT DISTRICT ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Tehsil/loadDistrict',
            data: {state_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['district']['length']; i++){
                    if (id==data['district'][i]['district_id']) {
                         $('#district').append('<option value=' + data['district'][i]['district_id'] + ' selected>' + data['district'][i]['district_name'].toUpperCase() + '</option>');
                    }else{
                         $('#district').append('<option value=' + data['district'][i]['district_id'] + '>' + data['district'][i]['district_name'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }

    //Load all Tehsil
    function loadTehsil(ele,id) {
        $('#tehsil').html('');
        $('#tehsil').append('<option value="" selected>--- SELECT TEHSIL ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Tehsil/loadTehsilData',
            data: {district_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['tehsil']['length']; i++){
                    if (id==data['tehsil'][i]['tehsil_id']) {
                         $('#tehsil').append('<option value=' + data['tehsil'][i]['tehsil_id'] + ' selected>' + data['tehsil'][i]['tehsil_name'].toUpperCase() + '</option>');
                    }else{
                         $('#tehsil').append('<option value=' + data['tehsil'][i]['tehsil_id'] + '>' + data['tehsil'][i]['tehsil_name'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }

    //Load all Election Type
    function loadElectionType() {
        $('#election_type').html('');
        $('#election_type').append('<option value="" selected>--- ELECTION TYPE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'ElectionType/loadElection',
            data: "action=loadElection",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['election']['length']; i++){
                    $('#election_type').append('<option value=' + data['election'][i]['election_id'] + '>' + data['election'][i]['election_type'].toUpperCase() + '</option>');
                }        
            }
        });
    }

    //Load all Trust Type
    function loadTrustType() {
        $('#trust_type').html('');
        $('#trust_type').append('<option value="" selected>--- TRUST TYPE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'TrustType/loadTrustType',
            data: "action=loadTrustType",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['trust']['length']; i++){
                    $('#trust_type').append('<option value=' + data['trust'][i]['trust_type_id'] + '>' + data['trust'][i]['trust_type'].toUpperCase() + '</option>');
                }        
            }
        });
    }

    //Load all Registration Type
    function loadRegistrationType() {
        $('#registration_type').html('');
        $('#registration_type').append('<option value="" selected>--- REGISTRATION TYPE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'RegistrationType/loadRegistrationType',
            data: "action=loadRegistrationType",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['registration']['length']; i++){
                    $('#registration_type').append('<option value=' + data['registration'][i]['registration_type_id'] + '>' + data['registration'][i]['registration_type'].toUpperCase() + '</option>');
                }        
            }
        });
    }

   /* Load All form Data */
   function loadTrust()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Trust'))
         {
           $('#dataTable-Trust').DataTable().destroy();
         }      
         $.post(base_url+'Trust/loadTrust',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['trust']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td id='"+data['trust'][i]['trust_id']+"tname'>"+data['trust'][i]['trust_name']+"</td>";
                  html += "<td id='"+data['trust'][i]['trust_id']+"tadd'>"+data['trust'][i]['address']+"</td>";
                  html += "<td><img id='"+data['trust'][i]['trust_id']+"timg' src="+base_url+data['trust'][i]['trust_image']+" style='height:130px;width:250px;border:1px solid #000;'></img></td>";                                                                                               
                  html += "<td><input type='hidden' id='"+data['trust'][i]['trust_id']+"phone' value="+data['trust'][i]['landline_no']+"><input type='hidden' id='"+data['trust'][i]['trust_id']+"lat' value="+data['trust'][i]['latitude']+"><input type='hidden' id='"+data['trust'][i]['trust_id']+"long' value="+data['trust'][i]['longitude']+"><a class='btn bg-teal waves-effect' id='"+data['trust'][i]['trust_id']+"view' onclick='getData(this)'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-purple waves-effect' id='"+data['trust'][i]['trust_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;<br><br><a class='btn bg-red waves-effect' href='#' id='"+data['trust'][i]['trust_id']+"del' onclick='deleteTrust(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a>&nbsp;&nbsp;<a class='btn bg-cyan waves-effect' href='#' id='"+data['trust'][i]['trust_id']+"map'  onclick='trustMap(this)'><span class='glyphicon glyphicon-globe' style='top:2px;'></span>&nbsp;&nbsp;Map</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadTrust').html(html);
              $('#dataTable-Trust').DataTable({
                  responsive: true
              });
         });
    } 

    function trustMap(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        var trust=$('#'+id+'tname').html();
        var address=$('#'+id+'tadd').html();
        var latitude=$('#'+id+'lat').val();
        var longitude=$('#'+id+'long').val();
        var landline=$('#'+id+'phone').val();
        var img=$('#'+id+'timg').attr('src');
        $('#loadingDiv').hide();
        $('#lblTrustName').html(trust);
        $('#lblAddress').html(address);
        $('#lblPhone').html(landline);
        $('#map-modal').modal('show');  
        initialize(latitude,longitude,trust,address,img);         
    }

    //Code to fetch data by trust_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        var action = $.trim($(ele).text());
        $.ajax({
            type: 'POST',
            url: base_url+'Trust/trustRecord',
            data: {trust_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
               for (var i = 0; i < data['single']['length']; i++){
                     $('#txt_trust_id').val(data['single'][i]['trust_id']);
                     $('#txt_trust_name').val(data['single'][i]['trust_name']);
                     $('#txt_registration_date').val(data['single'][i]['registration_date']);
                     $('#txt_registration_no').val(data['single'][i]['registration_no']);
                     $('#txt_registration_no1').val(data['single'][i]['registration_no1']);
                     $('#registration_type').val(data['single'][i]['registration_type_id']).trigger('change.select2'); 
                     $('#txt_email').val(data['single'][i]['email_id']);
                     $('#txt_landline_no').val(data['single'][i]['landline_no']);
                     $('#txt_location').html(data['single'][i]['address']);              
                     $('#state').val(data['single'][i]['state_id']).trigger('change.select2');
                     loadDistrict(data['single'][i]['state_id'],data['single'][i]['district_id']);     
                     loadTehsil(data['single'][i]['district_id'],data['single'][i]['tehsil_id']);                                     
                     $('#txt_pin_code').val(data['single'][i]['pincode']);
                     $('#txt_latitude').val(data['single'][i]['latitude']);
                     $('#txt_longitude').val(data['single'][i]['longitude']);
                     $('#election_type').val(data['single'][i]['election_type_id']).trigger('change.select2');
                     $('#trust_type').val(data['single'][i]['trust_type_id']).trigger('change.select2');
                     $('#txt_other_type').val(data['single'][i]['other_type']); 
                     $('#cert_20A').val(data['single'][i]['20A']).trigger('change.select2');  
                     $('#txt_certificate_no').val(data['single'][i]['certificate_no']); 
                     $('#cert_80G').val(data['single'][i]['80G']).trigger('change.select2');;  
                     $('#txt_certificate_no1').val(data['single'][i]['certificate_no1']);                      
                     $('#itreturn').val(data['single'][i]['it_return']).trigger('change.select2');; 
                     $('#txt_acknowledgment').val(data['single'][i]['ack_no']); 
                     $('#txt_year').val(data['single'][i]['year']);  
                     $('#txt_pan_no').val(data['single'][i]['pan']); 
                     $('#txt_fcra_no').val(data['single'][i]['fcra']); 
                     $('#txt_election_date').val(data['single'][i]['election_date']);  
                     $('#txt_financial_year').val(data['single'][i]['financial_year']);                      
                     $('#trustPhoto').attr('src',base_url+data['single'][i]['trust_image']);
                     $('#certDiv').show();
                     $('#certDiv1').show();
                     $('#returnDiv').show();
                     $('#otherTrust').show();
                }
                loadContact(id,action);
                (action=="Edit"? $("#trustTitle").html("Update Trust"):$("#trustTitle").html("View Trust"));
                (action=="Edit"? $("#btn_trust_save").show():$("#btn_trust_save").hide());
                (action=="Edit"? $("#add_more_person").show():$("#add_more_person").hide());
                (action=="Edit"? $(".center").show():$(".center").hide());
               
                $("#btn_trust_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-trust').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_trust_save').prop('disabled', false);
            }
        });
    }

   /* Load All Contact Data */
   function loadContact(id,action)
    {     
        $('#contact_detail').html("");
        $.ajax({
            type: 'POST',
            url: base_url+'Trust/loadTrustContact',
            data: {trust_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
               for (var i = 0; i < data['contact']['length']; i++){
                     var rid = ($("#contact_detail tr").length > 0) ? $('#contact_detail tr:last').attr('id'): 0;
                     rid = (rid!=0) ? parseInt(rid.substring(4))+1 : 1;
                     var td="<tr id=trid"+rid+"><td class='trsrno'>"+rid+"</td><td id=trname"+rid+" >"+data['contact'][i]['person_name']+"</td><td id=trbirth"+rid+">"+data['contact'][i]['date_of_birth']+"</td><td id=trmobile"+rid+" >"+data['contact'][i]['mobile']+"</td><td id=traltmobile"+rid+">"+data['contact'][i]['alternate_contact']+"</td><td id=tremail"+rid+">"+data['contact'][i]['email']+"</td><td id=traddress"+rid+">"+data['contact'][i]['address']+"</td>"+(action=="Edit" ? "<td><a class='btn btn-xs btn-danger rowdel'  id="+rid+"l onclick='rowDelete(this)'><i class='glyphicon glyphicon-trash'></i></td>":"")+"</tr>"; 
                     $('#contact_detail').append(td);
                }
            }
        });
    } 

    function saveContact(res){
        $("#contact_detail tr").each(function(){
            var id=$(this).attr('id');                  
            id=id.replace('trid','');
            var trust_id = res;
            var name=$("#trname"+id).html();
            var mobile=$("#trmobile"+id).html();
            var altno=$("#traltmobile"+id).html();
            var birth=$("#trbirth"+id).html();
            var address=$("#traddress"+id).html(); 
            var email=$("#tremail"+id).html();                                        
               $.ajax({
                    type: 'POST',
                    url: base_url+'Trust/contactDetailsSave',
                    data: { trust_id:trust_id,name:name,mobile:mobile,altno:altno,birth:birth,address:address,email:email},
                    success: function (resp) {
                        if (resp == 1) {
                                swal({
                                    title: "Wel Done..!",
                                    text: "Trust Saved successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-trust').modal('hide');                               
                        }
                        else {
                            swal("Sorry..!", "Unable to Save Trust .........!", "error");
                        }
                    },
                    complete: function () {
                        $('#loadingDiv').hide();
                    }
                });                                                                                                       
        }); 
    }

    function updateContact(res){
        $("#contact_detail tr").each(function(){
            var id=$(this).attr('id');                  
            id=id.replace('trid','');
            var trust_id = res;
            var name=$("#trname"+id).html();
            var mobile=$("#trmobile"+id).html();
            var altno=$("#traltmobile"+id).html();
            var birth=$("#trbirth"+id).html();
            var address=$("#traddress"+id).html();   
            var email=$("#tremail"+id).html();                                             
               $.ajax({
                    type: 'POST',
                    url: base_url+'Trust/contactDetailsUpdate',
                    data: { trust_id:trust_id,name:name,mobile:mobile,altno:altno,birth:birth,address:address,email:email},
                    success: function (resp) {
                        if (resp == 1) {
                                swal({
                                    title: "Wel Done..!",
                                    text: "Trust Updated successfully.....!",
                                    type: "success",
                                    timer: 1000
                                });
                                $('.form-control').val('');
                                $('#save-trust').modal('hide');                               
                        }
                        else {
                            swal("Sorry..!", "Unable to Update Trust .........!", "error");
                        }
                    },
                    complete: function () {
                        $('#loadingDiv').hide();
                    }
                });                                                                                                       
        }); 
    }

    //Code to delete Banner
    function deleteTrust(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Trust.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Trust/trustDelete',
                    data: {trust_id:id},
                    success: function (res) {
                        if (res == 1) {
                            loadTrust();
                            swal({
                                title: "Wel Done..!",
                                text: "Trust Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Trust .........!", "error");
                        }
                    }
                });
            }
        });
    }

    function rowDelete(ele)
    {  
        $(ele).closest("tr").remove();
        var i=1;
        $(ele).each(function(){
            $(this).html(i);
            i+=1;
        });   
    } 
