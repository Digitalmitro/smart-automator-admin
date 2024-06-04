import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'

const TaskerServices = () => {
  const [tasker, setTasker] = useState()
  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/taskers/${id}`)
    setTasker(res.data)
  }
  console.log(tasker)
  const navigate = useNavigate()
  const { id } = useParams()
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [serviceCategory, setServiceCategory] = useState('')
  const [location, setLocation] = useState('')
  const [pricePerHour, setPricePerHour] = useState(0)
  const postTasker = async (e) => {
    e.preventDefault()
    const payload = {
      image,
      phone: tasker?.phone,
      userName: tasker?.firstName,
      description,
      vehicle,
      serviceCategory,
      location,
      pricePerHour,
      user_id: tasker?._id,
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/service`, payload)
      console.log(res)
      message.success(res.data)
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Create Tasker Services
          </motion.h2>
          <button className="btn btn-info text-white" style={{ height: '50px' }}>
            Services List
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form class="row g-3" onSubmit={postTasker}>
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Image URL
                </label>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://postimages.org/ Direct-URL"
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="About Tasker"
                  type="text"
                  class="form-control"
                  id="inputPassword4"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  vehicle
                </label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="ms-2"
                  name=""
                  id=""
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Service Category
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="ms-2"
                  name=""
                  id=""
                >
                  <option value="Cleaning">Cleaing</option>
                  <option value="Moving">Moving</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="location"
                  type="text"
                  class="form-control"
                  id="inputCity"
                />
              </div>

              <div class="col-md-2">
                <label for="inputZip" class="form-label">
                  Price Per Hour
                </label>
                <input
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  placeholder="per hour $"
                  type="number"
                  class="form-control"
                  id="inputZip"
                />
              </div>

              <div class="col-12">
                <button type="submit" class="btn btn-primary">
                  Register Tasker
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TaskerServices
