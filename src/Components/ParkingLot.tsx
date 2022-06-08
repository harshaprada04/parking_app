import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import { useContext } from "react";
import { Typography, TextField } from "@mui/material";
import classes from "./ParkingLot.module.css";

function ParkingLot() {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [isParkingLotFull, setIsParkingLotFull] = useState<boolean>(false);
  const navigation = useNavigate();
  const contexts: any = useContext(Context);

  function navigateToHomePage() {
    navigation("/");
  }

  async function isParkingLotIsEmpty() {
    let parkedVehicle = await contexts.parkingLotDia.filter(
      (data: any) => data.isBooked === true
    );
    if (parkedVehicle.length === contexts.parkingLotDia.length) {
      setIsParkingLotFull(true);
    } else {
      setIsConfirm(true);
    }
  }

  async function vehicleDetailsUpdater() {
    let randomId: number = await contexts.parkingLotDia.findIndex(
      (data: any) => data.isBooked === false
    );
    await contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any, index: number) => {
        if (randomId + 1 === data.id) {
          return {
            ...data,
            parkingSpaceNo: data.id,
            isBooked: true,
            checkIn: new Date(),
            vehicleNo: vehicleNumber,
          };
        } else return data;
      })
    );
    setIsConfirm(false);
    setVehicleNumber("");
  }

  function checkOutTimeUpdater(id: any) {
    contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any, index: number) => {
        if (id === data.id) {
          return {
            ...data,
            checkOut: new Date(),
          };
        } else return data;
      })
    );
  }

  return (
    <div
      style={{
        overflowY: "auto",
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <div style={{ display: "flex", opacity: isConfirm ? 0.2 : 1 }}>
        <div
          style={{
            position: "fixed",
            width: "98%",
            height: "60px",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            backgroundColor: "#C3D7F9",
            margin: "10px 10px 10px 10px",
            zIndex: 1,
          }}
        >
          <Button
            name="Back"
            size="small"
            style={{
              textTransform: "none",
              position: "relative",
              right: "-1.5%",
            }}
            variant="contained"
            color="primary"
            onClick={navigateToHomePage}
          >
            Back
          </Button>
          <Button
            name="Vehicle Registration"
            size="small"
            style={{
              textTransform: "none",
              position: "relative",
              right: "-80%",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              isParkingLotIsEmpty();
            }}
          >
            Vehicle Registration
          </Button>
        </div>
        <div
          style={{
            position: "absolute",
            top: "95px",
            width: "97%",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "20px",
            gap: "50px",
            justifyContent: "space-around",
            alignItems: "flex-start",
            paddingBottom: "50px",
          }}
        >
          {contexts.parkingLotDia?.length > 0 &&
            contexts.parkingLotDia.map((data: any, index: number) => {
              return (
                <div
                  className={classes.background}
                  key={index}
                  data-testid={`parking-drawing-space-${index}`}
                >
                  <Button
                    sx={{
                      width: "100px",
                      height: "150px",
                      "&:hover": {
                        color: "blue",
                        bgcolor: "#FFCCCB",
                      },
                    }}
                    data-testid={`parking-drawing-space-number-${index}`}
                    name="booking"
                    variant="outlined"
                    color="primary"
                    disabled={data.isBooked}
                  >
                    {data.id}
                  </Button>
                  {data.isBooked && (
                    <Button
                      data-testid={`checkOutBtn-${index}`}
                      variant="contained"
                      color="primary"
                      style={{
                        position: "relative",
                        width: "10px",
                        height: "27px",
                        top: "8px",
                        left: "15px",
                        marginBottom: "20px",
                      }}
                      onClick={async () => {
                        await checkOutTimeUpdater(data.id);
                        navigation(`/checkOut`, {
                          state: {
                            id: data.id,
                          },
                        });
                      }}
                    >
                      X
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {isConfirm && (
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
              zIndex: 1,
              background: "white",
              position: "relative",
              height: "45%",
              width: "90%",
              borderRadius: "10px",
            }}
          >
            <div>
              <Button
                data-testid="cancel_btn"
                variant="text"
                color="error"
                style={{ position: "relative", left: "94%", top: "4px" }}
                onClick={async () => {
                  await setVehicleNumber("");
                  setIsConfirm(false);
                }}
              >
                X
              </Button>
              <div
                style={{
                  position: "relative",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "70px",
                }}
              >
                <TextField
                  data-testid = "parking-drawing-registration-input"
                  id="outlined-basic"
                  variant="outlined"
                  label="Vehicle Number"
                  autoComplete="off"
                  value={vehicleNumber}
                  onChange={(e) => {
                    setVehicleNumber(e.target.value);
                  }}
                />
                <Button
                  data-testid="parking-drawing-add-car-button"
                  variant="contained"
                  color="primary"
                  disabled={!vehicleNumber}
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    vehicleDetailsUpdater();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isParkingLotFull && (
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
              width: "300px",
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
              Parking Lot is Full......
            </Typography>
            <Button
              data-testid="parking_full_btn"
              variant="text"
              color="error"
              onClick={() => {
                setIsParkingLotFull(false);
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

export default ParkingLot;
