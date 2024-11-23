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
  const [logo, setLogo] = useState(null)
  const [image, setImage] = useState(null)
  const [fileUrl, setFileUrl] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const token = localStorage.getItem('token')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      toast.error('Please select a valid file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsUploadingImage(true) // Start the loader for image

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      })
      setFileUrl(res.data.fileUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setIsUploadingImage(false) // Stop the loader for image
    }
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      toast.error('Please select a valid file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsUploadingLogo(true) // Start the loader for logo

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      })
      setLogoUrl(res.data.fileUrl)
      toast.success('Logo uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload logo')
    } finally {
      setIsUploadingLogo(false) // Stop the loader for logo
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fileUrl || !logoUrl) {
      toast.error('Please upload both image and logo before submitting.')
      return
    }

    const payload = {
      name,
      description,
      image: fileUrl,
      logo: logoUrl, // Add logo URL to the payload
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
      setFileUrl('')
      setLogoUrl('')
      setImage(null)
      setLogo(null)
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
              <div className="col-md-6">
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
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  fileUrl && (
                    <>
                      <label className="form-label">Image Preview</label>
                      <img
                        src={fileUrl}
                        alt="Uploaded"
                        className="img-thumbnail"
                        style={{ maxHeight: '150px' }}
                      />
                    </>
                  )
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLogo" className="form-label">
                  Upload Logo
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputLogo"
                  onChange={handleLogoUpload}
                  required
                />
                {isUploadingLogo ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  logoUrl && (
                    <>
                      <label className="form-label">Logo Preview</label>
                      <img
                        src={logoUrl}
                        alt="Uploaded"
                        className="img-thumbnail"
                        style={{ maxHeight: '150px' }}
                      />
                    </>
                  )
                )}
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
