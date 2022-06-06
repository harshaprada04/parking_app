import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Context from "../Context";
import parkingLotDiagram from "../parkingLotDiagram.json";

function HomePage() {
  const navigation = useNavigate();
  const [space, setSpace] = useState<string>("");
  const contexts: any = useContext(Context);

  async function clickHandler() {
    await contexts.setParkingLotDia(
      parkingLotDiagram.slice(0, parseInt(space))
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "60%",
          width: "40%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Parking Space"
          value={space}
          autoComplete="off"
          onChange={(e) => {
            setSpace(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ textTransform: "none" }}
          disabled={!space}
          onClick={clickHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
