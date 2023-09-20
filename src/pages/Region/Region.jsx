import './Region.css';
import { useParams } from 'react-router-dom';
import formatRegion from '../../utils/utilFunctions';
import { getRegionBlogs } from '../../helpers/helpers';
import useBlogsState from '../../hooks/useBlogsState';
import BlogCard from '../../components/BlogCard/BlogCard';

const Region = () => {
  const { blogs } = useBlogsState();
  const { region } = useParams();

  const formattedRegion = formatRegion(region);
  const regionBlogs = blogs && getRegionBlogs(blogs, formattedRegion);

  return (
    <div className='region-container'>
      <h3>{formattedRegion} </h3>
      {regionBlogs &&
        regionBlogs.map((blog) => (
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

export default Region;
