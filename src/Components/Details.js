import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import StyledFab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function Details(props) {
	const { open, handleToggle, dataName, selected, handleMenuOpen } = props

	let textFieldList = ''
	let displayList = ''
	if (dataName === 'Bug' && Object.keys(selected).length > 0) {
		displayList = [
			{ label: 'Name', defaultValue: selected.bugName },
			{ label: 'Issue', defaultValue: selected.issues },
			{ label: 'Priority', defaultValue: selected.priority },
			{ label: 'Time Estimate', defaultValue: selected.timeEstimate },
			{ label: 'Date Due', defaultValue: selected.dateDue },
			{ label: 'Date Created', defaultValue: selected.dateCreated },
			{ label: 'User Assigned', defaultValue: 'In Progress' }
		]
	}
	if (dataName === 'User' && Object.keys(selected).length > 0) {
		displayList = [
			{ label: 'UserName', defaultValue: selected.userName },
			{ label: 'First Name', defaultValue: selected.firstName },
			{ label: 'Last Name', defaultValue: selected.lastName },
			{
				label: 'Bugs',
				defaultValue:
					selected.bugs.length === 0
						? 'None'
						: selected.bugs.reduce(
								(previous, current) => previous.bugName + ' ' + current.bugName
						  )
			},
			{ label: 'Number of Bugs Assigned', defaultValue: selected.bugs.length },
			{
				label: 'Total Estimated Hours Assigned',
				defaultValue: selected.bugs.reduce(
					(previous, current) => previous.timeEstimate + current.timeEstimate,
					0
				)
			}
		]
	}
	if (Object.keys(selected).length > 0) {
		textFieldList = displayList.map((item) => {
			return (
				<TextField
					id="outlined-read-only-input"
					label={item.label}
					defaultValue={item.defaultValue}
					InputProps={{
						readOnly: true
					}}
					sx={{ width: '90%', m: 2 }}
				/>
			)
		})
	}
	return (
		<Dialog open={open} onClose={handleToggle}>
			<DialogTitle>{dataName} Details</DialogTitle>
			<DialogContent>{textFieldList}</DialogContent>
			<DialogActions>
				<Button variant="outlined" size="small">
					Edit
				</Button>
				<StyledFab
					color="secondary"
					aria-label="add"
					onClick={(event) =>
						handleMenuOpen(
							event,
							dataName === 'Bug' ? 'allUsers' : 'unassignedBugs'
						)
					}
				>
					<AssignmentIndIcon />
				</StyledFab>
				<Button variant="outlined" size="small">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Details
