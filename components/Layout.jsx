// Layout.js
import { useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Login from "./Login";
import Registration from "./Registration";

const Layout = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "login":
        return <Login setCurrentPage={setCurrentPage} />;
      case "register":
        return <Registration setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="root">
      <NavBar setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Layout;
