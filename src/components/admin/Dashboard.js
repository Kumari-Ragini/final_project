import React from "react";
import { Link } from "react-router-dom";
export default function Newdashboard() {
  return (
    <div class="container-fluid  ">
      <div className="row flex-nowrap">
        <div className="bg-dark col-auto col-md-4 col-lg-2 min-vh-100 d-flex flex-column justify-content-between">
          <div className='"bg-dark'>
            <a className="d-flex  text-decoration-none align-item-center">
              <span className="fs-4 d-none d-sm-inline">
                <h3
                  className="badge bg-light text-wrap text-primary mt- "
                  style={{ width: "7rem" }}
                >
                  eFixPro
                </h3>
              </span>
            </a>
            <ul className="nav nav-pills flex-column mt-4">
              <li className="nav-item py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="fs-5 fa fa-gauage"></i>
                  <span className="fs-4 ms-3 d-none d-sm-inline fontstyle">
                    Dashboard
                  </span>
                </a>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="fs-5 fa fa-house"></i>
                  <span className="fs-4 ms-3 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="fs-5 fa fa-table-list"></i>
                  <span className="fs-4 ms-3 d-none d-sm-inline">
                    complaints
                  </span>
                </a>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="fs-5 fa fa-users"></i>
                  <span className="fs-4 ms-3 d-none d-sm-inline">users</span>
                </a>
              </li>
              {/* <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Login
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <button class="dropdown-item" type="button">
                    Action
                  </button>
                  <button class="dropdown-item" type="button">
                    Another action
                  </button>
                  <button class="dropdown-item" type="button">
                    Something else here
                  </button>
                </div>
              </div> */}
            </ul>
          </div>
          {/* <div className="dropdown open p-3">
            <button
              className="btn border-none dropdown-toggle text-white"
              type="button"
              id="triggerId"
              data-aria-expanded="false"
            >
              <i className="fa fa-user"></i>
              <span className="ms-2 me-2"></span>
            </button>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <button className="dropdown-item" href="#">
                setting
              </button>
              <button className="dropdown-item" href="#">
                Profile
              </button>
            </div>
          </div> */}
        </div>
        <div className="contentsect ">
          <div>
            <nav class="navbar navbar-expand-lg navbar-light">
              <button
                class="navbar-toggler "
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="fs-3 fa fa-user"></span>
                    </a>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <Link class="dropdown-item" to="/adminregister">
                        Login
                      </Link>
                      <a class="dropdown-item" href="#">
                        profile
                      </a>
                      <a class="dropdown-item" href="#">
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="ms-3 ">
            <div className="row">
              <div className="card my-5 bg-danger mx-2 col-md-1 cardsize">
                <div className="card-body">
                  <div>
                    {" "}
                    <span className=" card-title ">Total Complaints</span>
                  </div>
                  <div className="cardicon">
                    <span className="num count " data-val="10">
                      10
                    </span>
                    <span className="fs-4 fa fa-wrench ms-3 "></span>
                  </div>
                  <a className="btn button " href="#" role="button">
                    More Info
                  </a>
                </div>
              </div>
              <div className="card my-5 bg-warning mx-2 col-md-1 cardsize">
                <div className="card-body">
                  <span className="card-title fontstyle">
                    Pending Complaints
                  </span>
                  <div className="cardicon">
                    <span className="num count " data-val="5">
                      5
                    </span>
                    <span className="fs-4 fa fa-hourglass-start ms-3"></span>
                  </div>
                  <a className="btn btn-warning button " href="#" role="button">
                    More Info
                  </a>
                </div>
              </div>
              <div className="card my-5 bg-success mx-2 col-md-1 cardsize">
                <div className="card-body">
                  <span className="card-title fontstyle">
                    Complaints solved
                  </span>
                  <div className="cardicon">
                    <span className="num text-dark count" data-val="5">
                      5
                    </span>
                    <span className="fs-3 fa fa-check ms-3 "></span>
                  </div>
                  <a className="btn button " href="#" role="button">
                    More Info
                  </a>
                </div>
              </div>

              <div className="card my-5 bg-secondary mx-2 col-md-1 cardsize">
                <div className="card-body">
                  <span className="card-title fontstyle">Total users</span>
                  <div className="cardicon">
                    <span className="num text-dark count" data-val="10">
                      10
                    </span>
                    <span className="fs-4 fa fa-users ms-3 "></span>
                  </div>
                  <a className="btn button " href="#" role="button">
                    More Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
