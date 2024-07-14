import './forms.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// connect front with back
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getResetPassword, resetPassword } from '../../redux/apiCalls/passwordApiCall';


const ResetPassword = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { isError } = useSelector(state => state.password);

    const { userId, token } = useParams();

    useEffect(() => {
        dispatch(getResetPassword(userId, token))
    }, [userId, token])


    // validation
    // لازم ال user يدينا new password 
    const [password, setPassword] = useState("");
    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(password.trim() === "") return toast.error("Password is required")
        // console.log({ password})
        // Connect front with back
        dispatch(resetPassword(password, {userId, token})) // user = {userId, token}
    }


    return(
        <section className="form-container">
            <ToastContainer theme='colored'  />
            {
                isError ? 
                <h1>Not FOund</h1>
                :
                <>
                <h1 className="form-title">Reset Password</h1>
                    <form onSubmit={formSubmitHandler} className="form">
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                New Password    
                            </label>
                            <input 
                            type="password" 
                            className="form-input" 
                            id="password"
                            placeholder="Enter Your New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='form-btn'>
                            Submit  
                        </button>
                    </form>
            </>
            }
        </section>
    )
}

export default ResetPassword;