import { Avatar, Box, Collapse, List, ListItem, Typography } from '@mui/material'
import LogOut from './component/Logout.jsx';
import { useState } from 'react';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import SideBarItems from './component/SideBarItems.jsx';
import SettingsInputSvideoOutlinedIcon from '@mui/icons-material/SettingsInputSvideoOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import CollapseItems from './component/CollapseItems.jsx';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const SideBar = () => {
      const [openSections, setOpenSections] = useState(null);

      const toggleSection = (section) => {
            setOpenSections((prev) => prev === section ? null : section)
      }

      return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Box >
                        <Box sx={{ marginLeft: 2, marginTop: 2, marginBottom: 1 }}>
                              <Avatar sx={{ width: 60, height: 60 }}></Avatar>
                              <Typography component='h4' sx={{ marginTop: 1 }}>Admin</Typography>
                        </Box>
                        <List >
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <SideBarItems icon={<SettingsInputSvideoOutlinedIcon />} title={"Dashboard"} sectionKey={"dashboard"} toggleSection={toggleSection} />
                              </ListItem>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }} >
                                    <SideBarItems openSections={openSections} toggleSection={toggleSection} icon={<AppsOutlinedIcon />} title={"Department"} sectionKey={"department"} />
                              </ListItem>
                              <Collapse in={openSections === 'department'} timeout='auto' unmountOnExit>
                                    <List sx={{ paddingBlock: 0 }}>
                                          <CollapseItems to="adddepartment" text={"Add Department"} />
                                          <CollapseItems to="managedepartment" text={"Manage Department"} />
                                    </List>
                              </Collapse>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <SideBarItems openSections={openSections} toggleSection={toggleSection} icon={<CodeOutlinedIcon />} title={"Leave Type"} sectionKey={"leaveType"} />
                              </ListItem>
                              <Collapse in={openSections === 'leaveType'} timeout='auto' unmountOnExit>
                                    <List sx={{ paddingBlock: 0 }}>
                                          <CollapseItems to="addleavetype" text={"Add Leave Type"} />
                                          <CollapseItems to="manageleavetype" text={"Manage Leave Type"} />
                                    </List>
                              </Collapse>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <SideBarItems openSections={openSections} toggleSection={toggleSection} icon={<AccountBoxOutlinedIcon />} title={"Employees"} sectionKey={"employees"} />
                              </ListItem>
                              <Collapse in={openSections === 'employees'} timeout='auto' unmountOnExit>
                                    <List sx={{ paddingBlock: 0 }}>
                                          <CollapseItems to="addemployee" text={"Add Employee"} />
                                          <CollapseItems to="manageemployee" text={"Manage Employee"} />
                                    </List>
                              </Collapse>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <SideBarItems openSections={openSections} toggleSection={toggleSection} icon={<DesktopWindowsOutlinedIcon />} title={"Leave Management"} sectionKey={"leaveManagement"} />
                              </ListItem>
                              <Collapse in={openSections === 'leaveManagement'} timeout='auto' unmountOnExit>
                                    <List sx={{ paddingBlock: 0 }}>
                                          <CollapseItems to="allleaves" text={"All Leaves"} />
                                          <CollapseItems to="pendingleaves" text={"Pending Leaves"} />
                                          <CollapseItems to="approvedleaves" text={"Approved Leaves"} />
                                          <CollapseItems to="notapprovedleaves" text={"Not Approved Leaves"} />
                                    </List>
                              </Collapse>
                              <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                                    <SideBarItems icon={<LockResetOutlinedIcon />} title={"Change Password"} sectionKey={"changepassword"} toggleSection={toggleSection} />
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

export default SideBar;