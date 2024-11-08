import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'


const AddService = () => {
  const navigate = useNavigate()
  const [serviceName, setServiceName] = useState('')
  const [description, setDescription] = useState('')
  const [hourlyCharge, setHourlyCharge] = useState('')
  const [serviceCategory, setServiceCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([{ question: '', options: [''] }])
  const token = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      serviceName,
      description,
      hourlyCharge,
      serviceCategory,
      questions,
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/admin/add-service`,
        payload,
        { headers: { token } },
      )
      toast.success(res.data.message || 'Service added successfully')
      setServiceName('')
      setDescription('')
      setHourlyCharge('')
      setServiceCategory('')
      setQuestions([{ question: '', options: [''] }])
      navigate('/service-list')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add service')
    }
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [''] }])
  }

  const handleDeleteQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, qIndex) => qIndex !== index))
    }
  }

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].question = value
    setQuestions(updatedQuestions)
  }

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].options.push('')
    setQuestions(updatedQuestions)
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].options[oIndex] = value
    setQuestions(updatedQuestions)
  }

  const handleDeleteOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions]
    if (updatedQuestions[qIndex].options.length > 1) {
      updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, index) => index !== oIndex)
      setQuestions(updatedQuestions)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      // Fetch service categories for the dropdown
      axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/service-categories`, {
        headers: { token },
      }).then(res => {
        setCategories(res.data.categories)
      }).catch(() => {
        toast.error('Failed to load service categories')
      })
    }
  }, [token])

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Add Service
          </motion.h2>
          <button
            className="btn btn-info text-white"
            style={{ height: '50px' }}
            onClick={() => navigate('/services-list')}
          >
            Services List
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="serviceName" className="form-label">
                  Service Name
                </label>
                <input
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="serviceName"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="form-control"
                  id="description"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="hourlyCharge" className="form-label">
                  Hourly Charge
                </label>
                <input
                  value={hourlyCharge}
                  onChange={(e) => setHourlyCharge(e.target.value)}
                  type="number"
                  className="form-control"
                  id="hourlyCharge"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="serviceCategory" className="form-label">
                  Service Category
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="form-control"
                  id="serviceCategory"
                  required
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
              {questions.map((question, qIndex) => (
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
                    />
                    {questions.length > 1 && (
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
                      />
                      {question.options.length > 1 && (
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
                  <button
                    type="button"
                    className="btn btn-outline-primary mb-3"
                    onClick={() => handleAddOption(qIndex)}
                  >
                    Add Another Option
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-secondary mb-4"
                onClick={handleAddQuestion}
              >
                Add Another Question
              </button>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddService
