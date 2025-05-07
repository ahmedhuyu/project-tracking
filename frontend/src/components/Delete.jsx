import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material'; // Import Alert
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';

const Delete = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;

  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      setMyData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleDelete = () => {
    AxiosInstance.delete(`project/${MyId}/`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>

      {loading ? <p> Loading Data ...</p> : 
      
      <div> 
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ margin: '20px', color: '#fff' }}>
            Delete Project: {myData ? myData.name : 'Loading...'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
          {/* Always-Visible Alert Box */}
          <Alert
            severity="warning"
            sx={{ marginBottom: '20px' }}
          >
            Are you sure you want to delete this project? This action cannot be undone.
          </Alert>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <Box sx={{ width: '30%', display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                sx={{ width: '50%' }}
                onClick={handleDelete} // Perform the delete action
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                sx={{ width: '50%' }}
                onClick={() => navigate('/')} // Navigate to the home page
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
      }
    </div>
  );
};

export default Delete;