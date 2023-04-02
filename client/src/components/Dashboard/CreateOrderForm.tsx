import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { getVehicle, createOrder } from "../../api/functions";
import axiosInstance from "../../api/axiosClient";
import { useState, useEffect } from 'react';

const CreateOrderForm = () => {

  const [vehicles, setVehicles] = useState([]);
  useEffect(()=> {
    getVehicle()
    .then((data) => {
      const allVehicles: Array<any> = data.vehicles;
      setVehicles(allVehicles)
    })
  }, [])

  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [itemName, setitemName] = useState("");
  const [itemQuantity, setitemQuantity] = useState(0);
  const [vehicle, setvehicle] = useState("");
  const [distance, setdistance] = useState(0);

  const [fromError, setfromError] = useState(false);
  const [fromHelper, setfromHelper] = useState("");

  const [toError, settoError] = useState(false);
  const [toHelper, settoHelper] = useState("");

  const [itemNameError, setitemNameError] = useState(false);
  const [itemNameHelper, setitemNameHelper] = useState("");

  const [itemQuantityError, setitemQuantityError] = useState(false);
  const [itemQuantityHelper, setitemQuantityHelper] = useState("");

  const [vehicleError, setvehicleError] = useState(false);
  const [vehicleHelper, setvehicleHelper] = useState("");

  const [distanceError, setdistanceError] = useState(false);
  const [distanceHelper, setdistanceHelper] = useState("");

  const validateForm = () : boolean => {
    var bool :boolean = true;
    if(from.length < 3) {
      setfromError(true);
      setfromHelper("Atleast 3 characters")
      bool =  false;
    }

    if(to.length < 3) {
      settoError(true);
      settoHelper("Atleast 3 characters")
      bool =  false;
    }

    if(itemName.length < 3) {
      setitemNameError(true);
      setitemNameHelper("Atleast 3 characters")
      bool =  false;
    }
    console.log(itemQuantity);
    
    if(!(parseInt(itemQuantity) == itemQuantity) || itemQuantity <= 0) {
      setitemQuantityError(true);
      setitemQuantityHelper("Expected a positive number")
      bool =  false;
    }

    if(vehicle === "") {
      setvehicleError(true);
      setvehicleHelper("Choose a vehicle")
      bool =  false;
    }
    // console.log(parseInt(itemQuantity));
    // console.log(itemQuantity);
    
    if(!(parseInt(distance) == distance) || distance <= 0) {
      setdistanceError(true);
      setdistanceHelper("Expected a positive number")
      bool =  false;
    }

    return bool;
  }
  
  const handleSubmit = async () => {
    if(validateForm()){
      const res = await createOrder(from, to, itemName, itemQuantity, vehicle, distance);
      console.log(res);
      alert("Order created successfully!")
      setfrom("");
      setto("");
      setitemName("");
      setitemQuantity(0);
      setvehicle("");
      setdistance(0);

    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <TextField 
          id="outlined-error" 
          onChange={(e)=> { setfrom(e.target.value) }}
          error={fromError}
          helperText={fromHelper}
          onFocus={()=> { setfromError(false); setfromHelper("") }}

          value={from}

          label="From" 
          defaultValue="" 
          />
        <TextField
          id="outlined-error-helper-text"
          onChange={(e)=> { setto(e.target.value) }}

          value={to}
          error={toError}
          helperText={toHelper}
          onFocus={()=> { settoError(false); settoHelper("") }}
          label="To"
          defaultValue=""
        />
      </div>
      <div>
        <TextField
          id="outlined-select-currency"
          onChange={(e)=> { setitemName(e.target.value) }}
          error={itemNameError}

          value={itemName}
          helperText={itemNameHelper}
          onFocus={()=> { setitemNameError(false); setitemNameHelper("") }}
          label="Item Name"
          defaultValue=""
        />

        <TextField
          id="outlined-select-currency"
          onChange={(e)=> { setitemQuantity(parseInt(e.target.value)) }}
          error={itemQuantityError}
          value={itemQuantity}
          helperText={itemQuantityHelper}
          onFocus={()=> { setitemQuantityError(false); setitemQuantityHelper("") }}
          label="Item Quantity (in kg)"
          defaultValue=""
        />
      </div>

      <div>
        <TextField
          id="outlined-select-currency"
          onChange={(e)=> { setvehicle(e.target.value) }}
          error={vehicleError}
          helperText={vehicleHelper}
          onFocus={()=> { setvehicleError(false); setvehicleHelper("") }}
          select
          label="Select Vehical"
          defaultValue="EUR"
          fullWidth={true}
        >
          {vehicles.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {`${option.name} (${option.weightLimit} kg)`}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          onChange={(e)=> { setdistance(parseInt(e.target.value)) }}
          error={distanceError}
          value={distance}
          helperText={distanceHelper}
          onFocus={()=> { setdistanceError(false); setdistanceHelper("") }}
          label="Approximate Distance"
          defaultValue=""
        />
      </div>

      <div style={{ width: "100%" }}>
        <Button sx={{ m: 1 }} size="large" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default CreateOrderForm;
