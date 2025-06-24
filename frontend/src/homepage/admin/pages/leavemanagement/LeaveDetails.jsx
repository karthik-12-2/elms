import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import TakeActionDialog from './TakeActionDialog'
import { useParams } from 'react-router'
import { apiClient } from '../../../../config/config'
import { useNotification } from '../../../../notification/NotificationContext'
import Notification from '../../../../notification/Notification'

const LeaveDetails = () => {
      const { showNotification } = useNotification()
      const params = useParams()
      const [data, setData] = useState('')
      const [openDialog, setOpenDialog] = useState(false);
      const [value, setValue] = useState({
            leavestatus: '',
            adminremark: ''
      })
      const fetchUserData = useCallback(async () => {
            const response = await apiClient.post('/admin/leavedetails', { id: params.id });
            setData(response.data.result);
      }, [params.id]);

      useEffect(() => {
            fetchUserData()
      }, [fetchUserData])

      const handleOpen = () => {
            setOpenDialog(true)
      }

      const handleClose = () => {
            setOpenDialog(false)
      }

      const handleSubmit = async () => {
            try {
                  const response = await apiClient.put(`/admin/updateleave/${data?.id}`, { leavestatus: value.leavestatus, adminremark: value.adminremark })
                  showNotification(`Success ${response.data.message}`)
                  await fetchUserData()
                  handleClose()
            } catch (error) {
                  console.log(error)
            }
      }

      return (
            <>
                  <Typography>LEAVE DETAILS</Typography>
                  <Box sx={{ marginTop: 2, backgroundColor: 'white', padding: 3 }}>
                        <Notification />
                        <TableContainer component={Paper} elevation={0}>
                              <Table>
                                    <TableBody>
                                          <TableRow>
                                                <TableCell><strong>Employee Name:</strong></TableCell>
                                                <TableCell>{data.employeename}</TableCell>
                                                <TableCell><strong>Emp ID:</strong></TableCell>
                                                <TableCell>{data.employeecode}</TableCell>
                                                <TableCell><strong>Gender:</strong></TableCell>
                                                <TableCell>{data.gender}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                                <TableCell><strong>Emp Email ID:</strong></TableCell>
                                                <TableCell>{data.email}</TableCell>
                                                <TableCell><strong>Emp Contact No:</strong></TableCell>
                                                <TableCell>{data.mobilenumber}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                          </TableRow>
                                          <TableRow>
                                                <TableCell><strong>Leave Type:</strong></TableCell>
                                                <TableCell>{data.leavetype}</TableCell>
                                                <TableCell><strong>Leave Date:</strong></TableCell>
                                                <TableCell>{'From ' + data.from?.split('-').reverse().join('/')}{' to ' + data.to?.split('-').reverse().join('/')}</TableCell>
                                                <TableCell><strong>Posting Date:</strong></TableCell>
                                                <TableCell>{data.postingdate?.split(' ')[0].split('-').reverse().join('/')}{' '}{data.postingdate?.split(' ')[1]}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                                <TableCell><strong>Employee Leave Description:</strong></TableCell>
                                                <TableCell>{data.description}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                          </TableRow>
                                          <TableRow>
                                                <TableCell><strong>Leave Status:</strong></TableCell>
                                                <TableCell sx={{ color: `${data.status === 'approved' ? 'green' : data.status === 'notapproved' ? 'red' : 'blue'}` }}>{data.status && data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1)}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                          </TableRow>
                                          <TableRow>
                                                <TableCell><strong>Admin Remark:</strong></TableCell>
                                                <TableCell>{data.adminremark}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                          </TableRow>
                                          <TableRow>
                                                <TableCell><strong>Admin Action Taken Date:</strong></TableCell>
                                                <TableCell>{data.adminactiontakendate?.split(' ')[0].split('-').reverse().join('/')}{' '}{data.adminactiontakendate?.split(' ')[1]}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                          </TableRow>
                                    </TableBody>
                              </Table>
                        </TableContainer>
                        <Button style={{ marginTop: '10px', padding: '10px', marginLeft: '5px', backgroundColor: 'green', color: 'white', border: 'none' }} onClick={handleOpen} disableRipple>TAKE ACTION</Button>
                  </Box>
                  <TakeActionDialog openDialog={openDialog} handleClose={handleClose} value={value} setValue={setValue} handleSubmit={handleSubmit} />
            </>
      )
}

export default LeaveDetails