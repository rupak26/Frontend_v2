import React, { useEffect, useState } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../Pages/contentManagement/PostCURD";

const BlogFeedViaUser = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updatePost(editingPost.id, { title, description });
      } else {
        await createPost({ title, description });
      }
      setTitle("");
      setDescription("");
      setEditingPost(null);
      setPosts(await fetchPosts()); 
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="blog-container">
      <h2>Blog Feed</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">{editingPost ? "Update Post" : "Create Post"}</button>
      </form>

      <div className="posts">
        {posts.length === 0 ? <p>No posts available</p> : posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button onClick={() => { setEditingPost(post); setTitle(post.title); setDescription(post.description); }}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFeedViaUser;
