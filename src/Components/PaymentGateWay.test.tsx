import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PaymentGateWay from "./PaymentGateWay";
import Context from "../Context";

let AddRouting = () => {
  const context: any = {
    setParkingLotDia: jest.fn(),
    parkingLotDia: [
      {
        id: "1",
        vehicleNo: "111",
        checkIn: new Date(new Date().getDate() - 1),
        checkOut: new Date(),
        parkingSpaceNo: "1",
        isBooked: true,
        isSelected: false,
      },
      {
        id: "2",
        vehicleNo: "",
        checkIn: "",
        checkOut: "",
        parkingSpaceNo: "",
        isBooked: false,
        isSelected: false,
      },
    ],
  };
  return (
    <Context.Provider value={context}>
      <BrowserRouter>
        <PaymentGateWay />
      </BrowserRouter>
    </Context.Provider>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      id: "1",
    },
  }),
}));

test("renders", () => {
  render(<AddRouting />);
});

test("Home button has click event", () => {
  render(<AddRouting />);
  let homeBtn = screen.getByTestId("home_btn");
  let click = fireEvent.click(homeBtn);
  expect(click).toBe(true);
});
