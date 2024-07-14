import { Link } from "react-router-dom";
import './NotFound.css'

const NotFound = () => {
    return(
        <section className="not-found">
            <h3 className="not-found-title">404</h3>
            <h1 className="not-found-text">Page Not Found :( </h1>
            <Link className="not-found-link" to="/"> 
                Go To Home Page 
            </Link>
        </section>
    )
}

export default NotFound;