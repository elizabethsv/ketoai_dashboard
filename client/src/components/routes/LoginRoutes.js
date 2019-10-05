import React from 'react';
import Login from '../Login'
import Register from '../Register'

const LoginRoutes = [
    {name: 'Register', path: '/', exact: true, main: ()=> <Register />},
    {name: 'Login', path: '/login', exact: true, main: () => <Login />}
];

export default LoginRoutes;

