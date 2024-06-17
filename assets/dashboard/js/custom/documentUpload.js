$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadDocument();    
    loadClass();
    loadType();    

    $(".searchData").select2({
        dropdownParent: $("#save-modal"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#title").html("Document Upload Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $("#btn_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-modal').modal('show');
        $('#btn_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
        $('#loadingDiv').hide();
    });

    $('#class').on('change',function(){
         var class_id = $('#class').val();
         loadMedium(class_id,'');
    });

    $('#medium').on('change',function(){
         var medium_id = $('#medium').val();
         loadSubject(medium_id,'');
    });   

    $('#subject').on('change',function(){
         var subject_id = $('#subject').val();
         loadChapter(subject_id,'');
    });       

    $('#loadingDiv').hide();

    //Code to save and update Tehsil
    $('#btn_save').on('click', function (event) {
        event.preventDefault();
        var class_id = $('#class').val();
        var medium_id = $('#medium').val();
        var subject_id = $('#subject').val();
        var chapter_id = $('#chapter').val();
        var type_id = $('#type').val();
        var doc = $('#doc-file').val();

            $('#btn_save').prop('disabled', true);
            var action = $.trim($('#btn_save').text());
            if (class_id != "") {
              if (medium_id != "") {
                 if (subject_id != "") {
                    if (chapter_id != "") {
                       if (type_id != "") {
                          if (doc != "") {
                              if (action == "Save") {
                                 $('#loadingDiv').show();
                                 $('#doc-file').upload(base_url+'DocumentUpload/documentSave',{class_id:class_id,medium_id: medium_id, subject_id:subject_id, chapter_id:chapter_id, type_id:type_id, doc:doc},function(res){
                                      if (res>0)
                                       {
                                            loadDocument();                                                                                  
                                            swal({
                                                title: "Well Done..!",
                                                text: "Document Uploaded successfully.....!",
                                                type: "success",
                                                timer: 1000
                                            });
                                            $('.form-control').val('');
                                            $('#save-modal').modal('hide');                                                                       
                                       }
                                       else
                                       { 
                                           swal("Sorry..!", "Unable to Upload Document .........!", "error");
                                       }
                                 });                            
                              }
                          } else {
                              $('#save-result').html("<br>Please Select Document .....!");
                              setTimeout(function () { $('#save-result').html(' '); }, 3000);
                              $('#btn_save').prop('disabled', false);
                              $('#doc-file').focus();                             
                          }                              
                              if (action == "Update") {
                                  var document_id = $('#txt_document_id').val();
                                  $('#loadingDiv').show();
                                       if (doc != "") {  
                                           $('#doc-file').upload(base_url+'DocumentUpload/documentUpdate',{document_id:document_id, class_id:class_id,medium_id: medium_id, subject_id:subject_id, chapter_id:chapter_id, type_id:type_id, doc:doc},function(res){
                                                if (res>0)
                                                 {
                                                      loadDocument();                                                                                  
                                                      swal({
                                                          title: "Well Done..!",
                                                          text: "Document Updated successfully.....!",
                                                          type: "success",
                                                          timer: 1000
                                                      });
                                                      $('.form-control').val('');
                                                      $('#save-modal').modal('hide');                                                                       
                                                 }
                                                 else
                                                 { 
                                                     swal("Sorry..!", "Unable to Update Document .........!", "error");
                                                 }
                                          });
                                       } else {
                                          $.ajax({
                                              type: 'POST',
                                              url: base_url+'DocumentUpload/documentUpdate',
                                              data: { document_id:document_id, class_id:class_id,medium_id: medium_id, subject_id:subject_id, chapter_id:chapter_id, type_id:type_id},
                                              success: function (res) {
                                                  if (res == 1) {
                                                      loadDocument();
                                                      swal({
                                                          title: "Well Done..!",
                                                          text: "Document Updated successfully.....!",
                                                          type: "success",
                                                          timer: 1000
                                                      });
                                                      $('.form-control').val('');
                                                      $('#save-modal').modal('hide');
                                                  }
                                                  else {
                                                      swal("Sorry..!", "Unable to Update Document .........!", "error");
                                                  }
                                              },
                                              complete: function () {
                                                  $('#loadingDiv').hide();
                                              }
                                          });                     
                                       }                       
                              }
                       } else {
                          $('#save-result').html("<br>Please Select Document Type .....!");
                          setTimeout(function () { $('#save-result').html(' '); }, 3000);
                          $('#btn_save').prop('disabled', false);
                          $('#type').focus();                         
                       }
                    } else {
                        $('#save-result').html("<br>Please Select Chapter .....!");
                        setTimeout(function () { $('#save-result').html(' '); }, 3000);
                        $('#btn_save').prop('disabled', false);
                        $('#chapter').focus(); 
                    }
                 } else {
                      $('#save-result').html("<br>Please Select Subject .....!");
                      setTimeout(function () { $('#save-result').html(' '); }, 3000);
                      $('#btn_save').prop('disabled', false);
                      $('#subject').focus(); 
                 }
              } else {
                    $('#save-result').html("<br>Please Select Medium .....!");
                    setTimeout(function () { $('#save-result').html(' '); }, 3000);
                    $('#btn_save').prop('disabled', false);
                    $('#medium').focus();                
              }
            }
            else {
                $('#save-result').html("<br>Please Select Class .....!");
                setTimeout(function () { $('#save-result').html(' '); }, 3000);
                $('#btn_save').prop('disabled', false);
                $('#class').focus();
            }            
    });


});


    //Load all Document Type
    function loadType() {
        $('#type').html('');
        $('#type').append('<option value="" selected>--- SELECT TYPE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'DocumentType/loadType',
            data: "",
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['type']['length']; i++){
                    $('#type').append('<option value=' + data['type'][i]['type_id'] + '>' + data['type'][i]['type_name'].toUpperCase() + '</option>');
                }        
            }
        });
    }

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
          url: base_url+'DocumentUpload/loadMedium',
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
  function loadSubject(ele,id) {
      $('#subject').html('');
      $('#subject').append('<option value="" selected>--- SELECT SUBJECT ---</option>');
      $.ajax({
          type: 'POST',
          url: base_url+'DocumentUpload/loadSubject',
          data: {medium_id:ele},
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

//Load all District
  function loadChapter(ele,id) {
      $('#chapter').html('');
      $('#chapter').append('<option value="" selected>--- SELECT CHAPTER ---</option>');
      $.ajax({
          type: 'POST',
          url: base_url+'DocumentUpload/loadChapter',
          data: {subject_id:ele},
          success: function (res) {
              var data = jQuery.parseJSON(res);
              console.log(data);
              for (var i = 0; i < data['chapter']['length']; i++){
                  if (id==data['chapter'][i]['chapter_id']) {
                       $('#chapter').append('<option value=' + data['chapter'][i]['chapter_id'] + ' selected>' + data['chapter'][i]['chapter_name'].toUpperCase() + '</option>');
                  }else{
                       $('#chapter').append('<option value=' + data['chapter'][i]['chapter_id'] + '>' + data['chapter'][i]['chapter_name'].toUpperCase() + '</option>'); 
                  }
              }        
          }
      });
  }   

   /* Load All form Data */
   function loadDocument()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Document'))
         {
           $('#dataTable-Document').DataTable().destroy();
         }      
         $.post(base_url+'DocumentUpload/loadDocument',{},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['document']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['document'][i]['class_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['document'][i]['medium'].toUpperCase()+"</td>";
                  html += "<td>"+data['document'][i]['subject_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['document'][i]['chapter_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['document'][i]['type_name'].toUpperCase()+"</td>";
                  html += "<td><a class='btn bg-purple waves-effect' id='"+data['document'][i]['document_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['document'][i]['document_id']+"del' onclick='deleteDocument(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-cyan waves-effect' href='#' id='"+data['document'][i]['document_id']+"del' onclick='viewDocument(this)'><span class='material-icons' style='top:5px;;font-size:17px;'>remove_red_eye</span>&nbsp;&nbsp;View</a><input type='hidden' id='doc"+data['document'][i]['document_id']+"' value='"+data['document'][i]['path']+"'></td>";                  
                  html += "</tr>";                    
              }
              $('#loadDocument').html(html);
              $('#dataTable-Document').DataTable({
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
            url: base_url+'DocumentUpload/documentRecord',
            data: {document_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
                for (var i = 0; i < data['single']['length']; i++){
                    //console.log(value.document_id);
                    $('#txt_document_id').val(data['single'][i]['document_id']);
                    $('#class').val(data['single'][i]['class_id']).trigger('change.select2');
                    loadMedium(data['single'][i]['class_id'],data['single'][i]['medium_id']);
                    loadSubject(data['single'][i]['medium_id'],data['single'][i]['subject_id']);
                    loadChapter(data['single'][i]['subject_id'],data['single'][i]['chapter_id']);
                    $('#type').val(data['single'][i]['type_id']).trigger('change.select2');
                    //$('#subject').val(data['single'][i]['subject_id']);
                    //$('#txt_chapter_name').val(data['single'][i]['chapter_name']);
                }
                $("#title").html("Update Document");
                $("#btn_save").html("<i class='ace-icon fa fa-edit'></i>&nbsp;Update");
                $('#save-modal').modal('show');
                $('.form-control').attr('disabled', false);
                $('#btn_save').prop('disabled', false);
            }
        });
    }

   //Code to delete Tehsil
    function deleteDocument(ele) {
        var code = $(ele).attr('id');
        var id = parseInt(code);
        swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this Document.......!!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function (result) {
            if (result == true) {
                $.ajax({
                    type: 'POST',
                     url: base_url+'DocumentUpload/documentDelete',
                    data: {document_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            loadDocument();
                            swal({
                                title: "Well Done..!",
                                text: "Document Deleted successfully.....!",
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

   //Code to delete Tehsil
    function viewDocument(ele) {
        var doc = $(ele).attr('id');
        var id = parseInt(doc);
        var path=$('#doc'+id).val();
        console.log(path);
        var html="<a class='btn bg-teal waves-effect pull-right' href='"+path+"' download><span class='glyphicon glyphicon-download' style='top:2px;'></span>&nbsp;&nbsp;Download</a><br><br>";
        html+="<object width='800' height='800' data='"+path+"'></object>";
        $('#loadViewer').html(html);
        $('#view_document').modal('show');        
    }