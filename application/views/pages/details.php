
<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">Service Description</li>
</ol>

 
    <section class="ftco-section">
      <div class="container">
            <div class="row">
              <div class="col-lg-12 ftco-animate">
                <div class="cases-wrap d-md-flex">
                  <div class="img" style="background-image: url(<?=base_url()?>Services/<?=$services->image?>);"></div>
                  <div class="text pl-md-5">
                    <h2><?=$services->name; ?></h2>
                    <p style="text-align: justify;"><?=$services->description; ?></p> 
                   <!--  <ul>
                      <?php   foreach ($data as $res) {   ?>      
                            <li><?=$res['details']?></li>                    
                      <?php }  ?>                        
                    </ul> -->
                    <center><p><a href="<?=base_url()?>/all-available-services" class="btn btn-primary">Back</a></p></center>                    
                  </div>
                </div>
              </div> <!-- .col-md-8 -->
            </div>        
      </div>
    </section> <!-- .section -->
		