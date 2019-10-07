import React, { useState, useContext } from 'react'
import LoginRoutes from './routes/LoginRoutes'
import {Link, withRouter} from 'react-router-dom'
import {AuthContext} from '../index';
import * as firebase from 'firebase'


const Header = ({history}) => {
    const {isLoggedIn} = useContext(AuthContext);

    const [error, setErrors] = useState('');

    const handleSignOut = () => {
        firebase.auth().signOut().then(res => {
            window.location.assign('/login')
        })
        .catch(e => {
            setErrors(e.message)
        })

    }

    return (
    <ul>
        {isLoggedIn === false ?  
            LoginRoutes.map((route, i) => (
                <li key={i}>
                    <Link to={route.path}>{route.name}</Link>
                </li>
            )) : null }
        {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
        {isLoggedIn && <li><Link to="#" onClick={() => handleSignOut()}>Log Out</Link></li>}
        <span>{error}</span>
    </ul>
    )
};

export default withRouter(Header)