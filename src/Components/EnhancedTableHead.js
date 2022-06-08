import TableHead from '@mui/material/TableHead'
import { visuallyHidden } from '@mui/utils'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

// Creates the Table Heading with sort and list functionality
export default function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort, tableHeadCells } = props

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{/* This maps through the headCells array to create each header */}
				{tableHeadCells().map((headCell) => (
					// Creates the Header itself
					<TableCell
						key={headCell.id}
						align={headCell.align}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						{/* This is the sort label, where and what direction */}
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{/* This is the actual name of the heading */}
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}
