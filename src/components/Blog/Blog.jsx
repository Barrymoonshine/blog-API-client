import './Blog.css';

const Blog = ({ title, caption, image }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{caption}</div>
      <div>{image}</div>
    </div>
  );
};

export default Blog;
