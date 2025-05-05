import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MyTextField(props) {
    const {label, placeholder, name, control, width} = props
    return (

        <Controller //React Hook Form reduces the amount of code you need to write while removing unnecessary re-renders
            name = {name}
            control={control}
            render={({
                field:{onChange, value},
                fieldState:{error},
                formState,
            }) => (
                <TextField 
                    sx={{width:{width}}}
                    onChange={onChange}
                    value={value}
                    id="standard-basic" 
                    label={label} 
                    variant="standard"
                    placeholder={placeholder} 
                    error = { !!error }
                    helperText = {error?.message}
                />
            )
        }     
        />
      
  );
}
