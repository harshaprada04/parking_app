import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import { useContext } from "react";
import { Typography } from "@mui/material";
import classes from "./ParkingLot.module.css";

function ParkingLot() {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>();
  const navigation = useNavigate();
  const contexts: any = useContext(Context);

  function navigateToManageParking() {
    navigation("/manageParking");
  }

  async function clickHandler(id: any) {
    await setCurrentId(id);
    await setIsConfirm(true);
    contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any) => {
        if (id === data.id) {
          return {
            ...data,
            isSelected: false,
            checkIn: contexts["date"],
            vehicleNo: contexts["vehicleNo"],
            parkingSpaceNo: id,
          };
        } else return data;
      })
    );
  }

  async function vehicleDetailsUpdater(id: any) {
    await contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any) => {
        if (id === data.id) {
          return {
            ...data,
            isBooked: true,
            checkIn: contexts["date"],
            vehicleNo: contexts["vehicleNo"],
          };
        } else return data;
      })
    );
    setIsConfirm(false);
    navigation("/manageParking");
    contexts.setVehicleNo("");
  }

  function checkOutTimeUpdater(id: any) {
    contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any) => {
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
        <Button
          name="Back"
          size="small"
          style={{
            textTransform: "none",
            position: "absolute",
            top: "15px",
            left: "15px",
          }}
          variant="contained"
          color="primary"
          onClick={navigateToManageParking}
        >
          Back
        </Button>

        <div
          style={{
            position: "absolute",
            top: "65px",
            left: "15px",
            display: "flex",
            flexWrap: "wrap",
            rowGap: "20px",
            gap: "15px",
            justifyContent: "space-even",
            alignItems: "flex-start",
          }}
        >
          {contexts.parkingLotDia?.length > 0 &&
            contexts.parkingLotDia.map((data: any, index: number) => {
              return (
                <div
                  className={classes.background}
                  style={{
                    backgroundColor: data.isSelected ? "#FFCCCB" : "white",
                  }}
                  key={index}
                  data-testid={`booking-${index}`}
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
                    data-testid={`parking_space-${index}`}
                    name="booking"
                    variant="outlined"
                    color="primary"
                    onClick={() => clickHandler(data.id)}
                    disabled={data.isBooked}
                  >
                    {data.id}
                  </Button>
                  {data.isBooked && (
                    <Button
                      data-testid="check_out"
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
          {contexts.vehicleNo?.length ? (
            <div
              style={{
                zIndex: 1,
                background: "white",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
                height: "35%",
                width: "90%",
                borderRadius: "10px",
              }}
            >
              <Typography>
                The vehicle number "{contexts.vehicleNo}" will be allocated to
                the parking space of number "{currentId}". Are you sure? if so,
                please click on "yes" else "no"{" "}
              </Typography>
              <div style={{ display: "flex", gap: "30px" }}>
                <Button
                  data-testid="confirm"
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={async () => {
                    vehicleDetailsUpdater(currentId);
                  }}
                >
                  Yes
                </Button>
                <Button
                  data-testid="no"
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    setIsConfirm(false);
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          ) : (
            <div
              style={{
                zIndex: 1,
                background: "white",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
                height: "35%",
                width: "85%",
                borderRadius: "10px",
              }}
            >
              <Typography>
                Please enter vehicle details, you haven't entered any vehicle details, please click on vehicle
                details button to enter details
              </Typography>
              <Button
                data-testid="naviagte_vehicleDetails"
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={() => {
                  navigation("/vehicleDetails");
                }}
              >
                Vehicle Details
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ParkingLot;
