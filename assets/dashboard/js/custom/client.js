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
        $("#title").html("Client & Portfolio Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_banner_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-banner').modal('show');
        $('#btn_banner_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
        $('#bannerPhoto').attr('src','')
    });

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_banner_save').on('click', function (event) {
        event.preventDefault();
        //var banner_name = $('#txt_banner_name').val();
        var description = $('#txt_description').val();
        var img = $('#banner-image').val();

            $('#btn_banner_save').prop('disabled', true);
            var action = $.trim($('#btn_banner_save').text());
              //if (banner_name != "") {
                if (description != "") { 
                      if (action == "Save") {
                          if (img != "") {
                               $('#loadingDiv').show();
                               $('#banner-image').upload(base_url+'Client/dataSave',{img:img, description:description},function(res){
                                    if (res>0)
                                     {
                                          loadData();                                                                                  
                                          swal({
                                              title: "Wel Done..!",
                                              text: "Client & Portfolio Saved successfully.....!",
                                              type: "success",
                                              timer: 1000
                                          });
                                          $('.form-control').val('');
                                          $('#save-banner').modal('hide');                                                                       
                                     }
                                     else
                                     { 
                                         swal("Sorry..!", "Unable to Save Client & Portfolio.........!", "error");
                                     }
                              }); 
                           } else {
                                  $('#save-result').html("<br>Please Select Video .....!");
                                  setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                  $('#btn_banner_save').prop('disabled', false);
                                  $('#banner-image').focus();                      
                           }                             
                      }
                      if (action == "Update") {
                          var banner_id = $('#txt_banner_id').val();
                          $('#loadingDiv').show();
                               if (img != "") {  
                                   $('#banner-image').upload(base_url+'Client/dataUpdate',{banner_id:banner_id ,img:img, description:description},function(res){
                                        if (res>0)
                                         {
                                              loadData();                                                                                  
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Client & Portfolio Updated successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Update Client & Portfolio .........!", "error");
                                         }
                                  });
                               } else {
                                  $.ajax({
                                      type: 'POST',
                                      url: base_url+'Client/dataUpdate',
                                      data: { banner_id: banner_id, description:description, img:img},
                                      success: function (res) {
                                          console.log(res);
                                          if (res == 1) {
                                              loadData();
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Client & Portfolio Updated successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');
                                          }
                                          else {
                                              swal("Sorry..!", "Unable to Update Client & Portfolio .........!", "error");
                                          }
                                      },
                                      complete: function () {
                                          $('#loadingDiv').hide();
                                      }
                                  });                     
                               }                       
                      }
                } else {
                      $('#save-result').html("<br>Please Enter Description .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_banner_save').prop('disabled', false);
                      $('#txt_description').focus();                
                } 

/*              } else {
                    $('#save-result').html("<br>Please Enter Client & Portfolio .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_banner_save').prop('disabled', false);
                    $('#txt_banner_name').focus();                
              } */          
    });


});



/* Load All form Data */
   function loadData()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'Client/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  //html += "<td>"+data['data'][i]['name'].toUpperCase()+"</td>";
                  html += "<td>"+data['data'][i]['data']+"</td>";
                  html += "<td><img id='"+base_url+'Client/'+data['data'][i]['client_id']+"timg' src="+base_url+'Client/'+data['data'][i]['path']+" style='height:180px;width:250px;border:1px solid #000;'></img></td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['client_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['client_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
        $('#loadingDiv').hide();
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Client/getRecord',
            data: {banner_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                //for (var i = 0; i < data['single']['length']; i++){
                    $('#txt_banner_id').val(data['single']['client_id']);
                    //$('#txt_banner_name').val(data['single']['name']);
                    $('#txt_description').val(data['single']['data']);
                    $('#bannerPhoto').attr('src',base_url+'Client/'+data['single']['path']);
                //}
                $("#title").html("Update Client & Portfolio");
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
            text: "You will not be able to recover this Client & Portfolio.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Client/dataDelete',
                    data: {banner_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Client & Portfolio Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Client & Portfolio .........!", "error");
                        }
                    }
                });
            }
        });
    }
