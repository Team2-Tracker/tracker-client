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
	const { open, handleDetailsDialogToggle, dataName, selected } = props
    
    
    
    let textFieldList = ''
        if (dataName === 'Bug' && Object.keys(selected).length > 0) {
            let bugList = [{label: 'Name', defaultValue: selected.bugName},
    {label: 'Issue', defaultValue: selected.issues},
    {label: 'Priority', defaultValue: selected.priority},
    {label: 'Time Estimate', defaultValue: selected.timeEstimate},
    {label: 'Date Due', defaultValue: selected.dateDue},
    {label: 'Date Created', defaultValue: selected.dateCreated},
    {label: 'User', defaultValue: selected.user[0].userName},]
            textFieldList = bugList.map((bug)=> {
                return ( <TextField
                    id="outlined-read-only-input"
                    label={bug.label}
                    defaultValue={bug.defaultValue}
                    InputProps={{
                        readOnly: true
                    }}
                />)
            })
        }

       
    

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
						{textFieldList}	
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
				<Button variant="outlined" size="small">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Details
