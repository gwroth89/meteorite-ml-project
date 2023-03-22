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
let class_data = "http://127.0.0.1:5000/types-impacts";
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
                    
                    //d3 call to pass data to m_state func directly below
                    d3.json(impact_data).then(function(mcounter) { 
                        m_state(mcounter)
                    })
                
                    //function to convert the state abbrev to full name and instert into state info box 
                    function m_state(state_meteors){
                        m_counter = 0
                        for (let i = 0; i < Object.keys(state_meteors).length; i++) {
                            if (state_meteors[i].state_abbrev === stateFilter) {
                                m_counter++;                               
                            }
                            d3.select("#Meteroties-Found").text(`Meteorites Found: ${m_counter}`)
                        }



                    //d3 call to get class data
                    d3.json(state_cover).then(function(cover_response) {
                    // pass data to updateBar function 
                    updateBar(cover_response)
                    })

                    //define function for updating the barChart
                    function updateBar (state_cover_response) {
                        //initialize bar chart and variable
                        let barChart;

                        let Bare = 0;
                        let CropL= 0;
                        let Forest = 0;
                        let GrsL = 0;
                        let ShrubL =0;
                        let Sparse_Veg = 0;
                        let Urban = 0;
                        let Water = 0;
                        let WetL = 0;
                        console.log(state_cover_response)
                        
                        //loop through to grab the cover of each state
                        for (let i = 0; i < Object.keys(state_cover_response).length; i++) {
                            if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'BARE') {
                                Bare = state_cover_response[i].value; 

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'CROPL') {
                                CropL = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'FOREST') {
                                Forest = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'GRSL') {
                                GrsL = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'SHRUBL') {
                                ShrubL = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'SPARSE_VEGETATION') {
                                Sparse_Veg = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'URBAN') {
                                Urban = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'WATER') {
                                Water = state_cover_response[i].value;

                            } else if (state_cover_response[i].state_abbrev === stateFilter && state_cover_response[i].variable === 'WETL') {
                                WetL = state_cover_response[i].value;
                            }}
                         
                        //put cover values in a list for barChart    
                        let cover_list = [Bare, CropL, Forest, GrsL, ShrubL, Sparse_Veg, Urban, Water, WetL]

                        //Clear barChart if on exists
                        if (barChart) {
                            barChart.destroy()
                        }

                        //Create new barChart
                        barChart = new Chart(document.getElementById('bar'), {
                            type: 'bar',
                            data: {
                                labels: ['Bare', 'Crop Land', 'Forest', 'Grass Land', 'Shrub Land', 'Sparse Veg.', 'Urban', 'Water', 'Wet Land'],
                                datasets: [{
                                    data: cover_list,
                                    backgroundColor: ['#D5D4CF', '#E4B513', '#0EA010', '#39F441', '#ABF9AF', '#BFF477', '#707676', '#4666E8', '#16B6A8']
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'State Land Cover'
                                    }
                                },
                                legend:{
                                    display: false
                                },
                                scales: {
                                    datasets:[{
                                        display: true,
                                        barPercentage: 1.3,
                                        ticks: {
                                            autoSkip: false,
                                            max: (Math.max(cover_list)+5)
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Square Kilometers in Thousands"
                                        }
                                    }],

                                }
                            }
                        });
                    }

                    //d3 call to get class data
                    d3.json(class_data).then(function(class_response) {
                        // pass data to updateBubble function 
                    updateBubble(class_response)
                    })
                    
                    function updateBubble(state_type_response) {
                        let bubbleChart;

                        let sample_data = state_type_response.filter(obj=>obj.state_abbrev == stateFilter)
                            
                            id_list = []
                            recclass_list = []
                            mass_grams_list = []
                            meteorite_class_list = []
                            id_count_list = []
                            color_list = []
                            id_counter = 0
                            //filter datat by selected state and fill above lists with needed data
                            for (let i = 0; i < Object.keys(sample_data).length; i++) {
                                if (sample_data[i].state_abbrev === stateFilter) {
                                    id_list.push(sample_data[i].id);
                                    id_count_list.push(id_counter)
                                    mass_grams_list.push(sample_data[i].mass_grams);
                                    meteorite_class_list.push(sample_data[i].meteorite_class)
                                    id_counter++

                            }}
                            for (let i = 0; i < meteorite_class_list.length; i++) {
                                if (meteorite_class_list[i] === "Achrondrite") {
                                    color_list.push('rgb(66, 135, 245)');

                                } else if (meteorite_class_list[i] === "Chrondrite") {
                                    color_list.push('rgb(35, 214, 26)');

                                } else if (meteorite_class_list[i] === "Iron") {
                                    color_list.push('rgb(153, 72, 11)');

                                } else if (meteorite_class_list[i] === "Mesosiderite") {
                                    color_list.push('rgb(219, 200, 50)');

                                } else if (meteorite_class_list[i] === "Pallasite") {
                                    color_list.push('rgb(209, 19, 38)');
                                }
                            }

                            //define variables needed for bubble chart
                            let bubblex = id_count_list
                            let bubbley = mass_grams_list
                            let bubMarkerSize = mass_grams_list
                            let bubbleColor = color_list 
                            let bubbleText = id_list.map(id => "Meteorite ID: " + id)
                            console.log(bubblex)
                            console.log(bubbley)
                            console.log(bubMarkerSize)
                            console.log(bubbleText)
                            //set up bubble chart
                            bubble_data = [{
                                x: bubblex,
                                y: bubbley,
                                mode:'markers',
                                marker: {
                                    sizemode: 'area',
                                    size:  bubMarkerSize,
                                    sizemax: 1000,
                                    color: color_list

                                }
                            }];
                            
                            let bubble_layout = {
                                title: "Meteorites by Class by State: " + stateFilter,
                                // height: 800,
                                // width: 1200,
                                showlegend: false

                            };
                            
                            Plotly.newPlot("bubble", bubble_data, bubble_layout);
                    };

                    }

                }
            })
        }        
    })


}
marker_list = []
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