import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Context from "../Context";
import { Typography } from "@mui/material";

function ManageParking() {
  const [parkedVehicle, setParkedVehicle] = useState<any>([]);
  const [isParkingLotEmpty, setIsParkingLotEmpty] = useState<boolean>(false);
  const navigation = useNavigate();
  const contexts: any = useContext(Context);

  const getBookedVehicleDetails = () => {
    setParkedVehicle(
      contexts.parkingLotDia.filter((data: any) => data.isBooked === true)
    );
  };

  const navigateToParkingLot = () => {
    navigation("/parkingLot");
  };

  const navigateToVehicleDetails = () => {
    if (contexts.parkingLotDia?.length === parkedVehicle?.length) {
      setIsParkingLotEmpty(true);
    } else navigation("/vehicleDetails");
  };

  const clearContext: any = () => {
    contexts.setVehicleNo("");
  };

  useEffect(() => {
    getBookedVehicleDetails();
  }, []);

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
          height: "75%",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          background: "white",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "10px",
          opacity: isParkingLotEmpty ? 0.2 : 1,
        }}
      >
        <Button
          name="Home"
          variant="contained"
          color="primary"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            textTransform: "none",
          }}
          onClick={() => {
            navigation("/");
          }}
        >
          Home
        </Button>
        <Typography
          style={{ position: "absolute", right: "15px", top: "20px" }}
        >
          Available parking space :{" "}
          {contexts.parkingLotDia.length - parkedVehicle.length}/
          {contexts.parkingLotDia.length}
        </Typography>
        <Button
          name="Manage Parking"
          variant="contained"
          color="primary"
          style={{ textTransform: "none", width: "190px" }}
          onClick={() => {
            navigateToParkingLot();
          }}
        >
          Manage Parking
        </Button>
        <Button
          name="Vehicle Registration"
          variant="contained"
          color="primary"
          style={{ textTransform: "none", width: "190px" }}
          onClick={async () => {
            await clearContext();
            navigateToVehicleDetails();
          }}
        >
          Vehicle Registration
        </Button>
      </div>
      {isParkingLotEmpty && (
        <div
          style={{
            zIndex: 1,
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
              height: "50px",
              width: "230px",
              display: "flex",
              gap: "10px",
              borderRadius: "5px",
              alignItems: "center",
              justifyContent: "center",
              background: "#C3D7F9",
            }}
          >
            <Typography
              style={{
                paddingLeft: "13px",
              }}
            >
              Parking Lot is full
            </Typography>
            <Button
              name="X"
              variant="text"
              color="primary"
              size="small"
              onClick={() => {
                setIsParkingLotEmpty(false);
              }}
              style={{
                color: "black",
              }}
            >
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageParking;
