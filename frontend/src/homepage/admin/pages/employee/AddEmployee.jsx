import * as Yup from 'yup';
import { useFormik } from 'formik'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { apiClient } from "../../../../config/config";
import { useNotification } from '../../../../notification/NotificationContext';
import Notification from '../../../../notification/Notification';
import { useEffect, useState } from 'react';

const AddEmployee = () => {
  const { showNotification } = useNotification()
  const [department, setDepartment] = useState([])
  useEffect(() => {
            const fetchDepartment = async () => {
                  const response = await apiClient.get('/admin/fetchdepartment')
                  setDepartment(response.data)
            }
            fetchDepartment()
      }, [])
  const formik = useFormik({
    initialValues: {
      employeecode: '',
      gender: '',
      birthdate: '',
      firstname: '',
      lastname: '',
      department: '',
      country: '',
      email: '',
      city: '',
      address: '',
      password: '',
      confirmpassword: '',
      mobilenumber: '',
    },

    validationSchema: Yup.object({
      employeecode: Yup.string().required('Employee code is required'),
      gender: Yup.string().required('Gender is required'),
      birthdate: Yup.string().required('BirthDate is required'),
      firstname: Yup.string().required('Firstname is required'),
      lastname: Yup.string().required('Lastname is required'),
      department: Yup.string().required('Department is required'),
      country: Yup.string().required('Country is required'),
      email: Yup.string().email('Enter a valid email').required('Email is required'),
      city: Yup.string().required('City/Town is required'),
      address: Yup.string().required('Address is required'),
      password: Yup.string().min(7, 'Password should be of minimum 7 characters length ').required('Password is required'),
      mobilenumber: Yup.string().min(10).required('Mobile number is required'),
      confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm Password is required')
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await apiClient.post(`/admin/addemployee`, values)
        showNotification(`Success ${response.data.message}`)
        resetForm()
      } catch (error) {
        showNotification(`${error.response.data.message} already exists`, 'error')
      }
    }
  })
  return (
    <>
      <Typography component='p'>ADD EMPLOYEE</Typography>
      <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
        <Notification />
        <form style={{ display: "grid", gridTemplateColumns: '1fr 1fr', columnGap: '16px' }} onSubmit={formik.handleSubmit}>
          {/* left */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <TextField
              id="employeecode"
              name="employeecode"
              label="Employee Code(Must be unique)"
              type="text"
              variant="filled"
              value={formik.values.employeecode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.employeecode && Boolean(formik.errors.employeecode)}
              helperText={formik.touched.employeecode && formik.errors.employeecode}
              sx={{
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
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
              <TextField
                id="firstname"
                name="firstname"
                label="First name"
                type="text"
                variant="filled"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
                sx={{
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
              />
              <TextField
                id="lastname"
                name="lastname"
                label="Last name"
                type="text"
                variant="filled"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
                sx={{
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
              />
            </Box>
            <TextField
              id="email"
              name="email"
              label="Email"
              type='email'
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
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
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type='password'
              variant="filled"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
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
            />
            <TextField
              id="confirmpassword"
              name="confirmpassword"
              label="Confirm password"
              type="password"
              variant="filled"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
              helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
              sx={{
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
            />
          </Box>

          {/* right */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', columnGap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
              <TextField
                id="gender"
                name="gender"
                label="Gender"
                type="text"
                variant="filled"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                select
                sx={{
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
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                id="birthdate"
                name="birthdate"
                label="Birthdate"
                type="date"
                variant="filled"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                helperText={formik.touched.birthdate && formik.errors.birthdate}
                sx={{
                  paddingTop: '10px',
                  marginTop: '-10px'
                  ,
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
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
              <TextField
                id="department"
                name="department"
                label="Department"
                type="text"
                variant="filled"
                select
                value={formik.values.department || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.department && Boolean(formik.errors.department)}
                helperText={formik.touched.department && formik.errors.department}
                sx={{
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
                {department.map((row) => (
                  <MenuItem value={row.departmentname} key={row.departmentname}>{row.departmentname}</MenuItem>
                ))}

              </TextField>
              <TextField
                id="country"
                name="country"
                label="Country"
                type="text"
                variant="filled"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                sx={{
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
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
              <TextField
                id="city"
                name="city"
                label="City/Town"
                type="text"
                variant="filled"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                sx={{
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
              />
              <TextField
                id="address"
                name="address"
                label="Address"
                type="text"
                variant="filled"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                sx={{
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
              />
            </Box>
            <TextField
              id="mobilenumber"
              name="mobilenumber"
              label="Mobile number"
              type="text"
              variant="filled"
              value={formik.values.mobilenumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobilenumber && Boolean(formik.errors.mobilenumber)}
              helperText={formik.touched.mobilenumber && formik.errors.mobilenumber}
              sx={{
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
            />
            <Button type="submit" style={{ alignSelf: 'start', paddingBlock: '10px', paddingInline: '20px', marginTop: '10px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none', width: '100px' }} disableRipple>ADD</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default AddEmployee