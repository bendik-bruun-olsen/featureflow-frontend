import { createBrowserRouter } from "react-router-dom"
import { Paths } from "./paths"

import DashboardPage from "./pages/DashboardPage/DashboardPage"
import FeatureRequestsPage from "./pages/FeatureRequestsPage/FeatureRequestsPage"
import IssuePage from "./pages/IssuePage/IssuePage"
import LoginPage from "./pages/LoginPage/LoginPage"
import SignupPage from "./pages/SignupPage/SignupPage"
import Layout from "./components/Layout"
import { RequireAuthWrapper } from "./components/RequireAuthWrapper"

  const unprotectedRoutes = [
    {
        path: Paths.login,
        element: <LoginPage/>
    },
    {
        path: Paths.signup,
        element: <SignupPage/>
    }
  ]

  const protectedRoutes = [
    {
        path: Paths.dashboard,
        element: <DashboardPage/>
    },
    {
        path: Paths.features,
        element: <FeatureRequestsPage/>
    },
    {
        path: Paths.issues,
        element: <IssuePage/>
    }
  ]

  const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <RequireAuthWrapper />,
                children: protectedRoutes,
            },
            ...unprotectedRoutes,
        ],
    },
]);

  export default router;