import { Outlet } from "react-router";
import Body from "./component/Body";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import usePopularVidoes from "./hooks/usePopularVidoes";

function App() {
  usePopularVidoes();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
