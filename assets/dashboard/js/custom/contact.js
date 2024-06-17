$(document).ready(function () {
 
    loadData();    

});



/* Load All form Data */
   function loadData()
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'Contact/loadData',{},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['name']+"</td>";
                  html += "<td>"+data['data'][i]['contact']+"</td>";
                  html += "<td>"+data['data'][i]['email']+"</td>";
                  html += "<td>"+data['data'][i]['service']+"</td>";
                  html += "<td>"+data['data'][i]['description']+"</td>";
                  html += "</tr>";                    
              }
              $('#loadBanner').html(html);
              $('#dataTable-Banner').DataTable({
                  dom: 'lBfrtip',
                  responsive: true,
                  buttons: [
                   'print','pdf','excel'
                 ]
              });
         });
    } 

