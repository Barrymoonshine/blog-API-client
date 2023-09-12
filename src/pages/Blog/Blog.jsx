import uniqid from 'uniqid';
import './Blog.css';
import useAuthState from '../../hooks/useAuthState';
import useBlogsState from '../../hooks/useBlogsState';
import useLikesState from '../../hooks/useLikesState';
import useLikesDispatch from '../../hooks/useLikesDispatch';
import useCommentsState from '../../hooks/useCommentsState';
import useCommentsDispatch from '../../hooks/useCommentsDispatch';
import useBlogsDispatch from '../../hooks/useBlogsDispatch';
import { useParams } from 'react-router-dom';
import {
  getBlog,
  checkUserLiked,
  getTotalBlogLikes,
} from '../../helpers/helpers';
import { useForm } from 'react-hook-form';
import CommentCard from '../../components/CommentCard/CommentCard';
import { useEffect } from 'react';

const Blog = () => {
  const { id } = useParams();
  const { addComment, getComments } = useCommentsDispatch();
  const { handleAddLike, getLikes } = useLikesDispatch();
  const { getBlogs } = useBlogsDispatch();
  const { blogs } = useBlogsState();

  useEffect(() => {
    getComments(id);
    getLikes();
    if (!blogs) {
      getBlogs();
    }
  }, []);

  const { username, token, isLoggedIn } = useAuthState();
  const { likes, likesLoading, likesError } = useLikesState();
  const { comments, commentsLoading, commentsError } = useCommentsState();
  const blog = blogs && getBlog(blogs, id);
  const isBlogLiked = likes && checkUserLiked(likes, id, username);
  const totalBlogLikes = likes && getTotalBlogLikes(likes, id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    await addComment(
      {
        ...formData,
        blogID: id,
        commentID: uniqid(),
        date: new Date().toISOString().split('T')[0],
        username,
      },
      token
    );
    if (!commentsError) {
      reset();
    }
  };

  return (
    <>
      {!blog ? (
        <span>Page is loading</span>
      ) : (
        <div>
          <div className='blog-page-container'>
            <div>
              <div className='blog-title'>
                <h4>{blog.title}</h4>
                <p>
                  By: TBC, blog?.author || Date: {blog.createdAt.slice(0, 10)}
                </p>
              </div>
              <div>
                <img
                  className='blog-image'
                  src={blog.image}
                  alt='travel image'
                />
              </div>
              <div className='blog-content'>
                <h5>{blog.region}</h5>
                <p>{blog.content}</p>
              </div>
              {isBlogLiked && isLoggedIn && (
                <button disabled={true}>You like this blog!</button>
              )}
              {!isBlogLiked && isLoggedIn && (
                <button
                  disabled={likesLoading}
                  onClick={() => handleAddLike(username, 'blog', id, token)}
                >
                  Like
                </button>
              )}
              {likesError && (
                <span>
                  There has been an error with liking this post, please try
                  again
                </span>
              )}
              {!isLoggedIn && <span>Log in to like this post </span>}
              <div>Total likes : {totalBlogLikes}</div>
            </div>
            <div className='comments-title'>
              <h4>Comments</h4>
            </div>
            {username ? (
              <div className='comment-form-container'>
                <form
                  className='comment-form'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label htmlFor='content'> Add comment:</label>
                  <textarea
                    {...register('comment', {
                      required: true,
                    })}
                    placeholder='Type your comment here'
                  />
                  {errors.comment && <span>This field is required</span>}

                  {commentsError && <span>{commentsError.message}</span>}
                  <button className='submit-button' disabled={commentsLoading}>
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <h5> Please log in to add a comment </h5>
            )}
          </div>
          <div className='comments-container'>
            {commentsLoading && <p>Comments are loading </p>}
            {commentsError && <p>{commentsError.message} </p>}
            {comments &&
              comments.map((item) => (
                <CommentCard
                  key={item.commentID}
                  id={item.commentID}
                  author={item.username}
                  username={username}
                  comment={item.comment}
                  createdAt={item.date}
                  token={token}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
