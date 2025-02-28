import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <Navbar/>
      <Outlet/>
      </Provider>
    </>
  );
}

export default App;
