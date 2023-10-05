import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./feature/comment/commentSlice";

export const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});
