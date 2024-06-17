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
                                            <th>Group Leader</th>
                                            <th style="width: 120px;">Technology</th>
                                            <th>Title</th>                                           
                                            <th style="width: 100px;">Date</th>
                                             <th>Remark</th>
                                             <th>Rejection Reason</th>
                                            <th style="width: 60px;">Action</th>
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
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Rejection Reason<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="hidden" class="form-control" id="txt_id">
                                    <textarea class="form-control" id="txt_name" placeholder="Rejection Reason"></textarea>  
                                </div>                                                        
                            </div><br />                                                                                                                 
                        </div>
                        <div id="loadingDiv" class="pageLoader">
                        </div>

                        <div class="modal-footer">
                            <button class="btn bg-blue-grey waves-effect" data-dismiss="modal">
                                <i class="ace-icon fa fa-times"></i>
                                Cancel
                            </button>

                            <button id="btn_reject" data-dismiss="modal" class="btn bg-teal waves-effect">
                               <i class="ace-icon fa fa-check"></i>
                                Save    
                            </button>
                        </div>           
                    </div>
                </div>
            </div>
            <!-- End of Modal Popup Window -->
            <!-- Code for Modal Popup -->
            <div id="approve-project" class="modal fade" data-toggle="modal" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="blue bigger" id="title1"></h4>
                        </div>
                        <div class="modal-body">  
                           <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Project Title:</label>
                                </div>
                                <div class="col-md-9"> 
                                    <input type="hidden" class="form-control" id="txt_titleId">
                                    <label for="tehsil-name" class="col-form-label" id="projectLabel"></label>
                                </div>                                                        
                            </div><br />                        
                           <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Suggestion/Remark:<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9"> 
                                    <textarea class="form-control" id="txt_remark" placeholder="Suggestion/Remark"></textarea>
                                </div>                                                        
                            </div><br />   
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-8"><span id="save-result" style="color:Red;font-weight:bold;margin-left:50px;"></span></div>
                            </div>                                                                                                                                                                                                                                                                                                 
                        </div>

                        <div class="modal-footer">
                            <button class="btn bg-blue-grey waves-effect" data-dismiss="modal">
                                <i class="ace-icon fa fa-times"></i>
                                Close
                            </button>
                             <button id="btn_saveRemark" class="btn bg-teal waves-effect">
                              Save Remark    
                            </button>                            
                        </div>           
                    </div>
                </div>
            </div>
            <!-- End of Modal Popup Window -->            
        </div>
    </section>  
    <script src="<?=base_url();?>assets/dashboard/js/XHR2.js"></script>
    <script src="<?=base_url()?>assets/dashboard/js/custom/projectdata.js"></script> 