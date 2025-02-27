/* eslint-disable no-unused-vars */

import React, { lazy, StrictMode, Suspense } from "react"; // Import necessary React components and utilities
import { createRoot } from "react-dom/client"; // Import for creating the React root element
import "./index.css"; // Import the global CSS styles
import App from "./App.jsx"; // Import the main App component
import { createBrowserRouter } from "react-router-dom"; // Import for creating browser-based routing
import NotFound from "./components/NotFound.jsx"; // Component for handling 404 errors
import { RouterProvider } from "react-router-dom"; // Import RouterProvider to manage routing in the app

const Homepage = lazy(() => import("./components/Homepage.jsx"));
const MemeExplorer = lazy(() => import("./components/MemeExplorer.jsx"));
const MemeUpload = lazy(() => import("./components/MemeUpload.jsx"));
const MemeDetails = lazy(() => import("./components/MemeDetails.jsx"));
const UserProfile = lazy(() => import("./components/UserProfile.jsx"));
const LeaderBoard = lazy(() => import("./components/LeaderBoard.jsx"));

// Define the app's router with different routes and lazy-loaded components
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app component
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage /> {/* Lazy load VideoList component */}
          </Suspense>
        ),
      },
      {
        path: "/explore",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MemeExplorer /> {/* Lazy load VideoDetail component */}
          </Suspense>
        ),
      },
      {
        path: "/upload",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MemeUpload /> {/* Lazy load Channel component */}
          </Suspense>
        ),
      },
      {
        path: "/meme/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MemeDetails /> {/* Lazy load Channel component */}
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfile /> {/* Lazy load Channel component */}
          </Suspense>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LeaderBoard /> {/* Lazy load Channel component */}
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />, // Component to render when no route matches (404 page)
  },
]);

// Render the root of the React application
createRoot(document.getElementById("root")).render(
  <StrictMode> {/* Enables React's strict mode for identifying potential issues */}
    <RouterProvider router={appRouter} /> {/* Provide the app's router to the app */}
  </StrictMode>
);
