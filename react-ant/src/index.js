import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Signin from "./user/sign_in";
import SignUp from "./user/sign_up";
import PrivateRoute from './components/privateroute';

import Customer from './components/customers/page';
import AddCustomer from './components/customers/add_customer';
import EditCustomer from './components/customers/ed_customer';

import Unit from './components/units/page';
import AddUnit from './components/units/add_unit';
import EditUnit from './components/units/ed_unit';

import Notification from './components/notification_temp/page';
import AddNotification from './components/notification_temp/add_notification';
import EditNotification from './components/notification_temp/ed_notification';

import Service from './components/provided_service/page';
import ServiceExp from './components/provided_service/exp_page';
import AddService from './components/provided_service/add_service';
import EditService from './components/provided_service/ed_service';


import SMS from './components/settings/sms_api/page';
import AddSms from './components/settings/sms_api/add_sms';

import SMTP from './components/settings/smtp/page';
import AddSmtp from './components/settings/smtp/add_smtp';



import Dashb from "./components/dashboard/dashboard";
import AppLayout from "./components/layout";
import Profile from "./user/user_profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
         <Route path="/" element={<Dashb />} />
         <Route path="/home" element={<AppLayout />} />
         <Route path="/profile" element={<Profile />} />

         <Route path="/customer" element={<Customer />} />
         <Route path="/add_customer" element={<AddCustomer />} />
         <Route path="/edit_customer/:id" element={<EditCustomer />} />

         <Route path="/units" element={<Unit />} />
         <Route path="/add_unit" element={<AddUnit />} />
         <Route path="/edit_unit/:id" element={<EditUnit />} />

         <Route path="/notification" element={<Notification />} />
         <Route path="/add_notification" element={<AddNotification />} />
         <Route path="/edit_notification/:id" element={<EditNotification />} />

         <Route path="/service" element={<Service />} />
         <Route path="/service_exp" element={<ServiceExp />} />
         <Route path="/add_service" element={<AddService />} />
         <Route path="/edit_service/:id" element={<EditService />} />

         <Route path="/sms" element={<SMS />} />
         <Route path="/add_sms" element={<AddSms />} />

         <Route path="/smtp" element={<SMTP />} />
         <Route path="/add_smtp" element={<AddSmtp />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
