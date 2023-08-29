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
      <h4>Sayonara</h4>
      <p>Create the travel blog of your dreams</p>
      <p>Photo by Annie Spratt</p>
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
