import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Dashboard from './components/Dashboard';
import {Provider} from 'react-redux'
import store from './store/index'

import { changeRoutes } from "../src/actions/index";

window.store = store;
window.changeRoutes = changeRoutes;

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <Dashboard />
    </Provider>
, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
