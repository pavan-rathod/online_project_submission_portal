    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>DASHBOARD</h2>
            </div>
            <div class="alert bg-purple alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                <?php //echo print_r($_SESSION); ?>
                <?php
                    if ($_SESSION['type']==1) {
                        echo "Welcome to Sknsits Teacher Dashboard......!!!";
                    } else if($_SESSION['type']==2) {
                        echo "Welcome to Sknsits Student Dashboard......!!!";
                    }else{
                        echo "Welcome to Sknsits Admin Dashboard......!!!";
                    }
                    
                ?>
                
            </div>
        </div>
    </section>

