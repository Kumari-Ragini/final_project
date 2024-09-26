import { useEffect, useState } from "react"
import { db, storage } from '../admin/Firebase'
import { collection, updateDoc, doc, getDoc } from 'firebase/firestore'
import { useNavigate, useParams } from "react-router-dom"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function UpdateCategory() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const param = useParams()
    const navi = useNavigate()
    const [id, setId] = useState(param.id)
    const [categoryName, setCategoryName] = useState('')
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
        const taskDocRef = doc(db, 'categories', id)
        const taskSnap = await getDoc(taskDocRef);

        if (taskSnap.exists()) {
            let taskData = taskSnap.data();
            // console.log("Document data:", taskSnap.data());
            setCategoryName(taskData.categoryName)
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
        const taskDocRef = doc(db, 'categories', id)
        try {
            let data = {
                categoryName: categoryName,
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
            navi("/managecategory")
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
        <>
            <div>
                <section class="contact_section layout_padding ">
                    <div class="container my-auto ">
                        <div class="heading_container">
                            <div className="mx-auto">
                                <h2>Update Category</h2>
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
                                        <input className='form-control' type="text" onChange={(e) => { setCategoryName(e.target.value) }} value={categoryName}/>
                                    </div>
                                    <div>
                                        <label>Image</label>
                                        <input className='form-control' type="file" onChange={(e) => setFile(e.target.files[0])} />
                                        <img src={image} height={100}></img><br />
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
    )
}
