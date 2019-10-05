import React from 'react'
import Dashboard from '../Dashboard'
const ProtectedRoutes = [
    {
        name: 'Dashboard',
        exact: true,
        path: '/dashboard',
        main: props => <Dashboard {...props} />,
        public: false,
    },
]

export default ProtectedRoutes