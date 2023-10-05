import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../feature/comment/commentSlice";
import { v4 as uuidv4 } from "uuid";
import Comment from "./comment";
import "./comments.css";

const Comments = () => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const { commentRecord } = useSelector((store) => store.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment !== "") {
      dispatch(
        addComment({ id: uuidv4(), text: newComment, likes: 0, replies: [] })
      );
      setNewComment("");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <h3>Add your comment here</h3>
          </label>
          <input
            className="comment-container"
            type="text"
            value={newComment}
            placeholder="Type something......"
            onChange={(e) => setNewComment(e.target.value)}
            autoFocus
          />
          <button className="comment-container" type="submit">
            Add
          </button>
        </form>
      </div>
      <div>
        {commentRecord.map((data) => {
          return <Comment key={data.id} commentData={data} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
