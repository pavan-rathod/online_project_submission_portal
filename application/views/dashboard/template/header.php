<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html> 

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title><?=$heading ?></title>
        <!-- Favicon-->
        <link rel="icon" href="<?=base_url()?>assets/dashboard/images/favicon.ico" type="image/x-icon">

        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <!-- Bootstrap Core Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

        <!-- Waves Effect Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/node-waves/waves.css" rel="stylesheet" />

        <!-- Animation Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/animate-css/animate.css" rel="stylesheet" />

        <!-- Morris Chart Css-->
        <link href="<?=base_url()?>assets/dashboard/plugins/morrisjs/morris.css" rel="stylesheet" />

        <!-- Custom Css -->
        <link href="<?=base_url()?>assets/dashboard/css/style.css" rel="stylesheet">
        <link href="<?=base_url()?>assets/dashboard/css/collapse.css" rel="stylesheet">
        <link href="<?=base_url()?>assets/dashboard/css/custom-style.css" rel="stylesheet">

        <!-- Own CSS -->
        <!-- <link href="<?=base_url()?>assets/dashboard/css/e_billing.css" rel="stylesheet" />   -->

        <!-- Sweetalert Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/sweetalert/sweetalert.css" rel="stylesheet" />        

        <!-- JQuery DataTable Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet"> 

        <!-- Bootstrap Material Datetime Picker Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/jquery-ui/css/jquery-ui.css" rel="stylesheet" />

        <!-- Wait Me Css -->
        <link href="<?=base_url()?>assets/dashboard/plugins/waitme/waitMe.css" rel="stylesheet" />

        <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
        <link href="<?=base_url()?>assets/dashboard/css/themes/all-themes.css" rel="stylesheet" />

        <!-- Select Option -->
         <link href="<?=base_url()?>assets/dashboard/plugins/select/css/select2.min.css" rel="stylesheet" />

        <link rel="stylesheet" type="text/css" href="<?=base_url()?>assets/dashboard/plugins/jquery-export/css/jquery.dataTables.min.css">
        <link rel="stylesheet" type="text/css" href="<?=base_url()?>assets/dashboard/plugins/jquery-export/css/buttons.dataTables.min.css">         

        <script type="text/javascript">
                var base_url="<?=base_url();?>";
        </script> 
        <script src="<?=base_url()?>assets/dashboard/plugins/jquery/jquery.min.js"></script>
        
        <style type="text/css">
            table.invoice td{
                text-align: left;
            }
            table.invoice th{
                text-align: left;
            }        
            .modal-open .select2-dropdown {
            z-index: 10060;
            }

            .modal-open .select2-close-mask {
            z-index: 10055;
            }                                      
        </style>    
    </head>
    <body class="theme-teal">
        <!-- Page Loader -->
        <div class="page-loader-wrapper">
            <div class="loader">
                <div class="preloader">
                    <div class="spinner-layer pl-red">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
                <p>Please wait...</p>
            </div>
        </div>
        <!-- #END# Page Loader -->
        <!-- Overlay For Sidebars -->
        <div class="overlay"></div>
        <!-- #END# Overlay For Sidebars -->
        <!-- Search Bar -->
        <div class="search-bar">
            <div class="search-icon">
                <i class="material-icons">search</i>
            </div>
            <input type="text" placeholder="START TYPING...">
            <div class="close-search">
                <i class="material-icons">close</i>
            </div>
        </div>
        <!-- #END# Search Bar -->
        <!-- Top Bar -->
        <nav class="navbar">
            <div class="container-fluid">
                <div class="navbar-header"> 
                    <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                    <a href="javascript:void(0);" class="bars"></a>
                    <a class="navbar-brand" href="<?=base_url()?>Admin/dashboard">Admin - Dashboard</a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">                                         
                        <!-- User Info --> 
                        <li class="pull-right">
                            <div class="image" data-toggle="dropdown" id="dropdown_list" aria-haspopup="true" aria-expanded="true">
                                <img src="<?=base_url()?>assets/dashboard/images/user.png" width="48" height="48" alt="User"/>
                            </div>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:void(0);"><i class="material-icons">person</i>Profile</a></li>
                                <li role="seperator" class="divider"></li>
                                <li><a href="<?=base_url()?>reset"><i class="material-icons">build</i>Change Password</a></li>
                                <li role="seperator" class="divider"></li>
                                <li><a href="<?=base_url()?>Admin/logout"><i class="material-icons">input</i>Sign Out</a></li>
                            </ul>
                        </li>
                        <!-- #User Info -->
                        <!-- #END# Tasks -->
                    </ul>
                </div>
            </div>
        </nav>