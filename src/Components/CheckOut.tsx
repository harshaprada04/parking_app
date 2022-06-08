import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Context from "../Context";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { postVehicleDetails } from "../action/postAPI";

function CheckOut() {
  const navigation = useNavigate();
  const [currentVehicle, setCurrentVehicle] = useState<any>([]);
  const [amount, setAmount] = useState<number>();
  const location: any = useLocation();
  const { id } = location?.state;
  const contexts = useContext(Context);

  async function paymentCalculator(id: any) {
    const date1: any = contexts.parkingLotDia[id - 1]["checkOut"];
    const date2: any = contexts.parkingLotDia[id - 1]["checkIn"];
    await setCurrentVehicle(contexts.parkingLotDia[id - 1]);
    const timeDifference: any = parseFloat(
      ((date1.getTime() - date2.getTime()) / (1000 * 60 * 60)).toFixed(4)
    );
    const roundOffTimeDifference: any = Math.ceil(timeDifference);
    if (roundOffTimeDifference <= 2) {
      setAmount(10.0);
    } else {
      setAmount(parseInt((10 + (roundOffTimeDifference - 2) * 10).toFixed(0)));
    }
  }

  function navigateToPaymentGateWay() {
    navigation(`/paymentGateway`, {
      state: {
        id: id,
      },
    });
  }
  useEffect(() => {
    paymentCalculator(id);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Object.keys(currentVehicle).length > 0 && (
        <div
        data-testid = "deregister-car-registration"
          style={{
            height: "85%",
            width: "70%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "60px",
            borderRadius: "10px",
          }}
        >
          <Button
             data-testid = 'deregister-back-button'
            variant="contained"
            color="primary"
            onClick={() => navigation("/parkingLOt")}
            style={{
              textTransform: "none",
              position: "relative",
              left: "-44%",
              top: "1%",
            }}
          >
            Back
          </Button>
          <Table
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "-4%",
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell>Vehicle Number</TableCell>
                <TableCell>:</TableCell>
                <TableCell data-testid="vehicle_no">
                  {currentVehicle.vehicleNo}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Parking Space Number</TableCell>
                <TableCell>:</TableCell>
                <TableCell data-testid={`parking-drawing-registered-${currentVehicle.parkingSpaceNo}`}>{currentVehicle.parkingSpaceNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Check In</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{currentVehicle.checkIn.toString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Check Out</TableCell>
                <TableCell>:</TableCell>
                <TableCell data-testid= "deregister-time-spent">{currentVehicle.checkOut.toString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>:</TableCell>
                <TableCell data-testid= "deregister-charge">$ {amount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button
            data-testid="deregister-payment-button"
            variant="contained"
            color="primary"
            style={{ textTransform: "none", bottom: "3%" }}
            onClick={async () => {
              await postVehicleDetails(currentVehicle);
              navigateToPaymentGateWay();
            }}
          >
            Pay $ {amount}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
