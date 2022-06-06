import './App.css'
import { Routes, Route } from 'react-router-dom'
import BugHome from './Components/BugHome'
import TopNavBar from './Components/TopNavBar'
import About from './Components/About'
import Users from './Components/Users'

function App() {
	return (
		<div className="App">
			<TopNavBar />
			<Routes>
				<Route path="/" element={<BugHome />} />
				<Route path="/users" element={<Users />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	)
}

export default App
