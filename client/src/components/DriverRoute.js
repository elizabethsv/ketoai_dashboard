import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { Paper } from '@material-ui/core';
import TechnicianStop from './TechnicianStop';

 
const useStyles = makeStyles(theme => ({
    fillClass: {
        height: "200px",
    }
}));

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: row;
    `;
const DriverName = styled.h3`
    padding: 8px;
    min-width: 50px
`;
const StopsList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}
    display: flex;
    min-width: 200px
`;

export default class DriverRoute extends React.Component {
    render() {
        return (
            <Container>
                <DriverName>{this.props.driverRoute.driverName}</DriverName>
                <Droppable droppableId={this.props.driverRoute.id} direction='horizontal'>
                {(provided, snapshot) => ( 
                <StopsList
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}>
                    {this.props.stops.map((stop, index) => (<TechnicianStop key={stop.id} stop={stop} index={index} />))}
                    {provided.placeholder}
                </StopsList>
                )}
                </Droppable>
            </Container>
        )
    }
}