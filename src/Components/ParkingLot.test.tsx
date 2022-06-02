import "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../Context";
import ParkingLot from "./ParkingLot";

let AddRouting: any = () => {
  const context: any = {
    setVehicleNo: jest.fn(),
    setParkingLotDia: jest.fn(),
    vehicleNo: "112",
    date: new Date(),
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
        vehicleNo: "111",
        checkIn: new Date(),
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

test("CheckIn", async () => {
  render(<AddRouting />);
  let bookingDiv = screen.getByTestId("booking-0");
  expect(bookingDiv).toBeInTheDocument();
  await new Promise((r) => setTimeout(r, 4000));
  let parkingSpace = screen.getByTestId("parking_space-0");
  expect(parkingSpace).toBeInTheDocument();
  let click = await fireEvent.click(parkingSpace);
  expect(click).toBe(true);
  await new Promise((r) => setTimeout(r, 4000));
  let yesBtn = await screen.getByTestId(/confirm/i);
  let clickOnYesBtn = fireEvent.click(yesBtn);
  expect(clickOnYesBtn).toBe(true);
});

test("Cancel", async () => {
  render(<AddRouting />);
  let bookingDiv = screen.getByTestId("booking-0");
  expect(bookingDiv).toBeInTheDocument();
  let parkingSpace = screen.getByTestId("parking_space-0");
  expect(parkingSpace).toBeInTheDocument();
  let click = await fireEvent.click(parkingSpace);
  expect(click).toBe(true);
  await new Promise((r) => setTimeout(r, 4000));
  let noBtn = await screen.getByTestId(/no/i);
  let clickOnNoBtn = fireEvent.click(noBtn);
  expect(clickOnNoBtn).toBe(true);
});

test("Check Out", async () => {
  render(<AddRouting />);
  let bookingDiv = screen.getByTestId("booking-1");
  expect(bookingDiv).toBeInTheDocument();
  let parkingSpace = screen.getByTestId("parking_space-1");
  expect(parkingSpace).toBeInTheDocument();
  let checkOutBtn = screen.getByTestId(/check_out/i);
  let clickOnCheckOutBtn = fireEvent.click(checkOutBtn);
  expect(clickOnCheckOutBtn).toBe(true);
});

test("Vehicle details is empty", async () => {
  const context: any = {
    vehicleNo: "",
    setVehicleNo: jest.fn(),
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
    ],
  };
  render(
    <BrowserRouter>
      <Context.Provider value={context}>
        <ParkingLot />
      </Context.Provider>
    </BrowserRouter>
  );
  let bookingDiv = screen.getByTestId("booking-0");
  expect(bookingDiv).toBeInTheDocument();
  let parkingSpace = screen.getByTestId("parking_space-0");
  expect(parkingSpace).toBeInTheDocument();
  let click = await fireEvent.click(parkingSpace);
  expect(click).toBe(true);
  await new Promise((r) => setTimeout(r, 4000));
  let navigateToVDPage = await screen.getByTestId(/naviagte_vehicleDetails/i);
  let clickOnVD = fireEvent.click(navigateToVDPage);
  expect(clickOnVD).toBe(true);
});
