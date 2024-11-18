import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams, useNavigate } from 'react-router-dom'

const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditMode, setIsEditMode] = useState(false)
  const [service, setService] = useState(null)
  const [categories, setCategories] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    const fetchServiceDetails = async () => {
      try {
        const serviceRes = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/service/${id}`, {
          headers: { token },
        })
        setService(serviceRes.data.service)
        const categoryRes = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/service-categories`, {
          headers: { token },
        })
        setCategories(categoryRes.data.categories)
      } catch (error) {
        toast.error('Failed to load service details or categories')
      }
    }
    fetchServiceDetails()
  }, [id, token, navigate])

  const toggleEditMode = () => setIsEditMode(!isEditMode)

  const handleInputChange = (field, value) => {
    setService({ ...service, [field]: value })
  }

  const handleImageUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      })
      setService({ ...service, image: res.data.fileUrl })
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error('Image upload failed')
    }
  }

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_API}/admin/edit-service/${id}`, service, {
        headers: { token },
      })
      toast.success('Service updated successfully')
      setIsEditMode(false)
    } catch (error) {
      toast.error('Failed to update service')
    }
  }

  if (!service) return <p>Loading...</p>

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <motion.h2 className="fw-bold mb-0">Service Details</motion.h2>
          <div className="d-flex gap-2">
            <button
              className="btn btn-info text-white"
              onClick={() => navigate('/service-list')}
            >
              Services List
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={toggleEditMode}
            >
              {isEditMode ? 'Cancel Edit' : 'Edit'}
            </button>
          </div>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form className="row g-3" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
              <div className="col-md-6">
                <label htmlFor="serviceName" className="form-label">
                  Service Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceName"
                  value={service.serviceName}
                  onChange={(e) => handleInputChange('serviceName', e.target.value)}
                  required
                  disabled={!isEditMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={service.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  disabled={!isEditMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="shortDescription" className="form-label">
                  Short Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortDescription"
                  value={service.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  required
                  disabled={!isEditMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  disabled={!isEditMode}
                />
                {service.image && (
                  <img
                    src={service.image}
                    alt="Service"
                    className="img-thumbnail mt-2"
                    style={{ maxWidth: '200px' }}
                  />
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="hourlyCharge" className="form-label">
                  Hourly Charge
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="hourlyCharge"
                  value={service.hourlyCharge}
                  onChange={(e) => handleInputChange('hourlyCharge', e.target.value)}
                  required
                  disabled={!isEditMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="serviceCategory" className="form-label">
                  Service Category
                </label>
                <select
                  className="form-control"
                  id="serviceCategory"
                  value={service.serviceCategory._id}
                  onChange={(e) => handleInputChange('serviceCategory', e.target.value)}
                  required
                  disabled={!isEditMode}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                {isEditMode && (
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ServiceDetails
