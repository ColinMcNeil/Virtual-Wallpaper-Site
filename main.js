var mymap = L.map('mymap')
var origins = [[45.73,-96.17],[-22.49,-64.21],[6.63,25.04],[54.91,23.55],[41.68,86.13],[-24.69,135.91]] //Array of points roughly the center of each continent
var circles=[L.circle(origins[0],3000000), //Array of circles generated by points
L.circle(origins[1],4000000),
L.circle(origins[2],5000000),
L.circle(origins[3],2000000),
L.circle(origins[4],3000000),
L.circle(origins[5],2000000)]
mymap.on('load',function(){
    console.log('load')
    mymap.flyTo(generatePoint(),10,{duration:180}) //On load, fly to random point within a circle
}).setView(generatePoint(), 13); //Init the map
mymap._handlers.forEach(function(handler) {
    handler.disable(); //Disable mouse input for use as a desktop background
});
mymap.doubleClickZoom.enable();
//Set up the layers
L.tileLayer('https://api.mapbox.com/styles/v1/breakingbaddies/cizoffqx4003m2rqknzxt2l93/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJlYWtpbmdiYWRkaWVzIiwiYSI6ImNpemlpYnl6YzAydmQzM255bGxuN2UxZ3oifQ.ZCSOfoRJtYnnhO2kZVl_kQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    zoomControl:false,
    dragging:false
}).addTo(mymap);
function random(min, max) { //Random float between max and min including both.
    return Math.random() * (max - min) + min;
}
mymap.on('zoomend', function() { //Event for when a map is done zooming. This makes it always on the move
    var newpoint = generatePoint(); //Create a new point
    mymap.flyTo(newpoint,10,{duration:180})
});
function generatePoint(){ //Actual difficult code! Generate a random point within a random circle
    var place=circles[Math.floor(random(0,5))] //Get a random continent circle
    var degree = random(0,Math.PI*2) //Generate a random angle within the circle
    var dist = random(0,place.getRadius()) //Generate a random distance from the radius
    //Formula for generating a (Lat,Lng):
    //Generate Coord in meters = F(distance,radius) = [distance*cos(radius),distance*sin(radius)]
    //Convert to lat lng:
    //new_lat = lat+(distance_in_meters/earth_circ)*(180/pi)
    //new_lng = lng+(distance_in_meters/earth_circ)*(180/pi)/cos(lat*pi/180)
    lat_METERS=dist*Math.sin(degree); 
    lat_origin=place.getLatLng().lat;
    lat  = lat_origin  + (lat_METERS / 6378000) * (180 / Math.PI);

    ln_METERS=dist*Math.cos(degree);
    ln_origin=place.getLatLng().lng;
    ln  = ln_origin  + (ln_METERS / 6378000) * (180 / Math.PI) / Math.cos(lat_origin*Math.PI/180);
    return [lat,ln];
}