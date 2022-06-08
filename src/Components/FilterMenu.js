import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { handleFilterRowsBy } from './Utils'

const FilterMenu = (props) => {
	const { anchorEl, menuOpen, handleMenuClose, allBugs, setRows, setTitle } =
		props
	return (
		<Menu
			id="filter-menu"
			anchorEl={anchorEl}
			open={menuOpen}
			onClose={handleMenuClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button'
			}}
		>
			<MenuItem
				onClick={() => {
					handleMenuClose()
					handleFilterRowsBy('all', allBugs, setRows, setTitle)
				}}
			>
				All Bugs
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleMenuClose()
					handleFilterRowsBy('active', allBugs, setRows, setTitle)
				}}
			>
				Active Bugs
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleMenuClose()
					handleFilterRowsBy('closed', allBugs, setRows, setTitle)
				}}
			>
				Closed Bugs
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleMenuClose()
					handleFilterRowsBy('assigned', allBugs, setRows, setTitle)
				}}
			>
				Assigned Bugs
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleMenuClose()
					handleFilterRowsBy('unassigned', allBugs, setRows, setTitle)
				}}
			>
				Unassigned Bugs
			</MenuItem>
		</Menu>
	)
}

export default FilterMenu
