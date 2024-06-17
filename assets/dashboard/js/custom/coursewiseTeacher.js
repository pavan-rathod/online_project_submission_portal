$(document).ready(function () {
 
    $('.js-basic-example').DataTable({
        responsive: true
    });

    loadCourse();

    $('#course').on('change',function(){
         var course=$('#course').val();
         if (course!='') 
         {
           loadData(course);
         }
    });

});


    //Load all District
    function loadCourse(ele,id) {
        $('#course').html('');
        $('#course').append('<option value="" selected>--- SELECT COURSE ---</option>');
        $.ajax({
            type: 'POST',
            url: base_url+'Course/loadData',
            data: {state_id:ele},
            success: function (res) {
                var data = jQuery.parseJSON(res);
                for (var i = 0; i < data['data']['length']; i++){
                    if (id==data['data'][i]['course_id']) {
                         $('#course').append('<option value=' + data['data'][i]['course_id'] + ' selected>' + data['data'][i]['course'].toUpperCase() + '</option>');
                    }else{
                         $('#course').append('<option value=' + data['data'][i]['course_id'] + '>' + data['data'][i]['course'].toUpperCase() + '</option>'); 
                    }
                }        
            }
        });
    }


/* Load All form Data */
   function loadData(id)
    {
        if ($.fn.DataTable.isDataTable('#dataTable-Banner'))
         {
           $('#dataTable-Banner').DataTable().destroy();
         }      
         $.post(base_url+'Report/coursewiseTeacherList',{id:id},function(res){
             var data =jQuery.parseJSON(res);
             //console.log(data);
             var html = "";              
             for (var i = 0; i < data['data']['length']; i++)
              {
                  html += "<tr>";
                  html += "<td>"+(i+1)+"</td>";
                  html += "<td>"+data['data'][i]['name']+"</td>";
                  //html += "<td>"+data['data'][i]['technology']+"</td>";
                  html += "<td>"+data['data'][i]['contact']+"</td>";
                  html += "<td>"+data['data'][i]['email']+"</td>";                                    
                //  html += "<td>"+data['data'][i]['address']+"</td>";
                 // html += "<td><a class='btn bg-purple waves-effect' id='"+data['data'][i]['tech_id']+"edit' onclick='getData(this)'><span class='glyphicon glyphicon-pencil' style='top:2px;'></span>&nbsp;&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn bg-red waves-effect' href='#' id='"+data['data'][i]['tech_id']+"del' onclick='deleteData(this)'><span class='glyphicon glyphicon-trash' style='top:2px;'></span>&nbsp;&nbsp;Delete</a></td>";                  
                  html += "</tr>";                    
              }
              $('#loadBanner').html(html);
              $('#dataTable-Banner').DataTable({
                  responsive: true
              });
         });
    } 
