import { Box, Button, MenuItem, TextField, Typography, Alert } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { apiClient } from "../../../config/config";
import { useEffect } from "react";
import { useState } from "react";
import { useNotification } from "../../../notification/NotificationContext";
import Notification from "../../../notification/Notification";

const ApplyLeave = () => {
      const { showNotification } = useNotification()
      const [leaveType, setLeaveType] = useState([])
      useEffect(() => {
            const fetchLeaveType = async () => {
                  const response = await apiClient.get('/admin/fetchleavetype')
                  setLeaveType(response.data)
            }
            fetchLeaveType()
      }, [])

      const formik = useFormik({
            initialValues: {
                  from: '',
                  to: '',
                  leavetype: '',
                  description: ''
            },
            validationSchema: Yup.object({
                  from: Yup.string().required('from date is required'),
                  to: Yup.string().required('to date is required'),
                  leavetype: Yup.string('Enter Leave Type')
                        .required('Leave type is required'),
                  description: Yup.string('Enter Description')
                        .required('Description is required'),
            }),
            onSubmit: async (values, { resetForm }) => {
                  try {
                        const response = await apiClient.post(`/employee/applyleave`, values)
                        showNotification(`Success ${response.data.message}`);
                        resetForm();
                  } catch (error) {
                        console.log(error)
                  }
            }
      })

      return (
            <>
                  <Typography component='p'>APPLY LEAVE</Typography>
                  <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
                        <Notification />
                        <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
                              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                                    <TextField
                                          id="from"
                                          name="from"
                                          label="From"
                                          type="date"
                                          variant="filled"
                                          value={formik.values.from}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.from && Boolean(formik.errors.from)}
                                          helperText={formik.touched.from && formik.errors.from}
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
                                    <TextField
                                          id="to"
                                          name="to"
                                          label="To"
                                          type="date"
                                          variant="filled"
                                          value={formik.values.to}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.to && Boolean(formik.errors.to)}
                                          helperText={formik.touched.to && formik.errors.to}
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
                              <TextField
                                    id="leavetype"
                                    name="leavetype"
                                    label="Select Leave Type"
                                    variant="filled"
                                    select
                                    value={formik.values.leavetype || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.leavetype && Boolean(formik.errors.leavetype)}
                                    helperText={formik.touched.leavetype && formik.errors.leavetype}
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
                                    {leaveType.map((row) => (
                                          <MenuItem value={row.leavetype} key={row.leavetype}>{row.leavetype}</MenuItem>
                                    ))}

                              </TextField>
                              <TextField
                                    id="description"
                                    name="description"
                                    label="Enter Description"
                                    type="text"
                                    variant="filled"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
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

                              <Button type="submit" style={{ alignSelf: 'center', paddingBlock: '5px', paddingInline: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }} disableRipple>APPLY</Button>
                        </form>
                  </Box>
            </>
      )
}

export default ApplyLeave