import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


export default function MyMultiLineField(props) {
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
                    id="standard-multiline-static"
                    label={label}
                    multiline
                    rows={1}
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
