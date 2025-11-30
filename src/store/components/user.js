import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload

    }
  }
})

const { setToken } = userSlice.actions

// 编写异步代码
function fetchLogin(userForm) {
  return async (dispatch) => {
    const res = await request.post('/authorizations', userForm)
    dispatch(setToken(res.data.token))
  }
}

export { setToken, fetchLogin }

const userReducer = userSlice.reducer

export default userReducer