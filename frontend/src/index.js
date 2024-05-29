import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Upload from './components/Uploads';
import Notes from './components/Notes';
import Department from './components/Department';
import Subject from './components/Subject';
import Unit from './components/Unit';
import MyUploads from './components/MyUploads';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import AdminValid from './components/AdminValid';
import AdminInvalid from './components/AdminInvalid';
import Starred from './components/Starred';
import Recommend from './components/Recommend';
import './index.css';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/home',
        element: <Home />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/upload',
        element: <Upload />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/myUpload',
        element: <MyUploads />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/notes',
        element: <Notes />,
        children: [
            {
                path: '/notes/:semId',
                element: <Notes />
            },
        ],
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/notes/dept/:deptId',
        element: <Department />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/notes/dept/subject/:subId',
        element: <Subject />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/notes/dept/subject/unit/:unitId',
        element: <Unit />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/admin',
        element: <Admin />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/adminLogin',
        element: <AdminLogin />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/adminValid',
        element: <AdminValid />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/adminInvalid',
        element: <AdminInvalid />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/starred',
        element: <Starred />,
        errorElement: <div>Error: 404 Not Found </div>
    },
    {
        path: '/recommend',
        element: <Recommend />,
        errorElement: <div>Error: 404 Not Found </div>
    },
])
ReactDOM.render(<RouterProvider router={routes} />, document.getElementById("root"));