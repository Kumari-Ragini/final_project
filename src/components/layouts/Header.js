import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  
  const nav = useNavigate()

  const logout = ()=>{
    localStorage.clear()
    toast.success("Logout Successfully!!")
    setTimeout(()=>{
      nav("/login")
    },1000)
  }
  return (
    <div>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <img src="/assets/images/logo.png" alt="" />
              <span>Feedback Hub</span>
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
                  {(localStorage.getItem('isAuthenticated') != null) && (localStorage.getItem('userType') == 'admin') ?  
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/addcategory">
                        Add Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/managecategory">
                        Manage Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/registeruser">
                        Add Student
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/managestudent">
                        Manage Student
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/table">
                        Complaints
                      </Link>
                    </li>
                  </> : <></>}
                  {(localStorage.getItem('isAuthenticated') != null) && (localStorage.getItem('userType') == 'user') ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/category">
                        Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/complaint">
                        Complaint
                      </Link>
                    </li>
                  </> : <></> }
                  {!localStorage.getItem('isAuthenticated') ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  </> :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </>
                  }
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
