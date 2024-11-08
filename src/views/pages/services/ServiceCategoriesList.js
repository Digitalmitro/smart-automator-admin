import { motion } from 'framer-motion'
import { message, Modal, Input, Form } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
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
  const token = localStorage.getItem('token')

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

  const handleToggleActive = async () => {
    try {
      const updatedCategory = { active: !selectedCategory.active }
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/admin/edit-service-category/${selectedCategory._id}`,
        updatedCategory,
        { headers: { token } },
      )
      message.success(res.data.message)
      setIsModalVisible(false)
      setSelectedCategory(null)
      getData() // Refresh the data
    } catch (error) {
      message.error('Failed to update category status')
    }
  }

  const handleEdit = async (values) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/admin/edit-service-category/${selectedCategory._id}`,
        values,
        { headers: { token } },
      )
      message.success(res.data.message)
      setIsEditModalVisible(false)
      setSelectedCategory(null)
      getData() // Refresh the data
    } catch (error) {
      message.error('Failed to update category details')
    }
  }

  const showModal = (category) => {
    setSelectedCategory(category)
    setIsModalVisible(true)
  }

  const showEditModal = (category) => {
    setSelectedCategory(category)
    form.setFieldsValue({ name: category.name, description: category.description })
    setIsEditModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setIsEditModalVisible(false)
    setSelectedCategory(null)
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

      {/* Modal for confirming toggle */}
      <Modal
        title="Confirm Status Change"
        visible={isModalVisible}
        onOk={handleToggleActive}
        onCancel={handleCancel}
        okText="Yes, Change"
        cancelText="No, Cancel"
        centered={true}
      >
        <p>
          Are you sure you want to {selectedCategory?.active ? 'deactivate' : 'activate'} this
          category?
        </p>
      </Modal>

      {/* Modal for editing category */}
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
        </Form>
      </Modal>
    </>
  )
}

export default ServiceCategoriesList
