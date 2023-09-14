import uniqid from 'uniqid';
import './Blog.css';
import useAuthState from '../../hooks/useAuthState';
import useBlogsState from '../../hooks/useBlogsState';
import useLikesState from '../../hooks/useLikesState';
import useLikesDispatch from '../../hooks/useLikesDispatch';
import useCommentsState from '../../hooks/useCommentsState';
import useCommentsDispatch from '../../hooks/useCommentsDispatch';
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
  const { toggleLike } = useLikesDispatch();
  const { blogs } = useBlogsState();

  useEffect(() => {
    getComments(id);
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
        <>
          <div className='blog-container'>
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
                <div id='likes-container'>
                  You like this blog |
                  <button
                    className='like-button'
                    disabled={likesLoading}
                    onClick={() => toggleLike(username, 'blog', id, token)}
                  >
                    <img
                      className='liked-icon'
                      src='../images/liked.png'
                      alt='liked'
                    />
                  </button>
                  {totalBlogLikes}
                </div>
              )}
              {!isBlogLiked && isLoggedIn && (
                <div id='likes-container'>
                  Like this blog |
                  <button
                    className='like-button'
                    disabled={likesLoading}
                    onClick={() => toggleLike(username, 'blog', id, token)}
                  >
                    <img
                      className='like-icon'
                      src='../images/like.png'
                      alt='like'
                    />
                  </button>
                  {totalBlogLikes}
                </div>
              )}
              {!isLoggedIn && (
                <div id='likes-container'>
                  Log in to like this blog |
                  <img
                    className='like-icon'
                    src='../images/like.png'
                    alt='like'
                  />
                  {totalBlogLikes}
                </div>
              )}
              {likesError && (
                <span>
                  There has been an error with liking this blog, please try
                  again
                </span>
              )}
            </div>
            <div className='comments-title'>
              <h4>Comments</h4>

              {isLoggedIn ? (
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
                    <button
                      className='submit-button'
                      disabled={commentsLoading}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              ) : (
                <h5> Please log in to add a comment </h5>
              )}
            </div>
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
                  comment={item.comment}
                  createdAt={item.date}
                  replies={item.replies}
                  username={username}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
