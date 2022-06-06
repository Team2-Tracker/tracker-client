import './App.css'
import { Routes, Route } from 'react-router-dom'
import BugHome from './Components/BugHome'
import TopNavBar from './Components/TopNavBar'

function App() {
	return (
		<div className="App">
			<TopNavBar />
			<Routes>
				<Route path="/" element={<BugHome />} />
			</Routes>
		</div>
	)
}

export default App
