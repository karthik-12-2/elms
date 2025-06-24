import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import LogOut from '../../admin/sidebar/component/Logout'
import { Avatar, Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { NavLink } from 'react-router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';

const Sidebar = ({fetchEmployee, employee}) => {
      const [openSections, setOpenSections] = useState(null);
     

      useEffect(() => {
            fetchEmployee();
      }, [fetchEmployee]);
      const toggleSection = (section) => {
            setOpenSections((prev) => prev === section ? null : section)
      }
      return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Box >
                        <Box sx={{ marginLeft: 2, marginTop: 2, marginBottom: 1 }}>
                              <Avatar sx={{ width: 60, height: 60 }}></Avatar>
                              <Typography component='h4' sx={{ marginTop: 1, display: 'flex', flexDirection: 'column' }}><span>{employee.name}</span><span>{employee.code}</span></Typography>
                        </Box>
                        <List >
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <ListItemButton onClick={() => {toggleSection('profile'), fetchEmployee()}} component={NavLink} to="my-profile" sx={{ paddingBlock: '5px' }}>
                                          <ListItemIcon>
                                                <AccountBoxOutlinedIcon />
                                          </ListItemIcon>
                                          <ListItemText primary="My Profile" />
                                    </ListItemButton>
                              </ListItem>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <ListItemButton onClick={() => toggleSection('leaves')} sx={{ paddingBlock: '5px' }}>
                                          <ListItemIcon><CodeOutlinedIcon /></ListItemIcon>
                                          <ListItemText primary="Leaves" />
                                          {openSections === 'leaves' ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                              </ListItem>
                              <Collapse in={openSections === 'leaves'} timeout='auto' unmountOnExit>
                                    <List sx={{ paddingBlock: 0 }}>
                                          <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                                <ListItemButton component={NavLink} to="applyleave" sx={{ paddingBlock: '5px' }}>
                                                      <ListItemText inset>Apply Leave</ListItemText>
                                                </ListItemButton>
                                          </ListItem>
                                          <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                                <ListItemButton component={NavLink} to="leavehistory" sx={{ paddingBlock: '5px' }}>
                                                      <ListItemText inset>Leave History</ListItemText>
                                                </ListItemButton>
                                          </ListItem>
                                    </List>
                              </Collapse>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <ListItemButton onClick={() => toggleSection('changepassword')} component={NavLink} to="changepassword" sx={{ paddingBlock: '5px' }}>
                                          <ListItemIcon><LockResetOutlinedIcon /></ListItemIcon>
                                          <ListItemText primary="Change Password" />
                                    </ListItemButton>
                              </ListItem>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <LogOut />
                              </ListItem>
                        </List>
                  </Box>
                  <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'grey.300', py: 1, paddingInlineStart: 3 }}>
                        <Typography>ELMS</Typography>
                  </Box>
            </Box>
      )
}

export default Sidebar