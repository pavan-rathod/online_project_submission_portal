$(document).ready(function () {

    $('.js-basic-example').DataTable({
          dom: 'lBfrtip',
          responsive: true,
          buttons: [
               'print','pdf','excel'
             ]
    }); 

    $("#btn_VisitorBoard").on('click',function(){
        var from_date = $('#txt_from_date').val();  
        var to_date = $('#txt_to_date').val();   
        loadVisitor(from_date,to_date);            
    });

});

/* Load All form Data */
   function loadVisitor(from,to)
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Visitor'))
         {
           $('#dataTable-Visitor').DataTable().destroy();
         }      
         $.post(base_url+'Report/loadVisitor',{from:from,to:to},function(res){
             var data =jQuery.parseJSON(res);
             console.log(data);
             var html = "";              
             for (var i = 0; i < data['visitor']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+(data['visitor'][i]['trust_name']!=null ? data['visitor'][i]['trust_name'].toUpperCase():'GENERAL VISITOR')+"</td>";
                  html += "<td>"+data['visitor'][i]['visitor_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['visitor'][i]['contact']+"</td>";
                  html += "<td>"+data['visitor'][i]['visit_date']+"</td>";
                  html += "<td>"+data['visitor'][i]['visit_purpose']+"</td>";
                  html += "</tr>";                    
              }
              $('#loadVisitor').html(html);
              $('#dataTable-Visitor').DataTable({
                  dom: 'lBfrtip',
                  responsive: true,
                  buttons: [
                       'print','pdf','excel'
                     ]
               });
         });
    } 


