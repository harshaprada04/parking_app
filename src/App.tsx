import classes from "./App.module.css";
import { ContextProvider } from "./Context";
import Routing from "./Routing";

function App() {
  return (
    <div className={classes.background}>
      <header>
        <ContextProvider>
          <Routing />
        </ContextProvider>
      </header>
    </div>
  );
}

export default App;
