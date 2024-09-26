import { db } from '../admin/Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, Timestamp, doc, deleteDoc } from "firebase/firestore"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageCategory() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const navi = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") == null) {
            navi("/login")
        }
    }, [])
    const [testdata, settestdata] = useState([])
    useEffect(() => {
        // console.log("HELLO")
        const q = query(collection(db, 'categories'), orderBy('created', 'asc'))
        onSnapshot(q, (querySnapshot) => {
            //  
            settestdata(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            // console.log(testdata)
        })
    }, [])
    const getdate = (datetime) => {
        const date = (datetime.toDate().toString())
        const s = date.split(' ');
        // console.log(s)
        const returndate = s[2] + "-" + s[1] + "-" + s[3]
        return returndate
    }
    const deletehandle = async (id) => {
        // alert(id)
        const taskDocRef = doc(db, 'categories', id)
        try {
            await deleteDoc(taskDocRef)
        } catch (err) {
            alert(err)
        }
    }
    return (
        <>
            <div>
                <section class="contact_section layout_padding ">
                    <div class="container my-auto ">
                        <div class="heading_container">
                            <div className="mx-auto">
                                <h2>Manage Category</h2>
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
                    <Link to={'/addcategory'} className='btn btn-outline-dark px-5'>Add</Link>
                        <div class="row">
                            <div class="col-md-12 mx-auto mt-5">
                                <table className="table table-bordered table-striped text-uppercase">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Category Name</th>
                                            <th>IMAGE</th>
                                            <th>Created at</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testdata.map((newdata, index) => (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{newdata.data.categoryName}</td>
                                                <td><img src={newdata.data.image} width={'60px'} /></td>
                                                <td>{getdate(newdata.data.created)}</td>
                                                <td><Link to={'/updatecategory/' + newdata.id}><button className='btn btn-success'>Edit</button> </Link>
                                                    <button className='btn btn-danger' onClick={() => {
                                                        const confirmbox = window.confirm("Do you want to delete ?")
                                                        if (confirmbox === true) {

                                                            deletehandle(newdata.id)
                                                        }
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
