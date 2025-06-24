import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import { useNavigate } from "react-router";

const LogOut = () => {
      const navigate = useNavigate();

      const handleLogout = () => {
            localStorage.removeItem('isLoggedIn')
            navigate('/elms')
      }

      return (
            <ListItemButton sx={{ paddingBlock: '5px' }} onClick={handleLogout}>
                  <ListItemIcon>
                        <ExitToAppOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
            </ListItemButton>
      )
}

export default LogOut;