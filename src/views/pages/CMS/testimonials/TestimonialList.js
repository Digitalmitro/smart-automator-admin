import { motion } from 'framer-motion'
import { message } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const TestimonialList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/get-testimonials`, {
        headers: { token },
      })
      setData(res.data.testimonials) // Access `testimonials` from response
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      message.error('Failed to load testimonials')
    }
  }

  const handleAddTestimonial = () => {
    navigate('/add-testimonial')
  }

  const handleEditTestimonial = (testimonialId) => {
    navigate(`/edit-testimonial/${testimonialId}`)
  }

  const handleDeleteTestimonial = async (testimonialId) => {
    // Confirm deletion before proceeding
    const confirmDelete = window.confirm('Are you sure you want to delete this testimonial?')
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_BACKEND_API}/admin/delete-testimonial/${testimonialId}`,
          {
            headers: { token },
          },
        )
        message.success(res.data.message)
        // Re-fetch testimonial data after successful deletion
        getData()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
        message.error('Failed to delete testimonial')
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
            Testimonial List
          </motion.h2>
          <button className="btn btn-primary" onClick={handleAddTestimonial}>
            Add Testimonial
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((testimonial) => (
                  <tr key={testimonial._id}>
                    <td style={{ textTransform: 'capitalize' }}>{testimonial.title}</td>
                    <td>{testimonial.description}</td>
                    <td>
                      <span style={{ color: testimonial.active ? 'green' : 'red' }}>
                        {testimonial.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(testimonial.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditTestimonial(testimonial._id)}
                      >
                        Edit
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDeleteTestimonial(testimonial._id)}
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

export default TestimonialList
