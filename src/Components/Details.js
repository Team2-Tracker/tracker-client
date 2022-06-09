import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import StyledFab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function Details(props) {
	const {
		open,
		handleToggle,
		dataName,
		dialogData,
		handleMenuOpen,
		handleBugDialogToggle,
		handleUserDialogToggle
	} = props

	let textFieldList = ''
	let displayList = ''
	if (dataName === 'Bug' && Object.keys(dialogData).length > 0) {
		displayList = [
			{ label: 'Name', value: dialogData.bugName },
			{ label: 'Issue', value: dialogData.issues },
			{ label: 'Priority', value: dialogData.priority },
			{ label: 'Time Estimate', value: dialogData.timeEstimate },
			{ label: 'Date Due', value: dialogData.dateDue },
			{ label: 'Date Created', value: dialogData.dateCreated },
			{ label: 'User Assigned', value: 'In Progress' }
		]
	}
	if (dataName === 'User' && Object.keys(dialogData).length > 0) {
		displayList = [
			{ label: 'UserName', value: dialogData.userName },
			{ label: 'First Name', value: dialogData.firstName },
			{ label: 'Last Name', value: dialogData.lastName },
			{
				label: 'Bugs',
				value:
					dialogData.bugs.length === 0
						? 'None'
						: dialogData.bugs.reduce(
								(previous, current) => previous.bugName + ' ' + current.bugName
						  )
			},
			{
				label: 'Number of Bugs Assigned',
				value: dialogData.bugs.length
			},
			{
				label: 'Total Estimated Hours Assigned',
				value: dialogData.bugs.reduce(
					(previous, current) => previous.timeEstimate + current.timeEstimate,
					0
				)
			}
		]
	}
	if (Object.keys(dialogData).length > 0) {
		textFieldList = displayList.map((item) => {
			return (
				<TextField
					key={item.label}
					id="outlined-read-only-input"
					label={item.label}
					value={item.value}
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
				<Button
					variant="outlined"
					size="small"
					onClick={() => {
						dataName === 'Bug'
							? handleBugDialogToggle(dialogData, 'edit')
							: handleUserDialogToggle(dialogData, 'edit')
						handleToggle()
					}}
				>
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
				<Button variant="outlined" size="small" onClose={handleToggle}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Details
