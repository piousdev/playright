import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

// Import layouts
import DashboardLayout from './layouts/dashboard-layout'
import RootLayout from './layouts/root-layout'

// Import components
import IndexPage from './routes'
import ContactPage from './routes/contact'
import DashboardPage from './routes/dashboard'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <IndexPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/sign-in", element: <SignInPage /> },
            { path: "/sign-up", element: <SignUpPage /> },
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