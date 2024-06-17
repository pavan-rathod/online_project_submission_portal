$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadDocumentList();
    loadTrust();

    $(".searchData").select2({
        dropdownParent: $("#save-documents"),
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#docTitle").html("Trust Documents Form");
        $('.form-control').val('');
        $('#trustContact').html("");
        $('#trustAddress').html("");  
        $('#namePerson').html("");
        $('#contactPerson').html("");                  
        $('.searchData').val('').trigger('change.select2');
        $('#addWork').html("");
        $('#doc_list').hide();
        $("#btn_documents_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-documents').modal('show');
        $('#btn_documents_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    $('#trust').on('change',function(){
        var id=$('#trust').val();
        $.ajax({
            type: 'POST',
            url: base_url+'Trust/trustDetails',
            data: {trust_id:id},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                console.log(data);
               for (var i = 0; i < data['single']['length']; i++){
                     $('#trustContact').html("Telephone : "+data['single'][i]['landline_no']);
                     $('#trustAddress').html("Address : "+data['single'][i]['address']);              
                     $('#namePerson').html("Person Name: "+(data['single'][i]['person_name'] != "" ? data['single'][i]['person_name']:"------"));
                     $('#contactPerson').html("Person Contact : "+data['single'][i]['mobile']);            
                }
            }
        });
    });    

   //Code to save work details
    $('#btn_documents_save').on('click', function (event) {
        event.preventDefault();
        var trust_id = $('#trust').val();
        if (trust_id != "") {
            $('#btn_documents_save').prop('disabled', true);
            var action = $.trim($('#btn_documents_save').text());
            if (action == "Save") {
                $('#loadingDiv').show();
                 $("input[type='file']").upload(base_url+'Documents/documentSave',{trust_id:trust_id},function(res){
                      if (res>0)
                       {
                            loadDocumentList();
                            swal({
                                title: "Well Done..!",
                                text: "Trust Documents Saved successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                            $('.form-control').val('');
                            $('#save-documents').modal('hide');
                       }
                       else
                       { 
                           swal("Sorry..!", "Unable to Save Trust .........!", "error");
                       }
                    });  
            }
        }
        else {
            $('#trust').focus();
            swal({
                title: "Sorry..!",
                text: "Please Select Trust .......!!!",
                type: "error",
                timer: 1000
            });
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
   function loadDocumentList()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Documents'))
         {
           $('#dataTable-Documents').DataTable().destroy();
         }      
         $.post(base_url+'Documents/loadDocument',{},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['document']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td id=" + data['document'][i]['trust_id'] + "TrustName>" + data['document'][i]['trust_name'].toUpperCase() + "</td>";
                  html += "<td id=" + data['document'][i]['trust_id'] + "MobNo>"+data['document'][i]['landline_no']+"</td>";
                  html += "<td id=" + data['document'][i]['trust_id'] + "email>"+data['document'][i]['email_id']+"</td>";                 
                  html += "<td><a class='btn bg-cyan waves-effect' id=" + data['document'][i]['trust_id'] + "edit onClick='viewDocumentList(this);'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View</a>&nbsp;&nbsp;&nbsp;&nbsp;</td>";                                  
                  html += "</tr>";                    
              }
              $('#loadDocuments').html(html);
              $('#dataTable-Documents').DataTable({
                  responsive: true
              });
         });
    } 

    //Code to view data by item_id
    function viewDocumentList(ele) {
        if ($.fn.DataTable.isDataTable('#dataTable-Documents-List')) {
            $('#dataTable-Documents-List').DataTable().destroy();
        }
        var code = $(ele).attr('id');
        var id = parseInt(code);
        $.ajax({
            type: 'POST',
            url: base_url+'Documents/documentRecord',
            data: { trust_id: id },
            success: function (res) {
                var data = jQuery.parseJSON(res);
                var html = "";
                for (var i = 0; i < data['details']['length']; i++){
                    html += "<tr>";
                    html += "<td>" + (i+1) + "</td>";
                    var path = data['details'][i]['document'].replace('trust-documents/','');
                    html += "<td>" +path + "</td>";
                    //html += "<td><img id='"+data['trust'][i]['trust_id']+"timg' src="+base_url+data['trust'][i]['trust_image']+" style='height:130px;width:250px;border:1px solid #000;'></img></td>";
                    html += "<td>";
                    html += "<input type='hidden' id='"+data['details'][i]['document_id']+"doc' value='"+base_url+data['details'][i]['document']+"'><a class='btn bg-cyan waves-effect' href='#' id=" + data['details'][i]['document_id'] + "del onClick='viewDocument(this);'><span class='glyphicon glyphicon-eye-open' style='top:2px;'></span>&nbsp;&nbsp;View Documents</a>&nbsp;&nbsp;&nbsp;&nbsp;";
                    html += "<a class='btn bg-red waves-effect' href='#' id=" + data['details'][i]['document_id'] + "del onClick='deleteDocumentList(this);'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a>&nbsp;&nbsp;&nbsp;&nbsp;";
                    html += "</td>";
                    html += "</tr>";
                }
                $("#documentsList").html(html);
                $('#dataTable-Documents-List').DataTable({
                    responsive: true
                });
                $('#TrustData').html("&nbsp;&nbsp;" + $("#" + id + "TrustName").html());
                $('#TrustContact').html("&nbsp;&nbsp;" + $("#" + id + "MobNo").html());
                $('#TrustEmail').html("&nbsp;&nbsp;" + $("#" + id + "email").html());
                $('#doc_list').modal('show');
            }
        });
    }

    function viewDocument(ele) {
        $('#docContainer').data('');
        var code = $(ele).attr('id');
        var id = parseInt(code); 
        var doc=$('#'+id+'doc').val();
        var path="";
        if (doc.indexOf(' '))
         {
            path+=doc.split(' ').join('_'); 
         }
         else
         {
            path+=doc;
         }
        console.log(path);
        var html="<a class='btn bg-teal waves-effect pull-right' href='"+path+"' download><span class='glyphicon glyphicon-download' style='top:2px;'></span>&nbsp;&nbsp;Download</a><br><br>";
        html+="<object width='800' height='800' data='"+path+"'></object>";
        $('#loadViewer').html(html);
        $('#view_document').modal('show');
    }    

   //Code to delete District
    function deleteDocumentList(ele) {
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
                     url: base_url+'Documents/documentDelete',
                    data: {document_id:id},
                    success: function (res) {
                        if (res == 1) {                            
                            $('#doc_list').modal('hide');
                            loadDocumentList();
                            swal({
                                title: "Well Done..!",
                                text: "Document Deleted successfully.....!",
                                type: "success",
                                timer: 1000
                            });
                        }
                        else {
                            swal("Sorry..!", "Unable to Delete Document .........!", "error");
                        }
                    }
                });
            }
        });
    }

    var counter = 1;
    function AddFileUpload(){
         var div = document.createElement('DIV');
         html="";
         html+="<div id='"+counter+"addFile'><br><br><div class='col-md-3'></div><div class='col-md-7'><input class='form-control' id='file"+counter+"' name='files[]' type='file'></div>";                                    
         html+="<div class='col-md-2'><a href='#' id='"+counter+"Button' role='button' class='btn bg-teal waves-effect pull-right' style='font-size:12px;margin-top: 1px;margin-right: 3px;' title='Remove' onclick = 'RemoveFileUpload(this)'><i class='material-icons icon'>remove_circle_outline</i></a></div></div>";
         counter++;
         div.innerHTML=html;
         document.getElementById("FileUploadContainer").appendChild(div);         
    }

    function RemoveFileUpload(ele){
        var code = $(ele).attr('id');
        var id = parseInt(code);    
        $('#'+id+'addFile').remove();   
    }