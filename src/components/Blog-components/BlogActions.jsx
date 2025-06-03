// components/Blog/BlogActions.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { handleLikeToggle } from '../../utils/FireBaseUtils';

const BlogActions = ({ blog, currentUser }) => {
  const onLike = () => handleLikeToggle(blog.id, blog.likes || [], currentUser.uid);

  return (
    <div className="blog-post-action">

      <div className="blog-post-btn">
        <button className='blog-post likes-btn' onClick={onLike}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <span className='likes-btn'>{blog.likes?.length || 0}</span>
      </div>

      <div className="blog-post-btn">
        <button className='blog-post cmt-btn'>
          <FontAwesomeIcon icon={faComment} />
        </button>
        <span>{blog.comments?.length || 0}</span>
      </div>

    </div>
  );
};

export default BlogActions;
