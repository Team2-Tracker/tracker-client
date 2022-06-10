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
import moment from 'moment'
import { handleNewBugSubmit, handleEditBugSubmit } from './Utils'

const BugForm = (props) => {
	const { bugDialogOpen, handleToggle, type, dialogData, desktop, setAllBugs } =
		props
	// Empty formData to reset to
	const emptyDialogData = {
		bugName: '',
		issues: '',
		priority: 1,
		timeEstimate: 0,
		dateDue: '',
		dateCreated: ''
	}
	// State to track form input - Ternary functions add default values for edit forms
	const [formData, setFormData] = useState(emptyDialogData)

	// Use effect to only set state when data is available
	React.useEffect(() => {
		if (type === 'edit' && bugDialogOpen) {
			setFormData({
				bugName: dialogData.bugName,
				issues: dialogData.issues,
				priority: dialogData.priority,
				timeEstimate: dialogData.timeEstimate,
				dateDue: dialogData.dateDue,
				dateCreated: dialogData.dateCreated
			})
		}
	}, [bugDialogOpen])

	// Handle functions set state to form values
	const handleNameChange = (event) => {
		const newData = { ...formData }
		newData.bugName = event.target.value
		setFormData(newData)
	}
	const handleIssuesChange = (event) => {
		const newData = { ...formData }
		newData.issues = event.target.value
		setFormData(newData)
	}
	const handlePriorityChange = (event) => {
		const newData = { ...formData }
		newData.priority = event.target.value
		setFormData(newData)
	}
	const handleEstimateChange = (event) => {
		const newData = { ...formData }
		newData.timeEstimate = event.target.value
		setFormData(newData)
	}
	const handleDateChange = (event) => {
		const newData = { ...formData }
		newData.dateDue = event
		setFormData(newData)
	}
	const handleDateCreatedChange = (event) => {
		const newData = { ...formData }
		newData.dateCreated = event
		setFormData(newData)
	}
	// Array to create form elements
	const formArray = [
		{ label: 'Name', value: formData.bugName, onChange: handleNameChange },
		{ label: 'Issues', value: formData.issues, onChange: handleIssuesChange },
		{
			label: 'Estimated Hours',
			value: formData.timeEstimate,
			onChange: handleEstimateChange
		}
	]

	// Mobile or desktop picker based on screen size
	let editDateCreated = ''
	if (type === 'edit') {
		editDateCreated = (
			<MobileDatePicker
				label="Date Created"
				inputFormat="MM/DD/yyyy"
				value={formData.dateCreated}
				onChange={handleDateCreatedChange}
				renderInput={(params) => <TextField {...params} />}
			/>
		)
	}
	if (type == 'edit' && desktop) {
		editDateCreated = (
			<DesktopDatePicker
				label="Date Created"
				inputFormat="MM/DD/yyyy"
				value={formData.dateCreated}
				onChange={handleDateCreatedChange}
				renderInput={(params) => <TextField {...params} />}
			/>
		)
	}

	return (
		<Dialog open={bugDialogOpen} onClose={handleToggle}>
			<DialogTitle>{type === 'edit' ? 'Edit Bug' : 'Add Bug'}</DialogTitle>
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
					<FormControl fullWidth>
						<InputLabel required id="priority-label">
							Priority
						</InputLabel>
						<Select
							labelId="priority"
							id="priority"
							value={formData.priority}
							label="Priority"
							onChange={handlePriorityChange}
						>
							<MenuItem value={1}>High</MenuItem>
							<MenuItem value={2}>Medium</MenuItem>
							<MenuItem value={3}>Low</MenuItem>
						</Select>
					</FormControl>
					{desktop ? (
						<DesktopDatePicker
							label="Date Due"
							inputFormat="MM/DD/yyyy"
							value={formData.dateCreated}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					) : (
						<MobileDatePicker
							label="Date Due"
							inputFormat="MM/DD/yyyy"
							value={formData.dateCreated}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					)}
					{editDateCreated}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleToggle}>
					Cancel
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						type === 'edit'
							? handleEditBugSubmit(
									formData,
									setFormData,
									handleToggle,
									dialogData,
									setAllBugs,
									emptyDialogData
							  )
							: handleNewBugSubmit(
									formData,
									setFormData,
									handleToggle,
									setAllBugs,
									emptyDialogData
							  )
					}}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BugForm
