import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'babel-polyfill';
import GoogleMapReact from 'google-map-react';
import {WebView} from 'react-native';
import './stylesheet.css';

//For Local Deployment
let keybox = {};
let google_maps_key = '';
let yelp_key = '';
try{
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);
    keybox = JSON.parse(data);
    google_maps_key = keybox.google_maps_api_key;
    yelp_key = keybox.yelp_api_key;
}
catch{
    console.log("No configuration file");
}



//Parts taken from https://gist.github.com/SimonJThompson/c9d01f0feeb95b18c7b0
function toRad(v){return v * Math.PI / 180;}

function LatLong(lat, lon) {
	return {Latitude: lat, Longitude: lon}
}

function haversine(l1, l2) {
	let R = 6371; // km 
	let x1 = l2.Latitude-l1.Latitude;
	let dLat = toRad(x1);
	let x2 = l2.Longitude-l1.Longitude;
	let dLon = toRad(x2);  
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
			Math.cos(toRad(l1.Latitude)) * Math.cos(toRad(l2.Latitude)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

function kmToMiles(km) {return (km * 0.62137).toFixed(2);}

class Event extends Component {
    constructor(props){
        super(props);
        this.state = {name:'',time:'',distance:'', cost:'', lat:'', lng:'', isHidden:true};
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    toggleHidden(){
        this.setState({
            isHidden: !this.state.isHidden
        });
    }

    render(){
        return (
            <div>
            <div style={{width:600, height:200, cursor:"pointer", border:"2px solid black"}} onClick={this.toggleHidden}>
                    <h2>Name: {this.props.name}</h2>
                    <h3>Time: {this.props.time}</h3>
                    <h3>Distance: {this.props.distance} miles away</h3>
                    <h3>Cost: ${this.props.cost}</h3>
            </div>
            {!this.state.isHidden && <SimpleMap 
                center={{lat:this.props.lat, lng:this.props.lng}} 
                zoom={16}
            />}
            </div>
        );  
    }
}

class EventList extends Component {
    constructor(props){
        super(props);
        this.state = {events:[], location: {}, isHidden: true, isLoading: true};
        this.getEvents = this.getEvents.bind(this);
    }

    async getEvents(){
        const apikey = process.env.YELP_API_KEY;
        let events = [];

        try{
            const now = new Date();
            const nowseconds = Math.floor(now.getTime() / 1000); // need to round to integer
            let query = "?location=east-village,new-york-city,ny&limit=10&sort_on=time_start&sort_by=asc&start_date=" + nowseconds;
            const response = await $.ajax({
                method: "GET",
                url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events" + query,
                headers: {"Authorization": "Bearer " + apikey},
                dataType: "json"
            });

            events = response.events;
            //get distance from current location for each event
            const currloc = this.state.location;
            events.forEach(function(event){
                const coord = LatLong(event.latitude, event.longitude);
                event.distance = kmToMiles(haversine(currloc, coord));
            });
            //sort based on the distance from current location
            events.sort(function(a,b){
                return a.distance - b.distance;
            });
            //setting the state
            this.setState({events: events});
        }

        catch{
            events = 'Did not get back JSON';
        }
    }

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( function (position){
                this.setState( {location: LatLong(position.coords.latitude, position.coords.longitude)} );
                this.getEvents();
                this.setState({isLoading: false});
            }.bind(this)); 
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
    render(){
        return(
            <div>
                {!this.state.isLoading  && <div class="loader"></div>}
                {this.state.events.map((event, index) => (
                <div id={event.name} class="event">
                    <Event
                        name={event.name} 
                        time={event.time_start.split('T')[0] + " " + event.time_start.split('T')[1] + " ~ " + event.time_end.split('T')[0] + " " + event.time_end.split('T')[1]} 
                        distance={event.distance} 
                        cost={event.cost || 0} 
                        key={index}
                        lat={event.latitude}
                        lng={event.longitude}
                    />
                </div>
                ))}
            </div>
        );
    }
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state = {center: {lat:59.95, lng: 30.33}, zoom: 16};
    }

    render() {
        const apikey = process.env.GOOGLE_MAPS_API_KEY;
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '60%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{key: apikey}}
            center={this.props.center}
            zoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={this.props.center.lat}
              lng={this.props.center.lng}
              text="Event"
            />
          </GoogleMapReact>
        </div>
      );
    }
  }

class App extends Component {
    
    render(){
        return(
            <div>
                <EventList/>
            </div>
        );
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));