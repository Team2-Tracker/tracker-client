import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Button from '@mui/material/Button';

function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">Submit</Button>
    </Stack>
  );
}


export default function BugForm() {
  const [name, setName] = useState("");
  const [issues, setIssues] = useState("");
  const [priority, setPriority] = useState("");
  const [estimate, setEstimate] = useState("");
  const [dateDue, setDateDue] = useState(new Date('2014-08-18T21:11:54'));
  const [assigned, setAssigned] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIssuesChange = (event) => {
    setIssues(event.target.value);
  };
  
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleEstimateChange = (event) => {
    setEstimate(event.target.value);
  };

  const handleDateChange = (event) => {
    console.log(event);
    setDateDue(event);
    console.log(dateDue)
  };

  const handleAssignedChange = (event) => {
      setAssigned(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="outlined-basic" label="Name" variant="outlined" onChange={handleNameChange} />
      <TextField
        required
        id="outlined-basic"
        label="Issues"
        variant="outlined"
        onChange={handleIssuesChange}
      />
      <FormControl fullWidth>
        <InputLabel required id="demo-simple-select-label">
          Priority
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Priority"
          onChange={handlePriorityChange}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        id="outlined-basic"
        label="Estimate"
        variant="outlined"
        onChange={handleEstimateChange}
      />
      {/* <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      <MobileDatePicker
        label="Date Due"
        inputFormat="MM/dd/yyyy"
        value={dateDue}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField
        required
        id="outlined-basic"
        label="Assigned"
        variant="outlined"
        onChange={handleAssignedChange}
      />
      <BasicButtons></BasicButtons>
    </Box>
  );
}

//  export default function BugForm() {
//     const [bugform, setBugForm] = useState([]);
//     if (bugform.length == 0)
//     {
//         console.log(apiUrl)
//         fetch(`${apiUrl}/bugs`)
//         .then(response => response.json())
//         .then(rep => console.log(rep));
//         bugform[0] = 1;
//     }
