import './BlogOverview.css';

const BlogOverview = ({
  id,
  image,
  region,
  title,
  caption,
  createdAt,
  author,
}) => {
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
        <button>Delete</button>
        <button>Edit</button>
        <button>Publish</button>
      </div>
    </div>
  );
};

export default BlogOverview;
