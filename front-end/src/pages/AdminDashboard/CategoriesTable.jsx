import AdminSidebar from "./AdminSidebar";
import './admin-table.css'
import swal from 'sweetalert';

// // i need post => from dummyData
// import {categories} from '../../dummyData'

// connect front with back 
/*
نعمل fetch all categories from server 
    categoryApiCall.js 
*/
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";


const CategoriesTable = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])


    // delete category handelr
    const deleteCategoryHandler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((isOk) => {
            if (isOk) {
            dispatch(deleteCategory(categoryId))
            } 
        });
    }



    return(
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="same-bg">Count</th>
                            <th className="same-bg">Category Title</th>
                            <th className="same-bg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={item._id}> 
                                <td className="item-count">{index + 1}</td>
                                <td>
                                    <b>{item.title}</b>
                                </td>
                                <td>
                                    <div className="table-btn-group">
                                        <button onClick={() => deleteCategoryHandler(item._id)}>
                                            Delete Category
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default CategoriesTable;