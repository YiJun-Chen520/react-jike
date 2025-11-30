// 封装高阶组件
// 核心逻辑：有token 正常跳转；无token 跳转到登录页面

const { getToken } = require("@/utils");
const { Navigate } = require("react-router-dom");

export function AuthRoute({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    // 因为React 组件的 return 需要返回 JSX ，
    // 而 Navigate 是 函数 不是 JSX，所以只能使用 <Navigate />
    return <Navigate to="/login" replace />
  }
}