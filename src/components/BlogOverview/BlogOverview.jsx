import './BlogOverview.css';
import useBlogsDispatch from '../../hooks/useBlogsDispatch';
import useAuthState from '../../hooks/useAuthState';
import useBlogsState from '../../hooks/useBlogsState';
import { Link } from 'react-router-dom';

const BlogOverview = ({
  id,
  image,
  region,
  title,
  caption,
  createdAt,
  author,
  isBlogPublished,
}) => {
  const { token } = useAuthState();
  const { blogsLoading, blogsError } = useBlogsState();
  const { deleteBlog, togglePublished } = useBlogsDispatch();

  return (
    <div className='blog-list-container'>
      <div className='top-list-row'>
        <img className='travel-image-list' src={image} alt='travel image' />
        <h4>{region}</h4>
      </div>
      <div>
        <h6>{title}</h6>
      </div>
      <div className='bottom-list-row'>
        <button disabled={blogsLoading} onClick={() => deleteBlog(id, token)}>
          <img
            className='delete-icon'
            src='../images/delete.png'
            alt='delete'
          />
        </button>
        <Link to={`/edit-blog/${id}`} style={{ textDecoration: 'none' }}>
          <span className='edit-link'>Edit</span>
        </Link>
        {isBlogPublished ? (
          <button
            onClick={() => togglePublished(id, isBlogPublished, token)}
            disabled={blogsLoading}
            className='unpublish-button'
          >
            Published
          </button>
        ) : (
          <button
            onClick={() => togglePublished(id, isBlogPublished, token)}
            disabled={blogsLoading}
            className='publish-button'
          >
            Not published
          </button>
        )}
        {blogsError && <span>{blogsError}</span>}
      </div>
    </div>
  );
};

export default BlogOverview;
