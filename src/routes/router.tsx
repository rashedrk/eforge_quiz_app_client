import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Assessment from "@/pages/Assessment";
import AssessmentResult from "@/pages/AssessmentResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Dashboard /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/assessment/result",
    element: (
      <ProtectedRoute>
        <AssessmentResult />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assessment",
    element: (
      <ProtectedRoute>
        <Assessment />
      </ProtectedRoute>
    ),
  },
]);

export default router;
