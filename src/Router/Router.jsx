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
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoute from "../Routes/RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ParcelDetails from "../Pages/Dashboard/ParcelsDetails/ParcelDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/about',
        Component: AboutUs
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
      },
      {
        path: "/rider",
        element: <PrivateRoute><BeARider></BeARider></PrivateRoute>,
        loader: ()=> fetch("./serviceCenter.json"),
        hydrateFallbackElement: <Loader/>,
      },
      {
        path: '/forbidden',
        Component: Forbidden
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
       index: true,
       Component: DashboardHome
      },
      {
        path: "myParcels",
        Component: MyParcels
      },
      {
        path: "/dashboard/parcel/:id",
        Component: ParcelDetails,
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
      },
      {
        path: "pending-deliveries",
        element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
      },
      {
        path: "completed-deliveries",
        element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },
      {
        path: "my-earnings",
        element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
      },
      {
        path: "assign-rider",
        element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
      },
      {
        path: "pendingRiders",
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: "activeRiders",
        element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path: "makeAdmin",
        element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      }
    ]

  }
]);


