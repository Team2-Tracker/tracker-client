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

const Home = (props) => {
	const {
		dataName,
		tableHeadCells,
		tablet,
		desktop,
		homeTitle,
		menuArray,
		allBugs,
		allUsers,
		fetchAllBugs,
		fetchAllUsers
	} = props
	// States for controlling the Table
	const [rows, setRows] = React.useState([])
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState({})
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [title, setTitle] = React.useState(homeTitle)
	// State for controlling filter menu
	const [anchorEl, setAnchorEl] = React.useState(null)
	const menuOpen = Boolean(anchorEl)
	// State for controlling the Dialogs
	const [addDialogOpen, setAddDialogOpen] = React.useState(false)
	const [editDialogOpen, setEditDialogOpen] = React.useState(false)
	const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false)
	// Variable to track location to load state properly
	let location = useLocation().pathname

	// Event handlers for menu open and close
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
	}
	// Open and close the Add Form
	const handleAddDialogToggle = () => {
		setAddDialogOpen(!addDialogOpen)
	}
	// Open and close the Edit Form
	const handleEditDialogToggle = () => {
		setEditDialogOpen(!editDialogOpen)
	}
	// Open and close the Details Dialog
	const handleDetailsDialogToggle = () => {
		setDetailsDialogOpen(!detailsDialogOpen)
	}

	React.useEffect(() => {
		setTitle(homeTitle)
		setRows(dataName === 'Bug' ? allBugs : allUsers)
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
				allData={dataName === 'Bug' ? allBugs : allUsers}
				setRows={setRows}
				setTitle={setTitle}
				menuArray={menuArray}
			/>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar
					handleMenuOpen={handleMenuOpen}
					title={title}
					handleAddDialogToggle={handleAddDialogToggle}
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
							tableHeadCells={tableHeadCells}
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
											handleEditDialogToggle={handleEditDialogToggle}
											handleDetailsDialogToggle={handleDetailsDialogToggle}
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
			<Details
				open={detailsDialogOpen}
				handleToggle={handleDetailsDialogToggle}
				// Replace 'bug' with state
				dataName={dataName}
				selected={selected}
			/>
			<BugForm open={addDialogOpen} handleToggle={handleAddDialogToggle} />
			{/* Recycle form for Edit */}
			<BugForm
				open={editDialogOpen}
				handleToggle={handleEditDialogToggle}
				type="edit"
				selected={selected}
			/>
		</Box>
	)
}

export default Home
