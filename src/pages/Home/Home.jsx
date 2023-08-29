import './Home.css';
import useFetch from '../../hooks/useFetch';
import Blog from '../../components/Blog/Blog';

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
          <h4>Want to create the travel blog of your dreams?</h4>
          <p>
            Sign up for a free account today, to create and edit your very own
            travel blog!
          </p>
          <button className='register-button'>Register</button>
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
        data.map((item) => (
          <Blog
            key={item._id}
            title={item.title}
            caption={item.caption}
            region={item.region}
            image={item.image}
          />
        ))}
    </div>
  );
};

export default Home;
