import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import StyledFab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function Details(props) {
	const { open, handleDetailsDialogToggle, dataName, selected } = props
	return (
		<Dialog open={open} onClose={handleDetailsDialogToggle}>
			<DialogTitle>{dataName} Details</DialogTitle>
			<DialogContent>
				<Grid container>
					<Grid item xs={12} sm={9.7} md={4.7}>
						<Box
							component="form"
							display="flex"
							sx={{
								'& .MuiTextField-root': { m: 1, maxWidth: '25ch' }
							}}
							noValidate
							autoComplete="off"
						>
							<div>
								<TextField
									id="outlined-read-only-input"
									label="Name"
									defaultValue={selected.bugName}
									InputProps={{
										readOnly: true
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Issue"
									defaultValue="Having issues running deployment."
									InputProps={{
										readOnly: true
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Priority"
									defaultValue="High"
									InputProps={{
										readOnly: true
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Time Estimate"
									defaultValue="1 Hour"
									InputProps={{
										readOnly: true
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Date Due"
									defaultValue="06/13/22"
									InputProps={{
										readOnly: true
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Assigned To"
									defaultValue="Alexandra"
									InputProps={{
										readOnly: true
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Comment"
									defaultValue="Will be checking package.json, index.js, apiUrl.js."
									InputProps={{
										readOnly: true
									}}
								/>
							</div>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" size="small">
					Edit
				</Button>
				<StyledFab color="secondary" aria-label="add">
					<AssignmentIndIcon type="submit" />
				</StyledFab>
				<Button type="submit" variant="outlined" size="small">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Details
