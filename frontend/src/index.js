// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App_Img";
import App2 from "./components/App_2";
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
import './index.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const routes=createBrowserRouter([
    {
        path:'/',
        element:<Landing />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/register',
        element:<Register />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/login',
        element:<Login />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/home',
        element:<Home />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/upload',
        element:<Upload />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/myUpload',
        element:<MyUploads />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/notes',
        element:<Notes />,
        children:[
            {
                path:'/notes/:semId',
                element:<Notes />
            },
        ],
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/notes/dept/:deptId',
        element:<Department />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/notes/dept/subject/:subId',
        element:<Subject />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/notes/dept/subject/unit/:unitId',
        element:<Unit />,
        errorElement:<div>Error: 404 Not Found </div>
    },

    {
        path:'/img',
        element:<App />,
        errorElement:<div>Error: 404 Not Found </div>
    },
    {
        path:'/next',
        element:<App2/>,
        errorElement:<div>Error: 404 Not Found </div>
    }
])
ReactDOM.render(<RouterProvider router={routes}/>,document.getElementById("root"));
