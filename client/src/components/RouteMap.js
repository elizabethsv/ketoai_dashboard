import React,{useState, useEffect, useLayoutEffect} from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import './App.css'
import CustomerInfo from './CustomerInfo'
import { blue } from '@material-ui/core/colors';
import {connect} from 'react-redux'
import {changeRoutes} from '../actions/index'
import Title from './Title';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


const API_KEY = ''

const mapStyles={
    width:'100%',
    border:'none'
}


const mapDispatchToProps=(dispatch)=>{
    return{
        changeRoutes: routes => dispatch(changeRoutes(routes))
    }
}

const mapStateToProps=state=>{
    return{
        routes: state
    }
}


export const MapRoutes = (props) =>{
    let mapRef = React.createRef()
    let [animation, setAnimation] = useState(null)
    // let [routeInfo, setRouteInfo] = useState(props.routeinfo)
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
    const onCloseClick=(props, e)=>{
        setCustomerInfo(null)
    }
 
    let newMarkers=[]
    const createMarkers=()=>{
        props.routes.driverRouteOrder.map((routeid)=>{
            const driverRoute = props.routes.driverRoutes[routeid]
            const stops = driverRoute.stopIds.map(stopId=> props.routes.stops[stopId])
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
    // useEffect(()=>{
    //     createMarkers()
        
    //     console.log(markers)
    // },[])

   useEffect(()=>{
        createMarkers()
        setMarkers(newMarkers)
        console.log(markers)
   },[props.routes])
   
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
         
                <Title>Customer Information
                    <IconButton size="small"><CloseIcon 
                    onClick={()=> onCloseClick()}
                    /></IconButton>
                </Title>
                <div className="customer-info">
                    <CustomerInfo />
                </div>
            </div>
           

        </div>
    )
    
}

const RouteMap = connect(mapStateToProps,mapDispatchToProps)(MapRoutes)
export default GoogleApiWrapper({
    apiKey: API_KEY,
})(RouteMap)