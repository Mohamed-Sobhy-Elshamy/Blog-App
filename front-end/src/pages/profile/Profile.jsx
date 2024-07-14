import './Profile.css';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import swal from 'sweetalert';
import UpdateProfileModel from './UpdateProfileModel';

// connect front with back
import {useDispatch, useSelector} from "react-redux"
import { deleteProfile, getUserProfile, uploadProfilePhoto } from '../../redux/apiCalls/profileApiCall';
import {useParams, useNavigate} from "react-router-dom"
import PostItem from '../../components/posts/PostItem';
import { Hourglass } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/AuthApiCall"


const Profile = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile)

    // المفروض ميشوفش ال upload photo & update profile
    const { user } = useSelector((state) => state.auth)

    const { id } = useParams();
useEffect(() => {
    // connect front with back 
    dispatch(getUserProfile(id));// user id =>> from params
    window.scrollTo(0, 0);
}, [id])


const navigate = useNavigate()
    // delete accunt 
    useEffect(() => {
        if(isProfileDeleted) {
            navigate('/')
        }
    }, [navigate, isProfileDeleted])



// submit handler => to your photo 
    const [file, setFile] = useState(null);

    // Form Submit Handler 
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(!file) return toast.warning("There Is NO FILE :(")
        // console.log("Image Uploaded !!")

        // connect front with back
        const formData = new FormData(); // new obj from class form data 
        formData.append("image", file); // key && value && file فيها الصورة 
        dispatch(uploadProfilePhoto(formData));
    }

    // Delete Account Handler 
    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover Profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((isOk) => {
            if (isOk) {
                dispatch(deleteProfile(user?._id));
                // and make logout
                dispatch(logoutUser())
            } 
        });
    }

    // updated profile 
    const [updateProfile, setUpdateProfile] = useState(false);

        // loading
        if(loading) {
            <div className='loading'>
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['red', '#72a1ed']}
                />
            </div>
        }



    return(
    <section className="profile">
        <ToastContainer theme='colored' />
        <div className="profile-header">
            <div className="profile-image-wrapper">
                <img 
                    src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url }
                    alt="image_profile" 
                    className="profile-image" 
                />
                {user?._id === profile?._id && (
                    <form onSubmit={formSubmitHandler}>
                        <abbr title='choose profile photo'>
                            <label 
                                htmlFor="file" 
                                className='bi bi-camera-fill upload-profile-photo-icon'></label>
                        </abbr>
                        <input 
                        style={{display: "none"}} 
                        type="file" name="file" id="file" 
                        onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button className='upload-profile-photo-btn' type="submit">Upload</button>
                    </form>
                )}
            </div>
            <h1 className="profile-username">{profile?.username} </h1>
            <p className="profile-bio">
                    {profile?.bio}
            </p>
            <div className="user-date-joined">
                <strong>Date Joined: </strong> 
                <span>
                    {new Date(profile?.createdAt).toDateString()}
                </span>
            </div>
            {user?._id === profile?._id && (
                <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                    <i class="bi bi-file-person-fill"></i>
                        Update Profile 
                </button>
            )}
        </div>
            {/* posts بتاع ال users  */}

        <div className="profile-post-list">
            <h1 className='profile-post-list-title'> {profile?.username} Post</h1>
            {/* <PostList posts={posts} /> */}
            {
                profile?.posts?.map(post => 
                        <PostItem key={post._id} post={post} 
                            username={profile?.username}
                            userId={profile?._id}
                        />
                    )
            }
        </div>
        {user?._id === profile?._id && (
            <button className="delete-account-btn"
            onClick={deleteAccountHandler}
            >
                    Delete Your Account 
            </button>
        )}

        {updateProfile && (
            <UpdateProfileModel profile={profile} setUpdateProfile={setUpdateProfile} />
        )}
    </section>
)
} // نعمل ال route

export default Profile;