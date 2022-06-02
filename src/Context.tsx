import { createContext, useState } from "react";

const Context = createContext({
  parkingLotDia: [],
  setParkingLotDia: (a: any): any => {},
  vehicleNo: "",
  setVehicleNo: (a: any) => {},
  date: Date,
  setDate: (a: any) => {},
});

export function ContextProvider(props: any) {
  const [parkingLotDia, setParkingLotDia] = useState<Array<any>>([]);
  const [vehicleNo, setVehicleNo] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const context: any = {
    parkingLotDia,
    setParkingLotDia,
    vehicleNo,
    setVehicleNo,
    date,
    setDate,
  };
  return (
    <div>
      <Context.Provider value={context}>{props.children}</Context.Provider>
    </div>
  );
}

export default Context;
