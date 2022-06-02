import { Route, Routes } from "react-router-dom";
import HomaePage from "./Components/HomePage";
import CheckOut from "./Components/CheckOut";
import ParkingLot from "./Components/ParkingLot";
import VehicleDetails from "./Components/VehicleDetails";
import PaymentGateWay from "./Components/PaymentGateWay";
import ManageParking from "./Components/ManageParking";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomaePage />}></Route>
      <Route path="/manageParking" element={<ManageParking />}></Route>
      <Route path="/checkOut" element={<CheckOut />}></Route>
      <Route path="/vehicleDetails" element={<VehicleDetails />}></Route>
      <Route path="/parkingLot" element={<ParkingLot />}></Route>
      <Route path="/paymentGateWay" element={<PaymentGateWay />}></Route>
    </Routes>
  );
}

export default Routing;
