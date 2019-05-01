import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'babel-polyfill';

class EventList extends Component {
    constructor(props){
        this.state = {events:[]};
    }

    async componentDidMount(){
        try{
            const events = await $.ajax({
                method: "GET",
                url: "https://api.yelp.com/v3/events",
                dataType: "json"
            });
        }
        catch{
            console.log("Didn't get back JSON");
        }
    }

    render(){
        <div>
            <table>
                <tbody>
                    {this.state.events.map((event, index) => (
                        <tr key={index}>
                        <td>
                        {event}    
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    }
}

class App extends Component {
    constructor(props){
        this.state = {}
    }
    render(){
        <EventList/>
    }
}