import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import './Admin.css';

const AdminDashboard = () => {
    return(
        <section className="admin-dashboard">
            <AdminSidebar />
            <AdminMain />
        </section>
    )
}

// admin sidebar && admin main

export default AdminDashboard;