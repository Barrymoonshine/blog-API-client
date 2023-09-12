import './Home.css';
import BlogCard from '../../components/BlogCard/BlogCard';
import { Link, useLocation } from 'react-router-dom';
import useBlogsState from '../../hooks/useBlogsState';
import useBlogsDispatch from '../../hooks/useBlogsDispatch';
import { useEffect } from 'react';

const Home = () => {
  const { blogs, blogsLoading, blogsError } = useBlogsState();
  const { getBlogs } = useBlogsDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log('handle route change here', location);
    getBlogs();
  }, [location]);

  return (
    <div className='home-container'>
      <div className='welcome-container'>
        <div>
          <h4>Create the travel blog of your dreams</h4>
          <p>
            Sign up for a free account today, to create and edit your very own
            travel blog!
          </p>
          <Link to='/sign-up' style={{ textDecoration: 'none' }}>
            Sign up
          </Link>
        </div>
        <div>
          <img
            className='welcome-image'
            src='./images/travel-blog.jpg'
            alt='travel blog'
          />
        </div>
      </div>
      {blogsError && <p>Error! {blogsError}</p>}
      {blogsLoading && <p>Loading...</p>}
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            caption={blog.caption}
            region={blog.region}
            image={blog.image}
            createdAt={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Home;
