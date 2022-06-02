import "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VehicleDetails from "./VehicleDetails";
import Context from "../Context";

let AddRouting = () => {
  const context: any = {
    setDate: jest.fn(),
    setVehicleNo: jest.fn(),
    vehicleNo:"111",
    setParkingLotDia: jest.fn(),
    parkingLotDia: [
      {
        id: "1",
        vehicleNo: "",
        checkIn: "",
        checkOut: "",
        parkingSpaceNo: "",
        isBooked: false,
        isSelected: false,
      },
      {
        id: "2",
        vehicleNo: "",
        checkIn: "",
        checkOut: "",
        parkingSpaceNo: "",
        isBooked: true,
        isSelected: false,
      },
    ],
  };
  return (
    <BrowserRouter>
      <Context.Provider value={context}>
        <VehicleDetails />
      </Context.Provider>
    </BrowserRouter>
  );
};

test("renders", () => {
  render(<AddRouting />);
});

test("back button has click event", () => {
  render(<AddRouting />);
  let btn = screen.getByRole("button", { name: /back/i });
  let click = fireEvent.click(btn);
  expect(click).toBe(true);
});

test("submit button is enabled", async () => {
  render(<AddRouting />);
  let vehicleNo = screen.getByLabelText(/vehicle number/i);
  fireEvent.change(vehicleNo, { target: { value: "jj" } });
  let btn = screen.getByRole("button", { name: /submit/i });
  let click = fireEvent.click(btn);
  expect(click).toBe(true);
  expect(btn).not.toBeDisabled();
});

test("time and date change", () => {
  const context: any = {
    setDate: jest.fn(),
    setVehicleNo: jest.fn()
  };
  render(
    <BrowserRouter>
      <Context.Provider value={context}>
        <VehicleDetails />
      </Context.Provider>
    </BrowserRouter>
  );
  let vehicleNo = screen.getByLabelText(/vehicle number/i);
  fireEvent.change(vehicleNo, { target: { value: "jj" } });
  expect(context.setVehicleNo).toHaveBeenCalledTimes(1);
});
