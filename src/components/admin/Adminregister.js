import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

//import BounceLoader from "react-spinners/BounceLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Login() {
  const nav = useNavigate();
  let [color, setColor] = useState("#ffffff");
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleEmail = (data) => {
  //   // console.log(email);
  //   setEmail(data.target.value);
  // };
  const handleform = (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(email);
    console.log(password);
    if (email == "prince@gmail.com" && password == "000") {
      console.log("Login Successfully");
      // nav("/about");
      //toast("Login Successfully");
      sessionStorage.setItem("isAuthenticated", true);

      toast.success('"Login Successfully"', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        setLoading(false);
        nav("/dashboard");
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log("Invalid Email or password");
      // toast("Invalid Email or password");
      toast.error('"Invalid Credentials"', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/* <BounceLoader
        color={color}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <div>
        <section class="contact_section layout_padding ">
          <div class="container my-auto ">
            <div class="heading_container">
              <div className="mx-auto">
                <h2>Admin Login</h2>
                <img src="/assets/images/plug.png" alt="" />
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-6 mx-auto">
                <form onSubmit={handleform}>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(data) => {
                        setEmail(data.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="Password"
                      placeholder="Password"
                      required
                      onChange={(data) => {
                        setPassword(data.target.value);
                      }}
                    />
                  </div>
                  <div class="d-flex ">
                    <button>Login</button>
                  </div>

                  <Link className="nav-link text-center mt-3 " to="/addadmin">
                    Add a new admin
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer
          position="top-center"
          autoClose={3000}
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
