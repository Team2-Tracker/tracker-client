import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TableControls = (props) => {
	const {
		open,
		dataName,
		handleEditDialogToggle,
		handleDetailsDialogToggle,
		handleMenuOpen
	} = props

	const handleBugClose = () => {
		// Send PATCH request to DB to change active status to FALSE
		// GET request to update all bugs
	}

	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Box sx={{ margin: 1, justifyContent: 'center' }}>
				<Button
					key="details"
					variant="contained"
					sx={{ mx: 1 }}
					onClick={handleDetailsDialogToggle}
				>
					Details
				</Button>
				<Button
					key="edit"
					variant="contained"
					sx={{ mx: 1 }}
					onClick={handleEditDialogToggle}
				>
					Edit
				</Button>
				<Button
					key="assignment"
					variant="contained"
					sx={{ mx: 1 }}
					onClick={(event) =>
						handleMenuOpen(
							event,
							dataName === 'Bug' ? 'allUsers' : 'unassignedBugs'
						)
					}
				>
					{dataName === 'Bug' ? 'Assign' : 'Assign Bug'}
				</Button>
				{dataName === 'Bug' ? (
					<Button
						key="close"
						variant="contained"
						sx={{ mx: 1 }}
						onClick={handleBugClose}
					>
						Close Bug
					</Button>
				) : (
					''
				)}
			</Box>
		</Collapse>
	)
}

export default TableControls
