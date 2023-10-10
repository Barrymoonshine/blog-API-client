import './BlogCard.css';
import { Link } from 'react-router-dom';
import useLikesState from '../../hooks/useLikesState';
import { getTotalBlogLikes } from '../../helpers/helpers';
import PropTypes from 'prop-types';

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const BlogCard = ({ id, image, region, title, caption, createdAt, author }) => {
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
          <Link to={`/blog/${id}`}>Read blog</Link> |{' '}
          <img
            className='likes-blog-card'
            src='../images/like.png'
            alt='like'
          />{' '}
          {totalBlogLikes}
        </p>
        <p className='blog-credits'>
          By: {author}, Date: {createdAt.slice(0, 10)}{' '}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
