import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'

const TaskerServices = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tasker, setTasker] = useState()
  const getTasker = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/taskers/${id}`)
    setTasker(res.data)
  }
  console.log(tasker)

  useEffect(() => {
    getTasker()
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
            <form class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Image URL
                </label>
                <input placeholder="URL" type="text" class="form-control" id="inputEmail4" />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Description
                </label>
                <input
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
                <select className="ms-2" name="" id="">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Service Category
                </label>
                <select className="ms-2" name="" id="">
                  <option value="Cleaning">Cleaing</option>
                  <option value="Moving">Moving</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  Location
                </label>
                <input placeholder="location" type="text" class="form-control" id="inputCity" />
              </div>

              <div class="col-md-2">
                <label for="inputZip" class="form-label">
                  Price Per Hour
                </label>
                <input placeholder='per hour $' type="number" class="form-control" id="inputZip" />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  Location
                </label>
                <input placeholder="location" type="text" class="form-control" id="inputCity" />
              </div>

              <div class="col-md-2">
                <label for="inputZip" class="form-label">
                  Price Per Hour
                </label>
                <input placeholder='per hour $' type="number" class="form-control" id="inputZip" />
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
