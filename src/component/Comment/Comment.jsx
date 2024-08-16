import React, { useState } from 'react';
import './Comment.css'
import undoIcon from'../../assets/image/icon-reply.svg'
import deletIcon from'../../assets/image/icon-delete.svg'
import EditIcon from'../../assets/image/icon-edit.svg'



const Comment = ({ user, timeAgo, comment, initialScore,onDelete,onEdit,undoIcon,onReply,replies,onDeleteReply  }) => {
  const [score, setScore] = useState(initialScore);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleUpvote = () => {
    setScore(score + 1);
  };

  const handleDownvote = () => {
    setScore(score - 1);
  };

  const handleEditSubmit = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleDeleteReply = (replyId) => {
    onDeleteReply(replyId);
  };


  return (
    <div className="comment">
      <div className="score">
        <button
          className="upvote"
          onClick={handleUpvote}
        >
          +
        </button>
        <span>{score}</span>
        <button
          className="downvote"
          onClick={handleDownvote}
        >
          -
        </button>
        </div>
        
      <div className="content">
        <div className="user-info">
          <img src={user.avatar}  className="avatar" />
          <span className="username">{user.name}</span>
          <span className="username">
            {user.name === 'juliusomo' && <span className="you"> (you)</span>}
          </span>
          <span className="time">{timeAgo}</span>
           
          <div className="actions">
            {user.name !== 'juliusomo' && (
              <button
                className="reply-button"
                onClick={() => setIsReplying(!isReplying)}
                aria-label="Reply"
              ><img src={undoIcon}  className="reply-icon" />
                Reply
              </button>
            )}
          </div>

          {user.name === 'juliusomo' && (
            <>
<div className="edit-delete-buttons">
<button className="delete-reply-button" onClick={onDelete}>
               <img src={deletIcon}  className="delete-icon" />
      Delete
    </button>
                <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
              <img src={EditIcon}  className="edit-icon" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
         
    </div>
            </>
          )}
        </div>


          {isEditing ? (
          <div className="comment-text">
            <textarea 
              type="text" className="textarea" id="myTextarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button className="Save" onClick={handleEditSubmit} >Save</button>

          </div>
        ) : (
          <div className="comment-text">
            {comment}
          </div>
        )}

{isReplying && (
          <div className="reply-form">
            <input 
              className="textarea"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              aria-label="Write a reply"
            />
            <button className="Save" onClick={handleReplySubmit} aria-label="Submit Reply">Save</button>
          </div>
        )}
      {replies && replies.length > 0 && (
          <div className="replies">
            {replies.map(reply => (
              <div key={reply.id} className="reply">
                <div className="user-info">
                  <img src={reply.user.avatar}  className="avatar" />
                  <span className="username">{reply.user.name}</span>
                  <span className="time">{reply.timeAgo}</span>
                  <button className="delete-reply-button" onClick={() => handleDeleteReply(reply.id)}>                  <img src={deletIcon}  className="deletIcon" />
                  Delete</button>
                </div>
                <div className="comment-text">{reply.comment}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;