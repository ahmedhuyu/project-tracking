import {React, useEffect, useMemo, useState} from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { Box, IconButton } from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';



const Home = () => {

  const [myData, setMyData] = useState()
  const [loading, setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`project/`).then((res) => {
      setMyData(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    GetData()

  }, [])

  
  
    //should be memoized or stable
    const columns = useMemo(
      () => [
        {
          accessorKey: 'name', //access nested data with dot notation
          header: 'Name',
          size: 150,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
        },
        {
          accessorKey: 'comments', //normal accessorKey
          header: 'Comments',
          size: 200,
        },
        {
          accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
          header: 'Start Date',
          size: 150,
        },
        {
          accessorFn: (row) => Dayjs(row.end_date).format('DD-MM-YYYY'),
          header: 'End Date',
          size: 150,
        },
      ],
      [],
    );
  


  return (
    <div>
      { loading ? <p> Loading Data ...</p> :
        <MaterialReactTable 
          columns={columns} 
          data={myData} 
          enableRowActions
          sx={{
            borderRadius: '10px', // Add border radius to the table
            overflow: 'hidden', // Ensure the border radius is applied properly
            boxShadow: 3, // Optional: Add a shadow for better visuals
          }}
          renderRowActions={({row}) => (
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'nowrap', 
                gap: '8px',
                borderRadius: '10px', // Add border radius to the action buttons container
              }}
            >
              <IconButton 
                color="secondary" 
                component={Link} 
                to={`edit/${row.original.id}`}
                sx={{ borderRadius: '10px' }} // Add border radius to the edit button
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                color="error" 
                component={Link} 
                to={`delete/${row.original.id}`}
                sx={{ borderRadius: '10px' }} // Add border radius to the delete button
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      }
    </div>
  )
}

export default Home