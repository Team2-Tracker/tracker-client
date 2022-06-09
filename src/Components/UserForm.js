import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { handleUserSubmit } from './Utils'

const BugForm = (props) => {
	const { open, handleToggle, name, type, dialogData, userDialogOpen } = props

	// State to track form input
	const [formData, setFormData] = useState({
		userName: '',
		firstName: '',
		lastName: ''
	})

	// Use Effect populates state when an edit opesn
	React.useEffect(() => {
		if (type === 'edit' && userDialogOpen) {
			setFormData({
				userName: dialogData.userName,
				firstName: dialogData.firstName,
				lastName: dialogData.lastName
			})
		}
	}, [dialogData])

	// Handle functions set state to form values
	const handleUserNameChange = (event) => {
		const newData = { ...formData }
		newData.userName = event.target.value
		setFormData(newData)
	}
	const handleFirstNameChange = (event) => {
		const newData = { ...formData }
		newData.firstName = event.target.value
		setFormData(newData)
	}
	const handleLastNameChange = (event) => {
		const newData = { ...formData }
		newData.lastName = event.target.value
		setFormData(newData)
	}

	// Array to create form elements
	const formArray = [
		{
			label: 'UserName',
			value: formData.userName,
			onChange: handleUserNameChange
		},
		{
			label: 'First Name',
			value: formData.firstName,
			onChange: handleFirstNameChange
		},
		{
			label: 'Last Name',
			value: formData.lastName,
			onChange: handleLastNameChange
		}
	]

	return (
		<Dialog open={open} onClose={handleToggle}>
			<DialogTitle>{name} Details</DialogTitle>
			<DialogContent>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1, width: '100%' }
					}}
					noValidate
					autoComplete="off"
				>
					{formArray.map((field) => {
						return (
							<TextField
								key={field.label}
								required
								id={field.label}
								label={field.label}
								value={field.value}
								variant="outlined"
								onChange={field.onChange}
							/>
						)
					})}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleToggle}>
					Cancel
				</Button>
				<Button
					variant="contained"
					onClick={(event) =>
						handleUserSubmit(event, type, formData, setFormData, handleToggle)
					}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BugForm
