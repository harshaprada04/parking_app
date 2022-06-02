import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/lab";
import Context from "../Context";
import { useContext } from "react";

function VehicleDetails() {
  const navigation = useNavigate();
  const contexts = useContext(Context);

  function navigateToPreviousPage() {
    navigation("/manageParking");
  }

  async function navigateToParkingLot() {
    let index = await contexts.parkingLotDia.findIndex(
      (data: any) => data.isSelected === false && data.isBooked === false
    );
    contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any, ind) => {
        if (index === ind) {
          return {
            ...data,
            isSelected: true,
          };
        } else return data;
      })
    );
    navigation("/parkingLot");
  }

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "80%",
          width: "55%",
          display: "flex",
          flexDirection: "column",
          background: "white",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "10px",
        }}
      >
        <Button
          name="Back"
          style={{
            position: "relative",
            textTransform: "none",
            top: "-6px",
            left: "-43%",
          }}
          variant="contained"
          color="primary"
          onClick={navigateToPreviousPage}
        >
          Back
        </Button>
        <TextField
          style={{ width: "290px" }}
          id="outlined-basic"
          variant="outlined"
          label="Vehicle Number"
          value={contexts.vehicleNo}
          autoComplete="off"
          onChange={(e) => {
            contexts.setVehicleNo(e.target.value);
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={contexts.date}
            onChange={(newValue: any) => {
              contexts.setDate(newValue);
            }}
            renderInput={(params: any) => (
              <TextField
                // inputProps={{"data-testid":"dates"}}
                data-testid="dates"
                {...params}
              />
            )}
          />
          <TimePicker
            label="Time"
            value={contexts.date}
            onChange={(newTime: any) => contexts.setDate(newTime)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          name="submit"
          variant="contained"
          color="primary"
          style={{ textTransform: "none" }}
          onClick={() => {
            navigateToParkingLot();
          }}
          disabled={!contexts.vehicleNo}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default VehicleDetails;
