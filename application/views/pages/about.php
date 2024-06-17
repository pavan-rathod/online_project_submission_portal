 
<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">About Us</li>
</ol> 
  
    <section class="ftco-section ftco-no-pt bg-light ftco-faqs">
    	<div class="container">    <br>
    		<div class="row">
    			<div class="col-lg-6">
    				<div class="img-faqs w-100">
	    				<div class="img mb-4 mb-sm-0" style="background-image:url(assets/images/about-2.jpg);">
	    				</div>
	    				<div class="img img-2 mb-4 mb-sm-0" style="background-image:url(assets/images/ab.jpg);">
	    				</div>
	    			</div>
    			</div>
    			<div class="col-lg-6 pl-lg-5">
    				<div class="heading-section mb-5 mt-5 mt-lg-0">
    					<!-- <span class="subheading">FAQs</span> -->
	            <!-- <h2 class="mb-3">About Us</h2> -->
	            <!-- <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p> -->
    				</div> 
    				<div id="accordion" class="myaccordion w-100" aria-multiselectable="true">
            <?php $i=0;  foreach ($about as $res)
                      {  
            ?> 
						  <div class="card">
						    <div class="card-header p-0" id="heading_<?=$res['id']?>">
						      <h2 class="mb-0">
						        <button href="#collapse_<?=$res['id']?>" class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" data-parent="#accordion" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">
						        	<p class="mb-0"><?=$res['main_point']?></p>
						          <i class="fa" aria-hidden="true"></i>
						        </button>
						      </h2>
						    </div>
						    <div class="collapse" id="collapse_<?=$res['id']?>" role="tabpanel" aria-labelledby="headingOne">
						      <div class="card-body py-3 px-0 text" style="text-align: justify;">
						      	    <?=$res['details']?><br>
				                    <ul>
				                      <?php $j=0; if (!empty($info[$i])) {
				                      	 for ($j=0; $j < count($info[$i]); $j++) {   ?>      
				                            <li><?=$info[$i][$j]['details'] ?></li>
				                      <?php  }  } ?>                        
				                    </ul>						      	        
						      </div>
						    </div>
						  </div>
            <?php
                  $i++;  }                    
            ?> 

<!-- 				  <div class="card">
						    <div class="card-header p-0" id="headingTwo" role="tab">
						      <h2 class="mb-0">
						        <button href="#collapseTwo" class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" data-parent="#accordion" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTwo">
						        	<p class="mb-0">Our Vision</p>
						          <i class="fa" aria-hidden="true"></i>
						        </button>
						      </h2>
						    </div>
						    <div class="collapse" id="collapseTwo" role="tabpanel" aria-labelledby="headingTwo">
						      <div class="card-body py-3 px-0">
						      	<ol style="text-align: justify;">
						      		<li>"Our vision is to be most trusted engineering service industry; to build a place where clients can come and find all services in the field of mechanical engineering Design." </li>
						      	</ol>
						      </div>
						    </div>
						  </div>

						  <div class="card">
						    <div class="card-header p-0" id="headingThree" role="tab">
						      <h2 class="mb-0">
						        <button href="#collapseThree" class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" data-parent="#accordion" data-toggle="collapse" aria-expanded="false" aria-controls="collapseThree">
						        	<p class="mb-0">Why us ?</p>
						          <i class="fa" aria-hidden="true"></i>
						        </button>
						      </h2>
						    </div>
						    <div class="collapse" id="collapseThree" role="tabpanel" aria-labelledby="headingTwo">
						      <div class="card-body py-3 px-0">
                    <p style="margin-left: 30px;">At <b>“GlobTech Solutions"</b> we assure our clients delightness with below key offerings </p>
						      	<ol>
						      		<li>Trust & Honesty  </li>
						      		<li>Timely offering services</li>
						      		<li>Versatile technically experience  </li>
						      		<li>Confidentiality of data</li>
						      		<li>Updated to latest technology   </li>
                      <li>Client Satisfaction with competitive cost.</li>
						      	</ol>
						      </div>
						    </div>
						  </div> -->

						</div>
	        </div>
        </div>
    	</div>
    </section>		

<!--     <section class="ftco-section ftco-no-pb ftco-no-pt bg-secondary">
      <div class="container py-5">
    		<div class="row">
          <div class="col-md-7 d-flex align-items-center">
            <h2 class="mb-3 mb-sm-0" style="color:black; font-size: 22px;">Sign Up for Your Free 1st Accounting Consultation</h2>
          </div>
          <div class="col-md-5 d-flex align-items-center">
            <form action="#" class="subscribe-form">
              <div class="form-group d-flex">
                <input type="text" class="form-control" placeholder="Enter email address">
                <input type="submit" value="Subscribe" class="submit px-3">
              </div>
            </form>
          </div>
        </div>
      </div>
    </section> -->

