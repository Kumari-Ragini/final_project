import React from "react";
import { db, storage, auth } from '../admin/Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
import { createUserWithEmailAndPassword } from 'firebase/auth';
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Registeruser() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [course, setcourse] = useState('')
  const [branch, setbranch] = useState('')
  const [semester, setsemester] = useState('')
  const [rollNumber, setrollNumber] = useState('')
  const [contact, setcontact] = useState('')
  const [address, setaddress] = useState('')
  const [roomNumber, setroomNumber] = useState('')
  const [hostelName, sethostelName] = useState('')

  const navi = useNavigate();
  const [file, setFile] = useState(null)
  const [percent, setPercent] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [fileName, setFileName] = useState(null)

  const handleSubmit = async (e) => {
    uploadFile()
    e.preventDefault()
  }
  const uploadFile = () => {
    setLoading(true)
    if (!file) {
      setLoading(false)
      alert("Please upload an image first!");
    }
    //   console.log("File",file)
    //   console.log("File Name",file.name)

    const fileName = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, `/files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
        setLoading(false)
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //   console.log("URL",url);
          setFileName(fileName)
          setImageUrl(url)
          setLoading(false)
        });
      }
    );
  };

  const register = async (e) => {
    // e.preventDefault()
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false)
        const user = userCredential.user;
        let userdata = {
          uid: user.uid,
          name: name,
          email: email,
          course: course,
          branch: branch,
          semester: semester,
          rollNumber: rollNumber,
          roomNumber: roomNumber,
          hostelName: hostelName,
          contact: contact,
          address: address,
          status: true,
          userType: 'user',
          image: imageUrl,
          fileName: fileName,
          created: Timestamp.now()
        }
        saveData(userdata)
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // alert("Error: " + errorMessage)
      });
  }

  const saveData = async (data) => {
    // console.log(data)
    setLoading(true)
    try {
      // console.log("Enter in try block")
      await addDoc(collection(db, 'users'), {
        uid: data.uid,
        name: data.name,
        email: data.email,
        course: data.course,
        branch: data.branch,
        semester: data.semester,
        rollNumber: data.rollNumber,
        roomNumber: data.roomNumber,
        hostelName: data.hostelName,
        contact: data.contact,
        address: data.address,
        status: true,
        userType: 'user',
        image: data.image,
        fileName: data.fileName,
        created: Timestamp.now()
      })
      // alert("Submitted")
      toast('Record submitted Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setLoading(false)
      setTimeout(() => {
        navi("/managestudent")
      }, 2000);
    } catch (err) {
      // console.log("entered in catch")
      // alert(err)
      toast(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!imageUrl)
      register()
  }, [imageUrl])
  return (
    <div>
      <section class="contact_section layout_padding ">
        <div class="container my-auto  ">
          <div class="heading_container">
            <div className="mx-auto">
              <h3>Add Student</h3>
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
        <div class="container  ">
          <div class="row">
            <div class="col-md-10 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" placeholder="Full Name" onChange={(e) => { setname(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="Email" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="Password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="password" placeholder="Confirm Password" onChange={(e) => { setconfirmpassword(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Course" onChange={(e) => { setcourse(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Branch" onChange={(e) => { setbranch(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Semester" onChange={(e) => { setsemester(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Roll Number" onChange={(e) => { setrollNumber(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="number" placeholder="Room no" onChange={(e) => { setroomNumber(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Hostel name or no" onChange={(e) => { sethostelName(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="number" placeholder="contact no." min={1} onChange={(e) => { setcontact(e.target.value) }} required/>
                  </div>
                  <div className="col-md-6">
                    <input type="file" placeholder="profile" onChange={(e) => { setFile(e.target.files[0]) }} required/>
                    <p>{percent} "% done"</p>

                  </div>
                  <div className="col-md-12">
                    <textarea placeholder="Address" rows={5} className="form-control shadow" onChange={(e) => { setaddress(e.target.value) }} required></textarea>
                  </div>
                </div>
                <div class="d-flex ">
                  <button type="submit">Signup</button>
                </div>
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
  );
}
