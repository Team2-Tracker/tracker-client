import * as React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import TopNavBar from './Components/TopNavBar'
import About from './Components/About'
import useMediaQuery from '@mui/material/useMediaQuery'
import { fetchAllBugs, fetchAllUsers } from './Components/Utils'

function App() {
	// All Data from fetch request
	const [allBugs, setAllBugs] = React.useState([])
	const [allUsers, setAllUsers] = React.useState([])
	// Media queries to set width
	let tablet = useMediaQuery('(min-width:600px)')
	let desktop = useMediaQuery('(min-width:900px)')

	// On app load: Set allBugs and allUsers
	React.useEffect(() => {
		fetchAllBugs(setAllBugs)
		fetchAllUsers(setAllUsers)
	}, [])

	return (
		<div className="App">
			<TopNavBar />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							dataName="Bug"
							tablet={tablet}
							desktop={desktop}
							homeTitle="All Bugs"
							allBugs={allBugs}
							allUsers={allUsers}
							setAllBugs={setAllBugs}
							setAllUsers={setAllUsers}
						/>
					}
				/>
				<Route
					path="/users"
					element={
						<Home
							dataName="User"
							tablet={tablet}
							desktop={desktop}
							homeTitle="All Users"
							allBugs={allBugs}
							allUsers={allUsers}
							setAllBugs={setAllBugs}
							setAllUsers={setAllUsers}
						/>
					}
				/>
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	)
}

export default App
