import {Link} from 'react-router-dom';
import './posts.css'


const PostItem = ({post, username, userId}) => {
    // connect front with back
    const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`

return(
    <div className="post-item">
        <div className="post-item-image-wrapper">
            <img src={post?.image?.url} alt="" className="post-item-image" />
        </div>
        <div className="post-item-info-wrapper">
            <div className="post-item-info">
                <div className="post-item-author">
                    <strong>Author: </strong>
                    <Link 
                    className='post-item-username' 
                    to={profileLink}
                    >
                        { username? username : post?.user?.username}
                    </Link>
                    {/* <p>{ username? username : post?.user.username}</p> */}
                </div>
                <div className="post-item-date">
                    {new Date(post?.createdAt).toDateString()}
                </div>
            </div>
            <div className="post-item-details">
                <h2 className="post-item-title">{post?.title}</h2>
                <Link to={`/posts/categories/${post.category}`} className='post-item-category'>
                    <h3>{post?.category}</h3>
                </Link>
            </div>
            <p className="post-item-description">
                {post?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Non animi sed soluta doloribus ratione illum impedit quaerat,
                obcaecati debitis, nobis ex fuga nam sint quasi? Dolorum earum esse ..
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Non animi sed soluta doloribus ratione illum impedit quaerat,
                obcaecati debitis, nobis ex fuga nam sint quasi? Dolorum earum esse 
            </p>
                <Link className='post-item-link' to={`/posts/details/${post?._id}`}>
                    Read More...
                </Link>
            </div>
    </div>
)
}

export default PostItem;