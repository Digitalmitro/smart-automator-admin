import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const HomePageCMS = () => {
  const navigate = useNavigate()
  //   const [name, setName] = useState('')
  // const [description, setDescription] = useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false) // State to track upload status
  const token = localStorage.getItem('token')

  const [homeCms, setHomeCms] = useState({
    heading: '',
    banner: '',
    description: '',
  })

  const getHomeContent = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/home-cms`)
      .then((res) => {
        console.log(res.data)
        setHomeCms(res.data.homeCMS.homePage)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      toast.error('Please select a valid file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsUploading(true) // Start the loader

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      })
      setFileUrl(res.data.fileUrl)
      setHomeCms({ ...homeCms, banner: res.data.fileUrl })
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setIsUploading(false) // Stop the loader
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fileUrl) {
      toast.error('Please upload an image before submitting.')
      return
    }

    const payload = {
      heading: homeCms.heading,
      banner: homeCms.banner,
      description: homeCms.description,
    }

    console.log('PAYLOAD', payload)

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/admin/home-cms`, payload, {
        headers: { token },
      })
      toast.success(res.data.message || 'Home Page content updated successfully')
      setHomeCms({})
      setFileUrl('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update home page content')
    }
  }

  useEffect(() => {
    getHomeContent()
  }, [])

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
            Manage Home Page Content
          </motion.h2>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Heading
                </label>
                <input
                  value={homeCms.heading}
                  onChange={(e) => setHomeCms({ ...homeCms, heading: e.target.value })}
                  type="text"
                  className="form-control"
                  id="inputName"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <input
                  value={homeCms.description}
                  onChange={(e) => setHomeCms({ ...homeCms, description: e.target.value })}
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputImage" className="form-label">
                  Upload Banner
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputImage"
                  onChange={handleImageUpload}
                  required
                />
              </div>
              <div className="col-md-6">
                {isUploading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  (fileUrl || homeCms.banner) && (
                    <>
                      <label className="form-label">Preview</label>
                      <img
                        src={fileUrl ?? homeCms.banner}
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
                  Save Home Page
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default HomePageCMS
