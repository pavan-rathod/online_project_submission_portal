
<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">Client</li>
</ol>

    <section class="ftco-section bg-light">
      <div class="overlay"></div>
      <div class="container">
        <div class="row justify-content-center pb-5 mb-3">
          <div class="col-md-7 heading-section heading-section-white text-center ftco-animate">
            <!-- <span class="subheading">Testimonies</span> -->
            <h2>Happy Clients &amp; Feedbacks</h2>
          </div>
        </div>

        <div class="row ftco-animate">
          <div class="col-md-12">

              <div class="owl-carousel owl-theme"> 
                  <?php foreach ($data as $res) {  ?>
                        <div class="item">
                          <div class="testimony-wrap py-4">
                            
                            <div class="text">
                              <p class="mb-4"><?=$res['data']?></p>
                              <div class="d-flex align-items-center">
                                <div class="user-img" style="background-image: url(<?=base_url()?>/Client/<?=$res['path']?>)"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                  <?php } ?>                                                  
              </div><br><br>

          </div>
        </div>



      </div>
    </section>    
		