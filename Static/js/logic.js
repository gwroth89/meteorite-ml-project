//read in data
let data = "../Resources/meteorite.json";
let lng;  
let lat; 

//initialize state data for borders
let statedata = "../Resources/state_GEO.json"
console.log(statedata)
function createMap(meteors) {
    console.log()

        let overlayMaps = {
            'Meteor Locations': meteors
    }
        let statelayer = L.geoJson(statedata, {
        // style: statestyle,
        // onEachFeature: onEachState
        })

        //Create the map object 
        let myMap = L.map("map", {
            center: [40.2659, -96.7467],
            zoom: 4,
            layers: [meteors, statelayer],
            scrollWheelZoom: false
            
        });
        
        
       

       tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(myMap)

        

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

