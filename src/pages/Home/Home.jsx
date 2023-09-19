import './Home.css';
import BlogCard from '../../components/BlogCard/BlogCard';
import { Link } from 'react-router-dom';
import useBlogsState from '../../hooks/useBlogsState';
import useAuthState from '../../hooks/useAuthState';
import { getTopThreeLikedBlogs } from '../../helpers/helpers';
import useLikesState from '../../hooks/useLikesState';
import ReactLoading from 'react-loading';

const Home = () => {
  const { blogs, blogsLoading, blogsError } = useBlogsState();
  const { isLoggedIn, username } = useAuthState();
  const { likes } = useLikesState();

  const topThreeLikedBlogs =
    blogs && likes && getTopThreeLikedBlogs(blogs, likes);

  console.log('blogsLoading', blogsLoading);

  return (
    <div className='home-container'>
      <div className='welcome-container'>
        {isLoggedIn ? (
          <div>
            <h4>Welcome back {username}</h4>
            <h5>What would you like to do today?</h5>
            <p>The world is your lobster :-)</p>
          </div>
        ) : (
          <div>
            <h4>Create the travel blog of your dreams</h4>
            <p>
              Sign up for a free account today, to create and edit your very own
              travel blogs!
            </p>
            <Link to='/sign-up' style={{ textDecoration: 'none' }}>
              <span className='sign-up-link'>Sign up</span>
            </Link>
          </div>
        )}
        <div>
          <img
            className='welcome-image'
            src='./images/travel-blog.jpg'
            alt='travel blog'
          />
        </div>
      </div>
      <h4>Popular blogs </h4>
      {blogsError && <p>Error! {blogsError}</p>}
      {blogsLoading && (
        <ReactLoading
          type={'spin'}
          color={'#4040eb'}
          height={467}
          width={175}
        />
      )}
      {topThreeLikedBlogs &&
        topThreeLikedBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            caption={blog.caption}
            region={blog.region}
            image={blog.image}
            author={blog.author}
            createdAt={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Home;
