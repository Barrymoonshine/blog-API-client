import './Home.css';
import useFetch from '../../hooks/useFetch';
import Blog from '../../components/Blog/Blog';

const Home = () => {
  const {
    loading,
    error,
    data = [],
  } = useFetch('https://ancient-water-2934.fly.dev/blogs', { method: 'GET' });

  if (error) return <p>Error! {error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>Welcome to Sayonara - this is the home page</p>
      {data &&
        data.map((item) => (
          <Blog key={item._id} title={item.title} content={item.content} />
        ))}
    </div>
  );
};

export default Home;
