import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleDelete,
  handleLike,
  handleReply,
} from "../../feature/comment/commentSlice";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ commentData }) => {
  const dispatch = useDispatch();
  const [replyOn, setReplyOn] = useState(false);
  const [reply, setReply] = useState("");
  const [like, setLike] = useState("Like");

  const handleLiked = () => {
    if (like === "Like") {
      setLike("Liked");
    } else {
      setLike("Like");
    }
  };
  return (
    <div>
      <div className="comment-container">
        <h3>{commentData.text}</h3>
        {/*<h4 className="like-btn">Likes: {commentData.likes}</h4>*/}
        {replyOn && (
          <input
            value={reply}
            placeholder="Enter your Reply"
            onChange={(e) => setReply(e.target.value)}
            autoFocus
          />
        )}
        {replyOn ? (
          <div>
            <button
              onClick={() => {
                if (reply !== "") {
                  dispatch(
                    handleReply({
                      parentId: commentData.id,
                      text: reply,
                      id: uuidv4(),
                    })
                  );
                  setReply("");
                  setReplyOn(false);
                }
              }}
            >
              Ok
            </button>
            <button
              onClick={() => {
                setReplyOn(false);
                setReply("");
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                dispatch(handleLike(commentData.id));
                handleLiked();
              }}
            >
              {like}
            </button>
            <button onClick={() => setReplyOn(true)}>Reply</button>
            <button onClick={() => dispatch(handleDelete(commentData.id))}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div style={{ paddingLeft: 25 }}>
        {commentData.replies?.map((reply) => {
          return <Comment key={reply.id} commentData={reply} />;
        })}
      </div>
    </div>
  );
};

export default Comment;
