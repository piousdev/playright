import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

// Import layouts
import DashboardLayout from './layouts/dashboard-layout'
import RootLayout from './layouts/root-layout'

// Import components
import DashboardPage from './routes/dashboard'
import Developers from './routes/developer'
import Hub from './routes/hub'
import Playground from './routes/playground'

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <Hub /> },
            { path: "/hub", element: <Hub /> },
            { path: "/playground", element: <Playground /> },
            { path: "/developer", element: <Developers /> },
            {
                element: <DashboardLayout />,
                path: "dashboard",
                children: [
                    { path: "/dashboard", element: <DashboardPage /> },
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)