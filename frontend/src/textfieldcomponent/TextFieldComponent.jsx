import { TextField } from '@mui/material'

const TextFieldComponent = ({ id, name, label, type, value, onChange, onBlur, error, helperText, select = false, sx = null, children }) => {
      return <TextField
            id={id}
            name={name}
            label={label}
            type={type}
            variant="filled"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            select={select}
            sx={{
                  ...sx,
                  '& .MuiFilledInput-root': {
                        backgroundColor: 'white',
                  },
                  '& .MuiFilledInput-root: hover': {
                        backgroundColor: 'white',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                        backgroundColor: 'white',
                  },
                  '& .MuiFilledInput-root.Mui-focused': {
                        backgroundColor: 'white',
                  },
                  marginBottom: '10px'
            }}
      >
            {children}
      </TextField>
}

export default TextFieldComponent