import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import apiUrl from './../apiUrl'
import useMediaQuery from '@mui/material/useMediaQuery'
import moment from 'moment'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { handleFilterRowsBy, getComparator, stableSort } from './Utils'
import EnhancedTableHead from './EnhancedTableHead'

const BugHome = () => {
	// Table display order
	const [order, setOrder] = React.useState('asc')
	// Which column to order by
	const [orderBy, setOrderBy] = React.useState('calories')
	// Which items in list are selected
	const [selected, setSelected] = React.useState([])
	// Which page of data is displaying
	const [page, setPage] = React.useState(0)
	// Dense display state (true / false)
	const [dense, setDense] = React.useState(false)
	// How many rows to display per page
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	// Table row data
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

	const EnhancedTableToolbar = (props) => {
		const { numSelected } = props

		return (
			// This toolbar contains the table header OR the selected bugs feature
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity
							)
					})
				}}
			>
				{/* Ternary displays title or selected */}
				{numSelected > 0 ? (
					<Typography
						sx={{ flex: '1 1 100%' }}
						color="inherit"
						variant="subtitle1"
						component="div"
					>
						{numSelected} selected
					</Typography>
				) : (
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						All Bugs
					</Typography>
				)}
				{/* Ternary displays delete button OR filter as appropriate */}
				{numSelected > 0 ? (
					<Tooltip title="Delete">
						<IconButton>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Filter list" onClick={handleMenuOpen}>
						<IconButton>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>
		)
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

	// This function handles the sort order
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	// Handles selecting all rows in the table header
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	// Handles selecting one item from the list
	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}
		setSelected(newSelected)
	}

	// Changes which page is being displayed
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	// Changes number of rows displayed per page
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	// Toggles the padding
	const handleChangeDense = (event) => {
		setDense(event.target.checked)
	}

	// Selects whichever row is entered as name
	const isSelected = (name) => selected.indexOf(name) !== -1

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	// let tableAll = ''
	console.log(rows)
	// if (rows) {
	// 	}
	// }

	return (
		<Box sx={{ width: '100%' }}>
			<Menu
				id="filter-menu"
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={handleMenuClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				<MenuItem
					onClick={() => {
						handleMenuClose()
						handleFilterRowsBy('all', allBugs, setRows)
					}}
				>
					All Bugs
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleMenuClose()
						handleFilterRowsBy('active', allBugs, setRows)
					}}
				>
					Active Bugs
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleMenuClose()
						handleFilterRowsBy('closed', allBugs, setRows)
					}}
				>
					Closed Bugs
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleMenuClose()
						handleFilterRowsBy('assigned', allBugs, setRows)
					}}
				>
					Assigned Bugs
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleMenuClose()
						handleFilterRowsBy('unassigned', allBugs, setRows)
					}}
				>
					Unassigned Bugs
				</MenuItem>
			</Menu>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
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
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
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
												onClick={(event) => handleClick(event, row._id)}
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
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</Box>
	)
}

export default BugHome
