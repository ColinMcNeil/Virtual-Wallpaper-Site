var mymap = L.map('mymap')
var origins = [[45.73,-96.17],[-22.49,-64.21],[6.63,25.04],[54.91,23.55],[41.68,86.13],[-24.69,135.91]]

var circles=[L.circle(origins[0],3000000),
L.circle(origins[1],4000000),
L.circle(origins[2],5000000),
L.circle(origins[3],2000000),
L.circle(origins[4],3000000),
L.circle(origins[5],2000000)]
mymap.on('load',function(){
    console.log('load')
    mymap.flyTo(generatePoint(),10,{duration:60})
}).setView(generatePoint(), 13); //Init the map
mymap._handlers.forEach(function(handler) {
    handler.disable();

});
mymap.doubleClickZoom.enable();


//Set up the layers
L.tileLayer('https://api.mapbox.com/styles/v1/breakingbaddies/cizoffqx4003m2rqknzxt2l93/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJlYWtpbmdiYWRkaWVzIiwiYSI6ImNpemlpYnl6YzAydmQzM255bGxuN2UxZ3oifQ.ZCSOfoRJtYnnhO2kZVl_kQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    zoomControl:false,
    dragging:false,

}).addTo(mymap);
var i = 0;
function random(min, max) {
  return Math.random() * (max - min) + min;
}


mymap.on('zoomend', function() {
    var newpoint = generatePoint();
    console.log(newpoint)
    mymap.flyTo(newpoint,10,{duration:60})
    console.log('done')
});
function generatePoint(){
    var place=circles[Math.floor(random(0,5))]
    var degree = random(0,Math.PI*2)
    var dist = random(0,place.getRadius())
    
    lat_METERS=dist*Math.sin(degree);
    lat_origin=place.getLatLng().lat;
    lat  = lat_origin  + (lat_METERS / 6378000) * (180 / Math.PI);

    ln_METERS=dist*Math.cos(degree);
    ln_origin=place.getLatLng().lng;
    ln  = ln_origin  + (ln_METERS / 6378000) * (180 / Math.PI) / Math.cos(lat_origin*Math.PI/180);
    return [lat,ln];

}