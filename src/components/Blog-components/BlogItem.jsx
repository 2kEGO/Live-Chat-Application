// components/Blog/BlogItem.jsx
import BlogActions from './BlogActions';

const BlogItem = ({ blog, currentUser }) => {
  const initial = blog.userName?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="blog-container">
      <div className="blog-wrapper">

        <div className="blog-post-image">
          <span className='display-userName'>{initial}</span>
        </div>

        <div className="blog-content-container">

          <div className="blog-post-userdisplay">
            <span className='username'>{blog.userName}</span>
          </div>

          <div className="blog-content">
            <span className='content'>{blog.content}</span>
          </div>

          <BlogActions blog={blog} currentUser={currentUser} />
          
        </div>

      </div>
    </div>
  );
};

export default BlogItem;
