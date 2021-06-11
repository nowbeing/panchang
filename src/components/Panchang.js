import React, { Component } from 'react';
import axios from 'axios';
import './Panchang.css';
import Geo from './GeoLocation.js';


class Panchang extends Component{

    constructor(props) {
        super(props);
        this.state = {
          data: {},
          showBlogs: true
        };
      }
    parentFunction=(data_from_child)=>{
        console.log(data_from_child);
    }

    componentDidMount(){

    //let apiUrl = `https://api.astrobot.io/api/v1.0/panchang?name=panchang&day=15&month=1&year=1974&hour=19&min=35&lat=10.45&lon=79.50&tzone=5.5`;
    
    //console.log("url2 : " + apiUrl);
    this.getLocation
    
    axios.get(`https://api.astrobot.io/api/v1.0/panchang?name=panchang&day=15&month=01&year=1974&hour=19&min=35&lat=10.45&lon=79.50&tzone=5.5`)
    .then(res=>{
        this.setState({data: valueFromGeo})
        this.setState({ 
            panchangData: res.data,
        });
        console.log("final result :" + valueFromGeo);
        //console.log("url : " + `https://api.astrobot.io/api/v1.0/panchang?name=panchang&day=${this.state.day}&month=${this.state.month}&year=1974&hour=19&min=35&lat=10.45&lon=79.50&tzone=5.5`);
        })
    }


//{ this.state.panchangData.map(panchang => <li>{data.Nakshathra}</li>)}
    render() {
        return (
        <div>
            <div>
                <Geo  parentFunction={this.parentFunction.bind(this)}/>
            </div>
        </div>
        );
    }
}

export default Panchang;