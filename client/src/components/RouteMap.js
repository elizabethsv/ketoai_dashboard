import React,{useState, useEffect, useLayoutEffect} from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import './App.css'
import CustomerInfo from './CustomerInfo'
import { blue } from '@material-ui/core/colors';

const API_KEY = ''

const mapStyles={
    width:'100%',
    border:'none'
}





export const RouteMap = (props) =>{
    let mapRef = React.createRef()
    let [animation, setAnimation] = useState(null)
    let [routeInfo, setRouteInfo] = useState(props.routeinfo)
    let [markers, setMarkers] =useState([])
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
 
    let newMarkers=[]
    const createMarkers=()=>{
        routeInfo.driverRouteOrder.map((routeid)=>{
            const driverRoute = routeInfo.driverRoutes[routeid]
            const stops = driverRoute.stopIds.map(stopId=> routeInfo.stops[stopId])
            for(let i=0; i<stops.length; i++){
                newMarkers.push(<Marker key={driverRoute.name}
                    position={{lat: stops[i].latitude, lng: stops[i].longitude}}
                    onClick={onMarkerClick}
                    animation={animation}
                    draggable={true}
            icon={{url:`http://maps.google.com/mapfiles/ms/icons/${driverRoute.color}-dot.png`}}/>)
            }
        })
        
    }
    useEffect(()=>{
        createMarkers()
        
        console.log(markers)
    },[])

   useEffect(()=>{
        setMarkers([...markers, newMarkers])
        console.log(markers)
   },[routeInfo.driverRoutes])
   
    return(
       <div className="container">
            <Map
            ref={mapRef}
            google={props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{lat: 29.794940, lng: -95.569930}}
            containerStyle={{width: '100%', height: '300px',position:'relative' }}
            disableDefaultUI={true}
            >
                
            {markers}
           
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