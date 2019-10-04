import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import DriverRoute from './DriverRoute'
import { DragDropContext } from 'react-beautiful-dnd';
import '../index.css'
import Title from './Title'
import {changeRoutes} from '../actions/index'
import {connect} from 'react-redux'

const Container = styled.div`
    display: flex;
`
// let markerStyles = {
//     'style1': 'blue',
//     'style2': 'yellow',
//     'style3': 'green',
//     'default':'yellow'
// }

// const initialStops = {
//     stops: {
//         'stop-1': {id: 'stop-1', content: '', latitude:29.794940, longitude: -95.569930},
//         'stop-2': {id: 'stop-2', content: '', latitude:29.784013, longitude:-95.651611},
//         'stop-3': {id: 'stop-3', content: '', latitude:29.832076, longitude:-95.550651},
//         'stop-4': {id: 'stop-4', content: '', latitude:29.794940, longitude: -95.569930},
//         'stop-5': {id: 'stop-5', content: '', latitude:30.132650, longitude:-95.462870},

//     },
//     driverRoutes: {
//         'driverRoute-1': {
//             id: 'driverRoute-1',
//             driverName: 'Frank',
//             color: markerStyles.style1,
//             stopIds: ['stop-1', 'stop-2','stop-3','stop-4', 'stop-5']
//         },
//         'driverRoute-2': {
//             id: 'driverRoute-2',
//             driverName: 'Thomas',
//             color: markerStyles.style2,
//             stopIds: []
//         },
//         'driverRoute-3': {
//             id: 'driverRoute-3',
//             driverName: 'Mary',
//             color: markerStyles.style3,
//             stopIds: []
//         },
//     },
//     //facilitates re-ordering of the columns
//     driverRouteOrder: ['driverRoute-1', 'driverRoute-2', 'driverRoute-3'],
// };



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

const AllRoutes = (props) =>{
    // let [routeStops, setRouteStops] = useState('')

    // props.techStops(initialStops)
    console.log(props.routes)

    
    const onDragStart =() => {
        document.body.style.color = 'orange'
        document.body.style.transition = 'background-color 0.2s ease';
    }

    const onDragUpdate = update => {
        const {destination} = update; 
        const opacity = destination ? destination.index / Object.keys(props.routes.stops).length : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
        }

   const onDragEnd = result => {
       document.body.style.color = 'inherit';
       document.body.style.backgroundColor = 'inherit';
    
       const { destination, source, draggableId } = result;
       
       if(!destination){
           return;
       }
       //see if the location of the draggable changed
       if(
           destination.droppableId === source.droppableId &&
           destination.index === source.index
       ){
           return;
       }
       const start = props.routes.driverRoutes[source.droppableId];

       const finish = props.routes.driverRoutes[destination.droppableId];
  

       if(start === finish){
           const newStopIds = Array.from(start.stopIds);
           newStopIds.splice(source.index, 1);
           newStopIds.splice(destination.index, 0, draggableId);


           const newDriverRoute = {
               ...start,
               stopIds: newStopIds,
           };
           const newState = {
               ...props.routes,
               driverRoutes: {
                   ...props.routes.driverRoutes,
                   [newDriverRoute.id]: newDriverRoute
               }
           }
           console.log(newState)
           
           props.changeRoutes(newState)
        //    setRouteStops(newState);
           
           return;         
       }

       //moving from one list to another
       const startStopIds = Array.from(start.stopIds);
       console.log(startStopIds)
       startStopIds.splice(source.index, 1);
       const newStart = {
           ...start,
           stopIds: startStopIds,
       };
       const finishStopIds = Array.from(finish.stopIds);
       finishStopIds.splice(destination.index, 0, draggableId);
       const newFinish = {
           ...finish,
           stopIds: finishStopIds,
       }

       const newState = {
           ...props.routes,
           driverRoutes: {
               ...props.routes.driverRoutes,
               [newStart.id]: newStart,
               [newFinish.id]: newFinish,
           },
       }
    //    setRouteStops(newState)
    //    props.techStops(newState)
            props.changeRoutes(newState)
            
            


   };


       return (
           <DragDropContext 
           onDragStart={onDragStart}
           onDragUpdate={onDragUpdate}
           onDragEnd={onDragEnd} >
               <Container>
           {props.routes.driverRouteOrder.map((driverRouteId) => {
           const driverRoute = props.routes.driverRoutes[driverRouteId];
           const stops = driverRoute.stopIds.map(stopId => props.routes.stops[stopId]);

           return <DriverRoute key={driverRoute.id} driverRoute={driverRoute} stops={stops} />
       })}
       </Container>
       </DragDropContext>
       );
   }


export default connect(mapStateToProps,mapDispatchToProps)(AllRoutes)
