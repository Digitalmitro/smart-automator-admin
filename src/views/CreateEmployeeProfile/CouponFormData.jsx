import { motion } from 'framer-motion'
import { message } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
const CouponformData = () => {
  console.log('product')
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/clients`)
      setData(res.data)
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error)
    }
  }

  // const handleDel = async (id) => {
  //   try {
  //     const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/clients/${id}`)
  //     console.log(res.data)
  //     // Update the state after successful deletion
  //     getData()
  //     // Notify user
  //     message.error('deleted successfully')
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error deleting Product:', error)
  //     // Notify user
  //     message.error('Error deleting Product')
  //   }
  // }

  useEffect(() => {
    getData()
  }, [])
  console.log(data)
  const textStyle = {
    color: data?.wantEmail === true ? 'green' : '#BFA100',
  }
  const downloadExcel = () => {
    if (data?.length === 0) {
      console.error('No data to download')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Convert workbook to array buffer
    const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Convert array buffer to Blob
    const excelBlob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // Create a download link
    const url = URL.createObjectURL(excelBlob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'clients.xlsx')
    document.body.appendChild(link)

    // Trigger the download
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Clients List
          </motion.h2>
          <button style={{height:"45px"}} className="btn btn-success" onClick={downloadExcel}>
            <i class="fa-solid fa-download"></i> Download in Excel
          </button>
        </CCardHeader>
        <CCardBody>
          {/* <input
            type="text"
            placeholder="Search by Provider Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
             <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">First Name</th>

                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>

                  <th scope="col">zipcode</th>
                </tr>
              </thead>
              <tbody>
                {data.map((res) => (
                  <tr key={res._id}>
                    <td>{res.firstName}</td>

                    <td>
                      <p style={{ color: 'green' }}>{res.email}</p>
                    </td>
                    <td>
                      <p>{res.phone}</p>
                    </td>
                    <td>
                      <p>{res.zip}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CouponformData
