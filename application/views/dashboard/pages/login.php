      
    <div class="login-box">
        <div class="logo">
            <a href="javascript:void(0);"><b>Admin Dashboard</b></a>
        </div>
        <div class="card">
            <div class="body">
                    <div class="msg"><b>Sign in to Admin Dashboard</b></div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" id="username" placeholder="Username" required autofocus>
                            <input type="hidden" id="txt_token" />
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

  <script src="<?=base_url();?>assets/dashboard/js/custom/login.js" type="text/javascript"></script>