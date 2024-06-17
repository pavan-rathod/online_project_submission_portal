$(document).ready(function () {
 
    
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadData();    

    $(".searchData").select2({
        dropdownParent: $("#save-banner"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("About Us Information Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_banner_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-banner').modal('show');
        $('#btn_banner_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
        $('#serviceDetails').html(''); 
    });

    $('#btn_add').on('click',function(){
          var details=$('#txt_points').val();
          if (details != "") {
              var i = ($("#serviceDetails tr").length > 0) ? $('#serviceDetails tr:last').attr('id'): 0;
              i = (i!=0) ? parseInt(i.substring(4))+1 : 1;
              var td="<tr id=trid"+i+"><td class='trsrno'>"+i+"</td><td id=trdetails"+i+">"+details+"</td><td><a class='btn btn-xs btn-danger' id="+i+"l onclick='rowDelete(this)' ><i class='glyphicon glyphicon-trash'></i></tr>";               
              $('#serviceDetails').append(td);
              $('#txt_points').val('');
              $('#txt_points').focus();
          } else {
             alert("Please Enter About Us Point.............!!!");
             $('#txt_points').focus();
          } 
    });    

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_banner_save').on('click', function (event) {
        event.preventDefault();
        var banner_name = $('#txt_banner_name').val();
        var description = $('#txt_description').val();

            $('#btn_banner_save').prop('disabled', true);
            var action = $.trim($('#btn_banner_save').text());
              if (banner_name != "") {
                 if (description != "") { 
                        if (action == "Save") {
                             $('#loadingDiv').show();
                             $.post(base_url+'AboutInformation/dataSave',{banner_name: banner_name, description:description},function(res){
                                  console.log(res);
                                  if (res>0)
                                   {
                                            if ($("#serviceDetails tr").length > 0) {
                                                saveDetails(res);      
                                            }
                                            swal({
                                                title: "Well Done..!",
                                                text: "About Us Information Saved successfully.....!",
                                                type: "success",
                                                timer: 1000
                                            });
                                            $('.form-control').val('');
                                            $('#save-banner').modal('hide');
                                            loadData();                                                                       
                                   }
                                   else
                                   { 
                                       swal("Sorry..!", "Unable to Save About Us Information.........!", "error");
                                   }
                            });                           
                        }
                        if (action == "Update") {
                            var id = $('#txt_banner_id').val();
                            $('#loadingDiv').show(); 
                             $.post(base_url+'AboutInformation/dataUpdate',{id:id,banner_name: banner_name, description:description},function(res){
                                  if (res>0)
                                   {
                                        if ($("#serviceDetails tr").length > 0) {
                                            saveDetails(res);      
                                        }                                    
                                        loadData();                                                                                  
                                        swal({
                                            title: "Well Done..!",
                                            text: "About Us Information Updated successfully.....!",
                                            type: "success",
                                            timer: 1000
                                        });
                                        $('.form-control').val('');
                                        $('#save-banner').modal('hide');                                                                       
                                   }
                                   else
                                   { 
                                       swal("Sorry..!", "Unable to Update About Us Information .........!", "error");
                                   }
                            });                      
                        }
                  } else {
                        $('#save-result').html("<br>Please Enter Details .....!");
                        setTimeout(function () { $('#save-result').html(' '); }, 3000);
                        $('#btn_banner_save').prop('disabled', false);
                        $('#txt_description').focus();                
                  }                         
              } else {
                    $('#save-result').html("<br>Please Enter Main Point .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_banner_save').prop('disabled', false);
                    $('#txt_banner_name').focus();                
              }           
    });

});



/* Load All form Data */
   function loadData()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'AboutInformation/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['main_point']+"</td>";
                  html += "<td>"+data['data'][i]['details']+"</td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadBanner').html(html);
              $('#dataTable-Banner').DataTable({
                  responsive: true
              });
         });
    } 

    //Code to fetch data by banner_id
    function getData(ele) {
        $('#serviceDetails').html('');
        $('#loadingDiv').hide();
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'AboutInformation/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#txt_banner_id').val(data['single']['id']);
                $('#txt_banner_name').val(data['single']['main_point']);
                $('#txt_description').val(data['single']['details']);
                for (var i = 0; i < data['data']['length']; i++){
                    var j = ($("#serviceDetails tr").length > 0) ? $('#serviceDetails tr:last').attr('id'): 0;
                    j = (j!=0) ? parseInt(j.substring(4))+1 : 1;
                    var td="<tr id=trid"+j+"><td class='trsrno'>"+j+"</td><td id=trdetails"+j+">"+data['data'][i]['details']+"</td><td><a class='btn btn-xs btn-danger' id="+j+"l onclick='rowDelete(this)' ><i class='glyphicon glyphicon-trash'></i></tr>";               
                    $('#serviceDetails').append(td);                  
                }                
                $("#title").html("Update About Us Information");
                $("#btn_banner_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-banner').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_banner_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Tehsil
    function deleteData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this About Us Information.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'AboutInformation/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "About Us Information Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete About Us Information .........!", "error");
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

    function saveDetails(res){
        var total=0;       
        $("#serviceDetails tr").each(function(){
            var id=$(this).attr('id');                  
            id=id.replace('trid','');
            var service_id = res;
            var details=$("#trdetails"+id).html();   
            $.ajax({
                  type: 'POST',
                  url: base_url+'AboutInformation/detailsSave',
                  data: { service_id:service_id,details:details},
                  success: function (resp) {
                      if (resp == 1) {                              
                      }
                      else {
                          swal("Sorry..!", "Unable to Save About Information .........!", "error");
                      }
                  },
                  complete: function () {
                      $('#loadingDiv').hide();
                  }
            });                                                                                                       
        }); 
    }
