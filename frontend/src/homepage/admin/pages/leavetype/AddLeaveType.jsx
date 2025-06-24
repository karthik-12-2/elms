import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { apiClient } from "../../../../config/config";
import { useNotification } from "../../../../notification/NotificationContext";
import Notification from "../../../../notification/Notification";

const AddLeaveType = () => {
  const { showNotification } = useNotification()
  const formik = useFormik({
    initialValues: {
      leavetype: '',
      description: ''
    },
    validationSchema: Yup.object({
      leavetype: Yup.string('Enter Leave Type')
        .required('Leave type is required'),
      description: Yup.string('Enter Description')
        .required('Description is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await apiClient.post('/admin/addleavetype', values)
        showNotification(`Success ${response.data.message}`)
        resetForm()
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  })

  return (
    <>
      <Typography component='p'>ADD LEAVE TYPE</Typography>
      <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
        <Notification />
        <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
          <TextField
            id="leavetype"
            name="leavetype"
            label="Enter Leave Type"
            type="text"
            variant="filled"
            value={formik.values.leavetype}
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
          />
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

          <Button type="submit" style={{ alignSelf: 'center', paddingBlock: '5px', paddingInline: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }} disableRipple>ADD</Button>
        </form>
      </Box>
    </>
  )
}

export default AddLeaveType