import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import './admin-table.css'
import swal from 'sweetalert'

// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";


const UsersTable = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { profiles, isProfileDeleted } = useSelector(state => state.profile)

    /*
    مع كل delete to user لازم نبعت req to server لازم نعمل get all profiles 
    use =>>>>>>>> isProfileDeleted
    */

    useEffect(() => {
        dispatch(getAllUsersProfile())
    }, [isProfileDeleted])

    // delete user handelr
    const deleteUserHandler = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((isOk) => {
            if (isOk) {
                dispatch(deleteProfile(userId))
            }   
        });
    }



    return(
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="same-bg">Count</th>
                            <th className="same-bg">User</th>
                            <th className="same-bg">Email</th>
                            <th className="same-bg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((item, index) => (
                            <tr key={item._id}>
                                <td className="item-count">{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                        src={item.profilePhoto?.url} 
                                        alt="profile_photo" 
                                        className="table-user-image"
                                        />
                                        <span className="table-username">{item.username}</span>
                                    </div>
                                </td>
                                <td className="email">{item.email}</td>
                                <td>
                                    <div className="table-btn-group">
                                        <button>
                                            <Link to={`/profile/${item._id}`}>View Profile</Link>
                                        </button>
                                        <button onClick={() => deleteUserHandler(item?._id)}>Delete User</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default UsersTable;