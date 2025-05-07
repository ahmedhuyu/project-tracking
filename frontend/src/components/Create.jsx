import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material'; // Import Alert
import MyDatePickerField from './forms/MyDatePickerField';
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField';
import MyTextField from './forms/MyTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Create = () => {
  const [projectmanager, setProjectmanager] = useState()
  const [loading, setLoading] = useState(true)

  const hardcoded_options = [
    {id:'', name: 'none'},
    {id:'Open', name: 'Open'},
    {id:'In progress', name: 'In progress'},
    {id:'Completed', name: 'Completed'},
  ]

  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setProjectmanager(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    GetData()

  }, [])

  const navigate = useNavigate();
  const [error, setError] = useState(''); // State to store error message

  const defaultValue = {
    name: '',
    comments: '',
    status: '',
  };

  const schema = yup
  .object({
    name: yup.string().required('Name is required field'),
    projectmanager: yup.string().required('Project manager is a required field'),
    status: yup.string().required('Status is required field'),
    comments: yup.string(),
    start_date: yup.date().required('Start date is required field'),
    end_date: yup.date().required('End date is required field').min(yup.ref('start_date'), 'The end date can not be before the start date'),
  })
  .required()

  const { handleSubmit, control } = useForm({ defaultValues: defaultValue, resolver: yupResolver(schema) });

  const submission = (data) => {
    const StartDate = dayjs(data.start_date['$d']).format('YYYY-MM-DD');
    const EndDate = dayjs(data.end_date['$d']).format('YYYY-MM-DD');
    AxiosInstance.post(`project/`, {
      name: data.name,
      projectmanager: data.projectmanager,
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
      { loading ? <p> Loading Data ...</p> :
        <form onSubmit={handleSubmit(submission)}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              backgroundColor: '#00003f',
              marginBottom: '10px',
              borderRadius: '8px', // Add border radius
            }}
          >
            <Typography sx={{ margin: '20px', color: '#fff' }}>Create Record</Typography>
          </Box>

          {/* Display Alert if there's an error */}
          {error && (
            <Box sx={{ marginBottom: '10px', borderRadius: '8px' }}>
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              boxShadow: 3,
              padding: 4,
              flexDirection: 'column',
              borderRadius: '8px', // Add border radius
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '40px',
                borderRadius: '8px', // Add border radius
              }}
            >
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                borderRadius: '8px', // Add border radius
              }}
            >
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
                options={hardcoded_options}
              />
              <MySelectField
                label="Project Manager"
                name="projectmanager"
                control={control}
                width={'30%'}
                options={projectmanager}
              />

            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
                gap: 2, // Add spacing between buttons
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: '30%',
                  borderRadius: '8px', // Add border radius to the button
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: '30%',
                  borderRadius: '8px', // Add border radius to the button
                }}
                onClick={() => navigate('/')} // Navigate to the home page
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      }
    </div>
  );
};

export default Create;