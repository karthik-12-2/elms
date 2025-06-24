import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink } from "react-router";

const SideBarItems = ({ icon, title, sectionKey, openSections, toggleSection }) => {
      const isCollapsible = title !== 'Dashboard' && title !== 'Change Password'

      return (
            <ListItemButton onClick={() => toggleSection(sectionKey)} sx={{ paddingBlock: '5px' }} component={NavLink} to={!isCollapsible ? sectionKey : undefined}>
                  <ListItemIcon>
                        {icon}
                  </ListItemIcon>
                  <ListItemText primary={title} />
                  {isCollapsible && (openSections === sectionKey ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
      )
}

export default SideBarItems