import PostList from '../../components/posts/PostList'
import './Category.css'
import {useParams, Link} from 'react-router-dom'
import { useEffect } from 'react';

// connect front with back
import {useDispatch, useSelector} from "react-redux"
import { fetchPostsBasedOnCategory } from '../../redux/apiCalls/postApiCall';


const Category = () => {
    // connect front with back
    const dispatch = useDispatch();
    const {postsCate} = useSelector(state => state.post);

    // عايزين ناخد ال category from params
    const {category} = useParams();

    // scroll to 
    useEffect(() => {
        // connect front with back
        dispatch(fetchPostsBasedOnCategory(category))

        window.scrollTo(0, 0)
    } ,[category])

    return(
        <section className="category">
            {postsCate.length === 0 ? 
            <>
                <h1 className="category-not-found">
                    Posts with <span>{category}</span> category not found 
                </h1>
                <Link className='category-not-found-link' to="/posts">
                    Go to posts page 
                </Link>
            </>
            :
            <>
            <h1 className="category-title">Posts Based On <span>{category}</span> </h1>
            <PostList posts={postsCate} />
            </>
            }
        </section>
    )
}

export default Category;