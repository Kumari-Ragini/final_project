import React from "react";
import { db, storage, auth } from '../admin/Firebase'
import { collection, updateDoc, doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteObject,getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
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

export default function UpdateStudent() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navi = useNavigate();
  const param = useParams()

  const [id, setId] = useState(param.id)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [course, setcourse] = useState('')
  const [branch, setbranch] = useState('')
  const [semester, setsemester] = useState('')
  const [rollNumber, setrollNumber] = useState('')
  const [contact, setcontact] = useState('')
  const [address, setaddress] = useState('')
  const [roomNumber, setroomNumber] = useState('')
  const [hostelName, sethostelName] = useState('')

  const [image, setImage] = useState()
  const [fileName, setFileName] = useState()
  const [prevFileName, setPrevFileName] = useState()
  const [imageUrl, setImageUrl] = useState(null)
  const [file, setFile] = useState(null)
  const [percent, setPercent] = useState(false)
  useEffect(() => {
    getSingleTaskData()
  }, [])

  const getSingleTaskData = async () => {
    const taskDocRef = doc(db, 'users', id)
    const taskSnap = await getDoc(taskDocRef);

    if (taskSnap.exists()) {
      let taskData = taskSnap.data();
      // console.log("Document data:", taskSnap.data());
      setname(taskData.name)
      setemail(taskData.email)
      setcourse(taskData.course)
      setbranch(taskData.branch)
      setsemester(taskData.semester)
      setrollNumber(taskData.rollNumber)
      setroomNumber(taskData.roomNumber)
      sethostelName(taskData.hostelName)
      setcontact(taskData.contact)
      setaddress(taskData.address)
      setPrevFileName(taskData.fileName)
      setImage(taskData.image)
    } else {
      console.log("No such document!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!!file)
      uploadFile()
    else updateData()
  }

  async function updateData() {
    setLoading(true)
    const taskDocRef = doc(db, 'users', id)
    try {
      let data = {
        name: name,
        email: email,
        course: course,
        branch: branch,
        semester: semester,
        rollNumber: rollNumber,
        roomNumber: roomNumber,
        hostelName: hostelName,
        contact: contact,
        address: address
      }
      if (!!imageUrl) {
        data.image = imageUrl
        data.fileName = fileName
      }
      await updateDoc(taskDocRef, data)
      toast('Record Update Successfully', {
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
      navi("/managestudent")
    } catch (err) {
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
    if (!!imageUrl) {
      deletePreviousImage()
      updateData()
    }
  }, [imageUrl])
  function deletePreviousImage() {
    const fileRef = ref(storage, "files/" + prevFileName);
    deleteObject(fileRef).then(function () {
      // File deleted successfully
      console.log("Prev File Deleted")
    }).catch(function (error) {
      // Some Error occurred
      console.log("Error deleting previous image")
    });

  }
  const uploadFile = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const fileName = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, `/files/${fileName}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log(url);
          setImageUrl(url)
          setFileName(fileName)
          setImage(url)
        });
      }
    );
  };
  return (
    <div>
      <section class="contact_section layout_padding ">
        <div class="container my-auto  ">
          <div class="heading_container">
            <div className="mx-auto">
              <h3>Update Student</h3>
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
                    <input type="text" placeholder="Full Name" onChange={(e) => { setname(e.target.value) }} value={name} required />
                  </div>
                  <div className="col-md-6">
                    <input type="Email" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} value={email} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Course" onChange={(e) => { setcourse(e.target.value) }} value={course} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Branch" onChange={(e) => { setbranch(e.target.value) }} value={branch} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Semester" onChange={(e) => { setsemester(e.target.value) }} value={semester} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Roll Number" onChange={(e) => { setrollNumber(e.target.value) }} value={rollNumber} required />
                  </div>
                  <div className="col-md-6">
                    <input type="number" placeholder="Room no" onChange={(e) => { setroomNumber(e.target.value) }} value={roomNumber} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder="Hostel name or no" onChange={(e) => { sethostelName(e.target.value) }} value={hostelName} required />
                  </div>
                  <div className="col-md-6">
                    <input type="number" placeholder="contact no." min={1} onChange={(e) => { setcontact(e.target.value) }} value={contact} required />
                  </div>
                  <div className="col-md-6">
                    <input type="file" placeholder="profile" onChange={(e) => { setFile(e.target.files[0]) }} required />
                    <img src={image} height={100}></img><br />
                    <p>{percent} "% done"</p>
                  </div>
                  <div className="col-md-12">
                    <textarea placeholder="Address" rows={5} className="form-control shadow" onChange={(e) => { setaddress(e.target.value) }} value={address} required></textarea>
                  </div>
                </div>
                <div class="d-flex ">
                  <button type="submit">Submit</button>
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
