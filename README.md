# meteorite-ml-project

Project proposal:

We plan to build a machine learning model that predicts the likelihood of finding a meteorite based on a comprehensive dataset from the meteorological society. We ultimately hope to build a web app that allows you to enter a geolocation that returns the likelihood of a meterotie falling being found.

Train model to identify areas of potentially unfound meteorites for meteorite hunters to search.
-population density
-land area
-land coverage/terrain type (mountainous, rainforest, etc)


#### Based on the table schema and data description, the csv file contains the following variable:

`name` - Name of the meteorite species

`id` - Identification number of the specific meteorite species

`nametype` - Status on whetheer the meteorite's nomenclature has been approved or not.

`recclass` - Classification of the meteorite type

`mass(g)` - Meteorite mass in grams

`fell` - Distinction on whether the meteorite was found already on Earth (found) or its trajectory and fall was tracked way before it reaches the Earth's atmosphere (fell).

`year` - Year by which the metorite was discovered

`reclat` - Latitude coordinate of the meteorite discovery

`reclong` - Longtitude coordinate of the meteorite discovery

`GeoLocation` - Complete geo-location coordinate of the meteorite discovery

#### Sources:

OECD Land Area Data
Haščič, I. and A. Mackie (2018), "Land Cover Change and Conversions: Methodology and Results for OECD and G20 Countries", OECD Green Growth Papers, No. 2018/04, OECD Publishing, Paris, https://doi.org/10.1787/72a9e331-en.


The website was built out with using the flask app infastructure, it connected to our AWS hosted database in the could which converted the data calls to json endpoints hosted on the site. The interactive map page then used the data in those endpoints to pull data in for required features. Our website structure features three pages, a home page, map page, and analysis page. All of these pages are interconnected using the Nav Bar feature of bootstrap for navigating the pages. The Flask app was also hosted on Render.com, a free hosting service allowing the site to be accessed from anywhere.

The home page includes an embedded tableau map of the world that shows meteor locations. We thought this was a cool informational graphic to have on the home page.

<h3> <img width="533" alt="Home Page" src="flask/static/assets/home_page.PNG"> </h3>

The analysis page goes into our analysis of different machine learning models we used to try to determine the likelyhood of if a meteorite fell in a location, would it have been seen?

<h3> <img width="533" alt="Analysis Page" src="flask/static/assets/analysis_page.PNG"> </h3>

The map page was built out with a focus on the US due to the US having a high density of impacts compared to many other places. It was built out with the goal of showing as many features that affect if a meteorite might be seen. Features of this page include an interactive map that shows all meteorites found in the US, marked as red dots on the map. Once a state is clicked, the State Info box is populated with the state name, and the number of meteorites found in that state. A bar chart is populated that shows the percent of land cover of the selected state, classes are Bare, Crop Land, Forest, Grass Land, Shrub Land, Sparse Vegetation, Urban, Water, and Wetlands. A bubble chart is also populated with the indexed meteor found for that state on the x-axis, and the mass-grams of the meterite on the y-axis. The size of the bubble is tied into the mass of it. The color of the bubble ties into the material of it, different materials include Achrondrite, Chrondrite, Iron, Mesosiderite, and Pallasite.

<h3> <img width="533" alt="Map Page" src="flask/static/assets/map_page.PNG"> </h3>
