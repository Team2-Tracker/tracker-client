import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<HashRouter>
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<App />
		</LocalizationProvider>
		</HashRouter>
	</React.StrictMode>
)
