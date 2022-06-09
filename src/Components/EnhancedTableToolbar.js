import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'

const EnhancedTableToolbar = (props) => {
	const {
		title,
		dataName,
		handleMenuOpen,
		handleBugDialogToggle,
		handleUserDialogToggle
	} = props

	return (
		// This toolbar contains the table header OR the selected bugs feature
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 }
			}}
		>
			<Tooltip title="Add bug">
				<IconButton
					onClick={
						dataName === 'Bug' ? handleBugDialogToggle : handleUserDialogToggle
					}
				>
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
			<Tooltip
				title="Filter list"
				onClick={(event) => handleMenuOpen(event, 'filter')}
			>
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	)
}

export default EnhancedTableToolbar
