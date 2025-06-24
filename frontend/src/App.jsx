import { Navigate, Route, Routes } from 'react-router';
import LoginIndex from './login/index.jsx';
import Admin from './login/admin';
import Employee from './login/employee';
import Error from './error/Error';
import AdminPage from './homepage/admin/Index.jsx';
import Dashboard from './homepage/admin/pages/dashboard.jsx';
import ChangePassword from './homepage/admin/pages/ChangePassword.jsx';
import EmployeePage from './homepage/employee/Index.jsx';
import MyProfile from './homepage/employee/pages/MyProfile.jsx';
import ApplyLeave from './homepage/employee/pages/ApplyLeave.jsx';
import LeaveHistory from './homepage/employee/pages/LeaveHistory.jsx';
import { useState } from 'react';
import { apiClient } from './config/config.jsx';
import AddDepartment from './homepage/admin/pages/department/AddDepartment.jsx';
import ManageDepartment from './homepage/admin/pages/department/ManageDepartment.jsx';
import UpdateDepartment from './homepage/admin/pages/department/UpdateDepartment.jsx';
import AddEmployee from './homepage/admin/pages/employee/AddEmployee.jsx';
import ManageEmployee from './homepage/admin/pages/employee/ManageEmployee.jsx';
import AllLeaves from './homepage/admin/pages/leavemanagement/AllLeaves.jsx';
import ApprovedLeaves from './homepage/admin/pages/leavemanagement/ApprovedLeaves.jsx';
import LeaveDetails from './homepage/admin/pages/leavemanagement/LeaveDetails.jsx';
import NotApprovedLeaves from './homepage/admin/pages/leavemanagement/NotApprovedLeaves.jsx';
import PendingLeaves from './homepage/admin/pages/leavemanagement/PendingLeaves.jsx';
import AddLeaveType from './homepage/admin/pages/leavetype/AddLeaveType.jsx';
import ManageLeaveType from './homepage/admin/pages/leavetype/ManageLeaveType.jsx';
import UpdateLeaveType from './homepage/admin/pages/leavetype/UpdateLeaveType.jsx';
import UpdateEmployee from './homepage/admin/pages/employee/UpdateEmployee.jsx';


function App() {
  const [employee, setEmployee] = useState({
    name: '',
    code: ''
  })

  const fetchEmployee = async () => {
    try {
      const response = await apiClient.get('/employee/username');
      if (response.data?.length > 0) {
        setEmployee({
          name: response.data[0].employeename,
          code: response.data[0].employeecode,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Routes>
        <Route path="/elms" element={<LoginIndex />}>
          <Route path="admin" element={<Admin />} />
          <Route path="employee" element={<Employee />} />

          <Route
            path={"admin/homepage/"}
            element={
              <AdminPage />
            }
          >
            <Route index element={<Navigate to="changepassword" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path='changepassword' element={<ChangePassword />} />
            <Route path='adddepartment' element={<AddDepartment />} />
            <Route path='managedepartment' element={<ManageDepartment />} >
            </Route>
            <Route path="managedepartment/dept/:id" element={<UpdateDepartment />} />
            <Route path='addleavetype' element={<AddLeaveType />} />
            <Route path='manageleavetype' element={<ManageLeaveType />} />
            <Route path='manageleavetype/id/:id' element={<UpdateLeaveType />} />
            <Route path='addemployee' element={<AddEmployee />} />
            <Route path='leavedetails/leaveid/:id' element={<LeaveDetails />} />
            <Route path='manageemployee' element={<ManageEmployee />} />
            <Route path='manageemployee/employee/:id' element={<UpdateEmployee />} />
            <Route path='allleaves' element={<AllLeaves />} />
            <Route path='pendingleaves' element={<PendingLeaves />} />
            <Route path='approvedleaves' element={<ApprovedLeaves />} />
            <Route path='notapprovedleaves' element={<NotApprovedLeaves />} />
          </Route>

          <Route path='employee/homepage' element={<EmployeePage employee={employee} fetchEmployee={fetchEmployee} />}>
            <Route index element={<Navigate to="changepassword" />} />
            <Route path='changepassword' element={<ChangePassword />} />
            <Route path='my-profile' element={<MyProfile fetchEmployee={fetchEmployee} />} />
            <Route path='applyleave' element={<ApplyLeave />} />
            <Route path='leavehistory' element={<LeaveHistory />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>

  )
}

export default App
