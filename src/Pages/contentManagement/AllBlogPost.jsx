import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Style/Feed.css";
const URL = process.env.REACT_APP_API_URL

const BlogFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [editPost, setEditPost] = useState(null);
  const limit = 5;
  const API_BASE_URL = `http://44.192.125.34:8000/content`;
  const token = localStorage.getItem("token");

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `${API_BASE_URL}/view/?limit=${limit}&offset=${offset}`;
      if (search.trim() !== "") {
        url += `&keyword=${search}`;
      }
      const response = await axios.get(url);
      setPosts(response.data.results || response.data);
    } catch (error) {
      setError("Error fetching posts");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [offset, search]);

  // Handle creating or updating a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      if (editPost) {
        // Update Post
        await axios.put(
          `${API_BASE_URL}/post/${editPost.id}/`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Post updated successfully!");
        setEditPost(null);
      } else {
        // Create Post
        await axios.post(
          `${API_BASE_URL}/post/`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Post created successfully!");
      }

      setTitle("");
      setDescription("");
      fetchPosts(); 
    } catch (error) {
      setError("Error processing request");
    }
  };

  // Handle edit
  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setEditPost(post);
  };

  // Handle delete
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/post/${postId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      setError("Error deleting post");
    }
  };

  return (
    <div className="blog-feed">
      <h2>Blog Feed</h2>

      {/* Create/Edit Post Form */}
      <form onSubmit={handleSubmit} className="create-post-form">
        <h3>{editPost ? "Edit Post" : "Create a Post"}</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{editPost ? "Update Post" : "Create Post"}</button>
        {editPost && <button onClick={() => setEditPost(null)}>Cancel Edit</button>}
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <button onClick={() => fetchPosts()} className="search-btn">
        Search
      </button>

      {loading && <p>Loading posts...</p>}
      {error && <p className="error">{error}</p>}

      {/* Display Posts */}
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p><strong>Author:</strong> {post.created_by}</p>
              <button onClick={() => handleEdit(post)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="delete-btn">Delete</button>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          disabled={offset === 0}
          onClick={() => setOffset(offset - limit)}
        >
          Previous
        </button>
        <button onClick={() => setOffset(offset + limit)}>Next</button>
      </div>
    </div>
  );
};

export default BlogFeed;
