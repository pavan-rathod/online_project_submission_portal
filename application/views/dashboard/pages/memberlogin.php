      
    <div class="login-box">
        <div class="logo">
            <a href="javascript:void(0);"><b>Member Dashboard</b></a>
        </div>
        <div class="card">
            <div class="body">
                    <div class="msg"><b>Sign in to Member Dashboard</b></div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                         <select class="form-control searchData" id="type">
                            <option value="">Select Type</option>
                            <option value="1">Teacher</option>
                            <option value="2">Student</option>
                         </select> 
                    </div>                    
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" id="username" placeholder="Email Id" required autofocus>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" id="password" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-8"><span id="save-result" style="color:Red;font-weight:bold;margin-left:50px;"></span></div>
                    </div>  
                    <div class="row">
                        <div class="col-xs-8 p-t-5">
                        </div>
                        <div class="col-xs-4">
                            <button class="btn btn-block bg-teal waves-effect" type="submit" id="btnLogin">SIGN IN</button>
                        </div>
                    </div>
            </div>
        </div>
    </div>

   <script src="<?=base_url();?>assets/dashboard/js/custom/MemberLogin.js" type="text/javascript"></script>