import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

export default function MyDatePickerField(props) {
  const {label, control, name, width} = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller //React Hook Form reduces the amount of code you need to write while removing unnecessary re-renders
          name = {name}
          control={control}
          render={({
              field:{onChange, value},
              fieldState:{error},
              formState,

          }) => (
            <DatePicker 
              sx={{width:{width}}}
              label={label} 
              onChange={onChange}
              value={value}
              slotProps={{
                textField:{
                  error: !!error,
                  helperText: error?.message
                }
              }}
            />
            )
          }     
        />
        
    </LocalizationProvider>
  );
}
