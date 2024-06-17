    <section class="content"> 
        <div class="container-fluid">
            <ol class="breadcrumb breadcrumb-bg-teal">
                <li><a href="javascript:void(0);"><i class="material-icons">home</i> Home</a></li>
                <li class="active"><i class="material-icons">assignment</i> <?=$heading ?></li>
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
                                            <th>Course Name</th>
                                            <!-- <th style="width: 120px;">Contact</th>
                                            <th>Email Id</th>
                                            <th>Address</th> -->
                                        </tr>
                                    </thead>
                                    <tbody id="loadBanner">                                       
                                              <?php
                                                for ($i=0; $i < count($data); $i++) { 
                                                    echo "<tr>";
                                                    echo "<td>".($i+1)."</td>";
                                                    echo "<td>".$data[$i]['course']."</td>"; 
                                                  /*  echo "<td>".$data[$i]['email']."</td>";                        
                                                    echo "<td>".$data[$i]['contact']."</td>"; 
                                                    echo "<td>".$data[$i]['address']."</td>";  */
                                                    echo "</tr>";
                                                 }
                                              ?>                                            
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>  
            <div class="row clearfix">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"></div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    <a href="<?=base_url();?>Admin/dashboard" class="btn bg-teal btn-lg waves-effect"><i class="glyphicon glyphicon-arrow-left"></i>&nbsp;&nbsp;Back</a>
                </div>            
            </div><br>                       
            <!-- #END# Basic DataTable -->          
        </div>
    </section> 
