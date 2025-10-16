import React, { useState } from "react";
import "../Styles/Community.css";

const CommunityRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: "JohnDoe",
      text: "Just sharing this photo from my trip!",
      media: "https://via.placeholder.com/600x350",
      type: "image",
      time: "2 hours ago",
      comments: [
        { id: 1, user: "Jane", text: "That looks awesome!" },
        { id: 2, user: "Mike", text: "Where was this taken?" },
      ],
      likes: 2,
      showComments: false,
    },
    {
      id: 2,
      username: "JaneSmith",
      text: "Loving this community already!",
      media: null,
      type: "text",
      time: "1 hour ago",
      comments: [],
      likes: 0,
      showComments: false,
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMediaFile(file);
      setUploading(false);
    }, 800);
  };

  const handleCancelPreview = () => {
    setMediaFile(null);
    setPreviewUrl(null);
  };

  const handleSend = () => {
    if (!inputText && !previewUrl) return;
    const newMessage = {
      id: Date.now(),
      username: "You",
      text: inputText,
      media: previewUrl,
      type: previewUrl ? "image" : "text",
      time: "Just now",
      comments: [],
      likes: 0,
      showComments: false,
    };
    setMessages([newMessage, ...messages]);
    setInputText("");
    setMediaFile(null);
    setPreviewUrl(null);
  };

  const handleCommentChange = (id, text) => {
    setCommentInputs({ ...commentInputs, [id]: text });
  };

  const handleAddComment = (id) => {
    const commentText = commentInputs[id];
    if (!commentText?.trim()) return;
    const updatedMessages = messages.map((msg) =>
      msg.id === id
        ? {
            ...msg,
            comments: [
              ...msg.comments,
              { id: Date.now(), user: "You", text: commentText },
            ],
          }
        : msg
    );
    setMessages(updatedMessages);
    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  const toggleComments = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, showComments: !msg.showComments } : msg
    );
    setMessages(updatedMessages);
  };

  const handleLike = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="community-container">
      <h2 className="community-title">Community Room</h2>

      <div className="feed">
        {messages.map((msg) => (
          <div key={msg.id} className="post-card">
            <div className="post-header">
              <span className="username">{msg.username}</span>
              <span className="time">{msg.time}</span>
            </div>

            <div className="post-body">
              <p>{msg.text}</p>
              {msg.media && (
                <img src={msg.media} alt="post" className="post-img" />
              )}
            </div>

            <div className="post-actions">
              <button className="like-btn" onClick={() => handleLike(msg.id)}>
                👍 {msg.likes}
              </button>
              <button
                className="comments-toggle"
                onClick={() => toggleComments(msg.id)}
              >
                Comments ({msg.comments.length})
              </button>
            </div>

            {msg.showComments && (
              <div className="comments-section">
                <div className="comments-list">
                  {msg.comments.map((c) => (
                    <div key={c.id} className="comment">
                      <span className="comment-user">{c.user}:</span>{" "}
                      <span className="comment-text">{c.text}</span>
                    </div>
                  ))}
                </div>

                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[msg.id] || ""}
                    onChange={(e) =>
                      handleCommentChange(msg.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleAddComment(msg.id)}>Post</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-section">
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="preview" />
            <span className="cancel-icon" onClick={handleCancelPreview}>
              ✖
            </span>
          </div>
        )}

        <div className="input-row">
          <input
            type="text"
            placeholder="Share something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <label className="upload-label">
            📎
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          <button
            onClick={handleSend}
            disabled={uploading || (!inputText && !previewUrl)}
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityRoom;
