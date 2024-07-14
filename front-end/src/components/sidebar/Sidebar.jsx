import './Sidebar.css'
import {Link} from 'react-router-dom';

// connect front with back 
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';

const Sidebar = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return(
        <div className="sidebar">
            <h3 className="sidebar-title">CATEGORIES</h3>
            <ul className="sidebar-links">
                {categories.map((category) => (
                    <Link to={`/posts/categories/${category.title}`} key={category._id} className='sidebar-link'>
                        {category.title}
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;