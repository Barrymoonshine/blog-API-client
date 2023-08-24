import './Blog.css';

const Blog = ({ title, content }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  );
};

export default Blog;
