import { useFormik } from 'formik';
import * as Yup from 'yup';
import { backendUrl } from '../config/config.jsx';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const LoginPage = () => {
      const location = useLocation();
      const segments = location.pathname.split('/').filter(Boolean);
      const roleFromPath = segments[1] || 'employee';
      const navigate = useNavigate();
      // const { isAuthenticated } = useAuth();
      // console.log('isAuthenticated', isAuthenticated)

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
                        console.log(response)
                        if (response.data && response.data.message === 'Login successful') {
                              localStorage.setItem('isLoggedIn', JSON.stringify({ email: response.data.data.email, password: response.data.data.password, role: response.data.data.role }));
                              navigate(`/elms/${roleFromPath}/homepage`);
                        }
                        resetForm()
                  } catch (error) {
                        console.log(error)
                  }
            },
      });
      return (
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBlock: '4rem', gap: '1rem', alignItems: 'center', width: '100%', paddingBlock: '2rem' }}>
                  <Typography variant='h4' >Welcome to the elms</Typography>
                  <Box style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#b6bfc8', height: 'fit-content', padding: '2rem', borderRadius: '8px' }}>
                        <Typography> {segments?.[1]?.toUpperCase() || 'EMPLOYEE'} LOGIN</Typography>
                        <TextField
                              id="email"
                              name="email"
                              label="Enter Registered Email id"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}
                              variant='filled'
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
                        <TextField
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
                        <Button type="submit" sx={{
                              width: '100px', alignSelf: 'center', border: 'none', borderRadius: '3px', backgroundColor: 'white', color: 'black'
                              , '&:hover': {
                                    backgroundColor: 'white'
                              }
                        }} disableRipple>Submit</Button>
                  </Box>


            </form>
      );
}

export default LoginPage;

