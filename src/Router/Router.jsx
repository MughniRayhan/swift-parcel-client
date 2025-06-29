import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Coverage from "../Pages/Caverage/Coverage";
import Loader from "../Components/Loader/Loader";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: ()=> fetch("./serviceCenter.json"),
        hydrateFallbackElement: <Loader/>
      },
      {
        path: "/sendParcel",
        loader: ()=> fetch("./serviceCenter.json"),
        hydrateFallbackElement: <Loader/>,
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
      }
    ]

  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "myParcels",
        Component: MyParcels
      },
      {
        path: "payment/:id",
        Component: Payment
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory
      },
      {
        path: "track",
        Component: TrackParcel
      }
    ]

  }
]);


