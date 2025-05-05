import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material'; // Import Alert
import MyDatePickerField from './forms/MyDatePickerField';
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField';
import MyTextField from './forms/MyTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const MyParam = useParams()
  const MyId = MyParam.id 

  

  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      console.log(res.data);
      setValue('name', res.data.name);
      setValue('status', res.data.status);
      setValue('comments', res.data.comments); // Ensure this matches the backend key
      setValue('start_date', Dayjs(res.data.start_date));
      setValue('end_date', Dayjs(res.data.end_date));
    });
  };

  useEffect(() => {
    GetData()
  }, [])

  const navigate = useNavigate();
  const [error, setError] = useState(''); // State to store error message

  const defaultValue = {
    name: '',
    comments: '', // Corrected
    status: '',
  };

  const { handleSubmit, setValue, control } = useForm({ defaultValues: defaultValue });

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date['$d']).format('YYYY-MM-DD');
    const EndDate = Dayjs(data.end_date['$d']).format('YYYY-MM-DD');
    AxiosInstance.put(`project/${MyId}/`, {
      name: data.name,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setError('A project with this name already exists.'); // Set error message
        } else {
          setError('An unexpected error occurred.'); // Handle other errors
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff' }}>Edit Record</Typography>
        </Box>

        {/* Display Alert if there's an error */}
        {error && (
          <Box sx={{ marginBottom: '10px' }}>
            <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
          </Box>
        )}

        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MyTextField
              label="Name"
              name="name"
              control={control}
              placeholder="Please enter project name"
              width={'30%'}
            />
            <MyDatePickerField
              label="Start date"
              name="start_date"
              control={control}
              width={'30%'}
            />
            <MyDatePickerField
              label="End date"
              name="end_date"
              control={control}
              width={'30%'}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <MyMultiLineField
              label="Comments"
              name="comments"
              control={control}
              placeholder="Please enter project description"
              width={'30%'}
            />
            <MySelectField
              label="Status"
              name="status"
              control={control}
              width={'30%'}
            />
            <Box sx={{ width: '30%', display: 'flex', gap: 2 }}>
              <Button variant="contained" type="submit" sx={{ width: '50%' }}>
                Submit
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
      </form>
    </div>
  );
};

export default Edit;