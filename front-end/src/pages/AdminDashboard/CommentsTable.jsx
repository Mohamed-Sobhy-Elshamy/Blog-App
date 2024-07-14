
import AdminSidebar from "./AdminSidebar";
import './admin-table.css'
import swal from 'sweetalert';

// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";


const CommentsTable = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.comment);

    useEffect(() => {
        dispatch(fetchAllComments())
    }, [])


    // delete user handelr
    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((isOk) => {
            if (isOk) {
            dispatch(deleteComment(commentId))
            }
        });
    }



    return(
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="same-bg">Count</th>
                            <th className="same-bg">User</th>
                            <th className="same-bg">Comment</th>
                            <th className="same-bg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((item, index) => (
                            <tr key={item._id}>
                                <td className="item-count">{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                        src={item.user?.profilePhoto?.url} 
                                        alt="profile_photo" 
                                        className="table-user-image"
                                        />
                                        <span className="table-username">
                                            {item.user?.username}
                                        </span>
                                    </div>
                                </td>
                                <td className="email">
                                    {item.text}
                                </td>
                                <td>
                                    <div className="table-btn-group">
                                        <button onClick={() => deleteCommentHandler(item._id)}>Delete Comment</button>
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

export default CommentsTable;