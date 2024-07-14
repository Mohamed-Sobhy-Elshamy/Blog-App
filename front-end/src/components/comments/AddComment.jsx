import './AddComment.css'
import {useState} from 'react'
import {toast} from 'react-toastify'

// connect front with back
import { useDispatch } from "react-redux"
import { createComment } from '../../redux/apiCalls/commentApiCall'


const AddComment = ({postId}) => {
    // connect front with back 
    const dispatch = useDispatch();


    // state
    const [text, setText] = useState("");

    // Form Submit
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(text.trim() === "") {
            return toast.error("Please Write Something ")
        }
        // console.log({text})
        // connect front with back
        dispatch(createComment({ text, postId })) // get new comment
        // ال server عاوز text & post id
        // post id as a prop from post details 
        setText("")
    }


    return(
        <form onSubmit={formSubmitHandler} className="add-comment">
            <input 
            type="text" 
            className='add-comment-input' 
            placeholder='Add A Comment' 
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' className='add-comment-btn'> 
                Comment 
            </button>
        </form>
    )
}

export default AddComment;