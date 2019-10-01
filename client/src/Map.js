import React,{useState} from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
const API_KEY = 'AIzaSyBCTH0Dn95-mjPC-ZTMMGxbqPLrrl-DFw0'

const mapStyles={
    height: '100vh',
    width:'100%'
}

// const location={
//     city: 'Richmond',
//     image: null,
//     locationName:'Michael Messina',
//     owner:"tz0IZXBYLRUlP6dO37hf6XfUUI12",
//     poolSize:20000,
//     poolType:"chlorine",
//     pumpHP: 2,
//     pumpStyle:'single speed',
//     zip:'77406'
// }

// const customerDoc ={
//     accessCode: '123',
//     billPlanId: 'O6VCBI0ZRS6FFXm3AUCH',
//     billingAddr: '1334 Brittmore Rd',
//     billingAddr2: null,
//     billingCity: 'Houston',
//     billingSameAddr: true,
//     billingState: 'TX',
//     billingZip: '77043',
//     email: 'demo@gmail.com',
//     firstName: 'John',
//     homePhone:'1234567',
//     lastName: 'Doe',
//     locationId: 'Em6eaCya7U0KVHpKFkEa',
//     mobile: '000-000-0000',
//     note: 'My pool is clean',
//     receiveEmail: true,
//     receiveText: true,
//     techId: 'rCEUvSwBXqhaB1MJDdQvRM74MFH3',
//     work: '000-000-0000'
// }




export const MapTest = (props) =>{
    let [markerInfo, setMarkerInfo] = useState({
        showingInfoWindow: false,
        activeMarker:{},             
    })

    let [locations, setLocations]=useState([
        {latitude:29.794940, longitude:-95.569930}, 
        {latitude:29.784013, longitude:-95.651611},
        {latitude:29.832076, longitude:-95.550651},
        {latitude: 30.132650, longitude:-95.462870}
    ])

    let [animation, setAnimation] = useState(null)
    

    console.log(locations)

    //args: 
    const onMarkerClick=(props,marker,e)=>{
        if(marker.animation !== null){
            marker.setAnimation(null)
        }else{
            marker.setAnimation(1)
        }
        
    }


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
        <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{lat: 29.794940, lng: -95.569930}}
        >
        
       
        {createMarkers()}

        <InfoWindow 
            marker={markerInfo.activeMarker}
            visible={markerInfo.showingInfoWindow}>
            <div>
                <h1>test</h1>
            </div>
        </InfoWindow>
        </Map>
    )
    
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapTest)