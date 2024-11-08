import { motion } from 'framer-motion'
import { message, Modal, Input, Form, Switch } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, Link } from 'react-router-dom'

const ServiceList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [form] = Form.useForm()
  const token = localStorage.getItem('token')

  // Fetch service list data
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/services`, {
        headers: { token },
      })
      setData(res.data.services)
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Failed to load services')
    }
  }

  // Handle Edit
  const handleEdit = async (values) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/admin/edit-service/${selectedService._id}`,
        values,
        { headers: { token } },
      )
      message.success(res.data.message)
      setIsEditModalVisible(false)
      setSelectedService(null)
      getData() // Refresh the data
    } catch (error) {
      message.error('Failed to update service details')
    }
  }

  const showEditModal = (service) => {
    setSelectedService(service)
    form.setFieldsValue({
      name: service.serviceName,
      description: service.description,
      isFeatured: service.isFeatured, // Set initial value for the switch
    })
    setIsEditModalVisible(true)
  }

  const handleCancel = () => {
    setIsEditModalVisible(false)
    setSelectedService(null)
  }

  // Handle switch change for featured status
  const handleFeaturedChange = async (checked, serviceId) => {
    form.setFieldsValue({ isFeatured: checked })

    try {
        const res = await axios.put(
          `${process.env.REACT_APP_BACKEND_API}/admin/edit-service/${serviceId}`,
          { isFeatured: checked },
          { headers: { token } }
        );
        message.success(res.data.message);
        // Optionally, refresh the data after the update
        getData();
      } catch (error) {
        console.log(error)
        message.error('Failed to update featured status');
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
            Services List
          </motion.h2>
          <button className="btn btn-primary" onClick={() => navigate('/add-service')}>
            Add New Service
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Service Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Featured Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((service) => (
                  <tr key={service._id}>
                    <td style={{ textTransform: 'capitalize' }}>{service.serviceName}</td>
                    <td style={{ maxWidth: "15rem" }}>{service.description}</td>
                    <td>
                      <Switch
                        checked={service.isFeatured}
                        onChange={(checked) => handleFeaturedChange(checked, service._id)}
                      />
                    </td>
                    <td>
                      <Link to={`/service-details/${service._id}`} className="btn btn-info">
                        View Details
                      </Link>{' '}
                      {/* <button className="btn btn-primary" onClick={() => showEditModal(service)}>
                        Edit
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </CCardBody>
      </CCard>

      {/* Edit Service Modal */}
      <Modal
        title="Edit Service"
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
            name: selectedService?.serviceName,
            description: selectedService?.description,
            isFeatured: selectedService?.isFeatured, // Add isFeatured to initial values
          }}
        >
          <Form.Item
            label="Service Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the service name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the service description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Featured Status" name="isFeatured" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ServiceList
