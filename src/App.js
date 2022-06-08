import * as React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import TopNavBar from './Components/TopNavBar'
import About from './Components/About'
import {
	bugTableHeadCells,
	userTableHeadCells,
	bugMenu,
	usersMenu
} from './Components/TableConfig'
import useMediaQuery from '@mui/material/useMediaQuery'
import BugForm from './Components/BugForm'
import apiUrl from './apiUrl'
import Users from './Components/Users'
import Details from './Components/Details'

function App() {
	// All Data from fetch request
	const [allBugs, setAllBugs] = React.useState([])
	const [allUsers, setAllUsers] = React.useState([])
	// Media queries to set width
	let tablet = useMediaQuery('(min-width:600px)')
	let desktop = useMediaQuery('(min-width:900px)')

	// Functions to fetch all data from database
	const fetchAllBugs = () => {
		fetch(apiUrl + `/bugs/`)
			.then((res) => res.json())
			.then((data) => {
				setAllBugs(data.bugs)
			})
	}
	const fetchAllUsers = () => {
		fetch(apiUrl + `/users/`)
			.then((res) => res.json())
			.then((data) => {
				setAllUsers(data.users)
			})
	}

	// On app load: Set allBugs and allUsers
	React.useEffect(() => {
		fetchAllBugs()
		fetchAllUsers()
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
							tableHeadCells={() => bugTableHeadCells(tablet, desktop)}
							tablet={tablet}
							desktop={desktop}
							homeTitle="All Bugs"
							menuArray={bugMenu}
							allBugs={allBugs}
							allUsers={allUsers}
							fetchAllBugs={fetchAllBugs}
							fetchAllUsers={fetchAllUsers}
						/>
					}
				/>
				<Route
					path="/users"
					element={
						<Home
							dataName="User"
							tableHeadCells={() => userTableHeadCells(tablet, desktop)}
							tablet={tablet}
							desktop={desktop}
							homeTitle="All Users"
							menuArray={usersMenu}
							allBugs={allBugs}
							allUsers={allUsers}
							fetchAllBugs={fetchAllBugs}
							fetchAllUsers={fetchAllUsers}
						/>
					}
				/>
				<Route path="/details" element={<Details />} />
				<Route path="/users" element={<Users />} />
				<Route path="/about" element={<About />} />
				<Route path="/form" element={<BugForm />} />
			</Routes>
		</div>
	)
}

export default App
