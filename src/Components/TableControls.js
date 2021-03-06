import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { handleBugToggle } from './Utils'

const TableControls = (props) => {
	const {
		open,
		dataName,
		handleBugDialogToggle,
		handleUserDialogToggle,
		handleDetailsDialogToggle,
		handleMenuOpen,
		row,
		setAllBugs,
		setDialogData,
		setDialogType
	} = props

	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Box sx={{ margin: 1, justifyContent: 'center' }}>
				<Button
					key="details"
					variant="contained"
					sx={{ mx: 1 }}
					onClick={() => {
						handleDetailsDialogToggle()
						setDialogData(row)
					}}
				>
					Details
				</Button>
				<Button
					key="edit"
					variant="contained"
					sx={{ mx: 1 }}
					onClick={() => {
						dataName === 'Bug'
							? handleBugDialogToggle()
							: handleUserDialogToggle()
						setDialogData(row)
						setDialogType('edit')
					}}
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
						onClick={() => handleBugToggle(row, setAllBugs)}
					>
						{row.isActive ? 'Close Bug' : 'Open Bug'}
					</Button>
				) : (
					''
				)}
			</Box>
		</Collapse>
	)
}

export default TableControls
