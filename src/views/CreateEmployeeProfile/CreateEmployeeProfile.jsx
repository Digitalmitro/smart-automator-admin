import { motion } from 'framer-motion'
import { useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const CreateEmployeeProfile = () => {
  const navigate = useNavigate()
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState('')
  const [zip, setZip] = useState()
  const handelSubmit =async(e)=>{
    e.preventDefault()
      const payload ={
        firstName,
        lastName,
        email,
        phone,
        password,
        zip
      }
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/registertasker`,payload)
        message.success(res.data)
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone();
        setPassword('');
        setZip();
      } catch (error) {
        message.error(error.response.data)
      }
     
  }
  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Create Tasker Profile
          </motion.h2>
          <button
            className="btn btn-info text-white"
            style={{ height: '50px' }}
            onClick={() => navigate('/tasker-list')}
          >
            Tasker List
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handelSubmit} class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  class="form-control"
                  id="inputPassword4"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                />
              </div>

              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  Phone
                </label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="number" class="form-control" id="inputCity" />
              </div>

              <div class="col-md-2">
                <label for="inputZip" class="form-label">
                  Zip
                </label>
                <input value={zip} onChange={(e)=>setZip(e.target.value)} type="number" class="form-control" id="inputZip" />
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

export default CreateEmployeeProfile
