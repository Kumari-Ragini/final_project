import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../admin/Firebase"; // Ensure Firebase is set up in your project
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const [showChatbox, setShowChatbox] = useState(false);
  const [userIssue, setUserIssue] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
  const { name, value } = e.target;
    setUserIssue({ ...userIssue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const issueCollection = collection(db, "user_issues");
      await addDoc(issueCollection, userIssue);
      alert("Issue submitted successfully!");
      setUserIssue({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting issue: ", error);
      alert("Failed to submit issue. Please try again.");
    }
  };
  return (
    <div>
      <div className="hero_area">
        <section className=" slider_section ">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <div div className="detail_box ">
                  <h1>
                    REVOLUTIONIZE YOUR HOSTEL EXPERIENCE WITH
                    <h1 className="my-2" style={{ color: "#6013d3" }}>
                      Feedback Hub
                    </h1>
                  </h1>
                  <p>
                    "Transform your hostel experience with efixPro and unlock a
                    new era of seamless management."
                  </p>
                  <Link className="nav-link" to="/about">
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 offset-lg-1">
                <div className="img_content">
                  <div className="img_container">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <div className="img-box">
                            <img src="/assets/images/slider-img.jpg" alt="" />
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="img-box">
                            <img src="/assets/images/slider-img.jpg" alt="" />
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="img-box">
                            <img src="/assets/images/slider-img.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section className="service_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>Our Services</h2>
              <img src="/assets/images/plug.png" alt="" />
            </div>

            <div className="service_container">
              <div className="box">
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
                  <img src="/assets/images/s3.png" className="img1" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Equipment Maintenance</h5>
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
              </div>
            </div>
          </div>
        </section>
        <div>
      {/* Existing content */}
      <div className="hero_area">
        {/* Your existing code */}
      </div>

      {/* Chatbox Button */}
      <button
        onClick={() => setShowChatbox(!showChatbox)}
        className="chatbox-toggle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#6013d3",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
        }}
      >
        💬
      </button>

      {/* Chatbox UI */}
      {showChatbox && (
        <div
          className="chatbox-container"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            background: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "15px",
            width: "300px",
          }}
        >
          <h4>Submit an Issue</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userIssue.name}
                onChange={handleInputChange}
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userIssue.email}
                onChange={handleInputChange}
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                name="message"
                value={userIssue.message}
                onChange={handleInputChange}
                required
                style={{ width: "100%", marginBottom: "10px" }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                background: "#6013d3",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
      </div>
    </div>
  );
}
