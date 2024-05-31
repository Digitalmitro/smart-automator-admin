import React, { useState } from 'react'
import {Button} from "@mui/material"
import { message } from 'antd'
const Accounts_Privacy = () => {
  const Profile = localStorage.getItem('user')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile?._id
  const [orderWithoutLogin,setOrderLogin]=useState(false)
  const [logExixtAccInCheckout,setExixtAcc]=useState(false)
  const [registerAccInCheckout,setRegAcc]=useState(false)
  const [createAccount,setCreateacc]=useState(false)
  const [sentLinkToReset,setLink]=useState(false)
  const [deleteUserIDFromOrder,setDelid]=useState(false)
  const handleSave = async () => {
   
    const payload = {
      orderWithoutLogin,
      logExixtAccInCheckout,
      registerAccInCheckout,
      createAccount,
      sentLinkToReset,
      deleteUserIDFromOrder,
      user_id, // Assuming user_id is defined elsewhere
    };
    console.log(payload);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/general-settings`, payload);
      message.success(res.data.message);
    } catch (error) {
      console.error('Error saving payment settings:', error);
      message.error('Failed to save payment settings');
    }
  };
  return (
    <div>
      <div class="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Guest checkout</label>
        <div>
          <div class="mb-3 form-check">
            <input value={orderWithoutLogin} onChange={(e) => setOrderLogin(e.target.checked)} type="checkbox" class="form-check-input" id="checkout" />
            <label class="form-check-label" for="checkout">
              Allow customers to place orders without an account Login
            </label>
          </div>
          <div class="mb-3 form-check">
            <input value={logExixtAccInCheckout} onChange={(e) => setExixtAcc(e.target.checked)} type="checkbox" class="form-check-input" id="checkout2" />
            <label class="form-check-label" for="checkout2">
              Allow customers to log into an existing account during checkout
            </label>
          </div>
        </div>
      </div>
      <div class="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Account creation</label>
        <div>
          <div class="mb-3 form-check">
            <input value={registerAccInCheckout} onChange={(e) => setRegAcc(e.target.checked)} type="checkbox" class="form-check-input" id="checkout" />
            <label class="form-check-label" for="checkout">
              Allow customers to create an account during checkout
            </label>
          </div>
          <div class="mb-3 form-check">
            <input value={createAccount} onChange={(e) => setCreateacc(e.target.checked)} type="checkbox" class="form-check-input" id="checkout2" />
            <label class="form-check-label" for="checkout2">
              Allow customers to create an account on the "My account" page
            </label>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="checkout2" />
            <label class="form-check-label" for="checkout2">
              When creating an account, send the new user a link to set their password
            </label>
          </div>
        </div>
      </div>
      <div class="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Personal data removal</label>
        <div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="checkout" />
            <label class="form-check-label" for="checkout">
              Allow personal data to be removed in bulk from orders
            </label>
            <div id="emailHelp" class="form-text" style={{ fontSize: '12px' }}>
              Adds an option to the orders screen for removing personal data in bulk. Note that
              removing personal data cannot be undone.
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleSave} variant="outlined">
        Save changes
      </Button>
    </div>
  )
}

export default Accounts_Privacy
