import * as React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PetsIcon from '@mui/icons-material/Pets'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const TopNavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={handleClick}
					>
						<PetsIcon />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<MenuItem onClick={handleClose} component={RouterLink} to="/">
							Bugs
						</MenuItem>
						<MenuItem onClick={handleClose} component={RouterLink} to="/users">
							Users
						</MenuItem>
						<MenuItem onClick={handleClose} component={RouterLink} to="/about">
							About
						</MenuItem>
					</Menu>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Tracker
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default TopNavBar
