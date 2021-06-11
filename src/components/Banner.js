import React, { Component } from 'react';

export default class Banner extends Component {

    render() {
        if (this.props.geoError) {
            return <p className="banner warn">{this.props.geoError.message}</p>;
        } else if (this.props.geoLocation.latitude) {
        return <p className="banner success">
            
                Lat: <strong>{this.props.geoLocation.latitude.toFixed(4)}</strong><br></br>
                Long: <strong>{this.props.geoLocation.longitude.toFixed(4)}</strong><br></br>
                Latitude: <strong>{this.props.latitude}</strong><br></br>
                Longitude: <strong>{this.props.longitude}</strong><br></br><br></br>
            
                Date: <strong>{this.props.date}</strong><br></br>
                Month: <strong>{this.props.month}</strong><br></br>
                Year: <strong>{this.props.year}</strong><br></br>
                Hours: <strong>{this.props.hour}</strong><br></br>
                Minutes: <strong>{this.props.minute}</strong><br></br>
                Seconds: <strong>{this.props.second}</strong><br></br>
                Weekday: <strong>{this.props.weekday}</strong><br></br>
           
                TimeZone: <strong>{this.props.timeZone}</strong><br></br>
                TimeZone Name: <strong>{this.props.timeZoneName}</strong><br></br>
        </p>;
        } else {
            return null
        }
    }
}
