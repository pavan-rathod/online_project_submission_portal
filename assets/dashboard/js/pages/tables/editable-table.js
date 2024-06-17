$(function () {

/*    $('.js-basic-example').DataTable({
        responsive: true
    }); */
 

    //Editable table
    $('#Editable_dataTable').editableTableWidget();

    $('#print-barcode').on('click',function(){
	    var heads = [];
		var rows = [];
		$("thead").find("th").each(function () {
		  	heads.push($(this).text().trim());
		});
		$("tbody tr").each(function () {
			cur = {};
			$(this).find("td").each(function(i, v) {
				cur[heads[i]] = $(this).text().trim();
			});
			rows.push(cur);
			cur = {};
		});

		$.ajax({ 
	        type: 'POST',
	        data: { products:rows},
	        url: base_url+'barcode/product/set',
	        success: function(data) {
	        	console.log(data);
	        	swal({
			        title: "Barcode Location!",
			        text: "Please Provide Location for Barcode Printing (1-40):",
			        type: "input",
			        showCancelButton: true,
			        closeOnConfirm: false,
			        animation: "slide-from-top",
			        inputPlaceholder: "Write something"
			    }, function (inputValue) {
			        if (inputValue === false) return false;
			        if (inputValue === "") {
			            swal.showInputError("You need to write something!"); return false
			        }
			        window.location = base_url+'barcode/product/print/'+inputValue;
			    });
	        }
	    });
    });

    $('.btn-barcode').on('click',function(){
	    var url=$(this).attr('name');
    	swal({
	        title: "Barcode Location!",
	        text: "Please Provide Location for Barcode Printing (1-40):",
	        type: "input",
	        showCancelButton: true,
	        closeOnConfirm: false,
	        animation: "slide-from-top",
	        inputPlaceholder: "Write something"
	    }, function (inputValue) {
	        if (inputValue === false) return false;
	        if (inputValue === "") {
	            swal.showInputError("You need to write something!"); return false
	        }
	        window.location = url+'/'+inputValue;
	    });
    });
});