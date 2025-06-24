import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { apiClient} from "../../../../config/config";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Notification from "../../../../notification/Notification";
import { useNotification } from "../../../../notification/NotificationContext";

const UpdateDepartment = () => {
      const {showNotification} = useNotification()
      const params = useParams()
      const [data, setData] = useState([])
      const fetchDepartmentData = useCallback(async () => {
            const response = await apiClient.post('/admin/managedepartment/dept', { id: params.id });
            setData(response.data);
      }, [params.id]);

      useEffect(() => {
            fetchDepartmentData()
      }, [fetchDepartmentData])

      const formik = useFormik({
            enableReinitialize: true,
            initialValues: {
                  departmentcode: data?.departmentcode || '',
                  departmentname: data?.departmentname || '',
                  departmentshortname: data?.departmentshortname || ''
            },
            validationSchema: Yup.object({
                  departmentcode: Yup.string('Enter Department Code')
                        .required('Department Code is required'),
                  departmentname: Yup.string('Enter Department Name')
                        .required('Department Name is required'),
                  departmentshortname: Yup.string('Enter Department Shortname')
                        .required('Department Shortname is required')
            }),
            onSubmit: async (values) => {
                  const changedValue = {}
                  for (let key in values) {
                        const original = data[key];
                        const updated = values[key]
                        if (updated !== original) {
                              changedValue[key] = updated
                        }
                  }

                  if (Object.keys(changedValue).length === 0) {
                        return;
                  }

                  try {
                        const response = await apiClient.put(`/admin/updatedepartment/${params.id}`, changedValue)
                        showNotification(`SUCCESS ${response.data.message}`)
                        fetchDepartmentData()
                  } catch (error) {
                        console.log(error)
                  }
            }
      })

      return (
            <>
                  <Typography component='p'>UPDATE DEPARTMENT</Typography>
                  <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
                        <Notification/>
                        <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
                              <TextField
                                    id="departmentcode"
                                    name="departmentcode"
                                    label="Enter Department Code"
                                    variant="filled"
                                    value={formik.values.departmentcode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.departmentcode && Boolean(formik.errors.departmentcode)}
                                    helperText={formik.touched.departmentcode && formik.errors.departmentcode}
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
                                    id="departmentname"
                                    name="departmentname"
                                    label="Enter Department Name"
                                    type="text"
                                    variant="filled"
                                    value={formik.values.departmentname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.departmentname && Boolean(formik.errors.departmentname)}
                                    helperText={formik.touched.departmentname && formik.errors.departmentname}
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
                                    id="departmentshortname"
                                    name="departmentshortname"
                                    label="Enter Department Short Name"
                                    type="text"
                                    variant="filled"
                                    value={formik.values.departmentshortname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.departmentshortname && Boolean(formik.errors.departmentshortname)}
                                    helperText={formik.touched.departmentshortname && formik.errors.departmentshortname}
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
                              <Button type="submit" style={{ alignSelf: 'center', paddingBlock: '5px', paddingInline: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }} disableRipple>UPDATE</Button>
                        </form>
                  </Box>
            </>
      )
}

export default UpdateDepartment