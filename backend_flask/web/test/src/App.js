import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AppAdmin from './pages/AppAdmin';
import SystemAdmin from './pages/SystemAdmin';
import Khanh from './pages/Khanh';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/web/">Home</Link>
					</li>
					<li>
						<Link to="/web/signin">Sign In</Link>
					</li>
					<li>
						<Link to="/web/signup">Sign Up</Link>
					</li>
					<li>
						<Link to="/web/appadmin">App Admin</Link>
					</li>
					<li>
						<Link to="/web/systemadmin">System Admin</Link>
					</li>
					<li>
						<Link to="/web">Web</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/" element={<Khanh />} />
				<Route path="/web">
					<Route index element={<div>Web Home</div>} />
					<Route path="signin" element={<SignIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="appadmin" element={<AppAdmin />} />
					<Route path="systemadmin" element={<SystemAdmin />} />
				</Route>
				<Route path="*" element={<div>Not Found</div>} />
			</Routes>
		</div>
	);
}

export default App;
