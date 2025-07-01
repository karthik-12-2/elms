import { Box, Button, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { apiClient } from "../../../../config/config";
import { useNotification } from "../../../../notification/NotificationContext";
import Notification from "../../../../notification/Notification";
import TextFieldComponent from "../../../../textfieldcomponent/TextFieldComponent";

const AddDepartment = () => {
      const { showNotification } = useNotification()
      const formik = useFormik({
            initialValues: {
                  departmentcode: '',
                  departmentname: '',
                  departmentshortname: ''
            },
            validationSchema: Yup.object({
                  departmentcode: Yup.string()
                        .required('Department Code is required'),
                  departmentname: Yup.string()
                        .required('Department Name is required'),
                  departmentshortname: Yup.string()
                        .required('Department Shortname is required')
            }),
            onSubmit: async (values, { resetForm }) => {
                  try {
                        const response = await apiClient.post('/admin/adddepartment', values)
                        showNotification(`Success ${response.data.message}`)
                        resetForm()
                  } catch (error) {
                        console.log(error.response.data.message)
                  }
            }
      })

      return (
            <>
                  <Typography component='p'>ADD DEPARTMENT</Typography>
                  <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
                        <Notification />
                        <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
                              <TextFieldComponent
                                    id="departmentcode"
                                    name="departmentcode"
                                    label="Enter Department Code"
                                    variant="filled"
                                    value={formik.values.departmentcode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.departmentcode && Boolean(formik.errors.departmentcode)}
                                    helperText={formik.touched.departmentcode && formik.errors.departmentcode}
                              />
                              <TextFieldComponent
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

                              />
                              <TextFieldComponent
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
                              />
                              <Button type="submit" style={{ alignSelf: 'center', paddingBlock: '5px', paddingInline: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }} disableRipple>ADD</Button>
                        </form>
                  </Box>
            </>
      )
}

export default AddDepartment