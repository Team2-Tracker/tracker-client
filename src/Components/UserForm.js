import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { handleUserSubmit } from './Utils'

const BugForm = (props) => {
	const { open, handleToggle, name, type, selected, desktop } = props

	// State to track form input - Ternary functions add default values for edit forms
	const [formData, setFormData] = useState({
		userName: type === 'edit' ? selected.userName : '',
		firstName: type === 'edit' ? selected.firstName : '',
		lastName: type === 'edit' ? selected.lastName : ''
	})

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
	const formArray = [
		{
			id: 'userName',
			label: 'UserName',
			value: formData.userName,
			onChange: handleUserNameChange
		},
		{
			id: 'firstName',
			label: 'First Name',
			value: formData.fistName,
			onChange: handleFirstNameChange
		},
		{
			id: 'lastName',
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
								required
								id={field.id}
								label={field.label}
								value={field.userName}
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
						handleUserSubmit(
							event,
							type,
							selected,
							formData,
							setFormData,
							handleToggle
						)
					}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BugForm
