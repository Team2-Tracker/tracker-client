import { PropaneTankSharp } from '@mui/icons-material'

// For mobile, only display 3 columns:
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

export { bugTableHeadCells }
