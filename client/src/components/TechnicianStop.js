import React from 'react';
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
 

const Container = styled.div`
    margin-right: 8px;
    border: 1px solid lightgrey;
    
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
    display: flex;
    justify-content: center;
    align-items: center
    `;


export default class TechnicianStop extends React.Component {
        render() {
            return (
            <Draggable draggableId={this.props.stop.id} index={this.props.index}>
                {(provided, snapshot) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
                
            {this.props.stop.content} 
            </Container>
                )}
            </Draggable>
            )
        }
    }