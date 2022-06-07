import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import apiUrl from './../apiUrl'
import useMediaQuery from '@mui/material/useMediaQuery'
import moment from 'moment'
import {
	getComparator,
	stableSort,
	handleRequestSort,
	handleSelectAllClick,
	handleSelectOneRow,
	handleChangePage,
	handleChangeRowsPerPage,
	handleChangeDense
} from './Utils'
import EnhancedTableHead from './EnhancedTableHead'
import FilterMenu from './FilterMenu'
import EnhancedTableToolbar from './EnhancedTableToolbar'

const BugHome = () => {
	// States for Controlling Table
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [title, setTitle] = React.useState('All Bugs')
	// Table row data to display
	const [rows, setRows] = React.useState([])
	// All bugs
	const [allBugs, setAllBugs] = React.useState([])
	// State for controlling filter menu
	const [anchorEl, setAnchorEl] = React.useState(null)
	const menuOpen = Boolean(anchorEl)

	// Event handlers for menu open and close
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
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

	// For mobile, only display 3 columns:
	const headCells = () => {
		let headCells = [
			{
				id: 'name',
				align: 'left',
				disablePadding: true,
				label: 'Bug Name'
			},
			{
				id: 'dateDue',
				align: 'center',
				disablePadding: true,
				label: 'Date Due'
			},
			{
				id: 'assigned',
				align: 'right',
				disablePadding: false,
				label: 'Assigned To'
			}
		]
		// Add "Issues" column at 600px
		if (tablet) {
			headCells.splice(1, 0, {
				id: 'issues',
				align: 'center',
				disablePadding: true,
				label: 'Issues'
			})
		}
		// Add "Date created" column at 900px
		if (desktop) {
			headCells.splice(3, 0, {
				id: 'dateCreated',
				align: 'center',
				disablePadding: true,
				label: 'Date Created'
			})
		}
		return headCells
	}

	EnhancedTableHead.propTypes = {
		numSelected: PropTypes.number.isRequired,
		onRequestSort: PropTypes.func.isRequired,
		onSelectAllClick: PropTypes.func.isRequired,
		order: PropTypes.oneOf(['asc', 'desc']).isRequired,
		orderBy: PropTypes.string.isRequired,
		rowCount: PropTypes.number.isRequired
	}

	EnhancedTableToolbar.propTypes = {
		numSelected: PropTypes.number.isRequired
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
					numSelected={selected.length}
					handleMenuOpen={handleMenuOpen}
					title={title}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 370 }}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={(event) =>
								handleSelectAllClick(event, rows, setSelected)
							}
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
							rowCount={rows.length}
							headCells={headCells}
						/>
						<TableBody>
							{
								/* if you don't need to support IE11, you can replace the `stableSort` call with:
                            rows.slice().sort(getComparator(order, orderBy)) */
								stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row._id)
										const labelId = `enhanced-table-checkbox-${index}`
										// Populate Issues at 600px
										let issuesCell = ''
										if (tablet) {
											issuesCell = (
												<TableCell align="center">{row.issues}</TableCell>
											)
										}
										let dateCreatedCell = ''
										if (desktop) {
											dateCreatedCell = (
												<TableCell align="center">
													{moment(row.dateCreated).format('MMM Do YY')}
												</TableCell>
											)
										}

										return (
											<TableRow
												hover
												onClick={(event) =>
													handleSelectOneRow(
														event,
														row._id,
														selected,
														setSelected
													)
												}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row._id}
												selected={isItemSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox
														color="primary"
														checked={isItemSelected}
														inputProps={{
															'aria-labelledby': labelId
														}}
													/>
												</TableCell>
												<TableCell
													component="th"
													id={labelId}
													scope="row"
													padding="none"
												>
													{row.bugName}
												</TableCell>
												{issuesCell}
												<TableCell align="left">
													{moment(row.dateDue).format('MMM Do YY')}
												</TableCell>
												{dateCreatedCell}
												<TableCell align="right">{row.assigned}</TableCell>
											</TableRow>
										)
									})
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
