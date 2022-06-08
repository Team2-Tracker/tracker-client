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

export default function BugForm() {
  const [priority, setPriority] = useState("");
  const [dateDue, setDateDue] = useState("");
  const [dateCreate, setDateCreate] = useState("");

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateDue(event.target.value);
    console.log(event.target.value);
  };
  const handleCreateChange = (event) => {
    setDateCreate(event.target.value);
    console.log(event.target.value);
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
      <TextField required id="outlined-basic" label="Name" variant="outlined" />
      <TextField
        required
        id="outlined-basic"
        label="Issues"
        variant="outlined"
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
      <MobileDatePicker
        label="Date Created"
        inputFormat="MM/dd/yyyy"
        value={dateCreate}
        onChange={handleCreateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField
        required
        id="outlined-basic"
        label="Assigned"
        variant="outlined"
      />
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
