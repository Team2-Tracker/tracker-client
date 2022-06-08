import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import { handleSelectOneRow } from './Utils'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableControlls from './TableControlls'

const TrackerRow = (props) => {
	const {
		tablet,
		desktop,
		selected,
		setSelected,
		dataName,
		row,
		handleEditDialogToggle,
		handleDetailsDialogToggle
	} = props

	const [rowCollapseOpen, setRowCollapseOpen] = React.useState(false)

	// Selects whichever row is entered as name
	// const isSelected = (name) => selected.indexOf(name) !== -1
	// const isItemSelected = isSelected(row._id)
	const isItemSelected = selected._id === row.id ? true : false

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
						handleSelectOneRow(row, selected, setSelected)
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
						<TableControlls
							open={rowCollapseOpen}
							dataName={dataName}
							handleEditDialogToggle={handleEditDialogToggle}
							handleDetailsDialogToggle={handleDetailsDialogToggle}
						/>
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
						<TableControlls
							open={rowCollapseOpen}
							dataName={dataName}
							handleEditDialogToggle={handleEditDialogToggle}
							handleDetailsDialogToggle={handleDetailsDialogToggle}
						/>
					</TableCell>
				</TableRow>
			</React.Fragment>
		)
	}
}

export default TrackerRow
