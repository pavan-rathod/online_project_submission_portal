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
        $("#title").html("Video Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_banner_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-banner').modal('show');
        $('#btn_banner_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
        $("#vdoDiv").html("");
    });

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_banner_save').on('click', function (event) {
        event.preventDefault();
        var banner_name = $('#txt_banner_name').val();
        //var thumnail = $('#thumnail-image').val();
        var img = $('#txt_video_url').val();

            $('#btn_banner_save').prop('disabled', true);
              var action = $.trim($('#btn_banner_save').text());
              if (banner_name != "") {
                //if (description != "") { 
                      if (action == "Save") {
                          //if (thumnail != "") {
                              if (img != "") {
                                   $('#loadingDiv').show(); 
                                   $.post(base_url+'Video/dataSave',{banner_name: banner_name,img:img},function(res){
                                        console.log(res);
                                        if (res>0)
                                         {
                                              loadData();   
                                                                                              
                                              swal({
                                                  title: "Well Done..!",
                                                  text: "Video Saved successfully.....!",
                                                  type: "success",
                                                  timer: 1000
                                              });
                                              $('.form-control').val('');
                                              $('#save-banner').modal('hide');                                                                       
                                         }
                                         else
                                         { 
                                             swal("Sorry..!", "Unable to Save Video.........!", "error");
                                         }
                                  }); 
                               } else {
                                      $('#save-result').html("<br>Please Enter Video URL .....!");
                                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                      $('#btn_banner_save').prop('disabled', false);
                                      $('#banner-image').focus();                      
                               }   
                         /*} else {
                                $('#save-result').html("<br>Please Select Thumnail Image .....!");
                                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                                $('#btn_banner_save').prop('disabled', false);
                                $('#banner-image').focus();                      
                         }   */                                                    
                      }
                      if (action == "Update") {
                          var banner_id = $('#txt_banner_id').val();
                          $('#loadingDiv').show();
                          $.ajax({
                              type: 'POST',
                              url: base_url+'Video/dataUpdate',
                              data: { banner_id: banner_id, banner_name: banner_name, img:img},
                              success: function (res) {
                                  console.log(res);
                                  if (res == 1) {
                                      loadData();                
                                      swal({
                                          title: "Well Done..!",
                                          text: "Video Updated successfully.....!",
                                          type: "success",
                                          timer: 1000
                                      });
                                      $('.form-control').val('');
                                      $('#save-banner').modal('hide');
                                  }
                                  else {
                                      swal("Sorry..!", "Unable to Update Video .........!", "error");
                                  }
                              },
                              complete: function () {
                                  $('#loadingDiv').hide();
                              }
                          });                                            
                      }
              } else {
                    $('#save-result').html("<br>Please Enter  Name .....!");
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
         $.post(base_url+'Video/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['name'].toUpperCase()+"</td>";
                  //html += "<td><img src="+base_url+'Service_Video/'+data['data'][i]['thumbnail']+" style='height:150px;width:180px;border:1px solid #000;'></img></td>";
                  html += "<td><iframe width='300' height='200' src="+data['data'][i]['path']+" allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['video_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['video_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
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
            url: base_url+'Video/getRecord',
            data: {banner_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                    $('#txt_banner_id').val(data['single']['video_id']);
                    $('#txt_banner_name').val(data['single']['name']);
                    $('#txt_video_url').val(data['single']['path']);
                    //$('#bannerPhoto').attr('src',base_url+"Service_Video/"+data['single']['thumbnail']);
                    html = "<iframe width='300' height='200' src="+data['single']['path']+" allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
                    //html="<video controls height='200px' width='300px'><source src="+base_url+'Service_Video/'+data['single']['path']+" type='video/ogg' /><source src="+base_url+'Service_Video/'+data['single']['path']+" type='video/mp4' /></video>";
                    $("#vdoDiv").html(html);
                $("#title").html("Update Video");
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
            text: "You will not be able to recover this Video.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Video/dataDelete',
                    data: {banner_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                          loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Video Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Video .........!", "error");
                        }
                    }
                });
            }
        });
    }
