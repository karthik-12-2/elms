import { Box, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { apiClient } from "../../../config/config";
import { useNotification } from "../../../notification/NotificationContext";
import Notification from "../../../notification/Notification";
import TextFieldComponent from "../../../textfieldcomponent/TextFieldComponent";

const ChangePassword = () => {
      const { showNotification } = useNotification()
      const formik = useFormik({
            initialValues: {
                  oldpassword: '',
                  newpassword: '',
                  confirmpassword: ''
            },
            validationSchema: Yup.object({
                  oldpassword: Yup.string('Enter Old Password')
                        .min(7, 'Password should be of minimum 7 characters length ')
                        .required('Old Password is required'),
                  newpassword: Yup.string('Enter Old Password')
                        .min(7, 'Password should be of minimum 7 characters length ')
                        .required('New Password is required'),
                  confirmpassword: Yup.string()
                        .oneOf([Yup.ref('newpassword'), null], 'Password must match')
                        .required('Confirm Password is required')
            }),
            onSubmit: async (values, { resetForm }) => {
                  try {
                        const response = await apiClient.post(`/admin/changepassword`, values)
                        showNotification(`Success ${response.data.message}`)
                        resetForm();
                  } catch (error) {
                        console.log(error)
                  }
            }
      })

      return (
            <>
                  <Typography component='p'>CHANGE PASSWORD</Typography>
                  <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
                        <Notification />
                        <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
                              <TextFieldComponent
                                    id="oldpassword"
                                    name="oldpassword"
                                    label="Enter Old Password"
                                    type="password"
                                    variant="filled"
                                    value={formik.values.oldpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
                                    helperText={formik.touched.oldpassword && formik.errors.oldpassword}
                              />
                              <TextFieldComponent
                                    id="newpassword"
                                    name="newpassword"
                                    label="Enter New Password"
                                    type="password"
                                    variant="filled"
                                    value={formik.values.newpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                                    helperText={formik.touched.newpassword && formik.errors.newpassword}
                              />
                              <TextFieldComponent
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    label="Enter Confirm Password"
                                    type="password"
                                    variant="filled"
                                    value={formik.values.confirmpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                              />
                              <button type="submit" style={{ alignSelf: 'center', paddingBlock: '5px', paddingInline: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Change</button>
                        </form>
                  </Box>
            </>
      )
}

export default ChangePassword