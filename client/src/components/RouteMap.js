import React,{useState, useEffect} from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import './App.css'
import CustomerInfo from './CustomerInfo'

const API_KEY = ''


//need to change 
const mapStyles={
    width:'100%',
    border:'none'
}

//need to integrate this into dashboard. 

export const RouteMap = (props) =>{
   
    //use geocoding for the addresses to convert it to lat/long?
    let [locations, setLocations]=useState([
        {locationId: null, technicianId: null, latitude:29.794940, longitude:-95.569930}, 
        {locationId: null, technicianId: null, latitude:29.784013, longitude:-95.651611},
        {locationId: null, technicianId: null, latitude:29.832076, longitude:-95.550651},
        {locationId: null, technicianId: null, latitude:30.132650, longitude:-95.462870}
    ])

    let [animation, setAnimation] = useState(null)
    

    let [customerInfo, setCustomerInfo] = useState(null)
    
    let line = [
        {lat:29.794940, lng:-95.569930}, 
        {lat:29.784013, lng:-95.651611},
        {lat:29.832076, lng:-95.550651},
        {lat: 30.132650, lng:-95.462870}
    ]
    

    //Need to add a close button to div 
    const onMarkerClick=(props,marker,e)=>{
        if(marker.animation !== null){
            marker.setAnimation(null)
            setCustomerInfo(null)
            
        }else{
            marker.setAnimation(1)
            setCustomerInfo(true)
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
       <div className="container">
            <Map
            google={props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{lat: 29.794940, lng: -95.569930}}
            containerStyle={{width: '100%', height: '300px',position:'relative' }}
            disableDefaultUI={true}
            >
                <Polyline
            path={line}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} />
            {createMarkers()}
           
            </Map>
            <div className={!customerInfo ? 'customer-div' : 'display-customer-info'}>
         
                <h3>Customer Information</h3>
                <div className="customer-info">
                    <CustomerInfo />
                </div>
            </div>
           

        </div>
    )
    
}

export default GoogleApiWrapper({
    apiKey: API_KEY,
})(RouteMap)