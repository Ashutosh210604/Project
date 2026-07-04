import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/auth' element={<AuthPage/>}/>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            }
          />  
          <Route path='/' element={<Navigate to="/auth"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
