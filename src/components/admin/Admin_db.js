import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  {
    return (
      <>
        <div>
          <header className="header_section">
            <div className="container">
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <Link className="navbar-brand" to="/admin_db">
                  <img src="/assets/images/logo.png" alt="" />
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="s-1"> </span>
                  <span className="s-2"> </span>
                  <span className="s-3"> </span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">
                          Home <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/addcategory">
                          Manage Category
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="/table">
                          complaints
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/admin_db">
                          Status
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/adminregister">
                          Login
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        </div>
      </>
    );
  }
}
