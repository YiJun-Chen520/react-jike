// 封装高阶组件
// 核心逻辑：有token 正常跳转；无token 跳转到登录页面

const { getToken } = require("@/utils");
const { Navigate } = require("react-router-dom");

export function AuthRoute({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}