import React from "react";
import { Link } from "react-router-dom";

export default function Complaint() {
  return (
    <>
      <div className="container comppage ">
        <Link
          className="nav-link text-center mt-3 link-danger "
          to="/Makecomplaint"
        >
          <h2 className="my-5 font-weight-bold">Make a new complaint</h2>
        </Link>
        <Link className="nav-link text-center mt-3 link-info" to="/Track">
          <h3 className="my-5 font-weight-bold">Track complaint</h3>
        </Link>
        <div>
          <Link
            className="nav-link text-center mt-3 link-info"
            to="/Contactwarden"
          >
            <h4 className="ms-2 warden ">
              <u>Contact Warden</u>
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
}
