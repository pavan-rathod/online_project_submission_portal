$(function () {
	
    //Exportable table
    $('.exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'csv', 'excel', 'pdf', 'print'
        ] 
    });
});