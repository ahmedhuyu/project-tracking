import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField';
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField';
import MyTextField from './forms/MyTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import MyMultipleSelectField from './forms/MyMultiSelectField';

const Edit = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;

  const [employees, setEmployees] = useState()
  const [projectmanager, setProjectmanager] = useState();
  const [loading, setLoading] = useState(true);

  const hardcoded_options = [
    { id: '', name: 'none' },
    { id: 'Open', name: 'Open' },
    { id: 'In progress', name: 'In progress' },
    { id: 'Completed', name: 'Completed' },
  ];

  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setProjectmanager(res.data);
      console.log(res.data);
    });

    AxiosInstance.get(`employees/`).then((res) => {
      setEmployees(res.data)
      console.log(res.data)
      setLoading(false)
    })

    AxiosInstance.get(`project/${MyId}`).then((res) => {
      console.log(res.data);
      setValue('name', res.data.name);
      setValue('status', res.data.status);
      setValue('employees', res.data.employees);
      setValue('projectmanager', res.data.projectmanager);
      setValue('comments', res.data.comments);
      setValue('start_date', dayjs(res.data.start_date));
      setValue('end_date', dayjs(res.data.end_date));
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const defaultValue = {
    name: '',
    comments: '',
    status: '',
  };

  const { handleSubmit, setValue, control } = useForm({ defaultValues: defaultValue });

  const submission = (data) => {
    const StartDate = dayjs(data.start_date['$d']).format('YYYY-MM-DD');
    const EndDate = dayjs(data.end_date['$d']).format('YYYY-MM-DD');
    AxiosInstance.put(`project/${MyId}/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then((res) => {
      navigate('/');
    });
    console.log(data)
  };

  return (
    <div>
      {loading ? (
        <p>Loading Data ...</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              backgroundColor: '#00003f',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <Typography sx={{ margin: '20px', color: '#fff' }}>Edit Record</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              boxShadow: 3,
              padding: 4,
              flexDirection: 'column',
              borderRadius: '8px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '40px',
                borderRadius: '8px',
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
                borderRadius: '8px',
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
                justifyContent: 'space-around',
                borderRadius: '8px',
                marginTop: '40px',
              }}
            >
              <MyMultipleSelectField
                label="Employees"
                name="employees"
                control={control}
                width={'30%'}
                options={employees}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
                gap: 2,
                borderRadius: '8px',
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: '30%',
                  borderRadius: '8px',
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: '30%',
                  borderRadius: '8px',
                }}
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Edit;