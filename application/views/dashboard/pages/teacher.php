    <section class="content"> 
        <div class="container-fluid">
            <ol class="breadcrumb breadcrumb-bg-teal">
                <li><a href="javascript:void(0);"><i class="material-icons">home</i> Home</a></li>
                <li><a href="javascript:void(0);"><i class="glyphicon glyphicon-globe"></i> Administrative</a></li>
                <li class="active"><i class="material-icons">insert_photo</i> <?=$heading ?></li>
             </ol> 
            <!-- Basic DataTable -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2><?=$heading ?> 
                                <a href="#" id="save_modal" role="button" class="btn bg-indigo waves-effect pull-right" data-toggle="modal"> 
                                    <i class="fa fa-plus"></i>
                                    New <?=$heading ?>
                                </a> 
                            </h2>                       
                        </div>                    
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="dataTable-Banner">
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <!-- <th>Address</th> -->
                                            <th>Password</th>
                                            <th>Action</th>
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
                                    <label for="tehsil-name" class="col-form-label">Name :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="hidden" class="form-control" id="txt_id">  
                                    <input type="text" class="form-control" id="txt_name" placeholder="Name">
                                </div>                                                        
                            </div><br />  
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Contact :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9"> 
                                    <input type="text" class="form-control" id="txt_contact" placeholder="Contact">
                                </div>                                                        
                            </div><br /> 
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Email :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9"> 
                                    <input type="text" class="form-control" id="txt_email" placeholder="Email">
                                </div>                                                        
                            </div><br />  
                            <!-- <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Address :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9"> 
                                    <input type="text" class="form-control" id="txt_address" placeholder="Address">
                                </div>                                                        
                            </div><br />  -->
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Password :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9"> 
                                    <input type="text" class="form-control" id="txt_password" placeholder="Password">
                                </div>                                                        
                            </div><br />                                                                                                                                         
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
    <!-- <script src="<?=base_url();?>assets/dashboard/js/XHR2.js"></script> -->
    <script src="<?=base_url()?>assets/dashboard/js/custom/teacher.js"></script> 