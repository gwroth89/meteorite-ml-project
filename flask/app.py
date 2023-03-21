#import Flask
from flask import Flask, jsonify, render_template, redirect
from flask_cors import CORS, cross_origin
import json
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

RDS_HOSTNAME = 'meteorite-ml-db.cl3jquwwq7kn.us-east-1.rds.amazonaws.com'
RDS_USERNAME = 'postgres'
RDS_PASSWORD = 'project4team5'
RDS_PORT = '5432'
db_name = 'meteorite_ml_db'


con = F'postgresql://{RDS_USERNAME}:{RDS_PASSWORD}@{RDS_HOSTNAME}:{RDS_PORT}/{db_name}'
engine = create_engine(con)
Base = automap_base()
Base.prepare(engine, reflect=True)

Landcover = Base.classes.landcover
Meteorite_main = Base.classes.meteorite_main
Meteorite_types = Base.classes.meteorite_type
State = Base.classes.state

session = Session(engine)

#create app
app = Flask(__name__)
cors = CORS(app)

app.config['JSON_SORT_KEYS'] = False
    
@app.route("/map")
def map ():
    return render_template('map.html')

@app.route("/home")
def home ():
    return render_template('index.html')

@app.route("/analysis")
def analysis ():
    return render_template('analysis.html')


@app.route("/landcover")
def welcome ():
    
    land = session.query(Landcover.state_abbrev, Landcover.variable, Landcover.value).all()
    df = pd.DataFrame(land,columns=['state_abbrev', 'variable', 'value']).to_dict("records")
    session.close()

    return jsonify(df)

@app.route("/main")
def main ():
    main = session.query(Meteorite_main.id, Meteorite_main.name, Meteorite_main.recclass, Meteorite_main.mass_grams, Meteorite_main.fall, Meteorite_main.year, Meteorite_main.reclat, Meteorite_main.reclong, Meteorite_main.geolocation, Meteorite_main.geometry, Meteorite_main.elevation, Meteorite_main.country, Meteorite_main.state_abbrev).all()
    df2 = pd.DataFrame(main, columns=['id', 'name', 'recclass', 'mass_grams', 'fall', 'year', 'reclat', 'reclong', 'geolocation', 'geometry', 'elevation', 'country', 'state_abbrev']).to_dict("records")
    session.close()

    return jsonify(df2)

@app.route("/types")
def types ():
    
    type = session.query(Meteorite_types.recclass, Meteorite_types.meteorite_class_subclass, Meteorite_types.meteorite_class, Meteorite_types.meteorite_type).all()
    df3 = pd.DataFrame(type,columns=['recclass', 'meteorite_class_subclass', 'meteorite_class', 'meteorite_type']).to_dict("records")
    session.close()

    return jsonify(df3)

@app.route("/state")
def state ():
    
    state = session.query(State.state_abbrev, State.state, State.area_sqkm, State.country).all()
    df4 = pd.DataFrame(state, columns=['state_abbrev', 'state', 'area_sqkm', 'country']).to_dict("records")
    session.close()

    return jsonify(df4)

@app.route("/types-impacts")
def types_impacts ():
    types_impact = session.query(Meteorite_main.id, Meteorite_main.recclass, Meteorite_main.mass_grams, Meteorite_main.state_abbrev, Meteorite_types.meteorite_class).where(Meteorite_main.recclass == Meteorite_types.recclass).all()
    df5 = pd.DataFrame(types_impact, columns=['id', 'recclass', 'mass_grams', 'state_abbrev', 'meteorite_class']).to_dict("records")
    session.close()

    return jsonify(df5)

if __name__ == "__main__":
    app.run(debug=True)