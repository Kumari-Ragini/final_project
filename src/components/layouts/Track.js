import { db } from '../admin/Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, Timestamp, doc, deleteDoc, where } from "firebase/firestore"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export default function Track() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navi = useNavigate();
  useEffect(() => {
      if (localStorage.getItem("isAuthenticated") == null) {
          navi("/login")
      }
  }, [])
  const [testdata, settestdata] = useState([])
  useEffect(() => {
      console.log("uid",localStorage.getItem('uid'))
      const q = query(collection(db, 'complaints'),where('uid','==',localStorage.getItem('uid')), orderBy('created', 'asc'))
      onSnapshot(q, (querySnapshot) => {
          settestdata(querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          })))
          // console.log(testdata)
      })
  }, [])
  const getdate = (datetime) => {
    const date = (datetime.toDate().toString())
    const s = date.split(' ');
    // console.log(s)
    const returndate = s[2] + "-" + s[1] + "-" + s[3]
    return returndate
  }
  return (
    <div>
      <section class="contact_section layout_padding ">
        <div class="container my-auto ">
          <div class="heading_container">
            <div className="mx-auto">
              <h2>Track Complaint</h2>
              <img src="/assets/images/plug.png" alt="" />
            </div>
          </div>
        </div>
          {/* <div class="row">
            <div class="col-md-6 mx-auto">
              <form>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your complaint id to track your complaint"
                  />
                </div>
                <div class="d-flex">
                  <Link className="nav-link" to="/tracking">
                    {" "}
                    <button>Track</button>
                  </Link>
                </div>
              </form>
            </div>
          </div> */}
          <BounceLoader
            color="#57429b"
            cssOverride={override}
            loading={loading}
            size={200}
            speedMultiplier={2}
          />
          <div class="container">
          <Link to={'/makecomplaint'} className='btn btn-outline-dark px-5'>Add</Link>
              <div class="row">
                  <div class="col-md-12 mx-auto mt-5">
                      <table className="table table-bordered table-striped text-uppercase">
                          <thead className="table-dark">
                              <tr>
                                  <th>#</th>
                                  <th>Category</th>
                                  <th>Complaint</th>
                                  <th>Image</th>
                                  <th>Stauts</th>
                                  <th>Created at</th>
                              </tr>
                          </thead>
                          <tbody>
                              {testdata.map((newdata, index) => (

                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{newdata.data.complainttype}</td>
                                      <td>{newdata.data.description}</td>
                                      <td><img src={newdata.data.image} width={'60px'} /></td>
                                      <td>{newdata.data.status}</td>
                                      <td>{getdate(newdata.data.created)}</td>
                                      
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
        </div>
      </section>
    </div>
  );
}
