export const ACTIONS = {
  UPDATE_ERROR: 'update-error-from-server',
  TOGGLE_LOADING: 'toggle-loading-status',
  SAVE_COMMENTS: 'save-all-comments',
  ADD_LIKE: 'add-new-like',
  UPDATE_LIKES_ERROR: 'update-likes-error',
};

export const AUTH_ACTIONS = {
  TOGGLE_LOG_IN: 'toggle-user-log-in',
  SAVE_TOKEN: 'save-jwt',
  REMOVE_TOKEN: 'remove-jwt',
  SAVE_USERNAME: 'save-username',
  REMOVE_USERNAME: 'remove-username',
  TOGGLE_AUTH_LOADING: 'toggle-auth-loading-status',
  SAVE_AUTH_ERROR: 'save-auth-error',
  REMOVE_AUTH_ERROR: 'remove-auth-error',
};

export const BLOGS_ACTIONS = {
  SAVE_BLOGS: 'save-all-blogs',
  TOGGLE_BLOGS_LOADING: 'toggle-blogs-loading-status',
  SAVE_BLOGS_ERROR: 'save-blog-error',
  REMOVE_BLOGS_ERROR: 'remove-blog-error',
  ADD_BLOG: 'add-new-blog',
};
