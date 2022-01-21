import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class Area extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          myPosition: this.props.position,
        }
      }

      showMarkers = () => {
          return <Marker position={{
            lat: this.state.myPosition.lat,
            lng: this.state.myPosition.lng
          }} />
      }

      createCircle = (color, radius) => {
        return (
          <Circle 
            strokeColor={color}
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor={color}
            fillOpacity={0.35}
            center={{
              lat: 50.4559469,
              lng: 4.8711279
            }}
            radius={radius}
            options={"#ff0000"}
          />
        )
      }
      
      render() {
        return (
          <Map className="area-box"
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ 
              lat: 50.4559469,
              lng: 4.8711279
            }}>
            {this.showMarkers()}
            {this.createCircle("#34971b", 5500)}
            {this.createCircle("#2550DA", 3500)}
            {this.createCircle("#FF0000", 1750)}     
          </Map>
        )
      }
    }

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(Area);