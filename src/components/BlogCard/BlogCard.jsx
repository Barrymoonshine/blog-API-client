import './BlogCard.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, image, region, title, caption, author, createdAt }) => {
  return (
    <div className='blog-container'>
      <div>
        <img className='travel-image' src={image} alt='travel image' />
      </div>
      <div className='right-blog-container'>
        <h4>{region}</h4>
        <h6>{title}</h6>
        <p>{caption}</p>
        <Link to={`/blog/${id}`}>More Details</Link>
        <p className='blog-credits'>
          By: {author}, Date: {createdAt}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
