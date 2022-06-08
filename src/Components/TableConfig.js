import { PropaneTankSharp } from '@mui/icons-material'

// List of Column Names for Bugs, starting with 3 to display at mobile:
const bugTableHeadCells = (tablet, desktop) => {
	let headCells = [
		{
			id: 'name',
			align: 'left',
			disablePadding: true,
			label: 'Bug Name'
		},
		{
			id: 'dateDue',
			align: 'center',
			disablePadding: true,
			label: 'Date Due'
		},
		{
			id: 'assigned',
			align: 'right',
			disablePadding: false,
			label: 'Assigned To'
		}
	]
	// Add "Issues" column at 600px
	if (tablet) {
		headCells.splice(1, 0, {
			id: 'issues',
			align: 'center',
			disablePadding: true,
			label: 'Issues'
		})
	}
	// Add "Date created" column at 900px
	if (desktop) {
		headCells.splice(3, 0, {
			id: 'dateCreated',
			align: 'center',
			disablePadding: true,
			label: 'Date Created'
		})
	}
	return headCells
}

// List of Column Names for Users, starting with 3 to display at mobile:
const userTableHeadCells = (tablet, desktop) => {
	let headCells = [
		{
			id: 'userName',
			align: 'left',
			disablePadding: true,
			label: 'User Name'
		},
		{
			id: 'firstName',
			align: 'left',
			disablePadding: true,
			label: 'First Name'
		},
		{
			id: 'lastName',
			align: 'left',
			disablePadding: false,
			label: 'Last Name'
		}
	]
	// Add "Number of Bugs" column at 600px
	if (tablet) {
		headCells.push({
			id: 'bugNumber',
			align: 'center',
			disablePadding: true,
			label: 'Number of Bugs'
		})
	}
	// Add "Total Estimated Hours" column at 900px
	if (desktop) {
		headCells.push({
			id: 'bugHours',
			align: 'center',
			disablePadding: true,
			label: 'Total Estimated Hours'
		})
	}
	return headCells
}

const bugMenu = [
	{ id: 'allBugs', name: 'All Bugs' },
	{ id: 'activeBugs', name: 'Active Bugs' },
	{ id: 'closedBugs', name: 'Closed Bugs' },
	{ id: 'assignedBugs', name: 'Assigned Bugs' },
	{ id: 'unassignedBugs', name: 'Unassigned Bugs' }
]

const usersMenu = [
	{ id: 'allUsers', name: 'All Users' },
	{ id: 'assignedUsers', name: 'Users with Bugs' },
	{ id: 'unassignedUsers', name: 'Users with no Bugs' }
]

export { bugTableHeadCells, userTableHeadCells, bugMenu, usersMenu }
