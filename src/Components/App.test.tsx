import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import Context from "../Context";

let AddRouting = () => {
  const context: any = {
    parkingLotDia: []
  };
  return (
    <BrowserRouter>
      <Context.Provider value={context}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  );
};

it("renders", () => {
  render(<AddRouting />);
});
