import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import DriverRoute from './DriverRoute'
import { DragDropContext } from 'react-beautiful-dnd';
import '../index.css'
import Title from './Title'


const Container = styled.div`
    display: flex;
`

const initialStops = {
    stops: {
        'stop-1': {id: 'stop-1', content: '', latitude:29.794940, longitude: -95.569930},
        'stop-2': {id: 'stop-2', content: '', latitude:29.794940, longitude: -95.569930},
        'stop-3': {id: 'stop-3', content: '', latitude:29.794940, longitude: -95.569930},
        'stop-4': {id: 'stop-4', content: '', latitude:29.794940, longitude: -95.569930},
        'stop-5': {id: 'stop-5', content: '', latitude:29.794940, longitude: -95.569930},

    },
    driverRoutes: {
        'driverRoute-1': {
            id: 'driverRoute-1',
            driverName: 'Frank',
            stopIds: ['stop-1', 'stop-2','stop-3','stop-4', 'stop-5']
        },
        'driverRoute-2': {
            id: 'driverRoute-2',
            driverName: 'Thomas',
            stopIds: []
        },
        'driverRoute-3': {
            id: 'driverRoute-3',
            driverName: 'Mary',
            stopIds: []
        },
    },
    //facilitates re-ordering of the columns
    driverRouteOrder: ['driverRoute-1', 'driverRoute-2', 'driverRoute-3'],
};


const AllRoutes = () =>{
    let [routeStops, setRouteStops] = useState(initialStops)
    const onDragStart =() => {
        document.body.style.color = 'orange'
        document.body.style.transition = 'background-color 0.2s ease';
    }

    const onDragUpdate = update => {
        const {destination} = update; 
        const opacity = destination ? destination.index / Object.keys(routeStops.stops).length : 0;
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
       const start = routeStops.driverRoutes[source.droppableId];
       const finish = routeStops.driverRoutes[destination.droppableId];

       if(start === finish){
           const newStopIds = Array.from(start.stopIds);
           newStopIds.splice(source.index, 1);
           newStopIds.splice(destination.index, 0, draggableId);


           const newDriverRoute = {
               ...start,
               stopIds: newStopIds,
           };
           const newState = {
               ...routeStops,
               driverRoutes: {
                   ...routeStops.driverRoutes,
                   [newDriverRoute.id]: newDriverRoute
               }
           }
           setRouteStops(newState);   
           return;         
       }

       //moving from one list to another
       const startStopIds = Array.from(start.stopIds);
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
           ...routeStops,
           driverRoutes: {
               ...routeStops.driverRoutes,
               [newStart.id]: newStart,
               [newFinish.id]: newFinish,
           },
       }
       setRouteStops(newState)


   };


       return (
           <DragDropContext 
           onDragStart={onDragStart}
           onDragUpdate={onDragUpdate}
           onDragEnd={onDragEnd} >
               <Container>
           {routeStops.driverRouteOrder.map((driverRouteId) => {
           const driverRoute = routeStops.driverRoutes[driverRouteId];
           const stops = driverRoute.stopIds.map(stopId => routeStops.stops[stopId]);

           return <DriverRoute key={driverRoute.id} driverRoute={driverRoute} stops={stops} />
       })}
       </Container>
       </DragDropContext>
       );
   }


export default AllRoutes
