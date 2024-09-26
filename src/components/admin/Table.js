import React from "react";
import { db } from "./Firebase";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Table() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [table, SetTable] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("created", "asc"));
    onSnapshot(q, (querySnapshot) => {
      //   console.log(querySnapshot.docs)
      SetTable(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      //   console.log(allTask.data)
    });
  }, []);

  const getdate = (datetime) => {
    const date = datetime.toDate().toString();
    const s = date.split(" ");
    console.log(s);
    const returndate = s[2] + "-" + s[1] + "-" + s[3];
    return returndate;
  };
  const deletehandle = async (id) => {

    setLoading(true)
    const taskDocRef = doc(db, 'complaints', id)
    try {
      let data = {
        status: 'Resolved',
      }
      await updateDoc(taskDocRef, data)
      toast('Record Update Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setLoading(false)
      setTimeout(() => {
        // window.location.reload()
      }, 1000)
    } catch (err) {
      // alert(err)
      toast(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false)
    }
  };
  return (
    <>
      <div>
        <section class="contact_section layout_padding ">
          <div class="container my-auto ">
            <div class="heading_container">
              <div className="mx-auto">
                <h2>Manage Complaints</h2>
                <img src="/assets/images/plug.png" alt="" />
              </div>
            </div>
          </div>
          <BounceLoader
            color="#57429b"
            cssOverride={override}
            loading={loading}
            size={200}
            speedMultiplier={2}
          />
          <div class="container">
            <div class="row">
              <div class="col-md-12 mx-auto mt-5">
                <table className="table table-bordered table-striped text-uppercase">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">HOSTEL</th>
                      <th scope="col">Room</th>
                      <th scope="col">Complaint</th>
                      <th scope="col">Description</th>
                      <th scope="col">image</th>
                      <th scope="col">Status</th>

                      <th scope="col">Action</th>
                      <th scope="col">Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((complaints, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{complaints.data.name}</td>
                        <td>{complaints.data.hostel}</td>
                        <td>{complaints.data.room}</td>
                        <td>{complaints.data.complainttype}</td>
                        <td>{complaints.data.description}</td>
                        <td>
                          <img src={complaints.data.image} width={"60px"} />
                        </td>
                        <td>{complaints.data.status}</td>

                        <td>
                          { complaints.data.status == 'Pending' ? 
                          <> 
                            <button
                              onClick={() => {
                                const confirmbox = window.confirm(
                                  "Are you sure that complaint is resolved ?"
                                );
                                if (confirmbox === true) {
                                  // alert(tasks.id)
                                  deletehandle(complaints.id);
                                }
                              }}
                            >
                              Resolved
                            </button>
                          </> : 
                          <>
                          
                          </>}
                          
                        </td>
                        <td>{getdate(complaints.data.created)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}
