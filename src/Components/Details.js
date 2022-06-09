import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import StyledFab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function Details(props) {
	const { open, handleToggle, dataName, selected, handleMenuOpen } = props

	let textFieldList = ''
	if (dataName === 'Bug' && Object.keys(selected).length > 0) {
		let bugList = [
			{ label: 'Name', defaultValue: selected.bugName },
			{ label: 'Issue', defaultValue: selected.issues },
			{ label: 'Priority', defaultValue: selected.priority },
			{ label: 'Time Estimate', defaultValue: selected.timeEstimate },
			{ label: 'Date Due', defaultValue: selected.dateDue },
			{ label: 'Date Created', defaultValue: selected.dateCreated }
			// { label: 'User', defaultValue: selected.user[0].userName }
		]
		textFieldList = bugList.map((bug) => {
			return (
				<TextField
					id="outlined-read-only-input"
					label={bug.label}
					defaultValue={bug.defaultValue}
					InputProps={{
						readOnly: true
					}}
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
