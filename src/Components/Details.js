import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import StyledFab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

function Details() {
  return (
    <Grid container>
    <Grid item xs={12} sm={9.7}  md={4.7}>
    <Box
    component="form"
    display="flex"
    sx={{
      '& .MuiTextField-root': { m: 1, maxWidth: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id="outlined-read-only-input"
        label="Issue"
        defaultValue="Having issues running deployment."
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="outlined-read-only-input"
        label="Priority"
        defaultValue="High"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="outlined-read-only-input"
        label="Time Estimate"
        defaultValue="1 Hour"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="outlined-read-only-input"
        label="Date Due"
        defaultValue="06/13/22"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="outlined-read-only-input"
        label="Assigned To"
        defaultValue="Alexandra"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="outlined-read-only-input"
        label="Comment"
        defaultValue="Will be checking package.json, index.js, apiUrl.js."
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
    <Toolbar>
    <CardActions>
              <Button variant="outlined" size="small">Edit</Button>
              <StyledFab color="secondary" aria-label="add">
            <AssignmentIndIcon type="submit" />
          </StyledFab>
              <Button type="submit" variant="outlined" size="small">Close</Button>
            </CardActions>
            </Toolbar>
  </Box>
  </Grid>
     </Grid>
  );
}

export default Details;
