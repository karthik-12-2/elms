# elms
Employee Leave Management System

A full-stack Employee Leave Management System where employees can apply leaves and view history, while admin manage departments, employees and leave approvals.

## Tech Stack

- **Frontend**: ReactJS, Formik
- **Backend**: Node.js,
- **Database**: MySQL

## User Roles

### Admin

- Create, Read, Update, Delete:
     - Departments
     - Leave Types
     - Employees
- Manage leave requests:
     - View pending requests
     - Approve or reject leave applications
- Change password

### Employee
      
- Apply for leave
- View leave history
- Update profile
- Change password


## 1. Clone the repository

## 2. Install dependencies
      To install both frontend and backend dependencies
          npm run install:frontend
          npm run install:backend

## 3. Start the Application (Frontend and Backend)
       npm run start
### This Command runs both frontend and backend servers at the same time using concurrently
- "start": "concurrently \"npm run dev --prefix frontend\" \"npm run start --prefix backend\""
