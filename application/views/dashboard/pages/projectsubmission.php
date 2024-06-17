    <section class="content"> 
        <div class="container-fluid">
            <ol class="breadcrumb breadcrumb-bg-teal">
                <li><a href="javascript:void(0);"><i class="material-icons">home</i> Home</a></li>
                <li class="active"><i class="material-icons">cloud_upload</i> <?=$heading ?></li>
             </ol> 
            <!-- Basic DataTable -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2><?=$heading ?> 
                                <!-- <a href="#" id="save_modal" role="button" class="btn bg-indigo waves-effect pull-right" data-toggle="modal"> 
                                    <i class="fa fa-plus"></i>
                                    New <?=$heading ?>
                                </a>  -->
                            </h2>                       
                        </div>                    
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="dataTable-Banner">
                                    <thead>
                                        <tr>
                                            <th style="width: 60px;">Sr.No</th>
                                            <th style="width: 120px;">Technology</th>
                                            <th>Title</th>
                                            <!-- <th>Company</th> -->
                                            <th style="width: 100px;">Date</th>
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
                            <!-- <div class="row">
                                <div class="col-md-3">
                                    <label for="recipient-name" class="col-form-label">Technology :<span class="compulsoryField">&nbsp;*</span></label> 
                                </div>
                                <div class="col-md-9">
                                    <select class="form-control searchData" id="course">
                                    </select> 
                                </div>                                                        
                            </div><br /> --> 
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="tehsil-name" class="col-form-label">Technology :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8"> 
                                    <input type="text" class="form-control" id="txt_tech" placeholder="Company Name">
                                </div>                                                        
                            </div><br />                                                                                                     
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="tehsil-name" class="col-form-label">Project Title :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                    <input type="hidden" class="form-control" id="txt_id">  
                                    <input type="hidden" class="form-control" id="txt_tech_id">  
                                    <input type="text" class="form-control" id="txt_name" placeholder="Project Title">
                                </div>                                                        
                            </div><br />                              
<!--                             <div class="row">
                                <div class="col-md-4">
                                    <label for="tehsil-name" class="col-form-label">Company :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8"> 
                                    <input type="text" class="form-control" id="txt_contact" placeholder="Company Name">
                                </div>                                                        
                            </div><br />  -->
<!--                             <div class="row">
                                <div class="col-md-4">
                                    <label for="recipient-name" class="col-form-label">Completion Letter :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                     <input class="form-control" id="file0" name="files[]" type="file">
                                    <input type="hidden" class="form-control" id="companyLetter">
                                </div>                                         
                            </div><br> -->   
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="recipient-name" class="col-form-label">Documentation :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                     <input class="form-control" id="file1" name="files[]" type="file">
                                    <input type="hidden" class="form-control" id="companySynopsis">
                                </div>                                         
                            </div><br> 
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="recipient-name" class="col-form-label">Project PPT :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                     <input class="form-control" id="file0" name="files[]" type="file">
                                    <input type="hidden" class="form-control" id="companyLetter">
                                </div>                                         
                            </div><br>   
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="recipient-name" class="col-form-label">Project Zip File :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                     <input class="form-control" id="file1" name="files[]" type="file">
                                    <input type="hidden" class="form-control" id="companySynopsis">
                                </div>                                         
                            </div><br>                                                                                                                                                                                                    
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-8"><span id="save-result" style="color:Red;font-weight:bold;margin-left:50px;"></span></div>
                            </div>                                                                                     
                        </div>
                        <div id="loadingDiv" class="pageLoader">
                        </div>

                        <div class="modal-footer">
                            <button class="btn bg-blue-grey waves-effect" data-dismiss="modal">
                                <i class="ace-icon fa fa-times"></i>
                                Cancel
                            </button>

                            <button id="btn_save" class="btn bg-teal waves-effect">    
                            </button>
                        </div>           
                    </div>
                </div>
            </div>
            <!-- End of Modal Popup Window -->
        </div>
    </section>
    <script src="<?=base_url();?>assets/dashboard/js/XHR2.js"></script>
    <script src="<?=base_url()?>assets/dashboard/js/custom/projectupload.js"></script> 