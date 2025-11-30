import { request } from "@/utils"
import { useEffect } from "react"

const Layout = () => {
  useEffect(() => {
    request.get('user/profile')
  })
  return (
    <div>This is Layout</div>
  )
}

export default Layout