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
