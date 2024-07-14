import './forms.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// connect front with back
import { useDispatch } from "react-redux"
import { forgotPassword } from '../../redux/apiCalls/passwordApiCall';


const ForgorPassword = () => {
    // connect front with back
    const dispatch = useDispatch();

    // validation
    const [email, setEmail] = useState("");

    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(email.trim() === "") return toast.error("Email is required")

        // console.log({ email })
        // connect front with back
        dispatch(forgotPassword(email))
    }


    return(
        <section className="form-container">
            <ToastContainer theme='colored'  />
            <h1 className="form-title">Forgot Password </h1>
            <form onSubmit={formSubmitHandler} className="form">


                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email   
                    </label>
                    <input 
                    type="email" 
                    className="form-input" 
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                
                <button type="submit" className='form-btn'>
                    Submit  
                </button>
            </form>
        </section>
    )
}

export default ForgorPassword;