//read in data
let data = "../Resources/meteorite.json";
let lng;  
let lat; 



let maxBounds = L.latLngBounds(
    L.latLng(5.499550, -167.276413),
    L.latLng(83.162102,-52.233040)
)

function createMap(meteors) {
    console.log()
    
        //Create the map object 
        let myMap = L.map("map", {
            'center': [0,0],
            'zoom': 0,
            
        }).fitBounds(maxBounds);
        myMap.setMaxBounds(  [[-90,-180],   [90,180]]  )
        
       

       tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(myMap)

        let overlayMaps = {
            'Meteor Locations': meteors
        }

    L.control.layers(overlayMaps).addTo(myMap)
}


// // add markers
function getmarkers(response) { 

    let meteor_layer = L.layerGroup();
    
    latt = response.reclat;
    lngg = response.reclong;
    
    loop_length = Object.keys(latt).length
    
    for (let i = 0; i < loop_length; i++) {
        let lat = latt[i]
        let lng = lngg[i]
     
        L.circleMarker([lat, lng], {
            radius:1
        }).addTo(meteor_layer)
    }
    
    //pass the markers to the createMap function
    createMap(meteor_layer);
};


d3.json(data).then(function(response) {
    // pass data to getmarkers function 
    getmarkers(response)
})

