import * as React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableControls from './TableControls'

const TrackerRow = (props) => {
	const {
		tablet,
		desktop,
		selected,
		setSelected,
		dataName,
		row,
		handleBugDialogToggle,
		handleUserDialogToggle,
		handleDetailsDialogToggle,
		handleMenuOpen
	} = props

	const [rowCollapseOpen, setRowCollapseOpen] = React.useState(false)

	// Sets whichever row is selected by ID
	const isItemSelected = selected._id === row._id ? true : false
	let priorityBackground = ''

	if (dataName === 'Bug') {
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
						row === selected ? setSelected({}) : setSelected(row)
						setRowCollapseOpen(!rowCollapseOpen)
					}}
					aria-checked={isItemSelected}
					selected={isItemSelected}
					sx={{
						'& > *': { borderBottom: 'unset' },
						'textDecoration': row.isActive ? 'none' : 'line-through',
						'backgroundColor': priorityBackground
					}}
				>
					<TableCell>
						<IconButton aria-label="expand row" size="small">
							{rowCollapseOpen ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
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
				<TableRow selected={true}>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<TableControls
							open={rowCollapseOpen}
							dataName={dataName}
							handleBugDialogToggle={handleBugDialogToggle}
							handleUserDialogToggle={handleUserDialogToggle}
							handleDetailsDialogToggle={handleDetailsDialogToggle}
							handleMenuOpen={handleMenuOpen}
							row={row}
						/>
					</TableCell>
				</TableRow>
			</React.Fragment>
		)
	}
	if (dataName === 'User') {
		// Populate Issues at 600px
		let bugNumberCell = ''
		if (tablet) {
			bugNumberCell = (
				<TableCell align="center">{row.bugs ? row.bugs.length : 0}</TableCell>
			)
		}
		let bugHoursCell = ''
		if (desktop) {
			let bugHours = 0
			row.bugs.forEach((bug) => {
				bugHours = bugHours + bug.timeEstimate
			})
			bugHoursCell = (
				<TableCell align="center">
					{
						(row.bugs.reduce(
							(previous, current) =>
								previous.timeEstimate + current.timeEstimate
						),
						0)
					}
				</TableCell>
			)
		}
		return (
			<React.Fragment>
				<TableRow
					hover
					onClick={() => {
						row === selected ? setSelected({}) : setSelected(row)
						setRowCollapseOpen(!rowCollapseOpen)
					}}
					aria-checked={isItemSelected}
					selected={isItemSelected}
					sx={{ '& > *': { borderBottom: 'unset' } }}
				>
					<TableCell>
						<IconButton aria-label="expand row" size="small">
							{rowCollapseOpen ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row">
						{row.userName}
					</TableCell>
					<TableCell align="left">{row.firstName}</TableCell>
					<TableCell align="left">{row.lastName}</TableCell>
					{bugNumberCell}
					{bugHoursCell}
				</TableRow>
				<TableRow selected={true}>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<TableControls
							open={rowCollapseOpen}
							dataName={dataName}
							handleBugDialogToggle={handleBugDialogToggle}
							handleUserDialogToggle={handleUserDialogToggle}
							handleDetailsDialogToggle={handleDetailsDialogToggle}
							handleMenuOpen={handleMenuOpen}
							row={row}
						/>
					</TableCell>
				</TableRow>
			</React.Fragment>
		)
	}
}

export default TrackerRow
