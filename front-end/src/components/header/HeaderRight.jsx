import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';

// انا عاوز لما ال user يعمل login ميشوفش login & register link 
import {  useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../../redux/apiCalls/AuthApiCall';



const HeaderRight = () => {

    // connect front with back
    const {user} = useSelector(state => state.auth) // state = Store in redux 
// يعني ال user اللي عمل login  => موجود ف state.auth.user 


    // دي عشان لما ادوس ع الاسم ال dropdown تنفتح
    const [dropdown, setDropdown] = useState(false);


    // عاوز اعمل logout 
    const dispatch = useDispatch();

    // Logout Handler 
    const logoutHandler = () => {
        setDropdown(false);
        dispatch(logoutUser());
    }


    return(
            <div className="header-right">
                {user ? 
                <>
                    <div className="header-right-user-info">
                        <span className='header-right-username'
                        onClick={() => setDropdown(prev => !prev)}
                        >
                            {user.username}
                        </span>
                        <img src={user?.profilePhoto.url} 
                        alt='user_photo'
                        className='header-right-user-photo'
                        />
                        {dropdown &&(
                        <div className="header-right-dropdown">
                            <Link 
                            to={`/profile/${user?._id}`} 
                            className="header-dropdown-item"
                            onClick={() => setDropdown(false)}
                            >
                                <i class="bi bi-person-circle"></i>
                                <span>Profile </span>
                            </Link>
                            <div onClick={logoutHandler} className="header-dropdown-item">
                                <i class="bi bi-box-arrow-left"></i>
                                <span>Logout </span>
                            </div>
                        </div>
                        )}
                    </div>
                </> : (
                    <>
                        <Link to='/login' className="header-right-link">
                            <LockPersonIcon  className='icon'/> 
                            <span>Login</span>
                        </Link>
                        <Link to='/register' className="header-right-link">
                            <LockOpenIcon className='icon'/>
                            <span>Register</span>
                        </Link>
                    </>
                )
                
            }
            </div>
    )
}

export default HeaderRight;