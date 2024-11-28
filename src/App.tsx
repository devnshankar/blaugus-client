import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const API_BASE = import.meta.env.VITE_SERVER_URL || "__VITE_SERVER_URL__";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get<Blog[]>(API_BASE);
    setBlogs(response.data);
  };

  const createBlog = async () => {
    if (!title || !content) return alert("Title and content are required.");
    await axios.post(API_BASE, { title, content });
    setTitle("");
    setContent("");
    fetchBlogs();
  };

  const viewBlog = async (id: string) => {
    const response = await axios.get<Blog>(`${API_BASE}/${id}`);
    setSelectedBlog(response.data);
  };

  return (
    <div className="container">
      <h1 className="header">Simple Blogging Platform</h1>

      {selectedBlog ? (
        <div className="blogDetail">
          <button onClick={() => setSelectedBlog(null)} className="backButton">
            ← Back
          </button>
          <h2 className="blogTitle">{selectedBlog.title}</h2>
          <p className="blogContent">{selectedBlog.content}</p>
          <small className="blogDate">
            Created at: {new Date(selectedBlog.createdAt).toLocaleString()}
          </small>
        </div>
      ) : (
        <div className="formContainer">
          <h2 className="subHeader">Create a Blog</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="textarea"
          />
          <button onClick={createBlog} className="createButton">
            Create Blog
          </button>

          <h2 className="subHeader">All Blogs</h2>
          <div className="cardContainer">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => viewBlog(blog.id)}
                className="card"
              >
                <h3 className="cardTitle">{blog.title}</h3>
                <small className="cardDate">{new Date(blog.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
