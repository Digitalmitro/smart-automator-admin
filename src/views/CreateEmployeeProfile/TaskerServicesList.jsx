import { motion } from 'framer-motion'
import { message } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
const TaskerServicesList = () => {
  console.log('product')
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/service`)
      setData(res.data)
      console.log(res.data)
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error)
    }
  }
  console.log(data)

  const handleDel = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/service/${id}`)
      console.log(res.data)
      // Update the state after successful deletion
      getData()
      // Notify user
      message.error('deleted successfully')
    } catch (error) {
      // Handle error
      console.error('Error deleting Product:', error)
      // Notify user
      message.error('Error deleting Product')
    }
  }

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
    link.setAttribute('download', 'taskers-data.xlsx')
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
            Services List
          </motion.h2>
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
                  <th scope="col">image</th>
                  <th scope="col">username</th>
                  <th scope="col">location</th>
                  <th scope="col">phone</th>
                  <th scope="col">price per hour</th>
                  <th scope="col">service category</th>
                  <th scope="col">total task</th>
                  <th scope="col">vehicle</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((res) => (
                  <tr key={res._id}>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_API}/uploads/${res.image}`}
                        alt={`${res.image}`}
                        className=""
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>

                    <td>
                      <p style={{ color: 'green' }}>{res.userName}</p>
                    </td>
                    <td>
                      <p>{res.location}</p>
                    </td>
                    <td>
                      <p>{res.phone}</p>
                    </td>
                    <td>
                      <p>{res.pricePerHour}</p>
                    </td>
                    <td>
                      <p>{res.serviceCategory}</p>
                    </td>
                    <td>
                      <p>{res.totaltask}</p>
                    </td>
                    <td>
                      <p>{res.vehicle}</p>
                    </td>
                    <td className="d-flex" style={{ gap: '10px' }}>
                      <button className="btn btn-danger" onClick={() => handleDel(res._id)}>
                        Delete
                      </button>
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

export default TaskerServicesList
