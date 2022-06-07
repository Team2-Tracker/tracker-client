import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TrackerTableBody from './TrackerTableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import apiUrl from './../apiUrl'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
	handleRequestSort,
	handleChangePage,
	handleChangeRowsPerPage,
	handleChangeDense
} from './Utils'
import { bugTableHeadCells } from './TableConfig'
import EnhancedTableHead from './EnhancedTableHead'
import FilterMenu from './FilterMenu'
import EnhancedTableToolbar from './EnhancedTableToolbar'

const BugHome = () => {
	// States for controlling the Table
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [title, setTitle] = React.useState('All Bugs')
	// Table row data to display
	const [rows, setRows] = React.useState([])
	// All bugs from fetch request
	const [allBugs, setAllBugs] = React.useState([])
	// State for controlling filter menu
	const [anchorEl, setAnchorEl] = React.useState(null)
	const menuOpen = Boolean(anchorEl)
	// State for controlling the Add Bug and Edit Bug form dialogs
	const [addBugOpen, setAddBugOpen] = React.useState(false)
	const [editBugOpen, setEditBugOpen] = React.useState(false)
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

	// Media queries to figure out how many table columns to display
	let tablet = useMediaQuery('(min-width:600px)')
	let desktop = useMediaQuery('(min-width:900px)')

	// Function to fetch all bugs from database
	const fetchAllBugs = () => {
		fetch(apiUrl + '/bugs/')
			.then((res) => res.json())
			.then((data) => {
				setAllBugs(data.bugs)
				setRows(data.bugs)
			})
	}

	// On page load: Set allBugs and rows = fetched bugs
	React.useEffect(() => {
		fetchAllBugs()
	}, [])

	EnhancedTableHead.propTypes = {
		onRequestSort: PropTypes.func.isRequired,
		order: PropTypes.oneOf(['asc', 'desc']).isRequired,
		orderBy: PropTypes.string.isRequired
	}

	// Selects whichever row is entered as name
	const isSelected = (name) => selected.indexOf(name) !== -1

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
				setRows={setRows}
				setTitle={setTitle}
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
							headCells={() => bugTableHeadCells(tablet, desktop)}
						/>
						<TrackerTableBody
							order={order}
							orderBy={orderBy}
							page={page}
							rowsPerPage={rowsPerPage}
							isSelected={isSelected}
							tablet={tablet}
							desktop={desktop}
							selected={selected}
							emptyRows={emptyRows}
							dense={dense}
							setSelected={setSelected}
							rows={rows}
						/>
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
