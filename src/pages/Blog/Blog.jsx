import './Blog.css';
import useAppState from '../../hooks/useAppState';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { blogs } = useAppState();
  const { id } = useParams();
  const blog = blogs.find((item) => item._id === id);

  return (
    <div className='blog-page-container'>
      <div className='blog-title'>
        <h4>{blog.title}</h4>
        <p>
          By: {blog.author} || Date: {blog.createdAt.slice(0, 10)}
        </p>
      </div>
      <div>
        <img className='blog-image' src={blog.image} alt='travel image' />
      </div>
      <div className='blog-content'>
        <h5>{blog.region}</h5>
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default Blog;
