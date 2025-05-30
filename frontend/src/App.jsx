import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReportItem from "./pages/ReportItem";
import Login from "./pages/Login";
import Homepage from "./pages/homepage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Register from "./pages/Register";
import AccountSettings from "./pages/profile";
import ItemDetailPage from "./pages/ItemDetailPage";
import LostAndFoundPageWrapper from "./pages/LostAndFoundPageWrapper";
import MyItemsPage from "./pages/myitems";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/items/:type" element={<LostAndFoundPageWrapper />} />
        <Route path="/reportitem" element={<ReportItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/profile" element={<AccountSettings />} />
        <Route path="/myitems" element={<MyItemsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
