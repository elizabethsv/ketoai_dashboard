import {createStore} from 'redux'
import routesReducer from '../reducers/routes'

const store = createStore(routesReducer)

export default store