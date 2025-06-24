import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { apiClient } from "../../../config/config";
import { useState } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
      const [leave, setLeave] = useState([])
      const navigate = useNavigate()
      const [data, setData] = useState({
            employee: '',
            leavetype: '',
            department: '',
      })

      useEffect(() => {

            const fetchData = async () => {
                  const [employees, leavetypes, departmets] = await Promise.all([
                        apiClient.get('/admin/fetchemployees'),
                        apiClient.get('/admin/fetchleavetype'),
                        apiClient.get('/admin/fetchdepartment')
                  ])

                  setData({
                        employee: employees.data.length,
                        leavetype: leavetypes.data.length,
                        department: departmets.data.length,
                  })
            }
            fetchData()
      }, [])

      useEffect(() => {
            const fetchAllLeaves = async () => {
                  const response = await apiClient.get('/admin/getlatestleave')
                  setLeave(response.data)
            }
            fetchAllLeaves()
      }, [])

      return (
            <>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                        <Box sx={{ backgroundColor: '#b6bfc8', padding: 3 }}>
                              <Typography sx={{ marginBottom: 2 }}>TOTLE REGD EMPLOYEE</Typography>
                              <Typography><strong>{data.employee}</strong></Typography>
                        </Box>
                        <Box sx={{ backgroundColor: '#b6bfc8', padding: 3 }}>
                              <Typography sx={{ marginBottom: 2 }}>TOTLE DEPARTMENTS</Typography>
                              <Typography><strong>{data.department}</strong></Typography>
                        </Box>
                        <Box sx={{ backgroundColor: '#b6bfc8', padding: 3 }}>
                              <Typography sx={{ marginBottom: 2 }}>TOTLE LEAVE TYPE</Typography>
                              <Typography><strong>{data.leavetype}</strong></Typography>
                        </Box>
                  </Box>
                  <Box sx={{ backgroundColor: 'white', marginTop: 2, padding: 3 }}>
                        <Typography sx={{ marginBottom: 1 }}>LATEST LEAVE APPLICANTS</Typography>
                        <TableContainer>
                              <Table>
                                    <TableBody>
                                          <TableRow>
                                                <TableCell>Sl No</TableCell>
                                                <TableCell>Employee Name</TableCell>
                                                <TableCell>Leave Type</TableCell>
                                                <TableCell>Posting Date</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Action</TableCell>
                                          </TableRow>

                                          {leave.map((row, index) => (
                                                <TableRow key={index}>
                                                      <TableCell>{index + 1}</TableCell>
                                                      <TableCell>{row.employeename}</TableCell>
                                                      <TableCell>{row.leavetype}</TableCell>
                                                      <TableCell>{row.postingdate.split(' ')[0].split('-').reverse().join('/')}{' '}{row.postingdate.split(' ')[1]}</TableCell>
                                                      <TableCell sx={{ color: `${row.status === 'approved' ? 'green' : row.status === 'notapproved' ? 'red' : 'blue'}` }}>{row?.status?.charAt(0).toUpperCase() + row?.status?.slice(1)}</TableCell>
                                                      <TableCell><Button sx={{ backgroundColor: '#a8b3bd', color: 'white', paddingInline: 2 }} onClick={() => navigate(`/elms/admin/homepage/leavedetails/leaveid/${row.id}`)}>View Detials</Button></TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>
                  </Box>
            </>
      )
}

export default Dashboard;