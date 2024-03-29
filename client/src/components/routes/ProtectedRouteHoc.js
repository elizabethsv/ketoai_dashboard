import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'
import {bool, any, object} from 'prop-types';


//renders the guarded route
const ProtectedRouteHoc = ({ component: Component, isLoggedIn, ...rest }) => {
	if (isLoggedIn || rest.public) {
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>;
				}}
			/>
		);
	} else if (isLoggedIn === true){
		console.log("test2")
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>;
				}}
			/>
		);
	}
	return <Redirect to={{ pathname: '/login' }} />;
};

ProtectedRouteHoc.propTypes = {
	component: any,
	isLoggedIn: bool,
	rest: object,
	props: object,
};

export default withRouter(ProtectedRouteHoc);


