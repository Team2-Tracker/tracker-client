import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import StyledFab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { handleBugToggle, handleBugDelete } from './Utils'

function Details(props) {
	const {
		open,
		handleToggle,
		dataName,
		dialogData,
		handleMenuOpen,
		handleBugDialogToggle,
		handleUserDialogToggle,
		setAllBugs
	} = props

	let textFieldList = ''
	let displayList = ''
	let bugList = ''
	if (dialogData.bugs) {
		bugList =
			dialogData.bugs.length > 0
				? dialogData.bugs.reduce(
						(previous, current) => previous.bugName + ' ' + current.bugName
				  )
				: 'None'
	}
	let bugHours = 0
	if (dialogData.bugs) {
		dialogData.bugs.forEach((bug) => {
			bugHours = bugHours + bug.timeEstimate
		})
	}
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
				value: bugList
			},
			{
				label: 'Number of Bugs Assigned',
				value: dialogData.bugs ? dialogData.bugs.length : 0
			},
			{
				label: 'Total Estimated Hours Assigned',
				value: bugHours
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
				{dataName === 'Bug' ? (
					<Button
						variant="outlined"
						size="small"
						onClick={() => {
							handleBugToggle(dialogData, setAllBugs)
							handleToggle()
						}}
					>
						{dialogData.isActive ? 'Close Bug' : 'Open Bug'}
					</Button>
				) : (
					''
				)}
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
				{dataName === 'Bug' ? (
					<Button
						variant="outlined"
						size="small"
						onClick={() => {
							handleBugDelete(dialogData, setAllBugs)
							handleToggle()
						}}
					>
						Delete
					</Button>
				) : (
					''
				)}
				<Button variant="outlined" size="small" onClick={handleToggle}>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Details
