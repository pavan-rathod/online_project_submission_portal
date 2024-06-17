 
        <!-- Bootstrap Core Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/bootstrap/js/bootstrap.js"></script>
   
        <!-- Slimscroll Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

        <!-- Waves Effect Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/node-waves/waves.js"></script>

        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/dataTables.buttons.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/buttons.flash.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/jszip.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/pdfmake.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/vfs_fonts.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/buttons.html5.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/dashboard/plugins/jquery-export/js/buttons.print.min.js"></script>

        <!-- Custom Js -->
        <script src="<?=base_url()?>assets/dashboard/js/admin.js"></script>

        <!-- Editable Table Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/editable-table/mindmup-editabletable.js"></script>

        <!-- Demo Js -->
        <script src="<?=base_url()?>assets/dashboard/js/demo.js"></script>  

        <!-- SweetAlert Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/sweetalert/sweetalert.min.js"></script>

        <!-- Custom Js -->
        <script src="<?=base_url()?>assets/dashboard/js/pages/ui/dialogs.js"></script>
        <script src="<?=base_url()?>assets/dashboard/js/pages/tables/editable-table.js"></script>

        <!-- Bootstrap Material Datetime Picker Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/jquery-ui/js/jquery-ui.js"></script>
        
        <!--  Print JS -->
        <script src="<?=base_url()?>assets/dashboard/js/script.js"></script> 

        <!-- Autosize Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/autosize/autosize.js"></script>

        <!-- Moment Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/momentjs/moment.js"></script>

        <!-- Print Plugin Js -->
        <script src="<?=base_url()?>assets/dashboard/plugins/jquery-print/jquery.PrintArea.js"></script>    

        <!-- Select Option -->
        <script src="<?=base_url()?>assets/dashboard/plugins/select/js/select2.min.js"></script>
        <script src="<?=base_url()?>assets/dashboard/plugins/select/js/custome-select.js"></script>                       

        <!-- Form Js --> 
        <script src="<?=base_url()?>assets/dashboard/js/menu.js"></script>
        <script src="<?=base_url()?>assets/dashboard/js/common.js"></script> 
         <script type="text/javascript">
               $(document).ready(function () {
                   $('#loadingDiv').hide();

                   $('.datepicker').datepicker({
                       dateFormat: 'yy/mm/dd'
                   });

                    $('.searchable').DataTable({
                          dom: 'Bfrtip',
                          responsive: true,
                          buttons: [
                              'excel', 'pdf','print'
                          ]          
                    });                   

               });           
           </script>

    </body>
</html>