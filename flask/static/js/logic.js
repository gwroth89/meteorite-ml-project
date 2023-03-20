// Dictionary to convert state abbreviations to full names
let stateDict = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "U.S. Virgin Islands": "VI",
}


//read in data
let impact_data = "http://127.0.0.1:5000/main";
let class_data = "http://127.0.0.1:5000/types";
let state_cover ="http://127.0.0.1:5000/landcover";
let lng;  
let lat;
let myMap; 
let selected_state;

//initialize state data for borders
let statedata = "static/data/states_GEO.json";

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

    function onEachState(feature, layer){
        
        // myMap.addControl(new L.Control.ListcircleMarker({layer: circleMarkerLayer}))
        //Create actions for interacting with state features
            layer.on({
        
                //set state highlight style on hover 
                mouseover: e=> {
                    layer.setStyle(statehighlight);
                },
        
                // Reset state style when mouse leaves state
                mouseout: e=> {
                    layer.setStyle(stateStyle);
                },
        
                //create click events
                click: e=> {
                    //initialize an empty array to hold latlng of the state clicked
                    containes = []
                    console.log(e)
                    //populate the state name based on the state clicked 
                    let state_name = e.target.feature.properties.NAME;
                    myMap.fitBounds(e.target._bounds);
                    d3.select("#State").text(`State: ${state_name}`)
                    
                    stateFilter = stateDict[state_name]

                    d3.json(impact_data).then(function(mcounter) {
                        // pass data to getmarkers function 
                        m_state(mcounter)
                    })
                    function m_state(state_meteors){
                        m_counter = 0
                        for (let i = 0; i < Object.keys(state_meteors).length; i++) {
                            if (state_meteors[i].state_abbrev === stateFilter) {
                                m_counter++;                               
                            }
                            d3.select("#Meteroties-Found").text(`Meteorites Found: ${m_counter}`)
                        }
                    }
                }
            })
        }        
    })


}
marker_list = []





//Create function for updating a bar chart on the landcover in each state
let barChart;
function updateBar(cover_response) {
    
    cover_state = document.querySelector("#State")
    cover_state.text()
    
}

//d3 call to get class data
d3.json(state_cover).then(function(cover_response) {
    // pass data to getmarkers function 
    updateBar(cover_response)
})





//add markers
function getmarkers(response) { 

    //define layer to add
    let meteor_layer = L.layerGroup();
    
    //find data length 
    loop_length = Object.keys(response).length

    //loop through data for all lat lngs 
    for (let i = 0; i < loop_length; i++) {
        let lat = response[i].reclat
        let lng = response[i].reclong
        marker_list.push([lat, lng])
        
        //use circle markers bc I like them 
        L.circleMarker([lat, lng], {
            radius:1,
            color: "#FF0000"
        }).addTo(meteor_layer)
        
    }
    
    //pass the markers to the createMap function
    createMap(meteor_layer);
};

d3.json(impact_data).then(function(response) {
    // pass data to getmarkers function 
    getmarkers(response)
})

