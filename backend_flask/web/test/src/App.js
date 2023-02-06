import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AppAdmin from './pages/AppAdmin';
import SystemAdmin from './pages/SystemAdmin';
import Khanh from './pages/Khanh';
import { Link } from 'react-router-dom';

function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/signin">Sign In</Link>
					</li>
					<li>
						<Link to="/signup">Sign Up</Link>
					</li>
					<li>
						<Link to="/appadmin">App Admin</Link>
					</li>
					<li>
						<Link to="/systemadmin">System Admin</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/" element={<Khanh />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/appadmin" element={<AppAdmin />} />
				<Route path="/systemadmin" element={<SystemAdmin />} />
				<Route path="*" element={<div>Not Found</div>} />
			</Routes>
		</div>
	);
}

export default App;
