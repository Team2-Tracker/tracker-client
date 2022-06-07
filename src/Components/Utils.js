// Filter rows by filter
const handleFilterRowsBy = (filter, allRows, setRows) => {
	if (filter === 'all') {
		setRows(allRows)
	}
	if (filter === 'active') {
		const activeRows = allRows.filter((row) => row.isActive)
		setRows(activeRows)
	}
	if (filter === 'closed') {
		const activeRows = allRows.filter((row) => !row.isActive)
		setRows(activeRows)
	}
	if (filter === 'assigned') {
		const activeRows = allRows.filter((row) => row.assigned !== 'none')
		setRows(activeRows)
	}
	if (filter === 'unassigned') {
		const activeRows = allRows.filter((row) => row.assigned === 'none')
		setRows(activeRows)
	}
}

// This function sorts the table
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

// This function sets how the sort function above sorts (ascending or descending)
function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

export { handleFilterRowsBy, getComparator, stableSort }
