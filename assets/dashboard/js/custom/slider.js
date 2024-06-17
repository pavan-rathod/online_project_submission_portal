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
        $("#title").html("Slider Form");
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
        var banner_name = $('#txt_banner_name').val();
        //var description = $('#txt_description').val();
        var img = $('#banner-image').val();

            $('#btn_banner_save').prop('disabled', true);
            var action = $.trim($('#btn_banner_save').text());
              if (banner_name != "") {
                //if (description != "") { 
                      if (action == "Save") {
                          if (img != "") {
                               $('#loadingDiv').show();
                               $('#banner-image').upload(base_url+'Slider/dataSave',{banner_name: banner_name,img:img},function(res){
                                    if (res>0)
                                     {
                                          loadData();                                                                                  
                                          swal({
                                              title: "Well Done..!",
                                              text: "Slider Saved successfully.....!",
                                              type: "success",
                                              timer: 1000
                                          });
                                          $('.form-control').val('');
                                          $('#save-banner').modal('hide');                                                                       
                                     }
                                     else
                                     { 
                                         swal("Sorry..!", "Unable to Save Slider.........!", "error");
                                     }
                              }); 
                           } else {
                                  $('#save-result').html("<br>Please Select Image .....!");
                                  setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                  $('#btn_banner_save').prop('disabled', false);
                                  $('#banner-image').focus();                      
                           }                             
                      }
                      if (action == "Update") {
                          var id = $('#txt_banner_id').val();
                          $('#loadingDiv').show();
                               if (img != "") {  
                                   $('#banner-image').upload(base_url+'Slider/dataUpdate',{id:id,banner_name: banner_name,img:img},function(res){
                                        if (res>0)
                                         {
                                              loadData();                                                                                  
                                              swal({
                                                  title: "Wel Done..!",
                                                  text: "Slider Updated successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Update Slider .........!", "error");
                                         }
                                  });
                               } else {
                                  $.ajax({
                                      type: 'POST',
                                      url: base_url+'Slider/dataUpdate',
                                      data: { id: id, banner_name: banner_name, img:img},
                                      success: function (res) {
                                          console.log(res);
                                          if (res == 1) {
                                              loadData();
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Slider Updated successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');
                                          }
                                          else {
                                              swal("Sorry..!", "Unable to Update Slider .........!", "error");
                                          }
                                      },
                                      complete: function () {
                                          $('#loadingDiv').hide();
                                      }
                                  });                     
                               }                       
                      }
                /*} else {
                      $('#save-result').html("<br>Please Enter Description .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_banner_save').prop('disabled', false);
                      $('#txt_description').focus();                
                } */

              } else {
                    $('#save-result').html("<br>Please Enter Slogan .....!");
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
         $.post(base_url+'Slider/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['slogan']+"</td>";
                  //html += "<td>"+data['data'][i]['description']+"</td>";
                  html += "<td><img id='"+data['data'][i]['slider_id']+"timg' src="+base_url+'Slider/'+data['data'][i]['image']+" style='height:150px;width:180px;border:1px solid #000;'></img></td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['slider_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['slider_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
            url: base_url+'Slider/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                //for (var i = 0; i < data['single']['length']; i++){
                    $('#txt_banner_id').val(data['single']['slider_id']);
                    $('#txt_banner_name').val(data['single']['slogan']);
                    //$('#txt_description').val(data['single']['description']);
                    $('#bannerPhoto').attr('src',base_url+'Slider/'+data['single']['image']);
                //}
                $("#title").html("Update Slider");
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
            text: "You will not be able to recover this Slider.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Slider/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Slider Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Slider .........!", "error");
                        }
                    }
                });
            }
        });
    }
