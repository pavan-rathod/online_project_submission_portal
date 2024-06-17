    <section class="content"> 
        <div class="container-fluid">
            <ol class="breadcrumb breadcrumb-bg-teal">
                <li><a href="javascript:void(0);"><i class="material-icons">home</i> Home</a></li>
                <li><a href="javascript:void(0);"><i class="glyphicon glyphicon-globe"></i> Administrative</a></li>
                <li class="active"><i class="material-icons">videocam</i> <?=$heading ?></li>
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
                                            <th>Video Name</th>
                                            <!-- <th>Thumbnail</th> -->
                                            <th>Video</th>
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
                                    <label for="tehsil-name" class="col-form-label">Video Name :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="hidden" class="form-control" id="txt_banner_id">  
                                    <input type="text" class="form-control" id="txt_banner_name" placeholder="Video Name">
                                </div>                                                        
                            </div><br />
<!--                             <div class="row">
                                <div class="col-md-3">
                                    <label for="recipient-name" class="col-form-label">Thumbnail :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="file" class="form-control" id="thumnail-image" name="files[]" accept="image/*">
                                    <br /><img src='' alt='' height='120' width='220' id="bannerPhoto">
                                </div>                                         
                            </div><br> -->                           
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="tehsil-name" class="col-form-label">Video URL :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9"> 
                                    <input type="text" class="form-control" id="txt_video_url" placeholder="Paste Video URL"><br>
                                    <div id="vdoDiv">
                                    </div>                                    
                                </div>                                                        
                            </div><br />                            
<!--                             <div class="row">
                                <div class="col-md-3">
                                    <label for="recipient-name" class="col-form-label">Video :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="file" class="form-control" id="banner-image" name="files[]" accept="video/*">
                                    <br />
                                    <div id="vdoDiv">
                                    </div>                                    
                                </div>                                         
                            </div><br>  -->                           
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

                            <button id="btn_banner_save" class="btn bg-teal waves-effect">    
                            </button>
                        </div>           
                    </div>
                </div>
            </div>
            <!-- End of Modal Popup Window -->
        </div>
    </section>
   <!--  <script src="<?=base_url();?>assets/dashboard/js/XHR2.js"></script> -->
    <script src="<?=base_url()?>assets/dashboard/js/custom/video.js"></script> 