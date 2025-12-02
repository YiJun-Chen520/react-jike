import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useState } from 'react'
import { useEffect } from 'react'
import { getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 定义一个枚举
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>
  }
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]

  // 获取频道列表
  const { channelList } = useChannel()

  // 筛选表单提交
  const [formData, setFormData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: '',
    per_page: ''
  })

  // 获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getArticleList() {
      const res = await getArticleListAPI(formData)
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getArticleList()
  }, [formData])

  const onFinish = (formValue) => {
    console.log(formValue)
    // 更新筛选表单
    setFormData({
      ...formData,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD')
    })
  }


  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{
          status: '',
          channel_id: '',
          date: []
        }}
          onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格信息 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  )
}

export default Article