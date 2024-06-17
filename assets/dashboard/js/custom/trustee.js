$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadTrustee(); 
    loadTrust();

    $(".searchData").select2({
        dropdownParent: $("#save-trustee"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#trusteeTitle").html("Trustee Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $('#trustContact').html("");
        $('#trustAddress').html("");  
        $('#namePerson').html("");
        $('#contactPerson').html("");                  
        $("#btn_trustee_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-trustee').modal('show');
        $('#btn_trustee_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();   

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
    $('#btn_trustee_save').on('click', function (event) {
        event.preventDefault();
        var trust_id = $('#trust').val();
        var trustee_name = $('#txt_trustee_name').val();
        var contact = $('#txt_contact').val();
        var occupation = $('#txt_occupation').val();
        var address = $('#txt_address').val();             

            $('#btn_trustee_save').prop('disabled', true);
            var action = $.trim($('#btn_trustee_save').text());
            if (trust_id != "") { // && contact != "" && date != "" && visit_purpose != "") {
                if (trustee_name != "") {
                        if (action == "Save") {
                                $('#loadingDiv').show();
                                $.ajax({
                                    type: 'POST',
                                    url: base_url+'Trustee/trusteeSave',
                                    data: { trust_id:trust_id,trustee_name: trustee_name,contact:contact,occupation:occupation,address:address},
                                    success: function (res) {
                                        console.log(res);
                                        if (res == 1) {
                                            loadTrustee();
                                            swal({
                                                title: "Wel Done..!",
                                                text: "Trustee Saved successfully.....!",
                                                type: "success",
                                                timer: 1000
                                            });
                                            $('.form-control').val('');
                                            $('#save-trustee').modal('hide');
                                        }
                                        else {
                                            swal("Sorry..!", "Unable to Save Trustee .........!", "error");
                                        }
                                    },
                                    complete: function () {
                                        $('#loadingDiv').hide();
                                    }
                                });
                        }
                        if (action == "Update") {
                            var trustee_id = $('#txt_trustee_id').val();
                            $('#loadingDiv').show();
                            $.ajax({
                                type: 'POST',
                                url: base_url+'Trustee/trusteeUpdate',
                                data: { trustee_id: trustee_id,trust_id:trust_id,trustee_name: trustee_name,contact:contact,occupation:occupation,address:address},
                                success: function (res) {
                                   console.log(res);
                                    if (res == 1) {
                                        loadTrustee();
                                        swal({
                                            title: "Wel Done..!",
                                            text: "Trustee Updated successfully.....!",
                                            type: "success",
                                            timer: 1000
                                        });
                                        $('.form-control').val('');
                                        $('#save-trustee').modal('hide');
                                    }
                                    else {
                                        swal("Sorry..!", "Unable to Update Trustee .........!", "error");
                                    }
                                },
                                complete: function () {
                                    $('#loadingDiv').hide();
                                }
                            });
                        }
                } else {
                    $('#save-result').html("<br>Please Enter Trustee Name .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_trustee_save').prop('disabled', false);
                    $('#txt_trustee_name').focus();                     
                }
            }
            else {
                $('#save-result').html("<br>Please Select Trust .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_trustee_save').prop('disabled', false);
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
   function loadTrustee()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Trustee'))
         {
           $('#dataTable-Trustee').DataTable().destroy();
         }      
         $.post(base_url+'Trustee/loadTrustee',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['trustee']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['trustee'][i]['trust_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['trustee'][i]['trustee_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['trustee'][i]['contact_no']+"</td>";
                  html += "<td>"+data['trustee'][i]['occupation']+"</td>";
                  html += "<td>"+data['trustee'][i]['address']+"</td>";
                  html += "<td><a class='btn bg-teal waves-effect' id='"+data['trustee'][i]['trustee_id']+"view' onclick='getData(this)'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;<a class='btn bg-purple waves-effect' id='"+data['trustee'][i]['trustee_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['trustee'][i]['trustee_id']+"del' onclick='deleteTrustee(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadTrustee').html(html);
              $('#dataTable-Trustee').DataTable({
                  responsive: true
              });
         });
    } 

    //Code to fetch data by trustee_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        var action = $.trim($(ele).text());
        $.ajax({
            type: 'POST',
            url: base_url+'Trustee/trusteeRecord',
            data: {trustee_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $.each(data, function (key, value) {
                    $('#txt_trustee_id').val(value.trustee_id);
                    $('#trust').val(value.trust_id);
                    $('#txt_trustee_name').val(value.trustee_name);
                    $('#txt_contact').val(value.contact_no);
                    $('#txt_occupation').val(value.occupation);
                    $('#txt_address').val(value.address);
                    if (value.trust_id!=0){
                        $('#type').val("1").trigger('change.select2');
                        $('#trust').val(value.trust_id).change();
                        $('#trustContact').html("Telephone : "+value.landline_no);
                        $('#trustAddress').html("Address : "+value.address);                           
                    }   
                    else{
                        $('#type').val("2").trigger('change.select2');
                        $('#trust').val("").change();  
                        $('#trust').val("");
                        $('#trustContact').html('');
                        $('#trustAddress').html('');                                                                      
                    } 

                    (action=="Edit"? $("#txt_visit_purpose").show():$("#txt_visit_purpose").hide());
                    //(action=="Edit"? $("#lblPurpose").hide():$("#lblPurpose").show());                      
                });

                (action=="Edit"? $("#trusteeTitle").html("Update Trustee"):$("#trusteeTitle").html("View Trustee"));
                (action=="Edit"? $("#btn_trustee_save").show():$("#btn_trustee_save").hide());
                (action=="Edit"? $('.form-control').removeAttr('disabled'):$('.form-control').attr('disabled', true));

                $("#btn_trustee_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-trustee').modal('show');
                $('#btn_trustee_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Visitor
    function deleteTrustee(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Trustee.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Trustee/trusteeDelete',
                    data: {trustee_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadTrustee();
                            swal({
                                title: "Wel Done..!",
                                text: "Trustee Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Trustee .........!", "error");
                        }
                    }
                });
            }
        });
    }
