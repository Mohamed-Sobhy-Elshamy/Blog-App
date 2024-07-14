import RoofingIcon from '@mui/icons-material/Roofing';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import {Link} from 'react-router-dom'
import {useSelector} from "react-redux"

const Navbar = ({toggle, setToggle}) => {
    const {user} = useSelector((state) => state.auth);

    return(
        <nav style={{clipPath: toggle && " polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} className="navbar">
                <ul className='nav-links'>
                    <Link to="/" onClick={() => setToggle(false)} className='nav-link'>
                        <RoofingIcon className='icon'  /> Home
                    </Link>
                    <Link to="/posts" onClick={() => setToggle(false)} className='nav-link'>
                        <DynamicFeedIcon className='icon' /> Posts
                    </Link>

                    {user && (
                        <Link to="/create" onClick={() => setToggle(false)} className='nav-link'>
                            <NoteAddIcon className='icon' /> Create
                        </Link>
                    )}

                    {
                        user?.isAdmin && (
                            <Link to="/admin-dashboard" onClick={() => setToggle(false)} className='nav-link'>
                                <AdminPanelSettingsIcon className='icon' /> Admin-Dashboard
                            </Link>
                        )
                    }

                    
                </ul>
            </nav>
    )
}

export default Navbar;