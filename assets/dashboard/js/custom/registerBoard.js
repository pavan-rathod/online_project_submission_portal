$(document).ready(function () {

    $('.js-basic-example').DataTable({
          dom: 'lBfrtip',
          responsive: true,
          buttons: [
               'print','pdf','excel'
             ]
    });

    $("#btn_closeBoard").on('click',function(){
        var from_date = $('#txt_from_date').val();  
        var to_date = $('#txt_to_date').val();   
        loadBoard(from_date,to_date);            
    });

});

/* Load All form Data */
   function loadBoard(from,to)
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Board'))
         {
           $('#dataTable-Board').DataTable().destroy();
         }      
         $.post(base_url+'Report/registerBoard',{from:from,to:to},function(res){
             var data =jQuery.parseJSON(res);
             var html = "";              
             for (var i = 0; i < data['board']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['board'][i]['court_name'].toUpperCase()+"</td>";
                  html += "<td>"+data['board'][i]['application_no']+"</td>";
                  html += "<td>"+data['board'][i]['trust_name']+"</td>";
                  html += "<td>"+data['board'][i]['close_date']+"</td>";                 
                  html += "</tr>";                    
              }
              $('#loadBoard').html(html);
              $('#dataTable-Board').DataTable({
                  dom: 'lBfrtip',
                  responsive: true,
                  buttons: [
                       'print','pdf','excel'
                     ]
               });
         });
    } 

