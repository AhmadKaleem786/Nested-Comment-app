import { createSlice } from "@reduxjs/toolkit";
import { commentData } from "../../Data/commentData";

const initialState = {
  commentRecord: commentData,
};

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, { payload }) => {
      state.commentRecord.push(payload);
    },
    handleDelete: (state, { payload }) => {
      const record = [];
      state.commentRecord.forEach((data) => {
        if (data.id !== payload) {
          record.push({
            id: data.id,
            text: data.text,
            likes: data.likes,
            replies: [],
          });

          data?.replies?.forEach((reply) => {
            if (reply.id !== payload) {
              record[record.length - 1].replies.push({
                id: reply.id,
                text: reply.text,
                likes: reply.likes,
                replies: [],
              });

              reply?.replies?.forEach((last) => {
                if (last.id !== payload) {
                  record[record.length - 1].replies[
                    record[record.length - 1].replies.length - 1
                  ].replies.push({
                    id: last.id,
                    text: last.text,
                    likes: last.likes,
                    replies: [],
                  });
                }
              });
            }
          });
        }
      });
      state.commentRecord = record;
    },
    handleReply: (state, { payload }) => {
      let record = state.commentRecord;
      function Reply(a) {
        record.forEach((data, index) => {
          if (data.id === a.parentId) {
            record[index].replies.push({
              id: a.id,
              text: a.text,
              likes: 0,
              replies: [],
            });
          } else {
            data.replies?.forEach((rep, ind) => {
              if (rep.id === a.parentId) {
                record[index].replies[ind].replies.push({
                  id: a.id,
                  text: a.text,
                  likes: 0,
                  replies: [],
                });
              }
            });
          }
        });
      }
      Reply(payload);
      state.commentRecord = record;
    },
    handleLike: (state, { payload }) => {
      const record = [];
      state.commentRecord.forEach((data) => {
        record.push({
          id: data.id,
          text: data.text,
          likes: data.id === payload ? data.likes + 1 : data.likes,
          replies: [],
        });

        data.replies?.forEach((reply) => {
          record[record.length - 1].replies.push({
            id: reply.id,
            text: reply.text,
            likes: reply.id === payload ? reply.likes + 1 : reply.likes,
            replies: [],
          });

          reply.replies?.forEach((last) => {
            record[record.length - 1].replies[
              record[record.length - 1].replies.length - 1
            ].replies.push({
              id: last.id,
              text: last.text,
              likes: last.id === payload ? last.likes + 1 : last.likes,
              replies: [],
            });
          });
        });
      });
      state.commentRecord = record;
    },
  },
});

export const { addComment, handleDelete, handleReply, handleLike } =
  CommentSlice.actions;
export default CommentSlice.reducer;
