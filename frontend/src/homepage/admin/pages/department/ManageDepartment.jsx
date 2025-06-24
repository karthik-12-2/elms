import { Box, Button, IconButton, Input, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TableSortLabel, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from "react";
import { apiClient } from "../../../../config/config";
import { useNavigate } from "react-router";
import { useNotification } from "../../../../notification/NotificationContext";
import Notification from "../../../../notification/Notification";

const ManageDepartment = () => {
      const [data, setData] = useState([]);
      const [search, setSearch] = useState('')
      const navigate = useNavigate()
      const {showNotification} = useNotification();
      useEffect(() => {
            const fetchDepartment = async () => {
                  const response = await apiClient.get('/admin/fetchdepartment')
                  setData(response.data)
            }
            fetchDepartment()
      }, [])
      const filteredData = data.filter((item) =>
            Object.values(item).some((val) => val.toString().toLowerCase().includes(search.toLowerCase()))
      )
      
      const totalRows = filteredData.length;
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [page, setPage] = useState(0);
      const [order, setOrder] = useState('asc');
      const [orderBy, setOrderBy] = useState('');

      const start = page * rowsPerPage
      const end = start + rowsPerPage

      const handleSort = (column) => {
            const isAsc = orderBy === column && order === 'asc'
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(column)
      }

      const sortedData = [...filteredData].sort((a, b) => {
            const aVal = a[orderBy];
            const bVal = b[orderBy];

            if (typeof aVal === 'string') {
                  return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
            } else if (typeof aVal === 'number' || Date.parse(aVal)) {
                  return order === 'asc' ? new Date(aVal) - new Date(bVal) : new Date(bVal) - new Date(aVal);
            }
      })
      const paginatedData = sortedData.slice(start, end)

      const handleDelete = async (id) => {
            try {
                  const response = await apiClient.delete(`/admin/deletedepartment/${id}`)
                  showNotification(`Success ${response.data.message}`)
                  setData((prev) => prev.filter(v => v.id !== id))
            } catch (error) {
                  console.log(error)
            }
      }
      return (
            <>
                  <Typography component='p'>MANAGE DEPARTMENT</Typography>
                  <Box sx={{ backgroundColor: 'white', padding: 3, marginTop: 2 }}>
                        <Notification/>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                              <Box>
                                    <Typography>Show</Typography>
                                    <Select
                                          value={rowsPerPage}
                                          onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
                                          sx={{ height: '25px' }}
                                    >
                                          {[5, 10].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                                    </Select>
                              </Box>
                              <Input placeholder="Search Records" onChange={(e) => setSearch(e.target.value)} value={search} />
                        </Box>
                        <TableContainer component={Box} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                              <Table>
                                    <TableBody>
                                          <TableRow>
                                                <TableCell><TableSortLabel active={orderBy === 'id'} direction={orderBy === 'id' ? order : 'asc'} onClick={() => handleSort('id')}>SL no</TableSortLabel></TableCell>
                                                <TableCell><TableSortLabel active={orderBy === 'dcode'} direction={orderBy === 'dcode' ? order : 'asc'} onClick={() => handleSort('dcode')}>Dept Code</TableSortLabel></TableCell>
                                                <TableCell><TableSortLabel active={orderBy === 'dname'} direction={orderBy === 'dname' ? order : 'asc'} onClick={() => handleSort('dname')}>Dept Name</TableSortLabel></TableCell>
                                                <TableCell><TableSortLabel active={orderBy === 'dsname'} direction={orderBy === 'dsname' ? order : 'asc'} onClick={() => handleSort('dsname')}>Dept Short Name</TableSortLabel></TableCell>
                                                <TableCell><TableSortLabel active={orderBy === 'dcname'} direction={orderBy === 'dcname' ? order : 'asc'} onClick={() => handleSort('dcname')}>Creation Date</TableSortLabel></TableCell>
                                                <TableCell>Actions</TableCell>
                                          </TableRow>
                                          {paginatedData.map((row, index) => (
                                                <TableRow key={row.id}>
                                                      <TableCell>{(page * rowsPerPage) + index + 1}</TableCell>
                                                      <TableCell>{row.departmentcode}</TableCell>
                                                      <TableCell>{row.departmentname}</TableCell>
                                                      <TableCell>{row.departmentshortname}</TableCell>
                                                      <TableCell>{row.createdat.split(' ')[0].split('-').reverse().join('/')}{' '}{row.createdat.split(' ')[1]}</TableCell>
                                                      <TableCell sx={{display: 'flex', justifyContent: 'space-evenly'}}><Button sx={{backgroundColor: 'lightblue', color: 'black'}} onClick={() => navigate(`dept/${row.id}`)}>Edit</Button><Button sx={{backgroundColor: 'red', color: 'black'}} onClick={() => handleDelete(row.id)}>Delete</Button></TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography>Showing {paginatedData.length === 0 ? 0 : start + 1} to {Math.min(end, totalRows)} of {totalRows} entries</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
                                    <Typography>{page + 1}</Typography>
                                    <IconButton onClick={() => setPage(p => Math.min(p + 1, Math.floor(totalRows / rowsPerPage)))} disabled={end >= totalRows}><ArrowForwardIosIcon fontSize="small" /></IconButton>
                              </Box>
                        </Box>
                  </Box>
            </>
      )
}

export default ManageDepartment;