import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [active, setActive] = useState(true)
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const token = localStorage.getItem('token')

  // Function to generate slug from the title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading or trailing hyphens
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle)) // Auto-generate slug
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)

    if (!files.length) {
      toast.error('Please select valid files.')
      return
    }

    const uploadedUrls = []
    setIsUploadingImages(true)

    try {
      for (let file of files) {
        const formData = new FormData()
        formData.append('file', file)

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
          headers: { token, 'Content-Type': 'multipart/form-data' },
        })
        uploadedUrls.push(res.data.fileUrl)
      }

      setImageUrls(uploadedUrls)
      toast.success('Images uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload images')
    } finally {
      setIsUploadingImages(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !slug || !imageUrls.length) {
      toast.error('Please fill all required fields and upload at least one image.')
      return
    }

    const payload = {
      title,
      shortDescription,
      description,
      slug,
      active,
      images: imageUrls,
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/admin/add-blog`, payload, {
        headers: { token },
      })
      toast.success(res.data.message || 'Blog added successfully')
      setTitle('')
      setDescription('')
      setShortDescription('')
      setSlug('')
      setActive(false)
      setImageUrls([])
      setImages([])
      navigate('/blogs-list')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add blog')
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
            Add Blog
          </motion.h2>
          <button
            className="btn btn-info text-white"
            style={{ height: '50px' }}
            onClick={() => navigate('/blogs-list')}
          >
            Blog List
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Blog Title
                </label>
                <input
                  value={title}
                  onChange={handleTitleChange} // Update title and slug
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputSlug" className="form-label">
                  Slug
                </label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)} // Allow manual editing if needed
                  type="text"
                  className="form-control"
                  id="inputSlug"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputSlug" className="form-label">
                  Short Description
                </label>
                <input
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)} // Allow manual editing if needed
                  type="text"
                  className="form-control"
                  id="inputSlug"
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
                <label htmlFor="inputImages" className="form-label">
                  Upload Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputImages"
                  onChange={handleImageUpload}
                  multiple
                  required
                />
                {isUploadingImages ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  imageUrls.length > 0 && (
                    <div className="mt-2">
                      <label className="form-label">Image Previews</label>
                      <div className="d-flex flex-wrap gap-2">
                        {imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt="Uploaded"
                            className="img-thumbnail"
                            style={{ maxHeight: '150px' }}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label className="form-check-label me-2" htmlFor="inputActive">
                  Active
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="inputActive"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Blog
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddBlog
