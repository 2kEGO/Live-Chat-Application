import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import "../../style/Blog/Blog.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogData);
      console.log(blogData)
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      {blogs.map((blog) => (
        <div className="blog-container" key={blog.id}>
          <div className="blog-wrapper">

            <div className="blog-post-image">
              <span className='display-userName'>{blog.userName?.charAt(0).toUpperCase()}</span>
            </div>

            <div className="blog-content-container">

              <div className="blog-post-userdisplay">
                <span className='username'>{blog.userName}</span>
              </div>

              <div className="blog-content">
                <span className='blog-content'>{blog.content}</span>
              </div>
              
              <div className="blog-post-action">

                <div className="blog-post-btn">
                  <button blog-post-likes-btn>
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{blog.likes}</span>
                  </button>
                </div>

                <div className="blog-post-btn">
                  <button className='blog-post-cmt-btn'>
                    <FontAwesomeIcon icon={faComment} />
                    <span>{blog.comments?.length || 0}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      ))}
    </>
  );
};

export default BlogContent;
