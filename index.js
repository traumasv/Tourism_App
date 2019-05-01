import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'babel-polyfill';

class EventList extends Component {
    constructor(props){
        super(props);
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
        return(
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

class App extends Component {
    render(){
        return(<EventList/>);
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));