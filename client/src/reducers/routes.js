
import {CHANGE_ROUTE} from '../actions/consts'

const initialStops = {
    stops: {
        'stop-1': {id: 'stop-1', content: '', latitude:29.794940, longitude: -95.569930},
        'stop-2': {id: 'stop-2', content: '', latitude:29.784013, longitude:-95.651611},
        'stop-3': {id: 'stop-3', content: '', latitude:29.832076, longitude:-95.550651},
        'stop-4': {id: 'stop-4', content: '', latitude:29.794940, longitude: -95.569930},
        'stop-5': {id: 'stop-5', content: '', latitude:30.132650, longitude:-95.462870},

    },
    driverRoutes: {
        'driverRoute-1': {
            id: 'driverRoute-1',
            driverName: 'Frank',
            color: 'yellow',
            stopIds: ['stop-1', 'stop-2','stop-3','stop-4', 'stop-5']
        },
        'driverRoute-2': {
            id: 'driverRoute-2',
            driverName: 'Thomas',
            color: 'green',
            stopIds: []
        },
        'driverRoute-3': {
            id: 'driverRoute-3',
            driverName: 'Mary',
            color: 'blue',
            stopIds: []
        },
    },
    //facilitates re-ordering of the columns
    driverRouteOrder: ['driverRoute-1', 'driverRoute-2', 'driverRoute-3'],
};

const routeReducer = (state=initialStops,action) =>{
    switch(action.type){
        case CHANGE_ROUTE:
            return Object.assign({},state,action.payload)
    }
    console.log(state)
    return state
}

export default routeReducer