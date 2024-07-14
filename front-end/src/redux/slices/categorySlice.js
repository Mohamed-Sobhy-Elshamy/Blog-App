import { createSlice } from "@reduxjs/toolkit"

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload
        },
        // create category 
        addCategory(state, action) {
            state.categories.push(action.payload)
        },
        // delete category 
        deleteCategory(state, action) {
            state.categories = state.categories.filter(c => c._id !== action.payload)
        }
    }
})

const categoryActoins = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
// exports
export { categoryActoins, categoryReducer }