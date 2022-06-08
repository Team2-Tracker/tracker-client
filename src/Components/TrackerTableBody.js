import * as React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import { getComparator, stableSort, handleSelectOneRow } from './Utils'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableControlls from './TableControlls'

const TrackerTableBody = (props) => {
	const {
		order,
		orderBy,
		page,
		rows,
		rowsPerPage,
		isSelected,
		tablet,
		desktop,
		selected,
		emptyRows,
		dense,
		setSelected,
		dataName
	} = props

	const Row = (props) => {
		const { row } = props
		const [open, setOpen] = React.useState(false)
		const isItemSelected = isSelected(row._id)

		const handleControllToggle = () => {
			setOpen(true)
			console.log(open)
		}

		if (dataName === 'bugs') {
			// Populate Issues at 600px
			let issuesCell = ''
			if (tablet) {
				issuesCell = <TableCell align="center">{row.issues}</TableCell>
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
				<React.Fragment>
					<TableRow
						hover
						onClick={() => {
							handleSelectOneRow(row._id, selected, setSelected)
							handleControllToggle()
						}}
						aria-checked={isItemSelected}
						selected={isItemSelected}
						sx={{ '& > *': { borderBottom: 'unset' } }}
					>
						<TableCell>
							<IconButton aria-label="expand row" size="small">
								{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</IconButton>
						</TableCell>
						<TableCell component="th" scope="row">
							{row.bugName}
						</TableCell>
						{issuesCell}
						<TableCell align="left">
							{moment(row.dateDue).format('MMM Do YY')}
						</TableCell>
						{dateCreatedCell}
						<TableCell align="right">{row.assigned}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
							<TableControlls open={open} dataName={dataName} />
						</TableCell>
					</TableRow>
				</React.Fragment>
			)
		}
		if (dataName === 'users') {
			// Populate Issues at 600px
			let bugNumberCell = ''
			if (tablet) {
				bugNumberCell = <TableCell align="center">Add sum</TableCell>
			}
			let bugHoursCell = ''
			if (desktop) {
				bugHoursCell = <TableCell align="center">Add sum</TableCell>
			}

			return (
				<React.Fragment>
					<TableRow
						hover
						onClick={() => {
							handleSelectOneRow(row._id, selected, setSelected)
							setOpen(!open)
						}}
						aria-checked={isItemSelected}
						selected={isItemSelected}
					>
						<TableCell>
							<IconButton aria-label="expand row" size="small">
								{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</IconButton>
						</TableCell>
						<TableCell component="th" scope="row" padding="none">
							{row.userName}
						</TableCell>
						<TableCell align="left">{row.firstName}</TableCell>
						<TableCell align="left">{row.lastName}</TableCell>
						{bugNumberCell}
						{bugHoursCell}
					</TableRow>
					<TableControlls open={open} dataName={dataName} />
				</React.Fragment>
			)
		}
	}

	return (
		<TableBody>
			{
				/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                rows.slice().sort(getComparator(order, orderBy)) */
				stableSort(rows, getComparator(order, orderBy))
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((row) => (
						<Row key={row._id} row={row} />
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
	)
}

export default TrackerTableBody
