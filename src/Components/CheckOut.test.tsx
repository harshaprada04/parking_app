import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../Context";
import CheckOut from "./CheckOut";

let AddRouting = () => {
  const context: any = {
    parkingLotDia: [
      {
        id: "1",
        vehicleNo: "11",
        checkIn: new Date(new Date().getDate() - 1),
        checkOut: new Date(),
        parkingSpaceNo: "1",
        isBooked: true,
        isSelected: false,
      },
      {
        id: "2",
        vehicleNo: "111",
        checkIn: new Date(),
        checkOut: new Date(),
        parkingSpaceNo: "1",
        isBooked: true,
        isSelected: false,
      },
    ],
  };
  return (
    <Context.Provider value={context}>
      <BrowserRouter>
        <CheckOut />
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

test("Back button has click event", () => {
  render(<AddRouting />);
  let backBtn = screen.getByRole("button", { name: /back/i });
  let click = fireEvent.click(backBtn);
  expect(click).toBe(true);
});

test("Payment button has click event", () => {
  render(<AddRouting />);
  let paymentBtn = screen.getByTestId(/payment_btn/i);
  let click = fireEvent.click(paymentBtn);
  expect(click).toBe(true);
});

test("Payment button has click event", () => {
  const context: any = {
    parkingLotDia: [
      {
        id: "1",
        vehicleNo: "111",
        checkIn: new Date(),
        checkOut: new Date(),
        parkingSpaceNo: "1",
        isBooked: true,
        isSelected: false,
      },
    ],
  };
  render(
    <BrowserRouter>
      <Context.Provider value={context}>
        <CheckOut />
      </Context.Provider>
    </BrowserRouter>
  );
  let paymentBtn = screen.getByTestId(/payment_btn/i);
  let click = fireEvent.click(paymentBtn);
  expect(click).toBe(true);
});

test("Check Table values", () => {
  render(<AddRouting />);
  let vehicleNo = screen.getByTestId(/vehicle_no/i);
  expect(vehicleNo.innerHTML).toBe("11");
});
