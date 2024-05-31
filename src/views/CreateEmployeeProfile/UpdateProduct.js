import { motion } from 'framer-motion';
import { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CHeader } from '@coreui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        // image: fileList.map((file) => file.thumbUrl), // Adjust this according to how your server expects the image data
      }
      if (formData.title !== "") {
        payload.title = formData.title
      } else if (formData.price !== "") {
        payload.price = formData.price
      } else if (formData.description !== "") {
        payload.description = formData.description
      } else if (formData.category !== "") {
        payload.category = formData.category
      } else if (formData.stock !== "") {
        payload.stock = formData.stock
      } else if (fileList.length > 0) {
        payload.image = fileList.map((file) => file.thumbUrl)
      }
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/products/${id}`, payload);
      console.log(response.data); // Log the response from the server
      toast.success('Product created successfully');
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
      });
      setFileList([]);
      setTimeout(() => {
        navigate("/product-list")
      }, 500)
    } catch (error) {
      console.error(error);
      toast.error('Error creating product');
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <ToastContainer />
      <CCard>
        <CHeader>
          <h2>Update Product</h2>
        </CHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Product Title</label>
                    <div>
                      <input
                        type="text"
                        // required
                        placeholder="Product Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Product Description</label>
                    <div>
                      <input
                        placeholder="Product Description"
                        type="text"
                        // required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Product Category</label>
                    <div className="">
                      <input
                        placeholder="product category"
                        type="text"
                        // required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Product Price</label>
                    <div>
                      <input
                        placeholder="product price"
                        type="text"
                        // required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 mt-4" style={{ gap: '20px' }}>
                    <label>Product Stock</label>
                    <div>
                      <input
                        placeholder="product stock"
                        type="number"
                        // required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                  </div>
                  <div
                    className="input-group mb-2 col"
                    style={{ gap: '20px', alignItems: 'center' }}
                  >
                    <label>Product Image</label>
                    <div className="ms-5">
                      <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      {previewImage && (
                        <Image
                          wrapperStyle={{
                            display: 'none',
                          }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                          }}
                          src={previewImage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-dark" type="submit" style={{ marginTop: '20px' }}>
                Update
              </button>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default UpdateProduct