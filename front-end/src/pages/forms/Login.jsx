import { Link } from 'react-router-dom';
import './forms.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';


// imports from react redux 
// connect frontend with a backend
import {useDispatch} from "react-redux"
import { loginUser } from '../../redux/apiCalls/AuthApiCall';


const Login = () => {

    // validation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(email.trim() === "") return toast.error("Email is required")
        if(password.trim() === "") return toast.error("Password is required")
        // console.log({ email, password})

        // connect front with back
        dispatch(loginUser({email, password})) // يحتاج مني ال user
    }

    // connect front with back 
    // run to dispatch hook
    const dispatch = useDispatch(); // لازم نكتب كل ال api call => ف ال dispatch 


    return(
        <section className="form-container">
            <ToastContainer theme='colored'  />
            <h1 className="form-title">Login To Your Accout</h1>
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

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password   
                    </label>
                    <input 
                    type="password" 
                    className="form-input" 
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className='form-btn'>
                    Login 
                </button>
            </form>
            <div className="form-footer">
                Did you forgot your password ? <Link to="/forgot-password">Forgot Password</Link>
            </div>
        </section>
    )
}

export default Login;