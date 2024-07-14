import './forms.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// connect front with back 
import {useDispatch, useSelector} from "react-redux"
import { registerUser } from '../../redux/apiCalls/AuthApiCall';
import swal from "sweetalert"

const Register = () => {

    // connect front with back
    const dispatch = useDispatch();

    // انا عاوز ال register message
    const {registerMessage} = useSelector((state) => state.auth)

    // validation
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // validation
        if(username.trim() === "") return toast.error("Username is required")
        if(email.trim() === "") return toast.error("Email is required")
        if(password.trim() === "") return toast.error("Password is required")
        // console.log({username, email, password})

        dispatch(registerUser({username, email, password}))
    }

    const navigate = useNavigate();

    if(registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if(isOk) {
                // go to login page =>>> using = useNavigate 
                navigate("/login")
            }
        })
    }


    return(
        <section className="form-container">
            <ToastContainer theme='colored'  />
            <h1 className="form-title">Create a new account</h1>
            <form onSubmit={formSubmitHandler} className="form">

                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Username   
                    </label>
                    <input 
                    type="text" 
                    className="form-input" 
                    id="username"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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
                    placeholder="Enter Your Email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                
                <button type="submit" className='form-btn'>
                    Register  
                </button>
            </form>

            <div className="form-footer">
                Already have an account ? <Link to="/login">Login</Link>
            </div>
            
        </section>
    )
}

export default Register;