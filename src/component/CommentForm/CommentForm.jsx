import React, { useState } from 'react';
import'./CommentForm.css'
import Avatar3 from '../../assets/image/image-juliusomo.png'

const CommentForm = ({ onAddComment }) => {
    const [commentText, setCommentText] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (commentText.trim()) {
        onAddComment(commentText);
        setCommentText('');
      }
    };
  
    return (
      <form className="comment-form" onSubmit={handleSubmit}>
        <img
          src={Avatar3}
          className="avatar"
        />
        <input
          className="input"
          type="text" 
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    );
  };
  export default CommentForm;