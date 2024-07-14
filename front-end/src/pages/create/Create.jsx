import { useState, useEffect } from 'react';
import './Create.css';
// عشان يطهر لي message => such as warnning 
import {toast, ToastContainer} from 'react-toastify';


// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../redux/apiCalls/postApiCall';
import { ThreeCircles } from "react-loader-spinner"
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';


const Create = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { loading, isPostCreated } = useSelector(state => state.post)
    const { categories } = useSelector(state => state.category)

    // عايزين ناخد ال values from this inputes 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);


    // form submit handler function 
    const formSubmitHandler = (e) => {
        e.preventDefault(); 
        // لو form فاضية وعملت submit 
        //  مش هيعمل reload to this page 

        // validation
        if(title.trim() === "") {
            return toast.error("Post Title Is Required")
        }
        if(category.trim() === "") {
            return toast.error("Post Category Is Required")
        }
        if(description.trim() === "") {
            return toast.error("Post Description Is Required")
        }
        if(!file) {
            return toast.error("Post Image Is Required")
        }

        /*
        عشان ال form دي فيها file يبقا مش form عادية
        يعني ما نقدرش نبعت json file to server 
        عشان فيها file image 
        لازم بعتها to server as a form data
        */
        const formData = new FormData();
        formData.append("image", file)
        // image = key
        // file = value
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category)

        // @@TODO - send data to the server 
        dispatch(createPost(formData)); 
        // كده هو هيبعت new post in database && save it
        // بعدها عاوزه يفتح لي home page 

        console.log({title, category, description, file})
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(isPostCreated) {
            navigate("/");
        }
    }, [isPostCreated, navigate])

    // بتاع ال category 
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])


    return(
        <section className="create-post">
            <ToastContainer theme='colored' />
            <h1 className="create-post-title">
                Create New <span>Post</span> 
            </h1>
            <form onSubmit={formSubmitHandler} className="create-post-form">
                <input 
                className="create-post-input" 
                type="text" 
                placeholder="Post Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                className="create-post-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">
                        Select A Category
                    </option>
                    {categories.map(category => 
                        <option key={category._id} value={category.title}>
                            {category.title}
                        </option>
                        )}
                </select>
                <textarea 
                className="create-post-textarea" 
                rows="5"
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <input 
                type="file" 
                name="file" 
                id="file" 
                className="create-post-upload" 
                onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" class="create-post-btn">
                    {
                        loading? (
                            <ThreeCircles
                                height="50"
                                width="50"
                                color="#4fa94d"
                                wrapperStyle={{textAlign: "center"}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="three-circles-rotating"
                                outerCircleColor="blue"
                                innerCircleColor="red"
                                middleCircleColor="white"
                                />
                        ) : "Create"
                    }
                </button>
            </form>
        </section>
    )
}

export default Create;