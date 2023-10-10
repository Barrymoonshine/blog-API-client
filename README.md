# Blog API client

Live link: https://blog-api-client-theta.vercel.app/

![Model](https://github.com/Barrymoonshine/blog-API-client/blob/main/public/images/sayonara-screenshot-home-two.png?raw=true)

![Model](https://github.com/Barrymoonshine/blog-API-client/blob/main/public/images/sayonara-screenshot-my-account-two.png?raw=true)

## Summary

Sayonara is a travel blog and community in which users can create and manage their own blogs and engage with a wider community of like-minded travelers through liking and commenting on blogs.

This app was built using React and is the front-end/client for the back-end/server which was also built as part of this project, and can be found [here](https://github.com/Barrymoonshine/blog-API).

Hosted and deployed on Vercel.

## Features

- Create, view, edit and delete blog posts
- Like and comment on blogs
- Delete comments
- Manage account details, such as updating password and username
- Filter travel blogs by geographic region
- JWT authentication
- Responsive design with Media Queries

## Key skills employed

- React app created using Vite for improved speed and performance over the now deprecated create react app
- Single Page Application (SPA) with all navigation completed client side with the React Router DOM package, including linking and navigating to new pages when tasks have completed
- Utilised the `useEffect` hook to get data from the server on page load, and when needed by a specific page/component
- Authentication via JWT stored in local storage and authenticated if user re-visits page
- Handling and displaying errors generated by the back and front-end
- Installed the React Hook Form package to remove the normal boilerplate associated with managing forms in 'vanilla' React
- Combination of global state management where state is needed across multiple levels of the app and local state management where state is only used in that component or passed one level down
- Prop type checking using the Prop Types package to help detect issues with passing incorrect data types
