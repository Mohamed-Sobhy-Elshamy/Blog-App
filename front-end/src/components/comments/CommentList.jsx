import swal from 'sweetalert';
import './CommentList.css'
import { useState } from 'react';
import UpdateCommentModel from './UpdateCommentModel';

// connect front with back
import Moment from "react-moment";
import { useDispatch, useSelector} from "react-redux"
import { deleteComment } from '../../redux/apiCalls/commentApiCall';

const CommentList = ({comments}) => {
    // connect front with back
    const {user} = useSelector(state => state.auth);


        const dispatch = useDispatch()
        // Delete Comment Handler => from =>>> SweetAlert
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

        // new state 
        const [updateComment, setUpdateComment] = useState(false);
        // update comment 
        const [commentForUpdate, setCommentForUpdate] = useState(null);

        // update comment handler 
        const updateCommentHandler = (comment) => {
            setCommentForUpdate(comment);
            setUpdateComment(true);
        }
        /*
        اول حاجة ياخد comment from comment array => يديه to state 
        وبعدين يفتح ال model  
        نروح بقا نشغل ال handler in icon 
        */


    return(
        <div className="comment-list">
            <h3 className="comment-list-count">{comments?.length} Comments</h3>
            {comments?.map((comment) => (
                <div key={comment._id} className='comment-item'>
                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            {comment.username}
                        </div>
                        <div className="comment-item-time">
                            <Moment fromNow ago >
                                {comment.createdAt}
                            </Moment>{" "} ago
                        </div>
                    </div>
                    <p className="comment-item-text">
                        {comment.text}
                    </p>
                    
                        {user?._id === comment.user && (
                            <div className="comment-item-icon-wrapper">
                                <i onClick={() => updateCommentHandler(comment)} class="bi bi-pencil-fill"></i>
                                <i onClick={() => deleteCommentHandler(comment?._id)} class="bi bi-trash-fill"></i>
                            </div>
                        )}

                </div>
            ))}
            {updateComment && (
                <UpdateCommentModel 
                setUpdateComment={setUpdateComment} 
                commentForUpdate={commentForUpdate}
                /> // go to update comment model 
            )}
        </div>
    )
}

export default CommentList;