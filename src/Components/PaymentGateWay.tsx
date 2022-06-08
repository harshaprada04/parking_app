import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../Context";

function PaymentGateWay() {
  const navigation = useNavigate();
  const location: any = useLocation();
  const { id } = location?.state;
  const contexts = useContext(Context);

  function BookHandler(id: any) {
    contexts.setParkingLotDia(
      contexts.parkingLotDia?.map((data: any, index: number) => {
        if (id === data.id) {
          return {
            ...data,
            isBooked: false,
            checkIn: "",
            checkOut: "",
            vehicleNo: "",
            parkingSpaceNo: "",
          };
        } else {
          return data;
        }
      })
    );
  }

  const navigateParkingLot: any = () => {
    navigation("/parkingLot");
  };

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "52%",
          width: "38%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          borderRadius: "10px",
        }}
      >
        <Typography>Payment has been done.</Typography>
        <Button
          data-testid="home_btn"
          style={{ textTransform: "none" }}
          variant="contained"
          color="primary"
          onClick={async () => {
            await BookHandler(id);
            navigateParkingLot();
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
}

export default PaymentGateWay;
