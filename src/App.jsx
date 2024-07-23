import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import { isEdge, isIE } from "react-device-detect";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import BrowserSupportModal from "./components/commonComponents/BrowserSupportModal";
import Routes from "./routes";

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isEdge || isIE) {
      setShowModal(true);
    }
  }, []);

  return (
    <div className="App no-horizontal-scroll">
      <Router>
        <Routes />
      </Router>
      <BrowserSupportModal showModal={showModal} />
    </div>
  );
}

export default App;
