import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, where} from "firebase/firestore"
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

export default function ManageStudent() {
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
        const q = query(collection(db, 'users'),where("userType","==","user"), orderBy('created', 'asc'))
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
    return (
        <>
            <div>
                <section class="contact_section layout_padding ">
                    <div class="container my-auto ">
                        <div class="heading_container">
                            <div className="mx-auto">
                                <h2>Manage Student</h2>
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
                        <Link to={'/registeruser'} className='btn btn-outline-dark px-5'>Add</Link>
                        <div class="row">
                            <div class="col-md-12 mx-auto mt-5">
                                <table className="table table-bordered table-striped text-uppercase">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Profile</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Course</th>
                                            <th>Branch</th>
                                            <th>Sem</th>
                                            <th>Roll No.</th>
                                            <th>Room No.</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>Created at</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testdata.map((newdata, index) => 
                                        {
                                      
                                        return(

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={newdata.data.image} width={'60px'} /></td>
                                                <td>{newdata.data.name}</td>
                                                <td>{newdata.data.email}</td>
                                                <td>{newdata.data.course}</td>
                                                <td>{newdata.data.branch}</td>
                                                <td>{newdata.data.semester}</td>
                                                <td>{newdata.data.rollNumber}</td>
                                                <td>{newdata.data.roomNumber}</td>
                                                <td>{newdata.data.contact}</td>
                                                <td>{newdata.data.address}</td>
                                                <td>{getdate(newdata.data.created)}</td>
                                                <td>
                                                { newdata.data.userType == 'user' ?
                                                    <Link to={'/updatestudent/' + newdata.id}><button className='btn btn-success'>Edit</button> </Link> : '' }
                                                </td>
                                            </tr>
                                        )
                                        })}
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
