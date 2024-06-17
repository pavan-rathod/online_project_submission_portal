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
        $("#title").html("Information Form");
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

            $('#btn_banner_save').prop('disabled', true);
            var action = $.trim($('#btn_banner_save').text());
              if (banner_name != "") {
                      if (action == "Save") {
                           $('#loadingDiv').show();
                           $.post(base_url+'Information/dataSave',{banner_name: banner_name},function(res){
                                console.log(res);
                                if (res>0)
                                 {
                                      loadData();                                                                                  
                                      swal({
                                          title: "Well Done..!",
                                          text: "Information Saved successfully.....!",
                                          type: "success",
                                          timer: 1000
                                      });
                                      $('.form-control').val('');
                                      $('#save-banner').modal('hide');                                                                       
                                 }
                                 else
                                 { 
                                     swal("Sorry..!", "Unable to Save Information.........!", "error");
                                 }
                          });                           
                      }
                      if (action == "Update") {
                          var id = $('#txt_banner_id').val();
                          $('#loadingDiv').show(); 
                           $.post(base_url+'Information/dataUpdate',{id:id,banner_name: banner_name},function(res){
                                if (res>0)
                                 {
                                      loadData();                                                                                  
                                      swal({
                                          title: "Well Done..!",
                                          text: "Information Updated successfully.....!",
                                          type: "success",
                                          timer: 1000
                                      });
                                      $('.form-control').val('');
                                      $('#save-banner').modal('hide');                                                                       
                                 }
                                 else
                                 { 
                                     swal("Sorry..!", "Unable to Update Information .........!", "error");
                                 }
                          });                      
                      }
              } else {
                    $('#save-result').html("<br>Please Enter Information .....!");
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
         $.post(base_url+'Information/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['information']+"</td>";
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
        $('#loadingDiv').hide();
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Information/getRecord',
            data: {id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                $('#txt_banner_id').val(data['single']['id']);
                $('#txt_banner_name').val(data['single']['information']);
                $("#title").html("Update Information");
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
            text: "You will not be able to recover this Information.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Information/dataDelete',
                    data: {id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadData();
                            swal({
                                title: "Well Done..!",
                                text: "Information Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Information .........!", "error");
                        }
                    }
                });
            }
        });
    }
