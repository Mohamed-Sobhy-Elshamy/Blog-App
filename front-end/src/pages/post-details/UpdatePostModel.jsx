import { useEffect, useState } from 'react';
import './UpdatePostModel.css'
import { toast } from 'react-toastify';

// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from '../../redux/apiCalls/postApiCall';
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';


const UpdatePostModel = ({setUpdatePost, post}) => {
    // connect front with back
    const dispatch = useDispatch();
    // fetch categories
    const { categories } = useSelector(state => state.category )

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    // كده ال inputمش هيبقا فاضي  
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [category, setCategory] = useState(post.category);


    // form submit handler 
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation 
        if(title.trim() === "") {
            return toast.error("Post Title Is Required !")
        }
        if(category.trim() === "") {
            return toast.error("Post Category Is Required !")
        }
        if(description.trim() === "") {
            return toast.error("Post Description Is Required !")
        }
        // console.log({title, description, category})

        // connect front with back
        dispatch(updatePost({title, category, description}, post?._id)) // new post & post id
        setUpdatePost(false)
    }


    return(
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title='close'>
                    <i onClick={() => setUpdatePost(false)} class="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input 
                type="text" 
                className='update-post-input' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <select className='update-post-input'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">
                        Select A Category 
                    </option>
                    {
                        categories.map(category => (
                            <option key={category._id} value={category.title}>
                                {category.title}
                            </option>
                        ))
                    }
                </select>
                <textarea rows="5" className='update-post-textarea' 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <button type='submit' className="update-post-btn">Update Post </button>
            </form>
        </div>
    )
}

export default UpdatePostModel;