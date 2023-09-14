import './BlogCard.css';
import { Link } from 'react-router-dom';
import useLikesState from '../../hooks/useLikesState';
import { getTotalBlogLikes } from '../../helpers/helpers';

const BlogCard = ({ id, image, region, title, caption, createdAt }) => {
  const { likes } = useLikesState();

  const totalBlogLikes = getTotalBlogLikes(likes, id);

  return (
    <div className='blog-container'>
      <div>
        <img className='travel-image' src={image} alt='travel image' />
      </div>
      <div className='right-blog-container'>
        <h4>{region}</h4>
        <h6>{title}</h6>
        <p className='caption-container'>{caption}</p>
        <p>
          {' '}
          <Link to={`/blog/${id}`}>Read blog</Link> |
          <img className='like-icon' src='../images/like.png' alt='like' />{' '}
          {totalBlogLikes}{' '}
        </p>
        <p className='blog-credits'>By: TBC, Date: {createdAt.slice(0, 10)} </p>
      </div>
    </div>
  );
};

export default BlogCard;
