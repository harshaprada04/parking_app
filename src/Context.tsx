import { createContext, useState } from "react";

const Context = createContext({
  parkingLotDia: [],
  setParkingLotDia: (a: any): any => {},
});

export function ContextProvider(props: any) {
  const [parkingLotDia, setParkingLotDia] = useState<Array<any>>([]);

  const context: any = {
    parkingLotDia,
    setParkingLotDia,
  };
  return (
    <div>
      <Context.Provider value={context}>{props.children}</Context.Provider>
    </div>
  );
}

export default Context;
