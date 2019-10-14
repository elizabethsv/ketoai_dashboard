import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import firebaseConfig from './components/firebase/Firebase'
import LoginRoutes from './components/routes/LoginRoutes'
import ProtectedRoutes from './components/routes/ProtectedRoutes'
import {Provider} from 'react-redux'
import store from './store/index'
import Header from './components/Header'
import {changeRoutes} from '../src/actions/index'
//checks if the user is logged in or not
import ProtectedRouteHoc from './components/routes/ProtectedRouteHoc'
import Dashboard from './components/Dashboard'
window.store = store;
window.changeRoutes = changeRoutes;

firebase.initializeApp(firebaseConfig);
export const AuthContext = React.createContext(null);

function App() {
    const [isLoggedIn, setLoggedIn] = useState(readSession());

    function readSession(){
        const user = window.sessionStorage.getItem(
            `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        );
        return user != null ? true : false 

    }
    useEffect(() => {
        //readSession()
    }, [])


    return (
        <Provider store={store}>
            <Dashboard/>
        {/* <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            Is logged in? {JSON.stringify(isLoggedIn)}
            <div>
                <Router>
                    <Header isLoggedIn={isLoggedIn}/>
                    <Switch>
                        {ProtectedRoutes.map(route => (
                            <ProtectedRouteHoc
                                key={route.path}
                                isLoggedIn={isLoggedIn}
                                path={route.path}
                                component={route.main}
                                exact={route.exact}
                                public={route.public}
                            />
                        ))}
                        {LoginRoutes.map(route => (
                            <Route 
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                            />
                        ))}
                    </Switch>
                </Router>
            </div>
        </AuthContext.Provider> */}
        </Provider>
    )
}

ReactDOM.render(
    <App />
    , 
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
