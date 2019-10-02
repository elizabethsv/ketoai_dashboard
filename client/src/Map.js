import React,{useState, useEffect} from 'react'
import { Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css'
import CustomerInfo from './components/CustomerInfo'

const API_KEY = ''


//need to change 
const mapStyles={
    width:'100%',
    border:'none'
}

//need to integrate this into dashboard. 

export const MapTest = (props) =>{
   
    //use geocoding for the addresses to convert it to lat/long?
    let [locations, setLocations]=useState([
        {latitude:29.794940, longitude:-95.569930}, 
        {latitude:29.784013, longitude:-95.651611},
        {latitude:29.832076, longitude:-95.550651},
        {latitude: 30.132650, longitude:-95.462870}
    ])

    let [animation, setAnimation] = useState(null)

    let [customerInfo, setCustomerInfo] = useState(null)
    



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
})(MapTest)