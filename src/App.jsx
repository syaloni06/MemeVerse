import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </Provider>
    </>
  );
}

export default App;
