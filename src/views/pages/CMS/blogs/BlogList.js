import { motion } from 'framer-motion'
import { message } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/blogs`, {
        headers: { token },
      })
      setData(res.data.data.blogs) // Access `blogs` from `data`
    } catch (error) {
      console.error('Error fetching blogs:', error)
      message.error('Failed to load blogs')
    }
  }

  const handleAddBlog = () => {
    navigate('/add-blog')
  }

  const handleEditBlog = (blogId) => {
    navigate(`/edit-blog/${blogId}`)
  }

  const handleDeleteBlog = async (blogId) => {
    // Confirm deletion before proceeding
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/admin/delete-blog/${blogId}`, {
          headers: { token },
        })
        message.success(res.data.message)
        // Re-fetch blog data after successful deletion
        getData()
      } catch (error) {
        console.error('Error deleting blog:', error)
        message.error('Failed to delete blog')
      }
    }
  }

  useEffect(() => {
    if (token) {
      getData()
    } else {
      navigate('/login')
    }
  }, [token])

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Blog List
          </motion.h2>
          <button className="btn btn-primary" onClick={handleAddBlog}>
            Add Blog
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((blog) => (
                  <tr key={blog._id}>
                    <td style={{ textTransform: 'capitalize' }}>{blog.title}</td>
                    <td>{blog.slug}</td>
                    <td>
                      <span style={{ color: blog.active ? 'green' : 'red' }}>
                        {blog.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditBlog(blog._id)}
                      >
                        Edit
                      </button>
                      &nbsp;
                      &nbsp;
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BlogList
