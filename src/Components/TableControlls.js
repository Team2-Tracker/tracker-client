import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TableControlls = (props) => {
	const { open, dataName } = props
	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Box sx={{ margin: 1, justifyContent: 'center' }}>
				<Button variant="contained" sx={{ mx: 1 }}>
					Details
				</Button>
				<Button variant="contained" sx={{ mx: 1 }}>
					Edit
				</Button>
				<Button variant="contained" sx={{ mx: 1 }}>
					{dataName === 'bugs' ? 'Assign Bugs' : 'Assign User'}
				</Button>
				{dataName === 'bugs' ? (
					<Button variant="contained" sx={{ mx: 1 }}>
						Close
					</Button>
				) : (
					''
				)}
			</Box>
		</Collapse>
	)
}

export default TableControlls
