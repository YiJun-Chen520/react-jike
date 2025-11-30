import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from '@/utils/token'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 实现token持久化
      _setToken(action.payload)
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