import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import DriverRoute from './DriverRoute'
import { DragDropContext } from 'react-beautiful-dnd';
import '../index.css'


const Container = styled.div`
    display: flex;
`

const initialStops = {
    stops: {
        'stop-1': {id: 'stop-1', content: 'S1'},
        'stop-2': {id: 'stop-2', content: 'S2'},
        'stop-3': {id: 'stop-3', content: 'S3'},
        'stop-4': {id: 'stop-4', content: 'S4'},
        'stop-5': {id: 'stop-5', content: 'S5'},
    },
    driverRoutes: {
        'driverRoute-1': {
            id: 'driverRoute-1',
            title: 'Driver 1',
            stopIds: ['stop-1', 'stop-2','stop-3','stop-4']
        },
        'driverRoute-2': {
            id: 'driverRoute-2',
            title: 'Driver 2',
            stopIds: []
        },
        'driverRoute-3': {
            id: 'driverRoute-3',
            title: 'Driver 3',
            stopIds: []
        },
    },
    //facilitates re-ordering of the columns
    driverRouteOrder: ['driverRoute-1', 'driverRoute-2', 'driverRoute-3'],
};


class AllRoutes extends React.Component {
    state = initialStops;

     onDragStart =() => {
         document.body.style.color = 'orange'
         document.body.style.transition = 'background-color 0.2s ease';
     }

     onDragUpdate = update => {
         const {destination} = update;
         const opacity = destination ? destination.index / Object.keys(this.state.stops).length : 0;
         document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
         }

    onDragEnd = result => {
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
        const start = this.state.driverRoutes[source.droppableId];
        const finish = this.state.driverRoutes[destination.droppableId];

        if(start === finish){
            const newStopIds = Array.from(start.stopIds);
            newStopIds.splice(source.index, 1);
            newStopIds.splice(destination.index, 0, draggableId);

            const newDriverRoute = {
                ...start,
                stopIds: newStopIds,
            };
            const newState = {
                ...this.state,
                driverRoutes: {
                    ...this.state.driverRoutes,
                    [newDriverRoute.id]: newDriverRoute
                }
            }
            this.setState(newState);   
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
            ...this.state,
            driverRoutes: {
                ...this.state.driverRoutes,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }
        this.setState(newState)


    };

    render() {
        return (
            <DragDropContext 
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd} >
                <Container>
            {this.state.driverRouteOrder.map((driverRouteId) => {
            const driverRoute = this.state.driverRoutes[driverRouteId];
            const stops = driverRoute.stopIds.map(stopId => this.state.stops[stopId]);

            return <DriverRoute key={driverRoute.id} driverRoute={driverRoute} stops={stops} />
        })}
        </Container>
        </DragDropContext>
        );
    }
}

export default AllRoutes