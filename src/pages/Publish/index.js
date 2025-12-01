import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import { getChannelListAPI, createArticleAPI } from '@/apis/publish'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const { Option } = Select

const Publish = () => {
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  const getChannelList = async () => {
    const res = await getChannelListAPI()
    setChannelList(res.data.channels)
  }

  useEffect(() => {
    getChannelList()
  }, [])

  // 收集form数据
  const onFinish = (formData) => {
    if (channelList.length !== type) return message.warning('上传图片数量与类型不符')
    console.log(formData)
    // 格式化数据
    const { title, content, channel_id } = formData
    const data = {
      title,
      content,
      cover: {
        type,
        images: imageList.map(item => item.response.data.url)
      },
      channel_id
    }
    // 调用接口发送请求
    createArticleAPI(data)
  }

  // 上传回调图片
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log(value)
    setImageList(value.fileList)
  }

  // 切换图片选择
  const [type, setType] = useState(0)
  const onTypeChange = (value) => {
    console.log(value.target.value)
    setType(value.target.value)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: type }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name="image"
                onChange={onChange}
                maxCount={type}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>



          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish