import React from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Countdown, { zeroPad } from "react-countdown";
import logout from "./logout.action";

function TimoutModal({ onIdle }) {
  const history = useHistory();

  const applyLogout = async () => {
    const localStorage = window.localStorage;
    await logout();
    localStorage.removeItem("user_info");
    onIdle();
    localStorage.setItem("mentorAppRoute", false);
    history.push("/");
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      applyLogout();
      return "Logout successful, redirecting ...";
    } else {
      // Render a countdown
      return (
        <div className="countdown-timer">
          <span className="flipUnitContainer ml-1">{zeroPad(minutes)}</span>
          <span className="seprator ml-1 mr-1">:</span>
          <span className="flipUnitContainer">{zeroPad(seconds)}</span>
        </div>
      );
    }
  };

  return (
    <Modal show={true}>
      <Modal.Body className="center-align">
        <div className="stopwatch-hand-img float-right" />
        <div className="countdown-timer">
          <Countdown
            date={Date.now() + 120000}
            renderer={renderer}
            zeroPadTime={2}
          />
        </div>
        <div className="time-font nml-2">
          <span>Minutes</span>
          <span className="ml-2">Seconds</span>
        </div>
        <div className="mt-4 need-time">Need More Time?</div>
        <div className="mt-2 ml-5 mr-5">
          For your security, we will cancel your session unless you press
          continue
        </div>
        <button
          className="btn btn-sm btn-primary mt-3"
          onClick={() => onIdle()}
        >
          Continue
        </button>
        <div className="mt-2">Logout</div>
      </Modal.Body>
    </Modal>
  );
}

export default TimoutModal;
