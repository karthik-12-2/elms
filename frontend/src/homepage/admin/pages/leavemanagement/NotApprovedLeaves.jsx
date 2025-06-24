import { Box, Button, IconButton, Input, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { apiClient } from '../../../../config/config';
import { useNavigate } from 'react-router';

const NotApprovedLeaves = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchNotApprovedLeaves = async () => {
      const response = await apiClient.get('/admin/notapprovedleaves')
      setData(response.data)
    }
    fetchNotApprovedLeaves()
  }, [])

  const [search, setSearch] = useState('')
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
  return (
    <>
      <Typography component='p' >NOT APPROVED LEAVE HISTORY</Typography>
      <Box sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
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
                <TableCell><TableSortLabel active={orderBy === 'id'} direction={orderBy === 'id' ? order : 'asc'} onClick={() => handleSort('id')}>Sl No</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'empname'} direction={orderBy === 'empname' ? order : 'asc'} onClick={() => handleSort('empname')}>Employee Name</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'leavetype'} direction={orderBy === 'leavetype' ? order : 'asc'} onClick={() => handleSort('leavetype')}>Leave Type</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'postingdate'} direction={orderBy === 'postingdate' ? order : 'asc'} onClick={() => handleSort('postingdate')}>Posting Date</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={orderBy === 'status'} direction={orderBy === 'status' ? order : 'asc'} onClick={() => handleSort('status')}>Status</TableSortLabel></TableCell>
                <TableCell>Action</TableCell>
              </TableRow>

              {paginatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{(page * rowsPerPage) + index + 1}</TableCell>
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

export default NotApprovedLeaves