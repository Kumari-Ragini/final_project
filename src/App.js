import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Master from "./components/layouts/Master";
import Home from "./components/layouts/Home";
import About from "./components/layouts/About";
import Login from "./components/auth/Login";
import Registeruser from "./components/layouts/Registeruser";
import Category from "./components/layouts/Category";
import Complaint from "./components/layouts/Complaint";
import Track from "./components/layouts/Track";
import Makecomplaint from "./components/layouts/Makecomplaint";

import Addcategory from "./components/admin/Addcategory";
import Adminregister from "./components/admin/Adminregister";
import Addadmin from "./components/admin/Addadmin";
import Contactwarden from "./components/layouts/Contactwarden";

import Dashboard from "./components/admin/Dashboard";
import Table from "./components/admin/Table";
import Editdata from "./components/admin/Editdata";
import Tracking from "./components/layouts/Tracking";
import ManageCategory from "./components/admin/ManageCategory";
import UpdateCategory from "./components/admin/UpdateCategory";
import ManageStudent from "./components/admin/ManageStudent";
import UpdateStudent from "./components/layouts/UpdateStudent";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Master />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registeruser" element={<Registeruser />}></Route>
          <Route path="/Category" element={<Category />}></Route>
          <Route path="/Complaint" element={<Complaint />}></Route>
          <Route path="/makecomplaint" element={<Makecomplaint />}></Route>
          <Route path="/track" element={<Track />}></Route>
          <Route path="/tracking" element={<Tracking />}></Route>

          <Route path="/contactwarden" element={<Contactwarden />}></Route>

          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addcategory" element={<Addcategory />}></Route>
          <Route path="/managecategory" element={<ManageCategory />}></Route>
          <Route path="/updatecategory/:id" element={<UpdateCategory />}></Route>
          <Route path="/managestudent" element={<ManageStudent />}></Route>
          <Route path="/updatestudent/:id" element={<UpdateStudent />}></Route>
          <Route path="/adminregister" element={<Adminregister />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/editData/:id" element={<Editdata />}></Route>
          <Route path="/adminlogin" element={<Adminregister />}></Route>
          <Route path="/addadmin" element={<Addadmin />}></Route>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
