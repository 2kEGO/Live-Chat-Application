// components/Blog/BlogContent.jsx
import { useEffect, useState, useContext } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase-config';
import BlogItem from './BlogItem';
import { AuthContext } from '../../context/AuthContext';
import "../../style/Blog/Blog.css";

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogData);
    });

    return () => unsubscribe();
  }, []);

  if (!currentUser) return null;

  if (blogs.length === 0) {
    return <p>No blog posts yet.</p>;
  }

  return (
    <>
      {blogs.map(blog => (
        <BlogItem key={blog.id} blog={blog} currentUser={currentUser} />
      ))}
    </>
  );
};

export default BlogContent;
