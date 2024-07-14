import { categoryActoins } from "../slices/categorySlice";
import request from "../../utils/Request";
import {toast} from "react-toastify";

// fetch all categories
export function fetchCategories() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/categories`);
            dispatch(categoryActoins.setCategories(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} //نعمل run to this function in side bar page  
// && run in admin-dashboard page 


// create category 
export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post(`/api/categories`, newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoryActoins.addCategory(data))
            toast.success("Category creaded successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in  add category form 


// Delete category
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoryActoins.deleteCategory(data.categoryId));
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

