import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const AddTestimonial = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const token = localStorage.getItem('token')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      toast.error('Please select a valid file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsUploadingImage(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      })
      setImage(res.data.fileUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !image) {
      toast.error('Please fill all required fields and upload an image.')
      return
    }

    const payload = {
      title,
      description,
      image,
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/admin/add-testimonial`, payload, {
        headers: { token },
      })
      toast.success(res.data.message || 'Testimonial added successfully')
      setTitle('')
      setDescription('')
      setImage('')
      navigate('/testimonials-list')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add testimonial')
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
            Add Testimonial
          </motion.h2>
          <button
            className="btn btn-info text-white"
            style={{ height: '50px' }}
            onClick={() => navigate('/testimonials-list')}
          >
            Testimonial List
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-12">
                <label htmlFor="inputTitle" className="form-label">
                  Testimonial Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  id="inputDescription"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputImage" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputImage"
                  onChange={handleImageUpload}
                  required
                />
                {isUploadingImage ? (
                  <div className="text-center mt-2">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  image && (
                    <div className="mt-2">
                      <label className="form-label">Image Preview</label>
                      <div>
                        <img
                          src={image}
                          alt="Uploaded"
                          className="img-thumbnail"
                          style={{ maxHeight: '150px' }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Testimonial
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddTestimonial
