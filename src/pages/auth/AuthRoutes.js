import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './SignUp'
import LoginPage from './Login'
import ForgotPasswordPage from './ForgotPassword'
import ResetPassword from './ResetPassword'

const AuthRoutes = () => {
  return (
    <Routes>
        <Route>
            <Route path='/register' element={<SignUpPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
            <Route path='/reset-password' element={<ResetPassword/>} />
        </Route>
    </Routes>
  )
}

export default AuthRoutes