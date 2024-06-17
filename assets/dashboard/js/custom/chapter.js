$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadChapter();    
    loadClass();

    $(".searchData").select2({
        dropdownParent: $("#save-chapter"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Chapter Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_chapter_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-chapter').modal('show');
        $('#btn_chapter_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#class').on('change',function(){
         var class_id = $('#class').val();
         loadMedium(class_id,'');
    });

    $('#medium').on('change',function(){
         var class_id = $('#class').val();
         var medium_id = $('#medium').val();
         loadSubject(class_id,medium_id,'');
    });    

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_chapter_save').on('click', function (event) {
        event.preventDefault();
        var subject_id = $('#subject').val();
        var chapter_name = $('#txt_chapter_name').val();

            $('#btn_chapter_save').prop('disabled', true);
            var action = $.trim($('#btn_chapter_save').text());
            if (subject_id != "") {
              if (chapter_name != "") {
                    if (action == "Save") {
                       $('#loadingDiv').show();
                        $.ajax({
                            type: 'POST',
                            url: base_url+'Chapter/chapterSave',
                            data: { subject_id:subject_id, chapter_name: chapter_name},
                            success: function (res) {
                                if (res == 1) {
                                    loadChapter();
                                    swal({
                                        title: "Well Done..!",
                                        text: "Chapter Saved successfully.....!",
                                        type: "success",
                                        timer: 1000
                                    });
                                    $('.form-control').val('');
                                    $('#save-chapter').modal('hide');
                                }
                                else {
                                    swal("Sorry..!", "Unable to Save Chapter .........!", "error");
                                }
                            },
                            complete: function () {
                                $('#loadingDiv').hide();
                            }
                        });                            
                    }
                    if (action == "Update") {
                        var chapter_id = $('#txt_chapter_id').val();
                        $('#loadingDiv').show();
                        $.ajax({
                              type: 'POST',
                              url: base_url+'Chapter/chapterUpdate',
                              data: { chapter_id:chapter_id,subject_id:subject_id, chapter_name: chapter_name},
                              success: function (res) {
                                  if (res == 1) {
                                      loadChapter();
                                      swal({
                                          title: "Well Done..!",
                                          text: "Chapter Updated successfully.....!",
                                          type: "success",
                                          timer: 1000
                                      });
                                      $('.form-control').val('');
                                      $('#save-chapter').modal('hide');
                                  }
                                  else {
                                      swal("Sorry..!", "Unable to Update Chapter .........!", "error");
                                  }
                              },
                              complete: function () {
                                  $('#loadingDiv').hide();
                              }
                        });                                             
                    }
              } else {
                    $('#save-result').html("<br>Please Enter Chapter Name .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_chapter_save').prop('disabled', false);
                    $('#txt_chapter_name').focus();                
              }
            }
            else {
                $('#save-result').html("<br>Please Select Subject .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_chapter_save').prop('disabled', false);
                $('#subject').focus();
            }            
    });


});


    //Load all class
    function loadClass() {
        $('#class').html('');
        $('#class').append('<option value="" selected>--- SELECT CLASS ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'ClassMst/loadClass',
            data: "action=loadClass",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['class']['length']; i++){
                    $('#class').append('<option value=' + data['class'][i]['class_id'] + '>' + data['class'][i]['class_name'].toUpperCase() + '</option>');
                }        
            }
        });
    }

  //Load all District
  function loadMedium(ele,id) {
      $('#medium').html('');
      $('#medium').append('<option value="" selected>--- SELECT MEDIUM ---</option>');
      $.ajax({
          type: 'POST',
          url: base_url+'Chapter/loadMedium',
          data: {class_id:ele},
          success: function (res) {
              var data = jQuery.parseJSON(res);
              for (var i = 0; i < data['medium']['length']; i++){
                  if (id==data['medium'][i]['medium_id']) {
                       $('#medium').append('<option value=' + data['medium'][i]['medium_id'] + ' selected>' + data['medium'][i]['medium'].toUpperCase() + '</option>');
                  }else{
                       $('#medium').append('<option value=' + data['medium'][i]['medium_id'] + '>' + data['medium'][i]['medium'].toUpperCase() + '</option>'); 
                  }
              }        
          }
      });
  }

//Load all District
  function loadSubject(cls,ele,id) {
      $('#subject').html('');
      $('#subject').append('<option value="" selected>--- SELECT SUBJECT ---</option>');
      $.ajax({
          type: 'POST',
          url: base_url+'Chapter/loadSubject',
          data: {medium_id:ele,class_id:cls},
          success: function (res) {
              var data = jQuery.parseJSON(res);
              for (var i = 0; i < data['subject']['length']; i++){
                  if (id==data['subject'][i]['subject_id']) {
                       $('#subject').append('<option value=' + data['subject'][i]['subject_id'] + ' selected>' + data['subject'][i]['subject_name'].toUpperCase() + '</option>');
                  }else{
                       $('#subject').append('<option value=' + data['subject'][i]['subject_id'] + '>' + data['subject'][i]['subject_name'].toUpperCase() + '</option>'); 
                  }
              }        
          }
      });
  }  

   /* Load All form Data */
   function loadChapter()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Chapter'))
         {
           $('#dataTable-Chapter').DataTable().destroy();
         }      
         $.post(base_url+'Chapter/loadChapter',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['chapter']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['chapter'][i]['class_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['chapter'][i]['medium'].toUpperCase()+"</td>";
                  html += "<td>"+data['chapter'][i]['subject_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['chapter'][i]['chapter_name'].toUpperCase()+"</td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['chapter'][i]['chapter_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['chapter'][i]['chapter_id']+"del' onclick='deleteChapter(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadChapter').html(html);
              $('#dataTable-Chapter').DataTable({
                  responsive: true
              });
         });
    } 


    //Code to fetch data by chapter_id
    function getData(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Chapter/chapterRecord',
            data: {chapter_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['single']['length']; i++){
                    //console.log(value.chapter_id);
                    $('#txt_chapter_id').val(data['single'][i]['chapter_id']);
                    $('#class').val(data['single'][i]['class_id']).trigger('change.select2');
                    loadMedium(data['single'][i]['class_id'],data['single'][i]['medium_id']);
                    loadSubject(data['single'][i]['medium_id'],data['single'][i]['subject_id']);
                    $('#subject').val(data['single'][i]['subject_id']);
                    $('#txt_chapter_name').val(data['single'][i]['chapter_name']);
                }
                $("#title").html("Update Chapter");
                $("#btn_chapter_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-chapter').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_chapter_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Tehsil
    function deleteChapter(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Chapter.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'Chapter/chapterDelete',
                    data: {chapter_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadChapter();
                            swal({
                                title: "Well Done..!",
                                text: "Chapter Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Chapter .........!", "error");
                        }
                    }
                });
            }
        });
    }
