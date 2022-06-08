import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'

const EnhancedTableToolbar = (props) => {
	const { title, handleMenuOpen, handleAddDialogToggle } = props

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 }
			}}
		>
			<Tooltip title="Add bug" onClick={handleAddDialogToggle}>
				<IconButton>
					<AddIcon />
				</IconButton>
			</Tooltip>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				{title}
			</Typography>
			<Tooltip title="Filter list" onClick={handleMenuOpen}>
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	)
}

export default EnhancedTableToolbar
