
import { useEffect, useState } from 'react'
import { getChannelListAPI } from '@/apis/article'

const useChannel = () => {
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  const getChannelList = async () => {
    const res = await getChannelListAPI()
    setChannelList(res.data.channels)
  }

  useEffect(() => {
    getChannelList()
  }, [])

  return { channelList }
}

export { useChannel }