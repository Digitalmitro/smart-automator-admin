import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom'

const EditTestimonial = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [active, setActive] = useState(true)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const token = localStorage.getItem('token')

  // Fetch Testimonial Details
  const fetchTestimonialDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/get-testimonial/${id}`, {
        headers: { token },
      })
      const { title, description, image, active } = res.data.testimonial
      setTitle(title)
      setDescription(description)
      setImage(image)
      setActive(active)
    } catch (error) {
      toast.error('Failed to fetch testimonial details')
    //   navigate('/testimonials-list')
    }
  }

  useEffect(() => {
    if (token) {
      fetchTestimonialDetails()
    } else {
      navigate('/login')
    }
  }, [token])

  // Handle Image Upload
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
      toast.error('Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !image) {
      toast.error('Please fill all required fields and upload an image.')
      return
    }

    const payload = {
      title,
      description,
      active,
      image,
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/edit-testimonial/${id}`,
        payload,
        { headers: { token } },
      )
      toast.success(res.data.message || 'Testimonial updated successfully')
      navigate('/testimonials-list')
    } catch (error) {
      toast.error('Failed to update testimonial')
    }
  }

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader>
          <motion.h2 className="fw-bold">Edit Testimonial</motion.h2>
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
              <div className="col-md-6">
                <label htmlFor="inputImage" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputImage"
                  onChange={handleImageUpload}
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
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <div>
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    checked={active}
                    onChange={() => setActive(true)}
                  />
                  <label htmlFor="active" className="ms-2">
                    Active
                  </label>
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    checked={!active}
                    onChange={() => setActive(false)}
                    className="ms-3"
                  />
                  <label htmlFor="inactive" className="ms-2">
                    Inactive
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default EditTestimonial
