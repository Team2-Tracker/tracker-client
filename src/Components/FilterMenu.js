import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { handleFilterRowsBy, handleAssignUser } from './Utils'
import { menuList } from './TableConfig'

const FilterMenu = (props) => {
	const {
		anchorEl,
		menuOpen,
		handleMenuClose,
		allBugs,
		allUsers,
		setRows,
		setTitle,
		setAllBugs,
		setAllUsers,
		dataName,
		menuType,
		selected
	} = props

	let allData = []
	let menuArray = []
	if (dataName === 'Bug' && menuType === 'filter') {
		menuArray = menuList.bugMenu
		allData = allBugs
	}
	if (dataName === 'User' && menuType === 'filter') {
		menuArray = menuList.userMenu
		allData = allUsers
	}
	if (menuType === 'allUsers') {
		menuArray = allUsers.map((user) => {
			return {
				id: user._id,
				name: user.userName,
				userId: user._id,
				bugId: selected._id
			}
		})
	}
	if (menuType === 'unassignedBugs') {
		const unassignedBugs = allBugs.filter((bug) => !bug.assigned)
		menuArray = unassignedBugs.map((bug) => {
			return {
				id: bug._id,
				name: bug.bugName,
				userId: selected._id,
				bugId: bug._id
			}
		})
	}
	const menuItemList = menuArray.map((menuItem) => {
		return (
			<MenuItem
				key={menuItem.id}
				onClick={() => {
					handleMenuClose()
					menuType === 'filter'
						? handleFilterRowsBy(menuItem.id, allData, setRows, setTitle)
						: handleAssignUser(
								menuItem.userId,
								menuItem.bugId,
								handleMenuClose,
								setAllBugs,
								setAllUsers
						  )
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
