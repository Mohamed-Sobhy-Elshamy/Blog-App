import { useState } from 'react';
import './UpdateComment.css';
import { toast } from 'react-toastify';

// connect front with back
import { useDispatch } from "react-redux"
import { updateComment } from '../../redux/apiCalls/commentApiCall';

const UpdateCommentModel = ({setUpdateComment, commentForUpdate}) => {
    // connect front with back
    const dispatch = useDispatch();

    const [text, setText] = useState(commentForUpdate?.text)


    // form submit handler 
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation 
        if(text.trim() === "") {
            return toast.error("Please Write Something")
        }
        // console.log({text})
        // connect front with back
        dispatch(updateComment(commentForUpdate?._id, {text})) // text from state
        setUpdateComment(false); // عشان يقفل ال model post 
    }

    return(
        <div className="update-Comment">
            <form onSubmit={formSubmitHandler} className="update-Comment-form">
                <abbr title='close'>
                    <i onClick={() => setUpdateComment(false)} class="bi bi-x-circle-fill update-Comment-form-close"></i>
                </abbr>
                <h1 className="update-Comment-title">Edit Comment</h1>
                <input 
                type="text" 
                className='update-Comment-input' 
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <button type='submit' className="update-Comment-btn">Edit Comment </button>
            </form>
        </div>
    )
}

export default UpdateCommentModel;