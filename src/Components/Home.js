import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TrackerRow from './TrackerRow'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import {
	getComparator,
	stableSort,
	handleRequestSort,
	handleChangePage,
	handleChangeRowsPerPage,
	handleChangeDense
} from './Utils'
import EnhancedTableHead from './EnhancedTableHead'
import FilterMenu from './FilterMenu'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import { useLocation } from 'react-router-dom'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Details from './Details'
import BugForm from './BugForm'
import UserForm from './UserForm'

const Home = (props) => {
	const {
		dataName,
		tablet,
		desktop,
		homeTitle,
		allBugs,
		allUsers,
		setAllBugs,
		setAllUsers
	} = props
	// Create an object to reset dialogData
	const emptyDialogData = {
		bugName: '',
		issues: '',
		priority: 1,
		timeEstimate: 0,
		dateDue: '',
		dateCreated: '',
		userName: '',
		firstName: '',
		lastName: ''
	}

	// States for controlling the Table
	const [rows, setRows] = React.useState([])
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState('')
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [title, setTitle] = React.useState(homeTitle)
	// State for controlling filter menu
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [menuType, setMenuType] = React.useState('')
	const menuOpen = Boolean(anchorEl)
	// State for controlling the Dialogs
	const [bugDialogOpen, setBugDialogOpen] = React.useState(false)
	const [userDialogOpen, setUserDialogOpen] = React.useState(false)
	const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false)
	const [dialogData, setDialogData] = React.useState(emptyDialogData)
	const [dialogType, setDialogType] = React.useState('')
	// Variable to track location to load state properly
	let location = useLocation().pathname

	// Event handlers for menu open and close
	const handleMenuOpen = (event, menuType) => {
		setAnchorEl(event.currentTarget)
		setMenuType(menuType)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
	}
	// Open and close the Add Form
	const handleBugDialogToggle = () => {
		setBugDialogOpen(!bugDialogOpen)
	}
	// Open and close the Edit Form
	const handleUserDialogToggle = () => {
		setUserDialogOpen(!userDialogOpen)
	}
	// Open and close the Details Dialog
	const handleDetailsDialogToggle = () => {
		setDetailsDialogOpen(!detailsDialogOpen)
	}

	console.log('dialogData: ', dialogData)

	React.useEffect(() => {
		setTitle(homeTitle)
		setRows(dataName === 'Bug' ? allBugs : allUsers)
		setDialogData(emptyDialogData)
	}, [location, allBugs, allUsers])

	// Adding propTypes for the EnhancedTableHead Component
	EnhancedTableHead.propTypes = {
		onRequestSort: PropTypes.func.isRequired,
		order: PropTypes.oneOf(['asc', 'desc']).isRequired,
		orderBy: PropTypes.string.isRequired
	}

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	return (
		<Box sx={{ width: '100%' }}>
			<FilterMenu
				anchorEl={anchorEl}
				menuOpen={menuOpen}
				onClose={handleMenuClose}
				handleMenuClose={handleMenuClose}
				allBugs={allBugs}
				allUsers={allUsers}
				setRows={setRows}
				setTitle={setTitle}
				setAllBugs={setAllBugs}
				setAllUsers={setAllUsers}
				dataName={dataName}
				menuType={menuType}
				selected={selected}
				setDetailsDialogOpen={setDetailsDialogOpen}
			/>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar
					handleMenuOpen={handleMenuOpen}
					title={title}
					dataName={dataName}
					handleBugDialogToggle={handleBugDialogToggle}
					handleUserDialogToggle={handleUserDialogToggle}
					setDialogData={setDialogData}
					setDialogType={setDialogType}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 370 }}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={(event, property) =>
								handleRequestSort(
									event,
									property,
									order,
									orderBy,
									setOrder,
									setOrderBy
								)
							}
							dataName={dataName}
							tablet={tablet}
							desktop={desktop}
						/>
						<TableBody>
							{
								/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                rows.slice().sort(getComparator(order, orderBy)) */
								stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => (
										<TrackerRow
											key={row._id}
											row={row}
											selected={selected}
											setSelected={setSelected}
											tablet={tablet}
											desktop={desktop}
											dataName={dataName}
											handleBugDialogToggle={handleBugDialogToggle}
											handleUserDialogToggle={handleUserDialogToggle}
											handleDetailsDialogToggle={handleDetailsDialogToggle}
											handleMenuOpen={handleMenuOpen}
											setAllBugs={setAllBugs}
											setDialogData={setDialogData}
											setDialogType={setDialogType}
										/>
									))
							}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={(event, newPage) =>
						handleChangePage(event, newPage, setPage)
					}
					onRowsPerPageChange={(event) =>
						handleChangeRowsPerPage(event, setRowsPerPage, setPage)
					}
				/>
			</Paper>
			<FormControlLabel
				control={
					<Switch
						checked={dense}
						onChange={(event) => handleChangeDense(event, setDense)}
					/>
				}
				label="Dense padding"
			/>
			{/* Works for users or bugs based on DataName */}
			<Details
				open={detailsDialogOpen}
				handleToggle={handleDetailsDialogToggle}
				dataName={dataName}
				dialogData={dialogData}
				handleMenuOpen={handleMenuOpen}
				handleBugDialogToggle={handleBugDialogToggle}
				handleUserDialogToggle={handleUserDialogToggle}
				setAllBugs={setAllBugs}
			/>
			{/* Works for Edit or New based on type */}
			<BugForm
				bugDialogOpen={bugDialogOpen}
				dataName={dataName}
				handleToggle={handleBugDialogToggle}
				desktop={desktop}
				type={dialogType}
				dialogData={dialogData}
				setAllBugs={setAllBugs}
			/>
			{/* Works for Edit or New based on type */}
			<UserForm
				userDialogOpen={userDialogOpen}
				dataName={dataName}
				handleToggle={handleUserDialogToggle}
				type={dialogType}
				dialogData={dialogData}
				setAllUsers={setAllUsers}
			/>
		</Box>
	)
}

export default Home
