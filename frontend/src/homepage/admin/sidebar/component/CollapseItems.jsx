import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import { NavLink } from "react-router"

const CollapseItems = ({ to, text }) => {
      return (
            <ListItem sx={{ paddingInline: 0, paddingBlock: 0 }}>
                  <ListItemButton sx={{ paddingBlock: '5px' }} component={NavLink} to={to} >
                        <ListItemText inset>{text}</ListItemText>
                  </ListItemButton>
            </ListItem>
      )
}

export default CollapseItems