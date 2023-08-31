import './Blog.css';
import useAppState from '../../hooks/useAppState';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { blogs } = useAppState();
  const { id } = useParams();
  const blog = blogs.find((item) => item._id === id);

  return (
    <div>
      <div>
        <img className='travel-image' src={blog.image} alt='travel image' />
      </div>
      <div className='right-blog-container'>
        <h4>{blog.region}</h4>
        <h6>{blog.title}</h6>
        <p>{blog.caption}</p>
        <p className='blog-credits'>
          By: {blog.author}, Date: {blog.createdAt}
        </p>
      </div>
    </div>
  );
};

export default Blog;
