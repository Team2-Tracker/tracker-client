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
import apiUrl from '../apiUrl'
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

const BugHome = (props) => {
	const { dataName, tableHeadCells, tablet, desktop, homeTitle, menuArray } =
		props
	// States for controlling the Table
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [title, setTitle] = React.useState(homeTitle)
	// Table row data to display
	const [rows, setRows] = React.useState([])
	// All bugs from fetch request
	const [allData, setAllData] = React.useState([])
	// State for controlling filter menu
	const [anchorEl, setAnchorEl] = React.useState(null)
	const menuOpen = Boolean(anchorEl)
	// State for controlling the Add Bug and Edit Bug form dialogs
	const [addBugOpen, setAddBugOpen] = React.useState(false)
	const [editBugOpen, setEditBugOpen] = React.useState(false)
	// Variable to track location inside app for reloading between Bugs and Users
	let location = useLocation().pathname

	// Event handlers for menu open and close
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
	}
	// Open and close the Add Bug Form
	const handleAddBugToggle = () => {
		setAddBugOpen(!addBugOpen)
	}
	// Open and close the Edit Bug Form
	const handleEditBugToggle = () => {
		setEditBugOpen(!editBugOpen)
	}

	// Function to fetch all bugs from database
	const fetchAllBugs = () => {
		fetch(apiUrl + `/${dataName}/`)
			.then((res) => res.json())
			.then((data) => {
				setAllData(data[dataName])
				setRows(data[dataName])
			})
	}

	// On page load: Set allData and rows = fetched bugs
	React.useEffect(() => {
		fetchAllBugs()
		setTitle(homeTitle)
	}, [location])

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
				allData={allData}
				setRows={setRows}
				setTitle={setTitle}
				menuArray={menuArray}
			/>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar
					handleMenuOpen={handleMenuOpen}
					title={title}
					handleAddBugToggle={handleAddBugToggle}
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
		</Box>
	)
}

export default BugHome
