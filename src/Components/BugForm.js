import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import Button from '@mui/material/Button'
import apiUrl from './../apiUrl'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { now } from 'moment'

export default function BugForm(props) {
	const { open, handleToggle, name, type, selected } = props
	const [nameForm, setNameForm] = useState(
		type === 'edit' ? selected.bugName : ''
	)
	const [issues, setIssues] = useState('')
	const [priority, setPriority] = useState('')
	const [estimate, setEstimate] = useState('')
	const [dateDue, setDateDue] = useState(new Date(now()))
	const [dateCreated, setDateCreated] = useState('')
	const [assigned, setAssigned] = useState('')
	const desktop = false

	const handleNameChange = (event) => {
		setNameForm(event.target.value)
	}

	const handleIssuesChange = (event) => {
		setIssues(event.target.value)
	}

	const handlePriorityChange = (event) => {
		setPriority(event.target.value)
	}

	const handleEstimateChange = (event) => {
		setEstimate(event.target.value)
	}

	const handleDateChange = (event) => {
		setDateDue(event)
	}

	const handleDateCreatedChange = (event) => {
		setDateCreated(event)
	}

	const handleAssignedChange = (event) => {
		setAssigned(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		fetch(`${apiUrl}/bugs/`, {
			method: type === 'edit' ? 'PATCH' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bugName: nameForm,
				issues: issues,
				priority: priority,
				timeEstimate: estimate,
				dateDue: dateDue,
				dateCreated: type === 'edit' ? dateCreated : new Date(now()),
				assigned: assigned
			})
		}).then(() => {
			setNameForm('')
			setIssues('')
			setPriority('')
			setEstimate('')
			setDateDue(null)
			setAssigned('')
			handleToggle()

			//   fetchBugs();
		})
	}

	let editDateCreated = ''
	if (type === 'edit') {
		editDateCreated = (
			<MobileDatePicker
				label="Date Created"
				inputFormat="MM/DD/yyyy"
				value={dateCreated}
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
				value={dateCreated}
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
						'& > :not(style)': { m: 1, width: '25ch' }
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						required
						id="outlined-basic"
						label="Name"
						value={nameForm}
						variant="outlined"
						onChange={handleNameChange}
					/>
					<TextField
						required
						id="outlined-basic"
						value={issues}
						label="Issues"
						variant="outlined"
						onChange={handleIssuesChange}
					/>
					<FormControl fullWidth>
						<InputLabel required id="demo-simple-select-label">
							Priority
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={priority}
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
						id="outlined-basic"
						value={estimate}
						label="Estimated Hours"
						variant="outlined"
						onChange={handleEstimateChange}
					/>
					{desktop ? (
						<DesktopDatePicker
							label="Date Due"
							inputFormat="MM/DD/yyyy"
							value={dateDue}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					) : (
						<MobileDatePicker
							label="Date Due"
							inputFormat="MM/DD/yyyy"
							value={dateDue}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					)}
					{editDateCreated}
					<TextField
						id="outlined-basic"
						value={assigned}
						label="Assigned"
						variant="outlined"
						onChange={handleAssignedChange}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleSubmit}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

//  export default function BugForm() {
//     const [bugform, setBugForm] = useState([]);
//     if (bugform.length == 0)
//     {
//         console.log(apiUrl)
//         fetch(`${apiUrl}/bugs`)
//         .then(response => response.json())
//         .then(rep => console.log(rep));
//         bugform[0] = 1;
//     }
