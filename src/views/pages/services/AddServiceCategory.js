import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const AddServiceCategory = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const token = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name,
      description,
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/admin/add-service-category`,
        payload,
        { headers: { token } },
      )
      toast.success(res.data.message || 'Service category added successfully')
      setName('')
      setDescription('')
      navigate('/service-categories-list')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add service category')
    }
  }
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
            Add Service Category
          </motion.h2>
          <button
            className="btn btn-info text-white"
            style={{ height: '50px' }}
            onClick={() => navigate('/service-categories-list')}
          >
            Service Categories
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Category Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputName"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  required
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddServiceCategory
