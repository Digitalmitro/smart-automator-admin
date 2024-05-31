import { CCard, CCardBody, CCardHeader } from '@coreui/react'
// import { Button, TextField } from '@mui/material'

import axios from 'axios'
import React, { useState } from 'react'

const IndexCMS = () => {
  const user = localStorage.getItem('user')
  const user_id = JSON.parse(user)._id
  const [index, setIndex] = useState({
    script: { src: '', type: '', async: '', defer: '', integrity: '', crossorigin: '' },
    link: {
      href: '',
      rel: '',
      type: '',
      media: '',
      sizes: '',
      crossorigin: '',
      as: '',
      integrity: '',
      title: '',
      hreflang: '',
    },
    meta: { name: '', content: '', charset: '', 'http-equiv': '' },
    title: '',
  })
  function handleChange(e) {
    const { name, value } = e.target;
    const field = name.split('-')[0]; // Extracting the field name from input name
    const property = name.split('-')[1]; // Extracting the property name from input name
    setIndex(prevState => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [property]: value
      }
    }));
  }
  async function addIndex() {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/index`, {
        ...index,
        user_id,
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(index);
  return (
    <div>
      <CCard>
        <CCardHeader>
          <h2>Index</h2>
        </CCardHeader>
        <CCardBody>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ marginBottom: '10px' }}>Script</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <input variant="standard" label="src" name="script-src" onChange={handleChange} value={index.script.src} />
                <input variant="standard" label="type" name="script-type" onChange={handleChange} value={index.script.type} />
                <input variant="standard" helperText="Enter true/false" label="async" name="script-async" onChange={handleChange} value={index.script.async} />
                <input variant="standard" helperText="Enter true/false" label="defer" name="script-defer" onChange={handleChange} value={index.script.defer} />
                <input variant="standard" label="integrity" name="script-integrity" onChange={handleChange} value={index.script.integrity} />
                <input variant="standard" label="crossorigin" name="script-crossorigin" onChange={handleChange} value={index.script.crossorigin} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ marginBottom: '10px' }}>Link</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <input variant="standard" label="href" name="link-href" onChange={handleChange} value={index.link.href} />
                <input variant="standard" label="rel" name="link-rel" onChange={handleChange} value={index.link.rel} />
                <input variant="standard" label="type" name="link-type" onChange={handleChange} value={index.link.type} />
                <input variant="standard" label="media" name="link-media" onChange={handleChange} value={index.link.media} />
                <input variant="standard" label="sizes" name="link-sizes" onChange={handleChange} value={index.link.sizes} />
                <input variant="standard" label="crossorigin" name="link-crossorigin" onChange={handleChange} value={index.link.crossorigin} />
                <input variant="standard" label="as" name="link-as" onChange={handleChange} value={index.link.as} />
                <input variant="standard" label="integrity" name="link-integrity" onChange={handleChange} value={index.link.integrity} />
                <input variant="standard" label="title" name="link-title" onChange={handleChange} value={index.link.title} />
                <input variant="standard" label="hreflang" name="link-hreflang" onChange={handleChange} value={index.link.hreflang} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 htmlFor="" style={{ marginBottom: '10px' }}>
                Meta
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <input variant="standard" label="name" name="meta-name" onChange={handleChange} value={index.meta.name} />
                <input variant="standard" label="content" name="meta-content" onChange={handleChange} value={index.meta.content} />
                <input variant="standard" label="charset" name="meta-charset" onChange={handleChange} value={index.meta.charset} />
                <input variant="standard" label="http-equiv" name="meta-httpEquiv" onChange={handleChange} value={index.meta['httpEquiv']} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 htmlFor="" style={{ marginBottom: '10px' }}>
                Title
              </h4>
              <input variant="standard" label="title" onChange={(e) => setIndex({...index, title: e.target.value})} value={index.title} />
            </div>
            <button onClick={addIndex} sx={{ width: '150px' }} variant="contained">
              Update index
            </button>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default IndexCMS
