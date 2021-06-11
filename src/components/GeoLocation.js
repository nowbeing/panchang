import React, { Component } from "react";
import axios from 'axios';

import Banner from './Banner';
//import Panchang from './Panchang';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panchangData: {},
      geoLocation: {},
      timestamp: {},
      geoError: null,
      latitude: 'long',
      longitude: "long",
      timeZoneName: 'Asia/Calcutta',
      timeZone:'long', 
      weekday: 'long', 
      year: 'numeric', 
      month: '2-digit', 
      date: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let options = { 
        timeZone: 'Asia/Calcutta',
        timeZoneName:'long', 
        weekday: 'long', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        hour12: false,
        minute: '2-digit', 
        second: '2-digit' };

      let ts = new Intl.DateTimeFormat('en-US', options).formatToParts(position.timestamp);

      let timeZoneName = ts.timeZone;
      let weekday = ts[0].value;
      let date = ts[4].value;
      let month = ts[2].value;
      let year = ts[6].value;

      let hour = ts[8].value;
      let minute = ts[10].value;
      let second = ts[12].value;
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;


      let offset = new Date().getTimezoneOffset();
      let formatted = -(offset / 60);
      let timeZoneOffset = formatted;
    

        this.setState({ 
          geoLocation: position.coords,
          timestamp: position.timestamp,
          latitude: latitude,
          longitude: longitude,
          date: date,
          month: month,
          year: year,
          hour: hour,
          minute: minute,
          second: second,
          timeZoneName: offset,
          timeZone: timeZoneOffset,
          weekday: weekday
        }, this.getApiData);
    
 
      
    }, async (err) => {
      this.setState({
        geoError: err
      });
    });
  }

  getApiData = () => {
    axios.get('https://api.astrobot.io/api/v1.0/panchang', { 
      params: {
        name: 'panchang',
        day: this.state.date,
        month: this.state.month,
        year: this.state.year,
        hour: this.state.hour,
        min: this.state.minute,
        lat: this.state.latitude,
        lon: this.state.longitude,
        tzone: this.state.timeZone
      }
    })
    .then(res=>{
        this.setState({ 
            panchangData: res.data
        });
        //console.log("final result :" + this.state.panchangData.Nakshathra);
        //console.log("url : " + `https://api.astrobot.io/api/v1.0/panchang?name=panchang&day=${this.state.date}&month=01&year=1974&hour=19&min=35&lat=10.45&lon=79.50&tzone=5.5`);
        })
  }

  render() {
    return (

        <div>
          <Banner
            geoLocation={this.state.geoLocation}
            timestamp={this.state.timestamp}
            geoError={this.state.geoError}
            longitude={this.state.longitude}
            latitude={this.state.latitude}
            date={this.state.date}
            month={this.state.month}
            year={this.state.year}
            timeZone={this.state.timeZone}
            timeZoneName={this.state.timeZoneName} 
            weekday={this.state.weekday} 
            hour={this.state.hour}
            minute={this.state.minute}
            second={this.state.second}
          />
          Star: <strong>{this.state.panchangData.Nakshathra}</strong><br></br>
          Tithi: <strong>{this.state.panchangData.Tithi}</strong><br></br>
          Yoga: <strong>{this.state.panchangData.Yoga}</strong><br></br>
          Karana: <strong>{this.state.panchangData.Karana}</strong><br></br>
          Sunrise: <strong>{this.state.panchangData.Sunrise}</strong><br></br>
          Sunset: <strong>{this.state.panchangData.Sunset}</strong><br></br>
          Rahukala: <strong>{this.state.panchangData.RahuKala}</strong><br></br>
          Yamakanda: <strong>{this.state.panchangData.Yamakanda}</strong><br></br>
          Auspicious Time: <strong>{this.state.panchangData.AuspicioutTime}</strong><br></br>
        </div>

    );
  }
}
