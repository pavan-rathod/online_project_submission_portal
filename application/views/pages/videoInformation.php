
<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">Video Details</li>
</ol>

    <section class="ftco-section">
      <div class="container">

        <div class="row d-flex">                         
            <div class="col-md-12 d-flex ftco-animate">
              <div class="blog-entry align-self-stretch" style="margin-left: 160px;">
                <center><h4 style="font-size: 16px;"><b><?=$single->name; ?></b></h4></center>
                
                <div class="text p-4">
                  <div class="meta mb-2">
                          <iframe width='800' height='500' src="<?=$single->path; ?>" allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
                  </div>
                  <center><p><a href="<?=base_url()?>" class="btn btn-primary">Back</a></p></center>
                </div>
              </div>
            </div>       
        </div>
      </div>
    </section>
		