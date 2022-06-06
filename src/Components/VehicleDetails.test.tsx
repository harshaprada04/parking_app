import "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VehicleDetails from "./VehicleDetails";
import Context from "../Context";
import userEvent from "@testing-library/user-event";

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

// test("setVehicleNo is called", () => {
//   const context: any = {
//     setDate: jest.fn(),
//     setVehicleNo: jest.fn()
//   };
//   render(
//     <BrowserRouter>
//       <Context.Provider value={context}>
//         <VehicleDetails />
//       </Context.Provider>
//     </BrowserRouter>
//   );
//   let vehicleNo = screen.getByLabelText(/vehicle number/i);
//   fireEvent.change(vehicleNo, { target: { value: "jj" } });
//   expect(context.setVehicleNo).toHaveBeenCalledTimes(1);
//   expect(vehicleNo).toHaveValue("jj")
// });

// test("time and date change", () => {
//   const context: any = {
//     setDate: jest.fn(),
//     setVehicleNo: jest.fn()
//   };
//   render(
//     <BrowserRouter>
//       <Context.Provider value={context}>
//         <VehicleDetails />
//       </Context.Provider>
//     </BrowserRouter>
//   );
//   // let dateTextField = screen.getByTestId(/dates/i);
//   // let click = fireEvent.click(dateTextField);
//   // expect(click).toBe(true)
//   let date = screen.getByLabelText(/date/i);
//   // let clickOnDatePicker = fireEvent.click(date);
//   // expect(clickOnDatePicker).toBe(true);
//   userEvent.type(date, "2022-11-09");
//   const chosenDate = screen.getByRole('button', { name: "calendar view is open, go to text input view"});
//   expect(fireEvent.click(chosenDate)).toBe(true);
//   expect(chosenDate).toBeInTheDocument();
//   const selectedDate = screen.getByLabelText("Choose date");
//   expect(fireEvent.click(selectedDate)).toBe(true);
  
//   fireEvent.click(selectedDate,{target:{value:"2022-10-09"}})
//   console.log(selectedDate)
//    expect(context.setDate).toHaveBeenCalledTimes(1);
//   //(selectedDate).toHaveValue("2022-11-09")
// });
