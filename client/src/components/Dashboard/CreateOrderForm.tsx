import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const vehicals = [
  {
    value: "V1",
    label: "V1",
  },
  {
    value: "V2",
    label: "V2",
  },
];

const items = [
  {
    value: "I1",
    label: "I1",
  },
  {
    value: "I2",
    label: "I2",
  },
];

const CreateOrderForm = () => {
    return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              
              id="outlined-error"
              label="From"
              defaultValue=""
            />
            <TextField
              
              id="outlined-error-helper-text"
              label="To"
              defaultValue=""
              helperText=""
            />
          </div>
          <div>
          
          <TextField
            id="outlined-select-currency"
            label="Item Name"
            defaultValue=""
            helperText=""
            / >

            <TextField
            id="outlined-select-currency"
            label="Item Quantity (in kg)"
            defaultValue=""
            helperText=""
            / >
            
          </div>

          <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Vehical"
            defaultValue="EUR"
            helperText=""
            fullWidth={true}
            >
            {vehicals.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
          </div>

      <div>
        <Button sx={{ m: 1 }} size="large" variant="contained">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default CreateOrderForm;
