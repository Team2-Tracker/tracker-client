import apiUrl from '../apiUrl'
import { now } from 'moment'

// *** CRUD Functions ****

// Functions to fetch all data from database
const fetchAllBugs = (setAllBugs) => {
	fetch(apiUrl + `/bugs/`)
		.then((res) => res.json())
		.then((data) => {
			setAllBugs(data.bugs)
		})
}
const fetchAllUsers = (setAllUsers) => {
	fetch(apiUrl + `/users/`)
		.then((res) => res.json())
		.then((data) => {
			setAllUsers(data.users)
		})
}
// This function updates bugs by ID to add the user by ID
const handleAssignUser = (
	userId,
	bugId,
	handleMenuClose,
	setAllBugs,
	setAllUsers
) => {
	if (userId && bugId) {
		fetch(`${apiUrl}/users/${userId}/bugs/${bugId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		}).then(() => {
			handleMenuClose()
			fetchAllBugs(setAllBugs)
			fetchAllUsers(setAllUsers)
		})
	} else {
		console.log('something went wrong', 'userId:', userId, 'bugId:', bugId)
	}
}
// Bug Add / Edit: Calls fetch request to create OR update based on form type
const handleBugSubmit = (event, type, formData, setFormData, handleToggle) => {
	event.preventDefault()
	fetch(`${apiUrl}/bugs/`, {
		method: type === 'edit' ? 'PATCH' : 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			bugName: formData.bugName,
			issues: formData.issues,
			priority: formData.priority,
			timeEstimate: formData.estimate,
			dateDue: formData.dateDue,
			dateCreated: type === 'edit' ? formData.dateCreated : new Date(now()),
			assigned: false
		})
	}).then(() => {
		setFormData({
			bugName: '',
			issues: '',
			priority: 1,
			estimate: null,
			dateDue: new Date(now()),
			dateCreated: null,
			assigned: ''
		})
		handleToggle()
	})
}
// User Add / Edit: Calls fetch request to create OR update based on form type
const handleUserSubmit = (event, type, formData, setFormData, handleToggle) => {
	event.preventDefault()
	fetch(`${apiUrl}/users/`, {
		method: type === 'edit' ? 'PATCH' : 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			bugName: formData.userName,
			firstName: formData.lastName,
			lastName: formData.lastName
		})
	}).then(() => {
		setFormData({
			userName: '',
			firstName: '',
			lastName: ''
		})
		handleToggle()
	})
}
// Close a bug by ID
const handleBugClose = () => {
	// Send PATCH request to DB to change active status to FALSE
	// GET request to update all bugs
}

// *** Table Functions ****

// Filter rows by filter
const handleFilterRowsBy = (filter, allRows, setRows, setTitle) => {
	if (filter === 'allBugs') {
		setRows(allRows)
		setTitle('All Bugs')
	}
	if (filter === 'activeBugs') {
		const activeRows = allRows.filter((row) => row.isActive)
		setRows(activeRows)
		setTitle('Active Bugs')
	}
	if (filter === 'closedBugs') {
		const activeRows = allRows.filter((row) => !row.isActive)
		setRows(activeRows)
		setTitle('Closed Bugs')
	}
	if (filter === 'assignedBugs') {
		const activeRows = allRows.filter((row) => row.assigned !== 'none')
		setRows(activeRows)
		setTitle('Assigned Bugs')
	}
	if (filter === 'unassignedBugs') {
		const activeRows = allRows.filter((row) => row.assigned === 'none')
		setRows(activeRows)
		setTitle('Unassigned Bugs')
	}
	if (filter === 'allUsers') {
		setRows(allRows)
		setTitle('All Users')
	}
	if (filter === 'assignedUsers') {
		const activeRows = allRows.filter((row) => row.assigned !== 'none')
		setRows(activeRows)
		setTitle('Users with Bugs')
	}
	if (filter === 'unassignedUsers') {
		const activeRows = allRows.filter((row) => row.assigned === 'none')
		setRows(activeRows)
		setTitle('Users with no Bugs')
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

// This function handles the sort order
const handleRequestSort = (
	event,
	property,
	order,
	orderBy,
	setOrder,
	setOrderBy
) => {
	const isAsc = orderBy === property && order === 'asc'
	setOrder(isAsc ? 'desc' : 'asc')
	setOrderBy(property)
}

// Changes which page of the table is being displayed
const handleChangePage = (event, newPage, setPage) => {
	setPage(newPage)
}

// Changes number of rows displayed per page
const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
	setRowsPerPage(parseInt(event.target.value, 10))
	setPage(0)
}

// Toggles the padding
const handleChangeDense = (event, setDense) => {
	setDense(event.target.checked)
}

export {
	fetchAllBugs,
	fetchAllUsers,
	handleAssignUser,
	handleBugSubmit,
	handleUserSubmit,
	handleBugClose,
	handleFilterRowsBy,
	getComparator,
	stableSort,
	handleRequestSort,
	handleChangePage,
	handleChangeRowsPerPage,
	handleChangeDense
}
