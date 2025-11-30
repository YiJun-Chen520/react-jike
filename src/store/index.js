import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/components/user";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});