import { useFormik } from 'formik';
import * as Yup from 'yup';
import { backendUrl } from '../config/config.jsx';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Notification from '../notification/Notification.jsx';
import { useNotification } from '../notification/NotificationContext.jsx';
import TextFieldComponent from '../textfieldcomponent/TextFieldComponent.jsx';

const LoginPage = () => {
      const { showNotification } = useNotification()
      const location = useLocation();
      const segments = location.pathname.split('/').filter(Boolean);
      const roleFromPath = segments[1] || 'employee';
      const navigate = useNavigate();


      const formik = useFormik({
            initialValues: {
                  email: '',
                  password: '',
                  role: roleFromPath, // Set the role based on the path
            },
            validationSchema: Yup.object({
                  email: Yup.string('Enter your email')
                        .email('Enter a valid email')
                        .required('Email is required'),
                  password: Yup.string('Enter your password')
                        .min(7, 'Password should be of minimum 7 characters length')
                        .required('Password is required'),
            }),
            onSubmit: async (values, { resetForm }) => {
                  try {
                        const response = await axios.post(`${backendUrl}/login/${roleFromPath}`, values)
                        if (response.data && response.data.message === 'Login successful') {
                              localStorage.setItem('isLoggedIn', JSON.stringify({ email: response.data.data.email, password: response.data.data.password, role: response.data.data.role }));
                              navigate(`/elms/${roleFromPath}/homepage`);
                        }
                        resetForm()
                  } catch (error) {
                        showNotification(`Error ${error.response.data.message}`, 'error')
                  }
            },
      });
      return (
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBlock: '4rem', gap: '1rem', alignItems: 'center', width: '100%', paddingBlock: '2rem' }}>
                  <Typography variant='h4' >Welcome to the elms</Typography>
                  <Box style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#b6bfc8', height: 'fit-content', padding: '2rem', borderRadius: '8px' }}>
                        <Notification />
                        <Typography> {segments?.[1]?.toUpperCase() || 'EMPLOYEE'} LOGIN</Typography>
                        <TextFieldComponent
                              id="email"
                              name="email"
                              label="Enter Registered Email id"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}
                              variant='filled'

                        />
                        <TextFieldComponent
                              id="password"
                              name="password"
                              label="Enter Password"
                              type="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}
                              variant='filled'

                        />
                        <Box sx={{ textAlign: 'center' }}>
                              <Button type="submit" sx={{
                                    width: '100px', alignSelf: 'center', border: 'none', borderRadius: '3px', backgroundColor: 'white', color: 'black'
                                    , '&:hover': {
                                          backgroundColor: 'white'
                                    }
                              }} disableRipple>Submit</Button>
                              {roleFromPath === 'admin' && <Button sx={{ backgroundColor: 'blue', color: 'white', marginInlineStart: 2, width: '100px', borderRadius: '3px' }} disableRipple onClick={() => navigate('/elms/register')}>Register</Button>}
                        </Box>
                  </Box>


            </form>
      );
}

export default LoginPage;

