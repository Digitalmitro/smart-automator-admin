import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Select, Input, Button, Spin } from 'antd' // Import Ant Design components
import TextArea from 'antd/es/input/TextArea'

const { Option } = Select

const HomePageCMS = () => {
  const navigate = useNavigate()
  const [fileUrl, setFileUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false) // State to track upload status
  const token = localStorage.getItem('token')

  const [homeCms, setHomeCms] = useState({
    heading: '',
    banner: '',
    description: '',
    blogs: [], // To hold selected blogs
  })
  const [allBlogs, setAllBlogs] = useState([]) // To hold all blogs
  const [isFetchingBlogs, setIsFetchingBlogs] = useState(false)

  // Fetch home page content
  const getHomeContent = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/home-cms`)
      .then((res) => {
        setHomeCms(res.data.homeCMS.homePage)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // Fetch available blogs for the multi-select dropdown
  const getAllBlogs = async () => {
    setIsFetchingBlogs(true)
    await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/admin/blogs`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res.data)

        const blogData = res.data.data.blogs.map((blog) => ({
          label: blog.title, // Display blog title
          value: blog._id, // Store blog ID
        }))

        setAllBlogs(blogData)
      })
      .catch((e) => {
        toast.error('Failed to fetch blogs')
      })
      .finally(() => {
        setIsFetchingBlogs(false)
      })
  }

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      toast.error('Please select a valid file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsUploading(true)

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      })
      setFileUrl(res.data.fileUrl)
      setHomeCms({ ...homeCms, banner: res.data.fileUrl })
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fileUrl && !homeCms.banner) {
      toast.error('Please upload an image before submitting.')
      return
    }

    const payload = {
      heading: homeCms.heading,
      banner: homeCms.banner,
      description: homeCms.description,
      blogs: homeCms.blogs, // Include selected blog IDs
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/admin/home-cms`, payload, {
        headers: { token },
      })
      toast.success(res.data.message || 'Home Page content updated successfully')
      // setHomeCms({ heading: '', banner: '', description: '', blogs: [] })
      getHomeContent();
      setFileUrl('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update home page content')
    }
  }

  useEffect(() => {
    getHomeContent()
    getAllBlogs() // Fetch blogs for the dropdown
  }, [])

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Manage Home Page Content
          </motion.h2>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Heading
                </label>
                <Input
                  value={homeCms.heading}
                  onChange={(e) => setHomeCms({ ...homeCms, heading: e.target.value })}
                  placeholder="Enter heading"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <TextArea
                  value={homeCms.description}
                  onChange={(e) => setHomeCms({ ...homeCms, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputImage" className="form-label">
                  Upload Banner
                </label>
                <Input type="file" onChange={handleImageUpload} />
              </div>
              <div className="col-md-6">
                {isUploading ? (
                  <div className="text-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  (fileUrl || homeCms.banner) && (
                    <>
                      <label className="form-label">Preview</label>
                      <img
                        src={fileUrl ?? homeCms.banner}
                        className="img-fluid rounded-3"
                        alt="Banner"
                      />
                    </>
                  )
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputBlogs" className="form-label">
                  Select Blogs
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Select Blogs"
                  value={homeCms.blogs}
                  onChange={(selectedBlogs) => setHomeCms({ ...homeCms, blogs: selectedBlogs })}
                >
                  {allBlogs.map((blog) => (
                    <Option key={blog.value} value={blog.value}>
                      {blog.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="col-md-6">
                <Button type="primary" htmlType="submit" disabled={isUploading || isFetchingBlogs}>
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default HomePageCMS
