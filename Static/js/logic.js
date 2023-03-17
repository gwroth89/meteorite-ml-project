//read in data
let data = "../Resources/meteorite.json";
let lng;  
let lat; 

//initialize state data for borders
let statedata = "../Resources/states_GEO.json";

// Set default style for states boarder and fill
let stateStyle = {
    fillColor: 'rgb(190,210,258)',
    weight: 2,
    opacity: 1,
    color: 'blue',
    dashArray: '',
    fillOpacity: 0.4
    };

//define state styles for mouse hover
let statehighlight = {
        fillColor: 'rgb(153,216,201)',
        weight: 5,
        color: "gray",
        dashArray: '',
        fillOpacity: 0.7
                          }; 


//Takes in result the result from the getmarkers function
function createMap(meteors) {
    console.log()

        //use d3 call to pull date into script for state boarders
        d3.json(statedata).then(function(st_data) { 
            
        
        //geojson state boarders
        let statelayer = L.geoJson(st_data, {
            style: stateStyle,
            // Call oneEachState function for each state (begins chain of interactive features)
            onEachFeature: onEachState

        })

        //maps to inserter into base map
        let overlayMaps = {
            'Meteor Locations': meteors,
            'State Boarders': statelayer
        }

        //Create the map object 
        let myMap = L.map("map", {
            center: [40.2659, -96.7467],
            zoom: 4,
            layers: [meteors, statelayer],
            scrollWheelZoom: false,
            minZoom: 2,
            
        });
        

       tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(myMap)

        

    L.control.layers(overlayMaps).addTo(myMap)
    })
}


//add markers
function getmarkers(response) { 

    //define layer to add
    let meteor_layer = L.layerGroup();
    
    //point to lat lng object for next step
    latt = response.reclat;
    lngg = response.reclong;
    
    //find data length 
    loop_length = Object.keys(latt).length
    
    //loop through data for all lat lngs 
    for (let i = 0; i < loop_length; i++) {
        let lat = latt[i]
        let lng = lngg[i]
        
        //use circle markers bc I like them 
        L.circleMarker([lat, lng], {
            radius:1,
            color: "#FF0000"
        }).addTo(meteor_layer)
    }
    
    //pass the markers to the createMap function
    createMap(meteor_layer);
};

function onEachState(feature, layer){

//Create actions for interacting with state features
    layer.on({

        //set state highlight style on hover 
        mouseover: e=> {
            layer.setStyle(statehighlight)
        },

        // Reset state style when mouse leaves state
        mouseout: e=> {
            layer.setStyle(stateStyle);
        },

    })
}


d3.json(data).then(function(response) {
    // pass data to getmarkers function 
    getmarkers(response)
})

