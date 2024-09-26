import { useNavigate } from "react-router-dom";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../admin/Firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
import { createUserWithEmailAndPassword } from 'firebase/auth';
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function Login() {
  const navi = useNavigate();
  let [color, setColor] = useState("#ffffff");
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleform = async (e) => {
    e.preventDefault()
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false)
        const user = userCredential.user;
        localStorage.setItem("uid", user.uid)
        
        localStorage.setItem("isAuthenticated", true)
        toast('Login Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setTimeout(() => {
          if(user.uid == "tii8HWKcoCQbhK3ETSdWKvkotkd2")
          {
            localStorage.setItem("userType", "admin")
            navi("/dashboard")
          }
          else{
            localStorage.setItem("userType", "user")
            navi("/")
          }
        }, 1500);
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        toast(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  return (
    <>
      <div>
        <section class="contact_section layout_padding ">
          <div class="container my-auto ">
            <div class="heading_container">
              <div className="mx-auto">
                <h2>Login</h2>
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
                    <button type="submit">Login</button>
                  </div>

                  {/* <Link
                    className="nav-link text-center mt-3 "
                    to="/registeruser"
                  >
                    <u> Signup </u>
                  </Link> */}
                </form>
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
