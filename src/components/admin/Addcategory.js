import React from "react";
import { db, storage } from '../admin/Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Addcategory() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [categoryName, setcategoryName] = useState('')
 
  const navi = useNavigate();
  const [file, setFile] = useState(null)
  const [percent, setPercent] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [fileName, setFileName] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == null) {
      navi("/login")
    }
  }, [])
  const handleSubmit = async (e) => {
    uploadFile()
    e.preventDefault()
  }
  const uploadFile = () => {
    if (!file) {
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
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //   console.log("URL",url);
          setFileName(fileName)
          setImageUrl(url)
        });
      }
    );
  };
  const saveData = async () => {
    setLoading(true)
    try {
      await addDoc(collection(db, 'categories'), {
        categoryName: categoryName,
        image: imageUrl,
        fileName: fileName,
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
        navi("/managecategory")
      }, 2000);
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
    if (!!imageUrl)
      saveData()
  }, [imageUrl])
  return (
    <>
      <div>
        <section class="contact_section layout_padding ">
          <div class="container my-auto ">
            <div class="heading_container">
              <div className="mx-auto">
                <h2>Add Category</h2>
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
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Category name</label>
                    <input className='form-control' type="text" onChange={(e) => { setcategoryName(e.target.value) }} />
                  </div>
                  <div>
                    <label>Image</label>
                    <input className='form-control' type="file" onChange={(e) =>setFile(e.target.files[0]) } />
                    <p>{percent} "% done"</p>
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
    </>
  );
}
