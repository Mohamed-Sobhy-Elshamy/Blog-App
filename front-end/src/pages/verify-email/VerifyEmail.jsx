import { Link, useParams } from "react-router-dom";
import "./verify-email.css";

// connect front with back 
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/AuthApiCall";

const VerifyEmail = () => {
    // const isEmailVerified = true; // هناخدها بعدين from redux

    // connect front with back 
    const dispatch = useDispatch();
    const { isAccountVerified } = useSelector(state => state.auth)

    const { userId, token } = useParams()
    useEffect(() => {
        dispatch(verifyEmail(userId, token)) // محتاجين user id, token => from url (link)
    }, [userId, token])

// {if?<> : <>}
    return( 
        <section className="verify-email">
            {isAccountVerified ? 
            <>
            <i class="bi bi-patch-check-fill verify-email-icon"></i>
                <h1 className="verify-email-title">
                    Your email address has been successfully verified 
                </h1>
                <Link to="/login" className="verify-email-link" >
                    Go to login page
                </Link>
            </> 
                : 
            <> 
                <h1 className="verify-email-not-found">
                    <span>404 </span>
                    Not Found 
                </h1>
                
                
            </>
            }
        </section>
    )
}

export default VerifyEmail;