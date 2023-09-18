import './BlogOverview.css';
import useBlogsDispatch from '../../hooks/useBlogsDispatch';
import useAuthState from '../../hooks/useAuthState';
import useBlogsState from '../../hooks/useBlogsState';

const BlogOverview = ({
  id,
  image,
  region,
  title,
  caption,
  createdAt,
  author,
}) => {
  const { token } = useAuthState();
  const { blogsLoading, blogsError } = useBlogsState();
  const { deleteBlog } = useBlogsDispatch();

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
          Delete
        </button>
        <button disabled={blogsLoading}>Edit</button>
        <button disabled={blogsLoading}>Publish</button>
        {blogsError && <span>{blogsError}</span>}
      </div>
    </div>
  );
};

export default BlogOverview;
