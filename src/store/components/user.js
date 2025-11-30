import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from '@/utils/token'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 实现token持久化
      _setToken(action.payload)
    },

    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

const { setToken, setUserInfo } = userSlice.actions

// 编写异步代码
function fetchLogin(userForm) {
  return async (dispatch) => {
    const res = await request.post('/authorizations', userForm)
    dispatch(setToken(res.data.token))
  }
}

// 获取用户信息异步代码
function fetchUserInfo() {
  return async (dispatch) => {
    const res = await request.get('user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { setToken, fetchLogin, fetchUserInfo }

const userReducer = userSlice.reducer

export default userReducer