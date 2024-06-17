$(document).ready(function () {

    $('.js-basic-example').DataTable({
        responsive: true
    });

    //loadStages();
    loadTrust();

    $(".searchData").select2({
        width: '100%'
    });    

    $("#save_modal").on('click', function () {
        $("#stageTitle").html("Stage Form");
        $('.form-control').val('');
        $('.searchData').val('').trigger('change.select2');
        $('#trustContact').html("");
        $('#trustAddress').html("");           
        $("#btn_stage_save").html("<i class='ace-icon fa fa-check'></i>&nbsp;Save");
        $('#save-stage').modal('show');
        $('#btn_stage_save').prop('disabled', false);
        $('.form-control').attr('disabled', false);
    });

    $('#loadingDiv').hide();

    $('#btn_WorkReport').on('click',function(){
            var trust_id=$('#trust').val();
            if (trust_id!="") {
                $.post(base_url+'Report/getWorkReport',{trust_id:trust_id},function(res){
                     var data =jQuery.parseJSON(res);
                     var html = "";  
                     html+="<table class='table table-bordered table-striped table-hover' id='dataTable' border='1px'>";           
                     for (var i = 0; i < data['trust']['length']; i++)
                      {
                          html += "<thead>";
                          html += "<tr>";
                          html += "<th>अ.नं.</th>";
                          html += "<th>तपशिल</th>";
                          html += "<th>माहिती</th>";
                          html += "</tr>";   
                          html += "</thead>"; 
                          html += "<tbody>";                   
                          html += "<tr>";
                          html += "<td> १ </td>";
                          html += "<td>संस्थेचे नाव व पत्ता </td>";
                          html += "<td>"+data['trust'][0]['trust_name'].toUpperCase()+" "+data['trust'][0]['address'].toUpperCase()+"</td>";
                          html += "</tr>"; 
                          html += "<tr>";
                          html += "<td> २ </td>";
                          html += "<td>संस्थेच्या प्रमुख  व्यक्तीचे नाव व संपर्क</td>";
                          html += "<td>"+data['trust'][0]['person_name'].toUpperCase()+" "+data['trust'][0]['mobile'].toUpperCase()+"</td>";
                          html += "</tr>";   
                          html += "<tr>";
                          html += "<td> ३ </td>";
                          html += "<td>संस्थेची स्थापना व नोंदणी क्रमांक </td>";
                          html += "<td>"+data['trust'][0]['registration_date']+" "+data['trust'][0]['registration_no']+" "+data['trust'][0]['registration_no1']+"</td>";
                          html += "</tr>";
                          html += "<tr>";
                          html += "<td> ४ </td>";
                          html += "<td>विश्वस्त येण्याची रित</td>";
                          html += "<td>"+data['trust'][0]['election_type']+"</td>";
                          html += "</tr>"; 
                          html += "<tr>";
                          html += "<td> ५ </td>";
                          html += "<td>इलेक्शनची तारीख</td>";
                          html += "<td>"+data['trust'][0]['election_date']+"</td>";
                          html += "</tr>";                        
                          html += "<tr>";
                          html += "<td> ६ </td>";
                          html += "<td>संस्थेकडे १२ ए  ८० जी प्रमाणपत्र</td>";
                          html += "<td>"+(data['trust'][0]['certificate']==1 ? "होय.": "नाही.")+" "+(data['trust'][0]['certificate']==1 ? data['trust'][0]['certificate_no']: "")+"</td>";
                          html += "</tr>";   
                          html += "<tr>";
                          html += "<td> ७  </td>";
                          html += "<td>संस्थेच्या रिटर्न संबधी तपशिल</td>";
                          html += "<td>"+(data['trust'][0]['it_return']==1 ? "होय.": "नाही.")+"</td>";
                          html += "</tr>"; 
                          html += "<tr>";
                          html += "<td> ८  </td>";
                          html += "<td>आपल्याकडील कामाचे  स्वरूप </td>";
                          html += "<td>";
                             for (var j = 0; j < data['work'][0]['length']; j++)
                               {      
                                  html += (j+1)+".   "+data['work'][0][j]['work_details']+"<br>";
                               }                    
                          html += "</td>";
                          html += "</tr>"; 
                          html += "<tr>";
                          html += "<td> ९  </td>";
                          html += "<td>निती आयोग </td>";
                          html += "<td>"+data['trust'][0]['registration_no']+" "+data['trust'][0]['registration_no1']+"</td>";
                          html += "</tr>";  
                          html += "<tr>";
                          html += "<td> १०  </td>";
                          html += "<td>FCRA</td>";
                          html += "<td>"+data['trust'][0]['fcra']+"</td>";
                          html += "</tr>";  
                          html += "<tr>";
                          html += "<td> ११  </td>";
                          html += "<td>पॅन नं.</td>";
                          html += "<td>"+data['trust'][0]['pan']+"</td>";
                          html += "</tr>";  
                          html += "</tbody>";                                                                                                                                             
                      }
                      html+="</table><br>";
                      $('#printAllGroup').html(html);
                      $('#dataTable').DataTable({
                          searching: false, paging: false, info: false,ordering:false,
                          dom: 'lBfrtip',
                          responsive: true,
                          buttons: [
                               'print'
                             ]
                       });

                 });                  

            } else {
                swal("Sorry..!", "Please Select Trust .........!", "error");
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

    function printReport() {
            var divContents = document.getElementById("dataTable").innerHTML; 
            var a = window.open('', '', 'height=500, width=500'); 
            a.document.write('<html>'); 
            a.document.write('<body > <h1>Div contents are <br>'); 
            a.document.write(divContents); 
            a.document.write('</body></html>'); 
            a.document.close(); 
            a.print(); 
    }
    
