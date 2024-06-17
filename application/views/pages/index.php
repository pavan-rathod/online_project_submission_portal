    <div class="hero-wrap">
      <div class="home-slider owl-carousel">
        <?php foreach ($data as $res) {  ?>
        <div class="slider-item" style="background-image:url(<?=base_url().'Slider/'.$res['image']; ?>);background-size: 100% 100%;">
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text align-items-center justify-content-center">
              <div class="col-md-8 ftco-animate">
                <div class="text w-100 text-center">
                  <!-- <h2>We Give Advice</h2> -->
                  <!-- <h1 class="mb-4"><?=$res['slogan']; ?></h1> -->
                  <!-- <p><a href="#" class="btn btn-white">Connect with us</a></p> -->
                </div>
              </div>
            </div>
          </div>
        </div>      
      <?php } ?>
      </div>
	  </div>
   	
    <section class="ftco-section ftco-no-pt bg-light">
    	<div class="container">
    		<div class="row">
          <div class="col-md-1">
             <!-- <br><br><br> <br><br><br>
             <img src="assets/images/logo.png" style="width: 300px;height: 150px;"  class="img-thumbnail"> -->
          </div>  
    			<div class="col-md-11">
            <p><br>
             <div class="row justify-content-center pb-5 mb-3">
                <div class="col-md-7 heading-section text-center ftco-animate">
                  <span class="subheading" style="font-size: 18px;">Welcome to Sknsits, Lonavala</span>
                </div>
              </div>
              <div style="background-image: url(<?=base_url()?>lg1.pg); background-size: 280px 170px; background-repeat: no-repeat;background-position: center;color: #000;font-weight: 500;text-align: justify;">
              STES’s SKN Sinhgad Institute of Technology & Science (SKNSITS) was established in year 2011. SKNSITS is approved by All India Council for Technical Education (AICTE), New Delhi, Directorate of Technical Education (DTE), Mumbai, and is affiliated to Savitribai Phule Pune University, Pune. NAAC Accredited with ' A ' grade .

The institute offers bachelor degree (B.E) in Mechanical Engineering, Computer Engineering & Information Technology with sanctioned intake of 210.                
                <!--  <?php foreach ($information as $res) {  ?>
                      <i class="fa fa-hand-o-right" aria-hidden="true"></i>&nbsp;&nbsp;<?=$res['information']?><br> 
                  <?php } ?> -->                
              </div>    
            </p>
    			</div>
        </div>
    	</div>
    </section>

    <!-- <section class="ftco-section testimony-section bg-light"> -->
     <!--  <div class="overlay"></div> -->
<!--       <div class="container">
        <div class="row ftco-animate">
          <div class="col-md-12">
              <div class="owl-carousel owl-theme"> 
                  <?php foreach ($video as $res) {  ?>
                      <div class="item"> 
                          <a href="<?=base_url()?>videoInformation/<?=$res['video_id']?>">
                             <iframe width='300' height='200' src="<?=$res['path'];?>" allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
                          </a>
                      </div>
                  <?php } ?>                               
              </div><br><br>
          </div>
        </div>
      </div> -->
   <!--  </section>     -->