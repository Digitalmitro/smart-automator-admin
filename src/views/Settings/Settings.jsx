// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// import { message, Upload } from 'antd'
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { CCard, CCardHeader, CCardBody } from '@coreui/react'
// import { useNavigate } from 'react-router-dom'

// const Settings = () => {
//   const admin = localStorage.getItem('user')
//   const user_id = JSON.parse(admin)._id
//   const [taxRate, setTaxRate] = useState(0)
//   const [user, setUser] = useState({})

//   function handleChange(e) {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }
//   console.log(taxRate, user)
//   useEffect(() => {
//     getData()
//   }, [])

//   async function getData() {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/tax`)
//       // const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/getalladmin`)
//       setTaxRate(data[0].rate)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   async function handleSave(e) {
//     e.preventDefault()
//     try {
//       if (e.target.name === 'tax') {
//         const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/tax`, {
//           rate: taxRate,
//           user_id,
//         })
//         message.success(data.message)
//       } else {
//         const { data } = await axios.post(
//           `${process.env.REACT_APP_BACKEND_API}/registeradmin`,
//           user,
//         )
//         message.success(data.message)
//         setUser({email: "", password: ""})
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const navigate = useNavigate()
//   return (
//     <>
//       <motion.div className="tax-area">
//         <CCard className="mb-4">
//           <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
//             <motion.h2 className="  fw-bold" style={{ marginBottom: '40px' }}>
//               Tax Rates{''}
//             </motion.h2>
//           </CCardHeader>
//           <CCardBody>
//             <motion.div>
//               <form name="tax" onSubmit={handleSave}>
//                 <div className="container">
//                   <div className="row">
//                     <div className="input-group mb-2 col" style={{ gap: '20px' }}>
//                       <label>Tax Rate</label>
//                       <div>
//                         <input
//                           value={taxRate}
//                           onChange={(e) => setTaxRate(e.target.value)}
//                           placeholder="Set Tax Rate in % 1-50"
//                           type="number"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <button className="btn btn-dark" type="submit" style={{ marginTop: '20px' }}>
//                   Save
//                 </button>
//               </form>
//             </motion.div>
//           </CCardBody>
//         </CCard>
//       </motion.div>
//       <motion.div className="add-admin">
//         <CCard className="mb-4">
//           <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
//             <motion.h2 className="  fw-bold" style={{ marginBottom: '40px' }}>
//               Admin Access{''}
//             </motion.h2>
//             <button onClick={() => navigate("/admin-list")} className="btn btn-info" style={{ height: '40px' }}>
//               Admin Lists
//             </button>
//           </CCardHeader>
//           <CCardBody>
//             <motion.div>
//               <form name="add-admin" onSubmit={handleSave}>
//                 <div className="container">
//                   <div className="row">
//                     <div className="input-group mb-2 col" style={{ gap: '20px' }}>
//                       <label>Email</label>
//                       <div>
//                         <input
//                           placeholder="New admin Email"
//                           type="email"
//                           name="email"
//                           value={user.email}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="input-group mb-2 col" style={{ gap: '20px' }}>
//                       <label>Password</label>
//                       <div>
//                         <input
//                           placeholder="Password"
//                           type="text"
//                           name="password"
//                           value={user.password}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <button className="btn btn-dark" type="submit" style={{ marginTop: '20px' }}>
//                   Save
//                 </button>
//               </form>
//             </motion.div>
//           </CCardBody>
//         </CCard>
//       </motion.div>
//     </>
//   )
// }
// export default Settings

import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import General from './General'
import Product from './Product'
import Tax from './Tax'
import Shipping from './Shipping'
import Payments from './Payments'
import Accounts_Privacy from './Accounts_Privacy'
import Email from './Email'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Product" {...a11yProps(1)} />
          <Tab label="Tax" {...a11yProps(2)} />
          <Tab label="Shipping" {...a11yProps(3)} />
          <Tab label="Payments" {...a11yProps(4)} />
          <Tab label="Accounts & Privacy" {...a11yProps(5)} />
          <Tab label="Emails" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <General />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Product />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Tax />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Shipping />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Payments />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Accounts_Privacy />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Email />
      </CustomTabPanel>
    </Box>
  )
}
