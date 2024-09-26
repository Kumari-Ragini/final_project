import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
      </div>
    </div>
  );
}
