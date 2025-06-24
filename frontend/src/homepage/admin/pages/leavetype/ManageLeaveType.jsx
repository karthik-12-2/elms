import { Box, Button, IconButton, Input, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from 'react';
import { apiClient } from '../../../../config/config';
import { useNavigate } from 'react-router';
import { useNotification } from '../../../../notification/NotificationContext';
import Notification from '../../../../notification/Notification';

const ManageLeaveType = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const fetchLeaveType = async () => {
      const response = await apiClient.get('/admin/fetchleavetype')
      console.log('response')
      setData(response.data)
    }
    fetchLeaveType()
  }, [])
  const filteredData = data.filter(items => Object.values(items).some(valve => valve.toString().toLowerCase().includes(search.toLowerCase())))
  const totalRows = filteredData.length;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(column)
  }

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[orderBy]
    const bVal = b[orderBy]

    if (typeof aVal === 'string') {
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    } else if (typeof aVal === 'number' || Date.parse(aVal)) {
      return order === 'asc' ? new Date(aVal) - new Date(bVal) : new Date(bVal) - new Date(aVal)
    }
  })
  const paginatedData = sortedData.slice(start, end)
  const handleDelete = async (id) => {
    try {
      const response = await apiClient.delete(`/admin/deleteleavetype/${id}`)
      showNotification(`Success ${response.data.message}`)
      setData((prev) => prev.filter(v => v.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Typography component='p' >MANAGE LEAVE TYPE</Typography>
      <Box sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
        <Notification />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography component='p'>show</Typography>
            <Select
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
                setPage(0);
              }}
              sx={{ height: '25px' }}
              value={rowsPerPage}
            >
              {[5, 10].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </Box>
          <Input type='text' id='search' placeholder='Search records' onChange={(e) => setSearch(e.target.value)} value={search} />
        </Box>
        <TableContainer component={Box} sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><TableSortLabel active={orderBy === 'id'} direction={orderBy === 'id' ? order : 'asc'} onClick={() => handleSort('id')}>Sl no</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'leavetype'} direction={orderBy === 'leavetype' ? order : 'asc'} onClick={() => handleSort('leavetype')}>Leave Type</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'description'} direction={orderBy === 'description' ? order : 'asc'} onClick={() => handleSort('description')}>Description</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'creationdate'} direction={orderBy === 'creationdate' ? order : 'asc'} onClick={() => handleSort('creationdate')}>Creation Date</TableSortLabel></TableCell>
                <TableCell>Action</TableCell>
              </TableRow>

              {paginatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{(page * rowsPerPage) + index + 1}</TableCell>
                  <TableCell>{row.leavetype}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.createdat.split(' ')[0].split('-').reverse().join('/')}{' '}{row.createdat.split(' ')[1]}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly' }}><Button sx={{ backgroundColor: 'lightblue', color: 'black' }} onClick={() => navigate(`id/${row.id}`)}>Edit</Button><Button sx={{ backgroundColor: 'red', color: 'black' }} onClick={() => handleDelete(row.id)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>Showing {paginatedData.length === 0 ? 0 : start + 1} to {Math.min(end, totalRows)} of {totalRows}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={start === 0}><ArrowBackIosNewIcon fontSize='small' /></IconButton>
            <Typography>{page + 1}</Typography>
            <IconButton onClick={() => setPage(p => Math.min(p + 1, Math.floor(totalRows / rowsPerPage)))} disabled={end >= totalRows}><ArrowForwardIosIcon fontSize='small' /></IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ManageLeaveType