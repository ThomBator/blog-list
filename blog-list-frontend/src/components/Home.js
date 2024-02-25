import React, { useRef } from "react";
import { useQuery } from "react-query";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import BlogForm from "./BlogForm";
import BlogLink from "./BlogLink";
import Toggleable from "./Toggleable";
import { useUser } from "../contexts/userContext";

const Home = () => {
  const user = useUser();

  //remember you aren't calling the function, you're passing it
  const result = useQuery("blogs", blogService.getAll);
  const blogFormRef = useRef();

  if (result.isLoading) {
    return <div>loading.data</div>;
  }

  const blogs = result.data;

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <header className={styles.homeHeader}>
        <h1>Story Ranker</h1>
        <p className={`subheading`}>
          Share your favourite blogs and sites from around the web. Vote on
          posts you love to help them climb the rankings!
        </p>
        {!user && (
          <p>
            <Link to="/login">Log in</Link> to post, vote and comment.
          </p>
        )}
      </header>

      {user && (
        <div>
          <Toggleable buttonLabel="Share a new blog" ref={blogFormRef}>
            <BlogForm />
          </Toggleable>
        </div>
      )}

      {blogs.sort(byLikes).map((blog) => (
        <div className={styles.listItem} key={blog.id}>
          {/*<Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
      </Link>*/}
          <BlogLink blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default Home;
