import {Link} from 'react-router-dom';

const AdminSidebar = () => {
    return(
    <div className="admin-sidebar">
        <Link to="/admin-dashboard" className='admin-sidebar-title'>
            <i class="bi bi-layout-text-sidebar"></i>
            Dashboard 
        </Link>
        <ul className="admin-dashboard-list">
            <Link className='admin-sidebar-link' to="/admin-dashboard/users-table">
                <i class="bi bi-file-earmark-person-fill"></i>
                Users 
            </Link>

            <Link className='admin-sidebar-link' to="/admin-dashboard/posts-table">
                <i class="bi bi-stickies-fill"></i>
                Posts  
            </Link>

            <Link className='admin-sidebar-link' to="/admin-dashboard/categories-table">
                <i class="bi bi-tags-fill"></i>
                Categories  
            </Link>

            <Link className='admin-sidebar-link' to="/admin-dashboard/comments-table">
                <i class="bi bi-chat-left-text-fill"></i>
                Comments 
            </Link>
        </ul>
    </div>
    )
}

export default AdminSidebar;