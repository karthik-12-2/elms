import * as Yup from 'yup';
import { useFormik } from 'formik'
import { Box, Button, MenuItem, Typography } from '@mui/material'
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { apiClient } from '../../../config/config';
import { useNotification } from '../../../notification/NotificationContext';
import Notification from '../../../notification/Notification';
import TextFieldComponent from '../../../textfieldcomponent/TextFieldComponent';

const MyProfile = ({ fetchEmployee }) => {
      const { showNotification } = useNotification()
      const [data, setData] = useState(null)
      const [department, setDepartment] = useState([])
      const fetchMyProfile = useCallback(async () => {
            const response = await apiClient.get('/employee/myprofile')
            setData(response.data.result)
      }, [])

      useEffect(() => {
            const fetchDepartment = async () => {
                  const response = await apiClient.get('/admin/fetchdepartment')
                  setDepartment(response.data)
            }
            fetchDepartment()
      }, [])

      useEffect(() => {
            fetchMyProfile()
      }, [fetchMyProfile])

      const formik = useFormik({
            enableReinitialize: true,
            initialValues: {
                  employeecode: data?.employeecode || '',
                  gender: data?.gender || '',
                  birthdate: data?.birthdate?.split('T')[0] || '',
                  firstname: data?.firstname || '',
                  lastname: data?.lastname || '',
                  department: data?.department || '',
                  country: data?.country || '',
                  email: data?.email || '',
                  city: data?.city || '',
                  address: data?.address || '',
                  mobilenumber: data?.mobilenumber || '',
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
                  mobilenumber: Yup.string().min(10).required('Mobile number is required'),
            }),

            onSubmit: async (values) => {
                  const changedValues = {}
                  for (let key in values) {
                        const original = data[key];
                        const updated = values[key]

                        if (key === 'birthdate') {
                              const originalDate = original?.split('T')?.[0] || ''
                              if (originalDate !== updated) {
                                    changedValues[key] = updated
                              }
                        } else {
                              if (updated !== original) {
                                    changedValues[key] = updated
                              }
                        }
                  }

                  if (Object.keys(changedValues).length === 0) {
                        return
                  }
                  try {
                        const response = await apiClient.post('/employee/updateprofile', changedValues)
                        showNotification(`Success ${response.data.message}`)
                        await fetchMyProfile()
                        await fetchEmployee()
                  } catch (error) {
                        console.log(error)
                  }
            }
      })
      return (
            <>
                  <Typography component='p'>UPDATE PROFILE DETAILS</Typography>
                  <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
                        <Notification />
                        <form style={{ display: "grid", gridTemplateColumns: '1fr 1fr', columnGap: '16px' }} onSubmit={formik.handleSubmit}>
                              {/* left */}
                              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                                    <TextFieldComponent
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

                                    />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
                                          <TextFieldComponent
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

                                          />
                                          <TextFieldComponent
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

                                          />
                                    </Box>
                                    <TextFieldComponent
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

                                    />
                                    <TextFieldComponent
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

                                    />
                              </Box>

                              {/* right */}
                              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', columnGap: 2 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
                                          <TextFieldComponent
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
                                                select={true}

                                          >
                                                <MenuItem value="">Select Gender</MenuItem>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                          </TextFieldComponent>
                                          <TextFieldComponent
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

                                                }}
                                          />
                                    </Box>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
                                          <TextFieldComponent
                                                id="department"
                                                name="department"
                                                label="Department"
                                                type="text"
                                                variant="filled"
                                                select={true}
                                                value={formik.values.department}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.department && Boolean(formik.errors.department)}
                                                helperText={formik.touched.department && formik.errors.department}

                                          >
                                                {department?.map((row, i) => <MenuItem value={row.departmentname} key={i}>{row.departmentname}</MenuItem>)}

                                          </TextFieldComponent>
                                          <TextFieldComponent
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

                                          />
                                    </Box>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
                                          <TextFieldComponent
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

                                          />
                                          <TextFieldComponent
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

                                          />
                                    </Box>

                                    <Button type="submit" style={{ alignSelf: 'start', paddingBlock: '10px', paddingInline: '20px', marginTop: '10px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none', width: '100px' }} disableRipple>UPDATE</Button>
                              </Box>
                        </form>
                  </Box>
            </>
      )
}

export default MyProfile