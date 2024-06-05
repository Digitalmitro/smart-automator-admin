import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

const TaskerServices = () => {
  const [tasker, setTasker] = useState();
  const [file, setFile] = useState(null); // State to hold the selected file
  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/taskers/${id}`);
    setTasker(res.data);
  };
  console.log(tasker);
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [vehicle, setVehicle] = useState('Yes');
  const [serviceCategory, setServiceCategory] = useState('Cleaning');
  const [location, setLocation] = useState('');
  const [pricePerHour, setPricePerHour] = useState(0);
  const postTasker = async (e) => {
    e.preventDefault();
    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file); // Append the selected file to the form data
      formData.append('phone', tasker?.phone);
      formData.append('userName', tasker?.firstName);
      formData.append('description', description);
      formData.append('vehicle', vehicle);
      formData.append('serviceCategory', serviceCategory);
      formData.append('location', location);
      formData.append('pricePerHour', pricePerHour);
      formData.append('user_id', tasker?._id);

      // Post form data
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/service`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
        },
      });
      console.log(res);
      message.success(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Create Tasker Services
          </motion.h2>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form className="row g-3" onSubmit={postTasker}>
              <div className="col-md-6">
                <label htmlFor="inputFile" className="form-label">
                  User Image Upload
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputFile"
                  onChange={(e) => setFile(e.target.files[0])} // Handle file selection
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="About Tasker"
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputVehicle" className="form-label">
                  Vehicle
                </label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="form-select"
                  id="inputVehicle"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputServiceCategory" className="form-label">
                  Service Category
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="form-select"
                  id="inputServiceCategory"
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Moving">Moving</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLocation" className="form-label">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  type="text"
                  className="form-control"
                  id="inputLocation"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputPricePerHour" className="form-label">
                  Price Per Hour
                </label>
                <input
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  placeholder="Per Hour $"
                  type="number"
                  className="form-control"
                  id="inputPricePerHour"
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Register Tasker
                </button>
              </div>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default TaskerServices;
