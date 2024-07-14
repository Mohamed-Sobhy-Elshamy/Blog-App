import { useState } from "react";
import {toast, ToastContainer} from 'react-toastify';

// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { createCategory } from "../../redux/apiCalls/categoryApiCall";


const AddCategoryForm = () => {
    // connect front with back
    const dispatch = useDispatch();



    const [title,setTitle] = useState("")

        // form submit handler 
        const formSubmitHandler = (e) => {
            e.preventDefault();
            // validation
            if(title.trim() === "") {
                return toast.error("Category Title Is Required!");
            }
            // console.log({title})
            // connect front with back
            // run to createCategory from apiCall
            dispatch(createCategory({ title })) // new category = title from state (useState)
            setTitle("")
        }


    return(
        <div className="add-category">
            <ToastContainer theme="colored" />
            <h4 className="add-category-title">Add New Category</h4>
            <form onSubmit={formSubmitHandler} className="add-category-form">
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input 
                    type="text" 
                    id="title"
                    placeholder="Enter Category Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className="add-category-btn" type="submit">
                        Add 
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCategoryForm;