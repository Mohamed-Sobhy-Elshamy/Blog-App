import PostList from '../../components/posts/PostList';
import './Home.css'
// import data
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';

// connect front with back 
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import { fetchPosts } from '../../redux/apiCalls/postApiCall';

const Home = () => {
    // connect front with back
    const dispatch = useDispatch(); // لازم اعمل run to dispatch in useEffect
    const {posts} = useSelector(state => state.post)
    useEffect(() => {
        dispatch(fetchPosts(1))
    }, [])

    return(
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title"><span>Welcome To BLOG
                        
                        </span></h1>
                    <h2 className="created-by">Created By:-<span className='elshamy'>Mohamed Elshamy </span></h2>
                    <h2 className="name">Is a Full-Stack <span className='dev'> DEV </span> eloper</h2>
                </div>
            </div>
            <div className="home-latest-post">Latest Post  </div>
            <div className="home-container">
                <PostList posts={posts} />
                <Sidebar  />
            </div>
                <div className="home-see-posts-link">
                    <Link to="/posts" className='home-link'>
                        See All Posts
                    </Link>
                </div>
        </section>
    )
}

export default Home;