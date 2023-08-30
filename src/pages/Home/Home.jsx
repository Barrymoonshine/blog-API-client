import './Home.css';
import useFetch from '../../hooks/useFetch';
import Blog from '../../components/Blog/Blog';
import { Link } from 'react-router-dom';

const Home = () => {
  const {
    loading,
    error,
    data = [],
  } = useFetch('https://ancient-water-2934.fly.dev/blogs', { method: 'GET' });

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
      {loading && <p>Loading...</p>}
      {data &&
        data.map((blog) => (
          <Blog
            key={blog._id}
            author={blog.author}
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
