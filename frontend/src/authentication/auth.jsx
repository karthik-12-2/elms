import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { backendUrl } from "../config/config.jsx";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [isLoading, setIsLoading] = useState(true);
      const navigate = useNavigate();
      const location = useLocation();
      const pathSegments = location.pathname.split('/')[2]
      const redirectTo = `/elms/${pathSegments}`;
      // Check if the user already logged in or not
      // If not logged in, redirect to the login page
      // If logged in, do nothing and allow access to the page


      useEffect(() => {
            const userData = localStorage.getItem('isLoggedIn');
            if (!userData) {
                  setIsAuthenticated(false);
                  setIsLoading(false);
                  if (location.pathname.includes('/homepage')) navigate(redirectTo);
                  return;
            }

            async function checkLoginStatus() {
                  try {
                        const parsedData = JSON.parse(userData);
                        const response = await axios.post(`${backendUrl}/checkLoginStatus`, parsedData);

                        if (response.data?.message === 'authenticated') {
                              if (parsedData.role !== pathSegments) {
                                    localStorage.removeItem('isLoggedIn');
                                    setIsAuthenticated(false);
                                    navigate(redirectTo);
                              } else {
                                    setIsAuthenticated(true);

                                    if (!location.pathname.includes('homepage')) {
                                          navigate(`/elms/${pathSegments}/homepage`);
                                    }
                              }
                        } else {
                              localStorage.removeItem('isLoggedIn');
                              setIsAuthenticated(false);
                              navigate(redirectTo);
                        }
                  } catch (error) {
                        localStorage.removeItem('isLoggedIn');
                        setIsAuthenticated(false);
                        navigate(redirectTo);
                  } finally {
                        setIsLoading(false);
                  }
            }
            checkLoginStatus();

      }, [navigate, redirectTo, location.pathname, pathSegments]);

      return (
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
                  {children}
            </AuthContext.Provider>
      )
}

export const useAuth = () => useContext(AuthContext)