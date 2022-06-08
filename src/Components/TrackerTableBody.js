import * as React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import { getComparator, stableSort, handleSelectOneRow } from './Utils'

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

	if (dataName === 'bugs') {
		return (
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
								<TableRow
									hover
									onClick={() =>
										handleSelectOneRow(row._id, selected, setSelected)
									}
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row._id}
									selected={isItemSelected}
								>
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
		)
	}
	if (dataName === 'users') {
		return (
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
							let bugNumberCell = ''
							if (tablet) {
								bugNumberCell = <TableCell align="center">Add sum</TableCell>
							}
							let bugHoursCell = ''
							if (desktop) {
								bugHoursCell = <TableCell align="center">Add sum</TableCell>
							}

							return (
								<TableRow
									hover
									onClick={() =>
										handleSelectOneRow(row._id, selected, setSelected)
									}
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row._id}
									selected={isItemSelected}
								>
									<TableCell
										component="th"
										id={labelId}
										scope="row"
										padding="none"
									>
										{row.userName}
									</TableCell>
									<TableCell align="left">{row.firstName}</TableCell>
									<TableCell align="left">{row.lastName}</TableCell>
									{bugNumberCell}
									{bugHoursCell}
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
		)
	}
}

export default TrackerTableBody
