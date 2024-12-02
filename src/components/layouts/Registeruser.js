import React from "react";
import { db, auth } from "../admin/Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";

export default function Registeruser() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please upload an Excel file.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      for (const user of jsonData) {
        // Extract user details from each row
        const { Name, Email, Password, Course, Branch, Semester, RollNumber, Contact, Address } = user;

        if (Name && Email && Password) {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            const firebaseUser = userCredential.user;

            await addDoc(collection(db, "users"), {
              uid: firebaseUser.uid,
              name: Name,
              email: Email,
              course: Course || "",
              branch: Branch || "",
              semester: Semester || "",
              rollNumber: RollNumber || "",
              contact: Contact || "",
              address: Address || "",
              status: true,
              userType: "user",
              created: Timestamp.now(),
            });

            toast.success(`User ${Name} registered successfully`, { theme: "dark" });
          } catch (error) {
            console.error("Error registering user:", error);
            toast.error(`Error registering ${Name}: ${error.message}`, { theme: "dark" });
          }
        } else {
          toast.error(`Missing required fields for a user in Excel.`, { theme: "dark" });
        }
      }

      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <section className="contact_section layout_padding">
        <div className="container my-auto">
          <div className="heading_container">
            <h3>Add Multiple Students via Excel</h3>
          </div>
        </div>
        {loading ? <p>Loading...</p> : null}
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFileUpload();
                }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <button type="submit">Upload & Register Users</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
