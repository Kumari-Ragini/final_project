import { useEffect, useState } from "react";
import { db, storage } from "./Firebase";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
export default function Makecomplaint() {
  const param = useParams();
  const nav = useNavigate();
  const [id, setId] = useState(param.id);

  const [name, setName] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [contact, setcontact] = useState("");
  const [complainttype, setComplainttype] = useState("");
  const [description, setDescription] = useState("");
  const [taskcompletionStatus, settaskcompletionStatus] = useState("");

  const [prevFileName, setPrevFileName] = useState();
  const [image, setImage] = useState();

  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    getSingleComplaintData();
  }, []);

  const getSingleComplaintData = async () => {
    const complaintDocRef = doc(db, "complaints", id);
    const complaintSnap = await getDoc(complaintDocRef);

    if (complaintSnap.exists()) {
      let complaintData = complaintSnap.data();
      // console.log("Document data:", taskSnap.data());
      setName(complaintData.name);
      setHostel(complaintData.hostel);
      setRoom(complaintData.room);
      setcontact(complaintData.contact);
      setComplainttype(complaintData.complainttype);
      setDescription(complaintData.description);
      setPrevFileName(complaintData.fileName);
      setImage(complaintData.image);
      settaskcompletionStatus(complaintData.status);
    } else {
      console.log("No such document!");
    }
  };

  const handleform = async (e) => {
    e.preventDefault();
    if (!!file) uploadFile();
    else updateData();
  };

  async function updateData() {
    const complaintDocRef = doc(db, "complaints", id);
    try {
      let data = {
        name: name,
        hostel: hostel,
        room: room,
        contact: contact,
        complainttype: complainttype,
        description: description,
        image: imageUrl,
        taskcompletionStatus: taskcompletionStatus,
      };
      if (!!imageUrl) {
        data.image = imageUrl;
        data.fileName = fileName;
      }
      await updateDoc(complaintDocRef, data);
      nav("/table");
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    if (!!imageUrl) {
      deletePreviousImage();
      updateData();
    }
  }, [imageUrl]);
  function deletePreviousImage() {
    const fileRef = ref(storage, "files/" + prevFileName);
    deleteObject(fileRef)
      .then(function () {
        // File deleted successfully
        console.log("Prev File Deleted");
      })
      .catch(function (error) {
        // Some Error occurred
        console.log("Error deleting previous image");
      });
  }
  const uploadFile = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const fileName = `${Date.now()}-${file.name}`;
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
          setImageUrl(url);
          setFileName(fileName);
          setImage(url);
        });
      }
    );
  };
  return (
    <div>
      <div>
        <div class="container-fluid px-1 py-5 mx-auto formbg ">
          <div class="row d-flex justify-content-center">
            <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
              <h3 className="fontstyle text-dark"> Update Complaint data</h3>
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
                      <input
                        type="text"
                        placeholder=""
                        value={complainttype}
                        onChange={(e) => {
                          setComplainttype(e.target.value);
                        }}
                      />
                    </div>
                    {/* <div class="form-group col-sm-6 flex-column d-flex">
                      <label for="dropdown">Select category</label>
                      <select className="form-control">
                        <option class="hidden selected disabled">select</option>
                        <option value="option1">Equipment Maintenance</option>
                        <option value="option2">Equipment installation</option>
                        <option value="option3">Electrical Wiring</option>
                        <option value="option3">Other</option>
                      </select>
                    </div> */}
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
                    <div class="form-group col-9 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Description
                        <span class="text-danger"> *</span>
                      </label>{" "}
                      <textarea
                        placeholder="Describe about your complaint"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />{" "}
                    </div>
                  </div>
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-sm-6 flex-column d-flex">
                      {" "}
                      <label class="form-control-label px-3">
                        Status<span class="text-danger"> </span>
                      </label>{" "}
                      <input
                        type="text"
                        placeholder=""
                        value={taskcompletionStatus}
                        onChange={(e) => {
                          settaskcompletionStatus(e.target.value);
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
      </div>
    </div>
  );
}
