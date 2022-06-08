import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { handleFilterRowsBy } from './Utils'

const FilterMenu = (props) => {
	const {
		anchorEl,
		menuOpen,
		handleMenuClose,
		allData,
		setRows,
		setTitle,
		menuArray
	} = props
	const menuItemList = menuArray.map((menuItem) => {
		return (
			<MenuItem
				key={menuItem.id}
				onClick={() => {
					handleMenuClose()
					handleFilterRowsBy(menuItem.id, allData, setRows, setTitle)
				}}
			>
				{menuItem.name}
			</MenuItem>
		)
	})
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
			{menuItemList}
		</Menu>
	)
}

export default FilterMenu
