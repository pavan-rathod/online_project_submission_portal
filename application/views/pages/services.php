 
<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">Courses</li>
</ol>
  
    <section class="ftco-section">
      <div class="container">

        <div class="row d-flex">
            <?php   foreach ($services as $res)
                      {  
            ?>                          
                      <div class="col-md-4 d-flex ftco-animate">
                        <div class="blog-entry align-self-stretch">
                          <center><a href="<?=base_url()?>detailInformation/<?=$res['service_id']?>"><h4 style="font-size: 16px;"><b><?=$res['name']; ?></b></h4></a></center>
                          <a  href="<?=base_url()?>detailInformation/<?=$res['service_id']?>" class="block-20 rounded zoom" style="background-image: url(<?=base_url()?>Services/<?=$res['image']?>);">
                          </a>

                          <div class="text p-4">
                            <div class="meta mb-2">
                            </div>
                            <h3 class="heading"><a href="#" style="font-size: 15px;text-align: justify;"><?=substr($res['description'], 0,200); ?></a></h3>
                            <center><p><a href="<?=base_url()?>detailInformation/<?=$res['service_id']?>" class="btn btn-primary">Read more</a></p></center>
                          </div>
                        </div>
                      </div>
            <?php
                    }                    
            ?>          
        </div>
      </div>
    </section>
    <style type="text/css">
          .zoom {
            /*opacity: 0.6;*/
          }
          .zoom:hover {
            /*opacity: 1;*/
            border: 1px solid #000000;            
            -ms-transform: scale(1.1); /* IE 9 */
            -webkit-transform: scale(1.1); /* Safari 3-8 */
            transform: scale(1.1); 
          }      
    </style>
		