import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TableControlls = (props) => {
	const { open, dataName, handleEditDialogToggle, handleDetailsDialogToggle } =
		props

	const handleBugClose = () => {
		// Send PATCH request to DB to change active status to FALSE
		// GET request to update all bugs
	}

	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Box sx={{ margin: 1, justifyContent: 'center' }}>
				<Button
					variant="contained"
					sx={{ mx: 1 }}
					onClick={handleDetailsDialogToggle}
				>
					Details
				</Button>
				<Button
					variant="contained"
					sx={{ mx: 1 }}
					onClick={handleEditDialogToggle}
				>
					Edit
				</Button>
				<Button variant="contained" sx={{ mx: 1 }}>
					{dataName === 'Bug' ? 'Assign Bugs' : 'Assign User'}
				</Button>
				{dataName === 'Bug' ? (
					<Button variant="contained" sx={{ mx: 1 }} onClick={handleBugClose}>
						Close Bug
					</Button>
				) : (
					''
				)}
			</Box>
		</Collapse>
	)
}

export default TableControlls
