import './Posts.css';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar'

import Pagination from '../../components/pagination/Pagination';
import { useEffect, useState } from 'react';

// connect front with back
import {useDispatch, useSelector} from "react-redux"
import { fetchPosts, getPostsCount } from '../../redux/apiCalls/postApiCall';

const POST_PER_PAGE = 3;

const Posts = () => {
    // connect front with back 
    const dispatch = useDispatch();
    const { postsCount, posts } = useSelector(state => state.post)

    const [currentPage, setCurrentPage] = useState(1);
    const pages = Math.ceil(postsCount / POST_PER_PAGE)



    // عشان لما بدوس ع see all posts 
    // بيجيب لي صفحة ال posts بس من تحت
    useEffect(() => {
        dispatch(fetchPosts(currentPage))
        window.scrollTo(0, 0)
    }, [currentPage])
    // يعني لم بتفتح ال component ده || this page 
    // يجيب لي ا page من فوووق

    useEffect(() => {
        dispatch(getPostsCount())
    }, []) // عايزين نعمل run مرة واحدة لل getPostsCount


    return(
        <>
            <section className="posts-page">
                <PostList posts={posts} />
                <Sidebar />
            </section>
            <Pagination 
            pages={pages} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default Posts