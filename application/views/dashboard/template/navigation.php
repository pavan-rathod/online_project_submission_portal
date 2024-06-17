    <section>
        <!-- Left Sidebar -->
        <aside id="leftsidebar" class="sidebar">
            <!-- Menu -->
            <div class="menu">
                <ul class="list">
                    <li class="header">MAIN NAVIGATION</li>
                    <li>
                        <a href="<?=base_url();?>Admin/dashboard">
                            <i class="material-icons">home</i>
                            <span>Home</span>
                        </a>
                    </li>
<!--                     <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="glyphicon glyphicon-globe icon"></i>
                            <span>Administrative</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="<?=base_url();?>Administrative/Slider/">
                                    <i class="material-icons">image</i>
                                    <span>Slider</span>
                                </a>                               
                            </li>   
                            <li>
                                <a href="<?=base_url();?>Administrative/Information/">
                                    <i class="material-icons">dvr</i>
                                    <span>Home Information</span>
                                </a>                               
                            </li>  
                            <li>
                                <a href="<?=base_url();?>Administrative/AboutInfo/">
                                    <i class="material-icons">insert_drive_file</i>
                                    <span>About Us Information</span>
                                </a>                               
                            </li>
                            <li>
                                <a href="<?=base_url();?>Administrative/Video/">
                                    <i class="material-icons">videocam</i>
                                    <span>Video</span>
                                </a>                               
                            </li>                                                                                                                
                            <li>
                                <a href="<?=base_url();?>Administrative/Services/">
                                    <i class="material-icons">assignment</i>
                                    <span>Services</span>
                                </a>                               
                            </li>
                            <li>
                                <a href="<?=base_url();?>Administrative/Client/">
                                    <i class="material-icons">description</i>
                                    <span>Client &amp; Portfolio</span>
                                </a>                               
                            </li>                                                          
                        </ul>
                    </li>
                    <li>
                        <a href="<?=base_url();?>Administrative/Contact/">
                            <i class="material-icons">contact_mail</i>
                            <span>Contact Message</span>
                        </a>
                    </li>  --> 

                    <?php 
                        if ($_SESSION['type']==1) {
                    ?>
                        <li>
                            <a href="<?=base_url();?>Teacher/ProjectApproval/">
                                <i class="material-icons icon">card_membership</i>
                                <span>Project Approval</span>
                            </a>                               
                        </li>  
                        <li>
                            <a href="<?=base_url();?>Teacher/ProjectApproval/ProjectSubmission">
                                <i class="material-icons icon">remove_red_eye</i>
                                <span>Project Submisson</span>
                            </a>                               
                        </li>                                             
                    <?php
                        } else if($_SESSION['type']==2) {
                    ?>
                        <li>
                            <a href="<?=base_url();?>Student/Project-Registration/">
                                <i class="material-icons icon">dvr</i>
                                <span>Project Registration</span>
                            </a>                               
                        </li> 
                        <li> 
                            <a href="<?=base_url();?>Student/Project-Status/">
                                <i class="material-icons icon">assignment</i>
                                <span>Project Status</span>
                            </a>                               
                        </li>  
                        <li> 
                            <a href="<?=base_url();?>Student/Project-Upload/">
                                <i class="material-icons icon">cloud_upload</i>
                                <span>Project Upload</span>
                            </a>                               
                        </li>                                                                    
                    <?php
                        }else{
                    ?>
                        <li>
                            <a href="javascript:void(0);" class="menu-toggle">
                                <i class="glyphicon glyphicon-globe icon"></i>
                                <span>Administrative</span>
                            </a>
                            <ul class="ml-menu">
                                <li>
                                    <a href="<?=base_url();?>Administrative/Teacher/">
                                        <i class="material-icons">person_add</i>
                                        <span>Teacher</span>
                                    </a>                               
                                </li>   
                                <li>
                                    <a href="<?=base_url();?>Administrative/Student/">
                                        <i class="material-icons">group_add</i>
                                        <span>Student</span>
                                    </a>                               
                                </li>  
                                <li>
                                    <a href="<?=base_url();?>Administrative/Course/">
                                        <i class="material-icons">school</i>
                                        <span>Course</span>
                                    </a>                               
                                </li>
                                <li>
                                    <a href="<?=base_url();?>Administrative/Technology/">
                                        <i class="material-icons">redeem</i>
                                        <span>Technology</span>
                                    </a>                               
                                </li>                                                                                                           
                                <li>
                                    <a href="<?=base_url();?>Administrative/AssignTechnology/">
                                        <i class="material-icons">assignment_turned_in</i>
                                        <span>Assign Technology</span>
                                    </a>                               
                                </li>    
                                <li>
                                    <a href="<?=base_url();?>Administrative/AssignProject/">
                                        <i class="material-icons">group_add</i>
                                        <span>Assign Project</span>
                                    </a>                               
                                </li>                                                                                      
                            </ul>
                        </li> 
                        <li>
                            <a href="javascript:void(0);" class="menu-toggle">
                                <i class="material-icons">desktop_mac</i>
                                <span>Project Library</span>
                            </a>
                            <ul class="ml-menu">
                                <li>
                                    <a href="<?=base_url();?>Administrative/AcademicYear/">
                                        <i class="material-icons">school</i>
                                        <span>Academic Year</span>
                                    </a>                               
                                </li>   
                                <li>
                                    <a href="<?=base_url();?>Administrative/UploadProject/">
                                        <i class="material-icons">card_membership</i>
                                        <span>Upload Project</span>
                                    </a>                               
                                </li>  
                                <!-- <li>
                                    <a href="<?=base_url();?>Administrative/Course/">
                                        <i class="material-icons">school</i>
                                        <span>Course</span>
                                    </a>                               
                                </li>
                                <li>
                                    <a href="<?=base_url();?>Administrative/Technology/">
                                        <i class="material-icons">redeem</i>
                                        <span>Technology</span>
                                    </a>                               
                                </li>                                                                                                           
                                <li>
                                    <a href="<?=base_url();?>Administrative/AssignTechnology/">
                                        <i class="material-icons">assignment_turned_in</i>
                                        <span>Assign Technology</span>
                                    </a>                               
                                </li>  -->                                                      
                            </ul>
                        </li> 
                        <li>
                            <a href="javascript:void(0);" class="menu-toggle">
                                <i class="material-icons">dvr</i>
                                <span>Reports</span>
                            </a>
                            <ul class="ml-menu">
                                <li>
                                    <a href="<?=base_url();?>Report/Teacher/">
                                        <i class="material-icons">assignment</i>
                                        <span>Teacher</span>
                                    </a>                               
                                </li>   
                                <li>
                                    <a href="<?=base_url();?>Report/Student/">
                                        <i class="material-icons">group_add</i>
                                        <span>Student</span>
                                    </a>                               
                                </li>  
                                <li>
                                    <a href="<?=base_url();?>Report/Course/">
                                        <i class="material-icons">school</i>
                                        <span>Course</span>
                                    </a>                               
                                </li>
                                <li>
                                    <a href="<?=base_url();?>Report/Technology/">
                                        <i class="material-icons">redeem</i>
                                        <span>Technology</span>
                                    </a>                               
                                </li>                                                                                                                
                                <li>
                                    <a href="<?=base_url();?>Report/CoursewiseTeacher/">
                                        <i class="material-icons">assignment_turned_in</i>
                                        <span>Coursewise Teacher</span>
                                    </a>                               
                                </li>  
                                <li>
                                    <a href="<?=base_url();?>Report/CoursewiseStudent/">
                                        <i class="material-icons">people_outline</i>
                                        <span>Coursewise Student</span>
                                    </a>                               
                                </li> 
                                <li>
                                    <a href="<?=base_url();?>Report/ApprovedProject/">
                                        <i class="material-icons">card_membership</i>
                                        <span>Approved Project</span>
                                    </a>                               
                                </li>  
                                <li>
                                    <a href="<?=base_url();?>Report/SubmittedProject/">
                                        <i class="material-icons">desktop_mac</i>
                                        <span>Submitted Project</span>
                                    </a>                               
                                </li>                                                                                                                     
                            </ul>
                        </li>                                             
                    <?php
                        }                        
                    ?> 
                                                         
 <!--                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">cloud_upload</i>
                            <span>Document</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="<?=base_url();?>Master/Document-Type/">
                                    <i class="material-icons icon">assignment</i>
                                    <span>Document Type</span>
                                </a>                               
                            </li>
                            <li>
                                <a href="<?=base_url();?>Master/Document-Upload/">
                                    <i class="fa fa-upload icon"></i>
                                    <span>Upload Document</span>
                                </a>                               
                            </li>  
                            <li>
                                <a href="<?=base_url();?>Master/Registration-Type/">
                                    <i class="material-icons">business_center</i>
                                    <span>Registration Type</span>
                                </a>                               
                            </li>                                                       
                        </ul>
                    </li> --> 
<!--                     <li> 
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">dvr</i>
                            <span>Report</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="<?=base_url();?>Master/registrationList">
                                    <i class="material-icons icon">assignment</i>
                                    <span>Registration</span>
                                </a>
                            </li> 
                            <li>
                                <a href="<?=base_url();?>Trust-Data/Trustee">
                                    <i class="fa fa-users icon"></i>
                                    <span>Trustee</span>
                                </a>
                            </li>                             
                            <li>
                                <a href="<?=base_url();?>Trust-Data/Work">
                                    <i class="material-icons icon">card_travel</i>
                                    <span>Work Details</span>
                                </a>
                            </li>  
                            <li>
                                <a href="<?=base_url();?>Documents">
                                    <i class="material-icons icon">cloud_upload</i>
                                    <span>Trust Documents</span>
                                </a>
                            </li>   -->                                                       
                        </ul>
                    </li>                      
<!--                    <li>
                        <a href="<?=base_url();?>Visitor">
                            <i class="material-icons icon">person_add</i>
                            <span>Visitor</span>
                        </a>
                    </li> 
                    <li>
                        <a href="<?=base_url();?>Stages">
                            <i class="material-icons icon">assignment</i>
                            <span>Stages</span>
                        </a>
                    </li>  
                    <li> 
                        <a href="<?=base_url();?>Board">
                            <i class="material-icons icon">dvr</i>
                            <span>Board Report</span>
                        </a>
                    </li>
                    <li> 
                        <a href="<?=base_url();?>Call-History">
                            <i class="material-icons icon">restore</i>
                            <span>Call History</span>
                        </a>
                    </li>  
                    <li> 
                        <a href="<?=base_url();?>Report">
                            <i class="glyphicon glyphicon-list-alt icon"></i>
                            <span>Report</span>
                        </a>
                    </li>  -->                                                                                

                </ul>
            </div>
            <!-- #Menu -->
                <!-- Footer -->
                <div class="legal">
                    <div class="copyright">
                        Copyrights &copy; All rights reserved <a href="http://idealartsoftware.com/"></a>. 
                    </div>
                </div>
                <!-- #Footer -->
        </aside>
        <!-- #END# Left Sidebar -->
    </section>