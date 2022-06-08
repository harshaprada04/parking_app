import "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../Context";
import ParkingLot from "./ParkingLot";

let AddRouting: any = () => {
  const context: any = {
    setParkingLotDia: jest.fn(),
    parkingLotDia: [
      {
        id: "1",
        vehicleNo: "1111",
        checkIn: new Date(),
        checkOut: "",
        parkingSpaceNo: "1",
        isBooked: true
      },
      {
        id: "2",
        vehicleNo: "111",
        checkIn: new Date(),
        checkOut: "",
        parkingSpaceNo: "2",
        isBooked: true,
      },
    ],
  };
  return (
    <BrowserRouter>
      <Context.Provider value={context}>
        <ParkingLot />
      </Context.Provider>
    </BrowserRouter>
  );
};
jest.setTimeout(10000);

test("renders", () => {
  render(<AddRouting />);
});

test("Back button has click event", () => {
  render(<AddRouting />);
  let backBtn = screen.getByRole("button", { name: /back/i });
  let click = fireEvent.click(backBtn);
  expect(click).toBe(true);
});

test("Chech Out", () => {
  render(<AddRouting />);
  let checkOutBtn = screen.getByTestId("checkOutBtn-1");
  let click = fireEvent.click(checkOutBtn);
  expect(click).toBe(true);
});

test("Parking Lot is full", async () => {
  render(<AddRouting />);
  let vehicleRegBtn = screen.getByRole("button", { name: /Vehicle Registration/i });
  fireEvent.click(vehicleRegBtn);
  await new Promise((r) => setTimeout(r, 4000));
  const parkingFullBtn = screen.getByTestId("parking_full_btn")
  expect(fireEvent.click(parkingFullBtn)).toBe(true);
});


test("Vehicle Registration", async() => {
  const context: any = {
        setParkingLotDia: jest.fn(),
        parkingLotDia: [
          {
            id: 1,
            vehicleNo: "",
            checkIn: "",
            checkOut: "",
            parkingSpaceNo: "",
            isBooked: false,
          },
        ],
      };
      render(
        <BrowserRouter>
          <Context.Provider value={context}>
            <ParkingLot />
          </Context.Provider>
        </BrowserRouter>
      );
  let vehicleRegBtn = screen.getByRole("button", { name: /Vehicle Registration/i });
  fireEvent.click(vehicleRegBtn);
  await new Promise((r) => setTimeout(r, 4000));
  const xBtn = screen.getByTestId("cancel_btn");
  const clickOnXBtn = fireEvent.click(xBtn);
  expect(clickOnXBtn).toBe(true);
  fireEvent.click(vehicleRegBtn);
  await new Promise((r) => setTimeout(r, 4000));
  const vehicleNoBtn = screen.getByTestId("parking-drawing-add-car-button")
  const inputVehicleNo = screen.getByLabelText("Vehicle Number");
  fireEvent.change(inputVehicleNo, {target:{value:"KA-21 MB-4044"}});
  expect(vehicleNoBtn).not.toBeDisabled();
  let clickOnSubmitBtn = fireEvent.click(vehicleNoBtn);
  expect(clickOnSubmitBtn).toBe(true);
});

