import React,{useState} from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
const API_KEY = ''


//need to change 
const mapStyles={
    height: '100%', 
    width:'100%',
    position: 'absolute'
}


//need to integrate this into dashboard. 

export const MapTest = (props) =>{
    // let [markerInfo, setMarkerInfo] = useState({
    //     showingInfoWindow: false,
    //     activeMarker:{},             
    // })


    //use geocoding for the addresses to convert it to lat/long?
    let [locations, setLocations]=useState([
        {latitude:29.794940, longitude:-95.569930}, 
        {latitude:29.784013, longitude:-95.651611},
        {latitude:29.832076, longitude:-95.550651},
        {latitude: 30.132650, longitude:-95.462870}
    ])

    let [animation, setAnimation] = useState(null)
    



    //Need to present info on side div when marker clicked
    const onMarkerClick=(props,marker,e)=>{
        if(marker.animation !== null){
            marker.setAnimation(null)
        }else{
            marker.setAnimation(1)
        }   
    }

    //Need to change color depending on driver 
    const createMarkers=()=>{
        return locations.map(loc=>{
            return(
            <Marker position={{lat:loc.latitude, lng:loc.longitude}}
                    onClick={onMarkerClick}
                    animation={animation}
                    />
            )
        })
    }
   
    return(
        <div class="container">
            <Map
            google={props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{lat: 29.794940, lng: -95.569930}}
            >
            
        
            {/* {createMarkers()} */}

            {/* <InfoWindow 
                marker={markerInfo.activeMarker}
                visible={markerInfo.showingInfoWindow}>
                <div>
                    <h1>test</h1>
                </div>
            </InfoWindow> */}
            </Map>
            <div className="customer-div">
                <h3>Customer Info</h3>
                <div className="customer-info">
                    <p>Name:</p>
                    <p>Address</p>
                    <p>Live Data:</p>
                    <div class="live-data"></div>
                </div>
            </div>
        </div>
    )
    
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapTest)