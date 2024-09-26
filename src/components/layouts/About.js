import React from "react";

export default function About() {
  return (
    <div>
      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                  <img src="/assets/images/plug.png" alt="" />
                </div>
                <p>
                  efixPro is a leading provider of innovative hostel management
                  solutions. Our mission is to simplify and streamline hostel
                  operations for both residents and administrators.
                </p>
                <p>
                  With our user-friendly platform, residents can easily register
                  complaints regarding faulty electronic devices in their rooms,
                  track the progress of their complaints, and communicate
                  directly with the hostel warden for prompt resolutions.
                  Administrators benefit from a centralized dashboard to
                  efficiently manage complaints, update statuses, and oversee
                  room details.
                </p>
                {/* <p>
                  Leveraging modern technologies such as React, Node.js,
                  Express.js, MongoDB, and Firebase, efixPro ensures a secure,
                  scalable, and real-time synchronized system.
                </p> */}
                <p>
                  Join us as we revolutionize hostel management, delivering
                  convenience, transparency, and effectiveness to hostels
                  worldwide. Experience the future of hostel management with
                  efixPro.
                </p>
                {/* <br />
                <h5>Create by</h5> <h3>Prince Kumar</h3>
                <h5>Btech cse</h5> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="img_container">
                <div className="img-box b1">
                  <img src="/assets/images/about-img1.jpg" alt="" />
                </div>
                <div className="img-box b2">
                  <img src="/assets/images/about-img2.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
