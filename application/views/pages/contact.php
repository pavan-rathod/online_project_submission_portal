<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">Contact Us</li>
</ol>

    <section class="ftco-section bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="wrapper">
              <div class="row no-gutters">
               
                <div class="col-lg-4 col-md-5 contactAddress  d-flex align-items-stretch">
                  <div class="info-wrap bg-primary w-100 p-md-5 p-4">
                    <h3>Let's get in touch</h3>
                    <p class="mb-4">We're open for any suggestion</p>
                    <div class="dbox w-100 d-flex align-items-start">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-map-marker"></span>
                      </div>
                      <div class="text pl-3">
                        <p><span>Address:</span> Near I.T.I., <br> Burudgaon Road,<br> Ahmednagar <br>Maharashtra , India-414001</p>
                      </div>
                    </div>
                    <div class="dbox w-100 d-flex align-items-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-whatsapp"></span>
                      </div>
                      <div class="text pl-3">
                        <p><span>Phone:</span> 241 - 2346192</p>
                      </div>
                    </div>
                    <div class="dbox w-100 d-flex align-items-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-envelope"></span>
                      </div>
                      <div class="text pl-3">
                        <p><span>Email:</span> sprincipal@gpnagar.ac.in</p>
                      </div>
                    </div>
                    <div class="dbox w-100 d-flex align-items-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-globe"></span>
                      </div>
                      <div class="text pl-3">
                        <p><span>Website:</span> <a target="_blank" href="http://www.globtechs.com">www.nagarpolytechnic.com</a></p>
                      </div>
                    </div>
                  </div>
                </div>               
                <div class="col-lg-8 col-md-7 contactForm  d-flex align-items-stretch">
                 <div id="map" class="map"></div>    
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCEl4ACd-MvZ4bp4ZmkaoFnPJWt9XiEzW4&libraries=places,geometry"></script>


    <script type='text/javascript'>

    	initialize(19.081024, 74.742035,"Government Polytechnic,Ahmednagar","Near I.T.I.,Burudgaon Road, Ahmednagar -404001","lg1.jpg");   
        //var element = $(this);
        var map;

        function initialize(lat,long,trust,address,img) {

          myCenter=new google.maps.LatLng(lat,long);
          console.log(myCenter);
          var mapProp = {
                center: myCenter,
                zoom: 20,
                //draggable: false,
                //scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.HYBRID  
            };

          // marker position
          var factory = new google.maps.LatLng(lat,long);

          // marker options
          var marker = new google.maps.Marker({
            position: factory,
           // map: map,
            title:trust+" ,"+address
          });    

            map = new google.maps.Map(document.getElementById("map"), mapProp);
            marker.setMap(map);


          // InfoWindow content
          var content = '<div class="iw-title"><center><h5><b>'+trust+'</b></h5></center></div>' +
                          '<div><center><p>'+address+'</p></center>'+
                            '<center><p><img src='+img+' style="height:100px;width:120px;"><p></center>' +
                          '</div>'+
                        '</div>';

          // A new Info Window is created and set content
          var infowindow = new google.maps.InfoWindow({
            content: content,

            // Assign a maximum value for the width of the infowindow allows
            // greater control over the various content elements
            maxWidth: 350,
            maxHeight:200
          });      

          // This event expects a click on a marker
          // When this event is fired the Info Window is opened.
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });

          // Event that closes the Info Window with a click on the map
          google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
          });                              

        };
    </script>

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
