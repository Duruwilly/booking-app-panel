import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Spinner from './components/spinner/Spinner';
import SpinnerRoller from './components/spinner/SpinnerRoller';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRoutes } from './navigations/public-routes';
import AuthMiddleware from './navigations/private-routes-middleware';
import Layout from './components/Layouts/AuthLayout';
import NonAuthLayout from './components/Layouts/NonAuthLayout';
import { privateRoutes } from './navigations/private-routes';

function App() {
  return (
    <>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={
            <AuthMiddleware Layout={Layout} isAuthProtected={true} Component={route.component} ifAuthenticatedRedirect={false} permission={route.permission}></AuthMiddleware>
          } ></Route>
        ))}
        {
          publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={
              <AuthMiddleware Layout={NonAuthLayout} permission="" isAuthProtected={false} Component={route.component} ifAuthenticatedRedirect={route.ifAuthenticatedRedirect} ></AuthMiddleware>
            } ></Route>
          ))
        }
      </Routes>
      <ToastContainer />
    </>
  )

}
export default App
