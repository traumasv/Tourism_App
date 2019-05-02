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
        const apikey = process.env.YELP_API_KEY;
        console.log(apikey);
        try{
            const events = await $.ajax({
                method: "GET",
                url: "https://api.yelp.com/v3/events",
                headers: {'Authorization': 'Bearer ' + apikey},
                dataType: "json"
            });
            console.log(events);
        }
        catch{
            console.log("Didn't get back JSON");
        }
    }

    render(){
        return(
            <div>
                <table>
                    <tbody>

                    </tbody>
                </table>
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