import React from "react";

export default function Addadmin() {
  return (
    <div>
      <div>
        <section class="contact_section layout_padding ">
          <div class="container my-auto ">
            <div class="heading_container">
              <div className="mx-auto">
                <h2>Create Admin Account</h2>
                <img src="/assets/images/plug.png" alt="" />
              </div>
            </div>
          </div>
          <div class="container ">
            <div class="row">
              <div class="col-md-6 mx-auto">
                <form>
                  <div>
                    <input type="text" placeholder="Full Name" />
                  </div>
                  <div>
                    <input type="text" placeholder="User id" />
                  </div>

                  <div>
                    <input type="Email" placeholder="Email" />
                  </div>
                  <div>
                    <input
                      type="text"
                      maxlength="10"
                      placeholder="contact no."
                    />
                  </div>
                  <div>
                    <input type="Password" placeholder="Password" />
                  </div>
                  <div>
                    <input type="Password" placeholder=" Confirm Password" />
                  </div>
                  <div class="d-flex ">
                    <button>Create Account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
