//read in data
let data = "../Resources/meteorite.json";
let lng;  
let lat; 



// // create map
// let myMap = L.map("map", {
//     minzoom: 0,
//     maxzoom: 0
// });
    
function createMap(meteors) {
    console.log(meteors)
        //Create the tile layer that will be the background

        console.log(map)
        //Create basemaps to hold the lightmap layer
        let baseMaps = {
                Map: map
            };
    
        let overlayMaps = {
            meteor_locations: meteors
        }
    
        //Create the map object 
        let myMap = L.map("map", {
            minzoom: 0,
            maxzoom: 0
        });

        myMap.setView([0,0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap)

        
    // L.control.layers(baseMaps, overlayMaps).addTo(myMap)}
}

// // add markers
function getmarkers(response) { 

    let meteor_layer = L.layerGroup();

    latt = response.reclat;
    lngg = response.reclong;
    // console.log(object.keys(latt).length)
    
    for (let i = 0; i < 100; i++) {
        let lat = latt[i]
        let lng = lngg[i]
        console.log(lat)
        L.marker([lat, lng]).addTo(meteor_layer)
    }
    
    createMap(meteor_layer)
//     // console.log(lat)
//     // lat.foreach(function(lat, index){
//     //     L.marker(lat, lng[index]).addTo(myMap)
//     // })
           
};


d3.json(data).then(function(response) {
    getmarkers(response)
})