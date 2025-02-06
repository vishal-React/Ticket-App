// src/App.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import TicketEdit from "./page/TicketEdit";
import PrivateRoute from "./components/PrivateRoute";
import TicketView from "./page/TicketView";

// Define your routes using the new Data API
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to="/login" replace />,
  // },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/edit-ticket/:ticketId",
    element: (
      <PrivateRoute>
        <TicketEdit />
      </PrivateRoute>
    ),
  },
  {
    path: "/view-ticket/:ticketId",
    element: (
      <PrivateRoute>
        <TicketView />
      </PrivateRoute>
    ),
  },

  // Catch-all route (optional since the "/" redirect is already set)
  // {
  //   path: "*",
  //   element: <Navigate to="/login" replace />,
  // },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
