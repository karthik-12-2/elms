import { Box, Button, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import Notification from "../../../../notification/Notification";
import { useNotification } from "../../../../notification/NotificationContext";
import { useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../../../config/config";
import TextFieldComponent from "../../../../textfieldcomponent/TextFieldComponent";

const UpdateLeaveType = () => {
  const { showNotification } = useNotification()
  const params = useParams()
  const [data, setData] = useState([])
  const fetchLeaveType = useCallback(async () => {
    const response = await apiClient.post('/admin/manageleavetype/id', { id: params.id });
    setData(response.data);
  }, [params.id]);


  useEffect(() => {
    fetchLeaveType()
  }, [fetchLeaveType])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      leavetype: data?.leavetype || '',
      description: data?.description || ''
    },
    validationSchema: Yup.object({
      leavetype: Yup.string('Enter Leave Type')
        .required('Leave type is required'),
      description: Yup.string('Enter Description')
        .required('Description is required')
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
        const response = await apiClient.put(`/admin/updateleavetype/${params.id}`, changedValue)
        showNotification(`SUCCESS ${response.data.message}`)
        fetchLeaveType()
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
      <Typography component='p'>UPDATE LEAVE TYPE</Typography>
      <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
        <Notification />
        <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
          <TextFieldComponent
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
          />
          <TextFieldComponent
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
          />

          <Button type="submit" style={{ alignSelf: 'center', paddingBlock: '5px', paddingInline: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }} disableRipple>UPDATE</Button>
        </form>
      </Box>
    </>
  )
}

export default UpdateLeaveType