import { db, storage } from "../admin/Firebase";
import { collection, addDoc, Timestamp, doc, getDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
export default function Makecomplaint() {
  const navi = useNavigate()
  const [name, setName] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [contact, setcontact] = useState("");
  const [complainttype, setComplainttype] = useState("");
  const [description, setDescription] = useState("");

  const [taskcompletionStatus, settaskcompletionStatus] = useState("pending");
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [category,setCategory]=useState([])
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == null) {
        navi("/login")
      }
  }, [])
  const handleform = async (e) => {
    uploadFile();
    e.preventDefault();
  };
  const uploadFile = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    console.log("File", file);
    console.log("File Name", file.name);

    const fileName = `${Date.now()}-${file.name}`;
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
          // console.log("URL", url);
          setFileName(fileName);
          setImageUrl(url);
        });
      }
    );
  };
  const saveData = async () => {
    try {
      await addDoc(collection(db, "complaints"), {
        uid: localStorage.getItem('uid'),
        name: name,
        hostel: hostel,
        room: room,
        contact: contact,
        complainttype: complainttype,
        description: description,
        image: imageUrl,
        taskcompletionStatus: taskcompletionStatus,
        // comlaintcompletionStatus: comlaintcompletionStatus,
        fileName: fileName,
        created: Timestamp.now(),
        status: "Pending",
      });
      toast.success("Submitted");
      window.location.reload()
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    const id=localStorage.getItem("uid")
    const q = query(collection(db, 'users'),where("uid","==",id), orderBy('created', 'asc'))
    onSnapshot(q, (querySnapshot) => {
       querySnapshot.docs.map(doc => (
        setName(doc.data().name),
        setHostel(doc.data().hostelName),
        setRoom(doc.data().roomNumber),
        setcontact(doc.data().contact)
       ))
    })
    const q1 = query(collection(db, 'categories'), orderBy('created', 'asc'))
      onSnapshot(q1, (querySnapshot) => {
        setCategory(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })))
    })
}, [])
  useEffect(() => {
    if (!!imageUrl) saveData();
  }, [imageUrl]);
  return (
    <div>
      <div>
        <div class="container-fluid px-1 py-5 mx-auto formbg ">
          <div class="row d-flex justify-content-center">
            <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
              <h3 className="fontstyle text-dark">Complaint Registeration</h3>
              {/* <p class="blue-text">
              Just answer a few questions
              <br /> so that we can personalize the right experience for you.
            </p> */}
              <div class="card">
                {/* <h5 class="text-center   mb-4">Hostel complaint form</h5> */}
                <form class="form-card" onSubmit={handleform}>
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Name<span class="text-danger"> *</span>
                      </label>{" "}
                      <input
                      required
                        type="text"
                        placeholder="Enter your Full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />{" "}
                    </div>
                    <div class="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Hostel name/number<span class="text-danger"> *</span>
                      </label>{" "}
                      <input
                      required
                        type="text"
                        placeholder=""
                        value={hostel}
                        onChange={(e) => {
                          setHostel(e.target.value);
                        }}
                      />{" "}
                    </div>
                  </div>
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Room no.<span class="text-danger"> *</span>
                      </label>{" "}
                      <input
                      required
                        type="text"
                        placeholder=""
                        value={room}
                        onChange={(e) => {
                          setRoom(e.target.value);
                        }}
                      />{" "}
                    </div>
                    <div class="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        contact number<span class="text-danger"> *</span>
                      </label>{" "}
                      <input
                      required
                        type="text"
                        placeholder=""
                        value={contact}
                        onChange={(e) => {
                          setcontact(e.target.value);
                        }}
                      />{" "}
                    </div>
                  </div>
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Complaint type<span class="text-danger"> *</span>
                      </label>{" "}
                      <select required
                      className="form-control mt-2 "
                        value={complainttype}
                        onChange={(e) => {
                          setComplainttype(e.target.value);
                        }}
                      >
                          <option selected disabled value={""}>Choose Complaint Type</option>
                          {category?.map((el,index)=>(
                            <option key={index}>{el.data.categoryName}</option>
                          ))}
                      </select>
                    </div>
                   
                    <div class="form-group col-sm-6 flex-column d-flex">
                      <div class="form-group">
                        <label class="form-control-label px-3">
                          Upload image
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <p>{percent} "% done"</p>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-12 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Description
                        <span class="text-danger"> *</span>
                      </label>{" "}
                      <textarea
                      required
                        placeholder="Describe about your complaint"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />{" "}
                    </div>
                  </div>

                  <div class="row justify-content-end">
                    <div class="form-group col-sm-6">
                      {" "}
                      <button type="submit" class="btn button btn-primary">
                        Submit
                      </button>{" "}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <ToastContainer/>
    </div>
  );
}
