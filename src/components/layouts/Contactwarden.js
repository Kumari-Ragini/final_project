import React from "react";

export default function Contactwarden() {
  return (
    <div>
      <section class="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-6 mb-4 mb-lg-0">
              <div class="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div class="row g-0">
                  <div
                    class="col-md-4 gradient-custom text-center text-white"
                    style={{
                      bordertopleftradius: ".5rem",
                      borderbottomleftradius: ".5rem",
                    }}
                  >
                    <img
                      src="/assets/images/warden.png"
                      alt="Avatar"
                      class="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>Mr. Rahul Gautam</h5>
                    <p>Hostel warden</p>
                    <i class="far fa-edit mb-5"></i>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body p-4">
                      <h6>Information</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Email</h6>
                          <p class="text-muted">info@example.com</p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Phone</h6>
                          <p class="text-muted">123 456 789</p>
                        </div>
                      </div>
                      <h6>Department</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Hostel</h6>
                          <p class="text-muted">Hostel 2</p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Faculty</h6>
                          <p class="text-muted">science</p>
                        </div>
                      </div>
                      <div class="d-flex justify-content-start">
                        <a href="#!">
                          <i class="fab fa-facebook-f fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i class="fab fa-twitter fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i class="fab fa-instagram fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
