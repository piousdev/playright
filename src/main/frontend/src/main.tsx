import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import RootLayout from './layouts/root-layout'

import Developers from './pages/developers'
import Creators from './pages/hub/creators.tsx'
import Genres from './pages/hub/genres.tsx'
import NewReleases from './pages/hub/new-releases'
import Reviews from './pages/hub/reviews.tsx'

import DevelopersLayout from './layouts/developers-layout.tsx'
import HubLayout from './layouts/hub-layout'
import HubIndexPage from './pages/hub'
import Playground from './pages/playground.tsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "hub",
          element: <HubLayout />,
          children: [
            { index: true, element: <HubIndexPage /> },
            { path: "new-releases", element: <NewReleases /> },
            { path: "creators", element: <Creators /> },
            { path: "genres", element: <Genres /> },
            { path: "reviews", element: <Reviews /> },
          ],
        },
        { path: "playground", element: <Playground /> },
        { path: "developer",
          element: <DevelopersLayout />,
          children: [
            { index: true, element: <Developers /> },
          ],
        },
      ],
    },
  ]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)