import React, { useState } from 'react';
import './CommentsList.css'
import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment'
import avatar1 from '../../assets/image/image-amyrobson.png'
import avatar2 from '../../assets/image/image-maxblagun.png'
import Avatar3 from '../../assets/image/image-ramsesmiron.png'
import Avatar4 from '../../assets/image/image-juliusomo.png'
import undoIcon from'../../assets/image/icon-reply.svg'



const CommentsList = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
      name: 'amyrobson',
      avatar: avatar1
      },
      timeAgo: '1 month ago',
      comment: 'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.',
      initialScore: 12,
      replies: []
    },
    {
      id: 2,
      user: {
      name: 'maxblagun',
      avatar: avatar2
      },
      timeAgo: '2 weeks ago',
      comment: 'Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!',
      initialScore: 5,
      replies: []
    },
    {
      id: 3,
      user: {
      name: 'ramsesmiron',
      avatar: Avatar3,
      },
      timeAgo: '1 week ago',
      comment: "@maxblagun If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React.",
      initialScore: 4,
      replies: []
    },

    {
      id: 4,
      user: {
      name: 'juliusomo',
      avatar: Avatar4,
      },
      timeAgo: '2 days ago',
      comment: "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      initialScore: 2,
      replies: []
    },

  ]);

  const handleAddComment = (commentText) => {
    const newComment = {
      user: {
        name: 'juliusomo',
        avatar: Avatar4
      },
      timeAgo: 'just now',
      comment: commentText,
      initialScore: 2,
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const handleEditComment = (id, newCommentText) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, comment: newCommentText } : comment
    ));
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleReplyToComment = (id, replyText) => {
    setComments(comments.map(comment =>
      comment.id === id
        ? { ...comment, replies: [...comment.replies, { id: Date.now(), user: { name: 'juliusomo', avatar: Avatar4 }, timeAgo: 'just now', comment: replyText, initialScore: 0 }] }
        : comment
    ));
  };
  const handleDeleteReply = (commentId, replyId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
        : comment
    ));
  };

  
  return (
    <div className="comments-list">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          user={comment.user}
          timeAgo={comment.timeAgo}
          comment={comment.comment}
          initialScore={comment.initialScore}
          replies={comment.replies}
          undoIcon={undoIcon}
          onDelete={() => deleteComment(comment.id)}
          onEdit={(newCommentText) => handleEditComment(comment.id, newCommentText)}
          onReply={(replyText) => handleReplyToComment(comment.id, replyText)}
          onDeleteReply={(replyId) => handleDeleteReply(comment.id, replyId)}
        />
      ))}
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );}
export default CommentsList;