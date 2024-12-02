import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../admin/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Login() {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleform = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      const user = userCredential.user;
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("isAuthenticated", true);

      toast("Login Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        if (user.uid === "tii8HWKcoCQbhK3ETSdWKvkotkd2") {
          localStorage.setItem("userType", "admin");
          navi("/dashboard");
        } else {
          localStorage.setItem("userType", "user");
          navi("/");
        }
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast(error.message, {
        position: "top-center",
        autoClose: 5000,
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
      <div>
        <section className="contact_section layout_padding">
          <div className="container my-auto">
            <div className="heading_container">
              <div className="mx-auto">
                <h2>Login</h2>
                <img src="/assets/images/plug.png" alt="" />
              </div>
            </div>
          </div>
          {loading && (
            <BounceLoader
              color="#57429b"
              cssOverride={override}
              loading={loading}
              size={200}
              speedMultiplier={2}
            />
          )}
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <form onSubmit={handleform}>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      onChange={(data) => setEmail(data.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      onChange={(data) => setPassword(data.target.value)}
                    />
                  </div>
                  <div className="d-flex">
                    <button type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}
