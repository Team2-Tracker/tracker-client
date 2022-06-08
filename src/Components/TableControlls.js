import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TableControlls = (props) => {
	const { open, dataName } = props
	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Box sx={{ margin: 1 }}>
				<Button variant="contained">Details</Button>
				<Button variant="contained">Edit</Button>
				<Button variant="contained">
					{dataName === 'bugs' ? 'Assign Bugs' : 'Assign User'}
				</Button>
				{dataName === 'bugs' ? <Button variant="contained">Close</Button> : ''}
			</Box>
		</Collapse>
	)
}

export default TableControlls
