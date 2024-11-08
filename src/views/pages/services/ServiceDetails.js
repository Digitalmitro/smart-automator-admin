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

  const handleQuestionChange = (qIndex, value) => {
    const updatedQuestions = [...service.questions]
    updatedQuestions[qIndex].question = value
    setService({ ...service, questions: updatedQuestions })
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...service.questions]
    updatedQuestions[qIndex].options[oIndex] = value
    setService({ ...service, questions: updatedQuestions })
  }

  const handleAddQuestion = () => {
    setService({
      ...service,
      questions: [...service.questions, { question: '', options: [''] }],
    })
  }

  const handleDeleteQuestion = (qIndex) => {
    if (service.questions.length > 1) {
      setService({
        ...service,
        questions: service.questions.filter((_, index) => index !== qIndex),
      })
    }
  }

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...service.questions]
    updatedQuestions[qIndex].options.push('')
    setService({ ...service, questions: updatedQuestions })
  }

  const handleDeleteOption = (qIndex, oIndex) => {
    const updatedQuestions = [...service.questions]
    if (updatedQuestions[qIndex].options.length > 1) {
      updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, index) => index !== oIndex)
      setService({ ...service, questions: updatedQuestions })
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
                  value={service.serviceCategory._id} // Set pre-selected value
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

              {/* Dynamic Questions and Options */}
              {service.questions.map((question, qIndex) => (
                <div key={qIndex} className="col-12">
                  <label className="form-label">Question {qIndex + 1}</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter question"
                      value={question.question}
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      required
                      disabled={!isEditMode}
                    />
                    {isEditMode && service.questions.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteQuestion(qIndex)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter option"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        required
                        disabled={!isEditMode}
                      />
                      {isEditMode && question.options.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteOption(qIndex, oIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditMode && (
                    <button
                      type="button"
                      className="btn btn-outline-primary mb-3"
                      onClick={() => handleAddOption(qIndex)}
                    >
                      Add Another Option
                    </button>
                  )}
                </div>
              ))}
              {isEditMode && (
                <button
                  type="button"
                  className="btn btn-outline-secondary mb-4"
                  onClick={handleAddQuestion}
                >
                  Add Another Question
                </button>
              )}

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
