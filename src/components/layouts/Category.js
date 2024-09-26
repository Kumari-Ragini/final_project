import React from "react";
import { db } from '../admin/Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, Timestamp, doc, deleteDoc } from "firebase/firestore"
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

export default function Category() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navi = useNavigate();
  
  const [testdata, settestdata] = useState([])
  useEffect(() => {
    // console.log("HELLO")
    const q = query(collection(db, 'categories'), orderBy('created', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      //  
      settestdata(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      // console.log(testdata)
    })
  }, [])
  return (
    <>
      <div>
        <section className="service_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>Categories</h2>
              <img src="/assets/images/plug.png" alt="" />
            </div>
            <BounceLoader
              color="#57429b"
              cssOverride={override}
              loading={loading}
              size={200}
              speedMultiplier={2}
            />
            
            <div className="service_container">
            {testdata.map((newdata, index) => (
              <div className="box">
                <div className="img-box">
                  <img src={newdata.data.image} className="img1" alt="" />
                </div>
                <div className="detail-box">
                  <h5>{newdata.data.categoryName}</h5>
                  <p></p>
                </div>
              </div>
            ))}
              {/* <div className="box active">
                <div className="img-box">
                  <img src="/assets/images/fan.png" className="img1" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Fan</h5>
                  <p></p>
                </div>
              </div>
              <div className="box">
                <div className="img-box">
                  <img
                    src="/assets/images/switch.png"
                    className="img1"
                    alt=""
                  />
                </div>
                <div className="detail-box">
                  <h5></h5>
                  <p>Switching</p>
                </div>
              </div>
              <div className="box ">
                <div className="img-box">
                  <img src="/assets/images/s3.png" className="img1" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Equipment Maintenance</h5>
                  <p></p>
                </div>
              </div>
              <div className="box ">
                <div className="img-box">
                  <img src="/assets/images/s1.png" className="img1" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Equipment installation</h5>
                  <p></p>
                </div>
              </div>
              <div className="box">
                <div className="img-box">
                  <img src="/assets/images/s5.png" className="img1" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Electrical Wiring</h5>
                  <p></p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
