import { useState } from 'react';
import './UpdateProfileModel.css'

// عندي user عاوز يعمل تعديل ع your profile 
// const user = {
//     username: "Mohamed Elshamy",
//     bio: "Hello There"
// }

// لازم اخد ال profile from profile page // اديله profile as a prop

// connect front with back
import { useDispatch } from "react-redux"
import { updateProfile } from '../../redux/apiCalls/profileApiCall';

const UpdateProfileModel = ({setUpdateProfile, profile}) => {
    // connect front with back
    const dispatch = useDispatch();

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");


    // form submit handler 
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const updatedUser = {username, bio}
        if(password.trim() !== "") {
            updatedUser.password = password;
        }
        // console.log(updatedUser);
        // connect front with back 
        dispatch(updateProfile(profile?._id, updatedUser)) // user id && profile;

        // لازم بعد ما يعمل update لازم يقفل ال update profile model
        setUpdateProfile(false)
    }


    return(
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
            <abbr title="close">
            <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
            ></i>
        </abbr>
                <h1 className="update-profile-title">Update Your Profile </h1>
                <input 
                type="text" 
                className='update-profile-input' 
                value={username}
                placeholder='User Name'
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                type="text" 
                className='update-profile-input' 
                value={bio}
                placeholder='Bio'
                onChange={(e) => setBio(e.target.value)}
                />
                <input 
                type="password" 
                className='update-profile-input' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                />
                <button type='submit' className="update-profile-btn">Update Profile </button>
            </form>
        </div>
    )
}

export default UpdateProfileModel;