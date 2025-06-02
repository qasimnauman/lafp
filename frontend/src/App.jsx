import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import AdminLayout from './components/Admin/Layout';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Homepage from './pages/homepage';
import ReportItemPage from './pages/Reportitem';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountSettings from './pages/profile';
import ItemDetailPage from './pages/ItemDetailPage';
import LostAndFoundPageWrapper from './pages/LostAndFoundPageWrapper';
import MyItemsPage from './pages/myitems';

// Admin Pages
import AdminDashboard from './pages/admin/dashboard';
import Items from './pages/admin/Items';
import Claims from './pages/admin/Claims';
import Users from './pages/admin/Users';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ----------- Public Pages with Navbar + Footer ----------- */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Homepage />
              <Footer />
            </>
          }
        />
        <Route
          path="/reportitem"
          element={
            <>
              <Navbar />
              <ReportItemPage />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/items/:type"
          element={
            <>
              <Navbar />
              <LostAndFoundPageWrapper />
              <Footer />
            </>
          }
        />
        <Route
          path="/item/:id"
          element={
            <>
              <Navbar />
              <ItemDetailPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <AccountSettings />
              <Footer />
            </>
          }
        />
        <Route
          path="/myitems"
          element={
            <>
              <Navbar />
              <MyItemsPage />
              <Footer />
            </>
          }
        />

        {/* ----------- Admin Routes with Layout ----------- */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/items" element={<Items />} />
          <Route path="/admin/claims" element={<Claims />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
