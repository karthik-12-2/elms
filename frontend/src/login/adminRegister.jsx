import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { apiClient, backendUrl } from '../config/config';
import axios from 'axios';

const AdminRegister = () => {
      const navigate = useNavigate();

      const formik = useFormik({
            initialValues: {
                  email: '',
                  password: '',
                  role: 'admin',
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
                        const response = await axios.post(`${backendUrl}/admin/register/`, values)

                        if (response.data && response.data.message === 'Register successful') {
                              navigate(`/elms/admin`);
                        }
                        resetForm()
                  } catch (error) {
                        console.log(error)
                  }
            },
      });
      return (
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBlock: '4rem', gap: '1rem', alignItems: 'center', width: '100%', paddingBlock: '2rem' }}>
                  <Typography variant='h4' >Welcome to the elms admin Register</Typography>
                  <Box style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#b6bfc8', height: 'fit-content', padding: '2rem', borderRadius: '8px' }}>
                        <Typography> ADMIN REGISTER</Typography>
                        <TextField
                              id="email"
                              name="email"
                              label="Enter Email id"
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
                        <Box sx={{textAlign: 'center'}}>
                              <Button type="submit" sx={{
                                    width: '100px', alignSelf: 'center', border: 'none', borderRadius: '3px', backgroundColor: 'white', color: 'black'
                                    , '&:hover': {
                                          backgroundColor: 'white'
                                    }
                              }} disableRipple>Register</Button>
                        </Box>
                  </Box>


            </form>
      );
}

export default AdminRegister;

