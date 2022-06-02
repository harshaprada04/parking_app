import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ManageParking from "./ManageParking";
import React from "react";
import Context from "../Context";

const AddRouting = () => {
  const context: any = {
    parkingLotDia: [
      {
        id: "1",
        vehicleNo: "111",
        checkIn: new Date(),
        checkOut: new Date(),
        parkingSpaceNo: "1",
        isBooked: true,
        isSelected: true,
      },
    ],
    setVehicleNo: jest.fn(),
  };
  return (
    <BrowserRouter>
      <Context.Provider value={context}>
        <ManageParking />
      </Context.Provider>
    </BrowserRouter>
  );
};

test("renders", () => {
  render(<AddRouting />);
});

test("Home button has click event", () => {
  render(<AddRouting />);
  let homeBtn = screen.getByRole("button", { name: /home/i });
  let click = fireEvent.click(homeBtn);
  expect(click).toBe(true);
});

test("Manage Parking btn has click event", () => {
  render(<AddRouting />);
  let manageParkingBtn = screen.getByRole("button", {
    name: /manage parking/i,
  });
  let click = fireEvent.click(manageParkingBtn);
  expect(click).toBe(true);
});

jest.setTimeout(10000);
test("Parking Lot is full", async () => {
  render(<AddRouting />);
  let vehicleRegBtn = screen.getByRole("button", {
    name: /vehicle registration/i,
  });
  fireEvent.click(vehicleRegBtn);
  await new Promise((r) => setTimeout(r, 4000));
  let cancelBtn = screen.getByRole("button", { name: /X/i });
  expect(cancelBtn).toBeInTheDocument();
  const clickOnCancelBtn = fireEvent.click(cancelBtn);
  expect(clickOnCancelBtn).toBe(true);
});

test("Vehicle details registraion", async () => {
  const context: any = {
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
    setVehicleNo: jest.fn(),
  };
  render(
    <BrowserRouter>
      <Context.Provider value={context}>
        <ManageParking />
      </Context.Provider>
    </BrowserRouter>
  );
  let vehicleRegBtn = screen.getByRole("button", {
    name: /vehicle registration/i,
  });
  let click = fireEvent.click(vehicleRegBtn);
  expect(click).toBe(true);
});
