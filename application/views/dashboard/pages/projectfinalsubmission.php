    <section class="content"> 
        <div class="container-fluid">
            <ol class="breadcrumb breadcrumb-bg-teal">
                <li><a href="javascript:void(0);"><i class="material-icons">home</i> Home</a></li>
                <li class="active"><i class="material-icons">card_membership</i> <?=$heading ?></li>
             </ol> 
            <!-- Basic DataTable -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2><?=$heading ?> 
                            </h2>                        
                        </div>                    
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="dataTable-Banner">
                                    <thead>
                                        <tr>
                                            <th style="width: 60px;">Sr.No</th>
                                            <th style="width: 120px;">Group Leader</th>
                                            <th style="width: 120px;">Technology</th>
                                            <th>Title</th>
                                           <!--  <th>Company</th> -->
                                            <th style="width: 100px;">Date</th>
                                            <th style="width: 60px;">Download</th>
                                        </tr>
                                    </thead>
                                    <tbody id="loadBanner">                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>           
            <!-- #END# Basic DataTable -->
            <!-- Code for Modal Popup -->
            <div id="save-banner" class="modal fade" data-toggle="modal" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="blue bigger" id="title"><?=$heading ?> Form</h4>
                        </div>
                        <div class="modal-body">                                                                              
<!--                             <div class="row">
                                <div class="col-md-5">
                                    <label for="tehsil-name" class="col-form-label">Completion Letter<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-5">
                                    <a href="" id="completionLetter" target="_BLANK">Download</a>
                                </div>                                                        
                            </div><br /> -->     
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="tehsil-name" class="col-form-label">Project Documentation<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-5">
                                    <a href="" id="project_documentation" target="_BLANK">Download</a>
                                </div>                                                        
                            </div><br /> 
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="tehsil-name" class="col-form-label">Project PPT<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-5">
                                    <a href="" id="project_ppt" target="_BLANK">Download</a>
                                </div>                                                        
                            </div><br /> 
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="tehsil-name" class="col-form-label">Project ZIP<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-5">
                                    <a href="" id="project_zip" target="_BLANK">Download</a>
                                </div>                                                        
                            </div><br />                                                                                                                                                                                                 
                        </div>
                        <div id="loadingDiv" class="pageLoader">
                        </div>

                        <div class="modal-footer">
                            <button class="btn bg-blue-grey waves-effect" data-dismiss="modal">
                                <i class="ace-icon fa fa-times"></i>
                                Close
                            </button>
                        </div>           
                    </div>
                </div>
            </div>
            <!-- End of Modal Popup Window -->
        </div>
    </section> 
    <script src="<?=base_url();?>assets/dashboard/js/XHR2.js"></script>
    <script src="<?=base_url()?>assets/dashboard/js/custom/projectfinaldata.js"></script> 