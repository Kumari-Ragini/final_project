import React from "react";

export default function Footer() {
  return (
    <section className="info_section layout_padding">
      <div className="container">
        <div className="info_contact">
          <div className="row">
            <div className="col-md-4">
              <a href="">
                <img src="/assets/images/location-white.png" alt="" />
                <span>jalandhar punjab</span>
              </a>
            </div>
            <div className="col-md-4">
              <a href="">
                <img src="/assets/images/telephone-white.png" alt="" />
                <span>Call : +916207018089</span>
              </a>
            </div>
            <div className="col-md-4">
              <a href="">
                <img src="/assets/images/envelope-white.png" alt="" />
                <span>itsrcragini2004@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <div className="info_form">
              <form action="">
                <input type="text" placeholder="Enter your email" />
                <button>subscribe</button>
              </form>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="info_social">
              <div>
                <a href="https://www.facebook.com/prince.shah.09/">
                  <img src="/assets/images/fb.png" alt="" />
                </a>
              </div>
              <div>
                <a href="">
                  <img src="/assets/images/twitter.png" alt="" />
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/kumari-ragini-3a70bb257/">
                  <img src="/assets/images/linkedin.png" alt="" />
                </a>
              </div>
              <div>
                <a href="">
                  <img src="/assets/images/instagram.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
