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

function App() {
	// Media queries to set width
	let tablet = useMediaQuery('(min-width:600px)')
	let desktop = useMediaQuery('(min-width:900px)')

	return (
		<div className="App">
			<TopNavBar />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							dataName="bugs"
							tableHeadCells={() => bugTableHeadCells(tablet, desktop)}
							tablet={tablet}
							desktop={desktop}
							homeTitle="All Bugs"
							menuArray={bugMenu}
						/>
					}
				/>
				<Route
					path="/users"
					element={
						<Home
							dataName="users"
							tableHeadCells={() => userTableHeadCells(tablet, desktop)}
							tablet={tablet}
							desktop={desktop}
							homeTitle="All Users"
							menuArray={usersMenu}
						/>
					}
				/>
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	)
}

export default App
