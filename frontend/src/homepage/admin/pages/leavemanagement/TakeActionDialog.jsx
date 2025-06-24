import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, MenuItem, Select, TextField, Typography } from '@mui/material'

const TakeActionDialog = ({ openDialog, handleClose, value, setValue, handleSubmit }) => {
      const handleChange = (e) => {
            const { name, value: val } = e.target;
            setValue((prev) => ({ ...prev, [name]: val }))
      }

      return (
            <Dialog open={openDialog} PaperProps={{
                  sx: { width: '100%', padding: 3 }
            }}
                  onClose={handleClose}
            >
                  <DialogTitle sx={{ marginLeft: '-20px', fontSize: '16px' }}>LEAVE TAKE ACTION</DialogTitle>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Select id='leavestatus' name='leavestatus' value={value.leavestatus} onChange={handleChange} required>
                              <MenuItem value="">Choose your option</MenuItem>
                              <MenuItem value="approved">Approved</MenuItem>
                              <MenuItem value="notapproved">Not Approved</MenuItem>
                        </Select>
                        <TextField
                              id='adminremark'
                              name='adminremark'
                              type='text'
                              variant='filled'
                              placeholder='Description'
                              value={value.adminremark}
                              onChange={handleChange}
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
                              }}
                        />
                        <Divider sx={{ marginTop: '20%' }} />
                  </Box>
                  <DialogActions ><Button sx={{ backgroundColor: 'blue', color: 'white', padding: 1, border: 'none', paddingInline: 3 }} onClick={() => handleSubmit(value)} disableRipple>Submit</Button></DialogActions>
            </Dialog>
      )
}

export default TakeActionDialog