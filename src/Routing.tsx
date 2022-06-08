import { Route, Routes } from "react-router-dom";
import HomaePage from "./Components/HomePage";
import CheckOut from "./Components/CheckOut";
import ParkingLot from "./Components/ParkingLot";
import PaymentGateWay from "./Components/PaymentGateWay";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomaePage />}></Route>
      <Route path="/checkOut" element={<CheckOut />}></Route>
      <Route path="/parkingLot" element={<ParkingLot />}></Route>
      <Route path="/paymentGateWay" element={<PaymentGateWay />}></Route>
    </Routes>
  );
}

export default Routing;
