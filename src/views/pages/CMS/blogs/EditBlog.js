import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
const EditBlog = () => {
  const { id } = useParams()
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


  const fetchBlogDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/blog/${id}`, {
        headers: { token },
      })
      const { title, description, shortDescription, slug, active, images } = res.data.blog
      setTitle(title)
      setDescription(description)
      setShortDescription(shortDescription)
      setSlug(slug)
      setActive(active)
      setImageUrls(images)
    } catch (error) {
      toast.error('Failed to fetch blog details')
        navigate('/blogs-list')
    }
  }

  useEffect(() => {
    if (token) {
      fetchBlogDetails()
    } else {
      navigate('/login')
    }
  }, [token])

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

      setImageUrls((prev) => [...prev, ...uploadedUrls])
      toast.success('Images uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload images')
    } finally {
      setIsUploadingImages(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !shortDescription || !description || !slug || !imageUrls.length) {
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
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/admin/edit-blog/${id}`,
        payload,
        { headers: { token } },
      )
      toast.success(res.data.message || 'Blog updated successfully')
      navigate('/blogs-list')
    } catch (error) {
      toast.error('Failed to update blog')
    }
  }

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader>
          <motion.h2 className="fw-bold">Edit Blog</motion.h2>
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
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setSlug(e.target.value)}
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
                  onChange={(e) => setShortDescription(e.target.value)}
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
                <ReactQuill
                 theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="form-control"
                  id="inputDescription"
                  rows="5"
                  required
                />
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

export default EditBlog
