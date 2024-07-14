// كل ال parameters اللي موجودة ف ال url هنلاقيها ف ال hook دي
import {Link, useNavigate, useParams} from 'react-router-dom'

import './PostDetails.css'
import { useEffect, useState } from 'react';

import {toast, ToastContainer} from "react-toastify"
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';

// import from sweet alert 
import swal from "sweetalert"
import UpdatePostModel from './UpdatePostModel';


// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from '../../redux/apiCalls/postApiCall';


const PostDetails = () => {
    // connect front with back 
    const dispatch = useDispatch();
    const { post } = useSelector(state => state.post);

    // عاوز اشيل زرار ال update & delete & select image 
    // عشان مش اي user يقدر يعدل ع post التاني
    const {user} = useSelector(state => state.auth);

    // const params = useParams();
    // console.log(params)

    const {id} = useParams();
    // p as a post 
    // parseInt يحول ال string to number



    // حل مشكلة ان ال page بتفتح من الاخر
    useEffect(() => {
        window.scrollTo(0, 0);
        // connect front with back
        dispatch(fetchSinglePost(id))
    }, [id])


    const [file, setFile] = useState(null);
    // Update Image Submit Handler =>> Upload
    const UpdateImageSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(!file) {
            return toast.warning("There Is NO FILE :(")
        }
        // console.log("Image Uploaded Successfully !!")
        const formData = new FormData();
        formData.append("image", file); // take this file in state
        dispatch(updatePostImage(formData, post?._id)); // form data == image 
    }


    const navigate = useNavigate()
    // Delete Post Handler => from =>>> SweetAlert
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this pos!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((isOk) => {
            if (isOk) {
                dispatch(deletePost(post?._id));
                navigate(`/profile/${user?._id}`)
            }
        });
    }

    // new state =>> post
    const [updatePost, setUpdatePost] = useState(false);




return(
    <section className="post-details">
        <ToastContainer theme='colored' position='top-center' />
        <div className="post-details-images-wrapper">
            <img src={ file? URL.createObjectURL(file) : post?.image.url} alt="" className="post-details-image" />
                {/* هنعمل form عشان نعمل update to image  */}

                {user?._id === post?.user?._id && (
                    <form onSubmit={UpdateImageSubmitHandler} className="update-post-image-form">
                        <label htmlFor="file" className="update-post-label">
                            <i class="bi bi-image-fill"></i>
                            Select New Image 
                        </label>
                        <input style={{display: "none"}} type="file" name="file" id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit">Upload</button>
                    </form>
                )}

        </div>
        <h1 className="post-details-title">{post?.title}</h1>
        <div className="post-details-user-info">
            <img src={post?.user?.profilePhoto?.url} alt="" className="post-details-user-image" />
            <div className="post-details-user">
                <strong>
                    <Link to={`/profile/${post?.user?._id}`}>Name:- {post?.user?.username}</Link>
                </strong>
                <span>Date:- {new Date(post?.createdAt).toDateString()}</span>
            </div>
        </div>
        <p className="post-details-description">
            {post?.description}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
                voluptatem amet fugit, facilis commodi porro, 
                dolor beatae maxime non sit nostrum quos mollitia architecto tenetur delectus quisquam? Enim, sit deserunt?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
                voluptatem amet fugit, facilis commodi porro, 
                dolor beatae maxime non sit nostrum quos mollitia architecto tenetur delectus quisquam? Enim, sit deserunt?
        </p>
        <div className="post-details-icon-wrapper">
            <div>
                {
                    user && (
                        <i 
                        className={
                            post?.likes.includes(user?._id) 
                            ? "bi bi-hand-thumbs-up-fill" 
                            : "bi bi-hand-thumbs-up"
                        }
                        onClick={() => dispatch(toggleLikePost(post?._id))}
                        ></i>
                    )
                }
                    {/* like icon  */}
                <small>{post?.likes.length} Likes </small>
            </div>
            
                    {user?._id === post?.user?._id && (
                        <div>
                                {/* delete && update icon  */}
                            <i onClick={() =>setUpdatePost(true)} className="bi bi-pencil-square"></i>
                            <i onClick={deletePostHandler} className="bi bi-trash3-fill"></i>
                        </div>
                    )}

        </div>

            {
                user ? <AddComment postId={post?._id} />  : 
                <p>
                    To write a comment you should login first  
                </p>
            }

        
        <CommentList comments={post?.comments} />
        {updatePost && <UpdatePostModel post={post} setUpdatePost={setUpdatePost} /> }

    </section>
)
}

export default PostDetails;