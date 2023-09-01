import './Home.css';
import BlogCard from '../../components/BlogCard/BlogCard';
import { Link } from 'react-router-dom';
import useAppState from '../../hooks/useAppState';

const Home = () => {
  const { isLoading, error, blogs } = useAppState();

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
      {error && <p>Error! {error}</p>}
      {isLoading && <p>Loading...</p>}
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
