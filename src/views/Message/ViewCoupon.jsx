import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import { motion } from 'framer-motion';

const ViewCoupon = () => {
  const [coupon, setCoupon] = useState([])
  useEffect(() => {
    getCoupons()
  }, [])
  async function getCoupons() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/coupon`)
      setCoupon(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
        <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
          View Coupons
        </motion.h2>
        {/* <button onClick={() => navigate('/message')} className="btn btn-dark" style={{ height: '45px' }}>
            Set Coupon
          </button> */}
      </CCardHeader>
      <CCardBody>
        <motion.div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Coupon Name</th>
                <th scope="col">Discount%</th>
                <th scope="col">Status</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {coupon.map((res) => (
                <tr key={res._id}>
                  <td>{res.couponName}</td>
                  <td>{res.discount}</td>
                  <td>
                      <button className="btn btn-success">{res.status}</button>
                    </td>
                  {/* <td className="d-flex">
                      <button className="btn btn-danger" onClick={() => handleDel(res._id)}>Remove</button>
                      <button onClick={() => navigate(`/update-coupon/${res._id}`)} className="btn btn-dark ms-4">Edit</button>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </CCardBody>
    </CCard>
  )
}

export default ViewCoupon
