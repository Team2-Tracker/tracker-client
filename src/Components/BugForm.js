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
import { now } from 'moment'
import { handleBugSubmit } from './Utils'

const BugForm = (props) => {
	const { open, bugDialogOpen, handleToggle, name, type, dialogData, desktop } =
		props

	// State to track form input - Ternary functions add default values for edit forms
	const [formData, setFormData] = useState({
		bugName: '',
		issues: '',
		priority: 1,
		estimate: null,
		dateDue: new Date(now()),
		dateCreated: null,
		assigned: ''
	})

	// Use effect to only set state when data is available
	React.useEffect(() => {
		if (type === 'edit' && bugDialogOpen) {
			setFormData({
				bugName: dialogData.bugName,
				issues: dialogData.issues,
				priority: dialogData.priority,
				estimate: dialogData.dateDue,
				dateDue: dialogData.priority,
				dateCreated: dialogData.dateCreated,
				assigned: dialogData.assigned
			})
		}
	}, [dialogData])

	// Handle functions set state to form values
	const handleNameChange = (event) => {
		const newData = { ...formData }
		newData.formName = event.target.value
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
		newData.estimate = event.target.value
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
	const handleAssignedChange = (event) => {
		const newData = { ...formData }
		newData.assigned = event.target.value
		setFormData(newData)
	}

	// Choose mobile or desktop picker based on screen size
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
					<TextField
						required
						id="name"
						label="Name"
						value={formData.bugName}
						variant="outlined"
						onChange={handleNameChange}
					/>
					<TextField
						required
						id="issues"
						value={formData.issues}
						label="Issues"
						variant="outlined"
						onChange={handleIssuesChange}
					/>
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
					<TextField
						required
						id="estimated-hours"
						value={formData.estimate}
						label="Estimated Hours"
						variant="outlined"
						onChange={handleEstimateChange}
					/>
					{desktop ? (
						<DesktopDatePicker
							label="Date Due"
							inputFormat="MM/DD/yyyy"
							value={formData.dateDue}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					) : (
						<MobileDatePicker
							label="Date Due"
							inputFormat="MM/DD/yyyy"
							value={formData.dateDue}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					)}
					{editDateCreated}
					<TextField
						id="assigned"
						value={formData.assigned}
						label="Assigned"
						variant="outlined"
						onChange={handleAssignedChange}
						disabled
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={() => handleToggle({}, '')}>
					Cancel
				</Button>
				<Button
					variant="contained"
					onClick={(event) =>
						handleBugSubmit(event, type, formData, setFormData, handleToggle)
					}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BugForm
