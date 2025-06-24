import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation } from 'react-router';
import { useAuth } from '../authentication/auth';
import LoadingComponent from '../loadingComponent';
import Employee from './employee';

const Index = () => {
      const { isAuthenticated, isLoading } = useAuth();
      const location = useLocation();
      const isLoginPage = location.pathname === '/elms'
      if (isLoading) {
            return (
                  <LoadingComponent />
            )
      }

      if (!isAuthenticated) {
            return (
                  <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, color: 'white', backgroundColor: 'lightslategray', padding: 2 }}>
                              <Link to="/elms/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="h5" >
                                          Admin Page
                                    </Typography>
                              </Link>
                              <Link to="/elms/employee" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="h5">
                                          Employee Page
                                    </Typography>
                              </Link>
                        </Box>
                        <Outlet />
                        {isLoginPage && <Employee/>}
                  </>
            )
      } else {
            return (
                  <>
                        <Box sx={{ color: 'white', backgroundColor: 'lightslategray', padding: 2 }}>
                              <Typography>Employee Leave Management System</Typography>
                        </Box>
                        <Outlet />
                  </>
            );
      }
}

export default Index;