import Box from "@mui/material/Box";
import { useAuth } from "../../authentication/auth.jsx";
import LoadingComponent from "../../loadingComponent.jsx";
import { Outlet } from "react-router";
import SideBar from "./sidebar/Sidebar.jsx";


const Index = ({employee, fetchEmployee}) => {
      const { isLoading } = useAuth();
      if (isLoading) {
            return (
                  <LoadingComponent />
            )
      }
      return (

            <Box sx={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
                  <Box sx={{ width: '18%', backgroundColor: 'white' }}>
                        <SideBar employee={employee} fetchEmployee={fetchEmployee}/>
                  </Box>
                  <Box sx={{ width: '80%', padding: 2, backgroundColor: 'whitesmoke' }}>
                        <Outlet />
                  </Box>
            </Box>


      )
}
export default Index;