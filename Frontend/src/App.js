import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Main from "./Components/Home/Main";
import Propertylist from "./Components/Home/Propertylist";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Login from "./Components/User/Login";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./Store/User/User-slice";
import { currentUser } from "./Store/User/User-action";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";

import ResetPassword from "./Components/User/ResetPassword";
import Payment from "./Components/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ForgotPassword } from "./Components/User/ForgotPassword";
import MyBookings from "./Components/MyBookings/MyBookings";
import BookingDetails from "./Components/MyBookings/BookingDetails";
import Accomodation from "./Components/Accomodation/Accomodation";
import AccomodationForm from "./Components/Accomodation/AccomodationForm";

function App() {
  const stipePromise = loadStripe(
    "pk_test_51OtsbJSJxtgMeMeK6wEXP81LRQWMDgMGk6U3z5iPI7ZuTeED1dej8sUXERW3K9MZ2hh4Hi7neXzMbSC0mNwhdYnS00DDSrSZWc"
  );
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);
  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors, dispatch]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} id="main" exact>
        <Route id="home" index element={<Propertylist />} exact />
        <Route
          element={<PropertyDetails />}
          id="PropertyDetails"
          path="propertylist/:id"
          exact
        />
        <Route id="login" path="login" element={<Login />} />
        <Route id="signup" path="signup" element={<Signup />} />
        <Route id="profile" path="profile" element={<Profile />} />
        <Route id="editprofile" path="editprofile" element={<EditProfile />} />
        <Route
          id="updatepassword"
          path="updatepassword"
          element={<UpdatePassword />}
        />
        <Route
          id="forgotpassword"
          path="user/forgotpassword"
          element={<ForgotPassword />}
        />
        <Route id="mybookings" path="user/booking" element={<MyBookings />} />
        <Route
          id="bookingdetails"
          path="user/booking/:bookingId"
          element={<BookingDetails />}
        />
        <Route
          id="resetpassword"
          path="resetpassword"
          element={<ResetPassword />}
        />
        <Route
          id="payment"
          path="payment/:propertyId"
          element={
            <Elements stripe={stipePromise}>
              <Payment></Payment>
            </Elements>
          }
        />
        <Route
          id="accomodation"
          path="accomodation"
          element={<Accomodation />}
        />
        <Route
          id="accomodationform"
          path="accomodationform"
          element={<AccomodationForm />}
        />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        draggable={true}
        transition={Flip}
      />
    </div>
  );
}

export default App;
