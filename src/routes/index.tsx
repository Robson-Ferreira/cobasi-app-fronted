import React from 'react';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
} from 'react-router-dom';

import ListUser from '../pages/User/List';
import CreateUser from '../pages/User/Create';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path='/' element={<ListUser />} />
				<Route path='/users/create' element={<CreateUser />} />
			</Switch>
		</Router>
	);
}

export default Routes;
