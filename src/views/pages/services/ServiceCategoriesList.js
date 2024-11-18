import { motion } from 'framer-motion'
import { message, Modal, Input, Form } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const ServiceCategoriesList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [form] = Form.useForm()
  const [fileUrl, setFileUrl] = useState('') // State for uploaded file URL
  const [uploading, setUploading] = useState(false) // Loader state for file upload
  const token = localStorage.getItem('token')
  const fileInputRef = useRef(null) // Ref for file input
  
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/service-categories`, {
        headers: { token },
      })
      setData(res.data.categories)
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Failed to load service categories')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      message.error('Please select a valid file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/upload`,
        formData,
        {
          headers: { token, 'Content-Type': 'multipart/form-data' },
        },
      )
      setFileUrl(res.data.fileUrl)
      message.success('Image uploaded successfully')
    } catch (error) {
      message.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = async (values) => {
    try {
      const updatedValues = { ...values }
      if (fileUrl) {
        updatedValues.image = fileUrl // Include uploaded file URL if a new file is uploaded
      }

      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/admin/edit-service-category/${selectedCategory._id}`,
        updatedValues,
        { headers: { token } },
      )
      message.success(res.data.message)
      setIsEditModalVisible(false)
      setSelectedCategory(null)
      setFileUrl('') // Reset file URL after submission
      if (fileInputRef.current) {
        fileInputRef.current.value = '' // Clear file input
      }
      getData() // Refresh the data
    } catch (error) {
      message.error('Failed to update category details')
    }
  }

  const showEditModal = (category) => {
    setSelectedCategory(category)
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    })
    setFileUrl(category.image || '') // Pre-fill existing image URL
    setIsEditModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setIsEditModalVisible(false)
    setSelectedCategory(null)
    setFileUrl('') // Reset file URL when canceling
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Clear file input
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
            Service Categories List
          </motion.h2>
        </CCardHeader>
        <CCardBody>
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category) => (
                  <tr key={category._id}>
                    <td style={{ textTransform: 'capitalize' }}>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <span style={{ color: category.active ? 'green' : 'red' }}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-warning" onClick={() => showModal(category)}>
                        Toggle Status
                      </button>{' '}
                      <button className="btn btn-primary" onClick={() => showEditModal(category)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </CCardBody>
      </CCard>

      {/* Edit Modal */}
      <Modal
        title="Edit Service Category"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Save"
        cancelText="Cancel"
        centered={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEdit}
          initialValues={{
            name: selectedCategory?.name,
            description: selectedCategory?.description,
          }}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the category name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the category description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Upload Image">
            <Input type="file" onChange={handleImageUpload} ref={fileInputRef} />
            {uploading && <p>Uploading...</p>}
            {fileUrl && (
              <img
                src={fileUrl}
                alt="Uploaded"
                className="img-thumbnail mt-2"
                style={{ maxHeight: '150px' }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ServiceCategoriesList
