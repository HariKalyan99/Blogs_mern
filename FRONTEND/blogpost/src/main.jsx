import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Blogdashboard from './components/Blogdashboard.jsx';
import Signup from './components/Authverification/Signup.jsx';
import Login from './components/Authverification/Login.jsx';

const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    {path: "/", element: <Blogdashboard />},
    {path: "/signup", element: <Signup />},
    {path: "/login", element: <Login />}
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
